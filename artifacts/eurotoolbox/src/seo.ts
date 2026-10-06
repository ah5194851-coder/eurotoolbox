import { SITE_URL, OG_IMAGE_URL, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, OG_IMAGE_ALT } from './site-config';
import { tools } from './App';
import { toolSeo } from './data/seo';

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
  keywords: 'free online tools, online tools, free tools online, useful online tools, free web tools, online calculators, pdf tools online, image compressor, text tools, free converters, private tools, no sign-up, LoveEasyTool',
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
  keywords: 'about loveeasytool, ali hassan, free online tools, client-side tools, private browser utilities, love tool factory, love tool ai, axe like tool, lovetools com ua, courtney love tool',
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

function getGoogleApplicationCategory(category?: string): string {
  switch ((category || '').toLowerCase()) {
    case 'text':
    case 'pdf':
      return 'ProductivityApplication';
    case 'work':
      return 'BusinessApplication';
    case 'files':
      return 'DesignApplication';
    case 'numbers':
    case 'time':
    case 'everyday':
    default:
      return 'UtilitiesApplication';
  }
}

export function getJsonLd(path: string): unknown[] {
  const page = getPageSeo(path);
  const cleanPath = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const canonical = absoluteUrl(page.canonicalPath);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: 'LoveEasyTool',
    url: absoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
      width: 512,
      height: 512,
    },
    image: OG_IMAGE_URL,
    description: 'Free everyday tools for text, numbers, PDFs, files and time. Fast, private browser-based utilities.',
    founder: {
      '@type': 'Person',
      name: 'Ali Hassan',
      url: absoluteUrl('/about/'),
    },
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: 'LoveEasyTool',
    alternateName: ['Love Easy Tool', 'LoveEasyTool.com'],
    url: absoluteUrl('/'),
    description: HOME_SEO.description,
    publisher: {
      '@id': absoluteUrl('/#organization'),
    },
  };

  if (cleanPath === '/') {
    return [webSiteSchema, organizationSchema];
  }

  // 1. Tool pages
  const slug = cleanPath.match(/^(?:\/tools|)\/([^/]+)$/)?.[1];
  if (slug && toolSeo[slug]) {
    const tool = tools.find(item => item.slug === slug);
    const seo = toolSeo[slug];
    const toolName = slug === 'cv-builder' ? 'Free CV Builder' : (tool?.name ?? slug);
    const toolDescription = seo.description || seo.answerSummary || tool?.description;
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        '@id': `${canonical}#app`,
        name: toolName,
        description: toolDescription,
        url: canonical,
        applicationCategory: getGoogleApplicationCategory(tool?.category),
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript. Runs locally in web browser.',
        image: OG_IMAGE_URL,
        offers: {
          '@type': 'Offer',
          price: 0,
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Person',
          name: 'Ali Hassan',
          url: absoluteUrl('/about/'),
        },
        publisher: {
          '@type': 'Organization',
          '@id': absoluteUrl('/#organization'),
          name: 'LoveEasyTool',
          url: absoluteUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/logo.png'),
            width: 512,
            height: 512,
          },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: tool?.category ? `${tool.category} Tools` : 'Tools', item: absoluteUrl(`/category/${tool?.category.toLowerCase() ?? 'tools'}/`) },
          { '@type': 'ListItem', position: 3, name: toolName, item: canonical },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: seo.faq.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
      organizationSchema,
    ];
  }

  // 2. Category pages
  const categoryMatch = cleanPath.match(/^\/category\/([^/]+)$/)?.[1];
  if (categoryMatch && CATEGORY_COPY[categoryMatch.toLowerCase()]) {
    const catKey = categoryMatch.toLowerCase();
    const copy = CATEGORY_COPY[catKey];
    const categoryTools = tools.filter(t => t.category.toLowerCase() === catKey);

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        mainEntity: {
          '@type': 'ItemList',
          name: copy.name,
          numberOfItems: categoryTools.length,
          itemListElement: categoryTools.map((t, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: t.name,
            url: absoluteUrl(getToolPath(t.slug)),
          })),
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: copy.name, item: canonical },
        ],
      },
      organizationSchema,
    ];
  }

  // 3. About page
  if (cleanPath === '/about') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: ABOUT_SEO.title,
        description: ABOUT_SEO.description,
        mainEntity: {
          '@type': 'Organization',
          '@id': absoluteUrl('/#organization'),
          name: 'LoveEasyTool',
          url: absoluteUrl('/'),
          founder: {
            '@type': 'Person',
            name: 'Ali Hassan',
            url: canonical,
          },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: canonical },
        ],
      },
      organizationSchema,
    ];
  }

  // 4. Contact page
  if (cleanPath === '/contact') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: CONTACT_SEO.title,
        description: CONTACT_SEO.description,
        mainEntity: {
          '@type': 'Organization',
          '@id': absoluteUrl('/#organization'),
          name: 'LoveEasyTool',
          url: absoluteUrl('/'),
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support & Inquiries',
            email: 'support@loveeasytool.com',
            url: canonical,
          },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: canonical },
        ],
      },
      organizationSchema,
    ];
  }

  // 5. Privacy page (WebPage markup per Google guidelines prohibiting Article markup on legal policy pages)
  if (cleanPath === '/privacy') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        name: PRIVACY_SEO.title,
        description: PRIVACY_SEO.description,
        url: canonical,
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          '@id': absoluteUrl('/#website'),
          name: 'LoveEasyTool',
          url: absoluteUrl('/'),
        },
        about: {
          '@type': 'Organization',
          '@id': absoluteUrl('/#organization'),
          name: 'LoveEasyTool',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: canonical },
        ],
      },
      organizationSchema,
    ];
  }

  // 6. Terms page (WebPage markup per Google guidelines prohibiting Article markup on terms of service)
  if (cleanPath === '/terms') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        name: TERMS_SEO.title,
        description: TERMS_SEO.description,
        url: canonical,
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          '@id': absoluteUrl('/#website'),
          name: 'LoveEasyTool',
          url: absoluteUrl('/'),
        },
        about: {
          '@type': 'Organization',
          '@id': absoluteUrl('/#organization'),
          name: 'LoveEasyTool',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: canonical },
        ],
      },
      organizationSchema,
    ];
  }

  // 7. Books page
  if (cleanPath === '/books') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: BOOKS_SEO.title,
        description: BOOKS_SEO.description,
        author: {
          '@type': 'Person',
          name: 'Ali Hassan',
          url: absoluteUrl('/about/'),
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Books', item: canonical },
        ],
      },
      organizationSchema,
    ];
  }

  // Fallback for 404 or other generic pages
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
    },
    organizationSchema,
  ];
}

export function renderHead(path: string) {
  const page = getPageSeo(path);
  const canonical = absoluteUrl(page.canonicalPath);
  const robots = page.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const jsonScripts = getJsonLd(path).map(value => `<script type="application/ld+json">${jsonLd(value)}</script>`).join('\n    ');
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
    jsonScripts,
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

  // Sync structured data JSON-LD scripts in DOM
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach(node => node.remove());
  const schemas = getJsonLd(path);
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = jsonLd(schema);
    document.head.appendChild(script);
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);
}
