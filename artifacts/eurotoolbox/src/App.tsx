import { lazy, Suspense, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowRight, Baby, BadgeEuro, BookOpen, CalendarDays, Calculator, Copy,
  FileImage, FileText, Globe2, ImageDown, KeyRound, Landmark, Menu, Percent,
  RefreshCw, Search, ShieldCheck, Sparkles, Timer, Type, X, Zap
} from 'lucide-react';

const queryClient = new QueryClient();
const LazyHomePage = lazy(() => import('./home-page'));
const LazyToolPage = lazy(() => import('./tool-page'));

export type Tool = { slug: string; name: string; description: string; category: string; icon: ReactNode; color: string };
export type ToolSeo = { title: string; description: string; intro: string; steps: string[]; features: string[]; faq: [string, string][] };

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
export const toolSeo: Record<string, ToolSeo> = {
  'word-counter': {
    title: 'Word Counter Online – Free and Private | EuroToolBox',
    description: 'Count words, characters, lines and reading time in your text with a free browser-based word counter.',
    intro: 'A quick word counter for essays, applications, articles and any text you need to understand at a glance.',
    steps: ['Paste or type your text into the editor.', 'Review the live word, character and line totals.', 'Copy the text or reset the editor when you are finished.'],
    features: ['Live word and character totals', 'Characters with and without spaces', 'Approximate reading time'],
    faq: [['Does this word counter upload my text?', 'No. Text is counted in your browser and is not sent to a server.'], ['Does punctuation affect the word count?', 'Punctuation stays attached to words and does not create extra words.']]
  },
  'character-counter': {
    title: 'Character Counter – Count Characters Online | EuroToolBox',
    description: 'Count characters with or without spaces in a private, free online character counter.',
    intro: 'Check text length for forms, social posts, metadata, applications and any field with a character limit.',
    steps: ['Enter or paste text into the editor.', 'Use the live totals to check characters with or without spaces.', 'Copy your text or clear the editor for a new count.'],
    features: ['Characters including spaces', 'Characters excluding whitespace', 'Line and word context'],
    faq: [['Are line breaks counted?', 'Yes. Every character in the text area, including line breaks, contributes to the total.']]
  },
  'case-converter': {
    title: 'Case Converter – Uppercase, Lowercase and Title Case | EuroToolBox',
    description: 'Convert text to uppercase, lowercase, title case or sentence case directly in your browser.',
    intro: 'Fix inconsistent capitalization without retyping a paragraph. The original text remains editable after conversion.',
    steps: ['Paste text into the editor.', 'Choose the capitalization style you need.', 'Apply the transformation and copy the result.'],
    features: ['Uppercase and lowercase conversion', 'Title case for headings', 'Sentence case for readable prose'],
    faq: [['Can I edit the converted text?', 'Yes. The result stays in the editor so you can make final corrections before copying it.']]
  },
  'text-cleaner': {
    title: 'Text Cleaner – Remove Extra Spaces and Empty Lines | EuroToolBox',
    description: 'Clean pasted text by removing repeated spaces, empty lines and trailing whitespace.',
    intro: 'Turn messy copied text into a cleaner draft while keeping its basic line structure.',
    steps: ['Paste the text you want to tidy.', 'Choose the clean action to collapse whitespace and empty lines.', 'Review the result before copying it.'],
    features: ['Collapses repeated spaces', 'Removes excessive blank lines', 'Trims leading and trailing whitespace'],
    faq: [['Will formatting be preserved?', 'Basic line breaks are preserved, but rich formatting such as bold or colour is not.']]
  },
  'duplicate-line-remover': {
    title: 'Remove Duplicate Lines Online – Free Text Tool | EuroToolBox',
    description: 'Remove repeated lines from a list while keeping the first occurrence in its original order.',
    intro: 'Useful for cleaning tags, lists, exports and pasted data without installing a spreadsheet tool.',
    steps: ['Paste one item or line per row.', 'Apply the duplicate removal action.', 'Check the unique list and copy it when ready.'],
    features: ['Keeps the first occurrence', 'Preserves original order', 'Ignores blank lines'],
    faq: [['Are duplicate lines case-sensitive?', 'Yes. Lines are compared as written after surrounding whitespace is trimmed.']]
  },
  'percentage-calculator': {
    title: 'Percentage Calculator – Free Online Calculator | EuroToolBox',
    description: 'Calculate a percentage of an amount and compare proportions with a simple browser-based calculator.',
    intro: 'Work out everyday percentages for budgets, reports, tips, discounts and quick checks.',
    steps: ['Enter the base amount.', 'Enter the percentage you want to calculate.', 'Read the result and the proportion context.'],
    features: ['Percentage of an amount', 'Clear decimal result', 'No account or server required'],
    faq: [['Does it round the result?', 'The displayed result is rounded to two decimal places for practical everyday use.']]
  },
  'discount-calculator': {
    title: 'Discount Calculator – Find Sale Price and Savings | EuroToolBox',
    description: 'Calculate a discounted sale price and the amount saved from an original price.',
    intro: 'Check sale prices quickly before you buy, compare offers and understand exactly what a percentage discount saves.',
    steps: ['Enter the original price.', 'Enter the discount percentage.', 'Review the final price and amount saved.'],
    features: ['Sale price', 'Amount saved', 'Simple percentage input'],
    faq: [['Does this include sales tax?', 'No. It only applies the discount percentage to the original amount.']]
  },
  'bmi-calculator': {
    title: 'BMI Calculator – Estimate Body Mass Index | EuroToolBox',
    description: 'Estimate BMI from height and weight with a clear browser-based BMI calculator.',
    intro: 'Use height in centimetres and weight in kilograms to get a quick BMI estimate for general context.',
    steps: ['Enter your weight in kilograms.', 'Enter your height in centimetres.', 'Read the estimate and reference range context.'],
    features: ['Metric inputs', 'Immediate estimate', 'Plain-language reference range'],
    faq: [['Is BMI medical advice?', 'No. BMI is a broad screening measure and should not replace advice from a qualified professional.']]
  },
  'loan-calculator': {
    title: 'Loan Calculator – Estimate Monthly Payments | EuroToolBox',
    description: 'Estimate monthly loan payments and total interest from amount, term and annual rate.',
    intro: 'Explore a repayment scenario quickly with a standard amortising-loan estimate.',
    steps: ['Enter the loan amount.', 'Choose the term in years and annual interest rate.', 'Review the estimated monthly payment and interest.'],
    features: ['Monthly payment estimate', 'Total interest context', 'Works without an account'],
    faq: [['Are fees included?', 'No. The estimate does not include lender fees, insurance, taxes or changing rates.']]
  },
  'vat-calculator': {
    title: 'VAT Calculator – Add VAT to a Net Price | EuroToolBox',
    description: 'Calculate VAT and a gross price from a net amount and adjustable VAT percentage.',
    intro: 'Add VAT to a net price for a quick everyday estimate. Rates vary by country and product, so always confirm the applicable rate.',
    steps: ['Enter the net amount.', 'Enter the VAT rate for your situation.', 'Review the VAT amount and gross total.'],
    features: ['Adjustable VAT rate', 'Net, VAT and gross context', 'Clear tax disclaimer'],
    faq: [['Does this know my country’s VAT rate?', 'No. Enter the rate that applies to your country, product and situation.']]
  },
  'age-calculator': {
    title: 'Age Calculator – Calculate Exact Age from Date of Birth | EuroToolBox',
    description: 'Calculate an exact age in years, months and days between a date of birth and a chosen date.',
    intro: 'Find an exact calendar age for forms, milestones and planning without doing date arithmetic by hand.',
    steps: ['Enter the date of birth.', 'Choose the date to calculate on.', 'Read the years, months and days result.'],
    features: ['Calendar-aware calculation', 'Choose any reference date', 'No date leaves your browser'],
    faq: [['Can I calculate an age in the past or future?', 'Yes. Change the calculation date to any valid date.']]
  },
  'image-tools': {
    title: 'Image Compressor and Converter – Resize Images Online | EuroToolBox',
    description: 'Resize, compress and convert JPG, PNG or WebP images locally in your browser.',
    intro: 'A lightweight image utility for preparing uploads, reducing file size or switching between common formats.',
    steps: ['Choose an image from your device.', 'Set an optional width, format and quality.', 'Download the processed image.'],
    features: ['Local canvas processing', 'JPG, PNG and WebP output', 'Optional width and quality controls'],
    faq: [['Are my images uploaded?', 'No. The processing happens in the browser tab and the selected file is not sent to EuroToolBox.']]
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF – Save an Image as PDF | EuroToolBox',
    description: 'Prepare a JPG or image for PDF export using your browser’s print-to-PDF workflow.',
    intro: 'Create a PDF from an image without uploading it. The native print dialog handles the final PDF file on your device.',
    steps: ['Choose a JPG, PNG or WebP image.', 'Preview the image to confirm it is correct.', 'Choose Print / save as PDF and select Save as PDF in the dialog.'],
    features: ['Browser-only image preview', 'Native PDF export path', 'Explicit support limitation'],
    faq: [['Why does it use the print dialog?', 'Browsers cannot guarantee a universal PDF writer without a PDF library. Native print-to-PDF is broadly supported and keeps the file local.']]
  },
  'date-calculator': {
    title: 'Date Calculator – Days Between Dates and Date Addition | EuroToolBox',
    description: 'Count days between dates and add days to a starting date with a free date calculator.',
    intro: 'Answer common scheduling questions such as how many days separate two dates or what date comes after a given number of days.',
    steps: ['Choose the start and end dates.', 'Read the absolute day difference.', 'Enter days to add to see the resulting date.'],
    features: ['Days between dates', 'Add days to a date', 'Calendar-based browser calculation'],
    faq: [['Does it count inclusive dates?', 'The difference shows elapsed days between the two selected calendar dates.']]
  },
  'unit-converter': {
    title: 'Unit Converter – Length, Weight and Temperature | EuroToolBox',
    description: 'Convert common length, weight and temperature units with a quick browser-based converter.',
    intro: 'Convert everyday measurements without opening a separate calculator or searching for a conversion table.',
    steps: ['Choose a measurement category.', 'Enter a value and choose its unit.', 'Read the converted value in the result panel.'],
    features: ['Length conversions', 'Weight conversions', 'Celsius and Fahrenheit'],
    faq: [['Are results exact?', 'Results are rounded for display and intended for everyday conversions, not precision engineering.']]
  },
  'time-zone-converter': {
    title: 'Time Zone Converter – Compare Cities and Local Times | EuroToolBox',
    description: 'Convert a date and time across European, American and Asian time zones using browser time-zone rules.',
    intro: 'Compare a moment across cities while accounting for the time-zone data available in your browser.',
    steps: ['Choose a date and time.', 'Select the destination time zone.', 'Read the localized date and time.'],
    features: ['Browser Intl time-zone data', 'Daylight-saving-aware formatting', 'European and global zones'],
    faq: [['Which time zones are supported?', 'The tool includes a focused set of common European and global zones and can be extended later.']]
  },
  'currency-converter': {
    title: 'Currency Converter – Reference Rates with Clear Limits | EuroToolBox',
    description: 'Compare common currencies with clearly labelled static reference rates while live rates are unavailable.',
    intro: 'Use this converter for rough orientation only. It intentionally does not claim to provide live market or bank rates.',
    steps: ['Enter an amount.', 'Choose the source currency.', 'Choose the target currency and read the reference result.'],
    features: ['Common European and global currencies', 'Clear unavailable-live-rates notice', 'No API key or account required'],
    faq: [['Are these live exchange rates?', 'No. Rates are static reference values for orientation only. Check a live provider or your bank before making a payment.']]
  },
  'cv-builder': {
    title: 'CV Builder – Create a Printable Curriculum Vitae | EuroToolBox',
    description: 'Build a clean CV with a live preview and print or save it as a PDF from your browser.',
    intro: 'Draft a focused one-page CV from a few essential details, then print it or save it as a PDF.',
    steps: ['Enter your name, target role and contact details.', 'Write a short profile and add key skills.', 'Use Print CV and choose Save as PDF if needed.'],
    features: ['Live preview', 'Printable layout', 'No account or upload required'],
    faq: [['Can I add more sections?', 'The starter builder focuses on the core profile and skills. You can add more detail after saving or printing the draft.']]
  },
  'cover-letter-generator': {
    title: 'Cover Letter Generator – Create a Job Application Draft | EuroToolBox',
    description: 'Generate an editable cover-letter starting draft from your name, company, role and preferred tone.',
    intro: 'Start a tailored cover letter faster, then edit the draft with your own achievements and evidence before sending it.',
    steps: ['Enter your name, company and target role.', 'Choose a tone that fits the application.', 'Generate, edit, copy or download your draft.'],
    features: ['Structured first draft', 'Editable output', 'Plain-text download'],
    faq: [['Does this use an AI service?', 'No. The basic draft is generated from a local template in your browser.']]
  }
};

const fileSeo = (name: string, description: string, intro: string): ToolSeo => ({
  title: `${name} – Free Browser Tool | EuroToolBox`,
  description,
  intro,
  steps: ['Choose a file from your device.', 'Adjust the available options and start the browser-side process.', 'Download the result when it is ready.'],
  features: ['Browser-side processing', 'Clear file-state feedback', 'No account required'],
  faq: [['Are my files uploaded?', 'These file operations run in your browser. Your selected files are not sent to a EuroToolBox server.']]
});

Object.assign(toolSeo, {
  'image-compressor': fileSeo('Image Compressor', 'Compress JPG, PNG or WebP images online with local quality controls.', 'Reduce image file size before uploading it to a form, website or message.'),
  'image-resizer': fileSeo('Image Resizer', 'Resize an image to a chosen width in your browser and download the result.', 'Prepare an image for a profile, listing or upload without handing it to a remote service.'),
  'jpg-to-png': fileSeo('JPG to PNG', 'Convert a JPG image to PNG locally with a free browser-based converter.', 'Switch a JPG into a PNG copy when you need a lossless output format.'),
  'png-to-jpg': fileSeo('PNG to JPG', 'Convert a PNG image to JPG with adjustable quality in your browser.', 'Create a smaller JPG copy of a PNG for sharing or uploading.'),
  'webp-converter': fileSeo('WebP Converter', 'Convert common image files to WebP locally for smaller web-ready downloads.', 'Create a WebP version without uploading the source image.'),
  'image-cropper': fileSeo('Image Cropper', 'Crop the top-left portion of an image to a chosen size in your browser.', 'Prepare a focused image crop using exact pixel dimensions.'),
  'pdf-to-word': fileSeo('PDF to Word', 'Extract selectable PDF text into an editable text document in your browser.', 'Extract text from a text-based PDF for editing. Scanned or image-only pages need OCR and may not produce text.'),
  'word-to-pdf': fileSeo('Word to PDF', 'Create and download a PDF from text directly in your browser.', 'Turn plain document content into a simple, selectable PDF without an upload.'),
  'merge-pdf': fileSeo('Merge PDF', 'Combine multiple PDF files into one downloadable PDF in your browser.', 'Join PDFs locally for a single document that is easier to share or archive.'),
  'split-pdf': fileSeo('Split PDF', 'Extract selected pages from a PDF into a new downloadable file.', 'Keep only the pages you need from a larger PDF.'),
  'compress-pdf': fileSeo('Compress PDF', 'Re-save a PDF with browser-side optimization where the document allows it.', 'Create a fresh PDF copy with object streams enabled. Results vary by source document.'),
  'pdf-to-jpg': fileSeo('PDF to JPG', 'Render PDF pages to downloadable JPG images in your browser.', 'Turn pages from a text or image PDF into separate image files for easy sharing.'),
  'salary-calculator': {
    title: 'Salary Calculator – Estimate Take-Home Pay | EuroToolBox',
    description: 'Estimate monthly or yearly take-home salary after a simple percentage deduction.',
    intro: 'Compare gross salary and a simple deduction estimate without treating the result as payroll advice.',
    steps: ['Enter the gross salary.', 'Choose monthly or yearly input and enter a deduction percentage.', 'Review the estimated take-home amount and the corresponding period.'],
    features: ['Monthly or yearly input', 'Adjustable deduction estimate', 'Clear payroll disclaimer'],
    faq: [['Does this calculate local tax?', 'No. It is a broad percentage estimate. Real payroll depends on country, tax band, pension, benefits and other deductions.']]
  }
});

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
    <footer className="border-t border-border bg-card"><div className="mx-auto flex max-w-[1360px] flex-col gap-7 px-5 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10"><div><Link href="/" data-testid="link-footer-home" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-[11px] bg-secondary text-secondary-foreground shadow-sm"><KeyRound size={19} strokeWidth={2.5} /></span><span><span className="block font-display text-lg font-bold leading-none tracking-tight">EuroToolBox</span><span className="mt-0.5 block font-mono-ui text-[9px] uppercase tracking-[.15em] text-muted-foreground">Everyday utility</span></span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">Free online tools for everyday life. Built to be fast, private and pleasantly obvious.</p></div><div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">{['Text', 'Numbers', 'Files', 'Work'].map(c => <a key={c} href={`/#${c.toLowerCase()}`} className="hover:text-foreground">{c} tools</a>)}<span className="flex items-center gap-1.5 text-accent"><ShieldCheck size={15} />No uploads by default</span></div><p className="font-mono-ui text-[10px] uppercase tracking-widest text-muted-foreground">Made for the open web · 2025</p></div></footer>
  </div>;
}

function RouteLoading() {
  return <div className="grid min-h-[50vh] place-items-center p-8 text-sm text-muted-foreground">Loading tool…</div>;
}

function Router() {
  return <ErrorBoundary><Suspense fallback={<RouteLoading />}><Switch><Route path="/" component={LazyHomePage} /><Route path="/tools/:tool" component={LazyToolPage} /><Route path="/:tool" component={LazyToolPage} /><Route component={NotFound} /></Switch></Suspense></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;