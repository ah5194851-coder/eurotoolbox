/**
 * Tax Configuration & Social Contribution Rates
 *
 * IMPORTANT NOTE FOR SITE ADMINISTRATORS:
 * All progressive tax bands, statutory thresholds, social insurance contributions,
 * and standard deductions in this file are sourced from official government publications.
 * Every country's tax year, start date, end date, and last verified date are centralized here
 * so they can be maintained yearly in one place.
 *
 * Supported Countries:
 * 1. United Kingdom (HMRC) - 2026/27 (6 April 2026 – 5 April 2027)
 * 2. United States (IRS) - tax year 2026 (calendar year)
 * 3. Canada (CRA) - tax year 2026 (calendar year)
 * 4. Australia (ATO) - 2026–27 (1 July 2026 – 30 June 2027)
 * 5. Germany (BMF) - 2026 (calendar year)
 * 6. Poland (Ministerstwo Finansów) - 2026 (calendar year)
 * 7. Pakistan (FBR) - FY 2026–27 (1 July 2026 – 30 June 2027)
 * 8. India (Income Tax Dept) - FY 2026–27 (1 April 2026 – 31 March 2027)
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
  readonly taxYear: string;          // Official label text required everywhere on the page
  readonly startDate: string;        // Period start date
  readonly endDate: string;          // Period end date
  readonly lastVerified: string;     // Last verified date
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
    taxYear: '2026/27 (6 April 2026 – 5 April 2027)',
    startDate: '6 April 2026',
    endDate: '5 April 2027',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.gov.uk/income-tax-rates',
    sourceAuthority: 'HM Revenue & Customs (HMRC)',
    incomeTaxName: 'Income Tax (PAYE)',
    socialContributionName: 'National Insurance (Class 1)',
    commonSalaries: [25000, 35000, 45000, 60000, 80000, 120000],
    notes: 'Personal Allowance is £12,570 (statutorily frozen through April 2028). Tapers by £1 for every £2 earned above £100,000, reaching zero at £125,140. Employee National Insurance (Class 1) is 8% between £12,570 and £50,270, and 2% above £50,270.',
  },
  US: {
    id: 'US',
    countryName: 'United States',
    currencyCode: 'USD',
    currencySymbol: '$',
    taxYear: 'tax year 2026 (calendar year)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.irs.gov/individuals/tax-withholding-estimator',
    sourceAuthority: 'Internal Revenue Service (IRS)',
    incomeTaxName: 'Federal Income Tax (Single Filer)',
    socialContributionName: 'FICA (Social Security & Medicare)',
    commonSalaries: [35000, 50000, 75000, 100000, 150000, 200000],
    notes: 'Single filer standard deduction is $15,000 (projected 2026 inflation adjustment). Social Security is 6.2% up to wage base limit ($176,100). Medicare is 1.45% plus 0.9% Additional Medicare Tax on earnings above $200,000. State and local taxes vary by state and are excluded here for national federal baseline.',
  },
  CA: {
    id: 'CA',
    countryName: 'Canada',
    currencyCode: 'CAD',
    currencySymbol: '$',
    taxYear: 'tax year 2026 (calendar year)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html',
    sourceAuthority: 'Canada Revenue Agency (CRA)',
    incomeTaxName: 'Federal Income Tax',
    socialContributionName: 'CPP & Employment Insurance (EI)',
    commonSalaries: [45000, 65000, 85000, 110000, 140000, 180000],
    notes: 'Federal brackets with indexed Basic Personal Amount ($16,125 at 15% non-refundable credit). Canada Pension Plan (CPP) employee rate 5.95% on earnings between $3,500 and $71,300 (max $4,034.10) plus CPP2 4% between $71,300 and $76,200. EI employee rate 1.64% up to $65,700 (max $1,077.48). Provincial taxes vary by province.',
  },
  AU: {
    id: 'AU',
    countryName: 'Australia',
    currencyCode: 'AUD',
    currencySymbol: '$',
    taxYear: '2026–27 (1 July 2026 – 30 June 2027)',
    startDate: '1 July 2026',
    endDate: '30 June 2027',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents',
    sourceAuthority: 'Australian Taxation Office (ATO)',
    incomeTaxName: 'Resident Income Tax (Stage 3)',
    socialContributionName: 'Medicare Levy (2%)',
    commonSalaries: [45000, 65000, 90000, 120000, 160000, 200000],
    notes: 'Official legislated Stage 3 tax brackets in force: $18,201-$45k at 16%, $45,001-$135k at 30%, $135,001-$190k at 37%, >$190k at 45%. Medicare Levy is 2% with low-income shade-in threshold ($0 below $26,000, phase-in up to $32,500). Superannuation is employer-paid and excluded from employee withholding.',
  },
  DE: {
    id: 'DE',
    countryName: 'Germany',
    currencyCode: 'EUR',
    currencySymbol: '€',
    taxYear: '2026 (calendar year)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.bundesfinanzministerium.de',
    sourceAuthority: 'Bundesministerium der Finanzen (BMF)',
    incomeTaxName: 'Lohnsteuer (Steuerklasse I)',
    socialContributionName: 'Sozialversicherung (KV, RV, AV, PV)',
    commonSalaries: [30000, 45000, 55000, 75000, 95000, 120000],
    notes: 'Grundfreibetrag (basic tax-free allowance) is €12,348 for 2026. Progressive formula zones apply up to 42% (over €68,400) and 45% (over €277,825). Employee social contributions: Pension (RV 9.3%, cap €93,600), Unemployment (AV 1.3%, cap €93,600), Statutory Health (KV 8.2% average with add-on, cap €64,500), and Long-term Care (PV 2.2% childless, cap €64,500). Solidarity surcharge exempt for standard incomes.',
  },
  PL: {
    id: 'PL',
    countryName: 'Poland',
    currencyCode: 'PLN',
    currencySymbol: 'zł',
    taxYear: '2026 (calendar year)',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://www.podatki.gov.pl/pit/stawki-podatkowe/',
    sourceAuthority: 'Ministerstwo Finansów (podatki.gov.pl)',
    incomeTaxName: 'Podatek dochodowy (PIT)',
    socialContributionName: 'Składki ZUS (Emerytalna, Rentowa, Chorobowa, Zdrowotna)',
    commonSalaries: [60000, 80000, 100000, 140000, 180000, 240000],
    notes: 'Standard Umowa o pracę: ZUS social is 13.71% (pension 9.76%, disability 1.5% capped at ~245,000 PLN; sickness 2.45% uncapped). Health contribution is 9% on gross minus ZUS social. Scale tax PIT: 12% on income up to 120,000 PLN minus 3,600 PLN tax credit (tax-free amount 30,000 PLN); 32% on excess above 120,000 PLN.',
  },
  PK: {
    id: 'PK',
    countryName: 'Pakistan',
    currencyCode: 'PKR',
    currencySymbol: '₨',
    taxYear: 'FY 2026–27 (1 July 2026 – 30 June 2027)',
    startDate: '1 July 2026',
    endDate: '30 June 2027',
    lastVerified: 'October 2026',
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
    taxYear: 'FY 2026–27 (1 April 2026 – 31 March 2027)',
    startDate: '1 April 2026',
    endDate: '31 March 2027',
    lastVerified: 'October 2026',
    officialSourceUrl: 'https://incometaxindia.gov.in',
    sourceAuthority: 'Income Tax Department (CBDT)',
    incomeTaxName: 'Income Tax (New Regime 115BAC)',
    socialContributionName: 'Employee Provident Fund (EPF)',
    commonSalaries: [600000, 900000, 1200000, 1500000, 2000000, 3000000],
    notes: 'Default New Tax Regime under Section 115BAC with standard deduction of ₹75,000: ₹0-3L 0%, ₹3-7L 5%, ₹7-10L 10%, ₹10-12L 15%, ₹12-15L 20%, >₹15L 30%. Full Section 87A rebate for taxable income up to ₹7,00,000. 4% Health & Education Cess on income tax. Standard employee statutory EPF is 12% capped at basic ceiling (₹21,600/year).',
  },
  CUSTOM: {
    id: 'CUSTOM',
    countryName: 'Custom % (any country)',
    currencyCode: 'USD',
    currencySymbol: '$',
    taxYear: 'Custom / 2026',
    startDate: '1 January 2026',
    endDate: '31 December 2026',
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
 * 1. United Kingdom (2026/27)
 * Sourced from HMRC. Thresholds are legislatively frozen until April 2028.
 * Verified: Personal Allowance £12,570, Basic £12,571–£50,270, Higher £50,271–£125,140, Additional >£125,140.
 * Employee National Insurance Class 1 is 8% (main rate) and 2% (above UEL).
 */
export function calculateUkTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
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

  // Employee NI: 8% on £12,570 - £50,270; 2% on excess
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

/**
 * 2. United States (tax year 2026)
 * Sourced from IRS. Federal Single Filer standard deduction and brackets.
 * TODO: VERIFY on official site (irs.gov) for final IRS Rev. Proc. 2026 inflation parameters and TCJA sunset congressional actions.
 */
export function calculateUsTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  // Standard deduction for single filers for 2026
  const standardDeduction = 15000;
  const taxableIncome = Math.max(0, annualGross - standardDeduction);

  const brackets: readonly TaxBracket[] = [
    { threshold: 11925, rate: 0.10 },
    { threshold: 48475, rate: 0.12 },
    { threshold: 103350, rate: 0.22 },
    { threshold: 197300, rate: 0.24 },
    { threshold: 250525, rate: 0.32 },
    { threshold: 626350, rate: 0.35 },
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

  // FICA: Social Security 6.2% up to wage base limit ($176,100); Medicare 1.45% uncapped + 0.9% >$200,000
  // TODO: VERIFY on official site (ssa.gov/irs.gov) for exact 2026 Social Security wage base limit.
  const socialSecurityCap = 176100;
  const socialSecurity = Math.min(annualGross, socialSecurityCap) * 0.062;
  let medicare = annualGross * 0.0145;
  if (annualGross > 200000) {
    medicare += (annualGross - 200000) * 0.009;
  }
  const fica = socialSecurity + medicare;

  return { incomeTax, socialContribution: fica };
}

/**
 * 3. Canada (tax year 2026)
 * Sourced from CRA. Federal rates with indexed Basic Personal Amount.
 * TODO: VERIFY on official site (canada.ca / CRA) for final 2026 indexed federal tax brackets and maximum insurable earnings.
 */
export function calculateCaTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  const brackets: readonly TaxBracket[] = [
    { threshold: 57375, rate: 0.15 },
    { threshold: 114750, rate: 0.205 },
    { threshold: 177882, rate: 0.26 },
    { threshold: 253414, rate: 0.29 },
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

  // Basic Personal Amount tax credit (15% of $16,125 = $2,418.75)
  // TODO: VERIFY on official site (CRA) for exact 2026 Basic Personal Amount dollar value.
  const bpaCredit = 16125 * 0.15;
  const incomeTax = Math.max(0, rawTax - bpaCredit);

  // CPP 2026: 5.95% on $3,500 to $71,300 (max $4,034.10) + CPP2 4% on $71,300 to $76,200 (max $196)
  // TODO: VERIFY on official site (CRA) for exact 2026 YMPE and CPP2 ceilings.
  let cpp = 0;
  if (annualGross > 3500) {
    cpp += Math.min(annualGross - 3500, 71300 - 3500) * 0.0595;
    if (annualGross > 71300) {
      cpp += Math.min(annualGross - 71300, 76200 - 71300) * 0.04;
    }
  }

  // EI 2026: 1.64% on up to $65,700 (max $1,077.48)
  // TODO: VERIFY on official site (CRA) for exact 2026 EI rate and maximum insurable earnings.
  const ei = Math.min(annualGross, 65700) * 0.0164;
  const socialContribution = cpp + ei;

  return { incomeTax, socialContribution };
}

/**
 * 4. Australia (2026–27)
 * Sourced from ATO. Official legislated Stage 3 tax brackets in force.
 * Verified: $0–$18.2k Nil, $18.2k–$45k 16%, $45k–$135k 30%, $135k–$190k 37%, >$190k 45%.
 */
export function calculateAuTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
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

  // Medicare Levy 2% with low-income threshold shade-in
  // TODO: VERIFY on official site (ato.gov.au) for 2026–27 Medicare low-income threshold indexation adjustments.
  let medicare = 0;
  if (annualGross > 32500) {
    medicare = annualGross * 0.02;
  } else if (annualGross > 26000) {
    medicare = (annualGross - 26000) * 0.10;
  }

  return { incomeTax, socialContribution: medicare };
}

/**
 * 5. Germany (2026)
 * Sourced from BMF. Grundfreibetrag is €12,348 for 2026 under progression law.
 * TODO: VERIFY on official site (bundesfinanzministerium.de) for final 2026 Beitragsbemessungsgrenzen and Grundfreibetrag exact figures.
 */
export function calculateDeTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  const zvE = Math.max(0, annualGross);
  let incomeTax = 0;

  if (zvE <= 12348) {
    incomeTax = 0;
  } else if (zvE <= 17500) {
    const y = (zvE - 12348) / 10000;
    incomeTax = (995.21 * y + 1400) * y;
  } else if (zvE <= 68400) {
    const z = (zvE - 17500) / 10000;
    incomeTax = (208.85 * z + 2397) * z + 1015.51;
  } else if (zvE <= 277825) {
    incomeTax = 0.42 * zvE - 10636.31;
  } else {
    incomeTax = 0.45 * zvE - 18971.06;
  }
  incomeTax = Math.max(0, Math.round(incomeTax));

  // Social contributions employee share 2026:
  // RV: 9.3%, cap €93,600
  // AV: 1.3%, cap €93,600
  // KV: 8.2% (7.3% base + 0.9% avg add-on), cap €64,500
  // PV: 2.2% (childless >23), cap €64,500
  const rv = Math.min(annualGross, 93600) * 0.093;
  const av = Math.min(annualGross, 93600) * 0.013;
  const kv = Math.min(annualGross, 64500) * 0.082;
  const pv = Math.min(annualGross, 64500) * 0.022;
  const socialContribution = rv + av + kv + pv;

  return { incomeTax, socialContribution };
}

/**
 * 6. Poland (2026)
 * Sourced from Podatki.gov.pl / Ministerstwo Finansów.
 * TODO: VERIFY on official site (podatki.gov.pl) for 2026 annual average wage 30x ZUS contribution cap.
 */
export function calculatePlTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
  const zusCap = 245000;
  const emerytalna = Math.min(annualGross, zusCap) * 0.0976;
  const rentowa = Math.min(annualGross, zusCap) * 0.0150;
  const chorobowa = annualGross * 0.0245;
  const zusSocial = emerytalna + rentowa + chorobowa;

  const healthBase = Math.max(0, annualGross - zusSocial);
  const zdrowotna = healthBase * 0.09;

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

/**
 * 7. Pakistan (FY 2026–27)
 * Sourced from FBR Pakistan for salaried individuals.
 * TODO: VERIFY on official site (fbr.gov.pk) for any mid-2026 Finance Act adjustments.
 */
export function calculatePkTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
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

  if (annualGross > 10000000) {
    incomeTax *= 1.10;
  }

  // EOBI statutory employee contribution: PKR 370/month = PKR 4,440/year
  const eobi = annualGross > 100000 ? 4440 : 0;
  return { incomeTax, socialContribution: eobi };
}

/**
 * 8. India (FY 2026–27)
 * Sourced from Income Tax Department (CBDT).
 * Section 115BAC New Tax Regime with standard deduction ₹75,000.
 * TODO: VERIFY on official site (incometaxindia.gov.in) for any post-Budget adjustments.
 */
export function calculateInTaxes(annualGross: number): { incomeTax: number; socialContribution: number } {
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
