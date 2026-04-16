import { SITE_ORIGIN } from '@/lib/siteSeo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
