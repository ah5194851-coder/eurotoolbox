import { useState } from 'react';
import { BookOpen } from 'lucide-react';

export type PercentageMode =
  | 'what-is'
  | 'is-what-percent'
  | 'increase-decrease'
  | 'add-subtract'
  | 'difference';

interface PercentageCalculatorProps {
  initialMode?: PercentageMode;
  initialX?: string;
  initialY?: string;
  className?: string;
}

export function PercentageCalculator({
  initialMode = 'what-is',
  initialX = '15',
  initialY = '80',
  className = '',
}: PercentageCalculatorProps) {
  const [mode, setMode] = useState<PercentageMode>(initialMode);
  const [valX, setValX] = useState<string>(initialX);
  const [valY, setValY] = useState<string>(initialY);
  const [addOrSubtract, setAddOrSubtract] = useState<'add' | 'subtract'>('add');

  const x = Number(valX) || 0;
  const y = Number(valY) || 0;

  const modeButtons: { id: PercentageMode; label: string }[] = [
    { id: 'what-is', label: 'What is X% of Y?' },
    { id: 'is-what-percent', label: 'X is what % of Y?' },
    { id: 'increase-decrease', label: 'Percentage increase / decrease' },
    { id: 'add-subtract', label: 'Add or subtract X% from Y' },
    { id: 'difference', label: 'Percentage difference' },
  ];

  let resultMain = '';
  let resultLabel = 'Result';
  let formulaDisplay = '';
  let stepsText: string[] = [];

  const roundNum = (n: number, decimals = 4) => {
    if (isNaN(n) || !isFinite(n)) return '—';
    const rounded = Number(Math.round(Number(n + 'e' + decimals)) + 'e-' + decimals);
    return rounded.toLocaleString(undefined, { maximumFractionDigits: decimals });
  };

  if (mode === 'what-is') {
    const res = (x / 100) * y;
    resultMain = roundNum(res, 2);
    resultLabel = `${x}% of ${y}`;
    formulaDisplay = `Result = (${x} ÷ 100) × ${y} = ${roundNum(x / 100, 4)} × ${y} = ${resultMain}`;
    stepsText = [
      `Step 1: Convert ${x}% into a decimal by dividing by 100: ${x} ÷ 100 = ${roundNum(x / 100, 4)}.`,
      `Step 2: Multiply the decimal by ${y}: ${roundNum(x / 100, 4)} × ${y} = ${resultMain}.`,
      `Conclusion: ${x}% of ${y} is ${resultMain}.`,
    ];
  } else if (mode === 'is-what-percent') {
    const res = y !== 0 ? (x / y) * 100 : 0;
    resultMain = y !== 0 ? `${roundNum(res, 2)}%` : 'Undefined (cannot divide by zero)';
    resultLabel = `${x} as a % of ${y}`;
    formulaDisplay = `Percentage = (${x} ÷ ${y}) × 100 = ${y !== 0 ? roundNum(x / y, 4) : 0} × 100 = ${resultMain}`;
    stepsText = [
      `Step 1: Divide the part (${x}) by the whole total (${y}): ${x} ÷ ${y} = ${y !== 0 ? roundNum(x / y, 4) : 'undefined'}.`,
      `Step 2: Multiply the fraction by 100 to convert to a percentage: ${y !== 0 ? roundNum(x / y, 4) : 0} × 100 = ${resultMain}.`,
      `Conclusion: ${x} is ${resultMain} of ${y}.`,
    ];
  } else if (mode === 'increase-decrease') {
    const diff = y - x;
    const isIncrease = diff >= 0;
    const res = x !== 0 ? (diff / x) * 100 : 0;
    resultMain = x !== 0 ? `${roundNum(Math.abs(res), 2)}% ${isIncrease ? 'Increase' : 'Decrease'}` : 'Undefined';
    resultLabel = `Change from ${x} to ${y}`;
    formulaDisplay = `Change % = ((${y} − ${x}) ÷ ${x}) × 100 = (${roundNum(diff, 2)} ÷ ${x}) × 100 = ${roundNum(res, 2)}%`;
    stepsText = [
      `Step 1: Subtract original value from new value to find the net change: ${y} − ${x} = ${roundNum(diff, 2)}.`,
      `Step 2: Divide the net change by the starting baseline (${x}): ${roundNum(diff, 2)} ÷ ${x} = ${x !== 0 ? roundNum(diff / x, 4) : 'undefined'}.`,
      `Step 3: Multiply by 100: ${x !== 0 ? roundNum(diff / x, 4) : 0} × 100 = ${roundNum(Math.abs(res), 2)}%.`,
      `Conclusion: The transition from ${x} to ${y} is a ${resultMain}.`,
    ];
  } else if (mode === 'add-subtract') {
    const changeAmt = (x / 100) * y;
    const res = addOrSubtract === 'add' ? y + changeAmt : y - changeAmt;
    resultMain = roundNum(res, 2);
    resultLabel = `${addOrSubtract === 'add' ? 'Added' : 'Subtracted'} ${x}% ${addOrSubtract === 'add' ? 'to' : 'from'} ${y}`;
    formulaDisplay = addOrSubtract === 'add'
      ? `Result = ${y} × (1 + ${x} ÷ 100) = ${y} + ${roundNum(changeAmt, 2)} = ${resultMain}`
      : `Result = ${y} × (1 − ${x} ÷ 100) = ${y} − ${roundNum(changeAmt, 2)} = ${resultMain}`;
    stepsText = [
      `Step 1: Calculate ${x}% of ${y}: ${y} × (${x} ÷ 100) = ${roundNum(changeAmt, 2)}.`,
      `Step 2: ${addOrSubtract === 'add' ? 'Add the increase' : 'Deduct the reduction'} to the initial amount: ${y} ${addOrSubtract === 'add' ? '+' : '−'} ${roundNum(changeAmt, 2)} = ${resultMain}.`,
      `Conclusion: ${addOrSubtract === 'add' ? 'Adding' : 'Subtracting'} ${x}% to ${y} equals ${resultMain}.`,
    ];
  } else if (mode === 'difference') {
    const diff = Math.abs(x - y);
    const avg = (x + y) / 2;
    const res = avg !== 0 ? (diff / avg) * 100 : 0;
    resultMain = avg !== 0 ? `${roundNum(res, 2)}%` : '0%';
    resultLabel = `Percentage difference`;
    formulaDisplay = `Difference % = (|${x} − ${y}| ÷ ((${x} + ${y}) ÷ 2)) × 100 = (${roundNum(diff, 2)} ÷ ${roundNum(avg, 2)}) × 100 = ${resultMain}`;
    stepsText = [
      `Step 1: Calculate the absolute difference: |${x} − ${y}| = ${roundNum(diff, 2)}.`,
      `Step 2: Calculate the average (mean): (${x} + ${y}) ÷ 2 = ${roundNum(avg, 2)}.`,
      `Step 3: Divide difference by average: ${roundNum(diff, 2)} ÷ ${roundNum(avg, 2)} = ${avg !== 0 ? roundNum(diff / avg, 4) : 0}.`,
      `Step 4: Multiply by 100: ${resultMain}.`,
      `Conclusion: The percentage difference between ${x} and ${y} is ${resultMain}.`,
    ];
  }

  return (
    <div className={`grid gap-6 ${className}`}>
      {/* Mode Selector Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono-ui text-[11px] font-bold uppercase tracking-[.18em] text-accent">
            Calculation Mode
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">5 arithmetic modes</span>
        </div>
        <div className="flex flex-wrap gap-1.5 rounded-xl border border-border bg-muted/30 p-1.5">
          {modeButtons.map(btn => (
            <button
              key={btn.id}
              type="button"
              data-testid={`btn-percent-mode-${btn.id}`}
              onClick={() => setMode(btn.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                mode === btn.id
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Input Fields */}
      <div className="rounded-xl border border-border bg-background p-5 shadow-2xs">
        <div className="grid gap-4 sm:grid-cols-2">
          {mode === 'what-is' && (
            <>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Percentage (X %)</span>
                <div className="relative">
                  <input
                    data-testid="input-percent-x"
                    type="number"
                    step="any"
                    value={valX}
                    onChange={e => setValX(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="e.g. 15"
                  />
                  <span className="pointer-events-none absolute right-3 top-2.5 font-mono-ui text-xs text-muted-foreground">%</span>
                </div>
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Of total number (Y)</span>
                <input
                  data-testid="input-percent-y"
                  type="number"
                  step="any"
                  value={valY}
                  onChange={e => setValY(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="e.g. 80"
                />
              </label>
            </>
          )}

          {mode === 'is-what-percent' && (
            <>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Part value (X)</span>
                <input
                  data-testid="input-percent-x"
                  type="number"
                  step="any"
                  value={valX}
                  onChange={e => setValX(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="e.g. 30"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Whole total (Y)</span>
                <input
                  data-testid="input-percent-y"
                  type="number"
                  step="any"
                  value={valY}
                  onChange={e => setValY(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="e.g. 120"
                />
              </label>
            </>
          )}

          {mode === 'increase-decrease' && (
            <>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Initial / Starting value (X)</span>
                <input
                  data-testid="input-percent-x"
                  type="number"
                  step="any"
                  value={valX}
                  onChange={e => setValX(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="e.g. 80"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>New / Final value (Y)</span>
                <input
                  data-testid="input-percent-y"
                  type="number"
                  step="any"
                  value={valY}
                  onChange={e => setValY(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="e.g. 100"
                />
              </label>
            </>
          )}

          {mode === 'add-subtract' && (
            <>
              <div className="grid gap-1.5 text-sm font-medium">
                <span className="flex items-center justify-between">
                  <span>Operation</span>
                  <span className="font-mono-ui text-[10px] text-accent uppercase">{addOrSubtract === 'add' ? 'Increase (+)' : 'Decrease (−)'}</span>
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAddOrSubtract('add')}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold border transition ${
                      addOrSubtract === 'add'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    + Add X% to Y
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddOrSubtract('subtract')}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold border transition ${
                      addOrSubtract === 'subtract'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    − Subtract X% from Y
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1.5 text-sm font-medium">
                  <span>Percentage (X %)</span>
                  <input
                    data-testid="input-percent-x"
                    type="number"
                    step="any"
                    value={valX}
                    onChange={e => setValX(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="e.g. 20"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium">
                  <span>Base number (Y)</span>
                  <input
                    data-testid="input-percent-y"
                    type="number"
                    step="any"
                    value={valY}
                    onChange={e => setValY(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="e.g. 100"
                  />
                </label>
              </div>
            </>
          )}

          {mode === 'difference' && (
            <>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>First value (X)</span>
                <input
                  data-testid="input-percent-x"
                  type="number"
                  step="any"
                  value={valX}
                  onChange={e => setValX(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="e.g. 25"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Second value (Y)</span>
                <input
                  data-testid="input-percent-y"
                  type="number"
                  step="any"
                  value={valY}
                  onChange={e => setValY(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="e.g. 30"
                />
              </label>
            </>
          )}
        </div>
      </div>

      {/* Primary Result Display */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-secondary/60 bg-secondary/15 p-5">
          <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">
            {resultLabel}
          </p>
          <div className="mt-2 text-3xl font-bold font-display text-foreground" data-testid="result-percentage-main">
            {resultMain}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Instant browser-calculated answer</p>
        </div>

        <div className="rounded-xl border border-accent/30 bg-accent/10 p-5">
          <p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.14em] text-accent">
            Formula Applied
          </p>
          <code className="mt-2 block font-mono-ui text-xs font-semibold text-foreground bg-background/60 p-2 rounded border border-accent/20">
            {formulaDisplay}
          </code>
          <p className="mt-1.5 text-[11px] text-muted-foreground">Standard arithmetic equation</p>
        </div>
      </div>

      {/* Step-by-Step Calculation Explanation */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={16} className="text-accent" />
          <h3 className="font-mono-ui text-xs font-bold uppercase tracking-wider text-foreground">
            Calculation Steps in Plain Words
          </h3>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
          {stepsText.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-bold font-mono-ui text-secondary-foreground">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
