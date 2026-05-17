(function () {
  'use strict';

  /* ── Dark Mode ── */
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  function setTheme(dark) {
    html.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  themeToggle?.addEventListener('click', () => {
    setTheme(!html.classList.contains('dark'));
  });

  /* ── Mobile Menu ── */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  function closeMobileMenu() {
    mobileMenu?.classList.add('hidden');
    iconMenu?.classList.remove('hidden');
    iconClose?.classList.add('hidden');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }

  menuBtn?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove('hidden');
      iconMenu.classList.add('hidden');
      iconClose.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 60) {
      navbar?.querySelector('nav')?.classList.add('nav-scrolled');
    } else {
      navbar?.querySelector('nav')?.classList.remove('nav-scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Active nav link highlight ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ── Scroll reveal animations ── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ── Hero entrance animation ── */
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero-enter').forEach((el) => {
      el.classList.add('animate');
    });
  });

  /* ── Smooth anchor scroll offset for sticky navbar ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
