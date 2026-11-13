# EU Data Residency Guide

An independent, source-backed guide for teams adopting GitHub Enterprise Cloud
with data residency (GHE.com) in the EU.

Ten parts cover sovereignty, platform choices, data, identity, security,
Copilot, contracts, EU law, migration, and operation and exit. Each chapter
has five questions: 80% unlocks the next chapter, with unlimited retries.
Progress is local to the browser and is not a security control.

The guide links to primary sources. Recommendations are labelled
"Guide advice" and worked examples are labelled "Hypothetical scenario". The
sources page lists what could not be verified. This is not legal advice.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/data-residency-guide/>. The base path matches
GitHub Pages.

```sh
bun run check
bun run test
bun run build
```

The static output is `dist/`.

## Keep it current

Each page shows "Review overdue" 30 days after its `verified` date. Re-check
the sources listed in `src/content/guide/sources.md`, update the content, and
bump `verified`.
