---
version: "superdesign-alpha"
name: "Terminal Black Signal"
description: "Near-black brutalist-monospace system on a single-hue near-black field, carried by oversized square-cornered display type and one rationed hot-pink accent used for emphasis, links, and borders."
colors:
  background: "#0B0B0F"
  surface: "#121219"
  text-primary: "#F4F1F5"
  text-secondary: "#A6A1AB"
  accent: "#FF3D91"
  border: "#292631"
typography:
  display-lg:
    fontFamily: "system-ui"
    fontSize: "112px"
    fontWeight: 700
    lineHeight: "0.95"
  headline-md:
    fontFamily: "system-ui"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "1.7"
  body-md:
    fontFamily: "ui-monospace"
    fontSize: "11px"
    fontWeight: 400
  label-mono:
    fontFamily: "ui-monospace"
    fontSize: "11px"
    fontWeight: 400
  accent-serif:
    fontFamily: "Times New Roman"
    fontStyle: "normal"
spacing:
  base: "10px"
  gap: "20px"
  section-padding: "28px"
rounded:
  control: "0px"
  card: "0px"
  pill: "0px"
components:
  button-primary:
    background: "#FF3D91"
    text-color: "#160B11"
    radius: "0px"
    height: "49px"
    padding: "10px 16px"
    border: "1px solid rgb(255, 61, 145)"
  button-secondary:
    background: "transparent"
    text-color: "#F4F1F5"
    radius: "0px"
    height: "49px"
    padding: "10px 16px"
    border: "1px solid rgb(255, 61, 145)"
  card-list:
    background: "transparent"
    radius: "0px"
    padding: "0px"
    border: "none"
---
# Terminal Black Signal
Source: https://gh.dh6k.vip/

## Overview
This is a brutalist, developer-console aesthetic: a near-black page treated as a terminal, with zero-radius rectangles, monospace eyebrow labels, and system-ui display type standing in for a hero image. There is no photography, no illustration, no card imagery anywhere in the sampled screens — hierarchy is built entirely from type scale, one accent hue, and hairline rules. The single hot-pink (#FF3D91) is deployed like a syntax highlighter: it marks the second half of the headline, every hyperlink, both button borders, and section-number labels, while the rest of the interface stays achromatic. This reads as an independent-web / personal-index sensibility crossed with Swiss-grid restraint — ragged left-aligned stacks, no shadows, no gradients beyond one faint radial wash pinned to a corner.

## Composition
The first screen opens on a thin top navbar, then a large two-line display headline (line one white, line two pink) sitting on generous top padding, a short body sentence, and a two-button row — all left-aligned against the same margin, never centered. Below the fold the page shifts to a numbered-list rhythm: each content band opens with a small monospace "0X / LABEL" eyebrow in pink, a bold sub-headline, then a plain bulleted list of pink underlined links with white trailing text. This alternation (numbered eyebrow → headline → link-list) repeats at least three times down the page, giving it a changelog/README cadence rather than a marketing-card cadence. The deliberate choice is text-as-interface with zero imagery; the rejected alternative is a conventional hero visual or card grid with screenshots — this system trusts type density and negative space instead.

## Colors
Background is a near-black `#0B0B0F` (declared token `--bg`), confirmed by the pixel field's dominant `#000018`/`#181818` near-black cluster — there is no lighter panel surface visibly distinguishing sections; `--panel: #121219` exists as a token but reads as effectively the same near-black in the screenshots. Text ink is `#F4F1F5`, an off-white, used for primary headline words and body copy. The single accent, `#FF3D91`, is rationed to: the second headline line in full, all inline links, both button fills/borders, and every "0X /" eyebrow label — never used as a background fill beyond the primary button and the corner gradient wash. Borders and rules use `#292631`, a barely-lighter-than-background hairline, keeping dividers nearly invisible except as separation, not decoration. Nothing else is colored — icons, arrows, and secondary text stay in ink or muted `#A6A1AB` tones.

## Typography
Display type is system-ui at 112px/700, line-height 0.95 — extremely tight leading that stacks two headline words per line with no visual air between them. Sub-headlines inside content bands use a 24px/700 weight at a much looser 1.7 line-height, giving them a spaced-out, label-like feel. Body copy sits at 16px/400. Eyebrow/meta labels are set in ui-monospace at 11px/400, all-caps, letterspaced — the clearest signature move distinguishing structural labels from content. Times New Roman appears as an accent family reserved for occasional serif interruption within otherwise system-ui text, functioning the way an italic clause would in a more conventional system. Hierarchy is: mono eyebrow (smallest, coded) → bold sans headline (largest, expressive) → bold sans sub-headline (medium, spaced) → regular sans body (readable, quiet).

## Layout
Content is constrained to a 1120px max-width, left-aligned, with no visible column grid — sections stack as single-column flows rather than multi-column card arrangements. Spacing uses an irregular hand-tuned set (16, 11, 20, 10, 28, 22px) rather than a strict multiple-of-8 scale, giving tight, dense vertical rhythm between eyebrow/headline/list groups. The measured "card family" is not a card at all: three link-list rows each spanning 96% of the container width, stacked full-bleed with no padding, no radius, and a transparent fill — effectively a uniform single-column list layout, not a grid of bounded cards. This confirms the whole page is list-first: whatever might elsewhere be a 3-up card row is instead three consecutive 96%-wide list rows.

## Components
- **Navbar**: edge-to-edge full-width bar, no visible fill separation from page background, height ~72px based on padding, bottom-bordered by a single `#292631` hairline running full width. Left: a two-tone wordmark-style logo (ink + pink inline). Right: a compact cluster of four plain-text items acting as language toggles and utility links, no button chrome, no CTA — this is a link-row, not a button-row.
- **Button — primary** (hero, first screen, left of the two-button row): solid `#FF3D91` fill, text `#160B11`, radius `0px` (sharp corners), height `49px`, padding `10px 16px`, border `1px solid rgb(255, 61, 145)`. This is the single most emphasized control on the page — solid, high-contrast pink against the near-black field, carrying an outbound-link glyph.
- **Button — secondary/outline** (hero, immediately right of primary): transparent fill, text `#F4F1F5`, identical radius `0px`, height `49px`, padding `10px 16px`, border `1px solid rgb(255, 61, 145)` — same sharp geometry and border color as primary but hollow, marking it as the alternate-language action rather than the main path.
- **Numbered content band** (repeats ×3+ down the page, one per section): anatomy top-to-bottom is a monospace pink eyebrow ("0X / LABEL" pattern), a bold white sub-headline, then a bulleted list of pink underlined links with trailing ink-colored descriptive text. No media, no icon, no card boundary — background transparent, radius `0px`, padding `0px`. Each list row spans ~96% of the 1120px container, three rows visible per band in the sampled section.
- **Footer**: transparent background, minimal — two text links only, no columns, no logo repeat, consistent with the page's link-list vocabulary rather than a multi-column sitemap footer.

## Graphics & Effects
The only graphical treatment is a single radial gradient, `radial-gradient(circle at 80% 0px, rgb(33, 18, 34) 0px, rgba(0, 0, 0, 0) 35%)`, anchored to the top-right corner of the page and fading out by 35% of its radius — this is a small corner wash, not a full-hero gradient; it reads as a faint plum-toned glow bleeding in from the top-right edge over the first screen only, leaving the remaining ~95% of the page flat near-black. No noise, no grain, no photographic texture, no blur/glass surfaces, and no shadows anywhere — elevation is communicated purely by the `#292631` hairline rule under the navbar, nothing else lifts off the page.

## Motion
No animation values were captured; the system's static language (sharp corners, flat fills, hairline rules) implies restrained or absent motion — treat transitions as instant or near-instant (sub-150ms linear fades at most on link hover) rather than springy or theatrical, consistent with a terminal/console mood.

## Guardrails
- Never round any corner — every button, list row, and rule stays at `0px` radius; a pill or soft-rounded control breaks the terminal identity.
- Never extend the corner radial gradient into a full-bleed hero gradient — keep it a top-right wash fading by 35% radius, leaving the rest of the frame flat near-black.
- Never introduce card shadows, borders-as-boxes, or photographic/illustrated media — hierarchy comes from type and the pink accent only.
- Never recolor body or secondary text pink — the accent is reserved for links, eyebrows, headline emphasis, and button borders/fills only.
- Never center content — every block is left-aligned to the shared margin within the 1120px container.