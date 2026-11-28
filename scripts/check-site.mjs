import assert from 'node:assert/strict';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:net';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { guides, platformReferences } from '../guides.mjs';
import { guides as howTos } from '../guides/copilot-how-tos/src/manifest.ts';
import { landingPath, lessonRoutes, sourcePath } from '../guides/copilot-how-tos/src/course.ts';

const existingGuides = [
  ['ai-credits-guide', 4, 'astro'],
  ['data-residency-guide', 10, 'astro'],
  ['copilot-governance-guide', 6, 'astro'],
  ['copilot-control-map-guide', 6, 'astro'],
  ['copilot-policy-conflicts-guide', 6, 'astro'],
  ['copilot-managed-settings-guide', 6, 'astro'],
  ['copilot-mcp-governance-guide', 6, 'astro'],
  ['copilot-customization-governance-guide', 6, 'astro'],
  ['copilot-local-sandboxing-guide', 6, 'astro'],
  ['copilot-cloud-agent-security-guide', 6, 'astro'],
  ['copilot-automations-governance-guide', 6, 'astro'],
  ['copilot-network-controls-guide', 6, 'astro'],
  ['copilot-content-controls-guide', 6, 'astro'],
  ['copilot-session-data-guide', 6, 'astro'],
  ['copilot-audit-telemetry-guide', 6, 'astro'],
  ['copilot-metrics-guide', 6, 'astro'],
  ['copilot-model-governance-guide', 6, 'astro'],
  ['copilot-rollout-playbook-guide', 6, 'astro'],
  ['champions-at-scale', 3, 'static'],
  ['github-enterprise-field-guide', 10, 'static'],
  ['agentic-engineering-guide', 10, 'static'],
];
assert.equal(guides.length, existingGuides.length + howTos.length);
for (const [name, parts, type] of existingGuides) {
  const matches = guides.filter(guide => guide.name === name);
  assert.equal(matches.length, 1, `${name} must remain registered exactly once`);
  assert.equal(matches[0].parts, parts);
  assert.equal(matches[0].type, type);
}
assert.deepEqual(
  guides.filter(guide => guide.workspace === 'copilot-how-tos').map(guide => guide.name).sort(),
  howTos.map(guide => guide.slug).sort(),
);

const agenticChapters = [
  'terminology',
  'aiops-devops',
  'factories',
  'mcp-api',
  'agentic-observability',
  'ai-observability',
  'harness',
  'evaluation',
  'llm-observability',
  'llmops',
];

for (const guide of guides) {
  assert.doesNotMatch(guide.description, /\bguides?\b/i, `${guide.name} description must describe the topic without "guide"`);
}

async function findFreePort() {
  const probe = createServer();
  await new Promise((resolve, reject) => {
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', resolve);
  });
  const { port } = probe.address();
  await new Promise((resolve, reject) => probe.close(error => error ? reject(error) : resolve()));
  return port;
}

const requestedPort = Number(process.env.PORT);
const port = requestedPort > 0 ? requestedPort : await findFreePort();
const base = `http://127.0.0.1:${port}/field-guides/`;
const server = spawn('bun', ['run', 'preview'], { stdio: 'inherit', env: { ...process.env, PORT: String(port) } });
let browser;
try {
  await new Promise((ready, reject) => {
    server.once('error', reject);
    server.once('exit', code => reject(new Error(`Preview exited: ${code}`)));
    const started = Date.now();
    const probe = async () => {
      if (Date.now() - started > 15000) return reject(new Error('Preview did not start'));
      try {
        if ((await fetch(base)).ok) return ready();
      } catch {}
      setTimeout(probe, 100);
    };
    probe();
  });
  const targets = new Set([base]);
  async function inspect(directory, relative = '') {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(relative, entry.name);
      if (entry.isDirectory()) await inspect(join(directory, entry.name), path);
      else if (entry.name.endsWith('.html')) {
        const pageURL = new URL(path, base);
        targets.add(pageURL.href);
        const html = await readFile(join(directory, entry.name), 'utf8');
        const markup = html.replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/gi, '$1$2');
        for (const [, value] of markup.matchAll(/(?:href|src)="([^"]+)"/g)) {
          const url = new URL(value.replaceAll('&amp;', '&'), pageURL);
          if (url.origin === pageURL.origin) {
            assert.ok(url.pathname.startsWith('/field-guides/'), `Escaped project base: ${url}`);
            url.hash = '';
            targets.add(url.href);
          }
        }
      }
    }
  }
  await inspect('dist');
  for (const url of targets) {
    const response = await fetch(url);
    assert.equal(response.status, 200, `Broken route or asset: ${url}`);
    await response.arrayBuffer();
  }
  assert.equal((await fetch(`${base}%2e%2e%2fpackage.json`)).status, 403);
  assert.equal((await fetch(`${base}%ZZ`)).status, 400);
  assert.equal((await fetch(`${base}missing/`)).status, 404);

  browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400 && response.url().startsWith(base)) errors.push(`${response.status()} ${response.url()}`);
  });
  const checkedLinks = new Set();
  const collectionLink = guide => page.getByRole('link', {
    name: guide.type === 'astro' && guide.workspace !== 'copilot-how-tos' ? 'All guides' : 'Enterprise enablement',
    exact: true,
  });
  const landingStyle = () => page.locator('.landing').evaluate(landing => {
    const style = selector => getComputedStyle(landing.querySelector(selector));
    return {
      background: getComputedStyle(document.body).backgroundColor,
      cardBackground: style('.part-card').backgroundColor,
      headingFont: style('h1').fontFamily,
      headingWeight: style('h1').fontWeight,
      cardAlignment: style('.part-card').textAlign,
      buttonRadius: style('.landing-button').borderTopLeftRadius,
    };
  });
  const sharedLandingStyle = style => Object.fromEntries(Object.entries(style).filter(([key]) => key !== 'headingFont'));
  const expectLanding = async (guide, width) => {
    const landing = page.locator('.landing');
    assert.equal(await page.locator('h1').count(), 1, `${guide.name} needs exactly one page title`);
    assert.equal(await landing.locator('h1').isVisible(), true, `${guide.name} landing needs a title`);
    assert.equal(await landing.locator('.landing-intro').textContent(), guide.description, `${guide.name} hero description must match the collection`);
    assert.equal(await page.locator('.topbar .brand-mark').isVisible(), true, `${guide.name} header needs the GitHub mark`);
    assert.equal(await collectionLink(guide).isVisible(), true, `${guide.name} needs a visible return to the collection at ${width}px`);
    if (guide.type === 'astro' && guide.workspace !== 'copilot-how-tos') {
      const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' });
      assert.equal(await breadcrumb.locator('ol').count(), 1, `${guide.name} breadcrumb needs an ordered hierarchy`);
      const current = breadcrumb.locator('[aria-current=page]');
      assert.equal(await current.count(), 1, `${guide.name} breadcrumb needs one current page`);
      assert.equal((await current.textContent()).trim(), guide.title, `${guide.name} breadcrumb must identify the guide overview`);
      assert.equal(await page.locator('main .landing').count(), 1, `${guide.name} landing belongs in the main landmark`);
      assert.equal(await page.locator('.sidebar, .toc, .course-outline, .page-title').count(), 0, `${guide.name} landing must not repeat the legacy course index`);
      assert.equal(await page.locator('#page-sources').isVisible(), true, `${guide.name} must retain source notes`);
      const hero = await page.locator('.landing-hero').boundingBox();
      const parts = await page.locator('#parts-title').boundingBox();
      assert.ok(parts.y >= hero.y + hero.height, `${guide.name} parts must follow the landing hero`);
      for (let part = 1; part <= guide.parts; part++) {
        assert.equal(await page.locator(`#part-${part}`).count(), 1, `${guide.name} must preserve Part ${part}'s fragment target`);
      }
    } else {
      assert.equal(await page.locator('main .hero, main .intro, main .hero-bottom, #hero-title, .hero-footnote, main .page-meta').count(), 0, `${guide.name} must not repeat the old hero below the landing`);
      assert.equal(await page.getByRole('heading', { name: /^(GitHub Enterprise\s+platform governance|A rollout reaches people\.)/ }).count(), 0, `${guide.name} must not repeat the old title`);
      assert.equal(await page.getByRole('link', { name: 'Make the case' }).count(), 0, `${guide.name} must not repeat the old hero action`);
      if (guide.name === 'github-enterprise-field-guide') {
        assert.match(await page.locator('.scope-note').textContent(), /Where this fits:/);
        assert.equal(await page.locator('nav[aria-label="Assessment sections"] a').count(), guide.parts);
        assert.equal(await page.locator('.prog #reset').isVisible(), true);
      } else if (guide.name === 'champions-at-scale') {
        assert.equal(await page.locator('.chapter-nav').count(), 1, 'Champions contents must remain');
        assert.equal(await page.getByRole('complementary', { name: 'On this page', includeHidden: true }).count(), 1);
        assert.equal(await page.locator('svg[data-diagram="architecture-delta"]').count(), 1);
        assert.match(await page.locator('.diagram-embed').first().locator('figcaption').textContent(), /Central policy and specialist support remain in place/);
      } else if (guide.name === 'agentic-engineering-guide') {
        await page.evaluate(() => document.fonts.ready);
        assert.match(await landing.locator('h1').evaluate(heading => getComputedStyle(heading).fontFamily), /^"Mona Sans"/, 'Agentic title must use Mona Sans');
        assert.equal(await landing.locator('h1').evaluate(heading => document.fonts.check(`700 ${getComputedStyle(heading).fontSize} "Mona Sans"`)), true, 'Mona Sans must load for the agentic title');
        const chapters = page.locator('.chapter[data-part]');
        assert.equal(await chapters.count(), guide.parts, 'Each agentic engineering part needs a chapter');
        const navigation = page.locator('.guide-nav .chapter-nav');
        await page.waitForFunction(expanded => document.querySelector('.guide-nav .chapter-nav')?.open === expanded, width > 760);
        assert.equal(await navigation.locator('.guide-part').count(), guide.parts, 'Guide navigation needs a link for every part');
        assert.equal(await navigation.evaluate(details => details.open), width > 760, 'Guide navigation should be expanded on desktop and collapsed on mobile');
        assert.equal(await navigation.locator('summary').isVisible(), width <= 760, 'Guide navigation disclosure should be visible on mobile');
        if (width <= 760) await navigation.locator('summary').click();
        await navigation.locator('a[href="#mcp-api"]').click();
        await page.waitForFunction(() => document.querySelector('.guide-nav a[href="#mcp-api"]')?.getAttribute('aria-current') === 'location');
        if (width <= 760) assert.equal(await navigation.evaluate(details => details.open), false, 'Mobile guide navigation should close after selecting a part');
        for (const [index, id] of agenticChapters.entries()) {
          const chapter = chapters.nth(index);
          assert.equal(await chapter.getAttribute('data-part'), String(index + 1), 'Chapters must stay in topic order');
          assert.equal(await chapter.getAttribute('id'), id, `Part ${index + 1} needs its fragment target`);
          assert.equal(await landing.locator('.part-card a').nth(index).getAttribute('href'), `#${id}`, `Part ${index + 1} card must open its chapter`);
          assert.ok(await chapter.locator('a[href^="https://docs.github.com/"]').count() > 0, `Part ${index + 1} needs GitHub documentation`);
          const preview = chapter.locator('[data-skill-preview]');
          assert.equal(await preview.count(), 1, `Part ${index + 1} needs its own Agent Skill`);
          const skillName = await preview.getAttribute('data-skill-name');
          const skillLink = preview.getByRole('link', { name: 'Download SKILL.md', exact: true, includeHidden: true });
          const skillPath = `assets/agentic-engineering-skills/${skillName}/SKILL.md`;
          assert.equal(await skillLink.getAttribute('href'), skillPath, `Part ${index + 1} skill download must match its skill folder`);
          assert.equal(await skillLink.getAttribute('download'), 'SKILL.md', `Part ${index + 1} skill must download as SKILL.md`);
          const copyButton = preview.locator('.code-block-copy');
          assert.equal(await copyButton.getAttribute('aria-label'), 'Copy skill Markdown', 'The copy icon needs an accessible label');
          assert.equal(await copyButton.locator('svg[aria-hidden="true"] use').getAttribute('href'), '#skill-copy-icon', 'The copy action needs its clipboard icon');
          assert.match(await preview.locator('.skill-preview-body').textContent(), new RegExp(`\\.github/skills/${skillName}/SKILL\\.md`), `Part ${index + 1} must explain its install path`);
          const sourceResponse = await fetch(new URL(skillPath, page.url()));
          assert.equal(sourceResponse.status, 200, `Part ${index + 1} skill file must be served`);
          const skillSource = await sourceResponse.text();
          assert.match(skillSource, new RegExp(`^---\\r?\\nname: ${skillName}\\r?\\n`, 'm'), `Part ${index + 1} skill needs matching Copilot metadata`);
          if (index === 0) {
            const codeBlock = preview.locator('[data-code-block]');
            await preview.locator('summary').click();
            await preview.locator('[data-code-block][data-loaded="true"]').waitFor();
            assert.equal(await codeBlock.locator('code').textContent(), skillSource, 'The first code block must show its actual skill source');
            assert.ok(await codeBlock.locator('.md-yaml-key').count() > 0, 'Skill front matter must be syntax highlighted');
            assert.ok(await codeBlock.locator('.md-heading-text').count() > 0, 'Skill headings must be syntax highlighted');
            assert.ok(await codeBlock.locator('.md-list-marker').count() > 0, 'Skill list markers must be syntax highlighted');
            assert.ok(await codeBlock.locator('.md-strong').count() > 0, 'Skill emphasis must be syntax highlighted');
            assert.equal(await copyButton.isEnabled(), true, 'The skill copy action must be enabled once its source loads');
            const wrapButton = codeBlock.locator('.code-block-wrap');
            await wrapButton.click();
            assert.equal(await wrapButton.getAttribute('aria-pressed'), 'true', 'Skill code blocks must offer a wrap mode');
            assert.equal(await codeBlock.locator('code').evaluate(code => getComputedStyle(code).whiteSpace), 'pre-wrap', 'Wrapped Markdown lines must not require horizontal scrolling');
            await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {
              configurable: true,
              value: { writeText: text => { window.__copiedSkill = text; return Promise.resolve(); } },
            }));
            await copyButton.click();
            await page.waitForFunction(() => document.querySelector('[data-skill-name="agentic-vocabulary-review"] .code-block-copy')?.dataset.copied === 'true');
            assert.equal(await copyButton.locator('use').getAttribute('href'), '#skill-copied-icon', 'Copy success should replace the clipboard glyph with a confirmation icon');
            assert.equal(await page.evaluate(() => window.__copiedSkill), skillSource, 'Copy must put the full Markdown source on the clipboard');
            assert.equal(await codeBlock.locator('.code-block-status').textContent(), 'Skill Markdown copied to the clipboard.', 'Copy success must be announced');
          }
        }
        const diagrams = page.locator('figure.diagram-embed');
        assert.equal(await diagrams.count(), 7, 'Agentic guide needs its seven concept diagrams');
        for (const svg of await diagrams.locator('.diagram-scroll > svg[role="img"]').all()) {
          const [title, desc] = (await svg.getAttribute('aria-labelledby')).split(' ');
          assert.ok(await svg.locator(`title#${title}`).count() && await svg.locator(`desc#${desc}`).count(), 'Each diagram needs an accessible title and description');
        }
        assert.equal(await diagrams.locator('.diagram-scroll > svg[role="img"]').count(), 7, 'Each diagram needs an accessible SVG');
      }
    }
    assert.equal(await landing.locator('.landing-button').count(), 2, `${guide.name} landing needs two buttons`);
    assert.equal(await landing.locator('.landing-art').evaluate(image => image.complete && image.naturalWidth > 0), true, `${guide.name} illustration must load`);
    const art = await landing.locator('.landing-art').boundingBox();
    const copy = await landing.locator('.landing-copy').boundingBox();
    assert.ok(width > 760 ? art.x >= copy.x + copy.width : art.y >= copy.y + copy.height, `${guide.name} illustration must sit right of the copy on desktop and below it on mobile`);
    const links = await landing.locator('.part-card a').evaluateAll(anchors => anchors.map(anchor => anchor.href));
    assert.equal(links.length, guide.parts, `${guide.name} needs ${guide.parts} part cards`);
    for (const href of [...links, ...await landing.locator('.landing-button').evaluateAll(anchors => anchors.map(anchor => anchor.href))]) {
      if (checkedLinks.has(href)) continue;
      const url = new URL(href);
      assert.equal((await fetch(url)).status, 200, `${guide.name} link ${href} must resolve`);
      if (url.hash) assert.equal(await page.locator(url.hash).count(), 1, `${guide.name} anchor ${url.hash} must exist`);
      checkedLinks.add(href);
    }
  };
  const expectHeaderLayout = async context => {
    const layout = await page.locator('.topbar').evaluate(header => {
      const menu = header.querySelector('.history-menu');
      const actions = menu.parentElement;
      const actionParent = header.querySelector('.header-main') || header;
      const theme = header.querySelector('#theme, [data-theme-toggle]');
      const rect = actionParent.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const label = theme.closest('.theme-label');
      return {
        last: actionParent.lastElementChild === actions && actions.lastElementChild === menu,
        themeBeforeMenu: Boolean(theme.compareDocumentPosition(menu) & Node.DOCUMENT_POSITION_FOLLOWING),
        rightOffset: rect.right - menuRect.right - parseFloat(getComputedStyle(actionParent).paddingRight),
        consolidated: !label || (parseFloat(getComputedStyle(label).borderLeftWidth) > 0 &&
          parseFloat(getComputedStyle(theme).borderLeftWidth) === 0),
      };
    });
    assert.equal(layout.last, true, `${context} history menu must be last in the header`);
    assert.equal(layout.themeBeforeMenu, true, `${context} theme control must precede the history menu`);
    assert.ok(Math.abs(layout.rightOffset) < 2, `${context} history menu must align to the right edge`);
    assert.equal(layout.consolidated, true, `${context} theme icon and selector must share one border`);
  };
  for (const width of [1600, 1440, 855, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark']) {
      await page.goto(base);
      await page.selectOption('#theme', theme);
      await page.reload();
      assert.equal(await page.title(), 'Enterprise enablement', 'Hub must use the approved collection name');
      assert.equal(await page.locator('.brand').getAttribute('aria-label'), 'Enterprise enablement home');
      assert.equal((await page.locator('.brand').textContent()).trim(), 'Enterprise enablement');
      assert.equal(await page.locator('header .github-link').getAttribute('href'), 'https://github.com/ragmha/field-guides', 'Hub header must retain its GitHub link');
      assert.equal(await page.locator('header.topbar a[href="#guides"]').count(), 0, 'Hub header must not repeat the Browse guides action');
      assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'), 'Enterprise enablement');
      assert.ok((await page.locator('.article-footer').textContent()).startsWith('Enterprise enablement '));
      const hubHeader = await page.locator('header.topbar').evaluate(header => {
        const brand = header.querySelector('.brand');
        const icon = header.querySelector('.brand-mark');
        const theme = header.querySelector('.theme-label');
        return {
          display: getComputedStyle(header).display,
          position: getComputedStyle(header).position,
          iconFill: getComputedStyle(icon).fill,
          brandColor: getComputedStyle(brand).color,
          brandRight: brand.getBoundingClientRect().right,
          themeLeft: theme.getBoundingClientRect().left,
        };
      });
      assert.equal(hubHeader.display, 'flex', `Hub header must retain its layout at ${width}px`);
      assert.equal(hubHeader.position, 'sticky', `Hub header must remain sticky at ${width}px`);
      assert.equal(hubHeader.iconFill, hubHeader.brandColor, `Hub mark must follow the theme at ${width}px`);
      assert.ok(hubHeader.brandRight <= hubHeader.themeLeft, `Hub header controls must not overlap at ${width}px`);
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
      assert.equal(await page.locator('header [data-history-menu]').getAttribute('data-history-href'), `${base}history/`);
      assert.equal(await page.locator('header .history-trigger').isVisible(), true);
      assert.equal(await page.locator('header .history-trigger svg').count(), 1);
      assert.equal(await page.locator('header .history-trigger img').count(), 0);
      await expectHeaderLayout(`Hub at ${width}px`);
      assert.equal(await page.locator('#guides .guide-card').count(), guides.length);
      assert.deepEqual(await page.locator('#guides .guide-card > p:not([data-reading-progress])').allTextContents(), guides.map(guide => guide.description));
      assert.deepEqual(await page.locator('#guides .guide-card h3').allTextContents(), guides.map(guide => guide.title));
      assert.deepEqual(
        await page.locator('#guides .guide-card .get-started').evaluateAll(links => links.map(link => link.href)),
        guides.map(guide => `${base}${guide.name}/`),
      );
      assert.equal(await page.locator('#platform-references .reference-card').count(), platformReferences.length);
      assert.equal(
        await page.locator('#platform-references a').getAttribute('href'),
        new URL(`${platformReferences[0].name}/`, base).pathname,
      );
      assert.equal(await page.locator('.hero-art').evaluate(image => image.complete && image.naturalWidth > 0), true, 'Hero illustration must load');
      const art = await page.locator('.hero-art').boundingBox();
      const copy = await page.locator('.hero-copy').boundingBox();
      assert.ok(width > 760 ? art.x >= copy.x + copy.width : art.y >= copy.y + copy.height, 'Hero illustration must sit right of the copy on desktop and below it on mobile');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Hub overflow at ${width}px`);
      const hubTheme = await page.evaluate(() => {
        const card = getComputedStyle(document.querySelector('.guide-card'));
        return {
          surface: card.backgroundColor,
          border: card.borderTopColor,
          radius: card.borderTopLeftRadius,
          grid: getComputedStyle(document.querySelector('main')).backgroundImage,
          accent: getComputedStyle(document.querySelector('.title-emphasis')).color,
        };
      });
      if (process.env.SCREENSHOT_DIR && [1440, 390].includes(width)) {
        await mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({ path: join(process.env.SCREENSHOT_DIR, `hub-${theme}-${width}.png`), fullPage: true });
      }
      await page.goto(`${base}history/`);
      assert.equal(await page.getByRole('heading', { name: 'Reading history' }).count(), 1);
      await expectHeaderLayout(`History at ${width}px`);
      assert.equal(await page.locator('.metric-card').count(), 0, 'History must not show summary metric cards');
      const historyTheme = await page.evaluate(() => {
        const card = getComputedStyle(document.querySelector('.chart-card'));
        return {
          surface: card.backgroundColor,
          border: card.borderTopColor,
          radius: card.borderTopLeftRadius,
          grid: getComputedStyle(document.querySelector('main')).backgroundImage,
          accent: getComputedStyle(document.querySelector('h1 span')).color,
        };
      });
      assert.deepEqual(historyTheme, hubTheme, `History must use the hub theme at ${width}px in ${theme} mode`);
      assert.equal(await page.locator('#activity-line').evaluate(line => getComputedStyle(line).stroke), hubTheme.accent);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `History overflow at ${width}px`);
      if (width <= 540) assert.equal(await page.locator('#activity-ticks span:visible').count(), 3, 'Mobile chart labels must stay legible');
      if (process.env.SCREENSHOT_DIR && [1440, 390].includes(width)) {
        await page.screenshot({ path: join(process.env.SCREENSHOT_DIR, `history-${theme}-${width}.png`), fullPage: true });
      }
      await page.goto(`${base}github-enterprise-field-guide/`);
      const collectionStyle = await landingStyle();
      for (const guide of guides) {
        await page.goto(`${base}${guide.name}/`);
        assert.equal(await page.locator('html').getAttribute('data-theme'), theme, `${guide.name} must inherit ${theme}`);
        assert.equal(await collectionLink(guide).evaluate(link => link.href), base, `${guide.name} collection link must lead to the hub`);
        assert.equal(await page.locator('header [data-history-menu]').getAttribute('data-history-href'), `${base}history/`, `${guide.name} header must link to history`);
        assert.equal(await page.locator('header .history-trigger').isVisible(), true);
        assert.equal(await page.locator('header .history-trigger svg').count(), 1);
        await expectHeaderLayout(`${guide.name} at ${width}px`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${guide.name} overflow at ${width}px`);
        await expectLanding(guide, width);
        if (guide.name === 'agentic-engineering-guide') {
          assert.deepEqual(sharedLandingStyle(await landingStyle()), sharedLandingStyle(collectionStyle), `Agentic landing layout must match the collection at ${width}px in ${theme} mode`);
        }
        if (process.env.SCREENSHOT_DIR && [1440, 390].includes(width)) {
          await page.screenshot({
            path: join(process.env.SCREENSHOT_DIR, `landing-${guide.name}-${theme}-${width}.png`),
            fullPage: true,
          });
        }
        if (guide.name === 'github-enterprise-field-guide' && width === 390 && theme === 'light') {
          const card = page.locator('.part-card a[href="#identity"]');
          await card.click();
          assert.equal(await page.locator('#identity').evaluate(section => section.open), true, 'Mobile part card must open its section');
          await page.locator('#identity > summary').click();
          await card.click();
          assert.equal(await page.locator('#identity').evaluate(section => section.open), true, 'Same-fragment card navigation must reopen its section');
          await page.locator('input[name="i1"][value="y"]').check();
          assert.equal(await page.locator('#count').textContent(), '1');
          await page.reload();
          assert.equal(await page.locator('input[name="i1"][value="y"]').isChecked(), true, 'Assessment answers must survive reload');
          assert.equal(await page.locator('#count').textContent(), '1');
          await page.locator('#reset').click();
          assert.equal(await page.locator('#count').textContent(), '0');
          await page.reload();
          assert.equal(await page.locator('input:checked').count(), 0, 'Reset must clear saved assessment answers');
        }
        if (guide.type === 'astro' && guide.workspace !== 'copilot-how-tos' && [855, 320].includes(width) && theme === 'light') {
          await page.locator('#parts-title').evaluate(heading => heading.scrollIntoView({ block: 'start', behavior: 'instant' }));
          const landingPosition = await page.evaluate(() => ({
            header: document.querySelector('header.topbar').getBoundingClientRect().bottom,
            heading: document.querySelector('#parts-title').getBoundingClientRect().top,
          }));
          assert.ok(landingPosition.heading >= landingPosition.header - 1, `${guide.name} header must not cover the parts heading at ${width}px`);
          const start = await page.locator('.landing-button').first().getAttribute('href');
          await page.goto(new URL(start, page.url()).href);
          assert.equal(await collectionLink(guide).isVisible(), true, `${guide.name} lessons need collection navigation`);
          const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' });
          const overview = breadcrumb.getByRole('link', { name: guide.title, exact: true });
          assert.equal(await overview.isVisible(), true, `${guide.name} lessons need overview navigation`);
          const current = breadcrumb.locator('[aria-current=page]');
          assert.equal(await current.count(), 1, `${guide.name} lessons need one current page`);
          assert.equal((await current.textContent()).replace(/\s+/g, ' ').trim(), (await page.locator('h1.page-title').textContent()).replace(/\s+/g, ' ').trim(), `${guide.name} breadcrumb must identify the lesson`);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${guide.name} lesson header overflow at ${width}px`);
          await page.locator('#page-sources').evaluate(heading => heading.scrollIntoView({ block: 'start', behavior: 'instant' }));
          const lessonPosition = await page.evaluate(() => {
            const sidebar = document.querySelector('.sidebar');
            return {
              header: document.querySelector('header.topbar').getBoundingClientRect().bottom,
              heading: document.querySelector('#page-sources').getBoundingClientRect().top,
              sidebar: sidebar.getBoundingClientRect().top,
              sticky: getComputedStyle(sidebar).position === 'sticky',
            };
          });
          assert.ok(lessonPosition.heading >= lessonPosition.header - 1, `${guide.name} header must not cover in-page headings at ${width}px`);
          if (lessonPosition.sticky) assert.ok(lessonPosition.sidebar >= lessonPosition.header - 1, `${guide.name} sidebar must start below the header at ${width}px`);
          if (guide.name === 'copilot-customization-governance-guide' && width === 855) {
            await page.setViewportSize({ width: 320, height: 1000 });
            await page.waitForFunction(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--guide-header-height')) === Math.ceil(document.querySelector('header.topbar').getBoundingClientRect().height));
            const section = page.locator('.prose h2[id]').first();
            await section.evaluate(heading => heading.scrollIntoView({ block: 'start', behavior: 'instant' }));
            const visible = await section.evaluate(heading => heading.getBoundingClientRect().top >= document.querySelector('header.topbar').getBoundingClientRect().bottom - 1);
            assert.equal(visible, true, 'Header offset must follow breadcrumb wrapping when the viewport changes');
            await page.setViewportSize({ width, height: 1000 });
          }
          await overview.focus();
          await Promise.all([page.waitForURL(`${base}${guide.name}/`), page.keyboard.press('Enter')]);
        }
        if (width <= 760 || width === 855) {
          await collectionLink(guide).focus();
          await Promise.all([page.waitForURL(base), page.keyboard.press('Enter')]);
          assert.equal(page.url(), base, `${guide.name} mobile home link must work with the keyboard`);
        }
      }
    }
  }
  const noJavaScript = await browser.newPage({ viewport: { width: 320, height: 1000 }, javaScriptEnabled: false });
  try {
    await noJavaScript.goto(`${base}copilot-customization-governance-guide/part-1/3-surface-support-check/`);
    const heading = noJavaScript.locator('.prose h2[id]').first();
    await heading.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
    assert.equal(await heading.evaluate(element => element.getBoundingClientRect().top >= document.querySelector('header.topbar').getBoundingClientRect().bottom - 1), true, 'Mobile headings must remain visible without JavaScript');
  } finally {
    await noJavaScript.close();
  }

  for (const guide of howTos) {
    const lessons = lessonRoutes(guide);
    assert.equal(lessons.length, 6);
    const paths = [landingPath(guide), ...lessons.map(lesson => lesson.path), sourcePath(guide)];
    for (let index = 1; index < paths.length; index++) {
      await page.goto(new URL(paths[index].slice(1), base).href);
      assert.equal(await page.locator('h1').count(), 1, `${paths[index]} needs a title`);
      assert.equal(await page.locator('nav[aria-label="Guide chapters"] .chapter-pages a').count(), 6);
      assert.equal(await page.locator('a[rel="prev"]').getAttribute('href'), `/field-guides${paths[index - 1]}`);
      assert.equal(await page.locator('a[rel="next"]').getAttribute('href'), `/field-guides${paths[index + 1] ?? paths[0]}`);
      if (index < paths.length - 1) {
        assert.equal(await page.locator('#page-sources').count(), 1, `${paths[index]} needs sources`);
      } else {
        assert.ok(await page.locator('.source-index a').count() > 0, `${paths[index]} needs a source index`);
      }
    }
  }
  await page.goto(`${base}github-enterprise-field-guide/ledger.html`);
  const ledgerHubLink = page.getByRole('link', { name: 'Enterprise enablement', exact: true });
  assert.equal(await ledgerHubLink.evaluate(link => link.href), base, 'Evidence ledger breadcrumb must link to the hub');
  await ledgerHubLink.click();
  assert.equal(page.url(), base, 'Evidence ledger breadcrumb must return to the collection');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${base}platform-references/`);
    assert.equal(await page.title(), 'GitHub and Azure AI landscape');
    assert.equal(await page.locator('[data-testid="treemap"]').isVisible(), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Landscape overflow at ${width}px`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight), true, `Landscape page scroll at ${width}px`);
    if (process.env.SCREENSHOT_DIR) {
      await mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
      await page.screenshot({ path: join(process.env.SCREENSHOT_DIR, `platform-references-${width}.png`), fullPage: true });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${base}platform-references/`);
  const firstGroup = page.locator('[data-testid="treemap"] section').first();
  const groupId = await firstGroup.getAttribute('data-group');
  await firstGroup.locator(':scope > div > button').last().click();
  await page.waitForFunction(id => new URLSearchParams(location.hash.slice(1)).get('category') === id, groupId);
  await page.reload();
  assert.equal(await page.locator(`[data-group="${groupId}"]`).getByRole('button', { name: 'All categories' }).isVisible(), true, 'Category zoom must survive reload');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !new URLSearchParams(location.hash.slice(1)).has('category'));
  await page.locator(`[data-group="${groupId}"] > div > button`).last().click();
  await page.locator(`[data-group="${groupId}"] [data-item]`).first().click();
  assert.equal(await page.getByText('Open official documentation').isVisible(), true, 'Selecting an item must open its details');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Landscape view' }).click();
  await page.waitForFunction(() => new URLSearchParams(location.hash.slice(1)).get('view') === 'landscape');
  await page.reload();
  assert.equal(await page.locator('[data-testid="landscape"]').isVisible(), true, 'Landscape view must survive reload');
  await page.getByRole('searchbox', { name: 'Search the landscape' }).fill('Copilot');
  await page.waitForFunction(() => new URLSearchParams(location.hash.slice(1)).get('q') === 'Copilot');
  await page.reload();
  assert.equal(await page.getByRole('searchbox', { name: 'Search the landscape' }).inputValue(), 'Copilot', 'Search must survive reload');
  await page.goto(base);
  await page.selectOption('#theme', 'dark');
  await page.goto(`${base}platform-references/`);
  assert.equal(await page.locator('html').evaluate(root => root.classList.contains('dark')), true, 'Landscape must read the hub theme preference');
  await page.getByRole('button', { name: 'Use light theme' }).click();
  assert.equal(await page.evaluate(() => localStorage.getItem('theme')), 'light', 'Landscape theme must use compatible theme values');
  await page.goto(base);
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
  await page.goto(base);
  await page.selectOption('#theme', 'system');
  for (const colorScheme of ['dark', 'light']) {
    await page.emulateMedia({ colorScheme });
    await page.waitForFunction(theme => document.documentElement.dataset.theme === theme, colorScheme);
    assert.equal(await page.locator('html').getAttribute('data-theme'), colorScheme);
  }
  await page.evaluate(() => {
    localStorage.removeItem('field-guides-reading-progress:v1');
    localStorage.removeItem('eu-residency-progress-v1');
  });
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const guide of guides.filter(item => item.type === 'astro')) {
    await page.goto(`${base}${guide.name}/`);
    await page.locator('.part-card a').first().click();
    const chapterLinks = await page.locator('.course-part').first().locator('.chapter-pages a')
      .evaluateAll(links => links.map(link => link.href));
    assert.ok(chapterLinks.length > 1, `${guide.name} first part needs multiple chapters for this test`);
    for (const [index, href] of chapterLinks.entries()) {
      await page.goto(href);
      const chapter = await page.locator('body').getAttribute('data-reading-page');
      if (index === 0) {
        const state = await page.evaluate(() => JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')));
        assert.ok(!(state.chapters?.[guide.name] || []).includes(chapter), 'Opening a chapter alone must not mark it read');
      }
      await page.locator('[data-reading-chapter-end]').scrollIntoViewIfNeeded();
      await page.waitForFunction(({ name, id }) => JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')).chapters?.[name]?.includes(id), { name: guide.name, id: chapter });
      const state = await page.evaluate(() => JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')));
      assert.equal((state.completed[guide.name] || []).includes(1), index === chapterLinks.length - 1, `${guide.name} completes only after every chapter`);
      if (guide.name === 'data-residency-guide') {
        await page.locator('#chapter-quiz').evaluate(form => {
          for (const field of form.querySelectorAll('fieldset')) {
            [...field.querySelectorAll('input')].find(input => input.value === field.dataset.answer).checked = true;
          }
          form.requestSubmit();
        });
        await page.waitForFunction(id => JSON.parse(localStorage.getItem('eu-residency-progress-v1') || '[]').includes(id), chapter);
      }
    }
    await page.reload();
    const state = await page.evaluate(() => JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')));
    assert.ok(state.completed[guide.name].includes(1), `${guide.name} progress survives reload`);
  }
  await page.goto(`${base}champions-at-scale/`);
  for (const id of ['why', 'now']) {
    await page.locator(`#${id} [data-reading-end]`).scrollIntoViewIfNeeded();
    await page.waitForFunction(chapter => JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')).chapters?.['champions-at-scale']?.includes(chapter), id);
    const state = await page.evaluate(() => JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')));
    assert.equal((state.completed['champions-at-scale'] || []).includes(1), id === 'now', 'Champions completes after both chapters');
  }
  await page.goto(`${base}github-enterprise-field-guide/`);
  assert.equal(await page.locator('#identity').evaluate(section => section.open), false);
  await page.locator('#platform [data-reading-end]').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')).completed['github-enterprise-field-guide']?.includes(1));
  const staticState = await page.evaluate(() => JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')));
  assert.ok(!(staticState.completed['github-enterprise-field-guide'] || []).includes(2), 'Collapsed sections must not be marked read');
  await page.goto(base);
  assert.equal(await page.locator('[data-reading-guide-card="ai-credits-guide"] [data-reading-progress]').textContent(), '1 of 4 parts read');
  assert.equal(await page.locator('[data-reading-guide-card="data-residency-guide"] [data-reading-progress]').textContent(), '1 of 10 parts read');
  assert.equal(await page.locator('[data-reading-guide-card="copilot-governance-guide"] [data-reading-progress]').textContent(), '1 of 6 parts read');
  assert.equal(await page.locator('[data-reading-guide-card="champions-at-scale"] [data-reading-progress]').textContent(), '1 of 3 parts read');
  assert.equal(await page.locator('[data-reading-guide-card="github-enterprise-field-guide"] [data-reading-progress]').textContent(), '1 of 10 parts read');
  await page.locator('[data-reading-guide-card="ai-credits-guide"] [data-continue-reading]').click();
  assert.match(page.url(), /ai-credits-guide\/part-1\//, 'Continue reading returns to the last opened page');
  await page.locator('header .history-trigger').click();
  assert.equal(await page.locator('.history-account strong').textContent(), 'Reading history');
  assert.equal(await page.locator('.history-dropdown a.history-item').count(), 6, 'History menu shows five recent pages plus View all');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.history-dropdown').isHidden(), true, 'Escape closes the history menu');
  assert.equal(await page.locator('header .history-trigger').evaluate(element => element === document.activeElement), true, 'Escape returns focus to the avatar');
  await page.keyboard.press('ArrowDown');
  await page.getByRole('menuitem', { name: 'View all history' }).click();
  assert.ok(await page.locator('#reading-history [data-history-entry]').count() > 8, 'History page lists more than the former hub limit');
  assert.ok((await page.locator('#reading-history [data-history-entry]').first().textContent()).includes('AI Credits'), 'History shows guide titles');
  assert.equal(await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')).completed)
    .reduce((total, parts) => total + parts.length, 0)), 5, 'Completed parts are saved');
  await page.locator('#clear-reading-history').click();
  assert.equal(await page.locator('#reading-history [data-history-entry]').count(), 0, 'Clear history removes visits without resetting part completion');
  await page.goto(base);
  assert.equal(await page.locator('[data-reading-guide-card="ai-credits-guide"] [data-reading-progress]').textContent(), '1 of 4 parts read');
  await page.reload();
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
  await page.locator('.browse').click();
  assert.equal(new URL(page.url()).hash, '#guides');
  await page.evaluate(baseURL => {
    const daysAgo = days => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return date.getTime();
    };
    const entry = (guide, pageName, age) => ({
      guide, page: pageName, title: pageName, url: `${baseURL}${guide}/`, visitedAt: daysAgo(age),
    });
    localStorage.setItem('field-guides-reading-progress:v1', JSON.stringify({
      version: 1,
      completed: { 'ai-credits-guide': [1, 2], 'champions-at-scale': [1] },
      history: [
        entry('ai-credits-guide', 'Today', 0),
        entry('data-residency-guide', 'Ten days ago', 10),
        entry('ai-credits-guide', 'Forty days ago', 40),
        entry('champions-at-scale', 'Older page', 100),
      ],
    }));
  }, base);
  await page.goto(`${base}history/`);
  assert.equal(await page.locator('#reading-history [data-history-entry]').count(), 4);
  assert.match(await page.locator('#activity-summary').textContent(), /^3 saved pages were last opened in the last 90 days/);
  await page.locator('[data-activity-range="30"]').click();
  assert.match(await page.locator('#activity-summary').textContent(), /^2 saved pages were last opened in the last 30 days/);
  await page.locator('[data-activity-range="7"]').click();
  assert.match(await page.locator('#activity-summary').textContent(), /^1 saved page was last opened in the last 7 days/);
  await page.selectOption('#history-guide-filter', 'ai-credits-guide');
  assert.equal(await page.locator('#reading-history [data-history-entry]').count(), 2);
  await page.locator('[data-history-period="7"]').click();
  assert.equal(await page.locator('#reading-history [data-history-entry]').count(), 1);
  assert.match(await page.locator('#reading-history [data-history-entry]').first().textContent(), /Today/);
  await page.selectOption('#history-guide-filter', 'champions-at-scale');
  assert.equal(await page.locator('#reading-history [data-history-entry]').count(), 0);
  assert.equal(await page.locator('#reading-history-empty').isVisible(), true);
  await page.locator('#clear-reading-history').click();
  assert.equal(await page.locator('#reading-history [data-history-entry]').count(), 0);
  assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('field-guides-reading-progress:v1')).completed),
    { 'ai-credits-guide': [1, 2], 'champions-at-scale': [1] }, 'Clearing history preserves completed parts');
  assert.equal(await page.locator('#activity-empty').isVisible(), true);
  if (process.env.SCREENSHOT_DIR) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${base}ai-credits-guide/`);
    await page.screenshot({ path: join(process.env.SCREENSHOT_DIR, 'ai-credits-guide.png'), fullPage: true });
  }
  assert.deepEqual(errors, []);
  const checks = spawnSync(process.execPath, ['checks.mjs'], {
    cwd: 'guides/champions-at-scale',
    stdio: 'inherit',
    env: {
      ...process.env,
      GUIDE_URL: `${base}champions-at-scale/`,
      PLAYWRIGHT_MODULE: fileURLToPath(import.meta.resolve('@playwright/test')),
    },
  });
  if (checks.error) throw checks.error;
  assert.equal(checks.status, 0, 'Existing Champions checks must pass');
  console.log(`Site checks passed: ${targets.size} routes/assets, ${guides.length} guides, platform references, landscape interactions, shared themes, keyboard navigation and mobile widths.`);
} finally {
  await browser?.close();
  server.kill();
}
