import { createHash } from 'node:crypto';
import { resolve4, resolve6, resolveMx } from 'node:dns/promises';
import { isValidEmail, isValidPhone, sanitizePhone } from '@/lib/validation';

const RESEND_API_URL = 'https://api.resend.com/emails';
// Resend delivery is retried on transient upstream failures (429 / 5xx / network).
const RESEND_MAX_RETRIES = 2;
const RESEND_RETRY_BASE_MS = 300;
const DEFAULT_TO_EMAIL = 'healthnavigator@myhealthhaven.org';
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const EMAIL_VERIFIER_DEFAULT_URL = 'https://emailvalidation.abstractapi.com/v1/';
const EMAIL_VERIFIER_DEFAULT_HOST = 'emailvalidation.abstractapi.com';
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

const normalizeText = (value, { maxLength, keepLineBreaks = false }) => {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  const normalized = keepLineBreaks
    ? trimmed.replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ')
    : trimmed.replace(/\s+/g, ' ');
  return normalized.slice(0, maxLength);
};

const parseBoolean = (value, fallback) => {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;
  return fallback;
};

const withTimeout = async (promiseFactory, timeoutMs) => {
  const timeout = Number(timeoutMs);
  if (!Number.isFinite(timeout) || timeout <= 0) return promiseFactory();

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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Derive a stable idempotency key from the submission content so an accidental
// double-submit of the same request is de-duplicated by Resend (24h window)
// instead of sending the lead twice.
const buildIdempotencyKey = (payload) =>
  createHash('sha256')
    .update([payload.email, payload.phone, payload.name, payload.procedure].join('|'))
    .digest('hex')
    .slice(0, 40);

// POST to Resend with bounded exponential backoff. Retries only transient
// failures (network error, 429, 5xx); 4xx responses are returned as-is.
const sendResendEmail = async (emailPayload, idempotencyKey) => {
  let lastError;
  for (let attempt = 0; attempt <= RESEND_MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
        },
        body: JSON.stringify(emailPayload),
      });

      if ((response.status === 429 || response.status >= 500) && attempt < RESEND_MAX_RETRIES) {
        await delay(RESEND_RETRY_BASE_MS * 2 ** attempt);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < RESEND_MAX_RETRIES) {
        await delay(RESEND_RETRY_BASE_MS * 2 ** attempt);
        continue;
      }
    }
  }
  throw lastError || new Error('Resend request failed');
};

const extractEmailDomain = (email = '') => {
  const atIndex = email.lastIndexOf('@');
  if (atIndex <= 0 || atIndex === email.length - 1) return '';
  return email.slice(atIndex + 1).toLowerCase();
};

const isDisposableEmailDomain = (domain = '') =>
  DISPOSABLE_EMAIL_DOMAINS.has(String(domain || '').toLowerCase());

const hasDomainDnsRecords = async (domain) => {
  for (const resolver of [resolveMx, resolve4, resolve6]) {
    try {
      const records = await resolver(domain);
      if (Array.isArray(records) && records.length > 0) return true;
    } catch {
      // resolver missing this record type — try the next one
    }
  }
  return false;
};

const verifyWithAbstractApi = async (email) => {
  const apiKey = process.env.EMAIL_VERIFIER_API_KEY;
  if (!apiKey) return { status: 'skipped' };

  const verifierBaseUrl = process.env.EMAIL_VERIFIER_URL || EMAIL_VERIFIER_DEFAULT_URL;
  const verifierTimeoutMs = Number(
    process.env.EMAIL_VERIFIER_TIMEOUT_MS || EMAIL_VERIFIER_TIMEOUT_MS
  );

  let verifierUrl;
  try {
    verifierUrl = new URL(verifierBaseUrl);
  } catch {
    return { status: 'skipped' };
  }

  if (verifierUrl.protocol !== 'https:') return { status: 'skipped' };
  if (verifierUrl.hostname !== EMAIL_VERIFIER_DEFAULT_HOST) return { status: 'skipped' };

  verifierUrl.searchParams.set('api_key', apiKey);
  verifierUrl.searchParams.set('email', email);

  try {
    const response = await withTimeout(
      () =>
        fetch(verifierUrl.toString(), { method: 'GET', headers: { Accept: 'application/json' } }),
      verifierTimeoutMs
    );
    if (!response.ok) return { status: 'skipped' };

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

const verifyEmailDeliverability = async (email) => {
  const domain = extractEmailDomain(email);
  if (!domain) return { ok: false, reason: 'invalid_domain' };

  const blockDisposableDomains = parseBoolean(process.env.ESTIMATE_BLOCK_DISPOSABLE_EMAILS, true);
  if (blockDisposableDomains && isDisposableEmailDomain(domain)) {
    return { ok: false, reason: 'disposable_domain' };
  }

  const verifierResult = await verifyWithAbstractApi(email);
  if (verifierResult.status === 'failed') return { ok: false, reason: verifierResult.reason };
  if (verifierResult.status === 'passed') return { ok: true, source: verifierResult.source };

  const domainHasDnsRecords = await hasDomainDnsRecords(domain);
  if (!domainHasDnsRecords) return { ok: false, reason: 'no_dns_records' };

  return { ok: true, source: 'dns' };
};

const sanitizeEstimatePayload = (payload = {}) => ({
  name: normalizeText(payload.name, { maxLength: 120 }),
  email: normalizeText(payload.email, { maxLength: 254 }).toLowerCase(),
  phone: sanitizePhone(normalizeText(payload.phone, { maxLength: 40 })),
  state: normalizeText(payload.state, { maxLength: 80 }),
  city: normalizeText(payload.city, { maxLength: 80 }),
  procedure: normalizeText(payload.procedure, { maxLength: 2000, keepLineBreaks: true }),
  language: normalizeText(payload.language, { maxLength: 8 }),
  website: normalizeText(payload.website, { maxLength: 120 }),
});

const validateEstimatePayload = (payload) => {
  const errors = [];
  if (!payload.name) errors.push('Name is required.');
  if (!payload.email) errors.push('Email is required.');
  if (!payload.phone) errors.push('Phone number is required.');
  if (!payload.state) errors.push('State is required.');
  if (!payload.city) errors.push('City is required.');
  if (!payload.procedure) errors.push('Procedure details are required.');
  if (payload.email && !isValidEmail(payload.email)) errors.push('Email format is invalid.');
  if (payload.phone && !isValidPhone(payload.phone)) errors.push('Phone number format is invalid.');
  return errors;
};

const parseMaxRequests = () => {
  const configured = Number(process.env.ESTIMATE_RATE_LIMIT_MAX || RATE_LIMIT_MAX_REQUESTS);
  if (!Number.isFinite(configured) || configured < 1) return RATE_LIMIT_MAX_REQUESTS;
  return Math.floor(configured);
};

const pruneOldRateLimitEntries = (now) => {
  for (const [ip, timestamps] of ipSubmissionLog.entries()) {
    const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (recent.length > 0) ipSubmissionLog.set(ip, recent);
    else ipSubmissionLog.delete(ip);
  }
};

const getClientIp = (request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
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
  return `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#111;"><h2 style="margin:0 0 12px;">New Free Estimate Request</h2><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${htmlRows}</table></div>`;
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

const buildUserConfirmationHtml = (payload) => {
  const isEs = payload.language === 'es';
  const greeting = isEs ? `Hola ${escapeHtml(payload.name)},` : `Hi ${escapeHtml(payload.name)},`;
  const intro = isEs
    ? 'Gracias por solicitar una estimacion gratuita en MyHealth Haven. Hemos recibido su solicitud y nuestro Health Navigator se comunicara con usted en breve con una cotizacion detallada.'
    : 'Thanks for requesting a free estimate from MyHealth Haven. We have received your request and our Health Navigator will follow up shortly with a detailed quote.';
  const summaryTitle = isEs ? 'Resumen de su solicitud' : 'Your request summary';
  const closing = isEs
    ? 'Si tiene preguntas urgentes, responda a este correo o llamenos al +1 (214) 276 3928.'
    : 'If you have urgent questions, reply to this email or call us at +1 (214) 276 3928.';
  return `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;max-width:560px;">
    <h2 style="margin:0 0 12px;color:#00897b;">MyHealth Haven</h2>
    <p>${greeting}</p>
    <p>${intro}</p>
    <h3 style="margin:20px 0 8px;">${summaryTitle}</h3>
    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      <tr><td style="padding:4px 10px 4px 0;font-weight:600;">${isEs ? 'Procedimiento' : 'Procedure'}:</td><td style="padding:4px 0;">${escapeHtml(payload.procedure).replace(/\n/g, '<br />')}</td></tr>
      <tr><td style="padding:4px 10px 4px 0;font-weight:600;">${isEs ? 'Estado' : 'State'}:</td><td style="padding:4px 0;">${escapeHtml(payload.state)}</td></tr>
      <tr><td style="padding:4px 10px 4px 0;font-weight:600;">${isEs ? 'Ciudad' : 'City'}:</td><td style="padding:4px 0;">${escapeHtml(payload.city)}</td></tr>
      <tr><td style="padding:4px 10px 4px 0;font-weight:600;">${isEs ? 'Telefono' : 'Phone'}:</td><td style="padding:4px 0;">${escapeHtml(payload.phone)}</td></tr>
    </table>
    <p style="margin-top:20px;">${closing}</p>
    <p style="margin-top:24px;color:#555;font-size:12px;">MyHealth Haven Management, LLC</p>
  </div>`;
};

const buildUserConfirmationText = (payload) => {
  const isEs = payload.language === 'es';
  return isEs
    ? `Hola ${payload.name},\n\nGracias por solicitar una estimacion gratuita en MyHealth Haven. Hemos recibido su solicitud y nuestro Health Navigator se comunicara con usted en breve con una cotizacion detallada.\n\nResumen de su solicitud:\n- Procedimiento: ${payload.procedure}\n- Estado: ${payload.state}\n- Ciudad: ${payload.city}\n- Telefono: ${payload.phone}\n\nSi tiene preguntas urgentes, responda a este correo o llamenos al +1 (214) 276 3928.\n\nMyHealth Haven Management, LLC`
    : `Hi ${payload.name},\n\nThanks for requesting a free estimate from MyHealth Haven. We have received your request and our Health Navigator will follow up shortly with a detailed quote.\n\nYour request summary:\n- Procedure: ${payload.procedure}\n- State: ${payload.state}\n- City: ${payload.city}\n- Phone: ${payload.phone}\n\nIf you have urgent questions, reply to this email or call us at +1 (214) 276 3928.\n\nMyHealth Haven Management, LLC`;
};

const SAME_ORIGIN_FALLBACK = 'https://www.myhealthhaven.org';

function corsHeaders(request) {
  const origin = request.headers.get('origin');
  if (!origin) return {};

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || SAME_ORIGIN_FALLBACK)
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  if (!allowedOrigins.includes(origin)) return {};

  return {
    'Access-Control-Allow-Origin': origin,
    Vary: 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS(request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request) {
  const cors = corsHeaders(request);

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY');
    return Response.json({ error: 'Server configuration error' }, { status: 500, headers: cors });
  }

  let rawPayload;
  try {
    rawPayload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON payload' }, { status: 400, headers: cors });
  }

  const payload = sanitizeEstimatePayload(rawPayload);

  if (payload.website) {
    return Response.json({ ok: true }, { headers: cors });
  }

  const validationErrors = validateEstimatePayload(payload);
  if (validationErrors.length > 0) {
    return Response.json(
      { error: 'Validation failed', details: validationErrors },
      { status: 400, headers: cors }
    );
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return Response.json(
      { error: 'Too many submissions. Please wait and try again.' },
      { status: 429, headers: cors }
    );
  }

  const emailVerification = await verifyEmailDeliverability(payload.email);
  if (!emailVerification.ok) {
    return Response.json(
      {
        error: 'Email address could not be verified. Please use a valid email.',
        code: 'EMAIL_VERIFICATION_FAILED',
        reason: emailVerification.reason,
      },
      { status: 400, headers: cors }
    );
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

  const idempotencyKey = buildIdempotencyKey(payload);

  try {
    const resendResponse = await sendResendEmail(emailPayload, `${idempotencyKey}-lead`);

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error', resendResponse.status, errorText);
      return Response.json(
        { error: 'Failed to deliver submission email' },
        { status: 502, headers: cors }
      );
    }

    const userConfirmationPayload = {
      from: fromEmail,
      to: [payload.email],
      reply_to: toEmail,
      subject:
        payload.language === 'es'
          ? 'Recibimos su solicitud — MyHealth Haven'
          : 'We received your request — MyHealth Haven',
      html: buildUserConfirmationHtml(payload),
      text: buildUserConfirmationText(payload),
    };

    try {
      const userResp = await sendResendEmail(userConfirmationPayload, `${idempotencyKey}-confirm`);
      if (!userResp.ok) {
        const txt = await userResp.text();
        console.error('Resend user confirmation error', userResp.status, txt);
      }
    } catch (err) {
      console.error('Resend user confirmation threw', err);
    }

    return Response.json({ ok: true }, { headers: cors });
  } catch (error) {
    console.error('Estimate submission error', error);
    return Response.json(
      { error: 'Failed to submit estimate request' },
      { status: 500, headers: cors }
    );
  }
}
