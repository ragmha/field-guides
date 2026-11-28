import React from 'react';
import { createRoot } from 'react-dom/client';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

function LanguageSwitch({ finnish, target }) {
  return (
    <>
      <span lang="en" className={!finnish ? 'language-current' : undefined}>EN</span>
      <SwitchPrimitive.Root
        data-slot="switch"
        className="language-switch-control"
        aria-label="Finnish / Suomi"
        checked={finnish}
        onCheckedChange={() => { window.location.href = target; }}
      >
        <SwitchPrimitive.Thumb data-slot="switch-thumb" className="language-switch-thumb" />
      </SwitchPrimitive.Root>
      <span lang="fi" className={finnish ? 'language-current' : undefined}>FI</span>
    </>
  );
}

for (const container of document.querySelectorAll('[data-language-switch]')) {
  createRoot(container).render(
    <LanguageSwitch finnish={container.dataset.language === 'fi'} target={container.dataset.target} />,
  );
}
