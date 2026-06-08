import { describe, expect, it } from 'vitest';
import { SITEMAP_ROUTE_DEFINITIONS, getCanonicalUrl, normalizePath } from './siteSeo';

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
    expect(sitemapPaths).toContain('/providers');
  });

  it('includes the library and its category hub in the sitemap', () => {
    const sitemapPaths = SITEMAP_ROUTE_DEFINITIONS.map((route) => route.path);
    expect(sitemapPaths).toContain('/');
    expect(sitemapPaths).toContain('/library');
    expect(sitemapPaths).toContain('/library/getting-started');
  });

  it('includes nested library articles in the sitemap', () => {
    const sitemapPaths = SITEMAP_ROUTE_DEFINITIONS.map((route) => route.path);
    expect(sitemapPaths).toContain('/library/getting-started/is-medical-travel-right-for-me');
  });
});
