// VALUE #2: GAIN - STATIC VERSION
// Single powerful frame: "Představ si za měsíc"
// Aspirational vision - Future state

export function Value2GainStatic() {
  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center text-center px-8 py-12 relative">
        
        {/* Animované pozadí */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Badge */}
        <div className="bg-cyan-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-cyan-500 mb-6 z-10 relative">
          <p className="font-black text-xl">🚀 ZA MĚSÍC</p>
        </div>

        {/* Main Headline */}
        <h1 className="text-7xl font-black text-white mb-10 leading-tight drop-shadow-lg z-10 relative">
          <span className="text-cyan-300">Představ si:</span><br/>
          Tvůj byznys
        </h1>

        {/* 4 GAINS - Grid 2x2 */}
        <div className="grid grid-cols-2 gap-5 w-full max-w-3xl mb-8 z-10 relative">
          <div className="bg-gradient-to-br from-green-600/90 to-emerald-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-green-400/70">
            <p className="text-5xl mb-2">💰</p>
            <p className="text-3xl font-black text-white mb-1">Víc tržeb</p>
            <p className="text-lg text-gray-100">Každý měsíc lepší čísla</p>
          </div>

          <div className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-blue-400/70">
            <p className="text-5xl mb-2">📞</p>
            <p className="text-3xl font-black text-white mb-1">Plný kalendář</p>
            <p className="text-lg text-gray-100">Zákazníci se hlásí sami</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-purple-400/70">
            <p className="text-5xl mb-2">⏰</p>
            <p className="text-3xl font-black text-white mb-1">Volný čas</p>
            <p className="text-lg text-gray-100">Nemusíš makat 24/7</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/90 to-orange-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-yellow-400/70">
            <p className="text-5xl mb-2">😌</p>
            <p className="text-3xl font-black text-white mb-1">Klidná hlava</p>
            <p className="text-lg text-gray-100">Můžeš plánovat budoucnost</p>
          </div>
        </div>

        {/* PUNCH */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl px-12 py-6 border-2 border-white/30 z-10 relative">
          <p className="text-4xl font-black text-white mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl text-gray-200">
            90 minut • Model podnikání
          </p>
        </div>
      </div>
    </div>
  );
}
