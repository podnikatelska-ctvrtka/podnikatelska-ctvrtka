-- ====================================
-- FIX: CHYBĚJÍCÍ POLICIES PRO BUSINESS_CANVAS_SECTIONS
-- ====================================
-- Supabase Dashboard → SQL Editor → SPUSŤ!

-- Přidej INSERT policy
CREATE POLICY "sections_insert_policy" 
  ON business_canvas_sections 
  FOR INSERT 
  WITH CHECK (true);

-- Přidej UPDATE policy
CREATE POLICY "sections_update_policy" 
  ON business_canvas_sections 
  FOR UPDATE 
  USING (true);

-- Přidej DELETE policy
CREATE POLICY "sections_delete_policy" 
  ON business_canvas_sections 
  FOR DELETE 
  USING (true);

-- ✅ HOTOVO! Teď by UPSERT měl fungovat!
SELECT 'Policies added! Refresh app and try again! 🎉' as status;
