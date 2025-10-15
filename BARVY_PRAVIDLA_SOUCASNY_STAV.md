# 🎨 SOUČASNÝ STAV - Pravidla barev

## 📚 CO ŘÍKÁME UŽIVATELI V LEKCÍCH:

### Lekce 1 - Zákaznické segmenty
> **"Každý segment = jedna barva štítku. Tuto barvu pak použijete ve všech sekcích Canvas (hodnota, kanály, příjmy) pro tento segment."**

**Tip:** "Každý segment = JEDNA BARVA (např. 🔵 rodiny, 🟢 profesionálky)"

---

### Lekce 2 - Hodnotová nabídka
> **"Každý produkt má barvu podle segmentu, kterému ho prodáváte:"**
- 🔵 Modrý segment (Rodiny) → 🔵 modrá hodnota (Rodinná pizza XXL)
- 🟢 Zelený segment (Studenti) → 🟢 zelená hodnota (Pizza slice 40 Kč)

**Tip:** "Stejná barva jako segment (🔵 rodiny → 🔵 pizza)"  
**Tip:** "Více hodnot pro jeden segment = diverzifikace příjmů" ✅

---

### Lekce 3 - Kanály
> **"Zjistěte kde vaše segmenty tráví čas a tam je oslovte! Stejná barva jako segment."**

**Příklady:**
- 🍕 (🔵 Rodiny): Instagram stories + Google rozvoz
- 🔧 (🟢 Starší auta): Doporučení + lokální Facebook skupina

**Tip:** "BARVA = stejná jako segment! (🔵 rodiny → 🔵 Instagram)"  
**Tip:** "Jeden segment může mít více kanálů - diverzifikujte!" ✅

---

### Lekce 4 - Vztahy se zákazníky
> **"Každý segment potřebuje jiný přístup! Barva = segment."**

**Tip:** "BARVA = segment! (🔵 rodiny → 🔵 věrnostní karta)"

---

### Lekce 5 - Zdroje příjmů
> **"Pokud prodáváte 🔵 modrou hodnotu, příjem z ní musí být také 🔵 modrý!"**

**🌐 SPECIÁLNÍ:**
> "Některé příjmy mohou být 🌐 globální (šedivá) - pokud jeden příjem dělá pro více hodnot. Např. 'Membership' pokrývá jak 🔵 coworking tak 🟢 akce."

**Tipy:**
- "BARVA = hodnota! (🔵 pizza → 🔵 příjem z pizzy)"
- "🌐 Globální = příjmy pro celý byznys (káva, nápoje...)"

---

### Lekce 6 - Klíčové zdroje
> **"Zdroje jsou obvykle sdílené pro celý byznys"**

**🌐 VĚTŠINOU GLOBÁLNÍ BARVA!**

---

## 🔍 CO VALIDUJE SOUČASNÁ VALIDACE:

### Pravidlo #6 - Propojení barev (ERROR)
**Kontroluje:**
```javascript
// 1. Segment bez hodnoty
segmentColors.forEach(color => {
  if (!valueColors.has(color)) {
    issues.push(`${color}: Segment BEZ hodnoty!`);
  }
  if (!channelColors.has(color)) {
    issues.push(`${color}: Segment bez kanálu`);
  }
});

// 2. Hodnota bez segmentu
valueColors.forEach(color => {
  if (!segmentColors.has(color)) {
    issues.push(`${color}: Hodnota BEZ segmentu! Komu to prodáváte?`);
  }
});
```

**IGNORUJE global barvu:**
```javascript
const segmentColors = new Set(segments.filter(s => s.color !== 'global').map(s => s.color));
```

---

## ✅ ZÁVĚR - CO JE POVOLENO:

### 1. SEGMENTY
- ❌ NESMÍ být global (musí být specifický)
- ✅ Jeden segment = jedna barva
- ✅ Více segmentů = více barev

### 2. HODNOTY (produkty/služby)
- ❌ NESMÍ být global (musí být pro segment)
- ✅ Hodnota musí mít STEJNOU barvu jako segment
- ✅ Jeden segment může mít VÍCE hodnot (stejná barva)
  - Příklad: 🔵 Rodiny → 🔵 Pizza XXL + 🔵 Dětské menu

### 3. KANÁLY
- ✅ Kanál musí mít STEJNOU barvu jako segment
- ✅ Jeden segment může mít VÍCE kanálů (stejná barva)
  - Příklad: 🔵 Rodiny → 🔵 Instagram + 🔵 Facebook
- ❓ **OTÁZKA:** Může kanál být 🌐 global? (např. Web pro všechny)

### 4. VZTAHY
- ✅ Vztah musí mít STEJNOU barvu jako segment
- ✅ Jeden segment může mít VÍCE vztahů (stejná barva)
- ❓ **OTÁZKA:** Může vztah být 🌐 global? (např. Newsletter pro všechny)

### 5. PŘÍJMY
- ✅ Příjem musí mít STEJNOU barvu jako hodnota (a tedy i segment)
- ✅ 🌐 GLOBAL je povolené! (příjem pro více hodnot)
  - Příklad: 🌐 Membership pokrývá 🔵 coworking + 🟢 akce
- ✅ Jeden segment může mít VÍCE příjmů (stejná barva)

### 6. NÁKLADY
- ❓ **OTÁZKA:** Musí mít stejnou barvu jako příjem/hodnota?
- ✅ 🌐 GLOBAL je obvykle OK (sdílené náklady)
  - Příklad: 🌐 Nájem, 🌐 Elektřina

### 7. ZDROJE, AKTIVITY, PARTNERSTVÍ
- ✅ 🌐 VĚTŠINOU GLOBAL (sdílené pro celý byznys)
- ✅ Ale mohou být i barevné (specifické pro produkt)
  - Příklad: 🔵 Speciální pec na pizzy (jen pro pizzy)

---

## 🎯 LOGIKA PODLE LEKCÍ:

```
🔵 SEGMENT (Rodiny s dětmi)
    ↓
🔵 HODNOTA (Rodinná pizza XXL)
🔵 HODNOTA (Dětské menu)
    ↓
🔵 KANÁL (Instagram)
🔵 KANÁL (Facebook)
    ↓
🔵 VZTAH (Věrnostní karta)
    ↓
🔵 PŘÍJEM (Tržby z pizzy)
🔵 PŘÍJEM (Tržby z menu)
    ↓
🔵 NÁKLAD (Suroviny na pizzu)?
🌐 NÁKLAD (Nájem, elektřina) - GLOBAL
```

---

## ❓ KLÍČOVÉ OTÁZKY PRO VYŘEŠENÍ:

### 1. KANÁLY & VZTAHY - Global?
**Tvůj příklad:**
> "Hodnota Coworking + wifi → cílí na freelancery, kanály IG + Facebook"

**Možnosti:**
- a) 🔵 Freelancery → 🔵 IG + 🔵 Facebook (stejná barva) ✅
- b) 🔵 Freelancery → 🌐 IG + 🌐 Facebook (global - sdílené) ❓
- c) 🔵 Freelancery → 🔵 IG + 🟢 Facebook (různé barvy) ❌

**Co je správně?**

### 2. NÁKLADY - barvy?
**Scénáře:**
- 🔵 Pizza → 🔵 Suroviny na pizzu (stejná barva) ✅/❌?
- 🔵 Pizza → 🌐 Nájem (global) ✅
- 🔵 Pizza → 🟢 Něco jiného ❌

**Musí každý příjem mít odpovídající náklad stejné barvy?**

### 3. VÍCE HODNOT/PŘÍJMŮ jedné barvy
**Je to OK?** (podle lekcí ANO)
- 🔵 Segment → 🔵 Hodnota1 + 🔵 Hodnota2 ✅
- 🔵 Hodnota → 🔵 Příjem1 + 🔵 Příjem2 ✅

---

## 💡 MŮJ NÁVRH (na základě lekcí):

### STRICT pravidla:
1. **Segment → Hodnota** = STEJNÁ BARVA (vždy)
2. **Hodnota → Příjem** = STEJNÁ BARVA (nebo global)
3. **Segment → Kanál** = STEJNÁ BARVA (nebo global?)
4. **Segment → Vztah** = STEJNÁ BARVA (nebo global?)

### FLEXIBLE:
5. **Náklady** = JAKÁKOLIV barva (nebo global)
6. **Zdroje/Aktivity/Partnerství** = VĚTŠINOU global

### POVOLENO:
- ✅ Více hodnot pro jeden segment (stejná barva)
- ✅ Více kanálů pro jeden segment (stejná barva)
- ✅ Více příjmů pro jednu hodnotu (stejná barva)
- ✅ Global příjmy (pokrývají více hodnot)
- ✅ Global náklady (sdílené)

---

**Teď potřebuju od tebe rozhodnout ty nejasnosti! 😊**
