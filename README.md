# Playwright Test Automation Framework

Automated UI and API testing framework built with Playwright and TypeScript.

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Parallel execution
- Page Object Model (POM)
- HTML reports, screenshots, videos, and traces
- Environment-based configuration
- GitHub Actions CI/CD integration

## Prerequisites

- Node.js (LTS)
- npm

```bash
node -v
npm -v
```

## Setup

```bash
git clone <repository-url>
cd <project-folder>
npm install
npx playwright install
```

## Project Structure

```text
tests/              Test files
pages/              Page Objects
fixtures/           Custom fixtures
test-data/          Test data
utils/              Utilities
config/             Environment configs
playwright.config.ts
```

## Run Tests

```bash
# Run all tests
npx playwright test

# Run a specific test
npx playwright test tests/login.spec.ts

# Run in headed mode
npx playwright test --headed

# Run by browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Debugging

```bash
npx playwright test --debug
PWDEBUG=1 npx playwright test
npx playwright test -g "Test Name"
```

## Reports

```bash
npx playwright show-report
```

Report location:

```text
playwright-report/
```

## Useful Commands

| Command                        | Description              |
| ------------------------------ | ------------------------ |
| `npx playwright test`          | Run all tests            |
| `npx playwright test --headed` | Run with browser visible |
| `npx playwright test --debug`  | Debug tests              |
| `npx playwright show-report`   | Open HTML report         |
| `npx playwright codegen`       | Generate Playwright code |
| `npx playwright install`       | Install browsers         |

## Framework Architecture

The framework follows a layered architecture to improve maintainability, reusability, and scalability.

```text
tests/
├── ui/                     # UI test scenarios
├── api/                    # API test scenarios
│
pages/                      # Page Object Models
├── LoginPage.ts
├── DashboardPage.ts
├── PIMPage.ts
│
api/                        # API clients/services
├── EmployeeApi.ts
│
fixtures/                   # Shared test fixtures
├── test-fixtures.ts
│
utils/                      # Reusable utilities
├── randomData.ts
├── config.ts
├── test-data.ts
│
│
config/                     # Environment configuration
├── env.ts
│
.github/workflows/          # GitHub Actions CI/CD
├── playwright.yml
```

### Design Principles

- **Page Object Model (POM)** for UI interactions
- **API Service Layer** for API requests and validations
- **Reusable Utilities** for common actions and assertions
- **Fixtures** for shared setup and authentication
- **Data-Driven Testing** using external test data
- **CI/CD Integration** with GitHub Actions
- **Hybrid UI + API Validation** for end-to-end verification

### Test Flow

```text
Test
 ├─ Fixture Setup
 ├─ Page Object / API Service
 ├─ Assertions
 └─ Report Generation

GitHub Actions
 ├─ UI Tests
 ├─ API Tests
 ├─ Merge Reports
 ├─ Generate Summary
 └─ Email Notification
```
