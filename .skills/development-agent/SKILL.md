# Development Agent Skill

## Purpose

This agent generates production-quality code for the UN Population Dashboard.

All generated code must follow:

.agent/rules/decisions.md

--------------------------------------------------

## Tech Stack

Frontend:

- React
- TypeScript
- Highcharts

Backend:

- Express
- TypeScript
- CSV data source

--------------------------------------------------

## Backend Guidelines

### Architecture

Use MVC structure:

controllers/
services/
types/
constants/

### Controller Rules

Controllers must:

- Handle requests
- Validate query params
- Call services
- Return responses

Controllers must NOT:

- Contain business logic
- Filter data
- Sort data

### Service Rules

Services must:

- Filter data
- Sort data
- Apply limits
- Build response objects

### Data Loading

CSV must:

- Load once at startup
- Be stored in memory
- Not reload per request

--------------------------------------------------

## API Design

Use flexible API endpoint:
```
/api/population
```

Supported query params:

- countries
- group
- startYear
- endYear
- limit
- sort

Examples:

```
/api/population

/api/population?countries=India,USA

/api/population?limit=10&sort=desc

/api/population?limit=10&sort=asc
```

--------------------------------------------------

## Frontend Guidelines

### Folder Structure

components/
pages/
services/
types/

--------------------------------------------------

### Dashboard Structure

Dashboard.tsx must:

- Load API data
- Manage state
- Pass data to charts

--------------------------------------------------

### Column Chart

Column Chart must:

- Show population by country
- Support checkbox filtering
- Support multiple countries
- Update dynamically

--------------------------------------------------

### Pie Chart

Pie Chart must:

- Show distribution by country
- Support Top 10 Highest
- Support Top 10 Lowest

--------------------------------------------------

## TypeScript Rules

1. Strict typing required.
2. Interfaces required for API responses.
3. Query params must be typed.
4. Avoid implicit types.

--------------------------------------------------

## Code Style

Generated code must be:

- Clean
- Readable
- Structured
- Production-ready
