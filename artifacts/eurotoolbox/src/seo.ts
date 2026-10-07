import { SITE_URL, OG_IMAGE_URL, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, OG_IMAGE_ALT } from './site-config';
import { tools } from './App';
import { toolSeo } from './data/seo';
import { COUNTRY_VAT_PAGES } from './data/country-vat';
import { SALARY_LANDING_PAGES } from './data/salary-landing-data';

export type PageSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  type: 'website' | 'article';
  keywords?: string;
  noindex?: boolean;
};

export const HOME_SEO: PageSeo = {
  title: 'Free Online Tools – Calculators, PDF, Image & Text Tools | LoveEasyTool',
  description: 'Free online tools and calculators for PDF, image, text, and daily math. 100% free with no sign-up: all files process privately in your browser with zero uploads.',
  canonicalPath: '/',
  type: 'website',
  keywords: 'online tools, free online utilities, pdf tools, image compressor, calculators',
};

export const BOOKS_SEO: PageSeo = {
  title: 'Books by Ali Hassan | LoveEasyTool',
  description: 'Discover practical books and beginner guides by Ali Hassan on AI, cybersecurity, remote freelancing, personal finance, and high-performance productivity.',
  canonicalPath: '/books/',
  type: 'website',
  keywords: 'books by ali hassan, cybersecurity guide, ai guide, remote work, freelancing, productivity, personal finance, LoveEasyTool',
};

export const PRIVACY_SEO: PageSeo = {
  title: 'Privacy Policy: Zero-Upload Local Processing | LoveEasyTool',
  description: 'Read how LoveEasyTool protects your privacy with browser-side processing. Your files, documents, and data never leave your device or reach any server.',
  canonicalPath: '/privacy/',
  type: 'article',
  keywords: 'privacy policy, local processing, private tools, zero uploads, LoveEasyTool privacy',
};

export const ABOUT_SEO: PageSeo = {
  title: 'About Us | LoveEasyTool',
  description: 'Learn about LoveEasyTool, founded by Ali Hassan to deliver calm, free, private online tools with zero sign-up and browser-first client-side processing.',
  canonicalPath: '/about/',
  type: 'website',
  keywords: 'about loveeasytool, ali hassan, free online tools, client-side tools, private browser utilities, online tools, free online utilities, calculators',
};

export const CONTACT_SEO: PageSeo = {
  title: 'Contact Support & Feedback | LoveEasyTool',
  description: 'Contact the LoveEasyTool team for tool requests, feedback, bug reports, and book inquiries. We respond within 24 to 48 business hours.',
  canonicalPath: '/contact/',
  type: 'website',
  keywords: 'contact loveeasytool, tool suggestions, bug report, ali hassan support',
};

export const TERMS_SEO: PageSeo = {
  title: 'Terms of Service | LoveEasyTool',
  description: 'Read the terms of service for using LoveEasyTool free browser tools, including client-side data ownership and usage guidelines.',
  canonicalPath: '/terms/',
  type: 'article',
  keywords: 'terms of service, user agreement, free tool usage, LoveEasyTool terms',
};

const CATEGORY_COPY: Record<string, { name: string; description: string }> = {
  text: { name: 'Text Tools', description: 'Free online text tools to count words, change letter case, remove duplicate lines, and clean formatting. Private browser processing with zero uploads.' },
  numbers: { name: 'Number Tools', description: 'Free online calculators for percentages, discounts, BMI, loans, VAT, and age calculations. Get fast, accurate results directly in your own web browser.' },
  files: { name: 'File Tools', description: 'Free online file and image utilities to compress, resize, crop, and convert JPG, PNG, and WebP formats locally in your browser with complete user privacy.' },
  pdf: { name: 'PDF Tools', description: 'Free online PDF tools to merge, split, compress, extract text, and convert PDF documents in your browser. Fast, secure processing with zero file uploads.' },
  time: { name: 'Time Tools', description: 'Free online date and time utilities to calculate days between dates, add calendar days, and convert time zones accurately right inside your web browser.' },
  everyday: { name: 'Everyday Tools', description: 'Free online everyday conversion utilities for units, measurements, time zones, and currency reference rates. Fast, simple, and private browser utilities.' },
  work: { name: 'Work Tools', description: 'Free online career and work tools including a professional CV builder, cover letter generator, and salary calculator. Build documents without sign-up.' },
};

export const categorySlugs = Object.keys(CATEGORY_COPY);

export function categoryPath(category: string) {
  return `/category/${category.toLowerCase()}/`;
}

export function getCategorySeo(slug: string): PageSeo | undefined {
  const cleanSlug = slug.toLowerCase().replace(/^\/|\/$/g, '');
  const copy = CATEGORY_COPY[cleanSlug];
  if (!copy) return undefined;
  return {
    title: `${copy.name} - Free Online Utilities | LoveEasyTool`,
    description: copy.description,
    canonicalPath: `/category/${cleanSlug}/`,
    type: 'website',
    keywords: `${copy.name.toLowerCase()}, free online utilities, browser tools, LoveEasyTool`,
  };
}

export function getToolPath(slug: string) {
  const cleanSlug = slug.replace(/^\/|\/$/g, '');
  return `/tools/${cleanSlug}/`;
}

export function getPageSeo(path: string): PageSeo {
  const raw = path.split(/[?#]/)[0] || '/';
  const cleanPath = raw === '/' ? '/' : (raw.endsWith('/') ? raw : `${raw}/`);
  if (cleanPath === '/') return HOME_SEO;
  if (cleanPath === '/books/') return BOOKS_SEO;
  if (cleanPath === '/privacy/') return PRIVACY_SEO;
  if (cleanPath === '/about/') return ABOUT_SEO;
  if (cleanPath === '/contact/') return CONTACT_SEO;
  if (cleanPath === '/terms/') return TERMS_SEO;
  const countryVatSlug = cleanPath.replace(/^\/|\/$/g, '');
  if (COUNTRY_VAT_PAGES[countryVatSlug]) {
    const cData = COUNTRY_VAT_PAGES[countryVatSlug];
    return {
      title: cData.metaTitle,
      description: cData.metaDescription,
      canonicalPath: cData.canonicalPath,
      type: 'website',
      keywords: `${cData.countryName.toLowerCase()} vat calculator, ${cData.taxAbbr.toLowerCase()}, calculate vat, online vat tool, LoveEasyTool`,
    };
  }
  const salarySlug = cleanPath.replace(/^\/|\/$/g, '');
  if (SALARY_LANDING_PAGES[salarySlug]) {
    const sData = SALARY_LANDING_PAGES[salarySlug];
    return {
      title: sData.metaTitle,
      description: sData.metaDescription,
      canonicalPath: sData.canonicalPath,
      type: 'website',
      keywords: `${sData.h1.toLowerCase()}, salary calculator, gross to net, take home pay, wage converter, LoveEasyTool`,
    };
  }
  const category = cleanPath.match(/^\/category\/([^/]+)\/?$/)?.[1];
  if (category) return getCategorySeo(category) ?? notFoundSeo(cleanPath);
  const slug = cleanPath.match(/^(?:\/tools|)\/([^/]+)\/?$/)?.[1];
  if (slug && toolSeo[slug]) {
    return {
      ...toolSeo[slug],
      canonicalPath: getToolPath(slug),
      type: 'website',
      keywords: `${toolSeo[slug].title.split(':')[0].toLowerCase()}, free online tool, private tool, browser processing, LoveEasyTool`,
    };
  }
  return notFoundSeo(cleanPath);
}

export function notFoundSeo(path = '/404'): PageSeo {
  return {
    title: 'Page Not Found | LoveEasyTool',
    description: 'The requested LoveEasyTool page could not be found. Explore our free, private online tools for text, numbers, PDFs, and files directly in your browser.',
    canonicalPath: path.endsWith('/') ? path : `${path}/`,
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

export function getJsonLd(path: string): Record<string, unknown> {
  const page = getPageSeo(path);
  const cleanPath = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const canonical = absoluteUrl(page.canonicalPath);

  const organizationEntity = {
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: 'LoveEasyTool',
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo.png'),
    description: 'Free everyday tools for text, numbers, PDFs, files and time. Fast, private browser-based utilities.',
    email: 'support@loveeasytool.com',
    founder: {
      '@type': 'Person',
      name: 'Ali Hassan',
      url: absoluteUrl('/about/'),
    },
  };

  const webSiteEntity = {
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: 'LoveEasyTool',
    alternateName: ['Love Easy Tool', 'LoveEasyTool.com'],
    url: absoluteUrl('/'),
    description: HOME_SEO.description,
  };

  if (cleanPath === '/') {
    return {
      '@context': 'https://schema.org',
      '@graph': [webSiteEntity, organizationEntity],
    };
  }

  // 1. Tool pages
  const slug = cleanPath.match(/^(?:\/tools|)\/([^/]+)$/)?.[1];
  if (slug && toolSeo[slug]) {
    const tool = tools.find(item => item.slug === slug);
    const seo = toolSeo[slug];
    const toolName = slug === 'cv-builder' ? 'Free CV Builder' : (tool?.name ?? slug);
    const toolDescription = seo.description || seo.answerSummary || tool?.description;

    const graph: unknown[] = [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: toolDescription,
        inLanguage: 'en',
        isPartOf: {
          '@id': absoluteUrl('/#website'),
        },
        about: {
          '@type': 'Thing',
          name: toolName,
          description: toolDescription,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: tool?.category ? `${tool.category} Tools` : 'Tools', item: absoluteUrl(`/category/${tool?.category.toLowerCase() ?? 'tools'}/`) },
          { '@type': 'ListItem', position: 3, name: toolName, item: canonical },
        ],
      },
    ];

    if (seo.faq && seo.faq.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: seo.faq.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      });
    }

    graph.push(organizationEntity);
    return {
      '@context': 'https://schema.org',
      '@graph': graph,
    };
  }

  // Country-specific VAT calculator pages
  const countryVatSlug = cleanPath.replace(/^\/|\/$/g, '');
  if (COUNTRY_VAT_PAGES[countryVatSlug]) {
    const cData = COUNTRY_VAT_PAGES[countryVatSlug];
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: cData.metaTitle,
          description: cData.metaDescription,
          inLanguage: 'en',
          isPartOf: {
            '@id': absoluteUrl('/#website'),
          },
          about: {
            '@type': 'Thing',
            name: cData.h1,
            description: cData.metaDescription,
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Number Tools', item: absoluteUrl('/category/numbers/') },
            { '@type': 'ListItem', position: 3, name: 'VAT Calculator', item: absoluteUrl('/tools/vat-calculator/') },
            { '@type': 'ListItem', position: 4, name: cData.h1, item: canonical },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${canonical}#faq`,
          mainEntity: cData.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        organizationEntity,
      ],
    };
  }

  // Dedicated Salary Calculator landing pages
  const salarySlug = cleanPath.replace(/^\/|\/$/g, '');
  if (SALARY_LANDING_PAGES[salarySlug]) {
    const sData = SALARY_LANDING_PAGES[salarySlug];
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: sData.metaTitle,
          description: sData.metaDescription,
          inLanguage: 'en',
          isPartOf: {
            '@id': absoluteUrl('/#website'),
          },
          about: {
            '@type': 'Thing',
            name: sData.h1,
            description: sData.metaDescription,
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Work Tools', item: absoluteUrl('/category/work/') },
            { '@type': 'ListItem', position: 3, name: 'Salary Calculator', item: absoluteUrl('/tools/salary-calculator/') },
            { '@type': 'ListItem', position: 4, name: sData.h1, item: canonical },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${canonical}#faq`,
          mainEntity: sData.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        organizationEntity,
      ],
    };
  }

  // 2. Category pages
  const categoryMatch = cleanPath.match(/^\/category\/([^/]+)$/)?.[1];
  if (categoryMatch && CATEGORY_COPY[categoryMatch.toLowerCase()]) {
    const catKey = categoryMatch.toLowerCase();
    const copy = CATEGORY_COPY[catKey];
    const categoryTools = tools.filter(t => t.category.toLowerCase() === catKey);

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: page.title,
          description: page.description,
          inLanguage: 'en',
          isPartOf: {
            '@id': absoluteUrl('/#website'),
          },
          mainEntity: {
            '@type': 'ItemList',
            name: copy.name,
            numberOfItems: categoryTools.length,
            itemListElement: categoryTools.map((t, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: t.name,
              item: absoluteUrl(getToolPath(t.slug)),
            })),
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: copy.name, item: canonical },
          ],
        },
        organizationEntity,
      ],
    };
  }

  // 3. About page
  if (cleanPath === '/about') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: ABOUT_SEO.title,
          description: ABOUT_SEO.description,
          inLanguage: 'en',
          isPartOf: {
            '@id': absoluteUrl('/#website'),
          },
          mainEntity: {
            '@id': absoluteUrl('/#organization'),
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'About Us', item: canonical },
          ],
        },
        organizationEntity,
      ],
    };
  }

  // 4. Contact page
  if (cleanPath === '/contact') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: CONTACT_SEO.title,
          description: CONTACT_SEO.description,
          inLanguage: 'en',
          isPartOf: {
            '@id': absoluteUrl('/#website'),
          },
          mainEntity: {
            '@id': absoluteUrl('/#organization'),
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: canonical },
          ],
        },
        organizationEntity,
      ],
    };
  }

  // 5. Privacy page
  if (cleanPath === '/privacy') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          name: PRIVACY_SEO.title,
          description: PRIVACY_SEO.description,
          url: canonical,
          inLanguage: 'en',
          isPartOf: {
            '@id': absoluteUrl('/#website'),
          },
          about: {
            '@id': absoluteUrl('/#organization'),
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: canonical },
          ],
        },
        organizationEntity,
      ],
    };
  }

  // 6. Terms page
  if (cleanPath === '/terms') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          name: TERMS_SEO.title,
          description: TERMS_SEO.description,
          url: canonical,
          inLanguage: 'en',
          isPartOf: {
            '@id': absoluteUrl('/#website'),
          },
          about: {
            '@id': absoluteUrl('/#organization'),
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: canonical },
          ],
        },
        organizationEntity,
      ],
    };
  }

  // 7. Books page
  if (cleanPath === '/books') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: BOOKS_SEO.title,
          description: BOOKS_SEO.description,
          inLanguage: 'en',
          isPartOf: {
            '@id': absoluteUrl('/#website'),
          },
          author: {
            '@type': 'Person',
            name: 'Ali Hassan',
            url: absoluteUrl('/about/'),
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Books', item: canonical },
          ],
        },
        organizationEntity,
      ],
    };
  }

  // Fallback for 404 or other generic pages
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: 'en',
      },
      organizationEntity,
    ],
  };
}

export function renderHead(path: string) {
  const page = getPageSeo(path);
  const canonical = absoluteUrl(page.canonicalPath);
  const robots = page.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const jsonScript = `<script type="application/ld+json">${jsonLd(getJsonLd(path))}</script>`;
  const keywordsTag = page.keywords ? `<meta name="keywords" content="${escapeHtml(page.keywords)}" />` : '';
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    keywordsTag,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    '<meta name="theme-color" content="#1a365d" />',
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE_URL}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
    '<meta property="og:site_name" content="LoveEasyTool" />',
    '<meta property="og:locale" content="en_US" />',
    '<meta property="og:locale:alternate" content="en_GB" />',
    '<meta property="og:locale:alternate" content="en_CA" />',
    '<meta property="og:locale:alternate" content="en_AU" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:site" content="@LoveEasyTool" />',
    '<meta name="twitter:creator" content="@LoveEasyTool" />',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
    jsonScript,
  ].filter(Boolean).join('\n    ');
}

export function updateDocumentHead(path: string) {
  if (typeof document === 'undefined') return;
  const page = getPageSeo(path);
  document.title = page.title;
  const canonical = absoluteUrl(page.canonicalPath);
  const robots = page.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const tags: Record<string, string> = {
    'meta[name="description"]': page.description,
    'meta[name="keywords"]': page.keywords || HOME_SEO.keywords || 'online tools, free online utilities, LoveEasyTool',
    'meta[name="robots"]': robots,
    'meta[name="theme-color"]': '#1a365d',
    'meta[property="og:title"]': page.title,
    'meta[property="og:description"]': page.description,
    'meta[property="og:type"]': page.type,
    'meta[property="og:url"]': canonical,
    'meta[property="og:site_name"]': 'LoveEasyTool',
    'meta[property="og:locale"]': 'en_US',
    'meta[property="og:image"]': OG_IMAGE_URL,
    'meta[property="og:image:width"]': OG_IMAGE_WIDTH,
    'meta[property="og:image:height"]': OG_IMAGE_HEIGHT,
    'meta[property="og:image:alt"]': OG_IMAGE_ALT,
    'meta[name="twitter:card"]': 'summary_large_image',
    'meta[name="twitter:site"]': '@LoveEasyTool',
    'meta[name="twitter:creator"]': '@LoveEasyTool',
    'meta[name="twitter:title"]': page.title,
    'meta[name="twitter:description"]': page.description,
    'meta[name="twitter:image"]': OG_IMAGE_URL,
    'meta[name="twitter:image:alt"]': OG_IMAGE_ALT,
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

  // Sync structured data JSON-LD script in DOM
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach(node => node.remove());
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = jsonLd(getJsonLd(path));
  document.head.appendChild(script);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);
}
