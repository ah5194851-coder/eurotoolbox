import { type SupportedCountryCode } from "./tax-config";

export interface SalaryCountrySeoData {
  readonly countryId: SupportedCountryCode;
  readonly slug: string;             // e.g. "uk", "pakistan", "india", "united-states"
  readonly canonicalPath: string;    // e.g. "/tools/salary-calculator/uk/"
  readonly countryName: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly h1: string;
  readonly intro: string;            // 100-150 words high quality intro
  readonly faqList: readonly [string, string][];
}

export const SALARY_COUNTRY_PAGES: Record<string, SalaryCountrySeoData> = {
  uk: {
    countryId: "UK",
    slug: "uk",
    canonicalPath: "/tools/salary-calculator/uk/",
    countryName: "United Kingdom",
    metaTitle: "UK Salary Calculator 2026/27 – Take-Home Pay & NI (Free)",
    metaDescription: "Calculate your exact UK take-home pay for tax year 2026/27 with HMRC PAYE income tax, personal allowance, and Class 1 National Insurance. Free & private.",
    h1: "UK Salary Calculator 2026/27 (HMRC PAYE & NI)",
    intro: "Calculate your exact net take-home pay in the United Kingdom for tax year 2026/27 (6 April 2026 – 5 April 2027). Under official HM Revenue & Customs (HMRC) statutory guidelines, employee earnings benefit from the frozen £12,570 Personal Allowance before entering the 20% basic rate, 40% higher rate, or 45% additional rate band. This calculator accounts for the £100,000 allowance taper alongside updated Class 1 employee National Insurance contributions (8% main rate and 2% above the Upper Earnings Limit). Whether reviewing an annual job offer, calculating monthly take-home wages, or converting day rates to hourly earnings, this tool executes 100% locally in your browser with zero file uploads or tracking.",
    faqList: [
      [
        "What is the UK Personal Allowance for 2026/27?",
        "The standard UK Personal Allowance remains statutorily frozen at £12,570 through April 2028. Earnings up to this threshold are completely tax-free for most residents. For individuals earning over £100,000, the Personal Allowance reduces by £1 for every £2 of income above £100,000, reaching zero at £125,140.",
      ],
      [
        "What are the employee National Insurance rates for 2026/27?",
        "Class 1 employee National Insurance is levied at 8% on earnings between the Primary Threshold (£12,570/year or £242/week) and the Upper Earnings Limit (£50,270/year or £967/week). Any earnings above the Upper Earnings Limit are assessed at a 2% contribution rate.",
      ],
      [
        "Does this calculation include pension or student loan deductions?",
        "The primary UK calculator models statutory PAYE income tax and Class 1 National Insurance. If you make auto-enrolment workplace pension contributions or repay Plan 2, Plan 5, or Postgraduate student loans, you can use the custom percentage option to deduct those additional amounts from your take-home pay.",
      ],
    ],
  },

  "united-states": {
    countryId: "US",
    slug: "united-states",
    canonicalPath: "/tools/salary-calculator/united-states/",
    countryName: "United States",
    metaTitle: "US Salary Calculator 2026 – Federal Take-Home Pay & FICA",
    metaDescription: "Free US salary calculator for tax year 2026. Convert gross wages to net pay with Federal income tax brackets, standard deduction, and FICA Social Security.",
    h1: "US Salary Calculator 2026 (Federal Tax & FICA)",
    intro: "Determine your federal take-home pay across the United States for tax year 2026 with our instant, zero-storage calculator. Based on official Internal Revenue Service (IRS) federal income tax brackets for single filers, the utility automatically applies the indexed standard deduction alongside statutory Federal Insurance Contributions Act (FICA) withholdings. These include 6.2% Social Security up to the annual wage ceiling and 1.45% Medicare, plus the 0.9% Additional Medicare Tax on high earners over $200,000. Easily switch between annual salaries, bi-weekly wages, or hourly rates with complete confidentiality.",
    faqList: [
      [
        "What is the standard deduction for US single filers in tax year 2026?",
        "The IRS standard deduction for single filers in tax year 2026 is projected at approximately $15,000, adjusting for statutory cost-of-living inflation benchmarks. This base sum is deducted before applying marginal federal brackets.",
      ],
      [
        "How does FICA Social Security and Medicare withholding work?",
        "FICA consists of two statutory taxes: Social Security at 6.2% levied up to the annual statutory wage base ($176,100), and Medicare at 1.45% on all compensation without an upper limit. High-income employees earning over $200,000 pay an additional 0.9% Medicare surtax.",
      ],
      [
        "Why does my actual US paycheck differ from this federal baseline?",
        "This calculator computes the uniform federal tax baseline and FICA withholdings. Individual state income taxes (varying from 0% in states like Texas and Florida up to over 10% in California) and voluntary pre-tax health insurance or 401(k) contributions are not included in the federal figure.",
      ],
    ],
  },

  canada: {
    countryId: "CA",
    slug: "canada",
    canonicalPath: "/tools/salary-calculator/canada/",
    countryName: "Canada",
    metaTitle: "Canada Salary Calculator 2026 – Federal Net Pay & CPP/EI",
    metaDescription: "Calculate net take-home salary in Canada for tax year 2026. Includes CRA federal tax brackets, basic personal amount, CPP base and second tier, and EI.",
    h1: "Canada Salary Calculator 2026 (CRA Federal & CPP/EI)",
    intro: "Estimate your net take-home pay in Canada for tax year 2026 using official Canada Revenue Agency (CRA) statutory brackets. The calculation incorporates the indexed federal Basic Personal Amount ($16,125) with progressive federal tax rates ranging from 15% to 33%. Furthermore, mandatory employee social contributions are computed including the Canada Pension Plan (CPP) base contribution (5.95%), the second-tier CPP2 ceiling (4.0%), and Employment Insurance (EI at 1.64%). Review your weekly, bi-weekly, monthly, and yearly take-home pay privately without downloading software.",
    faqList: [
      [
        "What is the Basic Personal Amount (BPA) for tax year 2026?",
        "The CRA federal Basic Personal Amount for tax year 2026 is indexed to approximately $16,125. The tax credit allows Canadian workers to earn this initial sum without paying federal income tax.",
      ],
      [
        "What is the CPP and CPP2 contribution rate for 2026?",
        "Employee CPP contributions require 5.95% on pensionable earnings between the $3,500 basic exemption and the Year’s Maximum Pensionable Earnings (YMPE). The second-tier CPP2 requires 4.0% on earnings between the YMPE and the upper earnings ceiling (YAMPE).",
      ],
      [
        "Are provincial income taxes included in this calculation?",
        "This calculation reflects the national federal baseline and statutory CPP/EI withholdings. Provincial income taxes (such as Ontario, BC, or Alberta) vary by province of residence and can be modeled with custom deductions.",
      ],
    ],
  },

  australia: {
    countryId: "AU",
    slug: "australia",
    canonicalPath: "/tools/salary-calculator/australia/",
    countryName: "Australia",
    metaTitle: "Australia Salary Calculator 2026–27 – Take-Home Pay & Stage 3",
    metaDescription: "Free Australian salary calculator for financial year 2026–27. Includes redesigned Stage 3 tax cuts, Medicare Levy (2%), and net take-home pay breakdown.",
    h1: "Australia Salary Calculator 2026–27 (ATO Stage 3 & Medicare)",
    intro: "Calculate your exact Australian take-home pay for financial year 2026–27 (1 July 2026 – 30 June 2027) using official Australian Taxation Office (ATO) legislation. This calculator incorporates the legislated Stage 3 personal tax cuts: a 16% rate from $18,201 to $45,000, 30% up to $135,000, 37% up to $190,000, and 45% above $190,000, alongside the $18,200 tax-free threshold. The standard 2.0% Medicare Levy is factored in seamlessly, giving Australian employees, contractors, and job-seekers an accurate, instant salary breakdown from annual packages down to hourly wages.",
    faqList: [
      [
        "What is the tax-free threshold in Australia for 2026–27?",
        "Australian resident individual taxpayers can earn up to $18,200 annually completely tax-free. Earnings above this amount are subject to progressive marginal tax brackets starting at 16%.",
      ],
      [
        "How does the Stage 3 tax reform affect my take-home pay?",
        "The redesigned Stage 3 tax cuts provide significant tax relief to middle and higher-income Australians by reducing the 19% rate to 16%, establishing a broad 30% band from $45,001 to $135,000, and adjusting higher thresholds.",
      ],
      [
        "Is employer Superannuation Guarantee included in this salary figure?",
        "In Australia, the Superannuation Guarantee (11.5%+) is legally paid by employers on top of ordinary times earnings. This calculator evaluates your gross taxable salary package excluding employer super contributions.",
      ],
    ],
  },

  germany: {
    countryId: "DE",
    slug: "germany",
    canonicalPath: "/tools/salary-calculator/germany/",
    countryName: "Germany",
    metaTitle: "Germany Salary Calculator 2026 – Brutto Netto Rechner (Free)",
    metaDescription: "Calculate German take-home pay (Brutto-Netto) for 2026. Sourced from BMF with Grundfreibetrag, Lohnsteuer, and statutory health, care, and pension deductions.",
    h1: "Germany Salary Calculator 2026 (Brutto Netto Rechner)",
    intro: "Calculate your German net salary (Nettogehalt) from your gross income (Bruttogehalt) for calendar year 2026 with our free, privacy-first tool. Sourced from the Bundesministerium der Finanzen (BMF), the calculation models Steuerklasse I (single employee baseline) with the updated Grundfreibetrag (€12,084 tax-free base). It accurately computes statutory employee social contributions: health insurance (Krankenversicherung 7.3% + 1.2% Zusatzbeitrag), long-term nursing care (Pflegeversicherung 2.2%), pension insurance (Rentenversicherung 9.3%), and unemployment coverage (Arbeitslosenversicherung 1.3%) up to national contribution caps.",
    faqList: [
      [
        "What is the German Grundfreibetrag for 2026?",
        "The basic personal tax-free allowance (Grundfreibetrag) for calendar year 2026 is €12,084. Earnings up to this threshold are entirely exempt from statutory income tax (Lohnsteuer).",
      ],
      [
        "What percentage of gross pay goes toward German social contributions?",
        "Employee statutory social contributions (Sozialabgaben) total approximately 20% to 21% of gross earnings up to the contribution assessment ceilings (Beitragsbemessungsgrenzen), shared equally with the employer.",
      ],
      [
        "Does this calculator factor in church tax (Kirchensteuer)?",
        "Church tax (8% in Bavaria and Baden-Württemberg, 9% in other federal states) is voluntary and applies only to registered church members. It is excluded here to provide a clear statutory baseline.",
      ],
    ],
  },

  poland: {
    countryId: "PL",
    slug: "poland",
    canonicalPath: "/tools/salary-calculator/poland/",
    countryName: "Poland",
    metaTitle: "Poland Salary Calculator 2026 – Wynagrodzenie Netto (PIT & ZUS)",
    metaDescription: "Calculate Polish net salary (na rękę) for 2026 under Umowa o pracę. Sourced from podatki.gov.pl with 30k PLN tax-free amount, PIT 12%/32%, and full ZUS.",
    h1: "Poland Salary Calculator 2026 (Kalkulator Wynagrodzeń PIT & ZUS)",
    intro: "Determine your take-home pay in Poland (wynagrodzenie na rękę) for calendar year 2026 for a standard employment contract (Umowa o pracę). Sourced directly from Ministerstwo Finansów guidelines, the calculator applies the 30,000 PLN tax-free allowance (kwota wolna od podatku) and standard tax scale (12% up to 120,000 PLN, 32% above). It accounts for mandatory employee ZUS contributions: retirement (9.76%), disability (1.50%), sickness (2.45%), standard tax-deductible costs (KUP 250 PLN/mo), and the 9% health insurance contribution (składka zdrowotna).",
    faqList: [
      [
        "What is the tax-free allowance (kwota wolna) in Poland for 2026?",
        "The Polish tax-free allowance for personal income tax (PIT) remains 30,000 PLN annually. This translates into a 3,600 PLN statutory annual tax-reducing amount (kwota zmniejszająca podatek).",
      ],
      [
        "What are employee ZUS social insurance contributions in Poland?",
        "Under an employment contract (Umowa o pracę), the employee pays 9.76% retirement, 1.50% disability, and 2.45% sickness insurance (totaling 13.71% ZUS social) plus 9.0% health insurance (składka zdrowotna).",
      ],
      [
        "Does the 30-fold ZUS contribution limit apply to all contributions?",
        "The 30-fold average salary cap applies strictly to retirement and disability contributions (emerytalno-rentowe). Sickness and health insurance contributions apply to all eligible earnings without an upper limit.",
      ],
    ],
  },

  pakistan: {
    countryId: "PK",
    slug: "pakistan",
    canonicalPath: "/tools/salary-calculator/pakistan/",
    countryName: "Pakistan",
    metaTitle: "Pakistan Salary Calculator FY 2026–27 – FBR Tax on Salary (Free)",
    metaDescription: "Free Pakistan salary tax calculator for FY 2026–27. Sourced from FBR tax slabs for salaried individuals with take-home pay per month and year.",
    h1: "Pakistan Salary Calculator FY 2026–27 (FBR Salaried Slabs)",
    intro: "Calculate your exact net salary and FBR income tax deductions in Pakistan for Fiscal Year 2026–27 (1 July 2026 – 30 June 2027). Under official Federal Board of Revenue (FBR) salaried tax slabs, individuals earning up to PKR 600,000 annually enjoy zero tax liability. Progressively higher tiers are taxed at 5%, 15%, 25%, 30%, and 35%, with statutory employee EOBI pension deductions included. Use this instant, client-side utility to convert gross annual compensation into monthly, weekly, and daily bank deposits with total privacy.",
    faqList: [
      [
        "What is the tax-exempt salary slab in Pakistan for FY 2026–27?",
        "Salaried individuals in Pakistan earning up to PKR 600,000 per year (PKR 50,000 per month) pay 0% income tax under the official FBR salaried tax schedules.",
      ],
      [
        "What are the marginal tax rates for salaried individuals in Pakistan?",
        "Annual earnings between PKR 600,001 and 1,200,000 are taxed at 5% on the excess. Income from PKR 1.2M to 2.2M is taxed at PKR 30,000 plus 15%, scaling up to 35% on income exceeding PKR 4.1M.",
      ],
      [
        "What is the employee EOBI contribution in Pakistan?",
        "The Employees' Old-Age Benefits Institution (EOBI) employee share is set at 1% of the statutory minimum wage, amounting to PKR 370 per month (PKR 4,440 annually) for eligible private-sector employees.",
      ],
    ],
  },

  india: {
    countryId: "IN",
    slug: "india",
    canonicalPath: "/tools/salary-calculator/india/",
    countryName: "India",
    metaTitle: "India Salary Calculator FY 2026–27 – New Regime 115BAC & In-Hand",
    metaDescription: "Free Indian salary calculator for FY 2026–27. Sourced from Income Tax Dept New Regime 115BAC with ₹75,000 standard deduction, 87A rebate, and EPF.",
    h1: "India Salary Calculator FY 2026–27 (New Tax Regime 115BAC)",
    intro: "Determine your monthly in-hand take-home salary in India for Fiscal Year 2026–27 (1 April 2026 – 31 March 2027) using the default Section 115BAC New Tax Regime. The calculation automatically applies the standard deduction of ₹75,000, progressive slabs from 5% to 30%, Section 87A rebate (zero tax on taxable income up to ₹7,00,000), and the 4% Health & Education Cess. It also factors in statutory employee Provident Fund (EPF) contributions. Enjoy accurate CTC to take-home projections calculated privately on your device.",
    faqList: [
      [
        "What is the standard deduction under India’s New Tax Regime for FY 2026–27?",
        "The standard deduction for salaried individuals under the default Section 115BAC New Tax Regime is ₹75,000, deducted directly from gross annual CTC before applying tax slabs.",
      ],
      [
        "At what salary level is income tax zero in India?",
        "Under the New Tax Regime, taking advantage of the ₹75,000 standard deduction and Section 87A rebate, a salaried individual earning up to ₹7,75,000 gross annual income pays zero income tax.",
      ],
      [
        "How is Employee Provident Fund (EPF) calculated?",
        "Statutory employee EPF is 12% of basic salary plus dearness allowance, with the statutory minimum ceiling capped at ₹1,800 per month (₹21,600 per year), unless the employee opts for higher voluntary contribution.",
      ],
    ],
  },

  uae: {
    countryId: "AE",
    slug: "uae",
    canonicalPath: "/tools/salary-calculator/uae/",
    countryName: "United Arab Emirates",
    metaTitle: "UAE Salary Calculator 2026 – Take-Home Pay & GPSSA (0% Tax)",
    metaDescription: "Calculate net take-home salary in Dubai and the UAE for 2026. 0% personal income tax, GPSSA rules for UAE nationals, and expat salary breakdown.",
    h1: "UAE Salary Calculator 2026 (0% Personal Income Tax & GPSSA)",
    intro: "Compute your net take-home salary in Dubai, Abu Dhabi, and across the United Arab Emirates for calendar year 2026. Under UAE federal labor and tax legislation, employment income is subject to 0% personal income tax, allowing workers to retain 100% of their earnings. Expatriate employees have zero mandatory social security or pension withholdings from their monthly paycheck. For UAE national employees, the statutory GPSSA pension contribution is 5% up to the AED 50,000 monthly contributory wage cap. Calculate monthly, weekly, and annual take-home figures with zero data storage.",
    faqList: [
      [
        "Is there personal income tax on salaries in the UAE in 2026?",
        "No. The United Arab Emirates levies 0% personal income tax on employment salaries, bonuses, and allowances for all resident workers and expatriates.",
      ],
      [
        "Do expatriate employees pay social security or pension contributions in the UAE?",
        "Expatriate workers in the UAE do not have statutory social security or pension deductions withheld from their monthly pay. Expatriates are entitled to end-of-service gratuity or employer workplace savings upon contract completion.",
      ],
      [
        "What are the pension rules for UAE national employees?",
        "Emirati citizens working in government or private establishments contribute 5% of their contributory wage to the General Pension and Social Security Authority (GPSSA), subject to a maximum monthly wage ceiling of AED 50,000.",
      ],
    ],
  },

  "saudi-arabia": {
    countryId: "SA",
    slug: "saudi-arabia",
    canonicalPath: "/tools/salary-calculator/saudi-arabia/",
    countryName: "Saudi Arabia",
    metaTitle: "Saudi Arabia Salary Calculator 2026 – Net Pay & GOSI (0% Tax)",
    metaDescription: "Free Saudi Arabia salary calculator for 2026. 0% personal income tax, GOSI social insurance for Saudi nationals, and net pay breakdown.",
    h1: "Saudi Arabia Salary Calculator 2026 (0% Income Tax & GOSI)",
    intro: "Calculate your exact net salary and monthly take-home earnings in the Kingdom of Saudi Arabia for calendar year 2026. Under Saudi tax regulations, employment wages and compensation packages are subject to 0% personal income tax. Expatriate professionals retain 100% of their gross contracted salary without social insurance deductions. For Saudi national employees, statutory General Organization for Social Insurance (GOSI) withholdings encompass the annuity pension (9.0%) and SANED unemployment scheme (0.75%), capped at the SAR 45,000 monthly wage ceiling.",
    faqList: [
      [
        "Is there income tax on employment wages in Saudi Arabia?",
        "No. Saudi Arabia levies 0% personal income tax on salaries and employment compensation for both Saudi citizens and foreign expatriates.",
      ],
      [
        "Do foreign expatriates pay GOSI social security in Saudi Arabia?",
        "Foreign expatriate employees do not pay employee GOSI pension contributions; their take-home pay matches 100% of gross contractual earnings before optional private payroll deductions.",
      ],
      [
        "What GOSI contribution rate applies to Saudi national employees?",
        "Saudi national employees contribute 9.75% of their basic salary plus housing allowance (9.0% for the GOSI annuity pension and 0.75% for SANED unemployment insurance), capped at a monthly contributory ceiling of SAR 45,000.",
      ],
    ],
  },

  ireland: {
    countryId: "IE",
    slug: "ireland",
    canonicalPath: "/tools/salary-calculator/ireland/",
    countryName: "Ireland",
    metaTitle: "Ireland Salary Calculator 2026 – PAYE, USC & PRSI Take-Home Pay",
    metaDescription: "Calculate your net take-home salary in Ireland for 2026. Sourced from Revenue.ie with PAYE tax bands, personal tax credits, USC tiers, and PRSI.",
    h1: "Ireland Salary Calculator 2026 (PAYE, USC & PRSI)",
    intro: "Estimate your net take-home pay in the Republic of Ireland for tax year 2026 with our accurate, client-side calculator. Based on official Revenue Commissioners (Revenue.ie) rates, the tool models the standard single rate band (€44,000 at 20%, and 40% on the balance) alongside €4,000 in personal and employee tax credits. It precisely calculates the progressive Universal Social Charge (USC) tiers (0.5%, 2.0%, 3.0%, and 8.0%) and Class A Pay Related Social Insurance (PRSI at 4.1%), providing a comprehensive breakdown of monthly and annual disposable income.",
    faqList: [
      [
        "What is the standard rate cut-off point for single workers in Ireland in 2026?",
        "The standard rate tax band for a single individual in Ireland is €44,000. Income up to this threshold is taxed at 20%, while any income above €44,000 is taxed at the higher rate of 40%.",
      ],
      [
        "What tax credits apply to PAYE employees in Ireland?",
        "Single PAYE employees typically qualify for both the Personal Tax Credit (€2,000) and the Employee (PAYE) Tax Credit (€2,000), giving a combined €4,000 direct reduction against calculated gross income tax.",
      ],
      [
        "How is the Universal Social Charge (USC) calculated in 2026?",
        "USC applies progressively once total income exceeds €13,000: 0.5% on the first €12,012, 2.0% on €12,013 to €27,382, 3.0% on €27,383 to €70,044, and 8.0% on remaining income.",
      ],
    ],
  },

  "new-zealand": {
    countryId: "NZ",
    slug: "new-zealand",
    canonicalPath: "/tools/salary-calculator/new-zealand/",
    countryName: "New Zealand",
    metaTitle: "New Zealand Salary Calculator 2026–27 – PAYE & ACC Take-Home Pay",
    metaDescription: "Free New Zealand salary calculator for tax year 2026–27. Sourced from IRD with personal income tax brackets, ACC Earners' Levy, and net pay breakdown.",
    h1: "New Zealand Salary Calculator 2026–27 (IRD PAYE & ACC)",
    intro: "Calculate your exact take-home pay in New Zealand for tax year 2026–27 (1 April 2026 – 31 March 2027). Sourced directly from Inland Revenue Department (IRD) statutory schedules, the calculator incorporates the legislated tax brackets: 10.5% up to $15,600, 17.5% up to $53,500, 30% up to $78,100, 33% up to $180,000, and 39% on earnings above $180,000. Mandatory ACC Earners’ Levy (1.60% capped at maximum liable earnings) is automatically computed, delivering clear annual, fortnightly, weekly, and hourly pay figures.",
    faqList: [
      [
        "What are the personal tax brackets in New Zealand for 2026–27?",
        "Personal tax rates are: 10.5% ($0–$15,600), 17.5% ($15,601–$53,500), 30% ($53,501–$78,100), 33% ($78,101–$180,000), and 39% on all income exceeding $180,000.",
      ],
      [
        "What is the ACC Earners’ Levy in New Zealand?",
        "The statutory ACC Earners' Levy covers non-work injuries and is set at 1.60% of gross earnings up to the maximum liable earnings cap of $142,283 (maximum levy approximately $2,276.53 per year).",
      ],
      [
        "Is KiwiSaver deducted automatically in this calculation?",
        "KiwiSaver is a voluntary workplace retirement savings scheme (with employee contributions typically 3%, 4%, 6%, 8%, or 10%). It is excluded from the baseline statutory calculation so you can assess pure take-home pay.",
      ],
    ],
  },

  singapore: {
    countryId: "SG",
    slug: "singapore",
    canonicalPath: "/tools/salary-calculator/singapore/",
    countryName: "Singapore",
    metaTitle: "Singapore Salary Calculator 2026 – IRAS Tax & CPF Take-Home Pay",
    metaDescription: "Calculate net take-home salary in Singapore for YA 2026 / 2026. Sourced from IRAS with progressive tax brackets, CPF Ordinary Wage ceiling, and net breakdown.",
    h1: "Singapore Salary Calculator 2026 (IRAS Tax & CPF)",
    intro: "Calculate your net salary and monthly take-home pay in Singapore for calendar year 2026 / Year of Assessment (YA) 2026. Using official Inland Revenue Authority of Singapore (IRAS) resident progressive tax brackets, the first S$20,000 is completely tax-free, with gradual marginal tiers from 2% up to 24%. For Singapore Citizens and Permanent Residents aged 55 and below, employee Central Provident Fund (CPF) contributions are computed at 20% up to the statutory Ordinary Wage monthly ceiling ($7,400/month = $88,800/year ceiling), providing clear net income insights.",
    faqList: [
      [
        "What are the personal income tax rates in Singapore?",
        "Singapore resident rates start at 0% for the first S$20,000, 2% on the next S$10,000, 3.5% on the next S$10,000, 7% on the next S$40,000, scaling to a top rate of 24% for income above S$1,000,000.",
      ],
      [
        "What is the employee CPF contribution rate and wage ceiling for 2026?",
        "For Singapore Citizens and PRs aged 55 or younger, the employee CPF contribution is 20% of ordinary wages, capped at the monthly wage ceiling of S$7,400 (S$88,800 annually, maximum CPF employee deduction of S$17,760).",
      ],
      [
        "Do Employment Pass (EP) and foreign workers pay CPF in Singapore?",
        "No. Foreign employees working in Singapore on Employment Passes, S Passes, or Work Permits are exempt from CPF contributions, meaning take-home pay equals gross salary minus IRAS income tax.",
      ],
    ],
  },

  netherlands: {
    countryId: "NL",
    slug: "netherlands",
    canonicalPath: "/tools/salary-calculator/netherlands/",
    countryName: "Netherlands",
    metaTitle: "Netherlands Salary Calculator 2026 – Bruto Netto Box 1 (Free)",
    metaDescription: "Calculate Dutch net salary (bruto naar netto) for 2026. Sourced from Belastingdienst with Box 1 tax brackets, algemene heffingskorting, and arbeidskorting.",
    h1: "Netherlands Salary Calculator 2026 (Bruto Netto Rechner)",
    intro: "Convert your gross Dutch salary to net take-home earnings (bruto naar netto) for calendar year 2026 with our private online calculator. Sourced from the Belastingdienst (Dutch Tax Administration), the calculation integrates Box 1 progressive income tax and national social insurance (volksverzekeringen): 35.82% up to €38,441, 37.48% up to €76,817, and 49.50% above €76,817. Key statutory tax credits including the General Tax Credit (Algemene heffingskorting) and Labor Tax Credit (Arbeidskorting) are factored in automatically.",
    faqList: [
      [
        "What are the Box 1 income tax brackets in the Netherlands for 2026?",
        "Box 1 features three progressive brackets: Tier 1 at 35.82% on taxable income up to €38,441; Tier 2 at 37.48% between €38,441 and €76,817; and Tier 3 at 49.50% on all income above €76,817.",
      ],
      [
        "How do Dutch tax credits (heffingskortingen) affect my take-home pay?",
        "The Algemene heffingskorting (general tax credit up to €3,362) and Arbeidskorting (labor tax credit up to €5,532) directly reduce the amount of income tax and social insurance deducted from your gross wage.",
      ],
      [
        "Does this calculation include the 30% ruling for expats?",
        "The standard calculation models standard Dutch employment tax. Qualifying expats with the 30% ruling receive an exemption on 30% of their gross compensation, which can be modeled with custom deductions.",
      ],
    ],
  },

  "south-africa": {
    countryId: "ZA",
    slug: "south-africa",
    canonicalPath: "/tools/salary-calculator/south-africa/",
    countryName: "South Africa",
    metaTitle: "South Africa Salary Calculator 2026–27 – SARS PAYE & Net Pay",
    metaDescription: "Free South African salary calculator for 2026–27. Sourced from SARS with personal income tax brackets, primary rebate, UIF contribution, and net pay.",
    h1: "South Africa Salary Calculator 2026–27 (SARS PAYE & UIF)",
    intro: "Calculate your exact net monthly salary and take-home pay in South Africa for tax year 2026–27 (1 March 2026 – 28 February 2027). Under official South African Revenue Service (SARS) PAYE tax tables, progressive marginal tax rates span from 18% up to 45%. The statutory primary tax rebate (R17,235) is applied automatically to determine your net tax liability, while mandatory Unemployment Insurance Fund (UIF) contributions (1% capped at R177.12 per month) are factored into total deductions.",
    faqList: [
      [
        "What is the tax threshold in South Africa for 2026–27?",
        "Taking into account the primary tax rebate of R17,235, individuals under the age of 65 pay zero personal income tax on annual earnings up to approximately R95,750.",
      ],
      [
        "What are the SARS personal income tax brackets for 2026–27?",
        "SARS tax rates range from 18% (on taxable income up to R237,100) through progressive brackets of 26%, 31%, 36%, 39%, 41%, reaching a top marginal rate of 45% on income exceeding R1,817,000.",
      ],
      [
        "What is the employee UIF deduction in South Africa?",
        "The Unemployment Insurance Fund (UIF) requires a 1% employee contribution on gross remuneration, capped at the statutory maximum limit of R177.12 per month (R2,125.44 annually).",
      ],
    ],
  },
};
