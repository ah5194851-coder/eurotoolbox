import { useEffect } from 'react';
import { Link } from 'wouter';
import { Shell } from './App';
import { updateDocumentHead } from './seo';

export default function TermsPage() {
  useEffect(() => {
    updateDocumentHead('/terms/');
  }, []);

  return (
    <Shell>
      <main className="mx-auto max-w-[900px] px-5 py-12 lg:px-10 lg:py-20">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">LoveEasyTool</Link>
          <span>/</span>
          <span className="text-foreground">Terms</span>
        </div>

        <p className="mt-10 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Legal & Use</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">Terms of Service</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Welcome to LoveEasyTool. By accessing or using our website and browser utilities, you agree to these terms.
        </p>

        <div className="mt-12 grid gap-10">
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">1. Permitted Use</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              LoveEasyTool provides free web-based utilities for text processing, mathematical calculation, image manipulation, and document formatting. You are granted a non-exclusive, revocable, and free license to use all tools for personal, educational, and commercial purposes without creating an account or paying a fee.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">2. Client-Side Processing & Data Ownership</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              All files, images, PDFs, numbers, and text you input into LoveEasyTool remain your sole property. Calculations and transformations execute locally within your web browser. You acknowledge that when you close or refresh your browser tab, un-downloaded working state is immediately cleared from your browser’s temporary memory.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">3. Tool Accuracy & Limitations</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              While we strive for high precision across all calculators and converters:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-6 text-muted-foreground">
              <li><strong>Financial & Tax Calculators</strong> (<Link href="/tools/vat-calculator/" className="underline hover:text-primary">VAT</Link>, <Link href="/tools/loan-calculator/" className="underline hover:text-primary">Loan</Link>, <Link href="/tools/salary-calculator/" className="underline hover:text-primary">Salary</Link>): Results are mathematical estimates for planning purposes and do not constitute certified tax, legal, or financial advice.</li>
              <li><strong>Health & BMI Tools</strong>: Body Mass Index on our <Link href="/tools/bmi-calculator/" className="underline hover:text-primary">BMI calculator</Link> is an informational screening ratio and does not substitute professional medical diagnosis.</li>
              <li><strong>Currency Converter</strong>: Our <Link href="/tools/currency-converter/" className="underline hover:text-primary">currency converter</Link> uses static reference exchange rates for estimations when live forex feeds are not connected.</li>
              <li><strong>Document & Image Tools</strong>: Output quality on <Link href="/category/pdf/" className="underline hover:text-primary">PDF tools</Link> and <Link href="/category/files/" className="underline hover:text-primary">file utilities</Link> depends on your device's browser capabilities and input file formats.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">4. Intellectual Property</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              The LoveEasyTool brand, layout, interface code, authored guides, and published book contents by Ali Hassan are protected by international copyright laws. You may not scrape, frame, or duplicate the platform interface to misrepresent it as your own service without written consent.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">5. Disclaimer of Warranties & Limitation of Liability</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              The services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied. Under no circumstances shall LoveEasyTool or its creator Ali Hassan be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the tools.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              Questions regarding these terms? Contact us directly at{' '}
              <a href="mailto:support@loveeasytool.com" className="font-semibold text-primary underline">
                support@loveeasytool.com
              </a>.
            </p>
          </section>
        </div>
      </main>
    </Shell>
  );
}
