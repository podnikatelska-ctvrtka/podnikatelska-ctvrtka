# 🏆 RESET ACHIEVEMENTŮ - RYCHLÝ NÁVOD

Když chceš **otestovat achievementy znovu** (např. jestli se zobrazí po dokončení Modulu 2), musíš:
1. ✅ **Smazat achievementy v Supabase**
2. ✅ **Vyčistit localStorage v prohlížeči**

---

## 🚀 SCÉNÁŘ 1: Reset Modulu 2 a 3 (zachovat Modul 1)

**Použij když:** Máš hotový Modul 1 a chceš testovat achievementy pro Modul 2 a 3 znovu.

### Krok 1: Smazat achievementy v Supabase

Otevři **Supabase Dashboard → SQL Editor** a spusť:

```sql
-- 🗑️ SMAZAT ACHIEVEMENTY Z MODULU 2 A 3 (zachovat Modul 1)
DELETE FROM public.user_achievements 
WHERE user_id = auth.uid()
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
```

### Krok 2: Vyčistit localStorage

Otevři **Console v prohlížeči (F12)** a spusť:

```javascript
// 🗑️ VYČISTIT ACHIEVEMENTS CACHE
localStorage.clear();
location.reload();
```

✅ **HOTOVO!** Modul 1 zůstane hotový, můžeš testovat Modul 2 a 3 znovu! 🎯

---

## 🔄 SCÉNÁŘ 2: Reset VŠECH achievementů

**Použij když:** Chceš začít úplně od začátku (všechny achievementy smazané).

### Krok 1: Smazat achievementy v Supabase

```sql
-- 🗑️ SMAZAT VŠECHNY ACHIEVEMENTY
DELETE FROM public.user_achievements 
WHERE user_id = auth.uid();
```

### Krok 2: Vyčistit localStorage

```javascript
localStorage.clear();
location.reload();
```

✅ **HOTOVO!** Všechny achievementy jsou smazané! 🚀

---

## 🛠️ SCÉNÁŘ 3: Kompletní reset kurzu (včetně progressu)

**Použij když:** Chceš začít kurz úplně od začátku (smazat i dokončené lekce a Canvas data).

Použij SQL script: **`RESET_MY_DATA.sql`**

```sql
DELETE FROM public.user_achievements WHERE user_id = auth.uid();
DELETE FROM public.user_progress WHERE user_id = auth.uid();
DELETE FROM public.user_canvas_data WHERE user_id = auth.uid();
DELETE FROM public.value_proposition_canvas WHERE user_id = auth.uid();
```

Pak:
```javascript
localStorage.clear();
location.reload();
```

✅ **HOTOVO!** Kurz je jako nový! 🎉

---

## 🔍 OVĚŘENÍ

Po resetu zkontroluj, které achievementy ti zůstaly:

```sql
SELECT 
  achievement_type,
  title,
  earned_at
FROM public.user_achievements 
WHERE user_id = auth.uid()
ORDER BY earned_at ASC;
```

---

## 💡 PRO TIP

Pokud testujemeš často, použij:
1. **Anonymní režim prohlížeče** (Ctrl+Shift+N) - localStorage je automaticky prázdná
2. Nebo si vytvoř **bookmark** s tímto JavaScriptem:

```javascript
javascript:(function(){localStorage.clear();location.reload();})();
```

Pak stačí kliknout na bookmark a localStorage se vyčistí! 😊

---

## ✅ RYCHLÁ REFERENCE

| Co chci                          | SQL Script                           | localStorage |
|----------------------------------|--------------------------------------|--------------|
| Reset Modulu 2 a 3               | `RESET_ACHIEVEMENTS_KEEP_MODULE1.sql` | ✅ Vyčistit   |
| Reset všech achievementů         | `DELETE FROM user_achievements`      | ✅ Vyčistit   |
| Reset celého kurzu               | `RESET_MY_DATA.sql`                  | ✅ Vyčistit   |
| Reset jen VPC dat (Modul 3)      | `RESET_VPC_DATA.sql`                 | ❌ Nechat     |

---

## 🎯 NEJČASTĚJŠÍ POUŽITÍ

**"Chci otestovat, jestli se zobrazí achievement po dokončení Modulu 2"**

```sql
-- V Supabase SQL Editor:
DELETE FROM public.user_achievements 
WHERE user_id = auth.uid()
AND achievement_type = 'module-2-complete';
```

```javascript
// V Console (F12):
localStorage.clear();
location.reload();
```

Pak dokončíš Modul 2 znovu a achievement by se měl zobrazit! 🎉
