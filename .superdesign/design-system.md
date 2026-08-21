# gh.dh6k.vip design system

## Product context

Personal bilingual tech homepage for dh6k. Visitors need identity, interests, projects/archives, blogs, resources, language switching, and one restrained contact path. Static Jekyll output must remain fast and maintainable.

## Principles

1. Personal web, not SaaS landing page.
2. Typography and hierarchy do most visual work.
3. Dense enough to scan; calm enough to read.
4. Real content only. No metrics, testimonials, or invented claims.
5. Native HTML and CSS before JavaScript.

## Foundation

- System UI body; system monospace for metadata and technical labels.
- Near-black foundation, high-contrast warm-white text, muted gray, controlled magenta `#ff3d91` accent.
- Small token scale: 4, 8, 12, 16, 24, 32, 48, 72, 96px.
- Containers: 1120px shell, 760px reading width, 24px gutters; collapse to 16px at narrow mobile.
- Fine 1px borders; 0–8px radius only when shape improves affordance; no glassmorphism.
- No large shadows. One restrained accent glow allowed for focus/identity only.

## Components and states

- Header: compact brand plus VI/EN and utility links; wraps cleanly at 360px.
- Campaign banner: self-hosted GPL-3.0-derived script with embedded dark surface, magenta rule, mono text, and 44px close control.
- Links: underlined in content; nav links use clear active state and visible focus.
- Buttons: solid accent primary, bordered neutral secondary; minimum 44px touch target.
- Sections: editorial dividers and numbered mono labels. Cards only for grouped interactive content.
- Articles: readable line length, strong heading ladder, wrapping long URLs and scrollable code blocks.
- Focus: 2px accent outline with 3–4px offset. Hover never sole signal.

## Motion and themes

- Dark-first only; no token-incomplete light mode.
- Transitions limited to color, border, and small translate under 180ms.
- `prefers-reduced-motion` removes nonessential motion.

## Accessibility

- WCAG 2.2 AA contrast target, semantic landmarks, one H1, language metadata, and 44px touch targets.
- Mobile checks at 360, 390–430; tablet 768; desktop 1024 and 1440+.
