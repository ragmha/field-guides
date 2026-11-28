import assert from 'node:assert/strict';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { guides } from '../guides.mjs';
import { guides as howTos } from '../guides/copilot-how-tos/src/manifest.ts';
import { landingPath, lessonRoutes, sourcePath } from '../guides/copilot-how-tos/src/course.ts';

const existingGuides = [
  ['ai-credits-guide', 4, 'astro'],
  ['data-residency-guide', 10, 'astro'],
  ['copilot-governance-guide', 6, 'astro'],
  ['champions-at-scale', 3, 'static'],
  ['github-enterprise-field-guide', 10, 'static'],
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

const base = `http://127.0.0.1:${process.env.PORT || 4173}/field-guides/`;
const server = spawn('bun', ['run', 'preview'], { stdio: 'inherit' });
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
        for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
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
    assert.equal(await page.locator('.topbar svg').isVisible(), true, `${guide.name} header needs the GitHub mark`);
    assert.equal(await page.getByRole('link', { name: 'Enterprise enablement', exact: true }).isVisible(), true, `${guide.name} needs a visible return to the collection at ${width}px`);
    if (guide.type === 'astro') {
      assert.equal(await page.locator('main .landing').count(), 1, `${guide.name} landing belongs in the main landmark`);
      assert.equal(await page.locator('.sidebar, .toc, .course-outline, .page-title').count(), 0, `${guide.name} landing must not repeat the legacy course index`);
      assert.equal(await page.locator('#page-sources').isVisible(), true, `${guide.name} must retain source notes`);
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
  for (const width of [1600, 1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark']) {
      await page.goto(base);
      await page.selectOption('#theme', theme);
      await page.reload();
      assert.equal(await page.title(), 'Enterprise enablement', 'Hub must use the approved collection name');
      assert.equal(await page.locator('.brand').getAttribute('aria-label'), 'Enterprise enablement home');
      assert.equal((await page.locator('.brand').textContent()).trim(), 'Enterprise enablement');
      assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'), 'Enterprise enablement');
      assert.ok((await page.locator('.article-footer').textContent()).startsWith('Enterprise enablement '));
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
      assert.equal(await page.locator('.guide-card').count(), guides.length);
      assert.deepEqual(await page.locator('.guide-card h3').allTextContents(), guides.map(guide => guide.title));
      assert.deepEqual(await page.locator('.guide-card > p').allTextContents(), guides.map(guide => guide.description));
      assert.deepEqual(
        await page.locator('.guide-card .get-started').evaluateAll(links => links.map(link => link.href)),
        guides.map(guide => `${base}${guide.name}/`),
      );
      assert.equal(await page.locator('.hero-art').evaluate(image => image.complete && image.naturalWidth > 0), true, 'Hero illustration must load');
      const art = await page.locator('.hero-art').boundingBox();
      const copy = await page.locator('.hero-copy').boundingBox();
      assert.ok(width > 760 ? art.x >= copy.x + copy.width : art.y >= copy.y + copy.height, 'Hero illustration must sit right of the copy on desktop and below it on mobile');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Hub overflow at ${width}px`);
      if (process.env.SCREENSHOT_DIR && [1440, 390].includes(width)) {
        await mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({ path: join(process.env.SCREENSHOT_DIR, `hub-${theme}-${width}.png`), fullPage: true });
      }
      await page.goto(`${base}github-enterprise-field-guide/`);
      const collectionStyle = await landingStyle();
      for (const guide of guides) {
        await page.goto(`${base}${guide.name}/`);
        assert.equal(await page.locator('html').getAttribute('data-theme'), theme, `${guide.name} must inherit ${theme}`);
        assert.equal(await page.locator('header a', { hasText: 'Enterprise enablement' }).evaluate(link => link.href), base, `${guide.name} breadcrumb must link to the hub`);
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
        if (width <= 760) {
          await page.getByRole('link', { name: 'Enterprise enablement', exact: true }).focus();
          await Promise.all([page.waitForURL(base), page.keyboard.press('Enter')]);
          assert.equal(page.url(), base, `${guide.name} mobile home link must work with the keyboard`);
        }
      }
    }
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
  await page.goto(base);
  await page.selectOption('#theme', 'system');
  for (const colorScheme of ['dark', 'light']) {
    await page.emulateMedia({ colorScheme });
    await page.waitForFunction(theme => document.documentElement.dataset.theme === theme, colorScheme);
    assert.equal(await page.locator('html').getAttribute('data-theme'), colorScheme);
  }
  await page.reload();
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
  await page.locator('.browse').click();
  assert.equal(new URL(page.url()).hash, '#guides');
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
  console.log(`Site checks passed: ${targets.size} routes/assets, ${guides.length} guides, shared themes, keyboard navigation and mobile widths.`);
} finally {
  await browser?.close();
  server.kill();
}
