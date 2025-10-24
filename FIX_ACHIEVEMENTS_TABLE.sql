-- 🔧 FIX: Recreate user_achievements table with correct schema
-- Tento SQL opraví tabulku a refreshne Supabase cache

-- ============================================
-- 1️⃣ BACKUP CURRENT DATA
-- ============================================
-- (Supabase neumožňuje přímo backup, ale můžeš si stáhnout data před DELETE)

-- ============================================
-- 2️⃣ DROP OLD TABLE
-- ============================================
DROP TABLE IF EXISTS public.user_achievements CASCADE;

-- ============================================
-- 3️⃣ CREATE NEW TABLE WITH CORRECT SCHEMA
-- ============================================
CREATE TABLE public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: jeden achievement může být odemčen pouze jednou
  UNIQUE(user_id, achievement_type)
);

-- ============================================
-- 4️⃣ CREATE INDEXES
-- ============================================
CREATE INDEX idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement_type ON public.user_achievements(achievement_type);

-- ============================================
-- 5️⃣ ENABLE RLS
-- ============================================
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6️⃣ CREATE RLS POLICIES
-- ============================================
-- Users can read their own achievements
CREATE POLICY "Users can read their own achievements"
  ON public.user_achievements
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own achievements
CREATE POLICY "Users can insert their own achievements"
  ON public.user_achievements
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own achievements (optional - pro debug)
CREATE POLICY "Users can update their own achievements"
  ON public.user_achievements
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own achievements (optional - pro reset)
CREATE POLICY "Users can delete their own achievements"
  ON public.user_achievements
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 7️⃣ FORCE REFRESH SCHEMA CACHE
-- ============================================
NOTIFY pgrst, 'reload schema';

-- ============================================
-- 8️⃣ VERIFY TABLE STRUCTURE
-- ============================================
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public'
  AND table_name = 'user_achievements'
ORDER BY ordinal_position;

-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- Měl bys vidět:
-- - id (uuid)
-- - user_id (uuid)
-- - achievement_type (text)
-- - unlocked_at (timestamp with time zone)
