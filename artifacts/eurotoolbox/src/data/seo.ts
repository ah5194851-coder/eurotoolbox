export type ToolSeo = {
  title: string;
  description: string;
  intro: string;
  steps: string[];
  features: string[];
  faq: [string, string][];
};

const fileSeo = (name: string, description: string, intro: string): ToolSeo => ({
  title: `${name} – Free Browser Tool | EuroToolBox`,
  description,
  intro,
  steps: ['Choose a file from your device.', 'Adjust the available options and start the browser-side process.', 'Download the result when it is ready.'],
  features: ['Browser-side processing', 'Clear file-state feedback', 'No account required'],
  faq: [['Are my files uploaded?', 'These file operations run in your browser. Your selected files are not sent to a EuroToolBox server.']],
});

export const toolSeo: Record<string, ToolSeo> = {
  'word-counter': {
    title: 'Word Counter Online – Free and Private | EuroToolBox',
    description: 'Count words, characters, lines and reading time in your text with a free browser-based word counter.',
    intro: 'A quick word counter for essays, applications, articles and any text you need to understand at a glance.',
    steps: ['Paste or type your text into the editor.', 'Review the live word, character and line totals.', 'Copy the text or reset the editor when you are finished.'],
    features: ['Live word and character totals', 'Characters with and without spaces', 'Approximate reading time'],
    faq: [['Does this word counter upload my text?', 'No. Text is counted in your browser and is not sent to a server.'], ['Does punctuation affect the word count?', 'Punctuation stays attached to words and does not create extra words.']],
  },
  'character-counter': {
    title: 'Character Counter – Count Characters Online | EuroToolBox',
    description: 'Count characters with or without spaces in a private, free online character counter.',
    intro: 'Check text length for forms, social posts, metadata, applications and any field with a character limit.',
    steps: ['Enter or paste text into the editor.', 'Use the live totals to check characters with or without spaces.', 'Copy your text or clear the editor for a new count.'],
    features: ['Characters including spaces', 'Characters excluding whitespace', 'Line and word context'],
    faq: [['Are line breaks counted?', 'Yes. Every character in the text area, including line breaks, contributes to the total.']],
  },
  'case-converter': {
    title: 'Case Converter – Uppercase, Lowercase and Title Case | EuroToolBox',
    description: 'Convert text to uppercase, lowercase, title case or sentence case directly in your browser.',
    intro: 'Fix inconsistent capitalization without retyping a paragraph. The original text remains editable after conversion.',
    steps: ['Paste text into the editor.', 'Choose the capitalization style you need.', 'Apply the transformation and copy the result.'],
    features: ['Uppercase and lowercase conversion', 'Title case for headings', 'Sentence case for readable prose'],
    faq: [['Can I edit the converted text?', 'Yes. The result stays in the editor so you can make final corrections before copying it.']],
  },
  'text-cleaner': {
    title: 'Text Cleaner – Remove Extra Spaces and Empty Lines | EuroToolBox',
    description: 'Clean pasted text by removing repeated spaces, empty lines and trailing whitespace.',
    intro: 'Turn messy copied text into a cleaner draft while keeping its basic line structure.',
    steps: ['Paste the text you want to tidy.', 'Choose the clean action to collapse whitespace and empty lines.', 'Review the result before copying it.'],
    features: ['Collapses repeated spaces', 'Removes excessive blank lines', 'Trims leading and trailing whitespace'],
    faq: [['Will formatting be preserved?', 'Basic line breaks are preserved, but rich formatting such as bold or colour is not.']],
  },
  'duplicate-line-remover': {
    title: 'Remove Duplicate Lines Online – Free Text Tool | EuroToolBox',
    description: 'Remove repeated lines from a list while keeping the first occurrence in its original order.',
    intro: 'Useful for cleaning tags, lists, exports and pasted data without installing a spreadsheet tool.',
    steps: ['Paste one item or line per row.', 'Apply the duplicate removal action.', 'Check the unique list and copy it when ready.'],
    features: ['Keeps the first occurrence', 'Preserves original order', 'Ignores blank lines'],
    faq: [['Are duplicate lines case-sensitive?', 'Yes. Lines are compared as written after surrounding whitespace is trimmed.']],
  },
  'percentage-calculator': {
    title: 'Percentage Calculator – Free Online Calculator | EuroToolBox',
    description: 'Calculate a percentage of an amount and compare proportions with a simple browser-based calculator.',
    intro: 'Work out everyday percentages for budgets, reports, tips, discounts and quick checks.',
    steps: ['Enter the base amount.', 'Enter the percentage you want to calculate.', 'Read the result and the proportion context.'],
    features: ['Percentage of an amount', 'Clear decimal result', 'No account or server required'],
    faq: [['Does it round the result?', 'The displayed result is rounded to two decimal places for practical everyday use.']],
  },
  'discount-calculator': {
    title: 'Discount Calculator – Find Sale Price and Savings | EuroToolBox',
    description: 'Calculate a discounted sale price and the amount saved from an original price.',
    intro: 'Check sale prices quickly before you buy, compare offers and understand exactly what a percentage discount saves.',
    steps: ['Enter the original price.', 'Enter the discount percentage.', 'Review the final price and amount saved.'],
    features: ['Sale price', 'Amount saved', 'Simple percentage input'],
    faq: [['Does this include sales tax?', 'No. It only applies the discount percentage to the original amount.']],
  },
  'bmi-calculator': {
    title: 'BMI Calculator – Estimate Body Mass Index | EuroToolBox',
    description: 'Estimate BMI from height and weight with a clear browser-based BMI calculator.',
    intro: 'Use height in centimetres and weight in kilograms to get a quick BMI estimate for general context.',
    steps: ['Enter your weight in kilograms.', 'Enter your height in centimetres.', 'Read the estimate and reference range context.'],
    features: ['Metric inputs', 'Immediate estimate', 'Plain-language reference range'],
    faq: [['Is BMI medical advice?', 'No. BMI is a broad screening measure and should not replace advice from a qualified professional.']],
  },
  'loan-calculator': {
    title: 'Loan Calculator – Estimate Monthly Payments | EuroToolBox',
    description: 'Estimate monthly loan payments and total interest from amount, term and annual rate.',
    intro: 'Explore a repayment scenario quickly with a standard amortising-loan estimate.',
    steps: ['Enter the loan amount.', 'Choose the term in years and annual interest rate.', 'Review the estimated monthly payment and interest.'],
    features: ['Monthly payment estimate', 'Total interest context', 'Works without an account'],
    faq: [['Are fees included?', 'No. The estimate does not include lender fees, insurance, taxes or changing rates.']],
  },
  'vat-calculator': {
    title: 'VAT Calculator – Add VAT to a Net Price | EuroToolBox',
    description: 'Calculate VAT and a gross price from a net amount and adjustable VAT percentage.',
    intro: 'Add VAT to a net price for a quick everyday estimate. Rates vary by country and product, so always confirm the applicable rate.',
    steps: ['Enter the net amount.', 'Enter the VAT rate for your situation.', 'Review the VAT amount and gross total.'],
    features: ['Adjustable VAT rate', 'Net, VAT and gross context', 'Clear tax disclaimer'],
    faq: [['Does this know my country’s VAT rate?', 'No. Enter the rate that applies to your country, product and situation.']],
  },
  'age-calculator': {
    title: 'Age Calculator – Calculate Exact Age from Date of Birth | EuroToolBox',
    description: 'Calculate an exact age in years, months and days between a date of birth and a chosen date.',
    intro: 'Find an exact calendar age for forms, milestones and planning without doing date arithmetic by hand.',
    steps: ['Enter the date of birth.', 'Choose the date to calculate on.', 'Read the years, months and days result.'],
    features: ['Calendar-aware calculation', 'Choose any reference date', 'No date leaves your browser'],
    faq: [['Can I calculate an age in the past or future?', 'Yes. Change the calculation date to any valid date.']],
  },
  'image-tools': {
    title: 'Image Compressor and Converter – Resize Images Online | EuroToolBox',
    description: 'Resize, compress and convert JPG, PNG or WebP images locally in your browser.',
    intro: 'A lightweight image utility for preparing uploads, reducing file size or switching between common formats.',
    steps: ['Choose an image from your device.', 'Set an optional width, format and quality.', 'Download the processed image.'],
    features: ['Local canvas processing', 'JPG, PNG and WebP output', 'Optional width and quality controls'],
    faq: [['Are my images uploaded?', 'No. The processing happens in the browser tab and the selected file is not sent to EuroToolBox.']],
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF – Save an Image as PDF | EuroToolBox',
    description: 'Prepare a JPG or image for PDF export using your browser’s print-to-PDF workflow.',
    intro: 'Create a PDF from an image without uploading it. The native print dialog handles the final PDF file on your device.',
    steps: ['Choose a JPG, PNG or WebP image.', 'Preview the image to confirm it is correct.', 'Choose Print / save as PDF and select Save as PDF in the dialog.'],
    features: ['Browser-only image preview', 'Native PDF export path', 'Explicit support limitation'],
    faq: [['Why does it use the print dialog?', 'Browsers cannot guarantee a universal PDF writer without a PDF library. Native print-to-PDF is broadly supported and keeps the file local.']],
  },
  'date-calculator': {
    title: 'Date Calculator – Days Between Dates and Date Addition | EuroToolBox',
    description: 'Count days between dates and add days to a starting date with a free date calculator.',
    intro: 'Answer common scheduling questions such as how many days separate two dates or what date comes after a given number of days.',
    steps: ['Choose the start and end dates.', 'Read the absolute day difference.', 'Enter days to add to see the resulting date.'],
    features: ['Days between dates', 'Add days to a date', 'Calendar-based browser calculation'],
    faq: [['Does it count inclusive dates?', 'The difference shows elapsed days between the two selected calendar dates.']],
  },
  'unit-converter': {
    title: 'Unit Converter – Length, Weight and Temperature | EuroToolBox',
    description: 'Convert common length, weight and temperature units with a quick browser-based converter.',
    intro: 'Convert everyday measurements without opening a separate calculator or searching for a conversion table.',
    steps: ['Choose a measurement category.', 'Enter a value and choose its unit.', 'Read the converted value in the result panel.'],
    features: ['Length conversions', 'Weight conversions', 'Celsius and Fahrenheit'],
    faq: [['Are results exact?', 'Results are rounded for display and intended for everyday conversions, not precision engineering.']],
  },
  'time-zone-converter': {
    title: 'Time Zone Converter – Compare Cities and Local Times | EuroToolBox',
    description: 'Convert a date and time across European, American and Asian time zones using browser time-zone rules.',
    intro: 'Compare a moment across cities while accounting for the time-zone data available in your browser.',
    steps: ['Choose a date and time.', 'Select the destination time zone.', 'Read the localized date and time.'],
    features: ['Browser Intl time-zone data', 'Daylight-saving-aware formatting', 'European and global zones'],
    faq: [['Which time zones are supported?', 'The tool includes a focused set of common European and global zones and can be extended later.']],
  },
  'currency-converter': {
    title: 'Currency Converter – Reference Rates with Clear Limits | EuroToolBox',
    description: 'Compare common currencies with clearly labelled static reference rates while live rates are unavailable.',
    intro: 'Use this converter for rough orientation only. It intentionally does not claim to provide live market or bank rates.',
    steps: ['Enter an amount.', 'Choose the source currency.', 'Choose the target currency and read the reference result.'],
    features: ['Common European and global currencies', 'Clear unavailable-live-rates notice', 'No API key or account required'],
    faq: [['Are these live exchange rates?', 'No. Rates are static reference values for orientation only. Check a live provider or your bank before making a payment.']],
  },
  'cv-builder': {
    title: 'Free CV Builder: Create a Professional CV Online | EuroToolBox',
    description: 'Build a clean, professional CV in minutes and download it as a PDF. No sign-up, and your details never leave your browser.',
    intro: 'Create a clear, professional CV without registering or paying. Fill in your details, choose a layout and download the result as a PDF. Everything is processed in your browser, so your personal information is never uploaded to a server.',
    steps: ['Enter your name, target role and contact details.', 'Write a short profile and add key skills.', 'Use Print CV and choose Save as PDF if needed.'],
    features: ['Live preview', 'Printable layout', 'No account or upload required'],
    faq: [['Is it really free?', 'Yes. There is no sign-up, watermark or payment.'], ['Is my data safe?', 'Your details stay in the browser and are not uploaded or stored by EuroToolBox.'], ['Can I use it for jobs in Europe?', 'Yes. Keep it to one or two pages, put recent experience first and check local conventions such as photos.'], ['What format can I download?', 'Use the browser print dialog to save your CV as a PDF.']],
  },
  'cover-letter-generator': {
    title: 'Cover Letter Generator – Create a Job Application Draft | EuroToolBox',
    description: 'Generate an editable cover-letter starting draft from your name, company, role and preferred tone.',
    intro: 'Start a tailored cover letter faster, then edit the draft with your own achievements and evidence before sending it.',
    steps: ['Enter your name, company and target role.', 'Choose a tone that fits the application.', 'Generate, edit, copy or download your draft.'],
    features: ['Structured first draft', 'Editable output', 'Plain-text download'],
    faq: [['Does this use an AI service?', 'No. The basic draft is generated from a local template in your browser.']],
  },
  'salary-calculator': {
    title: 'Salary Calculator – Estimate Take-Home Pay | EuroToolBox',
    description: 'Estimate monthly or yearly take-home salary after a simple percentage deduction.',
    intro: 'Compare gross salary and a simple deduction estimate without treating the result as payroll advice.',
    steps: ['Enter the gross salary.', 'Choose monthly or yearly input and enter a deduction percentage.', 'Review the estimated take-home amount and the corresponding period.'],
    features: ['Monthly or yearly input', 'Adjustable deduction estimate', 'Clear payroll disclaimer'],
    faq: [['Does this calculate local tax?', 'No. It is a broad percentage estimate. Real payroll depends on country, tax band, pension, benefits and other deductions.']],
  },
  'image-compressor': fileSeo('Image Compressor', 'Compress JPG, PNG or WebP images online with local quality controls.', 'Reduce image file size before uploading it to a form, website or message.'),
  'image-resizer': fileSeo('Image Resizer', 'Resize an image to a chosen width in your browser and download the result.', 'Prepare an image for a profile, listing or upload without handing it to a remote service.'),
  'jpg-to-png': fileSeo('JPG to PNG', 'Convert a JPG image to PNG locally with a free browser-based converter.', 'Switch a JPG into a PNG copy when you need a lossless output format.'),
  'png-to-jpg': fileSeo('PNG to JPG', 'Convert a PNG image to JPG with adjustable quality in your browser.', 'Create a smaller JPG copy of a PNG for sharing or uploading.'),
  'webp-converter': fileSeo('WebP Converter', 'Convert common image files to WebP locally for smaller web-ready downloads.', 'Create a WebP version without uploading the source image.'),
  'image-cropper': fileSeo('Image Cropper', 'Crop the top-left portion of an image to a chosen size in your browser.', 'Prepare a focused image crop using exact pixel dimensions.'),
  'pdf-to-word': fileSeo('PDF to Word', 'Extract selectable PDF text into an editable text document in your browser.', 'Extract text from a text-based PDF for editing. Scanned or image-only pages need OCR and may not produce text.'),
  'word-to-pdf': fileSeo('Word to PDF', 'Create and download a PDF from text directly in your browser.', 'Turn plain document content into a simple, selectable PDF without an upload.'),
  'merge-pdf': fileSeo('Merge PDF', 'Combine multiple PDF files into one downloadable PDF in your browser.', 'Join PDFs locally for a single document that is easier to share or archive.'),
  'split-pdf': fileSeo('Split PDF', 'Extract selected pages from a PDF into a new downloadable file.', 'Keep only the pages you need from a larger PDF.'),
  'compress-pdf': fileSeo('Compress PDF', 'Re-save a PDF with browser-side optimization where the document allows it.', 'Create a fresh PDF copy with object streams enabled. Results vary by source document.'),
  'pdf-to-jpg': fileSeo('PDF to JPG', 'Render PDF pages to downloadable JPG images in your browser.', 'Turn pages from a text or image PDF into separate image files for easy sharing.'),
};

const commonFaq: [string, string][] = [
  ['Does it work without an account?', 'Yes. EuroToolBox tools are free to use without registration or a sign-in.'],
  ['Where is my result saved?', 'The result is created in this browser tab. Choose the download action when you are ready to save a copy on your device.'],
];

Object.values(toolSeo).forEach(seo => {
  for (const question of commonFaq) {
    if (seo.faq.length >= 3) break;
    if (!seo.faq.some(([existingQuestion]) => existingQuestion === question[0])) seo.faq.push(question);
  }
});