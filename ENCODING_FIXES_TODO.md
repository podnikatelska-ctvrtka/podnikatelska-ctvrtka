# 🔧 Encoding chyby k opravě

## CourseDemoV3.tsx

### Řádek 88
**Před:** `"💇 Kadeřnice: Profesionálky 30-50 let (��et��í čas, chtějí kvalitu)"`
**Po:** `"💇 Kadeřnice: Profesionálky 30-50 let (šetří čas, chtějí kvalitu)"`

### Řádek 275
**Před:** `"💰 ZADEJTE ��ÍSLO! Počet zákazníků × cena"`
**Po:** `"💰 ZADEJTE ČÍSLO! Počet zákazníků × cena"`

### Řádek 327
**Před:** `<h3>⚙️ Kl��čové aktivity</h3>`
**Po:** `<h3>⚙️ Klíčové aktivity</h3>`

### Řádek 345
**Před:** `"💇 Kadeřnice: 🌐 Stříhání a barvení, 🟣 Ve��erní provoz 18-21h"`
**Po:** `"💇 Kadeřnice: 🌐 Stříhání a barvení, 🟣 Večerní provoz 18-21h"`

### Řádek 407
**Před:** `<h3>�� Struktura nákladů</h3>`
**Po:** `<h3>💰 Struktura nákladů</h3>`

### Řádek 949
**Před:** `// 🏆 validator-used: VYŘAZENO - Triggeruje se JEN když user skute��ně použije CanvasValidator!`
**Po:** `// 🏆 validator-used: VYŘAZENO - Triggeruje se JEN když user skutečně použije CanvasValidator!`

### Řádek 1165
**Před:** `// �� Odstraněno - duplicitní toast (MEGA konfetti stačí)`
**Po:** `// ❌ Odstraněno - duplicitní toast (MEGA konfetti stačí)`

### Řádek 2104
**Před:** `Pokra��ovat na další lekci →`
**Po:** `Pokračovat na další lekci →`

---

## CanvasValidator.tsx

### Řádek 157
**Před:** `description: 'Příjmy a náklady musí mít č��sla'`
**Po:** `description: 'Příjmy a náklady musí mít čísla'`

---

## BusinessModelCanvasV2.tsx

### Řádek 46
**Před:** `{ id: "revenue", title: "Zdroje příjmů", items: [], gridArea: "revenue", valueLabel: "Příjmy (K��/měsíc)" }`
**Po:** `{ id: "revenue", title: "Zdroje příjmů", items: [], gridArea: "revenue", valueLabel: "Příjmy (Kč/měsíc)" }`

---

## AdCreativesSimple.tsx

### Řádek 205
**Před:** `✅ Screenshot Ready ��� Bez jargonu • Bez bullshitu`
**Po:** `✅ Screenshot Ready → Bez jargonu • Bez bullshitu`

---

## ThreeNewCreativeAds.tsx

### Řádek 397
**Před:** `━━━━━━━━━��━━━━━━━━━━━━━━━━━`
**Po:** `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

---

## All6AdSets.tsx

### Řádek 526
**Před:** `❌ <span className="font-bold">Další video</span> <span className="text-gray-600">("Pak to uděl��m")</span>`
**Po:** `❌ <span className="font-bold">Další video</span> <span className="text-gray-600">("Pak to udělám")</span>`

---

## TenNewAngles.tsx

### Řádek 157
**Před:** `Každ�� měsíc to samé:`
**Po:** `Každý měsíc to samé:`

### Řádek 372, 1438
**Před:** `���━━━━━━━━━━━━━━━━━━━━━━━━━━` a `━━━━━━━━━━━━━━━━━���━━━━━━━━━`
**Po:** `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

---

## Final6Angles.tsx

### Řádek 103
**Před:** `━━━━━━━━━━━━━━━━━━━━━━━���━━━`
**Po:** `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

---

## Ultimate10Ads.tsx

### Řádek 494
**Před:** `���� ČERVENÁ PILULKA:`
**Po:** `🔴 ČERVENÁ PILULKA:`

### Řádek 718
**Před:** `💸 -600 Kč/den → Prodáváš levn�� = málo marže`
**Po:** `💸 -600 Kč/den → Prodáváš levně = málo marže`

### Řádek 952
**Před:** `━━━━━━━━━━━━━━━━━━━━���━��━━━━`
**Po:** `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

---

## ❗ POZNÁMKA PRO OPRAVU

Tyto chyby jsou způsobeny chybným encoding při ukládání souborů. 
Pravděpodobně se jedná o UTF-8 vs Windows-1250 konflikt.

**Doporučení:**
1. Ujistit se že všechny soubory jsou uloženy v UTF-8
2. Použít find-and-replace s regex v IDE pro hromadnou opravu
3. Případně ručně opravit pomocí copy-paste správných znaků

---

**Status:** 📝 Připraveno k opravě
**Celkem chyb:** 20+
**Priorita:** 🔴 VYSOKÁ (uživatelská zkušenost)
