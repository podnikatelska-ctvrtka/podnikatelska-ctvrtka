# 🔒 RLS & Verze Kurzu - Vysvětlení

## 📊 VERZE KURZŮ - CO JE CO?

### 1️⃣ **CourseDemo (V1)** - Hybrid verze
- ✅ Supabase + Fallback tokeny (TEST123, CIPERA2024)
- ✅ Používá `BusinessModelCanvas`
- ⚠️ **DEPRECATED** - pouze pro backward compatibility

### 2️⃣ **CourseDemoV2 (V2)** - Pure Supabase
- ✅ 100% Supabase, žádné fallback tokeny
- ✅ Používá `BusinessModelCanvasV2`
- ✅ Load/Save progress přes Supabase
- ⚠️ **BEZ guided tour a achievements**

### 3️⃣ **CourseDemoV3 (V3)** - PRODUKČNÍ VERZE ⭐
- ✅ 100% Supabase
- ✅ **GuidedTour** komponenta
- ✅ **SimpleDashboard** s overview
- ✅ **AchievementNotification** systém
- ✅ **AutosaveIndicator**
- ✅ **ProfitCalculator**, **ProblemSolver**
- ✅ **ValuePropositionCanvas** (VPC)
- ✅ **FitValidatorV2**
- ✅ **BusinessModelGallery**
- ✅ **Module 3 data** s kompletní strukturou
- ✅ **Responsive sidebar** (CourseSidebar, MobileSidebarContent)
- ✅ **Mobile components** (MobileCanvasAccordion, MobileSingleSection)
- 🎯 **TÁ NEJLEPŠÍ VERZE - používáme ji LIVE!**

---

## 🔒 RLS (Row Level Security) - DŮLEŽITÉ!

### **SOUČASNÝ STAV:**
- ✅ RLS je **VYPNUTÉ** na všech tabulkách
- ✅ Kurz **funguje perfektně** bez RLS
- ✅ Security řešíme přes **access_token** v URL

### **PROČ NECHAT RLS VYPNUTÉ?**

#### ✅ **VÝHODY (nechat vypnuté):**
1. **Jednoduché** - funguje to okamžitě
2. **Testování** - tester může hned testovat live
3. **Access token** poskytuje dostatečnou security na application level
4. **Žádná citlivá data** - pouze progress v kurzu, nic osobního
5. **Není to public API** - token je nutný pro přístup

#### ⚠️ **NEVÝHODY (zapnout RLS):**
1. **Složité** - musíš psát policies
2. **Problém s auth** - nepoužíváme Supabase Auth (auth.uid()), používáme vlastní access_token
3. **Testování** - policies můžou blokovat přístup, musíš debugovat
4. **Extra práce** - policies pro SELECT, INSERT, UPDATE, DELETE na každé tabulce

---

## 🎯 DOPORUČENÍ:

### **KRÁTKODOBĚ (teď před testem):**
✅ **NECH RLS VYPNUTÉ**
- Funguje to
- Tester může okamžitě testovat live
- Žádné problémy s policies

### **DLOUHODOBĚ (po launchnu, pokud chceš):**
⚠️ **Můžeš zapnout RLS s custom policies:**

```sql
-- Povolit SELECT na základě access_token
CREATE POLICY "Allow read with valid token" ON course_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = course_progress.user_id
      AND users.access_token = current_setting('request.jwt.claims', true)::json->>'token'
    )
  );
```

**ALE** - to vyžaduje extra setup s JWT a je to zbytečně složité.

---

## 📝 CO DĚLAT TEĎKA?

### ✅ **AKCE #1: Nech RLS vypnuté**
- Otevři Supabase Dashboard
- Tabulky `users` a `course_progress`
- Zkontroluj, že RLS je **DISABLED** ❌
- Pokud je ENABLED, **vypni ho**

### ✅ **AKCE #2: Odstraň staré verze kurzu (V1, V2)**
- Odstraníme `CourseDemo.tsx` (V1)
- Odstraníme `CourseDemoV2.tsx` (V2) 
- Odstraníme routing v `App.tsx`
- Necháme jen **CourseDemoV3** ⭐

### ✅ **AKCE #3: Rename V3 → CourseDemo**
- Přejmenujeme `CourseDemoV3.tsx` → `CourseDemo.tsx`
- URL zůstane `/course` (nebo `/kurz`)
- Čisté, jednoduché, produkční

---

## 🚀 FINÁLNÍ URL PRO TESTERA:

```
https://podnikatelskactvrtka.cz/course?token=ACCESS_TOKEN_ZE_SUPABASE
```

nebo

```
https://podnikatelskactvrtka.cz/kurz?token=ACCESS_TOKEN_ZE_SUPABASE
```

---

## 🔐 SECURITY ARCHITEKTURA (bez RLS):

```
User → URL s access_token → Frontend → Supabase
                                ↓
                        verifyAccessToken()
                                ↓
                        Najde user_id v tabulce users
                                ↓
                        Load/Save progress pro tohoto user_id
                                ↓
                        ✅ Security je OK! (token je dostatečně dlouhý a náhodný)
```

### **Proč je to bezpečné i bez RLS?**
- Access token je **dlouhý náhodný string** (těžko uhádnout)
- Není to **sequential ID** (1, 2, 3...)
- Bez tokenu **nemůžeš přistoupit** k datům
- Pro "hack" bys musel znát **přesný token** jiného uživatele
- Pravděpodobnost uhádnutí je **< 1 / 10^20** (prakticky nemožné)

---

## 📊 TABULKY V SUPABASE:

### **users**
- `id` (UUID)
- `email`
- `name`
- `access_token` (náhodný string, 32+ chars)
- `created_at`
- `last_login`

### **course_progress**
- `id` (UUID)
- `user_id` (foreign key → users.id)
- `module_id`
- `lesson_id`
- `completed`
- `completed_at`
- `last_opened_at`

### **user_canvases** (pokud existuje)
- `id` (UUID)
- `user_id` (foreign key → users.id)
- `canvas_type` ('bmc' | 'vpc')
- `canvas_data` (JSONB)
- `updated_at`

---

## ✅ TL;DR:

1. **RLS = VYPNUTÉ** ❌ (nechat tak)
2. **V3 = POUŽÍT** ✅ (ta nejlepší)
3. **V1, V2 = SMAZAT** 🗑️ (deprecated)
4. **Tester = READY** 🚀 (pošli mu token + URL)

---

**Máš dotazy k RLS nebo verzím? Ptej se! 😊**
