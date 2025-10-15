-- ====================================
-- FIX VŠECH RLS POLICIES NAJEDNOU
-- ====================================
-- Supabase Dashboard → SQL Editor → SPUSŤ!

-- ====================================
-- KROK 1: SMAŽ VŠECHNY STARÉ POLICIES
-- ====================================

DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on business_canvas_sections
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'business_canvas_sections') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON business_canvas_sections';
    END LOOP;
    
    -- Drop all policies on user_progress
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'user_progress') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON user_progress';
    END LOOP;
    
    -- Drop all policies on value_proposition_canvas
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'value_proposition_canvas') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON value_proposition_canvas';
    END LOOP;
END $$;

-- ====================================
-- KROK 2: VYTVOŘ NOVÉ UNIVERSAL POLICIES
-- ====================================

-- business_canvas_sections - ALLOW ALL
CREATE POLICY "allow_all_canvas_sections"
  ON business_canvas_sections
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- user_progress - ALLOW ALL
CREATE POLICY "allow_all_user_progress"
  ON user_progress
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- value_proposition_canvas - ALLOW ALL
CREATE POLICY "allow_all_vpc"
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

SELECT 'All policies fixed! Refresh app and test! 🎉' as status;
