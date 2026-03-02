import { describe, expect, it } from 'vitest';
import handler, { sanitizeEstimatePayload, validateEstimatePayload } from './estimate.js';

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
      phone: '+1 555 111 2222',
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
