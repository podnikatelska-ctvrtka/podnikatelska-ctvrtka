-- ✅ FIX 406 ERROR: Enable PUBLIC access to all tables
-- Run this in Supabase SQL Editor

-- 1️⃣ DISABLE RLS on all tables (pro development/testing)
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_canvas_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE value_proposition_canvas DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements DISABLE ROW LEVEL SECURITY;

-- 2️⃣ DROP všechny existující policies (pro čistý stav)
DROP POLICY IF EXISTS "Enable read access for all users" ON user_progress;
DROP POLICY IF EXISTS "Enable insert for all users" ON user_progress;
DROP POLICY IF EXISTS "Enable update for all users" ON user_progress;
DROP POLICY IF EXISTS "Enable delete for all users" ON user_progress;

DROP POLICY IF EXISTS "Enable read access for all users" ON user_canvas_data;
DROP POLICY IF EXISTS "Enable insert for all users" ON user_canvas_data;
DROP POLICY IF EXISTS "Enable update for all users" ON user_canvas_data;
DROP POLICY IF EXISTS "Enable delete for all users" ON user_canvas_data;

DROP POLICY IF EXISTS "Enable read access for all users" ON value_proposition_canvas;
DROP POLICY IF EXISTS "Enable insert for all users" ON value_proposition_canvas;
DROP POLICY IF EXISTS "Enable update for all users" ON value_proposition_canvas;
DROP POLICY IF EXISTS "Enable delete for all users" ON value_proposition_canvas;

DROP POLICY IF EXISTS "Enable read access for all users" ON user_achievements;
DROP POLICY IF EXISTS "Enable insert for all users" ON user_achievements;
DROP POLICY IF EXISTS "Enable update for all users" ON user_achievements;
DROP POLICY IF EXISTS "Enable delete for all users" ON user_achievements;

-- 3️⃣ GRANT PUBLIC ACCESS to all tables
GRANT ALL ON user_progress TO anon, authenticated;
GRANT ALL ON user_canvas_data TO anon, authenticated;
GRANT ALL ON value_proposition_canvas TO anon, authenticated;
GRANT ALL ON user_achievements TO anon, authenticated;

-- 4️⃣ Verify tables exist and have correct structure
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('user_progress', 'user_canvas_data', 'value_proposition_canvas', 'user_achievements')
ORDER BY table_name, ordinal_position;

-- ✅ DONE! Now all tables are PUBLIC and accessible without RLS
