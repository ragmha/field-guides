---
title: What can an automation touch?
section: Permissions & Scope
order: 9
description: Bound an automation's tools, write reach and exposure to untrusted input.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
---

## What you will learn

An unattended run cannot ask a person before it acts, so its limits must be set in advance. Selecting tools is the main way to control what an automation can do. Write scope limits which records event-triggered runs may change, and actor and chaining filters decide whose input reaches the prompt. This part narrows each in turn and separates the controls that apply to GitHub tools from those that do not cover MCP servers.
