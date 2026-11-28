<!-- github-knowledge-base-start -->
## Knowledge Base

### Purpose

This repository uses the Knowledge Base at [https://github.com/ragmha/field-guides](https://github.com/ragmha/field-guides) on branch `main`.

### Required behavior

1. Before changing code, read `docs/index.md` from that branch.
2. Use the index to open only the knowledge files relevant to the task.
3. If the index is unavailable, stop and report that the Knowledge Base could not be loaded.

### Source of truth

Generated knowledge tracks the code. When the knowledge and code disagree, trust the code.
<!-- github-knowledge-base-end -->

## Diagram authoring

- Use the `diagram-design` skill for new or redrawn technical diagrams. Choose a semantic pattern first when behavior, state, enforcement or risk is load-bearing, then use the matching visual-type reference.
- Match the guide's established palette and typography. Keep sources self-contained, static HTML with accessible inline SVG; generate separate light/dark SVG embeds as needed. Use a semantic HTML table or figure when it communicates better than a diagram.
- Use `shared/DiagramEmbed.astro` for guides that embed paired light/dark SVG assets. Preserve a guide-specific renderer only when its source format or behavior materially differs.
- Do not add Excalidraw files, dependencies, imports, links or generated exports. Validate with `bun run check:diagrams`; run the guide's `test:diagrams` command after changing generated diagram assets.
