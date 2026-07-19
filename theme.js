(() => {
  "use strict";

  const STORAGE_KEY = "owpn-theme";
  const root = document.documentElement;

  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function currentTheme() {
    const saved = safeGet(STORAGE_KEY);
    return saved === "dark" || saved === "light" ? saved : systemTheme();
  }

  function updateButtons(theme) {
    document.querySelectorAll(".theme-toggle").forEach(button => {
      const lightIcon = button.querySelector("span:first-child");
      const darkIcon = button.querySelector("span:last-child");

      button.dataset.theme = theme;
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.setAttribute(
        "aria-label",
        theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
      );

      lightIcon?.classList.toggle("is-active", theme === "light");
      darkIcon?.classList.toggle("is-active", theme === "dark");
    });
  }

  function applyTheme(theme, persist = false) {
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    root.classList.toggle("theme-dark", theme === "dark");
    root.classList.toggle("theme-light", theme === "light");

    if (persist) safeSet(STORAGE_KEY, theme);
    updateButtons(theme);
  }

  function bindThemeButtons() {
    document.querySelectorAll(".theme-toggle").forEach(button => {
      if (button.dataset.themeBound === "1") return;
      button.dataset.themeBound = "1";

      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next, true);
      });
    });
  }

  applyTheme(currentTheme());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindThemeButtons, { once: true });
  } else {
    bindThemeButtons();
  }

  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
      applyTheme(event.newValue);
    }
  });
})();