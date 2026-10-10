import { useState, useId, useMemo } from 'react';
import {
  COUNTRIES_CONFIG,
  VERIFIED_COUNTRY_IDS,
  calculateSalaryBreakdown,
  type SupportedCountryCode,
  type CalculationResult,
  type CustomTaxBand,
} from '../data/tax-config';
import { WORLD_CURRENCIES, type WorldCurrency } from '../data/world-currencies';
import {
  ShieldCheck, Printer, Copy, Check, Info,
  TrendingDown, DollarSign, ExternalLink, Plus, Trash2, Search, AlertCircle
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
  UAE: '180000',
  SA: '180000',
  IE: '55000',
  NZ: '75000',
  SG: '84000',
  NL: '55000',
  ZA: '450000',
  CUSTOM: '50000',
};

const COUNTRY_FLAGS: Record<SupportedCountryCode, string> = {
  UK: '🇬🇧',
  US: '🇺🇸',
  CA: '🇨🇦',
  AU: '🇦🇺',
  DE: '🇩🇪',
  PL: '🇵🇱',
  PK: '🇵🇰',
  IN: '🇮🇳',
  UAE: '🇦🇪',
  SA: '🇸🇦',
  IE: '🇮🇪',
  NZ: '🇳🇿',
  SG: '🇸🇬',
  NL: '🇳🇱',
  ZA: '🇿🇦',
  CUSTOM: '⚙️',
};

const DEFAULT_CUSTOM_BANDS: CustomTaxBand[] = [
  { from: 0, to: 20000, ratePct: 10 },
  { from: 20000, to: 60000, ratePct: 20 },
  { from: 60000, to: null, ratePct: 30 },
];

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

  // Custom Country Settings
  const [customCurrency, setCustomCurrency] = useState<WorldCurrency>({
    code: 'USD',
    symbol: '$',
    name: 'US Dollar (USD)',
  });
  const [currencySearchQuery, setCurrencySearchQuery] = useState<string>('');
  const [customTaxMode, setCustomTaxMode] = useState<'flat' | 'progressive'>('flat');
  const [customTaxPct, setCustomTaxPct] = useState<string>('20');
  const [customSocialPct, setCustomSocialPct] = useState<string>('5');
  const [customBands, setCustomBands] = useState<CustomTaxBand[]>(DEFAULT_CUSTOM_BANDS);

  // Special Country Toggles (UAE, SA, SG)
  // For UAE & SA: default is Expat (false = expat, true = national)
  // For SG: default is National/PR (true = national/PR, false = expat)
  const [isNationalWorker, setIsNationalWorker] = useState<boolean>(initialCountry === 'SG');

  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const handleCountrySelect = (newCountry: SupportedCountryCode) => {
    setCountry(newCountry);
    if (newCountry === 'SG') {
      setIsNationalWorker(true);
    } else {
      setIsNationalWorker(false);
    }
    if (!initialAmount && DEFAULT_SALARIES[newCountry]) {
      setGrossInput(DEFAULT_SALARIES[newCountry]);
    }
    if (onCountryChange) {
      onCountryChange(newCountry);
    }
  };

  // Filter currencies for searchable currency selector
  const filteredCurrencies = useMemo(() => {
    const q = currencySearchQuery.trim().toLowerCase();
    if (!q) return WORLD_CURRENCIES;
    return WORLD_CURRENCIES.filter(
      c =>
        c.code.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
    );
  }, [currencySearchQuery]);

  // Handle progressive band edits
  const handleUpdateBand = (index: number, field: 'from' | 'to' | 'ratePct', value: string) => {
    setCustomBands(prev => {
      const updated = [...prev];
      const target = { ...updated[index] };
      if (field === 'ratePct') {
        target.ratePct = Math.max(0, Math.min(100, Number(value) || 0));
      } else if (field === 'from') {
        target.from = Math.max(0, Number(value) || 0);
      } else if (field === 'to') {
        target.to = value === '' || value.toLowerCase() === 'infinity' ? null : Math.max(0, Number(value) || 0);
      }
      updated[index] = target;
      return updated;
    });
  };

  const handleAddBand = () => {
    if (customBands.length >= 5) return;
    const lastBand = customBands[customBands.length - 1];
    const newFrom = lastBand && lastBand.to !== null ? lastBand.to : (lastBand ? lastBand.from + 50000 : 0);
    setCustomBands(prev => [...prev, { from: newFrom, to: null, ratePct: 35 }]);
  };

  const handleRemoveBand = (index: number) => {
    if (customBands.length <= 1) return;
    setCustomBands(prev => prev.filter((_, i) => i !== index));
  };

  const parsedGross = Math.max(0, Number(grossInput) || 0);
  const parsedHpw = Math.max(1, Math.min(168, Number(hoursPerWeek) || 40));

  // Convert gross to annual equivalent based on period
  let annualEquivalentGross = parsedGross;
  if (period === 'Monthly') {
    annualEquivalentGross = parsedGross * 12;
  } else if (period === 'Weekly') {
    annualEquivalentGross = parsedGross * 52;
  } else if (period === 'Hourly') {
    annualEquivalentGross = parsedGross * 52 * parsedHpw;
  }

  const parsedCustomTax = Math.max(0, Math.min(100, Number(customTaxPct) || 0));
  const parsedCustomSocial = Math.max(0, Math.min(100, Number(customSocialPct) || 0));

  const result: CalculationResult = calculateSalaryBreakdown(
    annualEquivalentGross,
    {
      country,
      customTaxPct: parsedCustomTax,
      customSocialPct: parsedCustomSocial,
      customBands: customTaxMode === 'progressive' ? customBands : undefined,
      isNational: isNationalWorker,
      hoursPerWeek: parsedHpw,
    }
  );

  const countryConfig = COUNTRIES_CONFIG[country] || COUNTRIES_CONFIG.CUSTOM;

  // Currency symbol and code determination
  const sym = country === 'CUSTOM' ? customCurrency.symbol : countryConfig.currencySymbol;
  const currCode = country === 'CUSTOM' ? customCurrency.code : countryConfig.currencyCode;

  const fmt = (n: number) => {
    if (isNaN(n) || !isFinite(n)) return '0.00';
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Stacked Visual Breakdown Percentages
  const netSharePct = result.grossAnnual > 0 ? (result.netPayAnnual / result.grossAnnual) * 100 : 100;
  const taxSharePct = result.grossAnnual > 0 ? (result.incomeTaxAnnual / result.grossAnnual) * 100 : 0;
  const socialSharePct = result.grossAnnual > 0 ? (result.socialContributionAnnual / result.grossAnnual) * 100 : 0;

  const handleCopyResult = () => {
    const summaryText = [
      `Salary Calculator Breakdown (${country === 'CUSTOM' ? 'Custom Country' : countryConfig.countryName} - ${countryConfig.taxYear})`,
      `--------------------------------------------------`,
      `Gross Salary: ${sym}${fmt(result.grossAnnual)} / year (${sym}${fmt(result.grossMonthly)} / month)`,
      `Payment Frequency: ${period} | Hours/Week: ${parsedHpw}`,
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
      `Calculated on LoveEasyTool (loveeasytool.com/tools/salary-calculator/)`,
      `Disclaimer: Estimate only based on ${countryConfig.taxYear} rates.`,
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
            Country & Tax Authority (15 Countries + Custom Mode)
          </label>
          <select
            id={countrySelectId}
            data-testid="select-salary-country"
            value={country}
            onChange={e => handleCountrySelect(e.target.value as SupportedCountryCode)}
            className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            <optgroup label="Supported Countries (Published Statutory Rates)">
              {VERIFIED_COUNTRY_IDS.map(cId => {
                const cfg = COUNTRIES_CONFIG[cId];
                return (
                  <option key={cId} value={cId}>
                    {COUNTRY_FLAGS[cId]} {cfg.name} ({cfg.currency.code} · {cfg.taxYear})
                  </option>
                );
              })}
            </optgroup>
            <optgroup label="Custom / International">
              <option value="CUSTOM">
                ⚙️ Any other country (custom)
              </option>
            </optgroup>
          </select>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="font-mono-ui font-medium text-accent">Tax Year: {countryConfig.taxYear}</span>
            {country !== 'CUSTOM' && (
              <a
                href={countryConfig.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-primary transition underline"
              >
                <span>{countryConfig.sourceAuthority}</span>
                <ExternalLink size={10} />
              </a>
            )}
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
            <span>Currency: <strong className="text-foreground">{currCode} ({sym})</strong></span>
            <span>{parsedHpw} hrs/wk contracted</span>
          </div>
        </div>
      </div>

      {/* UAE, Saudi Arabia, Singapore Nationality / Expat Controls */}
      {(country === 'UAE' || country === 'SA' || country === 'SG') && (
        <div className="rounded-xl border border-primary/20 bg-primary/[.03] p-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono-ui font-bold text-accent uppercase tracking-wider text-[10px] block">
                Workforce Residency & Social Insurance
              </span>
              <p className="font-semibold text-foreground mt-0.5">
                {country === 'UAE' && 'United Arab Emirates: 0% Personal Income Tax on all salaries.'}
                {country === 'SA' && 'Saudi Arabia: 0% Personal Income Tax on all salaries.'}
                {country === 'SG' && 'Singapore: Progressive Resident PIT (0% - 24%).'}
              </p>
              <p className="text-muted-foreground text-[11px] mt-0.5">
                {country === 'UAE' && 'Expatriates pay 0% GPSSA. UAE Nationals pay 5% GPSSA pension (capped at AED 50k/mo).'}
                {country === 'SA' && 'Expatriates pay 0% GOSI pension. Saudi Nationals pay 9.75% GOSI + SANED (capped at SAR 45k/mo).'}
                {country === 'SG' && 'Singapore Citizens/PRs contribute 20% employee CPF (capped at S$7,400/mo). Expatriate pass holders pay 0% CPF.'}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <label className="text-xs font-semibold text-foreground cursor-pointer flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-lg">
                <input
                  type="checkbox"
                  checked={isNationalWorker}
                  onChange={e => setIsNationalWorker(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary"
                />
                <span>
                  {country === 'UAE' && 'UAE National (5% GPSSA)'}
                  {country === 'SA' && 'Saudi National (9.75% GOSI)'}
                  {country === 'SG' && 'Citizen / PR (20% CPF)'}
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Gross Salary & Hours Input Card */}
      <div className="rounded-2xl border border-border bg-background p-5 shadow-2xs">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor={grossInputId} className="block text-xs font-semibold text-foreground mb-1.5">
              Gross {period === 'Annual' ? 'Annual' : period} Salary ({currCode})
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
              Total pre-tax earnings before statutory income taxes and social security withholdings.
            </p>
          </div>

          <div>
            <label htmlFor={hpwInputId} className="block text-xs font-semibold text-foreground mb-1.5">
              Contracted Hours per Week
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
              Used to derive accurate hourly and daily compensation rates.
            </p>
          </div>
        </div>

        {/* Custom Mode Extra Settings: Searchable Currency Picker + Flat or Up to 5 Bands */}
        {country === 'CUSTOM' && (
          <div className="mt-5 pt-5 border-t border-border/80 space-y-4 animate-fade">
            {/* Disclaimer Banner Required by Brief */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
              <AlertCircle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">
                  Tax rules for this country are not built in. Results use the rates you enter.
                </p>
                <p className="text-[11px] opacity-90 mt-0.5">
                  Select your local currency below and define either a single flat withholding percentage or up to 5 custom progressive tax brackets.
                </p>
              </div>
            </div>

            {/* Searchable World Currency Selector (ISO 4217, Symbol, Name, Default USD) */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                World Currency (ISO 4217 – All Global Currencies)
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    value={currencySearchQuery}
                    onChange={e => setCurrencySearchQuery(e.target.value)}
                    placeholder="Filter currencies (e.g. EUR, CHF, JPY, Peso, Riyal)..."
                    className="w-full rounded-xl border border-input bg-background pl-8 pr-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <select
                    value={customCurrency.code}
                    onChange={e => {
                      const selected = WORLD_CURRENCIES.find(c => c.code === e.target.value);
                      if (selected) setCustomCurrency(selected);
                    }}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-semibold outline-none focus:border-primary"
                  >
                    {filteredCurrencies.map(curr => (
                      <option key={curr.code} value={curr.code}>
                        {curr.code} ({curr.symbol}) – {curr.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Active currency: <strong className="text-foreground">{customCurrency.code}</strong> with symbol <strong className="text-foreground">{customCurrency.symbol}</strong> ({customCurrency.name})
              </p>
            </div>

            {/* Flat Rate vs Progressive Bands Toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-foreground">
                  Income Tax Deduction Mode
                </label>
                <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setCustomTaxMode('flat')}
                    className={`rounded-md px-3 py-1 font-semibold transition ${
                      customTaxMode === 'flat'
                        ? 'bg-background text-foreground shadow-2xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Flat Tax Rate (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomTaxMode('progressive')}
                    className={`rounded-md px-3 py-1 font-semibold transition ${
                      customTaxMode === 'progressive'
                        ? 'bg-background text-foreground shadow-2xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Custom Tax Bands (Up to 5)
                  </button>
                </div>
              </div>

              {customTaxMode === 'flat' ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={customTaxId} className="block text-xs font-semibold text-foreground mb-1.5">
                      Flat Income Tax Rate (%)
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
                      Optional Social / Pension / Health Contribution Rate (%)
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
              ) : (
                <div className="space-y-3">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border bg-muted/40 font-mono-ui uppercase text-muted-foreground text-[10px]">
                          <th className="py-2 px-2.5">Band #</th>
                          <th className="py-2 px-2.5">From ({sym})</th>
                          <th className="py-2 px-2.5">To ({sym})</th>
                          <th className="py-2 px-2.5">Tax Rate (%)</th>
                          <th className="py-2 px-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60 font-mono-ui">
                        {customBands.map((band, idx) => (
                          <tr key={idx} className="hover:bg-muted/10">
                            <td className="py-2 px-2.5 font-bold text-foreground">Tier {idx + 1}</td>
                            <td className="py-2 px-2.5">
                              <input
                                type="number"
                                min="0"
                                value={band.from}
                                onChange={e => handleUpdateBand(idx, 'from', e.target.value)}
                                className="w-24 rounded-lg border border-input bg-background px-2 py-1 text-xs outline-none focus:border-primary"
                              />
                            </td>
                            <td className="py-2 px-2.5">
                              <input
                                type="text"
                                value={band.to === null ? 'Above' : band.to}
                                placeholder="Above / Inf"
                                onChange={e => handleUpdateBand(idx, 'to', e.target.value)}
                                className="w-24 rounded-lg border border-input bg-background px-2 py-1 text-xs outline-none focus:border-primary"
                              />
                            </td>
                            <td className="py-2 px-2.5">
                              <div className="relative inline-flex items-center">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="any"
                                  value={band.ratePct}
                                  onChange={e => handleUpdateBand(idx, 'ratePct', e.target.value)}
                                  className="w-20 rounded-lg border border-input bg-background px-2 py-1 text-xs outline-none focus:border-primary pr-5"
                                />
                                <span className="pointer-events-none absolute right-1.5 text-[10px] text-muted-foreground">%</span>
                              </div>
                            </td>
                            <td className="py-2 px-2 text-right">
                              {customBands.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveBand(idx)}
                                  className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
                                  title="Delete band"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      disabled={customBands.length >= 5}
                      onClick={handleAddBand}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-primary disabled:opacity-40"
                    >
                      <Plus size={13} />
                      <span>Add Tax Band ({customBands.length}/5)</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <label htmlFor={customSocialId} className="text-xs font-semibold text-foreground whitespace-nowrap">
                        Social Contribution %:
                      </label>
                      <input
                        id={customSocialId}
                        type="number"
                        min="0"
                        max="100"
                        step="any"
                        value={customSocialPct}
                        onChange={e => setCustomSocialPct(e.target.value)}
                        className="w-20 rounded-lg border border-input bg-background px-2 py-1 text-xs font-semibold outline-none focus:border-primary"
                        placeholder="5"
                      />
                    </div>
                  </div>
                </div>
              )}
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
            Net take-home deposited into your bank account each month.
          </p>
        </div>

        {/* Total Monthly Deductions */}
        <div className="rounded-2xl border border-destructive/20 bg-destructive/[.04] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[.16em] text-destructive">
              Total Deductions
            </span>
            <span className="font-mono-ui text-[11px] font-bold rounded bg-destructive/10 text-destructive px-1.5 py-0.5">
              {result.effectiveTotalDeductionRatePct.toFixed(1)}% Effective
            </span>
          </div>
          <div className="mt-2 text-3xl font-extrabold font-display text-foreground tracking-tight" data-testid="result-deductions-monthly">
            {sym} {fmt(result.totalDeductionsMonthly)}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {sym} {fmt(result.totalDeductionsAnnual)} deducted across the year.
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
            Gross annual earnings: {sym} {fmt(result.grossAnnual)}
          </p>
        </div>
      </div>

      {/* Visual Pay Distribution Bar */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Salary Allocation Breakdown
            </h3>
            <span className="font-mono-ui text-[11px] text-muted-foreground">
              (Overall Effective Rate: <strong className="text-foreground">{result.effectiveTotalDeductionRatePct.toFixed(1)}%</strong>)
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
              {socialSharePct > 8 ? `${socialSharePct.toFixed(0)}% Social` : ''}
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
            100% Client-Side · Private & Confidential
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
              Calculated across year, month, week, day, and hour with separate lines for income tax and social insurance.
            </p>
          </div>
          <span className="font-mono-ui text-[11px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded self-start sm:self-auto">
            {country === 'CUSTOM' ? `Custom (${currCode})` : countryConfig.countryName}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-mono-ui uppercase text-muted-foreground">
                <th className="py-2.5 px-3">Period</th>
                <th className="py-2.5 px-3">Gross Salary</th>
                <th className="py-2.5 px-3 text-accent">{countryConfig.incomeTaxName}</th>
                <th className="py-2.5 px-3 text-destructive">{countryConfig.socialContributionName}</th>
                <th className="py-2.5 px-3 font-semibold text-foreground">Total Deductions</th>
                <th className="py-2.5 px-3 font-bold text-primary">Net Take-Home</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono-ui">
              <tr className="hover:bg-muted/20">
                <td className="py-2.5 px-3 font-semibold text-foreground">Annual (Year)</td>
                <td className="py-2.5 px-3 text-foreground font-medium">{sym}{fmt(result.grossAnnual)}</td>
                <td className="py-2.5 px-3 text-accent">{sym}{fmt(result.incomeTaxAnnual)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym}{fmt(result.socialContributionAnnual)}</td>
                <td className="py-2.5 px-3 text-foreground font-semibold">{sym}{fmt(result.totalDeductionsAnnual)}</td>
                <td className="py-2.5 px-3 text-primary font-bold">{sym}{fmt(result.netPayAnnual)}</td>
              </tr>
              <tr className="hover:bg-muted/20 bg-primary/[.02]">
                <td className="py-2.5 px-3 font-semibold text-foreground">Monthly</td>
                <td className="py-2.5 px-3 text-foreground font-medium">{sym}{fmt(result.grossMonthly)}</td>
                <td className="py-2.5 px-3 text-accent">{sym}{fmt(result.incomeTaxMonthly)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym}{fmt(result.socialContributionMonthly)}</td>
                <td className="py-2.5 px-3 text-foreground font-semibold">{sym}{fmt(result.totalDeductionsMonthly)}</td>
                <td className="py-2.5 px-3 text-primary font-bold">{sym}{fmt(result.netPayMonthly)}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-2.5 px-3 font-semibold text-foreground">Weekly</td>
                <td className="py-2.5 px-3 text-foreground font-medium">{sym}{fmt(result.grossWeekly)}</td>
                <td className="py-2.5 px-3 text-accent">{sym}{fmt(result.incomeTaxWeekly)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym}{fmt(result.socialContributionWeekly)}</td>
                <td className="py-2.5 px-3 text-foreground font-semibold">{sym}{fmt(result.totalDeductionsWeekly)}</td>
                <td className="py-2.5 px-3 text-primary font-bold">{sym}{fmt(result.netPayWeekly)}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-2.5 px-3 font-semibold text-foreground">Daily (5d/wk)</td>
                <td className="py-2.5 px-3 text-foreground font-medium">{sym}{fmt(result.grossDaily)}</td>
                <td className="py-2.5 px-3 text-accent">{sym}{fmt(result.incomeTaxDaily)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym}{fmt(result.socialContributionDaily)}</td>
                <td className="py-2.5 px-3 text-foreground font-semibold">{sym}{fmt(result.totalDeductionsDaily)}</td>
                <td className="py-2.5 px-3 text-primary font-bold">{sym}{fmt(result.netPayDaily)}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="py-2.5 px-3 font-semibold text-foreground">Hourly ({parsedHpw}h/wk)</td>
                <td className="py-2.5 px-3 text-foreground font-medium">{sym}{fmt(result.grossHourly)}</td>
                <td className="py-2.5 px-3 text-accent">{sym}{fmt(result.incomeTaxHourly)}</td>
                <td className="py-2.5 px-3 text-destructive">{sym}{fmt(result.socialContributionHourly)}</td>
                <td className="py-2.5 px-3 text-foreground font-semibold">{sym}{fmt(result.totalDeductionsHourly)}</td>
                <td className="py-2.5 px-3 text-primary font-bold">{sym}{fmt(result.netPayHourly)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Notes & Verification Callout */}
      <div className="rounded-xl border border-border/80 bg-muted/30 p-4 text-xs text-muted-foreground flex items-start gap-2.5">
        <Info size={15} className="text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-foreground">
            Tax Year & Rules Authority: {countryConfig.taxYear} ({countryConfig.sourceAuthority})
          </p>
          <p className="leading-relaxed">
            {countryConfig.notes}
          </p>
        </div>
      </div>
    </div>
  );
}
