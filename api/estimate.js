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
