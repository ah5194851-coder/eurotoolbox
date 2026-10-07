import { useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Shell } from './App';
import { PERCENTAGE_LANDING_PAGES, type PercentageLandingPageData } from './data/percentage-landing-data';
import { PercentageCalculator, type PercentageMode } from './components/percentage-calculator';
import { updateDocumentHead } from './seo';
import NotFound from '@/pages/not-found';
import {
  ShieldCheck, Percent, ArrowRight, ChevronDown, CheckCircle2,
  BookOpen, Calculator, BadgeEuro, Landmark
} from 'lucide-react';

interface PercentageLandingPageProps {
  slug?: string;
}

export function PercentageLandingPage({ slug }: PercentageLandingPageProps) {
  const params = useParams<{ page?: string }>();
  const activeSlug = slug || params.page || '';
  const data = PERCENTAGE_LANDING_PAGES[activeSlug];

  useEffect(() => {
    if (data) {
      updateDocumentHead(data.canonicalPath);
    }
  }, [data]);

  if (!data) {
    return <NotFound />;
  }

  const otherPages = Object.values(PERCENTAGE_LANDING_PAGES).filter(p => p.slug !== data.slug);

  // Map defaultMode to PercentageMode for component
  const modeMapping: Record<string, PercentageMode> = {
    'what-is': 'what-is',
    'is-what-percent': 'is-what-percent',
    'increase': 'increase-decrease',
    'decrease': 'increase-decrease',
    'difference': 'difference',
    'add-subtract': 'add-subtract',
  };
  const activeMode = modeMapping[data.defaultMode] || 'what-is';

  return (
    <Shell>
      <main className="mx-auto max-w-[1160px] px-5 py-10 lg:px-10 lg:py-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/category/numbers/" className="hover:text-foreground">Numbers</Link>
          <span>/</span>
          <Link href="/tools/percentage-calculator/" className="hover:text-foreground">Percentage Calculator</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{data.h1}</span>
        </nav>

        {/* Hero & Interactive Calculator Section */}
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <Percent size={24} />
            </span>
            <p className="mt-6 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">
              Math Utility · Step-by-Step
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl text-foreground">
              {data.h1}
            </h1>
            <p className="mt-4 max-w-sm leading-7 text-muted-foreground text-sm sm:text-base">
              {data.intro}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck size={16} className="text-accent" />
              100% Private · Runs in your browser · No sign-up
            </div>

            {/* Quick Math Facts Box */}
            <div className="mt-6 rounded-xl border border-border/80 bg-muted/30 p-4 text-xs">
              <p className="mb-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Calculation Highlights
              </p>
              <dl className="grid gap-2">
                <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground">Execution:</dt>
                  <dd className="font-semibold text-foreground text-right">Client-side JavaScript</dd>
                </div>
                <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground">Sign-up Required:</dt>
                  <dd className="font-semibold text-accent text-right">None (100% Free)</dd>
                </div>
                <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground">Step-by-step breakdown:</dt>
                  <dd className="font-semibold text-foreground text-right">Included in real-time</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Data privacy:</dt>
                  <dd className="font-semibold text-foreground text-right">Zero server logs</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Interactive Calculator Card */}
          <div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
              <PercentageCalculator
                initialMode={activeMode}
                initialX={data.initialX}
                initialY={data.initialY}
              />
            </div>
          </div>
        </div>

        {/* Editorial Section 1: Detailed Guide */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="max-w-3xl">
            <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">Mathematical Guide</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
              {data.coreGuideTitle}
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-muted-foreground">
              {data.coreGuideText.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Section 2: Solved Real-World Worked Examples */}
        <section className="mt-14">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Worked Demonstrations</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
                Solved Examples with Real Numbers
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">Concrete step-by-step calculations</p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.workedExamples.map((ex, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-card p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider text-accent">
                    Example {idx + 1}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground">
                    {ex.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {ex.description}
                  </p>
                  <div className="mt-4 rounded-lg bg-muted/40 p-3.5 font-mono-ui text-xs space-y-1.5">
                    <div className="text-muted-foreground text-[11px]">Formula: {ex.calculation}</div>
                    <div className="font-bold text-primary text-base pt-1 border-t border-border/60">
                      Result: {ex.result}
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded border border-border/60 bg-muted/20 p-2.5 text-xs text-muted-foreground font-mono-ui">
                  {ex.formula}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Section 3: Country-Specific FAQs */}
        <section className="mt-14">
          <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">Common Inquiries</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 divide-y divide-border rounded-xl border border-border bg-card">
            {data.faqs.map((faq, idx) => (
              <details key={idx} className="group p-5" open={idx === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground">
                  <span>{faq.question}</span>
                  <ChevronDown size={16} className="shrink-0 transition group-open:rotate-180 text-muted-foreground" />
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal Linking Hub 1: Other Percentage Calculators */}
        <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Related Calculations</p>
              <h3 className="font-display text-xl font-semibold text-foreground">Other Percentage Calculators</h3>
            </div>
            <Link href="/tools/percentage-calculator/" className="text-xs font-semibold text-primary hover:underline">
              Main All-in-One Percentage Calculator →
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherPages.map(p => (
              <Link
                key={p.slug}
                href={p.canonicalPath}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-background/60 p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-2xs"
              >
                <div>
                  <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition">
                    {p.h1}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {p.intro}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary group-hover:underline">
                  Open calculator <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Internal Linking Hub 2: Companion Financial Tools */}
        <section className="mt-8 rounded-2xl border border-border bg-muted/20 p-6">
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Companion Financial Tools</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground">Related Practical Calculators</h3>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Explore related online arithmetic and financial tools:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Link
              href="/tools/discount-calculator/"
              className="rounded-xl border border-border bg-card p-4 hover:border-primary transition group"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <BadgeEuro size={16} /> Discount Calculator
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Calculate sale prices, percentage discounts, and retail savings.</p>
            </Link>
            <Link
              href="/tools/vat-calculator/"
              className="rounded-xl border border-border bg-card p-4 hover:border-primary transition group"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Calculator size={16} /> VAT Calculator
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Add or remove Value Added Tax across UK, EU, UAE and global brackets.</p>
            </Link>
            <Link
              href="/tools/salary-calculator/"
              className="rounded-xl border border-border bg-card p-4 hover:border-primary transition group"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Landmark size={16} /> Salary Calculator
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Convert gross salary to net pay across hourly, monthly and annual periods.</p>
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export default PercentageLandingPage;
