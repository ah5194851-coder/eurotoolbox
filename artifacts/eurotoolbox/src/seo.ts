import { SITE_URL, OG_IMAGE_URL } from './site-config';
import { tools } from './App';
import { toolSeo } from './data/seo';

export type PageSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  type: 'website' | 'article';
  noindex?: boolean;
};

export const HOME_SEO: PageSeo = {
  title: 'EuroToolBox: Free Online Tools, No Sign-Up, Files Stay Private',
  description: 'Free everyday tools for text, numbers, PDFs, files and time. No accounts, no uploads: your files are processed in your browser and stay on your device.',
  canonicalPath: '/',
  type: 'website',
};

const CATEGORY_COPY: Record<string, { name: string; description: string }> = {
  text: { name: 'Text tools', description: 'Free browser tools for counting, cleaning and transforming text without uploading your content.' },
  numbers: { name: 'Number tools', description: 'Straightforward browser calculators for percentages, discounts, BMI, loans, VAT and age.' },
  files: { name: 'File tools', description: 'Local image and file utilities for resizing, converting, cropping and preparing downloads.' },
  pdf: { name: 'PDF tools', description: 'Private browser-based PDF tools for extracting, combining, splitting, compressing and rendering documents.' },
  time: { name: 'Time tools', description: 'Simple date and time utilities for dates, time zones and everyday planning.' },
  everyday: { name: 'Everyday tools', description: 'Useful everyday converters for measurements, time zones and currency reference checks.' },
  work: { name: 'Work tools', description: 'Practical browser tools for CVs, cover letters and salary estimates.' },
};

export const categorySlugs = Object.keys(CATEGORY_COPY);

export function categoryPath(category: string) {
  return `/category/${category.toLowerCase()}`;
}

export function getCategorySeo(slug: string): PageSeo | undefined {
  const copy = CATEGORY_COPY[slug];
  if (!copy) return undefined;
  return {
    title: `${copy.name} – Free Online Tools | EuroToolBox`,
    description: copy.description,
    canonicalPath: `/category/${slug}`,
    type: 'website',
  };
}

export function getToolPath(slug: string) {
  return `/tools/${slug}`;
}

export function getPageSeo(path: string): PageSeo {
  const cleanPath = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (cleanPath === '/') return HOME_SEO;
  if (cleanPath === '/privacy') {
    return {
      title: 'Privacy – Your Files Stay in Your Browser | EuroToolBox',
      description: 'Read how EuroToolBox keeps browser-processed text, files and personal details on your device by default.',
      canonicalPath: '/privacy',
      type: 'article',
    };
  }
  const category = cleanPath.match(/^\/category\/([^/]+)$/)?.[1];
  if (category) return getCategorySeo(category) ?? notFoundSeo(cleanPath);
  const slug = cleanPath.match(/^(?:\/tools|)\/([^/]+)$/)?.[1];
  if (slug && toolSeo[slug]) {
    return { ...toolSeo[slug], canonicalPath: getToolPath(slug), type: 'website' };
  }
  return notFoundSeo(cleanPath);
}

export function notFoundSeo(path = '/404'): PageSeo {
  return {
    title: 'Page not found | EuroToolBox',
    description: 'The EuroToolBox page you requested could not be found.',
    canonicalPath: path,
    type: 'website',
    noindex: true,
  };
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function getJsonLd(path: string): unknown[] {
  const page = getPageSeo(path);
  const cleanPath = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const base = { '@context': 'https://schema.org', url: absoluteUrl(page.canonicalPath) };
  if (cleanPath === '/') {
    return [{
      ...base,
      '@type': 'WebSite',
      name: 'EuroToolBox',
      description: page.description,
      potentialAction: undefined,
    }];
  }
  const slug = cleanPath.match(/^(?:\/tools|)\/([^/]+)$/)?.[1];
  if (slug && toolSeo[slug]) {
    const tool = tools.find(item => item.slug === slug);
    const seo = toolSeo[slug];
    return [
      {
        ...base,
        '@type': 'WebApplication',
        name: tool?.name ?? slug,
        description: seo.description,
        url: absoluteUrl(getToolPath(slug)),
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      },
      {
        ...base,
        '@type': 'FAQPage',
        mainEntity: seo.faq.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
      {
        ...base,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EuroToolBox', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: tool?.category ?? 'Tools', item: absoluteUrl(`/category/${tool?.category.toLowerCase() ?? 'tools'}`) },
          { '@type': 'ListItem', position: 3, name: tool?.name ?? slug, item: absoluteUrl(getToolPath(slug)) },
        ],
      },
    ];
  }
  return [{ ...base, '@type': page.type === 'article' ? 'Article' : 'CollectionPage', name: page.title, description: page.description }];
}

export function renderHead(path: string) {
  const page = getPageSeo(path);
  const canonical = absoluteUrl(page.canonicalPath);
  const robots = page.noindex ? 'noindex, follow' : 'index, follow';
  const jsonScripts = getJsonLd(path).map(value => `<script type="application/ld+json">${jsonLd(value)}</script>`).join('');
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE_URL}" />`,
    '<meta property="og:site_name" content="EuroToolBox" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`,
    jsonScripts,
  ].join('\n    ');
}

export function updateDocumentHead(path: string) {
  if (typeof document === 'undefined') return;
  const page = getPageSeo(path);
  document.title = page.title;
  const canonical = absoluteUrl(page.canonicalPath);
  const tags: Record<string, string> = {
    'meta[name="description"]': page.description,
    'meta[name="robots"]': page.noindex ? 'noindex, follow' : 'index, follow',
    'meta[property="og:title"]': page.title,
    'meta[property="og:description"]': page.description,
    'meta[property="og:type"]': page.type,
    'meta[property="og:url"]': canonical,
    'meta[property="og:image"]': OG_IMAGE_URL,
    'meta[name="twitter:title"]': page.title,
    'meta[name="twitter:description"]': page.description,
    'meta[name="twitter:image"]': OG_IMAGE_URL,
  };
  Object.entries(tags).forEach(([selector, content]) => {
    const attribute = selector.includes('property=') ? 'property' : 'name';
    const value = selector.match(/["']([^"']+)["']/)?.[1];
    if (!value) return;
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, value);
      document.head.appendChild(element);
    }
    element.content = content;
  });
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonical;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);
}