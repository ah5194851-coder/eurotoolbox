import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { categories, Shell, tools } from './App';
import { getCategorySeo, updateDocumentHead } from './seo';
import { useEffect } from 'react';
import NotFound from '@/pages/not-found';

export default function CategoryPage() {
  const { category: slug = '' } = useParams<{ category: string }>();
  const page = getCategorySeo(slug);
  const categoryName = categories.find(category => category.toLowerCase() === slug)?.replace(/ tools$/i, '');
  const filtered = tools.filter(tool => tool.category.toLowerCase() === slug);

  useEffect(() => {
    updateDocumentHead(page ? `/category/${slug}` : '/404');
  }, [page, slug]);

  if (!page || !categoryName) return <NotFound />;

  return <Shell><main className="mx-auto max-w-[1360px] px-5 py-12 lg:px-10 lg:py-20">
    <div className="max-w-2xl">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Toolbox / All tools</Link>
      <p className="mt-10 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Tool cabinet / {categoryName}</p>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">{page.title.split(' – ')[0]}</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{page.description}</p>
    </div>
    <section className="mt-12" aria-labelledby="category-tools">
      <h2 id="category-tools" className="font-display text-3xl font-semibold tracking-tight">Browse {categoryName.toLowerCase()} tools</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map(tool => <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-md">
          <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">{tool.icon}</span><ArrowRight size={17} className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" /></div>
          <h3 className="mt-5 font-display text-xl font-semibold">{tool.name}</h3>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{tool.description}</p>
        </Link>)}
      </div>
    </section>
  </main></Shell>;
}
