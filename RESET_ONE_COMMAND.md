# ⚡ ONE-COMMAND RESET - NEJJEDNODUŠŠÍ ŘEŠENÍ

## 🎯 RYCHLÝ RESET - 3 PŘÍKAZY

### **1️⃣ Otevři Console (F12) a spusť:**

```javascript
localStorage.removeItem('achievements_2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'); console.log('✅ localStorage vyčištěn!');
```

---

### **2️⃣ Otevři Supabase SQL Editor a spusť:**

```sql
DELETE FROM public.user_achievements WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d' AND achievement_type IN ('validator-used','profit-calculated','module-2-complete','customer-profile-complete','value-map-complete','fit-70-percent','product-fit-master','fit-90-percent','module-3-complete','master-of-tools','ultimate-master');
```

---

### **3️⃣ Zpět do Console a spusť:**

```javascript
location.reload();
```

---

## ✅ HOTOVO!

Achievements z Modulu 2 a 3 jsou smazány! 🎉

---

## 🔍 OVĚŘENÍ

Zkontroluj localStorage:

```javascript
console.log(localStorage.getItem('achievements_2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'));
```

**Mělo by vrátit:** `null`

---

Zkontroluj Supabase:

```sql
SELECT COUNT(*) FROM public.user_achievements WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
```

**Mělo by vrátit:** `4` nebo `5` (jen Modul 1)

---

**Vytvořeno:** 7. listopadu 2025  
**Tvoje UUID:** `2ac0d4c6-8556-4977-a74c-48b38c4e6d5d`
