import { Link } from 'wouter';
import { MAIN_SALARY_EXAMPLES, SALARY_LANDING_PAGES } from '../data/salary-landing-data';
import { BookOpen, Calculator, ArrowRight, ShieldCheck, CheckCircle2, DollarSign, Briefcase } from 'lucide-react';

export function SalaryHowToGuides() {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Career & Payroll Guides</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            How to Calculate Monthly and Net Salary
          </h2>
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono-ui">
          <Calculator size={14} className="text-primary" /> Practical Formulas
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Guide 1: Monthly from Annual */}
        <div className="rounded-xl border border-border bg-muted/20 p-5">
          <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-mono-ui font-bold">1</span>
            How to Calculate Monthly Salary from Annual Salary
          </h3>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Converting an annual compensation package into monthly cash flow is straightforward: divide the gross annual figure by 12.
          </p>
          <div className="mt-3 rounded-lg border border-border/80 bg-background p-3 font-mono-ui text-xs font-semibold text-foreground text-center">
            Gross Monthly Salary = Gross Annual Salary ÷ 12
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            For example, if you receive a job offer of $36,000 per year, your monthly gross pay is: <strong>$36,000 ÷ 12 = $3,000.00 gross per month</strong>.
          </p>
          <div className="mt-3 rounded-lg border border-secondary/50 bg-secondary/10 p-2.5 text-[11px] leading-5 text-muted-foreground">
            <strong>Important payroll note:</strong> Do not multiply a weekly rate by 4 to estimate monthly salary. Because a calendar year has 52 weeks (approx. 4.33 weeks per month), multiplying weekly pay by 4 ignores nearly a full month of wages every year.
          </div>
        </div>

        {/* Guide 2: Net Take-Home Pay */}
        <div className="rounded-xl border border-border bg-muted/20 p-5">
          <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-mono-ui font-bold">2</span>
            How to Calculate Net Salary from Gross Salary
          </h3>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Net salary is the actual amount transferred to your bank account after subtracting taxes, social security, and pension deductions.
          </p>
          <div className="mt-3 rounded-lg border border-border/80 bg-background p-3 font-mono-ui text-xs font-semibold text-foreground text-center">
            Net Salary = Gross Salary × (1 − Total Deduction% ÷ 100)
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            If your gross monthly pay is $3,000 and your effective deduction rate is 20%: <strong>$3,000 × (1 − 0.20) = $3,000 × 0.80 = $2,400.00 net take-home</strong>.
          </p>
          <ul className="mt-3 space-y-1.5 text-[11px] text-muted-foreground">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Total Deductions:</strong> Gross Salary × (Deduction% ÷ 100) = $3,000 × 0.20 = $600.00.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Second Deductions:</strong> Add retirement pension or health insurance (e.g. 5%) to your tax rate for a combined total.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SalaryWorkedExamples() {
  return (
    <section className="mt-14">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Step-by-Step Walkthroughs</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">Salary Calculation Examples</h2>
        </div>
        <p className="text-xs text-muted-foreground">Real-world numbers and exact formulas</p>
      </div>

      {/* Formulas Reference Box */}
      <div className="mt-5 rounded-xl border border-primary/25 bg-primary/[.03] p-5">
        <h3 className="font-mono-ui text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
          <BookOpen size={15} /> Core Salary Formulas
        </h3>
        <div className="mt-3 grid gap-3 text-sm text-foreground sm:grid-cols-3">
          <div className="rounded-lg border border-border/80 bg-background/80 p-3.5">
            <span className="text-xs font-semibold text-accent block font-mono-ui uppercase">1. Annual to Monthly</span>
            <code className="mt-1.5 block font-mono-ui text-xs font-semibold text-foreground bg-muted/60 p-1.5 rounded">
              Monthly = Annual ÷ 12
            </code>
            <p className="mt-1 text-[11px] text-muted-foreground">Divides yearly contractual gross pay into equal monthly amounts.</p>
          </div>
          <div className="rounded-lg border border-border/80 bg-background/80 p-3.5">
            <span className="text-xs font-semibold text-accent block font-mono-ui uppercase">2. Gross to Net Take-Home</span>
            <code className="mt-1.5 block font-mono-ui text-xs font-semibold text-foreground bg-muted/60 p-1.5 rounded">
              Net = Gross × (1 − Rate%)
            </code>
            <p className="mt-1 text-[11px] text-muted-foreground">Multiplies gross salary by the remaining take-home percentage.</p>
          </div>
          <div className="rounded-lg border border-border/80 bg-background/80 p-3.5">
            <span className="text-xs font-semibold text-accent block font-mono-ui uppercase">3. Hourly to Weekly</span>
            <code className="mt-1.5 block font-mono-ui text-xs font-semibold text-foreground bg-muted/60 p-1.5 rounded">
              Weekly = Hourly × Hours/Wk
            </code>
            <p className="mt-1 text-[11px] text-muted-foreground">Multiplies base wage by scheduled hours (e.g. 40 hrs/week).</p>
          </div>
        </div>
      </div>

      {/* 3 Solved Examples */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {MAIN_SALARY_EXAMPLES.map((ex, idx) => (
          <div key={ex.title} className="rounded-xl border border-border bg-card p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider text-accent">
                Example {idx + 1}
              </span>
              <span className="rounded bg-secondary/70 px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                Solved
              </span>
            </div>
            <h3 className="mt-2.5 font-display text-lg font-semibold text-foreground">{ex.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{ex.description}</p>
            <div className="mt-4 rounded-lg bg-muted/40 p-3 font-mono-ui text-xs space-y-1.5 text-foreground">
              <div className="text-muted-foreground">{ex.math}</div>
              <div className="border-t border-border pt-1.5 font-bold text-primary text-sm">
                Result: {ex.result}
              </div>
            </div>
            <div className="mt-3 text-[11px] text-muted-foreground bg-card border border-border/60 rounded p-2.5">
              <strong>Formula:</strong> {ex.formula}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SalaryDisclaimer() {
  return (
    <div className="mt-10 rounded-xl border border-secondary/60 bg-secondary/15 p-4 sm:p-5 text-xs leading-6 text-foreground">
      <div className="flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block text-sm">Planning Estimate Disclaimer</span>
          <p className="text-muted-foreground mt-1">
            All calculations provided by this salary calculator are mathematical planning estimates based on user-entered percentage deductions. Real take-home compensation is determined by local tax authorities, official progressive tax bands, statutory allowances, national insurance / social security thresholds, and specific employment contract terms. This tool does not constitute certified legal, tax, or financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}

export function SalaryCalculatorsLinkList() {
  const landingPagesList = Object.values(SALARY_LANDING_PAGES);

  return (
    <div className="mt-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Specialized Calculators</p>
          <h2 className="font-display text-xl font-semibold text-foreground">Salary Calculators & Take-Home Tools</h2>
        </div>
        <span className="text-xs text-muted-foreground">Pre-configured modes for common salary questions</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Explore dedicated compensation calculators tailored for specific payroll questions, contracts, and wage conversions:
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {landingPagesList.map(page => (
          <Link
            key={page.slug}
            href={page.canonicalPath}
            className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition">
                  {page.h1}
                </span>
                <span className="font-mono-ui text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded capitalize">
                  {page.defaultMode === 'converter' ? 'Converter' : page.defaultMode === 'basic-breakdown' ? 'Contract' : 'Net Pay'}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {page.intro}
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary group-hover:underline">
              Open calculator <ArrowRight size={13} />
            </span>
          </Link>
        ))}
      </div>

      {/* Cross-tool links */}
      <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Related Career & Finance Tools:</span>
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
        <span>·</span>
        <Link href="/tools/loan-calculator/" className="hover:text-primary hover:underline">
          Loan Calculator
        </Link>
      </div>
    </div>
  );
}
