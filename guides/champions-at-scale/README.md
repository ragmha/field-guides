# Champions at Scale

An independent interactive field guide for enterprise champion programs in 2026
and beyond. Original synthesis with links to GitHub's guidance, 2025 DORA
research, and Anthropic and OpenAI adoption guidance. Not affiliated with or
endorsed by those organizations.

Read the guide at https://ragmha.github.io/field-guides/champions-at-scale/.

## Local preview

No dependencies or build step:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. The guide uses relative assets and fragment links, so
it also works under a GitHub Pages project subpath. GitHub Pages serves the
repository root from `master`; no build workflow is needed.

The readiness checklist is page-local and resets on reload. The opt-in Champion
quest path saves checked quests in this browser's local storage and offers a
reset; no progress is sent anywhere. GitHub Skills exercises and Microsoft Learn
paths are linked from the guide; certification is optional. There is no
analytics, backend or external font request. The System / Light / Dark
control follows the AI Credits Guide's theme without persisting a preference.
Its exact palette, system font stacks, shell and controls are adapted for this
static guide. Four inline SVG figures explain the support network, learning
cycle, reusable team kit and evidence-to-decision path with the same theme
tokens. The printable `charter.html` is a one-page sponsor worksheet. Print the
guide to keep a copy, including all expandable sections and current checkbox
selections.

## Browser checks

With Chrome and an existing `playwright-core` installation:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node checks.mjs
```

Keep the preview server running first. The check covers theme transitions,
diagram text bounds and local scrolling, checklist transitions, phase and mobile
navigation, print expansion/restoration, local links, mobile overflow, keyboard
access, quest persistence and reset, JavaScript-disabled reading and
project-subpath hosting.