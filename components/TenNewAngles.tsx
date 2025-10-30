// 🎯 10 ÚPLNĚ NOVÝCH ÚHLŮ POHLEDU
// Různé psychologické triggery • Realistické pain points • Fresh approaches

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

const tenAngles: AngleData[] = [
  // ANGLE #1: ROI/ZTRÁTA - Denní ztráta potenciálu
  {
    id: 'daily-loss',
    name: 'Úhel #1: DENNÍ ZTRÁTA',
    trigger: 'Loss Aversion • Konkrétní čísla',
    budget: '85 Kč/den',
    background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)',
    reasoning: 'Loss aversion je 2x silnější než gain. Každý den bez strategie = reálná ztráta.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-6xl mb-6">💸</div>

        <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Každý den<br/>
          <span className="text-red-300">ZTRÁCÍŠ PENÍZE</span>
        </h1>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Bez jasné strategie:
          </p>
          
          <div className="space-y-4 text-left">
            <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-600">
              <p className="text-3xl font-black text-red-600 mb-2">-1.500 Kč/den</p>
              <p className="text-base text-gray-700">Nevíš komu prodávat = prázdný e-shop/salon/služba</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-5 border-l-4 border-orange-600">
              <p className="text-3xl font-black text-orange-600 mb-2">-800 Kč/den</p>
              <p className="text-base text-gray-700">Špatný marketing = peníze vyhozené oknem</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-600">
              <p className="text-3xl font-black text-yellow-700 mb-2">-600 Kč/den</p>
              <p className="text-base text-gray-700">Chaos v cenách = zákazníci odcházejí</p>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="bg-red-100 rounded-lg p-6 border-2 border-red-500">
              <p className="text-4xl font-black text-red-700 mb-2">
                -2.900 Kč/den
              </p>
              <p className="text-2xl font-bold text-red-600">
                = -87.000 Kč/měsíc
              </p>
              <p className="text-base text-gray-600 mt-2">
                Jen proto, že nemáš jasný plán.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-xl px-10 py-6 mb-6 shadow-xl">
          <p className="text-3xl font-black mb-2">
            ZASTAVIT ZTRÁTU: 90 MINUT
          </p>
          <p className="text-xl">
            Podnikatelská Čtvrtka • 4.999 Kč • Návratnost: 2 dny
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">STOP ZTRÁTÁM! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          ⏰ Prvních 50 • Každý den počítá
        </p>
      </div>
    ),
    copy: {
      primary: `KAŽDÝ DEN ZTRÁCÍŠ PENÍZE.

Bez jasné strategie:

💸 -1.500 Kč/den
→ Nevíš komu prodávat = prázdný podnik

💸 -800 Kč/den  
→ Špatný marketing = peníze oknem

💸 -600 Kč/den
→ Chaos v cenách = zákazníci odchází

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CELKEM: -2.900 Kč/DEN
= -87.000 Kč/MĚSÍC

Jen proto, že nemáš jasný plán.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ZASTAVIT ZTRÁTU: 90 MINUT

PODNIKATELSKÁ ČTVRTKA
• Business model jasně
• Marketing jasně
• Ceny jasně

Investice: 4.999 Kč
Návratnost: 2 dny

⏰ Prvních 50 • Každý den počítá`,
      headline: 'Denní ztráta: -2.900 Kč',
      cta: 'Stop ztrátám'
    }
  },

  // ANGLE #2: NÁJEM STRESS - Za 2 týdny zase nájem
  {
    id: 'rent-stress',
    name: 'Úhel #2: NÁJEM ZA 2 TÝDNY',
    trigger: 'Financial Pressure • Urgence • Real Pain',
    budget: '80 Kč/den',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    reasoning: 'Reálný pain point. Každý podnikatel zná tento stres. Opakující se měsíční kolo.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-6xl mb-6">📅</div>

        <h1 className="text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          Za 2 týdny<br/>
          <span className="text-red-400">ZASE NÁJEM</span>
        </h1>

        <p className="text-3xl font-bold text-gray-300 mb-7">
          Příjmy? Stejné jako minulý měsíc.
        </p>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Každ�� měsíc to samé:
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-4 bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <span className="text-4xl">💰</span>
              <div className="flex-1">
                <p className="text-xl font-bold text-gray-900">Nájem: 25.000 Kč</p>
                <p className="text-base text-gray-600">(Vždycky přijde)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <span className="text-4xl">💳</span>
              <div className="flex-1">
                <p className="text-xl font-bold text-gray-900">Faktury: 18.000 Kč</p>
                <p className="text-base text-gray-600">(Dodavatelé čekají)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
              <span className="text-4xl">👨‍💼</span>
              <div className="flex-1">
                <p className="text-xl font-bold text-gray-900">Mzdy: 32.000 Kč</p>
                <p className="text-base text-gray-600">(Zaměstnanci počítají)</p>
              </div>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="bg-red-100 rounded-lg p-5 border-2 border-red-500">
              <p className="text-3xl font-black text-red-700 mb-2">
                CELKEM: 75.000 Kč
              </p>
              <p className="text-lg text-gray-700">
                A ty pořád nevíš, <span className="font-bold">jak vydělat víc.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-3xl w-full border-2 border-white/30">
          <p className="text-2xl font-black text-white mb-4">
            CO KDYBY PŘÍŠTÍ MĚSÍC...
          </p>
          <div className="space-y-2 text-left text-lg">
            <p className="text-white">✓ <span className="font-bold">Věděl jsi komu prodávat?</span></p>
            <p className="text-white">✓ <span className="font-bold">Marketing fungoval?</span></p>
            <p className="text-white">✓ <span className="font-bold">Příjmy rostly?</span></p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-6 mb-6 shadow-xl">
          <p className="text-3xl font-black mb-2">
            90 MINUT = JASNÝ PLÁN
          </p>
          <p className="text-xl">
            Podnikatelská Čtvrtka • 4.999 Kč
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">ZMĚNIT TO! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          🔥 Prvních 50 • Začni teď
        </p>
      </div>
    ),
    copy: {
      primary: `ZA 2 TÝDNY ZASE NÁJEM.

Příjmy? Stejné jako minulý měsíc.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Každý měsíc to samé:

💰 Nájem: 25.000 Kč (vždycky přijde)
💳 Faktury: 18.000 Kč (dodavatelé čekají)
👨‍💼 Mzdy: 32.000 Kč (zaměstnanci počítají)

CELKEM: 75.000 Kč

A ty pořád nevíš, jak vydělat víc.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO KDYBY PŘÍŠTÍ MĚSÍC...

✓ Věděl jsi komu prodávat?
✓ Marketing fungoval?
✓ Příjmy rostly?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

90 minut práce.
Jasný byznys model.
Jasný marketing.
Jasný plán na růst.

Investice: 4.999 Kč
Návratnost: První měsíc

🔥 Prvních 50 • Změň to teď`,
      headline: 'Za 2 týdny nájem. Zase.',
      cta: 'Změnit to'
    }
  },

  // ANGLE #3: CONSPIRACY/INSIDER - Agentura mi řekla pravdu po 6 měsících
  {
    id: 'insider-truth',
    name: 'Úhel #3: INSIDER PRAVDA',
    trigger: 'Conspiracy • Behind the scenes • Trust破壊',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    reasoning: 'Odhalení "pravdy". Lidé milují insider info. Vytváří nás vs. oni.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-yellow-500 text-black px-8 py-3 rounded-xl mb-6 shadow-lg">
          <p className="text-2xl font-black">
            🤫 INSIDER INFO
          </p>
        </div>

        <h1 className="text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Marketing agentura mi<br/>
          <span className="text-yellow-400">ŘEKLA PRAVDU</span><br/>
          po 6 měsících
        </h1>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <p className="text-xl font-bold text-gray-900 mb-5 italic">
            "Pane Nováku, upřímně..."
          </p>
          
          <div className="space-y-4 text-left">
            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-lg font-bold text-gray-900 mb-2">
                💬 "Nevíme, komu vlastně prodáváte."
              </p>
              <p className="text-sm text-gray-600">
                Stálo mě: 45.000 Kč • 6 měsíců času
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-lg font-bold text-gray-900 mb-2">
                💬 "Nemáte jasnou value proposition."
              </p>
              <p className="text-sm text-gray-600">
                Stálo mě: 38.000 Kč • Frustraci
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-lg font-bold text-gray-900 mb-2">
                💬 "Vaše positioning je slabé."
              </p>
              <p className="text-sm text-gray-600">
                Stálo mě: 52.000 Kč • Nervy
              </p>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="bg-red-100 rounded-lg p-5 border-2 border-red-400">
              <p className="text-2xl font-black text-red-700 mb-2">
                6 MĚSÍCŮ • 135.000 Kč
              </p>
              <p className="text-base text-gray-700 font-bold">
                Aby mi řekli, co jsem mohl vědět ZA 90 MINUT.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-3xl w-full border-2 border-yellow-500/50">
          <p className="text-2xl font-black text-yellow-300 mb-3">
            TOHLE TĚ NEČEKÁ:
          </p>
          <div className="space-y-2 text-left text-lg">
            <p className="text-white">✓ <span className="font-bold">Žádné měsíce čekání</span></p>
            <p className="text-white">✓ <span className="font-bold">Žádné desítky tisíc Kč</span></p>
            <p className="text-white">✓ <span className="font-bold">Žádné "zjistíme to až za..."</span></p>
          </div>
        </div>

        <div className="bg-white text-black rounded-xl px-10 py-6 mb-6 shadow-xl">
          <p className="text-3xl font-black mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl">
            90 minut • 4.999 Kč • Víš TO hned
          </p>
        </div>

        <div className="bg-yellow-400 text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI TO VĚDĚT! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          🔥 Prvních 50 • Bez keců
        </p>
      </div>
    ),
    copy: {
      primary: `MARKETING AGENTURA MI ŘEKLA PRAVDU PO 6 MĚSÍCÍCH.

"Pane Nováku, upřímně..."

���━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 "Nevíme, komu vlastně prodáváte."
→ Stálo mě: 45.000 Kč • 6 měsíců

💬 "Nemáte jasnou value proposition."
→ Stálo mě: 38.000 Kč • Frustraci

💬 "Vaše positioning je slabé."
→ Stálo mě: 52.000 Kč • Nervy

━━━━━━━━━━━━━━━━━━━━━━━━━━━

6 MĚSÍCŮ • 135.000 Kč

Aby mi řekli, co jsem mohl vědět ZA 90 MINUT.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Podnikatelský model + Hodnotová nabídka
= Všechno jasně. Hned. Za 90 minut.

• Komu prodávám
• Co je moje value proposition
• Jak se pozicionovat

Investice: 4.999 Kč
Čas: 90 minut

🔥 Prvních 50 • Bez měsíců čekání`,
      headline: 'Insider pravda z agentury',
      cta: 'Chci to vědět'
    }
  },

  // ANGLE #4: QUESTION HOOK - Proč máš plno zákazníků, ale málo peněz?
  {
    id: 'question-hook',
    name: 'Úhel #4: OTÁZKA (HOOK)',
    trigger: 'Question Hook • Pattern Interrupt • Paradox',
    budget: '80 Kč/den',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    reasoning: 'Otázka zastaví scroll. Paradox vytváří cognitive dissonance. Nutí přemýšlet.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-6xl mb-6">❓</div>

        <h1 className="text-5xl font-black text-white mb-8 leading-tight drop-shadow-lg">
          Proč máš<br/>
          <span className="text-yellow-300">PLNO ZÁKAZNÍKŮ</span><br/>
          ale málo peněz?
        </h1>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Znáš to:
          </p>
          
          <div className="space-y-4 text-left">
            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
              <p className="text-xl font-bold text-gray-900 mb-1">
                ✓ Zákazníků dost
              </p>
              <p className="text-base text-gray-600">
                E-shop běží • Objednávky chodí • Telefon zvoní
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
              <p className="text-xl font-bold text-gray-900 mb-1">
                ✓ Práce dost
              </p>
              <p className="text-base text-gray-600">
                12 hodin denně • Víkendy taky • Dovolená? Lol
              </p>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="bg-red-100 rounded-lg p-5 border-2 border-red-500">
              <p className="text-2xl font-black text-red-700 mb-2">
                ✗ PENĚZ MÁLO
              </p>
              <p className="text-base text-gray-700">
                Nájem? Sotva. Investice? Žádné. Rezerva? Ha!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400/20 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-3xl w-full border-2 border-yellow-400/50">
          <p className="text-2xl font-black text-yellow-300 mb-4">
            ODPOVĚĎ:
          </p>
          <div className="space-y-3 text-left text-lg">
            <p className="text-white">
              ❌ <span className="font-bold">Špatný segment</span> <span className="text-gray-300">(levní zákazníci)</span>
            </p>
            <p className="text-white">
              ❌ <span className="font-bold">Špatná value prop</span> <span className="text-gray-300">(prodáváš cenu, ne hodnotu)</span>
            </p>
            <p className="text-white">
              ❌ <span className="font-bold">Špatné pricing</span> <span className="text-gray-300">(přežíváš, ne rosteš)</span>
            </p>
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-xl px-10 py-6 mb-6 shadow-xl">
          <p className="text-3xl font-black mb-2">
            OPRAVIT TO: 90 MINUT
          </p>
          <p className="text-xl">
            Podnikatelská Čtvrtka • Správný segment • Správné ceny
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI VÍC PENĚZ! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          🔥 Prvních 50 • Od zákazníků k penězům
        </p>
      </div>
    ),
    copy: {
      primary: `PROČ MÁŠ PLNO ZÁKAZNÍKŮ, ALE MÁLO PENĚZ?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Znáš to:

✓ Zákazníků dost
→ E-shop běží • Objednávky chodí

✓ Práce dost  
→ 12 hodin denně • Víkendy taky

✗ PENĚZ MÁLO
→ Nájem? Sotva. Rezerva? Ha!

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ODPOVĚĎ:

❌ Špatný segment (levní zákazníci)
❌ Špatná value prop (prodáváš cenu)
❌ Špatné pricing (přežíváš, ne rosteš)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPRAVIT TO: 90 MINUT

PODNIKATELSKÁ ČTVRTKA

Podnikatelský model:
• Správný zákaznický segment
• Správná hodnotová nabídka
• Správné pricing

Hodnotová nabídka:
• Co skutečně řešíš
• Co je tvá hodnota
• Proč si vybrat tebe

90 minut práce = jasný plán na víc peněz.

🔥 Prvních 50 • Od zákazníků k penězům`,
      headline: 'Plno zákazníků, málo peněz?',
      cta: 'Chci víc peněz'
    }
  },

  // ANGLE #5: SHOCKING STAT - 83% nemá byznys plán
  {
    id: 'shocking-stat',
    name: 'Úhel #5: SHOCKING STAT',
    trigger: 'Social Proof • Fear • Authority',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
    reasoning: 'Čísla jsou důvěryhodná. Vysoké procento = "nejsem jediný". Ale zároveň strach.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-white text-red-600 px-10 py-4 rounded-xl mb-6 shadow-2xl border-4 border-red-500">
          <p className="text-6xl font-black">
            83%
          </p>
        </div>

        <h1 className="text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          podnikatelů v ČR<br/>
          <span className="text-red-300">NEMÁ BYZNYS PLÁN</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-7">
          Proto 7 z 10 firem zkrachuje do 5 let.
        </p>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Bez plánu = bez šance:
          </p>
          
          <div className="space-y-4">
            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">Nevíš komu prodávat</span>
                <span className="text-3xl font-black text-red-600">71%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-red-600 h-3 rounded-full" style={{ width: '71%' }}></div>
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">Nevíš proč si tě vybrat</span>
                <span className="text-3xl font-black text-orange-600">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-orange-600 h-3 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">Nevíš jak získat zákazníky</span>
                <span className="text-3xl font-black text-yellow-600">64%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="bg-green-50 rounded-lg p-5 border-2 border-green-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">Má jasný plán</span>
                <span className="text-3xl font-black text-green-600">17%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '17%' }}></div>
              </div>
              <p className="text-base text-gray-700 mt-3 font-bold">
                → Tihle podnikatelé přežívají. A rostou.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-3xl w-full border-2 border-white/30">
          <p className="text-2xl font-black text-yellow-300 mb-3">
            BUĎ V TĚCH 17%
          </p>
          <p className="text-lg text-white">
            90 minut práce • Jasný byznys model • Jasný marketing plán
          </p>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-6 mb-6 shadow-xl">
          <p className="text-3xl font-black mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl">
            4.999 Kč • První v ČR • Konkrétní nástroje
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI MÍT PLÁN! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          🔥 Prvních 50 • Buď v top 17%
        </p>
      </div>
    ),
    copy: {
      primary: `83% PODNIKATELŮ V ČR NEMÁ BYZNYS PLÁN.

Proto 7 z 10 firem zkrachuje do 5 let.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEZ PLÁNU = BEZ ŠANCE:

❌ 71% nevíš komu prodávat
❌ 68% nevíš proč si tě vybrat
❌ 64% nevíš jak získat zákazníky

━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 17% MÁ JASNÝ PLÁN

→ Tihle podnikatelé přežívají. A rostou.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUĎ V TĚCH 17%

PODNIKATELSKÁ ČTVRTKA

90 minut práce.
Jasný byznys model.
Jasný marketing plán.

Podnikatelský model + Hodnotová nabídka
= První konkrétní nástroje v češtině.

Investice: 4.999 Kč
Čas: 90 minut

🔥 Prvních 50 • Buď v top 17%`,
      headline: '83% nemá plán. Ty?',
      cta: 'Chci mít plán'
    }
  },

  // ANGLE #6: REVERSE PSYCHOLOGY - Tohle není pro tebe, pokud...
  {
    id: 'reverse-psychology',
    name: 'Úhel #6: REVERSE (NENÍ PRO TEBE)',
    trigger: 'Reverse Psychology • Kvalifikace • Challenge',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    reasoning: 'Reverse psychology filtruje. Vytváří výzvu. "Není pro všechny" = premium positioning.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-red-600 text-white px-10 py-4 rounded-xl mb-6 shadow-2xl border-4 border-red-700">
          <p className="text-3xl font-black">
            ⚠️ POZOR
          </p>
        </div>

        <h1 className="text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Tohle <span className="text-red-400">NENÍ PRO TEBE</span><br/>
          pokud...
        </h1>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4 bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <span className="text-3xl">❌</span>
              <div>
                <p className="text-lg font-bold text-gray-900">Chceš "rychlé peníze"</p>
                <p className="text-sm text-gray-600">
                  Tohle je byznys strategie, ne pyramid scheme.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <span className="text-3xl">❌</span>
              <div>
                <p className="text-lg font-bold text-gray-900">Hledáš "zázračné řešení"</p>
                <p className="text-sm text-gray-600">
                  Musíš to aplikovat. My dáme nástroje, ty práci.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <span className="text-3xl">❌</span>
              <div>
                <p className="text-lg font-bold text-gray-900">Nemáš 90 minut času</p>
                <p className="text-sm text-gray-600">
                  Pokud nemáš čas na strategii, máš větší problém.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <span className="text-3xl">❌</span>
              <div>
                <p className="text-lg font-bold text-gray-900">Chceš "teorie a kurzy"</p>
                <p className="text-sm text-gray-600">
                  Tohle jsou konkrétní nástroje. Pracovní šablony. Ne videa.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/20 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-3xl w-full border-2 border-green-500/50">
          <p className="text-2xl font-black text-green-300 mb-4">
            TOHLE JE PRO TEBE, POKUD:
          </p>
          <div className="space-y-2 text-left text-lg">
            <p className="text-white">✓ <span className="font-bold">Chceš jasnou strategii</span></p>
            <p className="text-white">✓ <span className="font-bold">Jsi ready na práci</span></p>
            <p className="text-white">✓ <span className="font-bold">Bereš business vážně</span></p>
            <p className="text-white">✓ <span className="font-bold">Chceš konkrétní nástroje</span></p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-6 mb-6 shadow-xl">
          <p className="text-3xl font-black mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl">
            Pro seriózní podnikatele • 4.999 Kč
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">TO JSEM JÁ! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          🔥 Prvních 50 • Kvalita &gt; kvantita
        </p>
      </div>
    ),
    copy: {
      primary: `TOHLE NENÍ PRO TEBE, POKUD...

❌ Chceš "rychlé peníze"
→ Tohle je byznys strategie, ne pyramid.

❌ Hledáš "zázračné řešení"
→ Musíš to aplikovat. My nástroje, ty práce.

❌ Nemáš 90 minut času
→ Pokud nemáš čas na strategii, máš větší problém.

❌ Chceš "teorie a kurzy"
→ Tohle jsou konkrétní nástroje. Ne videa.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOHLE JE PRO TEBE, POKUD:

✓ Chceš jasnou strategii
✓ Jsi ready na práci
✓ Bereš business vážně
✓ Chceš konkrétní nástroje

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Podnikatelský model + Hodnotová nabídka.
90 minut práce.
Hotový plán.

Pro seriózní podnikatele.
Kteří chtějí výsledky.
Ne kecy.

Investice: 4.999 Kč
Čas: 90 minut

🔥 Prvních 50 • Kvalita &gt; kvantita`,
      headline: 'Není pro každého',
      cta: 'To jsem já'
    }
  },

  // ANGLE #7: SOCIAL PROOF - 152 podnikatelů už má jasno
  {
    id: 'social-proof',
    name: 'Úhel #7: SOCIAL PROOF',
    trigger: 'FOMO • Bandwagon • Social Validation',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
    reasoning: 'Social proof = trust. Konkrétní číslo = věrohodnost. "Už mají" = FOMO.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-white text-green-600 px-10 py-4 rounded-xl mb-6 shadow-2xl border-4 border-green-500">
          <p className="text-6xl font-black">
            152
          </p>
        </div>

        <h1 className="text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          podnikatelů<br/>
          <span className="text-green-300">UŽ MÁ JASNO</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-7">
          Ty pořád čekáš?
        </p>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Co už mají:
          </p>
          
          <div className="space-y-4 text-left">
            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">✓</span>
                <p className="text-xl font-bold text-gray-900">Jasný zákaznický segment</p>
              </div>
              <p className="text-base text-gray-600 pl-12">
                Vědí, komu přesně prodávat. Ne všem. Správným lidem.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">✓</span>
                <p className="text-xl font-bold text-gray-900">Jasný marketing</p>
              </div>
              <p className="text-base text-gray-600 pl-12">
                Vědí, co říkat. Jak oslovit. Proč si je vybrat.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">✓</span>
                <p className="text-xl font-bold text-gray-900">Jasný revenue model</p>
              </div>
              <p className="text-base text-gray-600 pl-12">
                Vědí, odkud plynou peníze. A jak vydělat víc.
              </p>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="bg-blue-50 rounded-lg p-5 border-2 border-blue-500">
              <p className="text-lg font-bold text-gray-900 mb-2">
                📊 Průměrný čas do akce:
              </p>
              <p className="text-3xl font-black text-blue-700">
                2,4 dne
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Od Čtvrtky k prvnímu kroku.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-3xl w-full border-2 border-white/30">
          <p className="text-2xl font-black text-white mb-3">
            TY POŘÁD:
          </p>
          <div className="space-y-2 text-left text-lg">
            <p className="text-gray-300">❓ Nevíš komu prodávat</p>
            <p className="text-gray-300">❓ Nevíš jak marketingovat</p>
            <p className="text-gray-300">❓ Nevíš kde jsou peníze</p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-6 mb-6 shadow-xl">
          <p className="text-3xl font-black mb-2">
            PŘIPOJ SE K NIM
          </p>
          <p className="text-xl">
            Podnikatelská Čtvrtka • 4.999 Kč • 90 minut
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI JASNO! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
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

━━━━━━━━━━━━━━━━━━━━━━━━━━━

TY POŘÁD:

❓ Nevíš komu prodávat
❓ Nevíš jak marketingovat
❓ Nevíš kde jsou peníze

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PŘIPOJ SE K NIM.

PODNIKATELSKÁ ČTVRTKA

Podnikatelský model + Hodnotová nabídka.
90 minut práce.
Hotový plán.

Investice: 4.999 Kč

🔥 Zbývá 50 míst • Nebuď poslední`,
      headline: '152 už má jasno. Ty?',
      cta: 'Chci jasno'
    }
  },

  // ANGLE #8: FOMO URGENCE - Před měsícem 100 míst, dnes 8
  {
    id: 'fomo-urgence',
    name: 'Úhel #8: FOMO / SCARCITY',
    trigger: 'FOMO • Scarcity • Urgence • Time pressure',
    budget: '90 Kč/den (HIGH)',
    background: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)',
    reasoning: 'Scarcity works. Konkrétní čísla = trust. Countdown = urgence. Fear of loss > desire to gain.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-red-600 text-white px-10 py-4 rounded-xl mb-6 shadow-2xl animate-pulse">
          <p className="text-3xl font-black">
            ⏰ POZOR
          </p>
        </div>

        <h1 className="text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Před měsícem:<br/>
          <span className="text-green-400">100 míst</span>
        </h1>

        <h2 className="text-6xl font-black mb-8 leading-tight" style={{ color: '#fbbf24', textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 3px 3px 6px rgba(0,0,0,0.9)' }}>
          Dnes: 8 míst
        </h2>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Timeline:
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-black">✓</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-gray-900">Před 4 týdny</p>
                <p className="text-base text-gray-600">100 míst • Průkopnická cena</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-black">✓</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-gray-900">Před 3 týdny</p>
                <p className="text-base text-gray-600">72 míst zbývá</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-black">!</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-gray-900">Před 2 týdny</p>
                <p className="text-base text-gray-600">41 míst zbývá</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-black">⚠</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-gray-900">Před týdnem</p>
                <p className="text-base text-gray-600">19 míst zbývá</p>
              </div>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="flex items-center gap-4 bg-red-100 rounded-lg p-4 border-2 border-red-500">
              <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 animate-pulse">
                <span className="text-2xl font-black">🔥</span>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-black text-red-700">DNES</p>
                <p className="text-3xl font-black text-red-600">8 MÍST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-3xl w-full border-2 border-yellow-500/50">
          <p className="text-xl font-black text-yellow-300 mb-3">
            PO 50. ZÁKAZNÍKOVI:
          </p>
          <div className="space-y-2 text-left text-lg">
            <p className="text-white">❌ <span className="font-bold">Cena jde nahoru</span> (z 4.999 na 8.299 Kč)</p>
            <p className="text-white">❌ <span className="font-bold">Bonusy mizí</span> (mini kurz zdarma končí)</p>
            <p className="text-white">❌ <span className="font-bold">Průkopnická cena končí</span> (navždy)</p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-6 mb-6 shadow-xl border-4 border-yellow-500">
          <p className="text-3xl font-black mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl">
            4.999 Kč • Jen pro prvních 50
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4 animate-pulse">
          <p className="text-4xl font-black">CHCI MÍSTO! →</p>
        </div>

        <p className="text-red-300 text-xl font-bold">
          🔥 8 míst • Pak cena 66% VÝŠE
        </p>
      </div>
    ),
    copy: {
      primary: `⏰ PŘED MĚSÍCEM: 100 MÍST

DNES: 8 MÍST

━━━━━━━━━━━━━━━━━━━━━━━━━━━

TIMELINE:

✓ Před 4 týdny → 100 míst
✓ Před 3 týdny → 72 míst
⚠ Před 2 týdny → 41 míst
⚠ Před týdnem → 19 míst

🔥 DNES → 8 MÍST

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PO 50. ZÁKAZNÍKOVI:

❌ Cena jde nahoru (z 4.999 na 8.299 Kč)
❌ Bonusy mizí (mini kurz zdarma končí)
❌ Průkopnická cena končí (navždy)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Podnikatelský model + Hodnotová nabídka.
90 minut práce.
Jasný plán.

Investice: 4.999 Kč (jen prvních 50)
Po 50. místu: 8.299 Kč

🔥 8 MÍST • Pak cena 66% výše

Neváhej. Cena roste každý den.`,
      headline: 'Před měsícem 100 míst. Dnes 8.',
      cta: 'Chci místo'
    }
  },

  // ANGLE #9: FUTURE PACING - Představ si, že za 3 měsíce...
  {
    id: 'future-pacing',
    name: 'Úhel #9: FUTURE PACING',
    trigger: 'Visualization • Hope • Positive Emotion',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    reasoning: 'Future pacing = visualization. Mozek neumí rozlišit představu vs realitu. Creates desire.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-6xl mb-6">✨</div>

        <h1 className="text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Představ si,<br/>
          že <span className="text-blue-300">ZA 3 MĚSÍCE...</span>
        </h1>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <div className="space-y-5 text-left">
            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
              <p className="text-xl font-bold text-gray-900 mb-2">
                💰 Víš přesně, komu prodávat
              </p>
              <p className="text-base text-gray-600">
                Ne "všem". Tvému ideálnímu zákazníkovi. Ten, kdo platí dobré peníze. 
                Ten, kdo tě doporučuje. Ten, s kým je radost pracovat.
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
      primary: `PŘEDSTAV SI, ŽE ZA 3 MĚSÍCE...

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 VÍŠ PŘESNĚ, KOMU PRODÁVAT

Ne "všem". Tvému ideálnímu zákazníkovi.
Ten, kdo platí dobré peníze.
Ten, kdo tě doporučuje.
Ten, s kým je radost pracovat.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
      headline: 'Představ si za 3 měsíce...',
      cta: 'Chci to taky'
    }
  },

  // ANGLE #10: PAIN AGITATION - Každý večer říkáš "zítra to změním"
  {
    id: 'pain-agitation',
    name: 'Úhel #10: PAIN AGITATION',
    trigger: 'Pain • Frustration • Breaking Point • Empathy',
    budget: '85 Kč/den',
    background: 'linear-gradient(135deg, #4c1d95 0%, #6b21a8 100%)',
    reasoning: 'Deep pain recognition. "He gets me". Agituje bolest. Pak řešení. Classic copywriting.',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-6xl mb-6">💭</div>

        <h1 className="text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
          Každý večer<br/>
          <span className="text-purple-300">ŘÍKÁŠ SOBĚ:</span>
        </h1>

        <p className="text-3xl font-bold text-gray-300 mb-7 italic">
          "Zítra to změním."
        </p>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Ale ráno:
          </p>
          
          <div className="space-y-4 text-left">
            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-xl font-bold text-gray-900 mb-2">
                🌅 6:30 - Vstáváš unavený
              </p>
              <p className="text-base text-gray-600">
                Další den. Stejné problémy. Stejný chaos.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-xl font-bold text-gray-900 mb-2">
                📧 8:00 - Otevřeš emaily
              </p>
              <p className="text-base text-gray-600">
                Urgentní. Faktury. Problémy. Změna? Žádný čas.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-xl font-bold text-gray-900 mb-2">
                🔥 12:00 - Hasiči požárů
              </p>
              <p className="text-base text-gray-600">
                Zákazník reklamuje. Dodavatel zpozdil. Zaměstnanec nemocný.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-xl font-bold text-gray-900 mb-2">
                😩 22:00 - Padáš do postele
              </p>
              <p className="text-base text-gray-600">
                Změna? Nestihli jste. Zase.
              </p>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="bg-red-100 rounded-lg p-5 border-2 border-red-500">
              <p className="text-2xl font-black text-red-700 mb-2 italic">
                "Zítra to změním."
              </p>
              <p className="text-base text-gray-700">
                Kolikrát už jsi si to řekl? 100x? 200x?
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-600/20 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-3xl w-full border-2 border-purple-500/50">
          <p className="text-2xl font-black text-purple-300 mb-4">
            PROBLÉM NENÍ V TOBĚ.
          </p>
          <p className="text-lg text-white mb-3">
            Problém je, že nemáš <span className="font-bold">JASNÝ PLÁN.</span>
          </p>
          <p className="text-base text-gray-300">
            Nemůžeš změnit, co nevidíš jasně. Proto Business Model Canvas existuje.
          </p>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-6 mb-6 shadow-xl">
          <p className="text-3xl font-black mb-2">
            ZMĚNIT TO: 90 MINUT
          </p>
          <p className="text-xl">
            Podnikatelská Čtvrtka • 4.999 Kč • Konec prokrastinace
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">DNES TO ZMĚNÍM! →</p>
        </div>

        <p className="text-purple-300 text-xl font-bold">
          🔥 Prvních 50 • Ne zítra. DNES.
        </p>
      </div>
    ),
    copy: {
      primary: `KAŽDÝ VEČER ŘÍKÁŠ SOBĚ:

"Zítra to změním."

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALE RÁNO:

🌅 6:30 - Vstáváš unavený
→ Další den. Stejné problémy.

📧 8:00 - Otevřeš emaily
→ Urgentní. Faktury. Problémy. Změna? Žádný čas.

🔥 12:00 - Hasiči požárů
→ Zákazník reklamuje. Dodavatel zpozdil.

😩 22:00 - Padáš do postele
→ Změna? Nestihli jste. Zase.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Zítra to změním."

Kolikrát už jsi si to řekl?
100x? 200x?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLÉM NENÍ V TOBĚ.

Problém je, že nemáš JASNÝ PLÁN.

Nemůžeš změnit, co nevidíš jasně.
Proto Business Model Canvas existuje.

━━━━━━━━━━━━━━━━━���━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

90 minut práce.
Jasný byznys model.
Jasný marketing.
Jasný plán.

Konec prokrastinace.
Konec "zítra to změním".
Konec chaosu.

Investice: 4.999 Kč
Čas: 90 minut

🔥 Prvních 50 • Ne zítra. DNES.`,
      headline: 'Každý večer: "Zítra to změním"',
      cta: 'Dnes to změním'
    }
  }
];

export default function TenNewAngles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCopy, setShowCopy] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentAngle = tenAngles[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? tenAngles.length - 1 : prev - 1));
    setShowCopy(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === tenAngles.length - 1 ? 0 : prev + 1));
    setShowCopy(false);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-4">
            🎯 10 NOVÝCH ÚHLŮ
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            Různé psychologické triggery • Realistické pain points • Testuj a ladíme!
          </p>
          <div className="bg-blue-500/20 border-2 border-blue-400 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-xl text-blue-300 font-bold mb-3">
              💡 STRATEGIE TESTOVÁNÍ:
            </p>
            <p className="text-base text-white leading-relaxed">
              Každý úhel má jiný psychologický trigger. Loss aversion (ztráta) vs. Gain (zisk). 
              Fear vs. Hope. Social proof vs. Scarcity. Otestuj minimálně 3 různé úhly, 
              pak vyber top 2 a optimalizuj design! 🚀
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={goToPrevious}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Předchozí
          </button>
          
          <div className="text-white text-xl font-bold">
            {currentIndex + 1} / {tenAngles.length}
          </div>
          
          <button
            onClick={goToNext}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            Další
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tenAngles.map((angle, index) => (
            <button
              key={angle.id}
              onClick={() => {
                setCurrentIndex(index);
                setShowCopy(false);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                currentIndex === index
                  ? 'bg-blue-500 text-white scale-110'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              #{index + 1}
            </button>
          ))}
        </div>

        {/* Current Angle Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm mb-1">Název</p>
              <p className="text-white text-xl font-bold">{currentAngle.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Trigger</p>
              <p className="text-yellow-300 text-xl font-bold">{currentAngle.trigger}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Budget</p>
              <p className="text-green-300 text-xl font-bold">{currentAngle.budget}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-gray-400 text-sm mb-2">Proč tento úhel:</p>
            <p className="text-white text-base">{currentAngle.reasoning}</p>
          </div>
        </div>

        {/* Ad Preview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="flex justify-center items-center mb-6">
            <button
              onClick={() => setShowCopy(!showCopy)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-colors text-lg font-bold"
            >
              {showCopy ? '🎨 Zobrazit Design' : '📝 Zobrazit Copy'}
            </button>
          </div>

          {!showCopy ? (
            <div
              className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: currentAngle.background,
                aspectRatio: '1080/1350'
              }}
            >
              {currentAngle.content}
            </div>
          ) : (
            <div className="w-full max-w-3xl mx-auto">
              <div className="bg-gray-900 rounded-xl p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Primary Text</h3>
                  <button
                    onClick={() => copyToClipboard(currentAngle.copy.primary, 0)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {copiedIndex === 0 ? (
                      <>
                        <Check className="w-4 h-4" />
                        Zkopírováno!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Kopírovat
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                  {currentAngle.copy.primary}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">Headline</h3>
                    <button
                      onClick={() => copyToClipboard(currentAngle.copy.headline, 1)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {copiedIndex === 1 ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">{currentAngle.copy.headline}</p>
                </div>

                <div className="bg-gray-900 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">CTA</h3>
                    <button
                      onClick={() => copyToClipboard(currentAngle.copy.cta, 2)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {copiedIndex === 2 ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">{currentAngle.copy.cta}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            💡 Tip: Zkus každý úhel 3-5 dní s budgetem 70-90 Kč/den. 
            Pak vyber top 2 podle CTR a konverzí!
          </p>
        </div>
      </div>
    </div>
  );
}
