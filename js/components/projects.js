/* Componente · Projects & Homelab */
(function () {
  'use strict';
  const P = window.Portfolio;
  const h = P.h;

  P.register('projects', function (root, data) {
    const cards = data.projects.map(function (proj, idx) {
      const titleId = 'project-' + idx + '-title';
      const pipeline = h('ol', { class: 'pipeline', style: '--steps:' + proj.pipeline.length, 'aria-label': 'Arquitectura / flujo de ' + proj.name },
        proj.pipeline.map(function (step) {
          return h('li', { class: 'pipe-node' },
            h('p', { class: 'pipe-node__label' }, step.label),
            h('p', { class: 'pipe-node__detail' }, step.detail)
          );
        })
      );

      return h('li', null,
        h('article', { class: 'project card', 'aria-labelledby': titleId },
          h('div', { class: 'project__head' },
            h('h3', { class: 'project__name', id: titleId }, proj.name),
            h('span', { class: 'chip chip--alt' }, proj.type)
          ),
          h('p', { class: 'project__desc' }, proj.description),
          pipeline,
          h('ul', { class: 'project__stack chip-list', 'aria-label': 'Tecnologías' },
            proj.stack.map(function (s) { return h('li', { class: 'chip chip--accent' }, s); })
          )
        )
      );
    });

    root.replaceChildren(h('ul', { class: 'projects' }, cards));
  });
})();
