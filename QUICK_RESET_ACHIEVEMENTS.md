# ⚡ SUPER RYCHLÝ RESET ACHIEVEMENTŮ

## 🎯 CO POTŘEBUJEŠ

Chceš **otestovat achievements pro Modul 2 a 3 znovu** (zachovat Modul 1 hotový).

---

## 🚀 2 KROKY (30 sekund)

### KROK 1: Supabase SQL Editor

Otevři **Supabase Dashboard → SQL Editor** a **zkopíruj + spusť**:

```sql
DELETE FROM public.user_achievements WHERE user_id = auth.uid() AND achievement_type IN ('validator-used','profit-calculated','module-2-complete','customer-profile-complete','value-map-complete','fit-70-percent','product-fit-master','fit-90-percent','module-3-complete','master-of-tools','ultimate-master');
```

### KROK 2: Console v prohlížeči

Zmáčkni **F12**, otevři **Console** a **zkopíruj + spusť**:

```javascript
localStorage.clear(); location.reload();
```

---

## ✅ HOTOVO!

Modul 1 je hotový, Modul 2 a 3 můžeš testovat znovu! 🎉

Teď dokončíš lekci 13 (poslední lekci Modulu 2) a měl by se zobrazit achievement **"Modul 2 dokončen"**! 🚀

---

## 🔍 OVĚŘENÍ (nepovinné)

Zkontroluj, které achievementy máš:

```sql
SELECT achievement_type, title FROM public.user_achievements WHERE user_id = auth.uid();
```

Měly by ti zůstat JEN achievementy z Modulu 1:
- ✅ `first-segment` - První zákazník
- ✅ `first-value` - Hodnota na stole
- ✅ `all-sections-filled` - Kompletní model
- ✅ `module-1-complete` - Modul 1 dokončen
- ✅ `profitable-business` - Ziskový byznys (pokud máš ziskový model)
