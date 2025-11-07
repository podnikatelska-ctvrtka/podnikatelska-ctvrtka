# ⚡ RESET PRO p3pulin@seznam.cz - 3 KROKY

**UUID:** `2ac0d4c6-8556-4977-a74c-48b38c4e6d5d`

---

## 📋 KROK 1: Spusť SQL v Supabase

1. Otevři **Supabase Dashboard** → **SQL Editor** → **New Query**
2. Zkopíruj tyto **2 řádky** a spusť:

```sql
DELETE FROM public.value_proposition_canvas WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
DELETE FROM public.user_achievements WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d' AND achievement_type IN ('validator-used','profit-calculated','module-2-complete','customer-profile-complete','value-map-complete','fit-70-percent','product-fit-master','fit-90-percent','module-3-complete','master-of-tools','ultimate-master');
```

3. Klikni **RUN** (nebo Ctrl+Enter)
4. Měl bys vidět: **Success (no rows returned)**

---

## 📋 KROK 2: Refresh aplikaci

1. Jdi do aplikace
2. Zmáčkni **F5**

---

## 📋 KROK 3: Vyčisti localStorage

1. Zmáčkni **F12** (otevře Developer Tools)
2. Přejdi na **Console**
3. Zkopíruj a spusť:

```javascript
localStorage.clear();
location.reload();
```

---

## ✅ HOTOVO!

- ✅ VPC data smazána (Zákaznický profil prázdný)
- ✅ Achievements z Modulu 2 a 3 smazány
- ✅ Modul 1 zůstane hotový

**Teď dokončíš lekci 13** (BusinessModelGallery) a měl by se zobrazit **achievement "Modul 2 dokončen"** s konfety! 🎉

---

## 🔍 OVĚŘENÍ (nepovinné)

Pokud chceš zkontrolovat, že to funguje, spusť v SQL Editoru:

```sql
SELECT 
  (SELECT COUNT(*) FROM public.value_proposition_canvas WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d') as vpc_data,
  (SELECT COUNT(*) FROM public.user_achievements WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d') as achievements;
```

**Mělo by vrátit:**
- `vpc_data = 0` ✅
- `achievements = 4 nebo 5` ✅ (jen Modul 1)

---

## 📝 KTERÉ ACHIEVEMENTS ZŮSTANOU?

Spusť v SQL Editoru:

```sql
SELECT achievement_type, title, earned_at 
FROM public.user_achievements 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'
ORDER BY earned_at;
```

**Měly by zůstat JEN achievementy z Modulu 1:**
- ✅ `first-segment` - První zákazník
- ✅ `first-value` - Hodnota na stole
- ✅ `all-sections-filled` - Kompletní model
- ✅ `module-1-complete` - Modul 1 dokončen
- ✅ `profitable-business` - Ziskový byznys (pokud máš ziskový model)

---

## 🆘 POKUD TO STÁLE NEFUNGUJE

1. Udělej screenshot **Table Editor** → `value_proposition_canvas` (všechny sloupce)
2. Udělej screenshot výsledku SQL:
   ```sql
   SELECT * FROM public.value_proposition_canvas WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
   ```
3. Pošli mi screenshoty a opravíme to! 💪

---

**Vytvořeno:** 7. listopadu 2025  
**Tvoje UUID:** `2ac0d4c6-8556-4977-a74c-48b38c4e6d5d`
