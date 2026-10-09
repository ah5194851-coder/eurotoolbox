import { Link } from 'wouter';
import {
  MAIN_PERCENTAGE_EXAMPLES,
  PERCENTAGE_QUICK_REF_TABLE,
} from '../data/percentage-landing-data';
import { BookOpen, Calculator, ArrowRight, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export function HowToCalculateGuide() {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Educational Guide</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            How to Calculate a Percentage on a Calculator
          </h2>
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Smartphone size={14} className="text-primary" /> Smartphone & Handheld methods
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted/20 p-5">
          <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-mono-ui font-bold">1</span>
            The Universal Basic Formula
          </h3>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Every basic percentage calculation resolves back to one primary equation:
          </p>
          <div className="mt-3 rounded-lg border border-border/80 bg-background p-3 font-mono-ui text-xs font-semibold text-foreground text-center">
            Percentage (%) = (Part ÷ Whole) × 100
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            Divide the observed portion by the total amount, then multiply by 100. If you scored 45 marks on a 60-mark test: <strong>(45 ÷ 60) × 100 = 0.75 × 100 = 75%</strong>.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-5">
          <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-mono-ui font-bold">2</span>
            Using a Phone Calculator (% Key)
          </h3>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Smartphones (iPhone, Android) handle the percent key differently depending on the math:
          </p>
          <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Finding X% of Y:</strong> Type the total Y, tap multiply (×), type X, then press (%). Example: <strong>80 × 15 % = 12</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Adding a percentage:</strong> Type the total Y, tap plus (+), type X, then press (%). Example: <strong>100 + 20 % = 120</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
              <span><strong>Subtracting a discount:</strong> Type the price Y, tap minus (−), type X, then press (%). Example: <strong>50 − 10 % = 45</strong>.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PercentageFormulasBox() {
  return (
    <section className="mt-14">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Formula Reference</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">Percentage Formulas Box</h2>
        </div>
        <p className="text-xs text-muted-foreground">Comprehensive equations for all five arithmetic modes</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
          <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent font-bold">Mode 1 · Portion</span>
          <h3 className="mt-1 text-sm font-semibold text-foreground">What is X% of Y?</h3>
          <code className="mt-2 block rounded bg-muted/60 p-2 font-mono-ui text-xs text-primary font-semibold">
            Result = (X ÷ 100) × Y
          </code>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Convert percentage to decimal by dividing by 100, then multiply by the total.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
          <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent font-bold">Mode 2 · Proportion</span>
          <h3 className="mt-1 text-sm font-semibold text-foreground">X is what percent of Y?</h3>
          <code className="mt-2 block rounded bg-muted/60 p-2 font-mono-ui text-xs text-primary font-semibold">
            Percentage = (X ÷ Y) × 100
          </code>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Divide the part by the whole, then multiply by 100 to get the percentage notation.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
          <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent font-bold">Mode 3 · Growth</span>
          <h3 className="mt-1 text-sm font-semibold text-foreground">Percentage Increase</h3>
          <code className="mt-2 block rounded bg-muted/60 p-2 font-mono-ui text-xs text-primary font-semibold">
            ((New − Old) ÷ Old) × 100
          </code>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Find the gain by subtraction, divide by the old baseline, and multiply by 100.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
          <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent font-bold">Mode 4 · Reduction</span>
          <h3 className="mt-1 text-sm font-semibold text-foreground">Percentage Decrease</h3>
          <code className="mt-2 block rounded bg-muted/60 p-2 font-mono-ui text-xs text-primary font-semibold">
            ((Old − New) ÷ Old) × 100
          </code>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Find the lost amount, divide by the original starting baseline, and multiply by 100.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
          <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent font-bold">Mode 5 · Shift</span>
          <h3 className="mt-1 text-sm font-semibold text-foreground">Add or Subtract X%</h3>
          <code className="mt-2 block rounded bg-muted/60 p-2 font-mono-ui text-xs text-primary font-semibold">
            Y × (1 ± X ÷ 100)
          </code>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Use (1 + X/100) to apply markup/tax, or (1 − X/100) to apply discounts.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
          <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent font-bold">Mode 6 · Peer Spread</span>
          <h3 className="mt-1 text-sm font-semibold text-foreground">Percentage Difference</h3>
          <code className="mt-2 block rounded bg-muted/60 p-2 font-mono-ui text-xs text-primary font-semibold">
            (|X − Y| ÷ ((X + Y) ÷ 2)) × 100
          </code>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Divide the absolute spread between two numbers by their arithmetic mean.
          </p>
        </div>
      </div>
    </section>
  );
}

export function PercentageWorkedExamples() {
  return (
    <section className="mt-14">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Worked Demonstrations</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            Four Solved Percentage Examples
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">Concrete numbers with full step-by-step arithmetic</p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MAIN_PERCENTAGE_EXAMPLES.map((ex, idx) => (
          <div key={idx} className="rounded-xl border border-border bg-card p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider text-accent">
                Example {idx + 1}
              </span>
              <h3 className="mt-1.5 font-display text-base font-semibold text-foreground">
                {ex.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {ex.description}
              </p>
              <div className="mt-3.5 rounded-lg bg-muted/40 p-3 font-mono-ui text-xs space-y-1">
                <div className="text-muted-foreground text-[11px]">Math: {ex.calculation}</div>
                <div className="font-bold text-primary text-sm pt-1 border-t border-border/60">
                  Result: {ex.result}
                </div>
              </div>
            </div>
            <div className="mt-3 text-[10px] font-mono-ui text-muted-foreground bg-muted/20 p-2 rounded border border-border/50">
              {ex.formula}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PercentageQuickRefTable() {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Mental Math Cheat Sheet</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
            Percentage Quick-Reference Table
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">Standard benchmark figures for fast mental estimation</p>
      </div>

      <div className="mt-6 -mx-6 sm:mx-0 overflow-x-auto px-6 sm:px-0">
        <table className="w-full min-w-[480px] text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-mono-ui uppercase tracking-wider text-muted-foreground">
              <th className="py-3 px-4 rounded-l-lg font-bold">Percentage</th>
              <th className="py-3 px-4 font-bold text-center">of 100</th>
              <th className="py-3 px-4 font-bold text-center">of 200</th>
              <th className="py-3 px-4 rounded-r-lg font-bold text-center">of 500</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 font-mono-ui text-xs sm:text-sm">
            {PERCENTAGE_QUICK_REF_TABLE.map((row) => (
              <tr key={row.percent} className="hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-bold text-primary">{row.percent}</td>
                <td className="py-3 px-4 text-center font-semibold text-foreground">{row.of100}</td>
                <td className="py-3 px-4 text-center font-semibold text-foreground">{row.of200}</td>
                <td className="py-3 px-4 text-center font-semibold text-accent">{row.of500}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function PercentageLinksList() {
  const links = [
    { name: 'Percentage Increase Calculator', path: '/percentage-increase-calculator/', badge: 'Growth', desc: 'Calculate percentage growth between an old and new amount' },
    { name: 'Percentage Decrease Calculator', path: '/percentage-decrease-calculator/', badge: 'Reduction', desc: 'Calculate markdown, loss, or percentage reduction from a baseline' },
    { name: 'Percentage Difference Calculator', path: '/percentage-difference-calculator/', badge: 'Comparison', desc: 'Compare the relative spread between two numbers without a baseline' },
    { name: 'What Is X% of Y? Calculator', path: '/what-is-x-percent-of-y/', badge: 'Portion', desc: 'Instant calculation of any percentage fraction of a total' },
    { name: 'How to Calculate Percentage Guide', path: '/how-to-calculate-percentage/', badge: 'Guide', desc: 'Universal step-by-step formulas, shortcuts, and phone methods' },
  ];

  return (
    <div className="mt-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Focused Calculators</p>
          <h3 className="font-display text-xl font-semibold text-foreground">Dedicated Percentage Calculators</h3>
        </div>
        <span className="text-xs text-muted-foreground">Pre-configured tools for specific questions</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Jump directly to specialized calculators with focused arithmetic workflows and tailored guides:
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(link => (
          <Link
            key={link.path}
            href={link.path}
            className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition">
                  {link.name}
                </span>
                <span className="font-mono-ui text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                  {link.badge}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {link.desc}
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary group-hover:underline">
              Open tool <ArrowRight size={13} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Calculate Payroll & Deductions:</span>
        <Link href="/tools/salary-calculator/" className="hover:text-primary hover:underline font-medium">
          Salary Calculator (Gross to Net Pay)
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
