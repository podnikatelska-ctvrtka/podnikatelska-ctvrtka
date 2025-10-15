-- ====================================
-- KONTROLA RLS POLICIES
-- ====================================
-- Spusť v Supabase Dashboard → SQL Editor

-- 1. Zjisti jaké policies máš na business_canvas_sections
SELECT * FROM pg_policies WHERE tablename = 'business_canvas_sections';

-- 2. Zjisti jaké policies máš na user_progress
SELECT * FROM pg_policies WHERE tablename = 'user_progress';

-- 3. Zjisti jaké policies máš na value_proposition_canvas
SELECT * FROM pg_policies WHERE tablename = 'value_proposition_canvas';

-- ====================================
-- QUICK FIX: VYPNI RLS (PRO TESTOVÁNÍ)
-- ====================================
-- POZOR: Toto vypne security! Jen pro debugging!

-- Vypni RLS na všech tabulkách (DOČASNĚ!)
ALTER TABLE business_canvas_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE value_proposition_canvas DISABLE ROW LEVEL SECURITY;

-- Po testu ZAPNI ZPĚT:
-- ALTER TABLE business_canvas_sections ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE value_proposition_canvas ENABLE ROW LEVEL SECURITY;
