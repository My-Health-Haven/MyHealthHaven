import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== 'production';

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev && "'unsafe-eval'",
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
]
  .filter(Boolean)
  .join(' ');

const connectSrc = [
  "'self'",
  isDev && 'ws:',
  isDev && 'wss:',
  'https://www.google-analytics.com',
  'https://*.analytics.google.com',
  'https://*.googletagmanager.com',
  'https://api.resend.com',
  'https://emailvalidation.abstractapi.com',
]
  .filter(Boolean)
  .join(' ');

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  `script-src ${scriptSrc}`,
  `connect-src ${connectSrc}`,
  "frame-src 'self' https://www.google.com https://maps.google.com https://calendar.google.com",
  "media-src 'self' blob:",
  "manifest-src 'self'",
  !isDev && 'upgrade-insecure-requests',
]
  .filter(Boolean)
  .join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Pin the workspace root so Turbopack ignores unrelated lockfiles elsewhere
  // on the machine (e.g. a stray package-lock.json in the user's home dir).
  turbopack: { root: projectRoot },

  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/estimate',
        permanent: true,
      },
      // Library articles moved from flat /library/[slug] to nested
      // /library/getting-started/[slug]. Preserve the original URLs.
      {
        source: '/library/is-medical-travel-right-for-me',
        destination: '/library/getting-started/is-medical-travel-right-for-me',
        permanent: true,
      },
      {
        source: '/library/how-we-vet-hospitals',
        destination: '/library/getting-started/how-we-vet-hospitals',
        permanent: true,
      },
      {
        source: '/library/talking-to-your-us-doctor',
        destination: '/library/getting-started/talking-to-your-us-doctor',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value:
              'geolocation=(), microphone=(), camera=(), payment=(), usb=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'application/xml; charset=utf-8' },
          { key: 'Cache-Control', value: 'max-age=0, s-maxage=3600' },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'max-age=0, s-maxage=3600' },
        ],
      },
    ];
  },
};

export default nextConfig;
