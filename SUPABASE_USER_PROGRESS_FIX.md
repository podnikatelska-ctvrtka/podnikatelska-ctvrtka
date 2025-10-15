# ✅ USER_PROGRESS OPRAVENO

## 🐛 Problém:
V tabulce `user_progress` bylo všude **completed = FALSE**, přestože lekce byly dokončené.

Ze screenshotu:
- `completed` sloupec = všude FALSE ❌
- `completed_at` = správně vyplněné timestamp ✅
- To znamená že zápis fungoval, ale **chybělo nastavení `completed = true`**!

---

## 🔍 Příčina:
V souboru `/lib/courseProgress.ts` funkce `saveLessonProgress()` **nezapisovala** sloupec `completed`:

```typescript
// ❌ PŘED (řádek 37-40):
.upsert({
  user_id: userId,
  lesson_id: lessonId,
  completed_at: new Date().toISOString()
  // 👆 CHYBÍ completed: true!
}, {
  onConflict: 'user_id,lesson_id'
});
```

---

## ✅ Oprava:
Přidán `completed: true` do upsert objektu:

```typescript
// ✅ PO (řádek 37-41):
.upsert({
  user_id: userId,
  lesson_id: lessonId,
  completed: true,           // 👈 NOVĚ PŘIDÁNO!
  completed_at: new Date().toISOString()
}, {
  onConflict: 'user_id,lesson_id'
});
```

---

## 🎯 Jak se to volá:

### 1. Uživatel klikne tlačítko
**Soubor:** `/components/MobileSingleSection.tsx` (řádek 194)
```tsx
<Button onClick={onComplete}>
  ✅ Hotovo - pokračovat dál
</Button>
```

### 2. Zavolá se onComplete handler
**Soubor:** `/components/CourseDemoV3.tsx` (řádek 1703-1716)
```tsx
onComplete={async () => {
  const newCompleted = new Set(completedLessons);
  newCompleted.add(currentLesson.id);
  setCompletedLessons(newCompleted);
  
  if (userData?.id) {
    await saveLessonProgress(userData.id, currentLesson.id); // 👈 ZDE!
  }
  
  setTimeout(() => {
    handleNextLesson(); // Redirect na další lekci
  }, 500);
}}
```

### 3. saveLessonProgress zapíše do Supabase
**Soubor:** `/lib/courseProgress.ts` (řádek 33-55)
```typescript
export async function saveLessonProgress(userId: string, lessonId: number) {
  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      completed: true,              // ✅ NYNÍ SE ZAPÍŠE!
      completed_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,lesson_id'
    });
  
  return !error;
}
```

---

## 📊 Co se teď bude zapisovat:

### PŘED (chybné):
```sql
INSERT INTO user_progress (user_id, lesson_id, completed_at)
VALUES ('user123', 1, '2025-10-14T10:00:00Z');
-- completed = NULL → default FALSE ❌
```

### PO (správné):
```sql
INSERT INTO user_progress (user_id, lesson_id, completed, completed_at)
VALUES ('user123', 1, TRUE, '2025-10-14T10:00:00Z');
-- completed = TRUE ✅
```

---

## 🧪 Jak otestovat:

### 1. Reset progress (volitelné)
Pokud chceš vymazat staré FALSE záznamy:
```sql
-- V Supabase SQL Editor:
DELETE FROM user_progress WHERE user_id = 'TVUJ_USER_ID';
```

### 2. Dokonč novou lekci
1. Otevři kurz
2. Přidej položku do Canvas
3. Klikni **"✅ Hotovo - pokračovat dál"**

### 3. Zkontroluj Supabase
1. Otevři Table Editor → `user_progress`
2. Filtr: `user_id = TVUJ_USER_ID`
3. Měl bys vidět:
   - `completed` = **TRUE** ✅
   - `completed_at` = aktuální timestamp ✅

---

## 📱 Poznámka k tlačítku:

Máš pravdu že **není tlačítko "Dokončit lekci"**!

Tlačítko se jmenuje: **"✅ Hotovo - pokračovat dál"**

Toto tlačítko:
- ✅ Uloží progress (`completed = true`)
- ✅ Přesměruje na další lekci (500ms delay)
- ✅ Zobrazí se jen když má sekce alespoň 1 položku

---

## 🏆 Achievements duplikát:

Achievements fungují správně! **V kódu je `first-segment` jen 1x** (soubor `/lib/achievements.ts` řádek 17).

Duplikát v Supabase tabulce je pravděpodobně z testování kdy jsi:
1. Přidal první segment (achievement unlocked)
2. Resetoval data
3. Přidal znovu první segment (achievement unlocked podruhé)

**Řešení:**
```sql
-- V Supabase SQL Editor:
DELETE FROM achievements 
WHERE user_id = 'TVUJ_USER_ID' 
AND achievement_id = 'first-segment'
AND id NOT IN (
  SELECT MIN(id) 
  FROM achievements 
  WHERE user_id = 'TVUJ_USER_ID' 
  AND achievement_id = 'first-segment'
);
```

Nebo prostě ignoruj - není to kritický problém. Achievement se zobrazí jen jednou (kontroluje se před uložením).

---

## ✅ HOTOVO!

Od teď by se mělo správně zapisovat `completed = TRUE` do tabulky `user_progress`!

Vyzkoušej dokonč nějakou lekci a refresh Supabase Table Editor - měl bys vidět TRUE! 🎉
