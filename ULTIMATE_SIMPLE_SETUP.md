# 🎯 ULTIMATE SIMPLE SETUP - Konečně fungující!

## **1 SQL PŘÍKAZ = HOTOVO**

---

## **KROK 1: Spusť SQL**

### **Copy-paste tohle do Supabase SQL Editor:**

```sql
-- Spusť tento celý blok najednou!

DO $$ 
DECLARE
  new_user_id UUID;
BEGIN
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = 'test@podnikatelskacitvrtka.cz';
  
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
      now(),
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
  ELSE
    UPDATE auth.users 
    SET email_confirmed_at = now()
    WHERE id = new_user_id;
  END IF;
END $$;

SELECT 
  id as "📋 ZKOPÍRUJ UUID",
  email,
  email_confirmed_at
FROM auth.users 
WHERE email = 'test@podnikatelskacitvrtka.cz';
```

---

## **KROK 2: Zkopíruj UUID**

Z výsledku zkopíruj UUID a vlož sem:

```typescript
// /lib/devToken.ts
export const DEV_TOKEN_CONFIG = {
  enabled: isDev,
  userId: 'SEM_VLOŽ_UUID', // ← Sem!
  email: 'test@podnikatelskacitvrtka.cz'
};
```

---

## **KROK 3: Hard refresh**

```
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

---

## **✅ HOTOVO!**

Credentials:
```
Email: test@podnikatelskacitvrtka.cz
Heslo: TestHeslo123!
```

Testuj:
```
1. Přihlaš se
2. Jdi do kurzu
3. Dokonč lekci
4. Dashboard → Měl bys vidět progress ✅
```

---

**Jeden SQL blok, zkopíruj UUID, refresh - FUNGUJE!** 🚀
