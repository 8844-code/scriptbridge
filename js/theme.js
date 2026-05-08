(function () {
  const STORAGE_KEY = 'scriptbridge_theme';
  const DARK_CLASS = 'theme-dark';
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function getStoredTheme() {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'light' || value === 'dark' || value === 'system') return value;
    return 'system';
  }

  function getResolvedTheme(mode) {
    if (mode === 'dark') return 'dark';
    if (mode === 'light') return 'light';
    return media.matches ? 'dark' : 'light';
  }

  function applyTheme(mode) {
    const resolved = getResolvedTheme(mode);
    document.documentElement.classList.toggle(DARK_CLASS, resolved === 'dark');
    document.documentElement.setAttribute('data-theme-mode', mode);
  }

  function setTheme(mode) {
    localStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode);
    updateThemeControlState(mode);
  }

  function updateThemeControlState(mode) {
    const controls = document.querySelectorAll('.theme-pill button[data-theme]');
    controls.forEach((button) => {
      button.classList.toggle('active', button.dataset.theme === mode);
    });
  }

  function injectThemeControl() {
    const navRight = document.querySelector('.nav-right');
    if (!navRight || navRight.querySelector('.theme-pill')) return;

    const wrap = document.createElement('div');
    wrap.className = 'theme-pill';
    wrap.innerHTML = [
      '<button type="button" data-theme="light" title="Light mode">☀</button>',
      '<button type="button" data-theme="dark" title="Dark mode">🌙</button>',
      '<button type="button" data-theme="system" title="Follow system">Auto</button>'
    ].join('');

    wrap.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const mode = target.dataset.theme;
      if (!mode) return;
      setTheme(mode);
    });

    navRight.prepend(wrap);
    updateThemeControlState(getStoredTheme());
  }

  const initialMode = getStoredTheme();
  applyTheme(initialMode);

  document.addEventListener('DOMContentLoaded', () => {
    injectThemeControl();
    updateThemeControlState(getStoredTheme());
  });

  media.addEventListener('change', () => {
    const mode = getStoredTheme();
    if (mode === 'system') applyTheme(mode);
  });
})();
