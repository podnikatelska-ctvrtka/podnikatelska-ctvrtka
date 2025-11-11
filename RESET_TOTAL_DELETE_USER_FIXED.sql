-- ⚡ TOTÁLNÍ DELETE UŽIVATELE - OPRAVENÁ VERZE
-- 
-- 🎯 ÚČEL: Kompletně odstranit uživatele - webhook ho vytvoří znovu při platbě
-- 
-- ⚠️ DŮLEŽITÉ: Tabulka "purchases" neexistuje! Webhook jen vytváří access token.
--
-- ⚠️ CO SE SMAŽE:
-- ✅ Všechny achievements
-- ✅ Veškerý progress
-- ✅ Canvas data (BMC + VPC)
-- ✅ UŽIVATEL z auth.users (pokud je Supabase Auth uživatel)
--
-- 🔄 CO SE STANE PO SMAZÁNÍ:
-- 1. Uživatel neexistuje v Supabase
-- 2. Zadáš email na landing page → SmartEmailing opt-in
-- 3. Zakoupíš přes FAPI (1 Kč testovací platba)
-- 4. FAPI webhook vygeneruje nový token
-- 5. Pošle email s odkazem do kurzu
-- 6. Token autentikuje a vytvoří data v databázi
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

-- Smazat závislá data (foreign keys):
DELETE FROM public.user_achievements WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.user_progress WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.user_canvas_data WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.value_proposition_canvas WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

-- Smazat Supabase Auth uživatele (použij admin panel nebo auth.admin API):
-- Tento řádek nefunguje přes SQL Editor - musíš použít Supabase Dashboard:
-- Authentication → Users → najdi p3pulin@seznam.cz → Delete User

-- ⚠️ POZNÁMKA: 
-- auth.users tabulka je chráněná a nelze z ní mazat přes SQL Editor.
-- ALTERNATIVA: Uživatel v auth.users může zůstat - token auth funguje bez něj.
-- Webhook vytvořil jen token, ne záznam v auth.users.

-- ════════════════════════════════════════════════════════════════
-- ✅ HOTOVO! Data uživatele p3pulin@seznam.cz jsou smazána.
-- 
-- 🔄 DALŠÍ KROKY:
-- 1. Console: localStorage.clear(); location.reload();
-- 2. Landing page (/) → zadej email
-- 3. SmartEmailing opt-in
-- 4. Order page (/objednavka) → kup za 1 Kč
-- 5. FAPI webhook vygeneruje nový token
-- 6. Email s odkazem do kurzu
--
-- 📱 MOBIL TESTOVÁNÍ:
-- - Chrome DevTools → Toggle device toolbar (CMD+Shift+M)
-- - Nebo reálný mobil
-- - Projdi CELÝ flow od opt-in až po kurz
-- ════════════════════════════════════════════════════════════════
