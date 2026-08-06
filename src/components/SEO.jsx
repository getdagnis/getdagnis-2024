import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import PROJECTS from '../constants/projects.json';

export const SITE_URL = 'https://getdagnis.vercel.app';
export const SITE_TITLE = 'DAGNIS → SKURBE';
const DEFAULT_DESCRIPTION =
  'Dagnis Skurbe is a Latvian creative professional, product engineer, designer, founder and visual identity creator. Explore his work, projects, skills and CV.';
const SOCIAL_PROFILES = [
  'https://github.com/getdagnis',
  'https://linkedin.com/in/getdagnis',
  'https://x.com/getdagnis',
  'https://bsky.app/profile/dagnis.bsky.social',
  'https://www.behance.net/dagnis',
];

const PAGE_METADATA = {
  '/': {
    description: DEFAULT_DESCRIPTION,
    type: 'WebSite',
  },
  '/about': {
    description:
      'About Dagnis Skurbe: a Latvian product engineer, designer, creative director, founder and creator of Mission to Mars 2049 and Satori.lv.',
    type: 'ProfilePage',
  },
  '/design': {
    description:
      'Selected design, branding and visual identity projects by Dagnis Skurbe, including sports brands, startups, cultural projects and products.',
    type: 'CollectionPage',
  },
  '/skills/dev': {
    description:
      'Development skills and experience of Dagnis Skurbe, covering React, Next.js, TypeScript, Node.js, APIs, frontend architecture and product engineering.',
    type: 'ProfilePage',
  },
  '/skills/design': {
    description:
      'Design skills of Dagnis Skurbe, covering UX, product design, branding, graphic design, typography, creative direction and visual identity.',
    type: 'ProfilePage',
  },
  '/cv': {
    description:
      'Curriculum vitae of Dagnis Skurbe: technical product engineer, full-stack React and Next.js developer, UX designer and former creative director in Riga, Latvia.',
    type: 'ProfilePage',
  },
  '/contact': {
    description: 'Contact Dagnis Skurbe about product engineering, web development, UX, branding and design work.',
    type: 'ContactPage',
  },
};

function getPageMetadata(pathname) {
  const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  if (PAGE_METADATA[normalizedPathname]) return PAGE_METADATA[normalizedPathname];

  const projectKey = normalizedPathname.match(/^\/design\/project\/([^/]+)$/)?.[1];
  const project = PROJECTS.find((item) => item.key === projectKey);

  if (project) {
    return {
      description: `${project.name}: ${project.work}. A design and branding project by Dagnis Skurbe.`,
      type: 'CreativeWork',
    };
  }

  return { description: DEFAULT_DESCRIPTION, type: 'WebPage' };
}

function setMeta(name, content, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function buildStructuredData(pathname, metadata, canonicalUrl) {
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/about#dagnis-skurbe`,
    name: 'Dagnis Skurbe',
    givenName: 'Dagnis',
    familyName: 'Skurbe',
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/logo512.png`,
    jobTitle: 'Technical Product Engineer, Designer and Creative Director',
    description: DEFAULT_DESCRIPTION,
    sameAs: SOCIAL_PROFILES,
    homeLocation: {
      '@type': 'Place',
      name: 'Riga, Latvia',
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    publisher: { '@id': person['@id'] },
  };

  const page = {
    '@type': metadata.type,
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: SITE_TITLE,
    description: metadata.description,
    isPartOf: { '@id': website['@id'] },
    about: { '@id': person['@id'] },
  };

  if (metadata.type === 'ProfilePage') {
    page.mainEntity = { '@id': person['@id'] };
  }

  if (pathname.startsWith('/design/project/')) {
    page.mainEntity = { '@type': 'CreativeWork', creator: { '@id': person['@id'] } };
  }

  return { '@context': 'https://schema.org', '@graph': [person, website, page] };
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(pathname);
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;

    // Keep the site's deliberately designed browser title unchanged.
    document.title = SITE_TITLE;
    setMeta('description', metadata.description);
    setMeta('author', 'Dagnis Skurbe');
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('og:title', SITE_TITLE, 'property');
    setMeta('og:description', metadata.description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:image', `${SITE_URL}/logo512.png`, 'property');
    setMeta('og:site_name', SITE_TITLE, 'property');
    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:title', SITE_TITLE, 'name');
    setMeta('twitter:description', metadata.description, 'name');
    setMeta('twitter:image', `${SITE_URL}/logo512.png`, 'name');
    setLink('canonical', canonicalUrl);

    let structuredData = document.head.querySelector('#site-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'site-structured-data';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(buildStructuredData(pathname, metadata, canonicalUrl));
  }, [pathname]);

  return null;
}
