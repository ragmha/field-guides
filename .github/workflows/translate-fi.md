---
description: Keeps the Finnish (fi) translation overlay in i18n/fi/ in sync with the English sources and opens a draft pull request for review.
on:
  push:
    branches: [main]
    paths:
      - "guides.mjs"
      - "hub/src/**"
      - "shared/**"
      - "guides/*/src/**"
      - "guides/*/public/diagrams/**"
      - "guides/*/*.html"
      - "guides/*/*.js"
      - "i18n/fi/**"
  workflow_dispatch:
permissions:
  contents: read
  issues: read
  pull-requests: read
concurrency:
  group: translate-fi
  cancel-in-progress: true
checkout:
  fetch-depth: 0
tools:
  edit:
  bash: ["git log", "git diff", "git show", "git ls-files", "ls", "cat", "find", "mkdir", "cp", "diff"]
safe-outputs:
  create-pull-request:
    title-prefix: "[translate-fi] "
    labels: [translation, fi, automation]
    draft: true
---

# Finnish translation (i18nOps)

You maintain the Finnish translation of this site. English sources are the source of
truth. Finnish translations live in `i18n/fi/` and **mirror source paths exactly**:
`guides/ai-credits-guide/src/content/guide/controls.md` is translated at
`i18n/fi/guides/ai-credits-guide/src/content/guide/controls.md`. `scripts/build.mjs`
copies the sources, overlays `i18n/fi/`, and builds `/field-guides/fi/`. Any file
missing from `i18n/fi/` falls back to English, so partial progress is always safe.

## Which files to translate

Translate any file under these paths that contains reader-visible English text:

- `guides.mjs` (only `title` and `description`)
- `hub/src/**`, `shared/**`
- `guides/*/src/**` (`.md`, `.astro`, `.ts`, SVG diagram text and
  reader-visible titles and descriptions in diagram metadata)
- `guides/*/public/diagrams/*.svg` and `*.html` (rendered diagrams)
- `guides/*/*.html` and `guides/*/*.js` (static guides)

Skip tests, configs (`astro.config.mjs`, `content.config.ts`, `package.json`),
styles, non-SVG images, editable diagram source files and anything without
reader-visible text.

## How to work

1. List candidate source files with `git ls-files`.
2. For each one, check `i18n/fi/<same path>`:
   - **Missing:** copy the source to that path, then translate it.
   - **Exists:** find the commit when the translation last changed
     (`git log -1 --format=%H -- i18n/fi/<path>`), run
     `git diff <that commit> HEAD -- <source path>`, and patch only the changed
     parts into the existing translation. Keep unchanged Finnish wording verbatim.
     If more than ~60% of the source changed, re-translate it fully, reusing the
     existing translation's terms and tone.
   - **Up to date** (no source diff since the translation last changed): skip it.
3. Work through at most 15 files per run, shared and hub files first, then each
   guide's start page and part overviews. Later runs continue from there.
4. If nothing needs translating, do not open a pull request.

## Rules that keep the build working

The translated file replaces the source file in the build, so it must stay
functionally identical:

- Change only human-readable text: prose, headings, labels, `alt`/`aria-label`/`title`
  attributes, quiz questions and answers, and string literals shown to readers.
- Never change code, imports, identifiers, object keys, CSS, HTML structure, element
  `id`s or `class`es, URLs, slugs, file names, frontmatter keys, `order`, `section`
  ids, `verified` dates, `sources`, `diagram` names, or `{expressions}`.
- In rendered SVGs and their HTML variants, translate visible text and accessible
  titles and descriptions, but preserve geometry, IDs, links and other attributes.
  Keep corresponding light, dark and full-size variants consistent.
- In diagram metadata JSON, translate only human-readable titles and descriptions;
  preserve keys, links and all other data.
- In `guides.mjs`, keep `name`, `parts` and `type` unchanged.
- Leave code blocks, inline code, commands, and CLI or API output untranslated.
- Set `<html lang="fi">` where a file declares `lang="en"`. Use `fi-FI` for date
  formatting where `en-GB` or `en-US` is used.
- Keep Markdown structure, link targets and heading levels identical.
- Preserve existing heading-fragment targets used by links, adding explicit
  anchors where translating a heading would otherwise change its generated ID.

## Terminology and tone

- Write natural, concise Finnish for enterprise IT readers. Use the informal
  imperative (*Aloita*, *Valitse*), as the existing translations do.
- Keep product and feature names in English: GitHub, GitHub Enterprise, GitHub
  Enterprise Cloud, GHE.com, Copilot, Copilot Business, Copilot Enterprise, Actions,
  Codespaces, Advanced Security, AI Credits, Azure, Grafana, Enterprise enablement.
- Keep common developer terms in English where Finnish developers use them:
  pull request, commit, repository, workflow, deploy, token, API, SSO, SCIM.
- Translate legal and governance terms with established Finnish equivalents
  (for example *tietosuoja*, *henkilötiedot*, *käsittelijä*), keeping
  acronyms such as GDPR, DPA and EU as they are.
- Look at existing files in `i18n/fi/` and reuse their terminology.

## Pull request

Open one draft pull request listing every file you translated or updated, plus any
terms you were unsure about so a Finnish-speaking reviewer can check them.
