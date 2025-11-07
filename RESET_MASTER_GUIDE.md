# ⚡ MASTER RESET GUIDE - Všechny SQL One-Linery

Rychlé SQL příkazy pro reset různých částí kurzu.

---

## 🎯 1. RESET ACHIEVEMENTŮ (zachovat Modul 1)

**Použij když:** Chceš otestovat achievementy z Modulu 2 a 3 znovu.

```sql
DELETE FROM public.user_achievements WHERE user_id = auth.uid() AND achievement_type IN ('validator-used','profit-calculated','module-2-complete','customer-profile-complete','value-map-complete','fit-70-percent','product-fit-master','fit-90-percent','module-3-complete','master-of-tools','ultimate-master');
```

**Pak:**
```javascript
localStorage.clear(); location.reload();
```

---

## 🔄 2. RESET VPC DAT (Modul 3 - Zákaznický profil)

**Použij když:** Máš stará data v Zákaznickém profilu a chceš začít znovu.

```sql
DELETE FROM public.value_proposition_canvas WHERE user_id = auth.uid()::text;
```

**Pak:**
```javascript
location.reload();
```

---

## 🗑️ 3. RESET VŠECH ACHIEVEMENTŮ

**Použij když:** Chceš smazat všechny achievementy (i Modul 1).

```sql
DELETE FROM public.user_achievements WHERE user_id = auth.uid();
```

**Pak:**
```javascript
localStorage.clear(); location.reload();
```

---

## 💥 4. KOMPLETNÍ RESET KURZU

**Použij když:** Chceš začít kurz úplně od začátku (smazat vše).

```sql
DELETE FROM public.user_achievements WHERE user_id = auth.uid();
DELETE FROM public.user_progress WHERE user_id = auth.uid();
DELETE FROM public.user_canvas_data WHERE user_id = auth.uid();
DELETE FROM public.value_proposition_canvas WHERE user_id = auth.uid()::text;
```

**Pak:**
```javascript
localStorage.clear(); location.reload();
```

---

## 🔍 OVĚŘENÍ

**Zkontroluj, kolik záznamů máš:**

```sql
SELECT 
  (SELECT COUNT(*) FROM public.user_achievements WHERE user_id = auth.uid()) as achievements,
  (SELECT COUNT(*) FROM public.user_progress WHERE user_id = auth.uid()) as progress,
  (SELECT COUNT(*) FROM public.user_canvas_data WHERE user_id = auth.uid()) as canvas,
  (SELECT COUNT(*) FROM public.value_proposition_canvas WHERE user_id = auth.uid()::text) as vpc;
```

**Zobraz všechny achievementy:**

```sql
SELECT achievement_type, title, earned_at 
FROM public.user_achievements 
WHERE user_id = auth.uid() 
ORDER BY earned_at;
```

---

## 💡 PRO TIP

Když testujemeš často:
1. **Ulož si tyto SQL příkazy do Supabase SQL Editor** jako Private snippets
2. Nebo použij **anonymní režim prohlížeče** (Ctrl+Shift+N) - nemusíš čistit localStorage!

---

## 📝 POZNÁMKY

- **`::text`** - Přetypování UUID na TEXT (kvůli tabulce `value_proposition_canvas`)
- **`auth.uid()`** - Vrací UUID přihlášeného uživatele
- **localStorage.clear()** - Vymaže všechny cache v prohlížeči

---

## ✅ NEJČASTĚJŠÍ POUŽITÍ

**"Chci otestovat achievement po dokončení Modulu 2"**

→ Použij #1 (Reset achievementů pro Modul 2 a 3)

**"Mám stará data v Zákaznickém profilu"**

→ Použij #2 (Reset VPC dat)

**"Chci začít kurz úplně od začátku"**

→ Použij #4 (Kompletní reset)

---

## 🎯 RYCHLÁ REFERENCE

| Chci smazat                  | SQL File                               | Číslo |
|------------------------------|----------------------------------------|-------|
| Achievements Modul 2+3       | `RESET_ACHIEVEMENTS_ONELINER.sql`      | #1    |
| VPC data (Modul 3)           | `RESET_VPC_ONELINER.sql`               | #2    |
| Všechny achievements         | (inline SQL)                           | #3    |
| Všechno (kompletní reset)    | `RESET_COMPLETE_ONELINER.sql`          | #4    |

---

**Vytvořeno:** 7. listopadu 2025  
**Verze:** 2.0 (opraveno `::text` casting pro VPC tabulku)
