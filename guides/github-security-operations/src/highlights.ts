export const highlights: Record<string, [string, string]> = {
  'operating-model': ['Detection is quick; ownership, context and decision rules are what stall alerts.', 'Agree scope, owners, targets and exception rules before broad rollout.'],
  route: ['Every finding needs one accountable owner and a consistent intake record.', 'Notifications are not routing; confirm a named owner has accepted the alert.'],
  coverage: ['An empty alert view is not proof of security; confirm coverage first.', 'Default configurations cover new repositories; check existing and transferred ones.'],
  triage: ['Severity is a signal; exposure, reachability and service context complete the priority.', 'Publish a small, stable priority table agreed with service owners.'],
  secrets: ['Treat a committed secret as compromised: revoke or rotate, then close the alert.', 'Review push protection bypasses; use delegated bypass where credentials matter.'],
  code: ['A fix is proven by a later scan, not by a merge.', 'Review AI-suggested fixes like any contribution; they are best-effort.'],
  dependencies: ['Alerts report risk; security updates fix it. Merge updates through normal change control.', 'Treat tolerable-risk and no-bandwidth dismissals as decisions with an owner and date.'],
  exceptions: ['Fixed, dismissed and accepted risk are different outcomes; never mix them.', 'Record approver, scope, compensating controls and an expiry date.'],
  audit: ['Code scanning does not create audit log timeline events.', 'Store webhook events if you need durable history across alert types.'],
  measure: ['Pair remediation speed with coverage, backlog health and quality.', 'Never present a closure count as proof of overall security.'],
  'weekly-review': ['Start every review with coverage gaps and unowned alerts.', 'Fix the system behind recurring problems, not the individual responder.'],
};
