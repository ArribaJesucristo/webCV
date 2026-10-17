/* Componente · Defense & Tech Matrix (filtros + badges interactivos) */
(function () {
  'use strict';
  const P = window.Portfolio;
  const h = P.h;

  P.register('skills', function (root, data) {
    const cats = data.skillCategories;
    const total = cats.reduce(function (n, c) { return n + data.skills[c.key].length; }, 0);
    let active = 'all';

    /* ---- Filtros ---- */
    const filterDefs = [{ key: 'all', label: 'Todos', count: total }].concat(
      cats.map(function (c) { return { key: c.key, label: c.label, count: data.skills[c.key].length }; })
    );
    const filterBtns = filterDefs.map(function (f) {
      return h('button', {
        class: 'filter', type: 'button', 'aria-pressed': String(f.key === active), dataset: { filter: f.key },
        onClick: function () { setFilter(f.key); }
      }, f.label, h('span', { class: 'filter__count' }, f.count));
    });
    const filters = h('div', { class: 'filters', role: 'group', 'aria-label': 'Filtrar por categoría' }, filterBtns);

    /* ---- Grupos y badges ---- */
    const groups = cats.map(function (c) {
      const badges = data.skills[c.key].map(function (tool) {
        return h('li', null, h('button', {
          class: 'chip', type: 'button', 'aria-pressed': 'false', dataset: { tool: tool },
          onClick: function () { P.toggleTool(tool); }
        }, tool));
      });
      const el = h('section', { class: 'skill-group card', dataset: { category: c.key }, 'aria-label': c.label },
        h('div', { class: 'skill-group__head' },
          h('h3', { class: 'skill-group__title' }, c.label),
          h('span', { class: 'skill-group__count' }, data.skills[c.key].length + ' tools')
        ),
        h('p', { class: 'skill-group__desc' }, c.description),
        h('ul', { class: 'chip-list' }, badges)
      );
      return { key: c.key, el: el };
    });
    const matrix = h('div', { class: 'matrix' }, groups.map(function (g) { return g.el; }));

    /* ---- Estado / lectura cruzada con la experiencia ---- */
    const status = h('div', { class: 'skill-status', role: 'status', 'aria-live': 'polite' });
    const hint = 'Selecciona una herramienta para ver en qué puestos la he usado.';
    status.textContent = '$ ' + hint;

    function setFilter(key) {
      active = key;
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === key)); });
      groups.forEach(function (g) {
        const show = key === 'all' || g.key === key;
        if (show && g.el.hidden) { g.el.hidden = false; g.el.style.animation = 'none'; void g.el.offsetWidth; g.el.style.animation = ''; }
        g.el.hidden = !show;
      });
    }

    P.on('tool:change', function (tool) {
      root.querySelectorAll('.skill-group button[data-tool]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.tool === tool));
      });
      if (!tool) { status.replaceChildren('$ ' + hint); return; }

      const used = data.experience.filter(function (j) { return j.tools.indexOf(tool) !== -1; });
      const text = used.length
        ? h('span', null, '$ ', h('strong', null, tool), ' → usado en ' + used.length + (used.length === 1 ? ' puesto: ' : ' puestos: ') + used.map(function (j) { return j.company; }).join(', '))
        : h('span', null, '$ ', h('strong', null, tool), ' → parte de mi stack; sin vínculo directo con un puesto concreto (laboratorio / formación).');
      status.replaceChildren(
        text,
        h('span', { class: 'skill-status__actions' },
          used.length ? h('a', { class: 'link-btn', href: '#experiencia' }, 'Ver en timeline') : null,
          h('button', { class: 'link-btn', type: 'button', onClick: function () { P.toggleTool(tool); } }, 'Limpiar')
        )
      );
    });

    root.replaceChildren(filters, matrix, status);
  });
})();
