
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Router, Route, Switch } from 'wouter';
import NotFound from '@/pages/not-found';
import Home from './home-page';
import CategoryPage from './category-page';
import PrivacyPage from './privacy-page';
import BooksPage from './books-page';
import { ToolPage } from './tool-page';
import { categorySlugs, renderHead, absoluteUrl } from './seo';
import { SITE_URL } from './site-config';
import { tools } from './App';

export { renderHead, absoluteUrl, SITE_URL };

export const PRERENDER_ROUTES = [
  '/',
  '/privacy',
  '/books',
  ...categorySlugs.map(slug => `/category/${slug}`),
  ...tools.map(tool => `/tools/${tool.slug}`),
  ...tools.map(tool => `/${tool.slug}`),
];
export const SITEMAP_ROUTES = ['/', '/privacy', '/books', ...categorySlugs.map(slug => `/category/${slug}`), ...tools.map(tool => `/tools/${tool.slug}`)];

export function renderRoute(path: string) {
  const queryClient = new QueryClient();
  return renderToStaticMarkup(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router ssrPath={path}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/books" component={BooksPage} />
            <Route path="/category/:category" component={CategoryPage} />
            <Route path="/tools/:tool" component={ToolPage} />
            <Route path="/:tool" component={ToolPage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>,
  );
}
