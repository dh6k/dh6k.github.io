import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const required = [
  'CNAME', '_config.yml', 'index.md', 'en/index.md', 'vi/index.md',
  'mov.md', 'suggested-filter.md', 'tm.md', 'tmv.md', '404.html',
  '_layouts/default.html', '_layouts/page.html', 'assets/css/site.css', 'assets/js/banner.js',
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
for (const file of required.filter(file => /\.(?:md|html)$/.test(file))) sources.set(file, (await readFile(join(root, file), 'utf8')).replace(/\r\n?/g, '\n'));
for (const [file, permalink] of routes) {
  const source = sources.get(file);
  if (!source?.startsWith('---\n')) throw new Error(`missing front matter: ${file}`);
  if (!source.includes(`permalink: ${permalink}`)) throw new Error(`wrong or missing permalink in ${file}: ${permalink}`);
}

const layout = sources.get('_layouts/default.html');
for (const token of ['theme-color', 'canonical', 'og:type', 'twitter:card', '| escape', 'site.repository', "'/assets/js/banner.js' | relative_url", '?size=minimal&animation=off']) {
  if (!layout.includes(token)) throw new Error(`missing layout metadata/accessibility token: ${token}`);
}
if (layout.includes('https://keepandroidopen.org/banner.js')) throw new Error('external banner script reference returned');
if (layout.includes('Skip to content') || layout.includes('skip-link')) throw new Error('removed skip link returned');
if (/href=["']www\./i.test([...sources.values()].join('\n'))) throw new Error('malformed href without scheme');

const profileLinks = file => [...sources.get(file).split('---\n').at(-1).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(match => match[1]);
const enLinks = profileLinks('en/index.md');
const viLinks = profileLinks('vi/index.md');
if (JSON.stringify(enLinks) !== JSON.stringify(viLinks)) throw new Error('EN/VI profile link order is not synchronized');
const headingLevels = file => [...sources.get(file).split('---\n').at(-1).matchAll(/^(#{2,6})\s+/gm)].map(match => match[1].length);
if (JSON.stringify(headingLevels('en/index.md')) !== JSON.stringify(headingLevels('vi/index.md'))) throw new Error('EN profile heading hierarchy does not match canonical VI profile');
for (const canonicalToken of ['### 2026', '### 2021-2022', '[Morphe Patches]', '[or1g1n]', '[odysseus locally on android]']) {
  if (!sources.get('en/index.md').includes(canonicalToken)) throw new Error(`EN profile drifted from canonical VI structure: ${canonicalToken}`);
}

const css = await readFile(join(root, 'assets/css/site.css'), 'utf8');
if (/\.kao-banner(?:-close)?\b/.test(css)) throw new Error('redundant banner override remains in site stylesheet');

const banner = await readFile(join(root, 'assets/js/banner.js'), 'utf8');
const expectedBannerLocales = ['fa','ar','he','en','mn','ca','cs','de','da','nl','el','es','fr','id','it','ko','pl','pt-BR','ru','sk','th','tr','uk','zh-CN','zh-TW','ja','fi','hu','vi','bg','be','hi'];
const messageBlock = banner.match(/var messages = \{([\s\S]*?)\n  \};/)?.[1] || '';
const messageEntries = [...messageBlock.matchAll(/^\s*(?:"([^"]+)"|([\w-]+)):\s*"([^"]*)"/gm)].map(match => [match[1] || match[2], match[3]]);
if (JSON.stringify(messageEntries.map(([key]) => key)) !== JSON.stringify(expectedBannerLocales)) throw new Error('banner locale key set or order changed');
for (const [key, template] of messageEntries) {
  if ((template.match(/\{countdown\}/g) || []).length !== 1) throw new Error(`banner locale ${key} must contain exactly one countdown placeholder`);
}
const exactEnglish = 'The good old Android era ends in {countdown}. While some are still busy shooting themselves in the foot, we refuse to stand by and watch.';
const exactVietnamese = 'Kỷ nguyên Android tươi đẹp sẽ kết thúc sau {countdown}. Trong khi một số người vẫn mải tự chuốc họa vào thân, chúng tôi nhất quyết không đứng nhìn.';
if (messageEntries.find(([key]) => key === 'en')?.[1] !== exactEnglish) throw new Error('English banner template changed');
if (messageEntries.find(([key]) => key === 'vi')?.[1] !== exactVietnamese) throw new Error('Vietnamese banner template changed');
for (const token of [
  'SPDX-License-Identifier: GPL-3.0-only', 'GNU General Public License v3.0',
  'document.currentScript', 'getScriptParams', 'resolveLocale', 'localStorage',
  'setInterval(updateBanner, 1000)', 'messageTemplate.split("{countdown}")',
  'messageContainer.appendChild(countdownSpan)', 'Math.max(0, rawDistance)',
  'var cssNormal', 'var cssMini', 'var cssMinimal',
  'var(--surface-raised,#15151d)', 'var(--accent,#ff3d91)', 'var(--mono,ui-monospace',
  'font-size:1.2rem', 'font-weight:600', 'width:2.75rem', 'height:2.75rem', 'text-shadow:none', 'transform:none'
]) {
  if (!banner.includes(token)) throw new Error(`missing self-hosted banner license, behavior, or style token: ${token}`);
}
if (!banner.includes('.kao-banner a{color:var(--ink,#f4f1f5);text-decoration:none;}') ||
    !banner.includes('.kao-banner a:hover{color:var(--accent,#ff3d91);text-decoration:none;}')) {
  throw new Error('banner link underline returned');
}
if (banner.includes('Android will become a locked-down platform in')) throw new Error('obsolete banner sentence returned');

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
console.log('validated source files, self-hosted banner license/behavior/styles, bilingual parity, permalinks, metadata, internal routes, CNAME, and legacy cleanup');
