# 🔄 RYCHLÝ RESET MODULU 3 (VPC Data)

Pokud vidíš **stará data v Zákaznickém profilu** (Modul 3), je to proto, že jsi:
- ✅ Smazal data z Supabase pomocí `RESET_MY_DATA.sql`
- ❌ ALE **zapomněl** jsi smazat VPC data!

VPC data (Value Proposition Canvas) se ukládají v **samostatné tabulce** `value_proposition_canvas`.

---

## 🚀 ŘEŠENÍ (30 sekund)

### Krok 1: Smazat VPC data v Supabase

1. Otevři **Supabase Dashboard** → **SQL Editor**
2. Zkopíruj a spusť:

```sql
-- 🗑️ SMAZAT VPC DATA (pro přihlášeného uživatele)
DELETE FROM public.value_proposition_canvas 
WHERE user_id = auth.uid()::text;

-- ✅ OVĚŘENÍ (mělo by vrátit 0)
SELECT COUNT(*) FROM public.value_proposition_canvas 
WHERE user_id = auth.uid()::text;
```

### Krok 2: Refresh aplikaci

Stiskni **F5** - Zákaznický profil bude prázdný! 🎯

---

## 📝 ALTERNATIVA: Smazat VPC data pro konkrétní účet

Pokud nejsi přihlášený v Supabase, použij:

```sql
-- 🗑️ SMAZAT VPC DATA PRO p3pulin@seznam.cz
DELETE FROM public.value_proposition_canvas 
WHERE user_id = (
  SELECT id::text FROM auth.users WHERE email = 'p3pulin@seznam.cz'
);
```

---

## 💡 PRO TIP

Příště použij **RESET_MY_DATA.sql** - už obsahuje i smazání VPC dat! 😊

Nebo použij **RESET_VPC_DATA.sql** pokud chceš smazat POUZE Modul 3 (VPC).

---

## ✅ HOTOVO!

Modul 3 je teď čistý a můžeš začít znovu s novým segmentem! 🚀
