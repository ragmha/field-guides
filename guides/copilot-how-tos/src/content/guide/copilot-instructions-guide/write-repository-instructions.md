---
kind: lesson
title: Write repository-wide instructions
description: Create a short Markdown instruction file at the documented location.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
---

## Steps

1. If it does not exist, create `.github/copilot-instructions.md` at the repository root. If it already exists, read and edit it rather than replacing it.
2. Add concise, verifiable guidance adapted to your real project, for example:

   ```markdown
   # Repository conventions
   - Add focused tests for behavior changes in `tests/`.
   - Run `npm test` for changes to the filtering utility.
   - Preserve the public function signatures unless the task explicitly changes them.
   ```

3. Check that the paths and command actually exist. Replace the examples if they do not.
4. Review the file in the diff and submit it through your normal review process.

## Expected result

The file gives useful repository-wide context without prescribing every step of every task. Supported clients may apply it differently; verify with the relevant documentation.
