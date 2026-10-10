import { SALARY_COUNTRY_PAGES } from '../data/salary-country-data';
import { useState } from 'react';
import { Link } from 'wouter';
import {
  COUNTRIES_CONFIG,
  VERIFIED_COUNTRY_IDS,
  calculateSalaryBreakdown,
  type SupportedCountryCode,
} from '../data/tax-config';
import {
  Calculator, BookOpen, ArrowRight, ShieldCheck, CheckCircle2,
  ChevronDown, HelpCircle, Layers, TrendingUp, DollarSign
} from 'lucide-react';

const COUNTRY_NAMES_LIST_TEXT = VERIFIED_COUNTRY_IDS.map(id => COUNTRIES_CONFIG[id].name).join(', ');

export const SALARY_FAQ_LIST: readonly [string, string][] = [
  [
    'What is the difference between gross salary and net salary?',
    'Gross salary represents your total compensation package before any compulsory statutory or voluntary payroll deductions are taken out by your employer. Net salary, commonly referred to as take-home pay, is the actual liquid amount deposited into your personal bank account on payday. The gap between the two figures consists of statutory income taxes, employee social insurance contributions, and any optional workplace deductions.',
  ],
  [
    'How is income tax deducted from my paycheck?',
    'Income tax is deducted at source through automated payroll systems such as PAYE in the UK and Ireland, withholding in the United States and Canada, or Lohnsteuer in Germany. Tax authorities divide your annual earnings into progressive tax brackets, meaning each tier of income is taxed only at its corresponding marginal rate. Any initial tax-free personal allowance or standard deduction is subtracted first, ensuring lower earners keep a larger portion of their foundational wages.',
  ],
  [
    'How do you calculate hourly and weekly pay from an annual salary?',
    'To calculate weekly pay, divide your gross annual salary by 52 weeks, rather than multiplying by an arbitrary 4 weeks per month. To derive your hourly rate, divide that weekly figure by your contracted hours worked per week, such as the standard full-time baseline of 40 hours. This conversion yields an accurate baseline of 2,080 annual working hours for standard full-time employment.',
  ],
  [
    'How accurate is this salary calculator?',
    'This calculator is estimated using published statutory rates from official national revenue authorities for the applicable tax year. However, actual paychecks can vary slightly due to individualized tax codes, pre-tax salary sacrifice deductions (like retirement plans or pensions), regional state or municipal taxes, and year-to-date adjustments. Always confirm with the official source and your formal employer payslip.',
  ],
  [
    'Does this calculation include workplace pensions or student loans?',
    'The standard country models focus specifically on statutory government income taxes and mandatory employee social insurance contributions (such as UK National Insurance, US FICA, or German Sozialversicherung). They do not automatically include optional workplace pension schemes, student loan repayments, or company healthcare plans unless you use the custom mode. To factor in additional regular deductions, switch to the "Any other country (custom)" option.',
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
    `The calculator provides built-in progressive tax and social contribution rules estimated from published statutory rates for 15 countries: ${COUNTRY_NAMES_LIST_TEXT}. Additionally, an "Any other country (custom)" mode with a searchable world currency picker allows users from any nation worldwide to enter their own flat percentage or up to 5 progressive tax bands. Results are estimated using published statutory rates; always confirm with the official source.`,
  ],
];

interface HowNetSalaryCalculatedSectionProps {
  countryCode?: SupportedCountryCode;
}

/**
 * 1. How is Net Salary Calculated Section (Country-specific worked example)
 */
export function HowNetSalaryCalculatedSection({
  countryCode = 'UK',
}: HowNetSalaryCalculatedSectionProps) {
  const cfg = COUNTRIES_CONFIG[countryCode] || COUNTRIES_CONFIG.UK;
  const sym = cfg.currencySymbol;
  // Choose country-appropriate sample salary (e.g. index 2 or 1 of commonSalaries)
  const sampleGross = cfg.commonSalaries[2] || cfg.commonSalaries[1] || 50000;
  const res = calculateSalaryBreakdown(sampleGross, countryCode);

  const fmtInt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtDec = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Determine country-specific allowance explanation for Step 1
  let step1Desc = '';
  let step1Example = '';

  if (countryCode === 'US') {
    const stdDed = cfg.standardAllowance || 15000;
    const taxableBase = Math.max(0, sampleGross - stdDed);
    step1Desc = `Subtract the single filer standard deduction (${sym}${fmtInt(stdDed)} from official IRS published statutory rates for ${cfg.taxYear}) from gross salary.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} − ${sym}${fmtInt(stdDed)} = ${sym}${fmtInt(taxableBase)} taxable base`;
  } else if (countryCode === 'UK') {
    const pa = cfg.standardAllowance || 12570;
    const taxableBase = Math.max(0, sampleGross - pa);
    step1Desc = `Subtract the statutory tax-free Personal Allowance (${sym}${fmtInt(pa)} from official HMRC published rates for ${cfg.taxYear}) from gross salary.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} − ${sym}${fmtInt(pa)} = ${sym}${fmtInt(taxableBase)} taxable base`;
  } else if (countryCode === 'CA') {
    const bpa = cfg.standardAllowance || 16125;
    step1Desc = `Apply the statutory Basic Personal Amount (${sym}${fmtInt(bpa)} from CRA published rates for ${cfg.taxYear}) as a non-refundable 15% federal tax credit.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} gross salary assessed against progressive federal brackets with ${sym}${fmtInt(bpa)} basic personal credit`;
  } else if (countryCode === 'AU') {
    const thresh = cfg.standardAllowance || 18200;
    const taxableBase = Math.max(0, sampleGross - thresh);
    step1Desc = `Apply the legislated statutory tax-free threshold (${sym}${fmtInt(thresh)} from published ATO Stage 3 rates for ${cfg.taxYear}) to gross salary.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} − ${sym}${fmtInt(thresh)} = ${sym}${fmtInt(taxableBase)} taxable in higher brackets`;
  } else if (countryCode === 'DE') {
    const gfb = cfg.standardAllowance || 12096;
    const taxableBase = Math.max(0, sampleGross - gfb);
    step1Desc = `Subtract the statutory Grundfreibetrag (${sym}${fmtInt(gfb)} from published BMF schedules for ${cfg.taxYear}) from gross annual salary.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} − ${sym}${fmtInt(gfb)} = ${sym}${fmtInt(taxableBase)} taxable base`;
  } else if (countryCode === 'PL') {
    const kwota = cfg.standardAllowance || 30000;
    step1Desc = `Apply the ${sym}${fmtInt(kwota)} Kwota wolna od podatku allowance against progressive tax liability after statutory employee ZUS deductions.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} gross salary with ${sym}${fmtInt(kwota)} tax-free threshold`;
  } else if (countryCode === 'PK') {
    const exemptSlab = cfg.standardAllowance || 600000;
    const taxableBase = Math.max(0, sampleGross - exemptSlab);
    step1Desc = `Apply the statutory zero-tax exemption slab (${sym}${fmtInt(exemptSlab)} from published FBR salaried tax schedules for ${cfg.taxYear}).`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} gross: first ${sym}${fmtInt(exemptSlab)} is 0% tax, ${sym}${fmtInt(taxableBase)} taxed under progressive slabs`;
  } else if (countryCode === 'IN') {
    const stdDed = cfg.standardAllowance || 75000;
    const taxableBase = Math.max(0, sampleGross - stdDed);
    step1Desc = `Subtract the Section 115BAC New Tax Regime standard deduction (${sym}${fmtInt(stdDed)} from published Income Tax Dept rates for ${cfg.taxYear}) from gross CTC.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} − ${sym}${fmtInt(stdDed)} = ${sym}${fmtInt(taxableBase)} taxable base`;
  } else if (countryCode === 'UAE' || countryCode === 'SA') {
    step1Desc = `In ${cfg.name}, employment income is subject to 0% statutory personal income tax. The entire gross wage is exempt from personal income taxes.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} gross salary = 0% statutory income tax withholding`;
  } else if (countryCode === 'IE') {
    step1Desc = `Calculate statutory income tax using the single standard rate cut-off point (€44,000 at 20%) and apply standard personal and PAYE tax credits (€4,000 total).`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} evaluated against standard rate cut-off and statutory credits`;
  } else if (countryCode === 'NZ') {
    const thresh = cfg.standardAllowance || 15600;
    step1Desc = `Apply statutory marginal tax brackets published by Inland Revenue (IRD) for ${cfg.taxYear}, starting at 10.5% on the first ${sym}${fmtInt(thresh)}.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} assessed progressively through IRD tax brackets and ACC earner levy`;
  } else if (countryCode === 'SG') {
    const thresh = cfg.standardAllowance || 20000;
    step1Desc = `Apply the statutory 0% tax-free slab on the first ${sym}${fmtInt(thresh)} under published IRAS resident tax brackets.`;
    step1Example = `Example: First ${sym}${fmtInt(thresh)} is 0% tax; remaining ${sym}${fmtInt(Math.max(0, sampleGross - thresh))} subject to marginal rates`;
  } else if (countryCode === 'NL') {
    step1Desc = `Apply Box 1 published tax brackets and calculate statutory general (heffingskorting) and labour (arbeidskorting) tax credits for ${cfg.taxYear}.`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} assessed under Box 1 combined tax & national insurance rates with statutory credits`;
  } else if (countryCode === 'ZA') {
    const thresh = cfg.standardAllowance || 95750;
    step1Desc = `Apply SARS progressive income tax brackets (18%–45%) and subtract the statutory primary tax rebate (R17,235, giving an effective tax-free threshold of ${sym}${fmtInt(thresh)}).`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} assessed under SARS statutory brackets and primary rebate`;
  } else {
    step1Desc = `Apply published statutory tax allowances and progressive exemption thresholds for ${cfg.name} (${cfg.taxYear}).`;
    step1Example = `Example: ${sym}${fmtInt(sampleGross)} gross salary analyzed under ${cfg.taxYear} statutory rates`;
  }

  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Formula & Methodology</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            How is Net Salary Calculated in {cfg.name}?
          </h2>
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono-ui">
          <Calculator size={14} className="text-primary" /> Step-by-Step Payroll Formula
        </span>
      </div>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Net salary represents the liquid take-home pay you retain after mandatory statutory withholdings are deducted from your gross compensation. Calculating take-home pay involves three sequential steps:
      </p>

      {/* Core Formula Box */}
      <div className="mt-5 rounded-xl border border-primary/20 bg-primary/[.03] p-4 text-center">
        <p className="text-xs font-mono-ui uppercase tracking-wider text-accent font-bold mb-1">
          The Fundamental Take-Home Equation
        </p>
        <div className="font-mono-ui text-base sm:text-lg font-bold text-foreground">
          Net Pay = Gross Salary − ({cfg.incomeTaxName} + {cfg.socialContributionName})
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
            {step1Desc}
          </p>
          <div className="mt-3 rounded bg-muted/50 p-2 font-mono-ui text-[11px] text-foreground">
            {step1Example}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/80 p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-mono-ui font-bold">2</span>
            <h3 className="font-display text-sm font-semibold text-foreground">Calculate Statutory Deductions</h3>
          </div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Apply statutory marginal brackets and employee social contribution rates published for {cfg.taxYear}.
          </p>
          <div className="mt-3 rounded bg-muted/50 p-2 font-mono-ui text-[11px] text-foreground space-y-1">
            <div>{cfg.incomeTaxName}: <strong>{sym}{fmtDec(res.incomeTaxAnnual)}</strong></div>
            <div>{cfg.socialContributionName}: <strong>{sym}{fmtDec(res.socialContributionAnnual)}</strong></div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/80 p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-mono-ui font-bold">3</span>
            <h3 className="font-display text-sm font-semibold text-foreground">Deduct & Compute Take-Home</h3>
          </div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Subtract all withholdings from gross salary to determine spendable cash per year and month.
          </p>
          <div className="mt-3 rounded bg-muted/50 p-2 font-mono-ui text-[11px] text-foreground font-bold text-primary space-y-1">
            <div>Net Annual: <strong>{sym}{fmtDec(res.netPayAnnual)}</strong></div>
            <div>Net Monthly: <strong>{sym}{fmtDec(res.netPayMonthly)}</strong></div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground">
        * Estimated using published statutory rates, tax year {cfg.taxYear}. Always confirm with the official source ({cfg.sourceAuthority}).
      </p>
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
        When negotiating job offers or budgeting for monthly living expenses, confusing gross salary with net take-home pay is one of the most common financial mistakes. Here is how the two concepts compare:
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
            The liquid cash balance actually transferred to your bank account on payday after mandatory statutory and voluntary withholdings.
          </p>
          <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Real Cash Flow:</strong> The actual figure you must use for rent, mortgage payments, groceries, utilities, savings, and investments.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Reflects Personal Circumstances:</strong> Incorporates your tax credits, marital status deductions, pension contributions, and local tax rules.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span><strong>True Comparison Metric:</strong> The only reliable baseline when comparing job opportunities across different countries or states.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

interface SalaryExamplesTableSectionProps {
  country?: SupportedCountryCode;
  lockCountry?: boolean;
}

/**
 * 3. Examples Table of Net Pay for Common Salaries (Precomputed build-time safe)
 */
export function SalaryExamplesTableSection({
  country: propCountry,
  lockCountry = false,
}: SalaryExamplesTableSectionProps = {}) {
  const [selectedCountry, setSelectedCountry] = useState<SupportedCountryCode>(propCountry || 'UK');
  const activeCountry = lockCountry && propCountry ? propCountry : selectedCountry;
  const countryConfig = COUNTRIES_CONFIG[activeCountry] || COUNTRIES_CONFIG.UK;
  const sym = countryConfig.currencySymbol;

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // Correct calculation passing gross (number) and activeCountry (string code)
  const rows = countryConfig.commonSalaries.map(gross => {
    const res = calculateSalaryBreakdown(gross, activeCountry);
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

  const countryKeys = VERIFIED_COUNTRY_IDS;

  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8" id="benchmark-salaries-table">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Benchmark Figures</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            Net Pay Examples for Common Salaries in {countryConfig.name}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Estimated using published statutory rates, tax year {countryConfig.taxYear}. Always confirm with the official source.
        </p>
      </div>

      {/* Country Selector Tabs (Only if not locked to single country) */}
      {!lockCountry && (
        <div className="mt-5 flex flex-wrap gap-1.5 border-b border-border pb-3">
          {countryKeys.map(cKey => {
            const cfg = COUNTRIES_CONFIG[cKey];
            return (
              <button
                key={cKey}
                type="button"
                onClick={() => setSelectedCountry(cKey)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition flex items-center gap-1.5 ${
                  activeCountry === cKey
                    ? 'bg-primary text-primary-foreground shadow-2xs'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{cfg.flagEmoji}</span>
                <span>{cfg.name}</span>
              </button>
            );
          })}
        </div>
      )}

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
                <td className="py-2.5 px-3 text-foreground font-semibold">{sym}{fmt(row.totalDeductions)}</td>
                <td className="py-2.5 px-3 text-primary font-bold">{sym}{fmt(row.netAnnual)}</td>
                <td className="py-2.5 px-3 text-primary font-bold">{sym}{fmt(row.netMonthly)}</td>
                <td className="py-2.5 px-3 text-right text-muted-foreground">{row.effectiveRate.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
        <span>Authority: <strong className="text-foreground">{countryConfig.sourceAuthority}</strong></span>
        <a
          href={countryConfig.officialSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
        >
          <span>Official Source Rates</span>
          <ArrowRight size={11} />
        </a>
      </div>
    </section>
  );
}

/**
 * Dedicated Country Portals Showcase Block (Flag emojis displayed)
 */
export function VerifiedCountryPortalsBlock() {
  const countryPages = Object.values(SALARY_COUNTRY_PAGES);

  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Global Coverage</p>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Country Salary Portals
          </h2>
        </div>
        <span className="font-mono-ui text-xs text-muted-foreground">
          Estimated using published statutory rates. Always confirm with the official source.
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Explore dedicated salary calculators for 15 major world economies, featuring statutory tax brackets, social contributions, and worked examples:
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {countryPages.map(c => (
          <Link
            key={c.slug}
            href={c.canonicalPath}
            className="group flex items-center justify-between rounded-xl border border-border/80 bg-background px-3 py-2.5 transition hover:border-primary hover:shadow-2xs"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-base shrink-0">{c.flagEmoji}</span>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition truncate">
                {c.countryName}
              </span>
            </div>
            <ArrowRight size={12} className="text-muted-foreground group-hover:text-primary transition shrink-0 ml-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * 4. About this Utility (Consistent country count from taxConfig, no claims of verified)
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
          The LoveEasyTool Salary Calculator provides an instant, transparent, and private way to convert gross wages into net take-home compensation across multiple national payroll frameworks. Instead of relying on a crude flat percentage deduction, this tool implements published statutory tax brackets and mandatory employee contributions established by national revenue authorities across 15 countries: {COUNTRY_NAMES_LIST_TEXT}. For any other jurisdiction worldwide, a flexible custom mode with an ISO 4217 currency selector allows modeling custom flat or progressive tax tiers.
        </p>
        <p>
          Each jurisdiction operates its own set of personal allowances, standard deductions, and progressive tiers, meaning higher slices of income are taxed at higher marginal rates while foundational earnings remain shielded. Every calculation runs client-side in your browser with zero data retention or tracking. All figures are estimated using published statutory rates for the applicable tax year; always confirm with the official national revenue authority.
        </p>
      </div>
    </section>
  );
}

/**
 * 5. Salary Calculator FAQ Section
 */
export function SalaryFaqSection() {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center mb-6">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Common Inquiries</p>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <span className="font-mono-ui text-xs text-muted-foreground">
          Clear, Practical Salary Answers
        </span>
      </div>

      <div className="divide-y divide-border/80">
        {SALARY_FAQ_LIST.map(([question, answer], idx) => (
          <details key={idx} className="group py-4 transition-all">
            <summary className="flex cursor-pointer items-center justify-between text-left font-display text-base font-semibold text-foreground transition hover:text-primary">
              <span>{question}</span>
              <ChevronDown
                size={18}
                className="shrink-0 text-muted-foreground transition duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
