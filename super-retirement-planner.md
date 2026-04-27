# 🏦 Superannuation Projection Tool (Australia)

A client-side financial simulation tool that models superannuation growth, retirement outcomes, and generates downloadable PDF reports.

Built as a portfolio project to demonstrate product thinking, financial modelling, and lightweight frontend architecture.

---

# 🎯 Goal

Build a browser-based tool that allows users to:
- Project superannuation growth over time
- Model retirement outcomes under different assumptions
- Understand the impact of contributions, fees, and growth rates
- Export a professional financial report as PDF

No backend required — fully client-side application.

---

# 🧠 Core Concept

This app simulates:

- Compound growth of super balance
- Regular employer + voluntary contributions
- Fees and inflation impact
- Retirement income estimation

Outputs are presented as:
- Interactive UI dashboard
- Report-style summary page
- PDF export (financial statement format)

---

# 🧱 Tech Stack

## Frontend
- React (Vite)
- Vanilla CSS (custom design system)

## PDF Generation
- @react-pdf/renderer

## Charts
- Lightweight SVG templates (custom)

## Hosting
- GitHub Pages

---

# 🧮 Calculation Engine

All logic is pure JavaScript (no React dependency).

## Inputs:
- currentAge
- retirementAge
- currentSuperBalance
- annualSalary
- employerContributionRate
- voluntaryContribution
- expectedReturnRate
- inflationRate
- feeRate
- salaryGrowthRate (optional)

## Core simulation loop:

- Start at current balance
- For each year:
  - Apply investment growth
  - Add contributions
  - Subtract fees
  - Adjust salary (if applicable)

---

# 📊 Outputs

## Primary Outputs:
- Projected super balance at retirement
- Year-by-year balance table
- Retirement income estimate (e.g. 4% rule)

## Insight Engine:
- “On track / behind / ahead”
- Impact of extra contributions
- Impact of fees over time
- Inflation-adjusted retirement value

---

# 🖥️ UI Structure

## 1. Input Panel
Simple form inputs:
- Age
- Retirement age
- Current balance
- Salary
- Extra contributions

Advanced toggle:
- Return rate
- Fees
- Inflation
- Salary growth

---

## 2. Results Dashboard (Report Style)

Displayed like a financial document:

### Sections:
- Summary metrics (big numbers)
- Projection chart
- Year-by-year table
- Insights section

---

## 3. “Report Preview Mode”

A dedicated layout that mimics an A4 financial report:

- Centered page container
- Clean typography
- Minimal colour palette
- Table-driven layout

---

## 4. PDF Export

Using @react-pdf/renderer:

- Same structure as report preview
- Export button generates downloadable PDF
- Includes:
  - Summary
  - Charts (optional simplified)
  - Breakdown tables

---

# 🎨 Design Direction

## Visual Style:
- Financial report / super fund statement
- Minimal UI
- Monochrome with subtle accent colour
- Table-heavy layout
- No card-based UI (avoid “modern SaaS look”)

## Typography:
- System font or Inter
- Emphasis on readability and spacing

## Layout:
- A4-inspired report container
- Grid-based metric alignment

---

# 🔁 User Flow

1. User enters financial inputs
2. App runs simulation engine
3. Dashboard updates instantly
4. User reviews:
   - projections
   - insights
   - charts
5. User exports PDF report

---

# 🧩 Feature Breakdown

## MVP
- Input form
- Basic projection engine
- Simple chart
- Summary results
- PDF export

## V2 Enhancements
- Scenario comparison (A/B inputs)
- What-if sliders
- Save/share via URL state
- Inflation-adjusted view toggle

---

# 🚀 Engineering Principles

- Pure functions for all financial calculations
- Separation of UI and calculation engine
- Deterministic outputs (same inputs = same results)
- No backend dependency
- Reusable PDF + UI structure

---

# 🧠 Key Differentiator

This is not a calculator.

It is a:
> Financial projection and reporting tool that simulates retirement outcomes using configurable assumptions.

---

# 📦 Folder Structure

/src
  /engine        → calculation logic
  /components    → UI components
  /pages         → main views
  /pdf           → react-pdf templates
  /styles        → global CSS system
  /utils         → helpers

---

# TypeScript & Types

This project uses TypeScript for safer refactoring and clearer domain modeling. Guidelines:

- Start with in-file types: define types and interfaces alongside the pure functions that use them (e.g. `export type ProjectionRow = { year: number; balance: number }`).
- Export domain types from the module when they are shared across modules.
- If multiple modules require the same types, move them into `src/types.ts` or `src/types/index.ts`.
- Keep calculation logic in plain pure functions with explicit input/output types so they can be unit-tested independently of React.

Type checking is performed with `tsc --noEmit` (run via `npm run type-check`).

---

# 📈 Success Criteria

- Produces realistic retirement projections
- Feels like a financial institution report
- Works fully client-side
- Exports professional PDF document
- Clearly demonstrates engineering + product thinking