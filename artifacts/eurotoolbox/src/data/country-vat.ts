export interface VatCountryRate {
  id: string;
  name: string;
  standardRate: number;
  reducedRates: string;
  taxName: string;
  taxAbbr: string;
  currencySymbol: string;
  currencyCode: string;
  landingSlug?: string;
}

export const VAT_COUNTRY_PRESETS: VatCountryRate[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    standardRate: 20,
    reducedRates: '5% (home energy, child safety seats), 0% (most food, books, children’s clothing)',
    taxName: 'Value Added Tax',
    taxAbbr: 'VAT',
    currencySymbol: '£',
    currencyCode: 'GBP',
    landingSlug: 'uk-vat-calculator',
  },
  {
    id: 'germany',
    name: 'Germany',
    standardRate: 19,
    reducedRates: '7% (groceries, books, newspapers, cultural events, passenger transport)',
    taxName: 'Mehrwertsteuer / Umsatzsteuer',
    taxAbbr: 'MwSt / USt',
    currencySymbol: '€',
    currencyCode: 'EUR',
    landingSlug: 'germany-vat-calculator',
  },
  {
    id: 'france',
    name: 'France',
    standardRate: 20,
    reducedRates: '10% (dining, transport, renovation), 5.5% (food, energy, books), 2.1% (medicines, press)',
    taxName: 'Taxe sur la valeur ajoutée',
    taxAbbr: 'TVA',
    currencySymbol: '€',
    currencyCode: 'EUR',
    landingSlug: 'france-vat-calculator',
  },
  {
    id: 'ireland',
    name: 'Ireland',
    standardRate: 23,
    reducedRates: '13.5% (fuel, construction, electricity), 9% (e-publications), 4.8% (livestock), 0% (groceries, medicines)',
    taxName: 'Value Added Tax',
    taxAbbr: 'VAT',
    currencySymbol: '€',
    currencyCode: 'EUR',
    landingSlug: 'ireland-vat-calculator',
  },
  {
    id: 'uae',
    name: 'UAE',
    standardRate: 5,
    reducedRates: '0% (international transport, designated healthcare, education, exports, precious metals)',
    taxName: 'Value Added Tax',
    taxAbbr: 'VAT',
    currencySymbol: 'AED',
    currencyCode: 'AED',
    landingSlug: 'uae-vat-calculator',
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    standardRate: 15,
    reducedRates: '0% (qualifying medicines, medical equipment, international transport, exports outside GCC)',
    taxName: 'Value Added Tax',
    taxAbbr: 'VAT',
    currencySymbol: 'SAR',
    currencyCode: 'SAR',
    landingSlug: 'saudi-arabia-vat-calculator',
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    standardRate: 21,
    reducedRates: '9% (food, drinks, medicines, books, passenger transport, agricultural goods)',
    taxName: 'Belasting over de toegevoegde waarde',
    taxAbbr: 'BTW',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
  {
    id: 'spain',
    name: 'Spain',
    standardRate: 21,
    reducedRates: '10% (transport, hotel accommodation, restaurants), 4% (basic groceries, books, pharmaceuticals)',
    taxName: 'Impuesto sobre el Valor Añadido',
    taxAbbr: 'IVA',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
  {
    id: 'italy',
    name: 'Italy',
    standardRate: 22,
    reducedRates: '10% (hotels, restaurants, passenger transport), 5% (social care, herbs), 4% (basic food, newspapers)',
    taxName: 'Imposta sul Valore Aggiunto',
    taxAbbr: 'IVA',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
  {
    id: 'poland',
    name: 'Poland',
    standardRate: 23,
    reducedRates: '8% (public transport, restaurants, fertilizers), 5% (basic groceries, books), 0% (intra-community transport)',
    taxName: 'Podatek od towarów i usług',
    taxAbbr: 'PTU / VAT',
    currencySymbol: 'zł',
    currencyCode: 'PLN',
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    standardRate: 18,
    reducedRates: 'Federal standard 18% on goods; provincial sales tax on services ranges from 13% to 16% (SRB, PRA, BRA, KPRA)',
    taxName: 'General Sales Tax',
    taxAbbr: 'GST / Sales Tax',
    currencySymbol: '₨',
    currencyCode: 'PKR',
  },
];

export interface WorkedVatExample {
  title: string;
  description: string;
  mode: 'add' | 'remove';
  amount: number;
  rate: number;
  vatAmount: number;
  total: number;
  currency: string;
  formula: string;
}

export const MAIN_VAT_EXAMPLES: WorkedVatExample[] = [
  {
    title: 'Example 1: Add 20% VAT to 100',
    description: 'Calculate the total price when billing a customer or quoting standard rates.',
    mode: 'add',
    amount: 100,
    rate: 20,
    vatAmount: 20,
    total: 120,
    currency: '$',
    formula: 'Total = Net × (1 + Rate) = 100 × (1 + 0.20) = 120.00 (VAT portion: 20.00)',
  },
  {
    title: 'Example 2: Remove 20% VAT from 120',
    description: 'Extract the net purchase price and the deductible tax amount from a receipt.',
    mode: 'remove',
    amount: 120,
    rate: 20,
    vatAmount: 20,
    total: 100,
    currency: '$',
    formula: 'Net = Gross ÷ (1 + Rate) = 120 ÷ 1.20 = 100.00 (VAT portion: 120 - 100 = 20.00)',
  },
  {
    title: 'Example 3: Add 19% German VAT (MwSt) to 250',
    description: 'Apply the standard German Mehrwertsteuer (MwSt) rate to a commercial net invoice.',
    mode: 'add',
    amount: 250,
    rate: 19,
    vatAmount: 47.5,
    total: 297.5,
    currency: '€',
    formula: 'Total = Net × (1 + Rate) = 250 × (1 + 0.19) = 297.50 (MwSt portion: 47.50)',
  },
];

export interface CountryVatPageData {
  slug: string;
  canonicalPath: string;
  countryName: string;
  taxName: string;
  taxAbbr: string;
  standardRate: number;
  reducedRatesSummary: string;
  currencySymbol: string;
  currencyCode: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  ratesOverview: string;
  registrationThreshold: {
    heading: string;
    details: string;
    mandatoryThreshold: string;
    voluntaryAllowed: string;
  };
  workedExamples: [WorkedVatExample, WorkedVatExample];
  faqs: { question: string; answer: string }[];
}

export const COUNTRY_VAT_PAGES: Record<string, CountryVatPageData> = {
  'uk-vat-calculator': {
    slug: 'uk-vat-calculator',
    canonicalPath: '/uk-vat-calculator/',
    countryName: 'United Kingdom',
    taxName: 'Value Added Tax',
    taxAbbr: 'VAT',
    standardRate: 20,
    reducedRatesSummary: '5% reduced rate for domestic fuel and power, children’s car safety seats; 0% zero-rate for most human food, children’s footwear and clothing, and printed or electronic books.',
    currencySymbol: '£',
    currencyCode: 'GBP',
    metaTitle: 'UK VAT Calculator – Add or Remove 20% VAT | LoveEasyTool',
    metaDescription: 'Free UK VAT calculator. Add or remove standard 20% or reduced 5% VAT from net or gross amounts in GBP (£). Fast, private browser calculations with zero sign-up.',
    h1: 'UK VAT Calculator',
    intro: 'Calculate UK Value Added Tax (VAT) in British Pounds (£) instantly in both directions. Whether you are a small business owner issuing invoices, a contractor verifying client payments, or a consumer claiming deductible expenses, this calculator applies the official HM Revenue & Customs (HMRC) tax brackets directly in your browser.',
    ratesOverview: 'The standard VAT rate in the United Kingdom is 20%, which applies to most commercial goods and business services. In addition to the standard 20% bracket, the UK tax code includes a 5% reduced rate for qualifying domestic utilities and maternal/infant safety goods, as well as a 0% zero-rating for vital necessities like groceries, public transport, prescription medications, and publications. Some transactions, such as financial and insurance services, are exempt from VAT altogether.',
    registrationThreshold: {
      heading: 'Who Must Register for UK VAT?',
      details: 'In the UK, business entities, sole traders, and partnerships must register for VAT with HM Revenue & Customs (HMRC) if their taxable turnover exceeds £90,000 across any rolling 12-month period (the threshold was updated from £85,000 to £90,000 effective April 2024). Businesses that expect their taxable turnover to surpass £90,000 in the next 30 days alone are also required to register immediately.',
      mandatoryThreshold: '£90,000 within any rolling 12-month period',
      voluntaryAllowed: 'Yes, UK businesses with turnover below £90,000 may register voluntarily to reclaim input VAT paid on business expenses.',
    },
    workedExamples: [
      {
        title: 'Example 1: Add 20% UK VAT to £50.00 Net',
        description: 'Calculating the total gross price to invoice a client for freelance services.',
        mode: 'add',
        amount: 50,
        rate: 20,
        vatAmount: 10,
        total: 60,
        currency: '£',
        formula: 'Gross = £50.00 × (1 + 0.20) = £60.00 (VAT amount: £10.00)',
      },
      {
        title: 'Example 2: Remove 20% UK VAT from £150.00 Gross',
        description: 'Extracting the net expenditure and reclaiming input tax from a store purchase receipt.',
        mode: 'remove',
        amount: 150,
        rate: 20,
        vatAmount: 25,
        total: 125,
        currency: '£',
        formula: 'Net = £150.00 ÷ 1.20 = £125.00 (VAT amount: £150.00 - £125.00 = £25.00)',
      },
    ],
    faqs: [
      {
        question: 'What is the current standard VAT rate in the UK?',
        answer: 'The standard VAT rate in the United Kingdom is 20%. It applies to the vast majority of consumer goods, commercial services, and business transactions.',
      },
      {
        question: 'How do I remove 20% VAT from a UK gross price?',
        answer: 'To remove 20% VAT from an inclusive gross amount, divide the total figure by 1.20. For example, a gross receipt of £120.00 divided by 1.20 equals a net price of £100.00, meaning £20.00 was the VAT portion. Do not merely subtract 20% from the gross total, as that yields an inaccurate figure.',
      },
      {
        question: 'What is the UK VAT registration threshold?',
        answer: 'As of April 2024, the mandatory UK VAT registration threshold is £90,000 in taxable turnover over any rolling 12-month period. If your turnover crosses this mark, you must register with HMRC within 30 days.',
      },
      {
        question: 'Which goods qualify for the reduced 5% and 0% VAT rates in the UK?',
        answer: 'The 5% reduced rate applies to items such as domestic electricity, heating fuel, and child safety car seats. The 0% zero-rate applies to staple food, books and digital publications, children’s clothing, and prescription medicines.',
      },
      {
        question: 'Do I need to sign up or create an account to use this UK VAT calculator?',
        answer: 'No. LoveEasyTool is 100% free and open for public use. All calculations occur inside your browser using JavaScript, meaning your financial figures remain private and are never uploaded to our servers.',
      },
    ],
  },

  'germany-vat-calculator': {
    slug: 'germany-vat-calculator',
    canonicalPath: '/germany-vat-calculator/',
    countryName: 'Germany',
    taxName: 'Mehrwertsteuer (MwSt) / Umsatzsteuer (USt)',
    taxAbbr: 'MwSt',
    standardRate: 19,
    reducedRatesSummary: '7% reduced rate (ermäßigter Steuersatz) for staple groceries, books, newspapers, cultural admissions, hotel stays, and local public transport.',
    currencySymbol: '€',
    currencyCode: 'EUR',
    metaTitle: 'Germany VAT Calculator (MwSt) – 19% Tax | LoveEasyTool',
    metaDescription: 'Free German MwSt calculator (Mehrwertsteuer). Easily add or deduct 19% standard or 7% reduced VAT from euro (€) prices with instant local browser math.',
    h1: 'Germany VAT Calculator (MwSt / USt)',
    intro: 'Calculate German Mehrwertsteuer (MwSt), also formally termed Umsatzsteuer (USt), directly in Euros (€). This calculator supports both the standard 19% rate and the reduced 7% rate for German invoicing, accounting, and expense reporting with instant forward and reverse calculations.',
    ratesOverview: 'In Germany, the standard Value Added Tax rate (Regelsteuersatz) is 19%. A reduced rate of 7% (ermäßigter Steuersatz) is provided under § 12 para. 2 UStG for basic food products, books, magazines, cultural admissions, passenger rail transport, and hotel accommodation. Certain medical, educational, and financial activities are exempt (steuerfrei) from Umsatzsteuer under German tax law.',
    registrationThreshold: {
      heading: 'Who Must Register for German MwSt / USt?',
      details: 'All businesses, freelancers (Freiberufler), and self-employed individuals established in Germany must register for tax with their local Finanzamt and obtain a Steuernummer (tax number) and USt-IdNr (VAT ID). However, under the small business regulation (Kleinunternehmerregelung § 19 UStG), businesses whose gross revenue did not exceed €22,000 in the previous calendar year and is not expected to exceed €50,000 in the current calendar year can opt out of charging MwSt.',
      mandatoryThreshold: 'Mandatory standard registration upon exceeding the €22,000 / €50,000 Kleinunternehmer limits',
      voluntaryAllowed: 'Entrepreneurs below the €22,000 threshold can waive the Kleinunternehmer exemption (Regelbesteuerung) to deduct input VAT (Vorsteuerabzug).',
    },
    workedExamples: [
      {
        title: 'Example 1: Add 19% MwSt to €200.00 Net (Nettobetrag)',
        description: 'Determining the gross amount (Bruttobetrag) to charge on a standard commercial invoice.',
        mode: 'add',
        amount: 200,
        rate: 19,
        vatAmount: 38,
        total: 238,
        currency: '€',
        formula: 'Brutto = €200.00 × (1 + 0.19) = €238.00 (MwSt: €38.00)',
      },
      {
        title: 'Example 2: Remove 19% MwSt from €595.00 Gross (Bruttobetrag)',
        description: 'Extracting net cost and Vorsteuer (input tax deduction) from a business equipment invoice.',
        mode: 'remove',
        amount: 595,
        rate: 19,
        vatAmount: 95,
        total: 500,
        currency: '€',
        formula: 'Netto = €595.00 ÷ 1.19 = €500.00 (MwSt: €595.00 - €500.00 = €95.00)',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between MwSt and USt in Germany?',
        answer: 'MwSt (Mehrwertsteuer) is the colloquial and commercial term commonly seen on customer receipts, whereas USt (Umsatzsteuer) is the official statutory term used in German tax law and official Finanzamt filings. Both refer to the identical consumption tax.',
      },
      {
        question: 'How do you calculate 19% German MwSt in reverse?',
        answer: 'To remove 19% MwSt from a gross figure (Brutto), divide the gross amount by 1.19. For example, €119.00 / 1.19 = €100.00 net (Netto), giving €19.00 in tax. For 7% reduced items, divide the gross amount by 1.07.',
      },
      {
        question: 'What is the Kleinunternehmer limit for VAT exemption in Germany?',
        answer: 'Under § 19 UStG, small businesses whose revenue did not exceed €22,000 in the preceding calendar year and will not exceed €50,000 in the current year are exempt from levying MwSt on their invoices.',
      },
      {
        question: 'Which items are subject to the reduced 7% MwSt rate in Germany?',
        answer: 'Staple foods (milk, bread, vegetables, meat), printed and electronic books, newspapers, theater and concert tickets, and short-term hotel stays qualify for the 7% reduced tax rate.',
      },
      {
        question: 'Can German business owners reclaim input VAT (Vorsteuer)?',
        answer: 'Yes. Registered businesses subject to standard taxation can deduct the VAT they paid on commercial purchases (Vorsteuer) from the VAT they collected from clients when filing their regular Umsatzsteuer-Voranmeldung.',
      },
    ],
  },

  'france-vat-calculator': {
    slug: 'france-vat-calculator',
    canonicalPath: '/france-vat-calculator/',
    countryName: 'France',
    taxName: 'Taxe sur la valeur ajoutée (TVA)',
    taxAbbr: 'TVA',
    standardRate: 20,
    reducedRatesSummary: '10% intermediate rate (catering, transport, renovations); 5.5% reduced rate (basic food, books, energy); 2.1% super-reduced rate (reimbursable medications, press publications).',
    currencySymbol: '€',
    currencyCode: 'EUR',
    metaTitle: 'France VAT Calculator (TVA) – 20% Tax | LoveEasyTool',
    metaDescription: 'Free French TVA calculator. Quickly add or remove 20% standard, 10% intermediate, or 5.5% reduced TVA from prices in euros (€). 100% private and client-side.',
    h1: 'France VAT Calculator (TVA)',
    intro: 'Calculate French Taxe sur la valeur ajoutée (TVA) in Euros (€) with precision. Built for French micro-entrepreneurs, artisans, businesses, and consumers, this tool computes both Hors Taxe (HT / Net) and Toutes Taxes Comprises (TTC / Gross) amounts across all French statutory tax brackets.',
    ratesOverview: 'France applies four distinct TVA rates: the standard rate of 20% (taux normal) for most sales and services; an intermediate rate of 10% (taux intermédiaire) for restaurants, passenger transit, and home renovation; a reduced rate of 5.5% (taux réduit) for basic foodstuffs, feminine hygiene products, energy transition, and literature; and a super-reduced rate of 2.1% (taux particulier) for prescription medicines and registered press.',
    registrationThreshold: {
      heading: 'Who Must Register for French TVA?',
      details: 'In France, businesses and auto-entrepreneurs are subject to the franchise en base de TVA exemption regime as long as their annual turnover remains beneath statutory thresholds: €91,900 for retail sales and accommodation (with an upper threshold of €101,000), or €36,800 for service providers and liberal professions (with an upper threshold of €39,100). Once turnover crosses these thresholds, the entity must register with the Direction Générale des Finances Publiques (DGFiP) and charge TVA.',
      mandatoryThreshold: '€91,900 for commercial goods / €36,800 for service activities',
      voluntaryAllowed: 'Entrepreneurs may choose to opt into TVA (option pour le paiement de la TVA) before reaching the limits to claim input tax credits.',
    },
    workedExamples: [
      {
        title: 'Example 1: Add 20% French TVA to €80.00 HT (Hors Taxe)',
        description: 'Calculating the final price TTC (Toutes Taxes Comprises) for client billing.',
        mode: 'add',
        amount: 80,
        rate: 20,
        vatAmount: 16,
        total: 96,
        currency: '€',
        formula: 'TTC = €80.00 × (1 + 0.20) = €96.00 TTC (Montant TVA: €16.00)',
      },
      {
        title: 'Example 2: Remove 20% French TVA from €240.00 TTC',
        description: 'Extracting the pre-tax base (HT) and deductible TVA from a business expense receipt.',
        mode: 'remove',
        amount: 240,
        rate: 20,
        vatAmount: 40,
        total: 200,
        currency: '€',
        formula: 'HT = €240.00 ÷ 1.20 = €200.00 HT (Montant TVA: €240.00 - €200.00 = €40.00)',
      },
    ],
    faqs: [
      {
        question: 'What do HT and TTC stand for in France?',
        answer: 'HT stands for "Hors Taxe" (net price excluding VAT), while TTC stands for "Toutes Taxes Comprises" (gross total price including all applicable taxes, including TVA).',
      },
      {
        question: 'How do you extract 20% French TVA from a TTC price?',
        answer: 'To calculate the HT base from a TTC price at the standard 20% rate, divide the TTC amount by 1.20. For intermediate 10% rates, divide by 1.10. For the 5.5% rate, divide by 1.055.',
      },
      {
        question: 'What are the French TVA franchise en base limits for auto-entrepreneurs?',
        answer: 'The base thresholds are €91,900 for goods sales, hospitality, and catering, and €36,800 for service providers and liberal professions. Businesses below these thresholds do not charge or deduct TVA.',
      },
      {
        question: 'What rates apply to Corsica and French overseas departments?',
        answer: 'Corsica and overseas departments (Guadeloupe, Martinique, Réunion) benefit from specific rates, including 0.9%, 2.1%, 8.5%, and 13% depending on the locality and product category.',
      },
      {
        question: 'Is this French TVA calculator free to use for accounting audits?',
        answer: 'Yes. LoveEasyTool provides this calculator 100% free with no tracking, registration, or software installations. All calculations process instantly in your browser tab.',
      },
    ],
  },

  'ireland-vat-calculator': {
    slug: 'ireland-vat-calculator',
    canonicalPath: '/ireland-vat-calculator/',
    countryName: 'Ireland',
    taxName: 'Value Added Tax',
    taxAbbr: 'VAT',
    standardRate: 23,
    reducedRatesSummary: '13.5% reduced rate for electricity, gas, domestic construction, and property repair; 9% for printed and electronic periodicals; 4.8% for agricultural livestock; 0% zero-rate for essential groceries, medicines, books, and oral infant clothing.',
    currencySymbol: '€',
    currencyCode: 'EUR',
    metaTitle: 'Ireland VAT Calculator – Add or Remove 23% VAT | LoveEasyTool',
    metaDescription: 'Free Irish VAT calculator. Add or extract 23% standard or reduced rates from prices in euros (€). Accurate calculations for invoices and receipts in your browser.',
    h1: 'Ireland VAT Calculator',
    intro: 'Calculate Irish Value Added Tax (VAT) in Euros (€) for business invoicing, contractor quotes, and household expense claims. Designed according to Irish Revenue Commissioners regulations, this calculator supports the standard 23% rate as well as reduced commercial rates.',
    ratesOverview: 'Ireland operates a standard VAT rate of 23%, applying to the majority of goods and professional services. Ireland also maintains a 13.5% reduced rate applying to electricity, heating fuel, and construction services; a 9% rate for qualifying sporting and publishing supplies; a 4.8% rate on livestock; and a 0% rating on most basic food supplies, children’s footwear and apparel, and medical equipment.',
    registrationThreshold: {
      heading: 'Who Must Register for Irish VAT?',
      details: 'Under Irish tax regulations enforced by Revenue, business entities and sole traders must register for Irish VAT if their turnover of taxable supplies exceeds €80,000 for the supply of goods, or €40,000 for the supply of services within any continuous 12-month period. Foreign businesses providing taxable supplies in Ireland generally must register immediately without any threshold.',
      mandatoryThreshold: '€80,000 for goods / €40,000 for services (rolling 12 months)',
      voluntaryAllowed: 'Businesses beneath these turnover levels can elect to register for VAT voluntarily to reclaim VAT incurred on qualifying business overheads.',
    },
    workedExamples: [
      {
        title: 'Example 1: Add 23% Irish VAT to €100.00 Net Price',
        description: 'Calculating the total gross invoice figure for professional consultation services.',
        mode: 'add',
        amount: 100,
        rate: 23,
        vatAmount: 23,
        total: 123,
        currency: '€',
        formula: 'Gross = €100.00 × (1 + 0.23) = €123.00 (VAT amount: €23.00)',
      },
      {
        title: 'Example 2: Remove 23% Irish VAT from €369.00 Gross Total',
        description: 'Extracting net expenditure and input tax from an equipment receipt.',
        mode: 'remove',
        amount: 369,
        rate: 23,
        vatAmount: 69,
        total: 300,
        currency: '€',
        formula: 'Net = €369.00 ÷ 1.23 = €300.00 (VAT amount: €369.00 - €300.00 = €69.00)',
      },
    ],
    faqs: [
      {
        question: 'What is the standard VAT rate in Ireland?',
        answer: 'The standard Irish VAT rate is 23%. It applies to most sales of commercial goods and professional services not specifically designated under reduced brackets.',
      },
      {
        question: 'How do you extract 23% Irish VAT from a gross sum?',
        answer: 'To remove 23% VAT from a gross amount, divide the gross figure by 1.23. The result is your net price, and subtracting that net amount from the gross figure reveals the exact VAT paid.',
      },
      {
        question: 'What are the Irish VAT registration thresholds?',
        answer: 'Irish businesses must register for VAT if their annual turnover exceeds €80,000 for the supply of goods, or €40,000 for the supply of services. Voluntary registration is permitted below these limits.',
      },
      {
        question: 'What qualifies for the 13.5% reduced rate in Ireland?',
        answer: 'The 13.5% reduced rate applies to household energy (electricity and gas), building construction, short-term hire of road vehicles, and selected repair and maintenance services.',
      },
      {
        question: 'How often do businesses file VAT returns in Ireland?',
        answer: 'Most VAT-registered businesses in Ireland file returns bi-monthly (every two months) using Revenue’s Online Service (ROS). Smaller traders may qualify for four-monthly or semi-annual filings.',
      },
    ],
  },

  'uae-vat-calculator': {
    slug: 'uae-vat-calculator',
    canonicalPath: '/uae-vat-calculator/',
    countryName: 'United Arab Emirates',
    taxName: 'Value Added Tax',
    taxAbbr: 'VAT',
    standardRate: 5,
    reducedRatesSummary: '0% zero-rate applies to exports of goods and services outside GCC implementing states, international transportation, designated preventive healthcare, basic education services, crude oil, and initial supplies of residential buildings within 3 years of completion.',
    currencySymbol: 'AED',
    currencyCode: 'AED',
    metaTitle: 'UAE VAT Calculator – 5% Tax in Dirhams | LoveEasyTool',
    metaDescription: 'Free UAE VAT calculator. Calculate 5% Value Added Tax on UAE dirhams (AED). Add or remove VAT from invoice totals instantly with complete local privacy.',
    h1: 'UAE VAT Calculator (5% VAT)',
    intro: 'Calculate United Arab Emirates Value Added Tax (VAT) in UAE Dirhams (AED) quickly and reliably. Tailored for UAE mainland companies, free zone entities, retailers, and consumers, this calculator performs forward and reverse 5% tax calculations in compliance with Federal Tax Authority (FTA) guidelines.',
    ratesOverview: 'The United Arab Emirates implements a standard VAT rate of 5% across mainland and designated consumer transactions. In line with Federal Decree-Law No. (8) of 2017, certain transactions qualify for a 0% zero-rating (such as exports, international flights, and primary education), while specific activities including financial margin transactions and local passenger transit are exempt from VAT.',
    registrationThreshold: {
      heading: 'Who Must Register for UAE VAT?',
      details: 'Under UAE Federal Tax Authority (FTA) regulations, a business resident in the UAE is mandated to register for VAT if its taxable supplies and imports exceeded AED 375,000 over the preceding 12 months, or are expected to exceed AED 375,000 in the upcoming 30 days. Non-resident businesses making taxable supplies in the UAE must register regardless of turnover.',
      mandatoryThreshold: 'AED 375,000 annual taxable turnover',
      voluntaryAllowed: 'A business may register voluntarily if its annual turnover or expenses exceed AED 187,500.',
    },
    workedExamples: [
      {
        title: 'Example 1: Add 5% UAE VAT to AED 1,000.00 Net',
        description: 'Generating a commercial tax invoice for software consulting in Dubai or Abu Dhabi.',
        mode: 'add',
        amount: 1000,
        rate: 5,
        vatAmount: 50,
        total: 1050,
        currency: 'AED',
        formula: 'Total = AED 1,000.00 × (1 + 0.05) = AED 1,050.00 (VAT: AED 50.00)',
      },
      {
        title: 'Example 2: Remove 5% UAE VAT from AED 525.00 Gross',
        description: 'Extracting net expenditure and input tax from a retail electronics receipt.',
        mode: 'remove',
        amount: 525,
        rate: 5,
        vatAmount: 25,
        total: 500,
        currency: 'AED',
        formula: 'Net = AED 525.00 ÷ 1.05 = AED 500.00 (VAT: AED 525.00 - AED 500.00 = AED 25.00)',
      },
    ],
    faqs: [
      {
        question: 'What is the standard VAT rate in the UAE?',
        answer: 'The standard VAT rate across the United Arab Emirates is 5%. It was introduced on January 1, 2018, and applies to the majority of commercial and retail transactions.',
      },
      {
        question: 'How do you remove 5% VAT from a UAE total?',
        answer: 'To remove 5% VAT from a gross amount in AED, divide the total figure by 1.05. For example, AED 1,050 divided by 1.05 equals AED 1,000 net, with AED 50 representing the 5% VAT portion.',
      },
      {
        question: 'What is the mandatory threshold for VAT registration with the FTA?',
        answer: 'The mandatory VAT registration threshold is AED 375,000 in annual taxable turnover. Voluntary registration is permitted once turnover or taxable expenses reach AED 187,500.',
      },
      {
        question: 'Are companies located in UAE Free Zones exempt from VAT?',
        answer: 'Not automatically. While certain "Designated Zones" approved by the Cabinet have special rules for transactions between designated entities, standard consumer sales and services delivered from Free Zones to mainland UAE remain subject to 5% VAT.',
      },
      {
        question: 'Does this calculator store financial figures or company invoice details?',
        answer: 'Never. LoveEasyTool operates completely client-side in your web browser. No figures, customer names, or calculations are logged or transmitted to our servers.',
      },
    ],
  },

  'saudi-arabia-vat-calculator': {
    slug: 'saudi-arabia-vat-calculator',
    canonicalPath: '/saudi-arabia-vat-calculator/',
    countryName: 'Saudi Arabia',
    taxName: 'Value Added Tax',
    taxAbbr: 'VAT',
    standardRate: 15,
    reducedRatesSummary: '0% zero-rate applies to exports of goods outside the GCC territory, international transport services, qualifying medicines and approved medical equipment, and investment metals (gold, silver, platinum of 99% purity).',
    currencySymbol: 'SAR',
    currencyCode: 'SAR',
    metaTitle: 'Saudi Arabia VAT Calculator – 15% Tax | LoveEasyTool',
    metaDescription: 'Free Saudi Arabia VAT calculator. Add or extract 15% ZATCA Value Added Tax in Saudi riyals (SAR). Fast, private net and gross tax calculations online.',
    h1: 'Saudi Arabia VAT Calculator (15% VAT)',
    intro: 'Calculate Saudi Arabian Value Added Tax (VAT) in Saudi Riyals (SAR) in both forward and reverse directions. Fully compliant with Zakat, Tax and Customs Authority (ZATCA) regulations, this calculator computes 15% tax additions and deductions for commercial invoicing, Fatoora requirements, and expense bookkeeping.',
    ratesOverview: 'The standard VAT rate in Saudi Arabia is 15%, which took effect on July 1, 2020 (increased from the original 5% rate). Certain essential items and exports qualify for 0% zero-rating, while select financial transactions and residential real estate leases are exempt from VAT under ZATCA guidelines.',
    registrationThreshold: {
      heading: 'Who Must Register for Saudi VAT with ZATCA?',
      details: 'All businesses, establishments, and individuals resident in Saudi Arabia conducting an economic activity must register for VAT with the Zakat, Tax and Customs Authority (ZATCA) if their annual taxable supplies exceed SAR 375,000. Non-resident entities that supply goods or services subject to VAT in Saudi Arabia must register immediately regardless of their turnover volume.',
      mandatoryThreshold: 'SAR 375,000 annual taxable revenue',
      voluntaryAllowed: 'Voluntary registration is available for businesses with annual revenue or expenses exceeding SAR 187,500.',
    },
    workedExamples: [
      {
        title: 'Example 1: Add 15% Saudi VAT to SAR 500.00 Net',
        description: 'Calculating the gross total for a customer electronic tax invoice (Fatoora).',
        mode: 'add',
        amount: 500,
        rate: 15,
        vatAmount: 75,
        total: 575,
        currency: 'SAR',
        formula: 'Total = SAR 500.00 × (1 + 0.15) = SAR 575.00 (VAT: SAR 75.00)',
      },
      {
        title: 'Example 2: Remove 15% Saudi VAT from SAR 1,150.00 Gross',
        description: 'Extracting net commercial cost and deductible input tax from a supplier bill.',
        mode: 'remove',
        amount: 1150,
        rate: 15,
        vatAmount: 150,
        total: 1000,
        currency: 'SAR',
        formula: 'Net = SAR 1,150.00 ÷ 1.15 = SAR 1,000.00 (VAT: SAR 1,150.00 - SAR 1,000.00 = SAR 150.00)',
      },
    ],
    faqs: [
      {
        question: 'What is the standard VAT rate in Saudi Arabia?',
        answer: 'The standard VAT rate in the Kingdom of Saudi Arabia is 15%. This rate was implemented on July 1, 2020, and applies to the majority of goods and services.',
      },
      {
        question: 'How do you remove 15% VAT from a Saudi riyal price?',
        answer: 'To remove 15% VAT from a gross amount in SAR, divide the total figure by 1.15. For example, SAR 1,150 divided by 1.15 equals SAR 1,000 net, with SAR 150 representing the 15% VAT portion.',
      },
      {
        question: 'What is the ZATCA VAT registration threshold in Saudi Arabia?',
        answer: 'The mandatory VAT registration threshold set by ZATCA is SAR 375,000 in annual taxable turnover. Entities with turnover between SAR 187,500 and SAR 375,000 may register voluntarily.',
      },
      {
        question: 'What is ZATCA Fatoora e-invoicing?',
        answer: 'Fatoora is the electronic invoicing initiative implemented by ZATCA requiring businesses to generate structured digital tax invoices (Phase 1 generation and Phase 2 integration) with cryptographic stamps and QR codes.',
      },
      {
        question: 'Are financial simulations on this calculator private?',
        answer: 'Yes. Calculations execute locally in your web browser with zero server communication. No business figures or transaction records are ever transmitted or saved.',
      },
    ],
  },
};
