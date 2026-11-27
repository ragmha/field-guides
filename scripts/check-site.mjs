import assert from 'node:assert/strict';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:net';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { guides } from '../guides.mjs';

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
  const expectLanding = async (guide, width) => {
    const landing = page.locator('.landing');
    assert.equal(await page.locator('h1').count(), 1, `${guide.name} needs exactly one page title`);
    assert.equal(await landing.locator('h1').isVisible(), true, `${guide.name} landing needs a title`);
    assert.equal(await landing.locator('.landing-intro').textContent(), guide.description, `${guide.name} hero description must match the collection`);
    assert.equal(await page.locator('.topbar .brand-mark').isVisible(), true, `${guide.name} header needs the GitHub mark`);
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
      } else {
        assert.equal(await page.locator('.chapter-nav').count(), 1, 'Champions contents must remain');
        assert.equal(await page.getByRole('complementary', { name: 'On this page', includeHidden: true }).count(), 1);
        assert.equal(await page.locator('svg[data-diagram="architecture-delta"]').count(), 1);
        assert.match(await page.locator('.diagram-embed').first().locator('figcaption').textContent(), /Central policy and specialist support remain in place/);
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
      const theme = header.querySelector('#theme, [data-theme-toggle]');
      const rect = header.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const label = theme.closest('.theme-label');
      return {
        last: header.lastElementChild === actions && actions.lastElementChild === menu,
        themeBeforeMenu: Boolean(theme.compareDocumentPosition(menu) & Node.DOCUMENT_POSITION_FOLLOWING),
        rightOffset: rect.right - menuRect.right - parseFloat(getComputedStyle(header).paddingRight),
        consolidated: !label || (parseFloat(getComputedStyle(label).borderLeftWidth) > 0 &&
          parseFloat(getComputedStyle(theme).borderLeftWidth) === 0),
      };
    });
    assert.equal(layout.last, true, `${context} history menu must be last in the header`);
    assert.equal(layout.themeBeforeMenu, true, `${context} theme control must precede the history menu`);
    assert.ok(Math.abs(layout.rightOffset) < 2, `${context} history menu must align to the right edge`);
    assert.equal(layout.consolidated, true, `${context} theme icon and selector must share one border`);
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
      assert.equal(await page.locator('header .breadcrumbs, header .github-link').count(), 0, 'Collection header must omit collection and GitHub links');
      assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'), 'Enterprise enablement');
      assert.ok((await page.locator('.article-footer').textContent()).startsWith('Enterprise enablement '));
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
      assert.equal(await page.locator('header [data-history-menu]').getAttribute('data-history-href'), `${base}history/`);
      assert.equal(await page.locator('header .history-trigger').isVisible(), true);
      assert.equal(await page.locator('header .history-trigger svg').count(), 1);
      assert.equal(await page.locator('header .history-trigger img').count(), 0);
      await expectHeaderLayout(`Hub at ${width}px`);
      assert.equal(await page.locator('.guide-card').count(), guides.length);
      assert.deepEqual(await page.locator('.guide-card > p:not([data-reading-progress])').allTextContents(), guides.map(guide => guide.description));
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
      for (const guide of guides) {
        await page.goto(`${base}${guide.name}/`);
        assert.equal(await page.locator('html').getAttribute('data-theme'), theme, `${guide.name} must inherit ${theme}`);
        assert.equal(await page.locator('header a', { hasText: 'Enterprise enablement' }).evaluate(link => link.href), base, `${guide.name} breadcrumb must link to the hub`);
        assert.equal(await page.locator('header [data-history-menu]').getAttribute('data-history-href'), `${base}history/`, `${guide.name} header must link to history`);
        assert.equal(await page.locator('header .history-trigger').isVisible(), true);
        assert.equal(await page.locator('header .history-trigger svg').count(), 1);
        await expectHeaderLayout(`${guide.name} at ${width}px`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${guide.name} overflow at ${width}px`);
        await expectLanding(guide, width);
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
  const checks = spawnSync('bun', ['checks.mjs'], {
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
  console.log(`Site checks passed: ${targets.size} routes/assets, all five guides, shared themes, keyboard navigation and mobile widths.`);
} finally {
  await browser?.close();
  server.kill();
}
