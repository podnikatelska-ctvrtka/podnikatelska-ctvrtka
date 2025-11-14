# ✅ FINAL CHECK - KURZ MOBILE/DESKTOP

**Před spuštěním reklam - zkontroluj všechno!**

---

## 🎯 **ÚČEL:**

Ujistit se že:
1. ✅ Kurz funguje na mobilu i desktopu
2. ✅ Všechny nástroje jsou funkční
3. ✅ Autosave funguje
4. ✅ Achievements fungují
5. ✅ UX je smooth bez bugů

---

## 📱 **MOBILE CHECK (iPhone/Android)**

### **1. LANDING PAGE (`/`)**

- [ ] Timer scarcity běží (místa ubývají)
- [ ] Opt-in formulář funguje
- [ ] Po submit → redirect na `/dakujem`
- [ ] Lead event trackuje (Meta Pixel)
- [ ] Responsivní layout (žádné přetékání)

### **2. THANK YOU PAGE (`/dakujem`)**

- [ ] CTA tlačítko "Přejít na objednávku" funguje
- [ ] Redirect na `/objednavka`

### **3. ORDER PAGE (`/objednavka`)**

- [ ] Timer 24h countdown běží
- [ ] Cena: ~~8.333 Kč~~ → **4.999 Kč** (40% sleva)
- [ ] Live Product Showcase funguje (screenshots kurzu)
- [ ] FAPI checkout form funguje
- [ ] InitiateCheckout event trackuje (Meta Pixel)
- [ ] Mobil: smooth scrolling, žádné layoutové bugy

### **4. KURZ DASHBOARD (`/kurz`)**

- [ ] Po přihlášení: vidím 3 moduly
- [ ] Progress bar zobrazuje správný progress
- [ ] Sidebar funguje (mobile: bottom nav)
- [ ] "Začít modul" tlačítka fungují

### **5. MODUL 1 - MODEL PODNIKÁNÍ**

#### **Desktop:**
- [ ] Business Model Canvas zobrazuje všech 9 sekcí
- [ ] Klik na sekci → textfield
- [ ] Psaní textu → autosave (indikátor "Uloženo")
- [ ] FIT Validátor zobrazuje checkmarky/varování
- [ ] "Pokračovat" tlačítko funguje

#### **Mobile:**
- [ ] Bottom Sheet funguje (swipe up/down)
- [ ] Accordion funguje (expand/collapse sekce)
- [ ] Textfield: klávesnice nevytlačuje obsah
- [ ] Autosave funguje (indikátor)
- [ ] FIT Validátor: scrollovatelný, čitelný

### **6. MODUL 2 - VALUE PROPOSITION**

#### **Desktop:**
- [ ] Segment Selector: 3 segmenty (A, B, C)
- [ ] Customer Profile: 6 sekcí (Jobs, Pains, Gains)
- [ ] Value Map: 3 sekce (Products, Pain Relievers, Gain Creators)
- [ ] Autosave funguje
- [ ] FIT Validátor: vidím FIT score

#### **Mobile:**
- [ ] Segment Selector: přepínání funguje
- [ ] Customer Profile: 6 sekcí (accordion/cards)
- [ ] Value Map: 3 sekce (scrollovatelné)
- [ ] Autosave indikátor
- [ ] FIT score viditelný

### **7. MODUL 3 - AKČNÍ PLÁN**

#### **Desktop:**
- [ ] Target Calculator: zadám čísla → výsledek
- [ ] Business Action Plan: 4 kroky (MVP, Marketing, Sales, Scaling)
- [ ] Progress tracking funguje
- [ ] Tlačítka "Mark as Done" fungují
- [ ] Achievement "Dokončil/a jsi kurz!" se zobrazí

#### **Mobile:**
- [ ] Target Calculator: kalkulačka čitelná
- [ ] Business Action Plan: karty scrollovatelné
- [ ] Checkboxy fungují
- [ ] Achievement notifikace se zobrazí

### **8. ACHIEVEMENTS**

- [ ] Po dokončení Modul 1 → achievement notifikace
- [ ] Po dokončení Modul 2 → achievement notifikace
- [ ] Po dokončení Modul 3 → achievement notifikace
- [ ] Achievements se ukládají do Supabase
- [ ] Refresh stránky → achievements stále viditelné

---

## 💻 **DESKTOP CHECK (Chrome/Safari)**

### **1. LANDING PAGE (`/`)**

- [ ] Hero section: layout správný
- [ ] Timer scarcity: countdown visible
- [ ] Opt-in formulář: centered, funkční
- [ ] CTA tlačítka: hover efekty fungují
- [ ] Testimonials: scrollovatelné

### **2. ORDER PAGE (`/objednavka`)**

- [ ] Timer 24h: velký, viditelný
- [ ] Live Product Showcase: screenshots z kurzu
- [ ] FAPI form: layout správný
- [ ] Desktop: dvousloupcový layout (form vlevo, showcase vpravo)

### **3. KURZ DASHBOARD (`/kurz`)**

- [ ] Sidebar: fixed vlevo
- [ ] Main content: scrollovatelný
- [ ] Progress bar: horizontální, správný %
- [ ] Modules: klikatelné, navigace funguje

### **4. MODUL 1**

- [ ] Business Model Canvas: 3×3 grid layout
- [ ] Klik na sekci → inline edit
- [ ] FIT Validátor: sidebar vpravo
- [ ] Checkmarky/varování: real-time update

### **5. MODUL 2**

- [ ] Segment Selector: tabs nahoře
- [ ] Customer Profile + Value Map: split layout
- [ ] FIT score: visible v sidebaru
- [ ] Autosave: indikátor v pravém horním rohu

### **6. MODUL 3**

- [ ] Target Calculator: velký, centrovaný
- [ ] Business Action Plan: 4 karty v řadě
- [ ] Progress: viditelný na každé kartě
- [ ] Achievement modal: vycentrovaný, animace

---

## 🔥 **KRITICKÉ TESTY**

### **AUTOSAVE:**
```
1. Otevři Modul 1
2. Napiš text do sekce "Zákazníci"
3. Počkej 2s
4. Refresh stránku (F5)
5. ✅ Text je stále tam
```

### **ACHIEVEMENTS:**
```
1. Dokončit Modul 1
2. Klikni "Pokračovat"
3. ✅ Achievement notifikace se zobrazí
4. Refresh stránku
5. ✅ Achievement stále viditelný v profilu
```

### **FAPI CHECKOUT:**
```
1. Jdi na `/objednavka`
2. Vyplň formulář
3. Klikni "Objednat"
4. ✅ InitiateCheckout event odeslán (Meta Events Manager)
5. ✅ Redirect na FAPI payment
```

### **META PIXEL TRACKING:**
```
1. Otevři Meta Events Manager
2. Test Events → View Events
3. Reload landing page
4. ✅ PageView event
5. Submit opt-in form
6. ✅ Lead event
7. Klikni "Objednat" na order page
8. ✅ InitiateCheckout event
```

---

## 🐛 **ZNÁMÉ BUGY (IGNORUJ):**

### **SAFE TO IGNORE:**
- ⚠️ Console warnings o Supabase RLS (normální)
- ⚠️ Sentry deprecation warnings (neovlivňuje funkčnost)
- ⚠️ React DevTools warnings (dev only)

### **RED FLAGS (FIX ASAP!):**
- 🚨 Autosave nefunguje → check Supabase connection
- 🚨 Meta Pixel events netrackují → check `lib/metaPixel.ts`
- 🚨 FAPI form nefunguje → check `.env` variables
- 🚨 Achievements se neukládají → check `lib/achievements.ts`

---

## 📊 **CO MONITOROVAT PRVNÍ TÝDEN:**

### **DEN 1-3:**
- [ ] Meta Pixel events (PageView, Lead, InitiateCheckout)
- [ ] Lead count (kolik opt-inů)
- [ ] FAPI orders (kolik objednávek)
- [ ] CTR reklam (target: >1%)
- [ ] CPL (cost per lead - target: <50 Kč)

### **DEN 4-7:**
- [ ] Conversion rate (opt-in → purchase)
- [ ] ROAS (revenue / ad spend)
- [ ] Email open rate (SmartEmailing)
- [ ] Kurz engagement (kolik lidí otevřelo kurz)

---

## ✅ **QUICK TEST SCRIPT:**

### **5 MINUTE TEST:**
```
1. Landing page → opt-in → dakujem (1 min)
2. Order page → FAPI form → check tracking (2 min)
3. Kurz → Modul 1 → test autosave (1 min)
4. Modul 3 → test achievement (1 min)
```

### **15 MINUTE FULL TEST:**
```
1. Landing page (mobile + desktop) (3 min)
2. Order page (mobile + desktop) (3 min)
3. Kurz Modul 1 (mobile + desktop) (3 min)
4. Kurz Modul 2 (mobile + desktop) (3 min)
5. Kurz Modul 3 (mobile + desktop) (3 min)
```

---

## 🎯 **READY TO LAUNCH CHECKLIST:**

- [ ] Mobile: všechno funguje
- [ ] Desktop: všechno funguje
- [ ] Autosave: tested ✅
- [ ] Achievements: tested ✅
- [ ] Meta Pixel: tracking events ✅
- [ ] FAPI: checkout works ✅
- [ ] Timers: countdown running ✅

---

**KDYŽ MÁŠ VŠECHNO ✅ → JE ČAS SPUSTIT REKLAMY! 🚀**
