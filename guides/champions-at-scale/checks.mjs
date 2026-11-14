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
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' });
const errors = [];
const temp = await mkdtemp(join(tmpdir(), 'champions-check-'));
let server;
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.GUIDE_URL || 'http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  assert.equal(await page.title(), 'Champions at Scale');
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
  const quests = page.locator('#quest-levels input');
  assert.equal(await quests.count(), 12);
  assert.equal(await page.evaluate(() => localStorage.getItem('champions-quest-progress')), null, 'Do not save before opting in');
  const firstQuestLink = page.locator('#quest-levels a').first();
  await firstQuestLink.evaluate(link => link.addEventListener('click', event => event.preventDefault(), { once: true }));
  await firstQuestLink.click();
  assert.equal(await quests.nth(0).isChecked(), false, 'Opening a resource must not complete a quest');
  assert.equal(await page.evaluate(() => localStorage.getItem('champions-quest-progress')), null);
  for (let index = 0; index < 3; index++) await quests.nth(index).check();
  assert.equal(await page.locator('#quest-status').textContent(), '3 of 12 quests checked');
  assert.equal(await page.locator('.quest-level').first().locator('legend small').isVisible(), true);
  await quests.nth(1).uncheck();
  assert.equal(await page.locator('.quest-level').first().locator('legend small').isVisible(), false);
  await page.reload();
  assert.equal(await quests.nth(0).isChecked(), true);
  assert.equal(await quests.nth(1).isChecked(), false);
  assert.equal(await quests.nth(2).isChecked(), true);
  await page.emulateMedia({ media: 'print' });
  assert.equal(await quests.nth(0).isVisible(), true);
  assert.equal(await quests.nth(0).isChecked(), true);
  assert.equal(await page.locator('#quest-reset').isVisible(), false);
  await page.emulateMedia({ media: 'screen' });
  await page.locator('#quest-reset').click();
  assert.equal(await page.evaluate(() => localStorage.getItem('champions-quest-progress')), null);
  await page.reload();
  assert.equal(await quests.nth(0).isChecked(), false);
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
  assert.equal(await page.locator('svg[role="img"]').count(), 4);
  assert.equal(await page.locator('.evidence-connector').count(), 3);
  assert.equal(await page.locator('.evidence-connector').evaluateAll(lines => lines.every(line => {
    const reference = getComputedStyle(line).markerEnd.match(/^url\(["']?(.*?)["']?\)$/)?.[1];
    if (!reference) return false;
    const url = new URL(reference, document.baseURI);
    const marker = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!(marker instanceof SVGMarkerElement) || marker.ownerSVGElement !== line.ownerSVGElement) return false;
    const arrow = marker.querySelector('path');
    if (!arrow || marker.markerWidth.baseVal.value <= 0 || marker.markerHeight.baseVal.value <= 0) return false;
    const bounds = arrow.getBBox();
    const style = getComputedStyle(arrow);
    const start = line.getPointAtLength(0);
    const end = line.getPointAtLength(line.getTotalLength());
    return bounds.width > 0 && bounds.height > 0 && arrow.getTotalLength() > 0
      && style.fill !== 'none' && style.fill !== 'rgba(0, 0, 0, 0)' && Number(style.opacity) > 0 && Number(style.fillOpacity) > 0
      && marker.orientType.baseVal === SVGMarkerElement.SVG_MARKER_ORIENT_AUTO
      && marker.refX.baseVal.value === bounds.x + bounds.width
      && marker.refY.baseVal.value === bounds.y + bounds.height / 2
      && end.x > start.x && end.y === start.y;
  })), true, 'Safeguards → baseline → pilot evidence → decision must have forward arrowheads');
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
  await page.goto('http://127.0.0.1:4173/charter.html');
  assert.equal(await page.locator('.brief-fields section').count(), 4);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Charter overflows on mobile');
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const plain = await noJS.newPage();
  await plain.goto(process.env.GUIDE_URL || 'http://127.0.0.1:4173/');
  assert.equal(await plain.locator('#quest-levels input').count(), 12);
  await plain.locator('#quest-levels input').first().check();
  assert.equal(await plain.locator('#quest-levels input').first().isChecked(), true);
  await plain.emulateMedia({ media: 'print' });
  assert.equal(await plain.locator('#quest-levels input').first().isVisible(), true);
  await plain.locator('#days-90 summary').click();
  assert.notEqual(await plain.locator('#days-90').getAttribute('open'), null);
  await noJS.close();
  const blocked = await browser.newContext();
  await blocked.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Denied', 'SecurityError'); } }));
  const blockedPage = await blocked.newPage();
  await blockedPage.goto('http://127.0.0.1:4173/');
  assert.match(await blockedPage.locator('#quest-storage').textContent(), /unavailable/);
  await blockedPage.locator('#quest-levels input').first().check();
  assert.match(await blockedPage.locator('#quest-storage').textContent(), /Could not save/);
  await blockedPage.locator('#quest-reset').click();
  assert.match(await blockedPage.locator('#quest-storage').textContent(), /Could not clear/);
  assert.equal(await blockedPage.locator('#quest-levels input').first().isChecked(), true);
  await blocked.close();

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
  console.log('Guide checks passed: themes, diagrams, navigation, checklist, quest storage, print, keyboard, mobile, no-JS and subpath.');
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
