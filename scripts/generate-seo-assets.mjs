import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_ORIGIN,
  SITEMAP_ROUTE_DEFINITIONS,
  getCanonicalUrl,
} from '../src/seo/siteSeo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const publicDir = path.join(repoRoot, 'public');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ROUTE_DEFINITIONS.map(
  (route) => `  <url>
    <loc>${getCanonicalUrl(route.path)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Disallow: /api/

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
await writeFile(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
