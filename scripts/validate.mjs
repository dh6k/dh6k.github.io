import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
const root = new URL('..', import.meta.url).pathname.replace(/^\/+([A-Z]:)/, '$1');
const must = ['CNAME','_config.yml','_layouts/default.html','_layouts/page.html','assets/css/site.css','assets/favicon.svg','index.md','vi/index.md','en/index.md','mov.md','suggested-filter.md','tm.md','tmv.md'];
for (const file of must) await access(join(root, file));
if ((await readFile(join(root,'CNAME'),'utf8')).trim() !== 'gh.dh6k.vip') throw Error('CNAME mismatch');
for (const file of ['vi/index.md','en/index.md','mov.md','suggested-filter.md','tm.md','tmv.md']) { const s=await readFile(join(root,file),'utf8'); if(!s.startsWith('---')) throw Error(`missing front matter: ${file}`); }
for (const file of ['en.md','vi.md','en.yml','vi.yml','mov.yml','suggested-filter.yml','tm.yml','tmv.yml']) { try { await access(join(root,file)); throw Error(`obsolete file remains: ${file}`); } catch (e) { if (e.code !== 'ENOENT') throw e; } }
console.log(`validated ${must.length} required files, routes, metadata, and cleanup invariants`);
