const themeKey='theme',root=document.documentElement;
let preference='system';
try{preference=localStorage.getItem(themeKey)||'system'}catch{}
const media=matchMedia('(prefers-color-scheme: dark)');
const apply=()=>{
  root.dataset.theme=preference==='system'?(media.matches?'dark':'light'):preference;
  root.dataset.preference=preference;
};
apply();
document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('[data-theme-toggle]');
  if(!toggle)return;
  const dark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  const sync=()=>{toggle.setAttribute('aria-pressed',String(dark()));toggle.textContent='Dark mode'};
  toggle.addEventListener('click',()=>{preference=dark()?'light':'dark';try{localStorage.setItem(themeKey,preference)}catch{}apply();sync()});
  media.addEventListener('change',()=>{apply();sync()});
  sync();
});
