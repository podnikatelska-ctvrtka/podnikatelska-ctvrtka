// REMARKETING AD #2 - DIAGNOSTIC / PAIN
// Angle: "Znáš ten pocit? Hodně práce, málo peněz"
// Hook: Emotional pain → Kvíz jako řešení

export function RemarketingAd2Easy() {
  return (
    <div className="h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex flex-col items-center justify-center px-12 py-10 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

      {/* Badge */}
      <div className="mb-6 relative z-10">
        <div className="bg-red-500 text-white px-6 py-2 rounded-full shadow-2xl">
          <p className="font-black text-lg">
            😰 ZNÁŠ TEN POCIT?
          </p>
        </div>
      </div>

      {/* Main headline */}
      <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl relative z-10 max-w-4xl">
        Hodně práce.<br/>
        <span className="text-red-400">Málo peněz.</span><br/>
        <span className="text-gray-400">A pořád dokola...</span>
      </h1>

      {/* Subheadline */}
      <p className="text-2xl text-white/95 mb-8 max-w-3xl relative z-10">
        Makáš jako <span className="font-black">ďábel</span>, ale výsledky <span className="font-black">neodpovídají</span> úsilí.
      </p>

      {/* Pain points box */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-7 mb-8 max-w-3xl w-full shadow-2xl relative z-10">
        <p className="text-2xl font-black text-gray-900 mb-5">
          💔 Bolí to, že:
        </p>
        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4">
            <div className="text-red-600 text-2xl flex-shrink-0">😓</div>
            <div>
              <p className="text-xl font-black text-gray-900">Děláš všechno, ale peníze nepřibývají</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-orange-50 rounded-xl p-4">
            <div className="text-orange-600 text-2xl flex-shrink-0">😰</div>
            <div>
              <p className="text-xl font-black text-gray-900">Nevíš, kde je problém</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="my-6 border-t-4 border-dashed border-gray-300"></div>

        {/* Solution */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5">
          <p className="text-2xl font-black text-green-800 mb-2">
            ✅ Problém není v TOBĚ.<br/>Problém je v MODELU.
          </p>
          <p className="text-lg text-gray-700">
            Zjistíš to za <span className="font-black">3 minuty</span>.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl px-10 py-6 shadow-2xl max-w-2xl w-full relative z-10">
        <p className="text-4xl font-black mb-3">
          🔍 Udělej diagnostiku TEĎKA
        </p>
        <p className="text-xl">
          Zjisti PŘESNĚ, kde máš mezery v podnikání
        </p>
      </div>

      {/* Social proof footer */}
      <p className="text-white/80 text-base mt-5 relative z-10">
        💡 <span className="font-black">200+ podnikatelů</span> už našlo problém (a řeší ho)
      </p>
    </div>
  );
}