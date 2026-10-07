import { useState, useId } from 'react';
import { VAT_COUNTRY_PRESETS, type VatCountryRate } from '../data/country-vat';
import { Plus, Minus, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';

interface VatCalculatorProps {
  initialCountry?: string; // e.g. 'uk', 'germany', 'france', etc.
  initialMode?: 'add' | 'remove';
  initialAmount?: string;
  className?: string;
}

export function VatCalculator({
  initialCountry,
  initialMode = 'add',
  initialAmount = '100',
  className = '',
}: VatCalculatorProps) {
  const defaultPreset = initialCountry
    ? VAT_COUNTRY_PRESETS.find(p => p.id === initialCountry || p.landingSlug === initialCountry)
    : undefined;

  const [mode, setMode] = useState<'add' | 'remove'>(initialMode);
  const [amount, setAmount] = useState<string>(initialAmount);
  const [selectedCountryId, setSelectedCountryId] = useState<string>(defaultPreset ? defaultPreset.id : 'custom');
  const [rate, setRate] = useState<string>(defaultPreset ? defaultPreset.standardRate.toString() : '20');

  const countrySelectId = useId();
  const rateInputId = useId();
  const amountInputId = useId();

  // Find active preset if matches current rate
  const activePreset = VAT_COUNTRY_PRESETS.find(p => p.id === selectedCountryId);
  const currencySymbol = activePreset ? activePreset.currencySymbol : '$';

  const handleCountryChange = (countryId: string) => {
    setSelectedCountryId(countryId);
    if (countryId === 'custom') {
      // Keep rate as is for custom editing
      return;
    }
    const preset = VAT_COUNTRY_PRESETS.find(p => p.id === countryId);
    if (preset) {
      setRate(preset.standardRate.toString());
    }
  };

  const handleRateChange = (newRate: string) => {
    setRate(newRate);
    // If the entered rate doesn't match the selected preset's standard rate, switch to Custom
    if (selectedCountryId !== 'custom') {
      const currentPreset = VAT_COUNTRY_PRESETS.find(p => p.id === selectedCountryId);
      if (!currentPreset || Number(newRate) !== currentPreset.standardRate) {
        setSelectedCountryId('custom');
      }
    }
  };

  const parsedAmount = Math.max(0, Number(amount) || 0);
  const parsedRate = Math.max(0, Number(rate) || 0);

  let netPrice = 0;
  let vatAmount = 0;
  let grossPrice = 0;

  if (mode === 'add') {
    netPrice = parsedAmount;
    vatAmount = parsedAmount * (parsedRate / 100);
    grossPrice = parsedAmount + vatAmount;
  } else {
    grossPrice = parsedAmount;
    netPrice = parsedRate > -100 ? parsedAmount / (1 + parsedRate / 100) : 0;
    vatAmount = parsedAmount - netPrice;
  }

  const formatMoney = (val: number) => {
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className={`grid gap-6 ${className}`}>
      {/* Mode Switcher */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-5">
        <div>
          <span className="font-mono-ui text-[11px] font-bold uppercase tracking-[.18em] text-accent">Calculation Mode</span>
          <p className="text-xs text-muted-foreground mt-0.5">Select whether to add VAT to a net amount or extract it from a gross total</p>
        </div>
        <div className="inline-flex rounded-xl border border-border bg-muted/40 p-1">
          <button
            type="button"
            data-testid="btn-mode-add"
            onClick={() => setMode('add')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              mode === 'add'
                ? 'bg-primary text-primary-foreground shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Plus size={14} /> Add VAT (Net to Gross)
          </button>
          <button
            type="button"
            data-testid="btn-mode-remove"
            onClick={() => setMode('remove')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              mode === 'remove'
                ? 'bg-primary text-primary-foreground shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Minus size={14} /> Remove VAT (Gross to Net)
          </button>
        </div>
      </div>

      {/* Input Fields Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Amount Input */}
        <label htmlFor={amountInputId} className="grid gap-1.5 text-sm font-medium text-foreground">
          <span>{mode === 'add' ? 'Net price (excluding VAT)' : 'Gross price (including VAT)'}</span>
          <div className="relative">
            <input
              id={amountInputId}
              data-testid="input-vat-amount"
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 100"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <span className="pointer-events-none absolute right-3 top-2.5 font-mono-ui text-xs text-muted-foreground">
              {currencySymbol}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            {mode === 'add' ? 'Base pre-tax amount before tax is applied' : 'Final total amount including taxes'}
          </span>
        </label>

        {/* Country Dropdown & VAT Rate */}
        <div className="grid gap-3">
          {/* Country Dropdown */}
          <label htmlFor={countrySelectId} className="grid gap-1.5 text-sm font-medium text-foreground">
            <span className="flex items-center justify-between">
              <span>Country / Preset</span>
              {activePreset && (
                <span className="font-mono-ui text-[10px] text-accent font-semibold uppercase tracking-wider">
                  {activePreset.taxAbbr} · {activePreset.standardRate}%
                </span>
              )}
            </span>
            <select
              id={countrySelectId}
              data-testid="select-vat-country"
              value={selectedCountryId}
              onChange={e => handleCountryChange(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              {VAT_COUNTRY_PRESETS.map(preset => (
                <option key={preset.id} value={preset.id}>
                  {preset.name} {preset.standardRate}%
                </option>
              ))}
              <option value="custom">Custom</option>
            </select>
          </label>

          {/* Editable VAT Rate Field */}
          <label htmlFor={rateInputId} className="grid gap-1.5 text-sm font-medium text-foreground">
            <span className="flex items-center justify-between">
              <span>VAT rate %</span>
              <span className="text-xs font-normal text-muted-foreground">Type to customize</span>
            </span>
            <div className="relative">
              <input
                id={rateInputId}
                data-testid="input-vat-rate"
                type="number"
                min="0"
                max="100"
                step="any"
                value={rate}
                onChange={e => handleRateChange(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <span className="pointer-events-none absolute right-3 top-2.5 font-mono-ui text-xs text-muted-foreground">%</span>
            </div>
          </label>
        </div>
      </div>

      {/* Result Breakdown Cards */}
      <div className="grid gap-3 sm:grid-cols-3 pt-2">
        {/* Net Result */}
        <div className={`rounded-xl border p-4.5 transition-all ${
          mode === 'remove'
            ? 'border-secondary/60 bg-secondary/15 ring-1 ring-secondary/30'
            : 'border-border bg-card'
        }`}>
          <div className="flex items-center justify-between">
            <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Net Amount</p>
            {mode === 'remove' && <span className="rounded bg-secondary/70 px-1.5 py-0.5 text-[9px] font-bold text-secondary-foreground">Calculated</span>}
          </div>
          <div className="mt-2 text-2xl font-bold font-display text-foreground" data-testid="result-vat-net">
            {currencySymbol} {formatMoney(netPrice)}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Price excluding tax</p>
        </div>

        {/* VAT Amount Result */}
        <div className="rounded-xl border border-accent/40 bg-accent/10 p-4.5 ring-1 ring-accent/20">
          <div className="flex items-center justify-between">
            <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-accent">VAT Amount ({parsedRate}%)</p>
            <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent">Tax</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-display text-foreground" data-testid="result-vat-amount">
            {currencySymbol} {formatMoney(vatAmount)}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {mode === 'add' ? `Net × ${parsedRate}%` : 'Gross − Net'}
          </p>
        </div>

        {/* Gross Total Result */}
        <div className={`rounded-xl border p-4.5 transition-all ${
          mode === 'add'
            ? 'border-secondary/60 bg-secondary/15 ring-1 ring-secondary/30'
            : 'border-border bg-card'
        }`}>
          <div className="flex items-center justify-between">
            <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Gross Total</p>
            {mode === 'add' && <span className="rounded bg-secondary/70 px-1.5 py-0.5 text-[9px] font-bold text-secondary-foreground">Calculated</span>}
          </div>
          <div className="mt-2 text-2xl font-bold font-display text-foreground" data-testid="result-vat-gross">
            {currencySymbol} {formatMoney(grossPrice)}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Total including VAT</p>
        </div>
      </div>

      {/* Summary Formula Line */}
      <div className="rounded-xl border border-border/80 bg-muted/30 px-4 py-3 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <Calculator size={15} className="text-accent shrink-0" />
          <span>
            {mode === 'add' ? (
              <>Formula: <strong>{currencySymbol}{formatMoney(netPrice)}</strong> × (1 + {parsedRate/100}) = <strong>{currencySymbol}{formatMoney(grossPrice)}</strong></>
            ) : (
              <>Formula: <strong>{currencySymbol}{formatMoney(grossPrice)}</strong> ÷ (1 + {parsedRate/100}) = <strong>{currencySymbol}{formatMoney(netPrice)}</strong></>
            )}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck size={14} className="text-accent" />
          <span>Calculated locally in browser</span>
        </div>
      </div>
    </div>
  );
}
