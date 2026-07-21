// ─── Home ───────────────────────────────────────────────────────────────────

export const hero = {
  name: 'Willyb0t',
  tagline: 'Entusiasta de la física y desarrollador full-stack',
  subtitle: 'Construyendo experiencias interactivas entre la ciencia y el código.',
  primaryCta: { label: 'Sobre mí', href: '/about' },
  secondaryCta: { label: 'Ver proyectos', href: '/portfolio' },
};

export const stats = [
  { value: '5+', label: 'Proyectos' },
  { value: '3', label: 'Años de experiencia' },
  { value: '10+', label: 'Tecnologías' },
  { value: '2', label: 'Publicaciones' },
];

export const features = [
  {
    title: 'Observatorio interactivo',
    description:
      'La experiencia responde a tu cursor: ondas en el campo de estrellas y cuerpos celestes en órbita que demuestran creatividad y profundidad técnica.',
  },
  {
    title: 'Rendimiento optimizado',
    description:
      'Los efectos visuales se adaptan a las capacidades del dispositivo, garantizando interacciones fluidas sin sacrificar rendimiento ni accesibilidad.',
  },
  {
    title: 'Precisión científica',
    description:
      'Cada animación e interacción se basa en principios físicos reales, desde trayectorias orbitales hasta dinámicas de partículas.',
  },
];

// ─── Sobre mí ───────────────────────────────────────────────────────────────

export const bio = {
  title: 'Sobre mí',
  paragraphs: [
    'Me apasiona la intersección entre la física y la tecnología: me especializo en crear experiencias interactivas que hacen accesibles y atractivos los conceptos complejos.',
    'Mi formación en física me da una perspectiva única para resolver problemas, combinando el pensamiento analítico con la intuición creativa en el desarrollo de software.',
    'Cuando no estoy programando, me encontrarás explorando fenómenos astronómicos, leyendo sobre mecánica cuántica o experimentando con nuevas formas de visualizar conceptos científicos.',
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
    period: '2023 — Actualidad',
    role: 'Desarrollador Frontend Senior',
    company: 'Tech Innovations Inc.',
    summary:
      'Lideré el desarrollo de una plataforma interactiva de visualización de datos utilizada por instituciones de investigación en todo el mundo.',
    achievements: [
      'Reduje los tiempos de carga un 65 % mediante división de código y carga diferida.',
      'Implementé funciones de colaboración en tiempo real con WebSockets.',
      'Mentoricé a 3 desarrolladores junior en buenas prácticas de React y TypeScript.',
    ],
  },
  {
    period: '2021 — 2023',
    role: 'Desarrollador Full-Stack',
    company: 'Science Labs LLC',
    summary:
      'Construí aplicaciones web para investigación científica, incluidas herramientas de simulación de partículas en tiempo real.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    period: '2019 — 2021',
    role: 'Desarrollador Junior',
    company: 'Web Solutions Agency',
    summary:
      'Desarrollé sitios y aplicaciones web responsivas para clientes de los sectores educativo y sin fines de lucro.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'WordPress'],
  },
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
    period: '2015 — 2019',
    degree: 'Licenciatura en Física',
    institution: 'Universidad de Ciencia y Tecnología',
    coursework:
      'Mecánica clásica, electromagnetismo, mecánica cuántica, termodinámica, física matemática, programación para científicos.',
    thesis: '«Aplicaciones de la computación cuántica en sistemas criptográficos»',
  },
  {
    period: '2019 — 2021',
    degree: 'Maestría en Ciencias de la Computación',
    institution: 'Universidad de Ciencia y Tecnología',
    coursework:
      'Algoritmos avanzados, aprendizaje automático, gráficos por computadora, interacción persona-computadora, ingeniería de software.',
    thesis: '«Técnicas interactivas de visualización para datos científicos complejos»',
  },
];

export const educationPageContent = {
  title: 'Educación',
  courseworkLabel: 'Cursos relevantes:',
  thesisLabel: 'Tesis:',
};

// ─── Habilidades ────────────────────────────────────────────────────────────

export const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'CSS3', 'HTML5', 'JavaScript ES6+'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'APIs REST', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
  },
  {
    title: 'Física y Matemáticas',
    skills: ['Mecánica clásica', 'Electromagnetismo', 'Mecánica cuántica', 'Termodinámica', 'Cálculo', 'Álgebra lineal', 'Ecuaciones diferenciales'],
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
