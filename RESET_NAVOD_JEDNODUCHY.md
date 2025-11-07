# ⚡ ULTRA JEDNODUCHÝ RESET - PŘESNÉ KROKY

## 🎯 CO BUDEŠ DĚLAT

Smažeš VPC data a achievements z Modulu 2 a 3 (zachováš Modul 1).

---

## 📋 KROK 1: Otevři Supabase SQL Editor

1. Jdi na **Supabase Dashboard**
2. Klikni na **SQL Editor** (v levém menu)
3. Klikni na **New Query** (zelené tlačítko)

---

## 📋 KROK 2: Zkopíruj CELÝ tento SQL

**⚠️ DŮLEŽITÉ: Zkopíruj VŠECHNO od řádku "DO $$" až po poslední řádek!**

```sql
DO $$
DECLARE
  my_user_id UUID;
  my_user_id_text TEXT;
BEGIN
  SELECT id INTO my_user_id
  FROM auth.users
  WHERE email = 'p3pulin@seznam.cz';
  
  my_user_id_text := my_user_id::text;
  
  IF my_user_id IS NOT NULL THEN
    RAISE NOTICE 'Našel jsem uživatele: %', my_user_id;
    
    DELETE FROM public.value_proposition_canvas 
    WHERE user_id = my_user_id_text;
    RAISE NOTICE 'VPC data smazána!';
    
    DELETE FROM public.user_achievements 
    WHERE user_id = my_user_id
    AND achievement_type IN (
      'validator-used',
      'profit-calculated',
      'module-2-complete',
      'customer-profile-complete',
      'value-map-complete',
      'fit-70-percent',
      'product-fit-master',
      'fit-90-percent',
      'module-3-complete',
      'master-of-tools',
      'ultimate-master'
    );
    RAISE NOTICE 'Achievements smazány!';
    
  END IF;
END $$;

SELECT 
  u.email,
  (SELECT COUNT(*) FROM public.value_proposition_canvas WHERE user_id = u.id::text) as vpc_data,
  (SELECT COUNT(*) FROM public.user_achievements WHERE user_id = u.id) as achievements
FROM auth.users u
WHERE u.email = 'p3pulin@seznam.cz';
```

---

## 📋 KROK 3: Spusť SQL

1. Vlož SQL do editoru
2. Klikni na **RUN** (nebo zmáčkni Ctrl+Enter)
3. Měl by ses vidět výsledek:
   - `vpc_data = 0` (žádná VPC data)
   - `achievements = 4 nebo 5` (jen Modul 1)

---

## 📋 KROK 4: Vyčisti localStorage

1. Otevři aplikaci v prohlížeči
2. Zmáčkni **F12** (otevře Developer Tools)
3. Přejdi na **Console**
4. Zkopíruj a spusť:

```javascript
localStorage.clear();
location.reload();
```

---

## ✅ HOTOVO!

- ✅ VPC data smazána (Zákaznický profil prázdný)
- ✅ Achievements z Modulu 2 a 3 smazány
- ✅ Modul 1 zůstane hotový

**Teď dokončíš lekci 13** a měl by se zobrazit achievement "Modul 2 dokončen"! 🎉

---

## ❓ CO KDYŽ TO NEFUNGUJE?

### Problém: "Uživatel nebyl nalezen"

→ Email `p3pulin@seznam.cz` není v databázi. Zkontroluj:

```sql
SELECT email FROM auth.users;
```

### Problém: VPC data se nesmazala

→ Zkus ruční DELETE s konkrétním ID:

```sql
-- 1. Zjisti své user_id:
SELECT id FROM auth.users WHERE email = 'p3pulin@seznam.cz';

-- 2. Zkopíruj ID a vlož sem:
DELETE FROM public.value_proposition_canvas WHERE user_id = 'TVOJE_ID_ZDE';
```

### Problém: Achievements se nesmazaly

→ Zkontroluj RLS políčka na tabulce `user_achievements`:

```sql
SELECT tablename, policyname FROM pg_policies WHERE tablename = 'user_achievements';
```

---

## 🆘 POSLEDNÍ MOŽNOST

Pokud nic nefunguje, pošli screenshot:

1. **Table Editor** → `auth.users` → najdi svůj email a ukáž sloupec `id`
2. **Table Editor** → `value_proposition_canvas` → ukáž sloupec `user_id`
3. SQL výsledek z tohoto příkazu:

```sql
SELECT * FROM public.value_proposition_canvas LIMIT 5;
```

Pak ti to opravím! 💪
