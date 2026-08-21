import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const required = [
  'CNAME', '_config.yml', 'index.md', 'en/index.md', 'vi/index.md',
  'mov.md', 'suggested-filter.md', 'tm.md', 'tmv.md', '404.html',
  '_layouts/default.html', '_layouts/page.html', 'assets/css/site.css',
  'assets/favicon.svg', 'robots.txt', 'DESIGN.md'
];
const routes = new Map([
  ['index.md', '/'], ['en/index.md', '/en/'], ['vi/index.md', '/vi/'],
  ['mov.md', '/mov/'], ['suggested-filter.md', '/suggested-filter/'],
  ['tm.md', '/tm/'], ['tmv.md', '/tmv/'], ['404.html', '/404.html']
]);
const obsolete = ['en.md', 'vi.md', 'en.yml', 'vi.yml', 'mov.yml', 'suggested-filter.yml', 'tm.yml', 'tmv.yml'];

for (const file of required) await access(join(root, file));
if ((await readFile(join(root, 'CNAME'), 'utf8')).trim() !== 'gh.dh6k.vip') throw new Error('CNAME must remain gh.dh6k.vip');

const sources = new Map();
for (const file of required.filter(file => /\.(?:md|html)$/.test(file))) sources.set(file, await readFile(join(root, file), 'utf8'));
for (const [file, permalink] of routes) {
  const source = sources.get(file);
  if (!source?.startsWith('---\n')) throw new Error(`missing front matter: ${file}`);
  if (!source.includes(`permalink: ${permalink}`)) throw new Error(`wrong or missing permalink in ${file}: ${permalink}`);
}

const layout = sources.get('_layouts/default.html');
for (const token of ['theme-color', 'canonical', 'og:type', 'twitter:card', '| escape', 'skip-link', 'site.repository']) {
  if (!layout.includes(token)) throw new Error(`missing layout metadata/accessibility token: ${token}`);
}
if (/href=["']www\./i.test([...sources.values()].join('\n'))) throw new Error('malformed href without scheme');

const knownRoutes = new Set([...routes.values(), '/assets/favicon.svg', '/assets/css/site.css', '/sitemap.xml']);
const hrefPattern = /href=["'](\/[^"'#?]*)/g;
for (const [file, source] of sources) {
  for (const match of source.matchAll(hrefPattern)) {
    const href = match[1];
    if (!knownRoutes.has(href) && !href.startsWith('/emoji/')) throw new Error(`unknown internal route ${href} in ${file}`);
  }
}
for (const file of obsolete) {
  try { await access(join(root, file)); throw new Error(`obsolete file remains: ${file}`); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}

const emojiFiles = await readdir(join(root, 'emoji'));
if (!emojiFiles.length) throw new Error('emoji compatibility assets missing');
console.log('validated source files, exact permalinks, metadata tokens, internal routes, CNAME, and legacy cleanup');
