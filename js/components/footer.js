/* Componente · Footer (CV + contacto) */
(function () {
  'use strict';
  const P = window.Portfolio;
  const h = P.h;
  const icon = P.icon;

  function row(iconName, label, valueNode, extra) {
    return h('li', { class: 'contact-row' },
      icon(iconName),
      h('div', { class: 'contact-row__main' }, h('div', { class: 'contact-row__label' }, label), valueNode),
      extra || null
    );
  }

  P.register('footer', function (root, data) {
    const p = data.profile;

    const feedback = h('span', { class: 'sr-only', role: 'status', 'aria-live': 'polite' });
    const copyBtn = h('button', { class: 'link-btn', type: 'button', 'aria-label': 'Copiar correo al portapapeles' }, 'copiar');
    copyBtn.addEventListener('click', function () {
      if (!navigator.clipboard) { window.location.href = 'mailto:' + p.email; return; }
      navigator.clipboard.writeText(p.email).then(function () {
        copyBtn.textContent = '¡copiado!';
        feedback.textContent = 'Correo copiado al portapapeles';
        setTimeout(function () { copyBtn.textContent = 'copiar'; feedback.textContent = ''; }, 1800);
      });
    });

    root.replaceChildren(
      h('div', { class: 'container' },
        h('div', { class: 'footer-grid' },
          h('div', { class: 'footer-cta' },
            h('p', { class: 'eyebrow' }, '// 05 · contact.sh'),
            h('h2', null, '¿Hablamos de detección, DFIR o respuesta a incidentes?'),
            h('p', null, 'Disponible para conversar sobre ingeniería de detección, threat hunting y proyectos de ciberdefensa. Descarga mi CV o escríbeme directamente.'),
            h('a', { class: 'btn btn--primary', href: data.meta.cvUrl, download: '' }, icon('download'), 'Descargar CV (PDF)')
          ),
          h('ul', { class: 'contact-list', 'aria-label': 'Datos de contacto' },
            row('mail', 'Email', h('a', { class: 'contact-row__value', href: 'mailto:' + p.email }, p.email), copyBtn),
            row('linkedin', 'LinkedIn', h('a', { class: 'contact-row__value', href: p.linkedin, target: '_blank', rel: 'noopener noreferrer' }, 'Javier Alonso Sánchez', h('span', { class: 'sr-only' }, ' (se abre en una pestaña nueva)'))),
            row('pin', 'Ubicación', h('span', { class: 'contact-row__value' }, p.location))
          )
        ),
        h('div', { class: 'footer-bottom' },
          h('span', null, '© ' + new Date().getFullYear() + ' ' + p.name),
          h('span', null, 'Hecho con HTML, CSS y JS · sin dependencias'),
          feedback
        )
      )
    );
  });
})();
