export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'voc-from-social-media',
    title: 'VOC Analysis from Social Media',
    description:
      'Sistema de procesamiento de lenguaje natural que analiza datos de emisiones de compuestos orgánicos volátiles (VOC) extraídos de publicaciones en redes sociales para identificar tendencias ambientales y fuentes de contaminación en tiempo real.',
    image: '/images/voc-social-media.jpg',
    technologies: ['Python', 'NLTK', 'Pandas', 'Scikit-learn', 'React', 'Chart.js', 'API Integration'],
    githubUrl: 'https://github.com/Willyb0t/voc_from_social_media',
    liveUrl: 'https://voc-social-media.willyb0t.dev',
    featured: true,
  },
  {
    id: 'qkd-simulation',
    title: 'Quantum Key Distribution Simulation',
    description:
      'Simulación interactiva de mecánica cuántica que demuestra los principios de los protocolos de distribución cuántica de claves (QKD), incluidos BB84 y E91, con visualizaciones de estados cuánticos, entrelazamiento y generación segura de claves.',
    image: '/images/qkd-simulation.jpg',
    technologies: ['React', 'Three.js', 'TypeScript', 'CSS3', 'WebGL', 'Quantum Computing Concepts'],
    githubUrl: 'https://github.com/Willyb0t/qkd_simulation',
    liveUrl: 'https://qkd-simulation.willyb0t.dev',
    featured: true,
  },
  {
    id: 'telegraph-trough-internet',
    title: 'Telegraph Protocol Over Internet',
    description:
      'Implementación moderna de protocolos de comunicación telegráfica adaptados a la transmisión por internet, que combina métodos históricos de comunicación con tecnología de redes contemporánea para crear un sistema de mensajería resiliente de bajo ancho de banda.',
    image: '/images/telegraph-internet.jpg',
    technologies: ['Node.js', 'Socket.io', 'Python', 'Serial Communication', 'TCP/IP Protocols', 'React'],
    githubUrl: 'https://github.com/Willyb0t/telegraph_trough_internet',
    liveUrl: 'https://telegraph-internet.willyb0t.dev',
    featured: false,
  },
  {
    id: 'lora-tracker',
    title: 'LoRaWAN Asset Tracking System',
    description:
      'Sistema de rastreo de activos inalámbrico de largo alcance y bajo consumo que utiliza tecnología LoRaWAN para monitorear activos en entornos remotos o difíciles, con seguimiento de ubicación en tiempo real, geocercas y operación energéticamente eficiente.',
    image: '/images/lora-tracker.jpg',
    technologies: ['C/C++', 'Python', 'LoRaWAN', 'MQTT', 'PostgreSQL', 'React Native', 'AWS IoT'],
    githubUrl: 'https://github.com/Willyb0t/LORA-tracker',
    liveUrl: 'https://lora-tracker.willyb0t.dev',
    featured: true,
  },
  {
    id: 'elt-sap-b1-pipeline',
    title: 'ELT Pipeline for SAP B1 Data',
    description:
      'Pipeline ELT (Extract, Load, Transform) de nivel empresarial que extrae datos de SAP Business One, los procesa con dbt y los carga en un almacén de datos PostgreSQL para su visualización en Power BI, habilitando inteligencia de negocio integral.',
    image: '/images/elt-sap-b1.jpg',
    technologies: ['Python', 'Apache Airflow', 'dbt', 'PostgreSQL', 'Power BI', 'SAP B1 API', 'Docker', 'SQL'],
    githubUrl: 'https://github.com/Willyb0t/elt-sap-b1-pipeline',
    liveUrl: 'https://elt-sap-b1.willyb0t.dev',
    featured: true,
  },
];
