// VALUE #3: EDUCATION - STATIC VERSION
// Single powerful frame: "Jak na úspěšný byznys - 3 kroky"
// Common sense approach - educational

export function Value3EducationStatic() {
  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex flex-col items-center justify-center text-center px-8 py-12 relative">
        
        {/* Animované pozadí */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        
        {/* Icon */}
        <div className="text-8xl mb-6 z-10 relative">💡</div>

        {/* Headline */}
        <h1 className="text-7xl font-black text-white mb-10 leading-tight drop-shadow-lg z-10 relative">
          Jak na úspěšný<br/>
          byznys?
        </h1>

        {/* 3 KROKY */}
        <div className="space-y-5 w-full max-w-3xl mb-8 z-10 relative">
          
          {/* KROK 1 */}
          <div className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-blue-400/70">
            <div className="bg-blue-400 text-gray-900 px-5 py-1 rounded-full shadow-xl border-2 border-blue-500 mb-3 inline-block">
              <p className="font-black text-lg">KROK 1</p>
            </div>
            <p className="text-3xl font-black text-white leading-tight">
              Musíš vědět <span className="text-cyan-300">NA KOHO</span> cílíš
            </p>
          </div>

          {/* KROK 2 */}
          <div className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-purple-400/70">
            <div className="bg-purple-400 text-gray-900 px-5 py-1 rounded-full shadow-xl border-2 border-purple-500 mb-3 inline-block">
              <p className="font-black text-lg">KROK 2</p>
            </div>
            <p className="text-3xl font-black text-white leading-tight">
              Musíš si <span className="text-pink-300">OVĚŘIT</span> že to chtějí
            </p>
          </div>

          {/* KROK 3 */}
          <div className="bg-gradient-to-br from-green-600/90 to-emerald-600/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-green-400/70">
            <div className="bg-green-400 text-gray-900 px-5 py-1 rounded-full shadow-xl border-2 border-green-500 mb-3 inline-block">
              <p className="font-black text-lg">KROK 3</p>
            </div>
            <p className="text-3xl font-black text-white leading-tight">
              Pak je to <span className="text-green-300">EASY</span> ✅
            </p>
          </div>
        </div>

        {/* Subheadline */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-10 py-4 border-2 border-white/30 mb-6 z-10 relative">
          <p className="text-2xl text-gray-200">
            (Není to rocket science 🚀)
          </p>
        </div>

        {/* PUNCH */}
        <div className="bg-gradient-to-br from-orange-600/95 to-yellow-600/95 backdrop-blur-sm rounded-3xl px-12 py-6 border-4 border-yellow-400/70 z-10 relative">
          <p className="text-4xl font-black text-white mb-1">
            PODNIKÁNÍ <span className="text-yellow-300">JINAK</span> ⚡
          </p>
          <p className="text-xl text-white">
            Podnikatelská Čtvrtka
          </p>
        </div>
      </div>
    </div>
  );
}
