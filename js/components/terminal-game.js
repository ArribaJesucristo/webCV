/* Componente · Operation BlueShield (SOC L3 Live Incident Simulator) */
(function () {
  'use strict';
  const P = window.Portfolio;
  const h = P.h;
  const icon = P.icon;

  const AUTOCOMPLETE = [
    'help',
    'alerts',
    'edr WKSTN-FIN-04',
    'reversing sync_agent.dll',
    'hunt 185.220.101.42',
    'contain WKSTN-FIN-04',
    'status',
    'mitre',
    'whoami',
    'skills',
    'clear',
    'reset'
  ];

  const QUICK_CHIPS = [
    { cmd: 'help', label: 'help' },
    { cmd: 'alerts', label: 'alerts', phase: 'triage' },
    { cmd: 'edr WKSTN-FIN-04', label: 'edr WKSTN-FIN-04', phase: 'edr' },
    { cmd: 'reversing sync_agent.dll', label: 'reversing sync_agent.dll', phase: 'reversing' },
    { cmd: 'hunt 185.220.101.42', label: 'hunt 185.220.101.42', phase: 'hunt' },
    { cmd: 'contain WKSTN-FIN-04', label: 'contain WKSTN-FIN-04', phase: 'contain' },
    { cmd: 'status', label: 'status' },
    { cmd: 'clear', label: 'clear' }
  ];

  function formatDuration(ms) {
    const secs = Math.max(1, Math.round(ms / 1000));
    if (secs < 60) return secs + 's';
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return mins + 'm ' + (rem < 10 ? '0' : '') + rem + 's';
  }

  P.register('terminal-game', function (root, data) {
    const cfg = data.terminalGame;
    const phases = cfg.phases;

    const state = {
      completed: new Set(),
      history: [],
      historyIndex: -1,
      startedAt: Date.now(),
      won: false
    };

    /* ---- Elementos de HUD ---- */
    const statusBadge = h('span', { class: 'term-hud__badge term-hud__badge--alert' },
      h('span', { class: 'term-hud__dot', 'aria-hidden': 'true' }),
      cfg.incidentId + ' · APT Intrusion'
    );
    const hintText = h('p', { class: 'term-hud__hint' });
    const resetBtn = h('button', { class: 'link-btn', type: 'button', onClick: function () { runCommand('reset'); input.focus(); } }, 'Reiniciar misión');

    const stepNodes = phases.map(function (ph) {
      const badge = h('span', { class: 'mission-step__num' }, ph.step);
      const label = h('span', { class: 'mission-step__label' }, ph.label);
      const item = h('li', { class: 'mission-step', dataset: { phase: ph.id } }, badge, label);
      return { ph: ph, item: item };
    });

    const hud = h('div', { class: 'term-hud card' },
      h('div', { class: 'term-hud__top' },
        h('div', { class: 'term-hud__title-wrap' },
          h('span', { class: 'term-hud__icon' }, icon('terminal')),
          h('div', null,
            h('h3', { class: 'term-hud__title' }, cfg.missionTitle),
            hintText
          )
        ),
        h('div', { class: 'term-hud__controls' }, statusBadge, resetBtn)
      ),
      h('ol', { class: 'mission-steps', 'aria-label': 'Progreso de la investigación' },
        stepNodes.map(function (s) { return s.item; })
      )
    );

    /* ---- Ventana de Consola ---- */
    const termStatusPill = h('span', { class: 'term-game__live' }, 'LIVE INCIDENT');
    const output = h('div', {
      class: 'term-game__output',
      role: 'log',
      'aria-label': 'Salida de consola del simulador SOC',
      tabindex: '0'
    });
    const announcer = h('div', { class: 'sr-only', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });

    const input = h('input', {
      id: 'soc-cli-input',
      class: 'term-game__input',
      type: 'text',
      autocomplete: 'off',
      spellcheck: 'false',
      placeholder: 'Escribe un comando (ej. help, alerts, edr WKSTN-FIN-04)...'
    });

    const form = h('form', { class: 'term-game__form' },
      h('label', { class: 'term-game__prompt', for: 'soc-cli-input' }, 'analyst@soc-l3:~$'),
      input,
      h('button', { class: 'btn btn--primary term-game__submit', type: 'submit' }, 'Ejecutar')
    );

    const quickChipNodes = QUICK_CHIPS.map(function (q) {
      return {
        def: q,
        btn: h('button', {
          class: 'chip',
          type: 'button',
          onClick: function () {
            runCommand(q.cmd);
            input.focus();
          }
        }, q.label)
      };
    });

    const quickBar = h('div', { class: 'term-game__quick', role: 'group', 'aria-label': 'Comandos rápidos del simulador' },
      h('span', { class: 'term-game__quick-label' }, 'Comandos rápidos:'),
      h('div', { class: 'chip-list' }, quickChipNodes.map(function (q) { return q.btn; }))
    );

    const screen = h('section', { class: 'term-game card', 'aria-label': 'Consola interactiva de ciberseguridad' },
      h('div', { class: 'terminal__bar' },
        h('span', { class: 'terminal__dot', 'aria-hidden': 'true' }),
        h('span', { class: 'terminal__dot', 'aria-hidden': 'true' }),
        h('span', { class: 'terminal__dot', 'aria-hidden': 'true' }),
        h('span', { class: 'terminal__title' }, 'soc-l3-simulator — bash — 112×32'),
        termStatusPill
      ),
      output,
      form,
      quickBar,
      announcer
    );

    root.replaceChildren(hud, screen);

    /* ---- Helpers de salida y actualización de HUD ---- */
    function printLine(text, tone) {
      const cls = 'term-line' + (tone ? ' term-line--' + tone : '');
      output.appendChild(h('p', { class: cls }, text));
    }

    function printBlock(lines, tone) {
      lines.forEach(function (entry) {
        if (typeof entry === 'string') printLine(entry, tone);
        else printLine(entry.text, entry.tone || tone);
      });
    }

    function scrollOutput() {
      output.scrollTop = output.scrollHeight;
    }

    function nextPendingPhase() {
      for (let i = 0; i < phases.length; i++) {
        if (!state.completed.has(phases[i].id)) return phases[i];
      }
      return null;
    }

    function updateHud() {
      const next = nextPendingPhase();
      stepNodes.forEach(function (s) {
        const done = state.completed.has(s.ph.id);
        const current = !done && next && next.id === s.ph.id;
        s.item.classList.toggle('is-done', done);
        s.item.classList.toggle('is-current', Boolean(current));
      });

      quickChipNodes.forEach(function (q) {
        const isSuggested = Boolean(next && q.def.phase === next.id);
        const isDone = Boolean(q.def.phase && state.completed.has(q.def.phase));
        q.btn.classList.toggle('chip--suggested', isSuggested);
        q.btn.classList.toggle('chip--done', isDone);
      });

      if (state.won) {
        statusBadge.className = 'term-hud__badge term-hud__badge--ok';
        statusBadge.replaceChildren(h('span', { class: 'term-hud__dot', 'aria-hidden': 'true' }), 'CONTAINED · DEFCON 5');
        termStatusPill.textContent = 'CONTAINED';
        termStatusPill.className = 'term-game__live is-contained';
        hintText.textContent = 'Misión completada: amenaza aislada y erradicada. Puedes ejecutar `reset` para reintentar.';
      } else {
        statusBadge.className = 'term-hud__badge term-hud__badge--alert';
        statusBadge.replaceChildren(h('span', { class: 'term-hud__dot', 'aria-hidden': 'true' }), cfg.incidentId + ' · APT Intrusion');
        termStatusPill.textContent = 'LIVE INCIDENT';
        termStatusPill.className = 'term-game__live';
        hintText.textContent = next ? 'Siguiente paso sugerido: ' + next.hint : '';
      }
    }

    function printBanner() {
      output.replaceChildren();
      printBlock([
        { text: '╔══════════════════════════════════════════════════════════════════════╗', tone: 'accent' },
        { text: '║   OPERATION BLUESHIELD :: SOC L3 LIVE INCIDENT RESPONSE SIMULATOR   ║', tone: 'accent' },
        { text: '╚══════════════════════════════════════════════════════════════════════╝', tone: 'accent' },
        { text: '[ALERTA ENTRANTE] Incidente ' + cfg.incidentId + ' · Severidad: CRÍTICA · SLA: 15m', tone: 'danger' },
        { text: 'Resumen: Correlación anómala detectada en segmento Finanzas. Investiga la cola SIEM, inspecciona telemetría EDR, realiza reversing al artefacto sospechoso, caza el IOC y contiene la intrusión.', tone: 'muted' },
        { text: 'Tip: Escribe `help` para ver comandos o usa los botones rápidos debajo de la consola.', tone: 'cyan' }
      ]);
      updateHud();
    }

    function announce(msg) {
      announcer.textContent = msg;
    }

    function runCommand(raw) {
      const cmdLine = String(raw || '').trim();
      if (!cmdLine) return;

      state.history.push(cmdLine);
      state.historyIndex = state.history.length;

      printLine('analyst@soc-l3:~$ ' + cmdLine, 'cmd');

      const parts = cmdLine.split(/\s+/);
      const base = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');

      if (base === 'clear') {
        output.replaceChildren();
        announce('Consola limpiada.');
        return;
      }

      if (base === 'reset') {
        state.completed.clear();
        state.startedAt = Date.now();
        state.won = false;
        printBanner();
        announce('Misión reiniciada.');
        return;
      }

      if (base === 'help' || base === '?') {
        printBlock([
          { text: '--- COMANDOS DE INVESTIGACIÓN DFIR / SOC L3 ---', tone: 'accent' },
          { text: '  alerts                      Revisar alertas activas en SIEM (Fase 01)', tone: 'cyan' },
          { text: '  edr WKSTN-FIN-04            Inspeccionar árbol de procesos y memoria EDR (Fase 02)', tone: 'cyan' },
          { text: '  reversing sync_agent.dll    Extraer strings, C2 y mutex del artefacto (Fase 03)', tone: 'cyan' },
          { text: '  hunt 185.220.101.42         Cazar IOC en logs ClickHouse / Firewall (Fase 04)', tone: 'cyan' },
          { text: '  contain WKSTN-FIN-04        Aislar endpoint y desplegar reglas de bloqueo (Fase 05)', tone: 'cyan' },
          { text: '--- UTILIDADES Y PORTFOLIO ---', tone: 'accent' },
          { text: '  status   · Progreso de la misión     |  mitre  · Tácticas y técnicas observadas', tone: 'muted' },
          { text: '  whoami   · Perfil del analista       |  skills · Resumen de stack técnico', tone: 'muted' },
          { text: '  clear    · Limpiar pantalla          |  reset  · Reiniciar simulador', tone: 'muted' }
        ]);
        announce('Lista de comandos mostrada.');
      } else if (base === 'alerts' || base === 'siem') {
        state.completed.add('triage');
        printBlock([
          { text: '[SIEM · Google SecOps / FortiSIEM] 3 eventos correlacionados (últimos 10 min):', tone: 'accent' },
          { text: '  1. [CRITICAL] Host: WKSTN-FIN-04 | MITRE: T1059.001 | Encoded PowerShell Spawned', tone: 'danger' },
          { text: '     Cmd: powershell.exe -NoP -W Hidden -Enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQA...', tone: 'muted' },
          { text: '  2. [HIGH]     Host: WKSTN-FIN-04 | MITRE: T1218.011 | Rundll32 cargando DLL no firmada', tone: 'warn' },
          { text: '  3. [LOW]      Host: SRV-WEB-02   | MITRE: T1595     | Escaneo HTTP externo bloqueado', tone: 'muted' },
          { text: '✓ Fase 01 (Triage) completada. Objetivo comprometido identificado: WKSTN-FIN-04.', tone: 'ok' }
        ]);
        announce('Fase 1 completada. Alerta crítica encontrada en WKSTN-FIN-04.');
      } else if (base === 'edr' || base === 'pslist') {
        if (arg && arg.toUpperCase() !== cfg.affectedHost) {
          printLine('[EDR] Host "' + arg + '" sin anomalías críticas. Revisa el host de la alerta: ' + cfg.affectedHost, 'warn');
          announce('Host sin anomalías críticas.');
        } else {
          state.completed.add('edr');
          printBlock([
            { text: '[EDR · CrowdStrike Falcon / Sysmon] Árbol de procesos en ' + cfg.affectedHost + ':', tone: 'accent' },
            { text: '  ├─ explorer.exe (PID 2104) [Signed: Microsoft]', tone: 'muted' },
            { text: '  │  └─ powershell.exe (PID 3980) [-Enc payload] -> Terminated', tone: 'warn' },
            { text: '  │     └─ rundll32.exe (PID 4112) C:\\ProgramData\\sync_agent.dll,DllRegisterServer', tone: 'warn' },
            { text: '  └─ svchost.exe (PID 4812) [ALERTA: Unbacked RWX Memory Region · T1055]', tone: 'danger' },
            { text: '     Módulo inyectado: C:\\ProgramData\\sync_agent.dll (SHA256: 9f8a4b2c...e71d)', tone: 'cyan' },
            { text: '✓ Fase 02 (EDR Forensics) completada. Artefacto sospechoso aislado: sync_agent.dll.', tone: 'ok' }
          ]);
          announce('Fase 2 completada. Inyección de memoria detectada desde sync_agent.dll.');
        }
      } else if (base === 'reversing' || base === 'strings') {
        if (arg && arg.toLowerCase() !== cfg.maliciousFile) {
          printLine('[REVERSING] Artefacto "' + arg + '" no encontrado en cuarentena. Prueba con `' + cfg.maliciousFile + '`.', 'warn');
          announce('Artefacto no encontrado.');
        } else {
          state.completed.add('reversing');
          printBlock([
            { text: '[DFIR / Reversing · IDA Pro & PE-bear] Análisis estático de ' + cfg.maliciousFile + ':', tone: 'accent' },
            { text: '  Formato: PE32+ DLL (x64) | Entropía .text: 7.42 (posible packer/XOR) | Sin firma digital', tone: 'muted' },
            { text: '  Imports críticos: VirtualAllocEx, WriteProcessMemory, CreateRemoteThread, WinHttpConnect', tone: 'warn' },
            { text: '  [Strings decodificadas]', tone: 'cyan' },
            { text: '    • C2 Endpoint : https://' + cfg.c2Ip + ':443/api/v2/checkin', tone: 'danger' },
            { text: '    • C2 Fallback : ' + cfg.c2Domain, tone: 'danger' },
            { text: '    • Mutex       : ' + cfg.mutex, tone: 'cyan' },
            { text: '✓ Fase 03 (Reversing) completada. IOCs extraídos: ' + cfg.c2Ip + ' y ' + cfg.mutex + '.', tone: 'ok' }
          ]);
          announce('Fase 3 completada. C2 185.220.101.42 extraído del binario.');
        }
      } else if (base === 'hunt') {
        if (arg && arg !== cfg.c2Ip && arg !== cfg.c2Domain) {
          printLine('[HUNT] Sin coincidencias relevantes para "' + arg + '". Caza el IOC del C2: ' + cfg.c2Ip, 'warn');
          announce('Sin coincidencias para el IOC indicado.');
        } else {
          state.completed.add('hunt');
          printBlock([
            { text: '[THREAT HUNT · ClickHouse / Zeek] Consulta ejecutada sobre 2.8M registros (últimas 24h):', tone: 'accent' },
            { text: '  SELECT src_host, dst_ip, count(), avg(delta_s) FROM netflow WHERE dst_ip = \'' + cfg.c2Ip + '\'', tone: 'muted' },
            { text: '  ┌──────────────┬─────────────────┬─────────┬────────────┬───────────────────────────┐', tone: 'cyan' },
            { text: '  │ WKSTN-FIN-04 │ 185.220.101.42  │ 47 hits │ 60.2s ±2s  │ Beaconing C2 confirmado   │', tone: 'danger' },
            { text: '  │ DC-PROD-01   │ 185.220.101.42  │ 0 hits  │ —          │ Sin movimiento lateral    │', tone: 'ok' },
            { text: '  └──────────────┴─────────────────┴─────────┴────────────┴───────────────────────────┘', tone: 'cyan' },
            { text: '✓ Fase 04 (Threat Hunt) completada. Alcance limitado a WKSTN-FIN-04; listo para contención.', tone: 'ok' }
          ]);
          announce('Fase 4 completada. Beaconing confirmado únicamente en WKSTN-FIN-04.');
        }
      } else if (base === 'contain' || base === 'isolate' || (base === 'playbook' && arg.toLowerCase() === 'isolate')) {
        const required = ['triage', 'edr', 'reversing', 'hunt'];
        const missing = required.filter(function (id) { return !state.completed.has(id); });
        if (missing.length) {
          const names = missing.map(function (id) {
            const match = phases.find(function (p) { return p.id === id; });
            return match ? match.step + ' ' + match.label + ' (`' + match.cmd + '`)' : id;
          }).join(', ');
          printBlock([
            { text: '[BLOQUEO METODOLÓGICO] Contención abortada: aún no has recopilado toda la evidencia DFIR.', tone: 'danger' },
            { text: 'Fases pendientes antes de aislar el host: ' + names, tone: 'warn' }
          ]);
          announce('Contención bloqueada. Completa antes las fases de investigación previas.');
        } else if (base === 'contain' && arg && arg.toUpperCase() !== cfg.affectedHost) {
          printLine('[SOAR] Host "' + arg + '" no corresponde al endpoint comprometido (' + cfg.affectedHost + ').', 'warn');
          announce('Host incorrecto para contención.');
        } else {
          state.completed.add('contain');
          state.won = true;
          const elapsed = formatDuration(Date.now() - state.startedAt);
          printBlock([
            { text: '[SOAR · Shuffle Playbook] Ejecutando respuesta automática...', tone: 'accent' },
            { text: '  [1/4] Host ' + cfg.affectedHost + ' aislado de red vía CrowdStrike Falcon RTR.', tone: 'ok' },
            { text: '  [2/4] IP ' + cfg.c2Ip + ' y dominio ' + cfg.c2Domain + ' bloqueados en firewall perimetral.', tone: 'ok' },
            { text: '  [3/4] Regla Sigma (mutex ' + cfg.mutex + ' + T1055) desplegada en Google SecOps.', tone: 'ok' },
            { text: '  [4/4] Caso cerrado en TheHive con evidencia forense adjunta.', tone: 'ok' },
            { text: '★ MISIÓN COMPLETADA (' + elapsed + ') · Rango obtenido: SOC L3 INCIDENT COMMANDER ★', tone: 'ok' }
          ]);
          announce('Misión completada. Incidente contenido y erradicado con éxito.');
        }
      } else if (base === 'status') {
        const doneCount = state.completed.size;
        printBlock([
          { text: '[ESTADO DE MISIÓN] ' + cfg.incidentId + ' · Progreso: ' + doneCount + '/' + phases.length + ' fases completadas.', tone: 'accent' }
        ].concat(phases.map(function (p) {
          const ok = state.completed.has(p.id);
          return { text: '  ' + (ok ? '[✓]' : '[ ]') + ' ' + p.step + ' · ' + p.label + ' (' + p.cmd + ')', tone: ok ? 'ok' : 'muted' };
        })));
        announce('Estado actual: ' + doneCount + ' de ' + phases.length + ' fases completadas.');
      } else if (base === 'mitre') {
        printBlock([
          { text: '[MITRE ATT&CK MAPPING · ' + cfg.incidentId + ']', tone: 'accent' },
          { text: '  • T1059.001 · Command and Scripting Interpreter: PowerShell (ofuscación Base64)', tone: 'cyan' },
          { text: '  • T1218.011 · System Binary Proxy Execution: Rundll32', tone: 'cyan' },
          { text: '  • T1055     · Process Injection (svchost.exe RWX unbacked memory)', tone: 'cyan' },
          { text: '  • T1071.001 · Application Layer Protocol: Web Protocols (HTTPS Beaconing)', tone: 'cyan' }
        ]);
        announce('Tácticas MITRE ATT&CK mostradas.');
      } else if (base === 'whoami') {
        const prof = data.profile;
        printBlock([
          { text: prof.name + ' · ' + prof.title, tone: 'accent' },
          { text: 'Especialidad: ' + prof.specialization, tone: 'cyan' },
          { text: 'Ubicación: ' + prof.location + ' | Certificaciones: ' + data.certifications.map(function (c) { return c.name.split(' ')[0]; }).join(', '), tone: 'muted' }
        ]);
        announce('Información de perfil mostrada.');
      } else if (base === 'skills') {
        const summary = data.skillCategories.map(function (cat) {
          return { text: '  [' + cat.label + '] ' + data.skills[cat.key].join(', '), tone: 'cyan' };
        });
        printBlock([{ text: '[DEFENSE STACK]', tone: 'accent' }].concat(summary));
        announce('Resumen de stack técnico mostrado.');
      } else {
        printLine('Comando no reconocido: "' + base + '". Escribe `help` para consultar los comandos disponibles.', 'danger');
        announce('Comando no reconocido.');
      }

      updateHud();
      scrollOutput();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = input.value;
      input.value = '';
      runCommand(val);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') {
        if (!state.history.length) return;
        e.preventDefault();
        state.historyIndex = Math.max(0, state.historyIndex - 1);
        input.value = state.history[state.historyIndex];
      } else if (e.key === 'ArrowDown') {
        if (!state.history.length) return;
        e.preventDefault();
        state.historyIndex = Math.min(state.history.length, state.historyIndex + 1);
        input.value = state.historyIndex < state.history.length ? state.history[state.historyIndex] : '';
      } else if (e.key === 'Tab') {
        const val = input.value.trim().toLowerCase();
        if (!val) return;
        const match = AUTOCOMPLETE.find(function (c) { return c.toLowerCase().indexOf(val) === 0; });
        if (match) {
          e.preventDefault();
          input.value = match;
        }
      }
    });

    printBanner();
  });
})();
