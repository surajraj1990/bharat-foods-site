/* ===================================================
   BHARAT OILS — Homepage Specific JS
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Hero video fallback ---
  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      heroVideo.closest('.hero__video-wrap')?.classList.add('video-error');
    });
  }

  // --- Animated counter for purity stats (if present) ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;
          const tick = () => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current) + (el.dataset.suffix || '');
            if (current < target) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // --- Promise strip parallax ---
  const promiseStrip = document.querySelector('.promise-strip');
  if (promiseStrip) {
    window.addEventListener('scroll', () => {
      const rect = promiseStrip.getBoundingClientRect();
      const offset = (rect.top / window.innerHeight) * 20;
      promiseStrip.style.backgroundPositionY = `${50 + offset}%`;
    }, { passive: true });
  }

});
