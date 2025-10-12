-- ====================================
-- SUPABASE RLS POLICIES - KOMPLETNÍ
-- ====================================
-- Spusť tento SQL v Supabase Dashboard → SQL Editor
-- Pro: Podnikatelská Čtvrtka LMS
-- Poznámka: Používáme custom token auth (ne Supabase Auth), 
--           takže policies jsou jednoduché - zabezpečení je v aplikaci

-- ====================================
-- SMAŽ EXISTUJÍCÍ POLICIES (clean start)
-- ====================================

DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Service can insert users" ON users;
DROP POLICY IF EXISTS "Anyone can read active modules" ON course_modules;
DROP POLICY IF EXISTS "Anyone can read active lessons" ON course_lessons;
DROP POLICY IF EXISTS "Anyone can read materials" ON course_materials;
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can view own canvas data" ON user_canvas_data;
DROP POLICY IF EXISTS "Users can insert own canvas data" ON user_canvas_data;
DROP POLICY IF EXISTS "Users can update own canvas data" ON user_canvas_data;
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;

-- ====================================
-- 1. USERS TABLE
-- ====================================
-- Webhook potřebuje INSERT, aplikace SELECT

CREATE POLICY "Enable read access for all users"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for service role"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for service role"
  ON users FOR UPDATE
  USING (true);

-- ====================================
-- 2. COURSE_MODULES (veřejný obsah)
-- ====================================

CREATE POLICY "Enable read access for all users"
  ON course_modules FOR SELECT
  USING (true);

-- ====================================
-- 3. COURSE_LESSONS (veřejný obsah)
-- ====================================

CREATE POLICY "Enable read access for all users"
  ON course_lessons FOR SELECT
  USING (true);

-- ====================================
-- 4. COURSE_MATERIALS (veřejný obsah)
-- ====================================

CREATE POLICY "Enable read access for all users"
  ON course_materials FOR SELECT
  USING (true);

-- ====================================
-- 5. USER_PROGRESS (user data)
-- ====================================
-- Aplikace potřebuje SELECT, INSERT, UPDATE

CREATE POLICY "Enable read access for all users"
  ON user_progress FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for all users"
  ON user_progress FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for all users"
  ON user_progress FOR UPDATE
  USING (true);

CREATE POLICY "Enable delete for all users"
  ON user_progress FOR DELETE
  USING (true);

-- ====================================
-- 6. USER_CANVAS_DATA (user data)
-- ====================================

CREATE POLICY "Enable read access for all users"
  ON user_canvas_data FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for all users"
  ON user_canvas_data FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for all users"
  ON user_canvas_data FOR UPDATE
  USING (true);

CREATE POLICY "Enable delete for all users"
  ON user_canvas_data FOR DELETE
  USING (true);

-- ====================================
-- 7. USER_ACHIEVEMENTS (user data)
-- ====================================

CREATE POLICY "Enable read access for all users"
  ON user_achievements FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for all users"
  ON user_achievements FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable delete for all users"
  ON user_achievements FOR DELETE
  USING (true);

-- ====================================
-- 8. CUSTOMER_PROBLEMS (galerie)
-- ====================================

CREATE POLICY "Enable read access for all users"
  ON customer_problems FOR SELECT
  USING (true);

-- ====================================
-- 9. BUSINESS_CANVAS_SECTIONS (galerie)
-- ====================================

CREATE POLICY "Enable read access for all users"
  ON business_canvas_sections FOR SELECT
  USING (true);

-- ====================================
-- 10. VALUE_PROPOSITION_CANVAS (Modul 3)
-- ====================================

CREATE POLICY "Enable read access for all users"
  ON value_proposition_canvas FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for all users"
  ON value_proposition_canvas FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for all users"
  ON value_proposition_canvas FOR UPDATE
  USING (true);

CREATE POLICY "Enable delete for all users"
  ON value_proposition_canvas FOR DELETE
  USING (true);

-- ====================================
-- ✅ HOTOVO!
-- ====================================
-- Všechny tabulky mají RLS policies
-- Security: Token validation je v aplikaci (CourseDemoV3.tsx)
-- Supabase RLS je "permissive" - povoluje všechno
-- Pro production: Zvážit použití Supabase Auth + auth.uid() policies

SELECT 'All RLS policies created successfully! 🎉' as status;
