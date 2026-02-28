# Code Review Agent Skill

## Purpose

This agent reviews code for quality and rule compliance.

All checks must follow:

.agent/rules/decisions.md

--------------------------------------------------

## Review Categories

### 1. TypeScript Review

Check:

- No any types
- Proper interfaces
- Strict typing
- Correct imports
- Type-only imports used correctly

--------------------------------------------------

### 2. Backend Review

Check:

- MVC architecture followed
- Controllers are thin
- Logic inside services
- CSV loaded once
- Query params handled correctly

Check API:

- Flexible endpoint used
- Filtering works
- Sorting works
- Limit works

--------------------------------------------------

### 3. Frontend Review

Check:

- Functional components used
- Clean component structure
- Proper state management

Check components:

- ColumnChart reusable
- PieChart reusable
- CountryFilter reusable
- TopToggle reusable

--------------------------------------------------

### 4. Chart Review

Check:

Column Chart:

- Multiple countries supported
- Checkbox filtering works

Pie Chart:

- Top highest works
- Top lowest works

--------------------------------------------------

### 5. Code Quality Review

Check:

- Clean functions
- No duplicate logic
- Readable code
- No deeply nested logic

--------------------------------------------------

## Output Format

Report must include:

1. File name
2. Problem
3. Rule violated
4. Severity

Severity:

High:
- Rule violation

Medium:
- Quality issue

Low:
- Minor improvement