-- 🔄 RESET DAT PRO UUID: 2ac0d4c6-8556-4977-a74c-48b38c4e6d5d
-- 
-- Nejrychlejší verze - prostě zkopíruj a spusť! ⚡
--
-- 📋 JAK POUŽÍT:
-- 1. Otevři Supabase Dashboard → SQL Editor
-- 2. Zkopíruj a spusť CELÝ tento script (CTRL+A, CTRL+C, CTRL+V, RUN)
-- 3. Refresh aplikaci - kurz začne od začátku!

-- ============================================
-- SMAZAT VŠECHNA DATA
-- ============================================

DELETE FROM public.user_achievements 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

DELETE FROM public.user_progress 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

DELETE FROM public.user_canvas_data 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- Všechna data smazaná! 
-- Refresh aplikaci (F5) a můžeš začít znovu! 🎯
