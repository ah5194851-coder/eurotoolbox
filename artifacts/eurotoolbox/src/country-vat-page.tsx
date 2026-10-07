import { useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Shell } from './App';
import { COUNTRY_VAT_PAGES, type CountryVatPageData } from './data/country-vat';
import { VatCalculator } from './components/vat-calculator';
import { updateDocumentHead } from './seo';
import NotFound from '@/pages/not-found';
import {
  ShieldCheck, Calculator, ArrowRight, ChevronDown, CheckCircle2,
  Percent, BadgeEuro, Landmark, Globe2, BookOpen
} from 'lucide-react';

interface CountryVatPageProps {
  countrySlug?: string;
}

export function CountryVatPage({ countrySlug }: CountryVatPageProps) {
  const params = useParams<{ country?: string }>();
  const activeSlug = countrySlug || params.country || '';
  const data = COUNTRY_VAT_PAGES[activeSlug];

  useEffect(() => {
    if (data) {
      updateDocumentHead(data.canonicalPath);
    }
  }, [data]);

  if (!data) {
    return <NotFound />;
  }

  const otherCountries = Object.values(COUNTRY_VAT_PAGES).filter(c => c.slug !== data.slug);

  return (
    <Shell>
      <main className="mx-auto max-w-[1160px] px-5 py-10 lg:px-10 lg:py-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/category/numbers/" className="hover:text-foreground">Numbers</Link>
          <span>/</span>
          <Link href="/tools/vat-calculator/" className="hover:text-foreground">VAT Calculator</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{data.countryName}</span>
        </nav>

        {/* Hero & Interactive Calculator Section */}
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <Calculator size={24} />
            </span>
            <p className="mt-6 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">
              {data.taxAbbr} · {data.standardRate}% standard rate
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

            {/* Quick Country Stats Box */}
            <div className="mt-6 rounded-xl border border-border/80 bg-muted/30 p-4 text-xs">
              <p className="mb-2.5 font-mono-ui text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {data.countryName} Tax Summary
              </p>
              <dl className="grid gap-2">
                <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground">Tax Name:</dt>
                  <dd className="font-semibold text-foreground text-right">{data.taxName} ({data.taxAbbr})</dd>
                </div>
                <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground">Standard Rate:</dt>
                  <dd className="font-semibold text-accent text-right">{data.standardRate}%</dd>
                </div>
                <div className="flex justify-between gap-2 border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground">Currency:</dt>
                  <dd className="font-semibold text-foreground text-right">{data.currencyCode} ({data.currencySymbol})</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Privacy:</dt>
                  <dd className="font-semibold text-foreground text-right">Zero server uploads</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Interactive Calculator Card */}
          <div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
              <VatCalculator
                initialCountry={data.slug.replace('-vat-calculator', '')}
                initialAmount={data.workedExamples[0].amount.toString()}
              />
            </div>
          </div>
        </div>

        {/* Editorial Section 1: Standard & Reduced Rates */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">Statutory Tax Rates</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                {data.countryName} VAT Rates & Classification
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                {data.ratesOverview}
              </p>
              <div className="mt-6 rounded-xl border border-border bg-card p-4">
                <h3 className="font-mono-ui text-xs font-bold uppercase tracking-wider text-primary">
                  Reduced & Zero Rates in {data.countryName}
                </h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {data.reducedRatesSummary}
                </p>
              </div>
            </div>

            {/* Editorial Section 2: Who Must Register */}
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">Compliance & Registration</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {data.registrationThreshold.heading}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {data.registrationThreshold.details}
              </p>
              <div className="mt-5 rounded-xl border border-accent/30 bg-accent/10 p-4 space-y-2">
                <div className="text-xs">
                  <span className="font-mono-ui uppercase text-[10px] font-bold text-accent block">Mandatory Threshold</span>
                  <span className="font-semibold text-foreground">{data.registrationThreshold.mandatoryThreshold}</span>
                </div>
                <div className="text-xs pt-2 border-t border-accent/20">
                  <span className="font-mono-ui uppercase text-[10px] font-bold text-muted-foreground block">Voluntary Registration</span>
                  <span className="text-muted-foreground">{data.registrationThreshold.voluntaryAllowed}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Section 3: Worked Examples for This Country */}
        <section className="mt-14">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Practical Examples</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
                Worked VAT Examples for {data.countryName} ({data.currencyCode})
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">Solved calculations with statutory rates</p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {data.workedExamples.map((ex, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-card p-6 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider text-accent">
                    {ex.mode === 'add' ? 'Forward Calculation (Net → Gross)' : 'Reverse Extraction (Gross → Net)'}
                  </span>
                  <span className="rounded bg-secondary/80 px-2 py-0.5 text-[10px] font-bold text-secondary-foreground font-mono-ui">
                    {ex.rate}% {data.taxAbbr}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{ex.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{ex.description}</p>
                
                <div className="mt-4 rounded-lg bg-muted/40 p-3.5 font-mono-ui text-xs space-y-2">
                  <div className="flex justify-between">
                    <span>{ex.mode === 'add' ? 'Net Price:' : 'Gross Total:'}</span>
                    <span className="font-semibold">{ex.currency} {ex.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-accent">
                    <span>{data.taxAbbr} Amount ({ex.rate}%):</span>
                    <span className="font-semibold">{ex.currency} {ex.vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-1.5 font-bold">
                    <span>{ex.mode === 'add' ? 'Gross Total Payable:' : 'Net Base Price:'}</span>
                    <span className="text-primary">{ex.currency} {ex.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-3 rounded border border-border/70 bg-card p-2.5 text-xs text-muted-foreground font-mono-ui">
                  <strong>Formula:</strong> {ex.formula}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Section 4: Country-Specific FAQs */}
        <section className="mt-14">
          <p className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-accent">Common Questions</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">
            Frequently Asked Questions About {data.countryName} {data.taxAbbr}
          </h2>
          <div className="mt-5 divide-y divide-border rounded-xl border border-border bg-card">
            {data.faqs.map((faq, idx) => (
              <details key={idx} className="group p-5" open={idx === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-sm sm:text-base">
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

        {/* Internal Linking Hub 1: Other Country VAT Pages */}
        <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">International Directory</p>
              <h3 className="font-display text-xl font-semibold text-foreground">Other Country VAT Calculators</h3>
            </div>
            <Link href="/tools/vat-calculator/" className="text-xs font-semibold text-primary hover:underline">
              Main Global VAT Calculator →
            </Link>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Explore dedicated calculators tailored for other international tax jurisdictions:
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherCountries.map(c => (
              <Link
                key={c.slug}
                href={c.canonicalPath}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-background/50 p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition">
                      {c.countryName}
                    </span>
                    <span className="font-mono-ui text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                      {c.standardRate}% {c.taxAbbr}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                    Calculate {c.taxName} in {c.currencyCode} ({c.currencySymbol})
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary group-hover:underline">
                  Open calculator <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Internal Linking Hub 2: Companion Calculators */}
        <section className="mt-8 rounded-2xl border border-border bg-muted/20 p-6">
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Companion Financial Tools</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground">Related Percentage & Pricing Utilities</h3>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Check out other free, client-side arithmetic calculators on LoveEasyTool:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Link
              href="/tools/vat-calculator/"
              className="rounded-xl border border-border bg-card p-4 hover:border-primary transition group"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Calculator size={16} /> Global VAT Calculator
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Universal VAT tool with custom rates and international rate reference table.</p>
            </Link>
            <Link
              href="/tools/percentage-calculator/"
              className="rounded-xl border border-border bg-card p-4 hover:border-primary transition group"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Percent size={16} /> Percentage Calculator
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Calculate percentage increase, decrease, differences, and proportions.</p>
            </Link>
            <Link
              href="/tools/discount-calculator/"
              className="rounded-xl border border-border bg-card p-4 hover:border-primary transition group"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <BadgeEuro size={16} /> Discount Calculator
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Work out retail discounts, final promotional sale prices, and money saved.</p>
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export default CountryVatPage;
