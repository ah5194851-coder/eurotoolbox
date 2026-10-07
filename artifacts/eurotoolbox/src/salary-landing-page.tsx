import { useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Shell } from './App';
import { SALARY_LANDING_PAGES, type SalaryLandingPageData } from './data/salary-landing-data';
import { SalaryCalculator } from './components/salary-calculator';
import { updateDocumentHead } from './seo';
import NotFound from '@/pages/not-found';
import {
  ShieldCheck, ArrowRight, ChevronDown, CheckCircle2,
  BadgeEuro, Briefcase, FileText, BookOpen, Percent, Calculator, Landmark
} from 'lucide-react';

interface SalaryLandingPageProps {
  slug?: string;
}

export function SalaryLandingPage({ slug }: SalaryLandingPageProps) {
  const params = useParams<{ page?: string }>();
  const activeSlug = slug || params.page || '';
  const data = SALARY_LANDING_PAGES[activeSlug];

  useEffect(() => {
    if (data) {
      updateDocumentHead(data.canonicalPath);
    }
  }, [data]);

  if (!data) {
    return <NotFound />;
  }

  const otherPages = Object.values(SALARY_LANDING_PAGES).filter(p => p.slug !== data.slug);

  return (
    <Shell>
      <main className="mx-auto max-w-[1160px] px-5 py-10 lg:px-10 lg:py-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/category/work/" className="hover:text-foreground">Work</Link>
          <span>/</span>
          <Link href="/tools/salary-calculator/" className="hover:text-foreground">Salary Calculator</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{data.h1}</span>
        </nav>

        {/* Hero & Interactive Calculator Section */}
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <BadgeEuro size={24} />
            </span>
            <p className="mt-6 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">
              Work & Payroll Utility
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

            {/* Quick Summary Card */}
            <div className="mt-6 rounded-xl border border-border/80 bg-muted/30 p-4 text-xs">
              <p className="mb-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Tool Parameters
              </p>
              <dl className="grid gap-2">
                <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground">Default Mode:</dt>
                  <dd className="font-semibold text-foreground text-right capitalize">
                    {data.defaultMode.replace(/-/g, ' ')}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground">Supported Currencies:</dt>
                  <dd className="font-semibold text-foreground text-right">GBP, EUR, USD, AED, SAR, PKR, INR</dd>
                </div>
                <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground">Deduction Logic:</dt>
                  <dd className="font-semibold text-foreground text-right">Custom % (Zero hardcoded rules)</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Security:</dt>
                  <dd className="font-semibold text-foreground text-right">Client-side browser execution</dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
              <SalaryCalculator
                initialMode={data.defaultMode}
                initialAmount={data.initialAmount}
                initialPeriod={data.initialPeriod}
              />
            </div>
          </div>
        </div>

        {/* In-Depth Educational Guide (300-400 words) */}
        <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">In-Depth Guide</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            {data.coreGuideTitle}
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
            {data.coreGuideText.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Worked Examples Section */}
        <section className="mt-14">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Worked Calculations</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
                Practical Calculation Examples
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">Step-by-step numbers with exact formulas</p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {data.workedExamples.map((ex, index) => (
              <div key={index} className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider text-accent">
                    Example {index + 1}
                  </span>
                  <span className="rounded bg-secondary/70 px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                    Verified
                  </span>
                </div>
                <h3 className="mt-2.5 font-display text-lg font-semibold text-foreground">{ex.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{ex.description}</p>
                <div className="mt-4 rounded-lg bg-muted/40 p-3 font-mono-ui text-xs space-y-1.5 text-foreground">
                  <div className="text-muted-foreground">{ex.math}</div>
                  <div className="border-t border-border pt-1.5 font-bold text-primary text-sm">
                    {ex.result}
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-muted-foreground bg-card border border-border/60 rounded p-2.5">
                  <strong>Formula:</strong> {ex.formula}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Planning Disclaimer */}
        <div className="mt-12 rounded-xl border border-secondary/60 bg-secondary/15 p-4 sm:p-5 text-xs leading-6 text-foreground">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-sm">Financial & Tax Disclaimer</span>
              <p className="text-muted-foreground mt-1">
                Estimates generated by this tool are for informational budgeting purposes only based on the percentage values you supply. They do not constitute official accounting, legal, or tax advice. For binding payroll obligations, consult official national revenue service publications or a qualified accountant.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) */}
        <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Questions & Answers</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 divide-y divide-border/60">
            {data.faqs.map((faq, index) => (
              <details key={index} className="group py-4 first:pt-0 last:pb-0" open={index === 0}>
                <summary className="flex cursor-pointer items-center justify-between font-display text-base font-semibold text-foreground list-none">
                  <span>{faq.question}</span>
                  <ChevronDown size={18} className="text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal Linking Network */}
        <section className="mt-14 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Knowledge Network</p>
              <h3 className="font-display text-xl font-semibold text-foreground">Explore Related Salary & Career Tools</h3>
            </div>
            <Link href="/tools/salary-calculator/" className="text-xs font-semibold text-primary hover:underline">
              Universal salary calculator →
            </Link>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Easily navigate between our dedicated salary calculators and professional career utilities:
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherPages.map(page => (
              <Link
                key={page.slug}
                href={page.canonicalPath}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-2xs"
              >
                <div>
                  <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition">
                    {page.h1}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {page.intro}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary group-hover:underline">
                  Open tool <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Cross-Category Tools:</span>
            <Link href="/tools/salary-calculator/" className="hover:text-primary hover:underline">
              Universal Salary Calculator
            </Link>
            <span>·</span>
            <Link href="/tools/percentage-calculator/" className="hover:text-primary hover:underline">
              Percentage Calculator
            </Link>
            <span>·</span>
            <Link href="/tools/cv-builder/" className="hover:text-primary hover:underline">
              Free CV Builder
            </Link>
            <span>·</span>
            <Link href="/tools/cover-letter-generator/" className="hover:text-primary hover:underline">
              Cover Letter Generator
            </Link>
            <span>·</span>
            <Link href="/tools/vat-calculator/" className="hover:text-primary hover:underline">
              VAT Calculator
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export default SalaryLandingPage;
