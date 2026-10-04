import { useEffect } from 'react';
import { Link } from 'wouter';
import { Shell } from './App';
import { updateDocumentHead } from './seo';

export default function PrivacyPage() {
  useEffect(() => {
    updateDocumentHead('/privacy/');
  }, []);

  return <Shell><main className="mx-auto max-w-[900px] px-5 py-12 lg:px-10 lg:py-20">
    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">LoveEasyTool / Home</Link>
    <p className="mt-10 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">The quiet promise</p>
    <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">Privacy at LoveEasyTool</h1>
    <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">LoveEasyTool is designed for quick tasks without asking you to create an account or upload your working files.</p>
    <div className="mt-12 grid gap-10">
      <section><h2 className="font-display text-3xl font-semibold">Browser-first processing</h2><p className="mt-3 leading-7 text-muted-foreground"><Link href="/category/text/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">Text utilities</Link>, <Link href="/category/numbers/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">financial calculators</Link>, and in-browser <Link href="/tools/image-compressor/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">image compressors</Link> and <Link href="/tools/merge-pdf/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">PDF tools</Link> process your inputs directly inside your device's browser tab. The selected files and personal career details used in our <Link href="/tools/cv-builder/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">free CV builder</Link> are never sent to a LoveEasyTool server.</p></section>
      <section><h2 className="font-display text-3xl font-semibold">Clear limits</h2><p className="mt-3 leading-7 text-muted-foreground">Some tools use your browser’s built-in capabilities, such as print-to-PDF and <Link href="/tools/time-zone-converter/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">time-zone data</Link>. Our <Link href="/tools/currency-converter/" className="font-medium text-foreground underline decoration-border hover:decoration-primary">currency reference tool</Link> uses static reference rates when live rates are unavailable. The tool page explains important limitations before you use it.</p></section>
      <section><h2 className="font-display text-3xl font-semibold">Your control</h2><p className="mt-3 leading-7 text-muted-foreground">Downloads are created for you to save locally. Closing the tab clears the working state held by the page. Do not enter information into any online tool unless you are comfortable processing it in your browser.</p></section>
    </div>
  </main></Shell>;
}
