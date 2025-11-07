-- 🔄 RESET MÝCH DAT - VYMAŽE DATA JEN PRO MŮJ ÚČET
-- 
-- ⚠️ Musíš být přihlášený v Supabase Dashboard pod stejným účtem,
--    který používáš v aplikaci!
--
-- 📋 JAK POUŽÍT:
-- 1. Ujisti se, že jsi přihlášený v Supabase Dashboard
-- 2. Otevři SQL Editor v Supabase
-- 3. Zkopíruj a spusť CELÝ tento script
-- 4. Script automaticky najde tvoje user_id a smaže jen TVOJE data
-- 5. Refresh aplikaci - kurz začne od začátku!

-- ============================================
-- 1️⃣ ZJISTIT MOJE USER_ID
-- ============================================
-- Tento dotaz ti ukáže tvoje user_id:
SELECT 
  id as "Moje User ID",
  email as "Můj Email",
  created_at as "Vytvořen"
FROM auth.users
WHERE id = auth.uid();

-- ⚠️ ZKOPÍRUJ si user_id z výsledku výše a pokračuj níže!

-- ============================================
-- 2️⃣ SMAZAT MOJE DATA
-- ============================================
-- Tento DELETE příkaz smaže data jen pro přihlášeného uživatele:

DELETE FROM public.user_achievements 
WHERE user_id = auth.uid();

DELETE FROM public.user_progress 
WHERE user_id = auth.uid();

DELETE FROM public.user_canvas_data 
WHERE user_id = auth.uid();

-- ============================================
-- 3️⃣ OVĚŘENÍ
-- ============================================
-- Zkontroluj, že tvoje data jsou smazaná:

SELECT 
  (SELECT COUNT(*) FROM public.user_achievements WHERE user_id = auth.uid()) as "Achievementy (mělo by být 0)",
  (SELECT COUNT(*) FROM public.user_progress WHERE user_id = auth.uid()) as "Progress (mělo by být 0)",
  (SELECT COUNT(*) FROM public.user_canvas_data WHERE user_id = auth.uid()) as "Canvas data (mělo by být 0)";

-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- Tvoje data jsou smazaná! 
-- Ostatní uživatelé (pokud existují) mají data nedotčená.
-- Refresh aplikaci a můžeš začít znovu! 🎯
