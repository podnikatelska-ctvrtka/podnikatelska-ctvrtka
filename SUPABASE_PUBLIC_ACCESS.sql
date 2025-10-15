-- ====================================
-- VEŘEJNÝ PŘÍSTUP BEZ AUTENTIZACE
-- ====================================
-- Tohle umožní přístup i přes ANON KEY

-- 1. SMAŽ VŠECHNY STARÉ POLICIES
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT schemaname, tablename, policyname 
              FROM pg_policies 
              WHERE schemaname = 'public' 
              AND tablename IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas')) 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
                      r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- 2. VYTVOŘ NOVÉ PUBLIC POLICIES

-- business_canvas_sections
CREATE POLICY "public_read_canvas" ON business_canvas_sections
  FOR SELECT USING (true);
  
CREATE POLICY "public_insert_canvas" ON business_canvas_sections
  FOR INSERT WITH CHECK (true);
  
CREATE POLICY "public_update_canvas" ON business_canvas_sections
  FOR UPDATE USING (true) WITH CHECK (true);
  
CREATE POLICY "public_delete_canvas" ON business_canvas_sections
  FOR DELETE USING (true);

-- user_progress  
CREATE POLICY "public_read_progress" ON user_progress
  FOR SELECT USING (true);
  
CREATE POLICY "public_insert_progress" ON user_progress
  FOR INSERT WITH CHECK (true);
  
CREATE POLICY "public_update_progress" ON user_progress
  FOR UPDATE USING (true) WITH CHECK (true);
  
CREATE POLICY "public_delete_progress" ON user_progress
  FOR DELETE USING (true);

-- value_proposition_canvas
CREATE POLICY "public_read_vpc" ON value_proposition_canvas
  FOR SELECT USING (true);
  
CREATE POLICY "public_insert_vpc" ON value_proposition_canvas
  FOR INSERT WITH CHECK (true);
  
CREATE POLICY "public_update_vpc" ON value_proposition_canvas
  FOR UPDATE USING (true) WITH CHECK (true);
  
CREATE POLICY "public_delete_vpc" ON value_proposition_canvas
  FOR DELETE USING (true);

-- 3. ZAPNI RLS (policies jsou nastavené)
ALTER TABLE business_canvas_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE value_proposition_canvas ENABLE ROW LEVEL SECURITY;

-- 4. ZKONTROLUJ
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas')
GROUP BY tablename
ORDER BY tablename;

SELECT '✅ Public access enabled! Should work now!' as status;
