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
  coreGuideTitle: string;
  coreGuideText: string[];
  workedExamples: SalaryWorkedExample[];
  faqs: { question: string; answer: string }[];
}

export const SALARY_LANDING_PAGES: Record<string, SalaryLandingPageData> = {
  'monthly-salary-calculator': {
    slug: 'monthly-salary-calculator',
    canonicalPath: '/monthly-salary-calculator/',
    metaTitle: 'Monthly Salary Calculator – Take-Home Pay | LoveEasyTool',
    metaDescription: 'Free monthly salary calculator. Convert monthly earnings to net take-home pay, annual income, weekly wages, and hourly rates. Fast and private.',
    h1: 'Monthly Salary Calculator',
    defaultMode: 'gross-to-net',
    initialAmount: '3500',
    initialPeriod: 'Monthly',
    intro: 'Calculate your exact monthly gross salary, estimated deductions (tax and pension), and take-home pay. Convert monthly pay into annual, weekly, daily, and hourly earnings with custom deduction percentages.',
    coreGuideTitle: 'How to Calculate Monthly Salary and Take-Home Pay',
    coreGuideText: [
      'Your monthly salary forms the bedrock of household budgeting, loan applications, and personal savings plans. If you are quoted an annual compensation package, finding your gross monthly pay is simple: divide the annual figure by 12.',
      'To determine your net monthly take-home pay, identify your effective deduction percentage—including income tax, national insurance or social security, and retirement pension contributions.',
      'Multiply your gross monthly salary by (1 − Total Deduction Percentage ÷ 100). For example, on a gross monthly salary of $3,500 with 22% total deductions: $3,500 × (1 − 0.22) = $3,500 × 0.78 = $2,730.00 net monthly take-home.',
    ],
    workedExamples: [
      {
        title: 'Example 1: $3,500 Monthly with 20% Tax Deduction',
        description: 'Standard single employee take-home pay calculation.',
        math: '$3,500 × (1 − 0.20) = $3,500 × 0.80',
        result: '$2,800.00 net monthly ($33,600.00 net annual)',
        formula: 'Net = 3,500 × 0.80 = 2,800.00',
      },
      {
        title: 'Example 2: Converting $4,000 Monthly to Hourly Rate',
        description: 'Calculating the implied hourly rate for a 40-hour work week (173.33 monthly hours).',
        math: '($4,000 × 12) ÷ (52 weeks × 40 hours) = $48,000 ÷ 2,080',
        result: '$23.08 / hour gross',
        formula: 'Hourly = (Monthly × 12) ÷ 2,080 = 23.08',
      },
      {
        title: 'Example 3: $5,000 Monthly with 25% Tax and 5% Pension',
        description: 'Combined deductions totaling 30% on executive monthly compensation.',
        math: '$5,000 × (1 − (0.25 + 0.05)) = $5,000 × 0.70',
        result: '$3,500.00 net monthly ($1,500.00 deductions)',
        formula: 'Net = 5,000 × (1 − 0.30) = 3,500.00',
      },
    ],
    faqs: [
      {
        question: 'How do I calculate monthly salary from an annual salary offer?',
        answer: 'Divide the annual salary by 12. For instance, an annual salary of $60,000 equals $60,000 ÷ 12 = $5,000 gross per month.',
      },
      {
        question: 'How many working hours are there in an average month?',
        answer: 'Assuming a standard 40-hour work week and 52 weeks per year (2,080 annual hours), the average month has 2,080 ÷ 12 = 173.33 working hours.',
      },
      {
        question: 'Why doesn’t dividing an annual salary by 52 and multiplying by 4 equal monthly salary?',
        answer: 'Because a month is not exactly 4 weeks (except February in non-leap years). Most months have 30 or 31 days (approx. 4.33 weeks). Multiplying a weekly salary by 4 ignores nearly a month of pay every year.',
      },
      {
        question: 'Can I select different currencies like GBP, EUR, or AED?',
        answer: 'Yes! Use our currency dropdown to switch symbols between GBP (£), EUR (€), USD ($), AED, SAR, PKR (₨), and INR (₹) without affecting the math.',
      },
      {
        question: 'Is my salary data kept private?',
        answer: 'Yes. All calculations happen locally inside your web browser with zero server transmission or logging.',
      },
    ],
  },

  'hourly-to-salary-calculator': {
    slug: 'hourly-to-salary-calculator',
    canonicalPath: '/hourly-to-salary-calculator/',
    metaTitle: 'Hourly to Salary Calculator – Convert Wages | LoveEasyTool',
    metaDescription: 'Convert hourly wage to annual salary, monthly income, and weekly earnings. Adjust hours per week and weeks per year. Free, private, and client-side.',
    h1: 'Hourly to Salary Calculator',
    defaultMode: 'converter',
    initialAmount: '25',
    initialPeriod: 'Hourly',
    intro: 'Convert your hourly pay rate into equivalent weekly, monthly, and annual salaries. Customize your weekly working hours and annual working weeks to see exactly what an hourly wage equals over a full year.',
    coreGuideTitle: 'How to Convert Hourly Wage into Annual and Monthly Salary',
    coreGuideText: [
      'Converting an hourly wage into an annual salary depends on two core variables: how many hours you work each week (typically 40 for full-time work) and how many weeks you work each year (typically 52).',
      'Under a standard full-time schedule (40 hours per week × 52 weeks = 2,080 hours per year), multiply your hourly rate by 2,080 to get your gross annual salary. A quick mental shortcut is to double your hourly rate and add three zeros ($25/hr × 2 = 50 → ~$50,000/yr).',
      'To find your monthly earnings from an hourly wage, take the annual total and divide by 12. For example, $25.00/hour: Annual is $25 × 2,080 = $52,000.00. Monthly is $52,000 ÷ 12 = $4,333.33 gross per month.',
    ],
    workedExamples: [
      {
        title: 'Example 1: $20.00/Hour Full-Time (40 hrs/wk, 52 wks)',
        description: 'Standard full-time employment conversion.',
        math: '$20 × 40 = $800/wk; $800 × 52 = $41,600/yr; $41,600 ÷ 12 = $3,466.67/mo',
        result: '$41,600.00 / year ($3,466.67 / month)',
        formula: 'Annual = 20 × 40 × 52 = 41,600.00',
      },
      {
        title: 'Example 2: $30.00/Hour Part-Time (25 hrs/wk, 50 wks)',
        description: 'Part-time freelance contractor with 2 unpaid vacation weeks.',
        math: '$30 × 25 = $750/wk; $750 × 50 = $37,500/yr; $37,500 ÷ 12 = $3,125.00/mo',
        result: '$37,500.00 / year ($3,125.00 / month)',
        formula: 'Annual = 30 × 25 × 50 = 37,500.00',
      },
      {
        title: 'Example 3: $15.00/Hour Minimum Wage Benchmark',
        description: 'Evaluating entry-level full-time yearly gross earnings.',
        math: '$15 × 40 = $600/wk; $600 × 52 = $31,200/yr; $31,200 ÷ 12 = $2,600.00/mo',
        result: '$31,200.00 / year ($2,600.00 / month)',
        formula: 'Annual = 15 × 40 × 52 = 31,200.00',
      },
    ],
    faqs: [
      {
        question: 'How do you convert an hourly wage to an annual salary?',
        answer: 'Multiply the hourly wage by the hours worked per week, then multiply by the number of weeks worked per year. For 40 hours/week over 52 weeks: Hourly Rate × 2,080 = Annual Salary.',
      },
      {
        question: 'What is $25 an hour annually?',
        answer: 'At 40 hours per week for 52 weeks, $25 an hour equals $52,000 a year before taxes ($1,000 weekly, or $4,333.33 monthly).',
      },
      {
        question: 'What if I take unpaid holidays or vacation?',
        answer: 'Simply adjust the "Weeks per year" input in our converter. If you take 2 weeks of unpaid leave, set weeks per year to 50 instead of 52.',
      },
      {
        question: 'How do I convert an hourly wage to daily pay?',
        answer: 'Multiply the hourly rate by your daily working hours (usually 8 hours). For example, $20/hr × 8 hours = $160 per day.',
      },
      {
        question: 'Does this calculator factor in overtime rates (1.5x)?',
        answer: 'This tool computes base scheduled hours. If you work overtime, you can calculate overtime hours separately at 1.5x base pay or use our converter with adjusted effective blended rates.',
      },
    ],
  },

  'annual-to-monthly-salary-calculator': {
    slug: 'annual-to-monthly-salary-calculator',
    canonicalPath: '/annual-to-monthly-salary-calculator/',
    metaTitle: 'Annual to Monthly Salary Calculator | LoveEasyTool',
    metaDescription: 'Free annual to monthly salary calculator. Convert yearly compensation to monthly gross and net take-home pay with deductions. Private & instant.',
    h1: 'Annual to Monthly Salary Calculator',
    defaultMode: 'gross-to-net',
    initialAmount: '48000',
    initialPeriod: 'Annual',
    intro: 'Convert your annual salary into accurate monthly gross pay and take-home net income. Compare job offers, salary packages, and monthly budgeting requirements with customizable tax and benefit deductions.',
    coreGuideTitle: 'How to Calculate Monthly Salary from an Annual Salary',
    coreGuideText: [
      'Converting an annual compensation figure into a monthly pay amount is one of the most common career calculations. In its simplest form, the gross monthly salary equals your annual salary divided by 12.',
      'Formula: Gross Monthly Salary = Annual Salary ÷ 12. For example, a $48,000 annual salary yields $48,000 ÷ 12 = $4,000.00 gross per month.',
      'To calculate your actual net take-home pay, subtract your applicable tax deductions and pension contributions: Net Monthly = (Annual Gross ÷ 12) × (1 − Deduction % ÷ 100). With 20% deductions on $48k/yr: $4,000 × 0.80 = $3,200.00 net monthly.',
    ],
    workedExamples: [
      {
        title: 'Example 1: $48,000 Annual Salary with 20% Tax',
        description: 'Mid-level professional compensation package.',
        math: '$48,000 ÷ 12 = $4,000 monthly gross; $4,000 × (1 − 0.20) = $3,200',
        result: '$4,000.00 gross / $3,200.00 net monthly',
        formula: 'Monthly Net = (48,000 ÷ 12) × 0.80 = 3,200.00',
      },
      {
        title: 'Example 2: $72,000 Annual Salary with 25% Tax and 5% Pension',
        description: 'Senior specialist salary with combined 30% payroll deductions.',
        math: '$72,000 ÷ 12 = $6,000 monthly gross; $6,000 × (1 − 0.30) = $4,200',
        result: '$6,000.00 gross / $4,200.00 net monthly',
        formula: 'Monthly Net = (72,000 ÷ 12) × 0.70 = 4,200.00',
      },
      {
        title: 'Example 3: $120,000 Executive Annual Salary',
        description: 'Six-figure compensation package breakdown.',
        math: '$120,000 ÷ 12 = $10,000 monthly gross; $10,000 × (1 − 0.35) = $6,500',
        result: '$10,000.00 gross / $6,500.00 net monthly (at 35% deduction)',
        formula: 'Monthly Net = (120,000 ÷ 12) × 0.65 = 6,500.00',
      },
    ],
    faqs: [
      {
        question: 'What is the formula to convert annual salary to monthly?',
        answer: 'The formula is: Monthly Gross = Annual Gross ÷ 12. For take-home pay: Monthly Net = (Annual Gross ÷ 12) × (1 − Deduction Percentage).',
      },
      {
        question: 'What is a $60,000 annual salary per month?',
        answer: '$60,000 divided by 12 equals $5,000 gross per month. If your total deductions (tax and pension) are 20%, your take-home pay is $4,000 per month.',
      },
      {
        question: 'Does annual salary include bonuses or benefits?',
        answer: 'Base annual salary generally excludes variable bonuses, stock options, or health insurance perks unless guaranteed as a fixed cash allowance.',
      },
      {
        question: 'How do bi-weekly paychecks relate to monthly salary?',
        answer: 'Bi-weekly pay means receiving 26 paychecks a year (every 2 weeks). Two months per year contain 3 paychecks instead of 2. Multiply your bi-weekly paycheck by 26 and divide by 12 to find your true average monthly income.',
      },
      {
        question: 'Can I test multiple deduction percentages?',
        answer: 'Yes! Enter any percentage into the primary and secondary deduction fields to model changes in tax brackets or pension contribution rates.',
      },
    ],
  },

  'basic-salary-calculator': {
    slug: 'basic-salary-calculator',
    canonicalPath: '/basic-salary-calculator/',
    metaTitle: 'Basic Salary Calculator – Allowances & Pay | LoveEasyTool',
    metaDescription: 'Calculate basic salary, allowances, and deductions to determine gross and net pay. Ideal for employment contracts, UAE, Saudi, and international pay structures.',
    h1: 'Basic Salary Calculator',
    defaultMode: 'basic-breakdown',
    initialAmount: '4000',
    initialPeriod: 'Monthly',
    intro: 'Calculate how your basic salary combines with allowances (housing, transport, utilities) and deductions to form your gross and net monthly pay. Commonly used for employment contracts in the Middle East, South Asia, and corporate payroll systems.',
    coreGuideTitle: 'Understanding Basic Salary vs Gross Salary vs Net Salary',
    coreGuideText: [
      'In many international employment contracts (especially across the GCC, UK, and Asian markets), total pay is structured into a Basic Salary plus specific allowances (such as Housing Allowance, Transportation, and Mobile/Food stipends).',
      'The Basic Salary is critical because end-of-service gratuity, severance pay, and pension contributions are typically calculated strictly from the basic salary rather than total gross earnings.',
      'Formulas: Total Allowances = Basic Salary × (Allowances % ÷ 100). Gross Salary = Basic Salary + Total Allowances. Deductions = Gross Salary × (Deductions % ÷ 100). Net Monthly Pay = Gross Salary − Deductions.',
    ],
    workedExamples: [
      {
        title: 'Example 1: 4,000 Basic with 25% Allowance and 10% Deduction',
        description: 'Standard contract with housing allowance and statutory payroll deductions.',
        math: 'Allowances: 4,000 × 0.25 = 1,000; Gross: 5,000; Deductions: 5,000 × 0.10 = 500',
        result: 'Gross: 5,000.00 / Net: 4,500.00 monthly',
        formula: 'Net = (4,000 + 1,000) − 500 = 4,500.00',
      },
      {
        title: 'Example 2: AED 10,000 Basic with 40% Housing/Transport in UAE',
        description: 'Typical executive compensation structure in Dubai or Abu Dhabi.',
        math: 'Allowances: 10,000 × 0.40 = 4,000; Gross: 14,000; Deductions: 0% (Tax-Free)',
        result: 'Gross: AED 14,000.00 / Net: AED 14,000.00 monthly',
        formula: 'Gross = 10,000 + 4,000 = 14,000.00',
      },
      {
        title: 'Example 3: 50,000 Basic with 30% Allowances and 15% Deductions',
        description: 'South Asian or international corporate payroll structure.',
        math: 'Allowances: 50,000 × 0.30 = 15,000; Gross: 65,000; Deductions: 65,000 × 0.15 = 9,750',
        result: 'Gross: 65,000.00 / Net: 55,250.00 monthly',
        formula: 'Net = 65,000 − 9,750 = 55,250.00',
      },
    ],
    faqs: [
      {
        question: 'What is basic salary?',
        answer: 'Basic salary is the base rate of compensation agreed upon in your employment contract, excluding all overtime, bonuses, allowances, and performance incentives.',
      },
      {
        question: 'Why is basic salary kept separate from allowances?',
        answer: 'Employers often structure pay into basic plus allowances because statutory liabilities—such as end-of-service benefits, gratuity, and provident fund contributions—are frequently legally tied to basic salary only.',
      },
      {
        question: 'What is a typical ratio of basic salary to allowances?',
        answer: 'In many corporate and Middle Eastern contracts, basic salary represents roughly 60% of total package, while housing and transport allowances represent the remaining 40%.',
      },
      {
        question: 'How do deductions affect gross vs basic salary?',
        answer: 'Deductions (such as income tax or insurance) are typically levied against total gross earnings rather than just the basic salary.',
      },
      {
        question: 'Is this calculation private?',
        answer: 'Yes. Calculations are performed locally on your device without transmitting your contract terms or figures to any server.',
      },
    ],
  },

  'net-salary-calculator': {
    slug: 'net-salary-calculator',
    canonicalPath: '/net-salary-calculator/',
    metaTitle: 'Net Salary Calculator – Take-Home Pay | LoveEasyTool',
    metaDescription: 'Free net salary calculator. Calculate actual take-home income after tax deductions, pension contributions, and insurance. Fast, private, and client-side.',
    h1: 'Net Salary Calculator',
    defaultMode: 'gross-to-net',
    initialAmount: '4500',
    initialPeriod: 'Monthly',
    intro: 'Calculate your true net take-home salary after subtracting income taxes, retirement contributions, healthcare deductions, and social security. See exact net earnings across hourly, daily, weekly, monthly, and yearly breakdowns.',
    coreGuideTitle: 'How to Calculate Net Salary from Gross Salary',
    coreGuideText: [
      'Gross salary is the headline figure on your job offer letter or pay contract. Net salary is the actual cash deposited into your bank account after all mandatory and voluntary deductions have been subtracted.',
      'Formula: Net Salary = Gross Salary − Total Deductions. If your deductions are expressed as a percentage: Net Salary = Gross Salary × (1 − (Tax % + Pension % + Other %) ÷ 100).',
      'Example: If your gross monthly earnings are $4,500 and you face 20% income tax plus 4% pension contributions, your total deduction is 24%. Your net pay is: $4,500 × (1 − 0.24) = $4,500 × 0.76 = $3,420.00 net take-home.',
    ],
    workedExamples: [
      {
        title: 'Example 1: $4,500 Monthly Gross with 22% Total Deductions',
        description: 'Standard full-time professional monthly net salary.',
        math: '$4,500 × (1 − 0.22) = $4,500 × 0.78',
        result: '$3,510.00 / month net ($42,120.00 / year)',
        formula: 'Net = 4,500 × 0.78 = 3,510.00',
      },
      {
        title: 'Example 2: £2,800 Monthly Gross with 18% UK Deductions',
        description: 'UK professional net salary after basic tax and national insurance.',
        math: '£2,800 × (1 − 0.18) = £2,800 × 0.82',
        result: '£2,296.00 / month net (£530.00 / week)',
        formula: 'Net = 2,800 × 0.82 = 2,296.00',
      },
      {
        title: 'Example 3: $80,000 Annual Gross with 28% Total Deductions',
        description: 'Annual salary converted to net take-home pay across all timeframes.',
        math: '$80,000 × (1 − 0.28) = $57,600 net annual; $57,600 ÷ 12 = $4,800 net monthly',
        result: '$4,800.00 / month net ($1,107.69 / week)',
        formula: 'Net Annual = 80,000 × 0.72 = 57,600.00',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between gross salary and net salary?',
        answer: 'Gross salary is your total compensation before any deductions are made. Net salary is the final "take-home" amount you receive after taxes, pension contributions, and insurance premiums have been subtracted.',
      },
      {
        question: 'What deductions are usually taken from a gross salary?',
        answer: 'Common deductions include federal/national income tax, state/local tax, social security or national insurance, pension or 401(k) contributions, and health insurance premiums.',
      },
      {
        question: 'How do I know what deduction percentage to enter?',
        answer: 'Check your most recent pay stub (payslip). Divide your total deductions by your gross pay and multiply by 100 to find your effective deduction rate (typically between 15% and 35% for most workers).',
      },
      {
        question: 'Can net salary change throughout the year?',
        answer: 'Yes. Net salary can change if you cross progressive tax brackets, hit social security contribution caps, or change your retirement contribution rates.',
      },
      {
        question: 'Is this calculator financial or tax advice?',
        answer: 'No. This calculator is a planning estimator based on user-entered percentage deductions. It does not constitute certified legal, tax, or financial counsel.',
      },
    ],
  },
};
