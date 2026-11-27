const navigation = document.querySelector(".guide-nav .chapter-nav");
const sidebar = navigation.closest(".guide-nav");
const mobile = matchMedia("(max-width: 760px)");
const sections = [...navigation.querySelectorAll('a[href^="#"]')].map(link => {
  const target = document.getElementById(link.hash.slice(1));
  if (!target) throw new Error(`Missing guide navigation target: ${link.hash}`);
  return { link, target };
});

let currentLink;
let updateScheduled = false;

function updateCurrent() {
  updateScheduled = false;
  const threshold = document.querySelector(".topbar").getBoundingClientRect().bottom + 40;
  const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  let active = sections[0];
  for (const section of sections.slice(1)) {
    const scrollMargin = parseFloat(getComputedStyle(section.target).scrollMarginTop) || 0;
    if (section.target.getBoundingClientRect().top <= Math.max(threshold, scrollPadding + scrollMargin + 2)) active = section;
    else break;
  }
  const last = sections.at(-1);
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      && last.target.getBoundingClientRect().top < window.innerHeight) active = last;
  if (currentLink === active.link) return;

  currentLink?.removeAttribute("aria-current");
  currentLink = active.link;
  currentLink.setAttribute("aria-current", "location");

  if (!mobile.matches && sidebar.scrollHeight > sidebar.clientHeight) {
    const bounds = sidebar.getBoundingClientRect();
    const selected = currentLink.getBoundingClientRect();
    if (selected.top < bounds.top) sidebar.scrollTop += selected.top - bounds.top - 8;
    else if (selected.bottom > bounds.bottom) sidebar.scrollTop += selected.bottom - bounds.bottom + 8;
  }
}

function scheduleUpdate() {
  if (updateScheduled) return;
  updateScheduled = true;
  requestAnimationFrame(updateCurrent);
}

function syncNavigation() {
  navigation.open = !mobile.matches;
  scheduleUpdate();
}

navigation.querySelector("nav").addEventListener("click", event => {
  if (mobile.matches && event.target.closest("a")) navigation.open = false;
});
mobile.addEventListener("change", syncNavigation);
window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("resize", scheduleUpdate);
document.addEventListener("toggle", scheduleUpdate, true);
syncNavigation();
