import { resolve4, resolve6, resolveMx } from 'node:dns/promises';

const ALLOWED_METHODS = 'POST, OPTIONS';
const RESEND_API_URL = 'https://api.resend.com/emails';
const DEFAULT_TO_EMAIL = 'healthnavigator@andersonlg.com';
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const PHONE_MAX_DIGITS = 15;
const PHONE_REGEX = /^\+?\d{7,15}$/;
const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9]))+$/;
const EMAIL_VERIFIER_DEFAULT_URL = 'https://emailvalidation.abstractapi.com/v1/';
const EMAIL_VERIFIER_TIMEOUT_MS = 3_500;
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  '10minutemail.com',
  'dispostable.com',
  'fakeinbox.com',
  'guerrillamail.com',
  'maildrop.cc',
  'mailinator.com',
  'mailnesia.com',
  'mintemail.com',
  'sharklasers.com',
  'temp-mail.io',
  'temp-mail.org',
  'tempmail.com',
  'throwawaymail.com',
  'trashmail.com',
  'yopmail.com',
]);

const ipSubmissionLog = new Map();

const parseAllowedOrigins = () =>
  (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const isOriginAllowed = (req, origin) => {
  if (!origin) return true;

  const allowedOrigins = parseAllowedOrigins();
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  try {
    const originHost = new URL(origin).host;
    return originHost === req.headers.host;
  } catch {
    return false;
  }
};

const applyCors = (req, res) => {
  const origin = req.headers.origin;
  if (!origin || !isOriginAllowed(req, origin)) {
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const normalizeText = (value, { maxLength, keepLineBreaks = false }) => {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  const normalized = keepLineBreaks
    ? trimmed.replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ')
    : trimmed.replace(/\s+/g, ' ');

  return normalized.slice(0, maxLength);
};

const sanitizePhone = (value = '') => {
  const hasLeadingPlus = value.startsWith('+');
  const digitsOnly = value.replace(/\D/g, '').slice(0, PHONE_MAX_DIGITS);
  return `${hasLeadingPlus ? '+' : ''}${digitsOnly}`;
};

const isValidEmail = (value = '') => EMAIL_REGEX.test(value);
const isValidPhone = (value = '') => PHONE_REGEX.test(value);
const parseBoolean = (value, fallback) => {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;
  return fallback;
};

const withTimeout = async (promiseFactory, timeoutMs) => {
  const timeout = Number(timeoutMs);
  if (!Number.isFinite(timeout) || timeout <= 0) {
    return promiseFactory();
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), timeout);
    Promise.resolve()
      .then(promiseFactory)
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
};

export const extractEmailDomain = (email = '') => {
  const atIndex = email.lastIndexOf('@');
  if (atIndex <= 0 || atIndex === email.length - 1) return '';
  return email.slice(atIndex + 1).toLowerCase();
};

export const isDisposableEmailDomain = (domain = '') =>
  DISPOSABLE_EMAIL_DOMAINS.has(String(domain || '').toLowerCase());

const hasDomainDnsRecords = async (domain, deps = {}) => {
  const resolveMxFn = deps.resolveMxFn || resolveMx;
  const resolve4Fn = deps.resolve4Fn || resolve4;
  const resolve6Fn = deps.resolve6Fn || resolve6;

  try {
    const mxRecords = await resolveMxFn(domain);
    if (Array.isArray(mxRecords) && mxRecords.length > 0) {
      return true;
    }
  } catch {}

  try {
    const aRecords = await resolve4Fn(domain);
    if (Array.isArray(aRecords) && aRecords.length > 0) {
      return true;
    }
  } catch {}

  try {
    const aaaaRecords = await resolve6Fn(domain);
    if (Array.isArray(aaaaRecords) && aaaaRecords.length > 0) {
      return true;
    }
  } catch {}

  return false;
};

const verifyWithAbstractApi = async (email, deps = {}) => {
  const apiKey = deps.emailVerifierApiKey ?? process.env.EMAIL_VERIFIER_API_KEY;
  if (!apiKey) {
    return { status: 'skipped' };
  }

  const fetchFn = deps.fetchFn || globalThis.fetch;
  if (typeof fetchFn !== 'function') {
    return { status: 'skipped' };
  }

  const verifierBaseUrl = deps.emailVerifierUrl || process.env.EMAIL_VERIFIER_URL || EMAIL_VERIFIER_DEFAULT_URL;
  const verifierTimeoutMs =
    deps.emailVerifierTimeoutMs ??
    Number(process.env.EMAIL_VERIFIER_TIMEOUT_MS || EMAIL_VERIFIER_TIMEOUT_MS);

  const verifierUrl = new URL(verifierBaseUrl);
  verifierUrl.searchParams.set('api_key', apiKey);
  verifierUrl.searchParams.set('email', email);

  try {
    const response = await withTimeout(
      () =>
        fetchFn(verifierUrl.toString(), {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
      verifierTimeoutMs
    );

    if (!response.ok) {
      return { status: 'skipped' };
    }

    const data = await response.json();
    const deliverability = String(data?.deliverability || '').toUpperCase();
    const disposable = data?.is_disposable_email?.value === true;
    const formatInvalid = data?.is_valid_format?.value === false;
    const missingMx = data?.is_mx_found?.value === false;
    const smtpInvalid = data?.is_smtp_valid?.value === false;
    const undeliverable = deliverability === 'UNDELIVERABLE';

    if (disposable) return { status: 'failed', reason: 'disposable_provider' };
    if (formatInvalid || missingMx || smtpInvalid || undeliverable) {
      return { status: 'failed', reason: 'undeliverable_provider' };
    }

    return { status: 'passed', source: 'provider' };
  } catch {
    return { status: 'skipped' };
  }
};

export const verifyEmailDeliverability = async (email, deps = {}) => {
  const domain = extractEmailDomain(email);
  if (!domain) {
    return { ok: false, reason: 'invalid_domain' };
  }

  const blockDisposableDomains =
    deps.blockDisposableDomains ??
    parseBoolean(process.env.ESTIMATE_BLOCK_DISPOSABLE_EMAILS, true);

  if (blockDisposableDomains && isDisposableEmailDomain(domain)) {
    return { ok: false, reason: 'disposable_domain' };
  }

  const verifierResult = await verifyWithAbstractApi(email, deps);
  if (verifierResult.status === 'failed') {
    return { ok: false, reason: verifierResult.reason };
  }
  if (verifierResult.status === 'passed') {
    return { ok: true, source: verifierResult.source };
  }

  const domainHasDnsRecords = await hasDomainDnsRecords(domain, deps);
  if (!domainHasDnsRecords) {
    return { ok: false, reason: 'no_dns_records' };
  }

  return { ok: true, source: 'dns' };
};

export const sanitizeEstimatePayload = (payload = {}) => ({
  name: normalizeText(payload.name, { maxLength: 120 }),
  email: normalizeText(payload.email, { maxLength: 254 }).toLowerCase(),
  phone: sanitizePhone(normalizeText(payload.phone, { maxLength: 40 })),
  state: normalizeText(payload.state, { maxLength: 80 }),
  city: normalizeText(payload.city, { maxLength: 80 }),
  procedure: normalizeText(payload.procedure, { maxLength: 2000, keepLineBreaks: true }),
  language: normalizeText(payload.language, { maxLength: 8 }),
  website: normalizeText(payload.website, { maxLength: 120 }),
});

export const validateEstimatePayload = (payload) => {
  const errors = [];

  if (!payload.name) errors.push('Name is required.');
  if (!payload.email) errors.push('Email is required.');
  if (!payload.phone) errors.push('Phone number is required.');
  if (!payload.state) errors.push('State is required.');
  if (!payload.city) errors.push('City is required.');
  if (!payload.procedure) errors.push('Procedure details are required.');

  if (payload.email && !isValidEmail(payload.email)) {
    errors.push('Email format is invalid.');
  }
  if (payload.phone && !isValidPhone(payload.phone)) {
    errors.push('Phone number format is invalid.');
  }

  return errors;
};

const parseMaxRequests = () => {
  const configured = Number(process.env.ESTIMATE_RATE_LIMIT_MAX || RATE_LIMIT_MAX_REQUESTS);
  if (!Number.isFinite(configured) || configured < 1) {
    return RATE_LIMIT_MAX_REQUESTS;
  }
  return Math.floor(configured);
};

const pruneOldRateLimitEntries = (now) => {
  for (const [ip, timestamps] of ipSubmissionLog.entries()) {
    const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (recent.length > 0) {
      ipSubmissionLog.set(ip, recent);
    } else {
      ipSubmissionLog.delete(ip);
    }
  }
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim();
  }

  return 'unknown';
};

const isRateLimited = (clientIp, now = Date.now()) => {
  pruneOldRateLimitEntries(now);

  const maxRequests = parseMaxRequests();
  const recent = ipSubmissionLog.get(clientIp) || [];
  if (recent.length >= maxRequests) {
    ipSubmissionLog.set(clientIp, recent);
    return true;
  }

  ipSubmissionLog.set(clientIp, [...recent, now]);
  return false;
};

const escapeHtml = (value) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildEmailHtml = (payload, meta) => {
  const rows = [
    ['Submitted at (UTC)', meta.submittedAt],
    ['Language', payload.language || 'not provided'],
    ['Name', payload.name],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['State', payload.state],
    ['City', payload.city],
    ['Procedure', payload.procedure],
    ['IP', meta.clientIp],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 10px;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 10px;">${escapeHtml(value).replace(/\n/g, '<br />')}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111;">
      <h2 style="margin:0 0 12px;">New Free Estimate Request</h2>
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        ${htmlRows}
      </table>
    </div>
  `;
};

const buildEmailText = (payload, meta) => `New Free Estimate Request

Submitted at (UTC): ${meta.submittedAt}
Language: ${payload.language || 'not provided'}
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
State: ${payload.state}
City: ${payload.city}
Procedure:
${payload.procedure}

IP: ${meta.clientIp}
`;

const parseRequestBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    return JSON.parse(req.body);
  }
  return req.body;
};

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ALLOWED_METHODS);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  let rawPayload;
  try {
    rawPayload = parseRequestBody(req);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  const payload = sanitizeEstimatePayload(rawPayload);

  // Honeypot field to absorb basic bot traffic.
  if (payload.website) {
    return res.status(200).json({ ok: true });
  }

  const validationErrors = validateEstimatePayload(payload);
  if (validationErrors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: validationErrors });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many submissions. Please wait and try again.' });
  }

  const emailVerification = await verifyEmailDeliverability(payload.email);
  if (!emailVerification.ok) {
    return res.status(400).json({
      error: 'Email address could not be verified. Please use a valid email.',
      code: 'EMAIL_VERIFICATION_FAILED',
      reason: emailVerification.reason,
    });
  }

  const toEmail = process.env.ESTIMATE_TO_EMAIL || DEFAULT_TO_EMAIL;
  const fromEmail = process.env.ESTIMATE_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const submittedAt = new Date().toISOString();
  const subject = `New Estimate Request - ${payload.name}`;

  const emailPayload = {
    from: fromEmail,
    to: [toEmail],
    reply_to: payload.email,
    subject,
    html: buildEmailHtml(payload, { submittedAt, clientIp }),
    text: buildEmailText(payload, { submittedAt, clientIp }),
  };

  try {
    const resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error', resendResponse.status, errorText);
      return res.status(502).json({ error: 'Failed to deliver submission email' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Estimate submission error', error);
    return res.status(500).json({ error: 'Failed to submit estimate request' });
  }
}
