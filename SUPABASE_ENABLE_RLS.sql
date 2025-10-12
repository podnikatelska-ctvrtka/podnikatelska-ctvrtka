-- ====================================
-- ENABLE RLS + CREATE POLICIES
-- ====================================
-- Fix: Tabulky mají policies, ale RLS není enabled!

-- ====================================
-- 1. ENABLE RLS NA VŠECH TABULKÁCH
-- ====================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_canvas_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_canvas_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE value_proposition_canvas ENABLE ROW LEVEL SECURITY;

-- ====================================
-- 2. SMAŽ VŠECHNY EXISTUJÍCÍ POLICIES
-- ====================================

-- Users
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for service role" ON users;
DROP POLICY IF EXISTS "Enable update for service role" ON users;
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Service can insert users" ON users;

-- Course modules
DROP POLICY IF EXISTS "Enable read access for all users" ON course_modules;

-- Course lessons
DROP POLICY IF EXISTS "Enable read access for all users" ON course_lessons;

-- Course materials
DROP POLICY IF EXISTS "Enable read access for all users" ON course_materials;

-- User progress
DROP POLICY IF EXISTS "Enable read access for all users" ON user_progress;
DROP POLICY IF EXISTS "Enable insert for all users" ON user_progress;
DROP POLICY IF EXISTS "Enable update for all users" ON user_progress;
DROP POLICY IF EXISTS "Enable delete for all users" ON user_progress;

-- User canvas data
DROP POLICY IF EXISTS "Enable read access for all users" ON user_canvas_data;
DROP POLICY IF EXISTS "Enable insert for all users" ON user_canvas_data;
DROP POLICY IF EXISTS "Enable update for all users" ON user_canvas_data;
DROP POLICY IF EXISTS "Enable delete for all users" ON user_canvas_data;

-- User achievements
DROP POLICY IF EXISTS "Enable read access for all users" ON user_achievements;
DROP POLICY IF EXISTS "Enable insert for all users" ON user_achievements;
DROP POLICY IF EXISTS "Enable delete for all users" ON user_achievements;

-- Customer problems
DROP POLICY IF EXISTS "Enable read access for all users" ON customer_problems;

-- Business canvas sections
DROP POLICY IF EXISTS "Enable read access for all users" ON business_canvas_sections;

-- Value proposition canvas
DROP POLICY IF EXISTS "Enable read access for all users" ON value_proposition_canvas;
DROP POLICY IF EXISTS "Enable insert for all users" ON value_proposition_canvas;
DROP POLICY IF EXISTS "Enable update for all users" ON value_proposition_canvas;
DROP POLICY IF EXISTS "Enable delete for all users" ON value_proposition_canvas;

-- ====================================
-- 3. VYTVOŘ NOVÉ POLICIES (s unikátními názvy)
-- ====================================

-- USERS
CREATE POLICY "users_select_policy" ON users FOR SELECT USING (true);
CREATE POLICY "users_insert_policy" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "users_update_policy" ON users FOR UPDATE USING (true);

-- COURSE_MODULES
CREATE POLICY "modules_select_policy" ON course_modules FOR SELECT USING (true);

-- COURSE_LESSONS
CREATE POLICY "lessons_select_policy" ON course_lessons FOR SELECT USING (true);

-- COURSE_MATERIALS
CREATE POLICY "materials_select_policy" ON course_materials FOR SELECT USING (true);

-- USER_PROGRESS
CREATE POLICY "progress_select_policy" ON user_progress FOR SELECT USING (true);
CREATE POLICY "progress_insert_policy" ON user_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "progress_update_policy" ON user_progress FOR UPDATE USING (true);
CREATE POLICY "progress_delete_policy" ON user_progress FOR DELETE USING (true);

-- USER_CANVAS_DATA
CREATE POLICY "canvas_select_policy" ON user_canvas_data FOR SELECT USING (true);
CREATE POLICY "canvas_insert_policy" ON user_canvas_data FOR INSERT WITH CHECK (true);
CREATE POLICY "canvas_update_policy" ON user_canvas_data FOR UPDATE USING (true);
CREATE POLICY "canvas_delete_policy" ON user_canvas_data FOR DELETE USING (true);

-- USER_ACHIEVEMENTS
CREATE POLICY "achievements_select_policy" ON user_achievements FOR SELECT USING (true);
CREATE POLICY "achievements_insert_policy" ON user_achievements FOR INSERT WITH CHECK (true);
CREATE POLICY "achievements_delete_policy" ON user_achievements FOR DELETE USING (true);

-- CUSTOMER_PROBLEMS
CREATE POLICY "problems_select_policy" ON customer_problems FOR SELECT USING (true);

-- BUSINESS_CANVAS_SECTIONS
CREATE POLICY "sections_select_policy" ON business_canvas_sections FOR SELECT USING (true);

-- VALUE_PROPOSITION_CANVAS
CREATE POLICY "vpc_select_policy" ON value_proposition_canvas FOR SELECT USING (true);
CREATE POLICY "vpc_insert_policy" ON value_proposition_canvas FOR INSERT WITH CHECK (true);
CREATE POLICY "vpc_update_policy" ON value_proposition_canvas FOR UPDATE USING (true);
CREATE POLICY "vpc_delete_policy" ON value_proposition_canvas FOR DELETE USING (true);

-- ====================================
-- ✅ HOTOVO!
-- ====================================

SELECT 'RLS enabled on all tables + policies created! 🎉' as status;
