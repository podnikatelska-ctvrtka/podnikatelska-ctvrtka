-- ====================================
-- PROBLEM SOLVER - DATABASE SCHEMA
-- ====================================
-- Schema pro Problem Solver (Modul 2, Lekce 3)
-- Spusť tento SQL v Supabase Dashboard → SQL Editor

-- ====================================
-- Table pro ukládání problémů zákazníků
-- ====================================
CREATE TABLE IF NOT EXISTS customer_problems (
  id BIGSERIAL PRIMARY KEY,
  user_id INT NOT NULL, -- Bez foreign key - konzistentní s business_canvas_sections
  segment_name TEXT NOT NULL,
  problem_text TEXT NOT NULL,
  priority INTEGER NOT NULL CHECK (priority >= 1 AND priority <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- Indexes pro rychlé vyhledávání
-- ====================================
CREATE INDEX IF NOT EXISTS idx_customer_problems_user_id 
  ON customer_problems(user_id);

CREATE INDEX IF NOT EXISTS idx_customer_problems_user_segment 
  ON customer_problems(user_id, segment_name);

-- ====================================
-- Row Level Security (RLS)
-- ====================================
ALTER TABLE customer_problems ENABLE ROW LEVEL SECURITY;

-- Pro demo - všichni můžou všechno (později přidat auth!)
CREATE POLICY "Anyone can view problems"
  ON customer_problems
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert problems"
  ON customer_problems
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update problems"
  ON customer_problems
  FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete problems"
  ON customer_problems
  FOR DELETE
  USING (true);

-- ====================================
-- Trigger pro auto-update updated_at
-- ====================================
CREATE OR REPLACE FUNCTION update_customer_problems_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER customer_problems_updated_at
  BEFORE UPDATE ON customer_problems
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_problems_updated_at();

-- ====================================
-- Permissions
-- ====================================
GRANT ALL ON customer_problems TO authenticated;
GRANT ALL ON customer_problems TO anon; -- Pro demo mode
GRANT USAGE, SELECT ON SEQUENCE customer_problems_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE customer_problems_id_seq TO anon;

-- ====================================
-- Komentáře
-- ====================================
COMMENT ON TABLE customer_problems IS 'Problémy zákazníků pro každý segment z Business Model Canvas';
COMMENT ON COLUMN customer_problems.user_id IS 'ID uživatele (INT - bez foreign key pro demo)';
COMMENT ON COLUMN customer_problems.segment_name IS 'Název segmentu z Canvas';
COMMENT ON COLUMN customer_problems.problem_text IS 'Popis problému';
COMMENT ON COLUMN customer_problems.priority IS 'Priorita problému (1-5, kde 5 = nejvíc bolí)';
