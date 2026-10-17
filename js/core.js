/* ==========================================================================
   core.js · Utilidades compartidas, registro de componentes y bus de eventos
   Espacio de nombres global: window.Portfolio
   ========================================================================== */
(function () {
  'use strict';

  const NS = (window.Portfolio = window.Portfolio || {});
  const registry = new Map();

  /** Registra un componente/feature: fn(rootElement, data) */
  NS.register = function (name, fn) { registry.set(name, fn); };

  /** Monta todo elemento [data-component] con su función registrada */
  NS.mountAll = function (data) {
    document.querySelectorAll('[data-component]').forEach(function (node) {
      const fn = registry.get(node.dataset.component);
      if (!fn) return;
      try { fn(node, data); }
      catch (err) { console.error('[portfolio] Error montando "' + node.dataset.component + '"', err); }
    });
  };

  /* ---- Bus de eventos mínimo (comunicación entre componentes) ---- */
  const bus = new EventTarget();
  NS.emit = function (type, detail) { bus.dispatchEvent(new CustomEvent(type, { detail: detail })); };
  NS.on = function (type, fn) { bus.addEventListener(type, function (e) { fn(e.detail); }); };

  /** Estado compartido: herramienta seleccionada (skills ⇄ timeline) */
  NS.state = { tool: null };
  NS.toggleTool = function (tool) {
    NS.state.tool = NS.state.tool === tool ? null : tool;
    NS.emit('tool:change', NS.state.tool);
  };

  NS.prefersReducedMotion = function () {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /**
   * Hyperscript: h('div', { class: 'x', onClick: fn }, 'texto', otroNodo)
   * Los textos se insertan como nodos de texto (sin innerHTML → sin XSS).
   * Nota: para atributos ARIA booleanos usar strings ('true' / 'false').
   */
  NS.h = function (tag, attrs) {
    const node = document.createElement(tag);
    const props = attrs || {};
    Object.keys(props).forEach(function (key) {
      const value = props[key];
      if (value === null || value === undefined || value === false) return;
      if (key === 'class') node.className = value;
      else if (key === 'dataset') Object.assign(node.dataset, value);
      else if (key.slice(0, 2) === 'on' && typeof value === 'function') node.addEventListener(key.slice(2).toLowerCase(), value);
      else if (value === true) node.setAttribute(key, '');
      else node.setAttribute(key, String(value));
    });
    append(node, Array.prototype.slice.call(arguments, 2));
    return node;
  };

  function append(parent, children) {
    children.forEach(function (child) {
      if (child === null || child === undefined || child === false) return;
      if (Array.isArray(child)) append(parent, child);
      else if (child instanceof Node) parent.appendChild(child);
      else parent.appendChild(document.createTextNode(String(child)));
    });
  }

  /* ---- Iconos SVG inline (estilo trazo, 24×24). Cadenas fijas y de confianza ---- */
  const ICONS = {
    mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    cap: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<polyline points="20 6 9 17 4 12"/>'
  };

  NS.icon = function (name) {
    const span = document.createElement('span');
    span.className = 'icon';
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '<svg viewBox="0 0 24 24" focusable="false">' + (ICONS[name] || '') + '</svg>';
    return span;
  };

  /** "id" seguro a partir de un texto */
  NS.slug = function (text) {
    return String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };
})();
