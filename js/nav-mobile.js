(() => {
  const MOBILE_QUERY = window.matchMedia('(max-width: 768px)');
  const ROOT = document.documentElement;
  let lastY = window.scrollY || 0;
  let ticking = false;

  function showNav() {
    ROOT.classList.remove('nav-hidden');
  }

  function hideNav() {
    ROOT.classList.add('nav-hidden');
  }

  function setCompact(compact) {
    ROOT.classList.toggle('nav-compact', compact);
  }

  function updateNav() {
    const currentY = window.scrollY || 0;
    const delta = currentY - lastY;

    if (!MOBILE_QUERY.matches) {
      showNav();
      setCompact(false);
      lastY = currentY;
      ticking = false;
      return;
    }

    setCompact(currentY > 24);

    if (currentY <= 8) {
      showNav();
    } else if (delta > 6 && currentY > 72) {
      hideNav();
    } else if (delta < -6) {
      showNav();
    }

    lastY = currentY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('touchstart', showNav, { passive: true });
  window.addEventListener('resize', updateNav);
  MOBILE_QUERY.addEventListener('change', updateNav);

  updateNav();
})();
