// 🎨 AD CREATIVES VARIANT 3 - NOVÉ STYLY (BEZ "UŠETŘÍTE")
// Focus: Jiné hooks - curiosity, authority, quick wins

// 🔍 AD VARIANT 7: CURIOSITY HOOK (proč to funguje?)
export function AdVariant7Curiosity() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center p-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl" />
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Hook question */}
        <div className="mb-8">
          <div className="text-yellow-300 text-5xl font-black mb-4 leading-tight">
            Proč někteří podnikatelé
          </div>
          <div className="text-white text-5xl font-black leading-tight">
            mají fungující byznys...
          </div>
          <div className="text-gray-300 text-4xl font-bold mt-4 leading-tight">
            ...a jiní ne?
          </div>
        </div>
        
        {/* Answer tease */}
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 mb-8">
          <p className="text-white text-2xl font-bold mb-4 leading-relaxed">
            Není to o štěstí.<br/>
            Není to o penězích na reklamu.<br/>
            Není to o zkušenostech.
          </p>
          <p className="text-blue-300 text-4xl font-black">
            Je to o JASNÉM PLÁNU.
          </p>
        </div>
        
        {/* Solution intro */}
        <div className="mb-8">
          <p className="text-white text-2xl font-semibold mb-4">
            PODNIKATELSKÁ ČTVRTKA vás naučí:
          </p>
          <div className="space-y-2 text-left max-w-3xl mx-auto">
            <div className="flex items-start gap-3 text-white text-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <span className="font-semibold">Jasný obchodní model</span>
            </div>
            <div className="flex items-start gap-3 text-white text-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <span className="font-semibold">Přesné zacílení</span>
            </div>
            <div className="flex items-start gap-3 text-white text-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <span className="font-semibold">Fungující prodejní strategie</span>
            </div>
          </div>
        </div>
        
        {/* Průkopník CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-6">
          <p className="text-green-100 text-lg font-bold mb-2">PRŮKOPNICKÁ NABÍDKA</p>
          <p className="text-white text-3xl font-black mb-2">
            První 50 lidí dostane
          </p>
          <p className="text-white text-xl font-bold">
            🎁 Mini kurz ZDARMA + 💎 Konzultaci
          </p>
        </div>
        
        {/* CTA button */}
        <button className="bg-white text-gray-900 px-10 py-5 rounded-xl text-2xl font-black shadow-2xl hover:scale-105 transition-transform mb-3">
          CHCI FUNGUJÍCÍ SYSTÉM! →
        </button>
        
        {/* Urgence */}
        <p className="text-yellow-300 text-base font-bold">
          ⚡ Limitovaná kapacita • Prvních 50 míst
        </p>
      </div>
    </div>
  );
}

// 💪 AD VARIANT 8: AUTHORITY/DIRECT (bez keců, rovnou k věci)
export function AdVariant8Authority() {
  return (
    <div className="w-[1080px] h-[1080px] bg-white relative overflow-hidden flex items-center justify-center p-12">
      {/* Minimal decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full mb-4">
            <p className="font-black text-lg">BEZ KECŮ • ROVNOU K VĚCI</p>
          </div>
          <h1 className="text-gray-900 text-6xl font-black mb-4 leading-tight">
            CHCETE FUNGUJÍCÍ<br/>BYZNYS?
          </h1>
          <p className="text-gray-600 text-2xl font-semibold">
            Tady je přesný plán.
          </p>
        </div>
        
        {/* The plan - numbered list */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-6 border-2 border-gray-200">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <p className="text-white text-xl font-black">1</p>
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 mb-1">Jasný obchodní model</p>
                <p className="text-base text-gray-600">Ne hádání. Přesný plán.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <p className="text-white text-xl font-black">2</p>
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 mb-1">Správné zacílení</p>
                <p className="text-base text-gray-600">Komu prodáváte. Konkrétně.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <p className="text-white text-xl font-black">3</p>
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 mb-1">Prodejní strategie</p>
                <p className="text-base text-gray-600">Jak prodávat efektivně.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <p className="text-white text-xl font-black">4</p>
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 mb-1">Testování a růst</p>
                <p className="text-base text-gray-600">Mě��íte. Upravujete. Rostete.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Simple pitch */}
        <div className="text-center mb-6">
          <p className="text-gray-900 text-2xl font-bold mb-3">
            To je PODNIKATELSKÁ ČTVRTKA.
          </p>
          <p className="text-gray-600 text-lg">
            9 stavebních prvků na jednu stránku.<br/>
            Žádné guru kecy. Jen co funguje.
          </p>
        </div>
        
        {/* Průkopník box */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-center mb-6">
          <p className="text-blue-100 text-base font-bold mb-2">PRŮKOPNICKÁ NABÍDKA</p>
          <p className="text-white text-2xl font-black mb-2">
            První 50 lidí • Speciální cena
          </p>
          <p className="text-white text-lg font-semibold">
            + Mini kurz ZDARMA + Konzultace ZDARMA
          </p>
        </div>
        
        {/* CTA */}
        <button className="w-full bg-gray-900 text-white py-5 rounded-xl text-2xl font-black shadow-xl hover:bg-gray-800 transition-colors mb-3 text-center flex items-center justify-center">
          REZERVOVAT MÍSTO →
        </button>
        
        {/* No BS footer */}
        <p className="text-center text-gray-500 text-base font-semibold">
          ✓ Žádný spam • ✓ Žádné kecy • ✓ Jen konkrétní kroky
        </p>
      </div>
    </div>
  );
}

// 🚀 AD VARIANT 9: QUICK WIN FOCUSED (rychlá jasnost)
export function AdVariant9QuickWin() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 relative overflow-hidden flex items-center justify-center p-12">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Big promise */}
        <div className="mb-8">
          <div className="inline-block bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full px-6 py-2 mb-4">
            <p className="text-white font-black text-xl">⚡ RYCHLÝ START</p>
          </div>
          <h1 className="text-white text-6xl font-black mb-4 leading-tight drop-shadow-2xl">
            JASNO V BYZNYSU<br/>
            ZA 7 DNÍ
          </h1>
          <p className="text-emerald-100 text-3xl font-bold">
            Nebo uvidíte přesně co upravit.
          </p>
        </div>
        
        {/* How it works - simple steps */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-2xl">
          <p className="text-gray-900 text-2xl font-black mb-5">JAK TO FUNGUJE:</p>
          
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <p className="text-white text-lg font-black">1</p>
              </div>
              <div>
                <p className="text-xl font-black text-gray-900">Den 1-2: Základ</p>
                <p className="text-base text-gray-600">Definujete obchodní model</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <p className="text-white text-lg font-black">2</p>
              </div>
              <div>
                <p className="text-xl font-black text-gray-900">Den 3-4: Zacílení</p>
                <p className="text-base text-gray-600">Jasno KDO a CO potřebuje</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <p className="text-white text-lg font-black">3</p>
              </div>
              <div>
                <p className="text-xl font-black text-gray-900">Den 5-7: Strategie</p>
                <p className="text-base text-gray-600">Jak prodávat a růst</p>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-5 border-t-2 border-gray-200">
            <p className="text-xl font-black text-emerald-600">
              ✓ Výsledek: Kompletní plán nebo jasno co upravit
            </p>
          </div>
        </div>
        
        {/* Průkopník offer */}
        <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-2xl p-6 mb-6">
          <p className="text-white text-xl font-bold mb-2">🔥 PRŮKOPNICKÁ VÝHODA</p>
          <p className="text-white text-3xl font-black mb-3">
            První 50 lidí
          </p>
          <div className="flex items-center justify-center gap-6 text-white text-lg font-semibold">
            <div>🎁 Mini kurz ZDARMA</div>
            <div>💎 Konzultace ZDARMA</div>
          </div>
        </div>
        
        {/* CTA */}
        <button className="bg-white text-emerald-600 px-10 py-5 rounded-xl text-2xl font-black shadow-2xl hover:scale-105 transition-transform mb-3">
          ZAČÍT TEĎ! →
        </button>
        
        {/* Guarantee */}
        <p className="text-white text-base font-bold">
          ⏰ Limitovaná kapacita • Jasný plán za týden
        </p>
      </div>
    </div>
  );
}

// 🎯 SHOWCASE PRO VARIANTY 7-9
export function AdCreativesVariant3Showcase() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Facebook Ad Creatives - NOVÉ STYLY (7-9)
        </h1>
        
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-4">✅ JINÉ HOOKS - BEZ "UŠETŘÍTE"!</h2>
          <div className="space-y-2 text-lg text-green-800">
            <p><strong>Ad #7 (Curiosity)</strong> - "Proč někteří mají plno zákazníků?"</p>
            <p><strong>Ad #8 (Authority/Direct)</strong> - "Bez keců. Rovnou k věci."</p>
            <p><strong>Ad #9 (Quick Win)</strong> - "První zákazníci za 7 dní"</p>
          </div>
        </div>
        
        <div className="space-y-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Ad Variant 7: Curiosity Hook 🔍</h2>
            <p className="text-gray-600 mb-4">Hook: Proč někteří mají úspěch? Process-focused</p>
            <div className="inline-block shadow-2xl">
              <AdVariant7Curiosity />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Ad Variant 8: Authority/Direct 💪</h2>
            <p className="text-gray-600 mb-4">No BS approach, přímý plán, minimalistický</p>
            <div className="inline-block shadow-2xl">
              <AdVariant8Authority />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Ad Variant 9: Quick Win Focus 🚀</h2>
            <p className="text-gray-600 mb-4">První výsledky za týden, action-oriented</p>
            <div className="inline-block shadow-2xl">
              <AdVariant9QuickWin />
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">🎯 TESTING STRATEGIE:</h3>
          <div className="space-y-4 text-lg text-blue-800">
            <div>
              <p className="font-bold">WEEK 1 (400 Kč/den):</p>
              <p className="ml-4">• Ad #3 (Badge) - 200 Kč/den [VALUE FOCUS]</p>
              <p className="ml-4">• Ad #8 (Direct) - 200 Kč/den [NO BS APPROACH]</p>
            </div>
            <div>
              <p className="font-bold">WEEK 2 (test winners):</p>
              <p className="ml-4">• Winner → 300 Kč/den</p>
              <p className="ml-4">• Ad #7 nebo #9 → 100 Kč/den (curiosity vs quick win)</p>
            </div>
            <div className="pt-4 border-t-2 border-blue-200">
              <p className="font-bold">💡 PROČ TYTO VARIANTY:</p>
              <p className="ml-4">• Ad #7 - Curiosity = warm audience, storytelling</p>
              <p className="ml-4">• Ad #8 - Direct = B2B, busy people, no-nonsense</p>
              <p className="ml-4">• Ad #9 - Quick Win = action-takers, impatient</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
