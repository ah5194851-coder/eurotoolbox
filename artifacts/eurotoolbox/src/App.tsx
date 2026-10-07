import { lazy, Suspense, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { toolSeo, type ToolSeo } from './data/seo';
import {
  ArrowRight, Baby, BadgeEuro, BookOpen, CalendarDays, Calculator, Copy,
  FileImage, FileText, Globe2, ImageDown, KeyRound, Landmark, Menu, Percent,
  RefreshCw, Search, ShieldCheck, Sparkles, Timer, Type, X, Zap
} from 'lucide-react';

const queryClient = new QueryClient();
const LazyHomePage = lazy(() => import('./home-page'));
const LazyToolPage = lazy(() => import('./tool-page'));
const LazyCategoryPage = lazy(() => import('./category-page'));
const LazyPrivacyPage = lazy(() => import('./privacy-page'));
const LazyBooksPage = lazy(() => import('./books-page'));
const LazyAboutPage = lazy(() => import('./about-page'));
const LazyContactPage = lazy(() => import('./contact-page'));
const LazyTermsPage = lazy(() => import('./terms-page'));
const LazyCountryVatPage = lazy(() => import('./country-vat-page'));

export type Tool = { slug: string; name: string; description: string; category: string; icon: ReactNode; color: string };
export type { ToolSeo };

function HashIcon() { return <span className="font-mono-ui text-[1.3em] font-bold leading-none">#</span>; }

export const tools: Tool[] = [
  { slug: 'word-counter', name: 'Word counter', description: 'See words, characters, lines and reading time.', category: 'Text', icon: <Type />, color: 'blue' },
  { slug: 'character-counter', name: 'Character counter', description: 'Count every character, with or without spaces.', category: 'Text', icon: <HashIcon />, color: 'teal' },
  { slug: 'case-converter', name: 'Case converter', description: 'Switch between sentence, title, upper and lower case.', category: 'Text', icon: <Type />, color: 'yellow' },
  { slug: 'text-cleaner', name: 'Text cleaner', description: 'Tidy whitespace, line breaks and invisible clutter.', category: 'Text', icon: <Sparkles />, color: 'coral' },
  { slug: 'duplicate-line-remover', name: 'Duplicate line remover', description: 'Make lists unique while keeping their original order.', category: 'Text', icon: <Copy />, color: 'blue' },
  { slug: 'percentage-calculator', name: 'Percentage calculator', description: 'Work out percentages, changes and proportions.', category: 'Numbers', icon: <Percent />, color: 'yellow' },
  { slug: 'discount-calculator', name: 'Discount calculator', description: 'Find the sale price and exactly what you save.', category: 'Numbers', icon: <BadgeEuro />, color: 'teal' },
  { slug: 'bmi-calculator', name: 'BMI calculator', description: 'A clear BMI estimate from height and weight.', category: 'Numbers', icon: <Baby />, color: 'coral' },
  { slug: 'loan-calculator', name: 'Loan calculator', description: 'Estimate monthly payments and total interest.', category: 'Numbers', icon: <Landmark />, color: 'blue' },
  { slug: 'vat-calculator', name: 'VAT calculator', description: 'Add or remove VAT from a net or gross price.', category: 'Numbers', icon: <Calculator />, color: 'yellow' },
  { slug: 'age-calculator', name: 'Age calculator', description: 'Know your exact age in years, months and days.', category: 'Numbers', icon: <CalendarDays />, color: 'teal' },
  { slug: 'image-compressor', name: 'Image compressor', description: 'Reduce image size with a quality slider and local processing.', category: 'Files', icon: <ImageDown />, color: 'coral' },
  { slug: 'image-resizer', name: 'Image resizer', description: 'Resize an image to a precise browser-rendered width.', category: 'Files', icon: <ImageDown />, color: 'blue' },
  { slug: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert a JPG to a transparent-friendly PNG locally.', category: 'Files', icon: <FileImage />, color: 'yellow' },
  { slug: 'png-to-jpg', name: 'PNG to JPG', description: 'Convert a PNG to a compact JPG in your browser.', category: 'Files', icon: <FileImage />, color: 'teal' },
  { slug: 'webp-converter', name: 'WebP converter', description: 'Convert common image formats to WebP locally.', category: 'Files', icon: <FileImage />, color: 'blue' },
  { slug: 'image-cropper', name: 'Image cropper', description: 'Prepare an image crop before downloading a new copy.', category: 'Files', icon: <ImageDown />, color: 'yellow' },
  { slug: 'pdf-to-word', name: 'PDF text extractor', description: 'Extract selectable plain text from searchable PDF documents.', category: 'PDF', icon: <FileText />, color: 'blue' },
  { slug: 'word-to-pdf', name: 'Word to PDF', description: 'Create a PDF from text directly in your browser.', category: 'PDF', icon: <FileText />, color: 'teal' },
  { slug: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one downloadable document.', category: 'PDF', icon: <FileText />, color: 'yellow' },
  { slug: 'split-pdf', name: 'Split PDF', description: 'Extract selected pages from a PDF into a new file.', category: 'PDF', icon: <FileText />, color: 'coral' },
  { slug: 'compress-pdf', name: 'PDF optimizer', description: 'Re-encode and clean up unreferenced PDF streams and metadata.', category: 'PDF', icon: <FileText />, color: 'blue' },
  { slug: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Render PDF pages to downloadable JPG images.', category: 'PDF', icon: <FileImage />, color: 'yellow' },
  { slug: 'jpg-to-pdf', name: 'JPG to PDF helper', description: 'Format an image for browser print-to-PDF export.', category: 'Files', icon: <FileImage />, color: 'blue' },
  { slug: 'date-calculator', name: 'Date calculator', description: 'Count days between dates or add days to a date.', category: 'Time', icon: <Timer />, color: 'yellow' },
  { slug: 'unit-converter', name: 'Unit converter', description: 'Convert length, weight, temperature and more.', category: 'Everyday', icon: <RefreshCw />, color: 'teal' },
  { slug: 'time-zone-converter', name: 'Time-zone converter', description: 'Compare a moment across cities without guesswork.', category: 'Everyday', icon: <Globe2 />, color: 'coral' },
  { slug: 'currency-converter', name: 'Currency reference converter', description: 'Compare currencies with transparent static reference rates.', category: 'Everyday', icon: <BadgeEuro />, color: 'yellow' },
  { slug: 'cv-builder', name: 'CV builder', description: 'Write a clean, printable CV with a live preview.', category: 'Work', icon: <FileText />, color: 'blue' },
  { slug: 'cover-letter-generator', name: 'Cover-letter generator', description: 'Turn a few details into a focused first draft.', category: 'Work', icon: <BookOpen />, color: 'teal' },
  { slug: 'salary-calculator', name: 'Salary calculator', description: 'Estimate take-home pay after a percentage deduction.', category: 'Work', icon: <BadgeEuro />, color: 'yellow' },
];

export const categories = ['All tools', 'Text', 'Numbers', 'Files', 'PDF', 'Time', 'Everyday', 'Work'];
export { toolSeo };

export function Shell({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hostname === 'www.loveeasytool.com' || window.location.hostname === 'eurotoolbox.ah5194851.workers.dev') {
        let pathname = window.location.pathname;
        if (pathname !== '/' && !pathname.endsWith('/') && !pathname.includes('.')) {
          pathname += '/';
        }
        window.location.replace('https://loveeasytool.com' + pathname + window.location.search + window.location.hash);
        return;
      }
      // Overlap redirect for image-tools -> image-compressor/
      if (window.location.pathname === '/tools/image-tools' || window.location.pathname === '/tools/image-tools/' || window.location.pathname === '/image-tools' || window.location.pathname === '/image-tools/') {
        window.location.replace('/tools/image-compressor/');
        return;
      }
    }
  }, []);
  const matching = useMemo(() => search.length > 1 ? tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5) : [], [search]);
  const go = (path: string) => { 
    const finalPath = path.endsWith('/') ? path : `${path}/`;
    setLocation(finalPath); 
    setSearch(''); 
    setMenuOpen(false); 
  };
  return <div className="noise min-h-[100dvh] bg-background">
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1360px] items-center gap-5 px-5 lg:px-10">
        <Link href="/" data-testid="link-home" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-[11px] bg-secondary text-secondary-foreground shadow-sm"><KeyRound size={19} strokeWidth={2.5} /></span><span><span className="block font-display text-lg font-bold leading-none tracking-tight">LoveEasyTool</span><span className="mt-0.5 block font-mono-ui text-[9px] uppercase tracking-[.15em] text-muted-foreground">Everyday utility</span></span></Link>
        <div className="relative ml-auto hidden w-full max-w-[320px] md:block">
          <Search size={17} className="absolute left-3 top-3 text-muted-foreground" />
          <input data-testid="input-tool-search" aria-label="Search tools" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a tool..." className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary" />
          {matching.length > 0 && <div className="absolute left-0 right-0 top-12 rounded-xl border border-border bg-card p-1.5 shadow-lg">{matching.map(t => <button data-testid={`button-search-${t.slug}`} key={t.slug} onClick={() => go(`/tools/${t.slug}/`)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-muted"><span className="text-primary">{t.icon}</span>{t.name}</button>)}</div>}
        </div>
        <nav className="hidden items-center gap-5 text-sm font-semibold md:flex">
          <Link href="/#tools" data-testid="link-browse-tools" className="text-muted-foreground transition hover:text-foreground">Browse tools</Link>
          <Link href="/category/pdf/" data-testid="link-nav-pdf" className="text-muted-foreground transition hover:text-foreground">PDF tools</Link>
          <Link href="/category/text/" data-testid="link-nav-text" className="text-muted-foreground transition hover:text-foreground">Text tools</Link>
          <Link href="/tools/cv-builder/" data-testid="link-cv-builder" className="text-muted-foreground transition hover:text-foreground">CV builder</Link>
          <Link href="/books/" data-testid="link-books" className="text-muted-foreground transition hover:text-foreground">Books</Link>
          <Link href="/about/" data-testid="link-about" className="text-muted-foreground transition hover:text-foreground">About</Link>
        </nav>
        <button data-testid="button-mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 hover:bg-muted md:hidden">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {menuOpen && (
        <div className="border-t border-border bg-card px-5 py-4 md:hidden">
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
            <input autoFocus data-testid="input-mobile-tool-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a tool..." className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 text-sm" />
          </div>
          {matching.length > 0 ? (
            <div className="grid gap-1 mb-4">
              {matching.map(t => (
                <button data-testid={`button-mobile-${t.slug}`} key={t.slug} onClick={() => go(`/tools/${t.slug}/`)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">
                  {t.icon}{t.name}
                </button>
              ))}
            </div>
          ) : null}
          <div className="border-t border-border/60 pt-3">
            <p className="mb-2 font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground">Categories</p>
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm font-medium">
              <Link href="/category/text/" onClick={() => setMenuOpen(false)} className="rounded-md p-2 hover:bg-muted text-muted-foreground hover:text-foreground">Text Tools</Link>
              <Link href="/category/numbers/" onClick={() => setMenuOpen(false)} className="rounded-md p-2 hover:bg-muted text-muted-foreground hover:text-foreground">Number Tools</Link>
              <Link href="/category/files/" onClick={() => setMenuOpen(false)} className="rounded-md p-2 hover:bg-muted text-muted-foreground hover:text-foreground">File Tools</Link>
              <Link href="/category/pdf/" onClick={() => setMenuOpen(false)} className="rounded-md p-2 hover:bg-muted text-muted-foreground hover:text-foreground">PDF Tools</Link>
              <Link href="/category/time/" onClick={() => setMenuOpen(false)} className="rounded-md p-2 hover:bg-muted text-muted-foreground hover:text-foreground">Time Tools</Link>
              <Link href="/category/everyday/" onClick={() => setMenuOpen(false)} className="rounded-md p-2 hover:bg-muted text-muted-foreground hover:text-foreground">Everyday Tools</Link>
              <Link href="/category/work/" onClick={() => setMenuOpen(false)} className="rounded-md p-2 hover:bg-muted text-muted-foreground hover:text-foreground">Work Tools</Link>
              <Link href="/tools/cv-builder/" onClick={() => setMenuOpen(false)} className="rounded-md p-2 hover:bg-muted text-muted-foreground hover:text-foreground">CV Builder</Link>
            </div>
            <div className="flex gap-4 border-t border-border/60 pt-3 text-sm text-muted-foreground">
              <Link href="/books/" onClick={() => setMenuOpen(false)} className="hover:text-foreground">Books</Link>
              <Link href="/about/" onClick={() => setMenuOpen(false)} className="hover:text-foreground">About</Link>
              <Link href="/contact/" onClick={() => setMenuOpen(false)} className="hover:text-foreground">Contact</Link>
              <Link href="/privacy/" onClick={() => setMenuOpen(false)} className="hover:text-foreground">Privacy</Link>
            </div>
          </div>
        </div>
      )}
    </header>
    {children}
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1360px] px-5 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" data-testid="link-footer-home" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-secondary text-secondary-foreground shadow-sm">
                <KeyRound size={19} strokeWidth={2.5} />
              </span>
              <span>
                <span className="block font-display text-lg font-bold leading-none tracking-tight">LoveEasyTool</span>
                <span className="mt-0.5 block font-mono-ui text-[9px] uppercase tracking-[.15em] text-muted-foreground">Everyday utility</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Free, fast, private online tools for everyday work, calculations, and documents. Zero sign-up, zero server uploads.
            </p>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Created by <span className="font-semibold text-foreground">Ali Hassan</span>.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 p-2.5 text-xs text-accent">
              <ShieldCheck size={16} className="shrink-0" />
              <span>Processed locally in your browser tab</span>
            </div>
          </div>

          <div>
            <p className="font-mono-ui text-[11px] font-bold uppercase tracking-[.18em] text-accent">Tool Cabinets</p>
            <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/category/text/" className="hover:text-foreground hover:underline">Text Tools</Link></li>
              <li><Link href="/category/numbers/" className="hover:text-foreground hover:underline">Number Calculators</Link></li>
              <li><Link href="/category/files/" className="hover:text-foreground hover:underline">File & Image Utilities</Link></li>
              <li><Link href="/category/pdf/" className="hover:text-foreground hover:underline">PDF Tools</Link></li>
              <li><Link href="/category/time/" className="hover:text-foreground hover:underline">Time & Date Tools</Link></li>
              <li><Link href="/category/everyday/" className="hover:text-foreground hover:underline">Everyday Converters</Link></li>
              <li><Link href="/category/work/" className="hover:text-foreground hover:underline">Career & Work Tools</Link></li>
              <li><Link href="/#tools" className="font-semibold text-primary hover:underline">Browse All 31 Tools →</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-ui text-[11px] font-bold uppercase tracking-[.18em] text-accent">PDF & File Tools</p>
            <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/tools/merge-pdf/" className="hover:text-foreground hover:underline">Merge PDF</Link></li>
              <li><Link href="/tools/split-pdf/" className="hover:text-foreground hover:underline">Split PDF</Link></li>
              <li><Link href="/tools/compress-pdf/" className="hover:text-foreground hover:underline">PDF Optimizer</Link></li>
              <li><Link href="/tools/pdf-to-word/" className="hover:text-foreground hover:underline">PDF Text Extractor</Link></li>
              <li><Link href="/tools/word-to-pdf/" className="hover:text-foreground hover:underline">Word to PDF</Link></li>
              <li><Link href="/tools/pdf-to-jpg/" className="hover:text-foreground hover:underline">PDF to JPG</Link></li>
              <li><Link href="/tools/image-compressor/" className="hover:text-foreground hover:underline">Image Compressor</Link></li>
              <li><Link href="/tools/image-resizer/" className="hover:text-foreground hover:underline">Image Resizer</Link></li>
              <li><Link href="/tools/webp-converter/" className="hover:text-foreground hover:underline">WebP Converter</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-ui text-[11px] font-bold uppercase tracking-[.18em] text-accent">Text & Calculators</p>
            <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/tools/word-counter/" className="hover:text-foreground hover:underline">Word Counter</Link></li>
              <li><Link href="/tools/character-counter/" className="hover:text-foreground hover:underline">Character Counter</Link></li>
              <li><Link href="/tools/case-converter/" className="hover:text-foreground hover:underline">Case Converter</Link></li>
              <li><Link href="/tools/duplicate-line-remover/" className="hover:text-foreground hover:underline">Duplicate Line Remover</Link></li>
              <li><Link href="/tools/percentage-calculator/" className="hover:text-foreground hover:underline">Percentage Calculator</Link></li>
              <li><Link href="/tools/vat-calculator/" className="hover:text-foreground hover:underline">VAT Calculator</Link></li>
              <li><Link href="/tools/bmi-calculator/" className="hover:text-foreground hover:underline">BMI Calculator</Link></li>
              <li><Link href="/tools/loan-calculator/" className="hover:text-foreground hover:underline">Loan Calculator</Link></li>
              <li><Link href="/tools/cv-builder/" className="hover:text-foreground hover:underline">Free CV Builder</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-ui text-[11px] font-bold uppercase tracking-[.18em] text-accent">Platform & Author</p>
            <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/about/" className="hover:text-foreground hover:underline">About LoveEasyTool</Link></li>
              <li><Link href="/books/" className="hover:text-foreground hover:underline">Books by Ali Hassan</Link></li>
              <li><Link href="/contact/" className="hover:text-foreground hover:underline">Contact & Support</Link></li>
              <li><Link href="/privacy/" className="hover:text-foreground hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="hover:text-foreground hover:underline">Terms of Service</Link></li>
              <li><Link href="/tools/salary-calculator/" className="hover:text-foreground hover:underline">Salary Calculator</Link></li>
              <li><Link href="/tools/date-calculator/" className="hover:text-foreground hover:underline">Date Calculator</Link></li>
              <li><Link href="/tools/unit-converter/" className="hover:text-foreground hover:underline">Unit Converter</Link></li>
            </ul>
          </div>
        </div>

        {/* VAT Calculators by Country */}
        <div className="mt-12 border-t border-border pt-10">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">International Tax Tools</p>
              <h3 className="font-display text-base font-semibold text-foreground">VAT Calculators by Country</h3>
            </div>
            <Link href="/tools/vat-calculator/" className="text-xs font-semibold text-primary hover:underline">
              Universal VAT calculator →
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link href="/uk-vat-calculator/" className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-primary transition">
              <span className="font-semibold text-foreground">UK VAT</span> <span className="text-muted-foreground font-mono-ui">(20%)</span>
            </Link>
            <Link href="/germany-vat-calculator/" className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-primary transition">
              <span className="font-semibold text-foreground">Germany MwSt</span> <span className="text-muted-foreground font-mono-ui">(19%)</span>
            </Link>
            <Link href="/france-vat-calculator/" className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-primary transition">
              <span className="font-semibold text-foreground">France TVA</span> <span className="text-muted-foreground font-mono-ui">(20%)</span>
            </Link>
            <Link href="/ireland-vat-calculator/" className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-primary transition">
              <span className="font-semibold text-foreground">Ireland VAT</span> <span className="text-muted-foreground font-mono-ui">(23%)</span>
            </Link>
            <Link href="/uae-vat-calculator/" className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-primary transition">
              <span className="font-semibold text-foreground">UAE VAT</span> <span className="text-muted-foreground font-mono-ui">(5%)</span>
            </Link>
            <Link href="/saudi-arabia-vat-calculator/" className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-primary transition">
              <span className="font-semibold text-foreground">Saudi Arabia VAT</span> <span className="text-muted-foreground font-mono-ui">(15%)</span>
            </Link>
          </div>
        </div>

        {/* Complete Tools Directory for Deep Internal Linking */}
        <div className="mt-12 border-t border-border pt-10">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Knowledge Network</p>
              <h3 className="font-display text-base font-semibold text-foreground">Directory of All 31 Free Online Utilities</h3>
            </div>
            <Link href="/#tools" className="text-xs font-semibold text-primary hover:underline">
              Search all tools →
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {tools.map(t => (
              <Link key={t.slug} href={`/tools/${t.slug}/`} className="hover:text-primary hover:underline truncate">
                {t.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} LoveEasyTool · Made for the open web by Ali Hassan</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <Link href="/about/" className="hover:text-foreground">About</Link>
            <Link href="/books/" className="hover:text-foreground">Books</Link>
            <Link href="/privacy/" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms/" className="hover:text-foreground">Terms</Link>
            <Link href="/contact/" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  </div>;
}

function RouteLoading() {
  return <div className="grid min-h-[50vh] place-items-center p-8 text-sm text-muted-foreground">Loading tool…</div>;
}

function Router() {
  return <ErrorBoundary><Suspense fallback={<RouteLoading />}><Switch><Route path="/" component={LazyHomePage} /><Route path="/about" component={LazyAboutPage} /><Route path="/about/" component={LazyAboutPage} /><Route path="/contact" component={LazyContactPage} /><Route path="/contact/" component={LazyContactPage} /><Route path="/terms" component={LazyTermsPage} /><Route path="/terms/" component={LazyTermsPage} /><Route path="/privacy" component={LazyPrivacyPage} /><Route path="/privacy/" component={LazyPrivacyPage} /><Route path="/books" component={LazyBooksPage} /><Route path="/books/" component={LazyBooksPage} /><Route path="/uk-vat-calculator" component={() => <LazyCountryVatPage countrySlug="uk-vat-calculator" />} /><Route path="/uk-vat-calculator/" component={() => <LazyCountryVatPage countrySlug="uk-vat-calculator" />} /><Route path="/germany-vat-calculator" component={() => <LazyCountryVatPage countrySlug="germany-vat-calculator" />} /><Route path="/germany-vat-calculator/" component={() => <LazyCountryVatPage countrySlug="germany-vat-calculator" />} /><Route path="/france-vat-calculator" component={() => <LazyCountryVatPage countrySlug="france-vat-calculator" />} /><Route path="/france-vat-calculator/" component={() => <LazyCountryVatPage countrySlug="france-vat-calculator" />} /><Route path="/ireland-vat-calculator" component={() => <LazyCountryVatPage countrySlug="ireland-vat-calculator" />} /><Route path="/ireland-vat-calculator/" component={() => <LazyCountryVatPage countrySlug="ireland-vat-calculator" />} /><Route path="/uae-vat-calculator" component={() => <LazyCountryVatPage countrySlug="uae-vat-calculator" />} /><Route path="/uae-vat-calculator/" component={() => <LazyCountryVatPage countrySlug="uae-vat-calculator" />} /><Route path="/saudi-arabia-vat-calculator" component={() => <LazyCountryVatPage countrySlug="saudi-arabia-vat-calculator" />} /><Route path="/saudi-arabia-vat-calculator/" component={() => <LazyCountryVatPage countrySlug="saudi-arabia-vat-calculator" />} /><Route path="/category/:category" component={LazyCategoryPage} /><Route path="/category/:category/" component={LazyCategoryPage} /><Route path="/tools/:tool" component={LazyToolPage} /><Route path="/tools/:tool/" component={LazyToolPage} /><Route path="/:tool" component={LazyToolPage} /><Route path="/:tool/" component={LazyToolPage} /><Route component={NotFound} /></Switch></Suspense></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
