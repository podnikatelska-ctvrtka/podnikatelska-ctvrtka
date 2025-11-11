-- ⚡ KOMPLETNÍ RESET PRO TESTOVÁNÍ PLATEBNÍHO FLOW
-- 
-- 🎯 ÚČEL: Kompletně vyčistit uživatele pro nový průchod platebním flow
-- 📧 EMAIL ZŮSTANE: Pro příjem FAPI notifikací a SmartEmailing
--
-- ⚠️ CO SE SMAŽE:
-- ✅ Všechny purchases (nákupy)
-- ✅ Všechny achievements (úspěchy)
-- ✅ Veškerý progress v kurzu
-- ✅ Business Model Canvas data
-- ✅ Value Proposition Canvas data
-- ✅ FIT Validátor data
--
-- ❌ CO ZŮSTANE:
-- ✅ Záznam v users tabulce (email, created_at)
--
-- 📋 POSTUP:
-- 1. Otevři Supabase → SQL Editor
-- 2. Zkopíruj všechny řádky níže (od DELETE po poslední ;)
-- 3. Spusť (CMD+Enter / CTRL+Enter)
-- 4. Otevři Console v prohlížeči (F12)
-- 5. Spusť: localStorage.clear(); location.reload();
--
-- ════════════════════════════════════════════════════════════════

-- 🔥 RESET PRO: p3pulin@seznam.cz
-- User ID: 2ac0d4c6-8556-4977-a74c-48b38c4e6d5d

DELETE FROM public.purchases WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.user_achievements WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.user_progress WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.user_canvas_data WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.value_proposition_canvas WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

-- ════════════════════════════════════════════════════════════════
-- ✅ HOTOVO! Uživatel je jako nový, ale email zůstává v systému.
-- 
-- 🔄 DALŠÍ KROKY:
-- 1. localStorage.clear(); location.reload(); (v Console)
-- 2. Jdi na landing page (/)
-- 3. Zadej email: p3pulin@seznam.cz
-- 4. Projdi celý platební flow
-- 5. Testuj webhook + token + kurz
--
-- 📱 MOBIL TESTOVÁNÍ:
-- - Otevři mobil v prohlížeči (Chrome DevTools → Toggle device)
-- - Nebo použij reálný mobil
-- - Projdi celý flow od začátku
-- ════════════════════════════════════════════════════════════════
