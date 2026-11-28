const foundations = document.querySelector('#foundations');
const checks = [...foundations.querySelectorAll('input')];
const status = document.querySelector('#readiness-status');
const next = document.querySelector('#readiness-next');

function updateReadiness() {
  const missing = checks.filter(check => !check.checked);
  status.textContent = `${checks.length - missing.length} / ${checks.length} perusedellytystä kunnossa.`;
  next.textContent = missing.length
    ? `Seuraavaksi ratkaistava perusedellytys: ${missing[0].nextElementSibling.querySelector('strong').textContent.toLowerCase()}.`
    : 'Perusedellytykset tarkistettu. Sovi peruskirjasta ja arviointipisteestä sponsorin kanssa ennen pilotin aloittamista.';
}

foundations.addEventListener('change', updateReadiness);
document.querySelector('.readiness-result').hidden = false;
updateReadiness();

const questLevels = document.querySelector('#quest-levels');
const questChecks = [...questLevels.querySelectorAll('input[type="checkbox"]')];
const questStatus = document.querySelector('#quest-status');
const questProgress = document.querySelector('#quest-progress');
const questStorage = document.querySelector('#quest-storage');
const questKey = 'champions-quest-progress';

function updateQuests() {
  const completed = questChecks.filter(check => check.checked).length;
  questStatus.textContent = `${completed} / ${questChecks.length} tehtävää merkitty`;
  questProgress.max = questChecks.length;
  questProgress.value = completed;
  questLevels.querySelectorAll('.quest-level').forEach(level => {
    level.querySelector('legend small').hidden = ![...level.querySelectorAll('input')].every(check => check.checked);
  });
}

try {
  const saved = (localStorage.getItem(questKey) || '').split(',');
  questChecks.forEach(check => { check.checked = saved.includes(check.value); });
} catch {
  questStorage.textContent = 'Selaimen tallennustila ei ole käytettävissä. Edistyminen ei säily sivun uudelleenlatauksessa.';
}
questLevels.addEventListener('change', () => {
  updateQuests();
  try {
    localStorage.setItem(questKey, questChecks.filter(check => check.checked).map(check => check.value).join(','));
    questStorage.textContent = 'Tallennettu vain tähän selaimeen.';
  } catch {
    questStorage.textContent = 'Tallentaminen epäonnistui. Edistyminen ei säily sivun uudelleenlatauksessa.';
  }
});
document.querySelector('#quest-reset').addEventListener('click', () => {
  try {
    localStorage.removeItem(questKey);
    questChecks.forEach(check => { check.checked = false; });
    updateQuests();
    questStorage.textContent = 'Tehtävien edistyminen poistettu tästä selaimesta.';
  } catch {
    questStorage.textContent = 'Tallennetun edistymisen poistaminen epäonnistui. Tarkista selaimen tallennusasetukset ja yritä uudelleen.';
  }
});
document.querySelector('.quest-summary').hidden = false;
updateQuests();

const printButton = document.querySelector('.print-button');
printButton.hidden = false;
printButton.addEventListener('click', () => window.print());

// ponytail: native details keep the playbook usable without JavaScript.
function revealPhase(hash) {
  const phase = document.getElementById(hash.slice(1));
  if (phase?.classList.contains('phase')) phase.open = true;
}
window.addEventListener('hashchange', () => revealPhase(location.hash));
document.querySelectorAll('.phase-nav a').forEach(link => {
  link.addEventListener('click', () => revealPhase(link.hash));
});
revealPhase(location.hash);

let printState = [];
window.addEventListener('beforeprint', () => {
  printState = [...document.querySelectorAll('details:not(.chapter-nav)')].map(detail => [detail, detail.open]);
  printState.forEach(([detail]) => { detail.open = true; });
});
window.addEventListener('afterprint', () => {
  printState.forEach(([detail, open]) => { detail.open = open; });
});
const theme = document.querySelector('#theme');
theme.closest('label').hidden = false;
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
theme.value = document.documentElement.dataset.preference || 'system';
function applyTheme() {
  document.documentElement.dataset.theme = theme.value === 'system'
    ? (systemTheme.matches ? 'dark' : 'light')
    : theme.value;
  document.documentElement.dataset.preference = theme.value;
}
theme.addEventListener('change', () => {
  try { localStorage.setItem('theme', theme.value); } catch {}
  applyTheme();
});
systemTheme.addEventListener('change', applyTheme);
applyTheme();

const mobile = matchMedia('(max-width: 760px)');
const chapterNav = document.querySelector('.chapter-nav');
function resizeNavigation() {
  chapterNav.open = !mobile.matches;
}
mobile.addEventListener('change', resizeNavigation);
resizeNavigation();
chapterNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobile.matches) chapterNav.open = false;
  });
});
