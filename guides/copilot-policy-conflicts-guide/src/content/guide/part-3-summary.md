---
title: Conflict rules summary
section: Conflict Rules
order: 12
description: Look up the rule for each policy instead of assuming one.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts
---

## Key Takeaways

- Conflicts only arise for delegated policies and users seated by more than one organization or enterprise.
- Least restrictive: if any licensing organization enables the feature, it is enabled for the user everywhere.
- Most restrictive applies to a short list of sensitive policies, including the Copilot Metrics API and suggestions matching public code.
- Semantic indexing for non-GitHub repositories needs an explicit Enabled from every organization.
- Across enterprises the most-restrictive rule usually applies, except AI credit paid usage and GitHub Spark.
