# ⚡ QUICK FIX - VPC zobrazuje starý segment "test"

## 🚨 PROBLÉM

V VPC se zobrazuje **"Proč test přichází?"** místo aktuálního segmentu z BMC.

**Důvod:** localStorage má uložený starý segment "test".

---

## ✅ ŘEŠENÍ - 1 PŘÍKAZ (5 sekund)

### **Otevři Console (F12) a spusť:**

```javascript
localStorage.removeItem('vpc_selected_segment'); location.reload();
```

**To je celé!** ✅

---

## 🔍 CO SE STANE?

1. ❌ Smaže se starý segment "test" z localStorage
2. ✅ VPC načte aktuální segmenty z BMC
3. ✅ Automaticky vybere **první aktuální segment** z BMC
4. 🎉 Uvidíš správný název segmentu místo "test"

---

## 📋 OVĚŘENÍ

Po reloadu by se mělo zobrazit:

**Místo:**
```
Proč test přichází? (0/10)
```

**Uvidíš:**
```
Proč [Tvůj aktuální segment] přichází? (0/10)
```

---

## 🆘 POKUD TO NEFUNGUJE

1. Zkontroluj, že máš segmenty v BMC (Modul 1)
2. Otevři Console a zkontroluj:

```javascript
// Zobraz aktuální segment v localStorage
console.log('Saved segment:', localStorage.getItem('vpc_selected_segment'));

// Zobraz všechny VPC keys
Object.keys(localStorage).filter(k => k.includes('vpc')).forEach(k => {
  console.log(k, localStorage.getItem(k));
});
```

3. Pokud stále vidíš "test", smaž celou VPC data z Supabase:

```sql
DELETE FROM public.value_proposition_canvas 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'
AND segment_name = 'test';
```

---

**Vytvořeno:** 7. listopadu 2025  
**Čas na fix:** 5 sekund ⚡
