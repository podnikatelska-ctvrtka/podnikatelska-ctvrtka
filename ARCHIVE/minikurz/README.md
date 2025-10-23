# 📚 MINIKURZ - KOMPONENTY BACKUP

**⚠️ KRITICKÉ:** Tato složka obsahuje informace o funkčním 3-denním MINIKURZU!

**Datum zálohy:** 2025-01-21  
**Verze:** v1 - Původní funkční verze  
**Status:** ✅ FUNKČNÍ - Otestováno a nasazeno

---

## 🎯 CO JE MINIKURZ?

**3-denní prelaunch onboarding kurz** pro cold leads kteří se zaregistrovali na landing page.

**URL:**
- `/priprava` nebo `#priprava`
- `/minikurz` nebo `#minikurz`

**Účel:**
- Warming up cold leads
- Build value před upsell na hlavní kurz
- Email opt-in → 3 dni value → upsell na 4.999,- Kč

---

## 📋 KOMPONENTY

### **📚 MiniCourse.tsx**
- **Path:** `/components/MiniCourse.tsx`
- **Popis:** Hlavní komponenta 3-denního minikurzu
- **Features:**
  - 3 lekce (Den 1, 2, 3)
  - Progress tracking
  - Copyable templates
  - Upsell CTA na hlavní kurz
  - Responsive design

**Struktura lekcí:**
```typescript
interface Lesson {
  day: number;
  title: string;
  subtitle: string;
  icon: any;
  problem: string;    // Pain point
  solution: string;   // Quick win
  why: string;        // Why it matters
  action: {
    title: string;
    steps: Step[];
  };
  bonus?: {
    title: string;
    items: string[];
  };
}
```

**3 lekce:**

#### **DEN 1: Získejte zpětnou vazbu za 24h**
- **Subtitle:** 3 zlaté otázky + hotové nástroje
- **Icon:** MessageCircle
- **Problem:** Nemáte zpětnou vazbu od zákazníků
- **Solution:** 3 zlaté otázky + hotové šablony (email/offline)
- **Action:** Copyable templates pro zpětnou vazbu
- **Bonus:** Nástroje na analýzu (Google Forms, Typeform, SurveyMonkey)

#### **DEN 2: Zvyšte tržby bez reklam**
- **Subtitle:** 3 rychlé taktiky které fungují TEĎKA
- **Icon:** TrendingUp
- **Problem:** Marketing stojí peníze, nemáte rozpočet
- **Solution:** 3 taktiky které nezačínají "utrať víc"
- **Action:** Konkrétní kroky (Upsell, Cross-sell, Reactivace)
- **Bonus:** Šablony na reactivation emails

#### **DEN 3: Vaše strategie za 15 minut**
- **Subtitle:** 1-page business plán + akční kroky
- **Icon:** Sparkles
- **Problem:** Nemáte jasný plán, jen nápady v hlavě
- **Solution:** Business Model Canvas (1 stránka!)
- **Action:** Vyplnění mini canvasu + akční plán
- **Bonus:** Upsell CTA na hlavní kurz (4.999,- Kč)

---

### **✅ PreparationChecklist.tsx**
- **Path:** `/components/PreparationChecklist.tsx`
- **Popis:** Checklist před začátkem kurzu
- **Features:**
  - TODO list formát
  - Checkable items
  - Progress indicator
  - CTA na začátek kurzu

**POZNÁMKA:** Tato komponenta se aktuálně NEPOUŽÍVÁ! MiniCourse.tsx je all-in-one.

---

## 🎨 DESIGN & UX

### **LAYOUT:**
- Hero sekce s progress indicator (Day 1/3)
- Problem → Solution → Why
- Action steps s copyable templates
- Bonus sekce
- Upsell CTA (na konci Dne 3)
- Next/Previous lesson navigation

### **TEMPLATES:**
- Copyable text (click to copy)
- Template types:
  - `copy` - Copy to clipboard
  - `inspiration` - Inspirace (nemusí kopírovat)
  - `checklist` - Checklist pro procházení

### **UPSELL FLOW:**
Den 1 → Den 2 → Den 3 → **UPSELL CTA:**
```
"Připravený/á na celý kurz?"
→ Link na /objednavka
→ Sleva 40% (4.999,- Kč místo 8.499,-)
```

---

## 🔗 INTEGRACE

### **EMAIL SEKVENCE:**
**⚠️ ZTRACENA!** Původní email sekvence byla smazána při cleanup.

**Plánovaný flow:**
1. Email #0 (Welcome) → Odkaz na `/priprava` (Den 1)
2. Email #1 (Den 1) → Reminder + value
3. Email #2 (Den 2) → Reminder + value
4. Email #3 (Den 3) → **UPSELL** na hlavní kurz

**Trigger:** Registrace na landing page `/` (email opt-in)

**TODO:** Vytvořit novou email sekvenci (zítra! 2025-01-22)

---

### **LANDING PAGE → MINIKURZ:**
1. User se zaregistruje na `/` (email + jméno)
2. Email #0: Welcome + odkaz na `/priprava`
3. User otevře `/priprava` → Den 1
4. Po 24h: Email #1 → Reminder na Den 2
5. Po 48h: Email #2 → Reminder na Den 3
6. Po 72h: Email #3 → **UPSELL** na `/objednavka`

---

### **MINIKURZ → HLAVNÍ KURZ:**
- Upsell CTA na konci Dne 3
- Link: `/objednavka`
- Nabídka: 4.999,- Kč (sleva 40%)
- Důvod: "Už znáš základy, teď získej celý systém"

---

## 📊 METRICS & TRACKING

### **KEY METRICS:**
- Email opt-in rate (na landing page)
- Minikurz completion rate (kolik dokončilo všechny 3 dny)
- Upsell conversion rate (z minikurzu → hlavní kurz)
- Template copy rate (kolik lidí kopírovalo šablony)

### **TRACKING (TODO):**
- Google Analytics events
- Supabase progress tracking (optional)
- Email engagement (Smartemailing/Make.com)

---

## 🎯 CONTENT OVERVIEW

### **DEN 1: Zpětná vazba**
**Value:** Hotové šablony na zpětnou vazbu  
**Quick win:** Pošlou email zákazníkům dnes  
**Time investment:** 15-30 minut  

**Templates:**
- 3 zlaté otázky (text)
- Email template (copy)
- Offline dotazník (inspiration)
- Google Forms/Typeform setup

---

### **DEN 2: Zvýšení tržeb**
**Value:** 3 taktiky bez reklamního rozpočtu  
**Quick win:** Implementují jednu taktiku tento týden  
**Time investment:** 20-40 minut  

**Taktiky:**
1. **Upsell:** Nabídněte víc těm co už kupují
2. **Cross-sell:** Bundle produkty
3. **Reactivace:** Email na zákazníky co nekoupili 3+ měsíce

**Templates:**
- Upsell script (copy)
- Cross-sell bundle ideas (inspiration)
- Reactivation email (copy)

---

### **DEN 3: Strategie**
**Value:** 1-page business plán (mini canvas)  
**Quick win:** Vyplní mini canvas za 15 minut  
**Time investment:** 15-30 minut  

**Action:**
- Mini Business Model Canvas (simplified)
- Akční kroky (3 kroky na tento měsíc)

**Upsell:**
- CTA na hlavní kurz
- Benefit: Kompletní Business Model Canvas + Value Proposition Canvas + Tools
- Price: 4.999,- Kč (sleva 40%)

---

## 🔧 TECHNICAL SPECS

### **ROUTING:**
```typescript
// App.tsx
if (hash.startsWith('#priprava') || hash.startsWith('#minikurz') || 
    path === '/priprava' || path === '/minikurz') {
  return <MiniCourse />;
}
```

### **DEPENDENCIES:**
- React (useState, useEffect)
- lucide-react (Icons)
- sonner (Toast notifications)

### **NO AUTH REQUIRED:**
- Minikurz je PUBLIC (no token, no login)
- Každý kdo má link může přistupovat

---

## 📱 RESPONSIVE DESIGN

### **MOBILE:**
- Stack layout (vertical)
- Touch-friendly buttons
- Copyable templates (mobile optimized)
- Scroll-friendly sections

### **DESKTOP:**
- Wider content area
- Sidebar navigation (optional)
- Larger templates

---

## 🚨 KRITICKÁ PRAVIDLA

### **❌ CO NEDĚLAT:**
1. **NEMAZAT** MiniCourse.tsx bez zálohy!
2. **NEZMĚNIT** content lekcí bez testování email sekvence!
3. **NEPŘIDÁVAT** auth požadavky (musí být PUBLIC!)
4. **NEODSTRAŇOVAT** upsell CTA (to je celý point!)

### **✅ CO DĚLAT:**
1. **A/B TESTOVAT** copy a templates
2. **TRACKOVAT** completion rate
3. **OPTIMALIZOVAT** upsell conversion
4. **SYNCHRONIZOVAT** s email sekvencí

---

## 📧 EMAIL SEKVENCE (ZTRACENA - TODO)

**⚠️ PŮVODNÍ SEKVENCE BYLA SMAZÁNA!**

**TODO (2025-01-22):**
- Vytvořit novou 3-emailovou sekvenci
- Synchronizovat s minikurzem (Den 1/2/3)
- Přidat upsell v Email #3
- Nastavit v Smartemailing/Make.com

**Placeholder dokumentace:**  
→ `/ARCHIVE/emails/EMAIL_SEQUENCES_PLACEHOLDER_2025-01-21.md`

---

## 🎉 SUCCESS CRITERIA

**Minikurz je úspěšný když:**
- ✅ >60% dokončí všechny 3 dny
- ✅ >30% zkopíruje alespoň 1 template
- ✅ >10% klikne na upsell CTA
- ✅ >3% skutečně koupí hlavní kurz

---

## 📞 KONTAKT

**Pokud potřebuješ obnovit minikurz:**
1. Podívej se do této dokumentace
2. Zkontroluj `/components/MiniCourse.tsx`
3. Synchronizuj s email sekvencí
4. Testuj flow před nasazením

**Bottom line:** Minikurz = CRITICAL pro cold lead conversion! 📚✅
