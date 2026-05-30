# Playwright Test Automation Framework

Automated UI testing framework built with Playwright and TypeScript.

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Parallel test execution
- Page Object Model (POM) support
- HTML test reports
- Screenshots on failure
- Video recording support
- Trace viewer integration
- Environment-based configuration
- CI/CD ready

---

## Prerequisites

Before running the project, install:

- Node.js (LTS version recommended)
- npm

Verify installation:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Project Structure

```text
project-root/
│
├── tests/                  # Test files
├── pages/                  # Page Object Models
├── fixtures/               # Custom fixtures
├── test-data/              # Test data
├── utils/                  # Utility functions
├── config/                 # Environment configuration
├── playwright.config.ts    # Playwright configuration
├── package.json
└── README.md
```

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run tests in a specific browser

Chromium:

```bash
npx playwright test --project=chromium
```

Firefox:

```bash
npx playwright test --project=firefox
```

WebKit:

```bash
npx playwright test --project=webkit
```

---

## Debugging Tests

Run in debug mode:

```bash
npx playwright test --debug
```

Use Playwright Inspector:

```bash
PWDEBUG=1 npx playwright test
```

Run a single test:

```bash
npx playwright test -g "Test Name"
```

---

## Test Reports

Generate and open the HTML report:

```bash
npx playwright show-report
```

Report location:

```text
playwright-report/
```

---

## Trace Viewer

Run tests with tracing enabled:

```bash
npx playwright test --trace on
```

Open trace:

```bash
npx playwright show-trace trace.zip
```

Usage:

```ts
import { config } from "../utils/config";

await page.goto(config.baseURL);
```

---

## Useful Commands

| Command                        | Description              |
| ------------------------------ | ------------------------ |
| `npx playwright test`          | Run all tests            |
| `npx playwright test --headed` | Run with browser visible |
| `npx playwright test --debug`  | Debug tests              |
| `npx playwright show-report`   | Open HTML report         |
| `npx playwright codegen`       | Generate Playwright code |
| `npx playwright install`       | Install browsers         |

## License

This project is intended for internal automation testing purposes.
