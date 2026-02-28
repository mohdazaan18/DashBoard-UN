---
trigger: always_on
---

# Agent Decision Rules

These rules are mandatory and must always be enforced.

All generated and reviewed code must follow these rules.

--------------------------------------------------

## 1. Type Safety Rules

1. Strict TypeScript typing required
2. No use of `any`
3. No `@ts-ignore`
4. No `as any`
5. Interfaces must be used for API responses
6. Query parameters must use typed interfaces

--------------------------------------------------

## 2. Backend Architecture Rules

1. Express MVC structure must be followed:

- controllers/
- services/
- types/
- constants/

2. Controllers must be thin and contain no business logic.

3. All filtering logic must be inside services.

4. CSV must be loaded once at server startup.

5. API must use a single flexible endpoint: ```/api/population```

6. Filtering must use query parameters:

- countries
- group
- startYear
- endYear
- limit
- sort

7. API responses must follow PopulationResponse format.

--------------------------------------------------

## 3. Frontend Architecture Rules

1. React functional components only.

2. Components must be separated:

- components/
- pages/
- services/
- types/

3. Charts must be reusable components.

4. Chart configuration must be inside chart components.

5. Dashboard logic must stay inside Dashboard.tsx.

--------------------------------------------------

## 4. Chart Rules

1. Highcharts must be used for all charts.

2. Supported charts:

- Column Chart (country comparison)
- Pie Chart (top countries distribution)

3. Column Chart must support:

- Multiple country selection
- Checkbox filtering
- Dynamic updates

4. Pie Chart must support:

- Top 10 highest countries
- Top 10 lowest countries

--------------------------------------------------

## 5. API Rules

1. Only one endpoint allowed: ```/api/population```

2. API must remain flexible.

3. No duplicate endpoints allowed.

4. Sorting must be applied before limit.

--------------------------------------------------

## 6. Code Quality Rules

1. Hard-coded values must be constants when reusable.

2. No magic strings repeated across files.

3. Functions must remain readable.

4. No deeply nested logic.

--------------------------------------------------

## 7. Logging Rules

1. console.log allowed only inside catch blocks.

--------------------------------------------------

## 8. Import Rules

Import order:

1. React imports
2. External libraries
3. Internal imports

--------------------------------------------------

## Enforcement

Violations must include:

- File name
- Rule violated
- Explanation
- Suggested fix


