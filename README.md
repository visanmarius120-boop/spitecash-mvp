# SpiteCash / Friction Alpha MVP — English version

Starter for landing page + form + Supabase DB + evidence upload.

## 1. Install

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 2. Supabase

1. Create a new Supabase project: `spitecash-mvp`
2. Run `supabase/schema.sql` in SQL Editor
3. Create a private Storage bucket: `spite-evidence`
4. Copy `.env.example` to `.env.local`
5. Fill in:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 3. Important

`SUPABASE_SERVICE_ROLE_KEY` must only be used server-side. Do not expose it in the browser.
