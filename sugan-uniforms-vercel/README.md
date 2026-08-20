# Sugan Uniforms — Order & Job-Work System (React prototype)

Clickable UI prototype for the order-to-job-work-to-finished-goods flow,
built on **React 18 + Vite**. Deep-navy / amber theme, matching the scope
& API documents.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for hosting

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Structure

- `src/App.jsx`   — all screens + navigation (single-file component set)
- `src/styles.css` — design system (colors, cards, tables, chips)
- `src/main.jsx`  — React entry point

## Screens

Dashboard · Orders · New Order (6-step wizard) · Material / BOM ·
Stock Check · Issue Challan · Challan Register (aging) · Goods Receipt · Reports

## Notes

This is a **prototype**: data is hardcoded sample data and actions are
staged (e.g. "Issue Challan" shows a confirmation toast, it does not call a
backend). Wire it to the API described in the API Documentation to make it live.
