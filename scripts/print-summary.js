const fs = require('fs');

const report = JSON.parse(
  fs.readFileSync('merged-report.json', 'utf8')
);

let passed = 0;
let failed = 0;
let skipped = 0;
let flaky = 0;

function walkSuites(suites = []) {
  for (const suite of suites) {
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

    walkSuites(suite.suites);
  }
}

walkSuites(report.suites);

console.log('\n==============================');
console.log(' PLAYWRIGHT TEST SUMMARY');
console.log('==============================');
console.log(`✅ Passed : ${passed}`);
console.log(`❌ Failed : ${failed}`);
console.log(`⏭️ Skipped: ${skipped}`);
console.log(`⚠️ Flaky  : ${flaky}`);
console.log('==============================\n');