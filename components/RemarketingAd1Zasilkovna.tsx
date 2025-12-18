// REMARKETING AD #1 - ZÁSILKOVNA FRESH CONTENT
// Angle: "Tohle jsme ti ještě NEUKÁZALI - bonus content"
// Hook: Fresh case study (neběželo v omni)

export function RemarketingAd1Zasilkovna() {
  return (
    <div className="h-full bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-700 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      {/* BADGE nahoře */}
      <div className="mb-8 relative z-10">
        <div className="bg-white text-orange-700 px-8 py-3 rounded-full shadow-2xl border-4 border-orange-900">
          <p className="font-black text-2xl">
            🎁 BONUS: TOHLE JSI JEŠTĚ NEVIDĚL
          </p>
        </div>
      </div>

      {/* Main headline */}
      <h1 className="text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl relative z-10 max-w-5xl">
        Takhle to udělal<br/>
        <span className="text-yellow-200">GIGANT.</span><br/>
        A co tvůj model?
      </h1>

      {/* Subheadline */}
      <p className="text-3xl text-white/90 mb-10 max-w-4xl relative z-10">
        <span className="font-black">Zásilkovna:</span> Ukázka aplikace<br/>
        <span className="font-black">modelu podnikání</span> na reálném příkladu
      </p>

      {/* Key insights */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 mb-10 max-w-4xl w-full shadow-2xl relative z-10">
        <div className="space-y-6 text-left">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xl">
              1
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 mb-1">Jasná hodnota pro zákazníky</p>
              <p className="text-xl text-gray-600">Levné a flexibilní doručování blízko k zákazníkovi</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xl">
              2
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 mb-1">Našli díru na trhu</p>
              <p className="text-xl text-gray-600">Využili obchody místo budování vlastní flotily</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xl">
              3
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 mb-1">Odstranili největší bolesti</p>
              <p className="text-xl text-gray-600">Fronty, naštvaní zákazníci, ztráta času - vyřešeno</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA - DIRECT TO QUIZ */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl px-12 py-8 shadow-2xl max-w-2xl w-full relative z-10">
        <p className="text-4xl font-black mb-3">
          🔍 A jak vypadá TVŮJ model?
        </p>
        <p className="text-xl text-gray-300 mb-4">
          Udělej 3min kvíz a zjisti, kde máš mezery
        </p>
        <div className="bg-orange-500 rounded-lg px-6 py-3 inline-block">
          <p className="text-2xl font-black">
            ZDARMA • Personalizované výsledky
          </p>
        </div>
      </div>

      {/* Social proof footer */}
      <p className="text-white/80 text-lg mt-6 relative z-10">
        ✨ <span className="font-black">200+ podnikatelů</span> už ví, kde mají slabiny
      </p>
    </div>
  );
}