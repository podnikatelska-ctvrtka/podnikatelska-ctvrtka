# 📧 EMAIL PRO FAPI SUPPORT

**Komu:** podpora@fapi.cz

**Předmět:** Automatické emaily se neposílají po platbě přes GoPay

---

## 📝 **TEXT EMAILU:**

```
Dobrý den,

mám problém s automatickými emaily - po zaplacení objednávky přes GoPay 
se zákazníkům neposílají žádné emaily ani faktury.

**PRODUKTY:**
1. Testovací produkt - 2 Kč (ID: [DOPLŇ Z FAPI ADMIN])
2. Podnikatelská Čtvrtka - 4.999 Kč (ID: [DOPLŇ Z FAPI ADMIN])

**CO MÁM NASTAVENÉ:**
✅ Sada zpráv je vytvořená a aktivní v obou formulářích
✅ Šablony emailů jsou vytvořené
✅ GoPay platební brána je připojená
✅ Webhook pro vlastní notifikace funguje (dostávám data)

**PROBLÉM:**
❌ Po zaplacení objednávky přes GoPay (test i ostrá platba) nepřichází:
   - Email "při zaplacení objednávky"
   - Faktura
   - Žádná FAPI automatická zpráva

**CO JSEM ZKOUŠEL:**
1. Zkontroloval aktivaci šablon - jsou aktivní ✅
2. Udělal testovací platby (několikrát) - žádný email ❌
3. Zkontroloval že platby jsou "ZAPLACENO" v FAPI admin - [ANO/NE - DOPLŇ]
4. Webhook funguje (dostávám invoice data) - ale FAPI emaily ne ❌

**OTÁZKY:**
1. Může být problém v GoPay integraci? (webhook od GoPay → FAPI)
2. Potřebují šablony speciální nastavení pro GoPay platby?
3. Fungují automatické emaily jen pro bankovní převody, ne pro GoPay?
4. Je nějaký log kde můžu vidět proč se email neposlal?

**URGENT:**
Chystám launch produktu a potřebuji mít jistotu že zákazníci dostanou 
přístup k produktu emailem. Můžete prosím zkontrolovat nastavení?

Pokud potřebujete přístup do mého účtu nebo screenshoty z admin rozhraní, 
rád vám je pošlu.

Děkuji za rychlou odpověď!

S pozdravem,
[TVOJE JMÉNO]
[TVŮJ EMAIL]
[TVŮJ TELEFON - volitelně]
```

---

## 🔍 **PŘED ODESLÁNÍM - ZJISTI:**

### **1. ID produktů:**
```
FAPI Admin → Produkty → Klikni na produkt
URL bude: https://admin.fapi.cz/products/XXXXXX
                                            ↑↑↑↑↑↑
                                         Tohle je ID
```

### **2. Jsou platby označené jako "ZAPLACENO"?**
```
FAPI Admin → Faktury
Najdi fakturu za 2 Kč
Status: ZAPLACENO ✅ nebo "Čeká na platbu" ⏳ ?
```

**Pokud je "Čeká na platbu" → GoPay webhook NEFUNGUJE!**  
→ To je klíčová informace pro support!

### **3. Screenshot nastavení:**

Udělej screenshoty:
- Produkt → Automatizace → E-maily (že jsou aktivní)
- Produkt → Automatizace → Webhooky (náš webhook)
- Sada zpráv (že je vytvořená)
- Faktura detail (status "ZAPLACENO")

Připoj k emailu!

---

## 🎯 **MÁ TEORIE - CO SE DĚJE:**

### **Scénář A: GoPay → FAPI webhook nefunguje**

```
1. Zákazník zaplatí v GoPay ✅
2. GoPay má poslat webhook do FAPI ❌
3. FAPI nedostane info o platbě
4. Status zůstane "Čeká na platbu"
5. → Email se nikdy nepošle!

FIX: FAPI support musí zkontrolovat GoPay webhook URL
```

### **Scénář B: Email trigger není správně nastavený**

```
1. Platba je ZAPLACENO ✅
2. FAPI trigger "při zaplacení" nefunguje ❌
3. Email se nepošle

FIX: FAPI support musí zkontrolovat trigger nastavení
```

### **Scénář C: Emaily jdou do SPAM nebo blokuje provider**

```
1. Platba je ZAPLACENO ✅
2. Email se odešle ✅
3. Gmail/Seznam ho zablokuje jako spam ❌

FIX: Zkontroluj SPAM složku všech emailů!
```

---

## 🚨 **DOČASNÉ ŘEŠENÍ - NÁŠ WEBHOOK POSÍLÁ VŠECHNO:**

Zatímco čekáš na FAPI support, můžeme rozšířit náš webhook aby posílal i "fakturu":

**Current:**
```
NÁŠ WEBHOOK →
  ✅ Email s tokenem přístupu
  ❌ Faktura
```

**Upgrade:**
```
NÁŠ WEBHOOK →
  ✅ Email s tokenem přístupu
  ✅ Link na FAPI fakturu (stáhnout PDF)
  ✅ Nebo screenshot / inline faktura
```

**Chceš to?** Můžu to udělat za 5 minut! 🚀

---

## ✅ **CHECKLIST PŘED ODESLÁNÍM EMAILU:**

- [ ] Zkontroloval jsem SPAM složku (Gmail, Seznam)
- [ ] Zkontroloval jsem status faktury v FAPI (ZAPLACENO vs Čeká)
- [ ] Zjistil jsem ID obou produktů
- [ ] Udělal jsem screenshoty nastavení
- [ ] Připravil jsem přístupové údaje (pokud support bude chtít)
- [ ] Zkontroloval jsem že sada zpráv je skutečně AKTIVNÍ v formuláři

---

## 🎯 **DŮLEŽITÉ INFO PRO SUPPORT:**

Když ti support odpoví, říkej jim:

```
"Můj vlastní webhook FUNGUJE - dostávám invoice data po platbě.
To znamená že FAPI ví o zaplacení, ale automatické emaily se neposílají.

Je možné že trigger 'při zaplacení faktury' nefunguje pro GoPay platby?"
```

To je klíčová informace - webhook dostává data, takže FAPI o platbě VÍ!

---

**Pošli ten email a pak mi napiš co odpoví! Mezitím můžu upgradovat náš webhook aby posílal i fakturu.** 🚀
