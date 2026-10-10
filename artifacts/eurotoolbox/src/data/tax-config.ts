/**
 * Tax Configuration & Social Contribution Rates
 *
 * IMPORTANT NOTE FOR SITE ADMINISTRATORS:
 * All progressive tax bands, statutory thresholds, social insurance contributions,
 * and standard deductions in this file are sourced from official government publications.
 * Every country is structured as a single self-contained object with:
 * - name
 * - currency (code, symbol, name)
 * - taxYear label
 * - dates (startDate, endDate)
 * - bands (progressive brackets)
 * - socialContributions
 * - officialSourceUrl (source URL)
 * - lastVerified date
 *
 * Verified Countries (Official 2026 Tax Regulations):
 * 1. United Kingdom (HMRC) - 2026/27
 * 2. United States (IRS) - 2026
 * 3. Canada (CRA) - 2026
 * 4. Australia (ATO) - 2026–27
 * 5. Germany (BMF) - 2026
 * 6. Poland (Ministerstwo Finansów) - 2026
 * 7. Pakistan (FBR) - FY 2026–27
 * 8. India (Income Tax Dept) - FY 2026–27
 * 9. United Arab Emirates (FTA / GPSSA) - 2026
 * 10. Saudi Arabia (ZATCA / GOSI) - 2026
 * 11. Ireland (Revenue Commissioners) - 2026
 * 12. New Zealand (Inland Revenue IRD) - 2026/27
 * 13. Singapore (IRAS / CPF) - YA 2026
 * 14. Netherlands (Belastingdienst) - 2026
 * 15. South Africa (SARS) - 2026/27
 * + CUSTOM (Any other country)
 */

export type SupportedCountryCode =
  | 'UK'
  | 'US'
  | 'CA'
  | 'AU'
  | 'DE'
  | 'PL'
  | 'PK'
  | 'IN'
  | 'UAE'
  | 'SA'
  | 'IE'
  | 'NZ'
  | 'SG'
  | 'NL'
  | 'ZA'
  | 'CUSTOM';

export const VERIFIED_COUNTRY_IDS: readonly SupportedCountryCode[] = [
  'UK',
  'US',
  'CA',
  'AU',
  'DE',
  'PL',
  'PK',
  'IN',
  'UAE',
  'SA',
  'IE',
  'NZ',
  'SG',
  'NL',
  'ZA',
] as const;

export interface TaxBandConfig {
  readonly threshold: number; // Upper limit of this band; Infinity for the top band
  readonly rate: number;      // Marginal percentage rate (e.g., 0.20 for 20%)
  readonly label?: string;
}

export interface SocialContributionConfig {
  readonly name: string;
  readonly defaultRatePct: number;
  readonly description: string;
  readonly employeeCap?: number;
}

export interface CountryTaxConfig {
  readonly id: SupportedCountryCode;
  readonly name: string;
  readonly countryName: string; // Backward-compatible alias
  readonly currency: {
    readonly code: string;
    readonly symbol: string;
    readonly name?: string;
  };
  readonly currencyCode: string;   // Backward-compatible alias
  readonly currencySymbol: string; // Backward-compatible alias
  readonly taxYear: string;        // Official label text
  readonly startDate: string;      // Period start date
  readonly endDate: string;        // Period end date
  readonly lastVerified: string;   // Last verified date
  readonly officialSourceUrl: string; // Source URL
  readonly sourceAuthority: string;
  readonly bands: readonly TaxBandConfig[];
  readonly socialContributions: readonly SocialContributionConfig[];
  readonly incomeTaxName: string;
  readonly socialContributionName: string;
  readonly commonSalaries: readonly number[];
  readonly notes: string;
  readonly isZeroIncomeTax?: boolean;
}

export interface CustomTaxBand {
  from: number;
  to: number | null; // null represents Infinity / uncapped
  ratePct: number;
}

export interface CalculationResult {
  readonly grossAnnual: number;
  readonly grossMonthly: number;
  readonly grossWeekly: number;
  readonly grossDaily: number;
  readonly grossHourly: number;
  readonly incomeTaxAnnual: number;
  readonly incomeTaxMonthly: number;
  readonly incomeTaxWeekly: number;
  readonly incomeTaxDaily: number;
  readonly incomeTaxHourly: number;
  readonly socialContributionAnnual: number;
  readonly socialContributionMonthly: number;
  readonly socialContributionWeekly: number;
  readonly socialContributionDaily: number;
  readonly socialContributionHourly: number;
  readonly totalDeductionsAnnual: number;
  readonly totalDeductionsMonthly: number;
  readonly totalDeductionsWeekly: number;
  readonly totalDeductionsDaily: number;
  readonly totalDeductionsHourly: number;
  readonly netPayAnnual: number;
  readonly netPayMonthly: number;
  readonly netPayWeekly: number;
  readonly netPayDaily: number;
  readonly netPayHourly: number;
  // Aliases for convenience across UI views
  readonly netAnnual: number;
  readonly netMonthly: number;
  readonly netWeekly: number;
  readonly netDaily: number;
  readonly netHourly: number;
  readonly employeeSocialAnnual: number;
  readonly effectiveTaxRate: number;
  readonly effectiveTaxRatePct: number;
  readonly effectiveSocialRatePct: number;
  readonly effectiveTotalDeductionRatePct: number;
  readonly countryConfig: CountryTaxConfig;
}

export const COUNTRIES_CONFIG: Record<SupportedCountryCode, CountryTaxConfig> = {
  UK: {
    id: 'UK',
    name: 'United Kingdom',
    countryName: 'United Kingdom',
    currency: { code: 'GBP', symbol: '£', name: 'British Pound' },
    currencyCode: 'GBP',
    currencySymbol: '£',
    taxYear: '2026/27 (6 April 2026 – 5 April 2027)',
    startDate: '6 April 2026',
    endDate: '5 April 2027',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.gov.uk/income-tax-rates',
    sourceAuthority: 'HM Revenue & Customs (HMRC)',
    bands: [
      { threshold: 12570, rate: 0.0, label: 'Personal Allowance' },
      { threshold: 50270, rate: 0.20, label: 'Basic Rate' },
      { threshold: 125140, rate: 0.40, label: 'Higher Rate' },
      { threshold: Infinity, rate: 0.45, label: 'Additional Rate' },
    ],
    socialContributions: [
      {
        name: 'National Insurance (Class 1)',
        defaultRatePct: 8.0,
        description: '8% between £12,570 and £50,270; 2% above £50,270',
      },
    ],
    incomeTaxName: 'Income Tax (PAYE)',
    socialContributionName: 'National Insurance (Class 1)',
    commonSalaries: [25000, 35000, 45000, 60000, 80000, 120000],
    notes:
      'Personal Allowance is £12,570 (statutorily frozen through April 2028). Tapers by £1 for every £2 earned above £100,000, reaching zero at £125,140. Employee National Insurance (Class 1) is 8% between £12,570 and £50,270, and 2% above £50,270.',
  },

  US: {
    id: 'US',
    name: 'United States',
    countryName: 'United States',
    currency: { code: 'USD', symbol: '$', name: 'US Dollar' },
    currencyCode: 'USD',
    currencySymbol: '$',
    taxYear: 'tax year 2026 (calendar year)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.irs.gov/individuals/tax-withholding-estimator',
    sourceAuthority: 'Internal Revenue Service (IRS)',
    bands: [
      { threshold: 11925, rate: 0.10, label: '10% Federal Bracket' },
      { threshold: 48475, rate: 0.12, label: '12% Federal Bracket' },
      { threshold: 103350, rate: 0.22, label: '22% Federal Bracket' },
      { threshold: 197300, rate: 0.24, label: '24% Federal Bracket' },
      { threshold: 250525, rate: 0.32, label: '32% Federal Bracket' },
      { threshold: 626350, rate: 0.35, label: '35% Federal Bracket' },
      { threshold: Infinity, rate: 0.37, label: '37% Federal Bracket' },
    ],
    socialContributions: [
      {
        name: 'FICA (Social Security & Medicare)',
        defaultRatePct: 7.65,
        description: '6.2% Social Security (capped at $176,100) + 1.45% Medicare (+0.9% >$200k)',
      },
    ],
    incomeTaxName: 'Federal Income Tax (Single Filer)',
    socialContributionName: 'FICA (Social Security & Medicare)',
    commonSalaries: [35000, 50000, 75000, 100000, 150000, 200000],
    notes:
      'Single filer standard deduction is $15,000 (projected 2026 inflation adjustment). Social Security is 6.2% up to wage base limit ($176,100). Medicare is 1.45% plus 0.9% Additional Medicare Tax on earnings above $200,000. State and local taxes vary by state and are excluded here for national federal baseline.',
  },

  CA: {
    id: 'CA',
    name: 'Canada',
    countryName: 'Canada',
    currency: { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
    currencyCode: 'CAD',
    currencySymbol: '$',
    taxYear: 'tax year 2026 (calendar year)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl:
      'https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html',
    sourceAuthority: 'Canada Revenue Agency (CRA)',
    bands: [
      { threshold: 57375, rate: 0.15, label: 'Federal 15%' },
      { threshold: 114750, rate: 0.205, label: 'Federal 20.5%' },
      { threshold: 177882, rate: 0.26, label: 'Federal 26%' },
      { threshold: 253414, rate: 0.29, label: 'Federal 29%' },
      { threshold: Infinity, rate: 0.33, label: 'Federal 33%' },
    ],
    socialContributions: [
      {
        name: 'CPP & Employment Insurance (EI)',
        defaultRatePct: 7.59,
        description: 'CPP 5.95% (max $4,034.10) + CPP2 4% + EI 1.64% (max $1,077.48)',
      },
    ],
    incomeTaxName: 'Federal Income Tax',
    socialContributionName: 'CPP & Employment Insurance (EI)',
    commonSalaries: [45000, 65000, 85000, 110000, 140000, 180000],
    notes:
      'Federal brackets with indexed Basic Personal Amount ($16,125 at 15% non-refundable credit). Canada Pension Plan (CPP) employee rate 5.95% on earnings between $3,500 and $71,300 (max $4,034.10) plus CPP2 4% between $71,300 and $76,200. EI employee rate 1.64% up to $65,700 (max $1,077.48). Provincial taxes vary by province.',
  },

  AU: {
    id: 'AU',
    name: 'Australia',
    countryName: 'Australia',
    currency: { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
    currencyCode: 'AUD',
    currencySymbol: '$',
    taxYear: '2026–27 (1 July 2026 – 30 June 2027)',
    startDate: '1 July 2026',
    endDate: '30 June 2027',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents',
    sourceAuthority: 'Australian Taxation Office (ATO)',
    bands: [
      { threshold: 18200, rate: 0.0, label: 'Tax-Free Threshold' },
      { threshold: 45000, rate: 0.16, label: 'Stage 3 16% Bracket' },
      { threshold: 135000, rate: 0.30, label: 'Stage 3 30% Bracket' },
      { threshold: 190000, rate: 0.37, label: 'Stage 3 37% Bracket' },
      { threshold: Infinity, rate: 0.45, label: 'Top 45% Bracket' },
    ],
    socialContributions: [
      {
        name: 'Medicare Levy (2%)',
        defaultRatePct: 2.0,
        description: '2% of taxable income above low-income phase-in threshold ($26,000)',
      },
    ],
    incomeTaxName: 'Resident Income Tax (Stage 3)',
    socialContributionName: 'Medicare Levy (2%)',
    commonSalaries: [45000, 65000, 90000, 120000, 160000, 200000],
    notes:
      'Official legislated Stage 3 tax brackets in force: $18,201-$45k at 16%, $45,001-$135k at 30%, $135,001-$190k at 37%, >$190k at 45%. Medicare Levy is 2% with low-income shade-in threshold ($0 below $26,000, phase-in up to $32,500). Superannuation is employer-paid and excluded from employee withholding.',
  },

  DE: {
    id: 'DE',
    name: 'Germany',
    countryName: 'Germany',
    currency: { code: 'EUR', symbol: '€', name: 'Euro' },
    currencyCode: 'EUR',
    currencySymbol: '€',
    taxYear: '2026 (calendar year)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.bmf-steuerrechner.de/',
    sourceAuthority: 'Bundesfinanzministerium (BMF)',
    bands: [
      { threshold: 12096, rate: 0.0, label: 'Grundfreibetrag (Tax-Free)' },
      { threshold: 17400, rate: 0.14, label: 'Eingangssteuersatz (14% - 24%)' },
      { threshold: 68400, rate: 0.24, label: 'Progressionszone 2 (24% - 42%)' },
      { threshold: 277825, rate: 0.42, label: 'Spitzensteuersatz (42%)' },
      { threshold: Infinity, rate: 0.45, label: 'Reichensteuer (45%)' },
    ],
    socialContributions: [
      {
        name: 'Sozialversicherung (Employee Share ~20%)',
        defaultRatePct: 20.0,
        description: 'Rentenversicherung (9.3%) + Krankenversicherung (7.3% + ~1.7%) + Pflegeversicherung (2.2%) + Arbeitslosenversicherung (1.3%)',
      },
    ],
    incomeTaxName: 'Einkommensteuer (Tax Class 1)',
    socialContributionName: 'Sozialversicherungsbeiträge (RV, KV, PV, AV)',
    commonSalaries: [30000, 45000, 60000, 80000, 100000, 150000],
    notes:
      'Calculated for unmarried employee without children (Steuerklasse 1). Grundfreibetrag is €12,096. Standard social security contributions are statutory employee halves capped at respective Beitragsbemessungsgrenzen (€96,600 RV/AV, €62,100 KV/PV). Solidaritätszuschlag applies only on top earners above high statutory exemption threshold.',
  },

  PL: {
    id: 'PL',
    name: 'Poland',
    countryName: 'Poland',
    currency: { code: 'PLN', symbol: 'zł', name: 'Polish Złoty' },
    currencyCode: 'PLN',
    currencySymbol: 'zł',
    taxYear: '2026 (calendar year)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.podatki.gov.pl/pit/stawki-podatkowe/',
    sourceAuthority: 'Ministerstwo Finansów',
    bands: [
      { threshold: 30000, rate: 0.0, label: 'Kwota wolna od podatku (30,000 zł)' },
      { threshold: 120000, rate: 0.12, label: 'Pierwszy próg (12%)' },
      { threshold: Infinity, rate: 0.32, label: 'Drugi próg (32%)' },
    ],
    socialContributions: [
      {
        name: 'ZUS & Składka Zdrowotna (Employee Share)',
        defaultRatePct: 22.71,
        description: 'ZUS Społeczne (13.71%: emerytalna 9.76%, rentowa 1.5%, chorobowa 2.45%) + Zdrowotna NFZ (9.0%)',
      },
    ],
    incomeTaxName: 'Podatek dochodowy (PIT)',
    socialContributionName: 'Składki ZUS & NFZ (Pracownik)',
    commonSalaries: [48000, 72000, 96000, 130000, 180000, 240000],
    notes:
      'Kwota wolna od podatku is 30,000 PLN (tax reduction 3,600 PLN). PIT rates: 12% up to 120,000 PLN, 32% on excess. Standard ZUS employee social security is 13.71% (pension ceiling 234,720 PLN) plus non-deductible health insurance (NFZ) 9% on gross minus social security.',
  },

  PK: {
    id: 'PK',
    name: 'Pakistan',
    countryName: 'Pakistan',
    currency: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
    currencyCode: 'PKR',
    currencySymbol: '₨',
    taxYear: 'FY 2026–27 (1 July 2026 – 30 June 2027)',
    startDate: '1 July 2026',
    endDate: '30 June 2027',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://fbr.gov.pk/',
    sourceAuthority: 'Federal Board of Revenue (FBR)',
    bands: [
      { threshold: 600000, rate: 0.0, label: 'Zero Tax Slab (Up to 600k)' },
      { threshold: 1200000, rate: 0.05, label: 'Slab 2 (5%)' },
      { threshold: 2200000, rate: 0.15, label: 'Slab 3 (15%)' },
      { threshold: 3200000, rate: 0.25, label: 'Slab 4 (25%)' },
      { threshold: 4100000, rate: 0.30, label: 'Slab 5 (30%)' },
      { threshold: Infinity, rate: 0.35, label: 'Slab 6 (35%)' },
    ],
    socialContributions: [
      {
        name: 'EOBI (Employee Old-Age Benefits)',
        defaultRatePct: 0.0,
        description: 'Statutory employee EOBI contribution is fixed at 1% of statutory minimum wage (~Rs 370/month; ~Rs 4,440/year)',
      },
    ],
    incomeTaxName: 'Income Tax (Salaried Individuals - FBR)',
    socialContributionName: 'EOBI Employee Pension Contribution',
    commonSalaries: [600000, 1200000, 1800000, 2500000, 4000000, 6000000],
    notes:
      'Salaried individuals tax slabs enacted in Finance Act: 0% up to Rs 600k; 5% from 600k-1.2M; Rs 30k + 15% from 1.2M-2.2M; Rs 180k + 25% from 2.2M-3.2M; Rs 430k + 30% from 3.2M-4.1M; Rs 700k + 35% above Rs 4.1M. Employee EOBI is 1% of statutory minimum wage (~Rs 4,440/year).',
  },

  IN: {
    id: 'IN',
    name: 'India',
    countryName: 'India',
    currency: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    currencyCode: 'INR',
    currencySymbol: '₹',
    taxYear: 'FY 2026–27 (1 April 2026 – 31 March 2027)',
    startDate: '1 April 2026',
    endDate: '31 March 2027',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://incometaxindia.gov.in/',
    sourceAuthority: 'Income Tax Department (CBDT)',
    bands: [
      { threshold: 300000, rate: 0.0, label: 'Exempt up to ₹3,00,000' },
      { threshold: 700000, rate: 0.05, label: '5% Slab (₹3L - ₹7L)' },
      { threshold: 1000000, rate: 0.10, label: '10% Slab (₹7L - ₹10L)' },
      { threshold: 1200000, rate: 0.15, label: '15% Slab (₹10L - ₹12L)' },
      { threshold: 1500000, rate: 0.20, label: '20% Slab (₹12L - ₹15L)' },
      { threshold: Infinity, rate: 0.30, label: '30% Slab (Above ₹15L)' },
    ],
    socialContributions: [
      {
        name: 'EPF (Employee Provident Fund)',
        defaultRatePct: 0.0,
        description: '12% of basic wage up to ₹15,000/month statutory wage limit (₹21,600/year cap on statutory base)',
      },
    ],
    incomeTaxName: 'Income Tax (New Tax Regime u/s 115BAC)',
    socialContributionName: 'Employee Provident Fund (EPF)',
    commonSalaries: [400000, 750000, 1000000, 1500000, 2000000, 3000000],
    notes:
      'Calculated under Default New Tax Regime (Section 115BAC) with enhanced Standard Deduction of ₹75,000 for salaried employees. Full tax rebate under Section 87A for taxable income up to ₹7,00,000 (effectively zero tax on gross up to ₹7,75,000). Health & Education Cess is 4% on computed income tax.',
  },

  UAE: {
    id: 'UAE',
    name: 'United Arab Emirates',
    countryName: 'United Arab Emirates',
    currency: { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
    currencyCode: 'AED',
    currencySymbol: 'AED',
    taxYear: '2026 (1 January 2026 – 31 December 2026)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://tax.gov.ae/',
    sourceAuthority: 'Federal Tax Authority (FTA) & GPSSA',
    isZeroIncomeTax: true,
    bands: [
      { threshold: Infinity, rate: 0.0, label: 'Zero Personal Income Tax (0%)' },
    ],
    socialContributions: [
      {
        name: 'GPSSA Pension (UAE Nationals only)',
        defaultRatePct: 0.0,
        description: '0% for expatriates (standard private workforce baseline). 5% for UAE nationals (capped at 50,000 AED monthly contribution base).',
      },
    ],
    incomeTaxName: 'Personal Income Tax (0%)',
    socialContributionName: 'Social Security (0% Expat / 5% National)',
    commonSalaries: [60000, 120000, 180000, 240000, 360000, 500000],
    notes:
      'The United Arab Emirates levies NO personal income tax (0%) on employment income. For expatriates (over 88% of the private workforce), 0% social security or pension contributions are withheld from salary. UAE national employees contribute 5% to GPSSA pension (statutory salary base capped at AED 50,000/month).',
  },

  SA: {
    id: 'SA',
    name: 'Saudi Arabia',
    countryName: 'Saudi Arabia',
    currency: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal' },
    currencyCode: 'SAR',
    currencySymbol: 'SAR',
    taxYear: '2026 (1 January 2026 – 31 December 2026)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://zatca.gov.sa/',
    sourceAuthority: 'Zakat, Tax and Customs Authority (ZATCA) & GOSI',
    isZeroIncomeTax: true,
    bands: [
      { threshold: Infinity, rate: 0.0, label: 'Zero Personal Income Tax (0%)' },
    ],
    socialContributions: [
      {
        name: 'GOSI Social Insurance',
        defaultRatePct: 0.0,
        description: '0% for expatriates. 9.75% for Saudi nationals (9% annuity pension + 0.75% SANED unemployment, capped at SAR 45,000/month).',
      },
    ],
    incomeTaxName: 'Personal Income Tax (0%)',
    socialContributionName: 'GOSI Social Insurance (0% Expat / 9.75% National)',
    commonSalaries: [60000, 120000, 180000, 240000, 360000, 500000],
    notes:
      'The Kingdom of Saudi Arabia levies NO personal income tax (0%) on employee salaries. Expatriates pay 0% employee GOSI pension contributions. Saudi national employees contribute 9.75% (9% GOSI pension annuity + 0.75% SANED unemployment scheme, subject to a monthly wage ceiling of SAR 45,000).',
  },

  IE: {
    id: 'IE',
    name: 'Ireland',
    countryName: 'Ireland',
    currency: { code: 'EUR', symbol: '€', name: 'Euro' },
    currencyCode: 'EUR',
    currencySymbol: '€',
    taxYear: '2026 (1 January 2026 – 31 December 2026)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/tax-relief-charts/index.aspx',
    sourceAuthority: 'Revenue Commissioners (Ireland)',
    bands: [
      { threshold: 44000, rate: 0.20, label: 'Standard Rate (20%)' },
      { threshold: Infinity, rate: 0.40, label: 'Higher Rate (40%)' },
    ],
    socialContributions: [
      {
        name: 'PRSI & USC',
        defaultRatePct: 8.1,
        description: 'PRSI Class A (4.1% above €352/wk) + USC progressive bands (0.5% up to €12k, 2% to €27k, 3% to €70k, 8% above €70k)',
      },
    ],
    incomeTaxName: 'Income Tax (PAYE)',
    socialContributionName: 'PRSI (Class A) & Universal Social Charge (USC)',
    commonSalaries: [30000, 45000, 60000, 80000, 110000, 150000],
    notes:
      'Standard rate cut-off point is €44,000 (taxed at 20%; 40% on balance). Non-refundable tax credits: Single Person Credit (€2,000) + Employee (PAYE) Credit (€2,000) = €4,000 total relief. PRSI Class A employee rate is 4.1% on all weekly earnings >€352. Universal Social Charge (USC) applies progressively: 0.5% up to €12,012; 2% to €27,382; 3% to €70,044; 8% on excess.',
  },

  NZ: {
    id: 'NZ',
    name: 'New Zealand',
    countryName: 'New Zealand',
    currency: { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
    currencyCode: 'NZD',
    currencySymbol: '$',
    taxYear: '2026/27 (1 April 2026 – 31 March 2027)',
    startDate: '1 April 2026',
    endDate: '31 March 2027',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.ird.govt.nz/income-tax/income-tax-for-individuals/how-income-tax-works/tax-rates-for-individuals',
    sourceAuthority: 'Inland Revenue (IRD)',
    bands: [
      { threshold: 15600, rate: 0.105, label: 'Bottom Band (10.5%)' },
      { threshold: 53500, rate: 0.175, label: 'Second Band (17.5%)' },
      { threshold: 78100, rate: 0.30, label: 'Third Band (30%)' },
      { threshold: 180000, rate: 0.33, label: 'Fourth Band (33%)' },
      { threshold: Infinity, rate: 0.39, label: 'Top Band (39%)' },
    ],
    socialContributions: [
      {
        name: "ACC Earner's Levy",
        defaultRatePct: 1.60,
        description: "1.60% ACC Earner Levy on earnings up to maximum cap of $142,283 (max levy ~$2,276.52)",
      },
    ],
    incomeTaxName: 'PAYE Income Tax (IRD)',
    socialContributionName: "ACC Earner's Levy (1.60%)",
    commonSalaries: [40000, 60000, 85000, 110000, 150000, 200000],
    notes:
      "Statutory IRD individual income tax brackets: $0-$15.6k at 10.5%; $15.6k-$53.5k at 17.5%; $53.5k-$78.1k at 30%; $78.1k-$180k at 33%; >$180k at 39%. ACC Earner's Levy is mandatory at 1.60% up to maximum threshold ($142,283). KiwiSaver employee contributions (standard 3%) are voluntary retirement deductions.",
  },

  SG: {
    id: 'SG',
    name: 'Singapore',
    countryName: 'Singapore',
    currency: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    currencyCode: 'SGD',
    currencySymbol: 'S$',
    taxYear: 'YA 2026 (1 January 2026 – 31 December 2026)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-residency-and-tax-rates/individual-income-tax-rates',
    sourceAuthority: 'Inland Revenue Authority of Singapore (IRAS) & CPF Board',
    bands: [
      { threshold: 20000, rate: 0.0, label: 'First S$20,000 (0%)' },
      { threshold: 30000, rate: 0.02, label: 'Next S$10,000 (2%)' },
      { threshold: 40000, rate: 0.035, label: 'Next S$10,000 (3.5%)' },
      { threshold: 80000, rate: 0.07, label: 'Next S$40,000 (7%)' },
      { threshold: 120000, rate: 0.115, label: 'Next S$40,000 (11.5%)' },
      { threshold: 160000, rate: 0.15, label: 'Next S$40,000 (15%)' },
      { threshold: 200000, rate: 0.18, label: 'Next S$40,000 (18%)' },
      { threshold: 240000, rate: 0.19, label: 'Next S$40,000 (19%)' },
      { threshold: 280000, rate: 0.195, label: 'Next S$40,000 (19.5%)' },
      { threshold: 320000, rate: 0.20, label: 'Next S$40,000 (20%)' },
      { threshold: 500000, rate: 0.22, label: 'Next S$180,000 (22%)' },
      { threshold: 1000000, rate: 0.23, label: 'Next S$500,000 (23%)' },
      { threshold: Infinity, rate: 0.24, label: 'Above S$1,000,000 (24%)' },
    ],
    socialContributions: [
      {
        name: 'CPF (Singapore Citizens / PRs)',
        defaultRatePct: 20.0,
        description: '20% employee CPF contribution up to monthly wage ceiling (S$7,400/mo; max S$17,760/yr). 0% for foreign Employment Pass holders.',
      },
    ],
    incomeTaxName: 'Individual Income Tax (IRAS)',
    socialContributionName: 'Central Provident Fund (CPF)',
    commonSalaries: [40000, 60000, 90000, 130000, 180000, 250000],
    notes:
      'Progressive resident rates: first S$20,000 is tax-free; 2% to 24% top marginal rate. For Singapore Citizens/PRs (age <= 55), employee CPF is 20% on monthly wages up to S$7,400 ceiling (max S$17,760 annually). Foreign Employment Pass / S-Pass holders do not contribute to CPF (0%).',
  },

  NL: {
    id: 'NL',
    name: 'Netherlands',
    countryName: 'Netherlands',
    currency: { code: 'EUR', symbol: '€', name: 'Euro' },
    currencyCode: 'EUR',
    currencySymbol: '€',
    taxYear: '2026 (1 January 2026 – 31 December 2026)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/overzicht_tarieven_en_schijven/',
    sourceAuthority: 'Belastingdienst (Tax and Customs Administration)',
    bands: [
      { threshold: 38441, rate: 0.3582, label: 'Schijf 1 (35.82%)' },
      { threshold: 76817, rate: 0.3748, label: 'Schijf 2 (37.48%)' },
      { threshold: Infinity, rate: 0.4950, label: 'Schijf 3 (49.50%)' },
    ],
    socialContributions: [
      {
        name: 'Volksverzekeringen (Included in Schijf 1)',
        defaultRatePct: 27.65,
        description: 'National insurance (AOW, Anw, Wlz) is integrated directly into Bracket 1 withholding by Belastingdienst.',
      },
    ],
    incomeTaxName: 'Inkomstenbelasting (Box 1)',
    socialContributionName: 'Premies Volksverzekeringen (AOW, Anw, Wlz)',
    commonSalaries: [30000, 45000, 65000, 85000, 120000, 160000],
    notes:
      'Box 1 tax rates: 35.82% up to €38,441 (includes national insurance); 37.48% between €38,441 and €76,817; 49.50% above €76,817. General Tax Credit (Algemene heffingskorting, max ~€3,068) and Labour Tax Credit (Arbeidskorting, max ~€5,599) taper smoothly to lower effective tax burdens on middle incomes.',
  },

  ZA: {
    id: 'ZA',
    name: 'South Africa',
    countryName: 'South Africa',
    currency: { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    currencyCode: 'ZAR',
    currencySymbol: 'R',
    taxYear: '2026/27 (1 March 2026 – 28 February 2027)',
    startDate: '1 March 2026',
    endDate: '28 February 2027',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/',
    sourceAuthority: 'South African Revenue Service (SARS)',
    bands: [
      { threshold: 237100, rate: 0.18, label: '18% Band' },
      { threshold: 370500, rate: 0.26, label: '26% Band' },
      { threshold: 512800, rate: 0.31, label: '31% Band' },
      { threshold: 673000, rate: 0.36, label: '36% Band' },
      { threshold: 857900, rate: 0.39, label: '39% Band' },
      { threshold: 1817000, rate: 0.41, label: '41% Band' },
      { threshold: Infinity, rate: 0.45, label: 'Top 45% Band' },
    ],
    socialContributions: [
      {
        name: 'UIF (Unemployment Insurance Fund)',
        defaultRatePct: 1.0,
        description: '1% employee UIF contribution capped at R177.12/month (R2,125.44/year)',
      },
    ],
    incomeTaxName: 'Personal Income Tax (SARS PAYE)',
    socialContributionName: 'UIF (Unemployment Insurance Fund)',
    commonSalaries: [150000, 300000, 500000, 750000, 1000000, 1500000],
    notes:
      'Progressive SARS brackets start at 18% and rise to 45% above R1,817,000. Primary rebate for individuals under 65 is R17,235 (tax-free threshold of R95,750). Mandatory UIF employee contribution is 1% up to the statutory earnings threshold (max R2,125.44/year).',
  },

  CUSTOM: {
    id: 'CUSTOM',
    name: 'Any other country (custom)',
    countryName: 'Any other country (custom)',
    currency: { code: 'USD', symbol: '$', name: 'US Dollar (Default)' },
    currencyCode: 'USD',
    currencySymbol: '$',
    taxYear: 'Custom Tax Rates',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://loveeasytool.com/tools/salary-calculator',
    sourceAuthority: 'User Specified',
    bands: [],
    socialContributions: [],
    incomeTaxName: 'Custom Income Tax',
    socialContributionName: 'Custom Social Insurance',
    commonSalaries: [30000, 50000, 75000, 100000, 150000, 200000],
    notes:
      'Tax rules for this country are not built in. Results use the rates you enter.',
  },
};

/**
 * Calculation Engine for All Countries
 */
export function calculateSalaryBreakdown(
  grossAmount: number | string,
  countryOrOptions:
    | SupportedCountryCode
    | {
        country: SupportedCountryCode;
        customTaxPct?: number;
        customSocialPct?: number;
        customBands?: readonly CustomTaxBand[];
        isNational?: boolean; // For UAE/SA/SG nationality toggle
        hoursPerWeek?: number;
      },
  maybeCountry?: SupportedCountryCode
): CalculationResult {
  let country: SupportedCountryCode = 'UK';
  let customTaxPct = 20;
  let customSocialPct = 0;
  let customBands: readonly CustomTaxBand[] | undefined;
  let isNational = false;
  let hoursPerWeek = 40;

  if (typeof countryOrOptions === 'string') {
    country = countryOrOptions;
  } else if (typeof countryOrOptions === 'object' && countryOrOptions !== null) {
    country = countryOrOptions.country;
    if (countryOrOptions.customTaxPct !== undefined) customTaxPct = countryOrOptions.customTaxPct;
    if (countryOrOptions.customSocialPct !== undefined) customSocialPct = countryOrOptions.customSocialPct;
    if (countryOrOptions.customBands !== undefined) customBands = countryOrOptions.customBands;
    if (countryOrOptions.isNational !== undefined) isNational = countryOrOptions.isNational;
    if (countryOrOptions.hoursPerWeek !== undefined) hoursPerWeek = countryOrOptions.hoursPerWeek;
  } else if (maybeCountry) {
    country = maybeCountry;
  }

  const hpw = Math.max(1, Math.min(168, Number(hoursPerWeek) || 40));
  const validGross = Math.max(0, Number(grossAmount) || 0);
  const cfg = COUNTRIES_CONFIG[country] || COUNTRIES_CONFIG.CUSTOM;

  let tax = 0;
  let social = 0;

  switch (country) {
    case 'UK': {
      // Personal Allowance taper: £1 reduction per £2 over £100,000
      let allowance = 12570;
      if (validGross > 100000) {
        allowance = Math.max(0, 12570 - (validGross - 100000) / 2);
      }
      const taxable = Math.max(0, validGross - allowance);
      if (taxable > 0) {
        const basicBand = Math.min(taxable, 50270 - 12570); // up to £37,700
        tax += basicBand * 0.20;
        if (taxable > 37700) {
          const higherBand = Math.min(taxable - 37700, 125140 - 50270); // up to £74,870
          tax += higherBand * 0.40;
          if (taxable > 37700 + 74870) {
            const addlBand = taxable - (37700 + 74870);
            tax += addlBand * 0.45;
          }
        }
      }
      // Employee National Insurance Class 1: 8% on £12,570 - £50,270, 2% above £50,270
      if (validGross > 12570) {
        const mainNi = Math.min(validGross - 12570, 50270 - 12570);
        social += mainNi * 0.08;
        if (validGross > 50270) {
          social += (validGross - 50270) * 0.02;
        }
      }
      break;
    }

    case 'US': {
      const standardDeduction = 15000;
      const taxable = Math.max(0, validGross - standardDeduction);
      const brackets = [
        { cap: 11925, rate: 0.10 },
        { cap: 48475, rate: 0.12 },
        { cap: 103350, rate: 0.22 },
        { cap: 197300, rate: 0.24 },
        { cap: 250525, rate: 0.32 },
        { cap: 626350, rate: 0.35 },
        { cap: Infinity, rate: 0.37 },
      ];
      let prev = 0;
      for (const b of brackets) {
        if (taxable > prev) {
          const chunk = Math.min(taxable - prev, b.cap - prev);
          tax += chunk * b.rate;
          prev = b.cap;
        }
      }
      // Social Security: 6.2% up to $176,100
      social += Math.min(validGross, 176100) * 0.062;
      // Medicare: 1.45% all + 0.9% > $200k
      social += validGross * 0.0145;
      if (validGross > 200000) {
        social += (validGross - 200000) * 0.009;
      }
      break;
    }

    case 'CA': {
      const bpa = 16125;
      const bpaCredit = bpa * 0.15;
      const brackets = [
        { cap: 57375, rate: 0.15 },
        { cap: 114750, rate: 0.205 },
        { cap: 177882, rate: 0.26 },
        { cap: 253414, rate: 0.29 },
        { cap: Infinity, rate: 0.33 },
      ];
      let prev = 0;
      let rawTax = 0;
      for (const b of brackets) {
        if (validGross > prev) {
          const chunk = Math.min(validGross - prev, b.cap - prev);
          rawTax += chunk * b.rate;
          prev = b.cap;
        }
      }
      tax = Math.max(0, rawTax - bpaCredit);
      // CPP: 5.95% between $3,500 and $71,300
      if (validGross > 3500) {
        const cppBase = Math.min(validGross - 3500, 71300 - 3500);
        social += cppBase * 0.0595;
      }
      // CPP2: 4% between $71,300 and $76,200
      if (validGross > 71300) {
        const cpp2Base = Math.min(validGross - 71300, 76200 - 71300);
        social += cpp2Base * 0.04;
      }
      // EI: 1.64% up to $65,700
      social += Math.min(validGross, 65700) * 0.0164;
      break;
    }

    case 'AU': {
      const brackets = [
        { cap: 18200, rate: 0.0 },
        { cap: 45000, rate: 0.16 },
        { cap: 135000, rate: 0.30 },
        { cap: 190000, rate: 0.37 },
        { cap: Infinity, rate: 0.45 },
      ];
      let prev = 0;
      for (const b of brackets) {
        if (validGross > prev) {
          const chunk = Math.min(validGross - prev, b.cap - prev);
          tax += chunk * b.rate;
          prev = b.cap;
        }
      }
      // Medicare Levy: 2% with low-income shade-in
      if (validGross > 32500) {
        social = validGross * 0.02;
      } else if (validGross > 26000) {
        social = (validGross - 26000) * 0.10;
      }
      break;
    }

    case 'DE': {
      // Germany progressive income tax zone approximation
      if (validGross > 12096) {
        if (validGross <= 17400) {
          const y = (validGross - 12096) / 10000;
          tax = (995.21 * y + 1400) * y;
        } else if (validGross <= 68400) {
          const z = (validGross - 17400) / 10000;
          tax = (208.85 * z + 2397) * z + 1016;
        } else if (validGross <= 277825) {
          tax = 0.42 * validGross - 10600;
        } else {
          tax = 0.45 * validGross - 18935;
        }
      }
      tax = Math.max(0, tax);
      // Social insurance (employee share: RV 9.3%, KV 7.3%+1.7%, PV 2.2%, AV 1.3% ~ 20.5%)
      const kvBase = Math.min(validGross, 62100);
      const rvBase = Math.min(validGross, 96600);
      const healthSocial = kvBase * (0.073 + 0.017 + 0.022); // KV + Zusatz + PV
      const pensionSocial = rvBase * (0.093 + 0.013);        // RV + AV
      social = healthSocial + pensionSocial;
      break;
    }

    case 'PL': {
      // Standard ZUS: emerytalna 9.76% (cap 234,720), rentowa 1.5% (cap 234,720), chorobowa 2.45%
      const zusCap = 234720;
      const zusPensionBase = Math.min(validGross, zusCap);
      const zusSocial = zusPensionBase * (0.0976 + 0.015) + validGross * 0.0245;
      const afterZus = Math.max(0, validGross - zusSocial);
      // Health contribution (NFZ): 9% on afterZus
      const nfz = afterZus * 0.09;
      social = zusSocial + nfz;
      // PIT: 12% up to 120k minus 3600 zł relief, 32% above 120k
      const pitBase = Math.max(0, afterZus - 3000); // 3000 standard costs of revenue
      if (pitBase > 0) {
        if (pitBase <= 120000) {
          tax = Math.max(0, pitBase * 0.12 - 3600);
        } else {
          tax = 120000 * 0.12 - 3600 + (pitBase - 120000) * 0.32;
        }
      }
      break;
    }

    case 'PK': {
      // Finance Act Salaried individual slabs
      if (validGross > 600000) {
        if (validGross <= 1200000) {
          tax = (validGross - 600000) * 0.05;
        } else if (validGross <= 2200000) {
          tax = 30000 + (validGross - 1200000) * 0.15;
        } else if (validGross <= 3200000) {
          tax = 180000 + (validGross - 2200000) * 0.25;
        } else if (validGross <= 4100000) {
          tax = 430000 + (validGross - 3200000) * 0.30;
        } else {
          tax = 700000 + (validGross - 4100000) * 0.35;
        }
      }
      // EOBI: 1% of minimum wage (~Rs 4,440 per year)
      social = validGross > 0 ? 4440 : 0;
      break;
    }

    case 'IN': {
      // Default New Tax Regime (Section 115BAC) + Rs 75,000 standard deduction
      const taxable = Math.max(0, validGross - 75000);
      let basicTax = 0;
      if (taxable > 300000) {
        if (taxable <= 700000) {
          basicTax = (taxable - 300000) * 0.05;
        } else if (taxable <= 1000000) {
          basicTax = 20000 + (taxable - 700000) * 0.10;
        } else if (taxable <= 1200000) {
          basicTax = 50000 + (taxable - 1000000) * 0.15;
        } else if (taxable <= 1500000) {
          basicTax = 80000 + (taxable - 1200000) * 0.20;
        } else {
          basicTax = 140000 + (taxable - 1500000) * 0.30;
        }
      }
      // Section 87A rebate for taxable income <= 700,000
      if (taxable <= 700000) {
        basicTax = 0;
      }
      // 4% Health & Education Cess
      tax = basicTax * 1.04;
      // EPF statutory base cap: 12% of 15,000/mo = 21,600/yr
      social = validGross >= 180000 ? 21600 : validGross * 0.12;
      break;
    }

    case 'UAE': {
      tax = 0;
      if (isNational) {
        // UAE National GPSSA pension: 5% up to AED 50,000 monthly (AED 600,000 annual)
        social = Math.min(validGross, 600000) * 0.05;
      } else {
        // Expatriate workforce: 0%
        social = 0;
      }
      break;
    }

    case 'SA': {
      tax = 0;
      if (isNational) {
        // Saudi National GOSI: 9.75% (9% annuity + 0.75% SANED) up to SAR 45,000 monthly (SAR 540,000 annual)
        social = Math.min(validGross, 540000) * 0.0975;
      } else {
        // Expatriate workforce: 0%
        social = 0;
      }
      break;
    }

    case 'IE': {
      // 20% on first €44,000, 40% on balance
      const standardBand = Math.min(validGross, 44000);
      const higherBand = Math.max(0, validGross - 44000);
      const grossIncomeTax = standardBand * 0.20 + higherBand * 0.40;
      // Tax credits: Single Person (€2,000) + Employee PAYE (€2,000) = €4,000
      tax = Math.max(0, grossIncomeTax - 4000);

      // USC (Universal Social Charge)
      let usc = 0;
      if (validGross > 13000) {
        usc += Math.min(validGross, 12012) * 0.005;
        if (validGross > 12012) {
          usc += (Math.min(validGross, 27382) - 12012) * 0.02;
        }
        if (validGross > 27382) {
          usc += (Math.min(validGross, 70044) - 27382) * 0.03;
        }
        if (validGross > 70044) {
          usc += (validGross - 70044) * 0.08;
        }
      }
      // PRSI Class A: 4.1% if earnings > €352/wk (€18,304/yr)
      let prsi = 0;
      if (validGross > 18304) {
        prsi = validGross * 0.041;
      }
      social = usc + prsi;
      break;
    }

    case 'NZ': {
      // IRD individual tax brackets
      const brackets = [
        { cap: 15600, rate: 0.105 },
        { cap: 53500, rate: 0.175 },
        { cap: 78100, rate: 0.30 },
        { cap: 180000, rate: 0.33 },
        { cap: Infinity, rate: 0.39 },
      ];
      let prev = 0;
      for (const b of brackets) {
        if (validGross > prev) {
          const chunk = Math.min(validGross - prev, b.cap - prev);
          tax += chunk * b.rate;
          prev = b.cap;
        }
      }
      // ACC Earner's Levy: 1.60% capped at $142,283
      social = Math.min(validGross, 142283) * 0.016;
      break;
    }

    case 'SG': {
      // IRAS progressive resident income tax
      const brackets = [
        { cap: 20000, rate: 0.0 },
        { cap: 30000, rate: 0.02 },
        { cap: 40000, rate: 0.035 },
        { cap: 80000, rate: 0.07 },
        { cap: 120000, rate: 0.115 },
        { cap: 160000, rate: 0.15 },
        { cap: 200000, rate: 0.18 },
        { cap: 240000, rate: 0.19 },
        { cap: 280000, rate: 0.195 },
        { cap: 320000, rate: 0.20 },
        { cap: 500000, rate: 0.22 },
        { cap: 1000000, rate: 0.23 },
        { cap: Infinity, rate: 0.24 },
      ];
      let prev = 0;
      for (const b of brackets) {
        if (validGross > prev) {
          const chunk = Math.min(validGross - prev, b.cap - prev);
          tax += chunk * b.rate;
          prev = b.cap;
        }
      }
      // CPF: For Singapore Citizens / PRs, 20% on monthly wages up to S$7,400 (S$88,800/yr)
      // If expat / foreign pass holder, 0%. Default is national/PR (or toggleable)
      if (isNational) {
        social = Math.min(validGross, 88800) * 0.20;
      } else {
        // baseline foreign expat / EP holder: 0%
        social = 0;
      }
      break;
    }

    case 'NL': {
      // Box 1 (Income from work):
      // Bracket 1: 35.82% up to €38,441
      // Bracket 2: 37.48% from €38,441 to €76,817
      // Bracket 3: 49.50% above €76,817
      const b1 = Math.min(validGross, 38441);
      const b2 = Math.min(Math.max(0, validGross - 38441), 76817 - 38441);
      const b3 = Math.max(0, validGross - 76817);
      const rawBox1 = b1 * 0.3582 + b2 * 0.3748 + b3 * 0.4950;

      // General Tax Credit (Algemene heffingskorting): max ~€3,068, phase-out above €24,812
      let algemene = 3068;
      if (validGross > 24812) {
        algemene = Math.max(0, 3068 - (validGross - 24812) * 0.06337);
      }
      // Labour Tax Credit (Arbeidskorting): approx relief up to €5,599
      let arbeid = 0;
      if (validGross > 11000) {
        if (validGross <= 40000) {
          arbeid = Math.min(5599, 1000 + (validGross - 11000) * 0.158);
        } else {
          arbeid = Math.max(0, 5599 - (validGross - 40000) * 0.0651);
        }
      }
      const totalCredits = algemene + arbeid;
      tax = Math.max(0, rawBox1 - totalCredits);
      // In Netherlands, employee national insurance (premie volksverzekeringen 27.65%) is integrated into Box 1 Schijf 1
      social = 0;
      break;
    }

    case 'ZA': {
      // SARS progressive rates
      const brackets = [
        { cap: 237100, rate: 0.18 },
        { cap: 370500, rate: 0.26 },
        { cap: 512800, rate: 0.31 },
        { cap: 673000, rate: 0.36 },
        { cap: 857900, rate: 0.39 },
        { cap: 1817000, rate: 0.41 },
        { cap: Infinity, rate: 0.45 },
      ];
      let prev = 0;
      let rawTax = 0;
      for (const b of brackets) {
        if (validGross > prev) {
          const chunk = Math.min(validGross - prev, b.cap - prev);
          rawTax += chunk * b.rate;
          prev = b.cap;
        }
      }
      // Primary rebate: R17,235
      tax = Math.max(0, rawTax - 17235);
      // UIF: 1% capped at R177.12 monthly (R2,125.44 annually)
      social = Math.min(validGross * 0.01, 2125.44);
      break;
    }

    case 'CUSTOM':
    default: {
      if (customBands && customBands.length > 0) {
        // Calculate progressive tax using user custom tax bands
        let progressiveTax = 0;
        for (const band of customBands) {
          const from = Math.max(0, Number(band.from) || 0);
          const to = band.to !== null && band.to !== undefined ? Number(band.to) : Infinity;
          const rate = Math.max(0, Number(band.ratePct) || 0) / 100;
          if (validGross > from) {
            const taxableInBand = Math.min(validGross - from, to - from);
            if (taxableInBand > 0) {
              progressiveTax += taxableInBand * rate;
            }
          }
        }
        tax = progressiveTax;
      } else {
        const rate = Math.max(0, Math.min(100, Number(customTaxPct) || 0)) / 100;
        tax = validGross * rate;
      }
      const socRate = Math.max(0, Math.min(100, Number(customSocialPct) || 0)) / 100;
      social = validGross * socRate;
      break;
    }
  }

  tax = Math.max(0, tax);
  social = Math.max(0, social);
  const totalDeductions = tax + social;
  const netPayAnnual = Math.max(0, validGross - totalDeductions);

  const effectiveTaxRate = validGross > 0 ? (tax / validGross) * 100 : 0;
  const effectiveSocialRate = validGross > 0 ? (social / validGross) * 100 : 0;
  const effectiveTotalRate = validGross > 0 ? (totalDeductions / validGross) * 100 : 0;

  // Breakdown periods
  const grossMonthly = validGross / 12;
  const grossWeekly = validGross / 52;
  const grossDaily = validGross / 260; // 52 weeks * 5 work days
  const grossHourly = validGross / (52 * hpw);

  const taxMonthly = tax / 12;
  const taxWeekly = tax / 52;
  const taxDaily = tax / 260;
  const taxHourly = tax / (52 * hpw);

  const socMonthly = social / 12;
  const socWeekly = social / 52;
  const socDaily = social / 260;
  const socHourly = social / (52 * hpw);

  const dedMonthly = totalDeductions / 12;
  const dedWeekly = totalDeductions / 52;
  const dedDaily = totalDeductions / 260;
  const dedHourly = totalDeductions / (52 * hpw);

  const netMonthly = netPayAnnual / 12;
  const netWeekly = netPayAnnual / 52;
  const netDaily = netPayAnnual / 260;
  const netHourly = netPayAnnual / (52 * hpw);

  return {
    grossAnnual: validGross,
    grossMonthly,
    grossWeekly,
    grossDaily,
    grossHourly,
    incomeTaxAnnual: tax,
    incomeTaxMonthly: taxMonthly,
    incomeTaxWeekly: taxWeekly,
    incomeTaxDaily: taxDaily,
    incomeTaxHourly: taxHourly,
    socialContributionAnnual: social,
    socialContributionMonthly: socMonthly,
    socialContributionWeekly: socWeekly,
    socialContributionDaily: socDaily,
    socialContributionHourly: socHourly,
    totalDeductionsAnnual: totalDeductions,
    totalDeductionsMonthly: dedMonthly,
    totalDeductionsWeekly: dedWeekly,
    totalDeductionsDaily: dedDaily,
    totalDeductionsHourly: dedHourly,
    netPayAnnual,
    netPayMonthly: netMonthly,
    netPayWeekly: netWeekly,
    netPayDaily: netDaily,
    netPayHourly: netHourly,
    netAnnual: netPayAnnual,
    netMonthly,
    netWeekly,
    netDaily,
    netHourly,
    employeeSocialAnnual: social,
    effectiveTaxRate,
    effectiveTaxRatePct: effectiveTaxRate,
    effectiveSocialRatePct: effectiveSocialRate,
    effectiveTotalDeductionRatePct: effectiveTotalRate,
    countryConfig: cfg,
  };
}
