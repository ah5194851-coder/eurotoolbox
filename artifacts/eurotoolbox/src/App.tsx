import { type ChangeEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
import {
  ArrowRight, Baby, BadgeEuro, BookOpen, CalendarDays, Calculator, Check, ChevronDown,
  Copy, Download, FileImage, FileText, Globe2, ImageDown, KeyRound,
  Landmark, Menu, Percent, Printer, RefreshCw, Search, ShieldCheck, Sparkles, Timer,
  Type, Upload, X, Zap
} from 'lucide-react';

const queryClient = new QueryClient();
GlobalWorkerOptions.workerSrc = pdfWorker;

type Tool = { slug: string; name: string; description: string; category: string; icon: ReactNode; color: string };
type ToolSeo = { title: string; description: string; intro: string; steps: string[]; features: string[]; faq: [string, string][] };
const tools: Tool[] = [
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
const categories = ['All tools', 'Text', 'Numbers', 'Files', 'PDF', 'Time', 'Everyday', 'Work'];
const toolSeo: Record<string, ToolSeo> = {
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
    faq: [['Can I edit the converted text?', 'Yes. The result stays in the editor so you can make final corrections before copying.']]
  },
  'text-cleaner': {
    title: 'Text Cleaner – Remove Extra Spaces and Empty Lines | EuroToolBox',
    description: 'Clean pasted text by removing repeated spaces, empty lines and trailing whitespace.',
    intro: 'Turn messy copied text into a cleaner draft while keeping its basic line structure.',
    steps: ['Paste the text you want to tidy.', 'Choose the clean action to collapse whitespace and empty lines.', 'Review the result before copying it elsewhere.'],
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

function HashIcon() { return <span className="font-mono-ui text-[1.3em] font-bold leading-none">#</span>; }

function Button({ children, onClick, variant = 'primary', type = 'button', disabled, className = '', testId }: { children: ReactNode; onClick?: () => void; variant?: 'primary' | 'quiet' | 'outline' | 'yellow'; type?: 'button' | 'submit'; disabled?: boolean; className?: string; testId?: string }) {
  const styles = { primary: 'bg-primary text-primary-foreground hover:-translate-y-0.5 shadow-sm', quiet: 'bg-muted text-foreground hover:bg-secondary', outline: 'border border-border bg-card hover:border-primary hover:text-primary', yellow: 'bg-secondary text-secondary-foreground hover:-translate-y-0.5' };
  return <button data-testid={testId} type={type} onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-transform disabled:pointer-events-none disabled:opacity-45 ${styles[variant]} ${className}`}>{children}</button>;
}
function Field({ label, value, onChange, type = 'text', placeholder = '', min, step = 'any' }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; min?: string; step?: string }) {
  return <label className="grid gap-1.5 text-sm font-medium text-foreground"><span>{label}</span><input data-testid={`input-${label.toLowerCase().replaceAll(' ', '-')}`} className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" value={value} onChange={e => onChange(e.target.value)} type={type} placeholder={placeholder} min={min} step={step} /></label>;
}
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return <label className="grid gap-1.5 text-sm font-medium"><span>{label}</span><select data-testid={`select-${label.toLowerCase().replaceAll(' ', '-')}`} className="rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none focus:border-primary" value={value} onChange={e => onChange(e.target.value)}>{options.map(o => <option key={o}>{o}</option>)}</select></label>;
}
function Result({ title, children, tone = 'blue' }: { title: string; children: ReactNode; tone?: string }) {
  return <div className={`rounded-xl border p-5 animate-fade ${tone === 'yellow' ? 'border-secondary/60 bg-secondary/15' : tone === 'teal' ? 'border-accent/30 bg-accent/10' : 'border-primary/15 bg-primary/[.045]'}`}><p className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground">{title}</p><div className="mt-2 text-2xl font-bold font-display">{children}</div></div>;
}
function Logo() { return <Link href="/" data-testid="link-home" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-[11px] bg-secondary text-secondary-foreground shadow-sm"><KeyRound size={19} strokeWidth={2.5} /></span><span><span className="block font-display text-lg font-bold leading-none tracking-tight">EuroToolBox</span><span className="mt-0.5 block font-mono-ui text-[9px] uppercase tracking-[.15em] text-muted-foreground">Everyday utility</span></span></Link>; }

function Shell({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const matching = useMemo(() => search.length > 1 ? tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5) : [], [search]);
  const go = (path: string) => { setLocation(path); setSearch(''); setMenuOpen(false); };
  return <div className="noise min-h-[100dvh] bg-background">
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1360px] items-center gap-5 px-5 lg:px-10">
        <Logo />
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
    <footer className="border-t border-border bg-card"><div className="mx-auto flex max-w-[1360px] flex-col gap-7 px-5 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10"><div><Logo /><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">Free online tools for everyday life. Built to be fast, private and pleasantly obvious.</p></div><div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">{['Text', 'Numbers', 'Files', 'Work'].map(c => <a key={c} href={`/#${c.toLowerCase()}`} className="hover:text-foreground">{c} tools</a>)}<span className="flex items-center gap-1.5 text-accent"><ShieldCheck size={15} />No uploads by default</span></div><p className="font-mono-ui text-[10px] uppercase tracking-widest text-muted-foreground">Made for the open web · 2025</p></div></footer>
  </div>;
}

function Home() {
  const [active, setActive] = useState('All tools');
  const [search, setSearch] = useState('');
  const filtered = tools.filter(t => (active === 'All tools' || t.category === active) && t.name.toLowerCase().includes(search.toLowerCase()));
  useEffect(() => { document.title = 'EuroToolBox · Free Online Tools for Everyday Life'; }, []);
  return <Shell><main>
    <section className="paper-grid overflow-hidden border-b border-border"><div className="mx-auto grid max-w-[1360px] gap-10 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-24">
      <div className="animate-rise"><p className="mb-5 flex items-center gap-2 font-mono-ui text-[11px] font-bold uppercase tracking-[.2em] text-accent"><span className="h-2 w-2 rounded-full bg-accent" />Open toolbox · no sign-up</p><h1 className="max-w-3xl font-display text-5xl font-semibold leading-[.98] tracking-[-.045em] text-foreground sm:text-6xl lg:text-[78px]">Small tools.<br /><span className="text-primary">Clearer days.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">EuroToolBox is the calm corner of the internet for everyday conversions, calculations and documents. Do the thing, keep your data.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#tools" data-testid="link-explore-tools" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Explore the toolbox <ArrowRight size={17} /></a><a href="#privacy" data-testid="link-privacy-promise" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-semibold hover:border-primary"><ShieldCheck size={17} className="text-accent" />Privacy first</a></div></div>
     <div className="relative mx-auto w-full max-w-[520px] animate-rise [animation-delay:120ms]"><div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-secondary/60 blur-2xl" /><div className="relative rounded-[24px] border border-border bg-card p-3 shadow-xl rotate-[1deg]"><div className="rounded-[17px] bg-primary p-6 text-primary-foreground"><div className="flex items-center justify-between"><span className="font-mono-ui text-[10px] uppercase tracking-[.2em] opacity-70">EURO / TBX / 001</span><Zap size={18} className="text-secondary" /></div><div className="mt-16 font-display text-4xl font-semibold tracking-tight">Your digital<br />utility cabinet.</div><div className="mt-16 flex items-end justify-between"><span className="text-sm opacity-75">19 tools ready to use</span><span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-secondary-foreground"><ArrowRight /></span></div></div></div><div className="absolute -bottom-5 -left-5 rounded-xl border border-border bg-secondary px-4 py-3 shadow-md"><p className="font-mono-ui text-[10px] uppercase tracking-wider">local processing</p><p className="mt-1 text-sm font-bold">Your files stay yours.</p></div></div>
    </div></section>
    <section id="tools" className="mx-auto max-w-[1360px] px-5 py-16 lg:px-10 lg:py-24"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">The cabinet</p><h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">Open a drawer.</h2><p className="mt-3 max-w-xl text-muted-foreground">Everything runs in your browser where it can. No accounts. No busywork.</p></div><div className="relative w-full md:max-w-[290px]"><Search size={16} className="absolute left-3 top-3 text-muted-foreground" /><input data-testid="input-home-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search all tools" className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary" /></div></div>
      <div className="mt-9 flex gap-2 overflow-x-auto pb-2">{categories.map(c => <button data-testid={`button-category-${c.toLowerCase().replace(' ', '-')}`} key={c} onClick={() => setActive(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${active === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'}`}>{c}</button>)}</div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}</div>
      {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-border py-16 text-center"><Search className="mx-auto text-muted-foreground" /><p className="mt-3 font-semibold">No tools match that search.</p><button onClick={() => setSearch('')} className="mt-2 text-sm text-primary underline">Clear search</button></div>}
    </section>
    <section id="privacy" className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-[1360px] gap-8 px-5 py-14 lg:grid-cols-[.8fr_1.2fr] lg:px-10"><div><p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-secondary">The quiet promise</p><h2 className="mt-3 max-w-lg font-display text-4xl font-semibold leading-tight">A utility box should not ask for your life story.</h2></div><div className="grid gap-5 sm:grid-cols-3">{[['01', 'Browser-first', 'Text, numbers and most image work happen on this device.'], ['02', 'No fake live data', 'When a service needs the internet, we say so plainly.'], ['03', 'Easy to leave', 'Download your result, print it, and close the tab.']].map(([n, t, d]) => <div key={n} className="border-t border-primary-foreground/20 pt-4"><span className="font-mono-ui text-xs text-secondary">{n}</span><h3 className="mt-7 font-display text-xl">{t}</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/70">{d}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-[1360px] px-5 py-16 lg:px-10 lg:py-24"><div className="grid gap-6 lg:grid-cols-[1fr_1.7fr]"><div><p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Start here</p><h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">Popular right now.</h2></div><div className="grid gap-3 sm:grid-cols-3">{['word-counter', 'vat-calculator', 'cv-builder'].map(slug => { const t = tools.find(x => x.slug === slug)!; return <Link key={slug} href={`/tools/${slug}`} data-testid={`link-popular-${slug}`} className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-md"><div className="flex items-start justify-between"><span className="text-primary">{t.icon}</span><ArrowRight size={17} className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" /></div><h3 className="mt-8 font-display text-xl">{t.name}</h3><p className="mt-1 text-sm text-muted-foreground">{t.description}</p></Link>; })}</div></div></section>
  </main></Shell>;
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  return <Link href={`/tools/${tool.slug}`} data-testid={`card-tool-${tool.slug}`} className="group animate-rise rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-md" style={{ animationDelay: `${index * 35}ms` }}><div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-lg ${tool.color === 'yellow' ? 'bg-secondary text-secondary-foreground' : tool.color === 'teal' ? 'bg-accent/15 text-accent' : tool.color === 'coral' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>{tool.icon}</span><ArrowRight size={17} className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" /></div><p className="mt-5 font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground">{tool.category}</p><h3 className="mt-1.5 font-display text-xl font-semibold">{tool.name}</h3><p className="mt-1.5 text-sm leading-6 text-muted-foreground">{tool.description}</p></Link>;
}

function updateMeta(selector: string, attributes: Record<string, string>, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function ToolSeoContent({ tool, seo }: { tool: Tool; seo: ToolSeo }) {
  return <section className="mt-14 border-t border-border pt-12">
    <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">About this tool</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">A clearer way to use {tool.name.toLowerCase()}.</h2>
        <p className="mt-4 leading-7 text-muted-foreground">{seo.intro}</p>
      </div>
      <div>
        <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">How to use it</p>
        <ol className="mt-4 grid gap-3">
          {seo.steps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary font-mono-ui text-xs font-bold text-secondary-foreground">{index + 1}</span><span>{step}</span></li>)}
        </ol>
      </div>
    </div>
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {seo.features.map(feature => <div key={feature} className="rounded-xl border border-border bg-card p-4 text-sm font-semibold">{feature}</div>)}
    </div>
    <div className="mt-12">
      <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">Frequently asked questions</p>
      <div className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
        {seo.faq.map(([question, answer]) => <details key={question} className="group p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{question}<ChevronDown size={16} className="shrink-0 transition group-open:rotate-180" /></summary>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{answer}</p>
        </details>)}
      </div>
    </div>
  </section>;
}

function ToolPage() {
  const { tool: slug } = useParams<{ tool: string }>();
  const tool = tools.find(t => t.slug === slug);
  const seo = toolSeo[slug || ''] ?? { title: 'Tool not found · EuroToolBox', description: 'The requested EuroToolBox tool could not be found.', intro: '', steps: [], features: [], faq: [] };
  useEffect(() => {
    document.title = tool ? seo.title : 'Tool not found · EuroToolBox';
    updateMeta('meta[name="description"]', { name: 'description' }, seo.description);
    updateMeta('meta[property="og:title"]', { property: 'og:title' }, document.title);
    updateMeta('meta[property="og:description"]', { property: 'og:description' }, seo.description);
    updateMeta('meta[property="og:url"]', { property: 'og:url' }, window.location.href);
    updateMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, document.title);
    updateMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, seo.description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = window.location.href.split('#')[0];
    return () => {
      document.title = 'EuroToolBox · Free Online Tools for Everyday Life';
      updateMeta('meta[name="description"]', { name: 'description' }, 'Fast, free browser tools for text, calculations, images, dates, careers and everyday tasks. Your files stay on your device whenever supported.');
    };
  }, [seo, tool]);
  if (!tool) return <NotFound />;
  return <Shell><main className="mx-auto max-w-[1160px] px-5 py-10 lg:px-10 lg:py-16"><div className="mb-9 flex items-center gap-2 text-sm text-muted-foreground"><Link href="/" className="hover:text-foreground">Toolbox</Link><span>/</span><span>{tool.category}</span><span>/</span><span className="text-foreground">{tool.name}</span></div><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><div className="lg:sticky lg:top-28"><span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-secondary-foreground">{tool.icon}</span><p className="mt-6 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">{tool.category} utility</p><h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{tool.name}</h1><p className="mt-4 max-w-sm leading-7 text-muted-foreground">{tool.description} Built for quick answers, with your inputs staying in your browser.</p><div className="mt-7 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={16} className="text-accent" />Private by default · No account needed</div></div><div><div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">{renderTool(slug)}</div><RelatedTools current={slug} /></div></div><ToolSeoContent tool={tool} seo={seo} /></main></Shell>;
}

function TextTool({ kind }: { kind: 'counter' | 'case' | 'cleaner' | 'duplicates' }) {
  const [text, setText] = useState('');
  const [caseType, setCaseType] = useState('Sentence case');
  const stats = { words: text.trim() ? text.trim().split(/\s+/).length : 0, chars: text.length, charsNoSpace: text.replace(/\s/g, '').length, lines: text ? text.split(/\r?\n/).length : 0 };
  const transform = () => { if (kind === 'case') { const next = caseType === 'UPPERCASE' ? text.toUpperCase() : caseType === 'lowercase' ? text.toLowerCase() : caseType === 'Title Case' ? text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase()); setText(next); } else if (kind === 'cleaner') setText(text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()); else if (kind === 'duplicates') { const seen = new Set<string>(); setText(text.split(/\r?\n/).filter(line => { const key = line.trim(); if (!key || seen.has(key)) return false; seen.add(key); return true; }).join('\n')); } };
  const copy = () => navigator.clipboard?.writeText(text);
  return <div className="grid gap-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2 text-xs font-mono-ui text-muted-foreground"><span>{stats.words} words</span><span>·</span><span>{stats.chars} characters</span><span>·</span><span>{stats.lines} lines</span></div><div className="flex gap-2"><Button variant="quiet" onClick={() => setText('')}><RefreshCw size={15} />Reset</Button><Button variant="outline" onClick={copy}><Copy size={15} />Copy</Button></div></div>{kind === 'case' && <SelectField label="Transform to" value={caseType} onChange={setCaseType} options={['Sentence case', 'UPPERCASE', 'lowercase', 'Title Case']} />}<textarea data-testid="textarea-text-tool" value={text} onChange={e => setText(e.target.value)} placeholder={kind === 'duplicates' ? 'Paste one item per line...' : 'Type or paste your text here...'} className="min-h-[280px] resize-y rounded-xl border border-input bg-background p-4 text-[15px] leading-7 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />{kind !== 'counter' && <Button onClick={transform}>{kind === 'case' ? 'Apply case' : kind === 'cleaner' ? 'Clean my text' : 'Remove duplicate lines'} <ArrowRight size={16} /></Button>}<div className="grid gap-3 sm:grid-cols-3"><Result title="Words">{stats.words}</Result><Result title="Characters">{stats.chars}</Result><Result title="Without spaces" tone="teal">{stats.charsNoSpace}</Result></div>{kind === 'counter' && <p className="text-xs text-muted-foreground">Reading time: approximately {Math.max(0, Math.ceil(stats.words / 220))} minute{Math.ceil(stats.words / 220) === 1 ? '' : 's'} at a relaxed pace.</p>}</div>;
}

function NumberTool({ kind }: { kind: string }) {
  const [a, setA] = useState(kind === 'bmi' ? '72' : kind === 'loan' ? '12000' : '100'); const [b, setB] = useState(kind === 'bmi' ? '178' : kind === 'loan' ? '5' : '20'); const [c, setC] = useState(kind === 'loan' ? '6.5' : kind === 'vat' ? '21' : '15');
  const n = (v: string) => Number(v) || 0; let title = 'Result'; let value = ''; let detail = '';
  if (kind === 'percentage') { value = `${(n(a) * n(b) / 100).toFixed(2)}`; title = `${b}% of ${a}`; detail = `${a} is ${n(a) ? ((n(b) / n(a)) * 100).toFixed(2) : '0'}% of ${b}.`; }
  if (kind === 'discount') { const saved = n(a) * n(b) / 100; value = `${(n(a) - saved).toFixed(2)}`; title = 'Sale price'; detail = `You save ${saved.toFixed(2)} (${b}%).`; }
  if (kind === 'bmi') { const bmi = n(a) / ((n(b) / 100) ** 2); value = bmi ? bmi.toFixed(1) : '—'; title = 'Estimated BMI'; detail = bmi < 18.5 ? 'Below the usual reference range.' : bmi < 25 ? 'Within the usual reference range.' : bmi < 30 ? 'Above the usual reference range.' : 'In the higher reference range.'; }
  if (kind === 'loan') { const rate = n(c) / 1200; const months = n(b) * 12; const payment = rate ? n(a) * rate * (1 + rate) ** months / ((1 + rate) ** months - 1) : n(a) / months; value = payment ? payment.toFixed(2) : '—'; title = 'Monthly payment'; detail = `Approx. total interest: ${(payment * months - n(a)).toFixed(2)}.`; }
  if (kind === 'vat') { const gross = n(a) * (1 + n(b) / 100); value = gross.toFixed(2); title = 'Price including VAT'; detail = `VAT amount: ${(gross - n(a)).toFixed(2)}. To remove VAT, use gross ÷ (1 + rate).`; }
  const fields = kind === 'percentage' ? [['Base amount', a, setA], ['Percentage', b, setB]] : kind === 'discount' ? [['Original price', a, setA], ['Discount %', b, setB]] : kind === 'bmi' ? [['Weight (kg)', a, setA], ['Height (cm)', b, setB]] : kind === 'loan' ? [['Loan amount', a, setA], ['Term (years)', b, setB], ['Annual rate %', c, setC]] : [['Net price', a, setA], ['VAT rate %', b, setB]];
  return <div className="grid gap-6"><div className="grid gap-4 sm:grid-cols-2">{fields.map(([label, val, setter]) => <Field key={label as string} label={label as string} value={val as string} onChange={setter as (v: string) => void} type="number" min="0" />)}</div><div className="grid gap-3 sm:grid-cols-2"><Result title={title} tone={kind === 'discount' || kind === 'vat' ? 'yellow' : 'blue'}>{value || '—'}</Result><Result title="A little context" tone="teal"><span className="text-base leading-6">{detail}</span></Result></div><p className="text-xs text-muted-foreground">This is an estimate for everyday planning, not financial, medical or tax advice.</p></div>;
}

function DateTool({ kind }: { kind: 'age' | 'date' }) {
  const today = new Date().toISOString().slice(0, 10); const [from, setFrom] = useState('1990-05-14'); const [to, setTo] = useState(today); const [days, setDays] = useState('30');
  const diff = Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86400000);
  const age = () => { const birth = new Date(from); const now = new Date(to); let years = now.getFullYear() - birth.getFullYear(); let months = now.getMonth() - birth.getMonth(); let date = now.getDate() - birth.getDate(); if (date < 0) { months--; date += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); } if (months < 0) { years--; months += 12; } return `${Math.max(0, years)} years, ${Math.max(0, months)} months, ${Math.max(0, date)} days`; };
  const added = new Date(from); added.setDate(added.getDate() + (Number(days) || 0));
  return <div className="grid gap-5">{kind === 'age' ? <><div className="grid gap-4 sm:grid-cols-2"><Field label="Date of birth" value={from} onChange={setFrom} type="date" /><Field label="Calculate on" value={to} onChange={setTo} type="date" /></div><Result title="Exact age" tone="teal">{age()}</Result></> : <><div className="grid gap-4 sm:grid-cols-2"><Field label="From date" value={from} onChange={setFrom} type="date" /><Field label="To date" value={to} onChange={setTo} type="date" /></div><Result title="Difference" tone="yellow">{Math.abs(diff)} days</Result><div className="grid gap-4 sm:grid-cols-2"><Field label="Days to add" value={days} onChange={setDays} type="number" /><Result title="Resulting date">{added.toLocaleDateString(undefined, { dateStyle: 'medium' })}</Result></div></>}</div>;
}

function downloadBytes(bytes: Uint8Array, filename: string, type: string) {
  const copy = bytes.slice();
  const url = URL.createObjectURL(new Blob([copy.buffer as ArrayBuffer], { type }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function WordToPdf() {
  const [text, setText] = useState('Paste or write your document here.');
  const [status, setStatus] = useState('');
  const createPdf = async () => {
    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const lines = text.split(/\r?\n/).flatMap(line => {
      const words = line.split(/\s+/);
      const wrapped: string[] = [];
      let current = '';
      words.forEach(word => {
        const candidate = current ? `${current} ${word}` : word;
        if (candidate.length > 88) { wrapped.push(current); current = word; } else current = candidate;
      });
      wrapped.push(current);
      return wrapped;
    });
    let page = pdf.addPage([595, 842]);
    let y = 790;
    lines.forEach(line => {
      if (y < 55) { page = pdf.addPage([595, 842]); y = 790; }
      page.drawText(line, { x: 54, y, size: 11, font, color: rgb(0.12, 0.15, 0.22) });
      y -= 18;
    });
    downloadBytes(await pdf.save(), 'eurotoolbox-document.pdf', 'application/pdf');
    setStatus('PDF downloaded. Your text stayed in this browser tab.');
  };
  return <div className="grid gap-5"><div className="rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm leading-6">This creates a simple text PDF locally. Rich Word formatting is not imported.</div><textarea value={text} onChange={e => setText(e.target.value)} className="min-h-[320px] rounded-xl border border-input bg-background p-4 text-[15px] leading-7 outline-none focus:border-primary" /><Button onClick={createPdf} disabled={!text.trim()}><Download size={16} />Download PDF</Button>{status && <p className="text-sm text-accent">{status}</p>}</div>;
}

function PdfToWord() {
  const [file, setFile] = useState<File | null>(null); const [text, setText] = useState(''); const [status, setStatus] = useState('');
  const extract = async () => {
    if (!file) return;
    setStatus('Extracting selectable text…');
    const pdf = await getDocument({ data: await file.arrayBuffer() }).promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => 'str' in item ? item.str : '').join(' ');
      pages.push(pageText);
    }
    setText(pages.join('\n\n'));
    setStatus(pages.join('').trim() ? 'Text extracted. Review it before downloading.' : 'No selectable text found. This may be a scanned or image-only PDF.');
  };
  return <div className="grid gap-5"><div className="rounded-xl border border-secondary/60 bg-secondary/15 p-4 text-sm leading-6"><span className="font-semibold">Scanned PDF limitation.</span> Image-only PDFs need OCR and may not produce editable text here.</div><label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/35 bg-primary/[.035] p-6 text-center"><Upload className="text-primary" /><span className="mt-2 font-semibold">{file ? file.name : 'Choose a PDF'}</span><input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] ?? null)} className="sr-only" /></label><Button onClick={extract} disabled={!file}><FileText size={16} />Extract text</Button>{text && <><textarea value={text} onChange={e => setText(e.target.value)} className="min-h-[280px] rounded-xl border border-input bg-background p-4 text-[15px] leading-7 outline-none focus:border-primary" /><Button variant="outline" onClick={() => { const blob = new Blob([text], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'eurotoolbox-extracted-text.txt'; anchor.click(); URL.revokeObjectURL(url); }}><Download size={16} />Download editable text</Button></>}{status && <p className="text-sm text-muted-foreground">{status}</p>}</div>;
}

function PdfTool({ kind }: { kind: 'merge' | 'split' | 'compress' }) {
  const [files, setFiles] = useState<File[]>([]); const [range, setRange] = useState('1'); const [status, setStatus] = useState('');
  const parsePages = (input: string, total: number) => Array.from(new Set(input.split(',').flatMap(part => { const [start, end] = part.trim().split('-').map(Number); if (!start) return []; const last = end || start; return Array.from({ length: Math.max(0, last - start + 1) }, (_, index) => start + index - 1); }).filter(page => page >= 0 && page < total)));
  const run = async () => {
    setStatus('Working locally…');
    const output = await PDFDocument.create();
    if (kind === 'merge') {
      for (const file of files) { const source = await PDFDocument.load(await file.arrayBuffer()); const pages = await output.copyPages(source, source.getPageIndices()); pages.forEach(page => output.addPage(page)); }
    } else {
      const source = await PDFDocument.load(await files[0].arrayBuffer());
      const indices = kind === 'split' ? parsePages(range, source.getPageCount()) : source.getPageIndices();
      const pages = await output.copyPages(source, indices);
      pages.forEach(page => output.addPage(page));
    }
    downloadBytes(await output.save({ useObjectStreams: true }), `eurotoolbox-${kind}.pdf`, 'application/pdf');
    setStatus('Done. The new PDF was downloaded.');
  };
  const multiple = kind === 'merge';
  return <div className="grid gap-5"><label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/35 bg-primary/[.035] p-6 text-center"><Upload className="text-primary" /><span className="mt-2 font-semibold">{files.length ? `${files.length} PDF${files.length === 1 ? '' : 's'} selected` : `Choose ${multiple ? 'PDFs' : 'a PDF'}`}</span><span className="mt-1 text-sm text-muted-foreground">Files are processed locally in your browser.</span><input type="file" accept="application/pdf" multiple={multiple} onChange={e => setFiles(Array.from(e.target.files ?? []))} className="sr-only" /></label>{kind === 'split' && <Field label="Pages to keep" value={range} onChange={setRange} placeholder="For example: 1-3, 6" />}{kind === 'compress' && <p className="text-sm leading-6 text-muted-foreground">PDF compression depends on how the source was created. Re-saving can reduce overhead, but it cannot remove all embedded image weight without changing quality.</p>}<Button onClick={run} disabled={!files.length}><Download size={16} />{kind === 'merge' ? 'Merge PDFs' : kind === 'split' ? 'Create split PDF' : 'Create optimized PDF'}</Button>{status && <p className="text-sm text-accent">{status}</p>}</div>;
}

function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null); const [status, setStatus] = useState('');
  const render = async () => {
    if (!file) return;
    setStatus('Rendering pages locally…');
    const pdf = await getDocument({ data: await file.arrayBuffer() }).promise;
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber); const viewport = page.getViewport({ scale: 1.5 }); const canvas = document.createElement('canvas'); canvas.width = viewport.width; canvas.height = viewport.height;
      await page.render({ canvas, canvasContext: canvas.getContext('2d')!, viewport }).promise;
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', .9));
      if (blob) { const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `eurotoolbox-page-${pageNumber}.jpg`; anchor.click(); URL.revokeObjectURL(url); }
    }
    setStatus(`${pdf.numPages} page${pdf.numPages === 1 ? '' : 's'} rendered and downloaded.`);
  };
  return <div className="grid gap-5"><label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/35 bg-primary/[.035] p-6 text-center"><Upload className="text-primary" /><span className="mt-2 font-semibold">{file ? file.name : 'Choose a PDF'}</span><input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] ?? null)} className="sr-only" /></label><Button onClick={render} disabled={!file}><ImageDown size={16} />Render JPG pages</Button>{status && <p className="text-sm text-accent">{status}</p>}</div>;
}

function ImageTool({ pdf = false, crop = false, initialFormat = 'image/jpeg' }: { pdf?: boolean; crop?: boolean; initialFormat?: string }) {
  const [file, setFile] = useState<File | null>(null); const [url, setUrl] = useState(''); const [quality, setQuality] = useState('0.8'); const [format, setFormat] = useState(initialFormat); const [width, setWidth] = useState(''); const [cropWidth, setCropWidth] = useState(''); const [cropHeight, setCropHeight] = useState('');
  const load = (e: ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { setFile(f); setUrl(URL.createObjectURL(f)); } };
  const download = () => { if (!file || !url) return; const img = new Image(); img.onload = () => { const canvas = document.createElement('canvas'); const cropW = crop ? Number(cropWidth) || img.width : img.width; const cropH = crop ? Number(cropHeight) || img.height : img.height; const w = crop ? cropW : Number(width) || img.width; canvas.width = w; canvas.height = crop ? cropH : Math.round(img.height * w / img.width); canvas.getContext('2d')?.drawImage(img, 0, 0, cropW, cropH, 0, 0, canvas.width, canvas.height); const a = document.createElement('a'); a.href = canvas.toDataURL(format, Number(quality)); a.download = `eurotoolbox-${file.name.replace(/\.[^/.]+$/, '')}.${format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg'}`; a.click(); }; img.src = url; };
  if (pdf) return <div className="grid gap-5"><div className="rounded-xl border border-secondary/60 bg-secondary/15 p-5"><div className="flex gap-3"><FileText className="shrink-0 text-primary" /><div><p className="font-semibold">Browser limitation, made explicit</p><p className="mt-1 text-sm leading-6 text-muted-foreground">A browser cannot reliably write a universal PDF file without a PDF library. EuroToolBox prepares your image and opens the native print dialog instead — choose “Save as PDF” there. Your image never leaves this device.</p></div></div></div><ImageToolInput file={file} url={url} load={load} /><Button onClick={() => window.print()} disabled={!file}><Printer size={16} />Print / save as PDF</Button></div>;
  return <div className="grid gap-5"><ImageToolInput file={file} url={url} load={load} />{crop ? <div className="grid gap-4 sm:grid-cols-2"><Field label="Crop width (px)" value={cropWidth} onChange={setCropWidth} type="number" min="1" /><Field label="Crop height (px)" value={cropHeight} onChange={setCropHeight} type="number" min="1" /></div> : <div className="grid gap-4 sm:grid-cols-2"><Field label="Output width (px)" value={width} onChange={setWidth} type="number" placeholder="Original width" min="1" /><SelectField label="Output format" value={format} onChange={setFormat} options={['image/jpeg', 'image/png', 'image/webp']} /></div>}<label className="grid gap-2 text-sm font-medium">Quality <span className="font-mono-ui text-xs text-muted-foreground">{Math.round(Number(quality) * 100)}%</span><input data-testid="input-image-quality" type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(e.target.value)} className="accent-primary" /></label><Button onClick={download} disabled={!file}><Download size={16} />Download processed image</Button><p className="text-xs text-muted-foreground">All processing uses a canvas in this tab. Closing it clears your file.</p></div>;
}
function ImageToolInput({ file, url, load }: { file: File | null; url: string; load: (e: ChangeEvent<HTMLInputElement>) => void }) { return <div className="grid gap-4"><label data-testid="label-image-upload" className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/35 bg-primary/[.035] p-6 text-center hover:bg-primary/[.07]"><Upload className="text-primary" /><span className="mt-3 font-semibold">{file ? file.name : 'Choose an image'}</span><span className="mt-1 text-sm text-muted-foreground">JPG, PNG, WEBP · processed locally</span><input data-testid="input-image-file" type="file" accept="image/*" onChange={load} className="sr-only" /></label>{url && <img data-testid="img-image-preview" src={url} alt="Selected preview" className="print-area max-h-72 w-full rounded-lg object-contain bg-muted p-2" />}</div>; }

function MiscTool({ kind }: { kind: string }) {
  if (kind === 'unit-converter') return <UnitConverter />;
  if (kind === 'time-zone-converter') return <TimeZone />;
  if (kind === 'currency-converter') return <Currency />;
  if (kind === 'cv-builder') return <CVBuilder />;
  if (kind === 'salary-calculator') return <SalaryTool />;
  return <CoverLetter />;
}
function SalaryTool() { const [salary, setSalary] = useState('4200'); const [deduction, setDeduction] = useState('25'); const [period, setPeriod] = useState('Monthly'); const gross = Number(salary) || 0; const takeHome = gross * (1 - (Number(deduction) || 0) / 100); const monthlyTakeHome = period === 'Monthly' ? takeHome : takeHome / 12; const yearlyTakeHome = period === 'Monthly' ? takeHome * 12 : takeHome; return <div className="grid gap-5"><div className="grid gap-4 sm:grid-cols-3"><Field label="Gross salary" value={salary} onChange={setSalary} type="number" min="0" /><Field label="Deduction %" value={deduction} onChange={setDeduction} type="number" min="0" /><SelectField label="Period" value={period} onChange={setPeriod} options={['Monthly', 'Yearly']} /></div><div className="grid gap-3 sm:grid-cols-2"><Result title={`Estimated ${period.toLowerCase()} take-home`} tone="yellow">{takeHome.toFixed(2)}</Result><Result title={period === 'Monthly' ? 'Estimated yearly take-home' : 'Estimated monthly take-home'} tone="teal">{(period === 'Monthly' ? yearlyTakeHome : monthlyTakeHome).toFixed(2)}</Result></div><p className="text-xs text-muted-foreground">Estimate only. Real take-home pay depends on country, tax band, benefits, pension, insurance and payroll rules.</p></div>; }
function UnitConverter() { const [category, setCategory] = useState('Length'); const [value, setValue] = useState('1'); const [unit, setUnit] = useState('Kilometres'); const config: Record<string, { units: string[]; convert: (v: number, u: string) => string }> = { Length: { units: ['Kilometres', 'Miles', 'Metres', 'Feet'], convert: (v, u) => `${u === 'Kilometres' ? v * 0.621371 : u === 'Miles' ? v * 1.60934 : u === 'Metres' ? v * 0.001 : v * 0.0003048} km` }, Weight: { units: ['Kilograms', 'Pounds', 'Grams'], convert: (v, u) => `${u === 'Kilograms' ? v * 2.20462 : u === 'Pounds' ? v * 0.453592 : v * 0.001} kg` }, Temperature: { units: ['Celsius', 'Fahrenheit'], convert: (v, u) => `${u === 'Celsius' ? v * 9 / 5 + 32 : (v - 32) * 5 / 9}° ${u === 'Celsius' ? 'F' : 'C'}` } }; const c = config[category]; return <div className="grid gap-5"><div className="grid gap-4 sm:grid-cols-3"><SelectField label="Category" value={category} onChange={v => { setCategory(v); setUnit(config[v].units[0]); }} options={Object.keys(config)} /><Field label="Value" value={value} onChange={setValue} type="number" /><SelectField label="From" value={unit} onChange={setUnit} options={c.units} /></div><Result title="Approximate conversion" tone="teal">{c.convert(Number(value) || 0, unit)}</Result></div>; }
function TimeZone() { const [date, setDate] = useState(new Date().toISOString().slice(0, 16)); const [zone, setZone] = useState('Europe/Brussels'); const zones = ['Europe/Brussels', 'Europe/London', 'Europe/Helsinki', 'America/New_York', 'Asia/Tokyo']; const formatted = new Date(date).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short', timeZone: zone }); return <div className="grid gap-5"><div className="grid gap-4 sm:grid-cols-2"><Field label="Date and time" value={date} onChange={setDate} type="datetime-local" /><SelectField label="Show in" value={zone} onChange={setZone} options={zones} /></div><Result title={zone} tone="teal">{formatted}</Result><p className="text-xs text-muted-foreground">Uses the time-zone database built into your browser, including daylight-saving rules.</p></div>; }
function Currency() { const [amount, setAmount] = useState('100'); const [from, setFrom] = useState('EUR'); const [to, setTo] = useState('GBP'); const rates: Record<string, number> = { EUR: 1, GBP: .86, USD: 1.09, CHF: .96, PLN: 4.3, SEK: 11.2, NOK: 11.7, DKK: 7.46, CZK: 24.7, HUF: 395, RON: 4.97 }; const result = Number(amount || 0) * rates[to] / rates[from]; return <div className="grid gap-5"><div className="rounded-xl border border-secondary/60 bg-secondary/15 p-4 text-sm leading-6"><span className="font-semibold">Live rates unavailable.</span> These are static reference rates for orientation only, not a quote. Check your bank or a live provider before sending money.</div><div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end"><Field label="Amount" value={amount} onChange={setAmount} type="number" min="0" /><SelectField label="From" value={from} onChange={setFrom} options={Object.keys(rates)} /><SelectField label="To" value={to} onChange={setTo} options={Object.keys(rates)} /></div><Result title={`${amount || 0} ${from} · reference only`} tone="yellow">{result.toFixed(2)} {to}</Result><p className="text-xs text-muted-foreground">Reference table: manually maintained, no live exchange API is called.</p></div>; }

function CVBuilder() { const [name, setName] = useState('Alex Morgan'); const [role, setRole] = useState('Product designer'); const [email, setEmail] = useState('alex@example.com'); const [summary, setSummary] = useState('Thoughtful product designer who turns complex workflows into clear, useful experiences.'); const [skills, setSkills] = useState('Research, Figma, Prototyping, Accessibility'); return <div className="grid gap-6"><div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" value={name} onChange={setName} /><Field label="Target role" value={role} onChange={setRole} /><Field label="Email" value={email} onChange={setEmail} /><Field label="Key skills" value={skills} onChange={setSkills} /></div><label className="grid gap-1.5 text-sm font-medium"><span>Profile summary</span><textarea data-testid="textarea-cv-summary" value={summary} onChange={e => setSummary(e.target.value)} className="min-h-24 rounded-lg border border-input bg-background p-3 outline-none focus:border-primary" /></label><div className="rounded-xl border border-border bg-background p-7 print-area"><div className="flex flex-col justify-between gap-4 border-b-2 border-primary pb-5 sm:flex-row"><div><h2 className="font-display text-4xl font-bold">{name || 'Your name'}</h2><p className="mt-1 text-primary">{role || 'Your role'}</p></div><p className="text-sm text-muted-foreground">{email}</p></div><div className="mt-6"><p className="font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground">Profile</p><p className="mt-2 max-w-xl leading-7">{summary}</p></div><div className="mt-6"><p className="font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground">Skills</p><div className="mt-2 flex flex-wrap gap-2">{skills.split(',').map(s => <span key={s} className="rounded-full bg-muted px-3 py-1 text-sm">{s.trim()}</span>)}</div></div></div><Button onClick={() => window.print()}><Printer size={16} />Print CV</Button><p className="text-xs text-muted-foreground">Tip: choose “Save as PDF” in your print dialog.</p></div>; }
function CoverLetter() { const [name, setName] = useState('Alex Morgan'); const [company, setCompany] = useState('Northline Studio'); const [role, setRole] = useState('Product Designer'); const [tone, setTone] = useState('Warm and direct'); const [generated, setGenerated] = useState(''); const generate = () => setGenerated(`Dear ${company} team,\n\nI am writing to apply for the ${role} position. The way your team makes useful, considered products is exactly the kind of work I want to contribute to.\n\nI bring a practical, collaborative approach: I ask good questions, make the complex visible, and care about the small details that help people move forward. I would welcome the chance to talk about how that approach could support ${company}.\n\nThank you for your time,\n${name}`); return <div className="grid gap-5"><div className="grid gap-4 sm:grid-cols-2"><Field label="Your name" value={name} onChange={setName} /><Field label="Company" value={company} onChange={setCompany} /><Field label="Role" value={role} onChange={setRole} /><SelectField label="Tone" value={tone} onChange={setTone} options={['Warm and direct', 'Formal', 'Confident']} /></div><Button onClick={generate}><Sparkles size={16} />Generate a first draft</Button>{generated && <div className="animate-fade"><textarea data-testid="textarea-cover-letter" value={generated} onChange={e => setGenerated(e.target.value)} className="min-h-[300px] w-full rounded-xl border border-input bg-background p-5 text-[15px] leading-7 outline-none focus:border-primary" /><div className="mt-3 flex gap-2"><Button variant="outline" onClick={() => navigator.clipboard?.writeText(generated)}><Copy size={15} />Copy draft</Button><Button variant="quiet" onClick={() => { const a = document.createElement('a'); a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(generated)}`; a.download = 'cover-letter.txt'; a.click(); }}><Download size={15} />Download</Button></div></div>}<p className="text-xs text-muted-foreground">This creates a starting point, not a promise. Add a specific achievement and check every detail before sending.</p></div>; }

function RelatedTools({ current }: { current: string }) { const currentTool = tools.find(t => t.slug === current); const related = tools.filter(t => t.category === currentTool?.category && t.slug !== current).slice(0, 3); return related.length ? <div className="mt-10"><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-muted-foreground">Keep exploring</p><div className="mt-3 flex flex-wrap gap-2">{related.map(t => <Link href={`/tools/${t.slug}`} data-testid={`link-related-${t.slug}`} key={t.slug} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary">{t.name}<ArrowRight size={14} /></Link>)}</div></div> : null; }

function renderTool(slug?: string) {
  if (slug === 'word-counter') return <TextTool kind="counter" />;
  if (slug === 'character-counter') return <TextTool kind="counter" />;
  if (slug === 'case-converter') return <TextTool kind="case" />;
  if (slug === 'text-cleaner') return <TextTool kind="cleaner" />;
  if (slug === 'duplicate-line-remover') return <TextTool kind="duplicates" />;
  if (slug === 'percentage-calculator') return <NumberTool kind="percentage" />;
  if (slug === 'discount-calculator') return <NumberTool kind="discount" />;
  if (slug === 'bmi-calculator') return <NumberTool kind="bmi" />;
  if (slug === 'loan-calculator') return <NumberTool kind="loan" />;
  if (slug === 'vat-calculator') return <NumberTool kind="vat" />;
  if (slug === 'age-calculator') return <DateTool kind="age" />;
  if (slug === 'date-calculator') return <DateTool kind="date" />;
  if (slug === 'image-tools') return <ImageTool />;
  if (slug === 'image-compressor') return <ImageTool />;
  if (slug === 'image-resizer') return <ImageTool />;
  if (slug === 'jpg-to-png') return <ImageTool initialFormat="image/png" />;
  if (slug === 'png-to-jpg') return <ImageTool initialFormat="image/jpeg" />;
  if (slug === 'webp-converter') return <ImageTool initialFormat="image/webp" />;
  if (slug === 'image-cropper') return <ImageTool crop />;
  if (slug === 'jpg-to-pdf') return <ImageTool pdf />;
  if (slug === 'pdf-to-word') return <PdfToWord />;
  if (slug === 'word-to-pdf') return <WordToPdf />;
  if (slug === 'merge-pdf') return <PdfTool kind="merge" />;
  if (slug === 'split-pdf') return <PdfTool kind="split" />;
  if (slug === 'compress-pdf') return <PdfTool kind="compress" />;
  if (slug === 'pdf-to-jpg') return <PdfToJpg />;
  return <MiscTool kind={slug || ''} />;
}

function Router() { return <ErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/tools/:tool" component={ToolPage} /><Route path="/:tool" component={ToolPage} /><Route component={NotFound} /></Switch></ErrorBoundary>; }
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }
export default App;