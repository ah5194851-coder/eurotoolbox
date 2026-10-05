export interface CategoryGuide {
  overviewTitle: string;
  overviewContent: string[];
  featuresTitle: string;
  features: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const CATEGORY_GUIDES: Record<string, CategoryGuide> = {
  text: {
    overviewTitle: 'Professional Browser-Based Text Editing and Analysis',
    overviewContent: [
      'LoveEasyTool Text Tools provide a comprehensive suite of utilities designed for copywriters, editors, digital marketers, software developers, and students. Whether analyzing word density for SEO articles, standardizing typographic capitalization across headlines, stripping errant whitespace from scraped databases, or eliminating duplicate lines in large mailing lists, our utilities execute instantly in memory without sending your copy across the network.',
      'Unlike cloud-based editors that log keystrokes or store draft submissions on remote servers, LoveEasyTool processes all text locally using native JavaScript string manipulation APIs. Your sensitive business memos, private legal contracts, academic theses, and creative manuscripts never leave your personal computer or mobile device.',
    ],
    featuresTitle: 'Core Capabilities of Our Text Suite',
    features: [
      {
        title: 'Precision Word & Character Counting',
        description: 'Calculate total words, characters with and without whitespace, sentence lengths, paragraph structures, and estimated silent reading times at standard typographic reading speeds.',
      },
      {
        title: 'Universal Letter Case Formatting',
        description: 'Convert raw copy into Title Case, UPPERCASE, lowercase, Sentence case, camelCase, snake_case, kebab-case, or Capitalized Words with one click.',
      },
      {
        title: 'Whitespace & Syntax Sanitization',
        description: 'Remove repetitive blank lines, trim leading and trailing spaces, fix errant tab indentations, and format raw copied code or plain text into clean, cohesive paragraphs.',
      },
      {
        title: 'Duplicate Line Identification & Removal',
        description: 'Deduplicate large lists of emails, SKUs, keywords, or log lines while preserving original ordering or sorting items alphabetically.',
      },
    ],
    faqs: [
      {
        question: 'Are my confidential drafts or articles stored on your server?',
        answer: 'No. LoveEasyTool operates under a strict zero-upload architecture. All character counting, case alterations, regex replacements, and line deduplication occur within your web browser JavaScript execution context. No data is logged, sent, or saved remotely.',
      },
      {
        question: 'Is there a limit on how long my text document can be?',
        answer: 'Because processing happens on your local device, you can format documents containing tens of thousands of words or hundreds of thousands of lines without arbitrary server timeouts.',
      },
      {
        question: 'How is estimated reading time calculated?',
        answer: 'Estimated reading time is calculated using an international standard benchmark of 225 words per minute, which accurately reflects adult silent reading speeds across academic and editorial publications.',
      },
      {
        question: 'Can I use these text utilities on mobile browsers?',
        answer: 'Yes. All text manipulation utilities are fully responsive and touch-optimized, functioning seamlessly on iOS Safari, Android Chrome, and modern desktop browsers without downloading apps.',
      },
    ],
  },

  numbers: {
    overviewTitle: 'Accurate Mathematical, Financial, and Health Calculators',
    overviewContent: [
      'LoveEasyTool Number Calculators provide instant, dependable mathematical evaluations for daily personal finance, commercial retail accounting, health assessments, and educational problem-solving. From computing complex multi-tier sales discounts to determining exact Value Added Tax (VAT) gross-to-net splits or personal body mass index, our algorithms deliver immediate precision.',
      'Every calculation formula runs locally in real time as you adjust inputs. There are no complicated formulas to remember, no spreadsheet software requirements, and zero advertising pop-ups disrupting your focus.',
    ],
    featuresTitle: 'Key Calculators in This Cabinet',
    features: [
      {
        title: 'Percentage & Proportion Calculations',
        description: 'Easily calculate percentage increases, decreases, proportional differences, margins, markups, and relative fractions with clear step-by-step breakdowns.',
      },
      {
        title: 'Commercial Discount & Sales Calculations',
        description: 'Determine exact consumer savings, final discounted prices, and promotional savings amounts before checkout or across retail catalog pricing.',
      },
      {
        title: 'Value Added Tax (VAT & Sales Tax)',
        description: 'Calculate net price, gross total, and tax values across standard international VAT rates (5%, 20%, 21%, etc.) with reversible calculations.',
      },
      {
        title: 'Amortized Loan & Mortgage Estimates',
        description: 'Estimate monthly principal and interest payments, total loan payback sums, and complete interest cost over annual loan durations.',
      },
      {
        title: 'Body Mass Index & Exact Age Computing',
        description: 'Assess health weight categories using World Health Organization guidelines, and determine your exact age down to months, weeks, and days.',
      },
    ],
    faqs: [
      {
        question: 'How accurate are the financial calculation formulas?',
        answer: 'All financial formulas use standard international accounting algorithms, including compound amortization formulas for loans and standard proportional division for VAT and discounts.',
      },
      {
        question: 'Do I need an account to save or calculate financial estimates?',
        answer: 'No. No sign-up or personal credentials are required. All mathematical evaluations update instantly on your screen and stay private to your current session.',
      },
      {
        question: 'Does the loan calculator support variable interest rates?',
        answer: 'The loan calculator uses standard fixed-rate amortization modeling, which provides a reliable baseline estimate for fixed mortgages, auto loans, and personal bank financing.',
      },
      {
        question: 'Can I calculate VAT backwards from a gross total price?',
        answer: 'Yes. Our VAT calculator supports both "Add VAT" (from net to gross) and "Remove VAT" (extracting net price and tax portion from a gross total).',
      },
    ],
  },

  files: {
    overviewTitle: 'High-Performance Client-Side Image and File Manipulation',
    overviewContent: [
      'LoveEasyTool File Utilities empower designers, web developers, content creators, and remote workers to compress, resize, crop, and convert graphics directly inside their browser. By leveraging the HTML5 Canvas API and WebAssembly image encoders, we eliminate the need to upload sensitive personal photos, corporate graphics, or product shots to external cloud services.',
      'Achieve optimal file weight for fast web page loading speeds and social media platforms while maintaining crisp photographic fidelity and fine typography.',
    ],
    featuresTitle: 'Key Image Optimization Features',
    features: [
      {
        title: 'Intelligent Quality-Controlled Compression',
        description: 'Shrink photographic file sizes by up to 80% while retaining perceptual sharpness and visual fidelity through fine-grained compression sliders.',
      },
      {
        title: 'Pixel-Perfect Dimension Resizing',
        description: 'Scale images to exact target pixel widths and heights with automatic aspect ratio locking to prevent accidental distortion.',
      },
      {
        title: 'Modern Format Conversion (WebP, JPG, PNG)',
        description: 'Convert bulky legacy image files into next-generation WebP formats for Google Core Web Vitals optimization, or switch PNG graphics to JPG.',
      },
      {
        title: 'Interactive Visual Image Cropping',
        description: 'Crop images to standard social media aspect ratios (1:1, 16:9, 4:3) or custom freeform boundaries with live preview bounding boxes.',
      },
    ],
    faqs: [
      {
        question: 'Are my private photos uploaded to a cloud server during compression?',
        answer: 'Never. Unlike standard online image converters that upload photos to cloud servers, LoveEasyTool performs all image decoding, resizing, compression, and encoding directly in your browser memory via the HTML5 Canvas API.',
      },
      {
        question: 'What image file formats are supported?',
        answer: 'Our tools natively support popular image formats including PNG, JPG, JPEG, and WebP, allowing seamless cross-conversion and optimization.',
      },
      {
        question: 'Will compressing my images reduce their visual quality?',
        answer: 'Our compression algorithm uses advanced perceptual quantization that reduces unnecessary color byte overhead while preserving visual detail. You can preview file size savings in real time.',
      },
      {
        question: 'Can I convert multiple photos in one session?',
        answer: 'Yes. You can process and download images one by one or in sequence with zero wait times, queue delays, or daily usage caps.',
      },
    ],
  },

  pdf: {
    overviewTitle: 'Comprehensive In-Browser PDF Document Operations',
    overviewContent: [
      'LoveEasyTool PDF Tools provide secure, lightning-fast document management without costly desktop software licenses or risky cloud uploads. Whether compiling corporate contracts, combining medical records, splitting academic chapters, compressing file sizes for email attachments, or extracting text into editable formats, our browser-native PDF engine completes the task smoothly.',
      'Because PDF documents frequently contain sensitive legal, tax, medical, and financial records, keeping them off third-party servers is paramount. LoveEasyTool leverages WebAssembly-powered PDF parsing libraries that execute 100% locally on your machine.',
    ],
    featuresTitle: 'Essential PDF Utilities in This Suite',
    features: [
      {
        title: 'Seamless Multi-Document Merging',
        description: 'Combine multiple independent PDF files into a single unified document with intuitive page ordering and quick drag-and-drop sequencing.',
      },
      {
        title: 'Precise Page Range Splitting',
        description: 'Extract specific pages, page ranges, or individual sheets from large PDF files into distinct, lightweight documents.',
      },
      {
        title: 'Lossless PDF File Compression',
        description: 'Optimize PDF structural overhead, embedded metadata, and redundant objects to reduce file size for email limits and portal uploads.',
      },
      {
        title: 'PDF to Editable Text & Word Conversion',
        description: 'Extract raw textual content from PDF files for immediate editing in Microsoft Word, Google Docs, or text editors.',
      },
      {
        title: 'PDF to High-Resolution JPG & Image to PDF',
        description: 'Render PDF pages into crystal-clear JPG images, or package scanned photographs and image receipts into clean, searchable PDF files.',
      },
    ],
    faqs: [
      {
        question: 'Is it safe to merge confidential legal or financial PDFs here?',
        answer: 'Yes, completely safe. LoveEasyTool executes all PDF parsing, page restructuring, and document generation locally in your browser via WebAssembly. Your documents are never sent over the internet or saved to any cloud storage.',
      },
      {
        question: 'Do I have to pay or subscribe after merging a certain number of pages?',
        answer: 'No. All PDF tools are 100% free with no page count restrictions, no watermarks added to your documents, and no subscription paywalls.',
      },
      {
        question: 'What happens if my PDF is password protected?',
        answer: 'If a PDF has an owner password that restricts copying or printing, you must first unlock the file with your authorized credentials before processing it in your browser.',
      },
      {
        question: 'Can I convert scanned photo receipts into a multi-page PDF?',
        answer: 'Yes. Use our JPG to PDF utility to upload multiple image receipts or scanned documents and compile them into a unified PDF file.',
      },
    ],
  },

  time: {
    overviewTitle: 'Accurate Calendar, Date Difference, and Time Calculations',
    overviewContent: [
      'LoveEasyTool Time Tools make calendar mathematics and date duration planning effortless. Whether calculating the exact business days between two project milestones, determining contractual notice periods, counting down to personal anniversaries, or reconciling work schedules, our date calculators provide instant clarity.',
      'Account for leap years, variable month lengths, weekends, and holidays with precision mathematical accuracy. Never miss a legal filing deadline or delivery milestone again.',
    ],
    featuresTitle: 'Time Management & Date Math Features',
    features: [
      {
        title: 'Exact Calendar Date Difference',
        description: 'Calculate the total days, weeks, months, and years between any two chosen dates on the Gregorian calendar.',
      },
      {
        title: 'Working Day & Weekend Breakdown',
        description: 'Distinguish between calendar days and working business days to accurately forecast project delivery dates and sprint intervals.',
      },
      {
        title: 'Forward & Backward Date Offsetting',
        description: 'Add or subtract days, weeks, or months to any starting date to identify future contractual deadlines or review past occurrences.',
      },
    ],
    faqs: [
      {
        question: 'Does the date calculator account for leap years?',
        answer: 'Yes. Our time calculation engine strictly adheres to the standard astronomical Gregorian calendar, accurately factoring in February 29th during leap years.',
      },
      {
        question: 'Can I calculate the number of weeks between two dates?',
        answer: 'Yes. The calculation output displays the total duration broken down into years, months, weeks, and total elapsed days simultaneously.',
      },
      {
        question: 'Is my calendar input data stored or tracked?',
        answer: 'No. Date math executes entirely client-side. No calendar entries, birthdays, or milestone dates are saved, shared, or monitored.',
      },
      {
        question: 'Can this tool calculate working business days excluding weekends?',
        answer: 'Yes. You can easily view both total gross calendar days and business days to plan work schedules and project sprints effectively.',
      },
    ],
  },

  everyday: {
    overviewTitle: 'Essential Everyday Converters for Units, Time Zones, and Currencies',
    overviewContent: [
      'LoveEasyTool Everyday Tools bring together the practical utilities you reach for multiple times a week. From converting metric and imperial measurements for international recipes and engineering specs, to coordinating cross-border meetings across worldwide time zones, our utilities streamline daily decision-making.',
      'All tools load instantly with zero bloat, allowing you to get answers in seconds and return to your primary task without navigating cluttered ad banners or entering personal details.',
    ],
    featuresTitle: 'Practical Everyday Utilities',
    features: [
      {
        title: 'Comprehensive Unit Conversions',
        description: 'Convert length, weight, volume, temperature, and speed across metric, imperial, and US customary measurement systems.',
      },
      {
        title: 'Global World Time Zone Synchronization',
        description: 'Compare current local times across major financial capitals and global cities to schedule video conferences and cross-timezone communication.',
      },
      {
        title: 'Everyday Reference Rates & Values',
        description: 'Quickly look up baseline conversions and numerical standards for international travel, trade, and culinary measurements.',
      },
    ],
    faqs: [
      {
        question: 'Which measurement systems are supported in the unit converter?',
        answer: 'Our unit converter supports metric (meters, grams, liters, Celsius), imperial and US customary units (feet, inches, pounds, ounces, gallons, Fahrenheit) across multiple physical dimensions.',
      },
      {
        question: 'How do time zone conversions handle Daylight Saving Time (DST)?',
        answer: 'Time calculations use the standard international IANA time zone database, ensuring accurate offsets whether regions are currently observing Standard Time or Daylight Saving Time.',
      },
      {
        question: 'Can I use these tools while traveling internationally?',
        answer: 'Yes. Once loaded in your browser, the unit conversion logic executes locally without requiring active cellular data or high-speed Wi-Fi.',
      },
      {
        question: 'Do I need to download an application on my phone?',
        answer: 'No app download is required. LoveEasyTool works smoothly in Safari, Chrome, Firefox, and Edge on all mobile phones and desktop computers.',
      },
    ],
  },

  work: {
    overviewTitle: 'Career, Employment, and Workplace Productivity Tools',
    overviewContent: [
      'LoveEasyTool Career & Work Tools are built to accelerate your professional journey. From crafting clean, recruiter-approved modern resumes with our free CV builder, to drafting tailored cover letters and calculating take-home pay with our gross-to-net salary estimator, our utilities give job seekers and professionals a decisive edge.',
      'Unlike traditional job search platforms that monetize your personal employment history, contact details, and salary requirements, LoveEasyTool keeps your career data strictly private in your local browser.',
    ],
    featuresTitle: 'Professional Career Utilities',
    features: [
      {
        title: 'Free In-Browser CV & Resume Builder',
        description: 'Build polished, ATS-friendly curriculum vitae with customizable work history, education, skills, and summary sections with one-click print and PDF export.',
      },
      {
        title: 'Tailored Cover Letter Generator',
        description: 'Draft compelling professional introduction letters customized to specific job titles, hiring companies, and core candidate qualifications.',
      },
      {
        title: 'Salary Gross-to-Net Estimator',
        description: 'Estimate your net take-home earnings from annual or monthly gross salary offers after standard tax withholdings and deductions.',
      },
    ],
    faqs: [
      {
        question: 'Does LoveEasyTool store or share my resume and personal contact details?',
        answer: 'No. Your resume, contact details, work experience, and educational background are never sent to any external server or recruitment database. All resume drafting occurs locally in your browser memory.',
      },
      {
        question: 'Can I export my completed resume to a PDF format?',
        answer: 'Yes. Once your resume is drafted, you can use the built-in browser print dialog to save a clean, professional PDF file formatted for A4 or Letter sizes.',
      },
      {
        question: 'Is the CV builder free to use, or are there hidden download fees?',
        answer: 'The CV builder is 100% free with no hidden charges, paywalls, or watermarks. You can draft, edit, and export unlimited resumes.',
      },
      {
        question: 'How does the salary estimator calculate take-home pay?',
        answer: 'The salary estimator calculates approximate net take-home earnings based on standard progressive tax brackets, national insurance contributions, and common workplace deductions.',
      },
    ],
  },
};
