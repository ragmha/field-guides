---
kind: lesson
title: Scope instructions to a path
description: Use a path-specific instruction file when a convention is local.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
---

## Steps

1. Confirm your client supports path-specific instructions. Support differs by Copilot surface.
2. Create `.github/instructions/tests.instructions.md` if it does not already exist. For a project with JavaScript tests under `tests/`, an example is:

   ```markdown
   ---
   applyTo: "tests/**/*.js"
   ---
   Use descriptive test names and cover the behavior being changed.
   ```

3. Adjust the glob and guidance to the real repository. Check both matching and nonmatching paths; do not assume a glob covers files at every depth.
4. Keep repository-wide and path-specific guidance compatible. Review the file and its scope before using it.

## Recovery

If the client does not support this format or the glob does not match the target, consult its current documentation rather than assuming the rule was applied.
