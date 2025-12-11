// KVÍZ HYPE AD - Vánoční dárek, akční plán zdarma

export function QuizHypeAdOmnipresent() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-900 via-purple-900 to-blue-950 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      {/* Decorative snowflakes/stars */}
      <div className="absolute top-10 left-10 text-6xl opacity-30">❄️</div>
      <div className="absolute top-32 right-20 text-4xl opacity-20">✨</div>
      <div className="absolute bottom-32 left-24 text-5xl opacity-25">🎁</div>
      <div className="absolute bottom-20 right-16 text-3xl opacity-20">⭐</div>

      {/* BADGE nahoře */}
      <div className="mb-8 relative z-10">
        <div className="bg-gradient-to-r from-red-600 to-green-600 text-white px-10 py-4 rounded-full shadow-2xl border-4 border-yellow-400">
          <p className="font-black text-3xl">
            🎁 VÁNOČNÍ DÁREK PRO PODNIKATELE
          </p>
        </div>
      </div>

      {/* Main headline */}
      <h1 className="text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl relative z-10">
        Zjisti <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">ZDARMA</span>,<br/>
        kde tratíš peníze
      </h1>

      {/* Subheadline */}
      <p className="text-3xl text-blue-200 mb-12 max-w-3xl relative z-10">
        <span className="font-bold">3 minuty</span> ti můžou ušetřit <span className="font-bold text-yellow-300">tisíce korun</span>
      </p>

      {/* Value props */}
      <div className="grid grid-cols-1 gap-6 mb-12 max-w-3xl w-full relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30">
          <div className="flex items-center gap-4 mb-3">
            <div className="text-5xl">📊</div>
            <p className="text-3xl font-black text-white">Business Health Score</p>
          </div>
          <p className="text-xl text-blue-200">
            Přesné hodnocení tvého modelu podnikání 0-10
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30">
          <div className="flex items-center gap-4 mb-3">
            <div className="text-5xl">🎯</div>
            <p className="text-3xl font-black text-white">Personalizovaný akční plán</p>
          </div>
          <p className="text-xl text-blue-200">
            Konkrétní kroky, co změnit JAKO PRVNÍ
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30">
          <div className="flex items-center gap-4 mb-3">
            <div className="text-5xl">📧</div>
            <p className="text-3xl font-black text-white">30denní email série</p>
          </div>
          <p className="text-xl text-blue-200">
            Denní tipy podle tvé kategorie • Zcela zdarma
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-3xl px-16 py-10 shadow-2xl max-w-3xl w-full relative z-10 border-4 border-yellow-400">
        <p className="text-5xl font-black mb-4">
          🎄 Vánoční dárek v hodnotě 4 999 Kč
        </p>
        <p className="text-3xl mb-4">
          Dostaneš akční plán na míru ZDARMA
        </p>
        <p className="text-2xl text-yellow-200 font-bold">
          ⏱️ Zabere to jen 3 minuty
        </p>
      </div>

      {/* Footer */}
      <div className="mt-10 relative z-10">
        <p className="text-2xl font-black text-white mb-2">PODNIKATELSKÁ ČTVRTKA</p>
        <p className="text-lg text-blue-300">Otestuj svůj byznys • Získej akční plán</p>
      </div>
    </div>
  );
}
