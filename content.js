function applyMask(codeEl) {
  if (codeEl.dataset.masked) return;

  const realCode = codeEl.textContent.trim();
  if (!realCode) return;

  codeEl.dataset.masked = "true";
  codeEl.dataset.realCode = realCode;
  codeEl.dataset.locked = "false";
  codeEl.textContent = "••••";
  codeEl.classList.add("masked-code");

  codeEl.addEventListener("mouseenter", () => {
    if (codeEl.dataset.locked === "false") {
      codeEl.textContent = realCode;
    }
  });

  codeEl.addEventListener("mouseleave", () => {
    if (codeEl.dataset.locked === "false") {
      codeEl.textContent = "••••";
    }
  });

  codeEl.addEventListener("click", () => {
    const locked = codeEl.dataset.locked === "true";
    codeEl.dataset.locked = (!locked).toString();
    codeEl.textContent = locked ? "••••" : realCode;
  });
}

function maskCodes(root = document) {
  root.querySelectorAll(".code-list .code").forEach((codeEl) => {
    applyMask(codeEl);
  });
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (!(node instanceof Element)) continue;

      // Check if .code-list or its children were added
      if (node.matches?.(".code-list") || node.querySelector?.(".code-list")) {
        maskCodes(node);
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

maskCodes();
