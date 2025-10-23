# 📱 Landscape Mode - Design Decision

## 🎯 Rozhodnutí

**LANDSCAPE MODE VYŘAZEN Z LEKCÍ** ❌

Po testování jsme se rozhodli **NEPOUŽÍVAT** landscape mode v lekcích kurzu. Zůstává pouze **portrait mobile view** i když uživatel otočí telefon.

## 🤔 Proč?

### Problém s Desktop View v Landscape:
- Canvas se zobrazil správně (9-section layout)
- **ALE** lekce byly nepoužitelné:
  - Texty byly buď **moc velké** (desktop size)
  - Nebo **moc malé** (zmenšené pro landscape)
  - Na mobilu 667px šířka to bylo **nečitelné**

### Problém se zmenšenými fonty:
- Zkoušeli jsme zmenšit fonty v landscape (13px)
- Výsledek: **Texty byly moc malé a špatně čitelné**
- Lekce jsou primárně **čtení + vyplňování** → potřebují velké, čitelné texty

## ✅ Aktuální řešení

### Lekce (CourseDemo V3):
- **Portrait mobile view** vždycky
- I když uživatel otočí telefon na landscape
- Canvas zobrazujeme přes accordion (mobile friendly)
- **Důvod**: Čtení a vyplňování je lepší na výšku

### Dashboard (možná v budoucnu):
- Landscape mode **může mít smysl** pro **zobrazení celého canvasu**
- Uživatel vidí svůj kompletní Business Model Canvas
- **Pouze pro prohlížení**, ne pro editaci

## 🧹 Co bylo odstraněno

1. ❌ `LandscapeHint.tsx` - hint pro uživatele
2. ❌ `useMobileLandscape()` hook - detekce mobile landscape
3. ❌ Landscape CSS optimalizace pro lekce (py-8, py-6, prose fonty atd.)
4. ✅ Ponechán `OrientationDebugPanel.tsx` - pro testování
5. ✅ Ponechán `useOrientation()` - pro debug panel

## 📊 Co zůstalo

### OrientationDebugPanel:
- Debug panel vpravo dole (pouze v dev mode)
- Zobrazuje:
  - Aktuální orientaci (portrait/landscape)
  - Rozměry viewportu
  - Device type (Mobile/Tablet/Desktop)
  - Tailwind breakpoints
- **Použití**: Klikni na modré kolečko s rozměry
- **Reset hint**: Tlačítko pro reset localStorage

### useOrientation hook:
- Ponechán pouze pro debug účely
- Nepoužívá se v produkčním kódu
- Pouze v `OrientationDebugPanel.tsx`

## 🔮 Budoucnost

Pokud budeme chtít landscape mode znovu zavést, měli bychom:

### Pro Dashboard Canvas Preview:
✅ **ANO** - má smysl zobrazit celý canvas v landscape
- Uživatel vidí kompletní Business Model Canvas
- Pouze **read-only** zobrazení
- Editace stále v portrait mobile view

### Pro Lekce:
❌ **NE** - nedává smysl
- Lekce jsou primárně na čtení
- Portrait je lepší pro dlouhé texty
- Mobile accordion view je optimální

## 📱 Mobile UX Best Practices

1. **Portrait = default** pro content-heavy screens
2. **Landscape = bonus** pro vizuální nástroje (canvas, grafy)
3. **Nikdy nenutit** uživatele otáčet telefon
4. **Optimalizovat pro portrait** primárně

---

**Datum rozhodnutí**: 2025-01-20  
**Důvod**: UX testování ukázalo, že landscape v lekcích je nepoužitelný  
**Status**: ✅ Implementováno
