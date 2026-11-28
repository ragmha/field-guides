---
kind: lesson
title: Evaluate the custom agent
description: Try a known documentation issue and check both output and tool use.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents
---

## Steps

1. In a supported client, select the custom agent using that client's documented interface. Provide a synthetic document with a known unsupported claim and its source.
2. Ask for a review with file locations, not an edit or publication.
3. Check that the agent identifies the known issue, supports its conclusion, and does not change files. Inspect tool requests and repository status.
4. If the agent is unavailable or uses unexpected tools, check profile syntax, location, tool support, and client settings. Adjust the profile and retry.

## Human verification

An agent can miss problems or report false positives. Compare each finding with the actual source and retain normal human review.
