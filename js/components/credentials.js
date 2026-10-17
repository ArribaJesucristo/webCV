/* Componente · Certifications & Education */
(function () {
  'use strict';
  const P = window.Portfolio;
  const h = P.h;
  const icon = P.icon;

  // "D-CFIA (Deloitte Certified Forensic Investigator)" → { code, full }
  function parseCert(name) {
    const m = /^(.+?)\s*\((.+)\)$/.exec(name);
    return m ? { code: m[1], full: m[2] } : { code: name, full: '' };
  }

  P.register('credentials', function (root, data) {
    const certs = data.certifications.map(function (c, i) {
      const parsed = parseCert(c.name);
      return h('li', { class: 'cert' },
        h('div', { class: 'cert__top' },
          h('span', { class: 'cert__icon' }, icon(i % 2 ? 'shield' : 'award')),
          h('span', { class: 'chip chip--accent' }, 'Certificación')
        ),
        h('p', { class: 'cert__code' }, parsed.code),
        parsed.full ? h('p', { class: 'cert__name' }, parsed.full) : null,
        h('p', { class: 'cert__issuer' }, c.issuer)
      );
    });

    const edu = data.education.map(function (e, i) {
      return h('li', { class: 'edu card' + (e.fields ? ' edu--wide' : '') },
        h('span', { class: 'edu__icon' }, icon('cap')),
        h('h4', { class: 'edu__degree' }, e.degree),
        h('p', { class: 'edu__inst' }, e.institution),
        e.fields ? h('ul', { class: 'chip-list', 'aria-label': 'Módulos del máster' }, e.fields.map(function (f) { return h('li', { class: 'chip chip--alt' }, f); })) : null
      );
    });

    root.replaceChildren(
      h('h3', { class: 'subhead' }, '> certificaciones'),
      h('ul', { class: 'cert-grid' }, certs),
      h('h3', { class: 'subhead' }, '> formación académica'),
      h('ul', { class: 'edu-grid' }, edu)
    );
  });
})();
