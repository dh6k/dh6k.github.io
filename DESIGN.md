# Swiss Grid Knowledge Hub

Production direction for `gh.dh6k.vip`: personal, bilingual, dark-first knowledge index. Typography, fine rules, and compact rows create hierarchy; interface must never resemble a SaaS dashboard.

## Foundations

- Near-black `#0b0b0f`, warm white `#f4f1f5`, muted gray `#aaa5af`, magenta `#ff3d91`.
- System UI text; system monospace for labels and metadata.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 72, 96px.
- Shell width 1120px; article width 760px; gutters 16–24px.
- Fine 1px rules. Square controls. No large shadows, glass, gradients on content panels, or card nesting.

## Type and layout

- One H1 per page. Hero H1 uses fluid 38–64px; article H1 32–48px; section titles stay at 21–24px.
- Body 16px/1.7; lead 17–20px; mono labels 11px with wide tracking.
- Homepage uses two-column grid above 768px and one column below. Wide sections span both columns.
- Breakpoints: 640px for compact header/actions; 768px for content grid. Layout remains bounded at 1440px+.

## Components

- Header: brand, VI/EN, Filters, MOV. Current page has magenta underline.
- Buttons: solid magenta primary, outlined secondary, 44px minimum height.
- Row list: name left, technical label right; stacks on narrow screens.
- Article: context navigation, label, title, description, prose. Long links wrap; code blocks scroll.
- Footer: language, sitemap, and real GitHub source links.
- Campaign banner: self-hosted GPL-3.0-derived `assets/js/banner.js`; its injected CSS owns site surface, magenta divider, mono text, and 44px close target.

## Interaction and accessibility

- Links remain underlined in prose. Row links reveal underline and accent on hover/focus.
- Focus uses 2px magenta outline with 4px offset.
- Native semantic landmarks, correct document language, `hreflang`, one H1, and 44px targets.
- Motion limited to optional color/border transitions; reduced-motion setting wins.

## Adding pages

Use `layout: page`, truthful title/description/lang/permalink, and `alternate_*` fields only for real translations. Start content at paragraph or H2 because layout owns H1. Reuse row lists and existing tokens; add no JavaScript or dependency for presentation alone.
