// 🚀 ULTIMATE 13 ADS - FINÁLNÍ PORTFOLIO PRO LAUNCH
// 8 COLD ADS + 5 WARM ADS (různé úhly pohledu)
// Vybrané nejlepší reklamy z celého projektu + nové warm varianty

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame, Snowflake, Download } from 'lucide-react';
import { toast } from 'sonner';

interface AdData {
  id: string;
  name: string;
  type: 'cold' | 'warm';
  category: string;
  budget: string;
  trigger: string;
  background: string;
  content: React.ReactNode;
  copy: {
    primary: string;
    headline: string;
    cta: string;
  };
}

const ultimate13Ads: AdData[] = [
  // ========================================
  // 🥶 COLD ADS (8) - Pro cold traffic
  // ========================================

  // COLD #1: PŘED/PO - Transformation
  {
    id: 'before-after',
    name: 'Cold #1: PŘED/PO',
    type: 'cold',
    category: 'Transformation • Concrete results',
    budget: '70 Kč/den',
    trigger: 'Desire • Visual contrast • Relatability',
    background: 'linear-gradient(135deg, #1e40af 0%, #6366f1 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <h1 className="text-6xl font-black text-white mb-8 leading-tight">
          Před Čtvrtkou → <span className="text-yellow-300">Po Čtvrtce</span>
        </h1>
        
        <div className="bg-white/95 rounded-2xl p-8 mb-6 max-w-4xl w-full">
          <div className="space-y-5">
            <div className="flex items-start gap-6 pb-4 border-b-2 border-gray-200">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Nevím, komu přesně prodávám</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🎯</span>
                  <span className="text-blue-700 font-bold text-xl">Vím, kdo je můj ideální zákazník</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6 pb-4 border-b-2 border-gray-200">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Reklamy jen žerou peníze</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">💎</span>
                  <span className="text-blue-700 font-bold text-xl">Vím, co skutečně testovat první</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6 pb-4 border-b-2 border-gray-200">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Bojím se marketingu</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🚀</span>
                  <span className="text-blue-700 font-bold text-xl">Rozumím, jak oslovit zákazníky</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Nevím, jak zvýšit zisky</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📈</span>
                  <span className="text-blue-700 font-bold text-xl">Vidím nové možnosti růstu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-14 py-6 mb-6">
          <p className="text-5xl font-black mb-2">90 MINUT</p>
          <p className="text-2xl font-bold">= celý byznys jasně</p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI TO TAKY! →</p>
        </div>

        <p className="text-white text-2xl font-bold">
          🔥 Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `PŘED ČTVRTKOU → PO ČTVRTCE

PŘED:
❌ Nevím, komu přesně prodávám
❌ Reklamy jen žerou peníze
❌ Bojím se marketingu
❌ Nevím, jak zvýšit zisky

PO:
✅ Vím, kdo je můj ideální zákazník
✅ Vím, co skutečně testovat první
✅ Rozumím, jak oslovit zákazníky
✅ Vidím nové možnosti růstu

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO SE STALO?

90 MINUT = CELÝ BYZNYS JASNĚ

PODNIKATELSKÁ ČTVRTKA
Model podnikání + FIT Validátor

První v ČR. Poprvé v češtině.

🔥 Prvních 50 lidí • Sleva 40%`,
      headline: 'Z chaosu do jasna za 90 minut',
      cta: 'Chci to taky'
    }
  },

  // COLD #2: PRAVDA (modrá) - Anti-guru
  {
    id: 'truth-blue',
    name: 'Cold #2: PRAVDA',
    type: 'cold',
    category: 'Anti-Guru • Kontrast',
    budget: '80 Kč/den',
    trigger: 'Authenticity • Problem agitation • Contrast',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-red-600 text-white px-10 py-4 rounded-lg mb-6 shadow-lg">
          <p className="text-3xl font-black">
            ⚠️ PRAVDA, KTEROU NIKDO NEŘEKNE
          </p>
        </div>

        <h1 className="text-6xl font-black text-white mb-8 leading-tight drop-shadow-lg">
          V Česku žádná<br/>
          <span className="text-red-400">REÁLNÁ POMOC</span><br/>
          podnikatelům není.
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-white/30">
          <div className="space-y-4 text-left">
            <p className="text-2xl">
              <span style={{ color: '#ffffff' }}>✅ <span className="font-bold">Guru kurzy?</span> Máme.</span> <span style={{ color: '#e5e5e5' }}>(50 hodin teorie, nula praxe)</span>
            </p>
            <p className="text-2xl">
              <span style={{ color: '#ffffff' }}>✅ <span className="font-bold">FB marketing experti?</span> Máme.</span> <span style={{ color: '#e5e5e5' }}>(Každý umí reklamu. Nikdo byznys.)</span>
            </p>
            <p className="text-2xl">
              <span style={{ color: '#ffffff' }}>✅ <span className="font-bold">Online konzultanti?</span> Máme.</span> <span style={{ color: '#e5e5e5' }}>(Obecné rady)</span>
            </p>
            <p className="text-3xl font-black mt-6" style={{ color: '#fbbf24' }}>
              ❌ KONKRÉTNÍ METODA? NIKDE.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black rounded-xl px-10 py-6 mb-7 shadow-lg">
          <p className="text-4xl font-black mb-2">
            TAK JSME TO VYTVOŘILI.
          </p>
          <p className="text-2xl font-bold">
            Funkční systém • Konečně realita • Bez keců
          </p>
        </div>

        <div className="mb-7">
          <p className="text-5xl font-black text-white mb-3">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-2xl text-gray-300">
            Celý byznys model • 90 minut • Hotovo
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI VIDĚT! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          🔥 Jenom 50 lidí • Průkopnická cena • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `V ČESKU ŽÁDNÁ REÁLNÁ POMOC NENÍ.

Guru kurzy? ✅ Máme. (50 hodin teorie)
FB marketing experti? ✅ Máme. (Každý umí reklamu. Nikdo byznys.)
Konzultanti? ✅ Máme. (Obecné rady)

KONKRÉTNÍ METODA? ❌ NIKDE.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

TAK JSME TO VYTVOŘILI.

PODNIKATELSKÁ ČTVRTKA = funkční systém.

Celý byznys model.
90 minut práce.
Hotový plán + strategie.

Bez teorií. Bez keců. Bez čekání.

🔥 JENOM 50 LIDÍ
→ Průkopnická cena
→ Sleva 40% navždy

⏰ Není čas na váhání.`,
      headline: 'Funkční systém • Konečně realita',
      cta: 'Chci vidět'
    }
  },

  // COLD #3: QUICK RESULTS (ZA 90 MINUT)
  {
    id: 'quick-results',
    name: 'Cold #3: QUICK RESULTS',
    type: 'cold',
    category: 'Speed • Urgence • Quick wins',
    budget: '85 Kč/den',
    trigger: 'Speed • Instant gratification • FOMO',
    background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12 py-8">
        <div className="text-8xl mb-4">⚡</div>

        <h1 className="text-7xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          <span className="text-orange-300">ZA 90 MINUT</span><br/>
          MÁŠ JASNO
        </h1>

        <p className="text-3xl text-gray-300 mb-7">
          Ne za 3 měsíce. Ne za týden.<br/>
          <span className="font-black text-white">Dnes.</span>
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-4xl w-full">
          <div className="space-y-3 text-left">
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-2xl font-black text-green-700 mb-1">✅ VÍŠ KOMU PRODÁVAT</p>
              <p className="text-base text-gray-700">
                Víš přesně komu co nabízet.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-2xl font-black text-blue-700 mb-1">✅ VÍŠ CO NABÍZET</p>
              <p className="text-base text-gray-700">
                Nabízíš hodnotu, ne produkt. Víš proč si tě vyberou.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="text-2xl font-black text-purple-700 mb-1">✅ VÍŠ JAK NA MARKETING</p>
              <p className="text-base text-gray-700">
                Víš jak oslovit zákazníky a co jim nabídnout.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-2xl font-black text-orange-700 mb-1">✅ MÁŠ AKČNÍ PLÁN</p>
              <p className="text-base text-gray-700">
                Ne teorie. Konkrétní kroky. Hned zítra.
              </p>
            </div>

            <div className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-lg p-5 border-2 border-rose-500 mt-4">
              <p className="text-3xl font-black text-rose-700">
                Z CHAOSU DO AKCE
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose-600 to-orange-600 text-white rounded-xl px-10 py-6 mb-5 shadow-xl">
          <p className="text-5xl font-black mb-2">
            MÁŠ PLÁN. MÁŠ SMĚR.
          </p>
          <p className="text-2xl">
            Okamžitě víš co dělat • Už zítra můžeš začít
          </p>
        </div>

        <div className="bg-white text-black px-16 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI JASNO →</p>
        </div>

        <p className="text-orange-200 text-2xl font-bold">
          ⚡ 90 minut • Hotový plán • 4.999 Kč
        </p>
      </div>
    ),
    copy: {
      primary: `ZA 90 MINUT MÁŠ JASNO.

Ne za 3 měsíce. Ne za týden. Dnes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ VÍŠ KOMU PRODÁVAT
→ Víš přesně komu co nabízet.

✅ VÍŠ CO NABÍZET
→ Nabízíš hodnotu, ne produkt. Víš proč si tě vyberou.

✅ VÍŠ JAK NA MARKETING
→ Víš jak oslovit zákazníky a co jim nabídnout.

✅ MÁŠ AKČNÍ PLÁN
→ Ne teorie. Konkrétní kroky. Hned zítra.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Z CHAOSU DO AKCE

PODNIKATELSKÁ ČTVRTKA
Model podnikání + FIT Validátor
Prvních 50 • Sleva 40%

⚡ 90 minut • Hotový plán • 4.999 Kč`,
      headline: 'Za 90 minut máš jasno',
      cta: 'Chci jasno'
    }
  },

  // COLD #4: MATRIX - Wake up call (UPRAVENÉ BOXY!)
  {
    id: 'matrix',
    name: 'Cold #4: MATRIX',
    type: 'cold',
    category: 'Volba • Wake up call',
    budget: '75 Kč/den',
    trigger: 'Choice • Contrast • Authority',
    background: 'linear-gradient(135deg, #001a00 0%, #003300 50%, #000000 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <p className="text-3xl font-bold mb-4" style={{ color: '#22c55e', textShadow: '0 0 10px rgba(34, 197, 94, 0.8), 2px 2px 4px rgba(0,0,0,0.9)' }}>
          ⚡ WAKE UP CALL
        </p>

        <h1 className="text-6xl font-black text-white mb-3 leading-tight drop-shadow-lg">
          Dvě pilulky.<br/>
          Jedna volba.
        </h1>

        <p className="text-2xl text-gray-300 mb-5">
          Zůstaneš v iluzi nebo MÁŠ JASNO?
        </p>

        <div className="grid grid-cols-2 gap-4 mb-5 max-w-4xl w-full">
          {/* Modrá pilulka */}
          <div className="bg-blue-900/70 rounded-xl p-4 border-3 border-blue-500 shadow-xl">
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 text-4xl shadow-lg">
              💊
            </div>
            <p className="text-2xl font-black mb-3" style={{ color: '#93c5fd' }}>
              MODRÁ PILULKA
            </p>
            <div className="space-y-2 text-left">
              <p className="text-lg" style={{ color: '#d1d5db' }}>
                ✓ Online kurz (30h videí, žádná akce)
              </p>
              <p className="text-lg" style={{ color: '#d1d5db' }}>
                ✓ "Zkusím to sám" (6 měsíců ztraceného času)
              </p>
              <p className="text-lg" style={{ color: '#d1d5db' }}>
                ✓ Marketingová agentura (bez strategie)
              </p>
              <p className="text-lg font-bold" style={{ color: '#fb923c' }}>
                ✓ Nic nedělat (chaos pokračuje)
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-400">
              <p className="text-xl font-bold" style={{ color: '#bfdbfe' }}>
                Čas: 3-6 měsíců
              </p>
              <p className="text-base mt-1" style={{ color: '#93c5fd' }}>
                Výsledek: Nejasný
              </p>
            </div>
          </div>

          {/* Červená pilulka */}
          <div className="bg-red-900/70 rounded-xl p-4 border-3 border-red-500 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 text-4xl shadow-lg border-3 border-red-500">
                💊
              </div>
              <p className="text-2xl font-black mb-3" style={{ color: '#fca5a5' }}>
                ČERVENÁ PILULKA
              </p>
              <div className="space-y-2 text-left">
                <p className="text-lg font-bold" style={{ color: '#ffffff' }}>
                  ✓ Kompletní byznys strategie
                </p>
                <p className="text-lg font-bold" style={{ color: '#fbbf24' }}>
                  ✓ Plán za 90 minut
                </p>
                <p className="text-lg font-bold" style={{ color: '#fbbf24' }}>
                  ✓ Víš co dělat zítra
                </p>
                <p className="text-lg font-bold" style={{ color: '#fbbf24' }}>
                  ✓ Byznys vidíš jasně
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-red-400">
                <p className="text-xl font-black" style={{ color: '#fbbf24' }}>
                  Čas: 90 minut
                </p>
                <p className="text-base mt-1 font-bold" style={{ color: '#fca5a5' }}>
                  Výsledek: Hotový plán
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/70 to-emerald-900/70 rounded-xl p-4 mb-4 max-w-3xl w-full border-2 border-green-500">
          <p className="text-2xl font-bold mb-2" style={{ color: '#22c55e' }}>
            Co dostaneš s ČERVENOU:
          </p>
          <div className="space-y-1 text-left text-lg">
            <p style={{ color: '#ffffff' }}>📊 <span className="font-bold">Model podnikání</span> <span style={{ color: '#d1d5db' }}>• Celý model na jedné čtvrtce</span></p>
            <p style={{ color: '#ffffff' }}>💎 <span className="font-bold">FIT Validátor</span> <span style={{ color: '#d1d5db' }}>• Marketing</span></p>
            <p style={{ color: '#ffffff' }}>🎯 <span className="font-bold">Jasný akční plán</span> <span style={{ color: '#d1d5db' }}>• Víš co dělat</span></p>
          </div>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4 border-4 border-red-500">
          <p className="text-4xl font-black">BERU ČERVENOU! →</p>
        </div>

        <p className="text-xl font-bold" style={{ color: '#22c55e', textShadow: '0 0 10px rgba(34, 197, 94, 0.8), 2px 2px 4px rgba(0,0,0,0.9)' }}>
          ⚡ Prvních 50 • Průkopnická cena • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `⚡ WAKE UP CALL

Dvě pilulky. Jedna volba.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💊 MODRÁ PILULKA:
→ Guru kurz (50 hodin teorie)
→ "Zkusím to sám" (další 6 měsíců)
→ Agentura (30-60k investice)

ČAS: 3-6 měsíců
VÝSLEDEK: Nejasný

━━━━━━━━━━━━━━━━━━━━━━━━━━━

���� ČERVENÁ PILULKA:
→ Vědecké nástroje (CZ PREMIÉRA)
→ Hotový plán za 90 minut
→ Víš co dělat zítra

ČAS: 90 minut
VÝSLEDEK: Hotový plán

⚡ První 50 • Sleva 40%`,
      headline: 'Modrá nebo červená?',
      cta: 'Beru červenou'
    }
  },

  // COLD #5: OPERATIVA (Topíš se)
  {
    id: 'operational-chaos',
    name: 'Cold #5: OPERATIVA',
    type: 'cold',
    category: 'Pain point • Empatie • Operativní chaos',
    budget: '75 Kč/den',
    trigger: 'Burnout • Overwhelm • Hope',
    background: 'linear-gradient(135deg, #78716c 0%, #57534e 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-10 py-8">
        <div className="text-7xl mb-4">😵</div>

        <h1 className="text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          TOPÍŠ SE<br/>
          <span className="text-stone-300">V OPERATIVĚ?</span>
        </h1>

        <div className="bg-white/95 rounded-2xl p-6 mb-4 max-w-4xl w-full">
          <p className="text-3xl font-black text-gray-900 mb-4">
            Celý den řešíš:
          </p>
          
          <div className="space-y-2 text-left">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-2xl font-bold text-gray-800">📄 Faktury, účetnictví</p>
              <p className="text-base text-gray-600 mt-1">3 hodiny denně s čísly</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-2xl font-bold text-gray-800">📦 Dodavatelé, objednávky</p>
              <p className="text-base text-gray-600 mt-1">Telefonáty a emaily</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
              <p className="text-2xl font-bold text-gray-800">🔧 Výroba, služby</p>
              <p className="text-base text-gray-600 mt-1">Musíš to dělat sám/sama</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-2xl font-bold text-gray-800">📱 Marketing, weby...</p>
              <p className="text-base text-gray-600 mt-1">"Měl/a bych, ale kdy?"</p>
            </div>

            <div className="bg-red-100 rounded-lg p-5 border-2 border-red-500 mt-3">
              <p className="text-2xl font-black text-red-700 mb-2">
                Výsledek?
              </p>
              <p className="text-lg text-gray-800">
                Pracuješ 12h/den.<br/>
                Ale byznys neroste.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-10 py-5 mb-4 border-2 border-white/30">
          <p className="text-4xl font-black mb-2 text-emerald-400">
            💡 CO KDYBY...
          </p>
          <p className="text-2xl mb-2 leading-relaxed text-white">
            Věděl/a bys <span className="text-yellow-300 font-black text-3xl">NA CO SE ZAMĚŘIT?</span>
          </p>
          <div className="text-left text-xl space-y-1 text-gray-200">
            <p>✓ Co je důležité PRO RŮST</p>
            <p>✓ Co je jen "běžná operativa"</p>
            <p>✓ Kam investovat čas</p>
            <p className="text-yellow-300 font-bold">✓ Přestaň ztrácet čas na kraviny</p>
          </div>
        </div>

        <div className="bg-white text-black px-14 py-5 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI PRIORITY →</p>
        </div>

        <p className="text-stone-300 text-xl font-bold mb-2">
          🎯 Interaktivní byznys model • 90 minut • 4.999 Kč
        </p>
      </div>
    ),
    copy: {
      primary: `TOPÍŠ SE V OPERATIVĚ?

Celý den řešíš:

📄 Faktury, účetnictví
→ 3 hodiny denně s čísly

📦 Dodavatelé, objednávky
→ Telefonáty a emaily

🔧 Výroba, služby
→ Musíš to dělat sám/sama

📱 Marketing, weby...
→ "Měl/a bych, ale kdy?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━

VÝSLEDEK?
Pracuješ 12h/den. Ale byznys neroste.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 CO KDYBY...

Věděl/a bys NA CO SE ZAMĚŘIT?

✓ Co je důležité PRO RŮST
✓ Co je jen "běžná operativa"
✓ Kam investovat čas
✓ Přestaň ztrácet čas na kraviny

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA
Interaktivní byznys model • 90 minut • 4.999 Kč

🎯 Víš co dělat • Prvních 50 míst`,
      headline: 'Topíš se v operativě?',
      cta: 'Chci priority'
    }
  },

  // COLD #6: DENNÍ ZTRÁTY - Huge pain (s konkrétními čísly!)
  {
    id: 'daily-loss',
    name: 'Cold #6: DENNÍ ZTRÁTY',
    type: 'cold',
    category: 'Loss aversion • Pain • Hope',
    budget: '85 Kč/den',
    trigger: 'Loss aversion • Pain agitation • Hope',
    background: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-10 py-3">
        <div className="text-8xl mb-3">💸</div>

        <h1 className="text-7xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          KAŽDÝ DEN<br/>
          <span className="text-red-300">ZTRÁCÍŠ PENÍZE</span>
        </h1>

        <p className="text-3xl text-gray-300 mb-5">
          A ani to nevíš.
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-4 max-w-4xl w-full">
          <p className="text-3xl font-black text-gray-900 mb-4">
            Bez jasné strategie:
          </p>
          
          <div className="space-y-2 text-left">
            <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-500">
              <p className="text-3xl font-bold text-red-600">-1.500 Kč/den</p>
              <p className="text-base text-gray-600 mt-1">Nevíš komu prodávat = prázdno</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-3 border-l-4 border-yellow-500">
              <p className="text-3xl font-bold text-yellow-700">-600 Kč/den</p>
              <p className="text-base text-gray-600 mt-1">Prodáváš levně = málo marže</p>
            </div>

            <div className="h-px bg-gray-300 my-2"></div>

            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-5 border-l-4 border-red-800">
              <p className="text-3xl font-black text-white mb-2">
                ⏰ NEJVĚTŠÍ ZTRÁTA?
              </p>
              <p className="text-lg font-bold text-yellow-300">
                Čas běží • Příležitosti mizí • Stojíš na místě
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-10 py-5 mb-4 border-2 border-white/30">
          <p className="text-4xl font-black mb-2 text-green-400">
            💡 CO KDYBY...
          </p>
          <p className="text-2xl mb-2 leading-relaxed text-white">
            Za 90 minut měl/a<br/>
            <span className="text-yellow-300 font-black text-3xl">INTERAKTIVNÍ PLÁN</span>
          </p>
          <p className="text-xl leading-relaxed text-gray-200">
            ✓ Víš komu prodávat<br/>
            ✓ Víš jak na marketing<br/>
            ✓ Máš jasné ceny<br/>
            <span className="text-yellow-300 font-bold">✓ Přestaneš ztrácet peníze</span>
          </p>
        </div>

        <div className="bg-white text-black px-14 py-5 rounded-xl shadow-2xl mb-3">
          <p className="text-4xl font-black">STOP ZTRÁTÁM! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          ⏰ 90 minut • 4.999 Kč • Aplikuj okamžitě!
        </p>
      </div>
    ),
    copy: {
      primary: `KAŽDÝ DEN ZTRÁCÍŠ PENÍZE.

A ani to nevíš.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEZ JASNÉ STRATEGIE:

💸 -1.500 Kč/den → Nevíš komu prodávat = prázdno
💸 -600 Kč/den → Prodáváš levn�� = málo marže

⏰ Nevyčíslitelná ztráta/den:
→ Čas běží • Příležitosti mizí • Stojíš na místě

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 CO KDYBY...

Za 90 minut měl/a INTERAKTIVNÍ PLÁN:

✓ Víš komu prodávat
✓ Víš jak na marketing
✓ Máš jasné ceny
✓ Přestaneš ztrácet peníze

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA
90 minut • 4.999 Kč • Návratnost: 2 dny

⏰ Prvních 50 • Každý den počítá`,
      headline: 'Každý den ztrácíš peníze',
      cta: 'Stop ztrátám'
    }
  },

  // COLD #7: ZA 2 TÝDNY NÁJEM (ZDŮRAZNĚNO "PODNIKÁŠ NA SLEPO")
  {
    id: 'rent-pressure',
    name: 'Cold #7: ZA 2 TÝDNY NÁJEM',
    type: 'cold',
    category: 'Financial urgence • Stress • Reality check',
    budget: '80 Kč/den',
    trigger: 'Financial pressure • Fear • Urgence',
    background: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12 py-8">
        <div className="text-8xl mb-4">🏢</div>

        <h1 className="text-7xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          ZA 2 TÝDNY<br/>
          <span className="text-orange-300">PLATÍŠ NÁJEM</span>
        </h1>

        <p className="text-4xl text-gray-300 mb-7 font-bold">
          Odkud se ty peníze vezmou?
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-4xl w-full">
          <p className="text-3xl font-black text-gray-900 mb-4">
            Nevíš, protože:
          </p>
          
          <div className="space-y-3 text-left">
            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-xl font-bold text-gray-800">❌ Nevíš, komu prodávat</p>
              <p className="text-base text-gray-600">
                "Zkusím všechny. Něco už se chytí."
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-xl font-bold text-gray-800">❌ Nevíš, co funguje</p>
              <p className="text-base text-gray-600">
                "Dám tam reklamu. Uvidíme."
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-xl font-bold text-gray-800">❌ Nevíš, kde jsou příležitosti</p>
              <p className="text-base text-gray-600">
                Kde vydělat víc? Co dalšího prodat?
              </p>
            </div>

            <div className="bg-red-600 text-white rounded-lg p-5 border-2 border-red-700 mt-4">
              <p className="text-4xl font-black mb-2">
                PODNIKÁŠ NA SLEPO
              </p>
              <p className="text-2xl">
                A nájem přijde za 14 dní.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl px-10 py-6 mb-5 shadow-xl border-2 border-blue-400">
          <p className="text-5xl font-black mb-3">
            90 MINUT = JASNO
          </p>
          <p className="text-2xl leading-relaxed">
            Víš komu • Víš jak • Víš kde jsou peníze<br/>
            <span className="text-cyan-300 font-bold">Přestaneš podnikat NA SLEPO</span>
          </p>
        </div>

        <div className="bg-white text-black px-16 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI JASNO! →</p>
        </div>

        <p className="text-orange-300 text-2xl font-bold">
          ⚡ 90 minut • 4.999 Kč • Prvních 50 míst
        </p>
      </div>
    ),
    copy: {
      primary: `ZA 2 TÝDNY PLATÍŠ NÁJEM.

Odkud se ty peníze vezmou?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEVÍŠ, PROTOŽE:

❌ Nevíš, komu prodávat
→ "Zkusím všechny. Něco už se chytí."

❌ Nevíš, co funguje
→ "Dám tam reklamu. Uvidíme."

❌ Nevíš, kde jsou příležitosti
→ Revenue streams? Cross-sell? Upsell?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

= PODNIKÁŠ NA SLEPO

A nájem přijde za 14 dní.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

90 MINUT = JASNO

✓ Víš komu
✓ Víš jak
✓ Víš kde jsou peníze
✓ Přestaneš podnikat NA SLEPO

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA
90 minut • 4.999 Kč

⚡ Přestaň podnikat naslepo • Prvních 50`,
      headline: 'Za 2 týdny platíš nájem',
      cta: 'Chci jasno'
    }
  },

  // COLD #8: SHOCKING STAT 83%
  {
    id: 'shocking-stat',
    name: 'Cold #8: SHOCKING STAT 83%',
    type: 'cold',
    category: 'Statistics • Fear • Urgence',
    budget: '90 Kč/den',
    trigger: 'Social Proof • Fear of Missing Out • Authority',
    background: 'linear-gradient(135deg, #581c87 0%, #a855f7 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12 py-8">
        <div className="text-8xl mb-4">📊</div>

        <h1 className="text-7xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          <span className="text-purple-300">83%</span> PODNIKATELŮ<br/>
          NEMÁ BYZNYS PLÁN
        </h1>

        <p className="text-3xl text-gray-300 mb-7">
          Přežívají. Nebo krachují.
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-4xl w-full">
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-600">
              <p className="text-2xl font-black text-red-700 mb-2">
                83% = BEZ PLÁNU
              </p>
              <div className="text-left text-lg text-gray-700 space-y-1">
                <p>❌ Nevědí, komu přesně prodávat</p>
                <p>❌ Nevědí, jak získat zákazníky</p>
                <p>❌ Nevědí, kde jsou peníze</p>
                <p>❌ Podnikají "od oka"</p>
              </div>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
              <p className="text-2xl font-black text-green-700 mb-2">
                17% = S PLÁNEM
              </p>
              <div className="text-left text-lg text-gray-700 space-y-1">
                <p>✅ Vědí přesně, komu prodávat</p>
                <p>✅ Vědí, jak zákazníky získat</p>
                <p>✅ Vědí, odkud plynou peníze</p>
                <p>✅ Rostou systematicky</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl px-10 py-6 mb-5 shadow-xl">
          <p className="text-4xl font-black mb-2">
            VE KTERÝCH % CHCEŠ BÝT?
          </p>
          <p className="text-2xl">
            Podnikatelská Čtvrtka • 90 minut • Hotovo
          </p>
        </div>

        <div className="bg-white text-black px-16 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI BÝT VE 17%! →</p>
        </div>

        <p className="text-purple-300 text-2xl font-bold">
          🎯 Prvních 50 míst • 4.999 Kč
        </p>
      </div>
    ),
    copy: {
      primary: `83% PODNIKATELŮ NEMÁ BYZNYS PLÁN.

Přežívají. Nebo krachují.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

83% = BEZ PLÁNU

❌ Nevědí, komu přesně prodávat
❌ Nevědí, jak získat zákazníky
❌ Nevědí, kde jsou peníze
❌ Podnikají "od oka"

━━━━━━━━━━━━━━━━━━━━���━��━━━━

17% = S PLÁNEM

✅ Vědí přesně, komu prodávat
✅ Vědí, jak zákazníky získat
✅ Vědí, odkud plynou peníze
✅ Rostou systematicky

━━━━━━━���━━━━━━━━━━━━━━━━━━━

V KTERÝCH % CHCEŠ BÝT?

PODNIKATELSKÁ ČTVRTKA
Business Model Canvas + Value Proposition Canvas
90 minut práce
Hotový byznys plán

Investice: 4.999 Kč
Čas: 90 minut

🎯 Prvních 50 míst`,
      headline: 'V kterých % jsi?',
      cta: 'Chci být v 17%'
    }
  },

  // ========================================
  // 🔥 WARM ADS (2) - Pro retargeting/warm
  // ========================================

  // WARM #1: SOCIAL PROOF 152 podnikatelů
  {
    id: 'social-proof-152',
    name: 'Warm #1: SOCIAL PROOF 152',
    type: 'warm',
    category: 'Social proof • FOMO • Bandwagon',
    budget: '50 Kč/den (warm)',
    trigger: 'FOMO • Bandwagon • Social Validation',
    background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-white text-green-600 px-10 py-4 rounded-xl mb-5 shadow-2xl border-4 border-green-500">
          <p className="text-7xl font-black">
            152
          </p>
        </div>

        <h1 className="text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          podnikatelů<br/>
          <span className="text-green-300">UŽ MÁ JASNO</span>
        </h1>

        <p className="text-3xl text-gray-300 mb-5">
          Ty pořád čekáš?
        </p>

        <div className="bg-white/95 rounded-2xl p-5 mb-4 max-w-3xl w-full">
          <p className="text-xl font-black text-gray-900 mb-3">
            Co už mají:
          </p>
          
          <div className="space-y-3 text-left">
            <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-600">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">✓</span>
                <p className="text-lg font-bold text-gray-900">Jasný zákaznický segment</p>
              </div>
              <p className="text-sm text-gray-600 pl-8">
                Vědí, komu přesně prodávat. Ne všem. Správným zákazníkům.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-600">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">✓</span>
                <p className="text-lg font-bold text-gray-900">Jasný marketing</p>
              </div>
              <p className="text-sm text-gray-600 pl-8">
                Vědí, co říkat. Jak oslovit. Proč si je vybrat.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-600">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">✓</span>
                <p className="text-lg font-bold text-gray-900">Jasný model příjmů</p>
              </div>
              <p className="text-sm text-gray-600 pl-8">
                Vědí, odkud plynou peníze. A jak vydělat víc.
              </p>
            </div>

            <div className="h-px bg-gray-300 my-2"></div>

            <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-500">
              <p className="text-base font-bold text-gray-900 mb-1">
                📊 Průměrný čas do akce:
              </p>
              <p className="text-2xl font-black text-blue-700">
                2,4 dne
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Od Čtvrtky k prvnímu kroku.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 max-w-3xl w-full border-2 border-white/30">
          <p className="text-xl font-black text-white mb-2">
            TY POŘÁD:
          </p>
          <div className="space-y-1 text-left text-base">
            <p className="text-gray-300">❓ Nevíš komu prodávat</p>
            <p className="text-gray-300">❓ Nevíš jak marketingovat</p>
            <p className="text-gray-300">❓ Nevíš kde jsou peníze</p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-8 py-4 mb-4 shadow-xl">
          <p className="text-2xl font-black mb-1">
            PŘIPOJ SE K NIM
          </p>
          <p className="text-lg">
            Podnikatelská Čtvrtka • 4.999 Kč • 90 minut
          </p>
        </div>

        <div className="bg-white text-black px-14 py-5 rounded-xl shadow-2xl mb-3">
          <p className="text-4xl font-black">CHCI JASNO! →</p>
        </div>

        <p className="text-yellow-300 text-lg font-bold">
          🔥 Zbývá 50 míst • Nebuď poslední
        </p>
      </div>
    ),
    copy: {
      primary: `152 PODNIKATELŮ UŽ MÁ JASNO.

Ty pořád čekáš?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO UŽ MAJÍ:

✓ Jasný zákaznický segment
→ Vědí, komu přesně prodávat.

✓ Jasný marketing
→ Vědí, co říkat. Jak oslovit.

✓ Jasný revenue model
→ Vědí, odkud plynou peníze.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 PRŮMĚRNÝ ČAS DO AKCE: 2,4 dne
→ Od Čtvrtky k prvnímu kroku.

━━━━━━━���━━━━━━━━━━━━━━━━━━━

TY POŘÁD:

❓ Nevíš komu prodávat
❓ Neví�� jak marketingovat
❓ Nevíš kde jsou peníze

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PŘIPOJ SE K NIM.

PODNIKATELSKÁ ČTVRTKA

Model podnikání + FIT Validátor.
90 minut práce.
Hotový plán.

Investice: 4.999 Kč

🔥 Zbývá 50 míst • Nebuď poslední`,
      headline: '152 už má jasno. Ty?',
      cta: 'Chci jasno'
    }
  },

  // WARM #2: SCARCITY - Zbývá 23 míst
  {
    id: 'scarcity-23',
    name: 'Warm #2: SCARCITY',
    type: 'warm',
    category: 'Scarcity • FOMO • Urgence',
    budget: '60 Kč/den (warm)',
    trigger: 'Scarcity • FOMO • Time pressure',
    background: 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-white text-red-600 px-10 py-5 rounded-xl mb-5 shadow-2xl border-4 border-red-500">
          <p className="text-8xl font-black">
            23
          </p>
        </div>

        <h1 className="text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          ZBÝVÁ<br/>
          <span className="text-yellow-300">23 MÍST</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-6">
          Z 50 průkopníků.<br/>
          Pak cena nahoru.
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-4">
            Co ztratíš, když počkáš:
          </p>
          
          <div className="space-y-3 text-left">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-xl font-bold text-gray-900 mb-1">
                💸 Slevu 40%
              </p>
              <p className="text-base text-gray-600">
                = 3.300 Kč navíc zaplatíš
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-xl font-bold text-gray-900 mb-1">
                🎯 Průkopnickou cenu
              </p>
              <p className="text-base text-gray-600">
                Prvních 50 platí nejméně. Navždy.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
              <p className="text-xl font-bold text-gray-900 mb-1">
                ⏰ Další týden v chaosu
              </p>
              <p className="text-base text-gray-600">
                Pořád stejné otázky. Žádný pokrok.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-5 max-w-3xl w-full border-2 border-white/30">
          <p className="text-xl font-bold text-white mb-2">
            ⚡ CO DOSTANEŠ TEĎ:
          </p>
          <div className="space-y-1 text-left text-lg text-gray-300">
            <p>✓ Sleva 40% (= úspora 3.300 Kč)</p>
            <p>✓ 90 minut → hotový plán</p>
            <p>✓ Kompletní model podnikání</p>
            <p className="text-yellow-300 font-bold">✓ Start ještě dnes</p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-12 py-6 mb-5 shadow-xl">
          <p className="text-4xl font-black mb-2">
            BERU! CHCI SLEVU
          </p>
          <p className="text-xl">
            Zbývá 23 míst • 4.999 Kč místo 8.299 Kč
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI MÍSTO! →</p>
        </div>

        <p className="text-pink-300 text-xl font-bold">
          🔥 Ještě 23 míst • Pak plná cena
        </p>
      </div>
    ),
    copy: {
      primary: `ZBÝVÁ 23 MÍST.

Z 50 průkopníků. Pak cena nahoru.

━━━━━━━━━���━━━━━━━━━━━━━━━━━

CO ZTRATÍŠ, KDYŽ POČKÁŠ:

💸 Slevu 40%
→ = 3.300 Kč navíc zaplatíš

🎯 Průkopnickou cenu
→ První 50 platí nejméně. Navždy.

⏰ Další týden marně
→ Místo jasna stále chaos. Další ztráty.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ CO DOSTANEŠ TEĎ:

✓ Sleva 40% (= úspora 3.300 Kč)
✓ 90 minut → hotový plán
✓ Model podnikání + FIT Validátor interaktivně
✓ Start ještě dnes

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA
Zbývá 23 míst • 4.999 Kč místo 8.299 Kč

🔥 Ještě 23 míst • Pak plná cena`,
      headline: 'Zbývá 23 míst',
      cta: 'Chci místo'
    }
  },

  // WARM #3: TESTIMONIAL - Konkrétní story (Petr, e-shop)
  {
    id: 'testimonial-petr',
    name: 'Warm #3: TESTIMONIAL',
    type: 'warm',
    category: 'Social proof • Story • Results',
    budget: '55 Kč/den (warm)',
    trigger: 'Story • Relatability • Proof',
    background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-6xl mb-4">💬</div>

        <h1 className="text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          „Za 90 minut jsem<br/>
          <span className="text-green-300">KONEČNĚ VĚDĚL"</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-5">
          Petr, 38 • E-shop s outdoorovým vybavením
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-3xl w-full">
          <div className="space-y-4 text-left">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-lg font-bold text-gray-900 mb-2">
                ❌ PŘED ČTVRTKOU:
              </p>
              <div className="space-y-1 text-base text-gray-700">
                <p>• „Prodávám všem. Turistům, bikerům, rybářům..."</p>
                <p>• „Nevím čím se lišim. Je nás plno podobných."</p>
                <p>• „Proč zrovna ode mě? Nemám odpověď."</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-lg font-bold text-gray-900 mb-2">
                ✅ PO ČTVRTCE:
              </p>
              <div className="space-y-1 text-base text-gray-700">
                <p>• <strong>Jasný segment:</strong> „Bikepacking nadšenci 30-45"</p>
                <p>• <strong>Jasná hodnota:</strong> „Řeším jim váhu batohu na víkendy"</p>
                <p>• <strong>Jasná pozice:</strong> „Nejlehčí setup v ČR"</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border-2 border-blue-500">
              <p className="text-2xl font-black text-blue-700 mb-2">
                📈 VÝSLEDEK:
              </p>
              <p className="text-lg text-gray-800">
                <strong>10 objednávek první týden</strong><br/>
                Přesně od bikepacking nadšenců. Konečně vím komu prodávám.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-5 max-w-3xl w-full border-2 border-white/30">
          <p className="text-xl font-bold text-white mb-3">
            Petrovi stačilo:
          </p>
          <div className="text-lg text-gray-300 space-y-1">
            <p>⏰ 90 minut času</p>
            <p>💰 4.999 Kč investice</p>
            <p className="text-green-300 font-bold">🎯 A měl jasno</p>
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-xl px-10 py-6 mb-5 shadow-xl">
          <p className="text-3xl font-black mb-2">
            ZÍSKEJ JASNO ZA 90 MINUT
          </p>
          <p className="text-xl">
            Tvůj segment • Tvoje hodnota • Tvůj plán
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI JASNO! →</p>
        </div>

        <p className="text-green-300 text-xl font-bold">
          🎯 Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `„ZA 90 MINUT JSEM KONEČNĚ VĚDĚL"

Petr, 38 • E-shop s outdoorovým vybavením

━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ PŘED ČTVRTKOU:

• „Prodávám všem. Turistům, bikerům, rybářům..."
• „Nevím čím se lišim. Je nás plno podobných."
• „Proč zrovna ode mě? Nemám odpověď."

━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ PO ČTVRTCE:

• JASNÝ SEGMENT: „Bikepacking nadšenci 30-45"
• JASNÁ HODNOTA: „Řeším jim váhu batohu na víkendy"
• JASNÁ POZICE: „Nejlehčí setup v ČR"

━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 VÝSLEDEK:

10 objednávek první týden
Přesně od bikepacking nadšenců. Konečně vím komu prodávám.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PETROVI STAČILO:

⏰ 90 minut času
💰 4.999 Kč investice
🎯 A měl jasno

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ZÍSKEJ JASNO ZA 90 MINUT.

PODNIKATELSKÁ ČTVRTKA
Tvůj segment • Tvoje hodnota • Tvůj plán

🎯 Prvních 50 • Sleva 40%`,
      headline: 'Za 90 minut věděl',
      cta: 'Chci jasno'
    }
  },

  // WARM #4: OBJECTION HANDLER - "Nevím jestli je to pro mě..."
  {
    id: 'objection-handler',
    name: 'Warm #4: OBJECTION HANDLER',
    type: 'warm',
    category: 'Objection handling • Qualification',
    budget: '50 Kč/den (warm)',
    trigger: 'Qualification • Objection removal • Clarity',
    background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-7xl mb-4">🤔</div>

        <h1 className="text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          „Nevím, jestli je to<br/>
          <span className="text-orange-300">PRO MĚ..."</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-6">
          Jasně. Odpověz si sám/sama:
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-4">
            ✅ ČTVRTKA JE PRO TEBE, KDYŽ:
          </p>
          
          <div className="space-y-3 text-left">
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-lg font-bold text-gray-900">
                ✓ Nevíš, komu přesně prodávat
              </p>
              <p className="text-base text-gray-600">
                „Prodávám všem" = prodáváš nikomu
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-lg font-bold text-gray-900">
                ✓ Marketing nefunguje
              </p>
              <p className="text-base text-gray-600">
                Reklamy žerou peníze, výsledek nula
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-lg font-bold text-gray-900">
                ✓ Nevíš, jak se odlišit
              </p>
              <p className="text-base text-gray-600">
                Konkurence nabízí totéž
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-lg font-bold text-gray-900">
                ✓ Podnikáš na slepo
              </p>
              <p className="text-base text-gray-600">
                Žádný plán, jen doufáš že to vyjde
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-300 my-4"></div>

          <p className="text-2xl font-black text-gray-900 mb-3">
            ❌ ČTVRTKA NENÍ PRO TEBE, KDYŽ:
          </p>

          <div className="space-y-2 text-left">
            <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-600">
              <p className="text-base text-gray-700">
                ❌ Už máš jasný byznys model a víš přesně komu prodávat
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-600">
              <p className="text-base text-gray-700">
                ❌ Marketing ti funguje a přináší zákazníky
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-600">
              <p className="text-base text-gray-700">
                ❌ Nemáš 90 minut času investovat do svého byznysu
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl px-10 py-5 mb-5 shadow-xl">
          <p className="text-3xl font-black mb-2">
            JE TO PRO TEBE?
          </p>
          <p className="text-xl">
            Pak máš 90 minut od jasna
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">ANO, CHCI! →</p>
        </div>

        <p className="text-orange-300 text-xl font-bold">
          🎯 Prvních 50 • 4.999 Kč • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `„NEVÍM, JESTLI JE TO PRO MĚ..."

Jasně. Odpověz si sám/sama:

━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ ČTVRTKA JE PRO TEBE, KDYŽ:

✓ Nevíš, komu přesně prodávat
→ „Prodávám všem" = prodáváš nikomu

✓ Marketing nefunguje
→ Reklamy žerou peníze, výsledek nula

✓ Nevíš, jak se odlišit
→ Konkurence nabízí totéž

✓ Podnikáš na slepo
→ Žádný plán, jen doufáš že to vyjde

━━━━━━━━━━━━━━━━━━━━━━━━��━━

❌ ČTVRTKA NENÍ PRO TEBE, KDYŽ:

❌ Už máš jasný byznys model a víš přesně komu prodávat
❌ Marketing ti funguje a přináší zákazníky
❌ Nemáš 90 minut času investovat do svého byznysu

━━━━━━━━━━━━━━━━━━━━━━━━━━━

JE TO PRO TEBE?

Pak máš 90 minut od jasna.

PODNIKATELSKÁ ČTVRTKA
Business Model Canvas + Value Proposition Canvas
90 minut • 4.999 Kč

🎯 Prvních 50 • Sleva 40%`,
      headline: 'Je to pro mě?',
      cta: 'Ano, chci'
    }
  },

  // WARM #5: FUTURE PACING - Za 3 měsíce...
  {
    id: 'future-pacing',
    name: 'Warm #5: FUTURE PACING',
    type: 'warm',
    category: 'Visualization • Hope • Positive emotion',
    budget: '50 Kč/den (warm)',
    trigger: 'Visualization • Hope • Positive Emotion',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-6xl mb-6">✨</div>

        <h1 className="text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Představ si,<br/>
          že <span className="text-blue-300">ZA MĚSÍC...</span>
        </h1>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <div className="space-y-5 text-left">
            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
              <p className="text-xl font-bold text-gray-900 mb-2">
                💰 Víš přesně, komu prodávat
              </p>
              <p className="text-base text-gray-600">
                Ne "všem". Tvému ideálnímu zákazníkovi. Ten, kdo platí dobré peníze. 
                Ten, kdo tě doporučuje. Ten, se kterým se ti dobře spolupracuje.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
              <p className="text-xl font-bold text-gray-900 mb-2">
                🎯 Marketing konečně funguje
              </p>
              <p className="text-base text-gray-600">
                Ne víc peněz do reklam. Správná komunikace. Správní lidé. 
                Zákazníci ti píšou: "To je přesně to, co hledám!"
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-600">
              <p className="text-xl font-bold text-gray-900 mb-2">
                📈 Příjmy rostou
              </p>
              <p className="text-base text-gray-600">
                Nájem? Žádný problém. Rezerva? Roste. Investice? Můžeš si dovolit. 
                A to nepracuješ víc. Jen lépe.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-600">
              <p className="text-xl font-bold text-gray-900 mb-2">
                😊 Máš klid v hlavě
              </p>
              <p className="text-base text-gray-600">
                Nejistota? Pryč. Chaos? Minulost. Víš, kam jdeš. 
                Máš plán. A plán funguje.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-3xl w-full border-2 border-white/30">
          <p className="text-2xl font-black text-white mb-3">
            TO NENÍ SEN.
          </p>
          <p className="text-lg text-gray-300">
            To je realita pro 152 podnikatelů, kteří měli jasnou strategii.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-10 py-6 mb-6 shadow-xl">
          <p className="text-3xl font-black mb-2">
            ZAČÍT: 90 MINUT
          </p>
          <p className="text-xl">
            Podnikatelská Čtvrtka • 4.999 Kč
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI TO TAKY! →</p>
        </div>

        <p className="text-blue-300 text-xl font-bold">
          ✨ Prvních 50 • Tvá budoucnost začíná dnes
        </p>
      </div>
    ),
    copy: {
      primary: `PŘEDSTAV SI, ŽE ZA MĚSÍC...

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 VÍŠ PŘESNĚ, KOMU PRODÁVAT

Ne "všem". Tvému ideálnímu zákazníkovi.
Ten, kdo platí dobré peníze.
Ten, kdo tě doporučuje.
Ten, se kterým se ti dobře spolupracuje.

━━━━━��━━━━━━━━━━━��━━━━━━━━━

🎯 MARKETING KONEČNĚ FUNGUJE

Ne víc peněz do reklam. Správná komunikace.
Zákazníci ti píšou: "To je přesně to, co hledám!"

━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 PŘÍJMY ROSTOU

Nájem? Žádný problém.
Rezerva? Roste.
Investice? Můžeš si dovolit.
A to nepracuješ víc. Jen lépe.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

😊 MÁŠ KLID V HLAVĚ

Nejistota? Pryč.
Chaos? Minulost.
Víš, kam jdeš. Máš plán. A plán funguje.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

TO NENÍ SEN.

To je realita pro 152 podnikatelů,
kteří měli jasnou strategii.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ZAČÍT: 90 MINUT

PODNIKATELSKÁ ČTVRTKA

Business Model Canvas + Value Proposition Canvas.
Jasný plán.
Jasná budoucnost.

Investice: 4.999 Kč
Čas: 90 minut

✨ Prvních 50 • Tvá budoucnost začíná dnes`,
      headline: 'Představ si za měsíc...',
      cta: 'Chci to taky'
    }
  }
];

export default function Ultimate13Ads() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOnlyTop3, setShowOnlyTop3] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  // TOP 3 IDs (Varianta C - AGGRESSIVE)
  const top3Ids = ['daily-loss', 'truth-blue', 'before-after'];
  
  // Filtruj reklamy podle filtru
  const displayedAds = showOnlyTop3 
    ? ultimate13Ads.filter(ad => top3Ids.includes(ad.id))
    : ultimate13Ads;

  const currentAd = displayedAds[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayedAds.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayedAds.length - 1 ? 0 : prev + 1));
  };

  const exportAsImage = async () => {
    if (!adRef.current) return;

    try {
      toast.loading('Exportuji reklamu...', { id: 'export' });

      // Dynamicky importuj html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // Vyrenderuj element jako canvas
      const canvas = await html2canvas(adRef.current, {
        width: 1080,
        height: 1350,
        scale: 2, // Pro vyšší kvalitu
        backgroundColor: null,
        logging: false,
      });

      // Převeď na blob
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error('Export selhal', { id: 'export' });
          return;
        }

        // Vytvoř download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const fileName = `${currentAd.id}_1080x1350.png`;
        link.download = fileName;
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
        
        toast.success(`✅ Export hotový: ${fileName}`, { id: 'export' });
      }, 'image/png');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export selhal. Zkus screenshot ručně.', { id: 'export' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-4">
            🚀 ULTIMATE 13 ADS
          </h1>
          <p className="text-2xl text-gray-400 mb-6">
            8 Cold Ads + 5 Warm Ads • Finální portfolio pro launch
          </p>
          
          {/* TOP 3 Filter Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => {
                setShowOnlyTop3(false);
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                !showOnlyTop3
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Všech 13 reklam
            </button>
            <button
              onClick={() => {
                setShowOnlyTop3(true);
                setCurrentIndex(0);
                toast.success('🔥 Zobrazuji TOP 3 (Varianta C - AGGRESSIVE)');
              }}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                showOnlyTop3
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              🔥 TOP 3 (Start zde!)
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-blue-500/20 border-2 border-blue-400 rounded-xl px-6 py-3 flex items-center gap-2">
              <Snowflake className="w-5 h-5 text-blue-400" />
              <p className="text-lg text-blue-300 font-bold">
                8 Cold Ads
              </p>
            </div>
            <div className="bg-orange-500/20 border-2 border-orange-400 rounded-xl px-6 py-3 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <p className="text-lg text-orange-300 font-bold">
                5 Warm Ads
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={goToPrevious}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="text-center min-w-[400px]">
            <div className="flex items-center justify-center gap-3 mb-2">
              {currentAd.type === 'cold' ? (
                <Snowflake className="w-6 h-6 text-blue-400" />
              ) : (
                <Flame className="w-6 h-6 text-orange-400" />
              )}
              <p className={`text-2xl font-bold ${currentAd.type === 'cold' ? 'text-blue-400' : 'text-orange-400'}`}>
                {currentAd.name}
              </p>
            </div>
            <p className="text-gray-400 mb-1">{currentAd.category}</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-green-400">💰 {currentAd.budget}</span>
              <span className="text-purple-400">🎯 {currentAd.trigger}</span>
            </div>
          </div>
          <button
            onClick={goToNext}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {displayedAds.map((ad, index) => (
            <button
              key={ad.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? ad.type === 'cold'
                    ? 'w-8 bg-blue-500'
                    : 'w-8 bg-orange-500'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Ad preview */}
        <div className="flex justify-center mb-8">
          <div
            ref={adRef}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: currentAd.background,
              width: '1080px',
              height: '1350px'
            }}
          >
            {currentAd.content}
          </div>
        </div>

        {/* Export button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={exportAsImage}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-xl transition-all hover:scale-105"
          >
            <Download className="w-6 h-6" />
            Exportovat jako PNG (1080×1350)
          </button>
        </div>

        {/* Ad info panel */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20 max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">💡 Psychologický trigger:</p>
              <p className="font-bold text-blue-300">{currentAd.trigger}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">💰 Doporučený budget:</p>
              <p className="font-bold text-green-300">{currentAd.budget}</p>
            </div>
          </div>
        </div>

        {/* FB Ad Copy Panel */}
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-8 border border-gray-700/50 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            📝 Facebook Ad Copy
            <span className="text-sm font-normal text-gray-400">(klikni pro zkopírování)</span>
          </h3>
          
          <div className="space-y-6">
            {/* Primary Text */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-300 uppercase tracking-wide">Primary Text:</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentAd.copy.primary);
                    toast.success('✅ Primary text zkopírován!');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                >
                  📋 Kopírovat
                </button>
              </div>
              <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap font-mono border border-gray-700">
{currentAd.copy.primary}
              </pre>
            </div>

            {/* Headline */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-300 uppercase tracking-wide">Headline:</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentAd.copy.headline);
                    toast.success('✅ Headline zkopírován!');
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                >
                  📋 Kopírovat
                </button>
              </div>
              <p className="bg-black/50 text-white p-4 rounded-lg font-bold text-lg border border-gray-700">
                {currentAd.copy.headline}
              </p>
            </div>

            {/* CTA */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-300 uppercase tracking-wide">CTA Button:</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentAd.copy.cta);
                    toast.success('✅ CTA zkopírován!');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                >
                  📋 Kopírovat
                </button>
              </div>
              <p className="bg-black/50 text-white p-4 rounded-lg font-bold border border-gray-700">
                {currentAd.copy.cta}
              </p>
            </div>

            {/* All in one */}
            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={() => {
                  const fullCopy = `PRIMARY TEXT:\n${currentAd.copy.primary}\n\nHEADLINE:\n${currentAd.copy.headline}\n\nCTA:\n${currentAd.copy.cta}`;
                  navigator.clipboard.writeText(fullCopy);
                  toast.success('✅ Celý copy zkopírován!');
                }}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
              >
                📋 Zkopírovat celý copy najednou
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
