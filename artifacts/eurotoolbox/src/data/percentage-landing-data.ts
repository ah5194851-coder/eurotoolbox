export interface PercentageWorkedExample {
  title: string;
  description: string;
  calculation: string;
  result: string;
  formula: string;
}

export const MAIN_PERCENTAGE_EXAMPLES: PercentageWorkedExample[] = [
  {
    title: 'Example 1: Find 15% of 80',
    description: 'Calculate a standard tipping, discount, or partial proportion of a number.',
    calculation: '(15 ÷ 100) × 80 = 0.15 × 80',
    result: '12',
    formula: 'Result = (X ÷ 100) × Y = (15 ÷ 100) × 80 = 12',
  },
  {
    title: 'Example 2: 30 is what percent of 120?',
    description: 'Find the proportion that a subset or test score represents of a whole total.',
    calculation: '(30 ÷ 120) × 100 = 0.25 × 100',
    result: '25%',
    formula: 'Percentage = (X ÷ Y) × 100 = (30 ÷ 120) × 100 = 25%',
  },
  {
    title: 'Example 3: Percentage increase from 80 to 100',
    description: 'Measure growth, sales expansion, or price inflation between two points.',
    calculation: '((100 − 80) ÷ 80) × 100 = (20 ÷ 80) × 100',
    result: '+25% increase',
    formula: 'Increase % = ((New − Old) ÷ Old) × 100 = ((100 − 80) ÷ 80) × 100 = 25%',
  },
  {
    title: 'Example 4: Percentage decrease from 200 to 150',
    description: 'Quantify markdown, weight reduction, or traffic loss from an original baseline.',
    calculation: '((200 − 150) ÷ 200) × 100 = (50 ÷ 200) × 100',
    result: '−25% decrease',
    formula: 'Decrease % = ((Old − New) ÷ Old) × 100 = ((200 − 150) ÷ 200) × 100 = 25%',
  },
];

export const PERCENTAGE_QUICK_REF_TABLE = [
  { percent: '5%', of100: '5', of200: '10', of500: '25' },
  { percent: '10%', of100: '10', of200: '20', of500: '50' },
  { percent: '15%', of100: '15', of200: '30', of500: '75' },
  { percent: '20%', of100: '20', of200: '40', of500: '100' },
  { percent: '25%', of100: '25', of200: '50', of500: '125' },
  { percent: '50%', of100: '50', of200: '100', of500: '250' },
];

export interface PercentageLandingPageData {
  slug: string;
  canonicalPath: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  defaultMode: 'what-is' | 'is-what-percent' | 'increase' | 'decrease' | 'difference' | 'add-subtract';
  initialX: string;
  initialY: string;
  intro: string;
  coreGuideTitle: string;
  coreGuideText: string[];
  workedExamples: PercentageWorkedExample[];
  faqs: { question: string; answer: string }[];
}

export const PERCENTAGE_LANDING_PAGES: Record<string, PercentageLandingPageData> = {
  'percentage-increase-calculator': {
    slug: 'percentage-increase-calculator',
    canonicalPath: '/percentage-increase-calculator/',
    metaTitle: 'Percentage Increase Calculator – Calculate % Growth Online | LoveEasyTool',
    metaDescription: 'Free percentage increase calculator. Calculate growth from an old value to a new value with step-by-step formulas. Instant, private, and client-side.',
    h1: 'Percentage Increase Calculator',
    defaultMode: 'increase',
    initialX: '80',
    initialY: '100',
    intro: 'Calculate the percentage increase between an original initial value and a final increased value. Ideal for tracking price inflation, revenue growth, web traffic gains, and salary raises with exact mathematical steps.',
    coreGuideTitle: 'How to Calculate Percentage Increase Step by Step',
    coreGuideText: [
      'Percentage increase measures how much a value has grown relative to its starting amount. To calculate it, subtract the original starting number from the new final number to find the absolute increase.',
      'Next, divide that difference by the original starting number (never divide by the new number). Finally, multiply the decimal fraction by 100 to convert the figure into a percentage.',
      'Formula: Percentage Increase = ((New Value − Old Value) ÷ Old Value) × 100. For example, moving from 80 to 100 represents an increase of ((100 − 80) ÷ 80) × 100 = (20 ÷ 80) × 100 = 25%.',
    ],
    workedExamples: [
      {
        title: 'Example 1: Sales Growth from 80 to 100 Units',
        description: 'Tracking inventory performance or month-over-month sales velocity.',
        calculation: '((100 − 80) ÷ 80) × 100 = (20 ÷ 80) × 100',
        result: '+25% increase',
        formula: '((100 − 80) ÷ 80) × 100 = 25%',
      },
      {
        title: 'Example 2: Price Raise from $50 to $65',
        description: 'Calculating the percentage price markup on a subscription or retail item.',
        calculation: '((65 − 50) ÷ 50) × 100 = (15 ÷ 50) × 100',
        result: '+30% increase',
        formula: '((65 − 50) ÷ 50) × 100 = 30%',
      },
      {
        title: 'Example 3: Hourly Wage Increase from $20 to $24',
        description: 'Evaluating salary promotions and compensation adjustments.',
        calculation: '((24 − 20) ÷ 20) × 100 = (4 ÷ 20) × 100',
        result: '+20% increase',
        formula: '((24 − 20) ÷ 20) × 100 = 20%',
      },
    ],
    faqs: [
      {
        question: 'What is the formula for percentage increase?',
        answer: 'The standard formula is: Percentage Increase = ((New Value − Old Value) ÷ Old Value) × 100. The subtraction isolates the net gain, which is then benchmarked against the original starting base.',
      },
      {
        question: 'Why do I divide by the old value instead of the new value?',
        answer: 'Because percentage increase measures growth relative to where you started. Dividing by the new larger value would understate the actual growth rate.',
      },
      {
        question: 'What happens if the new value is smaller than the old value?',
        answer: 'If the new value is smaller, the result is negative, which indicates a percentage decrease rather than an increase. You can use our Percentage Decrease Calculator for downward trends.',
      },
      {
        question: 'Can percentage increase exceed 100%?',
        answer: 'Yes! When a quantity more than doubles (e.g. from 10 to 30), the percentage increase is ((30 − 10) ÷ 10) × 100 = 200%. There is no upper limit on percentage increase.',
      },
      {
        question: 'Is this calculation private?',
        answer: 'Yes. All math runs entirely in your local browser using client-side JavaScript. No numbers or business data are sent to our servers.',
      },
    ],
  },

  'percentage-decrease-calculator': {
    slug: 'percentage-decrease-calculator',
    canonicalPath: '/percentage-decrease-calculator/',
    metaTitle: 'Percentage Decrease Calculator – Calculate % Drop Online | LoveEasyTool',
    metaDescription: 'Free percentage decrease calculator. Easily calculate percentage drops, discounts, losses, and reductions with step-by-step formulas. 100% client-side.',
    h1: 'Percentage Decrease Calculator',
    defaultMode: 'decrease',
    initialX: '200',
    initialY: '150',
    intro: 'Calculate the percentage decrease from an initial starting number to a reduced final number. Perfect for computing sales discounts, weight loss progress, budget cuts, and reduced overhead costs.',
    coreGuideTitle: 'How to Calculate Percentage Decrease Step by Step',
    coreGuideText: [
      'Percentage decrease quantifies the proportional reduction of a quantity relative to its original magnitude. First, calculate the absolute decrease by subtracting the new lower amount from the old higher amount.',
      'Next, divide that decrease by the original starting baseline (the old amount). Finally, multiply by 100 to express the reduction as a clear percentage.',
      'Formula: Percentage Decrease = ((Old Value − New Value) ÷ Old Value) × 100. For instance, decreasing from 200 to 150 yields ((200 − 150) ÷ 200) × 100 = (50 ÷ 200) × 100 = 25% drop.',
    ],
    workedExamples: [
      {
        title: 'Example 1: Price Markdown from $200 to $150',
        description: 'Calculating retail clearance savings and seasonal promotional cuts.',
        calculation: '((200 − 150) ÷ 200) × 100 = (50 ÷ 200) × 100',
        result: '25% decrease',
        formula: '((200 − 150) ÷ 200) × 100 = 25%',
      },
      {
        title: 'Example 2: Body Weight Reduction from 80 kg to 72 kg',
        description: 'Measuring fitness progress and proportional body mass loss.',
        calculation: '((80 − 72) ÷ 80) × 100 = (8 ÷ 80) × 100',
        result: '10% decrease',
        formula: '((80 − 72) ÷ 80) × 100 = 10%',
      },
      {
        title: 'Example 3: Server Latency Drop from 120 ms to 90 ms',
        description: 'Assessing cloud performance tuning and engineering optimization.',
        calculation: '((120 − 90) ÷ 120) × 100 = (30 ÷ 120) × 100',
        result: '25% decrease',
        formula: '((120 − 90) ÷ 120) × 100 = 25%',
      },
    ],
    faqs: [
      {
        question: 'What is the formula for percentage decrease?',
        answer: 'The standard formula is: Percentage Decrease = ((Old Value − New Value) ÷ Old Value) × 100. This compares the amount lost against the starting reference baseline.',
      },
      {
        question: 'Can a percentage decrease be more than 100%?',
        answer: 'In practical terms for physical quantities and prices, a decrease cannot exceed 100% because dropping by 100% brings a value to zero. Decreases beyond 100% only occur in contexts where quantities can become negative.',
      },
      {
        question: 'How is percentage decrease different from a discount rate?',
        answer: 'A discount rate is simply a percentage decrease applied to an original retail price. Both share the exact same underlying formula.',
      },
      {
        question: 'Why doesn’t a 50% decrease followed by a 50% increase return to the original number?',
        answer: 'Because the base changes. If 100 drops by 50%, it becomes 50. Increasing 50 by 50% adds 25, reaching only 75. To return to 100 from 50 requires a 100% increase.',
      },
      {
        question: 'Are inputs stored or transmitted when using this tool?',
        answer: 'Never. LoveEasyTool runs all calculations completely client-side in your device browser with zero logging or external transmission.',
      },
    ],
  },

  'percentage-difference-calculator': {
    slug: 'percentage-difference-calculator',
    canonicalPath: '/percentage-difference-calculator/',
    metaTitle: 'Percentage Difference Calculator – Compare Two Values | LoveEasyTool',
    metaDescription: 'Free percentage difference calculator. Compare the relative difference between two positive numbers where neither is a baseline. Clear formulas & steps.',
    h1: 'Percentage Difference Calculator',
    defaultMode: 'difference',
    initialX: '25',
    initialY: '30',
    intro: 'Calculate the percentage difference between two positive numbers when neither number is the "original" or baseline. Used when comparing two peers, two supplier quotes, or two parallel measurements.',
    coreGuideTitle: 'Understanding Percentage Difference vs Percentage Change',
    coreGuideText: [
      'Percentage difference is used when comparing two values of the same type without any chronological order or baseline. Because neither value comes "first", we compare the absolute difference between the numbers against their average.',
      'To calculate percentage difference: First, find the absolute difference |X − Y|. Second, calculate the average of the two numbers: (X + Y) ÷ 2. Third, divide the difference by the average and multiply by 100.',
      'Formula: Percentage Difference = (|X − Y| ÷ ((X + Y) ÷ 2)) × 100. For example, comparing 25 and 30: difference is 5, average is 27.5, giving (5 ÷ 27.5) × 100 = 18.18%.',
    ],
    workedExamples: [
      {
        title: 'Example 1: Comparing Two Product Prices ($25 vs $30)',
        description: 'Assessing price disparity between two competing retailers for identical goods.',
        calculation: '(|30 − 25| ÷ ((30 + 25) ÷ 2)) × 100 = (5 ÷ 27.5) × 100',
        result: '18.18% difference',
        formula: '(|25 − 30| ÷ 27.5) × 100 = 18.18%',
      },
      {
        title: 'Example 2: Lab Measurement Comparison (10.2 cm vs 10.8 cm)',
        description: 'Evaluating measurement tolerance across two independent sensor readings.',
        calculation: '(|10.8 − 10.2| ÷ ((10.8 + 10.2) ÷ 2)) × 100 = (0.6 ÷ 10.5) × 100',
        result: '5.71% difference',
        formula: '(0.6 ÷ 10.5) × 100 = 5.71%',
      },
      {
        title: 'Example 3: Staff Headcount Comparison (80 vs 100 Employees)',
        description: 'Benchmarking operational capacity across two parallel branch offices.',
        calculation: '(|100 − 80| ÷ ((100 + 80) ÷ 2)) × 100 = (20 ÷ 90) × 100',
        result: '22.22% difference',
        formula: '(20 ÷ 90) × 100 = 22.22%',
      },
    ],
    faqs: [
      {
        question: 'When should I use percentage difference instead of percentage change?',
        answer: 'Use percentage difference when comparing two concurrent values where neither came first (e.g. comparing height between two people or prices at two stores). Use percentage change when there is an old starting value and a new final value over time.',
      },
      {
        question: 'What is the formula for percentage difference?',
        answer: 'Percentage Difference = (|Value 1 − Value 2| ÷ ((Value 1 + Value 2) ÷ 2)) × 100. It measures the spread between values relative to their arithmetic mean.',
      },
      {
        question: 'Does the order of numbers matter in percentage difference?',
        answer: 'No. Because the formula takes the absolute difference in the numerator and the sum in the denominator, comparing 25 to 30 yields the exact same 18.18% as comparing 30 to 25.',
      },
      {
        question: 'Can percentage difference be negative?',
        answer: 'No. Percentage difference is defined using absolute value (|X − Y|), so it is always a non-negative number.',
      },
      {
        question: 'Does this calculator support decimals and large numbers?',
        answer: 'Yes. You can input any non-negative numbers, including precise decimals, and the tool will compute results instantly in browser memory.',
      },
    ],
  },

  'what-is-x-percent-of-y': {
    slug: 'what-is-x-percent-of-y',
    canonicalPath: '/what-is-x-percent-of-y/',
    metaTitle: 'What Is X% of Y? Percentage Calculator – Fast & Free | LoveEasyTool',
    metaDescription: 'Find what X percent of Y is with our free online calculator. Step-by-step formulas, solved examples, and instant answers in your browser with zero sign-up.',
    h1: 'What Is X% of Y? Percentage Calculator',
    defaultMode: 'what-is',
    initialX: '15',
    initialY: '80',
    intro: 'Instantly calculate what X percent of any number Y is. Whether you are figuring out tipping amounts, calculating tax portions, working out commission rates, or doing homework, get the exact result and formula breakdown.',
    coreGuideTitle: 'How to Calculate "What Is X% of Y?"',
    coreGuideText: [
      'The word "percent" originates from the Latin "per centum", meaning "by the hundred". Therefore, X% literally translates to the fraction X ÷ 100 (or X in decimal format).',
      'In mathematics, the word "of" indicates multiplication. To find X% of Y, you convert the percentage into a decimal by dividing by 100, then multiply by the total amount Y.',
      'Formula: Result = (X ÷ 100) × Y. For example, to find 15% of 80: convert 15% to 0.15, then calculate 0.15 × 80 = 12.',
    ],
    workedExamples: [
      {
        title: 'Example 1: What is 15% of 80?',
        description: 'Calculating a 15% restaurant tip or consultation fee.',
        calculation: '(15 ÷ 100) × 80 = 0.15 × 80',
        result: '12',
        formula: '(15 ÷ 100) × 80 = 12',
      },
      {
        title: 'Example 2: What is 20% of 250?',
        description: 'Working out a standard 20% VAT bracket or down payment requirement.',
        calculation: '(20 ÷ 100) × 250 = 0.20 × 250',
        result: '50',
        formula: '(20 ÷ 100) × 250 = 50',
      },
      {
        title: 'Example 3: What is 7.5% of 1,200?',
        description: 'Calculating sales commission on a commercial invoice.',
        calculation: '(7.5 ÷ 100) × 1,200 = 0.075 × 1,200',
        result: '90',
        formula: '(7.5 ÷ 100) × 1,200 = 90',
      },
    ],
    faqs: [
      {
        question: 'How do you calculate a percentage of a number on a handheld calculator?',
        answer: 'Enter the base number Y, press the multiplication key (×), enter the percentage X, and press the percent key (%). If your calculator does not have a % key, multiply by (X ÷ 100). For example, 80 × 0.15 = 12.',
      },
      {
        question: 'Is X% of Y the same as Y% of X?',
        answer: 'Yes! Multiplication is commutative. 15% of 80 is (0.15 × 80) = 12, and 80% of 15 is (0.80 × 15) = 12. This mental math trick makes tough calculations easy (e.g. 16% of 50 is just 50% of 16, which is 8).',
      },
      {
        question: 'How do I find a percentage of money (dollars, pounds, euros)?',
        answer: 'Use the same formula: (X ÷ 100) × Amount. For example, 20% of $150.00 is (0.20 × 150) = $30.00.',
      },
      {
        question: 'Can X be a decimal percentage like 0.5% or 17.5%?',
        answer: 'Yes. Decimal percentages work exactly the same way. Simply divide by 100: 17.5% becomes 0.175, and 0.5% becomes 0.005.',
      },
      {
        question: 'Is this calculator free without registration?',
        answer: 'Yes, 100% free with no limits, accounts, or advertisements. All arithmetic executes directly in your browser tab.',
      },
    ],
  },

  'how-to-calculate-percentage': {
    slug: 'how-to-calculate-percentage',
    canonicalPath: '/how-to-calculate-percentage/',
    metaTitle: 'How to Calculate Percentage – Complete Guide & Online Tool | LoveEasyTool',
    metaDescription: 'Learn how to calculate percentages with easy step-by-step formulas, phone calculator shortcuts, solved math examples, and an interactive online tool.',
    h1: 'How to Calculate Percentage: The Complete Step-by-Step Guide',
    defaultMode: 'is-what-percent',
    initialX: '30',
    initialY: '120',
    intro: 'Master percentage calculations for everyday finances, academic exams, retail discounts, and business metrics. Learn the universal formula, mental math shortcuts, and phone calculator methods with our interactive calculator.',
    coreGuideTitle: 'The Universal Percentage Formula Explained',
    coreGuideText: [
      'A percentage represents a fraction where the denominator is always 100. The foundational formula to determine what percentage a part represents of a whole is: Percentage = (Part ÷ Whole) × 100.',
      'To use this formula: First, divide the smaller or observed number (the part) by the total baseline (the whole). This yields a decimal fraction. Second, multiply that decimal by 100 to convert it into percentage notation.',
      'Example: If you scored 30 correct answers out of 120 total questions on an exam, divide 30 by 120 to get 0.25. Then multiply 0.25 by 100 to find your score: 25%.',
    ],
    workedExamples: [
      {
        title: 'Example 1: Test Score (30 out of 120 questions)',
        description: 'Calculating an exam grade or questionnaire completion rate.',
        calculation: '(30 ÷ 120) × 100 = 0.25 × 100',
        result: '25%',
        formula: 'Grade % = (30 ÷ 120) × 100 = 25%',
      },
      {
        title: 'Example 2: Budget Allocation ($450 out of $1,800)',
        description: 'Determining what proportion of your monthly income goes toward rent or groceries.',
        calculation: '(450 ÷ 1,800) × 100 = 0.25 × 100',
        result: '25%',
        formula: 'Share % = (450 ÷ 1,800) × 100 = 25%',
      },
      {
        title: 'Example 3: Completed Project Tasks (18 out of 24 tasks)',
        description: 'Evaluating project sprint completion and milestone progress.',
        calculation: '(18 ÷ 24) × 100 = 0.75 × 100',
        result: '75%',
        formula: 'Progress % = (18 ÷ 24) × 100 = 75%',
      },
    ],
    faqs: [
      {
        question: 'How do you calculate a percentage on a smartphone calculator?',
        answer: 'To find a percentage of a number (e.g. 20% of 150): type 150, press the multiply (×) button, type 20, and press the percent (%) key. If finding what percent 30 is of 120: type 30, press divide (÷), type 120, and press equals (=), which gives 0.25 (25%).',
      },
      {
        question: 'What is the easiest mental math shortcut for calculating percentages?',
        answer: 'Break percentages into 10% and 1% building blocks. To find 10% of any number, move the decimal point one place to the left (10% of 80 is 8). To find 5%, take half of 10% (half of 8 is 4). To find 15%, add 10% and 5% (8 + 4 = 12).',
      },
      {
        question: 'How do I convert a fraction into a percentage?',
        answer: 'Divide the top numerator by the bottom denominator to get a decimal, then multiply by 100. For example, 3/4 = 3 ÷ 4 = 0.75 × 100 = 75%.',
      },
      {
        question: 'How do I add a percentage to a number (e.g. sales tax)?',
        answer: 'Multiply the original number by (1 + percentage as a decimal). To add 20% tax to $50, multiply $50 by 1.20 to get $60.00 directly.',
      },
      {
        question: 'Can I bookmark this page to use offline?',
        answer: 'Yes. The calculator runs completely in client-side JavaScript, meaning once loaded, calculations operate reliably without internet dependencies.',
      },
    ],
  },
};
