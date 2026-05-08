(() => {
  const MOBILE_QUERY = window.matchMedia('(max-width: 768px)');
  const ROOT = document.documentElement;
  let lastY = window.scrollY || 0;
  let ticking = false;
  let navHidden = false;
  let lastToggleY = lastY;
  let lastToggleAt = 0;

  function showNav() {
    if (navHidden) {
      ROOT.classList.remove('nav-hidden');
      navHidden = false;
      lastToggleY = window.scrollY || 0;
      lastToggleAt = performance.now();
    }
  }

  function hideNav() {
    if (!navHidden) {
      ROOT.classList.add('nav-hidden');
      navHidden = true;
      lastToggleY = window.scrollY || 0;
      lastToggleAt = performance.now();
    }
  }

  function setCompact(compact) {
    ROOT.classList.toggle('nav-compact', compact);
  }

  function updateNav() {
    const currentY = window.scrollY || 0;
    const delta = currentY - lastY;
    const isMobile = MOBILE_QUERY.matches;
    const downThreshold = isMobile ? 5 : 7;
    const upThreshold = isMobile ? -5 : -7;
    const hideAfter = isMobile ? 72 : 96;
    const compactAfter = isMobile ? 20 : 36;
    const minToggleDistance = isMobile ? 18 : 26;
    const minToggleInterval = 110;
    const movedSinceToggle = Math.abs(currentY - lastToggleY);
    const enoughTimePassed = (performance.now() - lastToggleAt) > minToggleInterval;

    setCompact(currentY > compactAfter);

    if (currentY <= 6) {
      showNav();
    } else if (
      delta > downThreshold &&
      currentY > hideAfter &&
      movedSinceToggle > minToggleDistance &&
      enoughTimePassed
    ) {
      hideNav();
    } else if (
      delta < upThreshold &&
      movedSinceToggle > minToggleDistance &&
      enoughTimePassed
    ) {
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
  window.addEventListener('mousemove', () => {
    if (!MOBILE_QUERY.matches && (window.scrollY || 0) > 6) {
      showNav();
    }
  }, { passive: true });
  window.addEventListener('resize', updateNav);
  MOBILE_QUERY.addEventListener('change', updateNav);

  updateNav();
})();
