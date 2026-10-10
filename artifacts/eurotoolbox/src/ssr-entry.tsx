
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Router, Route, Switch } from 'wouter';
import NotFound from '@/pages/not-found';
import Home from './home-page';
import CategoryPage from './category-page';
import PrivacyPage from './privacy-page';
import BooksPage from './books-page';
import AboutPage from './about-page';
import ContactPage from './contact-page';
import TermsPage from './terms-page';
import { ToolPage } from './tool-page';
import CountryVatPage from './country-vat-page';
import SalaryLandingPage from './salary-landing-page';
import SalaryCountryPage from './salary-country-page';
import { SALARY_COUNTRY_PAGES } from './data/salary-country-data';
import { categorySlugs, renderHead, absoluteUrl } from './seo';
import { SITE_URL } from './site-config';
import { tools } from './App';

export { renderHead, absoluteUrl, SITE_URL, tools };

export const COUNTRY_VAT_ROUTES = [
  '/uk-vat-calculator/',
  '/germany-vat-calculator/',
  '/france-vat-calculator/',
  '/ireland-vat-calculator/',
  '/uae-vat-calculator/',
  '/saudi-arabia-vat-calculator/',
];

export const SALARY_COUNTRY_ROUTES = Object.values(SALARY_COUNTRY_PAGES).map(p => p.canonicalPath);

export const SALARY_LANDING_ROUTES = [
  '/monthly-salary-calculator/',
  '/hourly-to-salary-calculator/',
  '/annual-to-monthly-salary-calculator/',
  '/basic-salary-calculator/',
  '/net-salary-calculator/',
];

export const PRERENDER_ROUTES = [
  '/',
  '/about/',
  '/contact/',
  '/terms/',
  '/privacy/',
  '/books/',
  ...categorySlugs.map(slug => `/category/${slug}/`),
  ...tools.map(tool => `/tools/${tool.slug}/`),
  ...COUNTRY_VAT_ROUTES,
  ...SALARY_LANDING_ROUTES,
  ...SALARY_COUNTRY_ROUTES,
  ...SALARY_COUNTRY_ROUTES,
];
export const SITEMAP_ROUTES = [
  '/',
  '/about/',
  '/contact/',
  '/terms/',
  '/privacy/',
  '/books/',
  ...categorySlugs.map(slug => `/category/${slug}/`),
  ...tools.map(tool => `/tools/${tool.slug}/`),
  ...COUNTRY_VAT_ROUTES,
  ...SALARY_LANDING_ROUTES,
  ...SALARY_COUNTRY_ROUTES,
];

export function renderRoute(path: string) {
  const queryClient = new QueryClient();
  return renderToStaticMarkup(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router ssrPath={path}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={AboutPage} />
            <Route path="/about/" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/contact/" component={ContactPage} />
            <Route path="/terms" component={TermsPage} />
            <Route path="/terms/" component={TermsPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/privacy/" component={PrivacyPage} />
            <Route path="/books" component={BooksPage} />
            <Route path="/books/" component={BooksPage} />
            <Route path="/uk-vat-calculator" component={() => <CountryVatPage countrySlug="uk-vat-calculator" />} />
            <Route path="/uk-vat-calculator/" component={() => <CountryVatPage countrySlug="uk-vat-calculator" />} />
            <Route path="/germany-vat-calculator" component={() => <CountryVatPage countrySlug="germany-vat-calculator" />} />
            <Route path="/germany-vat-calculator/" component={() => <CountryVatPage countrySlug="germany-vat-calculator" />} />
            <Route path="/france-vat-calculator" component={() => <CountryVatPage countrySlug="france-vat-calculator" />} />
            <Route path="/france-vat-calculator/" component={() => <CountryVatPage countrySlug="france-vat-calculator" />} />
            <Route path="/ireland-vat-calculator" component={() => <CountryVatPage countrySlug="ireland-vat-calculator" />} />
            <Route path="/ireland-vat-calculator/" component={() => <CountryVatPage countrySlug="ireland-vat-calculator" />} />
            <Route path="/uae-vat-calculator" component={() => <CountryVatPage countrySlug="uae-vat-calculator" />} />
            <Route path="/uae-vat-calculator/" component={() => <CountryVatPage countrySlug="uae-vat-calculator" />} />
            <Route path="/saudi-arabia-vat-calculator" component={() => <CountryVatPage countrySlug="saudi-arabia-vat-calculator" />} />
            <Route path="/saudi-arabia-vat-calculator/" component={() => <CountryVatPage countrySlug="saudi-arabia-vat-calculator" />} />
            {Object.values(SALARY_COUNTRY_PAGES).map(c => (
              <Route key={c.slug} path={c.canonicalPath} component={() => <SalaryCountryPage countrySlug={c.slug} />} />
            ))}
            <Route path="/monthly-salary-calculator" component={() => <SalaryLandingPage slug="monthly-salary-calculator" />} />
            <Route path="/monthly-salary-calculator/" component={() => <SalaryLandingPage slug="monthly-salary-calculator" />} />
            <Route path="/hourly-to-salary-calculator" component={() => <SalaryLandingPage slug="hourly-to-salary-calculator" />} />
            <Route path="/hourly-to-salary-calculator/" component={() => <SalaryLandingPage slug="hourly-to-salary-calculator" />} />
            <Route path="/annual-to-monthly-salary-calculator" component={() => <SalaryLandingPage slug="annual-to-monthly-salary-calculator" />} />
            <Route path="/annual-to-monthly-salary-calculator/" component={() => <SalaryLandingPage slug="annual-to-monthly-salary-calculator" />} />
            <Route path="/basic-salary-calculator" component={() => <SalaryLandingPage slug="basic-salary-calculator" />} />
            <Route path="/basic-salary-calculator/" component={() => <SalaryLandingPage slug="basic-salary-calculator" />} />
            <Route path="/net-salary-calculator" component={() => <SalaryLandingPage slug="net-salary-calculator" />} />
            <Route path="/net-salary-calculator/" component={() => <SalaryLandingPage slug="net-salary-calculator" />} />
            <Route path="/category/:category" component={CategoryPage} />
            <Route path="/category/:category/" component={CategoryPage} />
            <Route path="/tools/:tool" component={ToolPage} />
            <Route path="/tools/:tool/" component={ToolPage} />
            <Route path="/:tool" component={ToolPage} />
            <Route path="/:tool/" component={ToolPage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>,
  );
}
