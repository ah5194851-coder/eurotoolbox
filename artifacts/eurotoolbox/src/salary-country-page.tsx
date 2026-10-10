import { useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Shell } from './App';
import { SALARY_COUNTRY_PAGES } from './data/salary-country-data';
import { COUNTRIES_CONFIG, type SupportedCountryCode } from './data/tax-config';
import { SalaryCalculator } from './components/salary-calculator';
import {
  HowNetSalaryCalculatedSection,
  GrossVsNetSalarySection,
  SalaryExamplesTableSection,
  RelatedCalculatorsBlock,
} from './components/salary-content-sections';
import { updateDocumentHead } from './seo';
import NotFound from '@/pages/not-found';
import {
  ShieldCheck, ArrowRight, ChevronDown, CheckCircle2,
  BadgeEuro, Briefcase, Calculator, Landmark, ExternalLink
} from 'lucide-react';

interface SalaryCountryPageProps {
  countrySlug?: string;
}

export function SalaryCountryPage({ countrySlug }: SalaryCountryPageProps) {
  const params = useParams<{ country?: string }>();
  const activeSlug = countrySlug || params.country || '';
  const pageData = SALARY_COUNTRY_PAGES[activeSlug];

  useEffect(() => {
    if (pageData) {
      updateDocumentHead(pageData.canonicalPath);
    }
  }, [pageData]);

  if (!pageData) {
    return <NotFound />;
  }

  const countryConfig = (pageData && COUNTRIES_CONFIG[pageData.countryId]) || COUNTRIES_CONFIG.UK;
  const otherCountries = Object.values(SALARY_COUNTRY_PAGES).filter(c => c.slug !== pageData.slug);

  return (
    <Shell>
      <main className="mx-auto max-w-[1160px] px-5 py-10 lg:px-10 lg:py-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/category/work/" className="hover:text-foreground">Work</Link>
          <span>/</span>
          <Link href="/tools/salary-calculator/" className="hover:text-foreground">Salary Calculator</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{pageData.countryName}</span>
        </nav>

        {/* Hero Header */}
        <header className="mb-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono-ui text-xs font-semibold text-primary">
              <span className="text-sm">{pageData.flagEmoji}</span>
              <span>{pageData.countryName}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-mono-ui text-xs text-muted-foreground">
              Tax Year: {countryConfig.taxYear}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {pageData.h1}
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {pageData.intro}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 text-primary">
              <ShieldCheck size={15} />
              <span>100% Client-Side Privacy</span>
            </div>
            <span>•</span>
            <div>Authority: <strong>{countryConfig.sourceAuthority}</strong></div>
            <span>•</span>
            <a
              href={countryConfig.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
            >
              Official Govt Rates <ExternalLink size={11} />
            </a>
          </div>

          <div className="mt-3 text-[11px] text-muted-foreground font-mono-ui">
            * Estimated using published statutory rates, tax year {countryConfig.taxYear}. Always confirm with the official source.
          </div>
        </header>

        {/* Main Interactive Tool Pre-Selected to this Country */}
        <section aria-label={`${pageData.countryName} Salary Calculator Tool`}>
          <SalaryCalculator initialCountry={pageData.countryId} />
        </section>

        {/* Worked Example for this Country */}
        <HowNetSalaryCalculatedSection countryCode={pageData.countryId} />

        {/* Common Salaries Benchmark Table for this Country in its Own Currency */}
        <SalaryExamplesTableSection country={pageData.countryId} lockCountry />

        {/* Gross vs Net Salary Section */}
        <GrossVsNetSalarySection />

        {/* Country Specific FAQ Section */}
        <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center mb-6">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Tax Questions & Answers</p>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Frequently Asked Questions ({pageData.countryName})
              </h2>
            </div>
            <span className="font-mono-ui text-xs text-muted-foreground">
              {countryConfig.taxYear} Guidelines
            </span>
          </div>

          <div className="divide-y divide-border/80">
            {pageData.faqList.map(([question, answer], idx) => (
              <div key={idx} className="py-4">
                <h3 className="font-display text-base font-semibold text-foreground">
                  {question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Other Country Salary Portals */}
        <section className="mt-14 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">International Payroll Portals</p>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Salary Calculators for Other Countries
              </h2>
            </div>
            <Link href="/tools/salary-calculator/" className="text-xs font-semibold text-primary hover:underline">
              Universal multi-country calculator →
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Explore statutory salary calculations for other major global economies. Estimated using published statutory rates, tax year 2026/27. Always confirm with the official source:
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {otherCountries.map(c => (
              <Link
                key={c.slug}
                href={c.canonicalPath}
                className="group flex items-center justify-between rounded-xl border border-border/80 bg-card px-3.5 py-2.5 transition hover:border-primary hover:shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base shrink-0">{c.flagEmoji}</span>
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition">
                    {c.countryName}
                  </span>
                </div>
                <ArrowRight size={13} className="text-muted-foreground group-hover:text-primary transition" />
              </Link>
            ))}
          </div>
        </section>

        <RelatedCalculatorsBlock />
      </main>
    </Shell>
  );
}

export default SalaryCountryPage;
