import assert from 'node:assert/strict';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { guides } from '../guides.mjs';

const base = 'http://127.0.0.1:4173/field-guides/';
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
  const expectLanding = async (guide, width) => {
    const landing = page.locator('.landing');
    assert.equal(await landing.locator('h1').isVisible(), true, `${guide.name} landing needs a title`);
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
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark']) {
      await page.goto(base);
      await page.selectOption('#theme', theme);
      await page.reload();
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
      assert.equal(await page.locator('.guide-card').count(), guides.length);
      assert.equal(await page.locator('.hero-art').evaluate(image => image.complete && image.naturalWidth > 0), true, 'Hero illustration must load');
      const art = await page.locator('.hero-art').boundingBox();
      const copy = await page.locator('.hero-copy').boundingBox();
      assert.ok(width > 760 ? art.x >= copy.x + copy.width : art.y >= copy.y + copy.height, 'Hero illustration must sit right of the copy on desktop and below it on mobile');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Hub overflow at ${width}px`);
      if (process.env.SCREENSHOT_DIR && width !== 320) {
        await mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({ path: join(process.env.SCREENSHOT_DIR, `hub-${theme}-${width}.png`), fullPage: true });
      }
      for (const guide of guides) {
        await page.goto(`${base}${guide.name}/`);
        assert.equal(await page.locator('html').getAttribute('data-theme'), theme, `${guide.name} must inherit ${theme}`);
        assert.equal(await page.locator('header a', { hasText: 'OpenField' }).evaluate(link => link.href), base, `${guide.name} breadcrumb must link to the hub`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${guide.name} overflow at ${width}px`);
        await expectLanding(guide, width);
        if (process.env.SCREENSHOT_DIR && width !== 320) {
          const landing = await page.locator('.landing').boundingBox();
          await page.screenshot({ path: join(process.env.SCREENSHOT_DIR, `landing-${guide.name}-${theme}-${width}.png`), fullPage: true, clip: { x: 0, y: 0, width, height: landing.y + landing.height } });
        }
      }
    }
  }
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
