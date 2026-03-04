-- Run this in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS waitlist_cursuri (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  nume TEXT,
  interes TEXT,
  sursa TEXT DEFAULT 'direct',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE waitlist_cursuri ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON waitlist_cursuri
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON waitlist_cursuri
  FOR SELECT USING (auth.role() = 'authenticated');
