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

export const BOOKS_SEO: PageSeo = {
  title: 'Books by Ali Hassan | EuroToolBox',
  description: "Practical beginner's guides on AI, cybersecurity, remote work, freelancing, productivity, personal finance and more, by the creator of EuroToolBox.",
  canonicalPath: '/books',
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
  if (cleanPath === '/books') return BOOKS_SEO;
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
