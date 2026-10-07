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
      'Aplicación potenciada con IA que realiza VOC (voice of costumer) a partir reseñas de YouTube de cualquier producto o servicio, originalmente creador para el InnLab del TREC de GM',
    image: '/images/voc-social-media.jpg',
    technologies: ['Python', 'LLM', 'NextJs', 'Ollama', 'React', 'Flask', 'API Integration'],
    githubUrl: 'https://github.com/Willyb0t/voc_from_social_media',
    //liveUrl: 'https://voc-social-media.willyb0t.dev',
    featured: false,
  },
  {
    id: 'qkd-simulation',
    title: 'Quantum Key Distribution Simulation',
    description:
      'Simulación de mecánica cuántica que demuestra los principios de los protocolos de distribución cuántica de claves (QKD), incluidos BB84 y E91, con analisis de metricas de estados cuánticos, entrelazamiento y generación segura de claves.',
    image: '/images/qkd-simulation.jpg',
    technologies: ['Python', 'Quantum Computing Concepts'],
    githubUrl: 'https://github.com/Willyb0t/qkd_simulation',
    //liveUrl: 'https://qkd-simulation.willyb0t.dev',
    featured: false,
  },
  {
    id: 'telegraph-trough-internet',
    title: 'Telegraph simulator Over Internet',
    description:
      'Implementación moderna de protocolos de comunicación telegráfica adaptados a la transmisión por internet, que combina métodos históricos de comunicación con tecnología de redes contemporánea para crear un sistema de mensajería resiliente de bajo ancho de banda.',
    image: '/images/telegraph-internet.jpg',
    technologies: ['C', 'Socket.io', 'Sockets', 'Serial Communication', 'TCP/IP Protocols', 'Comunicacion remota'],
    githubUrl: 'https://github.com/Willyb0t/telegraph_trough_internet',
    //liveUrl: 'https://telegraph-internet.willyb0t.dev',
    featured: false,
  },
  {
    id: 'lora-tracker',
    title: 'LoRaWAN Asset Tracking System',
    description:
      'Sistema de rastreo de activos inalámbrico de largo alcance y bajo consumo que utiliza tecnología LoRaWAN para monitorear activos en entornos remotos o difíciles, con seguimiento de ubicación en tiempo real, y operación energéticamente eficiente.',
    image: '/images/lora-tracker.jpg',
    technologies: ['C/C++', 'Python', 'LoRaWAN', 'DJango', 'MQTT', 'ReactJs', 'Arduino', 'ESP32'],
    githubUrl: 'https://github.com/Willyb0t/LORA-tracker',
    //liveUrl: 'https://lora-tracker.willyb0t.dev',
    featured: false,
  },
  {
    id: 'elt-sap-b1-pipeline',
    title: 'ELT Pipeline for SAP B1 Data',
    description:
      'Pipeline ELT (Extract, Load, Transform) de nivel empresarial que extrae datos de SAP Business One, los procesa con dbt y los carga en un almacén de datos PostgreSQL para su visualización en Power BI, habilitando inteligencia de negocio integral. No se ecuentra disponible debido a que es un proyecto privado para una empresa.',
    image: '/images/elt-sap-b1.jpg',
    technologies: ['Python', 'Apache Airflow', 'dbt', 'PostgreSQL', 'Power BI', 'SAP B1', 'Docker', 'SQLServer'],
    //githubUrl: 'https://github.com/Willyb0t/elt-sap-b1-pipeline',
    //liveUrl: 'https://elt-sap-b1.willyb0t.dev',
    featured: false,
  },
  {
    id: 'data-science-project',
    title: 'Predicción de baja de alumnos en el Tec de Monterrey usando Machine Learning',
    description:
      'Como parte de una colaboración con el Tec de Monterrey, se usaron datos de esta institucion para entrenar algunos modelos de IA para predecir la baja de los alumnos, y obviamente comparar las metricas, proyecto en el cual fui el lider de mi equipo. Trabajo supervisado por investigadoras del Tec de Monterrey y de la UAEMex',
    image: '/images/elt-sap-b1.jpg',
    technologies: ['Python', 'Scikit-learn','Numpy','Pandas','MatPlotLib'],
    githubUrl: 'https://github.com/Willyb0t/student_dropout_DS',
    //liveUrl: 'https://elt-sap-b1.willyb0t.dev',
    featured: false,
  },
  {
    id: 'Simple-RFID-access-IoT-system',
    title: 'Sistema de acceso RFID IoT usando AWS',
    description:
      'Desarrolle un sistema IoT simple pero funcional de acceso basado en RFID que funciona sobre AWS usando un ESP32, hardware RFID, nodejs, AWS y SUPABASE, ademas automaticamente genera metricas para su futuro analisis, y un dashboard web funcional en escritorio y dispositivos moviles.',
    image: '/images/elt-sap-b1.jpg',
    technologies: ['NodeJs','ESP32','AWS','SUPABASE','Nextjs','RFID'],
    githubUrl: 'https://github.com/Willyb0t/gym_access_RFID',
    //liveUrl: 'https://elt-sap-b1.willyb0t.dev',
    featured: false,
  },
  {
    id: 'Thesis project',
    title: 'Modelado y caracterización de la dispersion de contaminantes en la ZMVT mediante aprendizaje automatico y su impacto en areas habitacionales',
    description:
      'Como parte de mi tesis de licenciatura, estoy desarrollando un modelo de aprendizaje automatico que permita caracterizar y modelar la dispersion de contaminantes en la zona metropolitana del valle de Toluca, y su impacto en areas habitacionales, usando datos historicos y actuales de contaminacion, meteorologia y geografia. Por el momento el codigo no se encuentra disponible al publico y sera liberado en cuanto el trabajo este completo y publicado. El trabajo esta siendo supervisado por dos investigadores de la UAEMex, una de estos es SNII nivel 2. Hasta ahora se ha desarrollado una U-Net para segmentacion de plumas de humo, adicional se ha desarrollado tambien una attention-U-net para mejorar la segmentacion de plumas de humo, siendo los proximos pasos a realizar las series temporales con LSTM y la caracterizacion de contaminantes usando AERMOD/HISPLYT.',
    image: '/images/elt-sap-b1.jpg',
    technologies: ['Python','Scikit-learn','Numpy','Pandas','MatPlotLib','Tensorflow'],
    githubUrl: 'not public yet',
    //liveUrl: 'https://elt-sap-b1.willyb0t.dev',
    featured: false,
  }
];
