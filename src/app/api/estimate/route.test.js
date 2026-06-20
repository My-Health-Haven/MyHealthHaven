// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// The route falls back to a DNS deliverability check when no verifier API key
// is configured, so we stub the DNS resolvers to report a healthy domain.
vi.mock('node:dns/promises', () => ({
  resolveMx: vi.fn(async () => [{ exchange: 'mx.example.com', priority: 10 }]),
  resolve4: vi.fn(async () => ['93.184.216.34']),
  resolve6: vi.fn(async () => []),
}));

import * as dns from 'node:dns/promises';
import { OPTIONS, POST } from '@/app/api/estimate/route';

const resendOk = () => ({ ok: true, status: 200, text: async () => '{}', json: async () => ({}) });
const resendErr = (status) => ({ ok: false, status, text: async () => 'upstream error' });

const validPayload = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+12142763928',
  state: 'Texas',
  city: 'Dallas',
  procedure: 'Knee replacement',
  language: 'en',
};

const makeRequest = (body, headers = {}) =>
  new Request('http://localhost/api/estimate', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RESEND_API_KEY = 'test_key';
  process.env.ALLOWED_ORIGINS = 'https://www.myhealthhaven.org';
  delete process.env.EMAIL_VERIFIER_API_KEY;
  delete process.env.ESTIMATE_RATE_LIMIT_MAX;
  delete process.env.ESTIMATE_BLOCK_DISPOSABLE_EMAILS;
  global.fetch = vi.fn(async () => resendOk());
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('POST /api/estimate — guards', () => {
  it('returns 500 when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(500);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns 400 on invalid JSON', async () => {
    const res = await POST(makeRequest('{ not json', { 'x-forwarded-for': '10.0.0.1' }));
    expect(res.status).toBe(400);
  });

  it('silently accepts and drops honeypot (bot) submissions without emailing', async () => {
    const res = await POST(
      makeRequest(
        { ...validPayload, website: 'http://spam.example' },
        { 'x-forwarded-for': '10.0.0.2' }
      )
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns 400 with details when required fields are missing', async () => {
    const res = await POST(
      makeRequest({ ...validPayload, name: '', email: '' }, { 'x-forwarded-for': '10.0.0.3' })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('Validation failed');
    expect(Array.isArray(body.details)).toBe(true);
    expect(body.details).toContain('Name is required.');
  });

  it('returns 400 when the email format is invalid', async () => {
    const res = await POST(
      makeRequest({ ...validPayload, email: 'not-an-email' }, { 'x-forwarded-for': '10.0.0.4' })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.details).toContain('Email format is invalid.');
  });

  it('blocks disposable email domains before any network call', async () => {
    const res = await POST(
      makeRequest(
        { ...validPayload, email: 'throwaway@mailinator.com' },
        { 'x-forwarded-for': '10.0.0.5' }
      )
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe('EMAIL_VERIFICATION_FAILED');
    expect(body.reason).toBe('disposable_domain');
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

describe('POST /api/estimate — rate limiting', () => {
  it('returns 429 after the per-IP limit is exceeded', async () => {
    process.env.ESTIMATE_RATE_LIMIT_MAX = '3';
    const ip = '203.0.113.7';
    const statuses = [];
    for (let i = 0; i < 4; i += 1) {
      const res = await POST(makeRequest(validPayload, { 'x-forwarded-for': ip }));
      statuses.push(res.status);
    }
    expect(statuses.slice(0, 3)).toEqual([200, 200, 200]);
    expect(statuses[3]).toBe(429);
  });
});

describe('POST /api/estimate — successful submission', () => {
  it('sends a lead + confirmation email and HTML-escapes user input', async () => {
    const res = await POST(
      makeRequest({ ...validPayload, name: '<b>Jane</b>' }, { 'x-forwarded-for': '198.51.100.1' })
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const [leadCall, confirmCall] = global.fetch.mock.calls;
    const leadBody = JSON.parse(leadCall[1].body);
    expect(leadBody.html).toContain('&lt;b&gt;Jane&lt;/b&gt;');
    expect(leadBody.html).not.toContain('<b>Jane</b>');
    expect(leadBody.reply_to).toBe('jane@example.com');

    // Idempotency keys share a content hash but differ by email purpose.
    const leadKey = leadCall[1].headers['Idempotency-Key'];
    const confirmKey = confirmCall[1].headers['Idempotency-Key'];
    expect(leadKey).toMatch(/-lead$/);
    expect(confirmKey).toMatch(/-confirm$/);
    expect(leadKey.replace(/-lead$/, '')).toBe(confirmKey.replace(/-confirm$/, ''));
  });

  it('still succeeds when the confirmation email fails (best-effort)', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(resendOk()) // lead
      .mockResolvedValueOnce(resendErr(400)); // confirmation fails
    const res = await POST(makeRequest(validPayload, { 'x-forwarded-for': '198.51.100.2' }));
    expect(res.status).toBe(200);
  });
});

describe('POST /api/estimate — resilience', () => {
  it('retries the lead email on a transient 5xx and then succeeds', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(resendErr(500)) // lead attempt 1 (transient)
      .mockResolvedValueOnce(resendOk()) // lead attempt 2 (recovered)
      .mockResolvedValueOnce(resendOk()); // confirmation
    const res = await POST(makeRequest(validPayload, { 'x-forwarded-for': '198.51.100.3' }));
    expect(res.status).toBe(200);
    expect(global.fetch.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it('returns 502 when the lead email is rejected with a non-retryable 4xx', async () => {
    global.fetch = vi.fn(async () => resendErr(422));
    const res = await POST(makeRequest(validPayload, { 'x-forwarded-for': '198.51.100.4' }));
    expect(res.status).toBe(502);
  });

  it('returns 500 when the upstream request keeps throwing', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('network down');
    });
    const res = await POST(makeRequest(validPayload, { 'x-forwarded-for': '198.51.100.5' }));
    expect(res.status).toBe(500);
  });
});

// Routes a verifier (AbstractAPI) request to a stubbed response and everything
// else to Resend, so we can exercise the provider-verification branches.
const routedFetch = (verifierResponse) =>
  vi.fn(async (url) => {
    if (String(url).includes('abstractapi.com')) {
      return {
        ok: true,
        status: 200,
        json: async () => verifierResponse,
        text: async () => JSON.stringify(verifierResponse),
      };
    }
    return resendOk();
  });

describe('POST /api/estimate — email verification provider', () => {
  it('passes when the provider reports the address deliverable', async () => {
    process.env.EMAIL_VERIFIER_API_KEY = 'verifier_key';
    global.fetch = routedFetch({
      deliverability: 'DELIVERABLE',
      is_disposable_email: { value: false },
      is_valid_format: { value: true },
      is_mx_found: { value: true },
      is_smtp_valid: { value: true },
    });
    const res = await POST(makeRequest(validPayload, { 'x-forwarded-for': '198.51.100.10' }));
    expect(res.status).toBe(200);
    expect(global.fetch.mock.calls.some(([u]) => String(u).includes('abstractapi.com'))).toBe(true);
  });

  it('rejects when the provider flags the address as disposable', async () => {
    process.env.EMAIL_VERIFIER_API_KEY = 'verifier_key';
    global.fetch = routedFetch({ is_disposable_email: { value: true } });
    const res = await POST(
      makeRequest(
        { ...validPayload, email: 'someone@gmail.com' },
        { 'x-forwarded-for': '198.51.100.11' }
      )
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.reason).toBe('disposable_provider');
  });

  it('allows disposable domains when blocking is disabled via env', async () => {
    process.env.ESTIMATE_BLOCK_DISPOSABLE_EMAILS = 'false';
    const res = await POST(
      makeRequest(
        { ...validPayload, email: 'x@mailinator.com' },
        { 'x-forwarded-for': '198.51.100.13' }
      )
    );
    expect(res.status).toBe(200);
  });

  it('rejects when the provider reports the address undeliverable', async () => {
    process.env.EMAIL_VERIFIER_API_KEY = 'verifier_key';
    global.fetch = routedFetch({
      deliverability: 'UNDELIVERABLE',
      is_disposable_email: { value: false },
      is_valid_format: { value: true },
      is_mx_found: { value: true },
      is_smtp_valid: { value: true },
    });
    const res = await POST(makeRequest(validPayload, { 'x-forwarded-for': '198.51.100.14' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.reason).toBe('undeliverable_provider');
  });

  it('falls back to a DNS check when the provider call fails', async () => {
    process.env.EMAIL_VERIFIER_API_KEY = 'verifier_key';
    global.fetch = vi.fn(async (url) =>
      String(url).includes('abstractapi.com')
        ? { ok: false, status: 500, json: async () => ({}), text: async () => '' }
        : resendOk()
    );
    const res = await POST(makeRequest(validPayload, { 'x-forwarded-for': '198.51.100.15' }));
    expect(res.status).toBe(200);
  });

  it('rejects when no verifier key is set and the domain has no DNS records', async () => {
    dns.resolveMx.mockResolvedValueOnce([]);
    dns.resolve4.mockResolvedValueOnce([]);
    dns.resolve6.mockResolvedValueOnce([]);
    const res = await POST(
      makeRequest(
        { ...validPayload, email: 'user@no-records.example' },
        { 'x-forwarded-for': '198.51.100.12' }
      )
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.reason).toBe('no_dns_records');
  });
});

describe('POST /api/estimate — client IP + i18n branches', () => {
  it('falls back to x-real-ip when x-forwarded-for is absent', async () => {
    const res = await POST(makeRequest(validPayload, { 'x-real-ip': '198.51.100.20' }));
    expect(res.status).toBe(200);
  });

  it('handles requests with no forwarding headers (unknown IP)', async () => {
    const req = new Request('http://localhost/api/estimate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(validPayload),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it('renders Spanish copy and preserves line breaks in the procedure', async () => {
    const res = await POST(
      makeRequest(
        { ...validPayload, language: 'es', procedure: 'Linea uno\nLinea dos' },
        { 'x-forwarded-for': '198.51.100.21' }
      )
    );
    expect(res.status).toBe(200);
    const [leadCall, confirmCall] = global.fetch.mock.calls;
    expect(JSON.parse(leadCall[1].body).html).toContain('<br />');
    expect(JSON.parse(confirmCall[1].body).subject).toContain('Recibimos');
  });
});

describe('OPTIONS /api/estimate — CORS preflight', () => {
  it('echoes an allowed origin', async () => {
    const req = new Request('http://localhost/api/estimate', {
      method: 'OPTIONS',
      headers: { origin: 'https://www.myhealthhaven.org' },
    });
    const res = await OPTIONS(req);
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://www.myhealthhaven.org');
  });

  it('does not set CORS headers for a disallowed origin', async () => {
    const req = new Request('http://localhost/api/estimate', {
      method: 'OPTIONS',
      headers: { origin: 'https://evil.example' },
    });
    const res = await OPTIONS(req);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });
});
