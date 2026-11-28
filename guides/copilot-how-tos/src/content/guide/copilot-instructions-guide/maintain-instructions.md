---
kind: lesson
title: Maintain instructions over time
description: Review instructions when the project and its tooling change.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
---

## Steps

1. During ordinary code review, compare instructions with changed directories, commands, and conventions.
2. Remove stale or duplicated guidance and verify replacement commands in the repository.
3. Test a representative task after a material instruction change. Inspect the generated work rather than relying on compliance claims.
4. Keep instructions short and free of private information; review their diff like any other repository change.

## Recovery

If instructions cause repeated poor results, narrow or remove the problematic rule and test again. Do not use instructions as a substitute for permission controls.
