---
title: Session records and audit evidence summary
section: Session Records and Audit Evidence
order: 24
description: Use audit events for accountability and session records for context, and know the gaps.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
---

## Key Takeaways

- The audit log covers plan, policy, license and on-GitHub agent activity, not local client session data.
- Session records are user-owned, private by default and deletable in places; they are not a tamper-evident trail.
- Use `agent_session_id` to connect an audit event to a session, then request access through the owner.
