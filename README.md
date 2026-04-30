# Super Retirement Planner

Lightweight Vite + React + TypeScript scaffold for a client-side superannuation projection and PDF report tool.

Quick overview:
- Pure-TS calculation engine under src/engine
- UI components under src/components
- PDF templates under src/pdf
- Lightweight SVG charts and vanilla CSS
- No backend required — fully client-side

Quick start:
1. Install dependencies
   npm install
2. Run dev server
   npm run dev
3. Build production bundle
   npm run build
4. Type-check
   npm run type-check
5. Run tests (if added)
   npm run test

Where to implement core pieces:
- Calculation engine: src/engine — pure functions, export types
- Types: src/types.ts
- App entry: src/main.tsx and src/App.tsx
- UI: src/components and src/pages
- PDF export templates: src/pdf (uses @react-pdf/renderer)

Project files:
- super-retirement-planner.md — detailed product & design spec (read this first)
- package.json, vite.config.ts, tsconfig.json — build config
- src/* — application source

Goals & conventions:
- Keep calculation logic pure and testable
- Prefer explicit TypeScript types for domain models
- UI is a thin layer over the engine outputs
- Deterministic outputs for same inputs

Contributing:
- Open a branch per feature or bugfix
- Keep commits small and focused
- Add unit tests for calculation logic

License:
- Add an appropriate license file (e.g. MIT) if you plan to open-source this project.
