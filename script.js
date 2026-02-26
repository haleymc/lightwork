/* ============================================================
   Light Work Studios — script.js
   Handles: fade-in animations, tier symbol transitions, nav behavior
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // === NAV: scroll state ===
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // === NAV: mobile toggle ===
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // === NAV: active page highlight ===
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '');
    const isHome = (path === '' || path === '/index.html') && (href === '/' || href === '' || href === '/index.html');
    const isMatch = !isHome && href !== '/' && href !== '' && path.endsWith(href);
    if (isHome || isMatch) {
      link.classList.add('active');
    }
  });

  // === FADE-IN on scroll ===
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  // === TIER SYMBOL ANIMATION ===
  const svgs = document.querySelectorAll('.tier-svg');
  const tiers = document.querySelectorAll('.tier[data-tier]');

  if (svgs.length > 0 && tiers.length > 0) {
    // Activate first symbol on load
    svgs[0].classList.add('active');

    const symbolObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tierIndex = parseInt(entry.target.dataset.tier, 10);
          svgs.forEach((svg, idx) => {
            svg.classList.toggle('active', idx === tierIndex);
          });
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '-10% 0px -35% 0px'
    });

    tiers.forEach(tier => symbolObserver.observe(tier));
  }

  // === THEME TOGGLE (Ink / Light) ===
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    function syncToggle() {
      const isInk = document.documentElement.dataset.palette === 'ink';
      themeToggle.setAttribute('aria-label', isInk ? 'Switch to Light mode' : 'Switch to Ink mode');
    }
    syncToggle();

    themeToggle.addEventListener('click', () => {
      const isInk = document.documentElement.dataset.palette === 'ink';
      if (isInk) {
        delete document.documentElement.dataset.palette;
        localStorage.setItem('lw-theme', '');
      } else {
        document.documentElement.dataset.palette = 'ink';
        localStorage.setItem('lw-theme', 'ink');
      }
      syncToggle();
    });
  }

});
