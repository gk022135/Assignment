# Todo Frontend (Next.js + Tailwind)

Frontend for the Todo Management API (NestJS + MongoDB). Built with Next.js 15, TypeScript, and Tailwind CSS.

## Stack
- Next.js 15 (App Router, TypeScript)
- React 18
- Tailwind CSS

## Setup
1. Install deps
```bash
npm install
```
2. Configure env
```bash
cp .env.example .env
# set NEXT_PUBLIC_API_URL to your backend (e.g., http://localhost:3000)
```
3. Run dev server
```bash
npm run dev
```

## Pages
- `/login`, `/signup`
- `/dashboard` (my todos with pagination, create/update/delete)
- `/profile` (update name/password)
- `/admin/users` (admin-only list + soft delete)

## Auth Handling
- JWT stored in `localStorage`
- Client-side protected routes via `Protected` and `AdminOnly`
- API base URL from `NEXT_PUBLIC_API_URL`

## Styling
- Tailwind utilities; see `src/app/globals.css`

## Notes
- This frontend expects the backend routes specified in the Todo Management API.
- Tokens are sent as Bearer headers on API calls.
