import { useState, useId } from 'react';
import {
  COUNTRIES_CONFIG,
  calculateSalaryBreakdown,
  type SupportedCountryCode,
  type CalculationResult,
} from '../data/tax-config';
import {
  ShieldCheck, Printer, Copy, Check, Info,
  TrendingDown, DollarSign, ExternalLink
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface SalaryCalculatorProps {
  initialCountry?: SupportedCountryCode;
  initialAmount?: string;
  initialPeriod?: 'Hourly' | 'Weekly' | 'Monthly' | 'Annual';
  className?: string;
  onCountryChange?: (country: SupportedCountryCode) => void;
}

const DEFAULT_SALARIES: Record<SupportedCountryCode, string> = {
  UK: '45000',
  US: '65000',
  CA: '65000',
  AU: '85000',
  DE: '50000',
  PL: '90000',
  PK: '1800000',
  IN: '1200000',
  CUSTOM: '50000',
};

export function SalaryCalculator({
  initialCountry = 'UK',
  initialAmount,
  initialPeriod = 'Annual',
  className = '',
  onCountryChange,
}: SalaryCalculatorProps) {
  const [country, setCountry] = useState<SupportedCountryCode>(initialCountry);
  const [grossInput, setGrossInput] = useState<string>(
    initialAmount || DEFAULT_SALARIES[initialCountry] || '45000'
  );
  const [period, setPeriod] = useState<'Hourly' | 'Weekly' | 'Monthly' | 'Annual'>(initialPeriod);
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [customTaxPct, setCustomTaxPct] = useState<string>('20');
  const [customSocialPct, setCustomSocialPct] = useState<string>('5');
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const handleCountrySelect = (newCountry: SupportedCountryCode) => {
    setCountry(newCountry);
    // If user hasn't heavily modified or wants sensible baseline for new country
    if (!initialAmount && DEFAULT_SALARIES[newCountry]) {
      setGrossInput(DEFAULT_SALARIES[newCountry]);
    }
    if (onCountryChange) {
      onCountryChange(newCountry);
    }
  };

  const parsedGross = Math.max(0, Number(grossInput) || 0);
  const parsedHpw = Math.max(1, Math.min(168, Number(hoursPerWeek) || 40));
  const parsedCustomTax = Math.max(0, Math.min(100, Number(customTaxPct) || 0));
  const parsedCustomSocial = Math.max(0, Math.min(100, Number(customSocialPct) || 0));

  const result: CalculationResult = calculateSalaryBreakdown({
    grossAmount: parsedGross,
    period,
    hoursPerWeek: parsedHpw,
    country,
    customTaxPct: parsedCustomTax,
    customSocialPct: parsedCustomSocial,
  });

  const countryConfig = COUNTRIES_CONFIG[country] || COUNTRIES_CONFIG.UK;
  const sym = countryConfig.currencySymbol;

  const fmt = (n: number) => {
    if (isNaN(n) || !isFinite(n)) return '0.00';
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const fmtInt = (n: number) => {
    if (isNaN(n) || !isFinite(n)) return '0';
    return Math.round(n).toLocaleString(undefined);
  };

  // Stacked Visual Breakdown Percentages
  const netSharePct = result.grossAnnual > 0 ? (result.netPayAnnual / result.grossAnnual) * 100 : 100;
  const taxSharePct = result.grossAnnual > 0 ? (result.incomeTaxAnnual / result.grossAnnual) * 100 : 0;
  const socialSharePct = result.grossAnnual > 0 ? (result.socialContributionAnnual / result.grossAnnual) * 100 : 0;

  const handleCopyResult = () => {
    const summaryText = [
      `Salary Calculator Breakdown (${countryConfig.countryName} - ${countryConfig.taxYear})`,
      `--------------------------------------------------`,
      `Gross Salary: ${sym}${fmt(result.grossAnnual)} / year (${sym}${fmt(result.grossMonthly)} / month)`,
      `Payment Period: ${period} | Hours/Week: ${parsedHpw}`,
      ``,
      `Deductions Breakdown:`,
      `- ${countryConfig.incomeTaxName}: ${sym}${fmt(result.incomeTaxAnnual)} / year (${result.effectiveTaxRatePct.toFixed(1)}%)`,
      `- ${countryConfig.socialContributionName}: ${sym}${fmt(result.socialContributionAnnual)} / year (${result.effectiveSocialRatePct.toFixed(1)}%)`,
      `- Total Deductions: ${sym}${fmt(result.totalDeductionsAnnual)} / year (${result.effectiveTotalDeductionRatePct.toFixed(1)}%)`,
      ``,
      `Take-Home Pay (Net):`,
      `- Yearly:  ${sym}${fmt(result.netPayAnnual)}`,
      `- Monthly: ${sym}${fmt(result.netPayMonthly)}`,
      `- Weekly:  ${sym}${fmt(result.netPayWeekly)}`,
      `- Daily:   ${sym}${fmt(result.netPayDaily)}`,
      `- Hourly:  ${sym}${fmt(result.netPayHourly)}`,
      `--------------------------------------------------`,
      `Calculated privately on LoveEasyTool (loveeasytool.com/tools/salary-calculator/)`,
      `Disclaimer: Estimate only based on ${countryConfig.taxYear} rates. Not financial advice.`,
    ].join('\n');

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopied(true);
      toast({
        title: 'Breakdown Copied!',
        description: 'Formatted gross-to-net breakdown copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const countrySelectId = useId();
  const grossInputId = useId();
  const periodSelectId = useId();
  const hpwInputId = useId();
  const customTaxId = useId();
  const customSocialId = useId();

  return (
    <div className={`grid gap-6 ${className}`} id="salary-calculator-container">
      {/* Country and Basis Controls */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={countrySelectId} className="block text-xs font-semibold text-foreground mb-1.5">
            Country & Tax System
          </label>
          <select
            id={countrySelectId}
            data-testid="select-salary-country"
            value={country}
            onChange={e => handleCountrySelect(e.target.value as SupportedCountryCode)}
            className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            <option value="UK">🇬🇧 United Kingdom (HMRC PAYE & NI)</option>
            <option value="US">🇺🇸 United States (Federal & FICA)</option>
            <option value="CA">🇨🇦 Canada (CRA Federal & CPP/EI)</option>
            <option value="AU">🇦🇺 Australia (ATO Stage 3 & Medicare)</option>
            <option value="DE">🇩🇪 Germany (Lohnsteuer & Sozialabgaben)</option>
            <option value="PL">🇵🇱 Poland (PIT & ZUS / Umowa o pracę)</option>
            <option value="PK">🇵🇰 Pakistan (FBR Salaried Slabs & EOBI)</option>
            <option value="IN">🇮🇳 India (New Regime 115BAC & EPF)</option>
            <option value="CUSTOM">⚙️ Custom % (any country / flat rate)</option>
          </select>
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="font-mono-ui font-medium text-accent">Tax Year:</span>
            <span>{countryConfig.taxYear}</span>
          </div>
        </div>

        <div>
          <label htmlFor={periodSelectId} className="block text-xs font-semibold text-foreground mb-1.5">
            Payment Frequency
          </label>
          <select
            id={periodSelectId}
            data-testid="select-salary-period"
            value={period}
            onChange={e => setPeriod(e.target.value as any)}
            className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            <option value="Annual">Yearly / Annual Salary</option>
            <option value="Monthly">Monthly Pay</option>
            <option value="Weekly">Weekly Wage</option>
            <option value="Hourly">Hourly Rate</option>
          </select>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Currency: <strong className="text-foreground">{countryConfig.currencyCode} ({sym})</strong></span>
            <span>40 hrs/wk baseline</span>
          </div>
        </div>
      </div>

      {/* Gross Salary & Hours Input Card */}
      <div className="rounded-2xl border border-border bg-background p-5 shadow-2xs">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor={grossInputId} className="block text-xs font-semibold text-foreground mb-1.5">
              Gross {period === 'Annual' ? 'Annual' : period} Salary
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-2.5 font-mono-ui font-semibold text-muted-foreground text-base">
                {sym}
              </span>
              <input
                id={grossInputId}
                data-testid="input-salary-gross"
                type="number"
                min="0"
                step="any"
                value={grossInput}
                onChange={e => {
                  const val = e.target.value;
                  // Disallow negative values
                  if (val === '' || Number(val) >= 0) {
                    setGrossInput(val);
                  }
                }}
                className="w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2.5 text-base font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder={DEFAULT_SALARIES[country]}
                aria-label="Gross salary amount"
              />
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Total pre-tax earnings before any statutory withholdings.
            </p>
          </div>

          <div>
            <label htmlFor={hpwInputId} className="block text-xs font-semibold text-foreground mb-1.5">
              Hours per Week
            </label>
            <input
              id={hpwInputId}
              data-testid="input-salary-hours"
              type="number"
              min="1"
              max="168"
              value={hoursPerWeek}
              onChange={e => {
                const val = e.target.value;
                if (val === '' || Number(val) > 0) {
                  setHoursPerWeek(val);
                }
              }}
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-base font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="40"
              aria-label="Hours worked per week"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Used for hourly/daily pay rates.
            </p>
          </div>
        </div>

        {/* Custom Mode Extra Settings */}
        {country === 'CUSTOM' && (
          <div className="mt-4 pt-4 border-t border-border/80 grid gap-4 sm:grid-cols-2 animate-fade">
            <div>
              <label htmlFor={customTaxId} className="block text-xs font-semibold text-foreground mb-1.5">
                Income Tax Deduction Rate (%)
              </label>
              <div className="relative">
                <input
                  id={customTaxId}
                  data-testid="input-custom-tax"
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  value={customTaxPct}
                  onChange={e => setCustomTaxPct(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm font-semibold outline-none focus:border-primary"
                  placeholder="20"
                />
                <span className="pointer-events-none absolute right-3.5 top-2 font-mono-ui text-xs text-muted-foreground">%</span>
              </div>
            </div>
            <div>
              <label htmlFor={customSocialId} className="block text-xs font-semibold text-foreground mb-1.5">
                Social / Pension / Health Rate (%)
              </label>
              <div className="relative">
                <input
                  id={customSocialId}
                  data-testid="input-custom-social"
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  value={customSocialPct}
                  onChange={e => setCustomSocialPct(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm font-semibold outline-none focus:border-primary"
                  placeholder="5"
                />
                <span className="pointer-events-none absolute right-3.5 top-2 font-mono-ui text-xs text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Output Summary Highlights */}
      <div className="grid gap-3 sm:grid-cols-3">
        {/* Net Monthly Take-Home */}
        <div className="rounded-2xl border border-primary/25 bg-primary/[.04] p-5 shadow-2xs">
          <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-accent">
            Monthly Take-Home
          </span>
          <div className="mt-2 text-3xl font-extrabold font-display text-primary tracking-tight" data-testid="result-net-monthly">
            {sym} {fmt(result.netPayMonthly)}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Net pay in your bank account every month.
          </p>
        </div>

        {/* Total Monthly Deductions */}
        <div className="rounded-2xl border border-destructive/20 bg-destructive/[.04] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-destructive">
              Total Deductions
            </span>
            <span className="font-mono-ui text-[11px] font-bold rounded bg-destructive/10 text-destructive px-1.5 py-0.5">
              {result.effectiveTotalDeductionRatePct.toFixed(1)}%
            </span>
          </div>
          <div className="mt-2 text-3xl font-extrabold font-display text-foreground tracking-tight" data-testid="result-deductions-monthly">
            {sym} {fmt(result.totalDeductionsMonthly)}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {sym} {fmt(result.totalDeductionsAnnual)} deducted annually.
          </p>
        </div>

        {/* Net Annual Take-Home */}
        <div className="rounded-2xl border border-secondary/60 bg-secondary/15 p-5 shadow-2xs">
          <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-secondary-foreground">
            Annual Take-Home
          </span>
          <div className="mt-2 text-3xl font-extrabold font-display text-foreground tracking-tight" data-testid="result-net-annual">
            {sym} {fmt(result.netPayAnnual)}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Gross annual: {sym} {fmt(result.grossAnnual)}
          </p>
        </div>
      </div>

      {/* Visual Pay Distribution Bar */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Salary Allocation Visual
            </h3>
            <span className="font-mono-ui text-[11px] text-muted-foreground">
              (Effective Tax Rate: <strong className="text-foreground">{result.effectiveTotalDeductionRatePct.toFixed(1)}%</strong>)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono-ui">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span>Net Pay ({netSharePct.toFixed(1)}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span>Income Tax ({taxSharePct.toFixed(1)}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span>Social / NI ({socialSharePct.toFixed(1)}%)</span>
            </span>
          </div>
        </div>

        {/* Stacked Percentage Bar */}
        <div
          role="progressbar"
          aria-label="Salary distribution bar"
          aria-valuenow={Math.round(netSharePct)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="relative h-6 w-full overflow-hidden rounded-xl bg-muted/60 flex"
        >
          {netSharePct > 0 && (
            <div
              style={{ width: `${netSharePct}%` }}
              className="h-full bg-primary transition-all duration-300 flex items-center justify-center text-[10px] font-mono-ui font-bold text-primary-foreground truncate px-1"
              title={`Net Pay: ${sym}${fmt(result.netPayAnnual)} (${netSharePct.toFixed(1)}%)`}
            >
              {netSharePct > 12 ? `${netSharePct.toFixed(0)}% Net` : ''}
            </div>
          )}
          {taxSharePct > 0 && (
            <div
              style={{ width: `${taxSharePct}%` }}
              className="h-full bg-accent transition-all duration-300 flex items-center justify-center text-[10px] font-mono-ui font-bold text-accent-foreground truncate px-1"
              title={`Income Tax: ${sym}${fmt(result.incomeTaxAnnual)} (${taxSharePct.toFixed(1)}%)`}
            >
              {taxSharePct > 8 ? `${taxSharePct.toFixed(0)}% Tax` : ''}
            </div>
          )}
          {socialSharePct > 0 && (
            <div
              style={{ width: `${socialSharePct}%` }}
              className="h-full bg-destructive/70 transition-all duration-300 flex items-center justify-center text-[10px] font-mono-ui font-bold text-white truncate px-1"
              title={`Social / NI: ${sym}${fmt(result.socialContributionAnnual)} (${socialSharePct.toFixed(1)}%)`}
            >
              {socialSharePct > 8 ? `${socialSharePct.toFixed(0)}% NI` : ''}
            </div>
          )}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs pt-1">
          <div className="rounded-lg bg-muted/40 p-2">
            <span className="text-muted-foreground block text-[10px] font-mono-ui uppercase">Net Take-Home</span>
            <span className="font-bold text-primary">{sym} {fmt(result.netPayAnnual)}</span>
          </div>
          <div className="rounded-lg bg-muted/40 p-2">
            <span className="text-muted-foreground block text-[10px] font-mono-ui uppercase">{countryConfig.incomeTaxName}</span>
            <span className="font-bold text-accent">{sym} {fmt(result.incomeTaxAnnual)}</span>
          </div>
          <div className="rounded-lg bg-muted/40 p-2">
            <span className="text-muted-foreground block text-[10px] font-mono-ui uppercase">{countryConfig.socialContributionName}</span>
            <span className="font-bold text-destructive">{sym} {fmt(result.socialContributionAnnual)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Print Result & Copy Result */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-testid="btn-copy-salary"
            onClick={handleCopyResult}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary active:scale-95 shadow-2xs"
          >
            {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Result'}</span>
          </button>

          <button
            type="button"
            data-testid="btn-print-salary"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary active:scale-95 shadow-2xs"
          >
            <Printer size={14} />
            <span>Print Result</span>
          </button>
        </div>

        <div className="text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck size={13} className="text-accent" />
            100% Client-Side · No Data Stored
          </span>
        </div>
      </div>

      {/* Full Breakdown Across Timeframes Table */}
      <div className="rounded-2xl border border-border bg-card p-5 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Comprehensive Compensation Breakdown
            </h3>
            <p className="text-xs text-muted-foreground">
              Calculated across year, month, week, day, and hour with separate lines for tax and contributions.
            </p>
          </div>
          <span className="font-mono-ui text-[11px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded self-start sm:self-auto">
            {countryConfig.countryName}
          </span>
        </div>

        <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
          <table className="w-full text-left text-xs border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-mono-ui uppercase text-muted-foreground">
                <th className="py-3 px-3">Timeframe</th>
                <th className="py-3 px-3">Gross</th>
                <th className="py-3 px-3 text-accent">{countryConfig.incomeTaxName}</th>
                <th className="py-3 px-3 text-destructive">{countryConfig.socialContributionName}</th>
                <th className="py-3 px-3 font-semibold text-foreground">Total Deductions</th>
                <th className="py-3 px-3 font-bold text-primary">Net Pay</th>
                <th className="py-3 px-3 text-right">Effective Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono-ui">
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-2.5 px-3 font-bold text-foreground">Year</td>
                <td className="py-2.5 px-3">{sym} {fmt(result.grossAnnual)}</td>
                <td className="py-2.5 px-3 text-accent">{sym} {fmt(result.incomeTaxAnnual)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym} {fmt(result.socialContributionAnnual)}</td>
                <td className="py-2.5 px-3 font-medium text-foreground">{sym} {fmt(result.totalDeductionsAnnual)}</td>
                <td className="py-2.5 px-3 font-extrabold text-primary text-sm">{sym} {fmt(result.netPayAnnual)}</td>
                <td className="py-2.5 px-3 text-right font-semibold">{result.effectiveTotalDeductionRatePct.toFixed(1)}%</td>
              </tr>
              <tr className="hover:bg-muted/20 transition-colors bg-muted/10">
                <td className="py-2.5 px-3 font-bold text-foreground">Month</td>
                <td className="py-2.5 px-3">{sym} {fmt(result.grossMonthly)}</td>
                <td className="py-2.5 px-3 text-accent">{sym} {fmt(result.incomeTaxMonthly)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym} {fmt(result.socialContributionMonthly)}</td>
                <td className="py-2.5 px-3 font-medium text-foreground">{sym} {fmt(result.totalDeductionsMonthly)}</td>
                <td className="py-2.5 px-3 font-extrabold text-primary text-sm">{sym} {fmt(result.netPayMonthly)}</td>
                <td className="py-2.5 px-3 text-right font-semibold">{result.effectiveTotalDeductionRatePct.toFixed(1)}%</td>
              </tr>
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-2.5 px-3 font-bold text-foreground">Week</td>
                <td className="py-2.5 px-3">{sym} {fmt(result.grossWeekly)}</td>
                <td className="py-2.5 px-3 text-accent">{sym} {fmt(result.incomeTaxWeekly)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym} {fmt(result.socialContributionWeekly)}</td>
                <td className="py-2.5 px-3 font-medium text-foreground">{sym} {fmt(result.totalDeductionsWeekly)}</td>
                <td className="py-2.5 px-3 font-extrabold text-primary text-sm">{sym} {fmt(result.netPayWeekly)}</td>
                <td className="py-2.5 px-3 text-right font-semibold">{result.effectiveTotalDeductionRatePct.toFixed(1)}%</td>
              </tr>
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-2.5 px-3 font-bold text-foreground">Day (8 hrs)</td>
                <td className="py-2.5 px-3">{sym} {fmt(result.grossDaily)}</td>
                <td className="py-2.5 px-3 text-accent">{sym} {fmt(result.incomeTaxDaily)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym} {fmt(result.socialContributionDaily)}</td>
                <td className="py-2.5 px-3 font-medium text-foreground">{sym} {fmt(result.totalDeductionsDaily)}</td>
                <td className="py-2.5 px-3 font-extrabold text-primary text-sm">{sym} {fmt(result.netPayDaily)}</td>
                <td className="py-2.5 px-3 text-right font-semibold">{result.effectiveTotalDeductionRatePct.toFixed(1)}%</td>
              </tr>
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-2.5 px-3 font-bold text-foreground">Hour</td>
                <td className="py-2.5 px-3">{sym} {fmt(result.grossHourly)}</td>
                <td className="py-2.5 px-3 text-accent">{sym} {fmt(result.incomeTaxHourly)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym} {fmt(result.socialContributionHourly)}</td>
                <td className="py-2.5 px-3 font-medium text-foreground">{sym} {fmt(result.totalDeductionsHourly)}</td>
                <td className="py-2.5 px-3 font-extrabold text-primary text-sm">{sym} {fmt(result.netPayHourly)}</td>
                <td className="py-2.5 px-3 text-right font-semibold">{result.effectiveTotalDeductionRatePct.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Source & Notes Footer */}
        <div className="mt-4 pt-3 border-t border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-muted-foreground">
          <div>
            <span>Verified Rules: </span>
            <strong className="text-foreground">{countryConfig.sourceAuthority}</strong>
            <span> · Verified: {countryConfig.lastVerified}</span>
          </div>
          {countryConfig.officialSourceUrl && country !== 'CUSTOM' && (
            <a
              href={countryConfig.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              {countryConfig.sourceAuthority} <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>

      {/* Visible Note Under Result */}
      <div className="rounded-xl border border-primary/25 bg-primary/[.04] p-4 text-xs text-foreground">
        <p className="flex flex-wrap items-center gap-1.5 leading-relaxed">
          <span>Rates for tax year <strong>{countryConfig.taxYear}</strong>. Estimates only. </span>
          {countryConfig.officialSourceUrl && country !== 'CUSTOM' ? (
            <a
              href={countryConfig.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline hover:text-primary/80 inline-flex items-center gap-1"
            >
              Check the official government site for your exact figures <ExternalLink size={12} />
            </a>
          ) : (
            <span>Check the official government site for your exact figures.</span>
          )}
        </p>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="rounded-xl border border-secondary/60 bg-secondary/15 p-4 text-xs leading-6 text-foreground">
        <div className="flex items-start gap-2.5">
          <Info size={16} className="text-primary shrink-0 mt-0.5" />
          <p className="text-muted-foreground">
            <strong className="text-foreground font-semibold">Important Disclaimer:</strong> All calculations provided by this salary calculator are mathematical estimates intended solely for personal budgeting and planning purposes. They do not constitute official accounting, tax, or legal advice. Final payroll withholdings may vary due to localized tax credits, student loans, company pension schemes, marriage allowances, or regional surcharges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SalaryCalculator;
