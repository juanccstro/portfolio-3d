// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface ResumeLink {
    label: string;
    url: string;
    type: 'primary' | 'secondary';
}

export interface ResumeAbout {
    name: string;
    role: string;
    bio: string;
    facts: string[];
    links: ResumeLink[];
}

export interface ResumeProject {
    name: string;
    desc: string;
    tech: string[];
    url?: string;
}

export interface ResumeSkills {
    frontend: string[];
    backend: string[];
    tools: string[];
}

export interface ResumeContact {
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    location: string;
    available: boolean;
}

export interface ResumeData {
    about: ResumeAbout;
    projects: ResumeProject[];
    skills: ResumeSkills;
    contact: ResumeContact;
}

// ─── Datos ─────────────────────────────────────────────────────────────────────
// Edita este archivo para actualizar el contenido de tu portfolio.
// La escena 3D lee de esta misma fuente, por lo que los cambios aquí actualizan tanto
// las etiquetas de la habitación interactiva como las páginas HTML de respaldo para SEO.

export const resume: ResumeData = {
    about: {
        name: 'Juan Carlos Castro',
        role: 'Desarrollador Web Junior | Estudiante de IA & Big Data',
        bio: 'Desarrollador Web (DAW) con enfoque en frontend y diseño de interfaces dinámicas. Actualmente cursando el Máster en Inteligencia Artificial y Big Data. Busco combinar desarrollo web, UX/UI e IA para crear soluciones optimizadas y funcionales.',
        facts: ['Enfoque Frontend y UX/UI', 'Máster en IA & Big Data', 'Desarrollo de Plugins (WP)', 'Resolución de problemas'],
        links: [
            { label: 'GitHub', url: 'https://github.com/juanccstro', type: 'primary' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/juanc-castro/', type: 'secondary' },
            { label: 'Portfolio Secundario', url: 'https://portfolio-juanccastro.zeabur.app', type: 'secondary' }
        ]
    },

   projects: [
    {
        name: 'CourtConnect',
        desc: 'Plataforma web orientada a la conexión y gestión de eventos deportivos de baloncesto. Desarrollada durante mi formación como técnico superior de DAW.',
        tech: ['PHP', 'Docker', 'JavaScript', 'CSS'], 
        url: 'https://github.com/juanccstro/courtconnect'
    },
    {
        name: 'PHP Marvel',
        desc: 'Aplicación web sencilla que consume la API oficial de Marvel para mostrar información interactiva sobre la próxima película que se estrena en cines.',
        tech: ['PHP', 'HTML', 'CSS', 'REST API'],
        url: 'https://github.com/juanccstro/php-marvel'
    },
    {
        name: 'CF Guillarei',
        desc: 'Página web dinámica del CF Guillarei. Incluye información promocional sobre el club y un catálogo de sus productos.',
        tech: ['HTML', 'CSS', 'JavaScript'], 
        url: 'https://web-guillarei.vercel.app/'
    }
],

    skills: {
    frontend: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    backend:  ["PHP", "MySQL", "APIs REST (base)", "Python"],
    tools:    ["Git & GitHub", "WordPress", "Docker", "PhpStorm"],
  	},

    contact: {
        email: 'castro.pazo.jc@gmail.com',
        github: 'github.com/juanccstro',
        linkedin: 'linkedin.com/in/juanc-castro',
        location: 'Vigo, Pontevedra, España',
        available: true
    }
};