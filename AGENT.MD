# /AGENT_I18N_OPTION1.md

## Mission
Implement i18n with **zero JS** and **pure static HTML** by shipping **one fully-rendered HTML file per language** for every route.
No runtime translation. No fetch(). No i18n libs.

## Non-negotiables
- Every language page is complete HTML (serverless, static, offline-safe).
- Same layout + components across languages; **only text/meta/alt/aria differ**.
- Same shared assets path for all languages: `/assets/...`
- Clean URLs: `/en/`, not `/en.html`
- Language switcher is **plain `<a>` links** (no JS).


##TOOLS

You may use **only the following tools and techniques**.

## Morphllm MCP TOOLS
Fast Apply: IMPORTANT: Use `edit_file` over `str_replace` or full file writes. It   works with partial code snippets—no need for full file content.

Warp Grep: warp-grep is a subagent that takes in a search string and tries to find relevant context. Best practice is to use it at the beginning of codebase explorations to fast track finding relevant files/lines. Do not use it to pin point keywords, but use it for broader semantic queries. "Find the XYZ flow", "How does XYZ work", "Where is XYZ handled?", "Where is <error message> coming from?"

## Supported languages model
- Default language at root: `/` (example: `sl`)
- Other languages in folders: `/en/`, `/de/`, ...

### Required folder structure
/
  index.html
  about/index.html
  resources/index.html
  en/
    index.html
    about/index.html
    resources/index.html
  de/
    index.html
    about/index.html
    resources/index.html
  assets/
    css/main.css
    js/main.js           # optional, NOT for i18n
    img/...

Rule: **For every route, create the same relative path in every language folder.**

Examples:
- `/about/`  -> `/en/about/` -> `/de/about/`
- `/resources/` -> `/en/resources/` -> `/de/resources/`

---

## Build workflow (for a web builder / page generator)
For EACH route (e.g. `index`, `about`, `resources`):
1) Use ONE base template for structure (header/footer/nav/sections identical).
2) Render one HTML file per language by injecting:
   - translated body copy
   - translated UI strings (buttons, labels)
   - translated metadata (title, description, og tags)
   - translated alt text + aria labels where meaningful
3) Write output to:
   - default language: `/<route>/index.html` (root, route folder)
   - other languages: `/<lang>/<route>/index.html`

Never leave placeholder keys in final HTML.

---

## URL mapping function (MUST follow exactly)
Given:
- `currentPath` = path of the page WITHOUT language prefix
  - examples: `/` , `/about/` , `/resources/`
- `defaultLang` = `sl`
- `langs` = `[sl,en,de]`

Mapping:
- For defaultLang (`sl`): url = `${origin}${currentPath}`
- For other lang (`en`): url = `${origin}/${lang}${currentPath}`

Examples:
- `/` -> `https://site.tld/` (sl), `https://site.tld/en/`, `https://site.tld/de/`
- `/about/` -> `https://site.tld/about/`, `https://site.tld/en/about/`, `https://site.tld/de/about/`

---

## Head requirements (apply to EVERY language page)
Each page MUST include:
- `<html lang="..">` correct for the page language
- `<meta charset>`, `<meta viewport>`
- `<title>` translated (unique per page + language)
- `<meta name="description">` translated
- canonical pointing to the exact page URL
- hreflang alternates for ALL supported languages + x-default
- shared assets loaded with absolute paths (`/assets/...`)

### Canonical + hreflang template (MUST be consistent)
Variables:
- origin: `https://YOURDOMAIN.tld`
- pagePath: one of `/`, `/about/`, `/resources/` ...
- currentLang: `sl|en|de`
- langs: `sl,en,de`
- defaultLang: `sl`

Rules:
- canonical MUST be the page’s own URL
- alternates MUST include self + all languages + x-default
- x-default MUST point to default language root for that route

#### Example: default language page `/about/index.html` (sl)
<html lang="sl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="canonical" href="https://YOURDOMAIN.tld/about/">

  <link rel="alternate" hreflang="sl" href="https://YOURDOMAIN.tld/about/">
  <link rel="alternate" hreflang="en" href="https://YOURDOMAIN.tld/en/about/">
  <link rel="alternate" hreflang="de" href="https://YOURDOMAIN.tld/de/about/">
  <link rel="alternate" hreflang="x-default" href="https://YOURDOMAIN.tld/about/">

  <title><!-- SL title --></title>
  <meta name="description" content="<!-- SL description -->">

  <link rel="stylesheet" href="/assets/css/main.css">
</head>

#### Example: English page `/en/about/index.html` (en)
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="canonical" href="https://YOURDOMAIN.tld/en/about/">

  <link rel="alternate" hreflang="sl" href="https://YOURDOMAIN.tld/about/">
  <link rel="alternate" hreflang="en" href="https://YOURDOMAIN.tld/en/about/">
  <link rel="alternate" hreflang="de" href="https://YOURDOMAIN.tld/de/about/">
  <link rel="alternate" hreflang="x-default" href="https://YOURDOMAIN.tld/about/">

  <title><!-- EN title --></title>
  <meta name="description" content="<!-- EN description -->">

  <link rel="stylesheet" href="/assets/css/main.css">
</head>

Deployment note:
- If hosted under a subpath (e.g. GitHub Pages `/repo/`), origin MUST include it:
  - origin = `https://user.github.io/repo`
  - then canonical/alternates MUST include `/repo/...`

---

## Language switcher (STATIC, required everywhere)
Place in header or footer on every page.

### Output snippet (same on all languages, only `aria-label` can be translated)
<nav class="lang" aria-label="Language selector">
  <a href="/" hreflang="sl" lang="sl">SL</a>
  <a href="/en/" hreflang="en" lang="en">EN</a>
  <a href="/de/" hreflang="de" lang="de">DE</a>
</nav>

### Route-aware requirement
On non-root routes, links MUST go to the equivalent route:
Example on `/en/resources/`:
- SL: `/resources/`
- EN: `/en/resources/`
- DE: `/de/resources/`

No JS. No auto-detect. No redirect.

---

## Accessibility + trauma-safe rendering rules
- No “loading” placeholders.
- No content swap after paint.
- No mixed languages within a paragraph.
- Translate:
  - headings
  - buttons
  - form labels
  - helper text
  - aria-labels (where user-facing)
  - alt text (when meaningful; decorative images use alt="")

---

## QA checklist (must pass before merge)
For every language page:
- [ ] correct `<html lang>`
- [ ] correct canonical (exact URL)
- [ ] hreflang includes self + all languages + x-default
- [ ] language switcher links to equivalent path
- [ ] `/assets/...` links work from all folders
- [ ] no untranslated strings remain
- [ ] no JS required to read content

---

## Forbidden
- fetch(`/i18n/...`)
- i18next or runtime translation libs
- hiding content until JS runs
- auto-redirect based on browser language
- “single page with mixed languages”

---

## Optional enhancement (still zero JS)
If you want a “choose language” landing page:
- Create `/choose-language/index.html` with plain links to `/`, `/en/`, `/de/`
- Do NOT block direct access to any language URL
- Do NOT auto-redirect on `/`