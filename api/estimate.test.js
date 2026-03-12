import { describe, expect, it } from 'vitest';
import handler, {
  extractEmailDomain,
  isDisposableEmailDomain,
  sanitizeEstimatePayload,
  validateEstimatePayload,
  verifyEmailDeliverability,
} from './estimate.js';

const createMockRes = () => {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
  };

  res.setHeader = (key, value) => {
    res.headers[key] = value;
  };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    res.body = payload;
    return res;
  };
  res.end = () => res;

  return res;
};

describe('estimate API helpers', () => {
  it('sanitizes payload fields and normalizes email casing', () => {
    const payload = sanitizeEstimatePayload({
      name: '  Sergio   Lopez  ',
      email: '  USER@EXAMPLE.COM ',
      phone: '  +1 555 111 2222 ',
      state: ' Texas ',
      city: ' Houston ',
      procedure: '  Knee replacement  ',
      language: ' en ',
    });

    expect(payload).toMatchObject({
      name: 'Sergio Lopez',
      email: 'user@example.com',
      phone: '+15551112222',
      state: 'Texas',
      city: 'Houston',
      procedure: 'Knee replacement',
      language: 'en',
    });
  });

  it('returns validation errors for missing required fields', () => {
    const errors = validateEstimatePayload(
      sanitizeEstimatePayload({
        name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        procedure: '',
      })
    );

    expect(errors).toContain('Name is required.');
    expect(errors).toContain('Email is required.');
    expect(errors).toContain('Phone number is required.');
    expect(errors).toContain('State is required.');
    expect(errors).toContain('City is required.');
    expect(errors).toContain('Procedure details are required.');
  });

  it('rejects malformed email format', () => {
    const errors = validateEstimatePayload(
      sanitizeEstimatePayload({
        name: 'Sergio',
        email: 'bad-email',
        phone: '123456',
        state: 'Texas',
        city: 'Houston',
        procedure: 'Test',
      })
    );

    expect(errors).toContain('Email format is invalid.');
  });

  it('rejects malformed phone format', () => {
    const errors = validateEstimatePayload(
      sanitizeEstimatePayload({
        name: 'Sergio',
        email: 'user@example.com',
        phone: '+',
        state: 'Texas',
        city: 'Houston',
        procedure: 'Test',
      })
    );

    expect(errors).toContain('Phone number format is invalid.');
  });

  it('extracts an email domain in lowercase', () => {
    expect(extractEmailDomain('USER@Example.COM')).toBe('example.com');
  });

  it('detects known disposable email domains', () => {
    expect(isDisposableEmailDomain('mailinator.com')).toBe(true);
    expect(isDisposableEmailDomain('example.com')).toBe(false);
  });

  it('rejects disposable emails during deliverability checks', async () => {
    const result = await verifyEmailDeliverability('person@mailinator.com', {
      emailVerifierApiKey: '',
    });

    expect(result).toEqual({ ok: false, reason: 'disposable_domain' });
  });

  it('accepts emails with DNS records during deliverability checks', async () => {
    const result = await verifyEmailDeliverability('person@example.com', {
      emailVerifierApiKey: '',
      resolveMxFn: async () => [{ exchange: 'mx.example.com', priority: 10 }],
    });

    expect(result).toEqual({ ok: true, source: 'dns' });
  });

  it('rejects emails with no DNS records during deliverability checks', async () => {
    const notFound = async () => {
      throw new Error('ENOTFOUND');
    };
    const result = await verifyEmailDeliverability('person@missing-domain.test', {
      emailVerifierApiKey: '',
      resolveMxFn: notFound,
      resolve4Fn: notFound,
      resolve6Fn: notFound,
    });

    expect(result).toEqual({ ok: false, reason: 'no_dns_records' });
  });

  it('rejects unsupported HTTP methods', async () => {
    const req = { method: 'GET', headers: {} };
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res.headers.Allow).toBe('POST, OPTIONS');
    expect(res.body).toEqual({ error: 'Method not allowed' });
  });

  it('handles CORS preflight requests', async () => {
    const req = { method: 'OPTIONS', headers: {} };
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(204);
  });
});
