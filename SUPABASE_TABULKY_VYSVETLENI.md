# Supabase Tabulky - Které Se Používají

## ✅ AKTIVNÍ TABULKY (POUŽÍVAJÍ SE):

### 1. **user_canvas_data** ✅
**Co obsahuje:** Canvas data (všech 9 sekcí Business Model Canvas)  
**Kdy se zapisuje:** Při každé změně v Canvas (add/edit/delete štítků)  
**Struktura:**
- `user_id` (text) - ID uživatele
- `section_key` (text) - název sekce (segments, value, channels, revenue, costs, atd.)
- `content` (jsonb) - pole štítků s textem, barvou, value
- `updated_at` (timestamp) - kdy naposledy upraveno

**Jak zkontrolovat:**
```sql
SELECT * FROM user_canvas_data 
WHERE user_id = 'TVUJ_USER_ID' 
ORDER BY updated_at DESC;
```

---

### 2. **user_progress** ✅
**Co obsahuje:** Progress dokončených lekcí  
**Kdy se zapisuje:** Když dokončíš lekci (klikneš "Dokončit lekci" nebo auto-complete)  
**Struktura:**
- `user_id` (text) - ID uživatele
- `lesson_id` (integer) - ID lekce (1-X)
- `completed_at` (timestamp) - kdy dokončeno

**Problém:** Možná se neaktualizuje čas updated_at?  
**Jak zkontrolovat:**
```sql
SELECT * FROM user_progress 
WHERE user_id = 'TVUJ_USER_ID' 
ORDER BY completed_at DESC;
```

**Fix pokud se nezapisuje:**
```sql
-- Zkontroluj RLS policies:
SELECT * FROM pg_policies WHERE tablename = 'user_progress';
```

---

### 3. **achievements** ✅
**Co obsahuje:** Odemčené achievementy  
**Kdy se zapisuje:** Když odemkneš achievement (např. dokončíš modul, vyplníš všechny segmenty)  
**Struktura:**
- `user_id` (text) - ID uživatele
- `achievement_id` (text) - ID achievementu
- `unlocked_at` (timestamp) - kdy odemčeno

**Jak zkontrolovat:**
```sql
SELECT * FROM achievements 
WHERE user_id = 'TVUJ_USER_ID' 
ORDER BY unlocked_at DESC;
```

---

### 4. **vpc_data** (Value Proposition Canvas) ✅
**Co obsahuje:** Data z Value Proposition Canvas (Modul 3)  
**Kdy se zapisuje:** Když vyplňuješ VPC (Jobs, Pains, Gains, Products, Pain Relievers, Gain Creators)  
**Struktura:**
- `user_id` (text) - ID uživatele
- `segment_color` (text) - barva segmentu
- `data_type` (text) - typ dat (jobs, pains, gains, products, pain_relievers, gain_creators)
- `content` (jsonb) - pole s daty
- `updated_at` (timestamp) - kdy naposledy upraveno

**Jak zkontrolovat:**
```sql
SELECT * FROM vpc_data 
WHERE user_id = 'TVUJ_USER_ID' 
ORDER BY updated_at DESC;
```

---

### 5. **fit_scores** (FIT Validator scores) ✅
**Co obsahuje:** FIT scores pro jednotlivé segmenty  
**Kdy se zapisuje:** Když vyplňuješ FIT Validator v Modulu 3  
**Struktura:**
- `user_id` (text) - ID uživatele
- `segment_color` (text) - barva segmentu
- `score` (integer) - FIT score (0-100)
- `updated_at` (timestamp) - kdy naposledy upraveno

**Jak zkontrolovat:**
```sql
SELECT * FROM fit_scores 
WHERE user_id = 'TVUJ_USER_ID' 
ORDER BY updated_at DESC;
```

---

## ❌ NEAKTIVNÍ TABULKY (NEPOUŽÍVAJÍ SE):

### 1. **course_progress** ❌
**Status:** Stará/nepoužívaná  
**Poznámka:** Nahrazeno `user_progress` tabulkou  
**Co dělat:** Můžeš smazat nebo ignorovat

---

### 2. **course_users** ❌
**Status:** Stará/nepoužívaná  
**Poznámka:** Staří testovací uživatelé  
**Co dělat:** Můžeš smazat nebo ignorovat

---

### 3. **course_lessons** ❌  
**Status:** Statická data (ne user data)  
**Poznámka:** Obsahuje jen seznam lekcí (hardcoded v CourseDemoV3.tsx)  
**Co dělat:** Není potřeba kontrolovat

---

### 4. **course_modules** ❌  
**Status:** Statická data (ne user data)  
**Poznámka:** Obsahuje jen seznam modulů (hardcoded v CourseDemoV3.tsx)  
**Co dělat:** Není potřeba kontrolovat

---

## 🔍 JAK ZKONTROLOVAT USER_PROGRESS PROBLÉM:

### Krok 1: Zkontroluj svůj user_id
```javascript
// V browser console:
localStorage.getItem('sb-access-token')
// Zkopíruj token, dekóduj ho na jwt.io
// Najdi "sub" field = to je tvůj user_id
```

### Krok 2: Zkontroluj záznamy v Supabase
1. Otevři Supabase Dashboard
2. Table Editor → `user_progress`
3. Filtruj podle `user_id = TVUJ_USER_ID`
4. Měl bys vidět řádky pro každou dokončenou lekci

### Krok 3: Pokud nevidíš nové záznamy:
```javascript
// V browser console (když jsi v kurzu):
// Zkus dokončit nějakou lekci a sleduj network tab:
// F12 → Network → filtr: "supabase"
// Měl bys vidět POST request na /rest/v1/user_progress
```

### Krok 4: Zkontroluj RLS Policies:
```sql
-- V Supabase SQL Editor:
SELECT * FROM pg_policies WHERE tablename = 'user_progress';

-- Měly by být policies:
-- - Users can insert their own progress
-- - Users can read their own progress  
-- - Users can update their own progress
```

### Krok 5: Debug v kódu:
Otevři `lib/courseProgress.ts` a přidej console.log:
```typescript
export async function saveLessonProgress(userId: string, lessonId: number) {
  console.log('💾 Saving lesson progress:', userId, lessonId);
  // ...rest of code
}
```

Pak sleduj console když dokončíš lekci.

---

## 📊 OČEKÁVANÉ ZÁZNAMY:

Když správně funguje, měl bys vidět:

### user_canvas_data:
- 9 řádků (jeden pro každou sekci Canvas)
- Aktualizuje se real-time když upravuješ štítky

### user_progress:
- X řádků (jeden pro každou dokončenou lekci)
- Přibude řádek když klikneš "Dokončit lekci"

### achievements:
- Y řádků (jeden pro každý odemčený achievement)
- Přibude když splníš podmínky achievementu

### vpc_data:
- Až když vyplníš VPC v Modulu 3
- Několik řádků (podle toho kolik segmentů máš)

### fit_scores:
- Až když vyplníš FIT Validator v Modulu 3
- Jeden řádek pro každý ohodnocený segment

---

## 🚨 POKUD USER_PROGRESS NEFUNGUJE:

### A) Zkontroluj že saveLessonProgress() se volá:
```typescript
// V CourseDemoV3.tsx by mělo být:
await saveLessonProgress(userData.id, currentLesson.id);
```

### B) Zkontroluj že máš správnou strukturu tabulky:
```sql
-- V Supabase SQL Editor:
\d user_progress

-- Mělo by být:
-- user_id (text, not null)
-- lesson_id (integer, not null)
-- completed_at (timestamp with time zone, default now())
-- PRIMARY KEY (user_id, lesson_id)
```

### C) Zkontroluj RLS:
```sql
-- Disable RLS dočasně (JEN PRO TEST!):
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;

-- Zkus dokončit lekci → pokud funguje = RLS policy problém

-- Re-enable:
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
```

---

## ✅ QUICK CHECKLIST:

- [ ] user_canvas_data - vidím záznamy? (✅)
- [ ] achievements - vidím odemčené achievementy? (✅)
- [ ] user_progress - vidím dokončené lekce? (❓ ZKONTROLUJ)
- [ ] vpc_data - (ještě nevyplnil)
- [ ] fit_scores - (ještě nevyplnil)

Pokud user_progress nefunguje, pošli mi screenshot Network tabu (F12) když dokončuješ lekci!
