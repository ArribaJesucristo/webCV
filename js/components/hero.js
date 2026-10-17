/* Componente · Hero Header */
(function () {
  'use strict';
  const P = window.Portfolio;
  const h = P.h;
  const icon = P.icon;

  function yearsSince(isoDate) {
    const start = new Date(isoDate);
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    const hadAnniversary = now.getMonth() > start.getMonth() ||
      (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());
    if (!hadAnniversary) years -= 1;
    return Math.max(years, 0);
  }

  function countUp(el, target, suffix) {
    if (typeof target !== 'number' || P.prefersReducedMotion() || target === 0) { el.textContent = target + suffix; return; }
    const duration = 1100;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  function typePrompt(target, text, done) {
    if (P.prefersReducedMotion()) { target.textContent = text; done(); return; }
    let i = 0;
    (function step() {
      target.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(step, 70); else done();
    })();
  }

  P.register('hero', function (root, data) {
    const p = data.profile;
    const totalTools = Object.keys(data.skills).reduce(function (n, k) { return n + data.skills[k].length; }, 0);

    const metrics = [
      { value: yearsSince(data.meta.securityStart), suffix: '+', label: 'años en operaciones SOC y ciberdefensa' },
      { value: '24/7', suffix: '', label: 'operativa defensiva en SOC: monitorización, IR y hunting' },
      { value: data.certifications.length, suffix: '', label: 'certificaciones Deloitte: forense (DFIR) y reversing' },
      { value: totalTools, suffix: '', label: 'herramientas en stack: SIEM, EDR, forense y reversing' }
    ];

    const typed = h('span', { 'aria-hidden': 'true' });
    const caret = h('span', { class: 'caret', 'aria-hidden': 'true' });

    const statEls = metrics.map(function (m) {
      const value = h('div', { class: 'stat__value' }, '0');
      return { m: m, value: value, node: h('div', { class: 'stat' }, value, h('div', { class: 'stat__label' }, m.label)) };
    });

    const left = h('div', { class: 'hero__copy' },
      h('p', { class: 'hero__prompt' },
        h('span', { class: 'ps1', 'aria-hidden': 'true' }, 'analyst@soc'),
        h('span', { 'aria-hidden': 'true' }, ':'),
        h('span', { class: 'path', 'aria-hidden': 'true' }, '~'),
        h('span', { 'aria-hidden': 'true' }, '$ '),
        typed, caret,
        h('span', { class: 'sr-only' }, 'Perfil profesional')
      ),
      h('h1', { class: 'hero__name' }, p.name),
      h('p', { class: 'hero__title' }, p.title),
      h('p', { class: 'hero__spec' }, p.specialization),
      h('p', { class: 'hero__about' }, p.about),
      h('div', { class: 'hero__meta' },
        h('span', null, icon('pin'), p.location),
        h('span', null, icon('mail'), p.email)
      ),
      h('ul', { class: 'hero__tags chip-list', 'aria-label': 'Áreas clave' },
        data.meta.highlights.map(function (t, i) {
          return h('li', { class: 'chip ' + (i % 2 ? 'chip--alt' : 'chip--accent') }, t);
        })
      ),
      h('div', { class: 'hero__actions' },
        h('a', { class: 'btn btn--primary', href: p.linkedin, target: '_blank', rel: 'noopener noreferrer' }, icon('linkedin'), 'LinkedIn', h('span', { class: 'sr-only' }, ' (se abre en una pestaña nueva)')),
        h('a', { class: 'btn', href: 'mailto:' + p.email }, icon('mail'), 'Enviar correo'),
        h('a', { class: 'btn', href: data.meta.cvUrl, download: '' }, icon('download'), 'Descargar CV')
      )
    );

    const right = h('aside', { class: 'terminal', 'aria-label': 'Métricas clave' },
      h('div', { class: 'terminal__bar', 'aria-hidden': 'true' },
        h('span', { class: 'terminal__dot' }), h('span', { class: 'terminal__dot' }), h('span', { class: 'terminal__dot' }),
        h('span', { class: 'terminal__title' }, 'metrics.log — zsh')
      ),
      h('div', { class: 'terminal__body' },
        h('p', { class: 'terminal__cmd' }, h('span', { class: 'ps1' }, '$ '), 'cat metrics.log'),
        h('div', { class: 'stats' }, statEls.map(function (s) { return s.node; }))
      )
    );

    root.replaceChildren(left, right);

    typePrompt(typed, 'whoami --role', function () { caret.style.animationIterationCount = 'infinite'; });

    // Contadores al entrar en viewport (o de inmediato si no hay IO)
    function startCounters() { statEls.forEach(function (s) { countUp(s.value.firstChild, s.m.value, s.m.suffix); }); }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { startCounters(); io.disconnect(); }
      }, { threshold: 0.4 });
      io.observe(right);
    } else startCounters();
  });
})();
