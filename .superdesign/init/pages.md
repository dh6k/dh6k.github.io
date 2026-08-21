# Page dependency trees

## `/`

- `index.md`
  - `_layouts/default.html`
    - `assets/css/site.css`
    - `assets/favicon.svg`

## `/vi/` and `/en/`

- `vi/index.md` or `en/index.md`
  - `_layouts/page.html`
    - `_layouts/default.html`
      - `assets/css/site.css`
      - `assets/favicon.svg`

## Utility articles

- `mov.md`, `suggested-filter.md`, `tm.md`, or `tmv.md`
  - `_layouts/page.html`
    - `_layouts/default.html`
      - `assets/css/site.css`
