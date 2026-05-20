export const PHONE_MAX_DIGITS: number = 15;
export const PHONE_MAX_LENGTH: number = PHONE_MAX_DIGITS + 1;

export const PHONE_REGEX: RegExp = /^\+?\d{7,15}$/;
export const EMAIL_REGEX: RegExp =
  /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9]))+$/;

export const isValidEmail = (value?: string): boolean =>
  EMAIL_REGEX.test(String(value ?? '').trim());

export const isValidPhone = (value?: string): boolean =>
  PHONE_REGEX.test(String(value ?? '').trim());

export const sanitizePhone = (value?: string): string => {
  const str = String(value ?? '').trim();
  const hasLeadingPlus = str.startsWith('+');
  const digitsOnly = str.replace(/\D/g, '').slice(0, PHONE_MAX_DIGITS);
  return `${hasLeadingPlus ? '+' : ''}${digitsOnly}`;
};
