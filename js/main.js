/* ===================================================
   BHARAT OILS — Shared JS
   Nav scroll state · Scroll reveals · Parallax
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Sticky nav: transparent → frosted-cream on scroll ───────────────────
  const nav = document.querySelector('.site-nav');
  if (nav && !nav.classList.contains('site-nav--solid')) {
    // Only hero pages: nav starts transparent, gains --scrolled on scroll
    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('site-nav--scrolled');
      } else {
        nav.classList.remove('site-nav--scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // ─── Mobile hamburger toggle ──────────────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', nav.classList.contains('nav-open'));
    });

    // Close mobile nav when a link is clicked
    nav.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Scroll reveal (IntersectionObserver) ────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // ─── Active nav link ─────────────────────────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Hero parallax ────────────────────────────────────────────────────────
  // Subtle: image shifts up at ~30% of scroll speed for depth
  const heroBgImg = document.querySelector('.hero__bg-img');
  if (heroBgImg) {
    const heroEl = heroBgImg.closest('.hero');
    let ticking = false;

    const applyParallax = () => {
      const scrollY = window.scrollY;
      const heroH   = heroEl ? heroEl.offsetHeight : window.innerHeight;
      if (scrollY <= heroH) {
        const shift = scrollY * 0.30;
        heroBgImg.style.transform = `translateY(${shift}px)`;
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── Smooth image load: fade in when loaded ───────────────────────────────
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
    }
  });

});
