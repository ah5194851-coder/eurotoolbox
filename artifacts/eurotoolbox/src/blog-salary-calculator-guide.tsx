import { useEffect } from 'react';
import { Link } from 'wouter';
import { Shell } from './App';
import { updateDocumentHead } from './seo';
import { AdSlot } from './components/ad-slot';
import { BLOG_ARTICLES } from './data/blog-data';
import {
  Calculator,
  Wallet,
  Globe2,
  Clock,
  Calendar,
  User,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Landmark
} from 'lucide-react';

export default function BlogSalaryCalculatorGuide() {
  const meta = BLOG_ARTICLES['salary-calculator-guide'];

  useEffect(() => {
    updateDocumentHead(meta.canonicalPath);
  }, [meta.canonicalPath]);

  return (
    <Shell>
      <main className="bg-background">
        <section className="paper-grid border-b border-border bg-card/60 py-12 lg:py-16">
          <div className="mx-auto max-w-[900px] px-5 lg:px-8">
            <nav className="flex items-center gap-2 font-mono-ui text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <span>/</span>
              <span className="text-foreground">Salary Guides</span>
              <span>/</span>
              <span className="text-primary truncate">Salary Calculator Guide</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono-ui text-xs font-bold uppercase tracking-wider text-primary">
                <Calculator size={14} /> Salary Guide
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar size={13} /> Published: October 24, 2026
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={13} /> 8 min read
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <User size={13} /> By {meta.author}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              {meta.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              A job offer says one number, but your bank account shows another. The gap between the two is made of income tax, social contributions, pension payments and other deductions — and it surprises almost everyone. This guide explains how a salary calculator works out your real take-home pay, how to convert between monthly, hourly and annual pay, and why the same salary means something different in every country.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 rounded-xl border border-border bg-background/80 p-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <strong className="text-foreground">Try it now:</strong>
                <Link href="/tools/salary-calculator" className="inline-flex items-center gap-1 font-semibold text-primary underline hover:text-primary/80">
                  Free Salary Calculator <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-[900px] px-5 py-12 lg:px-8">
          <AdSlot id="ad-after-intro-salary-guide" />

          <section className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Wallet className="text-primary" size={24} />
              What a salary calculator actually works out
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A salary calculator turns your <strong>gross pay</strong> — the headline number in your contract — into your <strong>net pay</strong>, the amount that actually reaches your bank account. To do that it subtracts the deductions that apply in your country: income tax, social security or national insurance contributions, and sometimes pension contributions or other statutory charges.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              The LoveEasyTool salary calculator covers 15 countries with published statutory tax and social contribution rates, plus a custom mode for anywhere else. Everything runs in your browser, so your salary details never leave your device.
            </p>
          </section>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-12">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Calculator className="text-primary" size={24} />
              How to use the salary calculator
            </h2>
            <ol className="mt-4 grid gap-3 text-base leading-7 text-muted-foreground list-none pl-0">
              <li><strong className="text-foreground">1. Pick your country</strong> — choose from the 15 supported countries, or use custom mode if your country is not listed.</li>
              <li><strong className="text-foreground">2. Enter your gross pay</strong> — type in your salary and select whether it is monthly, annual or hourly.</li>
              <li><strong className="text-foreground">3. Add pension and extras</strong> — if the calculator asks, add your pension contribution or allowances for a more accurate result.</li>
              <li><strong className="text-foreground">4. Read the breakdown</strong> — see your monthly and annual gross pay, total deductions and estimated take-home pay side by side.</li>
            </ol>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Open the tool here: <Link href="/tools/salary-calculator" className="font-semibold text-primary underline hover:text-primary/80">Salary Calculator</Link>.
            </p>
          </section>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-12">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Landmark className="text-primary" size={24} />
              Gross pay vs net pay: the difference that matters
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Gross pay is what your employer budgets for your role. Net pay is what you can actually spend. The difference is rarely small: in many countries a fifth or more of gross pay goes to tax and social contributions before you see it.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              As a simple illustration only, a contract showing 60,000 a year does not mean 5,000 a month in hand. After deductions, the monthly take-home figure is noticeably lower — which is exactly why comparing job offers on gross salary alone is misleading. Always compare the net figure.
            </p>
          </section>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-12">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Clock className="text-primary" size={24} />
              Converting monthly, hourly and annual salary
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Job offers come in different shapes: one quotes an annual salary, another an hourly rate. The conversions are simple:
            </p>
            <ul className="mt-4 grid gap-2 text-base leading-7 text-muted-foreground">
              <li><strong className="text-foreground">Monthly from annual:</strong> divide the annual salary by 12.</li>
              <li><strong className="text-foreground">Annual from hourly:</strong> multiply the hourly rate by your weekly hours, then by 52 weeks.</li>
              <li><strong className="text-foreground">Hourly from annual:</strong> divide the annual salary by 52 weeks and then by your weekly hours.</li>
            </ul>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Dedicated converters do this instantly: <Link href="/monthly-salary-calculator" className="font-semibold text-primary underline hover:text-primary/80">Monthly Salary Calculator</Link>, <Link href="/hourly-to-salary-calculator" className="font-semibold text-primary underline hover:text-primary/80">Hourly to Salary Calculator</Link>, <Link href="/annual-to-monthly-salary-calculator" className="font-semibold text-primary underline hover:text-primary/80">Annual to Monthly Calculator</Link> and <Link href="/net-salary-calculator" className="font-semibold text-primary underline hover:text-primary/80">Net Salary Calculator</Link>.
            </p>
          </section>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-12">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Globe2 className="text-primary" size={24} />
              Why take-home pay differs by country
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The same gross salary can leave you with very different take-home pay depending on where you work. Tax bands, tax-free allowances and social contribution rates all differ — some countries tax heavily but fund pensions and healthcare through those contributions, while others, like the UAE, levy no personal income tax at all.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              That is why a country-specific calculator matters. Compare your own situation with the dedicated pages for <Link href="/tools/salary-calculator/uk" className="font-semibold text-primary underline hover:text-primary/80">UK Salary</Link>, <Link href="/tools/salary-calculator/canada" className="font-semibold text-primary underline hover:text-primary/80">Canada</Link>, <Link href="/tools/salary-calculator/germany" className="font-semibold text-primary underline hover:text-primary/80">Germany</Link>, <Link href="/tools/salary-calculator/uae" className="font-semibold text-primary underline hover:text-primary/80">UAE</Link>, <Link href="/tools/salary-calculator/pakistan" className="font-semibold text-primary underline hover:text-primary/80">Pakistan</Link> and <Link href="/tools/salary-calculator/india" className="font-semibold text-primary underline hover:text-primary/80">India</Link>, plus nine more countries.
            </p>
          </section>

          <section className="prose prose-neutral dark:prose-invert max-w-none mt-12">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <CheckCircle2 className="text-primary" size={24} />
              Five common salary calculation mistakes
            </h2>
            <ul className="mt-4 grid gap-2 text-base leading-7 text-muted-foreground">
              <li><strong className="text-foreground">Treating gross as net</strong> — the single most common error when comparing offers.</li>
              <li><strong className="text-foreground">Forgetting pension contributions</strong> — these reduce take-home pay but build your retirement fund.</li>
              <li><strong className="text-foreground">Comparing salaries across countries on gross figures</strong> — tax systems make gross comparisons meaningless.</li>
              <li><strong className="text-foreground">Mixing up pay periods</strong> — always convert hourly, monthly and annual figures to the same period before comparing.</li>
              <li><strong className="text-foreground">Using outdated rates</strong> — tax bands change every year, so use a calculator with current published rates.</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <HelpCircle className="text-primary" size={24} />
              Frequently asked questions
            </h2>
            <div className="mt-6 grid gap-5">
              {meta.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-border bg-card/60 p-5">
                  <h3 className="font-display text-base font-semibold text-foreground">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h2 className="font-display text-xl font-bold text-foreground">Work out your take-home pay now</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Enter your gross salary, pick your country and see your estimated monthly and annual take-home pay in seconds — free, with nothing uploaded anywhere.
            </p>
            <Link href="/tools/salary-calculator" className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Open the Salary Calculator <ArrowRight size={15} />
            </Link>
          </section>
        </article>
      </main>
    </Shell>
  );
}
