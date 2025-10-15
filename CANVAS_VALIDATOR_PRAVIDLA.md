# 🔍 CANVAS VALIDATOR - Přehled pravidel

## 📋 SOUČASNÁ VALIDAČNÍ PRAVIDLA

### 1. ✅ Zákaznické segmenty (ERROR)
**ID:** `has-segments`  
**Popis:** Musíte mít alespoň 1 konkrétní segment

**Logika:**
- ❌ 0 segmentů → FAIL: "Chybí zákaznické segmenty!"
- ✅ 1 segment → PASS: "Máte definovaný segment"
- 🎉 2+ segmentů → PASS: "Máte více segmentů - skvělé!"

**Tip při fail:** "Přidejte alespoň 1 konkrétní skupinu zákazníků (např. \"Rodiče s dětmi 3-6 let\")"

---

### 2. 🎨 Použití barev (SUCCESS)
**ID:** `color-usage`  
**Popis:** Barvy pomáhají rozlišit různé produkty/segmenty

**Logika:**
- ❌ 0 položek celkem → FAIL: "Canvas je prázdný"
- 💡 0 barev použito → PASS (tip): "Zkuste použít barvy"
- ✅ 1 barva → PASS: "Používáte barvy pro rozlišení"
- 🎨 2+ barev → PASS: "Skvělé! Rozlišujete X produkty/služby barvami"

**Tip:** "Každá barva = jeden produkt/služba. 🌐 Globální = pro celý byznys."

---

### 3. 📋 Volitelné sekce (WARNING)
**ID:** `optional-sections`  
**Popis:** Kontrola sekcí které nemusí být vždy vyplněné

**Kontroluje:**
- ⚠️ Partnerství (partners) - není kritické
- 💡 Vztahy (relationships) - doporučené
- ⚠️ Aktivity (activities) - měly by být
- ⚠️ Zdroje (resources) - měly by být

**Logika:**
- Pokud chybí něco → PASS s varováními (max 2 zobrazené)
- Všechno vyplněno → PASS: "Všechny volitelné sekce vyplněné!"

---

### 4. 💰 Finanční data (ERROR)
**ID:** `value-numbers`  
**Popis:** Příjmy a náklady musí mít čísla

**Logika:**
- ❌ Chybí revenue NEBO costs → FAIL: "Chybí příjmy nebo náklady"
- ❌ Náklady > Příjmy → FAIL: "Váš model je zatím ztrátový!"
- ✅ Příjmy > Náklady → PASS: "Zisk: X Kč/měsíc"

**Poznámka:** Kontrola částek je odstraněná (data se ukládají na pozadí)

---

### 5. 📢 Kanály komunikace (WARNING)
**ID:** `channels-exist`  
**Popis:** Musíte mít způsob jak oslovit zákazníky

**Logika:**
- ⚠️ Máte segmenty + 0 kanálů → FAIL: "Máte segmenty, ale žádné kanály"
- ✅ 1+ kanálů → PASS: "Máte X kanálů komunikace"
- 💡 Jinak → PASS (tip): "Přidejte kanály jak oslovíte zákazníky"

---

### 6. 🔗 Propojení barev napříč sekcemi (ERROR) ⭐ KLÍČOVÉ!
**ID:** `color-cross-validation`  
**Popis:** Každý produkt (barva) musí mít segment → hodnotu → příjem

**Kontroluje barvy v:**
- segments (zákaznické segmenty)
- value (hodnotová nabídka)
- channels (kanály)
- revenue (příjmy)
- activities (aktivity)
- partners (partnerství)

**Logika:**
1. **Segment bez hodnoty** → ❌ KRITICKÉ: "{Barva}: Segment BEZ hodnoty!"
2. **Segment bez kanálu** → ❌ KRITICKÉ: "{Barva}: Segment bez kanálu"
3. **Hodnota bez segmentu** → ❌ KRITICKÉ: "{Barva}: Hodnota BEZ segmentu! Komu to prodáváte?"

**Speciální pravidla:**
- 🌐 Global barva se IGNORUJE (je OK pro celý byznys)
- Kontrola jde obousměrně (segment→hodnota i hodnota→segment)

---

## ❓ OTÁZKY PRO TEBE:

### 1. Pravidlo #6 (Propojení barev)
Aktuálně kontroluje:
- Segment → Hodnota ✅
- Segment → Kanál ✅
- Hodnota → Segment ✅

**Mělo by kontrolovat také:**
- Hodnota → Příjem? (každá hodnota musí mít příjem stejné barvy)
- Segment → Příjem? (každý segment musí mít příjem)
- Kanál → Segment? (každý kanál musí mít segment stejné barvy)

### 2. Pravidlo #4 (Finanční data)
Aktuálně:
- Kontroluje jestli EXISTUJÍ revenue a costs
- Počítá zisk z položek co MAJÍ value
- Nevaliduje, jestli VŠECHNY položky mají value

**Mělo by:**
- Kontrolovat že KAŽDÁ položka v revenue/costs má value?
- Varovat pokud nějaká položka nemá číslo?

### 3. Pravidlo #1 (Segmenty)
Aktuálně:
- Jen počítá kolik je segmentů

**Mělo by:**
- Kontrolovat že segmenty mají currentValue a targetValue?
- Upozornit pokud targetValue < currentValue (špatný směr růstu)?

### 4. Nová pravidla?
Měli bychom přidat:
- **Kontrola duplicit** - stejný text ve stejné sekci (duplikáty)?
- **Kontrola prázdných textů** - štítky s prázdným textem?
- **Kontrola logiky barev** - např. červená = náklady, zelená = příjmy (standardní barvy)?
- **Kontrola poměru** - např. moc nákladů vs málo příjmů (red flag)?

### 5. Severity (závažnost)
Aktuální:
- ERROR (červená) - kritické, blokuje
- WARNING (žlutá) - doporučené, ale OK
- SUCCESS (zelená) - jen info

Je to OK nebo změnit?

---

## 💬 CO MÁM UDĚLAT?

Odpověz na otázky výše a já upravím validační pravidla podle toho co chceš! 

Formát:
```
1. Ano/Ne - (pokud ano, napiš co přesně)
2. Ano/Ne - (pokud ano, napiš co přesně)
...
```
