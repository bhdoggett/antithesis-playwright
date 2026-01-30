This Project demonstrates my familiarity with the end-to-end testing library, Playwright, by testing the Antithesis careers page (https://antithesis.com/company/careers/) and the page for their current (at the time of this project's creation) [UI Engineer | Frontend Developer] (https://antithesis.com/company/careers/?ashby_jid=0f965d12-fa14-487d-a71a-d470247d61fc) role.

## Requirements

- Node.js >= 18
- Playwright `@playwright/test` version 11.4.2
- The Job I'm applying for must still be on the website for the tests to work!

## Setup

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers

```bash
npx playwright install
```

3. Run Tests

```bash
npx playwright test
```

4. Optional: Open Playwright UI

```bash
npx playwright test --ui
```
