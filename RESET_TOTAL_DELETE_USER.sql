-- ⚡ TOTÁLNÍ DELETE UŽIVATELE ZE SUPABASE
-- 
-- 🎯 ÚČEL: Kompletně odstranit uživatele - webhook ho vytvoří znovu při platbě
-- 
-- ⚠️ CO SE SMAŽE:
-- ✅ Všechny purchases
-- ✅ Všechny achievements
-- ✅ Veškerý progress
-- ✅ Canvas data (BMC + VPC)
-- ✅ UŽIVATEL KOMPLETNĚ (users tabulka)
--
-- 🔄 CO SE STANE PO SMAZÁNÍ:
-- 1. Uživatel neexistuje v Supabase
-- 2. Zadáš email na landing page → SmartEmailing opt-in
-- 3. Zakoupíš přes FAPI (1 Kč testovací platba)
-- 4. FAPI webhook vytvoří NOVÉHO uživatele v users tabulce
-- 5. Webhook vygeneruje token a pošle SmartEmailing notifikaci
-- 6. Dostaneš email s odkazem do kurzu
--
-- 📋 POSTUP:
-- 1. Supabase → SQL Editor
-- 2. Zkopíruj řádky níže (DELETE FROM...)
-- 3. Spusť (CMD+Enter)
-- 4. Otevři Console (F12): localStorage.clear(); location.reload();
-- 5. Jdi na landing page a začni flow od začátku
--
-- ════════════════════════════════════════════════════════════════

-- 🔥 TOTÁLNÍ DELETE PRO: p3pulin@seznam.cz
-- User ID: 2ac0d4c6-8556-4977-a74c-48b38c4e6d5d

-- Nejdřív smazat závislá data (foreign keys):
DELETE FROM public.purchases WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.user_achievements WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.user_progress WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.user_canvas_data WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.value_proposition_canvas WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

-- Teď smazat samotného uživatele:
DELETE FROM public.users WHERE id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

-- ════════════════════════════════════════════════════════════════
-- ✅ HOTOVO! Uživatel p3pulin@seznam.cz NEEXISTUJE v Supabase.
-- 
-- 🔄 DALŠÍ KROKY:
-- 1. Console: localStorage.clear(); location.reload();
-- 2. Landing page (/) → zadej email
-- 3. SmartEmailing opt-in
-- 4. Order page (/objednavka) → kup za 1 Kč
-- 5. FAPI webhook vytvoří uživatele znovu
-- 6. Webhook vygeneruje token
-- 7. Email s odkazem do kurzu
--
-- 📱 MOBIL TESTOVÁNÍ:
-- - Chrome DevTools → Toggle device toolbar (CMD+Shift+M)
-- - Nebo reálný mobil
-- - Projdi CELÝ flow od opt-in až po kurz
-- ════════════════════════════════════════════════════════════════
