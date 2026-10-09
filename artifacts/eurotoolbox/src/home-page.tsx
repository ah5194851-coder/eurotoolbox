import { useEffect, useState } from 'react';
import { ArrowRight, Search, ShieldCheck, Zap, HelpCircle, CheckCircle2, Lock, Cpu, Sparkles, FileText, Calculator, Image as ImageIcon, FileCode } from 'lucide-react';
import { Link } from 'wouter';
import { categories, Shell, tools } from './App';
import { updateDocumentHead } from './seo';

export default function Home() {
  const [active, setActive] = useState('All tools');
  const [search, setSearch] = useState('');
  const query = search.toLowerCase().trim();
  const filtered = tools.filter(t => {
    const matchesCategory = active === 'All tools' || t.category === active || (active === 'Numbers' && t.slug === 'salary-calculator');
    if (!matchesCategory) return false;
    if (!query) return true;
    if (t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)) return true;
    if (query.includes('tool') || query.includes('utility') || query.includes('calculator') || query.includes('converter')) return true;
    return false;
  });
  useEffect(() => { updateDocumentHead('/'); }, []);
  return <Shell><main>
    <section className="paper-grid overflow-hidden border-b border-border"><div className="mx-auto grid max-w-[1360px] gap-10 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-24">
      <div className="animate-rise"><p className="mb-5 flex items-center gap-2 font-mono-ui text-[11px] font-bold uppercase tracking-[.2em] text-accent"><span className="h-2 w-2 rounded-full bg-accent" />Open toolbox · no sign-up</p><h1 className="max-w-3xl font-display text-5xl font-semibold leading-[.98] tracking-[-.045em] text-foreground sm:text-6xl lg:text-[76px]">Free Online Tools.<br /><span className="text-primary">Fast, Private & Simple.</span></h1><p className="mt-3 font-display text-xl font-semibold text-primary sm:text-2xl">Everyday calculators, PDF utilities, image converters, and text formatters.</p><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">LoveEasyTool is a free online tools platform providing fast, private browser utilities across seven categories: <Link href="/category/text/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Text tools</Link>, <Link href="/category/numbers/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Number calculators</Link>, <Link href="/category/files/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">File utilities</Link>, <Link href="/category/pdf/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">PDF tools</Link>, <Link href="/category/time/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Time calculators</Link>, <Link href="/category/everyday/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Everyday converters</Link>, and <Link href="/category/work/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Work tools</Link>. Everything runs client-side in your browser with zero sign-up, no subscriptions, and complete data privacy.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#tools" data-testid="link-explore-tools" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Explore the toolbox <ArrowRight size={17} /></a><a href="#privacy" data-testid="link-privacy-promise" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-semibold hover:border-primary"><ShieldCheck size={17} className="text-accent" />Privacy first</a></div></div>
      <div className="relative mx-auto w-full max-w-[520px] animate-rise [animation-delay:120ms]"><div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-secondary/60 blur-2xl" /><div className="relative rounded-[24px] border border-border bg-card p-3 shadow-xl rotate-[1deg]"><div className="rounded-[17px] bg-primary p-6 text-primary-foreground"><div className="flex items-center justify-between"><span className="font-mono-ui text-[10px] uppercase tracking-[.2em] opacity-70">LET / TOOL / 001</span><Zap size={18} className="text-secondary" /></div><div className="mt-16 font-display text-4xl font-semibold tracking-tight">Your digital<br />utility cabinet.</div><div className="mt-16 flex items-end justify-between"><span className="text-sm opacity-75">{tools.length} tools ready to use</span><span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-secondary-foreground"><ArrowRight /></span></div></div></div><div className="absolute -bottom-5 -left-5 rounded-xl border border-border bg-secondary px-4 py-3 shadow-md"><p className="font-mono-ui text-[10px] uppercase tracking-wider">local processing</p><p className="mt-1 text-sm font-bold">Your files stay yours.</p></div></div>
    </div></section>
    <section className="border-b border-border bg-muted/25 py-14">
      <div className="mx-auto max-w-[1360px] px-5 lg:px-10">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Browse By Discipline</p>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">Seven Dedicated Tool Cabinets</h2>
          </div>
          <p className="text-xs text-muted-foreground">Each cabinet groups focused utilities for specific workflows</p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {[
            { name: 'Text Tools', slug: 'text', count: '5 tools', desc: 'Words, case, cleaning' },
            { name: 'Number Tools', slug: 'numbers', count: '7 tools', desc: 'Percentages, VAT, salary' },
            { name: 'File Utilities', slug: 'files', count: '6 tools', desc: 'Compress, resize, WebP' },
            { name: 'PDF Tools', slug: 'pdf', count: '7 tools', desc: 'Merge, split, extract' },
            { name: 'Time Tools', slug: 'time', count: '1 tool', desc: 'Date math & differences' },
            { name: 'Everyday Tools', slug: 'everyday', count: '3 tools', desc: 'Units, time zones, rates' },
            { name: 'Career Tools', slug: 'work', count: '3 tools', desc: 'CV builder, cover letter' },
          ].map(c => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              data-testid={`cabinet-${c.slug}`}
              className="group rounded-xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-primary hover:shadow-sm"
            >
              <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent">{c.count}</span>
              <h3 className="mt-1.5 font-display text-base font-semibold text-foreground group-hover:text-primary transition">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">{c.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                Open cabinet <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section id="tools" className="mx-auto max-w-[1360px] px-5 py-16 lg:px-10 lg:py-24"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">The cabinet</p><h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">Open a drawer.</h2><p className="mt-3 max-w-xl text-muted-foreground">Everything runs in your browser where it can. No accounts. No busywork.</p></div><div className="relative w-full md:max-w-[290px]"><Search size={16} className="absolute left-3 top-3 text-muted-foreground" /><input data-testid="input-home-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search all tools" className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary" /></div></div>
      <div className="mt-9 flex gap-2 overflow-x-auto pb-2">{categories.map(c => <button data-testid={`button-category-${c.toLowerCase().replace(' ', '-')}`} key={c} onClick={() => setActive(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${active === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'}`}>{c}</button>)}</div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((tool, i) => <Link key={tool.slug} href={`/tools/${tool.slug}/`} data-testid={`card-tool-${tool.slug}`} className="group animate-rise rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-md" style={{ animationDelay: `${i * 35}ms` }}><div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-lg ${tool.color === 'yellow' ? 'bg-secondary text-secondary-foreground' : tool.color === 'teal' ? 'bg-accent/15 text-accent' : tool.color === 'coral' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>{tool.icon}</span><ArrowRight size={17} className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" /></div><p className="mt-5 font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground">{tool.category}</p><h3 className="mt-1.5 font-display text-xl font-semibold">{tool.name}</h3><p className="mt-1.5 text-sm leading-6 text-muted-foreground">{tool.description}</p></Link>)}</div>
      {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-border py-16 text-center"><Search className="mx-auto text-muted-foreground" /><p className="mt-3 font-semibold">No tools match that search.</p><button onClick={() => setSearch('')} className="mt-2 text-sm text-primary underline">Clear search</button></div>}
    </section>
    <section id="privacy" className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-[1360px] gap-8 px-5 py-14 lg:grid-cols-[.8fr_1.2fr] lg:px-10"><div><p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-secondary">The quiet promise</p><h2 className="mt-3 max-w-lg font-display text-4xl font-semibold leading-tight">A utility box should not ask for your life story.</h2></div><div className="grid gap-5 sm:grid-cols-3">{[['01', 'Browser-first', 'Text, numbers and most image work happen on this device.'], ['02', 'No fake live data', 'When a service needs the internet, we say so plainly.'], ['03', 'Easy to leave', 'Download your result, print it, and close the tab.']].map(([n, t, d]) => <div key={n} className="border-t border-primary-foreground/20 pt-4"><span className="font-mono-ui text-xs text-secondary">{n}</span><h3 className="mt-7 font-display text-xl">{t}</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/70">{d}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-[1360px] px-5 py-16 lg:px-10 lg:py-24">
      <div>
        <p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">High Demand</p>
        <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">Popular right now across our knowledge base.</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl">Everyday workhorses for students, freelancers, and business owners.</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {['salary-calculator', 'vat-calculator', 'percentage-calculator', 'word-counter', 'merge-pdf', 'image-compressor', 'cv-builder'].map(slug => {
          const t = tools.find(x => x.slug === slug)!;
          return (
            <Link key={slug} href={`/tools/${slug}/`} data-testid={`link-popular-${slug}`} className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-md">
              <div className="flex items-start justify-between">
                <span className="text-primary">{t.icon}</span>
                <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent">{t.category}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold group-hover:text-primary transition">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">Open tool <ArrowRight size={13} /></span>
            </Link>
          );
        })}
      </div>
    </section>

    {/* Section: Architectural Advantage of Client-Side Computing */}
    <section className="border-t border-border bg-muted/20 py-16 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Technical Architecture</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Why Zero-Upload Browser Processing Outperforms Cloud Services
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                Most free online converters and utility websites operate by transmitting your confidential files over the internet to remote cloud servers. Once uploaded, those servers queue your files, create temporary disk caches, process them, and send back a download link. This legacy architecture presents severe data privacy vulnerabilities, exposes sensitive contracts or photographs to potential server breaches, and introduces frustrating upload and download delays.
              </p>
              <p>
                LoveEasyTool is built on modern web capabilities including WebAssembly, the HTML5 Canvas API, and client-side JavaScript worker threads. When you count words in an article, compress a photographic image, calculate complex amortized loan schedules, or merge legal PDF documents, every single byte is read and processed in your local computer or phone RAM.
              </p>
              <p>
                Nothing is uploaded. No copies exist in the cloud. No third party can inspect your private financials, resumes, tax documents, or family photographs. When you finish your task and close your browser tab, all working memory is instantly and completely wiped.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/privacy/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Read our Zero-Upload Privacy Guarantee <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: <Lock className="text-accent" size={24} />,
                title: 'Strict Local Isolation',
                description: 'Files and text inputs never traverse internet transit cables or touch remote web storage. Processing stays within the browser security sandbox.',
              },
              {
                icon: <Cpu className="text-primary" size={24} />,
                title: 'Hardware Acceleration',
                description: 'Calculations and image manipulation harness your local device processor and GPU cores directly, delivering zero-latency results.',
              },
              {
                icon: <ShieldCheck className="text-secondary-foreground" size={24} />,
                title: 'Zero Account Tracking',
                description: 'No email registrations, passwords, session cookies, tracking pixels, or marketing drip campaigns required to use any tool.',
              },
              {
                icon: <Zap className="text-accent" size={24} />,
                title: 'No Queue Wait Times',
                description: 'Skip artificial "processing queues" and throttling limits imposed by commercial cloud services trying to force premium subscriptions.',
              },
            ].map((card, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-2xs">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-muted/60">{card.icon}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Section: Real-World Workflows */}
    <section className="mx-auto max-w-[1360px] px-5 py-16 lg:px-10 lg:py-24">
      <div>
        <p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Practical Workflows</p>
        <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">How Professionals Use LoveEasyTool Daily</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Streamline your routine digital responsibilities with intuitive, purpose-built utilities tailored for modern work.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <FileText size={20} />
            </span>
            <span className="font-mono-ui text-xs font-bold uppercase tracking-wider text-muted-foreground">Workflow 01</span>
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">Job Applications & Career Advancement</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Draft a clean, recruiter-approved modern resume using our Free CV Builder, generate an accompanying tailored introduction letter, and compress the resulting PDF file for effortless email attachments or job board portal uploads.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/60">
            <Link href="/tools/cv-builder/" className="text-xs font-semibold text-primary hover:underline">CV Builder →</Link>
            <span className="text-muted-foreground text-xs">·</span>
            <Link href="/tools/compress-pdf/" className="text-xs font-semibold text-primary hover:underline">Compress PDF →</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
              <ImageIcon size={20} />
            </span>
            <span className="font-mono-ui text-xs font-bold uppercase tracking-wider text-muted-foreground">Workflow 02</span>
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">Web Performance & Image Optimization</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Shrink heavy photographs and banners with our Image Compressor, resize exact pixel dimensions to avoid layout shifts, and convert legacy PNG and JPG assets into next-generation WebP formats for Google Core Web Vitals compliance.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/60">
            <Link href="/tools/image-compressor/" className="text-xs font-semibold text-primary hover:underline">Compressor →</Link>
            <span className="text-muted-foreground text-xs">·</span>
            <Link href="/tools/webp-converter/" className="text-xs font-semibold text-primary hover:underline">WebP Converter →</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-secondary-foreground">
              <Calculator size={20} />
            </span>
            <span className="font-mono-ui text-xs font-bold uppercase tracking-wider text-muted-foreground">Workflow 03</span>
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">Financial & Retail Mathematical Analysis</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Compute gross-to-net VAT splits for commercial invoicing, evaluate multi-tier discount savings during sales promotions, estimate monthly mortgage payments with amortization tables, and verify project delivery schedules.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/60">
            <Link href="/tools/vat-calculator/" className="text-xs font-semibold text-primary hover:underline">VAT Calculator →</Link>
            <span className="text-muted-foreground text-xs">·</span>
            <Link href="/tools/loan-calculator/" className="text-xs font-semibold text-primary hover:underline">Loan Calculator →</Link>
          </div>
        </div>
      </div>
    </section>

    {/* Section: Homepage FAQ */}
    <section className="border-t border-border bg-muted/15 py-16 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-5 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Got Questions?</p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">Frequently Asked Questions</h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about our browser-based utility architecture, privacy guarantees, and usage policies.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              q: 'Is LoveEasyTool really 100% free with no hidden charges?',
              a: 'Yes. Every utility on LoveEasyTool is completely free to use. There are no paid tiers, no monthly subscription fees, no locked pro features, and no artificial daily usage limits.',
            },
            {
              q: 'Do I need to create an account or provide an email address?',
              a: 'No. We believe utility tools should be immediately accessible without registration barriers. You can jump directly to any tool, complete your work, download your result, and close the tab without ever entering an email address or password.',
            },
            {
              q: 'How can you guarantee that my documents and photos remain private?',
              a: 'Our tools use client-side APIs (such as the HTML5 File API, WebAssembly, and Canvas) that execute within the browser sandbox on your device. Your files are never uploaded across the internet to our servers. Because we never receive your files, it is technically impossible for us to store, inspect, or leak them.',
            },
            {
              q: 'Will LoveEasyTool work on my smartphone or tablet?',
              a: 'Yes. The entire website is built with a responsive, mobile-first design. All calculators, text formatters, image converters, and PDF tools function smoothly on modern iOS Safari, Android Chrome, and tablet browsers without installing any applications.',
            },
            {
              q: 'Are there file size limits when compressing images or merging PDFs?',
              a: 'Because operations execute in your browser memory rather than on shared cloud infrastructure, limits are dictated by your device available RAM rather than artificial server caps. Modern phones and computers can easily handle documents and images of dozens of megabytes.',
            },
            {
              q: 'Can I bookmark specific tools for direct access?',
              a: 'Yes. Every tool has its own dedicated, canonical URL (such as /tools/word-counter/ or /tools/merge-pdf/) that you can save to your browser bookmarks or pin to your home screen for instantaneous access.',
            },
            {
              q: 'How does LoveEasyTool compare to traditional ad-heavy utility sites?',
              a: 'Traditional utility websites are often cluttered with distracting banner advertisements, slow third-party tracking scripts, deceptive download buttons, and restrictive limits designed to funnel users into paid subscriptions. LoveEasyTool prioritizes a clean, distraction-free environment with high contrast, fast loading speeds, and zero pop-ups.',
            },
            {
              q: 'Is LoveEasyTool compliant with GDPR, CCPA, and global privacy standards?',
              a: 'Yes, fully compliant by design. Under our local-first architecture, no personally identifiable information (PII), uploaded documents, or IP-linked records are ever harvested, processed on remote servers, or transferred to third-party data brokers.',
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-2xs">
              <h3 className="font-display text-lg font-semibold text-foreground">{item.q}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main></Shell>;
}