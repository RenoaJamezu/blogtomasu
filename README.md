# BlogTomasu

Full-stack blog platform built with Express + MongoDB backend and React (Vite) frontend.

## Stack
- Backend: Node.js, Express, TypeScript, Mongoose, JWT, Multer
- Frontend: React 19, React Router, Vite, TailwindCSS, TipTap
- Auth: HTTP-only JWT cookie
- Deployment targets: Render (backend), Vercel/Netlify (frontend)

## Backend setup
1) Install deps
```bash
cd backend
npm install
```
2) Create `.env` (example)
```env
PORT=3000
MONGODB_URL=<your-mongodb-uri>
JWT_SECRET_KEY=<random-strong-secret>
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
# Optional email/Resend keys
GMAIL_USER=
GMAIL_PASS=
RESEND_API_KEY=
```
3) Run in dev
```bash
npm run dev
```
4) Build/start (production)
```bash
npm run build
npm start
```

## Frontend setup
1) Install deps
```bash
cd frontend
npm install
```
2) Create `.env`
```env
VITE_API_BASE=http://localhost:3000
```
3) Run in dev
```bash
npm run dev -- --host --port 5173
```
4) Build/preview
```bash
npm run build
npm run preview
```

## CORS & cookies (important)
- The backend uses cookie-based auth. For Safari and any cross-origin setup you must ensure:
  - `cors` `origin` matches the exact frontend origin (including port). In `src/app.ts` set `FRONTEND_URL` to your frontend URL.
  - Cookies: use `sameSite: "none"` and `secure: true` in production (HTTPS). For local HTTP use `sameSite: "lax"`, `secure: false`.
- Typical production settings (Render backend + Vercel frontend):
  - Backend env: `NODE_ENV=production`, `FRONTEND_URL=https://<your-frontend-domain>`
  - Cookie options: `secure: true`, `sameSite: "none"`, `credentials: true` on all frontend fetch calls.

## Deployment notes
- Backend (Render): set env vars `PORT` (Render provides), `MONGODB_URL`, `JWT_SECRET_KEY`, `FRONTEND_URL`, `NODE_ENV=production`. Start command: `npm start`. Build command: `npm run build`.
- Frontend (Vercel/Netlify): set `VITE_API_BASE` to your deployed backend URL (https). Rebuild after changing env vars.

## Troubleshooting login
- Safari drops cookies if `secure: true` is served over HTTP or if `sameSite`/CORS origins don’t match. Ensure HTTPS + matching `FRONTEND_URL` + `sameSite: "none"` for cross-origin.
- For local dev, use matching origins (e.g., backend `http://localhost:3000`, frontend `http://localhost:5173`) and set cookies to `secure: false`, `sameSite: "lax"`.

## Scripts quick reference
- Backend: `npm run dev` (watch), `npm run build`, `npm start`
- Frontend: `npm run dev`, `npm run build`, `npm run preview`
