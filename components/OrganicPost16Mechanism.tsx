// 🎯 ORGANIC POST #16 - MECHANISM
// "Proč to funguje" - Odbourávání obav "je to moc jednoduché?"
// Static - 4 karty/důvody

import { Target, MessageSquare, Award, Zap } from 'lucide-react';

export function OrganicPost16Mechanism() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-12 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-9xl">🤔</div>
        <div className="absolute bottom-20 right-20 text-9xl">✨</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5">💡</div>
      </div>

      {/* Main content box */}
      <div className="relative z-10 bg-white/95 backdrop-blur rounded-3xl p-12 shadow-2xl max-w-4xl w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-gray-900 leading-tight">
            "Není to moc jednoduché?"
          </h1>
          <p className="text-xl text-gray-600 leading-snug">
            90 minut zní <span className="font-black text-orange-600">podezřele rychle</span>.<br/>
            Ale tady je <span className="font-black text-blue-600">PROČ to funguje</span>:
          </p>
        </div>

        {/* Separator */}
        <div className="border-t-4 border-purple-200"></div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Card 1 - Positioning */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 flex flex-col shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/20 rounded-xl p-2">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-black text-white leading-tight">
                POZICOVÁNÍ<br/>ZABUDOVANÉ
              </h2>
            </div>
            <p className="text-sm text-white/95 leading-relaxed">
              Neříkáš jen "co prodávám".<br/>
              Říkáš <span className="font-black">"PROČ si mě vybrat"</span> místo konkurence.<br/>
              → Vidíš jak se odlišit.
            </p>
          </div>

          {/* Card 2 - Marketing */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 flex flex-col shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/20 rounded-xl p-2">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-black text-white leading-tight">
                MARKETING<br/>JE TAM UŽ
              </h2>
            </div>
            <p className="text-sm text-white/95 leading-relaxed">
              Když víš <span className="font-black">CO tvůj segment chce</span>...<br/>
              ...víš PŘESNĚ co jim říct v marketingu.<br/>
              → <span className="font-black">Ušetříš spoustu peněz</span> a přilákáš zákazníky.
            </p>
          </div>

          {/* Card 3 - Verified */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 flex flex-col shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/20 rounded-xl p-2">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-black text-white leading-tight">
                OVĚŘENÉ<br/>NA PRAXI
              </h2>
            </div>
            <p className="text-sm text-white/95 leading-relaxed">
              Není to školská teorie.<br/>
              Je to <span className="font-black">postavené na reálných byznysech</span>.<br/>
              → 27 podnikatelů. 1,4M Kč investic.
            </p>
          </div>

          {/* Card 4 - Essential */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 flex flex-col shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/20 rounded-xl p-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-black text-white leading-tight">
                JEN<br/>PODSTATNÉ
              </h2>
            </div>
            <p className="text-sm text-white/95 leading-relaxed">
              Ne 50 stránek teorie.<br/>
              Jen <span className="font-black">9 polí co DOOPRAVDY fungují</span>.<br/>
              → Žádné kecy. Jen strategie.
            </p>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t-4 border-purple-200"></div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Model není zjednodušení.
          </div>
          <div className="text-3xl font-black text-slate-800">
            Je to PŘESNĚ CO POTŘEBUJEŠ.
          </div>
          <div className="text-lg text-slate-600">
            Celý byznys. Jedna stránka.
          </div>
        </div>

      </div>

    </div>
  );
}

export function OrganicPost16MechanismCopy() {
  return `❓ "Není to moc jednoduché na to, aby to fungovalo?"

━━━━━━━━━━━━━━━━━━━━━━━

Chápu proč tomu nevěříš.

Něco tak jednoduchýho prostě NENÍ.

Nebo aspoň... nebylo.

━━━━━━━━━━━━━━━━━━━━━━━

Protože víš jak to většinou vypadá?

Buď máš skvělý nápad a chceš začít...

...NEBO už podnikáš, ale nevíš co KONKRÉTNĚ dělat, aby to šlo k lepšímu.

A v obou případech... nevíš KDE začít.

━━━━━━━━━━━━━━━━━━━━━━━

Protože na trhu prostě NEBYLO nic jednoduchýho.

Co by ti dalo:

✅ Celý byznys na jednom místě
✅ Jasnej postup KDE začít
✅ A VŠE co potřebuješ hned na startu

━━━━━━━━━━━━━━━━━━━━━━━

Proto Model.

90 minut. Jedna stránka. Hotovo.

━━━━━━━━━━━━━━━━━━━━━━━

27 podnikatelů už BEZPEČNĚ investovalo 1,4M Kč do svých byznysů.

━━━━━━━━━━━━━━━━━━━━━━━

Podnikatelská Čtvrtka
90 minut • Konkrétní výsledek

👉 www.podnikatelskactvrtka.cz

#podnikani #model #marketing #validace`;
}
