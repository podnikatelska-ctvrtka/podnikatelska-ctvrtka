-- ====================================
-- ZKONTROLUJ CO SE SKUTEČNĚ DĚJE
-- ====================================
-- Spusť v Supabase SQL Editor a pošli mi výsledky!

-- 1. ZKONTROLUJ TABULKY
SELECT 
  table_name,
  'EXISTS ✅' as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas')
ORDER BY table_name;

-- 2. ZKONTROLUJ RLS STATUS
SELECT 
  schemaname,
  tablename,
  CASE 
    WHEN rowsecurity THEN 'ENABLED 🔒'
    ELSE 'DISABLED 🔓'
  END as rls_status
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas')
ORDER BY tablename;

-- 3. ZKONTROLUJ POLICIES
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd as operation,
  qual as using_clause,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas')
ORDER BY tablename, policyname;

-- 4. ZKONTROLUJ DATA (pokud tabulky existují)
DO $$
BEGIN
  -- Count business_canvas_sections
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'business_canvas_sections') THEN
    RAISE NOTICE 'business_canvas_sections count: %', (SELECT COUNT(*) FROM business_canvas_sections);
  ELSE
    RAISE NOTICE 'business_canvas_sections: TABLE DOES NOT EXIST ❌';
  END IF;
  
  -- Count user_progress
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_progress') THEN
    RAISE NOTICE 'user_progress count: %', (SELECT COUNT(*) FROM user_progress);
  ELSE
    RAISE NOTICE 'user_progress: TABLE DOES NOT EXIST ❌';
  END IF;
  
  -- Count value_proposition_canvas
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'value_proposition_canvas') THEN
    RAISE NOTICE 'value_proposition_canvas count: %', (SELECT COUNT(*) FROM value_proposition_canvas);
  ELSE
    RAISE NOTICE 'value_proposition_canvas: TABLE DOES NOT EXIST ❌';
  END IF;
END $$;

SELECT '=== DEBUG CHECK COMPLETE ===' as result;
