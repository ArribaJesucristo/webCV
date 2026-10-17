/* Componente · Interactive Timeline (acordeón accesible) */
(function () {
  'use strict';
  const P = window.Portfolio;
  const h = P.h;
  const icon = P.icon;

  P.register('timeline', function (root, data) {
    const items = data.experience.map(function (job, index) {
      const id = 'job-' + index + '-' + P.slug(job.company);
      const isCurrent = /actualidad/i.test(job.period);

      const trigger = h('button', {
        class: 'tl-trigger', type: 'button', id: id + '-btn',
        'aria-expanded': 'false', 'aria-controls': id + '-panel'
      },
        h('span', { class: 'tl-head' },
          h('span', { class: 'tl-period' }, job.period, isCurrent ? h('span', { class: 'live-badge' }, 'actual') : null),
          h('span', { class: 'tl-role' }, job.role),
          h('span', { class: 'tl-company' }, job.company)
        ),
        h('span', { class: 'tl-chevron' }, icon('chevron'))
      );

      const toolChips = job.tools.map(function (tool) {
        return h('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', dataset: { tool: tool }, title: 'Resaltar «' + tool + '» en toda la página', onClick: function () { P.toggleTool(tool); } }, tool);
      });

      const panel = h('div', { class: 'tl-panel', id: id + '-panel', role: 'region', 'aria-labelledby': id + '-btn' },
        h('div', { class: 'tl-panel__clip' },
          h('div', { class: 'tl-panel__inner' },
            h('h4', { class: 'tl-subtitle' }, 'Responsabilidades'),
            h('ul', { class: 'tl-list' }, job.responsibilities.map(function (r) { return h('li', null, r); })),
            job.tools.length ? [h('h4', { class: 'tl-subtitle' }, 'Stack empleado'), h('div', { class: 'chip-list' }, toolChips)] : null
          )
        )
      );

      const li = h('li', { class: 'tl-item' + (isCurrent ? ' is-current' : ''), dataset: { company: job.company } },
        h('span', { class: 'tl-dot', 'aria-hidden': 'true' }),
        h('article', { class: 'tl-card card' }, h('h3', null, trigger), panel)
      );

      function setOpen(open) {
        li.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', String(open));
      }
      trigger.addEventListener('click', function () { setOpen(trigger.getAttribute('aria-expanded') !== 'true'); });

      return { job: job, li: li, setOpen: setOpen, isOpen: function () { return trigger.getAttribute('aria-expanded') === 'true'; } };
    });

    // Barra de herramientas: expandir / contraer todo
    const toggleAll = h('button', { class: 'link-btn', type: 'button' }, 'Expandir todo');
    toggleAll.addEventListener('click', function () {
      const open = items.some(function (i) { return !i.isOpen(); });
      items.forEach(function (i) { i.setOpen(open); });
      toggleAll.textContent = open ? 'Contraer todo' : 'Expandir todo';
    });

    root.replaceChildren(
      h('div', { class: 'tl-toolbar' },
        h('span', { class: 'tl-toolbar__hint' }, items.length + ' posiciones · orden cronológico inverso'),
        toggleAll
      ),
      h('ol', { class: 'timeline' }, items.map(function (i) { return i.li; }))
    );

    // Abre el puesto actual por defecto
    items[0].setOpen(true);

    // Sincroniza con la herramienta seleccionada en la matriz de skills
    P.on('tool:change', function (tool) {
      items.forEach(function (item) {
        const match = !!tool && item.job.tools.indexOf(tool) !== -1;
        item.li.classList.toggle('is-match', match);
        if (match) item.setOpen(true);
        item.li.querySelectorAll('button[data-tool]').forEach(function (chip) {
          chip.setAttribute('aria-pressed', String(chip.dataset.tool === tool));
        });
      });
    });
  });
})();
