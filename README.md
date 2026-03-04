# Nesco Learn — Waitlist

Pagină de waitlist pentru learn.nescodigital.com

## Deploy rapid

### 1. Supabase — creează tabelul

Mergi în Supabase → SQL Editor și rulează conținutul din `supabase-migration.sql`.

### 2. Variabile de mediu

```bash
cp .env.local.example .env.local
```

Completează `.env.local` cu:
- `NEXT_PUBLIC_SUPABASE_URL` — din Supabase → Settings → API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — din Supabase → Settings → API → anon key

### 3. Instalare și deploy

```bash
npm install
vercel deploy
```

### 4. Domeniu personalizat în Vercel

1. Vercel → proiect → Settings → Domains
2. Adaugă `learn.nescodigital.com`
3. La DNS provider adaugă: `CNAME learn → cname.vercel-dns.com`

### 5. Environment variables în Vercel

Vercel → proiect → Settings → Environment Variables → adaugă:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Dezvoltare locală

```bash
npm install
npm run dev
```

Accesează: http://localhost:3000

## Structura

```
app/
  layout.tsx              # Metadata + font
  globals.css             # Design system complet
  page.tsx                # Pagina waitlist (single page)
  api/
    waitlist/route.ts     # POST — înscrie email în Supabase
    waitlist-count/route.ts # GET — număr înscriși
lib/
  supabase.ts             # Client Supabase
supabase-migration.sql    # SQL pentru crearea tabelului
```
