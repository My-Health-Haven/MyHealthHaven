import { SITEMAP_ROUTE_DEFINITIONS, SITE_ORIGIN } from '@/lib/siteSeo';

export default function sitemap() {
  return SITEMAP_ROUTE_DEFINITIONS.map((route) => ({
    url: `${SITE_ORIGIN}${route.path}`,
    lastModified: route.lastmod,
    changeFrequency: route.changefreq,
    priority: Number(route.priority),
  }));
}
