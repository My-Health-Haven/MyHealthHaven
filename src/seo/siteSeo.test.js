import { describe, expect, it } from 'vitest';
import {
  PRERENDER_ROUTES,
  SITEMAP_ROUTE_DEFINITIONS,
  getCanonicalUrl,
  normalizePath,
} from './siteSeo';

describe('siteSeo', () => {
  it('normalizes public paths consistently', () => {
    expect(normalizePath('about/')).toBe('/about');
    expect(normalizePath('/library//how-we-vet-hospitals?preview=true')).toBe(
      '/library/how-we-vet-hospitals'
    );
    expect(normalizePath('/')).toBe('/');
  });

  it('builds absolute canonical URLs', () => {
    expect(getCanonicalUrl('/about')).toBe('https://www.myhealthhaven.org/about');
    expect(getCanonicalUrl('library')).toBe('https://www.myhealthhaven.org/library');
  });

  it('includes core public routes in the sitemap', () => {
    const sitemapPaths = SITEMAP_ROUTE_DEFINITIONS.map((route) => route.path);

    expect(sitemapPaths).toContain('/about');
    expect(sitemapPaths).toContain('/employers');
    expect(sitemapPaths).not.toContain('/providers');
  });

  it('prerenders marketing and library routes', () => {
    expect(PRERENDER_ROUTES).toContain('/');
    expect(PRERENDER_ROUTES).toContain('/library');
    expect(PRERENDER_ROUTES).toContain('/library/is-medical-travel-right-for-me');
  });
});
