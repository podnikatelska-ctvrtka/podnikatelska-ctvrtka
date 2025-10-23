// 🎯 FINAL 6 ANGLES - VYBRANÉ A UPRAVENÉ VERZE
// #1 Daily Loss + Naděje | #2 Nájem | #5 Shocking Stat | #7 Social Proof | #9 Quick Results | #10 Operational Chaos

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

interface AngleData {
  id: string;
  name: string;
  trigger: string;
  budget: string;
  background: string;
  content: React.ReactNode;
  copy: {
    primary: string;
    headline: string;
    cta: string;
  };
  reasoning: string;
}

const finalAngles: AngleData[] = [
  // ANGLE #1: DENNÍ ZTRÁTA + NADĚJE - Přestat ztrácet peníze
  {
    id: 'daily-loss-hope',
    name: 'Úhel #1: DENNÍ ZTRÁTA → NADĚJE',
    trigger: 'Loss Aversion + Hope • Konkrétní čísla',
    budget: '90 Kč/den',
    background: 'linear-gradient(135deg, #7f1d1d 0%, #059669 100%)',
    reasoning: 'Hard pain (-2.900 Kč/den) → okamžitá naděje (90 minut = stop ztrátám). Loss aversion + konkrétní ROI.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12 py-8">
        <div className="text-7xl mb-4">💸➜✅</div>

        <h1 className="text-7xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          Ztrácíš peníze<br/>
          <span className="text-red-300">KAŽDÝ DEN?</span>
        </h1>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-4xl w-full">
          <p className="text-3xl font-black text-gray-900 mb-4">
            Bez jasné strategie:
          </p>
          
          <div className="space-y-2 text-left">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-3xl font-black text-red-600">-1.500 Kč/den</p>
              <p className="text-base text-gray-700">Nevíš komu prodávat = prázdno</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
              <p className="text-3xl font-black text-yellow-700">-600 Kč/den</p>
              <p className="text-base text-gray-700">Prodáváš levně = málo marže</p>
            </div>

            <div className="h-px bg-gray-300 my-2"></div>

            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-2xl font-black text-orange-700 mb-1">⏰ Nevyčíslitelná ztráta/den:</p>
              <p className="text-lg text-gray-700">
                Čas běží • Příležitosti mizí • Stojíš na místě
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl px-10 py-5 mb-5 shadow-xl border-2 border-green-400">
          <p className="text-4xl font-black mb-2">
            💡 CO KDYBY...
          </p>
          <p className="text-2xl mb-3 leading-relaxed">
            Za 90 minut měl/a<br/>
            <span className="text-yellow-300 font-black text-3xl">INTERAKTIVNÍ PLÁN</span>
          </p>
          <p className="text-xl leading-relaxed text-white">
            ✓ Víš komu prodávat<br/>
            ✓ Víš jak na marketing<br/>
            ✓ Máš jasné ceny<br/>
            <span className="text-yellow-300 font-bold">✓ Přestaneš ztrácet peníze</span>
          </p>
        </div>

        <div className="bg-white text-black px-16 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">STOP ZTRÁTÁM →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          ⏰ 90 minut • 4.999 Kč • Návratnost: 2 dny
        </p>
      </div>
    ),
    copy: {
      primary: `ZTRÁCÍŠ PENÍZE KAŽDÝ DEN?

Bez jasné strategie:

💸 -1.500 Kč/den → Nevíš komu prodávat = prázdno
💸 -600 Kč/den → Prodáváš levně = málo marže

⏰ Nevyčíslitelná ztráta/den:
→ Čas běží • Příležitosti mizí • Stojíš na místě

━━━━━━━━━━━━━━━━━━━━━━━���━━━

💡 CO KDYBY...

Dal/a bys 90 minut a dostal/a:
→ INTERAKTIVNÍ BYZNYS PLÁN

✓ Víš komu prodávat
✓ Víš jak na marketing  
✓ Máš jasné ceny
✓ Přestaneš ztrácet peníze

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Business Model Canvas + Value Proposition Canvas.
90 minut interaktivní práce.
Konkrétní plán.

Investice: 4.999 Kč
Návratnost: 2 dny práce

⏰ Prvních 50 • Každý den počítá`,
      headline: 'Stop ztrátám',
      cta: 'Chci přestat ztrácet'
    }
  },

  // ANGLE #2: NÁJEM ZA 2 TÝDNY - Konkrétní financial pressure
  {
    id: 'rent-pressure',
    name: 'Úhel #2: NÁJEM ZA 2 TÝDNY',
    trigger: 'Financial Pressure • Konkrétní věci',
    budget: '95 Kč/den',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    reasoning: 'Reálný pain - faktury, nájem, dodavatelé. Věci se kterými se podnikatelé setkávají každý den.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12 py-8">
        <div className="text-8xl mb-5">📊</div>

        <h1 className="text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          ZA 2 TÝDNY<br/>
          <span className="text-blue-200">PLATÍŠ NÁJEM</span>
        </h1>

        <div className="bg-white/95 rounded-2xl p-7 mb-5 max-w-4xl w-full">
          <p className="text-3xl font-black text-gray-900 mb-5">
            Už víš:
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📄</span>
              <div>
                <p className="text-2xl font-bold text-gray-800">Kolik přesně potřebuješ prodat?</p>
                <p className="text-lg text-gray-600">(aby pokrylo nájem + faktury)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="text-2xl font-bold text-gray-800">Komu to prodáváš?</p>
                <p className="text-lg text-gray-600">(komu přesně nabízet)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl">💰</span>
              <div>
                <p className="text-2xl font-bold text-gray-800">Jak jim to prodáš?</p>
                <p className="text-lg text-gray-600">(jak je najít a co nabídnout)</p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-5 mt-5">
              <p className="text-2xl font-bold text-red-700">
                Pokud NE → podnikáš naslepo.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-10 py-7 mb-5 shadow-2xl border-4 border-yellow-400">
          <p className="text-5xl font-black mb-3 text-yellow-300 drop-shadow-lg">
            90 MINUT = JASNO
          </p>
          <p className="text-2xl font-bold">
            Podnikatelská Čtvrtka • Konkrétní plán
          </p>
        </div>

        <div className="bg-white text-black px-16 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI JASNO →</p>
        </div>

        <p className="text-blue-200 text-2xl font-bold">
          ⏰ Prvních 50 míst • 4.999 Kč
        </p>
      </div>
    ),
    copy: {
      primary: `ZA 2 TÝDNY PLATÍŠ NÁJEM.

Už víš:

📄 Kolik přesně potřebuješ prodat?
   (aby pokrylo nájem + faktury)

🎯 Komu to prodáváš?
   (komu přesně nabízet)

💰 Jak jim to prodáš?
   (jak je najít a co nabídnout)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pokud NE:
→ Podnikáš naslepo.

Pokud ANO:
→ Máš jasný kurz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Business Model Canvas + Value Proposition Canvas.
90 minut interaktivní práce.

Výsledek:
✓ Přesná čísla
✓ Konkrétní segment
✓ Jasný plán

Investice: 4.999 Kč
Čas: 90 minut

⏰ Prvních 50 míst`,
      headline: 'Máš jasno?',
      cta: 'Chci konkrétní plán'
    }
  },

  // ANGLE #5: SHOCKING STAT - 83% nemá plán (BANGER!)
  {
    id: 'shocking-stat',
    name: 'Úhel #5: SHOCKING STAT',
    trigger: 'Social Proof • Fear of Missing Out',
    budget: '90 Kč/den',
    background: 'linear-gradient(135deg, #581c87 0%, #a855f7 100%)',
    reasoning: 'BANGER! Šokující statistika vytváří kontrast - 83% fail vs. 17% success. Chceš být kde?',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12 py-8">
        <div className="text-8xl mb-4">📊</div>

        <h1 className="text-7xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          83% PODNIKATELŮ
        </h1>

        <div className="bg-white/95 rounded-2xl p-7 mb-5 max-w-4xl w-full">
          <p className="text-6xl font-black text-purple-600 mb-5">
            NEMÁ BYZNYS PLÁN
          </p>
          
          <div className="space-y-3">
            <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-600 text-left">
              <p className="text-2xl font-bold text-gray-900 mb-2">Nevědí:</p>
              <ul className="space-y-1 text-gray-700 text-lg">
                <li>• Komu přesně prodávají</li>
                <li>• Proč by je zákazník měl chtít</li>
                <li>• Jak získávají zákazníky</li>
                <li>• Jestli to vůbec dává smysl</li>
              </ul>
            </div>

            <p className="text-3xl font-bold text-gray-600 py-2">
              Výsledek?
            </p>

            <div className="bg-red-100 rounded-lg p-5 border-2 border-red-500">
              <p className="text-4xl font-black text-red-700">
                Přežívají.<br/>Někteří i krachují.
              </p>
              <p className="text-xl text-gray-600 mt-2">
                Ale rozhodně nerostou.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl px-10 py-7 mb-5 shadow-xl">
          <p className="text-5xl font-black mb-3">
            BUĎ V TĚCH 17%
          </p>
          <p className="text-2xl">
            Kteří mají jasný plán.<br/>
            A rostou.
          </p>
        </div>

        <div className="bg-white text-black px-16 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI PLÁN →</p>
        </div>

        <p className="text-purple-200 text-2xl font-bold">
          🎯 Podnikatelská Čtvrtka • 90 minut • 4.999 Kč
        </p>
      </div>
    ),
    copy: {
      primary: `83% PODNIKATELŮ NEMÁ BYZNYS PLÁN.

Nevědí:
• Komu přesně prodávají
• Proč by je zákazník měl chtít
• Jak získávají zákazníky
• Jestli to vůbec dává smysl

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Výsledek?

Přežívají.
Někteří i krachují.
Ale rozhodně nerostou.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

17% MÁ JASNÝ PLÁN.

Vědí:
✓ Přesně komu prodávají
✓ Proč by je zákazník měl chtít
✓ Jak je oslovit
✓ Kolik potřebují prodat

→ A rostou.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Business Model Canvas + Value Proposition Canvas.
90 minut interaktivní práce.
Konkrétní výstup.

Buď v těch 17%.

Investice: 4.999 Kč
Čas: 90 minut

🎯 Prvních 50 míst`,
      headline: 'V kterých % jsi?',
      cta: 'Chci být v 17%'
    }
  },

  // ANGLE #7: SOCIAL PROOF - Průměrný čas 2,4 dne
  {
    id: 'social-proof-speed',
    name: 'Úhel #7: SOCIAL PROOF (rychlost)',
    trigger: 'Social Proof • Quick Wins',
    budget: '100 Kč/den',
    background: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
    reasoning: 'Zajímavý úhel - průměrný čas DO PRVNÍHO KROKU je 2,4 dne. Není to za 3 měsíce, je to RYCHLE.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12 py-8">
        <div className="text-8xl mb-4">⚡</div>

        <h1 className="text-7xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          152 PODNIKATELŮ<br/>
          <span className="text-green-300">UŽ MÁ JASNO</span>
        </h1>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-4xl w-full">
          <p className="text-3xl font-black text-gray-900 mb-4">
            A nejsou to jen čísla:
          </p>
          
          <div className="space-y-3">
            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600 text-left">
              <p className="text-5xl font-black text-green-600 mb-2">2,4 dne</p>
              <p className="text-xl text-gray-700">
                = průměrný čas <span className="font-bold">DO PRVNÍHO KROKU</span>
              </p>
              <p className="text-base text-gray-600 mt-2">
                (první schůzka, prodej, kampaň)
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-4xl font-black text-blue-600">94%</p>
                <p className="text-sm text-gray-600">udělalo první krok<br/>do týdne</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-4xl font-black text-purple-600">87%</p>
                <p className="text-sm text-gray-600">získalo prvního<br/>klienta</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-4xl font-black text-orange-600">91%</p>
                <p className="text-sm text-gray-600">doporučilo<br/>kamarádovi</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-5 border-2 border-green-500">
              <p className="text-2xl font-bold text-green-800 mb-2">
                "Konečně vím co dělat. Hned zítra volám klientům."
              </p>
              <p className="text-base text-gray-600">— Tomáš R., marketingová agentura</p>
            </div>
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-xl px-10 py-6 mb-5 shadow-xl">
          <p className="text-4xl font-black mb-2">
            PRVNÍ KROK ZA 2-3 DNY
          </p>
          <p className="text-2xl">
            Ne za měsíce. Za dny.
          </p>
        </div>

        <div className="bg-white text-black px-16 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI TO TAKÉ →</p>
        </div>

        <p className="text-green-200 text-2xl font-bold">
          🎯 Podnikatelská Čtvrtka • 4.999 Kč
        </p>
      </div>
    ),
    copy: {
      primary: `152 PODNIKATELŮ UŽ MÁ JASNO.

A nejsou to jen čísla:

⚡ 2,4 DNE
= průměrný čas DO PRVNÍHO KROKU

(první schůzka s klientem, první prodej, první kampaň)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

VÝSLEDKY:

94% → Udělalo první krok do týdne
87% → Získalo prvního klienta
91% → Doporučilo kamarádovi

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 "Konečně vím co dělat. Hned zítra volám klientům."
— Tomáš R., marketingová agentura

💬 "Měl jsem 5 nápadů. Teď vím který má smysl."
— Petra M., e-shop s kosmetikou

💬 "90 minut změnilo směr celého roku."
— Martin K., salon

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Business Model Canvas + Value Proposition Canvas.
90 minut interaktivní práce.

Výsledek: První krok za 2-3 dny.
Ne za měsíce. Za dny.

Investice: 4.999 Kč

🎯 Prvních 50 míst`,
      headline: 'První krok za 2 dny',
      cta: 'Chci jasný plán'
    }
  },

  // ANGLE #9: QUICK RESULTS - ZA 90 MINUT!
  {
    id: 'quick-results',
    name: 'Úhel #9: RYCHLÉ VÝSLEDKY',
    trigger: 'Future Pacing • Urgence • Quick Wins',
    budget: '100 Kč/den',
    background: 'linear-gradient(135deg, #be123c 0%, #fb923c 100%)',
    reasoning: 'ZA 90 MINUT máš jasno! Větší urgence než "za 3 dny". Okamžitá transformace.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12 py-8">
        <div className="text-8xl mb-4">🚀</div>

        <h1 className="text-7xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          PŘEDSTAV SI<br/>
          <span className="text-orange-300">ZA 90 MINUT...</span>
        </h1>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-4xl w-full">
          <div className="space-y-5 text-left">
            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
              <p className="text-xl font-black text-green-700 mb-2">✅ VÍŠ KOMU prodávat</p>
              <p className="text-sm text-gray-700">
                Místo "všem" víš komu přesně nabízet.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
              <p className="text-xl font-black text-blue-700 mb-2">✅ VÍŠ CO nabízet</p>
              <p className="text-sm text-gray-700">
                Hodnotu, ne produkt. Víš proč by je zákazníci měli chtít.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-600">
              <p className="text-xl font-black text-purple-700 mb-2">✅ VÍŠ JAK na marketing</p>
              <p className="text-sm text-gray-700">
                Jak je najít a co nabídnout. Vše jasně.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-5 border-l-4 border-orange-600">
              <p className="text-xl font-black text-orange-700 mb-2">✅ MÁŠ AKČNÍ PLÁN</p>
              <p className="text-sm text-gray-700">
                Ne teorie. Konkrétní kroky. Hned zítra.
              </p>
            </div>

            <div className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-lg p-5 border-2 border-rose-500 mt-6">
              <p className="text-2xl font-black text-rose-700 mb-2">
                Místo chaosu → JASNO
              </p>
              <p className="text-lg text-gray-700">
                Za 90 minut.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose-600 to-orange-600 text-white rounded-xl px-10 py-6 mb-5 shadow-xl">
          <p className="text-5xl font-black mb-2">
            90 MINUT = JASNO
          </p>
          <p className="text-2xl">
            Okamžitě víš co dělat • Už zítra můžeš začít
          </p>
        </div>

        <div className="bg-white text-black px-16 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI JASNO →</p>
        </div>

        <p className="text-orange-200 text-2xl font-bold">
          ⚡ 90 minut • Jasno okamžitě • 4.999 Kč
        </p>
      </div>
    ),
    copy: {
      primary: `PŘEDSTAV SI ZA 90 MINUT...

✅ VÍŠ KOMU prodávat
Místo "všem co potřebují XY" víš komu přesně nabízet.

✅ VÍŠ CO nabízet  
Hodnotu, ne produkt. Víš proč by tě měli chtít.

✅ VÍŠ JAK na marketing
Jak je najít a co jim nabídnout. Všechno jasně.

✅ MÁŠ PRVNÍ KROK
Ne plány. Konkrétní action. Hned zítra.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

MÍSTO CHAOSU → JASNO

Za pouhých 90 minut.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

JAK TO FUNGUJE?

1️⃣ Dokončíš Podnikatelskou Čtvrtku (90 min)
2️⃣ Máš konkrétní Business Model Canvas
3️⃣ Máš jasný Value Proposition
4️⃣ Víš co dělat HNED ZÍTRA

Průměrná doba od kurzu k první akci: 2,4 dne

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Business Model Canvas + Value Proposition Canvas.
90 minut interaktivní práce.

Investice: 4.999 Kč
Jasno: Za 90 minut
První krok: Za 2-3 dny

⚡ Prvních 50 míst`,
      headline: 'Jasno za 90 minut',
      cta: 'Chci rychlé výsledky'
    }
  },

  // ANGLE #10: OPERATIONAL CHAOS - KOMPLETNĚ NOVÝ!
  {
    id: 'operational-chaos',
    name: 'Úhel #10: OPERATIVNÍ CHAOS',
    trigger: 'Pain Agitation • Priority Focus',
    budget: '105 Kč/den',
    background: 'linear-gradient(135deg, #44403c 0%, #78716c 100%)',
    reasoning: 'NOVÝ! Podchytit podnikatele topící se v operativě (faktury, dodavatelé, výroba...). Řešení: ukážeme NA CO SE ZAMĚŘIT.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12 py-6">
        <div className="text-7xl mb-3">😵</div>

        <h1 className="text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          TOPÍŠ SE<br/>
          <span className="text-stone-300">V OPERATIVĚ?</span>
        </h1>

        <div className="bg-white/95 rounded-2xl p-5 mb-4 max-w-4xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-3">
            Celý den řešíš:
          </p>
          
          <div className="space-y-2 text-left">
            <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-600">
              <p className="text-lg font-bold text-gray-800">📄 Faktury, účetnictví</p>
              <p className="text-sm text-gray-600">3 hodiny denně s čísly</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3 border-l-4 border-orange-600">
              <p className="text-lg font-bold text-gray-800">📦 Dodavatelé, objednávky</p>
              <p className="text-sm text-gray-600">Telefonáty a emaily</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-3 border-l-4 border-yellow-600">
              <p className="text-lg font-bold text-gray-800">🔧 Výroba, služby</p>
              <p className="text-sm text-gray-600">Musíš to dělat sám/sama</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-600">
              <p className="text-lg font-bold text-gray-800">📱 Marketing, weby...</p>
              <p className="text-sm text-gray-600">"Měl/a bych, ale kdy?"</p>
            </div>

            <div className="bg-red-100 rounded-lg p-4 border-2 border-red-500 mt-3">
              <p className="text-2xl font-black text-red-700 mb-1">
                Výsledek?
              </p>
              <p className="text-lg text-gray-800">
                Pracuješ 12h/den.<br/>
                Ale byznys neroste.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl px-8 py-5 mb-4 shadow-xl border-2 border-emerald-400">
          <p className="text-3xl font-black mb-2">
            💡 CO KDYBY...
          </p>
          <p className="text-xl mb-3 leading-relaxed">
            Věděl/a bys <span className="text-yellow-300 font-black">NA CO SE ZAMĚŘIT?</span>
          </p>
          <div className="text-left text-lg space-y-1 text-white">
            <p>✓ Co je důležité PRO RŮST</p>
            <p>✓ Co je jen "běžná operativa"</p>
            <p>✓ Kam investovat čas</p>
            <p className="text-yellow-300 font-bold">✓ Přestaň ztrácet čas na kraviny</p>
          </div>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-xl shadow-2xl mb-3">
          <p className="text-3xl font-black">CHCI PRIORITY →</p>
        </div>

        <p className="text-stone-300 text-xl font-bold">
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
→ Neustálé telefonáty a emaily

🔧 Výroba, služby
→ Musíš to taky dělat sám/sama

📱 Marketing, web, sociální sítě...
→ "Měl/a bych, ale kdy?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━

VÝSLEDEK?

Pracuješ 12h/den.
Ale byznys neroste.

Protože děláš "všechno".
Místo toho "správného".

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 CO KDYBY...

Věděl/a jsi NA CO SE ZAMĚŘIT?

Interaktivní Business Model ti ukáže:

✓ Co je důležité PRO RŮST
✓ Co je jen "běžná operativa"
✓ Kam investovat čas
✓ Co můžeš delegovat/ignorovat

→ Přestaneš ztrácet čas na marketing, weby a další "měl bych".
→ Zaměříš se na to, co přináší zákazníky.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Business Model Canvas + Value Proposition Canvas.
90 minut interaktivní práce.

Výsledek: 
→ Víš kam směřovat energii
→ Víš co ignorovat
→ Máš jasné priority

Faktury, dodavatele a účetnictví ti nenahradíme.
Ale ukážeme ti, že to NENÍ to hlavní.

Investice: 4.999 Kč
Čas: 90 minut

🎯 Prvních 50 míst`,
      headline: 'Přestaň se topit',
      cta: 'Chci jasné priority'
    }
  }
];

export default function Final6Angles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentAngle = finalAngles[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? finalAngles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === finalAngles.length - 1 ? 0 : prev + 1));
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">
                🎯 FINAL 6 ANGLES
              </h1>
              <p className="text-gray-400">
                Vybrané a upravené verze • Ready to launch
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Angle {currentIndex + 1} z {finalAngles.length}</p>
              <p className="text-lg font-bold text-emerald-400">{currentAngle.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Info Panel */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 mb-8 border border-blue-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Psychologický trigger:</p>
              <p className="font-bold text-blue-300">{currentAngle.trigger}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Doporučený budget:</p>
              <p className="font-bold text-green-300">{currentAngle.budget}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Reasoning:</p>
              <p className="text-sm text-gray-300">{currentAngle.reasoning}</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex justify-center mb-8">
          {/* Visual Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Visual Preview</h2>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Previous angle"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Next angle"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: currentAngle.background,
                width: '1080px',
                height: '1350px'
              }}
            >
              {currentAngle.content}
            </div>
          </div>

          {/* Copy Text - HIDDEN */}
          <div className="space-y-4 hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Ad Copy</h2>
              <button
                onClick={() => handleCopy(currentAngle.copy.primary, 'primary')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                {copiedId === 'primary' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Zkopírováno!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Kopírovat vše</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="space-y-6">
                {/* Primary Copy */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Primary Text
                    </h3>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {currentAngle.copy.primary}
                  </div>
                </div>

                {/* Headline */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Headline
                  </h3>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-xl font-bold">{currentAngle.copy.headline}</p>
                  </div>
                </div>

                {/* CTA */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Call to Action
                  </h3>
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg p-4 text-center">
                    <p className="text-xl font-black">{currentAngle.copy.cta}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Copy Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleCopy(currentAngle.copy.headline, 'headline')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
              >
                {copiedId === 'headline' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Headline ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy Headline</span>
                  </>
                )}
              </button>
              <button
                onClick={() => handleCopy(currentAngle.copy.cta, 'cta')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
              >
                {copiedId === 'cta' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">CTA ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy CTA</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2">
          {finalAngles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-emerald-500 w-8'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to angle ${index + 1}`}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-8 border border-emerald-500/20">
          <h2 className="text-2xl font-black mb-4">📋 Final 6 Angles Overview:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {finalAngles.map((angle, index) => (
              <button
                key={angle.id}
                onClick={() => setCurrentIndex(index)}
                className={`text-left p-4 rounded-lg transition-all ${
                  currentIndex === index
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <p className="text-sm font-bold mb-1">{angle.name}</p>
                <p className="text-xs opacity-80">{angle.trigger}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
