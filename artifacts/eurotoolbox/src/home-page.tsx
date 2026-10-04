import { useEffect, useState } from 'react';
import { ArrowRight, Search, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { categories, Shell, tools } from './App';
import { updateDocumentHead } from './seo';

export default function Home() {
  const [active, setActive] = useState('All tools');
  const [search, setSearch] = useState('');
  const query = search.toLowerCase().trim();
  const filtered = tools.filter(t => {
    const matchesCategory = active === 'All tools' || t.category === active;
    if (!matchesCategory) return false;
    if (!query) return true;
    if (t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)) return true;
    if (query.includes('axe') && ['text-cleaner', 'duplicate-line-remover', 'image-cropper', 'split-pdf'].includes(t.slug)) return true;
    if ((query.includes('ai') || query.includes('smart') || query.includes('courtney')) && ['cv-builder', 'cover-letter-generator', 'text-cleaner'].includes(t.slug)) return true;
    if ((query.includes('factory') || query.includes('lovetool')) && ['word-counter', 'image-compressor', 'merge-pdf', 'vat-calculator'].includes(t.slug)) return true;
    return false;
  });
  useEffect(() => { updateDocumentHead('/'); }, []);
  return <Shell><main>
    <section className="paper-grid overflow-hidden border-b border-border"><div className="mx-auto grid max-w-[1360px] gap-10 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-24">
      <div className="animate-rise"><p className="mb-5 flex items-center gap-2 font-mono-ui text-[11px] font-bold uppercase tracking-[.2em] text-accent"><span className="h-2 w-2 rounded-full bg-accent" />Open toolbox · no sign-up</p><h1 className="max-w-3xl font-display text-5xl font-semibold leading-[.98] tracking-[-.045em] text-foreground sm:text-6xl lg:text-[78px]">Small tools.<br /><span className="text-primary">Clearer days.</span></h1><p className="mt-3 font-display text-xl font-semibold text-primary sm:text-2xl">Free online tools for everyday work, calculations, and documents.</p><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">LoveEasyTool is a free online tools website and digital love tool factory providing fast, private browser utilities across seven categories: <Link href="/category/text/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Text tools</Link>, <Link href="/category/numbers/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Number calculators</Link>, <Link href="/category/files/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">File utilities</Link>, <Link href="/category/pdf/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">PDF tools</Link>, <Link href="/category/time/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Time calculators</Link>, <Link href="/category/everyday/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Everyday converters</Link>, and <Link href="/category/work/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Work tools</Link>. Everything runs client-side in your browser with zero sign-up, no subscriptions, and complete data privacy.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#tools" data-testid="link-explore-tools" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Explore the toolbox <ArrowRight size={17} /></a><a href="#privacy" data-testid="link-privacy-promise" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-semibold hover:border-primary"><ShieldCheck size={17} className="text-accent" />Privacy first</a></div></div>
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
            { name: 'Number Tools', slug: 'numbers', count: '6 tools', desc: 'Percentages, VAT, loans' },
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
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['word-counter', 'merge-pdf', 'image-compressor', 'vat-calculator', 'percentage-calculator', 'cv-builder'].map(slug => {
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
  </main></Shell>;
}