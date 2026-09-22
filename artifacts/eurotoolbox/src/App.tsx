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
  { slug: 'image-tools', name: 'Image compressor & converter', description: 'Resize, compress and change image formats locally.', category: 'Files', icon: <ImageDown />, color: 'coral' },
  { slug: 'image-compressor', name: 'Image compressor', description: 'Reduce image size with a quality slider and local processing.', category: 'Files', icon: <ImageDown />, color: 'coral' },
  { slug: 'image-resizer', name: 'Image resizer', description: 'Resize an image to a precise browser-rendered width.', category: 'Files', icon: <ImageDown />, color: 'blue' },
  { slug: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert a JPG to a transparent-friendly PNG locally.', category: 'Files', icon: <FileImage />, color: 'yellow' },
  { slug: 'png-to-jpg', name: 'PNG to JPG', description: 'Convert a PNG to a compact JPG in your browser.', category: 'Files', icon: <FileImage />, color: 'teal' },
  { slug: 'webp-converter', name: 'WebP converter', description: 'Convert common image formats to WebP locally.', category: 'Files', icon: <FileImage />, color: 'blue' },
  { slug: 'image-cropper', name: 'Image cropper', description: 'Prepare an image crop before downloading a new copy.', category: 'Files', icon: <ImageDown />, color: 'yellow' },
  { slug: 'pdf-to-word', name: 'PDF to Word', description: 'Extract selectable PDF text into an editable document.', category: 'PDF', icon: <FileText />, color: 'blue' },
  { slug: 'word-to-pdf', name: 'Word to PDF', description: 'Create a PDF from text directly in your browser.', category: 'PDF', icon: <FileText />, color: 'teal' },
  { slug: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one downloadable document.', category: 'PDF', icon: <FileText />, color: 'yellow' },
  { slug: 'split-pdf', name: 'Split PDF', description: 'Extract selected pages from a PDF into a new file.', category: 'PDF', icon: <FileText />, color: 'coral' },
  { slug: 'compress-pdf', name: 'Compress PDF', description: 'Re-save a PDF with browser-side optimization where possible.', category: 'PDF', icon: <FileText />, color: 'blue' },
  { slug: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Render PDF pages to downloadable JPG images.', category: 'PDF', icon: <FileImage />, color: 'yellow' },
  { slug: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Prepare an image for a PDF using your browser print dialog.', category: 'Files', icon: <FileImage />, color: 'blue' },
  { slug: 'date-calculator', name: 'Date calculator', description: 'Count days between dates or add days to a date.', category: 'Time', icon: <Timer />, color: 'yellow' },
  { slug: 'unit-converter', name: 'Unit converter', description: 'Convert length, weight, temperature and more.', category: 'Everyday', icon: <RefreshCw />, color: 'teal' },
  { slug: 'time-zone-converter', name: 'Time-zone converter', description: 'Compare a moment across cities without guesswork.', category: 'Everyday', icon: <Globe2 />, color: 'coral' },
  { slug: 'currency-converter', name: 'Currency converter', description: 'Use transparent reference rates — live rates are unavailable.', category: 'Everyday', icon: <BadgeEuro />, color: 'yellow' },
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
  const matching = useMemo(() => search.length > 1 ? tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5) : [], [search]);
  const go = (path: string) => { setLocation(path); setSearch(''); setMenuOpen(false); };
  return <div className="noise min-h-[100dvh] bg-background">
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1360px] items-center gap-5 px-5 lg:px-10">
        <Link href="/" data-testid="link-home" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-[11px] bg-secondary text-secondary-foreground shadow-sm"><KeyRound size={19} strokeWidth={2.5} /></span><span><span className="block font-display text-lg font-bold leading-none tracking-tight">EuroToolBox</span><span className="mt-0.5 block font-mono-ui text-[9px] uppercase tracking-[.15em] text-muted-foreground">Everyday utility</span></span></Link>
        <div className="relative ml-auto hidden w-full max-w-[320px] md:block">
          <Search size={17} className="absolute left-3 top-3 text-muted-foreground" />
          <input data-testid="input-tool-search" aria-label="Search tools" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a tool..." className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary" />
          {matching.length > 0 && <div className="absolute left-0 right-0 top-12 rounded-xl border border-border bg-card p-1.5 shadow-lg">{matching.map(t => <button data-testid={`button-search-${t.slug}`} key={t.slug} onClick={() => go(`/tools/${t.slug}`)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-muted"><span className="text-primary">{t.icon}</span>{t.name}</button>)}</div>}
        </div>
        <nav className="hidden items-center gap-5 text-sm font-semibold md:flex"><Link href="/#tools" data-testid="link-browse-tools" className="text-muted-foreground transition hover:text-foreground">Browse tools</Link><Link href="/tools/cv-builder" data-testid="link-cv-builder" className="text-muted-foreground transition hover:text-foreground">CV builder</Link></nav>
        <button data-testid="button-mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 hover:bg-muted md:hidden">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
      {menuOpen && <div className="border-t border-border bg-card px-5 py-4 md:hidden"><div className="relative mb-3"><Search size={16} className="absolute left-3 top-3 text-muted-foreground" /><input autoFocus data-testid="input-mobile-tool-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a tool..." className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 text-sm" /></div><div className="grid gap-1">{(matching.length ? matching : tools.slice(0, 5)).map(t => <button data-testid={`button-mobile-${t.slug}`} key={t.slug} onClick={() => go(`/tools/${t.slug}`)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">{t.icon}{t.name}</button>)}</div></div>}
    </header>
    {children}
    <footer className="border-t border-border bg-card"><div className="mx-auto flex max-w-[1360px] flex-col gap-7 px-5 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10"><div><Link href="/" data-testid="link-footer-home" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-[11px] bg-secondary text-secondary-foreground shadow-sm"><KeyRound size={19} strokeWidth={2.5} /></span><span><span className="block font-display text-lg font-bold leading-none tracking-tight">EuroToolBox</span><span className="mt-0.5 block font-mono-ui text-[9px] uppercase tracking-[.15em] text-muted-foreground">Everyday utility</span></span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">Free online tools for everyday life. Built to be fast, private and pleasantly obvious.</p></div><div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">{['Text', 'Numbers', 'Files', 'Work'].map(c => <a key={c} href={`/category/${c.toLowerCase()}`} className="hover:text-foreground">{c} tools</a>)}<Link href="/privacy" className="hover:text-foreground">Privacy</Link><span className="flex items-center gap-1.5 text-accent"><ShieldCheck size={15} />No uploads by default</span></div><p className="font-mono-ui text-[10px] uppercase tracking-widest text-muted-foreground">Made for the open web · 2025</p></div></footer>
  </div>;
}

function RouteLoading() {
  return <div className="grid min-h-[50vh] place-items-center p-8 text-sm text-muted-foreground">Loading tool…</div>;
}

function Router() {
  return <ErrorBoundary><Suspense fallback={<RouteLoading />}><Switch><Route path="/" component={LazyHomePage} /><Route path="/privacy" component={LazyPrivacyPage} /><Route path="/category/:category" component={LazyCategoryPage} /><Route path="/tools/:tool" component={LazyToolPage} /><Route path="/:tool" component={LazyToolPage} /><Route component={NotFound} /></Switch></Suspense></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;