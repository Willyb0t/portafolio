// ─── Home ───────────────────────────────────────────────────────────────────

export const hero = { 
  name: 'Willyb0t',
  tagline: 'Entusiasta de la IA, ML, Fisica y Astronomia, ademas desarrollador Full Stack enfocado en el backend',
  subtitle: 'Construyendo soluciones basadas en IA y ML.',
  primaryCta: { label: 'Sobre mí', href: '/about' },
  secondaryCta: { label: 'Ver proyectos', href: '/portfolio' },
};

export const stats = [
  { value: '5+', label: 'Proyectos' },
  { value: '0.5', label: 'Años de experiencia' },
  { value: '10+', label: 'Tecnologías' },
];

export const features = [
  {
    title: 'Observatorio interactivo',
    description:
      'La experiencia responde a tu cursor: ondas en el campo de estrellas y cuerpos celestes en órbita .',
  },
  {
    title: 'Rendimiento optimizado',
    description:
      'Los efectos visuales se adaptan a las capacidades del dispositivo, garantizando interacciones fluidas sin sacrificar rendimiento ni accesibilidad.',
  },
 {
    title: 'Precisión científica',
    description:
      'Cada animación e interacción se basa en principios físicos reales, tal como trayectorias orbitales.',
  },
];

// ─── Sobre mí ───────────────────────────────────────────────────────────────

export const bio = {
  title: 'Sobre mí',
  paragraphs: [
    'Soy un graduado de ingenieria en computacion, a quien le apasiona bastante la física y la astronomia, así como la IA y el Machine Learning en busca de desarrollar su carrera profesional.',
    'Mi formación en ingenieria en computación me permitio adquirir la habilidad de resolver problemas complejos, y proporner soluciones tecnologicas modernas y escalables.',
    'También me gusta mucho la inteligencia de negocio y la analitica, ya que se pueden encontrar oportunidades de mejorar procesos y apoyar el negocio en una organizacion.',
  ],
};

export const aboutPageContent = {
  experienceTitle: 'Experiencia profesional',
  skillsTitle: 'Habilidades técnicas',
};

// ─── Experiencia ────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  summary: string;
  achievements?: string[];
  technologies?: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  {
    period: '01/2026 — 06/2026',
    role: 'Coordinador de TI',
    company: 'Duschy México',
    summary:
      'Me encargue de administrar los recursos de TI de la empresa, dar soporte tecnico y optimizar la analitica de datos en la empresa.',
    achievements: [
      'Me encargue de administrar la infraestructura de Microsoft 365 con la que cuenta la empresa.',
      'Proporcione soporte técnico a los usuarios y al hardware de la empresa.',
      'Propuse optimización en los costos de algunos serivicos de TI en los que esto era viable.',
      'Propuse, diseñe e implemente la optimización del analisis de datos en la empresa a traves de un Data Pipeline junto con Power BI, logrando que todo el proceso de analisis de datos de ventas se realizara un 50% más rápido.'
    ],
  }
];

export const experiencePageContent = {
  title: 'Experiencia',
  achievementsLabel: 'Logros clave:',
  technologiesLabel: 'Tecnologías:',
};

// ─── Educación ──────────────────────────────────────────────────────────────

export interface EducationEntry {
  period: string;
  degree: string;
  institution: string;
  coursework: string;
  thesis: string;
}

export const educationEntries: EducationEntry[] = [
  {
    period: '2021 — 2026',
    degree: 'Licenciatura en Ingenieria en Computación',
    institution: 'Universidad Autonoma del Estado de México',
    coursework:
      'Ciencia de datos, Ingenieria de Software, Inteligencia Artificial, Tecnologias Computacionales y Computing in Industry',
    thesis: 'Modelo de dispersion de contaminantes en la ZMVT mediante aprendizaje automatico y su impacto en areas habitacionales',
  },
];

export const educationPageContent = {
  title: 'Educación',
  courseworkLabel: 'Cursos relevantes:',
  thesisLabel: 'Tesis (en curso):',
};

// ─── Habilidades ────────────────────────────────────────────────────────────

export const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'CSS3', 'HTML5', 'JavaScript ES6+'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'APIs REST', 'SpringBoot', 'PostgreSQL', 'Docker', 'AWS', 'Java', 'Oracle Database'],
  },
  {
    title: 'IA y ML',
    skills: ['Scikit-learn', 'Ollama', 'PyTorch','Probabilidad y Estadistica', 'Aprendizaje Automatico'],
  },
];

export const skillsPageContent = {
  title: 'Habilidades técnicas',
  detailTitle: 'Tecnologías por proyecto',
  intro: 'Desglose de las tecnologías con las que he trabajado, según la experiencia en proyectos:',
  projectSingular: 'proyecto',
  projectPlural: 'proyectos',
};

// ─── Portafolio ─────────────────────────────────────────────────────────────

export const portfolioContent = {
  title: 'Portafolio',
  allFilter: 'Todos',
  featured: 'DESTACADO',
  github: 'GitHub',
  liveDemo: 'Demo en vivo',
};

// ─── Contacto ───────────────────────────────────────────────────────────────

export const contactContent = {
  title: 'Contacto',
  fields: {
    name: { label: 'Nombre', placeholder: 'Tu nombre' },
    email: { label: 'Correo electrónico', placeholder: 'tu.correo@ejemplo.com' },
    subject: { label: 'Asunto', placeholder: 'Asunto de tu mensaje' },
    message: { label: 'Mensaje', placeholder: 'Escribe tu mensaje aquí…' },
  },
  submit: 'Enviar mensaje',
  sending: 'Enviando…',
  success: '¡Mensaje enviado con éxito! Te responderé pronto.',
  error: 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.',
};
