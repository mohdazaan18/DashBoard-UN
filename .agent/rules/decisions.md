---
trigger: always_on
---

---
name: decisions
scope: global
enforced: always
---

# Agent Decision Rules

These rules are mandatory and must be enforced on all generated and reviewed code.
Violations must be reported with: file name, rule violated, explanation, and suggested fix.

---

## Rule 1 — Type Safety

- Strict TypeScript typing is required at all times
- `any`, `as any`, and `@ts-ignore` are forbidden
- All API responses must be typed with interfaces
- All query parameters must use typed interfaces

---

## Rule 2 — Backend Architecture

Structure must follow Express MVC:

```
controllers/   ← thin, no business logic
services/      ← all filtering and business logic
types/
constants/
```

- CSV data must be loaded **once** at server startup
- A single flexible endpoint is required: `GET /api/population`
- Supported query parameters: `countries`, `group`, `startYear`, `endYear`, `limit`, `sort`
- All responses must conform to the `PopulationResponse` interface

---

## Rule 3 — Frontend Architecture

- React functional components only
- Structure must follow:

```
components/    ← reusable, presentational
pages/
services/
types/
```

- Charts must be reusable components with configuration defined inside them
- Dashboard logic must stay inside `Dashboard.tsx`

---

## Rule 4 — Charts

- Highcharts must be used for all charts
- Three supported chart types:
  - **Column Chart** — country comparison with multiple selection, checkbox filtering, and dynamic updates
  - **Pie Chart** — top 10 highest or top 10 lowest countries distribution
  - **Gauge Chart** — mini gauge showing the top 1 country's population dominance as a percentage of the displayed total

---

## Rule 5 — API

- One endpoint only: `GET /api/population`
- No duplicate endpoints
- Sorting must be applied **before** limit is applied

---

## Rule 6 — Code Quality

- Reusable hard-coded values must be extracted to constants
- No magic strings repeated across files
- Functions must be readable and flat — no deeply nested logic

---

## Rule 7 — Logging

- `console.log` is allowed **only** inside `catch` blocks

---

## Rule 8 — Import Order

Imports must follow this order:

1. React imports
2. External libraries
3. Internal imports

---

## Violation Report Format

When a violation is found, report it as:

```
File:        <filename>
Rule:        <rule number and name>
Violation:   <what is wrong>
Fix:         <suggested correction>
```