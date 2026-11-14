const foundations = document.querySelector('#foundations');
const checks = [...foundations.querySelectorAll('input')];
const status = document.querySelector('#readiness-status');
const next = document.querySelector('#readiness-next');

function updateReadiness() {
  const missing = checks.filter(check => !check.checked);
  status.textContent = `${checks.length - missing.length} of ${checks.length} foundations in place.`;
  next.textContent = missing.length
    ? `Next foundation to resolve: ${missing[0].nextElementSibling.querySelector('strong').textContent.toLowerCase()}.`
    : 'Foundations checked. Agree the charter and review gate with your sponsor before starting the pilot.';
}

foundations.addEventListener('change', updateReadiness);
document.querySelector('.readiness-result').hidden = false;
updateReadiness();

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
function applyTheme() {
  document.documentElement.dataset.theme = theme.value === 'system'
    ? (systemTheme.matches ? 'dark' : 'light')
    : theme.value;
}
theme.addEventListener('change', applyTheme);
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
