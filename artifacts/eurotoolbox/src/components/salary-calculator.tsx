import { useState } from 'react';
import { SALARY_CURRENCIES, type SalaryCurrency } from '../data/salary-landing-data';
import { Landmark, ArrowRight, ShieldCheck, DollarSign, Calculator, RefreshCw } from 'lucide-react';

export type SalaryCalculatorMode = 'gross-to-net' | 'converter' | 'basic-breakdown';

interface SalaryCalculatorProps {
  initialMode?: SalaryCalculatorMode;
  initialAmount?: string;
  initialPeriod?: 'Hourly' | 'Weekly' | 'Monthly' | 'Annual';
  className?: string;
}

export function SalaryCalculator({
  initialMode = 'gross-to-net',
  initialAmount = '4200',
  initialPeriod = 'Monthly',
  className = '',
}: SalaryCalculatorProps) {
  const [mode, setMode] = useState<SalaryCalculatorMode>(initialMode);
  const [currencyCode, setCurrencyCode] = useState<string>('USD');

  // Mode 1: Gross to Net
  const [grossAmount, setGrossAmount] = useState<string>(initialAmount);
  const [period, setPeriod] = useState<'Hourly' | 'Weekly' | 'Monthly' | 'Annual'>(initialPeriod);
  const [taxDeduction, setTaxDeduction] = useState<string>('20');
  const [secondDeduction, setSecondDeduction] = useState<string>('5');
  const [enableSecondDeduction, setEnableSecondDeduction] = useState<boolean>(false);

  // Mode 2: Salary Converter
  const [converterAmount, setConverterAmount] = useState<string>('50000');
  const [converterPeriod, setConverterPeriod] = useState<'Hourly' | 'Daily' | 'Weekly' | 'Monthly' | 'Annual'>('Annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [weeksPerYear, setWeeksPerYear] = useState<string>('52');

  // Mode 3: Basic Salary Breakdown
  const [basicSalary, setBasicSalary] = useState<string>('4000');
  const [allowancesPct, setAllowancesPct] = useState<string>('25');
  const [breakdownDeductionPct, setBreakdownDeductionPct] = useState<string>('10');

  const activeCurrency = SALARY_CURRENCIES.find(c => c.code === currencyCode) || SALARY_CURRENCIES[2];
  const sym = activeCurrency.symbol;

  const fmt = (n: number) => {
    if (isNaN(n) || !isFinite(n)) return '0.00';
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Mode 1 Calculations: Gross to Net
  const parsedGross = Math.max(0, Number(grossAmount) || 0);
  const taxPct = Math.max(0, Number(taxDeduction) || 0);
  const secPct = enableSecondDeduction ? Math.max(0, Number(secondDeduction) || 0) : 0;
  const totalDeductionPct = Math.min(100, taxPct + secPct);

  // Normalize to annual gross first
  let annualGross = 0;
  if (period === 'Annual') annualGross = parsedGross;
  else if (period === 'Monthly') annualGross = parsedGross * 12;
  else if (period === 'Weekly') annualGross = parsedGross * 52;
  else if (period === 'Hourly') annualGross = parsedGross * 40 * 52; // 2,080 hrs

  const annualNet = annualGross * (1 - totalDeductionPct / 100);
  const annualDeductionAmt = annualGross - annualNet;

  const monthlyGross = annualGross / 12;
  const monthlyNet = annualNet / 12;
  const monthlyDeduction = annualDeductionAmt / 12;

  const weeklyGross = annualGross / 52;
  const weeklyNet = annualNet / 52;

  const dailyGross = annualGross / (52 * 5); // 260 days
  const dailyNet = annualNet / (52 * 5);

  const hourlyGross = annualGross / (52 * 40); // 2,080 hrs
  const hourlyNet = annualNet / (52 * 40);

  // Mode 2 Calculations: Converter
  const parsedConvAmt = Math.max(0, Number(converterAmount) || 0);
  const hpw = Math.max(1, Number(hoursPerWeek) || 40);
  const wpy = Math.max(1, Number(weeksPerYear) || 52);
  const annualHours = hpw * wpy;
  const annualDays = wpy * 5;

  let convAnnual = 0;
  if (converterPeriod === 'Annual') convAnnual = parsedConvAmt;
  else if (converterPeriod === 'Monthly') convAnnual = parsedConvAmt * 12;
  else if (converterPeriod === 'Weekly') convAnnual = parsedConvAmt * wpy;
  else if (converterPeriod === 'Daily') convAnnual = parsedConvAmt * annualDays;
  else if (converterPeriod === 'Hourly') convAnnual = parsedConvAmt * annualHours;

  const convMonthly = convAnnual / 12;
  const convWeekly = convAnnual / wpy;
  const convDaily = convAnnual / annualDays;
  const convHourly = convAnnual / annualHours;

  // Mode 3 Calculations: Basic Salary Breakdown
  const parsedBasic = Math.max(0, Number(basicSalary) || 0);
  const parsedAllowPct = Math.max(0, Number(allowancesPct) || 0);
  const parsedDedPct = Math.max(0, Number(breakdownDeductionPct) || 0);

  const allowancesAmt = parsedBasic * (parsedAllowPct / 100);
  const breakdownGross = parsedBasic + allowancesAmt;
  const breakdownDedAmt = breakdownGross * (parsedDedPct / 100);
  const breakdownNet = breakdownGross - breakdownDedAmt;

  return (
    <div className={`grid gap-6 ${className}`}>
      {/* Top Header: Mode & Currency Selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-5">
        <div>
          <span className="font-mono-ui text-[11px] font-bold uppercase tracking-[.18em] text-accent">
            Salary Calculator Mode
          </span>
          <p className="text-xs text-muted-foreground mt-0.5">Custom deduction percentages with zero hardcoded tax rules</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground font-mono-ui">Currency:</label>
          <select
            data-testid="select-salary-currency"
            value={currencyCode}
            onChange={e => setCurrencyCode(e.target.value)}
            className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-primary"
          >
            {SALARY_CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-border bg-muted/30 p-1.5">
        <button
          type="button"
          data-testid="btn-salary-mode-gross-to-net"
          onClick={() => setMode('gross-to-net')}
          className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
            mode === 'gross-to-net'
              ? 'bg-primary text-primary-foreground shadow-2xs'
              : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          }`}
        >
          Gross to Net Take-Home
        </button>
        <button
          type="button"
          data-testid="btn-salary-mode-converter"
          onClick={() => setMode('converter')}
          className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
            mode === 'converter'
              ? 'bg-primary text-primary-foreground shadow-2xs'
              : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          }`}
        >
          Salary Period Converter
        </button>
        <button
          type="button"
          data-testid="btn-salary-mode-basic-breakdown"
          onClick={() => setMode('basic-breakdown')}
          className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
            mode === 'basic-breakdown'
              ? 'bg-primary text-primary-foreground shadow-2xs'
              : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          }`}
        >
          Basic Salary Breakdown
        </button>
      </div>

      {/* MODE 1: Gross to Net */}
      {mode === 'gross-to-net' && (
        <div className="grid gap-6">
          <div className="rounded-xl border border-border bg-background p-5 shadow-2xs">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
                <span>Gross salary amount</span>
                <div className="relative">
                  <input
                    data-testid="input-salary-gross"
                    type="number"
                    min="0"
                    step="any"
                    value={grossAmount}
                    onChange={e => setGrossAmount(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="e.g. 4200"
                  />
                  <span className="pointer-events-none absolute right-3 top-2.5 font-mono-ui text-xs text-muted-foreground">
                    {sym}
                  </span>
                </div>
              </label>

              <label className="grid gap-1.5 text-sm font-medium">
                <span>Payment period</span>
                <select
                  data-testid="select-salary-period"
                  value={period}
                  onChange={e => setPeriod(e.target.value as any)}
                  className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="Annual">Annual / Yearly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </label>

              <label className="grid gap-1.5 text-sm font-medium">
                <span>Tax deduction %</span>
                <div className="relative">
                  <input
                    data-testid="input-salary-tax"
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={taxDeduction}
                    onChange={e => setTaxDeduction(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="e.g. 20"
                  />
                  <span className="pointer-events-none absolute right-3 top-2.5 font-mono-ui text-xs text-muted-foreground">%</span>
                </div>
              </label>
            </div>

            {/* Optional Second Deduction Toggle */}
            <div className="mt-4 pt-3 border-t border-border/60">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">
                <input
                  type="checkbox"
                  checked={enableSecondDeduction}
                  onChange={e => setEnableSecondDeduction(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary/20 h-4 w-4"
                />
                <span>Add second deduction (e.g. pension, health insurance, provident fund)</span>
              </label>

              {enableSecondDeduction && (
                <div className="mt-3 max-w-xs animate-fade">
                  <label className="grid gap-1 text-xs font-medium">
                    <span>Second deduction % (Pension / Insurance)</span>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="any"
                        value={secondDeduction}
                        onChange={e => setSecondDeduction(e.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus:border-primary"
                        placeholder="e.g. 5"
                      />
                      <span className="pointer-events-none absolute right-3 top-2 font-mono-ui text-xs text-muted-foreground">%</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Key Output Cards */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-secondary/60 bg-secondary/15 p-4.5">
              <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Monthly Net Pay</p>
              <div className="mt-2 text-2xl font-bold font-display text-foreground" data-testid="result-salary-monthly-net">
                {sym} {fmt(monthlyNet)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Gross: {sym} {fmt(monthlyGross)}</p>
            </div>

            <div className="rounded-xl border border-accent/30 bg-accent/10 p-4.5">
              <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-accent">Total Deductions ({totalDeductionPct}%)</p>
              <div className="mt-2 text-2xl font-bold font-display text-foreground" data-testid="result-salary-monthly-deduction">
                {sym} {fmt(monthlyDeduction)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{sym} {fmt(annualDeductionAmt)} per year</p>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/[.04] p-4.5">
              <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-primary">Annual Take-Home</p>
              <div className="mt-2 text-2xl font-bold font-display text-foreground" data-testid="result-salary-annual-net">
                {sym} {fmt(annualNet)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Gross: {sym} {fmt(annualGross)}</p>
            </div>
          </div>

          {/* Comprehensive Timeframe Breakdown Table */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-mono-ui text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Full Compensation Breakdown Across Timeframes
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/40 font-mono-ui uppercase text-muted-foreground">
                    <th className="py-2.5 px-3">Timeframe</th>
                    <th className="py-2.5 px-3">Gross Salary</th>
                    <th className="py-2.5 px-3">Deductions ({totalDeductionPct}%)</th>
                    <th className="py-2.5 px-3 font-bold text-foreground">Net Take-Home</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-mono-ui">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-foreground">Yearly</td>
                    <td className="py-2.5 px-3">{sym} {fmt(annualGross)}</td>
                    <td className="py-2.5 px-3 text-accent">{sym} {fmt(annualDeductionAmt)}</td>
                    <td className="py-2.5 px-3 font-bold text-primary">{sym} {fmt(annualNet)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-foreground">Monthly</td>
                    <td className="py-2.5 px-3">{sym} {fmt(monthlyGross)}</td>
                    <td className="py-2.5 px-3 text-accent">{sym} {fmt(monthlyDeduction)}</td>
                    <td className="py-2.5 px-3 font-bold text-primary">{sym} {fmt(monthlyNet)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-foreground">Weekly</td>
                    <td className="py-2.5 px-3">{sym} {fmt(weeklyGross)}</td>
                    <td className="py-2.5 px-3 text-accent">{sym} {fmt(weeklyGross - weeklyNet)}</td>
                    <td className="py-2.5 px-3 font-bold text-primary">{sym} {fmt(weeklyNet)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-foreground">Daily (8 hrs)</td>
                    <td className="py-2.5 px-3">{sym} {fmt(dailyGross)}</td>
                    <td className="py-2.5 px-3 text-accent">{sym} {fmt(dailyGross - dailyNet)}</td>
                    <td className="py-2.5 px-3 font-bold text-primary">{sym} {fmt(dailyNet)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-foreground">Hourly</td>
                    <td className="py-2.5 px-3">{sym} {fmt(hourlyGross)}</td>
                    <td className="py-2.5 px-3 text-accent">{sym} {fmt(hourlyGross - hourlyNet)}</td>
                    <td className="py-2.5 px-3 font-bold text-primary">{sym} {fmt(hourlyNet)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground italic">
              Calculation formula: Net Pay = Gross × (1 − {totalDeductionPct}%). Standard full-time baseline: 40 hrs/week, 52 weeks/year (2,080 hours).
            </p>
          </div>
        </div>
      )}

      {/* MODE 2: Salary Period Converter */}
      {mode === 'converter' && (
        <div className="grid gap-6">
          <div className="rounded-xl border border-border bg-background p-5 shadow-2xs">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
                <span>Enter known salary amount</span>
                <div className="relative">
                  <input
                    data-testid="input-converter-amount"
                    type="number"
                    min="0"
                    step="any"
                    value={converterAmount}
                    onChange={e => setConverterAmount(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="e.g. 50000"
                  />
                  <span className="pointer-events-none absolute right-3 top-2.5 font-mono-ui text-xs text-muted-foreground">
                    {sym}
                  </span>
                </div>
              </label>

              <label className="grid gap-1.5 text-sm font-medium">
                <span>Frequency / Period</span>
                <select
                  data-testid="select-converter-period"
                  value={converterPeriod}
                  onChange={e => setConverterPeriod(e.target.value as any)}
                  className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="Hourly">Per Hour</option>
                  <option value="Daily">Per Day (8h)</option>
                  <option value="Weekly">Per Week</option>
                  <option value="Monthly">Per Month</option>
                  <option value="Annual">Per Year</option>
                </select>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <label className="grid gap-1 text-xs font-medium">
                  <span>Hours / Wk</span>
                  <input
                    type="number"
                    min="1"
                    max="168"
                    value={hoursPerWeek}
                    onChange={e => setHoursPerWeek(e.target.value)}
                    className="rounded-lg border border-input bg-background px-2.5 py-2 text-xs outline-none focus:border-primary"
                  />
                </label>
                <label className="grid gap-1 text-xs font-medium">
                  <span>Weeks / Yr</span>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    value={weeksPerYear}
                    onChange={e => setWeeksPerYear(e.target.value)}
                    className="rounded-lg border border-input bg-background px-2.5 py-2 text-xs outline-none focus:border-primary"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Converter Results Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-mono-ui text-[10px] uppercase text-muted-foreground font-bold">Hourly</span>
              <div className="mt-1.5 text-xl font-bold font-display text-foreground">{sym} {fmt(convHourly)}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">{hoursPerWeek}h / week</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-mono-ui text-[10px] uppercase text-muted-foreground font-bold">Daily</span>
              <div className="mt-1.5 text-xl font-bold font-display text-foreground">{sym} {fmt(convDaily)}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">8h standard day</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-mono-ui text-[10px] uppercase text-muted-foreground font-bold">Weekly</span>
              <div className="mt-1.5 text-xl font-bold font-display text-foreground">{sym} {fmt(convWeekly)}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">{weeksPerYear} weeks / year</p>
            </div>
            <div className="rounded-xl border border-secondary/60 bg-secondary/15 p-4">
              <span className="font-mono-ui text-[10px] uppercase text-muted-foreground font-bold">Monthly</span>
              <div className="mt-1.5 text-xl font-bold font-display text-primary">{sym} {fmt(convMonthly)}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Annual ÷ 12</p>
            </div>
            <div className="rounded-xl border border-secondary/60 bg-secondary/15 p-4">
              <span className="font-mono-ui text-[10px] uppercase text-muted-foreground font-bold">Annual</span>
              <div className="mt-1.5 text-xl font-bold font-display text-primary">{sym} {fmt(convAnnual)}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Full yearly gross</p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: Basic Salary Breakdown */}
      {mode === 'basic-breakdown' && (
        <div className="grid gap-6">
          <div className="rounded-xl border border-border bg-background p-5 shadow-2xs">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Basic salary (Monthly)</span>
                <div className="relative">
                  <input
                    data-testid="input-basic-salary"
                    type="number"
                    min="0"
                    step="any"
                    value={basicSalary}
                    onChange={e => setBasicSalary(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="e.g. 4000"
                  />
                  <span className="pointer-events-none absolute right-3 top-2.5 font-mono-ui text-xs text-muted-foreground">{sym}</span>
                </div>
              </label>

              <label className="grid gap-1.5 text-sm font-medium">
                <span>Allowances % (Housing, transport)</span>
                <div className="relative">
                  <input
                    data-testid="input-allowances-pct"
                    type="number"
                    min="0"
                    step="any"
                    value={allowancesPct}
                    onChange={e => setAllowancesPct(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="e.g. 25"
                  />
                  <span className="pointer-events-none absolute right-3 top-2.5 font-mono-ui text-xs text-muted-foreground">%</span>
                </div>
              </label>

              <label className="grid gap-1.5 text-sm font-medium">
                <span>Deductions % (Tax, social security)</span>
                <div className="relative">
                  <input
                    data-testid="input-breakdown-deductions-pct"
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={breakdownDeductionPct}
                    onChange={e => setBreakdownDeductionPct(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="e.g. 10"
                  />
                  <span className="pointer-events-none absolute right-3 top-2.5 font-mono-ui text-xs text-muted-foreground">%</span>
                </div>
              </label>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-mono-ui text-[10px] uppercase text-muted-foreground font-bold">1. Basic Salary</span>
              <div className="mt-1 text-xl font-bold font-display text-foreground">{sym} {fmt(parsedBasic)}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Base contractual rate</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-mono-ui text-[10px] uppercase text-muted-foreground font-bold">2. Allowances ({parsedAllowPct}%)</span>
              <div className="mt-1 text-xl font-bold font-display text-foreground">{sym} {fmt(allowancesAmt)}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Housing + Transport stipends</p>
            </div>
            <div className="rounded-xl border border-secondary/60 bg-secondary/15 p-4">
              <span className="font-mono-ui text-[10px] uppercase text-muted-foreground font-bold">3. Gross Monthly</span>
              <div className="mt-1 text-xl font-bold font-display text-foreground">{sym} {fmt(breakdownGross)}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Basic + Allowances</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
              <span className="font-mono-ui text-[10px] uppercase text-accent font-bold">4. Net Monthly Pay</span>
              <div className="mt-1 text-xl font-bold font-display text-primary">{sym} {fmt(breakdownNet)}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">After {sym} {fmt(breakdownDedAmt)} deductions</p>
            </div>
          </div>
        </div>
      )}

      {/* Shared Disclaimer */}
      <p className="text-xs text-muted-foreground italic">
        Disclaimer: Calculations are mathematical planning estimates based on user-entered percentages. Actual payroll depends on official jurisdiction tax brackets, allowances, social security thresholds, and employer contracts. Not certified financial, legal, or tax advice.
      </p>
    </div>
  );
}
