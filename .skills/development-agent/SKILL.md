---
name: development
description: Generates production-quality code for the UN Population Dashboard. Use when the user asks to build, create, scaffold, or write any backend or frontend code for this project — including controllers, services, components, charts, types, or API endpoints.
---

# Development Agent

Generate production-quality code for the UN Population Dashboard. All generated code must conform to the rules defined in `.agents/rules/decisions.md`.

## Role

The Development Agent writes backend and frontend code from scratch or extends existing files. It follows the project's MVC architecture, TypeScript rules, and component conventions strictly. It never produces code that violates the decision rules, even if the user's request is ambiguous.

## Inputs

You receive these parameters in your prompt:

- **task**: Description of what to build
- **target_files**: List of files to create or modify
- **rules_path**: Path to the decisions rules file (`.agents/rules/decisions.md`)
- **output_path**: Directory to write generated files

## Tech Stack

- **Frontend**: React, TypeScript, Highcharts
- **Backend**: Express, TypeScript, CSV data source

## Process

### Step 1: Load the Rules

1. Read `.agents/rules/decisions.md` fully
2. Note all architecture, typing, and code quality rules before writing any code

### Step 2: Plan the Output

1. Identify whether the task is backend, frontend, or both
2. Determine which files need to be created or modified
3. Map each file to its correct folder based on its role

### Step 3: Backend — Architecture

Follow strict Express MVC structure:

```
controllers/   ← request handling only
services/      ← all business logic
types/         ← interfaces and type definitions
constants/     ← reusable values, no magic strings
```

**Controllers must:**
- Parse and validate query parameters
- Call the appropriate service method
- Return the service response to the client
- Contain no filtering, sorting, or business logic

**Services must:**
- Apply all filtering, sorting, and limit logic
- Build and return `PopulationResponse`-shaped objects
- Be the only place data transformation occurs

**Data loading:**
- CSV must be loaded once at server startup
- Parsed data must be stored in memory
- No file reads on a per-request basis

### Step 4: Backend — API

Generate a single flexible endpoint:

```
GET /api/population
```

Supported query parameters:

| Parameter  | Type   | Description                  |
|------------|--------|------------------------------|
| countries  | string | Comma-separated country names |
| group      | string | Region or group filter        |
| startYear  | number | Start of year range           |
| endYear    | number | End of year range             |
| limit      | number | Max records to return         |
| sort       | string | `asc` or `desc`               |

Rules:
- Sorting must be applied before limit
- All parameters are optional
- No additional endpoints may be created

Example valid requests:
```
GET /api/population
GET /api/population?countries=India,USA
GET /api/population?limit=10&sort=desc
GET /api/population?startYear=2000&endYear=2020&limit=5&sort=asc
```

### Step 5: Frontend — Architecture

Follow this folder structure:

```
components/    ← reusable, presentational components
pages/         ← page-level views
services/      ← API call logic
types/         ← shared interfaces and types
```

**Dashboard.tsx must:**
- Fetch data from the API via a service
- Manage all application state
- Pass data down to chart and filter components as props
- Contain no chart configuration

### Step 6: Frontend — Column Chart

Generate a reusable `ColumnChart` component that:

- Displays population data by country using Highcharts
- Accepts country data as props
- Contains all Highcharts configuration internally
- Supports multiple country selection
- Updates dynamically when checkbox selection changes

### Step 7: Frontend — Pie Chart

Generate a reusable `PieChart` component that:

- Displays country distribution using Highcharts
- Accepts data and a mode prop as inputs
- Contains all Highcharts configuration internally
- Supports **Top 10 Highest** and **Top 10 Lowest** modes

### Step 8: Frontend — Gauge Chart

Generate a reusable `GaugeChart` component that:

- Displays the top 1 country's population dominance as a percentage of the displayed total using Highcharts
- Accepts a `dominancePercent` value and a `countryName` label as props
- Contains all Highcharts configuration internally
- Renders as a compact mini gauge — not a full-page chart
- Updates dynamically whenever the active dataset or selection changes

### Step 9: TypeScript

Apply to all generated files:

- Strict typing throughout — no `any`, `as any`, or `@ts-ignore`
- Define interfaces for all API responses and query parameters
- No implicit types — all function parameters and return values must be typed
- Import order: React → external libraries → internal imports

### Step 10: Code Quality

Before finalising any file:

- Extract repeated values into constants — no magic strings
- Keep functions flat and readable — no deeply nested logic
- Ensure no logic is duplicated across files
- `console.log` only inside `catch` blocks

### Step 11: Write Output Files

Save all generated files to **output_path**, preserving the folder structure. For each file written, confirm its path and role.

## Output Format

After writing all files, produce a summary:

```json
{
  "files_created": [
    {
      "path": "controllers/populationController.ts",
      "role": "Handles GET /api/population, validates query params, delegates to service"
    },
    {
      "path": "services/populationService.ts",
      "role": "Applies filtering, sorting, and limit; returns PopulationResponse"
    }
  ],
  "files_modified": [],
  "rules_applied": [
    "Rule 1 — Type Safety: strict interfaces used throughout",
    "Rule 2 — Backend Architecture: MVC structure followed",
    "Rule 5 — API: single endpoint, sorting before limit"
  ],
  "notes": "CSV loader placed in services/dataLoader.ts and called once from server entry point."
}
```

## Guidelines

- **Rules first**: Read `decisions.md` before writing a single line
- **No shortcuts**: Never use `any` or skip interface definitions to save time
- **Single responsibility**: Each file does exactly one job
- **Explicit over implicit**: Types, folder placement, and data flow must always be clear