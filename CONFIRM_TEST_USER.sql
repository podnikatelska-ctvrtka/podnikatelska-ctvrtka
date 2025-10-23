-- 🔧 POTVRĎ TEST USERA - Email Confirmation
-- Tento SQL příkaz potvrdí email test usera bez nutnosti klikat v UI

-- Potvrď email pro test usera
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'test@podnikatelskactvrtka.cz';

-- Zkontroluj že to funguje
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'test@podnikatelskactvrtka.cz';

-- ✅ Pokud vidíš email_confirmed_at s timestamp → FUNGUJE!
-- ❌ Pokud je NULL → zkus spustit znovu
