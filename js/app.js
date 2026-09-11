(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);

  const iconExternal = `
    <svg class="method-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5h5v5M19 5l-8 8"></path>
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"></path>
    </svg>`;

  const iconCopy = `
    <svg class="method-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8" y="8" width="11" height="11" rx="2"></rect>
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>
    </svg>`;

  function validPublicUrl(value) {
    if (typeof value !== "string" || !value.trim()) return false;
    try {
      const url = new URL(value, window.location.href);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }

  function enabledMethods(list) {
    return Array.isArray(list)
      ? list.filter(method => method && method.enabled === true)
      : [];
  }

  function createMethod(method) {
    if (!method || typeof method.name !== "string") return null;

    const url = method.url || "";
    const type = method.type || "link";

    if (["link", "platform", "local"].includes(type)) {
      if (!validPublicUrl(url)) return null;

      const a = document.createElement("a");
      a.className = "method";
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `${iconExternal}<span class="method-content"><strong></strong><small>Open payment page</small></span><span class="arrow" aria-hidden="true">↗</span>`;
      $(".method-content strong", a).textContent = method.name;
      return a;
    }

    if (type === "copy") {
      if (typeof method.identifier !== "string" || !method.identifier.trim()) return null;

      const wrapper = document.createElement("div");
      wrapper.className = "method copy-method";
      wrapper.innerHTML = `${iconCopy}<span class="method-content"><strong></strong><small class="copy-value"></small></span><button type="button" class="copy-button">Copy</button>`;
      $(".method-content strong", wrapper).textContent = method.name;
      $(".copy-value", wrapper).textContent = method.identifier;

      const button = $(".copy-button", wrapper);
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(method.identifier);
          button.textContent = "Copied";
          setTimeout(() => { button.textContent = "Copy"; }, 1600);
        } catch {
          button.textContent = "Copy failed";
          setTimeout(() => { button.textContent = "Copy"; }, 1600);
        }
      });
      return wrapper;
    }

    if (type === "qr") {
      if (typeof method.image !== "string" || !method.image.trim()) return null;

      const wrapper = document.createElement("div");
      wrapper.className = "method qr-method";

      const img = document.createElement("img");
      img.src = method.image;
      img.alt = `${method.name} QR code`;
      img.loading = "lazy";

      const content = document.createElement("span");
      content.className = "method-content";
      const strong = document.createElement("strong");
      strong.textContent = method.name;
      const small = document.createElement("small");
      small.textContent = "Scan the QR code";
      content.append(strong, small);

      wrapper.append(img, content);

      if (validPublicUrl(url)) {
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "qr-link";
        a.textContent = "Open payment page";
        wrapper.append(a);
      }
      return wrapper;
    }

    return null;
  }

  function renderRegion(targetId, methods) {
    const target = document.getElementById(targetId);
    if (!target) return;

    target.replaceChildren();

    const enabled = enabledMethods(methods);
    enabled.forEach(method => {
      const element = createMethod(method);
      if (element) target.appendChild(element);
    });

    if (!target.children.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = `
        <span class="empty-dot" aria-hidden="true"></span>
        <div><strong>Payment options coming soon</strong><p>Support options are being prepared. Please check back later.</p></div>
      `;
      target.appendChild(empty);
    }
  }

  function renderFooterLinks() {
    const target = $("#footer-links");
    if (!target || typeof publicLinks !== "object") return;

    const items = [
      ["github", "GitHub"],
      ["linkedin", "LinkedIn"],
      ["portfolio", "Portfolio"]
    ];

    items.forEach(([key, label]) => {
      if (!validPublicUrl(publicLinks[key])) return;
      const a = document.createElement("a");
      a.href = publicLinks[key];
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = label;
      target.appendChild(a);
    });
  }

  function setupTheme() {
    const button = $("#theme-toggle");
    const root = document.documentElement;
    if (!button) return;

    const stored = localStorage.getItem("support-theme");
    if (stored === "light" || stored === "dark") {
      root.dataset.theme = stored;
    }

    function updateLabel() {
      const current = root.dataset.theme;
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const dark = current ? current === "dark" : systemDark;
      button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      button.title = dark ? "Switch to light theme" : "Switch to dark theme";
    }

    button.addEventListener("click", () => {
      const current = root.dataset.theme;
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const next = current ? (current === "dark" ? "light" : "dark") : (systemDark ? "light" : "dark");
      root.dataset.theme = next;
      localStorage.setItem("support-theme", next);
      updateLabel();
    });

    updateLabel();
  }

  function init() {
    renderRegion("bangladesh-methods", supportMethods?.bangladesh);
    renderRegion("international-methods", supportMethods?.international);
    renderFooterLinks();
    $("#year").textContent = new Date().getFullYear();
    setupTheme();
  }

  init();
})();
