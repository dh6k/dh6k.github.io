# gh.dh6k.vip

Personal bilingual site for dh6k: technology notes, useful links, and preserved archives.

Live: <https://gh.dh6k.vip>

## Stack

Plain GitHub Pages Jekyll. Shared layouts live in `_layouts/`; styling lives in `assets/css/site.css`. No JavaScript, analytics, or runtime translation.

## Local development

With Ruby and Bundler installed:

```bash
bundle install
bundle exec jekyll serve
# or: bundle exec jekyll build
```

Build output goes to generated `_site/` (ignored). GitHub Pages deploys `main` with `CNAME` unchanged.

## Structure

- `/`, `/vi/`, `/en/` — landing and bilingual profile pages
- `/mov/`, `/suggested-filter/`, `/tm/`, `/tmv/` — preserved utility notes
- `emoji/` — legacy emoji payloads; paths and JSON remain unchanged
- `_layouts/`, `_config.yml`, `assets/` — site system
- `scripts/validate.mjs` — dependency-free source validator (`npm test`)

Markdown pages use front matter for title, language, description, permalink, and shared metadata. Update paired Vietnamese/English pages together where translations exist.

## License

AGPL-3.0-only. See [LICENSE](LICENSE).
