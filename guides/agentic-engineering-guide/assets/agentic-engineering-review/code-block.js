const block = document.querySelector("[data-code-block]");

if (block) {
  const code = block.querySelector("code");
  const wrapButton = block.querySelector(".code-block-wrap");
  const copyButton = block.querySelector(".code-block-copy");
  const status = block.querySelector(".code-block-status");

  try {
    const response = await fetch(block.dataset.source);
    if (!response.ok) throw new Error(`Skill source request failed with status ${response.status}`);
    code.textContent = await response.text();
    block.dataset.loaded = "true";
    copyButton.disabled = false;
  } catch (error) {
    status.classList.remove("sr-only");
    status.textContent = "The skill preview could not be loaded. Use the Download the Agent Skill link above.";
    console.error(error);
  }

  wrapButton.addEventListener("click", () => {
    const wrapped = code.classList.toggle("is-wrapped");
    wrapButton.setAttribute("aria-pressed", String(wrapped));
    status.textContent = wrapped ? "Lines are wrapped." : "Lines use horizontal scrolling.";
    status.classList.remove("sr-only");
  });

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      copyButton.textContent = "Copied";
      status.textContent = "Skill Markdown copied to the clipboard.";
      status.classList.remove("sr-only");
    } catch (error) {
      status.textContent = "Could not copy automatically. Focus the Markdown and copy it manually.";
      status.classList.remove("sr-only");
      console.error(error);
    }
  });
}
