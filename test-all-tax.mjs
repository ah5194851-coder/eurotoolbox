import { COUNTRIES_CONFIG, VERIFIED_COUNTRY_IDS, calculateSalaryBreakdown } from './artifacts/eurotoolbox/src/data/tax-config.ts';

console.log("Countries count:", Object.keys(COUNTRIES_CONFIG).length);
console.log("Verified IDs count:", VERIFIED_COUNTRY_IDS.length);

for (const id of VERIFIED_COUNTRY_IDS) {
  const cfg = COUNTRIES_CONFIG[id];
  console.log(`\n--- ${cfg.countryName} (${id}) [${cfg.taxYear}] ---`);
  for (const gross of cfg.commonSalaries.slice(0, 3)) {
    const res = calculateSalaryBreakdown({
      grossAmount: gross,
      period: 'Annual',
      country: id,
    });
    console.log(`  Gross: ${cfg.currencySymbol}${gross.toLocaleString()} | Tax: ${res.incomeTaxAnnual.toFixed(2)} | Social: ${res.socialContributionAnnual.toFixed(2)} | Net: ${res.netPayAnnual.toFixed(2)} (${res.effectiveTotalDeductionRatePct.toFixed(1)}%)`);
  }
}
