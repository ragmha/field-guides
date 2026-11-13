export const extraDiagrams: Record<string, { title: string; description: string; sources?: string[] }> = {
  "decision-owners": {
    "title": "Decision owners",
    "description": "A named adoption owner coordinates privacy, security and platform decisions; each team owns its evidence."
  },
  "environment-choice": {
    "title": "Choose a deployment",
    "description": "Choose self-hosting when operational control is required; otherwise assess cloud data-region and feature requirements."
  },
  "feature-availability": {
    "title": "GHE.com feature availability",
    "description": "At the source review date, Codespaces is available on GHE.com while public repositories and GitHub Marketplace are unavailable. Check the current feature overview before deciding.",
    "sources": [
      "https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency",
      "https://github.blog/changelog/2026-04-01-codespaces-is-now-generally-available-for-github-enterprise-with-data-residency/"
    ]
  },
  "exceptions-flow": {
    "title": "Map outbound data",
    "description": "Support, integrations and telemetry can cross the residency boundary; classify each destination and assess the relevant transfer safeguards."
  },
  "data-lifecycle": {
    "title": "Plan data return or deletion",
    "description": "Under the applicable DPA, assess the request for return or deletion and any applicable exceptions; verify the result and retain your evidence."
  },
  "identity-controls": {
    "title": "Controls by enforcement point",
    "description": "Recommended controls are grouped by who enforces them, not asserted to be enabled by default."
  },
  "developer-endpoints": {
    "title": "Developer connection points",
    "description": "Developers authenticate to the enterprise subdomain; clients and integrations must use the appropriate GHE.com endpoints."
  },
  "audit-flow": {
    "title": "Audit evidence path",
    "description": "Test that an enterprise audit event reaches the customer-selected destination and can be investigated by an assigned owner."
  },
  "assurance-evidence": {
    "title": "Assurance evidence",
    "description": "An evidence pack brings together the applicable contract, scoped assurance reports and customer operational tests."
  },
  "copilot-governance": {
    "title": "Copilot governance",
    "description": "The customer must decide policies, model use, information handling and monitoring; availability and contract terms require checking."
  },
  "ip-commitment": {
    "title": "Check the IP commitment",
    "description": "The purchase route determines which terms to review. Legal should check the applicable agreement, scope and exclusions before relying on a defence commitment."
  },
  "contract-stack": {
    "title": "Identify the contract stack",
    "description": "For direct purchases, review the agreement and product-specific terms together with the applicable data protection and generative AI terms; Microsoft purchases use a different contract route."
  },
  "government-request": {
    "title": "Government request safeguards",
    "description": "The DPA describes redirecting requests where possible, notification unless legally prohibited and challenges under its terms. Exceptions and applicable law matter."
  },
  "privacy-assessments": {
    "title": "Assess privacy and transfers",
    "description": "Map processing, decide whether a DPIA is required, assess relevant transfers and safeguards, and document the legal review."
  },
  "regulation-comparison": {
    "title": "Regulatory focus",
    "description": "The laws address different risks and apply only where their scope and applicable national rules are met. The guide is not legal advice."
  },
  "importer-flow": {
    "title": "Migration with GEI",
    "description": "Inventory and pilot a migration; verify imported data and recreate items that are not migrated, such as Actions secrets."
  },
  "runner-deployment": {
    "title": "Runner and network boundary",
    "description": "The customer chooses where self-hosted runners and external services operate; their locations are not automatically covered by GitHub's data residency commitment."
  },
  "cutover-handoff": {
    "title": "Cutover handoffs",
    "description": "The platform team prepares and migrates; repository owners verify their workloads; the business owner approves the cutover. This is guide advice."
  },
  "exit-states": {
    "title": "Exit readiness states",
    "description": "A tested export plan moves from planning through verification; a failed test returns to planning. Contractual windows depend on the applicable agreement."
  },
  "support-blueprint": {
    "title": "Support handoffs",
    "description": "Customer actions and visible support interactions sit above the visibility line. GitHub's internal support process is not verified here."
  },
  "go-no-go": {
    "title": "Go or no-go",
    "description": "Guide advice: proceed only when required owners accept the evidence and gaps; otherwise assign actions and review again."
  }
};
