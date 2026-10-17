/**
 * Base de datos inicial y lógica de gestión para la Sociedad de Debates
 * Permite persistencia local (localStorage) y gestión sin servidor complejo.
 */

const STORAGE_KEYS = {
  ARTICLES: 'ucen_debates_articles',
  MEMBERS: 'ucen_debates_members',
  MATERIALS: 'ucen_debates_materials',
  AUTH: 'ucen_debates_editor_authenticated'
};

// ==========================================
// DATOS POR DEFECTO
// ==========================================
const DEFAULT_ARTICLES = [
  {
    id: 'art-1',
    category: 'Doctrina & Debate Constitucional',
    title: 'Flexibilización del Secreto Bancario: Entre la persecución penal y las garantías de la vida privada',
    date: '14 de Octubre, 2026',
    readTime: '6 min',
    summary: 'Análisis crítico a la luz de los recientes torneos interuniversitarios sobre el equilibrio entre la eficacia investigativa estatal del crimen organizado y la protección constitucional de los datos sensibles y el patrimonio privado.',
    author: 'Jorge Legisos',
    authorRole: 'Consejero y Ayudante de Cátedra',
    authorLinkedin: 'https://www.linkedin.com/in/',
    isLead: true,
    content: `
      <p>El debate en torno a la apertura o flexibilización del secreto bancario ha dejado de ser una simple discusión técnica de derecho financiero para convertirse en uno de los nudos más sensibles del derecho público contemporáneo.</p>
      
      <blockquote>"No se trata únicamente de facilitar la persecución de delitos económicos complejos, sino de ponderar si el umbral de control jurisdiccional previo constituye una garantía esencial del Estado de Derecho o un obstáculo procesal dispensable."</blockquote>

      <p>En el marco de la reciente jornada de debates interfacultades de la Universidad Central frente a la Sociedad de Litigación de la USACH, se contrastaron los dos polos dogmáticos: por un lado, el deber de tutela estatal consagrado en el artículo 1° de la Constitución, que exige herramientas eficaces para desarticular el lavado de activos; por el otro, la inviolabilidad del hogar y de toda forma de comunicación privada (art. 19 N° 5 CPR).</p>

      <p>La dogmática constitucional moderna nos enseña que ningún derecho fundamental es absoluto, pero cualquier restricción debe satisfacer con rigor los subprincipios de idoneidad, necesidad y proporcionalidad en sentido estricto. La mera agilización administrativa no puede erigirse como fundamento suficiente para sortear el escrutinio de un juez de garantía.</p>

      <p>En conclusión, el fortalecimiento de las facultades de los órganos persecutores debe ir indefectiblemente de la mano de un estándar reforzado de debido proceso, trazabilidad algorítmica y responsabilidades funcionales estrictas ante eventuales filtraciones.</p>
    `
  },
  {
    id: 'art-2',
    category: 'Columna de Opinión',
    title: 'La litigación estratégica y el arte de la oratoria jurídica en las nuevas generaciones',
    date: '11 de Octubre, 2026',
    readTime: '4 min',
    summary: 'Cómo los torneos de debates universitarios forman abogados preparados para los tribunales del siglo XXI, integrando dialéctica y ética.',
    author: 'Antonia Vidal',
    authorRole: 'Consejera y Campeona Nacional de Debates',
    authorLinkedin: 'https://www.linkedin.com/in/',
    isLead: false,
    content: `
      <p>Tradicionalmente la enseñanza del derecho se enfocó en el aprendizaje memorístico de la norma positiva. No obstante, las reformas procesales orales —penal, laboral, de familia y las futuras reformas civiles— exigen una destreza discursiva muy superior.</p>
      <p>Participar activamente en la Sociedad de Debates permite comprender que la oratoria no es mero adorno retórico; es la capacidad de ordenar el pensamiento bajo presión, someter las premisas al principio de no contradicción y defender la dignidad humana ante cualquier estrado.</p>
    `
  },
  {
    id: 'art-3',
    category: 'Jurisprudencia Comentada',
    title: 'El principio de legalidad penal frente a nuevas tipologías delictivas en el ciberespacio',
    date: '08 de Octubre, 2026',
    readTime: '5 min',
    summary: 'Comentario dogmático sobre las exigencias del mandato de determinación y tipicidad frente a la evolución digital en los tribunales chilenos.',
    author: 'Martín Castro',
    authorRole: 'Consejero y Ayudante de Derecho Público',
    authorLinkedin: 'https://www.linkedin.com/in/',
    isLead: false,
    content: `
      <p>La celeridad con que evolucionan los delitos informáticos colisiona permanentemente con el mandato de lex certa. ¿Hasta qué punto la interpretación judicial puede colmar lagunas sin infringir la prohibición de analogía in malam partem?</p>
      <p>Analizamos las sentencias más recientes de las Cortes de Apelaciones y la necesidad de una actualización dogmática constante en las aulas universitarias.</p>
    `
  },
  {
    id: 'art-4',
    category: 'Debate & Sociedad',
    title: 'Homenaje al legado académico del Profesor Rodrigo Pica Flores',
    date: '02 de Octubre, 2026',
    readTime: '7 min',
    summary: 'Reflexión en torno a la visión del recordado Ministro del Tribunal Constitucional sobre la argumentación jurídica y la formación cívica.',
    author: 'Héctor Vargas Ferrer',
    authorRole: 'Coordinador Académico',
    authorLinkedin: 'https://www.linkedin.com/in/',
    isLead: false,
    content: `
      <p>Recordar al profesor Rodrigo Pica Flores es evocar su inagotable pasión por la enseñanza democrática del Derecho Constitucional y su amor por el debate respetuoso y riguroso.</p>
      <p>Desde sus años como destacado orador universitario hasta su investidura como ministro del Tribunal Constitucional, su impronta permanece viva en cada estudiante que se pone de pie en un podio a argumentar con convicción y lealtad intelectual.</p>
    `
  }
];

const DEFAULT_MEMBERS = [
  {
    id: 'mem-1',
    name: 'Jorge Legisos',
    role: 'Consejero',
    badge: 'Litigación & Penal',
    photo: 'assets/img/equipo/jorge-legisos.jpg',
    initials: 'JL',
    linkedin: 'https://www.linkedin.com/in/jorge-legisos',
    bio: [
      'Estudiante de 3° año de Derecho, Universidad Central de Chile.',
      'Especializado en Propiedad Intelectual por la Universidad del Desarrollo.',
      'Ayudante de Propiedad Industrial y Derecho Penal (UCEN).',
      'Mejor orador y subcampeón Torneo "Prof. Rodrigo Pica" (2026).'
    ]
  },
  {
    id: 'mem-2',
    name: 'Antonia Vidal',
    role: 'Consejera',
    badge: 'Campeona Oratoria',
    photo: 'assets/img/equipo/antonia-vidal.jpg',
    initials: 'AV',
    linkedin: 'https://www.linkedin.com/in/antonia-vidal',
    bio: [
      'Estudiante de 3° año de Derecho, Universidad Central de Chile.',
      'Campeona y mejor oradora del Torneo de debates jurídicos "Prof. Rodrigo Pica" (2026).',
      'Vasta experiencia en representación en torneos de debates y litigación en materias penales y éticas.'
    ]
  },
  {
    id: 'mem-3',
    name: 'Martín Castro',
    role: 'Consejero',
    badge: 'Derecho Público',
    photo: 'assets/img/equipo/martin-castro.jpg',
    initials: 'MC',
    linkedin: 'https://www.linkedin.com/in/martin-castro',
    bio: [
      'Estudiante de 3° año de Derecho, Universidad Central de Chile.',
      'Ayudante del departamento de Derecho Público (UCEN).',
      'Especializado en Derecho Internacional Público y Derecho Procesal.'
    ]
  },
  {
    id: 'mem-4',
    name: 'Camilo Gatica',
    role: 'Consejero',
    badge: 'Subcampeón 2026',
    photo: 'assets/img/equipo/camilo-gatica.jpg',
    initials: 'CG',
    linkedin: 'https://www.linkedin.com/in/camilo-gatica',
    bio: [
      'Estudiante de 2° año de Derecho, Universidad Central de Chile.',
      'Subcampeón del Torneo de debates jurídicos "Prof. Rodrigo Pica" (2026).'
    ]
  },
  {
    id: 'mem-5',
    name: 'Matías Gioia',
    role: 'Consejero',
    badge: 'Debatiente Titular',
    photo: 'assets/img/equipo/matias-gioia.jpg',
    initials: 'MG',
    linkedin: 'https://www.linkedin.com/in/matias-gioia',
    bio: [
      'Estudiante de 3° año de Derecho, Universidad Central de Chile.',
      'Integrante titular del representativo de debate interuniversitario.'
    ]
  },
  {
    id: 'mem-6',
    name: 'Álvaro Osorio',
    role: 'Asesor Externo',
    badge: 'Leiden University',
    photo: '',
    initials: 'ÁO',
    linkedin: 'https://www.linkedin.com/in/alvaro-osorio',
    bio: [
      'Estudiante de 3° año de Derecho, Universidad de Chile.',
      'Actualmente en Leiden University, Países Bajos.',
      'Mejor orador del Torneo de Litigación de la Asociación Chilena de Litigación (2024).'
    ]
  },
  {
    id: 'mem-7',
    name: 'Héctor Vargas Ferrer',
    role: 'Coordinador Académico',
    badge: 'Dirección Docente',
    photo: '',
    initials: 'HV',
    linkedin: 'https://www.linkedin.com/in/hector-vargas-ferrer',
    bio: [
      'Egresado de Derecho, Universidad Central de Chile.',
      'Licenciado en Filosofía, Universidad de Chile.',
      'Mediador Familiar y capacitador de equipos de argumentación.'
    ]
  }
];

const DEFAULT_MATERIALS = [
  {
    id: 'mat-1',
    category: 'Minuta de Debate',
    title: 'Minuta Dogmática: Flexibilización del Secreto Bancario',
    desc: 'Esquema de argumentos a favor y en contra, jurisprudencia del TC chileno y estándares internacionales del GAFI.',
    date: 'Octubre 2026',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 'mat-2',
    category: 'Mociones & Rúbricas',
    title: 'Compendio de Mociones Torneo Interfacultades 2026',
    desc: 'Listado oficial de mociones preparadas e improvisadas con tablas de evaluación de jueces y oratoria.',
    date: 'Septiembre 2026',
    fileType: 'DOCX',
    downloadUrl: '#'
  },
  {
    id: 'mat-3',
    category: 'Guía de Litigación',
    title: 'Manual de Retórica, Falacias Lógicas y Contra-interrogatorio',
    desc: 'Material de estudio para nuevos integrantes con técnicas de refutación cruzada y estructura de alegatos de clausura.',
    date: 'Agosto 2026',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 'mat-4',
    category: 'Reglamento',
    title: 'Estatuto de la Sociedad de Debates Prof. Rodrigo Pica F.',
    desc: 'Reglamento interno, deberes de los consejeros, código de honor en competencia y directrices de representación institucional.',
    date: 'Año 2026',
    fileType: 'PDF',
    downloadUrl: '#'
  }
];

// ==========================================
// HELPERS DE ACCESO A DATOS
// ==========================================
function getStoredData(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error('Error cargando localStorage:', e);
    return fallback;
  }
}

function setStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error guardando localStorage:', e);
  }
}

// Inicializar repositorios
window.DebatesDB = {
  getArticles: () => getStoredData(STORAGE_KEYS.ARTICLES, DEFAULT_ARTICLES),
  saveArticles: (articles) => setStoredData(STORAGE_KEYS.ARTICLES, articles),
  
  getMembers: () => getStoredData(STORAGE_KEYS.MEMBERS, DEFAULT_MEMBERS),
  saveMembers: (members) => setStoredData(STORAGE_KEYS.MEMBERS, members),
  
  getMaterials: () => getStoredData(STORAGE_KEYS.MATERIALS, DEFAULT_MATERIALS),
  saveMaterials: (materials) => setStoredData(STORAGE_KEYS.MATERIALS, materials),

  isEditorLoggedIn: () => localStorage.getItem(STORAGE_KEYS.AUTH) === 'true',
  setEditorLogin: (status) => localStorage.setItem(STORAGE_KEYS.AUTH, status ? 'true' : 'false'),

  // Función de reseteo a datos de fábrica
  resetToDefaults: () => {
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.MEMBERS);
    localStorage.removeItem(STORAGE_KEYS.MATERIALS);
    window.location.reload();
  }
};
