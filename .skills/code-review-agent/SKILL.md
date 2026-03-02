---
name: code-review
description: Reviews code for quality and rule compliance across TypeScript, backend, frontend, charts, and code quality. Use when the user asks to review, audit, or check any code file for rule violations or quality issues.
---

# Code Review Agent

Review code files for quality and rule compliance. All checks must conform to the rules defined in `.agents/rules/decisions.md`.

## Role

The Code Reviewer reads source files and evaluates them against the project's decision rules. For each violation or issue found, you must produce a structured report entry. Surface only real problems — a clean pass on weak checks is worse than no review.

## Inputs

You receive these parameters in your prompt:

- **files**: List of file paths to review
- **rules_path**: Path to the decisions rules file (`.agents/rules/decisions.md`)
- **output_path**: Where to save the review report

## Process

### Step 1: Load the Rules

1. Read `.agents/rules/decisions.md` fully
2. Note all rules, their categories, and the violation report format required

### Step 2: Read Each File

For each file in **files**:

1. Read the file completely
2. Identify the file's category (TypeScript, backend controller/service, frontend component, chart component)
3. Apply the relevant review categories below based on file type

### Step 3: TypeScript Review

Check every file for:

- No `any`, `as any`, or `@ts-ignore` usage
- All API responses typed with interfaces
- All query parameters typed with interfaces
- Strict typing applied throughout
- Import order: React → external libraries → internal imports
- Type-only imports used correctly where applicable

### Step 4: Backend Review

For controllers, services, and API files, check:

**Architecture:**
- MVC folder structure is followed (`controllers/`, `services/`, `types/`, `constants/`)
- Controllers contain no business logic — only thin request/response handling
- All filtering and business logic lives inside services
- CSV data is loaded once at server startup, not per-request

**API:**
- Single endpoint used: `GET /api/population`
- No duplicate endpoints exist
- Query parameters handled: `countries`, `group`, `startYear`, `endYear`, `limit`, `sort`
- Sorting is applied before limit
- Responses conform to `PopulationResponse` interface

### Step 5: Frontend Review

For React components and pages, check:

**Structure:**
- Functional components only — no class components
- Files placed correctly in `components/`, `pages/`, `services/`, or `types/`
- Dashboard logic stays inside `Dashboard.tsx`

**Components:**
- `ColumnChart` is reusable with chart configuration inside the component
- `PieChart` is reusable with chart configuration inside the component
- `GaugeChart` is reusable with chart configuration inside the component
- `CountryFilter` is reusable
- `TopToggle` is reusable

### Step 6: Chart Review

For chart components, check:

**Column Chart:**
- Highcharts is used
- Multiple country selection is supported
- Checkbox filtering works
- Dynamic updates are supported

**Pie Chart:**
- Highcharts is used
- Top 10 highest countries mode works
- Top 10 lowest countries mode works

**Gauge Chart:**
- Highcharts is used
- Displays top 1 country's dominance as a percentage of the displayed total
- Updates dynamically when the active dataset changes
- Rendered as a compact mini gauge (not full-page)

### Step 7: Code Quality Review

For all files, check:

- No magic strings repeated across files — reusable values must be constants
- Functions are readable and focused
- No deeply nested logic
- No duplicate logic across functions
- `console.log` appears only inside `catch` blocks

### Step 8: Write the Report

Save results to **output_path**.

## Output Format

Write a JSON file with this structure:

```json
{
  "summary": {
    "files_reviewed": 4,
    "total_violations": 3,
    "high": 1,
    "medium": 1,
    "low": 1
  },
  "violations": [
    {
      "file": "controllers/populationController.ts",
      "rule": "Rule 2 — Backend Architecture: Controllers must be thin",
      "violation": "Filtering logic found in controller — lines 34–51 filter by country directly instead of delegating to a service.",
      "severity": "high",
      "fix": "Move the filtering logic to populationService.ts and call the service method from the controller."
    }
  ],
  "clean_files": [
    "types/population.ts",
    "constants/index.ts"
  ]
}
```

### Severity Definitions

- **high** — Direct rule violation from `decisions.md`
- **medium** — Code quality issue that degrades maintainability
- **low** — Minor improvement opportunity

## Guidelines

- **Be specific**: Cite line numbers or code patterns when possible
- **Be objective**: Base findings on the rules, not personal style
- **No false positives**: Only report genuine violations
- **Clean files**: Explicitly list files with no violations so reviewers know they were checked