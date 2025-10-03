# 🎯 FLOWLANCE INTEGRACE - NÁVOD

## ✅ Co je připraveno:

PrelaunchEmailCapture komponenta je připravena pro propojení s Flowlance!

---

## 🚀 SETUP (5 MINUT):

### 1. Získej svou Flowlance URL

V Flowlance:
1. Vytvoř produkt "Podnikatelská čtvrtka"
2. Nastav cenu 4.999 Kč
3. Zkopíruj URL tvé landing page (např. `https://www.flowlance.cz/podnikatelska-ctvrtka`)

### 2. Uprav konfiguraci v `/components/PrelaunchEmailCapture.tsx`

Na **řádku 11-16** najdeš:

```typescript
const FLOWLANCE_CONFIG = {
  enabled: true, // Zapni/vypni Flowlance integraci
  url: 'https://www.flowlance.cz/tvuj-produkt-url', // ← ZMĚŇ TADY!
  redirectDelay: 2000, // Čas před redirectem (ms)
  openInNewTab: false, // true = nový tab, false = redirect
};
```

**Nahraď** `'https://www.flowlance.cz/tvuj-produkt-url'` **za svou Flowlance URL!**

### 3. Hotovo! 🎉

Když uživatel zadá email a klikne na tlačítko:
1. ✅ Email se uloží do localStorage (tracking)
2. ✅ Trackne se konverze (Google Analytics)
3. ✅ Po 2 sekundách se přesměruje na Flowlance
4. ✅ Email se předá do URL parametru (`?email=xxx`)

---

## ⚙️ MOŽNOSTI NASTAVENÍ:

### A) Redirect na Flowlance (výchozí)
```typescript
enabled: true,
openInNewTab: false,
```
→ Přesměruje uživatele na tvou Flowlance stránku

### B) Otevři v novém tabu
```typescript
enabled: true,
openInNewTab: true,
```
→ Otevře Flowlance v novém tabu, uživatel zůstane na tvé stránce

### C) Bez Flowlance (jen email capture)
```typescript
enabled: false,
```
→ Jen zobrazí success zprávu, neposílá nikam

---

## 🎨 CO SE DĚJE NA FRONTEND:

### 1. Uživatel zadá email
```
váš@email.cz
```

### 2. Validace
```
✅ Email validní
✅ Není duplicitní
```

### 3. Loading state
```
🚀 PŘIPOJUJI VÁS...
```

### 4. Success + Redirect
```
🎉 Přesměrovávám na registraci...
→ https://www.flowlance.cz/tvuj-produkt?email=xxx&ref=prelaunch
```

---

## 📊 FLOWLANCE DOSTANE:

### URL parametry:
```
?email=user@example.com&ref=prelaunch
```

**Flowlance může:**
- ✅ Prefillnout email do formuláře
- ✅ Trackovat zdroj (`ref=prelaunch`)
- ✅ Automaticky poslat welcome email
- ✅ Přidat do email listu
- ✅ Zobrazit checkout pro kurz

---

## 🔧 POKROČILÉ MOŽNOSTI:

### 1. UTM parametry pro tracking:
```typescript
const flowlanceUrlWithEmail = `${FLOWLANCE_CONFIG.url}?email=${encodeURIComponent(email)}&utm_source=landing&utm_medium=prelaunch&utm_campaign=pioneers`;
```

### 2. Předat další data:
```typescript
const flowlanceUrlWithEmail = `${FLOWLANCE_CONFIG.url}?email=${encodeURIComponent(email)}&name=${userName}&spot=${50 - availableSpots}`;
```

### 3. API integrace (pokročilé):
Pokud Flowlance má API, můžeš poslat data přes fetch místo redirectu.

---

## 🎯 FLOWLANCE AUTOMATIZACE:

Po nastavení v Flowlance můžeš:

### 1. Email sekvence:
- Email #1: Okamžitě - "Vítejte mezi průkopníky!"
- Email #2: +1 hodina - "Link na mini kurz ZDARMA"
- Email #3: +24 hodin - "Datum spuštění kurzu"
- Email #4: +48 hodin - "Průkopnická cena končí za 48h"

### 2. Segmentace:
- Tag: "Průkopník" (první 50 lidí)
- Tag: "Prelaunch 2025"
- Custom field: Spot number

### 3. Checkout:
- Cena: 4.999 Kč
- Payment methods: Karta, převod
- Thank you page: Link na kurz

---

## ✅ CHECKLIST PŘED SPUŠTĚNÍM:

- [ ] Flowlance produkt vytvořený
- [ ] URL zkopírovaná do `FLOWLANCE_CONFIG.url`
- [ ] Test: Zadej email a ověř že redirect funguje
- [ ] Flowlance email automatizace nastavená
- [ ] Thank you page na Flowlance má link na mini kurz

---

## 🆘 TROUBLESHOOTING:

### Email se nepředává do Flowlance?
→ Zkontroluj že Flowlance podporuje `?email=` URL parametr

### Redirect nefunguje?
→ Zkontroluj `FLOWLANCE_CONFIG.enabled = true`

### Chci otestovat bez redirectu?
→ Nastav `enabled: false` a otestuj lokálně

---

## 📞 DALŠÍ POMOC:

Pokud potřebuješ API integraci nebo pokročilé možnosti, řekni mi!