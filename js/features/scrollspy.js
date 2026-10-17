/* Feature · Scrollspy: marca el enlace de navegación de la sección visible */
(function () {
  'use strict';

  window.Portfolio.register('scrollspy', function (nav) {
    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const map = new Map();
    links.forEach(function (a) {
      const section = document.getElementById(a.getAttribute('href').slice(1));
      if (section) map.set(section, a);
    });
    if (!('IntersectionObserver' in window) || !map.size) return;

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const link = map.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    map.forEach(function (_, section) { io.observe(section); });
  });
})();
