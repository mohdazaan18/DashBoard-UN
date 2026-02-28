---
trigger: always_on
---

# Architectural Decisions

## General
- Use TypeScript with strict mode enabled.
- Keep the project minimal and readable.
- Focus on population visualization for ASEAN and SAARC countries.

## Backend
- Parse CSV once at server startup.
- Store parsed data in memory.
- Ignore rows where Population is null or "None".
- Ignore "WORLD" rows.
- Single endpoint: GET /api/population
- Filtering supported via query params:
    - group (ASEAN | SAARC)
    - countries (comma separated)
    - startYear
    - endYear
- Business logic must be inside service layer.
- Controllers must be simple.

## Frontend
- Use functional components.
- Use React hooks.
- Use Highcharts for visualization.
- Dark theme UI.
- No hardcoded chart data.

## Agents
- Development Agent writes code.
- Code Review Agent validates structure and quality.