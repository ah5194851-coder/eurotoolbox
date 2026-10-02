import { useEffect } from 'react';
import { Link } from 'wouter';
import { ShieldCheck, Zap, Lock, HeartHandshake, ArrowRight } from 'lucide-react';
import { Shell } from './App';
import { updateDocumentHead } from './seo';

export default function AboutPage() {
  useEffect(() => {
    updateDocumentHead('/about');
  }, []);

  return (
    <Shell>
      <main className="mx-auto max-w-[900px] px-5 py-12 lg:px-10 lg:py-20">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">LoveEasyTool</Link>
          <span>/</span>
          <span className="text-foreground">About</span>
        </div>

        <p className="mt-10 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Who we are</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">About LoveEasyTool</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          LoveEasyTool was founded by Ali Hassan as a direct response to the modern web’s endless popups, mandatory accounts, paywalls, and invasive trackers. We build calm, ultra-fast online utilities that respect your time and protect your data.
        </p>

        <div className="mt-12 grid gap-10">
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">Our Philosophy: Local First</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Most everyday tool websites force you to upload documents, images, and sensitive financial figures to remote cloud servers just to perform basic transformations. LoveEasyTool does things differently: every calculation, image compression, case conversion, and text cleanup runs directly inside your device’s browser engine using modern JavaScript and WebAssembly.
            </p>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Lock size={20} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Zero Uploads</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Your private files, images, PDFs, and CV details never touch our servers. When you close the browser tab, your working memory is wiped clean.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-secondary-foreground">
                <Zap size={20} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Zero Sign-Up Required</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                No credit cards, no email subscriptions, and no trial paywalls. Every utility is ready to use the instant you open the page.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
                <ShieldCheck size={20} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Radical Transparency</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                We clearly state tool capabilities and limitations. If a tool uses static reference data or browser print engines, we tell you upfront.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-destructive/10 text-destructive">
                <HeartHandshake size={20} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Built by Ali Hassan</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Created to make work, study, and daily calculations simpler for students, freelancers, and professionals worldwide.
              </p>
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">The Love Tool Factory & Utility Mission</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Think of LoveEasyTool as an open digital love tool factory: a place where you can quickly pick up the exact instrument you need—whether you require a sharp, single-purpose axe like tool to slice through repetitive lines of text, crop an image, or compress a PDF, or need modern love tool ai productivity helpers to draft a CV and calculate career metrics.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Whether you discovered us searching for lovetools com ua or exploring open-web alternatives, our platform exists to provide uncompromised utility without noise, tracking, or fees. (And for music enthusiasts arriving from searches like courtney love tool or pop-culture queries, welcome! While we do not tune grunge guitars, we do provide the cleanest, fastest suite of free browser utilities on the web.)
            </p>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="font-display text-2xl font-semibold">Explore Our Ecosystem</h2>
            <p className="mt-2 text-muted-foreground">
              Discover our library of free utilities or check out practical books and career guides authored by Ali Hassan.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/#tools" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
                Browse all tools <ArrowRight size={16} />
              </Link>
              <Link href="/books" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-semibold text-foreground hover:border-primary">
                View books by Ali Hassan
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Shell>
  );
}
