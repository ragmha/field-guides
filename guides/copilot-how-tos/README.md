# Copilot how-to workspace

This Astro workspace serves the IDE and prompting guides at separate routes under `/field-guides`. The manifest at `src/manifest.ts` owns guide display metadata, artwork metadata, part order, lesson order, and route inputs. Static generation validates the manifest against every Markdown file before emitting pages.

## Adding or editing content

- Add each landing page at `src/content/guide/<slug>/index.md` and each lesson at `src/content/guide/<slug>/<lesson-id>.md`.
- Use `kind`, `title`, `description`, `reviewed` (`YYYY-MM-DD`), and one or more absolute HTTPS `sources` in frontmatter. `checks` is optional and accepts one to three question/answer pairs.
- Keep each registered guide at three parts with two kebab-case lesson IDs per part. Add lesson references and metadata to `src/manifest.ts`; do not hardcode route lists elsewhere.
- Landing frontmatter title and description must match its manifest entry. Use each lesson's full `/field-guides/<slug>/part-<n>/<n>-<lesson-id>/` path for internal Markdown links so the link is correct from every route and the deployed base.

## Artwork and inline assets

Guide artwork belongs in `src/assets/` and is resolved by filename from the manifest's `artwork.src`. Record its intrinsic dimensions and a concise, accurate alt text in the manifest. The asset lookup is dynamic, so adding another illustration does not require renderer edits.

For diagrams or other page assets, place files in `public/copilot-how-tos/assets/` and link to them with the deployed URL, for example `/field-guides/copilot-how-tos/assets/example.svg`. Keep lesson prose and its references in Markdown; the renderer supplies navigation, source aggregation, self-checks, and page layout.
