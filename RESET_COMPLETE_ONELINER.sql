-- ⚡ KOMPLETNÍ RESET - VŠECHNA DATA (achievements, progress, canvas, VPC)
-- 
-- ⚠️ POZOR: Toto smaže VŠECHNO! Kurz začne od začátku.
-- Zkopíruj všechny 4 řádky a spusť v Supabase SQL Editor:

DELETE FROM public.user_achievements WHERE user_id = auth.uid();
DELETE FROM public.user_progress WHERE user_id = auth.uid();
DELETE FROM public.user_canvas_data WHERE user_id = auth.uid();
DELETE FROM public.value_proposition_canvas WHERE user_id = auth.uid()::text;

-- ✅ Pak otevři Console (F12) a spusť:
-- localStorage.clear(); location.reload();
