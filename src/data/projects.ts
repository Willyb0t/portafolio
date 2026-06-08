export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // URL or path
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'voc-from-social-media',
    title: 'VOC Analysis from Social Media',
    description: 'A natural language processing system that analyzes volatile organic compound (VOC) emissions data extracted from social media posts to identify environmental trends and pollution sources in real-time.',
    image: '/images/voc-social-media.jpg',
    technologies: ['Python', 'NLTK', 'Pandas', 'Scikit-learn', 'React', 'Chart.js', 'API Integration'],
    githubUrl: 'https://github.com/Willyb0t/voc_from_social_media',
    liveUrl: 'https://voc-social-media.willyb0t.dev',
    featured: true,
  },
  {
    id: 'qkd-simulation',
    title: 'Quantum Key Distribution Simulation',
    description: 'An interactive quantum mechanics simulation that demonstrates the principles of Quantum Key Distribution (QKD) protocols including BB84 and E91, with visualizations of quantum states, entanglement, and secure key generation.',
    image: '/images/qkd-simulation.jpg',
    technologies: ['React', 'Three.js', 'TypeScript', 'CSS3', 'WebGL', 'Quantum Computing Concepts'],
    githubUrl: 'https://github.com/Willyb0t/qkd_simulation',
    liveUrl: 'https://qkd-simulation.willyb0t.dev',
    featured: true,
  },
  {
    id: 'telegraph-trough-internet',
    title: 'Telegraph Protocol Over Internet',
    description: 'A modern implementation of telegraph communication protocols adapted for internet transmission, combining historical communication methods with contemporary networking technology to create a resilient, low-bandwidth messaging system.',
    image: '/images/telegraph-internet.jpg',
    technologies: ['Node.js', 'Socket.io', 'Python', 'Serial Communication', 'TCP/IP Protocols', 'React'],
    githubUrl: 'https://github.com/Willyb0t/telegraph_trough_internet',
    liveUrl: 'https://telegraph-internet.willyb0t.dev',
    featured: false,
  },
  {
    id: 'lora-tracker',
    title: 'LoRaWAN Asset Tracking System',
    description: 'A long-range, low-power wireless tracking system using LoRaWAN technology for monitoring assets in remote or challenging environments, featuring real-time location tracking, geofencing, and energy-efficient operation.',
    image: '/images/lora-tracker.jpg',
    technologies: ['C/C++', 'Python', 'LoRaWAN', 'MQTT', 'PostgreSQL', 'React Native', 'AWS IoT'],
    githubUrl: 'https://github.com/Willyb0t/LORA-tracker',
    liveUrl: 'https://lora-tracker.willyb0t.dev',
    featured: true,
  },
  {
    id: 'elt-sap-b1-pipeline',
    title: 'ELT Pipeline for SAP B1 Data',
    description: 'An enterprise-grade ELT (Extract, Load, Transform) pipeline that extracts data from SAP Business One, processes it using dbt for transformation, and loads it into a PostgreSQL data warehouse for visualization in Power BI, enabling comprehensive business intelligence.',
    image: '/images/elt-sap-b1.jpg',
    technologies: ['Python', 'Apache Airflow', 'dbt', 'PostgreSQL', 'Power BI', 'SAP B1 API', 'Docker', 'SQL'],
    githubUrl: 'https://github.com/Willyb0t/elt-sap-b1-pipeline',
    liveUrl: 'https://elt-sap-b1.willyb0t.dev',
    featured: true,
  }
];