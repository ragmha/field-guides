import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const output = resolve(root, 'public/diagrams');
const check = process.argv.includes('--check');

const skins = {
  light: {
    paper: '#f3f5f7', surface: '#ffffff', ink: '#1f2328', muted: '#59636e',
    rule: '#d1d9e0', accent: '#1a7f37', tint: '#eaf6ed', link: '#0550ae',
  },
  dark: {
    paper: '#07090d', surface: '#0d1117', ink: '#f0f6fc', muted: '#9198a1',
    rule: '#3d444d', accent: '#3fb950', tint: '#0f2d19', link: '#4493f8',
  },
};

const definitions = [
  {
    name: 'credit-lifecycle',
    type: 'Flowchart',
    title: 'Follow the credits, not the seats',
    description: 'Business and Enterprise licenses fund a shared included pool. After it is exhausted, paid usage needs policy permission and available enforced headroom. Copilot access has no included pool.',
    viewBox: '0 0 640 560',
    nodes: () => [
      box(180, 32, 280, 68, 'FUNDING', 'Business or Enterprise', ['Shared included-credit pool']),
      diamond(216, 144, 208, 104, ['Included credits', 'remain?']),
      box(36, 320, 236, 88, 'INCLUDED', 'Shared pool', ['Credits are pooled,', 'not user wallets'], true),
      diamond(386, 300, 190, 104, ['Paid-use policy and', 'enforced budgets allow?']),
      box(36, 472, 236, 64, 'CONTINUE', 'Credit use continues', ['Within included funding']),
      box(304, 472, 160, 64, 'YES', 'Metered use', ['Paid usage allowed']),
      box(492, 472, 124, 64, 'NO', 'Blocked', ['Policy denies spend']),
    ],
    arrows: [
      straight(320, 100, 320, 144),
      elbow([[216, 196], [156, 196], [156, 320]], 'YES', 176, 247),
      elbow([[424, 196], [481, 196], [481, 300]], 'NO', 451, 247),
      straight(154, 408, 154, 472),
      elbow([[386, 352], [352, 352], [352, 472]], 'YES', 352, 420),
      elbow([[576, 352], [584, 352], [584, 472]], 'NO', 584, 420),
    ],
  },
  {
    name: 'layered-guardrails',
    type: 'Flowchart',
    title: 'Why a user can be blocked while credits remain',
    description: 'Resolve individual, cost-center, then universal ULB precedence. An exhausted applicable ULB blocks the user before remaining shared credits or metered funding can help.',
    viewBox: '0 0 640 560',
    nodes: () => [
      box(160, 32, 320, 88, '1 · PRECEDENCE', 'Resolve the applicable ULB', ['Individual > cost center > universal', 'First configured wins—not the smallest']),
      diamond(216, 164, 208, 104, ['Applicable ULB', 'exhausted?']),
      box(40, 340, 224, 88, 'STOP', 'Request blocked', ['Pool balance cannot refill', 'an exhausted ULB'], true),
      box(376, 340, 224, 88, 'ONLY IF ALLOWED', 'Continue to funding checks', ['Check included usage and', 'paid-use policy']),
      box(376, 464, 224, 64, 'NEXT', 'Check metered limits', ['Not reached in blocked case']),
    ],
    arrows: [
      straight(320, 120, 320, 164),
      elbow([[216, 216], [152, 216], [152, 340]], 'YES', 184, 276),
      elbow([[424, 216], [488, 216], [488, 340]], 'NO', 456, 276),
      straight(488, 428, 488, 464),
    ],
  },
  {
    name: 'cost-center-controls',
    type: 'Architecture',
    title: 'One shared pool, two different team controls',
    description: 'A cost-center included-usage control limits its draw on the shared pool. A cost-center metered budget limits additional charges. Neither is a private wallet or a transfer between teams.',
    viewBox: '0 0 640 520',
    nodes: () => [
      box(208, 40, 224, 72, 'SHARED FUNDING', 'Included pool', ['Across cost centers'], true),
      box(208, 192, 224, 72, 'SCOPE', 'Cost centers A + B', ['Draw from the same pool']),
      box(40, 360, 248, 112, 'INCLUDED-USAGE CONTROL', 'Limits pool draw', ['Cap based on member licenses', 'May block or allow paid use', 'according to policy']),
      box(352, 360, 248, 112, 'METERED BUDGET', 'Limits added charges', ['Applies to paid overage', 'Not a reserved credit', 'allocation']),
    ],
    arrows: [
      straight(320, 112, 320, 192),
      elbow([[264, 264], [264, 320], [164, 320], [164, 360]]),
      elbow([[376, 264], [376, 320], [476, 320], [476, 360]]),
    ],
  },
  {
    name: 'cap-or-continuity',
    type: 'Flowchart',
    title: 'Same threshold, different operational outcome',
    description: 'A metered hard stop blocks credit-consuming work at its limit. An alert-only threshold keeps work and charges running while an owner responds. ULBs remain hard stops in either design.',
    viewBox: '0 0 640 540',
    nodes: () => [
      box(180, 40, 280, 72, 'THRESHOLD', 'Same metered limit', ['Reached in either configuration']),
      box(40, 184, 240, 72, 'CONFIGURATION A', 'Hard stop ON', ['Metered limit enforced'], true),
      box(360, 184, 240, 72, 'CONFIGURATION B', 'Hard stop OFF', ['Alert-only threshold']),
      box(40, 328, 240, 88, 'OUTCOME', 'Work is blocked', ['Credit-consuming activity', 'stops at the limit']),
      box(360, 328, 240, 88, 'OUTCOME', 'Owner chooses response', ['Charges continue while', 'the owner investigates']),
      box(72, 464, 496, 52, 'ALWAYS', 'ULB remains a hard stop in both', ['Forecast ≠ cap ≠ purchase approval']),
    ],
    arrows: [
      elbow([[240, 112], [240, 148], [160, 148], [160, 184]]),
      elbow([[400, 112], [400, 148], [480, 148], [480, 184]]),
      straight(160, 256, 160, 328),
      straight(480, 256, 480, 328),
    ],
  },
  {
    name: 'agent-meters',
    type: 'Architecture',
    title: 'One agent workload, two meters',
    description: 'Copilot code review consumes model/token AI credits and Actions runner minutes separately. Plan and monitor both; an AI-credit budget does not cap Actions spending.',
    viewBox: '0 0 640 520',
    nodes: () => [
      box(200, 40, 240, 72, 'WORKLOAD', 'Copilot code review', ['One agent workload']),
      box(40, 216, 240, 96, 'METER 1', 'AI credits', ['Model + token usage'], true),
      box(360, 216, 240, 96, 'METER 2', 'Actions', ['Runner minutes']),
      box(184, 392, 272, 72, 'FINANCE VIEW', 'Include both meters', ['Different usage and spend']),
    ],
    arrows: [
      elbow([[240, 112], [240, 160], [160, 160], [160, 216]]),
      elbow([[400, 112], [400, 160], [480, 160], [480, 216]]),
      elbow([[160, 312], [160, 344], [260, 344], [260, 392]]),
      elbow([[480, 312], [480, 360], [380, 360], [380, 392]]),
    ],
  },
  {
    name: 'rollout-roadmap',
    type: 'Steps',
    title: 'Build the operating model before automation',
    description: 'Start with ownership, enterprise controls and attribution. Adopt cost-center and per-user rules with guidance and responders. Advance through monthly review and automation of a proven process.',
    viewBox: '0 0 640 400',
    nodes: () => [
      stepCard(40, 112, 176, 208, '01', 'Foundation', ['Name an owner', 'Set enterprise controls', 'Establish attribution']),
      stepCard(232, 112, 176, 208, '02', 'Adoption', ['Add cost-center and', 'per-user rules', 'Guide users; name', 'response owners'], true),
      stepCard(424, 112, 176, 208, '03', 'Improve', ['Review monthly', 'Automate only after', 'the process is proven']),
    ],
    arrows: [],
  },
  {
    name: 'operating-loop',
    type: 'Loop',
    title: 'Turn an alert into an owned decision',
    description: 'Identify the actual limiting control, route the decision to its owner, apply an approved change, confirm recovery and review the result. An alert never authorizes extra spend by itself.',
    viewBox: '0 0 640 560',
    nodes: () => loopStations(),
    arrows: [],
  },
  {
    name: 'attribution-pipeline',
    type: 'Steps',
    title: 'From usage to an accountable cost owner',
    description: 'Map the source usage report to owners, keep unmapped records visible and reconcile totals and periods. Start with showback; chargeback requires finance agreement.',
    viewBox: '0 0 640 440',
    nodes: () => [
      stepCard(24, 112, 112, 216, '01', 'Export', ['AI usage', 'report']),
      stepCard(148, 112, 112, 216, '02', 'Map', ['User → cost', 'owner', 'Keep UNMAPPED']),
      stepCard(272, 112, 112, 216, '03', 'Reconcile', ['Align totals', 'and period'], true),
      stepCard(396, 112, 112, 216, '04', 'Showback', ['Make usage', 'visible']),
      stepCard(520, 112, 96, 216, '05', 'Chargeback', ['Only with', 'finance', 'agreement']),
    ],
    arrows: [],
  },
  {
    name: 'visualisation-map',
    type: 'Architecture',
    title: 'Choose a view by the question',
    description: 'Billing data answers spend and attribution questions. Copilot usage metrics describe adoption and activity. Instrumented client telemetry diagnoses agent behavior; it does not replace billing.',
    viewBox: '0 0 640 560',
    nodes: () => [
      box(24, 72, 168, 96, 'SOURCE', 'Billing data', ['AI usage CSV / REST'], true),
      box(236, 72, 168, 96, 'VIEW', 'Billing or BI', ['Local Grafana']),
      box(448, 72, 168, 96, 'QUESTION', 'Where did spend go?', ['Charges + attribution']),
      box(24, 224, 168, 96, 'SOURCE', 'Copilot metrics', ['Adoption + activity']),
      box(236, 224, 168, 96, 'VIEW', 'GitHub dashboard', ['Metrics API']),
      box(448, 224, 168, 96, 'QUESTION', 'Who is using it?', ['Adoption signal']),
      box(24, 376, 168, 96, 'SOURCE', 'Client telemetry', ['Instrumented clients']),
      box(236, 376, 168, 96, 'VIEW', 'Local tracing', ['Or Azure route']),
      box(448, 376, 168, 96, 'QUESTION', 'Why is an agent slow?', ['Behavior diagnostics']),
    ],
    arrows: [
      straight(192, 120, 236, 120), straight(404, 120, 448, 120),
      straight(192, 272, 236, 272), straight(404, 272, 448, 272),
      straight(192, 424, 236, 424), straight(404, 424, 448, 424),
    ],
    note: 'Only billing answers the spending question. Do not substitute adoption or telemetry.',
  },
];

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
}

function text(x, y, lines, className, lineHeight = 14) {
  if (!lines.length) return '';
  const [first, ...rest] = lines;
  return `<text x="${x}" y="${y}" text-anchor="middle" class="${className}"><tspan>${esc(first)}</tspan>${rest.map((line) => `<tspan x="${x}" dy="${lineHeight}">${esc(line)}</tspan>`).join('')}</text>`;
}

function box(x, y, width, height, tag, title, details = [], focus = false) {
  const cx = x + width / 2;
  const titleLines = Array.isArray(title) ? title : [title];
  const titleY = y + (titleLines.length > 1 ? 40 : 42);
  const detailsY = titleY + (titleLines.length > 1 ? titleLines.length * 14 : 16);
  return `<g><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="6" class="node${focus ? ' focus' : ''}"/>` +
    text(cx, y + 18, [tag], 'eyebrow') +
    text(cx, titleY, titleLines, 'node-name') +
    text(cx, detailsY, details, 'detail', 12) + '</g>';
}

function diamond(x, y, width, height, labelLines) {
  const cx = x + width / 2;
  const cy = y + height / 2;
  const points = `${cx},${y} ${x + width},${cy} ${cx},${y + height} ${x},${cy}`;
  const firstY = cy - ((labelLines.length - 1) * 7);
  return `<g><polygon points="${points}" class="decision"/>${text(cx, firstY, labelLines, 'node-name')}</g>`;
}

function straight(x1, y1, x2, y2, label = '', lx = 0, ly = 0) {
  const edge = `<path d="M ${x1} ${y1} L ${x2} ${y2}" class="arrow" marker-end="url(#arrow)"/>`;
  return edge + (label ? arrowLabel(lx, ly, label) : '');
}

function elbow(points, label = '', lx = 0, ly = 0) {
  const radius = 8;
  let path = `M ${points[0][0]} ${points[0][1]}`;
  for (let index = 1; index < points.length - 1; index++) {
    const previous = points[index - 1];
    const corner = points[index];
    const next = points[index + 1];
    const incomingLength = Math.hypot(corner[0] - previous[0], corner[1] - previous[1]);
    const outgoingLength = Math.hypot(next[0] - corner[0], next[1] - corner[1]);
    const r = Math.min(radius, incomingLength / 2, outgoingLength / 2);
    const before = [
      corner[0] - Math.sign(corner[0] - previous[0]) * r,
      corner[1] - Math.sign(corner[1] - previous[1]) * r,
    ];
    const after = [
      corner[0] + Math.sign(next[0] - corner[0]) * r,
      corner[1] + Math.sign(next[1] - corner[1]) * r,
    ];
    path += ` L ${before[0]} ${before[1]} Q ${corner[0]} ${corner[1]} ${after[0]} ${after[1]}`;
  }
  const end = points.at(-1);
  path += ` L ${end[0]} ${end[1]}`;
  const edge = `<path d="${path}" class="arrow" marker-end="url(#arrow)"/>`;
  return edge + (label ? arrowLabel(lx, ly, label) : '');
}

function arrowLabel(x, y, value) {
  const width = value.length * 6 + 12;
  return `<rect x="${x - width / 2}" y="${y - 10}" width="${width}" height="16" rx="2" class="label-mask"/><text x="${x}" y="${y + 1}" text-anchor="middle" class="arrow-label">${esc(value)}</text>`;
}

function stepCard(x, y, width, height, number, title, lines, focus = false) {
  const center = x + width / 2;
  const titleLines = Array.isArray(title) ? title : [title];
  const titleY = y + 74;
  return `<g><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="6" class="step-card${focus ? ' focus' : ''}"/>` +
    `<circle cx="${center}" cy="${y + 34}" r="18" class="step-number${focus ? ' focus' : ''}"/>` +
    text(center, y + 37, [number], 'number') +
    text(center, titleY, titleLines, 'node-name') +
    text(center, titleY + 28, lines, 'detail', 15) + '</g>';
}

function loopStations() {
  const cx = 320;
  const cy = 280;
  const radius = 208;
  const width = 128;
  const height = 60;
  const labels = [
    { title: 'Alert or block', detail: ['A control triggers'] },
    { title: 'Identify the limit', detail: ['Find the actual', 'limiting control'] },
    { title: 'Owner decides', detail: ['Approved action', 'not automatic spend'], focus: true },
    { title: 'Admin applies', detail: ['Confirm the', 'result'] },
    { title: 'Review outcome', detail: ['Update the', 'response playbook'] },
  ];
  const points = labels.map((label, index) => {
    const theta = -90 + index * 72;
    const radians = theta * Math.PI / 180;
    const sx = cx + radius * Math.cos(radians);
    const sy = cy + radius * Math.sin(radians);
    return { ...label, theta, cx: sx, cy: sy, x: sx - width / 2, y: sy - height / 2, width, height };
  });
  const intersections = points.map((point) => circleRectIntersections(cx, cy, radius, point));
  const ring = points.map((_, index) => {
    const next = (index + 1) % points.length;
    const start = intersections[index].exit;
    const end = intersections[next].entry;
    const endAngle = end.angle - (1.2 / radius) * 180 / Math.PI;
    const endPoint = { x: cx + radius * Math.cos(endAngle * Math.PI / 180), y: cy + radius * Math.sin(endAngle * Math.PI / 180) };
    return `<path d="M ${round(start.x)} ${round(start.y)} A ${radius} ${radius} 0 0 1 ${round(endPoint.x)} ${round(endPoint.y)}" class="arrow" marker-end="url(#arrow)"/>`;
  }).join('');
  const spokes = points.map((point) => {
    const radians = point.theta * Math.PI / 180;
    const ux = Math.cos(radians);
    const uy = Math.sin(radians);
    const fromScale = Math.min((width / 2) / Math.abs(ux || 1e-12), (height / 2) / Math.abs(uy || 1e-12));
    const hubScale = Math.min(72 / Math.abs(ux || 1e-12), 34 / Math.abs(uy || 1e-12));
    const from = { x: point.cx - ux * fromScale, y: point.cy - uy * fromScale };
    const to = { x: cx + ux * hubScale, y: cy + uy * hubScale };
    return `<path d="M ${round(from.x)} ${round(from.y)} L ${round(to.x)} ${round(to.y)}" class="spoke"/>`;
  }).join('');
  const nodes = points.map((point) => box(point.x, point.y, point.width, point.height, 'OPERATE', point.title, point.detail, point.focus)).join('');
  return ring + spokes +
    `<g><rect x="${cx - 72}" y="${cy - 34}" width="144" height="68" rx="6" class="hub"/>${text(cx, cy - 3, ['Response playbook'], 'node-name')}${text(cx, cy + 14, ['Reviewed outcomes'], 'detail')}</g>` +
    nodes;
}

function circleRectIntersections(cx, cy, radius, rect) {
  const candidates = [];
  for (const x of [rect.x, rect.x + rect.width]) {
    const dx = x - cx;
    const dy = Math.sqrt(Math.max(0, radius ** 2 - dx ** 2));
    for (const y of [cy - dy, cy + dy]) if (y >= rect.y - 0.01 && y <= rect.y + rect.height + 0.01) candidates.push({ x, y });
  }
  for (const y of [rect.y, rect.y + rect.height]) {
    const dy = y - cy;
    const dx = Math.sqrt(Math.max(0, radius ** 2 - dy ** 2));
    for (const x of [cx - dx, cx + dx]) if (x >= rect.x - 0.01 && x <= rect.x + rect.width + 0.01) candidates.push({ x, y });
  }
  const unique = [...new Map(candidates.map((point) => [`${round(point.x)}:${round(point.y)}`, point])).values()]
    .map((point) => ({ ...point, angle: normalize(Math.atan2(point.y - cy, point.x - cx) * 180 / Math.PI) }));
  const theta = normalize(rect.theta);
  const entry = unique.reduce((best, point) => normalize(theta - point.angle) < normalize(theta - best.angle) ? point : best);
  const exit = unique.reduce((best, point) => normalize(point.angle - theta) < normalize(best.angle - theta) ? point : best);
  return { entry, exit };
}

function normalize(angle) {
  return ((angle % 360) + 360) % 360;
}

function round(value) {
  return Number(value.toFixed(3));
}

function svgMarkup(definition, themeName) {
  const skin = skins[themeName];
  const [ , , width, height] = definition.viewBox.split(' ').map(Number);
  const slug = `${definition.name}-${themeName}`;
  const generatedNodes = definition.nodes();
  const body = (Array.isArray(generatedNodes) ? generatedNodes.join('') : generatedNodes)
    .replaceAll('url(#arrow)', `url(#${slug}-arrow)`) +
    (definition.note ? text(320, height - 24, [definition.note], 'note') : '');
  return `<svg viewBox="${definition.viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="${slug}-title ${slug}-desc">
  <title id="${slug}-title">${esc(definition.title)}</title>
  <desc id="${slug}-desc">${esc(definition.description)}</desc>
  <defs><marker id="${slug}-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M 0 0 L 8 3 L 0 6 Z" fill="${skin.muted}"/></marker></defs>
  <style>
    svg { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; color: ${skin.ink}; }
    .paper { fill: ${skin.paper}; }
    .node, .step-card { fill: ${skin.surface}; stroke: ${skin.rule}; stroke-width: 1.5; }
    .node.focus, .step-card.focus { fill: ${skin.tint}; stroke: ${skin.accent}; stroke-width: 2; }
    .decision { fill: ${skin.surface}; stroke: ${skin.ink}; stroke-width: 1.5; }
    .hub { fill: ${skin.tint}; stroke: ${skin.accent}; stroke-width: 1.5; }
    .step-number { fill: ${skin.paper}; stroke: ${skin.rule}; stroke-width: 1.5; }
    .step-number.focus { fill: ${skin.accent}; stroke: ${skin.accent}; }
    .eyebrow, .detail, .note { fill: ${skin.muted}; }
    .node-name, .number { fill: ${skin.ink}; }
    .arrow { fill: none; stroke: ${skin.muted}; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; marker-end: url(#${slug}-arrow); }
    .spoke { fill: none; stroke: ${skin.muted}; stroke-width: 1; stroke-dasharray: 4 3; }
    .eyebrow { font-size: 8px; font-weight: 600; letter-spacing: .12em; }
    .node-name { font-size: 12px; font-weight: 600; }
    .detail { font-size: 9px; }
    .arrow-label { fill: ${skin.muted}; font-size: 8px; font-weight: 600; letter-spacing: .06em; }
    .label-mask { fill: ${skin.paper}; }
    .number { font-size: 9px; font-weight: 600; }
    .note { font-size: 10px; }
  </style>
  <rect x="0" y="0" width="${width}" height="${height}" class="paper"/>
  ${definition.arrows.map((arrow) => arrow.replaceAll('url(#arrow)', `url(#${slug}-arrow)`)).join('')}${body}
</svg>`;
}

function documentHtml(definition, theme, svg) {
  const skin = skins[theme];
  return `<!doctype html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>${esc(definition.title)}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 24px; background: ${skin.paper}; color: ${skin.ink}; font: 14px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
    main { max-width: 704px; margin: 0 auto; }
    .eyebrow { color: ${skin.muted}; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
    h1 { margin: 8px 0 20px; font-size: 24px; line-height: 1.2; }
    .diagram-container { overflow-x: auto; border: 1px solid ${skin.rule}; border-radius: 6px; background: ${skin.paper}; }
    .diagram-container:focus-visible { outline: 2px solid ${skin.accent}; outline-offset: 3px; }
    svg { display: block; width: 100%; min-width: ${definition.viewBox.split(' ')[2]}px; height: auto; }
    figcaption { margin-top: 12px; color: ${skin.muted}; font-size: 12px; }
    nav { display: flex; gap: 16px; margin-top: 12px; }
    a { color: ${skin.link}; text-underline-offset: 3px; }
    @media print { body { padding: 0; } .diagram-container { overflow: visible; } svg { min-width: 0; } nav { display: none; } }
  </style>
</head>
<body>
  <main>
    <p class="eyebrow">AI Credits guide · ${esc(definition.type)}</p>
    <h1>${esc(definition.title)}</h1>
    <figure>
      <div class="diagram-container" tabindex="0" role="region" aria-label="${esc(definition.title)}. Scroll horizontally to explore.">${svg}</div>
      <figcaption>${esc(definition.description)}</figcaption>
    </figure>
    <nav aria-label="Diagram variants"><a href="${definition.name}.light.html">Light version</a><a href="${definition.name}.dark.html">Dark version</a></nav>
  </main>
</body>
</html>
`;
}

function dashboardHtml(theme) {
  const skin = skins[theme];
  return `<!doctype html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>A billing dashboard without invented data</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 24px; background: ${skin.paper}; color: ${skin.ink}; font: 14px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
    main { max-width: 704px; margin: 0 auto; }
    .eyebrow { color: ${skin.muted}; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
    h1 { margin: 8px 0; font-size: 24px; line-height: 1.2; }
    .notice { margin: 0 0 16px; color: ${skin.muted}; }
    .panels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .panel { min-width: 0; padding: 16px; border: 1px solid ${skin.rule}; border-radius: 6px; background: ${skin.surface}; }
    .panel h2 { margin: 4px 0 12px; font-size: 15px; }
    .panel p { margin: 8px 0 0; }
    .label { color: ${skin.muted}; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; }
    code { overflow-wrap: anywhere; color: ${skin.ink}; font: 12px/1.5 ui-monospace, SFMono-Regular, Consolas, monospace; }
    figcaption { margin-top: 16px; color: ${skin.muted}; font-size: 12px; }
    nav { display: flex; gap: 16px; margin-top: 12px; }
    a { color: ${skin.link}; text-underline-offset: 3px; }
    @media (max-width: 520px) { .panels { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main>
    <p class="eyebrow">AI Credits guide · Accessible dashboard figure</p>
    <h1>A billing dashboard without invented data</h1>
    <p class="notice">Panel definitions only — no live values are shown.</p>
    <figure class="dashboard-figure">
      <div class="panels">
        <section class="panel" aria-labelledby="panel-models">
          <p class="label">Usage</p><h2 id="panel-models">Consumption by model</h2>
          <p><span class="label">Source fields</span><br><code>model, unit_type, quantity</code></p>
          <p><span class="label">Question</span><br>Which models drive reported usage?</p>
        </section>
        <section class="panel" aria-labelledby="panel-charges">
          <p class="label">Cost attribution</p><h2 id="panel-charges">Net charges by cost owner</h2>
          <p><span class="label">Source fields</span><br><code>cost_center_name, net_amount</code></p>
          <p><span class="label">Question</span><br>Where are charges attributed?</p>
        </section>
        <section class="panel" aria-labelledby="panel-unassigned">
          <p class="label">Ownership review</p><h2 id="panel-unassigned">Unassigned usage</h2>
          <p><span class="label">Source query</span><br><code>cost_center_id = none</code></p>
          <p><span class="label">Question</span><br>What needs ownership review?</p>
        </section>
        <section class="panel" aria-labelledby="panel-freshness">
          <p class="label">Local metadata</p><h2 id="panel-freshness">Export freshness</h2>
          <p><span class="label">Source field</span><br><code>fetched_at</code></p>
          <p><span class="label">Question</span><br>How current is this report?</p>
        </section>
      </div>
      <figcaption>Client telemetry belongs in a separate diagnostic view. Tokens, latency and tool calls diagnose behavior; they are not billed charges.</figcaption>
    </figure>
    <nav aria-label="Figure variants"><a href="grafana-dashboard.light.html">Light version</a><a href="grafana-dashboard.dark.html">Dark version</a></nav>
  </main>
</body>
</html>
`;
}

function expectedFiles() {
  const files = new Map();
  for (const definition of definitions) {
    for (const theme of ['light', 'dark']) {
      const svg = svgMarkup(definition, theme);
      files.set(`${definition.name}.${theme}.html`, documentHtml(definition, theme, svg));
      files.set(`${definition.name}.${theme}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n${svg}\n`);
    }
  }
  for (const theme of ['light', 'dark']) files.set(`grafana-dashboard.${theme}.html`, dashboardHtml(theme));
  return files;
}

const expected = expectedFiles();
const knownLegacy = /^(?:agent-meters|attribution-pipeline|cap-or-continuity|cost-center-controls|credit-lifecycle|grafana-dashboard|layered-guardrails|operating-loop|rollout-roadmap|visualisation-map)\.(?:html|svg|excalidraw)$/;
const legacyAsset = (name) => knownLegacy.test(name) ||
  /^(?:agent-meters|attribution-pipeline|cap-or-continuity|cost-center-controls|credit-lifecycle|grafana-dashboard|layered-guardrails|operating-loop|rollout-roadmap|visualisation-map)\.excalidraw$/.test(name) ||
  /^grafana-dashboard\.(?:light|dark)\.svg$/.test(name);

if (check) {
  const current = new Set(await readdir(output));
  for (const [name, content] of expected) {
    const actual = await readFile(resolve(output, name), 'utf8').catch(() => null);
    if (actual !== content) throw new Error(`Stale diagram asset: ${name}`);
    current.delete(name);
  }
  const stale = [...current].filter(legacyAsset);
  if (stale.length) throw new Error(`Unexpected legacy diagram assets: ${stale.join(', ')}`);
  console.log(`Verified ${expected.size} regenerated diagram assets; no legacy Excalidraw sources or wrappers.`);
} else {
  await mkdir(output, { recursive: true });
  for (const [name, content] of expected) await writeFile(resolve(output, name), content);
  for (const name of await readdir(output)) {
    if (legacyAsset(name)) await rm(resolve(output, name));
  }
  console.log(`Generated ${expected.size} site-matched diagram assets from semantic definitions.`);
}
