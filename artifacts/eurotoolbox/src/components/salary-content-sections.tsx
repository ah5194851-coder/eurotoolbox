import { useState } from 'react';
import { Link } from 'wouter';
import {
  COUNTRIES_CONFIG,
  calculateSalaryBreakdown,
  type SupportedCountryCode,
} from '../data/tax-config';
import {
  Calculator, BookOpen, ArrowRight, ShieldCheck, CheckCircle2,
  ChevronDown, HelpCircle, Layers, TrendingUp, DollarSign
} from 'lucide-react';

export const SALARY_FAQ_LIST: readonly [string, string][] = [
  [
    'What is the difference between gross salary and net salary?',
    'Gross salary represents your total compensation package before any compulsory or voluntary payroll deductions are taken out by your employer. Net salary, commonly referred to as take-home pay, is the actual liquid amount deposited into your personal bank account on payday. The gap between the two figures consists of statutory income taxes, employee social insurance contributions, and any optional workplace deductions.',
  ],
  [
    'How is income tax deducted from my paycheck?',
    'Income tax is deducted at source through automated payroll systems such as PAYE in the UK or withholding in the United States. Tax authorities divide your annual earnings into progressive tax brackets, meaning each tier of income is taxed only at its corresponding marginal rate. Any initial tax-free personal allowance or standard deduction is subtracted first, ensuring lower earners keep a larger portion of their initial wages.',
  ],
  [
    'How do you calculate hourly and weekly pay from an annual salary?',
    'To calculate weekly pay, divide your gross annual salary by 52 weeks, rather than multiplying by an arbitrary 4 weeks per month. To derive your hourly rate, divide that weekly figure by your contracted hours worked per week, such as the standard full-time baseline of 40 hours. This simple two-step conversion yields an accurate baseline of 2,080 annual working hours for standard employment.',
  ],
  [
    'How accurate is this salary calculator?',
    'This calculator applies verified statutory progressive tax bands and employee social contributions for each supported country, providing reliable planning estimates. However, actual paychecks can vary slightly due to individualized tax codes, pre-tax deductions like salary sacrifice pensions, and year-to-date adjustments. For binding payroll obligations, always refer to your official employer payslip or a certified accountant.',
  ],
  [
    'Does this calculation include workplace pensions or student loans?',
    'The standard country models focus specifically on statutory government income taxes and mandatory employee social insurance contributions like UK National Insurance or US FICA. They do not automatically include optional workplace pension schemes, student loan repayments, or company healthcare plans unless you use the Custom % mode. To factor in additional regular deductions, you can switch to the Custom % tab to model your complete payroll structure.',
  ],
  [
    'Why does my official payslip differ from this calculator?',
    'Your official payslip accounts for unique personal factors such as cumulative tax codes, mid-year salary changes, company benefits-in-kind, and localized regional taxes. In countries like the US, Canada, or Germany, regional state taxes, church taxes, or varying health insurer surcharges can create minor discrepancies from federal baseline rates. Furthermore, overtime pay and non-standard pay periods can introduce slight differences in monthly payroll withholdings.',
  ],
  [
    'Is any of my personal salary or financial data stored online?',
    'No, your financial figures are never stored, transmitted, or tracked on any remote server. Every calculation runs entirely in your local browser tab using client-side JavaScript, protecting your privacy. When you close or refresh your browser tab, all entered compensation numbers are instantly purged from your device memory.',
  ],
  [
    'Which countries are currently supported by this tool?',
    'The calculator currently provides built-in progressive tax and social contribution rules for the United Kingdom, United States, Canada, Australia, Germany, Poland, Pakistan, and India. Additionally, a versatile "Custom %" mode allows users from any country worldwide to calculate take-home pay using their own flat deduction rates. We regularly verify and update tax thresholds to ensure alignment with the latest national revenue service guidelines.',
  ],
];

/**
 * 1. How is Net Salary Calculated Section
 */
export function HowNetSalaryCalculatedSection() {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Formula & Methodology</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            How is Net Salary Calculated?
          </h2>
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono-ui">
          <Calculator size={14} className="text-primary" /> Step-by-Step Payroll Formula
        </span>
      </div>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Net salary represents the actual cash you retain after all mandatory statutory deductions are subtracted from your gross compensation. Calculating take-home pay involves three sequential steps:
      </p>

      {/* Core Formula Box */}
      <div className="mt-5 rounded-xl border border-primary/20 bg-primary/[.03] p-4 text-center">
        <p className="text-xs font-mono-ui uppercase tracking-wider text-accent font-bold mb-1">
          The Fundamental Take-Home Equation
        </p>
        <div className="font-mono-ui text-base sm:text-lg font-bold text-foreground">
          Net Pay = Gross Salary − (Income Tax + Social Security / National Insurance + Other Statutory Deductions)
        </div>
      </div>

      {/* Step by step worked example */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-background/80 p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-mono-ui font-bold">1</span>
            <h3 className="font-display text-sm font-semibold text-foreground">Determine Taxable Base</h3>
          </div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Subtract tax-free allowances (such as the UK £12,570 Personal Allowance or US $14,600 Standard Deduction) from gross income.
          </p>
          <div className="mt-3 rounded bg-muted/50 p-2 font-mono-ui text-[11px] text-foreground">
            Example: £45,000 − £12,570 = <strong>£32,430 taxable</strong>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/80 p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-mono-ui font-bold">2</span>
            <h3 className="font-display text-sm font-semibold text-foreground">Apply Marginal Tax Bands</h3>
          </div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Multiply each slice of taxable income by its statutory marginal rate (e.g., 20% basic rate) and calculate social insurance.
          </p>
          <div className="mt-3 rounded bg-muted/50 p-2 font-mono-ui text-[11px] text-foreground">
            Income Tax (20%): <strong>£6,486.00</strong><br />
            National Insurance (8%): <strong>£2,594.40</strong>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/80 p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-mono-ui font-bold">3</span>
            <h3 className="font-display text-sm font-semibold text-foreground">Deduct & Calculate Net</h3>
          </div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Subtract all withholdings from gross salary to arrive at net annual, monthly, and weekly figures.
          </p>
          <div className="mt-3 rounded bg-muted/50 p-2 font-mono-ui text-[11px] text-foreground font-bold text-primary">
            Net Annual: <strong>£35,919.60</strong><br />
            Net Monthly: <strong>£2,993.30</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. Gross vs Net Salary Explanation Section
 */
export function GrossVsNetSalarySection() {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Payroll Fundamentals</p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
        Gross vs Net Salary: Understanding the Key Differences
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        When negotiating job offers or budgeting for monthly living expenses, confusing gross salary with net take-home pay is one of the most common and costly financial mistakes. Here is how the two concepts compare:
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted/20 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">Gross Salary</h3>
            <span className="font-mono-ui text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">Contractual</span>
          </div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            The headline salary quoted in employment contracts, job advertisements, and annual compensation reviews before any deductions.
          </p>
          <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
              <span><strong>Used by Lenders:</strong> Mortgage providers and auto loan underwriters typically assess gross income when determining borrowing capacity.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
              <span><strong>Total Employer Cost Basis:</strong> Serves as the benchmark for annual bonuses, statutory pension match percentages, and salary increases.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
              <span><strong>Not Spendable Cash:</strong> Cannot be used directly for household budgeting because a substantial percentage is legally committed to taxes.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">Net Salary (Take-Home Pay)</h3>
            <span className="font-mono-ui text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Spendable</span>
          </div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            The liquid cash balance actually transferred to your bank account on payday after every mandatory and voluntary withholding.
          </p>
          <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Real Cash Flow:</strong> The actual figure you must use for rent, mortgage payments, groceries, utilities, savings, and investments.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Accounts for Progressive Tax:</strong> Reflects the exact marginal bands and social welfare rates in your country of employment.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Subject to Deductions:</strong> Reduced by income tax, social insurance, student loans, and company healthcare contributions.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * 3. Examples Table of Net Pay for Common Salaries in the Selected Country
 */
export function SalaryExamplesTableSection() {
  const [selectedCountry, setSelectedCountry] = useState<SupportedCountryCode>('UK');
  const countryConfig = COUNTRIES_CONFIG[selectedCountry] || COUNTRIES_CONFIG.UK;
  const sym = countryConfig.currencySymbol;

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const rows = countryConfig.commonSalaries.map(gross => {
    const res = calculateSalaryBreakdown({
      grossAmount: gross,
      period: 'Annual',
      country: selectedCountry,
    });
    return {
      gross,
      monthlyGross: res.grossMonthly,
      incomeTax: res.incomeTaxAnnual,
      social: res.socialContributionAnnual,
      totalDeductions: res.totalDeductionsAnnual,
      netAnnual: res.netPayAnnual,
      netMonthly: res.netPayMonthly,
      effectiveRate: res.effectiveTotalDeductionRatePct,
    };
  });

  const countryKeys: SupportedCountryCode[] = ['UK', 'US', 'CA', 'AU', 'DE', 'PL', 'PK', 'IN'];

  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Benchmark Figures</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            Net Pay Examples for Common Salaries
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Select a country tab to inspect verified benchmark salaries
        </p>
      </div>

      {/* Country Selector Tabs */}
      <div className="mt-5 flex flex-wrap gap-1.5 border-b border-border pb-3">
        {countryKeys.map(cKey => {
          const cfg = COUNTRIES_CONFIG[cKey];
          return (
            <button
              key={cKey}
              type="button"
              onClick={() => setSelectedCountry(cKey)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedCountry === cKey
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cfg.countryName}
            </button>
          );
        })}
      </div>

      {/* Examples Data Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[560px]">
          <thead>
            <tr className="border-b border-border bg-muted/40 font-mono-ui uppercase text-muted-foreground">
              <th className="py-3 px-3">Gross Annual</th>
              <th className="py-3 px-3">Gross Monthly</th>
              <th className="py-3 px-3 text-accent">{countryConfig.incomeTaxName}</th>
              <th className="py-3 px-3 text-destructive">{countryConfig.socialContributionName}</th>
              <th className="py-3 px-3 font-semibold text-foreground">Total Deductions</th>
              <th className="py-3 px-3 font-bold text-primary">Net Take-Home (Yr)</th>
              <th className="py-3 px-3 font-bold text-primary">Net Monthly</th>
              <th className="py-3 px-3 text-right">Effective Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 font-mono-ui">
            {rows.map(row => (
              <tr key={row.gross} className="hover:bg-muted/20 transition-colors">
                <td className="py-2.5 px-3 font-semibold text-foreground">{sym}{fmt(row.gross)}</td>
                <td className="py-2.5 px-3 text-muted-foreground">{sym}{fmt(row.monthlyGross)}</td>
                <td className="py-2.5 px-3 text-accent">{sym}{fmt(row.incomeTax)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym}{fmt(row.social)}</td>
                <td className="py-2.5 px-3 text-foreground">{sym}{fmt(row.totalDeductions)}</td>
                <td className="py-2.5 px-3 font-bold text-primary">{sym}{fmt(row.netAnnual)}</td>
                <td className="py-2.5 px-3 font-bold text-primary">{sym}{fmt(row.netMonthly)}</td>
                <td className="py-2.5 px-3 text-right font-semibold">{row.effectiveRate.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground italic">
        * Estimates based on verified single filer rates for {countryConfig.countryName} ({countryConfig.taxYear}). Excludes non-statutory pre-tax employer salary sacrifice and optional pensions.
      </p>
    </section>
  );
}

/**
 * 4. About this Utility (400-600 words, no keyword stuffing)
 */
export function AboutSalaryUtilitySection() {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">About this utility</p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
        About the LoveEasyTool Salary Calculator
      </h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
        <p>
          Evaluating employment offers, renegotiating compensation, or organizing a household budget all require an accurate understanding of what gross compensation translates to in spendable cash. Advertised job salaries are almost universally quoted in gross figures—the total monetary amount an employer agrees to disburse before mandatory statutory withholdings. However, the money that actually lands in your bank account on payday is your net salary. The difference between these two figures is determined by progressive income tax brackets, compulsory social welfare insurance, retirement schemes, and localized statutory levies.
        </p>
        <p>
          The LoveEasyTool Salary Calculator provides an instant, transparent, and private way to convert gross wages into net take-home compensation across multiple national payroll frameworks. Instead of relying on a crude flat percentage deduction, this tool implements the actual progressive tax brackets and mandatory employee contributions established by national revenue authorities, including HM Revenue & Customs in the United Kingdom, the Internal Revenue Service in the United States, the Canada Revenue Agency, the Australian Taxation Office, and the Bundesfinanzministerium in Germany. Each jurisdiction operates its own set of personal allowances, standard deductions, and progressive tiers, meaning higher slices of income are taxed at higher marginal rates while foundational earnings remain shielded.
        </p>
        <p>
          Understanding the difference between your marginal tax bracket and your effective tax rate is one of the most critical aspects of personal financial literacy. Your marginal rate represents the tax percentage paid on the last dollar or pound earned, whereas your effective rate reflects the blended percentage of your total income paid across all brackets. Many workers mistakenly believe that crossing into a higher tax bracket reduces their total take-home pay, failing to realize that only the earnings above that specific threshold are subject to the elevated rate. Our comprehensive breakdowns clarify this arithmetic by showing your true effective tax rate alongside detailed line-item deductions.
        </p>
        <p>
          Beyond annual figures, this calculator delivers a full breakdown across every relevant planning timeframe, including monthly, weekly, daily, and hourly equivalents. This granular visibility helps individuals assess hourly wage offers against annual compensation packages, compare employment contracts across different countries, and identify how much of each pay increment is absorbed by progressive taxation versus actual net gain. For users residing in countries outside our pre-configured models, our flexible custom percentage mode allows complete freedom to simulate flat tax rules and secondary insurance deductions.
        </p>
        <p>
          Importantly, LoveEasyTool operates entirely on a local-first, zero-upload architecture. Your salary details, compensation history, and financial calculations are processed exclusively within your device browser memory. Nothing is transmitted to external servers, saved in cloud databases, or tracked by user accounts. You can calculate compensation packages with complete confidence that your personal financial details remain strictly confidential.
        </p>
      </div>
    </section>
  );
}

/**
 * 5. Frequently Asked Questions (8 Questions, each 2-4 sentences)
 */
export function SalaryFaqSection() {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Questions & Answers</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">8 comprehensive payroll answers</span>
      </div>

      <div className="mt-6 divide-y divide-border/60">
        {SALARY_FAQ_LIST.map(([question, answer], index) => (
          <details key={question} className="group py-4 first:pt-0 last:pb-0" open={index === 0}>
            <summary className="flex cursor-pointer items-center justify-between font-display text-base font-semibold text-foreground list-none">
              <span>{question}</span>
              <ChevronDown size={18} className="text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/**
 * 6. Related Calculators Block (Internal Linking)
 * Links to: Percentage, VAT, Loan, Discount, CV Builder
 */
export function RelatedCalculatorsBlock() {
  const related = [
    {
      title: 'Percentage Calculator',
      path: '/tools/percentage-calculator/',
      desc: 'Calculate proportions, percentage increases, pay raises, and fractions quickly.',
      badge: 'Numbers',
    },
    {
      title: 'VAT Calculator',
      path: '/tools/vat-calculator/',
      desc: 'Add or remove statutory value-added tax from gross and net invoices.',
      badge: 'Tax',
    },
    {
      title: 'Loan Calculator',
      path: '/tools/loan-calculator/',
      desc: 'Estimate monthly amortization payments, interest charges, and mortgage costs.',
      badge: 'Finance',
    },
    {
      title: 'Discount Calculator',
      path: '/tools/discount-calculator/',
      desc: 'Determine net sale prices, percentage markdowns, and total shopping savings.',
      badge: 'Shopping',
    },
    {
      title: 'Free CV Builder',
      path: '/tools/cv-builder/',
      desc: 'Create an ATS-friendly, professional resume with live print-to-PDF export.',
      badge: 'Career',
    },
  ];

  return (
    <section className="mt-14 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Related Calculators</p>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Explore Related Financial & Career Calculators
          </h2>
        </div>
        <Link href="/#tools" className="text-xs font-semibold text-primary hover:underline">
          Browse all 31 tools →
        </Link>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        LoveEasyTool offers interconnected browser utilities for salary negotiation, financial planning, and tax accounting:
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition">
                  {item.title}
                </h3>
                <span className="font-mono-ui text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                  {item.badge}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary group-hover:underline">
              Open calculator <ArrowRight size={13} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
