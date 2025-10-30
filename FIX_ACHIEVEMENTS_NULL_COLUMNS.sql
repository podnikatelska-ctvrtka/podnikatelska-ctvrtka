-- 🔧 FIX: Achievement NULL Column Errors
-- Problém: title, description, icon jsou NOT NULL ale insertuji se jako NULL
-- Řešení: 
--   1. Smazat všechny záznamy s NULL hodnotami
--   2. Nechat schéma jak je (NOT NULL je správně!)
--   3. Frontend teď posílá title, description, icon správně

-- ❌ KROK 1: Vyčistit špatné záznamy
DELETE FROM user_achievements 
WHERE title IS NULL 
   OR description IS NULL 
   OR icon IS NULL;

-- ✅ KROK 2: Hotovo!
-- Frontend nyní posílá správná data (viz lib/achievements.ts)
-- Všechny budoucí achievementy budou mít title, description, icon

-- 🔍 OVĚŘENÍ: Zkontroluj že všechny záznamy jsou v pořádku
SELECT 
  COUNT(*) as total_achievements,
  COUNT(CASE WHEN title IS NOT NULL THEN 1 END) as with_title,
  COUNT(CASE WHEN description IS NOT NULL THEN 1 END) as with_description,
  COUNT(CASE WHEN icon IS NOT NULL THEN 1 END) as with_icon
FROM user_achievements;

-- Mělo by platit: total_achievements = with_title = with_description = with_icon
