// 🎯 ORGANIC POST #16 - MECHANISM
// "Proč to funguje" - Odbourávání obav "je to moc jednoduché?"
// Static - 4 karty/důvody

import { Target, MessageSquare, Award, Zap } from 'lucide-react';

export function OrganicPost16Mechanism() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-blue-50 via-white to-purple-50 p-12 flex flex-col">
      
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-5xl mb-4">🤔</p>
        <h1 className="text-6xl font-black text-gray-900 mb-4 leading-tight">
          "Není to moc jednoduché?"
        </h1>
        <p className="text-3xl text-gray-600 leading-snug">
          90 minut zní <span className="font-black text-orange-600">podezřele rychle</span>.<br/>
          Ale tady je <span className="font-black text-blue-600">PROČ to funguje</span>:
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        
        {/* Card 1 - Positioning */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 flex flex-col shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 rounded-2xl p-4">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-black text-white">
              1. POZICOVÁNÍ<br/>ZABUDOVANÉ
            </h2>
          </div>
          <p className="text-2xl text-white/95 leading-relaxed">
            Neříkáš jen "co prodávám".<br/><br/>
            Říkáš <span className="font-black">"PROČ si mě vybrat"</span> místo konkurence.<br/><br/>
            → Vidíš jak se odlišit.
          </p>
        </div>

        {/* Card 2 - Marketing */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 flex flex-col shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 rounded-2xl p-4">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-black text-white">
              2. MARKETING<br/>JE TAM UŽ
            </h2>
          </div>
          <p className="text-2xl text-white/95 leading-relaxed">
            Když víš <span className="font-black">CO tvůj segment chce</span>...<br/><br/>
            ...víš PŘESNĚ co jim říct v marketingu.<br/><br/>
            → Není to extra práce. Je to výsledek modelu.
          </p>
        </div>

        {/* Card 3 - Verified */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 flex flex-col shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 rounded-2xl p-4">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-black text-white">
              3. OVĚŘENÉ<br/>NA PRAXI
            </h2>
          </div>
          <p className="text-2xl text-white/95 leading-relaxed">
            Není to školská teorie.<br/><br/>
            Je to splácané z <span className="font-black">reálných byznysů</span>.<br/><br/>
            → 27 podnikatelů. 1,4M Kč investic.
          </p>
        </div>

        {/* Card 4 - Essential */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 flex flex-col shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 rounded-2xl p-4">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-black text-white">
              4. JEN<br/>PODSTATNÉ
            </h2>
          </div>
          <p className="text-2xl text-white/95 leading-relaxed">
            Ne 50 stránek teorie.<br/><br/>
            Jen <span className="font-black">9 polí co DOOPRAVDY potřebuješ</span>.<br/><br/>
            → Konkrétní. Použitelné. TEĎKA.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center mt-10">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8">
          <p className="text-4xl font-black text-white mb-3">
            Model není zjednodušení.
          </p>
          <p className="text-4xl font-black text-yellow-400 mb-6">
            Je to DESTILACE.
          </p>
          <p className="text-2xl text-gray-300">
            Všechno podstatné. Nic zbytečného.
          </p>
        </div>
      </div>

    </div>
  );
}

export function OrganicPost16MechanismCopy() {
  return `❓ "Není to moc jednoduché na to, aby to fungovalo?"

━━━━━━━━━━━━━━━━━━━━━━━

Tohle slyším často.
A chápu to.

90 minut zní podezřele rychle.

━━━━━━━━━━━━━━━━━━━━━━━

Ale tady je PROČ to funguje:

━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ POZICOVÁNÍ ZABUDOVANÉ

Neříkáš jen "co prodávám".
Říkáš "PROČ si mě vybrat místo konkurence".

→ Vidíš jak se odlišit.

━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ MARKETING JE TAM UŽ

Když víš CO tvůj segment chce...
...víš PŘESNĚ co jim říct v marketingu.

→ Není to extra práce. Je to výsledek modelu.

━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ OVĚŘENÉ NA PRAXI

Není to školská teorie.
Je to splácané z reálných byznysů.

→ 27 podnikatelů. 1,4M Kč investic.

━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ JEN TO PODSTATNÉ

Ne 50 stránek teorie.
Jen 9 polí co DOOPRAVDY potřebuješ.

→ Konkrétní. Použitelné. TEĎKA.

━━━━━━━━━━━━━━━━━━━━━━━

Model není zjednodušení.

Je to DESTILACE.

Všechno podstatné. Nic zbytečného.

━━━━━━━━━━━━━━━━━━━━━━━

Podnikatelská Čtvrtka
90 minut • Konkrétní výsledek

👉 www.podnikatelskactvrtka.cz

#podnikani #model #marketing #validace`;
}
