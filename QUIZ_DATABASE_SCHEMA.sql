-- ============================================
-- QUIZ RESULTS TABLE
-- ============================================
-- Ukládá výsledky kvízu "Jak zdravý je tvůj model podnikání?"

CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  quiz_type TEXT NOT NULL, -- 'beginner' nebo 'existing'
  answers JSONB NOT NULL, -- Všechny odpovědi z kvízu
  score INTEGER NOT NULL, -- 0-100
  category TEXT NOT NULL, -- 'critical', 'unstable', 'solid', 'advanced', 'beginner'
  category_label TEXT NOT NULL, -- Např. "Kritický stav 🔴"
  risks TEXT[] NOT NULL, -- Array rizik
  recommendations TEXT[] NOT NULL, -- Array doporučení
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_quiz_type CHECK (quiz_type IN ('beginner', 'existing')),
  CONSTRAINT valid_category CHECK (category IN ('critical', 'unstable', 'solid', 'advanced', 'beginner')),
  CONSTRAINT valid_score CHECK (score >= 0 AND score <= 100)
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_quiz_results_email ON public.quiz_results(email);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_quiz_results_category ON public.quiz_results(category);

-- Index for created_at ordering
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON public.quiz_results(created_at DESC);

-- Row Level Security (RLS) - zatím off, ale připraveno pro budoucnost
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (protože kvíz je veřejný)
CREATE POLICY "Allow public insert" ON public.quiz_results
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Only admins can read all results
-- (v budoucnu můžeš přidat admin role)

-- ============================================
-- MIGRATION INSTRUCTIONS
-- ============================================
-- 1. Zkopíruj tento SQL kód
-- 2. Jdi do Supabase Dashboard → SQL Editor
-- 3. Vlož kód a spusť
-- 4. Zkontroluj že tabulka existuje v Database → Tables
