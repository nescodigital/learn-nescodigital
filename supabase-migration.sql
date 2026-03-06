-- Run this in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS waitlist_cursuri (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  nume TEXT,
  interes TEXT,
  sursa TEXT DEFAULT 'direct',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Segmentation columns (added for two-step waitlist flow)
ALTER TABLE waitlist_cursuri ADD COLUMN IF NOT EXISTS rol TEXT;
ALTER TABLE waitlist_cursuri ADD COLUMN IF NOT EXISTS industrie TEXT;
ALTER TABLE waitlist_cursuri ADD COLUMN IF NOT EXISTS nivel_ai TEXT;
ALTER TABLE waitlist_cursuri ADD COLUMN IF NOT EXISTS obiectiv TEXT;

-- Allow public update for segmentation (by email)
CREATE POLICY IF NOT EXISTS "Allow public update segmentation" ON waitlist_cursuri
  FOR UPDATE USING (true) WITH CHECK (true);

ALTER TABLE waitlist_cursuri ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON waitlist_cursuri
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON waitlist_cursuri
  FOR SELECT USING (auth.role() = 'authenticated');
