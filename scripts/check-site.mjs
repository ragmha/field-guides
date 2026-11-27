import assert from 'node:assert/strict';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { guides } from '../guides.mjs';

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
        const chapters = page.locator('.chapter[data-part]');
        assert.equal(await chapters.count(), guide.parts, 'Each agentic engineering part needs a chapter');
        for (const [index, id] of agenticChapters.entries()) {
          const chapter = chapters.nth(index);
          assert.equal(await chapter.getAttribute('data-part'), String(index + 1), 'Chapters must stay in topic order');
          assert.equal(await chapter.getAttribute('id'), id, `Part ${index + 1} needs its fragment target`);
          assert.equal(await landing.locator('.part-card a').nth(index).getAttribute('href'), `#${id}`, `Part ${index + 1} card must open its chapter`);
          assert.ok(await chapter.locator('a[href^="https://docs.github.com/"]').count() > 0, `Part ${index + 1} needs GitHub documentation`);
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
      assert.deepEqual(await page.locator('.guide-card > p').allTextContents(), guides.map(guide => guide.description));
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
          assert.deepEqual(await landingStyle(), collectionStyle, `Agentic landing must match the collection at ${width}px in ${theme} mode`);
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
