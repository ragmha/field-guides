const appendText = (parent, text) => parent.append(document.createTextNode(text));

const appendSpan = (parent, className, text) => {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  parent.append(span);
};

const appendInline = (parent, text) => {
  const tokenPattern = /(`[^`\n]+`|\[[^\]\n]+\]\([^)]+\)|\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_)/g;
  let cursor = 0;

  for (const match of text.matchAll(tokenPattern)) {
    const [token] = match;
    const index = match.index ?? 0;
    appendText(parent, text.slice(cursor, index));
    const className = token.startsWith("`")
      ? "md-inline-code"
      : token.startsWith("[")
        ? "md-link"
        : token.startsWith("**") || token.startsWith("__")
          ? "md-strong"
          : "md-emphasis";
    appendSpan(parent, className, token);
    cursor = index + token.length;
  }

  appendText(parent, text.slice(cursor));
};

const highlightMarkdown = (code, source) => {
  code.replaceChildren();
  let inFrontMatter = false;
  const lines = source.match(/[^\n]*\n|[^\n]+$/g) ?? [];

  for (const [index, rawLine] of lines.entries()) {
    const lineEnding = rawLine.endsWith("\r\n") ? "\r\n" : rawLine.endsWith("\n") ? "\n" : "";
    const line = lineEnding ? rawLine.slice(0, -lineEnding.length) : rawLine;

    if (line === "---" && (index === 0 || inFrontMatter)) {
      appendSpan(code, "md-frontmatter-delimiter", line);
      inFrontMatter = !inFrontMatter;
    } else if (inFrontMatter) {
      const metadata = line.match(/^([A-Za-z][\w-]*:)(\s*)(.*)$/);
      if (metadata) {
        appendSpan(code, "md-yaml-key", metadata[1]);
        appendText(code, metadata[2]);
        appendInline(code, metadata[3]);
      } else {
        appendText(code, line);
      }
    } else {
      const heading = line.match(/^(#{1,6}\s+)(.*)$/);
      const listItem = line.match(/^(\s*(?:[-*+]|\d+[.)])\s+)(.*)$/);
      const quote = line.match(/^(\s*>\s?)(.*)$/);

      if (heading) {
        appendSpan(code, "md-heading-marker", heading[1]);
        const headingText = document.createElement("span");
        headingText.className = "md-heading-text";
        appendInline(headingText, heading[2]);
        code.append(headingText);
      } else if (listItem) {
        appendSpan(code, "md-list-marker", listItem[1]);
        appendInline(code, listItem[2]);
      } else if (quote) {
        appendSpan(code, "md-quote-marker", quote[1]);
        appendInline(code, quote[2]);
      } else if (/^\s*(?:-{3,}|_{3,}|\*{3,})\s*$/.test(line)) {
        appendSpan(code, "md-rule", line);
      } else {
        appendInline(code, line);
      }
    }

    if (lineEnding) appendText(code, lineEnding);
  }
};

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
      highlightMarkdown(code, await response.text());
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
