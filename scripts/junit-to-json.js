const fs = require('fs');

const file = 'test-results/junit.xml';

// =====================================================
// Check if JUnit exists
// =====================================================
if (!fs.existsSync(file)) {
  console.log('❌ No JUnit file found');
  process.exit(0);
}

const xml = fs.readFileSync(file, 'utf-8');

// =====================================================
// Extract data from XML
// =====================================================
const total = (xml.match(/<testcase/g) || []).length;
const failed = (xml.match(/<failure/g) || []).length;
const skipped = (xml.match(/<skipped/g) || []).length;
const passed = total - failed - skipped;

// =====================================================
// Build JSON output
// =====================================================
const report = {
  timestamp: new Date().toISOString(),
  total,
  passed,
  failed,
  skipped
};

// =====================================================
// Save JSON file
// =====================================================
fs.writeFileSync(
  'report.json',
  JSON.stringify(report, null, 2)
);

console.log('✅ report.json generated successfully');