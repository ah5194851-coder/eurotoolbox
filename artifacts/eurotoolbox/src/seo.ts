import { SITE_URL, OG_IMAGE_URL } from './site-config';
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
  title: 'LoveEasyTool: Free Online Tools, No Sign-Up, Files Stay Private',
  description: 'Free everyday tools for text, numbers, PDFs, files and time. No accounts, no uploads: your files are processed in your browser and stay on your device.',
  canonicalPath: '/',
  type: 'website',
  keywords: 'online tools, free online utilities, word counter, pdf tools, image compressor, calculators, private tools, no sign-up, LoveEasyTool',
};

export const BOOKS_SEO: PageSeo = {
  title: 'Books - Free Online Tool | LoveEasyTool',
  description: 'Practical beginner guides on AI, cybersecurity, remote work, freelancing, personal finance and productivity by Ali Hassan, the creator of LoveEasyTool.',
  canonicalPath: '/books',
  type: 'website',
  keywords: 'books, ali hassan, cybersecurity guide, ai guide, remote work, freelancing, productivity, personal finance, LoveEasyTool',
};

export const PRIVACY_SEO: PageSeo = {
  title: 'Privacy Policy - Free Online Tool | LoveEasyTool',
  description: 'Read how LoveEasyTool protects your privacy with browser-side processing. Your files, documents, and data never leave your device or reach any server.',
  canonicalPath: '/privacy',
  type: 'article',
  keywords: 'privacy policy, local processing, private tools, zero uploads, LoveEasyTool privacy',
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
  return `/category/${category.toLowerCase()}`;
}

export function getCategorySeo(slug: string): PageSeo | undefined {
  const copy = CATEGORY_COPY[slug];
  if (!copy) return undefined;
  return {
    title: `${copy.name} - Free Online Tool | LoveEasyTool`,
    description: copy.description,
    canonicalPath: `/category/${slug}`,
    type: 'website',
    keywords: `${copy.name.toLowerCase()}, free online utilities, browser tools, LoveEasyTool`,
  };
}

export function getToolPath(slug: string) {
  return `/tools/${slug}`;
}

export function getPageSeo(path: string): PageSeo {
  const cleanPath = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (cleanPath === '/') return HOME_SEO;
  if (cleanPath === '/books') return BOOKS_SEO;
  if (cleanPath === '/privacy') return PRIVACY_SEO;
  const category = cleanPath.match(/^\/category\/([^/]+)$/)?.[1];
  if (category) return getCategorySeo(category) ?? notFoundSeo(cleanPath);
  const slug = cleanPath.match(/^(?:\/tools|)\/([^/]+)$/)?.[1];
  if (slug && toolSeo[slug]) {
    return {
      ...toolSeo[slug],
      canonicalPath: getToolPath(slug),
      type: 'website',
      keywords: `${toolSeo[slug].title.split(' - ')[0].toLowerCase()}, free online tool, private tool, browser processing, LoveEasyTool`,
    };
  }
  return notFoundSeo(cleanPath);
}

export function notFoundSeo(path = '/404'): PageSeo {
  return {
    title: 'Page Not Found | LoveEasyTool',
    description: 'The requested LoveEasyTool page could not be found. Explore our free, private online tools for text, numbers, PDFs, and files directly in your browser.',
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

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LoveEasyTool',
    url: absoluteUrl('/'),
    logo: absoluteUrl('/apple-touch-icon.svg'),
    description: 'Free everyday tools for text, numbers, PDFs, files and time. Fast, private browser-based utilities.',
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LoveEasyTool',
    url: absoluteUrl('/'),
    description: HOME_SEO.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  if (cleanPath === '/') {
    return [webSiteSchema, organizationSchema];
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
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: {
          '@type': 'Organization',
          name: 'LoveEasyTool',
          url: absoluteUrl('/'),
        },
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
          { '@type': 'ListItem', position: 1, name: 'LoveEasyTool', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: tool?.category ?? 'Tools', item: absoluteUrl(`/category/${tool?.category.toLowerCase() ?? 'tools'}`) },
          { '@type': 'ListItem', position: 3, name: tool?.name ?? slug, item: absoluteUrl(getToolPath(slug)) },
        ],
      },
      organizationSchema,
    ];
  }

  return [
    { ...base, '@type': page.type === 'article' ? 'Article' : 'CollectionPage', name: page.title, description: page.description },
    organizationSchema,
  ];
}

export function renderHead(path: string) {
  const page = getPageSeo(path);
  const canonical = absoluteUrl(page.canonicalPath);
  const robots = page.noindex ? 'noindex, follow' : 'index, follow';
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
    '<meta property="og:site_name" content="LoveEasyTool" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`,
    jsonScripts,
  ].filter(Boolean).join('\n    ');
}

export function updateDocumentHead(path: string) {
  if (typeof document === 'undefined') return;
  const page = getPageSeo(path);
  document.title = page.title;
  const canonical = absoluteUrl(page.canonicalPath);
  const tags: Record<string, string> = {
    'meta[name="description"]': page.description,
    'meta[name="keywords"]': page.keywords || 'online tools, free online utilities, LoveEasyTool',
    'meta[name="robots"]': page.noindex ? 'noindex, follow' : 'index, follow',
    'meta[name="theme-color"]': '#1a365d',
    'meta[property="og:title"]': page.title,
    'meta[property="og:description"]': page.description,
    'meta[property="og:type"]': page.type,
    'meta[property="og:url"]': canonical,
    'meta[property="og:site_name"]': 'LoveEasyTool',
    'meta[property="og:image"]': OG_IMAGE_URL,
    'meta[name="twitter:card"]': 'summary_large_image',
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
