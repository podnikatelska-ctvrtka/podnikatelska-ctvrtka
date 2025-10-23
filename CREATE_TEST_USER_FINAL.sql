-- ✅ FINÁLNÍ WORKING SQL - Vytvoření test usera
-- Spusť v Supabase SQL Editor

-- KROK 1: Zkontroluj jestli user už existuje
SELECT 
  id as "📋 UUID (zkopíruj do devToken.ts)",
  email,
  email_confirmed_at as "✅ Email confirmed?",
  created_at
FROM auth.users 
WHERE email = 'test@podnikatelskacitvrtka.cz';

-- ⚠️ POKUD VÝŠE VIDÍŠ ŘÁDEK → User již existuje!
--    Zkopíruj UUID do devToken.ts a jsi hotový!
-- ⚠️ POKUD NIC → Pokračuj níže...

-- ============================================
-- KROK 2: Vytvoř nového usera (POUZE pokud neexistuje!)
-- ============================================

DO $$ 
DECLARE
  new_user_id UUID;
BEGIN
  -- Zkus najít existujícího usera
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = 'test@podnikatelskacitvrtka.cz';
  
  -- Pokud neexistuje, vytvoř ho
  IF new_user_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'test@podnikatelskacitvrtka.cz',
      crypt('TestHeslo123!', gen_salt('bf')),
      now(), -- ✅ Email confirmed okamžitě
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      ''
    )
    RETURNING id INTO new_user_id;
    
    RAISE NOTICE '✅ Test user vytvořen s UUID: %', new_user_id;
  ELSE
    RAISE NOTICE 'ℹ️ Test user již existuje s UUID: %', new_user_id;
    
    -- Potvrď email pokud ještě není
    UPDATE auth.users 
    SET email_confirmed_at = now()
    WHERE id = new_user_id AND email_confirmed_at IS NULL;
  END IF;
END $$;

-- ============================================
-- KROK 3: Zobraz UUID pro devToken.ts
-- ============================================

SELECT 
  id as "📋 ZKOPÍRUJ TENTO UUID DO devToken.ts",
  email,
  email_confirmed_at as "✅ Email confirmed?",
  created_at
FROM auth.users 
WHERE email = 'test@podnikatelskacitvrtka.cz';

-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- Credentials:
--   Email: test@podnikatelskacitvrtka.cz
--   Heslo: TestHeslo123!
-- 
-- UUID: Zkopíruj z výsledku výše do /lib/devToken.ts
-- ============================================
