/**
 * Tax Configuration & Social Contribution Rates
 *
 * IMPORTANT NOTE FOR SITE ADMINISTRATORS:
 * All progressive tax bands, statutory thresholds, social insurance contributions,
 * and standard deductions in this file are sourced from official government publications.
 * Please verify these rates annually on the official government revenue portals referenced
 * in each country's section below.
 *
 * Supported Countries:
 * 1. United Kingdom (HMRC) - Tax Year 2024/2025 (Last verified: October 2024)
 * 2. United States (IRS) - Tax Year 2024 (Last verified: October 2024)
 * 3. Canada (CRA) - Tax Year 2024 (Last verified: October 2024)
 * 4. Australia (ATO) - Tax Year 2024–2025 Stage 3 (Last verified: October 2024)
 * 5. Germany (BMF) - Tax Year 2024 (Last verified: October 2024)
 * 6. Poland (Ministerstwo Finansów) - Tax Year 2024 (Last verified: October 2024)
 * 7. Pakistan (FBR) - Tax Year 2024–2025 (Last verified: October 2024)
 * 8. India (Income Tax Dept) - AY 2025–2026 / FY 2024–2025 (Last verified: October 2024)
 * 9. Custom % (Any Country) - User-specified flat percentage
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
  | 'CUSTOM';

export interface TaxBracket {
  readonly threshold: number; // Upper limit of this band; Infinity for the top band
  readonly rate: number;      // Marginal percentage rate (e.g., 0.20 for 20%)
  readonly label?: string;
}

export interface CountryTaxConfig {
  readonly id: SupportedCountryCode;
  readonly countryName: string;
  readonly currencyCode: string;
  readonly currencySymbol: string;
  readonly taxYear: string;
  readonly lastVerified: string;
  readonly officialSourceUrl: string;
  readonly sourceAuthority: string;
  readonly incomeTaxName: string;
  readonly socialContributionName: string;
  readonly commonSalaries: readonly number[];
  readonly notes: string;
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
  readonly effectiveTaxRatePct: number;
  readonly effectiveSocialRatePct: number;
  readonly effectiveTotalDeductionRatePct: number;
  readonly countryConfig: CountryTaxConfig;
}

export const COUNTRIES_CONFIG: Record<SupportedCountryCode, CountryTaxConfig> = {
  UK: {
    id: 'UK',
    countryName: 'United Kingdom',
    currencyCode: 'GBP',
    currencySymbol: '£',
    taxYear: '2024/2025 (6 April 2024 – 5 April 2025)',
    lastVerified: 'October 2024',
    officialSourceUrl: 'https://www.gov.uk/income-tax-rates',
    sourceAuthority: 'HM Revenue & Customs (HMRC)',
    incomeTaxName: 'Income Tax (PAYE)',
    socialContributionName: 'National Insurance (Class 1)',
    commonSalaries: [25000, 35000, 45000, 60000, 80000, 120000],
    notes: 'Personal Allowance is £12,570. Tapers by £1 for every £2 earned above £100,000, reaching zero at £125,140. Employee National Insurance is 8% between £12,570 and £50,270, and 2% above £50,270 (reflecting Spring 2024 cut).',
  },
  US: {
    id: 'US',
    countryName: 'United States',
    currencyCode: 'USD',
    currencySymbol: '$',
    taxYear: '2024 Tax Year (Filed 2025)',
    lastVerified: 'October 2024',
    officialSourceUrl: 'https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024',
    sourceAuthority: 'Internal Revenue Service (IRS)',
    incomeTaxName: 'Federal Income Tax (Single Filer)',
    socialContributionName: 'FICA (Social Security & Medicare)',
    commonSalaries: [35000, 50000, 75000, 100000, 150000, 200000],
    notes: 'Single filer standard deduction is $14,600. Social Security is 6.2% up to $168,600 cap. Medicare is 1.45% plus 0.9% Additional Medicare Tax on earnings above $200,000. State and local income taxes vary by location and are excluded here for national federal baseline.',
  },
  CA: {
    id: 'CA',
    countryName: 'Canada',
    currencyCode: 'CAD',
    currencySymbol: '$',
    taxYear: '2024 Tax Year',
    lastVerified: 'October 2024',
    officialSourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html',
    sourceAuthority: 'Canada Revenue Agency (CRA)',
    incomeTaxName: 'Federal Income Tax',
    socialContributionName: 'CPP & Employment Insurance (EI)',
    commonSalaries: [45000, 65000, 85000, 110000, 140000, 180000],
    notes: 'Federal rates with Basic Personal Amount ($15,705 at 15% non-refundable credit). Canada Pension Plan (CPP) employee rate 5.95% on earnings between $3,500 and $68,500 (max $3,867.50) plus CPP2 4% between $68,500 and $73,200. EI employee rate 1.66% up to $63,200 (max $1,049.12). Provincial taxes vary by province.',
  },
  AU: {
    id: 'AU',
    countryName: 'Australia',
    currencyCode: 'AUD',
    currencySymbol: '$',
    taxYear: '2024–2025 (1 July 2024 – 30 June 2025)',
    lastVerified: 'October 2024',
    officialSourceUrl: 'https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents',
    sourceAuthority: 'Australian Taxation Office (ATO)',
    incomeTaxName: 'Resident Income Tax (Stage 3)',
    socialContributionName: 'Medicare Levy (2%)',
    commonSalaries: [45000, 65000, 90000, 120000, 160000, 200000],
    notes: 'Incorporates official Stage 3 Tax Cuts in effect 1 July 2024: $18,201-$45k at 16%, $45,001-$135k at 30%, $135,001-$190k at 37%, >$190k at 45%. Medicare Levy is 2% with low-income shade-in threshold ($0 below $26,000, phase-in up to $32,500). Superannuation (11.5% in 2024/25) is paid by employers on top of base salary and is not an employee deduction.',
  },
  DE: {
    id: 'DE',
    countryName: 'Germany',
    currencyCode: 'EUR',
    currencySymbol: '€',
    taxYear: '2024 Tax Year',
    lastVerified: 'October 2024',
    officialSourceUrl: 'https://www.bundesfinanzministerium.de',
    sourceAuthority: 'Bundesministerium der Finanzen (BMF)',
    incomeTaxName: 'Lohnsteuer (Steuerklasse I)',
    socialContributionName: 'Sozialversicherung (KV, RV, AV, PV)',
    commonSalaries: [30000, 45000, 55000, 75000, 95000, 120000],
    notes: 'Grundfreibetrag is €11,784 in 2024. Linear progressive formula zones apply up to 42% (over €66,760) and 45% (over €277,825). Employee social contributions: Pension (RV 9.3%, cap €90,600), Unemployment (AV 1.3%, cap €90,600), Statutory Health (KV 8.15% average with add-on, cap €62,100), and Long-term Care (PV 2.2% childless, cap €62,100). Solidarity surcharge exempt for standard incomes.',
  },
  PL: {
    id: 'PL',
    countryName: 'Poland',
    currencyCode: 'PLN',
    currencySymbol: 'zł',
    taxYear: '2024 Tax Year',
    lastVerified: 'October 2024',
    officialSourceUrl: 'https://www.podatki.gov.pl/pit/stawki-podatkowe/',
    sourceAuthority: 'Ministerstwo Finansów (podatki.gov.pl)',
    incomeTaxName: 'Podatek dochodowy (PIT)',
    socialContributionName: 'Składki ZUS (Emerytalna, Rentowa, Chorobowa, Zdrowotna)',
    commonSalaries: [60000, 80000, 100000, 140000, 180000, 240000],
    notes: 'Standard Umowa o pracę: ZUS social is 13.71% (pension 9.76%, disability 1.5% capped at 234,720 PLN; sickness 2.45% uncapped). Health contribution is 9% on gross minus ZUS social. Scale tax PIT: 12% on income up to 120,000 PLN minus 3,600 PLN tax credit (tax-free amount 30,000 PLN); 32% on excess above 120,000 PLN.',
  },
  PK: {
    id: 'PK',
    countryName: 'Pakistan',
    currencyCode: 'PKR',
    currencySymbol: '₨',
    taxYear: '2024–2025 (Finance Act 2024)',
    lastVerified: 'October 2024',
    officialSourceUrl: 'https://www.fbr.gov.pk',
    sourceAuthority: 'Federal Board of Revenue (FBR)',
    incomeTaxName: 'Income Tax (Salaried Individual)',
    socialContributionName: 'EOBI Employee Contribution',
    commonSalaries: [900000, 1500000, 2400000, 3600000, 4800000, 7200000],
    notes: 'Progressive slabs for salaried individuals: Nil up to PKR 600,000; 5% on 600k-1.2m; PKR 30k + 15% on 1.2m-2.2m; PKR 180k + 25% on 2.2m-3.2m; PKR 430k + 30% on 3.2m-4.1m; PKR 700k + 35% on >4.1m. Plus 10% surcharge on tax above PKR 10m. EOBI employee share is statutory 1% of minimum wage (PKR 370/month = PKR 4,440/year).',
  },
  IN: {
    id: 'IN',
    countryName: 'India',
    currencyCode: 'INR',
    currencySymbol: '₹',
    taxYear: 'FY 2024–2025 / AY 2025–2026 (New Tax Regime)',
    lastVerified: 'October 2024',
    officialSourceUrl: 'https://incometaxindia.gov.in',
    sourceAuthority: 'Income Tax Department (CBDT)',
    incomeTaxName: 'Income Tax (New Regime 115BAC)',
    socialContributionName: 'Employee Provident Fund (EPF)',
    commonSalaries: [600000, 900000, 1200000, 1500000, 2000000, 3000000],
    notes: 'Default New Tax Regime under Section 115BAC with enhanced standard deduction of ₹75,000 (Budget 2024): ₹0-3L 0%, ₹3-7L 5%, ₹7-10L 10%, ₹10-12L 15%, ₹12-15L 20%, >₹15L 30%. Full Section 87A rebate for taxable income up to ₹7,00,000. 4% Health & Education Cess on income tax. Standard employee statutory EPF is 12% capped at statutory basic ceiling (₹21,600/year).',
  },
  CUSTOM: {
    id: 'CUSTOM',
    countryName: 'Custom % (any country)',
    currencyCode: 'USD',
    currencySymbol: '$',
    taxYear: 'User-Configured Flat Rates',
    lastVerified: 'Current Session',
    officialSourceUrl: 'https://loveeasytool.com/tools/salary-calculator/',
    sourceAuthority: 'User Defined Percentage Model',
    incomeTaxName: 'Custom Income Tax %',
    socialContributionName: 'Custom Social / Pension %',
    commonSalaries: [30000, 50000, 75000, 100000, 150000, 200000],
    notes: 'Allows inputting any custom income tax deduction percentage and optional secondary deduction percentage (e.g. employee pension or healthcare contribution).',
  },
};

/**
 * Country-specific calculation functions.
 * All return annual tax and social amounts based on annual gross income.
 */

export function calculateUkTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  // UK HMRC: Personal Allowance tapering
  let personalAllowance = 12570;
  if (annualGross > 100000) {
    personalAllowance = Math.max(0, 12570 - (annualGross - 100000) / 2);
  }

  const taxableIncome = Math.max(0, annualGross - personalAllowance);
  let incomeTax = 0;

  if (taxableIncome > 0) {
    const basicBandLimit = 50270 - 12570; // £37,700
    const basicBand = Math.min(taxableIncome, basicBandLimit);
    incomeTax += basicBand * 0.20;

    if (taxableIncome > basicBandLimit) {
      const higherBandLimit = 125140 - 50270; // £74,870
      const higherBand = Math.min(taxableIncome - basicBandLimit, higherBandLimit);
      incomeTax += higherBand * 0.40;

      const additionalBandThreshold = 125140 - personalAllowance;
      if (taxableIncome > additionalBandThreshold) {
        const additionalBand = taxableIncome - additionalBandThreshold;
        incomeTax += additionalBand * 0.45;
      }
    }
  }

  // National Insurance Class 1 (Employee) 2024:
  // 8% between £12,570 and £50,270; 2% above £50,270
  let nationalInsurance = 0;
  if (annualGross > 12570) {
    const primaryThreshold = 12570;
    const upperEarningsLimit = 50270;
    const mainBand = Math.min(annualGross, upperEarningsLimit) - primaryThreshold;
    nationalInsurance += mainBand * 0.08;

    if (annualGross > upperEarningsLimit) {
      nationalInsurance += (annualGross - upperEarningsLimit) * 0.02;
    }
  }

  return { incomeTax, socialContribution: nationalInsurance };
}

export function calculateUsTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  // IRS Federal 2024 Single Filer: Standard deduction $14,600
  const standardDeduction = 14600;
  const taxableIncome = Math.max(0, annualGross - standardDeduction);

  const brackets: readonly TaxBracket[] = [
    { threshold: 11600, rate: 0.10 },
    { threshold: 47150, rate: 0.12 },
    { threshold: 100525, rate: 0.22 },
    { threshold: 191950, rate: 0.24 },
    { threshold: 243725, rate: 0.32 },
    { threshold: 609350, rate: 0.35 },
    { threshold: Infinity, rate: 0.37 },
  ];

  let incomeTax = 0;
  let previousThreshold = 0;
  for (const b of brackets) {
    if (taxableIncome > previousThreshold) {
      const taxableInBand = Math.min(taxableIncome, b.threshold) - previousThreshold;
      incomeTax += taxableInBand * b.rate;
      previousThreshold = b.threshold;
    } else {
      break;
    }
  }

  // FICA: Social Security 6.2% up to $168,600 wage base limit; Medicare 1.45% uncapped + 0.9% >$200,000
  const socialSecurityCap = 168600;
  const socialSecurity = Math.min(annualGross, socialSecurityCap) * 0.062;
  let medicare = annualGross * 0.0145;
  if (annualGross > 200000) {
    medicare += (annualGross - 200000) * 0.009;
  }
  const fica = socialSecurity + medicare;

  return { incomeTax, socialContribution: fica };
}

export function calculateCaTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  // Canada Federal 2024 Tax Brackets
  const brackets: readonly TaxBracket[] = [
    { threshold: 55867, rate: 0.15 },
    { threshold: 111733, rate: 0.205 },
    { threshold: 173205, rate: 0.26 },
    { threshold: 246752, rate: 0.29 },
    { threshold: Infinity, rate: 0.33 },
  ];

  let rawTax = 0;
  let previousThreshold = 0;
  for (const b of brackets) {
    if (annualGross > previousThreshold) {
      const chunk = Math.min(annualGross, b.threshold) - previousThreshold;
      rawTax += chunk * b.rate;
      previousThreshold = b.threshold;
    } else {
      break;
    }
  }

  // Basic personal amount credit (15% of $15,705 = $2,355.75)
  const bpaCredit = 15705 * 0.15;
  const incomeTax = Math.max(0, rawTax - bpaCredit);

  // CPP 2024: 5.95% on $3,500 to $68,500 (max $3,867.50) + CPP2 4% on $68,500 to $73,200 (max $188)
  let cpp = 0;
  if (annualGross > 3500) {
    cpp += Math.min(annualGross - 3500, 68500 - 3500) * 0.0595;
    if (annualGross > 68500) {
      cpp += Math.min(annualGross - 68500, 73200 - 68500) * 0.04;
    }
  }

  // EI 2024: 1.66% on up to $63,200 (max $1,049.12)
  const ei = Math.min(annualGross, 63200) * 0.0166;
  const socialContribution = cpp + ei;

  return { incomeTax, socialContribution };
}

export function calculateAuTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  // Australia Stage 3 Tax Cuts (2024-2025):
  // $0 - $18,200: Nil
  // $18,201 - $45,000: 16%
  // $45,001 - $135,000: 30%
  // $135,001 - $190,000: 37%
  // > $190,000: 45%
  let incomeTax = 0;
  if (annualGross > 18200) {
    incomeTax += (Math.min(annualGross, 45000) - 18200) * 0.16;
  }
  if (annualGross > 45000) {
    incomeTax += (Math.min(annualGross, 135000) - 45000) * 0.30;
  }
  if (annualGross > 135000) {
    incomeTax += (Math.min(annualGross, 190000) - 135000) * 0.37;
  }
  if (annualGross > 190000) {
    incomeTax += (annualGross - 190000) * 0.45;
  }

  // Medicare Levy 2%: Low-income threshold shade-in
  let medicare = 0;
  if (annualGross > 32500) {
    medicare = annualGross * 0.02;
  } else if (annualGross > 26000) {
    medicare = (annualGross - 26000) * 0.10;
  }

  return { incomeTax, socialContribution: medicare };
}

export function calculateDeTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  // Germany 2024 Einkommensteuer formula zones (Single / Klasse I):
  const zvE = Math.max(0, annualGross);
  let incomeTax = 0;

  if (zvE <= 11784) {
    incomeTax = 0;
  } else if (zvE <= 17005) {
    const y = (zvE - 11784) / 10000;
    incomeTax = (995.21 * y + 1400) * y;
  } else if (zvE <= 66760) {
    const z = (zvE - 17005) / 10000;
    incomeTax = (208.85 * z + 2397) * z + 1015.51;
  } else if (zvE <= 277825) {
    incomeTax = 0.42 * zvE - 10636.31;
  } else {
    incomeTax = 0.45 * zvE - 18971.06;
  }
  incomeTax = Math.max(0, Math.round(incomeTax));

  // Social contributions employee share 2024:
  // RV: 9.3%, cap €90,600
  const rv = Math.min(annualGross, 90600) * 0.093;
  // AV: 1.3%, cap €90,600
  const av = Math.min(annualGross, 90600) * 0.013;
  // KV: 8.15% (7.3% base + 0.85% avg add-on), cap €62,100
  const kv = Math.min(annualGross, 62100) * 0.0815;
  // PV: 2.2% (childless >23), cap €62,100
  const pv = Math.min(annualGross, 62100) * 0.022;
  const socialContribution = rv + av + kv + pv;

  return { incomeTax, socialContribution };
}

export function calculatePlTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  // Poland 2024 (Umowa o pracę):
  // ZUS social contributions: pension 9.76% (cap 234,720 PLN), disability 1.50% (cap 234,720 PLN), sickness 2.45% (no cap)
  const zusCap = 234720;
  const emerytalna = Math.min(annualGross, zusCap) * 0.0976;
  const rentowa = Math.min(annualGross, zusCap) * 0.0150;
  const chorobowa = annualGross * 0.0245;
  const zusSocial = emerytalna + rentowa + chorobowa;

  // Health insurance 9% on gross minus ZUS social
  const healthBase = Math.max(0, annualGross - zusSocial);
  const zdrowotna = healthBase * 0.09;

  // PIT: Tax base = gross - zusSocial - KUP (standard 3,000 PLN/yr)
  const kup = 3000;
  const taxBase = Math.max(0, annualGross - zusSocial - kup);
  let pit = 0;
  if (taxBase <= 120000) {
    pit = Math.max(0, taxBase * 0.12 - 3600);
  } else {
    pit = 10800 + (taxBase - 120000) * 0.32;
  }

  const socialContribution = zusSocial + zdrowotna;
  return { incomeTax: pit, socialContribution };
}

export function calculatePkTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  // Pakistan Finance Act 2024 (Salaried individuals):
  let incomeTax = 0;
  if (annualGross <= 600000) {
    incomeTax = 0;
  } else if (annualGross <= 1200000) {
    incomeTax = (annualGross - 600000) * 0.05;
  } else if (annualGross <= 2200000) {
    incomeTax = 30000 + (annualGross - 1200000) * 0.15;
  } else if (annualGross <= 3200000) {
    incomeTax = 180000 + (annualGross - 2200000) * 0.25;
  } else if (annualGross <= 4100000) {
    incomeTax = 430000 + (annualGross - 3200000) * 0.30;
  } else {
    incomeTax = 700000 + (annualGross - 4100000) * 0.35;
  }

  // 10% Surcharge if income exceeds PKR 10 million
  if (annualGross > 10000000) {
    incomeTax *= 1.10;
  }

  // EOBI statutory employee contribution: PKR 370/month = PKR 4,440/year
  const eobi = annualGross > 100000 ? 4440 : 0;
  return { incomeTax, socialContribution: eobi };
}

export function calculateInTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  // India FY 2024-2025 New Tax Regime (Section 115BAC):
  // Standard deduction ₹75,000
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, annualGross - standardDeduction);

  let rawTax = 0;
  if (taxableIncome <= 300000) {
    rawTax = 0;
  } else if (taxableIncome <= 700000) {
    rawTax = (taxableIncome - 300000) * 0.05;
  } else if (taxableIncome <= 1000000) {
    rawTax = 20000 + (taxableIncome - 700000) * 0.10;
  } else if (taxableIncome <= 1200000) {
    rawTax = 50000 + (taxableIncome - 1000000) * 0.15;
  } else if (taxableIncome <= 1500000) {
    rawTax = 80000 + (taxableIncome - 1200000) * 0.20;
  } else {
    rawTax = 140000 + (taxableIncome - 1500000) * 0.30;
  }

  // Section 87A rebate: Taxable income up to ₹7,00,000 has zero tax payable
  if (taxableIncome <= 700000) {
    rawTax = 0;
  }

  // 4% Health & Education Cess
  const incomeTax = rawTax * 1.04;

  // EPF statutory employee share: 12% capped at basic ceiling ₹21,600/year
  const epf = Math.min(annualGross * 0.12, 21600);
  return { incomeTax, socialContribution: epf };
}

/**
 * Universal Master Salary Calculator Engine
 */
export function calculateSalaryBreakdown({
  grossAmount,
  period,
  hoursPerWeek = 40,
  country = 'UK',
  customTaxPct = 20,
  customSocialPct = 5,
}: {
  grossAmount: number;
  period: 'Hourly' | 'Weekly' | 'Monthly' | 'Annual';
  hoursPerWeek?: number;
  country: SupportedCountryCode;
  customTaxPct?: number;
  customSocialPct?: number;
}): CalculationResult {
  const hpw = Math.max(1, Math.min(168, Number(hoursPerWeek) || 40));
  const validGross = Math.max(0, Number(grossAmount) || 0);

  // Normalize gross input to annual gross
  let grossAnnual = 0;
  if (period === 'Annual') {
    grossAnnual = validGross;
  } else if (period === 'Monthly') {
    grossAnnual = validGross * 12;
  } else if (period === 'Weekly') {
    grossAnnual = validGross * 52;
  } else if (period === 'Hourly') {
    grossAnnual = validGross * hpw * 52;
  }

  const countryConfig = COUNTRIES_CONFIG[country] || COUNTRIES_CONFIG.UK;

  let incomeTaxAnnual = 0;
  let socialContributionAnnual = 0;

  if (country === 'UK') {
    const res = calculateUkTaxes(grossAnnual);
    incomeTaxAnnual = res.incomeTax;
    socialContributionAnnual = res.socialContribution;
  } else if (country === 'US') {
    const res = calculateUsTaxes(grossAnnual);
    incomeTaxAnnual = res.incomeTax;
    socialContributionAnnual = res.socialContribution;
  } else if (country === 'CA') {
    const res = calculateCaTaxes(grossAnnual);
    incomeTaxAnnual = res.incomeTax;
    socialContributionAnnual = res.socialContribution;
  } else if (country === 'AU') {
    const res = calculateAuTaxes(grossAnnual);
    incomeTaxAnnual = res.incomeTax;
    socialContributionAnnual = res.socialContribution;
  } else if (country === 'DE') {
    const res = calculateDeTaxes(grossAnnual);
    incomeTaxAnnual = res.incomeTax;
    socialContributionAnnual = res.socialContribution;
  } else if (country === 'PL') {
    const res = calculatePlTaxes(grossAnnual);
    incomeTaxAnnual = res.incomeTax;
    socialContributionAnnual = res.socialContribution;
  } else if (country === 'PK') {
    const res = calculatePkTaxes(grossAnnual);
    incomeTaxAnnual = res.incomeTax;
    socialContributionAnnual = res.socialContribution;
  } else if (country === 'IN') {
    const res = calculateInTaxes(grossAnnual);
    incomeTaxAnnual = res.incomeTax;
    socialContributionAnnual = res.socialContribution;
  } else {
    // Custom flat percentage
    const taxRate = Math.max(0, Math.min(100, customTaxPct)) / 100;
    const socialRate = Math.max(0, Math.min(100, customSocialPct)) / 100;
    incomeTaxAnnual = grossAnnual * taxRate;
    socialContributionAnnual = grossAnnual * socialRate;
  }

  const totalDeductionsAnnual = incomeTaxAnnual + socialContributionAnnual;
  const netPayAnnual = Math.max(0, grossAnnual - totalDeductionsAnnual);

  // Timeframe conversions (52 weeks/year, 260 working days/year at 5 days/wk)
  const grossMonthly = grossAnnual / 12;
  const grossWeekly = grossAnnual / 52;
  const grossDaily = grossAnnual / (52 * 5);
  const grossHourly = grossAnnual / (52 * hpw);

  const incomeTaxMonthly = incomeTaxAnnual / 12;
  const incomeTaxWeekly = incomeTaxAnnual / 52;
  const incomeTaxDaily = incomeTaxAnnual / (52 * 5);
  const incomeTaxHourly = incomeTaxAnnual / (52 * hpw);

  const socialContributionMonthly = socialContributionAnnual / 12;
  const socialContributionWeekly = socialContributionAnnual / 52;
  const socialContributionDaily = socialContributionAnnual / (52 * 5);
  const socialContributionHourly = socialContributionAnnual / (52 * hpw);

  const totalDeductionsMonthly = totalDeductionsAnnual / 12;
  const totalDeductionsWeekly = totalDeductionsAnnual / 52;
  const totalDeductionsDaily = totalDeductionsAnnual / (52 * 5);
  const totalDeductionsHourly = totalDeductionsAnnual / (52 * hpw);

  const netPayMonthly = netPayAnnual / 12;
  const netPayWeekly = netPayAnnual / 52;
  const netPayDaily = netPayAnnual / (52 * 5);
  const netPayHourly = netPayAnnual / (52 * hpw);

  const effectiveTaxRatePct = grossAnnual > 0 ? (incomeTaxAnnual / grossAnnual) * 100 : 0;
  const effectiveSocialRatePct = grossAnnual > 0 ? (socialContributionAnnual / grossAnnual) * 100 : 0;
  const effectiveTotalDeductionRatePct = grossAnnual > 0 ? (totalDeductionsAnnual / grossAnnual) * 100 : 0;

  return {
    grossAnnual,
    grossMonthly,
    grossWeekly,
    grossDaily,
    grossHourly,
    incomeTaxAnnual,
    incomeTaxMonthly,
    incomeTaxWeekly,
    incomeTaxDaily,
    incomeTaxHourly,
    socialContributionAnnual,
    socialContributionMonthly,
    socialContributionWeekly,
    socialContributionDaily,
    socialContributionHourly,
    totalDeductionsAnnual,
    totalDeductionsMonthly,
    totalDeductionsWeekly,
    totalDeductionsDaily,
    totalDeductionsHourly,
    netPayAnnual,
    netPayMonthly,
    netPayWeekly,
    netPayDaily,
    netPayHourly,
    effectiveTaxRatePct,
    effectiveSocialRatePct,
    effectiveTotalDeductionRatePct,
    countryConfig,
  };
}
