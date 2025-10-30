# 📱 MOBILNÍ DEBUG TEST

## 🎯 CO JSEM OPRAVIL

1. ✅ Přidal `onSelectTool` a `currentTool` props do MobileCourseSidebar
2. ✅ Přidal render mobilních nástrojů (action-plan, calculators)
3. ✅ Přidal DEBUG logy pro mobilní detekci
4. ✅ Smazal starý nepoužívaný import MobileSidebarContent

## 🧪 JAK OTESTOVAT

### Krok 1: Otevři kurz na mobilu

1. Otevři `/#course-v3` na **mobilu** nebo **zmenši okno na < 768px**
2. Otevři **Chrome DevTools Console** (F12 → Console)

### Krok 2: Hledej debug logy

Měl bys vidět:

```javascript
📱 MOBILE DETECTION: { isMobile: true, width: 375, threshold: 768 }
🎯 RENDERING MOBILE VERSION! { currentModuleNumber: 1, showMainDashboard: true, showTool: null }
```

**Pokud NEVIDÍŠ tyto logy:**
- isMobile je `false` → mobilní detekce nefunguje
- Zkontroluj `window.innerWidth` v konzoli

**Pokud VIDÍŠ tyto logy:**
- Mobilní verze se renderuje! 🎉

### Krok 3: Otevři hamburger menu

1. Klikni na ☰ tlačítko (vpravo nahoře)
2. Měl bys vidět **MobileCourseSidebar** s:
   - 📊 Dashboard
   - 🧮 **Nástroje** (rozbalovací sekce)
     - 🎯 Akční plán
     - 🧮 Kalkulačka zákazníků
     - 📊 Velikost segmentu
   - Moduly 1, 2, 3

**Pokud NEVIDÍŠ sekci "🧮 Nástroje":**
- MobileCourseSidebar se nepoužívá nebo nemá props `onSelectTool`
- Zkontroluj v konzoli error messages

### Krok 4: Klikni na nástroj

1. Rozbal "🧮 Nástroje"
2. Klikni na "🎯 Akční plán"
3. Měl by se **zavřít sidebar** a **otevřít Akční plán**

**Pokud se NIC NESTANE:**
- `onSelectTool` handler nefunguje
- Zkontroluj console errors

---

## 🐛 TROUBLESHOOTING

### Problém: isMobile je vždy FALSE

**Důvod:** window.innerWidth >= 768px

**Řešení:**
1. Otevři Chrome DevTools (F12)
2. Klikni na **Toggle device toolbar** (Ctrl+Shift+M)
3. Vyber "iPhone 12 Pro" nebo "Responsive"
4. Nastav šířku na < 768px

### Problém: Vidím DESKTOP sidebar i na mobilu

**Možné důvody:**

1. **isMobile=false** → zkontroluj width
2. **Conditional render nefunguje** → zkontroluj console logy
3. **CSS problém** → sidebar má class `md:block` která ho skrývá na mobilu

**Debug:**
```javascript
// V konzoli:
console.log('Width:', window.innerWidth);
console.log('Mobile?', window.innerWidth < 768);
```

### Problém: Sidebar se otevře ale CHYBÍ nástroje

**Možné důvody:**

1. **`onSelectTool` prop není předaný** 
   - Zkontroluj CourseDemoV3.tsx řádek ~2196
   - Mělo by tam být: `onSelectTool={(toolId) => {...}}`

2. **`toolsExpanded` je FALSE**
   - V sidebaru klikni na "🧮 Nástroje" aby se rozbalilo

3. **MobileCourseSidebar nemá sekci tools**
   - Zkontroluj MobileCourseSidebar.tsx řádek 202-250

---

## ✅ OČEKÁVANÝ VÝSLEDEK

Po těchto opravách:

1. **Na MOBILU (< 768px):**
   - Vidíš **MobileCourseSidebar** s nástroji
   - Můžeš kliknout na nástroj → otevře se tool page
   - Tool page má header s back button

2. **Na DESKTOPU (>= 768px):**
   - Vidíš **CourseSidebar** (desktop) s nástroji
   - Sidebar je vždy viditelný vlevo
   - Kliknutí na nástroj otevře tool v main content area

---

## 🚀 DALŠÍ KROKY

Pokud vidíš logy a sidebar se otevírá:

1. **Test nástrojů:**
   - Otevři každý nástroj
   - Zkontroluj že fungují správně na mobilu
   
2. **Test navigace:**
   - Z nástroje klikni "Zpět"
   - Měl by se vrátit na Dashboard

3. **Test lekcí:**
   - Z Dashboardu otevři lekci
   - Zkontroluj že lekce funguje
   - Klikni na hamburger → vidíš sidebar s nástroji

---

**POKUD POŘÁD NEFUNGUJE, pošli mi:**

1. Screenshot konzole s debug logy
2. Screenshot sidebaru (jak vypadá)
3. `window.innerWidth` value

A já to rychle opravím! 🚀
