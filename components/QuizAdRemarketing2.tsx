// REMARKETING AD 2 - PERSONALIZATION ANGLE - Kvíz "Jak zdravý je tvůj model podnikání?"

export function QuizAdRemarketing2() {
  return (
    <div className="h-full bg-gradient-to-br from-yellow-500 via-orange-500 to-orange-600 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-white/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-700/30 rounded-full blur-3xl"></div>

      {/* Badge */}
      <div className="mb-8 relative z-10">
        <div className="bg-black text-yellow-400 px-8 py-3 rounded-full shadow-2xl border-2 border-yellow-400">
          <p className="font-black text-xl">
            💡 TVOJE PERSONALIZOVANÁ DIAGNÓZA
          </p>
        </div>
      </div>

      {/* Main headline */}
      <h1 className="text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl relative z-10 max-w-5xl">
        Každý byznys má<br/>
        <span className="text-yellow-200">jiný problém</span>
      </h1>

      {/* Subheadline */}
      <p className="text-3xl text-white/95 mb-10 max-w-4xl relative z-10">
        Proto ti dáváme <span className="font-black">přesné řešení pro TVŮJ model</span> – ne obecné rady
      </p>

      {/* Comparison box */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 mb-10 max-w-4xl w-full shadow-2xl relative z-10">
        <div className="grid grid-cols-2 gap-8 text-left">
          {/* Špatně */}
          <div>
            <p className="text-2xl font-black text-red-600 mb-4">❌ Obecné rady</p>
            <div className="space-y-3">
              <p className="text-lg text-gray-600">
                "Musíš mít jasnou hodnotu"
              </p>
              <p className="text-lg text-gray-600">
                "Zaměř se na zákazníky"
              </p>
              <p className="text-lg text-gray-600">
                "Optimalizuj náklady"
              </p>
            </div>
            <p className="text-lg text-gray-500 italic mt-4">
              = Nevíš, co s tím
            </p>
          </div>

          {/* Správně */}
          <div>
            <p className="text-2xl font-black text-green-600 mb-4">✓ Tvoje diagnóza</p>
            <div className="space-y-3">
              <p className="text-lg text-gray-900 font-bold">
                Přesně co TY potřebuješ změnit
              </p>
              <p className="text-lg text-gray-900 font-bold">
                Kde má tvůj model mezery
              </p>
              <p className="text-lg text-gray-900 font-bold">
                Konkrétní kroky pro tvůj byznys
              </p>
            </div>
            <p className="text-lg text-orange-600 font-black mt-4">
              = Víš přesně co dělat
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl px-12 py-8 shadow-2xl max-w-2xl w-full relative z-10 border-4 border-yellow-400">
        <p className="text-4xl font-black mb-3">
          🎯 Zjistit co JÁ potřebuju
        </p>
        <p className="text-xl text-gray-300">
          Kvíz zdarma • 3 minuty • Personalizované výsledky
        </p>
      </div>

      {/* Trust element */}
      <p className="text-white/90 text-lg mt-6 relative z-10 font-bold">
        Bez emailu, bez závazků, bez prodeje
      </p>
    </div>
  );
}
