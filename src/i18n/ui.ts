export const showDefaultLang = false;


export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.id':'about',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.works': 'Selected Work',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'hero.title': 'Developer dedicated to pixel-perfect UI & smooth digital experiences.',
    'hero.cta':`Let's talk`,
    'about.title': 'About me',
    'about.first-description': `With 5+ years of experience, I’ve contributed to fast-moving startups and
      large-scale platforms. My sweet spot is modern frontend development
      (React, Astro, TypeScript), but I’m just as comfortable in the backend
      when needed.`,
    'about.first-small-description':`Designers love me because I care about details. PMs trust me because I
      hit deadlines. Engineers appreciate me because my pull requests don’t
      break things`, 
    'about.first-small-description-thinking':'well, usually'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Mi',
    'nav.works': 'Trabajos',
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'hero.title': 'Desarrollador enfocado en interfaces pixel-perfect y experiencias digitales fluidas.',
    'hero.cta':`Hablemos`,
    'about.title': 'Sobre mi',
    'about.first-description': `Con más de 5 años de experiencia, he contribuido en startups de rápido crecimiento y plataformas a gran escala. Mi especialidad es el desarrollo frontend moderno (React, Astro, TypeScript), aunque también me siento cómodo trabajando en el backend cuando es necesario.`,
    'about.first-small-description': 'A los diseñadores les agrada trabajar conmigo porque cuido los detalles. Los PMs confían en mí porque cumplo con los plazos. Los ingenieros me aprecian porque mis pull requests no rompen nada',
    'about.first-small-description-thinking': 'bueno… casi siempre'
  },
} as const;



export const routes = {
  en: {
    'services': 'leistungen',
  },
  es: {
    'services': 'prestations-de-service',
  },
}