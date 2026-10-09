import { ArrowRight, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { categories, Shell, tools } from './App';
import { getCategorySeo, updateDocumentHead } from './seo';
import { CATEGORY_GUIDES } from './data/category-guides';
import { useEffect } from 'react';
import NotFound from '@/pages/not-found';

const ALL_CATEGORIES = [
  { name: 'Text Tools', slug: 'text', count: '5 tools', desc: 'Word counting, case formatting, deduplication, and whitespace cleaning.' },
  { name: 'Number Calculators', slug: 'numbers', count: '7 tools', desc: 'Percentages, discounts, VAT, salary, loans, BMI, and exact age calculations.' },
  { name: 'File Utilities', slug: 'files', count: '6 tools', desc: 'In-browser image compression, resizing, WebP, JPG, and PNG conversion.' },
  { name: 'PDF Tools', slug: 'pdf', count: '7 tools', desc: 'Merge, split, compress, PDF to Word text extractor, and PDF to JPG.' },
  { name: 'Time Tools', slug: 'time', count: '1 tool', desc: 'Date difference calculations and calendar duration planning.' },
  { name: 'Everyday Tools', slug: 'everyday', count: '3 tools', desc: 'Unit conversions, global time-zone lookups, and static reference rates.' },
  { name: 'Career & Work', slug: 'work', count: '3 tools', desc: 'Free CV builder, cover letter generator, and gross-to-net salary estimator.' },
];

const CROSS_CATEGORY_FEATURED = [
  { name: 'Word Counter', slug: 'word-counter', category: 'Text', desc: 'Count words, characters, lines and reading time' },
  { name: 'Merge PDF', slug: 'merge-pdf', category: 'PDF', desc: 'Combine multiple PDF files locally in your browser' },
  { name: 'Image Compressor', slug: 'image-compressor', category: 'Files', desc: 'Reduce image file size with quality control' },
  { name: 'Percentage Calculator', slug: 'percentage-calculator', category: 'Numbers', desc: 'Calculate percentage changes and proportions' },
  { name: 'Free CV Builder', slug: 'cv-builder', category: 'Work', desc: 'Write and print a clean resume with live preview' },
  { name: 'VAT Calculator', slug: 'vat-calculator', category: 'Numbers', desc: 'Add or remove VAT from net or gross prices' },
];

export default function CategoryPage() {
  const { category: slug = '' } = useParams<{ category: string }>();
  const page = getCategorySeo(slug);
  const categoryName = categories.find(category => category.toLowerCase() === slug)?.replace(/ tools$/i, '');
  const filtered = tools.filter(tool => tool.category.toLowerCase() === slug || (slug === 'numbers' && tool.slug === 'salary-calculator'));
  const otherCategories = ALL_CATEGORIES.filter(c => c.slug !== slug);
  const featuredOtherTools = CROSS_CATEGORY_FEATURED.filter(t => t.category.toLowerCase() !== slug).slice(0, 4);

  useEffect(() => {
    updateDocumentHead(page ? `/category/${slug}/` : '/404');
  }, [page, slug]);

  if (!page || !categoryName) return <NotFound />;

  return (
    <Shell>
      <main className="mx-auto max-w-[1360px] px-5 py-12 lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">LoveEasyTool</Link>
            <span>/</span>
            <Link href="/#tools" className="hover:text-foreground">Tool Cabinets</Link>
            <span>/</span>
            <span className="text-foreground">{categoryName}</span>
          </div>
          <p className="mt-8 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Tool cabinet / {categoryName}</p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">{page.title.split(/ [–-] /)[0]}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{page.description}</p>
        </div>

        <section className="mt-12" aria-labelledby="category-tools">
          <div className="flex items-center justify-between">
            <h2 id="category-tools" className="font-display text-3xl font-semibold tracking-tight">
              All {categoryName.toLowerCase()} tools ({filtered.length})
            </h2>
            <Link href="/#tools" className="text-sm font-semibold text-primary hover:underline hidden sm:block">
              Browse all 31 tools →
            </Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map(tool => (
              <Link key={tool.slug} href={`/tools/${tool.slug}/`} className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">{tool.icon}</span>
                  <ArrowRight size={17} className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{tool.name}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Detailed Category Guide & In-Depth Content */}
        {CATEGORY_GUIDES[slug] && (
          <section className="mt-20 border-t border-border pt-16">
            <div className="max-w-3xl">
              <p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Educational Guide & Reference</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {CATEGORY_GUIDES[slug].overviewTitle}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
                {CATEGORY_GUIDES[slug].overviewContent.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {CATEGORY_GUIDES[slug].featuresTitle}
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {CATEGORY_GUIDES[slug].features.map((feature, idx) => (
                  <div key={idx} className="rounded-xl border border-border bg-card p-6 shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-accent shrink-0" />
                      <h4 className="font-display text-lg font-semibold">{feature.title}</h4>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category FAQ */}
            <div className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-2.5">
                <HelpCircle size={22} className="text-primary" />
                <h3 className="font-display text-2xl font-semibold">Frequently Asked Questions</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Common questions regarding browser processing, accuracy, security, and usage for our {categoryName.toLowerCase()} utilities.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {CATEGORY_GUIDES[slug].faqs.map((faq, idx) => (
                  <div key={idx} className="border-t border-border/60 pt-4">
                    <h4 className="font-display text-base font-semibold text-foreground">{faq.question}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cross-linking: Other Tool Cabinets */}
        <section className="mt-20 border-t border-border pt-16">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Internal Knowledge Network</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Explore Other Tool Cabinets</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Discover tools in other disciplines—all powered locally in your browser with zero sign-ups and complete privacy.
              </p>
            </div>
            <Link href="/" className="text-sm font-semibold text-primary hover:underline">
              Back to main toolbox →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherCategories.map(c => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/`}
                className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition">{c.name}</h3>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 font-mono-ui text-[11px] font-bold text-secondary-foreground">{c.count}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:translate-x-1 transition">
                  Open cabinet <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-linking: Popular Utilities in Other Categories */}
        <section className="mt-16 rounded-2xl border border-border/80 bg-muted/30 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-accent" />
            <h3 className="font-display text-xl font-semibold">Popular Utilities Across Other Cabinets</h3>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredOtherTools.map(t => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}/`}
                className="group rounded-xl border border-border bg-card p-4 transition hover:border-primary hover:shadow-2xs"
              >
                <p className="font-mono-ui text-[10px] uppercase tracking-wider text-accent">{t.category}</p>
                <h4 className="mt-1 font-display text-base font-semibold group-hover:text-primary transition">{t.name}</h4>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{t.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
