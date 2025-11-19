# ⚠️ KRITICKÉ: FONT SIZE PRO ORGANIC POSTY!

## 🚨 PROBLÉM (Post #0):

**Fonty jsou MOC MALÉ!**
- Na mobilu je potřeba přibližovat
- Není to praktické pro social media
- Špatná user experience

---

## 📏 CO JSME POUŽILI (Post #0):

```tsx
// Header
text-2xl         // 24px - MOC MALÉ!
text-lg          // 18px - MOC MALÉ!

// Před/Po labels
text-xl          // 20px - MOC MALÉ!

// Text v kartách
text-xs          // 12px - EXTRÉMNĚ MALÉ!
text-sm          // 14px - MOC MALÉ!

// Emoji
text-3xl         // 30px - OK

// CTA
text-2xl         // 24px - MOC MALÉ!
```

---

## ✅ CO POUŽÍT PŘÍŠTĚ (MINIMÁLNĚ):

### Pro Social Media Posts (1080×1080):

```tsx
// HLAVNÍ NADPIS (Header)
text-4xl md:text-5xl       // 36-48px ✅
nebo text-5xl              // 48px ✅

// PODNADPIS
text-2xl md:text-3xl       // 24-30px ✅

// LABELS (PŘED, PO, kategorie)
text-2xl md:text-3xl       // 24-30px ✅

// TĚLO TEXTU (body copy)
text-xl md:text-2xl        // 20-24px ✅
nebo text-2xl              // 24px ✅

// MALÝ TEXT (metadata, labels)
text-base md:text-lg       // 16-18px ✅

// EMOJI (velké ikony)
text-5xl md:text-6xl       // 48-60px ✅

// CTA (call to action)
text-3xl md:text-4xl       // 30-36px ✅
nebo text-4xl              // 36px ✅

// URL
text-2xl md:text-3xl       // 24-30px ✅
```

---

## 🎯 ZLATÉ PRAVIDLO:

### Social Media = Mobil First!

**Lidé scrollují na mobilu bez zoomu:**
- ✅ Hlavní message musí být čitelná na první pohled
- ✅ Nic menšího než `text-base` (16px) pro důležitý text
- ✅ Preferuj `text-xl` a více (20px+) pro vše důležité
- ✅ `text-4xl`+ pro headings (36px+)

---

## 📐 REFERENCE SIZES:

```
text-xs   = 12px  ❌ NIKDY pro social posts
text-sm   = 14px  ❌ NIKDY pro social posts
text-base = 16px  ⚠️  Pouze metadata
text-lg   = 18px  ⚠️  Minimum pro body
text-xl   = 20px  ✅ Body text
text-2xl  = 24px  ✅ Subheading / body
text-3xl  = 30px  ✅ Heading
text-4xl  = 36px  ✅ Main heading
text-5xl  = 48px  ✅ Hero heading
text-6xl  = 60px  ✅ Big statement
```

---

## ✅ ZÍTRA (Post #1):

### "Co dělat PO kurzu?" - VĚTŠÍ FONTY!

**Minimální sizes:**
- Header: `text-4xl` nebo `text-5xl` (36-48px)
- Body: `text-xl` nebo `text-2xl` (20-24px)
- Labels: `text-2xl` (24px)
- CTA: `text-3xl` nebo `text-4xl` (30-36px)

---

## 🎨 TESTING CHECKLIST:

Před publikací KAŽDÉHO postu:

1. ✅ Otevři na MOBILU (ne desktop!)
2. ✅ Drž mobil na normální vzdálenost (~30cm)
3. ✅ Můžeš přečíst VŠE bez přibližování?
   - ❌ NE → fonty větší!
   - ✅ ANO → good to go!

---

## 🚨 REMEMBER:

**Social Media Post ≠ Web Page**

- Web page: můžeš scrollovat, zoomovat
- Social post: **3 sekundy attention** → musí být čitelné IHNED!

---

🔥 **ZÍTRA: 2X VĚTŠÍ PÍSMO!**
