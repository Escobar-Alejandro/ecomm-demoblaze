# ecomm-demoblaze

Automation testing framework for the Demoblaze e-commerce site located in: https://www.demoblaze.com/ , built with TypeScript + Playwright using a Page Object Model (POM) design pattern.

Project key: DEBL.

A Trello board has been created to track tasks, stories and test cases. Please reach out to the workspace manager to be added.

## 1) Contents

- End-to-end UI tests for key user flows:
	- Product data extraction (`tests/productList/productData.spec.ts`)
	- Checkout/place order (`tests/checkout/placeOrder.spec.ts`)
	- User sign up (`tests/userAccount/signUp.spec.ts`)
	- User log in (`tests/userAccount/logIn.spec.ts`)
- POM layer in `page-objects/`
- Shared fixtures in `fixtures/pageManager.fixture.ts`
- Multi-environment URL selection (`prod`, `staging`, `dev`)
	- Support for multi-environment variants of web element selectors
- Smoke workflow in GitHub Actions (`.github/workflows/smoke.yml`)

---

## 2) Prerequisites

Install these before running the framework:

- Node.js 18+ (recommended: 18 or 20)
- npm (comes with Node.js)
- Git

Optional (recommended):

- VS Code with Playwright extension

---

## 3) Clone and install

```bash
git clone https://github.com/Escobar-Alejandro/ecomm-demoblaze.git
cd ecomm-demoblaze
npm ci
```

Install Playwright browser dependencies and browsers:

```bash
npx playwright install
```

> On Windows, `install-deps` is mainly for Linux CI runners, but `npx playwright install` is still required.

```bash
npx playwright install-deps
```

---

## 4) Environment configuration

The framework resolves the base URL from:

- `process.env.ENVIRONMENT` (expected values: `prod`, `staging`, `dev`)
- URL map in `config/environmentUrls.json`
- Resolver in `config/environmentPicker.ts`

Default behavior in this project relies on setting `ENVIRONMENT` explicitly.

### Use a local `.env` file

Create `.env` at repository root:

```
ENVIRONMENT=prod
```

`config/loadEnv.ts` loads `.env` if present. If it does not exist, tests can still run as long as your environment variable is set externally, for example in a workflow file.

---

## 5) Run tests

### Run all tests

```bash
npx playwright test
```

### Run smoke tests

```bash
npx playwright test --grep '@smoke'
```

### Run a single file

```bash
npx playwright test tests/userAccount/logIn.spec.ts
```

### Run a specific project/browser

```bash
npx playwright test --project=chromium
```

---

## 6) View reports

After execution:

```bash
npx playwright show-report
```

Artifacts are generated in:

- `playwright-report/`
- `output/` (for runtime-generated JSON/data files when applicable)

---

## 7) Project structure (high level)

```text
config/          # env loading and env URL selection
fixtures/        # Playwright fixture extension (homePage, cartPage, etc.)
models/          # enums and shared constants (timeouts/environments)
page-objects/    # POM classes
tests/           # test suites by domain and by feature
```

---

## 8) Code style and linting

ESLint is configured with:

- TypeScript ESLint flat config
- Playwright plugin rules
- Stylistic plugin rules

Config file: `eslint.config.mjs`

Run lint manually:

```bash
npx eslint .
```

Auto-fix lint issues:

```bash
npx eslint . --fix
```

---

## 9) CI workflow (manual trigger)

Smoke workflow file: `.github/workflows/smoke.yml`

Current behavior:

- Trigger: manual (`workflow_dispatch`)
- Installs dependencies + Playwright dependencies + browsers
- Runs smoke tests: `npx playwright test --grep '@smoke'`
- Uploads artifacts:
	- `playwright-report`
	- `output` directory (if present)

How to run manually in GitHub:

1. Go to **Actions** tab
2. Select **Smoke Tests**
3. Click **Run workflow**

---

## 10) Good practices for contributors

- Keep tests independent and deterministic
- Use explicit or fluent waits tied to UI/network signals over implicit hard sleeps
- Use page objects for locators and actions, not raw selectors in specs
- Keep tags consistent (`@smoke`, `@regression`, etc.)
- Run locally before creating a PR

```bash
npx playwright test --project=chromium
```

## 11) Future plans

The ecommerce will eventually grow and we must prepare our framework for that. As the test case repository grows there will be multiple workflows divided into each feature, running periodically at different hours to keep resource usage controlled.

Planned features:
- Actions manager
	- Encapsulate commonly used methods and divide them in different clases like "MouseActions", "KeyboardActions", "BrowserActions" and "ElementActions"
- Scheduled workflows and customizable workflows on demand (Possibility to use different tags or variables before running them).
- Integration with test case manager (like Xray or Testrail).
- Dynamic test data handling integrating Demoblaze API to improve test case speed when needed.
- Switch locator system on getting a Timeout exception when looking for an element, if using a Prod locator try using a locator variant from one level deeper like Staging, this way we plan ahead for new features and tests don't become flaky after a deploy. If this occurs, the method will warn that the locator must be updated, but the test will not fail to flakyness. (Using a short timeout to avoid wasting too much time and resources)
