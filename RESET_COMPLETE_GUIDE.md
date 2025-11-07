# 🔄 KOMPLETNÍ RESET KURZU (SQL + LocalStorage)

Achievementy se ukládají na **2 místech**:
1. ✅ **Supabase** (databáze) - tabulka `user_achievements`
2. ✅ **LocalStorage** (prohlížeč) - klíč `achievements_{userId}`

Proto musíš vymazat **OBĚ** místa!

---

## 🚀 RYCHLÝ RESET (Doporučeno)

### Krok 1: Smazat data v Supabase

1. Otevři **Supabase Dashboard** → **SQL Editor**
2. Zkopíruj a spusť tento SQL script:

```sql
-- 🗑️ SMAZAT VŠECHNA DATA PRO UUID: 2ac0d4c6-8556-4977-a74c-48b38c4e6d5d

DELETE FROM public.user_achievements 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

DELETE FROM public.user_progress 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

DELETE FROM public.user_canvas_data 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
```

### Krok 2: Vymazat LocalStorage v prohlížeči

1. Otevři **DevTools** (F12 nebo Ctrl+Shift+I)
2. Přejdi na záložku **Console**
3. Zkopíruj a spusť tento JavaScript:

```javascript
// 🗑️ SMAZAT VŠECHNA DATA Z LOCALSTORAGE
localStorage.removeItem('achievements_2ac0d4c6-8556-4977-a74c-48b38c4e6d5d');
localStorage.removeItem('currentModule');
localStorage.removeItem('currentLesson');
console.log('✅ LocalStorage vymazána!');
```

### Krok 3: Refresh stránku

Stiskni **F5** nebo **Ctrl+R** - kurz začne od začátku! 🎯

---

## 🕵️ ALTERNATIVA: Anonymní režim

Pokud nechceš mazat localStorage ručně:

1. Otevři prohlížeč v **anonymním/incognito režimu** (Ctrl+Shift+N v Chrome)
2. Přihlas se do aplikace
3. Všechna data budou čistá (localStorage je prázdná)
4. Spusť SQL script výše pro vymazání DB dat
5. Refresh stránku - kurz začne od začátku! 🚀

---

## 🔍 OVĚŘENÍ (Nepovinné)

### Zkontrolovat že data jsou smazaná v DB:

```sql
SELECT 
  (SELECT COUNT(*) FROM public.user_achievements WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d') as "Achievementy (0)",
  (SELECT COUNT(*) FROM public.user_progress WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d') as "Progress (0)",
  (SELECT COUNT(*) FROM public.user_canvas_data WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d') as "Canvas data (0)";
```

Všechna čísla by měla být **0**.

### Zkontrolovat že localStorage je prázdná:

V konzoli prohlížeče (F12):

```javascript
console.log('Achievements:', localStorage.getItem('achievements_2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'));
// Mělo by vrátit: null
```

---

## 💡 PRO TIP

Pokud testujemeš často, použij **anonymní režim** - nemusíš pokaždé mazat localStorage! 😄

---

## ✅ HOTOVO!

Kurz je teď čistý a můžeš začít od začátku bez vytváření nového účtu a platby! 🎉
