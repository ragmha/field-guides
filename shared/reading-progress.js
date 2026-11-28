const storageKey = 'field-guides-reading-progress:v1';
const maxHistoryEntries = 50;

function emptyState() {
  return { version: 1, completed: {}, history: [] };
}

function readState() {
  let saved;
  try {
    saved = localStorage.getItem(storageKey);
  } catch {
    throw new Error('Browser storage is unavailable. Reading progress cannot be saved on this device.');
  }
  if (saved === null) return emptyState();

  let state;
  try {
    state = JSON.parse(saved);
  } catch {
    throw new Error('Saved reading progress is invalid. Clear it from the collection page to start again.');
  }
  if (!state || state.version !== 1 || !state.completed || typeof state.completed !== 'object' ||
      !Array.isArray(state.history)) {
    throw new Error('Saved reading progress is invalid. Clear it from the collection page to start again.');
  }
  for (const parts of Object.values(state.completed)) {
    if (!Array.isArray(parts) || !parts.every(part => Number.isInteger(part) && part > 0)) {
      throw new Error('Saved reading progress is invalid. Clear it from the collection page to start again.');
    }
  }
  if (state.chapters !== undefined && (!state.chapters || typeof state.chapters !== 'object' ||
      Array.isArray(state.chapters) || !Object.values(state.chapters).every(chapters =>
        Array.isArray(chapters) && chapters.every(chapter => typeof chapter === 'string')))) {
    throw new Error('Saved reading progress is invalid. Clear it from the collection page to start again.');
  }
  if (!state.history.every(entry =>
    entry && typeof entry.guide === 'string' && typeof entry.page === 'string' &&
    typeof entry.title === 'string' && typeof entry.url === 'string' &&
    Number.isFinite(entry.visitedAt))) {
    throw new Error('Saved reading progress is invalid. Clear it from the collection page to start again.');
  }
  return state;
}

function writeState(state) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    throw new Error('Browser storage is unavailable or full. Reading progress could not be saved.');
  }
}

function safeInternalURL(value) {
  try {
    const url = new URL(value, location.href);
    return url.origin === location.origin ? url.href : null;
  } catch {
    return null;
  }
}

function currentReadingLocation() {
  const { body } = document;
  const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
  const heading = target?.querySelector('h1, h2, h3, summary');
  const page = target?.id || body.dataset.readingPage || location.pathname;
  const title = target
    ? (heading?.textContent || target.getAttribute('aria-label') || body.dataset.readingPageTitle || document.title).trim()
    : body.dataset.readingPageTitle || document.title;
  return {
    guide: body.dataset.readingGuide,
    page,
    title,
    url: location.href,
    visitedAt: Date.now(),
  };
}

function recordVisit(state) {
  if (!document.body.dataset.readingGuide) return state;
  const visit = currentReadingLocation();
  return {
    ...state,
    history: [visit, ...state.history.filter(entry => entry.guide !== visit.guide || entry.page !== visit.page)]
      .slice(0, maxHistoryEntries),
  };
}

function isPartComplete(state, guide, part) {
  return (state.completed[guide] || []).includes(part);
}

function renderPartCards(state) {
  document.querySelectorAll('[data-reading-part]').forEach(card => {
    if (!card.matches('.part-card')) return;
    const guide = card.closest('[data-reading-guide-card]')?.dataset.readingGuideCard ||
      document.body.dataset.readingGuide;
    if (!guide) return;
    let status = card.querySelector('[data-part-status]');
    if (!status) {
      status = document.createElement('span');
      status.className = 'reading-part-status';
      status.dataset.partStatus = '';
      card.querySelector('a')?.before(status);
    }
    const part = Number(card.dataset.readingPart);
    status.textContent = isPartComplete(state, guide, part) ? 'Read' : 'Not read';
  });
}

function dateKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function recentDates(days) {
  const today = new Date();
  return Array.from({ length: days }, (_, index) =>
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - days + index + 1));
}

function renderActivity(entries, dashboard) {
  const days = Number(dashboard.querySelector('[data-activity-range][aria-pressed="true"]').dataset.activityRange);
  const dates = recentDates(days);
  const indexes = new Map(dates.map((date, index) => [dateKey(date), index]));
  const counts = dates.map(() => 0);
  for (const entry of entries) {
    const index = indexes.get(dateKey(new Date(entry.visitedAt)));
    if (index !== undefined) counts[index]++;
  }
  const total = counts.reduce((sum, count) => sum + count, 0);
  const peak = Math.max(...counts);
  const summary = total === 0
    ? `No saved pages were last opened in the last ${days} days.`
    : `${total} saved ${total === 1 ? 'page was' : 'pages were'} last opened in the last ${days} days.`;
  dashboard.querySelector('#activity-summary').textContent = summary;
  dashboard.querySelector('#activity-peak').textContent = String(peak);
  dashboard.querySelector('#activity-empty').hidden = total > 0;
  dashboard.querySelector('#activity-chart').setAttribute('aria-label',
    `${summary} The highest daily count is ${peak}. Each page is counted once, on its most recent visit.`);

  const points = counts.map((count, index) => {
    const x = (index / (days - 1) * 1000).toFixed(2);
    const y = (174 - count / Math.max(peak, 1) * 162).toFixed(2);
    return `${x} ${y}`;
  });
  const line = total ? `M ${points.join(' L ')}` : '';
  dashboard.querySelector('#activity-line').setAttribute('d', line);
  dashboard.querySelector('#activity-area').setAttribute('d', line ? `${line} L 1000 174 L 0 174 Z` : '');

  const labels = document.createDocumentFragment();
  const formatter = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });
  for (let index = 0; index < 6; index++) {
    const label = document.createElement('span');
    label.textContent = formatter.format(dates[Math.round(index * (days - 1) / 5)]);
    labels.append(label);
  }
  dashboard.querySelector('#activity-ticks').replaceChildren(labels);
}

function renderHistoryDashboard(state, dashboard) {
  const guides = JSON.parse(dashboard.dataset.guides);
  const titles = new Map(guides.map(guide => [guide.name, guide.title]));
  const entries = state.history.filter(entry => safeInternalURL(entry.url))
    .sort((a, b) => b.visitedAt - a.visitedAt);
  const dateTime = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });

  renderActivity(entries, dashboard);

  const selectedGuide = dashboard.querySelector('#history-guide-filter').value;
  const period = dashboard.querySelector('[data-history-period][aria-pressed="true"]').dataset.historyPeriod;
  const startOfWeek = recentDates(7)[0].getTime();
  const tomorrow = recentDates(1)[0];
  tomorrow.setDate(tomorrow.getDate() + 1);
  const inLastWeek = entry => entry.visitedAt >= startOfWeek && entry.visitedAt < tomorrow.getTime();
  const guideEntries = entries.filter(entry => selectedGuide === 'all' || entry.guide === selectedGuide);
  const visible = period === '7' ? guideEntries.filter(inLastWeek) : guideEntries;
  dashboard.querySelector('#history-all-count').textContent = String(guideEntries.length);
  dashboard.querySelector('#history-week-count').textContent = String(guideEntries.filter(inLastWeek).length);

  const rows = document.createDocumentFragment();
  for (const entry of visible) {
    const row = document.createElement('tr');
    row.dataset.historyEntry = '';
    const pageCell = document.createElement('td');
    const link = document.createElement('a');
    link.href = safeInternalURL(entry.url);
    link.textContent = entry.title;
    pageCell.append(link);
    const guideCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'guide-badge';
    badge.textContent = titles.get(entry.guide) || entry.guide;
    guideCell.append(badge);
    const dateCell = document.createElement('td');
    const time = document.createElement('time');
    time.dateTime = new Date(entry.visitedAt).toISOString();
    time.textContent = dateTime.format(entry.visitedAt);
    dateCell.append(time);
    row.append(pageCell, guideCell, dateCell);
    rows.append(row);
  }
  dashboard.querySelector('#reading-history').replaceChildren(rows);
  dashboard.querySelector('#reading-history-status').textContent = entries.length
    ? `Showing ${visible.length} of ${entries.length} saved ${entries.length === 1 ? 'page' : 'pages'}.`
    : 'Open a guide to start your history.';
  const empty = dashboard.querySelector('#reading-history-empty');
  empty.hidden = visible.length > 0;
  empty.textContent = entries.length
    ? 'No saved pages match these filters.'
    : 'Your reading history will appear here as you visit a guide.';
}

function renderHub(state) {
  const dashboard = document.querySelector('[data-history-dashboard]');
  if (dashboard) renderHistoryDashboard(state, dashboard);

  document.querySelectorAll('[data-reading-guide-card]').forEach(card => {
    const guide = card.dataset.readingGuideCard;
    const total = Number(card.dataset.partCount);
    const count = (state.completed[guide] || []).filter(part => part <= total).length;
    const progress = card.querySelector('[data-reading-progress]');
    if (progress) progress.textContent = `${count} of ${total} parts read`;

    const lastVisit = state.history.find(entry => entry.guide === guide);
    const continueLink = card.querySelector('[data-continue-reading]');
    const href = lastVisit && safeInternalURL(lastVisit.url);
    if (continueLink && href) {
      continueLink.href = href;
      continueLink.hidden = false;
    } else if (continueLink) {
      continueLink.hidden = true;
    }
  });

  const clearButton = document.querySelector('#clear-reading-history');
  if (clearButton) clearButton.disabled = state.history.length === 0;
}

const menuStyles = `
.header-actions{display:flex;align-items:center;gap:12px;flex-shrink:0;margin-left:auto}
.header-actions .theme-label{margin-left:0}
.header-actions .theme-label{gap:0;border:1px solid var(--rule,var(--line));border-radius:4px;background:var(--surface,var(--bg))}
.header-actions .theme-label[hidden]{display:none}
.header-actions .theme-label>span[aria-hidden]{padding-left:9px;font-size:16px;line-height:1}
.header-actions .theme-label select{padding:6px 10px 6px 6px;border:0;background:transparent}
.header-actions .theme-label:focus-within{outline:2px solid var(--accent,var(--acc));outline-offset:3px}
.header-actions .theme-label select:focus-visible{outline:0}
.history-menu{position:relative;display:flex}
.history-trigger{display:grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;box-shadow:0 0 0 1px var(--rule,var(--line))}
.history-avatar{display:grid;place-items:center;flex-shrink:0;width:32px;height:32px;border-radius:50%;background:var(--inset,var(--bg));color:var(--ink,var(--fg))}
.history-avatar svg{display:block;width:24px;height:24px;fill:currentColor}
.history-trigger:focus-visible{outline:2px solid var(--link,var(--acc,#0969da));outline-offset:2px}
.history-dropdown{position:absolute;top:calc(100% + 8px);right:0;z-index:50;width:min(18rem,calc(100vw - 24px));padding:4px;border:1px solid var(--rule,var(--line));border-radius:8px;background:var(--surface,var(--bg));color:var(--body,var(--fg));box-shadow:0 10px 28px -8px rgb(0 0 0/.28);font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:left;transform-origin:top right;animation:history-in .12s ease-out}
.history-dropdown[hidden]{display:none}
@keyframes history-in{from{opacity:0;transform:scale(.96)}}
@media(prefers-reduced-motion:reduce){.history-dropdown{animation:none}}
.history-account{display:flex;align-items:center;gap:10px;padding:6px 8px}
.history-account .history-avatar{box-shadow:0 0 0 1px var(--rule,var(--line))}
.history-account strong{display:block;font-size:14px;color:var(--ink,var(--fg))}
.history-account small,.history-label,.history-time,.history-empty{color:var(--muted,var(--mute));font-size:12px}
.history-label{padding:6px 8px 2px;font-weight:600}
.history-sep{height:1px;margin:4px -4px;background:var(--rule,var(--line))}
.history-item{display:flex;align-items:center;gap:12px;width:100%;padding:6px 8px;border:0;border-radius:4px;background:none;color:inherit;font:inherit;text-align:left;text-decoration:none;cursor:pointer}
.history-item span:first-child{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.history-time{margin-left:auto;white-space:nowrap}
.history-item:hover,.history-item:focus-visible{background:var(--inset,var(--bg));outline:none}
.history-item[data-variant=destructive]{color:#cf222e}
.history-item:disabled{opacity:.5;cursor:default;background:none}
.history-empty{padding:6px 8px}
`;

function relativeTime(time) {
  const minutes = Math.round((time - Date.now()) / 60000);
  const format = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto', style: 'narrow' });
  if (Math.abs(minutes) < 60) return format.format(minutes, 'minute');
  if (Math.abs(minutes) < 1440) return format.format(Math.round(minutes / 60), 'hour');
  return format.format(Math.round(minutes / 1440), 'day');
}

function menuItem(tag, text, time) {
  const item = document.createElement(tag);
  item.className = 'history-item';
  item.setAttribute('role', 'menuitem');
  item.tabIndex = -1;
  const label = document.createElement('span');
  label.textContent = text;
  item.append(label);
  if (time) {
    const shortcut = document.createElement('span');
    shortcut.className = 'history-time';
    shortcut.textContent = time;
    item.append(shortcut);
  }
  return item;
}

function renderMenu(menu, state) {
  const dropdown = menu.querySelector('.history-dropdown');
  const recent = document.createElement('div');
  recent.setAttribute('role', 'group');
  recent.setAttribute('aria-label', 'Recently read');
  const label = document.createElement('div');
  label.className = 'history-label';
  label.textContent = 'Recently read';
  recent.append(label);
  const entries = state.history.filter(entry => safeInternalURL(entry.url)).slice(0, 5);
  for (const entry of entries) {
    const item = menuItem('a', entry.title, relativeTime(entry.visitedAt));
    item.href = safeInternalURL(entry.url);
    recent.append(item);
  }
  if (!entries.length) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    empty.textContent = 'Pages you open will appear here.';
    recent.append(empty);
  }
  const all = menuItem('a', 'View all history');
  all.href = menu.dataset.historyHref;
  const clear = menuItem('button', 'Clear history');
  clear.type = 'button';
  clear.dataset.clearHistory = '';
  clear.dataset.variant = 'destructive';
  clear.disabled = !state.history.length;
  const separator = () => Object.assign(document.createElement('div'), { className: 'history-sep', role: 'separator' });
  dropdown.replaceChildren(dropdown.firstElementChild, separator(), recent, separator(), all, clear);
}

function setupMenus() {
  const links = document.querySelectorAll('.topbar a.history-link');
  if (!links.length) return;
  const style = document.createElement('style');
  style.textContent = menuStyles;
  document.head.append(style);
  links.forEach((link, index) => {
    const header = link.closest('.topbar');
    const mark = header.querySelector('.brand-mark');
    if (!mark) {
      console.error('Reading history menu could not be created: the header mark is missing.');
      return;
    }
    const menu = document.createElement('div');
    menu.className = 'history-menu';
    menu.dataset.historyMenu = '';
    menu.dataset.historyHref = link.href;
    menu.innerHTML = `
      <button type="button" class="history-trigger" aria-haspopup="menu" aria-expanded="false" aria-controls="history-menu-${index}" aria-label="Reading history">
        <span class="history-avatar" aria-hidden="true"></span>
      </button>
      <div class="history-dropdown" id="history-menu-${index}" role="menu" aria-label="Reading history" hidden>
        <div class="history-account"><span class="history-avatar" aria-hidden="true"></span><div><strong>Reading history</strong><small>History saved on this device</small></div></div>
      </div>`;
    menu.querySelectorAll('.history-avatar').forEach(holder => {
      const icon = mark.cloneNode(true);
      icon.removeAttribute('class');
      holder.append(icon);
    });
    link.replaceWith(menu);
    const actions = document.createElement('div');
    actions.className = 'header-actions';
    const theme = header.querySelector('.theme-label, [data-theme-toggle]');
    if (theme) actions.append(theme);
    actions.append(menu);
    (header.querySelector('.header-main') || header).append(actions);
  });
}

function menuParts(menu) {
  const trigger = menu.querySelector('.history-trigger');
  const dropdown = menu.querySelector('.history-dropdown');
  const items = () => [...dropdown.querySelectorAll('.history-item:not(:disabled)')];
  return { trigger, dropdown, items };
}

function closeMenu(menu, focusTrigger = false) {
  const { trigger, dropdown } = menuParts(menu);
  dropdown.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');
  if (focusTrigger) trigger.focus();
}

function openMenu(menu, focus = 'first') {
  const { trigger, dropdown, items } = menuParts(menu);
  try {
    renderMenu(menu, readState());
  } catch (error) {
    showError(error instanceof Error ? error.message : 'Reading history could not be loaded.');
    return;
  }
  dropdown.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  const list = items();
  (focus === 'last' ? list.at(-1) : list[0])?.focus();
}

document.addEventListener('click', event => {
  const trigger = event.target.closest('.history-trigger');
  document.querySelectorAll('[data-history-menu]').forEach(menu => {
    if (!menu.contains(event.target)) closeMenu(menu);
  });
  if (!trigger) return;
  const menu = trigger.closest('[data-history-menu]');
  if (trigger.getAttribute('aria-expanded') === 'true') closeMenu(menu);
  else openMenu(menu);
});

document.addEventListener('keydown', event => {
  const menu = event.target.closest?.('[data-history-menu]');
  if (!menu) return;
  const { trigger, dropdown, items } = menuParts(menu);
  if (event.target === trigger && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
    event.preventDefault();
    openMenu(menu, event.key === 'ArrowUp' ? 'last' : 'first');
    return;
  }
  if (dropdown.hidden) return;
  const list = items();
  const index = list.indexOf(document.activeElement);
  const move = {
    ArrowDown: (index + 1) % list.length,
    ArrowUp: (index - 1 + list.length) % list.length,
    Home: 0,
    End: list.length - 1,
  }[event.key];
  if (move !== undefined) {
    event.preventDefault();
    list[move]?.focus();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu(menu, true);
  } else if (event.key === 'Tab') {
    closeMenu(menu);
  }
});

function showError(message) {
  const status = document.querySelector('[data-reading-message]') || (() => {
    const element = document.createElement('p');
    element.className = 'reading-message';
    element.dataset.readingMessage = '';
    element.setAttribute('role', 'status');
    element.setAttribute('aria-live', 'polite');
    document.querySelector('main')?.prepend(element);
    return element;
  })();
  status.textContent = message;
  status.hidden = false;
}

function refresh() {
  try {
    const state = readState();
    renderHub(state);
    renderPartCards(state);
  } catch (error) {
    showError(error instanceof Error ? error.message : 'Reading progress could not be loaded.');
  }
}

try {
  let state = readState();
  state = recordVisit(state);
  if (document.body.dataset.readingGuide) writeState(state);
} catch (error) {
  showError(error instanceof Error ? error.message : 'Reading progress could not be saved.');
}

document.addEventListener('click', event => {
  const control = event.target.closest('[data-activity-range], [data-history-period]');
  if (control) {
    const dashboard = control.closest('[data-history-dashboard]');
    const attribute = control.hasAttribute('data-activity-range') ? 'data-activity-range' : 'data-history-period';
    dashboard.querySelectorAll(`[${attribute}]`).forEach(button => {
      button.setAttribute('aria-pressed', String(button === control));
    });
    refresh();
  }
  if (event.target.closest('#clear-reading-history, [data-clear-history]')) {
    try {
      const state = readState();
      state.history = [];
      writeState(state);
      refresh();
      const menu = event.target.closest('[data-history-menu]');
      if (menu) openMenu(menu);
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Reading history could not be cleared.');
    }
  }
});

document.addEventListener('change', event => {
  if (event.target.matches('#history-guide-filter')) refresh();
});

function observeChapterEnds() {
  const guide = document.body.dataset.readingGuide;
  if (!guide) return;
  const sections = [...document.querySelectorAll('section[data-reading-part], details[data-reading-part]')];
  const targets = new Map();
  for (const section of sections) {
    const end = document.createElement('span');
    end.dataset.readingEnd = '';
    end.setAttribute('aria-hidden', 'true');
    end.style.cssText = 'display:block;height:1px';
    section.append(end);
    const part = Number(section.dataset.readingPart);
    targets.set(end, {
      part,
      chapter: section.id,
      expected: sections.filter(item => Number(item.dataset.readingPart) === part).map(item => item.id),
    });
  }
  const chapterEnd = document.querySelector('[data-reading-chapter-end]');
  if (chapterEnd) {
    targets.set(chapterEnd, {
      part: Number(document.body.dataset.readingPart),
      chapter: document.body.dataset.readingPage,
      expected: JSON.parse(document.body.dataset.readingChapters),
    });
  }
  if (!targets.size) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const { part, chapter, expected } = targets.get(entry.target);
      try {
        const state = readState();
        state.chapters ||= {};
        const chapters = state.chapters[guide] ||= [];
        if (!chapters.includes(chapter)) chapters.push(chapter);
        if (expected.length && expected.every(id => chapters.includes(id)) && !isPartComplete(state, guide, part)) {
          (state.completed[guide] ||= []).push(part);
          state.completed[guide].sort((a, b) => a - b);
        }
        writeState(state);
        observer.unobserve(entry.target);
        refresh();
      } catch (error) {
        showError(error instanceof Error ? error.message : 'Reading progress could not be saved.');
      }
    }
  });
  for (const target of targets.keys()) observer.observe(target);
}

setupMenus();
observeChapterEnds();

window.addEventListener('hashchange', () => {
  try {
    const state = recordVisit(readState());
    writeState(state);
    refresh();
  } catch (error) {
    showError(error instanceof Error ? error.message : 'Reading progress could not be saved.');
  }
});

window.addEventListener('storage', event => {
  if (event.key === storageKey) refresh();
});

refresh();
