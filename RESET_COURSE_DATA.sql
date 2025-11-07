-- 🔄 RESET KURZU - VYMAŽE VŠECHNA DATA, ALE ZACHOVÁ UŽIVATELE
-- 
-- Tento script vymaže:
-- ✅ Všechny dokončené lekce (user_progress)
-- ✅ Všechny odemčené achievementy (user_achievements) 
-- ✅ Všechna canvas data (user_canvas_data)
--
-- Zachová:
-- ✅ Uživatelské účty (auth.users)
-- ✅ Objednávky (orders)
--
-- ⚠️ POZOR: Tato akce je nevratná!
-- 
-- 📋 JAK POUŽÍT:
-- 1. Otevři Supabase Dashboard → SQL Editor
-- 2. Zkopíruj tento script
-- 3. Spusť ho (RUN)
-- 4. Refresh aplikaci a kurz začne od znova!

-- ============================================
-- 1️⃣ VYMAZAT VŠECHNY ACHIEVEMENTY
-- ============================================
DELETE FROM public.user_achievements;

-- ============================================
-- 2️⃣ VYMAZAT VŠECHEN PROGRESS
-- ============================================
DELETE FROM public.user_progress;

-- ============================================
-- 3️⃣ VYMAZAT VŠECHNA CANVAS DATA
-- ============================================
DELETE FROM public.user_canvas_data;

-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- Kurz je resetovaný! 
-- Uživatel zůstal přihlášený, ale všechna data jsou pryč.
-- Můžeš začít kurz od začátku a testovat flow.

-- ============================================
-- 🔍 OVĚŘENÍ (nepovinné)
-- ============================================
-- Spusť tyto dotazy a ujisti se, že tabulky jsou prázdné:

SELECT COUNT(*) as achievements_count FROM public.user_achievements;
-- Mělo by vrátit: 0

SELECT COUNT(*) as progress_count FROM public.user_progress;
-- Mělo by vrátit: 0

SELECT COUNT(*) as canvas_data_count FROM public.user_canvas_data;
-- Mělo by vrátit: 0

-- ============================================
-- 💡 BONUS: RESET JEN PRO KONKRÉTNÍHO UŽIVATELE
-- ============================================
-- Pokud chceš vymazat data jen pro sebe (ne pro všechny):
-- Nahraď 'TVOJE_USER_ID' za tvoje skutečné UUID z auth.users

-- DELETE FROM public.user_achievements WHERE user_id = 'TVOJE_USER_ID';
-- DELETE FROM public.user_progress WHERE user_id = 'TVOJE_USER_ID';
-- DELETE FROM public.user_canvas_data WHERE user_id = 'TVOJE_USER_ID';
