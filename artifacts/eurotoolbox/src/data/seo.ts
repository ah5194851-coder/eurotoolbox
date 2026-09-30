export type ToolSeo = {
  title: string;
  description: string;
  intro: string;
  steps: string[];
  features: string[];
  faq: [string, string][];
};

const fileSeo = (name: string, description: string, intro: string): ToolSeo => ({
  title: `${name} - Free Online Tool | LoveEasyTool`,
  description,
  intro,
  steps: ['Choose a file from your device.', 'Adjust the available options and start the browser-side process.', 'Download the result when it is ready.'],
  features: ['Browser-side processing', 'Clear file-state feedback', 'No account required'],
  faq: [['Are my files uploaded?', 'These file operations run in your browser. Your selected files are not sent to a LoveEasyTool server.']],
});

export const toolSeo: Record<string, ToolSeo> = {
  'word-counter': {
    title: 'Word Counter - Free Online Tool | LoveEasyTool',
    description: 'Count words, characters, sentences, lines and reading time with our free online word counter. All text is processed securely in your browser with zero uploads.',
    intro: 'A quick word counter for essays, applications, articles and any text you need to understand at a glance.',
    steps: ['Paste or type your text into the editor.', 'Review the live word, character and line totals.', 'Copy the text or reset the editor when you are finished.'],
    features: ['Live word and character totals', 'Characters with and without spaces', 'Approximate reading time'],
    faq: [['Does this word counter upload my text?', 'No. Text is counted in your browser and is not sent to a server.'], ['Does punctuation affect the word count?', 'Punctuation stays attached to words and does not create extra words.']],
  },
  'character-counter': {
    title: 'Character Counter - Free Online Tool | LoveEasyTool',
    description: 'Count characters with or without spaces in real time with our free online character counter. Accurate text length tool with zero data sent to any server.',
    intro: 'Check text length for forms, social posts, metadata, applications and any field with a character limit.',
    steps: ['Enter or paste text into the editor.', 'Use the live totals to check characters with or without spaces.', 'Copy your text or clear the editor for a new count.'],
    features: ['Characters including spaces', 'Characters excluding whitespace', 'Line and word context'],
    faq: [['Are line breaks counted?', 'Yes. Every character in the text area, including line breaks, contributes to the total.']],
  },
  'case-converter': {
    title: 'Case Converter - Free Online Tool | LoveEasyTool',
    description: 'Convert text to uppercase, lowercase, title case, or sentence case instantly with our free online case converter. Private in-browser tool with zero uploads.',
    intro: 'Fix inconsistent capitalization without retyping a paragraph. The original text remains editable after conversion.',
    steps: ['Paste text into the editor.', 'Choose the capitalization style you need.', 'Apply the transformation and copy the result.'],
    features: ['Uppercase and lowercase conversion', 'Title case for headings', 'Sentence case for readable prose'],
    faq: [['Can I edit the converted text?', 'Yes. The result stays in the editor so you can make final corrections before copying it.']],
  },
  'text-cleaner': {
    title: 'Text Cleaner - Free Online Tool | LoveEasyTool',
    description: 'Clean messy text by removing unwanted spaces, extra line breaks, and formatting clutter with our free online text cleaner. 100% private in-browser utility.',
    intro: 'Turn messy copied text into a cleaner draft while keeping its basic line structure.',
    steps: ['Paste the text you want to tidy.', 'Choose the clean action to collapse whitespace and empty lines.', 'Review the result before copying it.'],
    features: ['Collapses repeated spaces', 'Removes excessive blank lines', 'Trims leading and trailing whitespace'],
    faq: [['Will formatting be preserved?', 'Basic line breaks are preserved, but rich formatting such as bold or colour is not.']],
  },
  'duplicate-line-remover': {
    title: 'Duplicate Line Remover - Free Online Tool | LoveEasyTool',
    description: 'Remove duplicate lines from lists and text while preserving original ordering with our free online duplicate remover. Fast, client-side, and fully private.',
    intro: 'Useful for cleaning tags, lists, exports and pasted data without installing a spreadsheet tool.',
    steps: ['Paste one item or line per row.', 'Apply the duplicate removal action.', 'Check the unique list and copy it when ready.'],
    features: ['Keeps the first occurrence', 'Preserves original order', 'Ignores blank lines'],
    faq: [['Are duplicate lines case-sensitive?', 'Yes. Lines are compared as written after surrounding whitespace is trimmed.']],
  },
  'percentage-calculator': {
    title: 'Percentage Calculator - Free Online Tool | LoveEasyTool',
    description: 'Calculate percentage increases, decreases, fractions, and proportions quickly with our free online percentage calculator. Accurate results with no sign-up.',
    intro: 'Work out everyday percentages for budgets, reports, tips, discounts and quick checks.',
    steps: ['Enter the base amount.', 'Enter the percentage you want to calculate.', 'Read the result and the proportion context.'],
    features: ['Percentage of an amount', 'Clear decimal result', 'No account or server required'],
    faq: [['Does it round the result?', 'The displayed result is rounded to two decimal places for practical everyday use.']],
  },
  'discount-calculator': {
    title: 'Discount Calculator - Free Online Tool | LoveEasyTool',
    description: 'Calculate sale prices and total savings from percentage discounts instantly with our free online discount calculator. Fast, simple math with no sign-up.',
    intro: 'Check sale prices quickly before you buy, compare offers and understand exactly what a percentage discount saves.',
    steps: ['Enter the original price.', 'Enter the discount percentage.', 'Review the final price and amount saved.'],
    features: ['Sale price', 'Amount saved', 'Simple percentage input'],
    faq: [['Does this include sales tax?', 'No. It only applies the discount percentage to the original amount.']],
  },
  'bmi-calculator': {
    title: 'BMI Calculator - Free Online Tool | LoveEasyTool',
    description: 'Estimate Body Mass Index (BMI) and health weight ranges from height and weight with our free online BMI calculator. Fast, private metric calculations.',
    intro: 'Use height in centimetres and weight in kilograms to get a quick BMI estimate for general context.',
    steps: ['Enter your weight in kilograms.', 'Enter your height in centimetres.', 'Read the estimate and reference range context.'],
    features: ['Metric inputs', 'Immediate estimate', 'Plain-language reference range'],
    faq: [['Is BMI medical advice?', 'No. BMI is a broad screening measure and should not replace advice from a qualified professional.']],
  },
  'loan-calculator': {
    title: 'Loan Calculator - Free Online Tool | LoveEasyTool',
    description: 'Estimate monthly loan payments, total interest, and amortization schedules easily with our free online loan calculator. Plan your finances privately today.',
    intro: 'Explore a repayment scenario quickly with a standard amortising-loan estimate.',
    steps: ['Enter the loan amount.', 'Choose the term in years and annual interest rate.', 'Review the estimated monthly payment and interest.'],
    features: ['Monthly payment estimate', 'Total interest context', 'Works without an account'],
    faq: [['Are fees included?', 'No. The estimate does not include lender fees, insurance, taxes or changing rates.']],
  },
  'vat-calculator': {
    title: 'VAT Calculator - Free Online Tool | LoveEasyTool',
    description: 'Calculate net price, gross total, and VAT amounts with adjustable tax rates using our free online VAT calculator. Fast, private tax calculations online.',
    intro: 'Add or remove VAT from an amount for a quick everyday estimate. Rates vary by jurisdiction, so always confirm the applicable rate.',
    steps: ['Enter the net amount.', 'Enter the VAT rate for your situation.', 'Review the VAT amount and gross total.'],
    features: ['Adjustable VAT rate', 'Net, VAT and gross context', 'Clear tax disclaimer'],
    faq: [['Does this know my country’s VAT rate?', 'No. Enter the rate that applies to your country, product and situation.']],
  },
  'age-calculator': {
    title: 'Age Calculator - Free Online Tool | LoveEasyTool',
    description: 'Calculate your exact age in years, months, and days from date of birth with our free online age calculator. Accurate calendar math in your browser tab.',
    intro: 'Find an exact calendar age for forms, milestones and planning without doing date arithmetic by hand.',
    steps: ['Enter the date of birth.', 'Choose the date to calculate on.', 'Read the years, months and days result.'],
    features: ['Calendar-aware calculation', 'Choose any reference date', 'No date leaves your browser'],
    faq: [['Can I calculate an age in the past or future?', 'Yes. Change the calculation date to any valid date.']],
  },
  'image-tools': {
    title: 'Image Compressor & Converter - Free Online Tool | LoveEasyTool',
    description: 'Compress, resize, and convert images between JPG, PNG, and WebP formats locally with our free online image tools. Fast processing with zero server uploads.',
    intro: 'A lightweight image utility for preparing uploads, reducing file size or switching between common formats.',
    steps: ['Choose an image from your device.', 'Set an optional width, format and quality.', 'Download the processed image.'],
    features: ['Local canvas processing', 'JPG, PNG and WebP output', 'Optional width and quality controls'],
    faq: [['Are my images uploaded?', 'No. The processing happens in the browser tab and the selected file is not sent to LoveEasyTool.']],
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF - Free Online Tool | LoveEasyTool',
    description: 'Prepare JPG and image files for clean PDF document export using our free online JPG to PDF tool. Private browser processing keeps your files protected.',
    intro: 'Create a PDF from an image without uploading it. The native print dialog handles the final PDF file on your device.',
    steps: ['Choose a JPG, PNG or WebP image.', 'Preview the image to confirm it is correct.', 'Choose Print / save as PDF and select Save as PDF in the dialog.'],
    features: ['Browser-only image preview', 'Native PDF export path', 'Explicit support limitation'],
    faq: [['Why does it use the print dialog?', 'Browsers cannot guarantee a universal PDF writer without a PDF library. Native print-to-PDF is broadly supported and keeps the file local.']],
  },
  'date-calculator': {
    title: 'Date Calculator - Free Online Tool | LoveEasyTool',
    description: 'Calculate the exact number of days between two dates or add days to any calendar date with our free online date calculator. Fast, accurate, and private.',
    intro: 'Answer common scheduling questions such as how many days separate two dates or what date comes after a given number of days.',
    steps: ['Choose the start and end dates.', 'Read the absolute day difference.', 'Enter days to add to see the resulting date.'],
    features: ['Days between dates', 'Add days to a date', 'Calendar-based browser calculation'],
    faq: [['Does it count inclusive dates?', 'The difference shows elapsed days between the two selected calendar dates.']],
  },
  'unit-converter': {
    title: 'Unit Converter - Free Online Tool | LoveEasyTool',
    description: 'Convert units of length, weight, temperature, area, and speed instantly with our free online unit converter. Fast, accurate calculations in your browser.',
    intro: 'Convert everyday measurements without opening a separate calculator or searching for a conversion table.',
    steps: ['Choose a measurement category.', 'Enter a value and choose its unit.', 'Read the converted value in the result panel.'],
    features: ['Length conversions', 'Weight conversions', 'Celsius and Fahrenheit'],
    faq: [['Are results exact?', 'Results are rounded for display and intended for everyday conversions, not precision engineering.']],
  },
  'time-zone-converter': {
    title: 'Time Zone Converter - Free Online Tool | LoveEasyTool',
    description: 'Convert dates and times across global time zones accurately with our free online time zone converter. Daylight-saving-aware tool running in your browser.',
    intro: 'Compare a moment across cities while accounting for the time-zone data available in your browser.',
    steps: ['Choose a date and time.', 'Select the destination time zone.', 'Read the localized date and time.'],
    features: ['Browser Intl time-zone data', 'Daylight-saving-aware formatting', 'Global zones'],
    faq: [['Which time zones are supported?', 'The tool includes a focused set of common global zones and can be extended over time.']],
  },
  'currency-converter': {
    title: 'Currency Converter - Free Online Tool | LoveEasyTool',
    description: 'Compare global currency values with transparent reference exchange rates using our free online currency converter. Fast, clean math with zero sign-up.',
    intro: 'Use this converter for rough orientation only. It intentionally does not claim to provide live market or bank rates.',
    steps: ['Enter an amount.', 'Choose the source currency.', 'Choose the target currency and read the reference result.'],
    features: ['Common global currencies', 'Clear unavailable-live-rates notice', 'No API key or account required'],
    faq: [['Are these live exchange rates?', 'No. Rates are static reference values for orientation only. Check a live provider or your bank before making a payment.']],
  },
  'cv-builder': {
    title: 'CV Builder - Free Online Tool | LoveEasyTool',
    description: 'Create a clean, professional CV in minutes and download it as a print-ready PDF with our free online CV builder. No account required and zero data uploaded.',
    intro: 'Create a clear, professional CV without registering or paying. Fill in your details, choose a layout and download the result as a PDF. Everything is processed in your browser, so your personal information is never uploaded to a server.',
    steps: ['Enter your name, target role and contact details.', 'Write a short profile and add key skills.', 'Use Print CV and choose Save as PDF if needed.'],
    features: ['Live preview', 'Printable layout', 'No account or upload required'],
    faq: [['Is it really free?', 'Yes. There is no sign-up, watermark or payment.'], ['Is my data safe?', 'Your details stay in the browser and are not uploaded or stored by LoveEasyTool.'], ['Can I use it for international job applications?', 'Yes. Keep it to one or two pages, put recent experience first and check local conventions.'], ['What format can I download?', 'Use the browser print dialog to save your CV as a PDF.']],
  },
  'cover-letter-generator': {
    title: 'Cover Letter Generator - Free Online Tool | LoveEasyTool',
    description: 'Generate tailored cover letter drafts for job applications in seconds with our free online cover letter generator. Fully editable with zero data uploads.',
    intro: 'Start a tailored cover letter faster, then edit the draft with your own achievements and evidence before sending it.',
    steps: ['Enter your name, company and target role.', 'Choose a tone that fits the application.', 'Generate, edit, copy or download your draft.'],
    features: ['Structured first draft', 'Editable output', 'Plain-text download'],
    faq: [['Does this use an AI service?', 'No. The basic draft is generated from a local template in your browser.']],
  },
  'salary-calculator': {
    title: 'Salary Calculator - Free Online Tool | LoveEasyTool',
    description: 'Estimate net take-home pay and tax deductions from gross monthly or annual income with our free online salary calculator. Fast, private financial checks.',
    intro: 'Compare gross salary and a simple deduction estimate without treating the result as payroll advice.',
    steps: ['Enter the gross salary.', 'Choose monthly or yearly input and enter a deduction percentage.', 'Review the estimated take-home amount and the corresponding period.'],
    features: ['Monthly or yearly input', 'Adjustable deduction estimate', 'Clear payroll disclaimer'],
    faq: [['Does this calculate local tax?', 'No. It is a broad percentage estimate. Real payroll depends on country, tax band, pension, benefits and other deductions.']],
  },
  'image-compressor': fileSeo('Image Compressor', 'Reduce image file size while preserving visual quality using our free online image compressor. Local browser compression ensures files stay on your device.', 'Reduce image file size before uploading it to a form, website or message.'),
  'image-resizer': fileSeo('Image Resizer', 'Resize images to custom pixel dimensions or scale proportions easily with our free online image resizer. Fast client-side image processing with no upload.', 'Prepare an image for a profile, listing or upload without handing it to a remote service.'),
  'jpg-to-png': fileSeo('JPG to PNG', 'Convert JPG images to transparent-ready PNG files directly in your web browser with our free online converter. Fast, local file processing with no upload.', 'Switch a JPG into a PNG copy when you need a lossless output format.'),
  'png-to-jpg': fileSeo('PNG to JPG', 'Convert PNG images to compact JPG format with customizable quality settings using our free online converter. Fast, private processing with no file upload.', 'Create a smaller JPG copy of a PNG for sharing or uploading.'),
  'webp-converter': fileSeo('WebP Converter', 'Convert JPG and PNG images to modern lightweight WebP format with our free online WebP converter. Fast in-browser compression keeps your images private.', 'Create a WebP version without uploading the source image.'),
  'image-cropper': fileSeo('Image Cropper', 'Crop images to custom pixel dimensions with ease using our free online image cropper. Fast, client-side image editing with zero files uploaded to servers.', 'Prepare a focused image crop using exact pixel dimensions.'),
  'pdf-to-word': fileSeo('PDF to Word', 'Extract selectable text from PDF documents into editable format using our free online PDF to Word tool. Private browser processing with no file uploads.', 'Extract text from a text-based PDF for editing. Scanned or image-only pages need OCR and may not produce text.'),
  'word-to-pdf': fileSeo('Word to PDF', 'Convert formatted text documents into downloadable PDF files directly in your browser using our free online Word to PDF tool. Fast, private, and simple.', 'Turn plain document content into a simple, selectable PDF without an upload.'),
  'merge-pdf': fileSeo('Merge PDF', 'Combine multiple PDF files into one organized document in seconds using our free online PDF merger. Completely private browser processing with no uploads.', 'Join PDFs locally for a single document that is easier to share or archive.'),
  'split-pdf': fileSeo('Split PDF', 'Extract specific pages or page ranges from PDF files into a new document using our free online PDF splitter. Private browser processing with no uploads.', 'Keep only the pages you need from a larger PDF.'),
  'compress-pdf': fileSeo('Compress PDF', 'Optimize and reduce PDF document file size directly in your web browser with our free online PDF compressor. Fast local processing with no file uploads.', 'Create a fresh PDF copy with object streams enabled. Results vary by source document.'),
  'pdf-to-jpg': fileSeo('PDF to JPG', 'Render PDF document pages into high-quality downloadable JPG images using our free online PDF to JPG tool. Private browser rendering with zero uploads.', 'Turn pages from a text or image PDF into separate image files for easy sharing.'),
};

const commonFaq: [string, string][] = [
  ['Does it work without an account?', 'Yes. LoveEasyTool tools are free to use without registration or a sign-in.'],
  ['Where is my result saved?', 'The result is created in this browser tab. Choose the download action when you are ready to save a copy on your device.'],
];

Object.values(toolSeo).forEach(seo => {
  for (const question of commonFaq) {
    if (seo.faq.length >= 3) break;
    if (!seo.faq.some(([existingQuestion]) => existingQuestion === question[0])) seo.faq.push(question);
  }
});
