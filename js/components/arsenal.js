/* Componente · Detection Engineering & MITRE ATT&CK */
(function () {
  'use strict';
  const P = window.Portfolio;
  const h = P.h;
  const icon = P.icon;

  P.register('arsenal', function (root, data) {
    const arsenal = data.arsenal;
    if (!arsenal) return;

    /* ---- 1. Matriz táctica MITRE ATT&CK ---- */
    const tacticCards = arsenal.mitreTactics.map(function (item) {
      return h('li', { class: 'arsenal-card card' },
        h('div', { class: 'arsenal-card__head' },
          h('span', { class: 'arsenal-card__id' }, item.id),
          h('span', { class: 'chip chip--alt' }, item.telemetry)
        ),
        h('h4', { class: 'arsenal-card__title' }, item.tactic),
        h('p', { class: 'arsenal-card__focus' }, item.focus),
        h('ul', { class: 'chip-list', 'aria-label': 'Técnicas de ' + item.tactic },
          item.techniques.map(function (tech) {
            return h('li', { class: 'chip chip--accent' }, tech);
          })
        )
      );
    });

    /* ---- 2. Laboratorio de Reglas & Playbooks (Tabs accesibles) ---- */
    const detections = arsenal.detections;
    const statusLive = h('span', { class: 'sr-only', role: 'status', 'aria-live': 'polite' });
    let activeIndex = 0;

    const tabButtons = [];
    const tabPanels = [];

    function selectTab(index, moveFocus) {
      activeIndex = index;
      tabButtons.forEach(function (btn, i) {
        const selected = i === index;
        btn.setAttribute('aria-selected', String(selected));
        btn.setAttribute('tabindex', selected ? '0' : '-1');
      });
      tabPanels.forEach(function (panel, i) {
        panel.hidden = i !== index;
      });
      if (moveFocus) tabButtons[index].focus();
      if (typeof tabButtons[index].scrollIntoView === 'function') {
        tabButtons[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    }

    detections.forEach(function (det, index) {
      const tabId = 'arsenal-tab-' + det.id;
      const isInit = index === 0;

      const tabBtn = h('button', {
        class: 'code-tab',
        type: 'button',
        role: 'tab',
        id: tabId,
        'aria-selected': String(isInit),
        tabindex: isInit ? '0' : '-1',
        onClick: function () { selectTab(index, false); }
      }, det.label);

      tabBtn.addEventListener('keydown', function (e) {
        let next = null;
        if (e.key === 'ArrowRight') next = (index + 1) % detections.length;
        else if (e.key === 'ArrowLeft') next = (index - 1 + detections.length) % detections.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = detections.length - 1;
        if (next !== null) {
          e.preventDefault();
          selectTab(next, true);
        }
      });

      const copyBtn = h('button', { class: 'link-btn code-viewer__copy', type: 'button' }, icon('copy'), 'Copiar');
      copyBtn.addEventListener('click', function () {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(det.code).then(function () {
          copyBtn.replaceChildren(icon('check'), '¡Copiado!');
          statusLive.textContent = det.label + ' copiado al portapapeles.';
          setTimeout(function () {
            copyBtn.replaceChildren(icon('copy'), 'Copiar');
            statusLive.textContent = '';
          }, 1800);
        });
      });

      const panel = h('div', {
        class: 'code-tabpanel',
        role: 'tabpanel',
        'aria-labelledby': tabId,
        hidden: !isInit
      },
        h('div', { class: 'code-viewer card' },
          h('div', { class: 'code-viewer__bar' },
            h('div', { class: 'code-viewer__meta' },
              h('span', { class: 'code-viewer__title' }, det.title),
              h('span', { class: 'chip chip--accent' }, det.mitre)
            ),
            copyBtn
          ),
          h('pre', { class: 'code-viewer__pre', tabindex: '0' },
            h('code', null, det.code)
          )
        )
      );

      tabButtons.push(tabBtn);
      tabPanels.push(panel);
    });

    const tablist = h('div', {
      class: 'code-tablist',
      role: 'tablist',
      'aria-label': 'Artefactos de detección y respuesta'
    }, tabButtons);

    root.replaceChildren(
      h('h3', { class: 'subhead' }, '> cobertura táctica MITRE ATT&CK'),
      h('ul', { class: 'arsenal-grid' }, tacticCards),
      h('h3', { class: 'subhead' }, '> reglas de detección, hunting y playbooks SOAR'),
      h('div', { class: 'code-tabs' }, tablist, tabPanels, statusLive)
    );
  });
})();
