import { Link } from 'wouter';
import { VAT_COUNTRY_PRESETS, MAIN_VAT_EXAMPLES } from '../data/country-vat';
import { ArrowRight, HelpCircle, Table, CheckCircle2, Globe2, BookOpen } from 'lucide-react';

export function VatRatesTable() {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">International Reference</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">VAT Rates by Country</h2>
        </div>
        <p className="text-xs text-muted-foreground">Updated for global standard and reduced tax brackets</p>
      </div>

      <p className="mt-3 text-xs leading-5 text-muted-foreground italic">
        Rates are for general reference. Always confirm with your local tax authority.
      </p>

      <div className="mt-6 -mx-6 sm:mx-0 overflow-x-auto px-6 sm:px-0">
        <table className="w-full min-w-[640px] text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-mono-ui uppercase tracking-wider text-muted-foreground">
              <th className="py-3 px-4 rounded-l-lg font-bold">Country</th>
              <th className="py-3 px-4 font-bold text-center">Standard Rate</th>
              <th className="py-3 px-4 font-bold">Reduced Rate Where Applicable</th>
              <th className="py-3 px-4 rounded-r-lg font-bold">Name of Tax</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {VAT_COUNTRY_PRESETS.map((p) => (
              <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-foreground">
                  {p.landingSlug ? (
                    <Link
                      href={`/${p.landingSlug}/`}
                      className="text-primary hover:underline inline-flex items-center gap-1.5"
                    >
                      {p.name}
                      <span className="text-[10px] font-normal text-muted-foreground">→</span>
                    </Link>
                  ) : (
                    <span>{p.name}</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center font-mono-ui font-bold text-accent">
                  {p.standardRate}%
                </td>
                <td className="py-3.5 px-4 text-xs text-muted-foreground leading-relaxed">
                  {p.reducedRates}
                </td>
                <td className="py-3.5 px-4 text-xs font-mono-ui text-foreground">
                  <span className="font-semibold text-primary">{p.taxAbbr}</span>{' '}
                  <span className="text-muted-foreground">({p.taxName})</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function VatWorkedExamples() {
  return (
    <section className="mt-14">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Step-by-Step Walkthroughs</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">VAT Calculation Examples</h2>
        </div>
        <p className="text-xs text-muted-foreground">Clear formulas and numbers for everyday invoicing</p>
      </div>

      {/* Formulas Box */}
      <div className="mt-5 rounded-xl border border-primary/25 bg-primary/[.03] p-5">
        <h3 className="font-mono-ui text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
          <BookOpen size={15} /> Standard VAT Formulas
        </h3>
        <div className="mt-3 grid gap-3 text-sm text-foreground sm:grid-cols-3">
          <div className="rounded-lg border border-border/80 bg-background/80 p-3.5">
            <span className="text-xs font-semibold text-accent block font-mono-ui uppercase">1. Add VAT (Net to Gross)</span>
            <code className="mt-1.5 block font-mono-ui text-xs font-semibold text-foreground bg-muted/60 p-1.5 rounded">
              gross = net × (1 + rate / 100)
            </code>
            <p className="mt-1 text-[11px] text-muted-foreground">Multiply the net price by 1 plus the tax rate as a decimal.</p>
          </div>
          <div className="rounded-lg border border-border/80 bg-background/80 p-3.5">
            <span className="text-xs font-semibold text-accent block font-mono-ui uppercase">2. Remove VAT (Gross to Net)</span>
            <code className="mt-1.5 block font-mono-ui text-xs font-semibold text-foreground bg-muted/60 p-1.5 rounded">
              net = gross ÷ (1 + rate / 100)
            </code>
            <p className="mt-1 text-[11px] text-muted-foreground">Divide the inclusive total by 1 plus the tax rate as a decimal.</p>
          </div>
          <div className="rounded-lg border border-border/80 bg-background/80 p-3.5">
            <span className="text-xs font-semibold text-accent block font-mono-ui uppercase">3. VAT Amount</span>
            <code className="mt-1.5 block font-mono-ui text-xs font-semibold text-foreground bg-muted/60 p-1.5 rounded">
              vat amount = gross − net
            </code>
            <p className="mt-1 text-[11px] text-muted-foreground">Subtract the net price from the gross price to isolate the tax portion.</p>
          </div>
        </div>
      </div>

      {/* 3 Solved Examples */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Example a */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider text-accent">Example A · Add 20%</span>
            <span className="rounded bg-secondary/70 px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">Net → Gross</span>
          </div>
          <h3 className="mt-2.5 font-display text-lg font-semibold text-foreground">Add 20% VAT to 100</h3>
          <p className="mt-1 text-xs text-muted-foreground">Standard quote or customer invoice with 20% tax.</p>
          <div className="mt-4 rounded-lg bg-muted/40 p-3 font-mono-ui text-xs space-y-1.5 text-foreground">
            <div className="flex justify-between"><span>Net amount:</span> <span className="font-semibold">100.00</span></div>
            <div className="flex justify-between text-accent"><span>VAT (20%):</span> <span className="font-semibold">20.00</span></div>
            <div className="flex justify-between border-t border-border pt-1.5 font-bold"><span>Total gross:</span> <span className="text-primary font-bold">120.00</span></div>
          </div>
          <div className="mt-3 text-[11px] text-muted-foreground bg-card border border-border/60 rounded p-2.5">
            <strong>Formula:</strong> 100 × (1 + 0.20) = 120.00 (VAT portion: 20.00)
          </div>
        </div>

        {/* Example b */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider text-accent">Example B · Remove 20%</span>
            <span className="rounded bg-secondary/70 px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">Gross → Net</span>
          </div>
          <h3 className="mt-2.5 font-display text-lg font-semibold text-foreground">Remove 20% VAT from 120</h3>
          <p className="mt-1 text-xs text-muted-foreground">Extract pre-tax cost and tax refund amount from a receipt.</p>
          <div className="mt-4 rounded-lg bg-muted/40 p-3 font-mono-ui text-xs space-y-1.5 text-foreground">
            <div className="flex justify-between"><span>Gross total:</span> <span className="font-semibold">120.00</span></div>
            <div className="flex justify-between text-accent"><span>VAT (20%):</span> <span className="font-semibold">20.00</span></div>
            <div className="flex justify-between border-t border-border pt-1.5 font-bold"><span>Net amount:</span> <span className="text-primary font-bold">100.00</span></div>
          </div>
          <div className="mt-3 text-[11px] text-muted-foreground bg-card border border-border/60 rounded p-2.5">
            <strong>Formula:</strong> 120 ÷ 1.20 = 100.00 (VAT amount: 120 − 100 = 20.00)
          </div>
        </div>

        {/* Example c */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ui text-[10px] font-bold uppercase tracking-wider text-accent">Example C · German MwSt</span>
            <span className="rounded bg-secondary/70 px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">19% Rate</span>
          </div>
          <h3 className="mt-2.5 font-display text-lg font-semibold text-foreground">Add 19% MwSt to 250</h3>
          <p className="mt-1 text-xs text-muted-foreground">German commercial billing with standard Mehrwertsteuer.</p>
          <div className="mt-4 rounded-lg bg-muted/40 p-3 font-mono-ui text-xs space-y-1.5 text-foreground">
            <div className="flex justify-between"><span>Net amount:</span> <span className="font-semibold">250.00</span></div>
            <div className="flex justify-between text-accent"><span>MwSt (19%):</span> <span className="font-semibold">47.50</span></div>
            <div className="flex justify-between border-t border-border pt-1.5 font-bold"><span>Total gross:</span> <span className="text-primary font-bold">297.50</span></div>
          </div>
          <div className="mt-3 text-[11px] text-muted-foreground bg-card border border-border/60 rounded p-2.5">
            <strong>Formula:</strong> 250 × (1 + 0.19) = 297.50 (MwSt portion: 47.50)
          </div>
        </div>
      </div>
    </section>
  );
}

export function CountryVatLinksList() {
  const countryLinks = [
    { name: 'UK VAT Calculator', path: '/uk-vat-calculator/', rate: '20% VAT', desc: 'HMRC standard and reduced tax rates in GBP (£)' },
    { name: 'Germany VAT Calculator', path: '/germany-vat-calculator/', rate: '19% MwSt', desc: 'Mehrwertsteuer & USt standard rates in EUR (€)' },
    { name: 'France VAT Calculator', path: '/france-vat-calculator/', rate: '20% TVA', desc: 'Taxe sur la valeur ajoutée rates in EUR (€)' },
    { name: 'Ireland VAT Calculator', path: '/ireland-vat-calculator/', rate: '23% VAT', desc: 'Irish Revenue standard and reduced rates in EUR (€)' },
    { name: 'UAE VAT Calculator', path: '/uae-vat-calculator/', rate: '5% VAT', desc: 'Federal Tax Authority standard rate in AED' },
    { name: 'Saudi Arabia VAT Calculator', path: '/saudi-arabia-vat-calculator/', rate: '15% VAT', desc: 'ZATCA standard rate in Saudi Riyals (SAR)' },
  ];

  return (
    <div className="mt-12 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Country-Specific Portals</p>
          <h3 className="font-display text-xl font-semibold text-foreground">VAT Calculators by Country</h3>
        </div>
        <span className="text-xs text-muted-foreground">Pre-configured with official national tax rates</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Use dedicated national VAT calculators customized for local registration rules, currency symbols, and statutory tax rates:
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {countryLinks.map(link => (
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
                  {link.rate}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {link.desc}
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary group-hover:underline">
              Open calculator <ArrowRight size={13} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
