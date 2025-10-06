# 🎓 LMS DEMO - NÁVOD K TESTOVÁNÍ

## ✅ CO BYLO VYTVOŘENO

### **1. Course Demo (`/components/CourseDemo.tsx`)**
- ✅ Přihlašovací screen (token-based auth)
- ✅ Dashboard s přehledem modulů
- ✅ Progress tracking (% dokončení)
- ✅ Video player (Vimeo integration)
- ✅ Auto-save poznámek (localStorage)
- ✅ Module completion tracking

### **2. Business Model Canvas (`/components/BusinessModelCanvas.tsx`)**
- ✅ Interaktivní 9-box canvas
- ✅ Editovatelné položky (klikni → přidej → ulož)
- ✅ Auto-save do localStorage
- ✅ PDF export (print funkce)
- ✅ Clear/reset možnost

### **3. Routing v App.tsx**
- ✅ `#course` → zobrazí LMS demo
- ✅ `#priprava` → zobrazí mini kurz (už existoval)
- ✅ `/` → landing page

---

## 🚀 JAK OTESTOVAT

### **KROK 1: Build & Start**

```bash
npm run dev
```

### **KROK 2: Otevři LMS Demo**

**V prohlížeči:**
```
http://localhost:5173/#course
```

**Nebo:**
```
http://localhost:5173#course
```

### **KROK 3: Přihlášení**

**Zadej token:**
```
demo2025
```

**Klikni:** "Přihlásit se"

---

## 📋 CO VYZKOUŠET

### **A) DASHBOARD:**

1. ✅ **Vidíš 3 demo moduly:**
   - Modul 1: Odemčený ✅
   - Modul 2: Zamčený 🔒
   - Modul 3: Zamčený 🔒

2. ✅ **Progress bar nahoře:**
   - Ukazuje 0/3 (0%)

3. ✅ **Klikni na Modul 1:**
   - Otevře se detail modulu

---

### **B) MODUL DETAIL:**

1. ✅ **Video player:**
   - Vimeo demo video se načte
   - Můžeš pustit video

2. ✅ **Poznámky:**
   - Napiš nějaký text
   - Automaticky se uloží (localStorage)
   - Refresh stránku → poznámky zůstanou!

3. ✅ **Označit jako dokončené:**
   - Klikni tlačítko "Označit jako dokončené"
   - Toast notifikace: "Modul dokončen! 🎉"
   - Přesměruje na dashboard

4. ✅ **Progress tracking:**
   - Progress bar teď ukazuje 1/3 (33%)
   - Modul 1 má zelenou ikonu ✅
   - Modul 2 je teď odemčený!

---

### **C) BUSINESS MODEL CANVAS:**

1. ✅ **Klikni na tlačítko:**
   ```
   🎨 Business Model Canvas
   ```

2. ✅ **Vidíš 9 boxů:**
   - Každý box má jiný gradient
   - Každý box má nadpis + popis

3. ✅ **Přidej položku:**
   - Klikni "Přidat položku" u nějakého boxu
   - Zadej text (např. "Malé firmy 10-50 zaměstnanců")
   - Klikni "Přidat"
   - Položka se přidá do boxu!

4. ✅ **Smaž položku:**
   - Najeď myší na položku
   - Zobrazí se X (křížek)
   - Klikni X → položka zmizí

5. ✅ **Auto-save:**
   - Každá změna se automaticky ukládá
   - Toast notifikace: "✅ Automaticky uloženo"
   - Refresh stránku → data zůstanou!

6. ✅ **Export PDF:**
   - Klikni "Exportovat PDF"
   - Otevře se print dialog
   - Můžeš uložit jako PDF nebo vytisknout

7. ✅ **Vymazat vše:**
   - Klikni "Vymazat"
   - Confirm dialog: "Opravdu?"
   - Klikni OK → všechna data zmizí

---

## 🎨 VLASTNÍ VIMEO VIDEO

**Chceš použít SVOJE video?**

1. **Otevři:** `/components/CourseDemo.tsx`

2. **Najdi řádek ~34:**
   ```typescript
   vimeoId: "76979871", // Demo video (replace with yours!)
   ```

3. **Nahraď svým Vimeo ID:**
   ```typescript
   vimeoId: "TVOJE_VIMEO_ID",
   ```

4. **Ulož → refresh → funguje!**

---

## 📊 CO DATA UKLÁDÁ

**localStorage obsahuje:**

1. **`course_demo_auth`**
   - `"true"` pokud jsi přihlášený
   - Zůstaneš přihlášený po refresh

2. **`course_demo_progress`**
   - Array modulů s `completed: true/false`
   - Tracking které moduly jsi dokončil

3. **`course_demo_notes`**
   - String s tvými poznámkami
   - Auto-save každou změnu

4. **`business_model_canvas`**
   - JSON s všemi 9 boxy a jejich položkami
   - Auto-save každou změnu

---

## 🔧 CUSTOMIZE

### **Změnit přístupový token:**

**V `/components/CourseDemo.tsx` (řádek 12):**
```typescript
const AUTH_TOKEN = "demo2025"; // ← Změň na cokoliv!
```

### **Přidat další moduly:**

**V `/components/CourseDemo.tsx` (řádek ~25):**
```typescript
{
  id: 4,
  title: "Nový modul",
  description: "Popis...",
  duration: "15 min",
  completed: false,
  locked: true,
  vimeoId: "123456789",
}
```

### **Změnit barvy Canvas boxů:**

**V `/components/BusinessModelCanvas.tsx` (řádek ~15):**
```typescript
color: "from-purple-500 to-pink-500", // ← Změň gradient!
```

---

## 💡 FEATURES OVERVIEW

### **✅ CO FUNGUJE:**
- Token-based auth
- Module unlock progression
- Video player (Vimeo)
- Auto-save notes
- Progress tracking
- Interactive Business Canvas
- Add/remove items
- PDF export
- localStorage persistence
- Responsive design
- Animations (Motion)
- Toast notifications

### **⏳ CO BY SE DALO PŘIDAT (full verze):**
- Email magic link místo tokenu
- Supabase backend (real database)
- Certificate PDF generation
- Quiz/test po každém modulu
- Community integration (Discord)
- Payment gateway (GoPay/Stripe)
- Admin dashboard (pro tebe)
- Analytics (kdo co sleduje)
- Video progress tracking
- Deadline pro dokončení

---

## 🎯 TESTOVACÍ CHECKLIST

**Projdi všechno:**

- [ ] Přihlášení s tokenem funguje
- [ ] Dashboard se načte
- [ ] Modul 1 je kliknutelný
- [ ] Video se přehraje
- [ ] Poznámky se ukládají
- [ ] "Dokončit modul" funguje
- [ ] Progress bar se aktualizuje
- [ ] Modul 2 se odemkne
- [ ] Canvas switch funguje
- [ ] Canvas boxy jsou editovatelné
- [ ] Přidání položky funguje
- [ ] Smazání položky funguje
- [ ] Auto-save funguje
- [ ] Refresh zachová data
- [ ] PDF export funguje
- [ ] Mobile responsive (zkus na telefonu!)

---

## 🚀 CO DÁL?

**Pokud ti to vyhovuje:**

✅ **ŘEKNI MI A VYTVOŘÍM FULL LMS:**
- Všech 9 modulů (tvoje Vimeo videa)
- Real auth (Supabase magic link)
- Worksheety ke stažení
- Certificate generation
- Better PDF export
- Admin dashboard

**Nebo:**

✅ **POUŽIJEŠ FLOWLANCE:**
- Jednodušší (oni se starají o infra)
- ~800 Kč/měsíc
- Komunita built-in

---

## 📞 FEEDBACK?

**Vyzkoušej demo a řekni mi:**

1. Líbí se ti UX?
2. Je to intuitivní?
3. Co by ses chtěl změnit?
4. Chceš full LMS nebo Flowlance?

---

**DEMO JE READY! Zkus to a dej vědět! 🚀**

**URL:** `http://localhost:5173/#course`  
**Token:** `demo2025`

**ENJOY! 💪**