# Car Show 2027 – Frontend

React + TypeScript + Vite + Tailwind CSS dashboard for the Car Show Registration System.

## Run

npm install
npm run dev

Then open http://localhost:5173

## Switch between sample data and the real API

Edit `.env.development`:

- `VITE_USE_SAMPLE_DATA=true`  → uses `src/api/sample-data.ts` (local sample data)
- `VITE_USE_SAMPLE_DATA=false` → uses `src/api/registrationsApi.ts` (real C# API)
- `VITE_API_BASE_URL` → the URL of the backend API, for example `http://localhost:5205`

Restart `npm run dev` after changing this file.