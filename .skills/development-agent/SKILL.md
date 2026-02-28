# Development Agent Skill

## Goal
Implement backend and frontend based on decisions.md.

---

## Backend Guidelines

- Parse CSV once at startup.
- Store parsed data in memory.
- Ignore rows where Population is null or "None".
- Ignore rows where Region = "WORLD".
- Implement filtering by:
  - group (ASEAN | SAARC)
  - countries (comma separated)
  - startYear
  - endYear
- Return data formatted for Highcharts:
  {
    years: number[],
    series: [{ name: string, data: number[] }]
  }

---

## Frontend Guidelines

- Use functional React components.
- Build clean dark theme UI.
- Provide:
  - Group toggle (ASEAN | SAARC)
  - Year range selection
- Create:
  - Line chart (trend over time)
  - Bar chart (latest year comparison)
- Use reusable chart config builders.

---

## Code Principles

- Keep functions small.
- Use meaningful variable names.
- No duplicated logic.
- Keep UI minimal and modern.