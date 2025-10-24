-- 🧪 TEST: Vyzkoušej insert do user_achievements tabulky
-- Tento SQL otestuje jestli tabulka funguje správně

-- ============================================
-- 1️⃣ VERIFY STRUCTURE
-- ============================================
SELECT 
  column_name, 
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public'
  AND table_name = 'user_achievements'
ORDER BY ordinal_position;

-- ============================================
-- 2️⃣ TEST INSERT (změní user_id na TVOJE UUID!)
-- ============================================
-- Najdi své UUID:
SELECT id, email FROM auth.users LIMIT 5;

-- Pak zkus insert (ZMĚNÍ user_id!):
INSERT INTO public.user_achievements (user_id, achievement_type, unlocked_at)
VALUES (
  '3532be36-e70a-4f04-8426-a4463b87f888', -- ← ZMĚNÍ NA TVOJE UUID!
  'test-achievement',
  NOW()
)
ON CONFLICT (user_id, achievement_type) DO NOTHING;

-- ============================================
-- 3️⃣ VERIFY INSERT WORKED
-- ============================================
SELECT * FROM public.user_achievements
WHERE achievement_type = 'test-achievement';

-- ============================================
-- 4️⃣ CLEANUP TEST DATA
-- ============================================
DELETE FROM public.user_achievements
WHERE achievement_type = 'test-achievement';

-- ============================================
-- ✅ Pokud všechno proběhlo bez chyb → tabulka je OK!
-- ============================================
