for (const preview of document.querySelectorAll("[data-skill-preview]")) {
  const block = preview.querySelector("[data-code-block]");
  const code = block.querySelector("code");
  const wrapButton = block.querySelector(".code-block-wrap");
  const copyButton = block.querySelector(".code-block-copy");
  const status = block.querySelector(".code-block-status");

  const loadSource = async () => {
    if (block.dataset.loaded === "true" || block.dataset.loading === "true") return;
    block.dataset.loading = "true";

    try {
      const response = await fetch(block.dataset.source);
      if (!response.ok) throw new Error(`Skill source request failed with status ${response.status}`);
      code.textContent = await response.text();
      delete block.dataset.loading;
      block.dataset.loaded = "true";
      wrapButton.disabled = false;
      copyButton.disabled = false;
    } catch (error) {
      delete block.dataset.loading;
      status.classList.remove("sr-only");
      status.textContent = "The skill preview could not be loaded. Use the Download SKILL.md link above.";
      console.error(error);
    }
  };

  preview.addEventListener("toggle", () => {
    if (preview.open) void loadSource();
  });
  if (preview.open) void loadSource();

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
