// 📝 DALŠÍ VARIANTY AD CREATIVES - TEXT-FOCUSED
// Pro A/B testing s různými hooks a messaging

// 🎯 AD VARIANT 4: PAIN POINT FOCUSED (emocionální hook)
export function AdVariant4PainPoint() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center p-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)`
      }} />
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Pain point quote */}
        <div className="mb-10">
          <div className="text-red-400 text-6xl font-black mb-4 leading-tight">
            "Makám 12 hodin denně..."
          </div>
          <div className="text-white text-5xl font-bold leading-tight">
            ...a pořád málo zákazníků.
          </div>
        </div>
        
        {/* Reality check */}
        <div className="mb-10">
          <p className="text-yellow-300 text-4xl font-black mb-4 leading-tight">
            Problém NENÍ práce.
          </p>
          <p className="text-white text-4xl font-black leading-tight">
            Problém je JAK NA TO.
          </p>
        </div>
        
        {/* Solution teaser */}
        <div className="mb-10 bg-white/5 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-8">
          <p className="text-blue-300 text-5xl font-black mb-4">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-white text-3xl font-bold">
            9 kroků k funkčnímu byznysu
          </p>
        </div>
        
        {/* Průkopník offer */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-8">
          <p className="text-white text-xl font-bold mb-2">PRŮKOPNICKÁ VÝHODA</p>
          <div className="text-white text-4xl font-black mb-3">
            Ušetřete 7.999 Kč
          </div>
          <p className="text-green-100 text-lg">
            + Mini kurz ZDARMA + Konzultace ZDARMA
          </p>
        </div>
        
        {/* CTA */}
        <button className="bg-white text-gray-900 px-10 py-5 rounded-xl text-2xl font-black shadow-2xl hover:scale-105 transition-transform mb-4">
          CHCI KONEČNĚ RŮST →
        </button>
        
        {/* Urgence */}
        <p className="text-red-400 text-lg font-bold">
          ⏰ Prvních 50 míst • Limitovaná kapacita
        </p>
      </div>
    </div>
  );
}

// 💰 AD VARIANT 5: VALUE STACK (čísla dominují)
export function AdVariant5ValueStack() {
  return (
    <div className="w-[1080px] h-[1080px] bg-white relative overflow-hidden flex items-center justify-center p-16">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full mb-6">
            <p className="font-black text-xl">⚡ PRVNÍCH 50 LIDÍ</p>
          </div>
          <h1 className="text-gray-900 text-6xl font-black mb-4">
            PRŮKOPNICKÁ MATEMATIKA
          </h1>
        </div>
        
        {/* Value breakdown */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 border-4 border-gray-200 mb-8">
          <div className="space-y-6">
            {/* Item 1 */}
            <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300">
              <div>
                <p className="text-2xl font-bold text-gray-800">Kurz Podnikatelská Čtvrtka</p>
                <p className="text-lg text-gray-600">9 stavebních prvků • Krok za krokem</p>
              </div>
              <p className="text-3xl font-black text-gray-900">8.499 Kč</p>
            </div>
            
            {/* Item 2 */}
            <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300">
              <div>
                <p className="text-2xl font-bold text-purple-600">🎁 3-denní mini kurz</p>
                <p className="text-lg text-purple-500">ZDARMA po registraci</p>
              </div>
              <p className="text-3xl font-black text-purple-600">2.999 Kč</p>
            </div>
            
            {/* Item 3 */}
            <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300">
              <div>
                <p className="text-2xl font-bold text-green-600">💎 30min konzultace</p>
                <p className="text-lg text-green-500">ZDARMA (prvních 50)</p>
              </div>
              <p className="text-3xl font-black text-green-600">1.500 Kč</p>
            </div>
            
            {/* Total */}
            <div className="flex justify-between items-center pt-4">
              <p className="text-3xl font-black text-gray-800">CELKOVÁ HODNOTA:</p>
              <p className="text-5xl font-black text-blue-600">12.998 Kč</p>
            </div>
          </div>
        </div>
        
        {/* Průkopník price */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-center mb-8">
          <p className="text-white text-2xl font-bold mb-2">VAŠE PRŮKOPNICKÁ CENA</p>
          <div className="flex items-center justify-center gap-6">
            <p className="text-white/60 text-4xl font-bold line-through">12.998 Kč</p>
            <p className="text-white text-7xl font-black">4.999 Kč</p>
          </div>
          <p className="text-green-100 text-2xl font-bold mt-4">
            💰 Ušetříte 7.999 Kč (62%)
          </p>
        </div>
        
        {/* CTA */}
        <button className="w-full bg-blue-600 text-white py-7 rounded-2xl text-3xl font-black shadow-xl hover:bg-blue-700 transition-colors">
          CHCI PRŮKOPNICKOU CENU! →
        </button>
      </div>
    </div>
  );
}

// 🎓 AD VARIANT 6: TRANSFORMATION FOCUSED (před/po)
export function AdVariant6Transformation() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative overflow-hidden flex items-center justify-center p-16">
      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full mb-6">
            <p className="font-black text-2xl">🚀 PRŮKOPNICKÁ TRANSFORMACE</p>
          </div>
          <h1 className="text-gray-900 text-5xl font-black">
            PŘED vs. PO
          </h1>
        </div>
        
        {/* Comparison grid */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {/* PŘED column */}
          <div className="bg-white rounded-2xl p-8 border-4 border-red-200">
            <div className="text-center mb-6">
              <p className="text-4xl font-black text-red-600">❌ PŘED</p>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-xl font-bold text-gray-800">🏚️ Prázdný podnik</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-xl font-bold text-gray-800">❓ Nevím komu prodávám</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-xl font-bold text-gray-800">📉 Nestabilní příjmy</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-xl font-bold text-gray-800">😰 Stresuju z peněz</p>
              </div>
            </div>
          </div>
          
          {/* PO column */}
          <div className="bg-white rounded-2xl p-8 border-4 border-green-200">
            <div className="text-center mb-6">
              <p className="text-4xl font-black text-green-600">✅ PO</p>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-xl font-bold text-gray-800">🎉 Plný podnik</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-xl font-bold text-gray-800">🎯 Jasně vím komu</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-xl font-bold text-gray-800">📈 Předvídatelné tržby</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-xl font-bold text-gray-800">😴 Klidný spánek</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Offer */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-center mb-8">
          <p className="text-white text-3xl font-bold mb-4">
            Staňte se PRŮKOPNÍKEM a získejte
          </p>
          <div className="text-yellow-300 text-6xl font-black mb-4">
            7.999 Kč SLEVU
          </div>
          <div className="flex items-center justify-center gap-8 text-white text-xl font-semibold">
            <div>🎁 Mini kurz ZDARMA</div>
            <div>💎 Konzultace ZDARMA</div>
          </div>
        </div>
        
        {/* CTA */}
        <button className="w-full bg-green-500 text-white py-7 rounded-2xl text-3xl font-black shadow-xl hover:bg-green-600 transition-colors text-center flex items-center justify-center">
          REZERVOVAT MÍSTO! →
        </button>
        
        {/* Urgence */}
        <p className="text-center text-red-600 text-xl font-bold mt-6">
          ⚡ Prvních 50 lidí • Limitovaná kapacita
        </p>
      </div>
    </div>
  );
}

// 🎯 SHOWCASE KOMPONENTA PRO VARIANTY 4-6
export function AdCreativesVariant2Showcase() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Facebook Ad Creatives - DALŠÍ VARIANTY (4-6)
        </h1>
        
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">🎯 A/B TESTING STRATEGIE:</h2>
          <div className="space-y-2 text-lg text-blue-800">
            <p><strong>Ad #3 (Badge)</strong> - PRIMARY (200 Kč/den)</p>
            <p><strong>Ad #4 (Pain Point)</strong> - Test emocionálního hooku (100 Kč/den)</p>
            <p><strong>Ad #5 (Value Stack)</strong> - Test čísla/matematika (100 Kč/den)</p>
            <p><strong>Ad #6 (Transformation)</strong> - Test před/po story (100 Kč/den)</p>
          </div>
        </div>
        
        <div className="space-y-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Ad Variant 4: Pain Point Focused 💔</h2>
            <p className="text-gray-600 mb-4">Emocionální hook, relatable quote, tmavé pozadí</p>
            <div className="inline-block shadow-2xl">
              <AdVariant4PainPoint />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Ad Variant 5: Value Stack 💰</h2>
            <p className="text-gray-600 mb-4">Matematika, detailní breakdown, čísla dominují</p>
            <div className="inline-block shadow-2xl">
              <AdVariant5ValueStack />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Ad Variant 6: Transformation 🚀</h2>
            <p className="text-gray-600 mb-4">Před vs. Po, visual comparison, story-driven</p>
            <div className="inline-block shadow-2xl">
              <AdVariant6Transformation />
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-green-50 border-2 border-green-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-green-900 mb-4">📊 KTERÝ TESTOVAT PRVNÍ?</h3>
          <div className="space-y-4 text-lg text-green-800">
            <div>
              <p className="font-bold">WEEK 1 (300 Kč/den total):</p>
              <p className="ml-4">• Ad #3 (Badge) - 200 Kč/den</p>
              <p className="ml-4">• Ad #4 (Pain Point) - 100 Kč/den</p>
            </div>
            <div>
              <p className="font-bold">WEEK 2 (pokud #4 má lepší CTR než #3):</p>
              <p className="ml-4">• Scale winner na 300 Kč/den</p>
              <p className="ml-4">• Test Ad #5 nebo #6 s 100 Kč/den</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
