import { Link } from 'wouter';
import { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { Shell } from './App';
import { updateDocumentHead } from './seo';

const books = [
  { title: "The Beginner's Guide to Cybersecurity for Everyday People", description: 'A clear, non-technical guide to passwords, phishing, privacy rights, and staying safe online.', url: 'https://www.lulu.com/shop/ali-hassan/the-beginners-guide-to-cybersecurity-for-everyday-people/paperback/product-v8nyyzm.html' },
  { title: 'The Daily Mindfulness & Habit Reset Journal', description: 'A guided 30-day program combining mindfulness practices with realistic, gentle habit-building.', url: 'https://www.lulu.com/shop/ali-hassan/the-daily-mindfulness-habit-reset-journal/hardcover/product-q67jn7q.html' },
  { title: 'The Small Business Social Media Content Kit', description: 'A practical system for planning, creating, and scheduling content that grows a small business.', url: 'https://www.lulu.com/shop/ali-hassan/the-small-business-social-media-content-kit/paperback/product-e72dzr5.html' },
  { title: "The Beginner's Guide to Remote Work and the Digital Economy", description: 'A practical guide to finding remote jobs, freelancing, time zones, and staying productive without an office.', url: 'https://www.lulu.com/shop/ali-hassan/the-beginners-guide-to-remote-work-and-the-digital-economy/paperback/product-zmvyvz6.html' },
  { title: "The Beginner's Guide to Productivity and Habit Building", description: 'Practical systems for building habits, prioritizing tasks, and getting things done without burning out.', url: 'https://www.lulu.com/shop/ali-hassan/the-beginners-guide-to-productivity-and-habit-building/paperback/product-57n846m.html' },
  { title: "The Beginner's Guide to Personal Finance", description: 'Simple strategies to build a budget, save, manage debt, and build better money habits.', url: 'https://www.lulu.com/shop/ali-hassan/the-beginners-guide-to-personal-finance/paperback/product-nv5zzpm.html' },
  { title: "The Beginner's Guide to Freelancing", description: 'A practical introduction to starting and growing a freelance career, from your first client to a sustainable business.', url: 'https://www.lulu.com/shop/ali-hassan/the-beginners-guide-to-freelancing/paperback/product-57nvqj7.html' },
  { title: 'Finding Freelance Clients', description: 'A practical guide to getting your first clients, writing proposals, and building long-term client relationships.', url: 'https://www.lulu.com/shop/ali-hassan/finding-freelance-clients/paperback/product-m2vmwry.html' },
  { title: 'Starting an Online Business', description: "A practical beginner's guide to choosing an idea, finding customers, and making your first sales online.", url: 'https://www.lulu.com/shop/ali-hassan/starting-an-online-business/paperback/product-7k56wwe.html' },
  { title: "The Beginner's Guide to Artificial Intelligence", description: 'A clear, beginner-friendly introduction to how AI works and what it means for everyday life and work.', url: 'https://www.lulu.com/shop/ali-hassan/the-beginners-guide-to-artificial-intelligence/paperback/product-q67d6yw.html' },
  { title: 'Ultimate Job Application Toolkit', description: 'A practical toolkit to help job seekers put together strong applications and stand out to employers.', url: 'https://www.lulu.com/shop/ali-hassan/ultimate-job-application-toolkit/paperback/product-7k5q7n2.html' },
  { title: 'Large Print Word Search Puzzles for Seniors', description: 'A relaxing large-print word search puzzle book designed for easy reading and enjoyment.', url: 'https://www.lulu.com/shop/ali-hassan/large-print-word-search-puzzles-for-seniors/paperback/product-v8n4pjn.html' },
  { title: 'Monthly Expense Tracker', description: 'A simple, practical monthly expense tracker to help build a clear picture of spending habits.', url: 'https://www.lulu.com/shop/ali-hassan/monthly-expense-tracker/paperback/product-v8n46pd.html' },
];

export default function BooksPage() {
  useEffect(() => {
    updateDocumentHead('/books/');
  }, []);
  return <Shell><main className="mx-auto max-w-[1360px] px-5 py-12 lg:px-10 lg:py-20">
    <div className="max-w-2xl">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">LoveEasyTool / Books</Link>
      <p className="mt-10 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">By Ali Hassan</p>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">Books</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Practical beginner's guides on AI, cybersecurity, remote work, freelancing, productivity, personal finance and more.</p>
    </div>
    <section className="mt-12" aria-labelledby="books-list">
      <h2 id="books-list" className="sr-only">All books</h2>
      <div className="mt-2 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {books.map(book => <a key={book.url} href={book.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-md">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><BookOpen size={18} /></span>
          <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{book.title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{book.description}</p>
          <span className="mt-4 inline-block text-sm font-semibold text-primary">View on Lulu →</span>
        </a>)}
      </div>
    </section>

    <section className="mt-20 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-accent">Companion Utilities</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Practical Tools for Daily Productivity</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Put the principles from these books into practice with LoveEasyTool's free browser-based career, finance, and writing utilities.
          </p>
        </div>
        <Link href="/#tools" className="text-sm font-semibold text-primary hover:underline">
          Explore full toolbox →
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: 'Free CV Builder', slug: 'cv-builder', cat: 'Career', desc: 'Craft a clean, ATS-friendly resume directly in your browser.' },
          { name: 'Cover Letter Generator', slug: 'cover-letter-generator', cat: 'Career', desc: 'Draft persuasive cover letters tailored to your target position.' },
          { name: 'Salary Calculator', slug: 'salary-calculator', cat: 'Finance', desc: 'Calculate take-home pay, tax estimates, and freelance earnings.' },
          { name: 'Loan Calculator', slug: 'loan-calculator', cat: 'Finance', desc: 'Estimate loan amortizations and interest payments accurately.' },
          { name: 'Percentage Calculator', slug: 'percentage-calculator', cat: 'Numbers', desc: 'Compute margins, percentage increases, and proportions.' },
          { name: 'Word Counter', slug: 'word-counter', cat: 'Writing', desc: 'Check word counts, character limits, and reading time estimates.' },
        ].map(t => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}/`}
            className="group rounded-xl border border-border/80 bg-background/60 p-4 transition hover:border-primary hover:shadow-2xs"
          >
            <p className="font-mono-ui text-[10px] uppercase tracking-wider text-accent">{t.cat}</p>
            <h3 className="mt-1 font-display text-base font-semibold group-hover:text-primary transition">{t.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  </main></Shell>;
}
