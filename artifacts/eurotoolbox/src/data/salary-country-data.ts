import { type SupportedCountryCode } from "./tax-config";

export interface SalaryCountrySeoData {
  readonly countryId: SupportedCountryCode;
  readonly slug: string;             // e.g. "uk", "pakistan", "india", "united-states"
  readonly canonicalPath: string;    // e.g. "/tools/salary-calculator/uk/"
  readonly countryName: string;
  readonly flagEmoji: string;
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
    flagEmoji: "🇬🇧",
    metaTitle: "UK Salary Calculator 2026/27 – Take-Home Pay & NI (Free)",
    metaDescription: "Calculate your estimated UK take-home pay for tax year 2026/27 with HMRC PAYE income tax, personal allowance, and Class 1 National Insurance. Free & private.",
    h1: "UK Salary Calculator 2026/27 (HMRC PAYE & NI)",
    intro: "Estimate your net take-home pay in the United Kingdom for tax year 2026/27 (6 April 2026 – 5 April 2027). Under HM Revenue & Customs (HMRC) published statutory guidelines, employee earnings benefit from the £12,570 Personal Allowance before entering the 20% basic rate, 40% higher rate, or 45% additional rate band. This calculator accounts for the £100,000 allowance taper alongside Class 1 employee National Insurance contributions (8% main rate and 2% above the Upper Earnings Limit). Whether reviewing an annual job offer, calculating monthly take-home wages, or converting day rates to hourly earnings, this tool executes 100% locally in your browser with zero file uploads or tracking. Estimated using published statutory rates, tax year 2026/27. Always confirm with the official source.",
    faqList: [
      [
        "What is the UK Personal Allowance for 2026/27?",
        "The standard UK Personal Allowance remains at £12,570 through April 2028. Earnings up to this threshold are completely tax-free for most residents. For individuals earning over £100,000, the Personal Allowance reduces by £1 for every £2 of income above £100,000, reaching zero at £125,140.",
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
    flagEmoji: "🇺🇸",
    metaTitle: "US Salary Calculator 2026 – Federal Take-Home Pay & FICA",
    metaDescription: "Free US salary calculator for tax year 2026. Convert gross wages to net pay with Federal income tax brackets, standard deduction, and FICA Social Security.",
    h1: "US Salary Calculator 2026 (Federal Tax & FICA)",
    intro: "Determine your federal take-home pay across the United States for tax year 2026 with our instant, zero-storage calculator. Based on published Internal Revenue Service (IRS) federal income tax brackets for single filers, the utility automatically applies the indexed $15,000 standard deduction alongside statutory Federal Insurance Contributions Act (FICA) withholdings. These include 6.2% Social Security up to the annual wage ceiling and 1.45% Medicare, plus the 0.9% Additional Medicare Tax on high earners over $200,000. Easily switch between annual salaries, bi-weekly wages, or hourly rates with complete confidentiality. Estimated using published statutory rates, tax year 2026. Always confirm with the official source.",
    faqList: [
      [
        "What is the standard deduction for US single filers in tax year 2026?",
        "For tax year 2026, the standard deduction for single filers is projected at $15,000, reducing your federally taxable wage baseline before tax bracket rates are applied.",
      ],
      [
        "How are Social Security and Medicare taxes calculated?",
        "FICA taxes consist of 6.2% Social Security on earnings up to the statutory wage base limit ($176,100) and 1.45% Medicare on all earnings. An Additional Medicare Tax of 0.9% applies to wages exceeding $200,000 for single filers.",
      ],
      [
        "Are state and local income taxes included in this calculator?",
        "This tool models national federal income tax and statutory FICA deductions. Because state income taxes vary widely—from 0% in states like Texas and Florida to progressive rates over 10% in California—state and municipal taxes can be modeled using the custom percentage mode.",
      ],
    ],
  },

  canada: {
    countryId: "CA",
    slug: "canada",
    canonicalPath: "/tools/salary-calculator/canada/",
    countryName: "Canada",
    flagEmoji: "🇨🇦",
    metaTitle: "Canada Salary Calculator 2026 – Federal Take-Home Pay, CPP & EI",
    metaDescription: "Free Canada salary calculator for tax year 2026. Federal income tax brackets, Canada Pension Plan (CPP/CPP2), and Employment Insurance (EI).",
    h1: "Canada Salary Calculator 2026 (Federal Tax, CPP & EI)",
    intro: "Calculate your net take-home salary in Canada for calendar tax year 2026. Sourced from published Canada Revenue Agency (CRA) statutory schedules, this tool evaluates federal tax brackets (15% to 33%), the Basic Personal Amount ($16,125 credited at 15%), and mandatory statutory deductions. These include Canada Pension Plan contributions (5.95% base CPP up to $71,300 plus 4% CPP2 up to $76,200) and Employment Insurance (1.64% EI up to $65,700). Inspect annual, monthly, or bi-weekly pay with guaranteed browser privacy. Estimated using published statutory rates, tax year 2026. Always confirm with the official source.",
    faqList: [
      [
        "What is the federal Basic Personal Amount in Canada for 2026?",
        "The federal Basic Personal Amount (BPA) is indexed to $16,125. Rather than a pure deduction, it provides a 15% non-refundable tax credit (up to $2,418.75) that directly offsets federal income tax payable.",
      ],
      [
        "How do CPP and the new CPP2 deductions work in 2026?",
        "Base CPP is 5.95% on pensionable earnings between the $3,500 basic exemption and the first earnings ceiling ($71,300). Second-tier CPP2 applies at 4.0% on earnings between $71,300 and the upper ceiling of $76,200.",
      ],
      [
        "Does this calculation include provincial income taxes?",
        "This calculator focuses on the national federal tax baseline and compulsory federal payroll contributions (CPP and EI). Provincial taxes vary by province and can be layered on via the custom mode.",
      ],
    ],
  },

  australia: {
    countryId: "AU",
    slug: "australia",
    canonicalPath: "/tools/salary-calculator/australia/",
    countryName: "Australia",
    flagEmoji: "🇦🇺",
    metaTitle: "Australia Salary Calculator 2026–27 – Stage 3 Tax & Take-Home",
    metaDescription: "Free Australian salary calculator for 2026–27. Sourced from ATO with Stage 3 tax cuts, Medicare Levy, and net pay breakdown per year, month, and fortnight.",
    h1: "Australia Salary Calculator 2026–27 (ATO Stage 3 & Medicare)",
    intro: "Determine your take-home pay in Australia for the 2026–27 financial year (1 July 2026 – 30 June 2027). Built strictly in accordance with published Australian Taxation Office (ATO) Stage 3 legislated tax rates, this calculator applies the $18,200 tax-free threshold, the 16% bracket up to $45,000, 30% up to $135,000, 37% up to $190,000, and 45% on the balance. It also models the mandatory 2% Medicare Levy with low-income shade-in thresholds, delivering clear annual, monthly, and fortnightly wage projections. Estimated using published statutory rates, tax year 2026–27. Always confirm with the official source.",
    faqList: [
      [
        "What are the Stage 3 income tax brackets in Australia for 2026–27?",
        "The legislated rates are: $0 to $18,200 (Nil); $18,201 to $45,000 (16%); $45,001 to $135,000 (30%); $135,001 to $190,000 (37%); and over $190,000 (45%).",
      ],
      [
        "How is the Medicare Levy calculated?",
        "The standard Medicare Levy is 2% of your taxable income. For low-income earners, no levy applies below $26,000, with a reduced phase-in rate between $26,000 and $32,500.",
      ],
      [
        "Is employer Superannuation included in take-home pay?",
        "No. The Superannuation Guarantee (mandatory employer contribution) is paid on top of your gross wage directly into your super fund and is not deducted from your take-home pay.",
      ],
    ],
  },

  germany: {
    countryId: "DE",
    slug: "germany",
    canonicalPath: "/tools/salary-calculator/germany/",
    countryName: "Germany",
    flagEmoji: "🇩🇪",
    metaTitle: "Germany Salary Calculator 2026 – Netto Gehalt & Steuern (Free)",
    metaDescription: "Calculate German net salary (Brutto-Netto-Rechner) for 2026. Steuerklasse 1 income tax, Grundfreibetrag, health insurance, and pension contributions.",
    h1: "Germany Salary Calculator 2026 (Brutto-Netto Rechner)",
    intro: "Calculate your German net salary (Brutto-Netto) for calendar year 2026 with full transparency. Sourced from the Bundesfinanzministerium (BMF) official tax calculation guidelines, the tool evaluates single employees in Tax Class 1 (Steuerklasse 1). It applies the €12,096 Grundfreibetrag, progressive formula zones (14% entry to 42% top rate), and statutory employee social security contributions (~20.5% combined for pension, health, care, and unemployment insurance). All calculations are executed privately on your machine. Estimated using published statutory rates, tax year 2026. Always confirm with the official source.",
    faqList: [
      [
        "What is the Grundfreibetrag (basic tax-free allowance) in Germany for 2026?",
        "The Grundfreibetrag is €12,096. Single taxpayers pay zero income tax on earnings up to this statutory threshold.",
      ],
      [
        "What are the employee social security contribution rates in Germany?",
        "Mandatory employee contributions total roughly 20.5%: statutory pension (9.3%), health insurance (7.3% base + ~1.7% average insurer surcharge), long-term care insurance (2.2%), and unemployment insurance (1.3%).",
      ],
      [
        "Does this calculation include Church Tax (Kirchensteuer)?",
        "Church tax (8% or 9% of income tax depending on federal state) is optional and applies only to registered members of recognized religious bodies. It is excluded here to provide a standard national baseline.",
      ],
    ],
  },

  poland: {
    countryId: "PL",
    slug: "poland",
    canonicalPath: "/tools/salary-calculator/poland/",
    countryName: "Poland",
    flagEmoji: "🇵🇱",
    metaTitle: "Poland Salary Calculator 2026 – Wynagrodzenie Netto & ZUS (Free)",
    metaDescription: "Calculate Polish net salary (Kalkulator Wynagrodzeń) for 2026 on Umowa o pracę. PIT tax rates (12%/32%), Kwota wolna 30,000 PLN, and ZUS contributions.",
    h1: "Poland Salary Calculator 2026 (Kalkulator Wynagrodzeń)",
    intro: "Convert your gross salary to net take-home earnings in Poland for 2026 on a standard employment contract (Umowa o pracę). Using published Ministerstwo Finansów schedules, this utility computes employee ZUS social contributions (13.71% pension, disability, and sickness), non-deductible NFZ health insurance (9%), and progressive PIT brackets (12% up to 120,000 PLN and 32% on the excess, with the generous 30,000 PLN Kwota wolna od podatku). Experience private, instant compensation modeling directly in your browser. Estimated using published statutory rates, tax year 2026. Always confirm with the official source.",
    faqList: [
      [
        "What is the tax-free allowance (Kwota wolna) in Poland in 2026?",
        "The tax-free amount remains at 30,000 PLN. This generates a direct tax-reducing allowance of 3,600 PLN against the initial 12% income tax tier.",
      ],
      [
        "How are employee ZUS social security and health contributions deducted?",
        "Employee social security contributions total 13.71% of gross wages. After subtracting social security, a mandatory 9% NFZ health insurance contribution is assessed on the remaining wage base.",
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
    flagEmoji: "🇵🇰",
    metaTitle: "Pakistan Salary Calculator FY 2026–27 – FBR Tax on Salary (Free)",
    metaDescription: "Free Pakistan salary tax calculator for FY 2026–27. Sourced from FBR tax slabs for salaried individuals with take-home pay per month and year.",
    h1: "Pakistan Salary Calculator FY 2026–27 (FBR Salaried Slabs)",
    intro: "Calculate your estimated net salary and FBR income tax deductions in Pakistan for Fiscal Year 2026–27 (1 July 2026 – 30 June 2027). Under published Federal Board of Revenue (FBR) salaried tax slabs, individuals earning up to PKR 600,000 annually enjoy zero tax liability. Progressively higher tiers are taxed at 5%, 15%, 25%, 30%, and 35%, with a 10% high-earner surcharge applying on computed tax for taxable earnings exceeding PKR 10 million. Statutory employee EOBI pension deductions (PKR 370/month; PKR 4,440/year) are included. Estimated using published statutory rates, tax year FY 2026–27. Always confirm with the official source.",
    faqList: [
      [
        "What is the tax-exempt salary slab in Pakistan for FY 2026–27?",
        "Salaried individuals in Pakistan earning up to PKR 600,000 per year (PKR 50,000 per month) pay 0% income tax under published FBR salaried tax schedules.",
      ],
      [
        "What are the progressive tax rates and high-earner surcharges for salaried individuals?",
        "Annual earnings between PKR 600,001 and 1,200,000 are taxed at 5% on the excess. Income from PKR 1.2M to 2.2M is taxed at PKR 30,000 plus 15%, scaling up to 35% on income exceeding PKR 4.1M. A 10% high-earner surcharge applies to the computed tax on taxable income exceeding PKR 10,000,000.",
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
    flagEmoji: "🇮🇳",
    metaTitle: "India Salary Calculator FY 2026–27 – New Regime 115BAC & In-Hand",
    metaDescription: "Free Indian salary calculator for FY 2026–27. Sourced from Income Tax Dept New Regime 115BAC with ₹75,000 standard deduction, 87A rebate, and EPF.",
    h1: "India Salary Calculator FY 2026–27 (New Tax Regime 115BAC)",
    intro: "Determine your monthly in-hand take-home salary in India for Fiscal Year 2026–27 (1 April 2026 – 31 March 2027) using the default Section 115BAC New Tax Regime. The calculation automatically applies the standard deduction of ₹75,000, progressive slabs from 5% to 30%, Section 87A rebate (zero tax on taxable income up to ₹7,00,000), and the 4% Health & Education Cess. It also factors in statutory employee Provident Fund (EPF) contributions. Enjoy accurate CTC to take-home projections calculated privately on your device. Estimated using published statutory rates, tax year FY 2026–27. Always confirm with the official source.",
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
    countryId: "UAE",
    slug: "uae",
    canonicalPath: "/tools/salary-calculator/uae/",
    countryName: "United Arab Emirates",
    flagEmoji: "🇦🇪",
    metaTitle: "UAE Salary Calculator 2026 – Take-Home Pay & GPSSA (0% Tax)",
    metaDescription: "Calculate net take-home salary in Dubai and the UAE for 2026. 0% personal income tax, GPSSA rules for UAE nationals, and expat salary breakdown.",
    h1: "UAE Salary Calculator 2026 (0% Personal Income Tax & GPSSA)",
    intro: "Compute your net take-home salary in Dubai, Abu Dhabi, and across the United Arab Emirates for calendar year 2026. Under published UAE federal labor and tax legislation, employment income is subject to 0% personal income tax, allowing workers to retain 100% of their earnings. Expatriate employees have zero mandatory social security or pension withholdings from their monthly paycheck. For UAE national employees, the statutory GPSSA pension contribution is 5% up to the AED 50,000 monthly contributory wage cap. Calculate monthly, weekly, and annual take-home figures with zero data storage. Estimated using published statutory rates, tax year 2026. Always confirm with the official source.",
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
    flagEmoji: "🇸🇦",
    metaTitle: "Saudi Arabia Salary Calculator 2026 – Net Pay & GOSI (0% Tax)",
    metaDescription: "Free Saudi Arabia salary calculator for 2026. 0% personal income tax, GOSI social insurance for Saudi nationals, and net pay breakdown.",
    h1: "Saudi Arabia Salary Calculator 2026 (0% Income Tax & GOSI)",
    intro: "Calculate your exact net salary and monthly take-home earnings in the Kingdom of Saudi Arabia for calendar year 2026. Under published Saudi tax regulations, employment wages and compensation packages are subject to 0% personal income tax. Expatriate professionals retain 100% of their gross contracted salary without social insurance deductions. For Saudi national employees, statutory General Organization for Social Insurance (GOSI) withholdings encompass the annuity pension (9.0%) and SANED unemployment scheme (0.75%), capped at the SAR 45,000 monthly wage ceiling. Estimated using published statutory rates, tax year 2026. Always confirm with the official source.",
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
    flagEmoji: "🇮🇪",
    metaTitle: "Ireland Salary Calculator 2026 – PAYE, USC & PRSI Take-Home Pay",
    metaDescription: "Calculate your net take-home salary in Ireland for 2026. Sourced from Revenue.ie with PAYE tax bands, personal tax credits, USC tiers, and PRSI.",
    h1: "Ireland Salary Calculator 2026 (PAYE, USC & PRSI)",
    intro: "Estimate your net take-home pay in the Republic of Ireland for tax year 2026 with our accurate, client-side calculator. Based on published Revenue Commissioners (Revenue.ie) rates, the tool models the standard single rate band (€44,000 at 20%, and 40% on the balance) alongside €4,000 in personal and employee tax credits. It precisely calculates the progressive Universal Social Charge (USC) tiers (0.5%, 2.0%, 3.0%, and 8.0%) and Class A Pay Related Social Insurance (PRSI at 4.1%), providing a comprehensive breakdown of monthly and annual disposable income. Estimated using published statutory rates, tax year 2026. Always confirm with the official source.",
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
    flagEmoji: "🇳🇿",
    metaTitle: "New Zealand Salary Calculator 2026–27 – PAYE & ACC Take-Home Pay",
    metaDescription: "Free New Zealand salary calculator for tax year 2026–27. Sourced from IRD with personal income tax brackets, ACC Earners' Levy, and net pay breakdown.",
    h1: "New Zealand Salary Calculator 2026–27 (IRD PAYE & ACC)",
    intro: "Calculate your estimated take-home pay in New Zealand for tax year 2026–27 (1 April 2026 – 31 March 2027). Sourced directly from published Inland Revenue Department (IRD) statutory schedules, the calculator incorporates the legislated tax brackets: 10.5% up to $15,600, 17.5% up to $53,500, 30% up to $78,100, 33% up to $180,000, and 39% on earnings above $180,000. Mandatory ACC Earners’ Levy (1.60% capped at maximum liable earnings) is automatically computed, delivering clear annual, fortnightly, weekly, and hourly pay figures. Estimated using published statutory rates, tax year 2026–27. Always confirm with the official source.",
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
    flagEmoji: "🇸🇬",
    metaTitle: "Singapore Salary Calculator 2026 – IRAS Tax & CPF Take-Home Pay",
    metaDescription: "Calculate net take-home salary in Singapore for YA 2026 / 2026. Sourced from IRAS with progressive tax brackets, CPF Ordinary Wage ceiling, and net breakdown.",
    h1: "Singapore Salary Calculator 2026 (IRAS Tax & CPF)",
    intro: "Calculate your net salary and monthly take-home pay in Singapore for calendar year 2026 / Year of Assessment (YA) 2026. Using published Inland Revenue Authority of Singapore (IRAS) resident progressive tax brackets, the first S$20,000 is completely tax-free, with gradual marginal tiers from 2% up to 24%. For Singapore Citizens and Permanent Residents aged 55 and below, employee Central Provident Fund (CPF) contributions are computed at 20% up to the statutory Ordinary Wage monthly ceiling ($7,400/month = $88,800/year ceiling), providing clear net income insights. Estimated using published statutory rates, tax year YA 2026. Always confirm with the official source.",
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
    flagEmoji: "🇳🇱",
    metaTitle: "Netherlands Salary Calculator 2026 – Bruto Netto Box 1 (Free)",
    metaDescription: "Calculate Dutch net salary (bruto naar netto) for 2026. Sourced from Belastingdienst with Box 1 tax brackets, algemene heffingskorting, and arbeidskorting.",
    h1: "Netherlands Salary Calculator 2026 (Bruto Netto Rechner)",
    intro: "Convert your gross Dutch salary to net take-home earnings (bruto naar netto) for calendar year 2026 with our private online calculator. Sourced from the Belastingdienst (Dutch Tax Administration) published rates, the calculation integrates Box 1 progressive income tax and national social insurance (volksverzekeringen): 35.82% up to €38,441, 37.48% up to €76,817, and 49.50% above €76,817. Key statutory tax credits including the General Tax Credit (Algemene heffingskorting) and Labor Tax Credit (Arbeidskorting) are factored in automatically. Estimated using published statutory rates, tax year 2026. Always confirm with the official source.",
    faqList: [
      [
        "What are the Box 1 income tax brackets in the Netherlands for 2026?",
        "Box 1 features three progressive brackets: Tier 1 at 35.82% on taxable income up to €38,441; Tier 2 at 37.48% between €38,441 and €76,817; and Tier 3 at 49.50% on all income above €76,817.",
      ],
      [
        "How do Dutch tax credits (heffingskortingen) affect my take-home pay?",
        "The Algemene heffingskorting (general tax credit up to €3,068) and Arbeidskorting (labor tax credit up to €5,599) directly reduce the amount of income tax and social insurance deducted from your gross wage.",
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
    flagEmoji: "🇿🇦",
    metaTitle: "South Africa Salary Calculator 2026–27 – SARS PAYE & Net Pay",
    metaDescription: "Free South African salary calculator for 2026–27. Sourced from SARS with personal income tax brackets, primary rebate, UIF contribution, and net pay.",
    h1: "South Africa Salary Calculator 2026–27 (SARS PAYE & UIF)",
    intro: "Calculate your estimated net monthly salary and take-home pay in South Africa for tax year 2026–27 (1 March 2026 – 28 February 2027). Under published South African Revenue Service (SARS) PAYE tax tables, progressive marginal tax rates span from 18% up to 45%. The statutory primary tax rebate (R17,235) is applied automatically to determine your net tax liability, while mandatory Unemployment Insurance Fund (UIF) contributions (1% capped at R177.12 per month) are factored into total deductions. Estimated using published statutory rates, tax year 2026–27. Always confirm with the official source.",
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
