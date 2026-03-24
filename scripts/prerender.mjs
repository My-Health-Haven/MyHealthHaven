import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PRERENDER_ROUTES } from '../src/seo/siteSeo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const distDir = path.join(repoRoot, 'dist');
const ssrOutDir = path.join(repoRoot, 'dist-ssr');
const ssrEntryPath = path.join(ssrOutDir, 'entry-server.js');

const rootDivPattern = /<div id="root"><\/div>/;
const htmlTagPattern = /<html[^>]*>/i;
const headClosePattern = /<\/head>/i;
const defaultSeoTagPattern =
  /<title[^>]*data-seo-default[^>]*>[\s\S]*?<\/title>|<meta[^>]*data-seo-default[^>]*>|<link[^>]*data-seo-default[^>]*>/gi;

const buildHtmlTag = (htmlAttributes = '') => {
  const trimmedAttributes = htmlAttributes.trim();
  return trimmedAttributes
    ? `<html ${trimmedAttributes} data-prerendered="true">`
    : '<html data-prerendered="true">';
};

const getOutputPath = (routePath) => {
  if (routePath === '/') {
    return path.join(distDir, 'index.html');
  }

  const normalized = routePath.replace(/^\/+/, '');
  return path.join(distDir, normalized, 'index.html');
};

const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
await writeFile(path.join(distDir, 'spa.html'), template, 'utf8');

const { render } = await import(pathToFileURL(ssrEntryPath).href);

for (const routePath of PRERENDER_ROUTES) {
  const { appHtml, helmet } = render(routePath);
  const htmlAttributes = helmet?.htmlAttributes?.toString?.() || '';
  const headMarkup = [
    helmet?.title?.toString?.() || '',
    helmet?.meta?.toString?.() || '',
    helmet?.link?.toString?.() || '',
    helmet?.script?.toString?.() || '',
  ].join('');

  const pageHtml = template
    .replace(defaultSeoTagPattern, '')
    .replace(htmlTagPattern, buildHtmlTag(htmlAttributes))
    .replace(rootDivPattern, `<div id="root">${appHtml}</div>`)
    .replace(headClosePattern, `${headMarkup}\n  </head>`);

  const outputPath = getOutputPath(routePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, pageHtml, 'utf8');
}

await rm(ssrOutDir, { recursive: true, force: true });
