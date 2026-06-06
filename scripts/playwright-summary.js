const fs = require('fs');

const report = JSON.parse(fs.readFileSync('merged-report.json', 'utf-8'));

let passed = 0;
let failed = 0;
let skipped = 0;
let flaky = 0;

for (const suite of report.suites || []) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const results = test.results || [];

      const hasPassed = results.some(r => r.status === 'passed');
      const hasFailed = results.some(r => r.status === 'failed');
      const hasSkipped = results.some(r => r.status === 'skipped');

      if (hasSkipped) skipped++;
      else if (hasPassed && hasFailed) flaky++;
      else if (hasPassed) passed++;
      else if (hasFailed) failed++;
    }
  }
}

const summary = `
## 🎭 Playwright Test Summary

- ✅ Passed: ${passed}
- ❌ Failed: ${failed}
- ⏭ Skipped: ${skipped}
- ⚠️ Flaky: ${flaky}
`;

fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);

console.log(summary);