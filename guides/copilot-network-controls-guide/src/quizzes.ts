interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'A cloud agent pull request warns that a package host was blocked. Which control should you inspect first?', options: ['The corporate proxy allowlist', 'The agent firewall allowlist', 'The developer’s editor proxy setting'], answer: 1, explanation: 'Blocked-request warnings come from the agent firewall, which is separate from corporate client rules.' },
    { prompt: 'Which path does a cloud session viewed in a browser use for live updates?', options: ['WebSocket traffic to a Web PubSub host', 'The agent firewall inside the sandbox', 'A direct editor call to the Copilot API'], answer: 0, explanation: 'The browser streams cloud sessions over WebSockets to documented Web PubSub hosts on port 443.' },
    { prompt: 'Does adding a host to the corporate allowlist let the cloud agent reach it?', options: ['Yes, the agent inherits corporate rules.', 'Yes, after the next session starts.', 'No, the agent firewall is set separately.'], answer: 2, explanation: 'GitHub describes client allowlist rules as separate from the firewall in the agent environment.' },
    { prompt: 'Where is the runner type for Actions-based agent sessions set at organization level?', options: ['Settings > Copilot > Internet access', 'Settings > Actions > Runner groups', 'Settings > Copilot > Cloud'], answer: 2, explanation: 'The runner type is set on the Cloud page of the organization’s Copilot settings.' },
    { prompt: 'How is subscription-based network routing put into effect for an organization?', options: ['By allowing and blocking plan endpoints', 'By enabling a routing policy on GitHub', 'By editing each user’s editor settings'], answer: 0, explanation: 'Routing is enabled for all users; administrators act on it with network allow and block rules.' },
  ],
  [
    { prompt: 'Which host must be allowed explicitly because *.github.com does not match it?', options: ['api.github.com', 'collector.github.com', 'github.com'], answer: 2, explanation: 'The allowlist reference says to allow the apex github.com host explicitly.' },
    { prompt: 'Which hosts are not returned by the meta API?', options: ['The website domains used for sign-in', 'The plan-specific githubcopilot hosts', 'The Copilot domains in the API output'], answer: 1, explanation: 'The individual, business and enterprise patterns are listed only in the allowlist reference.' },
    { prompt: 'Is the meta API domain list a complete set of everything clients need?', options: ['Yes, it is maintained as complete.', 'No, it is not comprehensive.', 'Yes, for GitHub.com tenants only.'], answer: 1, explanation: 'GitHub notes the list is not comprehensive, and editors have their own hosts.' },
    { prompt: 'What rule should you add so cloud sessions stream in the browser?', options: ['The documented Copilot host pattern', 'All of *.webpubsub.azure.com on 443', 'Any Azure host the browser requests'], answer: 0, explanation: 'The reference advises against allowing the whole Web PubSub domain.' },
    { prompt: 'What does an HTTP 101 response from the Web PubSub host confirm?', options: ['That the session is streaming', 'That inspection is not interfering', 'Only that the upgrade succeeded'], answer: 2, explanation: 'Retry the session to confirm messages actually flow after the upgrade.' },
  ],
  [
    { prompt: 'HTTP_PROXY and https_proxy are both set. Which does Copilot use?', options: ['https_proxy, for all traffic', 'HTTP_PROXY, for all traffic', 'Each one for its own scheme'], answer: 0, explanation: 'https_proxy ranks above HTTP_PROXY, and Copilot uses the winner for HTTP and HTTPS.' },
    { prompt: 'Which proxy URL form is not supported by Copilot?', options: ['http://proxy.example.com:8080', 'http://user:pw@proxy.example.com:80', 'https://proxy.example.com:8443'], answer: 2, explanation: 'Proxy URLs that begin with https:// are not supported.' },
    { prompt: 'In which editor can you not override the Kerberos service principal name in settings?', options: ['Visual Studio Code', 'JetBrains IDEs', 'Visual Studio'], answer: 2, explanation: 'VS Code and JetBrains provide overrides; Visual Studio does not.' },
    { prompt: 'Where does Copilot look for extra trusted certificates beyond the system store?', options: ['A file named in NODE_EXTRA_CA_CERTS', 'A certificate in the proxy URL', 'The repository’s settings file'], answer: 0, explanation: 'Copilot uses the OS trust store plus certificates from NODE_EXTRA_CA_CERTS.' },
    { prompt: 'A curl test succeeds only with --insecure. What is the likely cause?', options: ['A WebSocket upgrade failure', 'Certificate trust on the device', 'A blocked personal plan endpoint'], answer: 1, explanation: 'Success only with --insecure points to a missing or untrusted certificate.' },
  ],
  [
    { prompt: 'Which pattern should be blocked to stop personal Copilot plans?', options: ['*.business.githubcopilot.com', '*.individual.githubcopilot.com', '*.enterprise.githubcopilot.com'], answer: 1, explanation: 'Allow the company plan patterns and block the individual pattern.' },
    { prompt: 'Why remove a broad *.githubcopilot.com entry when using routing?', options: ['It also permits personal plans.', 'It disables the meta API output.', 'It blocks WebSocket streaming.'], answer: 0, explanation: 'The broad entry serves any plan, defeating the individual block.' },
    { prompt: 'Does the endpoint a request uses determine a user’s features and models?', options: ['Yes, each endpoint has its models.', 'Yes, for Copilot Business only.', 'No, policy settings decide that.'], answer: 2, explanation: 'GitHub states endpoint reuse does not determine feature or model availability.' },
    { prompt: 'What must be allowed before moving from Copilot Business to the Copilot access billing model?', options: ['*.individual.githubcopilot.com', '*.webpubsub.azure.com', '*.enterprise.githubcopilot.com'], answer: 2, explanation: 'The enterprise endpoints also serve the Copilot access billing model.' },
    { prompt: 'Where is subscription-based network routing not supported?', options: ['GHE.com', 'GitHub Mobile', 'Copilot CLI'], answer: 0, explanation: 'Routing applies on GitHub.com; GHE.com is not supported.' },
  ],
  [
    { prompt: 'A domain rule allows packages.contoso.corp. Which host is also allowed?', options: ['artifacts.contoso.corp', 'prod.packages.contoso.corp', 'contoso.corp'], answer: 1, explanation: 'Domain rules include subdomains but not siblings or parents.' },
    { prompt: 'What is the default organization value for Enable firewall?', options: ['Let repositories decide', 'Enabled', 'Disabled'], answer: 0, explanation: 'Organizations default to letting repositories decide; the firewall itself is on by default.' },
    { prompt: 'Can a repository administrator remove an organization custom allowlist entry?', options: ['No, it applies to all repositories.', 'Yes, if custom rules are allowed.', 'Yes, by disabling the recommended list.'], answer: 0, explanation: 'Organization entries cannot be deleted at repository level and combine with repository rules.' },
    { prompt: 'Which traffic does the agent firewall not cover?', options: ['Processes started by the Bash tool', 'The built-in Playwright server', 'Processes started by setup steps'], answer: 2, explanation: 'Setup steps and other MCP servers are outside the firewall’s coverage.' },
    { prompt: 'You added a host to the allowlist during a running cloud sandbox session. What next?', options: ['Retry in the same session.', 'Start a new session.', 'Disable the recommended list.'], answer: 1, explanation: 'Allowlist changes do not reach sessions already running.' },
  ],
  [
    { prompt: 'What must happen to the integrated firewall when the agent uses self-hosted runners?', options: ['It must be disabled.', 'It must be locked on.', 'It moves to the runner.'], answer: 0, explanation: 'The firewall is not compatible with self-hosted runners; your network provides egress control.' },
    { prompt: 'To which sessions do larger and self-hosted runner settings apply?', options: ['Cloud sandbox sessions only', 'Sessions that run on Actions', 'All sessions in the organization'], answer: 1, explanation: 'Runner customization applies only to sessions that run on GitHub Actions.' },
    { prompt: 'What does Azure private networking do with a larger runner’s network interface?', options: ['Assigns it a static public IP', 'Hides it from your network', 'Places it in your Azure network'], answer: 2, explanation: 'Your network policies then apply; blocking inbound traffic is recommended.' },
    { prompt: 'Which result does copilot-proxy.githubusercontent.com/_ping return when reachable?', options: ['HTTP 101', 'HTTP 200', 'HTTP 403'], answer: 1, explanation: 'A 200 response confirms the client can reach the endpoint.' },
    { prompt: 'An editor reports read ECONNRESET. What is the most likely area?', options: ['Proxy or firewall path', 'Repository content exclusion', 'Model availability policy'], answer: 0, explanation: 'ETIMEDOUT and ECONNRESET errors usually point to the proxy or firewall.' },
  ],
];

export const quizReviewLessons: string[][] = [
  ['copilot-traffic-paths', 'copilot-traffic-paths', 'copilot-traffic-paths', 'network-ownership-map', 'network-ownership-map'],
  ['build-client-allowlist', 'build-client-allowlist', 'build-client-allowlist', 'websockets-data-residency', 'websockets-data-residency'],
  ['proxy-configuration', 'proxy-configuration', 'proxy-configuration', 'tls-inspection-certificates', 'tls-inspection-certificates'],
  ['subscription-routing', 'subscription-routing', 'subscription-routing', 'routing-change-plan', 'routing-change-plan'],
  ['firewall-settings-hierarchy', 'firewall-settings-hierarchy', 'firewall-settings-hierarchy', 'firewall-coverage-limits', 'firewall-coverage-limits'],
  ['private-runner-networking', 'private-runner-networking', 'private-runner-networking', 'connectivity-troubleshooting', 'connectivity-troubleshooting'],
];
