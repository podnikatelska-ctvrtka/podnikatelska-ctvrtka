-- 🔄 RESET VPC DAT (Value Proposition Canvas)
-- 
-- Tento script vymaže POUZE data pro Modul 3 (VPC - Hodnotová nabídka)
-- Ostatní data (achievementy, progress, BMC) zůstanou nedotčená!
--
-- 📋 JAK POUŽÍT:
-- 1. Otevři Supabase Dashboard → SQL Editor
-- 2. Zkopíruj a spusť tento script
-- 3. Refresh aplikaci - Modul 3 začne od začátku!

-- ============================================
-- 1️⃣ SMAZAT VPC DATA PRO MŮJ ÚČET
-- ============================================
-- Smaže VPC data jen pro přihlášeného uživatele:

DELETE FROM public.value_proposition_canvas 
WHERE user_id = auth.uid()::text;

-- ============================================
-- 2️⃣ OVĚŘENÍ
-- ============================================
-- Zkontroluj, že VPC data jsou smazaná:

SELECT 
  (SELECT COUNT(*) FROM public.value_proposition_canvas WHERE user_id = auth.uid()::text) as "VPC data (mělo by být 0)";

-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- VPC data jsou smazaná! 
-- Modul 3 (Zákaznický profil + Hodnotová mapa) začne od začátku.
-- Ostatní data (BMC, progress, achievementy) zůstávají! 🎯
