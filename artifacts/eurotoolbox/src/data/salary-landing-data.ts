export interface SalaryCurrency {
  code: string;
  symbol: string;
  label: string;
}

export const SALARY_CURRENCIES: SalaryCurrency[] = [
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'AED', symbol: 'AED', label: 'AED (Dirham)' },
  { code: 'SAR', symbol: 'SAR', label: 'SAR (Riyal)' },
  { code: 'PKR', symbol: '₨', label: 'PKR (₨)' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
];

export interface SalaryWorkedExample {
  title: string;
  description: string;
  math: string;
  result: string;
  formula: string;
}

export const MAIN_SALARY_EXAMPLES: SalaryWorkedExample[] = [
  {
    title: 'Example 1: Annual to Monthly Salary Conversion',
    description: 'Convert an annual gross offer of $36,000 into a monthly gross figure.',
    math: '$36,000 ÷ 12 months',
    result: '$3,000.00 / month gross',
    formula: 'Monthly Gross = Annual Gross ÷ 12 = 36,000 ÷ 12 = 3,000.00',
  },
  {
    title: 'Example 2: Net Take-Home Pay with 20% Deductions',
    description: 'Calculate net take-home pay from $3,000 monthly gross after tax deductions.',
    math: '$3,000 × (1 − 0.20) = $3,000 × 0.80',
    result: '$2,400.00 / month net',
    formula: 'Net Salary = Gross × (1 − Deduction%) = 3,000 × (1 − 0.20) = 2,400.00',
  },
  {
    title: 'Example 3: Hourly Wage to Weekly & Annual Salary',
    description: 'Convert $15.00/hour at standard full-time hours (40 hrs/week, 52 weeks).',
    math: '$15.00 × 40 hours = $600/week; $600 × 52 weeks = $31,200/year',
    result: '$600.00 / week ($31,200.00 / year)',
    formula: 'Weekly = Hourly × Hours/Week = 15 × 40 = 600.00',
  },
];

export interface SalaryLandingPageData {
  slug: string;
  canonicalPath: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  defaultMode: 'gross-to-net' | 'converter' | 'basic-breakdown';
  initialAmount: string;
  initialPeriod: 'Hourly' | 'Weekly' | 'Monthly' | 'Annual';
  intro: string;
  quickAnswer: string;
  coreGuideTitle: string;
  coreGuideText: string[];
  workedExamples: SalaryWorkedExample[];
  faqs: { question: string; answer: string }[];
}

export const SALARY_LANDING_PAGES: Record<string, SalaryLandingPageData> = {
  'monthly-salary-calculator': {
    slug: 'monthly-salary-calculator',
    canonicalPath: '/monthly-salary-calculator/',
    metaTitle: 'Monthly Salary Calculator – Gross Monthly to Net Take-Home Pay',
    metaDescription: 'Calculate monthly salary after tax and statutory deductions. Estimate take-home pay from your monthly gross income across published tax brackets.',
    h1: 'Monthly Salary Calculator (Gross Monthly to Net)',
    defaultMode: 'gross-to-net',
    initialAmount: '3500',
    initialPeriod: 'Monthly',
    intro: 'Estimate your monthly salary after tax and mandatory contributions. Enter your gross monthly pay to view estimated take-home pay, statutory deductions, and annualized pay breakdowns.',
    quickAnswer: 'To find your net monthly take-home pay, calculate your gross monthly pay (£3,500 in this example), deduct statutory income tax (£490.50/mo under HMRC 2026/27 basic rates) and national insurance (£196.20/mo), yielding £2,813.30 net per month.',
    coreGuideTitle: 'How to Calculate Monthly Salary After Tax and Deductions',
    coreGuideText: [
      'Your monthly net salary represents the actual cash deposited into your bank account each pay cycle after income taxes and mandatory social contributions are withheld.',
      'To convert a gross monthly compensation figure to take-home pay, statutory income taxes and employee social insurance contributions are evaluated against published statutory tax brackets.',
      'For example, on a gross monthly salary of £3,500 in the UK (£42,000 annual gross), your standard personal allowance covers the first £12,570 tax-free. Taxable income of £29,430 is taxed at 20% (£5,886 annually, or £490.50 monthly). Employee National Insurance at 8% above the primary threshold adds £196.20 monthly (£2,354.40 annually), leaving £2,813.30 monthly net take-home pay.',
    ],
    workedExamples: [
      {
        title: 'Example 1: £3,500 Gross Monthly (UK PAYE & Class 1 NI)',
        description: 'Standard UK employment contract with standard £12,570 tax-free personal allowance.',
        math: 'Gross: £3,500.00/mo (£42,000/yr); Income Tax: £490.50/mo; Class 1 NI: £196.20/mo',
        result: '£2,813.30 / month net (£33,759.60 / year net)',
        formula: 'Net Monthly = Gross (£3,500.00) − PAYE Tax (£490.50) − NI (£196.20) = £2,813.30',
      },
      {
        title: 'Example 2: $5,000 Gross Monthly (US Federal & FICA)',
        description: 'Single filer in the United States earning $60,000 annually with $15,000 standard deduction.',
        math: 'Gross: $5,000.00/mo ($60,000/yr); Federal Tax: $430.13/mo; FICA (7.65%): $382.50/mo',
        result: '$4,187.38 / month net ($50,248.50 / year net)',
        formula: 'Net Monthly = Gross ($5,000.00) − Federal Tax ($430.13) − FICA ($382.50) = $4,187.38',
      },
      {
        title: 'Example 3: €4,000 Gross Monthly (Germany Tax Class I & Social Security)',
        description: 'Single employee in Germany earning €48,000 annually with full statutory social contributions.',
        math: 'Gross: €4,000.00/mo (€48,000/yr); Income Tax: €858.87/mo; Statutory Social (21.8%): €872.00/mo',
        result: '€2,269.13 / month net (€27,229.59 / year net)',
        formula: 'Net Monthly = Gross (€4,000.00) − Lohnsteuer (€858.87) − Social (€872.00) = €2,269.13',
      },
    ],
    faqs: [
      {
        question: 'How do I calculate monthly salary after tax from a gross monthly offer?',
        answer: 'Annualize your monthly gross (monthly × 12), apply your national revenue authority tax brackets and personal allowances, subtract statutory social security or national insurance, then divide the resulting net annual total by 12.',
      },
      {
        question: 'How many working hours are in an average month?',
        answer: 'Based on a standard 40-hour work week and 52 weeks per year (2,080 annual hours), the average working month contains 2,080 ÷ 12 = 173.33 hours.',
      },
      {
        question: 'Why does dividing an annual salary by 52 and multiplying by 4 not equal monthly salary?',
        answer: 'Because most months contain 30 or 31 days (roughly 4.33 weeks). Multiplying weekly pay by 4 accounts for only 48 weeks, missing roughly four weeks of compensation across the calendar year.',
      },
      {
        question: 'Can I calculate monthly salary in different currencies?',
        answer: 'Yes. You can select GBP (£), EUR (€), USD ($), CAD, AUD, AED, SAR, PKR (₨), INR (₹), and more to calculate take-home pay in your domestic currency.',
      },
      {
        question: 'Are my monthly salary calculations kept private?',
        answer: 'Yes. All payroll calculations execute entirely client-side in your web browser with zero server logging or data storage.',
      },
    ],
  },

  'hourly-to-salary-calculator': {
    slug: 'hourly-to-salary-calculator',
    canonicalPath: '/hourly-to-salary-calculator/',
    metaTitle: 'Hourly to Salary Calculator – Convert Hourly Wage to Weekly & Annual Pay',
    metaDescription: 'Convert hourly wage to weekly, monthly, and annual salary. Calculate total gross earnings and estimated take-home pay based on your work schedule.',
    h1: 'Hourly to Salary Calculator (Hourly Rate to Weekly, Monthly & Yearly Pay)',
    defaultMode: 'converter',
    initialAmount: '25',
    initialPeriod: 'Hourly',
    intro: 'Convert your hourly wage into equivalent weekly, monthly, and annual gross and net salary. Adjust working hours per week and weeks worked per year to project your full yearly earnings.',
    quickAnswer: 'A pay rate of $25.00/hour at standard full-time hours (40 hours/week, 52 weeks/year) equals $1,000.00 weekly, $4,333.33 monthly gross, and $52,000.00 gross annual salary.',
    coreGuideTitle: 'How to Convert Hourly Wage into Annual, Monthly, and Weekly Salary',
    coreGuideText: [
      'Converting an hourly wage into an annual salary depends on your weekly scheduled hours (standard full-time is 40 hours) and total working weeks per year (typically 52).',
      'For a standard full-time schedule (40 hours per week × 52 weeks = 2,080 hours per year), multiply your hourly rate by 2,080 to determine your gross annual salary. Doubling your hourly rate and adding three zeros provides a quick annual estimate ($25/hr × 2 = 50 → ~$50,000 to $52,000/yr).',
      'To calculate monthly gross earnings from an hourly rate, divide your gross annual compensation by 12. For instance, $25.00/hour yields $52,000 annual gross, which equals $4,333.33 gross per month.',
    ],
    workedExamples: [
      {
        title: 'Example 1: $25.00/Hour Full-Time (40 hrs/week, 52 weeks)',
        description: 'Standard full-time wage conversion across weekly, monthly, and yearly timeframes.',
        math: '$25 × 40 = $1,000.00/wk; $1,000 × 52 = $52,000.00/yr; $52,000 ÷ 12 = $4,333.33/mo',
        result: '$1,000.00 / week ($52,000.00 / year gross)',
        formula: 'Annual = Hourly ($25.00) × 40 hrs × 52 wks = $52,000.00',
      },
      {
        title: 'Example 2: £18.50/Hour UK Full-Time (37.5 hrs/week, 52 weeks)',
        description: 'Standard UK 37.5-hour working week conversion.',
        math: '£18.50 × 37.5 = £693.75/wk; £693.75 × 52 = £36,075.00/yr; £36,075 ÷ 12 = £3,006.25/mo',
        result: '£693.75 / week (£36,075.00 / year gross)',
        formula: 'Annual = Hourly (£18.50) × 37.5 hrs × 52 wks = £36,075.00',
      },
      {
        title: 'Example 3: €30.00/Hour Contractor (35 hrs/week, 48 billable weeks)',
        description: 'Contractor or freelance schedule with 4 weeks of unpaid vacation or downtime.',
        math: '€30 × 35 = €1,050.00/wk; €1,050 × 48 = €50,400.00/yr; €50,400 ÷ 12 = €4,200.00/mo',
        result: '€1,050.00 / week (€50,400.00 / year gross)',
        formula: 'Annual = Hourly (€30.00) × 35 hrs × 48 wks = €50,400.00',
      },
    ],
    faqs: [
      {
        question: 'How do you convert an hourly wage to an annual salary?',
        answer: 'Multiply your hourly rate by the number of hours worked per week, then multiply by the total weeks worked per year. For a 40-hour week over 52 weeks: Hourly Rate × 2,080 = Annual Salary.',
      },
      {
        question: 'What is $25 an hour annually?',
        answer: 'At 40 hours per week for 52 weeks, $25 an hour equals $52,000 a year before taxes ($1,000 weekly, or $4,333.33 monthly).',
      },
      {
        question: 'How do unpaid holidays or vacation weeks affect annual earnings?',
        answer: 'Adjust your working weeks per year. If you take 2 weeks of unpaid leave, multiply your weekly earnings by 50 weeks instead of 52.',
      },
      {
        question: 'How do I convert an hourly wage to daily earnings?',
        answer: 'Multiply your hourly rate by your daily scheduled hours. For example, at $25/hour and 8 hours per day, daily gross pay is $200.00.',
      },
      {
        question: 'How is overtime calculated on hourly wages?',
        answer: 'In most jurisdictions, overtime beyond 40 hours per week is compensated at 1.5 times the regular hourly rate (time-and-a-half).',
      },
    ],
  },

  'annual-to-monthly-salary-calculator': {
    slug: 'annual-to-monthly-salary-calculator',
    canonicalPath: '/annual-to-monthly-salary-calculator/',
    metaTitle: 'Annual to Monthly Salary Calculator – Yearly Package to Monthly Gross & Net',
    metaDescription: 'Convert your annual salary package into monthly gross and net take-home pay. Compare job offers and monthly budgets with statutory tax deductions.',
    h1: 'Annual to Monthly Salary Calculator (Yearly Package to Monthly Gross & Net)',
    defaultMode: 'gross-to-net',
    initialAmount: '48000',
    initialPeriod: 'Annual',
    intro: 'Convert a yearly compensation package into precise monthly gross earnings and estimated take-home net income. Evaluate employment offers and plan household budgets with statutory payroll taxes.',
    quickAnswer: 'An annual compensation package of £60,000 equals £5,000.00 monthly gross. After statutory UK deductions (£952.67 income tax and £267.55 National Insurance), estimated take-home pay is £3,779.78 net per month.',
    coreGuideTitle: 'How to Convert an Annual Compensation Package into Monthly Gross and Net Pay',
    coreGuideText: [
      'When reviewing an employment contract or job offer quoted as an annual compensation package, finding your gross monthly pay begins by dividing the total figure by 12.',
      'Formula: Gross Monthly Salary = Annual Salary ÷ 12. On a £60,000 annual package, your gross monthly pay is £5,000.00.',
      'To determine actual net cash deposited each month, statutory tax brackets, personal allowances, and social insurance deductions are applied on an annual basis, and the net result is divided across 12 monthly payments.',
    ],
    workedExamples: [
      {
        title: 'Example 1: £60,000 UK Annual Package to Monthly Gross & Net',
        description: 'Higher-rate UK taxpayer with £12,570 personal allowance and Class 1 National Insurance.',
        math: 'Annual Gross: £60,000; Monthly Gross: £5,000.00; PAYE Tax: £952.67/mo; NI: £267.55/mo',
        result: '£5,000.00 gross / £3,779.78 net monthly (£45,357.40 net annual)',
        formula: 'Monthly Net = (£60,000 ÷ 12) − (£11,432 Tax ÷ 12) − (£3,210.60 NI ÷ 12) = £3,779.78',
      },
      {
        title: 'Example 2: $100,000 US Annual Salary Package to Monthly Pay',
        description: 'US single filer with $15,000 standard deduction, federal tax brackets, and 7.65% FICA.',
        math: 'Annual Gross: $100,000; Monthly Gross: $8,333.33; Federal Tax: $1,134.50/mo; FICA: $637.50/mo',
        result: '$8,333.33 gross / $6,561.33 net monthly ($78,736.00 net annual)',
        formula: 'Monthly Net = ($100,000 ÷ 12) − ($13,614 Tax ÷ 12) − ($7,650 FICA ÷ 12) = $6,561.33',
      },
      {
        title: 'Example 3: €48,000 German Annual Package to Monthly Pay',
        description: 'German employee (Tax Class I) with statutory pension, health, and unemployment contributions.',
        math: 'Annual Gross: €48,000; Monthly Gross: €4,000.00; Income Tax: €858.87/mo; Social: €872.00/mo',
        result: '€4,000.00 gross / €2,269.13 net monthly (€27,229.59 net annual)',
        formula: 'Monthly Net = (€48,000 ÷ 12) − (€10,306.41 Tax ÷ 12) − (€10,464 Social ÷ 12) = €2,269.13',
      },
    ],
    faqs: [
      {
        question: 'What is the formula to convert annual salary to monthly pay?',
        answer: 'Monthly Gross = Annual Gross ÷ 12. For take-home pay: Monthly Net = (Annual Gross − Annual Income Tax − Annual Social Contributions) ÷ 12.',
      },
      {
        question: 'What is a £60,000 annual salary per month after tax in the UK?',
        answer: 'A £60,000 annual salary equals £5,000.00 gross per month. Under UK 2026/27 tax rates, estimated take-home pay is £3,779.78 per month after £952.67 income tax and £267.55 National Insurance.',
      },
      {
        question: 'Do annual salary figures include bonuses and benefits?',
        answer: 'Standard annual salary quotes refer to fixed base pay. Discretionary bonuses, equity grants, and non-cash benefits are generally excluded unless contracted as fixed cash stipends.',
      },
      {
        question: 'How do bi-weekly pay schedules compare to monthly pay?',
        answer: 'Bi-weekly payroll pays every two weeks (26 pay periods per year), meaning two months per year include three paychecks. Monthly payroll pays exactly 12 equal times per year.',
      },
      {
        question: 'Can I calculate annual to monthly salary for multiple countries?',
        answer: 'Yes. You can switch between 15 country tax systems including the UK, US, Canada, Australia, Germany, UAE, and custom percentage modes.',
      },
    ],
  },

  'basic-salary-calculator': {
    slug: 'basic-salary-calculator',
    canonicalPath: '/basic-salary-calculator/',
    metaTitle: 'Basic Salary Calculator – Basic Salary Plus Allowances to Gross & Net',
    metaDescription: 'Calculate basic salary plus housing, transport, and utility allowances. Determine total gross salary and take-home net pay for employment contracts.',
    h1: 'Basic Salary Calculator (Basic Pay Plus Allowances to Gross & Net)',
    defaultMode: 'basic-breakdown',
    initialAmount: '4000',
    initialPeriod: 'Monthly',
    intro: 'Calculate how basic salary and allowances (housing, transportation, utilities) combine into total gross pay and estimated net take-home salary. Designed for international employment contracts and corporate compensation structures.',
    quickAnswer: 'On an employment contract with a basic salary of AED 10,000 plus 40% allowances (AED 4,000 housing and transport), total gross pay is AED 14,000 monthly. In tax-free regimes like the UAE, take-home pay is AED 14,000.00.',
    coreGuideTitle: 'Understanding Basic Salary, Allowances, Gross Pay, and Net Take-Home',
    coreGuideText: [
      'In many international employment contracts—particularly across the UAE, Saudi Arabia, the UK, and South Asia—remuneration is partitioned into a Basic Salary and specific statutory or contractual allowances.',
      'Allowances typically include housing allowances, transport stipends, mobile subsidies, and utility reimbursements. The basic salary component is vital because end-of-service benefits, gratuity, severance packages, and pension contributions are legally tied to basic pay rather than total gross compensation.',
      'Formulas: Total Allowances = Basic Salary × (Allowances % ÷ 100). Gross Salary = Basic Salary + Total Allowances. Net Salary = Gross Salary − Statutory Deductions.',
    ],
    workedExamples: [
      {
        title: 'Example 1: AED 10,000 Basic + 40% Allowances (UAE Contract Structure)',
        description: 'Standard UAE corporate package with basic pay plus housing and transport allowances.',
        math: 'Basic: AED 10,000; Allowances (40%): AED 4,000; Gross: AED 14,000; Deductions: AED 0 (Tax-free)',
        result: 'Gross: AED 14,000.00 / Net: AED 14,000.00 monthly',
        formula: 'Total Gross = Basic (10,000) + Allowances (4,000) = AED 14,000.00',
      },
      {
        title: 'Example 2: SAR 12,000 Basic + 35% Allowances (Saudi Arabia Structure)',
        description: 'Saudi employment contract with basic salary plus housing/transport stipends.',
        math: 'Basic: SAR 12,000; Allowances (35%): SAR 4,200; Gross: SAR 16,200; Deductions: SAR 0 (Tax-free)',
        result: 'Gross: SAR 16,200.00 / Net: SAR 16,200.00 monthly',
        formula: 'Total Gross = Basic (12,000) + Allowances (4,200) = SAR 16,200.00',
      },
      {
        title: 'Example 3: £3,000 Basic + £600 Allowances (20% UK Contract)',
        description: 'UK contract with £3,000 basic plus £600 travel/car allowance under standard PAYE/NI.',
        math: 'Basic: £3,000; Allowances (20%): £600; Gross: £3,600/mo (£43,200/yr); Tax & NI: £713.37/mo',
        result: 'Gross: £3,600.00 / Net: £2,886.63 monthly (£34,639.60/yr net)',
        formula: 'Net = Gross (£3,600.00) − PAYE Tax (£510.50) − NI (£202.87) = £2,886.63',
      },
    ],
    faqs: [
      {
        question: 'What is basic salary and how does it differ from gross salary?',
        answer: 'Basic salary is the fixed core rate of pay stated in your contract before adding allowances, overtime, or bonuses. Gross salary is the sum of your basic salary plus all cash allowances and variable earnings.',
      },
      {
        question: 'Why do employers split pay into basic salary and allowances?',
        answer: 'Statutory liabilities such as end-of-service gratuity, severance pay, and mandatory retirement contributions are frequently calculated strictly from basic salary, reducing long-term employer liabilities.',
      },
      {
        question: 'What is a typical basic salary to allowance split?',
        answer: 'In the Middle East and many corporate structures, basic salary represents approximately 60% of total compensation, with housing and transport allowances accounting for the remaining 40%.',
      },
      {
        question: 'Are allowances subject to income tax?',
        answer: 'In countries with personal income tax (such as the UK, US, or Canada), cash allowances are typically treated as taxable gross employment income. In tax-free jurisdictions (UAE, Saudi Arabia), allowances are not taxed.',
      },
      {
        question: 'How do deductions apply to basic vs gross salary?',
        answer: 'In most tax systems, income tax and social insurance deductions are levied on your total gross earnings, not solely on the basic component.',
      },
    ],
  },

  'net-salary-calculator': {
    slug: 'net-salary-calculator',
    canonicalPath: '/net-salary-calculator/',
    metaTitle: 'Net Salary Calculator – Take-Home Pay Breakdown After Tax & Pension',
    metaDescription: 'Calculate take-home pay after income tax, social security contributions, and pension deductions. Detailed net salary breakdown across annual and monthly pay.',
    h1: 'Net Salary Calculator (Take-Home Pay Breakdown After Tax, Social & Pension)',
    defaultMode: 'gross-to-net',
    initialAmount: '4500',
    initialPeriod: 'Monthly',
    intro: 'Calculate your exact net take-home salary after deducting personal income taxes, statutory social contributions, and pension payments. View clear net pay figures across annual, monthly, weekly, and daily periods.',
    quickAnswer: 'On an annual gross salary of £35,000 in the UK, statutory deductions total £6,280.40 (£4,486.00 income tax and £1,794.40 National Insurance), leaving an annual net take-home pay of £28,719.60 (£2,393.30 net per month).',
    coreGuideTitle: 'How to Calculate Net Take-Home Pay from Gross Salary',
    coreGuideText: [
      'Gross salary is the headline figure stated in an offer letter or contract. Net salary is the actual disposable income deposited into your bank account after all mandatory statutory deductions are subtracted.',
      'Statutory deductions typically comprise national or federal income taxes, state or provincial taxes, mandatory social insurance (such as National Insurance, FICA, or statutory health/pension contributions), and retirement plans.',
      'Formula: Net Salary = Gross Salary − Statutory Income Tax − Social Insurance / Pension Contributions. For example, on a £35,000 UK annual salary, deductions total £6,280.40, leaving £28,719.60 net take-home pay (£2,393.30 monthly).',
    ],
    workedExamples: [
      {
        title: 'Example 1: £35,000 UK Annual Gross (PAYE & National Insurance)',
        description: 'Standard UK salary with £12,570 personal allowance, 20% basic rate tax, and 8% Class 1 NI.',
        math: 'Gross: £35,000/yr (£2,916.67/mo); PAYE Tax: £4,486.00/yr; Class 1 NI: £1,794.40/yr',
        result: '£2,393.30 / month net (£28,719.60 / year net)',
        formula: 'Net Annual = £35,000 − £4,486.00 (Tax) − £1,794.40 (NI) = £28,719.60',
      },
      {
        title: 'Example 2: A$80,000 Australian Annual Gross (ATO Tax & Medicare Levy)',
        description: 'Australian resident with stage 3 revised brackets and 2% Medicare levy.',
        math: 'Gross: A$80,000/yr (A$6,666.67/mo); Income Tax: A$14,788.00/yr; Medicare (2%): A$1,600.00/yr',
        result: 'A$5,301.00 / month net (A$63,612.00 / year net)',
        formula: 'Net Annual = A$80,000 − A$14,788.00 (Tax) − A$1,600.00 (Medicare) = A$63,612.00',
      },
      {
        title: 'Example 3: C$65,000 Canadian Annual Gross (Federal Tax, CPP & EI)',
        description: 'Canadian employee with federal basic personal amount, CPP pension, and EI contributions.',
        math: 'Gross: C$65,000/yr (C$5,416.67/mo); Federal Tax: C$7,750.63/yr; CPP & EI: C$4,725.25/yr',
        result: 'C$4,377.01 / month net (C$52,524.13 / year net)',
        formula: 'Net Annual = C$65,000 − C$7,750.63 (Tax) − C$4,725.25 (CPP/EI) = C$52,524.13',
      },
    ],
    faqs: [
      {
        question: 'What is the exact difference between gross and net salary?',
        answer: 'Gross salary is your total compensation before any taxes or deductions are applied. Net salary is your actual take-home income after all mandatory taxes, social security contributions, and retirement deductions are removed.',
      },
      {
        question: 'Which deductions reduce gross salary to net pay?',
        answer: 'Mandatory deductions usually include federal/national income tax, regional/state tax, social insurance (e.g. National Insurance, FICA, CPP), and mandatory pension or healthcare levies.',
      },
      {
        question: 'Can my net take-home pay change over the course of the tax year?',
        answer: 'Yes. Take-home pay can vary if you reach social contribution annual caps (such as FICA or CPP limits), cross progressive tax thresholds, or adjust voluntary pension contributions.',
      },
      {
        question: 'How do personal allowances and standard deductions affect net salary?',
        answer: 'A standard allowance or tax-free threshold exempts a set portion of your income from income tax, directly increasing your net take-home pay.',
      },
      {
        question: 'Is this calculation confidential?',
        answer: 'Yes. All salary calculations are processed locally in your browser without transmitting your personal figures to external servers.',
      },
    ],
  },
};

