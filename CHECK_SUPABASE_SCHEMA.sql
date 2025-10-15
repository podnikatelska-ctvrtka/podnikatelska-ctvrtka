-- ====================================
-- ZKONTROLUJ SUPABASE SCHEMA
-- ====================================
-- Spusť v Supabase SQL Editor a pošli mi výsledky!

-- 1. Zkontroluj datové typy sloupců
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas')
AND column_name = 'user_id'
ORDER BY table_name;

-- 2. Zkontroluj RLS status
SELECT 
  tablename,
  CASE WHEN rowsecurity THEN '❌ ENABLED (blokuje)' ELSE '✅ DISABLED (OK)' END as rls_status
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas')
ORDER BY tablename;

-- 3. Zkontroluj jestli existují data
SELECT 
  'business_canvas_sections' as table_name,
  COUNT(*) as row_count
FROM business_canvas_sections
UNION ALL
SELECT 
  'user_progress',
  COUNT(*)
FROM user_progress
UNION ALL
SELECT 
  'value_proposition_canvas',
  COUNT(*)
FROM value_proposition_canvas;

-- 4. Zkontroluj policies (pokud RLS enabled)
SELECT 
  tablename,
  policyname,
  cmd as operation
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas')
ORDER BY tablename, policyname;

SELECT '=== SCHEMA CHECK COMPLETE ===' as status;
