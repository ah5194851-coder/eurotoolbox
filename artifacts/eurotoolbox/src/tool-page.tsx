import { type ChangeEvent, type ReactNode, useEffect, useState } from 'react';
import { Link, useParams } from 'wouter';
import {
  ArrowRight, BadgeEuro, BookOpen, ChevronDown, Copy, Download, FileImage,
  FileText, Globe2, ImageDown, Landmark, Percent, Printer, RefreshCw,
  ShieldCheck, Sparkles, Timer, Upload
} from 'lucide-react';
import NotFound from '@/pages/not-found';
import { Shell, tools } from './App';
import { toolSeo } from './data/seo';
import { updateDocumentHead } from './seo';

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

function downloadBytes(bytes: Uint8Array, filename: string, type: string) {
  const copy = bytes.slice();
  const url = URL.createObjectURL(new Blob([copy.buffer as ArrayBuffer], { type }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

let pdfLibPromise: Promise<typeof import('pdf-lib')> | undefined;
function loadPdfLib() {
  return pdfLibPromise ??= import('pdf-lib');
}

let pdfJsPromise: Promise<{ getDocument: typeof import('pdfjs-dist')['getDocument'] }> | undefined;
async function loadPdfJs() {
  return pdfJsPromise ??= Promise.all([
    import('pdfjs-dist'),
    import('pdfjs-dist/build/pdf.worker.mjs?url'),
  ]).then(([pdfjs, worker]) => {
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    return pdfjs;
  });
}

function ToolSeoContent({ tool, seo }: { tool: typeof tools[number]; seo: typeof toolSeo[string] }) {
  return <section className="mt-14 border-t border-border pt-12">
    <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">About this tool</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">A clearer way to use {tool.name.toLowerCase()}.</h2>
        <p className="mt-4 leading-7 text-muted-foreground">{seo.intro}</p>
      </div>
      <div>
        <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">How to use</p>
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

export function ToolPage() {
  const { tool: slug } = useParams<{ tool: string }>();
  const tool = tools.find(t => t.slug === slug);
  const seo = toolSeo[slug || ''] ?? { title: 'Tool not found · EuroToolBox', description: 'The requested EuroToolBox tool could not be found.', intro: '', steps: [], features: [], faq: [] };
  useEffect(() => { updateDocumentHead(tool ? `/tools/${slug}` : '/404'); }, [slug, tool]);
  if (!tool) return <NotFound />;
  return <Shell><main className="mx-auto max-w-[1160px] px-5 py-10 lg:px-10 lg:py-16"><div className="mb-9 flex items-center gap-2 text-sm text-muted-foreground"><Link href="/" className="hover:text-foreground">Toolbox</Link><span>/</span><span>{tool.category}</span><span>/</span><span className="text-foreground">{tool.name}</span></div><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><div className="lg:sticky lg:top-28"><span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-secondary-foreground">{tool.icon}</span><p className="mt-6 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">{tool.category} utility</p><h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{slug === 'cv-builder' ? 'Free CV Builder' : tool.name}</h1><p className="mt-4 max-w-sm leading-7 text-muted-foreground">{tool.description} Built for quick answers, with your inputs staying in your browser.</p><div className="mt-7 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={16} className="text-accent" />Private by default · No account needed</div></div><div><div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">{renderTool(slug)}</div><RelatedTools current={slug} /></div></div><ToolSeoContent tool={tool} seo={seo} /></main></Shell>;
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

function WordToPdf() {
  const [text, setText] = useState('Paste or write your document here.');
  const [status, setStatus] = useState('');
  const createPdf = async () => {
    const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
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
    const { getDocument } = await loadPdfJs();
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
    const { PDFDocument } = await loadPdfLib();
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
    const { getDocument } = await loadPdfJs();
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
function CoverLetter() { const [name, setName] = useState('Alex Morgan'); const [company, setCompany] = useState('Northline Studio'); const [role, setRole] = useState('Product Designer'); const [tone, setTone] = useState('Warm and direct'); const [generated, setGenerated] = useState(''); const generate = () => setGenerated(`Dear ${company} team,\n\nI am writing to apply for the ${role} position. The way your team makes useful, considered products is exactly the kind of work I want to contribute to.\n\nI bring a practical, collaborative approach: I ask good questions, make the complex visible, and care about the small details that help people move forward. I would welcome the chance to talk about how that approach could support ${company}.\n\nThank you for your time,\n${name}`); return <div className="grid gap-5"><div className="grid gap-4 sm:grid-cols-2"><Field label="Your name" value={name} onChange={setName} /><Field label="Company" value={company} onChange={setCompany} /><Field label="Role" value={role} onChange={setRole} /><SelectField label="Tone" value={tone} onChange={setTone} options={['Warm and direct', 'Formal', 'Confident']} /></div><Button onClick={generate}><Sparkles size={16} />Generate a first draft</Button>{generated && <div className="animate-fade"><textarea data-testid="textarea-cover-letter" value={generated} onChange={e => setGenerated(e.target.value)} className="min-h-[300px] w-full rounded-xl border border-input bg-background p-5 text-[15px] leading-7 outline-none" /><div className="mt-3 flex gap-2"><Button variant="outline" onClick={() => navigator.clipboard?.writeText(generated)}><Copy size={15} />Copy draft</Button><Button variant="quiet" onClick={() => { const a = document.createElement('a'); a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(generated)}`; a.download = 'cover-letter.txt'; a.click(); }}><Download size={16} />Download</Button></div></div>}<p className="text-xs text-muted-foreground">This creates a starting point, not a promise. Add a specific achievement and check every detail before sending.</p></div>; }

function RelatedTools({ current }: { current: string }) { const currentTool = tools.find(t => t.slug === current); const related = tools.filter(t => t.category === currentTool?.category && t.slug !== current).slice(0, 3); return related.length ? <div className="mt-10"><p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-muted-foreground">Related tools</p><div className="mt-3 flex flex-wrap gap-2">{related.map(t => <Link href={`/tools/${t.slug}`} data-testid={`link-related-${t.slug}`} key={t.slug} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary">{t.name}<ArrowRight size={14} /></Link>)}</div></div> : null; }

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

export default ToolPage;