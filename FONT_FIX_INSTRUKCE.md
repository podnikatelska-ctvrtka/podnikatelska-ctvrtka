# 🔧 OPRAVA FONTŮ - INSTRUKCE

## PROBLÉM:

OrderPage.tsx používá Tailwind classi které jsou ovlivněné `globals.css` → **špatná viditelnost textu**

Konkrétně:
- `text-yellow-300` na tmavém fialovém pozadí = **NEVIDITELNÉ!**
- `opacity-90` na bílém textu = **ŠPATNĚ ČITELNÉ!**
- Různé velikosti fontů bez konzistence

---

## ŘEŠENÍ:

Použít **OrderPageFinal.tsx** (který už má správnou strukturu a obsah) a opravit v něm POUZE fonty pomocí `style={{}}` atributů.

### Co opravit:

1. **Hero sekce (řádky 111-127):**
   ```tsx
   // ZMĚNIT Z:
   <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6 leading-tight font-black">
   
   // NA:
   <h1 style={{ fontSize: 'clamp(36px, 8vw, 64px)', lineHeight: '1.15', fontWeight: '900', color: '#ffffff', marginBottom: '24px' }}>
   ```

2. **Highlight box (řádky 254-259):**
   ```tsx
   // ZMĚNIT Z:
   <p className="text-2xl md:text-3xl lg:text-4xl mb-4 font-black">
     90 minut práce = <span className="text-yellow-300">konec chaosu</span>
   </p>
   <p className="text-lg md:text-xl opacity-90">
   
   // NA:
   <p style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: '900', color: '#ffffff', marginBottom: '16px' }}>
     90 minut práce = <span style={{ color: '#ffffff', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>konec chaosu</span>
   </p>
   <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', color: '#ffffff', fontWeight: '500' }}>
   ```

3. **Problem cards (řádky 155-244):**
   ```tsx
   // ZMĚNIT Z:
   <p className="text-gray-800 mb-2 text-lg">
   <p className="text-sm text-gray-600 mb-4 italic">
   <p className="text-green-700 text-base">
   
   // NA:
   <p style={{ fontSize: '18px', color: '#1f2937', marginBottom: '8px', fontWeight: '500' }}>
   <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '16px', fontStyle: 'italic' }}>
   <p style={{ fontSize: '16px', color: '#047857' }}>
   ```

4. **Section titles:**
   ```tsx
   // ZMĚNIT Z:
   <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8">
   
   // NA:
   <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: '900', color: '#111827', marginBottom: '32px' }}>
   ```

5. **Feature cards (řádky 293-350):**
   ```tsx
   // ZMĚNIT Z:
   <h3 className="text-xl mb-3 font-black">
   <p className="text-gray-700 mb-3">
   <p className="text-sm text-indigo-600">
   
   // NA:
   <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', marginBottom: '12px' }}>
   <p style={{ fontSize: '16px', color: '#374151', marginBottom: '12px' }}>
   <p style={{ fontSize: '14px', color: '#4f46e5' }}>
   ```

6. **FAQ (řádky 434-491):**
   ```tsx
   // ZMĚNIT Z:
   <h3 className="text-lg mb-2">
   <p className="text-gray-700">
   
   // NA:
   <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
   <p style={{ fontSize: '16px', color: '#374151' }}>
   ```

---

## POSTUP:

1. ✅ Smazat `/components/OrderPageClean.tsx`
2. ⏳ Zkopírovat `/components/OrderPageFinal.tsx` → `/components/OrderPage.tsx`
3. ⏳ V `/components/OrderPage.tsx` nahradit VŠECHNY Tailwind font classi za inline `style={{}}`
4. ⏳ Zkontrolovat viditelnost:
   - Bílý text na tmavém pozadí
   - Tmavý text na světlém pozadí
   - Žádné `text-yellow-300` na fialovém!

---

## DŮLEŽITÉ:

- **NEMĚNIT STRUKTURU!** Jen fonty!
- **NEMAZAT OBSAH!** Všech 6 problem cards zůstává!
- **NEMĚNIT BARVY POZADÍ!** Jen font colors!
- **POUŽÍT INLINE STYLES** - ne Tailwind classi pro texty!

---

## KONTROLA:

Po opravě zkontroluj:
- [ ] Hero title je VIDITELNÝ (bílý na tmavém)
- [ ] "90 minut práce = konec chaosu" je VIDITELNÉ (bílé obojí)
- [ ] "Žádná teorie..." je VIDITELNÉ (bílé)
- [ ] Problem cards mají čitelný text (tmavý na světlém)
- [ ] FAQ je čitelné
- [ ] Všech 6 problem cards je na místě
- [ ] Struktura stejná jako OrderPageFinal.tsx
