-- 🗑️ SMAZAT STARÉ ACHIEVEMENTY Z DB
-- Spusť toto SQL v Supabase SQL Editor

-- Smaž achievementy které už nejsou v ACHIEVEMENTS array
DELETE FROM public.user_achievements
WHERE achievement_type IN ('first-lesson-completed', 'business-model-basics');

-- Zobraz kolik achievementů má každý user
SELECT 
  user_id,
  COUNT(*) as total_achievements,
  array_agg(achievement_type ORDER BY created_at) as achievements
FROM public.user_achievements
GROUP BY user_id
ORDER BY total_achievements DESC;
