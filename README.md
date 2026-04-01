# QA Automation Challenge — Playwright

QA automation challenge using **Playwright** to test the **Cypress Real World App (RWA)**.
The project focuses on **reliability, maintainability, clear structure, and practical challenge-ready automation**.

---

## 📌 Mini Test Plan & Scope

### Scope

**In scope**

- UI validation of the main user journey: sign in, landing/feed visibility, and payment creation.
- API validation of core service behavior for authentication and transaction retrieval.
- Verification of stable selectors, basic response contracts, and critical happy-path behavior.

**Out of scope**

- Full regression coverage of the RWA application.
- Edge cases such as invalid form input, authorization failures, notification flows, bank account setup, and profile management.
- Cross-browser, mobile, accessibility, visual, performance, and security testing beyond the basic response-time check on `/transactions`.

### Assumptions

- The application under test is available locally and reachable at `http://localhost:3000`, with the backend API available at `http://localhost:3001`.
- The local seed data is stable enough to support repeatable execution, and at least one valid seeded user is available for authentication.
- Test execution is performed against a non-production environment where creating a payment is acceptable and does not require cleanup.
- The application markup exposes stable automation hooks using the RWA `data-test` attribute.
- Browser and network conditions are reasonably stable for local execution, and no third-party auth provider flow is required for this challenge.

### Risks

- Seeded data may change between environments or challenge runs, causing login failures or different feed contents.
- UI automation may become flaky if selectors are tied to wrapper components rather than real input elements.
- Async rendering, login redirects, and feed refresh timing can introduce intermittent failures if assertions are not state-driven.
- API tests can fail for environmental reasons if they target the wrong origin or rely on a session state that is not established correctly.

**Mitigations**

- Prefer stable selectors based on `data-test` and interact with the nested input when Material UI wrappers are used.
- Use explicit Playwright assertions and navigation-aware waits instead of fixed delays.
- Keep tests isolated, avoid cross-test dependencies, and generate unique payment notes to make created records easy to verify.
- Keep API authentication setup reusable and validate only the contract elements relevant to the challenge scope.

### Test Data Strategy

- Reuse seeded application users instead of creating users dynamically to keep setup lightweight and repeatable.
- Use environment-overridable credentials so the suite can adapt if the local seed file differs from the default challenge example.
- Generate unique payment notes at runtime to avoid collisions when asserting newly created transactions in the feed.
- Keep tests largely stateless: the suite creates only the minimum data needed for validation and avoids depending on execution order.
- Accept the existing seeded transaction/feed data as a dependency for smoke and API checks, while validating newly created payment data independently.

### Prioritization

1. **Login flow**: highest priority because it is the entry point to all authenticated functionality.
2. **Feed visibility after login**: confirms the main authenticated experience is available.
3. **Payment creation flow**: prioritized as the most business-critical end-to-end scenario in scope.
4. **API authentication and transactions checks**: validate backend availability, contract correctness, and a minimal performance expectation.
5. **Broader regression scenarios**: intentionally lower priority to keep the challenge focused on core flows and stable automation foundations.

### Entry Criteria

- Application and API are reachable in the local environment.
- Required Playwright dependencies are installed and the test environment is configured.
- Seeded test data includes at least one valid user for authenticated flows.

### Exit Criteria

- Smoke, UI, and API suites execute successfully with no critical failures in scoped scenarios.
- Core happy-path coverage for login, feed visibility, payment creation, and target API endpoints is completed.
- Any known limitations or out-of-scope gaps are documented in the README.

### Coverage Traceability

| Area | Scenario | Coverage Type |
| --- | --- | --- |
| Authentication | Seeded user login | UI Smoke, API |
| Home Feed | Feed visible after login | UI Smoke |
| Payments | Create payment and verify it in the personal feed | UI E2E |
| Transactions API | Retrieve transactions and validate contract and response time | API |

### Known Limitations

- This challenge intentionally focuses on core happy-path UI and API coverage.
- Negative-path validation, broader regression coverage, and non-functional testing areas remain out of scope for this submission.
---

## 🚀 Setup
### Prerequisites

- Git
- Node.js 18+
- npm
- Yarn

### 1. Clone and start the RWA application

The Cypress Real World App (RWA) is an external dependency required by this automation project.

```bash
git clone https://github.com/cypress-io/cypress-realworld-app .rwa
cd .rwa
yarn install
yarn dev
```

RWA will be available at:

```bash
http://localhost:3000
```

### 2. Clone and install the automation project

This repository contains the Playwright automation that runs against the RWA application.

```bash
git clone git@github.com:Milicerro/rwa-qa-automation.git
cd <your-file>
npm ci
npx playwright install --with-deps
```

### 3. Run the test suites

The RWA application must be running before executing any Playwright tests from this repository.

Run the individual suites as needed:

```bash
npm run test:smoke
npm run test:api
npm run test:ui
```

Run the full suite:

```bash
npm run ci
```

### 4. View the test report

View the HTML report with:

```bash
npm run report
```

---

## 🧠 Design Decisions

- **Stability over speed:** the suite favors deterministic assertions and predictable execution over raw speed.
- **Page Object Model:** page objects are used to improve readability, reuse, and maintainability.
- **Smoke-first execution:** critical flows are validated first to provide fast feedback.
- **UI + API coverage:** combining frontend and backend checks reduces blind spots in core challenge scenarios.
