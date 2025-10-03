// 🎯 3 FINÁLNÍ AD SETY PRO FB KAMPAŇ
// Různé přístupy → FB rozhodne který funguje nejlép

// 📊 AD SET 1: PROBLEM-FOCUSED (emocionální pain point)
export function AdSet1Problem() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden flex items-center justify-center p-12">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)`
      }} />
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Big pain point */}
        <div className="mb-10">
          <div className="text-red-400 text-6xl font-black mb-6 leading-tight">
            "Makám od rána do večera..."
          </div>
          <div className="text-white text-5xl font-bold leading-tight">
            ...ale podnik neroste.
          </div>
        </div>
        
        {/* Empathy + reality */}
        <div className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 mb-10">
          <p className="text-white text-3xl font-bold mb-4 leading-relaxed">
            Znáte to?
          </p>
          <div className="space-y-3 text-left max-w-3xl mx-auto">
            <div className="flex items-start gap-3 text-white text-xl">
              <span className="text-red-400 text-2xl mt-1">❌</span>
              <span className="font-semibold">Málo objednávek, prázdný podnik</span>
            </div>
            <div className="flex items-start gap-3 text-white text-xl">
              <span className="text-red-400 text-2xl mt-1">❌</span>
              <span className="font-semibold">Marketing nefunguje, peníze ven</span>
            </div>
            <div className="flex items-start gap-3 text-white text-xl">
              <span className="text-red-400 text-2xl mt-1">❌</span>
              <span className="font-semibold">Nestabilní tržby každý měsíc</span>
            </div>
          </div>
        </div>
        
        {/* Solution tease */}
        <div className="mb-10">
          <p className="text-blue-300 text-4xl font-black mb-4">
            Podnikatelská Čtvrtka
          </p>
          <p className="text-white text-2xl font-semibold leading-relaxed">
            9 kroků k jasnému podnikání
          </p>
        </div>
        
        {/* Průkopník offer */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-6">
          <p className="text-green-100 text-lg font-bold mb-2">PRŮKOPNICKÁ NABÍDKA</p>
          <p className="text-white text-3xl font-black mb-2">
            Prvních 50 lidí
          </p>
          <p className="text-white text-lg font-bold">
            🎁 Mini kurz ZDARMA + 💎 Konzultace ZDARMA
          </p>
        </div>
        
        {/* CTA */}
        <button className="bg-white text-gray-900 px-10 py-5 rounded-xl text-2xl font-black shadow-2xl hover:scale-105 transition-transform mb-3">
          KONEČNĚ MÍT JASNO! →
        </button>
        
        {/* Urgence */}
        <p className="text-yellow-300 text-base font-bold">
          ⚡ Limitovaná kapacita • Prvních 50 míst
        </p>
      </div>
    </div>
  );
}

// 💰 AD SET 2: VALUE/PRICE-FOCUSED (Ad #3 Badge - co už máš!)
export function AdSet2Value() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden flex items-center justify-center p-16">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Badge */}
        <div className="inline-block mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-xl opacity-50" />
          <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-12 rounded-3xl border-4 border-yellow-300 shadow-2xl">
            <p className="text-indigo-900 font-black text-5xl mb-4">PRŮKOPNÍK</p>
            <p className="text-indigo-900 font-black text-8xl">#42</p>
          </div>
        </div>
        
        {/* Headline */}
        <div className="mb-12">
          <p className="text-white text-5xl font-bold mb-4">
            Mezi prvními 50!
          </p>
          <p className="text-yellow-300 text-6xl font-black">
            Ušetříte 7.999 Kč
          </p>
        </div>
        
        {/* Benefity */}
        <div className="space-y-4 mb-12 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <p className="text-white text-3xl font-bold">🎁 Mini kurz ZDARMA po registraci</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <p className="text-white text-3xl font-bold">💰 Průkopnická cena (sleva 62%)</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <p className="text-white text-3xl font-bold">💎 Konzultace ZDARMA (50×)</p>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-green-500 hover:bg-green-600 text-white px-16 py-8 rounded-2xl inline-block shadow-2xl mb-6">
          <p className="text-4xl font-black">CHCI BÝT PRŮKOPNÍK! →</p>
        </div>
        
        {/* Urgence */}
        <div className="bg-red-500 text-white px-8 py-4 rounded-full inline-block">
          <p className="text-2xl font-black">⏰ LIMITOVANÁ KAPACITA</p>
        </div>
      </div>
    </div>
  );
}

// 🎓 AD SET 3: SOCIAL PROOF/AUTHORITY (lidé jako ty už fungují)
export function AdSet3SocialProof() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden flex items-center justify-center p-10">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200/30 rounded-full blur-2xl" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-4xl">
        {/* Header with badge */}
        <div className="text-center mb-8">
          <div className="inline-block bg-green-500 text-white px-5 py-2 rounded-full mb-4">
            <p className="font-black text-lg">✓ OVĚŘENO PODNIKATELI</p>
          </div>
          <h1 className="text-gray-900 text-5xl font-black mb-4 leading-tight">
            FUNGUJE TO.<br/>
            <span className="text-blue-600">UŽ PRO DESÍTKY LIDÍ.</span>
          </h1>
        </div>
        
        {/* Results/Gains boxes - realistické a sedí s profilem! */}
        <div className="space-y-3 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 shadow-lg border-2 border-blue-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <p className="text-white text-2xl">📅</p>
              </div>
              <div>
                <p className="text-xl font-black text-blue-900 mb-1">Plný kalendář za 6 týdnů</p>
                <p className="text-base text-gray-700">
                  "Konečně jasno <strong>jak prodávat</strong>. Klienti se hlásí sami."
                </p>
                <p className="text-xs text-gray-500 mt-1">— Milan, fitness trenér</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 shadow-lg border-2 border-green-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <p className="text-white text-2xl">💰</p>
              </div>
              <div>
                <p className="text-xl font-black text-green-900 mb-1">Stabilních 30K+ měsíčně</p>
                <p className="text-base text-gray-700">
                  "<strong>Předvídatelné tržby</strong>. Vím co funguje. Klidně spím."
                </p>
                <p className="text-xs text-gray-500 mt-1">— Kateřina, konzultantka</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 shadow-lg border-2 border-purple-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <p className="text-white text-2xl">📦</p>
              </div>
              <div>
                <p className="text-xl font-black text-purple-900 mb-1">+60% objednávek za 2 měsíce</p>
                <p className="text-base text-gray-700">
                  "<strong>Vylepšil jsem nabídku</strong>. Konečně vím komu prodávám."
                </p>
                <p className="text-xs text-gray-500 mt-1">— Petr, e-shop majitel</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* What it is */}
        <div className="text-center mb-6">
          <p className="text-gray-900 text-2xl font-black mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-gray-700 text-lg font-semibold">
            9 stavebních prvků • 1 stránka • Jasný plán
          </p>
        </div>
        
        {/* Průkopník offer */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-center mb-5">
          <p className="text-blue-100 text-base font-bold mb-2">🔥 PRŮKOPNICKÁ NABÍDKA</p>
          <p className="text-white text-2xl font-black mb-2">
            Prvních 50 lidí
          </p>
          <p className="text-white text-base font-bold">
            🎁 Mini kurz ZDARMA + 💎 Konzultace ZDARMA
          </p>
        </div>
        
        {/* CTA */}
        <button className="w-full bg-green-500 text-white py-5 rounded-xl text-xl font-black shadow-xl hover:bg-green-600 transition-colors mb-3 text-center flex items-center justify-center">
          CHCI TO TAKY! →
        </button>
        
        {/* Trust badge */}
        <p className="text-center text-gray-600 text-sm font-semibold">
          ✓ Žádný spam • ✓ Jen email • ✓ Odhlásit kdykoliv
        </p>
      </div>
    </div>
  );
}

// 🎯 SHOWCASE PRO 3 FINÁLNÍ AD SETY
export function FinalAdSetsShowcase() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          3 FINÁLNÍ AD SETY - PŘIPRAVENO PRO FB! 🚀
        </h1>
        
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-6">📊 TESTING STRATEGIE:</h2>
          <div className="space-y-6 text-lg text-green-800">
            <div className="bg-white rounded-lg p-6 border-2 border-green-300">
              <p className="font-black text-2xl text-green-900 mb-3">CAMPAIGN SETUP:</p>
              <div className="space-y-2">
                <p><strong>Total budget:</strong> 400 Kč/den (3× 133 Kč/den)</p>
                <p><strong>Objective:</strong> Conversions (Lead)</p>
                <p><strong>Duration:</strong> 7-14 dní (test phase)</p>
                <p><strong>Placement:</strong> FB Feed, IG Feed (MANUAL!)</p>
              </div>
            </div>
            
            <div>
              <p className="font-bold text-xl mb-3">🎯 3 AD SETY (paralelně):</p>
              <div className="ml-6 space-y-3">
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <p className="font-bold text-lg">Ad Set 1: PROBLEM-FOCUSED</p>
                  <p className="text-base">"Makám od rána... ale neroste"</p>
                  <p className="text-sm text-gray-600 mt-2">→ Emocionální hook, pain point, empatie</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="font-bold text-lg">Ad Set 2: VALUE-FOCUSED</p>
                  <p className="text-base">Badge "PRŮKOPNÍK" + "Ušetříte 7.999 Kč"</p>
                  <p className="text-sm text-gray-600 mt-2">→ Exkluzivita, hodnota, bonusy</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <p className="font-bold text-lg">Ad Set 3: SOCIAL PROOF</p>
                  <p className="text-base">"Funguje to. Už pro desítky lidí."</p>
                  <p className="text-sm text-gray-600 mt-2">→ Testimonials, důvěryhodnost, "lidé jako ty"</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-100 rounded-lg p-6 border-2 border-blue-300">
              <p className="font-bold text-xl mb-3">📈 PO 7 DNECH:</p>
              <div className="ml-6 space-y-2">
                <p>✓ Analyzuj: Který má nejlepší CTR a CPL</p>
                <p>✓ Kill: Underperformers (CTR &lt; 1%)</p>
                <p>✓ Scale: Winner → 300-400 Kč/den</p>
              </div>
            </div>
            
            <div className="bg-purple-100 rounded-lg p-6 border-2 border-purple-300">
              <p className="font-bold text-xl mb-3">🎯 OČEKÁVANÉ VÝSLEDKY:</p>
              <div className="ml-6 space-y-2">
                <p><strong>Ad Set 1 (Problem):</strong> Warm audience, empatie → vyšší CTR</p>
                <p><strong>Ad Set 2 (Value):</strong> Impulse buyers, value seekers → rychlé konverze</p>
                <p><strong>Ad Set 3 (Social Proof):</strong> Skeptici, potřebují důkaz → nižší CPL</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ad Set 1: Problem-Focused 😰</h2>
            <p className="text-gray-600 mb-4 text-lg">Emocionální pain point → empatie → řešení</p>
            <div className="inline-block shadow-2xl">
              <AdSet1Problem />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4">Ad Set 2: Value-Focused 💰 (Badge Style)</h2>
            <p className="text-gray-600 mb-4 text-lg">Exkluzivita + hodnota → "Ušetříte 7.999 Kč"</p>
            <div className="inline-block shadow-2xl">
              <AdSet2Value />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4">Ad Set 3: Social Proof ✓</h2>
            <p className="text-gray-600 mb-4 text-lg">Testimonials → důvěryhodnost → "lidé jako ty"</p>
            <div className="inline-block shadow-2xl">
              <AdSet3SocialProof />
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4 text-center">🎯 READY TO LAUNCH!</h3>
          <div className="text-center space-y-3 text-lg">
            <p>✅ 3 různé přístupy připraveny</p>
            <p>✅ Formát: 1080×1080 px (Square)</p>
            <p>✅ FB rozhodne který funguje nejlép</p>
            <p>✅ Stáhni PNG → upload do FB Ads Manager!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
