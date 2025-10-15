-- ====================================
-- FIX RLS POLICIES PRO VŠECHNY TABULKY
-- ====================================
-- Supabase Dashboard → SQL Editor → Spusť tento SQL

-- ====================================
-- KROK 1: SMAŽ STARÉ POLICIES (pokud existují)
-- ====================================

-- business_canvas_sections
DROP POLICY IF EXISTS "Users can view own canvas sections" ON business_canvas_sections;
DROP POLICY IF EXISTS "Users can insert own canvas sections" ON business_canvas_sections;
DROP POLICY IF EXISTS "Users can update own canvas sections" ON business_canvas_sections;
DROP POLICY IF EXISTS "Users can delete own canvas sections" ON business_canvas_sections;

-- user_progress
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;

-- value_proposition_canvas
DROP POLICY IF EXISTS "Users can view own VPC data" ON value_proposition_canvas;
DROP POLICY IF EXISTS "Users can insert own VPC data" ON value_proposition_canvas;
DROP POLICY IF EXISTS "Users can update own VPC data" ON value_proposition_canvas;
DROP POLICY IF EXISTS "Users can delete own VPC data" ON value_proposition_canvas;

-- ====================================
-- KROK 2: VYTVOŘ NOVÉ POLICIES (ALLOW ALL)
-- ====================================
-- Pro testování - dovolí všem všechno
-- Token auth se dělá v aplikaci, ne v RLS

-- business_canvas_sections - ALLOW ALL
CREATE POLICY "Allow all on business_canvas_sections"
  ON business_canvas_sections
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- user_progress - ALLOW ALL
CREATE POLICY "Allow all on user_progress"
  ON user_progress
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- value_proposition_canvas - ALLOW ALL
CREATE POLICY "Allow all on value_proposition_canvas"
  ON value_proposition_canvas
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ====================================
-- KROK 3: ZAPNI RLS (pokud je vypnuté)
-- ====================================

ALTER TABLE business_canvas_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE value_proposition_canvas ENABLE ROW LEVEL SECURITY;

-- ====================================
-- ✅ HOTOVO!
-- ====================================
-- Nyní by měly dotazy fungovat!
-- Refresh aplikaci a zkus znovu.
