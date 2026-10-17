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
    }
  ]
};
