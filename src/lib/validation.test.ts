import { describe, expect, it } from 'vitest';
import {
  EMAIL_REGEX,
  PHONE_MAX_DIGITS,
  PHONE_REGEX,
  isValidEmail,
  isValidPhone,
  sanitizePhone,
} from './validation';

describe('isValidEmail', () => {
  it('accepts well-formed addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('first.last+tag@sub.domain.co')).toBe(true);
  });

  it('rejects malformed addresses', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('plainaddress')).toBe(false);
    expect(isValidEmail('no-at-sign.com')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('user@example')).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });

  it('trims surrounding whitespace before validating', () => {
    expect(isValidEmail('  user@example.com  ')).toBe(true);
  });

  it('exposes a reusable regex', () => {
    expect(EMAIL_REGEX.test('user@example.com')).toBe(true);
  });
});

describe('isValidPhone', () => {
  it('accepts 7-15 digit numbers with an optional leading plus', () => {
    expect(isValidPhone('2142763928')).toBe(true);
    expect(isValidPhone('+12142763928')).toBe(true);
    expect(isValidPhone('1234567')).toBe(true);
  });

  it('rejects numbers that are too short, too long, or non-numeric', () => {
    expect(isValidPhone('')).toBe(false);
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('+1234567890123456')).toBe(false);
    expect(isValidPhone('214-276-3928')).toBe(false);
    expect(isValidPhone(undefined)).toBe(false);
  });

  it('exposes a reusable regex', () => {
    expect(PHONE_REGEX.test('+12142763928')).toBe(true);
  });
});

describe('sanitizePhone', () => {
  it('strips non-digit characters while preserving a leading plus', () => {
    expect(sanitizePhone('+1 (214) 276-3928')).toBe('+12142763928');
    expect(sanitizePhone('(214) 276-3928')).toBe('2142763928');
  });

  it('caps the number of digits at PHONE_MAX_DIGITS', () => {
    const result = sanitizePhone('1234567890123456789');
    expect(result).toBe('1'.length ? result : result);
    expect(result.replace('+', '')).toHaveLength(PHONE_MAX_DIGITS);
  });

  it('handles nullish input', () => {
    expect(sanitizePhone(undefined)).toBe('');
    expect(sanitizePhone('')).toBe('');
  });
});
