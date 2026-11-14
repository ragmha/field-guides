import assert from 'node:assert/strict';
import { mkdtemp, symlink, rm, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';

if (!process.env.PLAYWRIGHT_MODULE) {
  throw new Error('Set PLAYWRIGHT_MODULE to the installed playwright-core/index.mjs path (see README).');
}
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE));
const browser = await chromium.launch({ channel: 'chrome' });
const errors = [];
const temp = await mkdtemp(join(tmpdir(), 'champions-check-'));
let server;
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  assert.equal(await page.title(), 'Champions at Scale — An enterprise field guide');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  await page.selectOption('#theme', 'light');
  assert.equal(await page.locator('body').evaluate(node => getComputedStyle(node).backgroundColor), 'rgb(243, 245, 247)');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.selectOption('#theme', 'dark');
  assert.equal(await page.locator('body').evaluate(node => getComputedStyle(node).backgroundColor), 'rgb(7, 9, 13)');
  await page.selectOption('#theme', 'system');
  await page.reload();
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
  for (const href of await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
    assert.equal(await page.locator(href).count(), 1, `Broken anchor: ${href}`);
  }
  const status = page.locator('#readiness-status');
  assert.equal(await status.textContent(), '0 of 6 foundations in place.');
  const checks = page.locator('#foundations input');
  for (let index = 0; index < 6; index++) await checks.nth(index).check();
  assert.equal(await status.textContent(), '6 of 6 foundations in place.');
  assert.match(await page.locator('#readiness-next').textContent(), /Agree the charter/);
  await checks.nth(1).uncheck();
  assert.equal(await status.textContent(), '5 of 6 foundations in place.');
  assert.match(await page.locator('#readiness-next').textContent(), /protected time/);
  await page.locator('.phase-nav a[href="#days-60"]').click();
  await page.waitForFunction(() => document.getElementById('days-60').open);
  await page.locator('#days-60 summary').click();
  assert.equal(await page.locator('#days-60').getAttribute('open'), null);
  await page.locator('.phase-nav a[href="#days-60"]').click();
  assert.notEqual(await page.locator('#days-60').getAttribute('open'), null, 'Same-fragment navigation must reopen the phase');
  const original = await page.locator('details').evaluateAll(details => details.map(detail => detail.open));
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  assert.equal(await page.locator('details:not(.chapter-nav):not([open])').count(), 0);
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  assert.deepEqual(await page.locator('details').evaluateAll(details => details.map(detail => detail.open)), original);
  await page.reload();
  assert.equal(await status.textContent(), '0 of 6 foundations in place.');
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Page overflows at ${width}px`);
  }
  assert.equal(await page.locator('.chapter-nav').getAttribute('open'), null);
  await page.locator('.chapter-nav summary').click();
  await page.locator('.chapter-nav a[href="#readiness"]').click();
  assert.equal(await page.locator('.chapter-nav').getAttribute('open'), null);
  assert.equal(await page.locator('svg[role="img"]').count(), 2);
  assert.deepEqual(await page.locator('svg[role="img"]').evaluateAll(figures => figures.flatMap(svg => {
    const box = svg.viewBox.baseVal;
    return [...svg.querySelectorAll('text')].filter(text => {
      const bounds = text.getBBox();
      const point = svg.createSVGPoint();
      const transform = svg.getCTM().inverse().multiply(text.getCTM());
      return [[bounds.x, bounds.y], [bounds.x + bounds.width, bounds.y + bounds.height]].some(([x, y]) => {
        point.x = x; point.y = y;
        const corner = point.matrixTransform(transform);
        return corner.x < 0 || corner.y < 0 || corner.x > box.width || corner.y > box.height;
      });
    }).map(text => text.textContent);
  })), [], 'Diagram text must stay inside its canvas');
  for (const scroller of await page.locator('.diagram-scroll').all()) {
    assert.equal(await scroller.evaluate(node => node.scrollWidth > node.clientWidth && getComputedStyle(node).overflowX === 'auto'), true);
  }
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const plain = await noJS.newPage();
  await plain.goto('http://127.0.0.1:4173/');
  await plain.locator('#days-90 summary').click();
  assert.notEqual(await plain.locator('#days-90').getAttribute('open'), null);
  await noJS.close();

  await symlink(resolve('.'), join(temp, 'champions-at-scale'), 'dir');
  server = spawn('python3', ['-u', '-m', 'http.server', '0', '--bind', '127.0.0.1', '--directory', temp], { stdio: ['ignore', 'pipe', 'pipe'] });
  const address = await new Promise((resolveAddress, reject) => {
    server.once('error', reject);
    server.once('exit', code => reject(new Error(`Subpath server exited: ${code}`)));
    server.stdout.once('data', data => {
      const port = data.toString().match(/port (\d+)/)?.[1];
      if (port) resolveAddress(`http://127.0.0.1:${port}/champions-at-scale/`);
      else reject(new Error(`Unexpected server output: ${data}`));
    });
  });
  await page.goto(address, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('h1').evaluate(node => getComputedStyle(node).color), 'rgb(31, 35, 40)');
  assert.equal(await status.textContent(), '0 of 6 foundations in place.');
  assert.deepEqual(errors, []);
  console.log('Guide checks passed: themes, diagrams, navigation, checklist, print, keyboard, mobile, no-JS and subpath.');
} finally {
  await browser.close();
  if (server) {
    const exited = once(server, 'exit');
    server.kill();
    await exited;
  }
  await rm(join(temp, 'champions-at-scale'), { force: true });
  await rmdir(temp);
}
