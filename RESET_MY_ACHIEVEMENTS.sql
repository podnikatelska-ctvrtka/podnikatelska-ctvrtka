-- 🗑️ SMAZAT VŠECHNY ACHIEVEMENTY PRO MĚ
-- Spusť v Supabase SQL Editor

-- Najdi svůj user_id
SELECT id, email FROM auth.users WHERE email LIKE '%@%';

-- Smaž všechny achievementy pro konkrétního usera (REPLACE user_id!)
DELETE FROM public.user_achievements 
WHERE user_id = 'TVUJ_USER_ID_ZDE';

-- Zkontroluj že jsou smazané
SELECT COUNT(*) FROM public.user_achievements WHERE user_id = 'TVUJ_USER_ID_ZDE';
-- Mělo by vrátit: 0
