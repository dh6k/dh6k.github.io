# Extractable components

## SiteHeader

- Source: `_layouts/default.html`
- Category: layout
- Description: Brand, bilingual switch, and utility navigation.
- Extractable props: current language and active route.
- Hardcoded: site identity, route labels, CSS classes.

## SiteFooter

- Source: `_layouts/default.html`
- Category: layout
- Description: Build identity, sitemap, and source links.
- Extractable props: source path.
- Hardcoded: labels and CSS classes.

## ArticleShell

- Source: `_layouts/page.html`
- Category: layout
- Description: Back link, alternate language, page label, title, and content.
- Extractable props: language, alternate URL/label, title.
- Hardcoded: home route and CSS classes.
