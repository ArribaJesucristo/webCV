/* ==========================================================================
   Datos del portfolio
   Fuente: portfolio_data.json (contenido original, sin modificar).
   Campos añadidos (derivados del propio texto del perfil):
     - meta.*                    → configuración (inicio carrera SOC, ruta del CV)
     - experience[].tools        → stack por puesto (para chips y cruce con Skills)
     - skillCategories           → etiquetas y orden de los filtros
     - projects[].stack/pipeline → detalle técnico para las tarjetas
   Se expone como script clásico (no fetch) para funcionar también desde file://
   ========================================================================== */
window.PORTFOLIO_DATA = {
  meta: {
    securityStart: '2021-11-29',
    cvUrl: 'assets/cv/Javier_Alonso_Sanchez_CV.pdf',
    highlights: ['L3 Analyst', 'DFIR', 'Detection Engineering', 'Threat Hunting', 'Reverse Engineering']
  },

  profile: {
    name: 'Javier Alonso Sánchez',
    title: 'Cybersecurity Engineer & SOC L3 Analyst',
    specialization: 'Detection Engineering, Threat Hunting & Incident Response',
    location: 'Salamanca, España',
    email: 'javieralonsosanchez1996@gmail.com',
    linkedin: 'https://www.linkedin.com/in/javier-alonso-s%C3%A1nchez-042724209/',
    about: 'Ingeniero informático especializado en desarrollo de software y ciberseguridad defensiva. Experiencia sólida en análisis y respuesta de incidentes N3, threat hunting proactivo, ingeniería de detección (SIEM/SOAR/EDR), análisis forense digital e ingeniería inversa.'
  },

  certifications: [
    { name: 'D-CFIA (Deloitte Certified Forensic Investigator)', issuer: 'CyberSOC Deloitte' },
    { name: 'D-CREA (Deloitte Certified Reverse Engineer Associate)', issuer: 'CyberSOC Deloitte' }
  ],

  education: [
    {
      degree: 'Máster en Ciberseguridad',
      institution: 'IMF Business School en colaboración con CyberSOC Deloitte y Univ. Nebrija',
      fields: ['SIEM y Detección', 'Hacking Ético', 'Ciberinteligencia & Ciberfraude', 'SDLC Seguro', 'Análisis Forense', 'Ingeniería Inversa', 'Seguridad Móvil']
    },
    { degree: 'Grado en Ingeniería Informática', institution: 'Universidad Pontificia de Salamanca (UPSA)' },
    { degree: 'Especialización C1B3RWALL Academy', institution: 'Ciberseguridad y Blockchain' }
  ],

  experience: [
    {
      role: 'Ingeniero de Ciberseguridad y Analista L3',
      company: 'Plexus Tech',
      period: '01/07/2025 – Actualidad',
      tools: ['FortiSIEM', 'Google SecOps (Chronicle)', 'CrowdStrike Falcon', 'Harmony EDR', 'Microsoft Defender for Endpoint'],
      responsibilities: [
        'Threat Hunting proactivo, triage avanzado y erradicación de Amenazas Persistentes Avanzadas (APT).',
        'Gestión integral, correlación y automatización de Respuesta a Incidentes (IR) en FortiSIEM y Google SecOps (Chronicle).',
        'Monitorización y análisis forense de telemetría de endpoint con CrowdStrike Falcon, Harmony EDR y Microsoft Defender for Endpoint.',
        'Ingeniería de detección: creación y afinado de reglas de detección de casos de uso y optimización de falsos positivos.'
      ]
    },
    {
      role: 'Analista de Ciberseguridad SOC',
      company: 'Panda Security',
      period: '23/01/2023 – 13/06/2025',
      tools: ['Panda Orion XDR', 'Stellar Cyber', 'CrowdStrike Falcon', 'Kibana', 'SQL', 'ClickHouse', 'Azure Sentinel', 'CyGlass', 'MITRE ATT&CK', 'Confluence', 'Jira'],
      responsibilities: [
        'Operativa defensiva 24/7 y análisis forense sobre telemetría en tiempo real con Orion (XDR), Stellar Cyber, CrowdStrike Falcon y Kibana.',
        'Búsqueda avanzada de evidencias mediante consultas en SQL, NoSQL y ClickHouse.',
        'Mapeo de amenazas bajo el marco MITRE ATT&CK e identificación de técnicas con LOLBAS / LOLBins / GTFOBins.',
        'Respuesta ante incidentes en Microsoft 365 (Azure Sentinel) y supervisión de alertas de red en CyGlass.',
        'Elaboración de playbooks técnicos en Confluence, reglas de exclusión RegEx y gestión de sprints en Jira.',
        'Supervisión técnica, mentoría y sesiones de formación periódicas para el equipo de analistas.'
      ]
    },
    {
      role: 'Técnico-Analista SOC AntiDDoS',
      company: 'Serbatic (Telefónica)',
      period: '29/11/2021 – 26/08/2022',
      tools: ['Arbor Peakflow', 'Remedy'],
      responsibilities: [
        'Monitorización y valoración crítica para mitigación de ataques DDoS mediante Arbor Peakflow y ticketing con Remedy.'
      ]
    },
    {
      role: 'Search Engine Evaluator',
      company: 'Appen',
      period: '20/02/2018 – 29/11/2021',
      tools: [],
      responsibilities: [
        'Evaluación y calificación analítica de la precisión y relevancia de algoritmos de búsqueda.'
      ]
    }
  ],

  skillCategories: [
    { key: 'siem_soar', label: 'SIEM / SOAR', description: 'Correlación, detección y orquestación de respuesta.' },
    { key: 'edr_xdr_telemetry', label: 'EDR / XDR', description: 'Telemetría de endpoint y detección extendida.' },
    { key: 'dfir_forensics', label: 'DFIR', description: 'Forense de disco, memoria y red.' },
    { key: 'reversing_mobile', label: 'Reversing', description: 'Ingeniería inversa de binarios y apps móviles.' },
    { key: 'development_data', label: 'Desarrollo', description: 'Lenguajes, datos y entornos de laboratorio.' }
  ],

  skills: {
    siem_soar: ['Google SecOps (Chronicle)', 'FortiSIEM', 'Splunk', 'QRadar', 'Azure Sentinel', 'Stellar Cyber', 'Shuffle SOAR', 'Kibana'],
    edr_xdr_telemetry: ['CrowdStrike Falcon', 'Harmony EDR', 'Microsoft Defender for Endpoint', 'Panda Orion XDR', 'Wazuh', 'Sysmon'],
    dfir_forensics: ['FTK Imager', 'Volatility (Memory)', 'Autopsy', 'Caine', 'Wireshark', 'Snort', 'Sysinternals Suite'],
    reversing_mobile: ['IDA Pro', 'PE-bear', 'HxD', 'Frida', 'MobSF', 'JADX', 'APKTool', 'ADB'],
    development_data: ['Python', 'R / RStudio', 'Java', 'PHP', 'C / C#', 'SQL', 'ClickHouse', 'MongoDB', 'Docker', 'WSL2']
  },

  projects: [
    {
      name: 'SOC Defensivo & Homelab de Telemetría',
      type: 'Seguridad & Automatización',
      description: 'Laboratorio modular de detección y respuesta ante incidentes integrando agentes Wazuh y telemetría de Sysmon, ingestión en Elasticsearch, orquestación de respuesta con Shuffle SOAR (enriquecimiento automático con VirusTotal) y gestión de casos en TheHive.',
      stack: ['Wazuh', 'Sysmon', 'Elasticsearch', 'Shuffle SOAR', 'VirusTotal', 'TheHive'],
      pipeline: [
        { label: 'Wazuh + Sysmon', detail: 'Agentes en endpoints y telemetría detallada de procesos, red y registro.' },
        { label: 'Elasticsearch', detail: 'Ingestión, indexado y búsqueda de eventos y alertas.' },
        { label: 'Shuffle SOAR', detail: 'Orquestación de playbooks y enriquecimiento automático con VirusTotal.' },
        { label: 'TheHive', detail: 'Gestión de casos y seguimiento de la investigación.' }
      ]
    },
    {
      name: 'Trading Cuantitativo & Automatización Algorítmica',
      type: 'Desarrollo MQL5 / FinTech',
      description: 'Desarrollo y backtesting riguroso de bots de trading automatizados sobre MetaTrader 5 basados en estrategias de Opening Range Breakout (ORB) y Order Blocks, con análisis estadístico de ejecuciones y control de riesgo.',
      stack: ['MQL5', 'MetaTrader 5', 'ORB', 'Order Blocks', 'Backtesting'],
      pipeline: [
        { label: 'Estrategia', detail: 'Opening Range Breakout (ORB) y Order Blocks.' },
        { label: 'Expert Advisor', detail: 'Bots automatizados en MQL5 sobre MetaTrader 5.' },
        { label: 'Backtesting', detail: 'Pruebas históricas rigurosas y análisis estadístico de ejecuciones.' },
        { label: 'Control de riesgo', detail: 'Reglas de gestión del riesgo integradas en la operativa.' }
      ]
    },
    {
      name: 'EASM Testbed & Attack Surface Lab',
      type: 'EASM & Hardening',
      description: 'Entorno controlado para validación de escáneres de External Attack Surface Management (EASM): simulación modular de posturas de seguridad (cabeceras HTTP, configuraciones TLS, registros DNS, exposición de servicios y reglas WAF) para medir cobertura de detección.',
      stack: ['EASM', 'TLS/SSL', 'HTTP Security Headers', 'DNS Security', 'WAF', 'Docker'],
      pipeline: [
        { label: 'Superficie DNS & TLS', detail: 'Registros SPF/DMARC/CAA, subdominios y perfiles de cifrado TLS.' },
        { label: 'Perfiles de Exposición', detail: 'Activación modular de WAF, cabeceras HTTP, puertos y rutas señuelo.' },
        { label: 'Escaneo EASM', detail: 'Ejecución de descubrimiento externo, fingerprinting y auditoría.' },
        { label: 'Verificación de Detección', detail: 'Comparativa de hallazgos antes y después de aplicar hardening.' }
      ]
    }
  ],

  arsenal: {
    mitreTactics: [
      {
        id: 'TA0001 / TA0002',
        tactic: 'Initial Access & Execution',
        techniques: ['T1059.001 · PowerShell', 'T1204.002 · Malicious File'],
        focus: 'Detección de cadenas anómalas padre-hijo (Winword/Browser → CMD/PowerShell), argumentos Base64 y ejecución en memoria.',
        telemetry: 'Sysmon EID 1 / ScriptBlock 4104'
      },
      {
        id: 'TA0003 / TA0004',
        tactic: 'Persistence & PrivEsc',
        techniques: ['T1547.001 · Registry Run Keys', 'T1053.005 · Scheduled Task'],
        focus: 'Correlación de modificaciones en claves Run/Services, creación de tareas programadas sospechosas y abuso de tokens.',
        telemetry: 'Sysmon EID 13 / Security 4698'
      },
      {
        id: 'TA0005',
        tactic: 'Defense Evasion',
        techniques: ['T1218.011 · Rundll32', 'T1055 · Process Injection'],
        focus: 'Caza de LOLBins/GTFOBins con carga de DLLs desde AppData/ProgramData, hollowing e hilos remotos no firmados.',
        telemetry: 'Sysmon EID 7, 8 / EDR Telemetry'
      },
      {
        id: 'TA0006',
        tactic: 'Credential Access',
        techniques: ['T1003.001 · LSASS Memory', 'T1558.003 · Kerberoasting'],
        focus: 'Bloqueo de accesos no autorizados con permisos PROCESS_VM_READ sobre lsass.exe y peticiones anómalas TGS RC4.',
        telemetry: 'Sysmon EID 10 / Security 4769'
      },
      {
        id: 'TA0008',
        tactic: 'Lateral Movement',
        techniques: ['T1021.002 · SMB/Admin Shares', 'T1047 · WMI Exec'],
        focus: 'Seguimiento de saltos RDP/SMB entre estaciones y servidores críticos mediante autenticación NTLM/Kerberos atípica.',
        telemetry: 'Security 4624 (Tipo 3/10) / Zeek'
      },
      {
        id: 'TA0011',
        tactic: 'Command & Control',
        techniques: ['T1071.001 · Web Protocols', 'T1573 · Encrypted Channel'],
        focus: 'Análisis estadístico de jitter/beaconing periódico hacia dominios recién registrados o IPs de infraestructura efímera.',
        telemetry: 'Sysmon EID 3 / Proxy & DNS Logs'
      }
    ],
    detections: [
      {
        id: 'sigma',
        label: 'Sigma Rule (YAML)',
        title: 'Suspicious Encoded PowerShell & Rundll32 Proxy Execution',
        mitre: 'T1059.001 / T1218.011',
        code: `title: Suspicious Encoded PowerShell Spawning Proxy Execution
id: 7f8e9a12-4c3b-4d1a-9f55-08b2c4e19021
status: production
level: high
author: Javier Alonso Sanchez
description: Detecta ejecucion de PowerShell ofuscado seguida de carga proxy con rundll32 desde rutas temporales.
logsource:
  category: process_creation
  product: windows
detection:
  selection_ps:
    Image|endswith:
      - '\\powershell.exe'
      - '\\pwsh.exe'
    CommandLine|contains:
      - ' -enc '
      - ' -EncodedCommand '
      - 'FromBase64String'
  selection_proxy:
    ParentImage|endswith: '\\powershell.exe'
    Image|endswith: '\\rundll32.exe'
    CommandLine|contains:
      - 'C:\\ProgramData\\'
      - 'AppData\\Local\\Temp\\'
  condition: selection_ps or selection_proxy
falsepositives:
  - Scripts administrativos firmados de despliegue SCCM/Intune
tags:
  - attack.execution
  - attack.t1059.001
  - attack.defense_evasion
  - attack.t1218.011`
      },
      {
        id: 'kql',
        label: 'Chronicle / KQL Hunt',
        title: 'Threat Hunting Query — Beaconing & Process Injection',
        mitre: 'T1055 / T1071.001',
        code: `// Threat Hunt: Correlacion de inyeccion en svchost.exe + beaconing C2 saliente
let InjectedProcesses = DeviceEvents
| where Timestamp > ago(24h)
| where ActionType in ("CreateRemoteThreadApiCall", "NtAllocateVirtualMemoryApiCall")
| where FileName =~ "svchost.exe"
| project InjectionTime = Timestamp, DeviceName, InitiatingProcessFileName,
          InitiatingProcessCommandLine, TargetProcessId = ProcessId;
DeviceNetworkEvents
| where Timestamp > ago(24h)
| where InitiatingProcessFileName =~ "svchost.exe"
| where RemoteIPType == "Public" and RemotePort in (443, 8443, 8080)
| join kind=inner (InjectedProcesses) on DeviceName
| where Timestamp between (InjectionTime .. (InjectionTime + 15m))
| summarize BeaconCount = count(),
            FirstSeen = min(Timestamp),
            LastSeen = max(Timestamp),
            AvgDeltaSec = avg(datetime_diff('second', Timestamp, prev(Timestamp)))
  by DeviceName, RemoteIP, RemotePort, InitiatingProcessCommandLine
| where BeaconCount >= 10
| sort by BeaconCount desc`
      },
      {
        id: 'soar',
        label: 'SOAR Playbook (JSON)',
        title: 'Automated Containment & IOC Enrichment Workflow',
        mitre: 'D3-IAA / Respond',
        code: `{
  "playbook": "SOC-L3-APT-Containment-v2",
  "trigger": {
    "source": "Google SecOps / FortiSIEM",
    "severity": ["HIGH", "CRITICAL"],
    "rule_tags": ["T1059.001", "T1055"]
  },
  "steps": [
    {
      "id": "01_enrich_ioc",
      "action": "virustotal_ip_domain_lookup",
      "targets": ["{{alert.remote_ip}}", "{{alert.sha256}}"],
      "threshold_malicious": 5
    },
    {
      "id": "02_edr_triage",
      "action": "crowdstrike_rtr_process_tree",
      "host": "{{alert.hostname}}",
      "collect": ["memory_strings", "network_sockets"]
    },
    {
      "id": "03_host_isolation",
      "condition": "enrich_ioc.malicious >= 5 && edr_triage.injected == true",
      "action": "edr_network_contain",
      "host": "{{alert.hostname}}"
    },
    {
      "id": "04_case_management",
      "action": "thehive_create_case",
      "severity": 3,
      "tlp": "AMBER",
      "observables": ["{{alert.remote_ip}}", "{{alert.sha256}}", "{{alert.mutex}}"]
    }
  ]
}`
      }
    ]
  },

  terminalGame: {
    missionTitle: 'Operation BlueShield · SOC L3 Live Incident Simulator',
    incidentId: 'INC-2026-4092',
    affectedHost: 'WKSTN-FIN-04',
    maliciousFile: 'sync_agent.dll',
    c2Ip: '185.220.101.42',
    c2Domain: 'auth-telemetry-node[.]net',
    mutex: 'Global\\Nightfall_Mtx',
    phases: [
      {
        id: 'triage',
        step: '01',
        label: 'Triage',
        cmd: 'alerts',
        hint: 'Revisa la cola de alertas del SIEM con `alerts`.'
      },
      {
        id: 'edr',
        step: '02',
        label: 'EDR Forensics',
        cmd: 'edr WKSTN-FIN-04',
        hint: 'Inspecciona el árbol de procesos y memoria con `edr WKSTN-FIN-04`.'
      },
      {
        id: 'reversing',
        step: '03',
        label: 'Reversing',
        cmd: 'reversing sync_agent.dll',
        hint: 'Analiza el payload detectado ejecutando `reversing sync_agent.dll`.'
      },
      {
        id: 'hunt',
        step: '04',
        label: 'Threat Hunt',
        cmd: 'hunt 185.220.101.42',
        hint: 'Ejecuta threat hunting en el SIEM/ClickHouse con `hunt 185.220.101.42`.'
      },
      {
        id: 'contain',
        step: '05',
        label: 'Containment',
        cmd: 'contain WKSTN-FIN-04',
        hint: 'Ejecuta el playbook de aislamiento y bloqueo con `contain WKSTN-FIN-04`.'
      }
    ]
  }
};
