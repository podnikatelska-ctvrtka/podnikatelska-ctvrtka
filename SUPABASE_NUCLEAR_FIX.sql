-- ====================================
-- 🔥 NUCLEAR OPTION - VYPNI ÚPLNĚ RLS
-- ====================================
-- Pro TEST použij tohle - pak to můžeme bezpečně zapnout

-- VYPNI RLS PRO VŠECHNY 3 TABULKY
ALTER TABLE IF EXISTS business_canvas_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_progress DISABLE ROW LEVEL SECURITY;  
ALTER TABLE IF EXISTS value_proposition_canvas DISABLE ROW LEVEL SECURITY;

-- SMAŽ VŠECHNY POLICIES
DROP POLICY IF EXISTS "allow_all_canvas_sections" ON business_canvas_sections;
DROP POLICY IF EXISTS "allow_all_user_progress" ON user_progress;
DROP POLICY IF EXISTS "allow_all_vpc" ON value_proposition_canvas;

-- Smaž i staré policies pokud existují
DROP POLICY IF EXISTS "sections_select_policy" ON business_canvas_sections;
DROP POLICY IF EXISTS "sections_insert_policy" ON business_canvas_sections;
DROP POLICY IF EXISTS "sections_update_policy" ON business_canvas_sections;
DROP POLICY IF EXISTS "sections_delete_policy" ON business_canvas_sections;

DROP POLICY IF EXISTS "Enable read access for all users" ON business_canvas_sections;
DROP POLICY IF EXISTS "Enable insert for all users" ON business_canvas_sections;
DROP POLICY IF EXISTS "Enable update for all users" ON business_canvas_sections;

-- ZKONTROLUJ VÝSLEDEK
SELECT 
  tablename,
  CASE 
    WHEN rowsecurity THEN '❌ STILL ENABLED'
    ELSE '✅ DISABLED - SHOULD WORK NOW'
  END as rls_status
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas')
ORDER BY tablename;

SELECT '🎉 RLS DISABLED - REFRESH APP AND TEST!' as status;
