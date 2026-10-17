/* Feature · Reveal on scroll para elementos .reveal */
(function () {
  'use strict';

  window.Portfolio.register('reveal', function (root) {
    const items = root.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || window.Portfolio.prefersReducedMotion()) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  });
})();
