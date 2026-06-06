const fs = require('fs');

const html = `
<html>
  <body>
    <h1>Playwright Dashboard</h1>
    <p>Generated successfully</p>
  </body>
</html>
`;

fs.writeFileSync('playwright-dashboard.html', html);
fs.writeFileSync('email.html', html);

console.log('Dashboard generated');