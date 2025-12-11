// TESTIMONIAL #3: E-SHOP PETR - Kreativní design s produkty a emocemi

export function TestimonialEshopPetr() {
  return (
    <div className="h-full bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-900 flex flex-col items-center justify-center px-12 py-8 text-center relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-10 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* BADGE nahoře */}
      <div className="mb-4 relative z-10">
        <div className="bg-emerald-500 text-white px-6 py-2 rounded-full shadow-xl border-2 border-emerald-600">
          <p className="text-base">
            🎒 E-SHOP • VEDLEJŠÍ PŘÍJEM
          </p>
        </div>
      </div>

      {/* Main headline - EMOCIONÁLNÍ */}
      <h1 className="text-5xl font-black text-white mb-3 leading-tight drop-shadow-2xl relative z-10">
        <span className="text-emerald-300">Od hobby</span> k +18k měsíčně
      </h1>

      {/* Subheadline */}
      <p className="text-xl text-gray-300 mb-6 max-w-2xl relative z-10">
        Petr, 34 let • E-shop s outdoorovým vybavením
      </p>

      {/* Story timeline - 3 kroky - KOMPAKTNĚJŠÍ */}
      <div className="space-y-4 mb-6 max-w-4xl w-full relative z-10">
        
        {/* KROK 1: PROBLÉM - Červená */}
        <div className="bg-red-900/40 backdrop-blur-sm rounded-xl p-4 border-2 border-red-500/50 text-left">
          <div className="flex items-start gap-3">
            <div className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-black">
              😰
            </div>
            <div>
              <p className="text-lg font-black text-red-300 mb-1">PROBLÉM:</p>
              <p className="text-lg text-white">
                "Chtěl jsem si přivydělat vedle práce,<br/>
                <span className="text-red-200">ale nevěděl jsem, jestli to bude mít smysl"</span>
              </p>
            </div>
          </div>
        </div>

        {/* KROK 2: ŘEŠENÍ - Modrá */}
        <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-500/50 text-left">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-black">
              📋
            </div>
            <div>
              <p className="text-lg font-black text-blue-300 mb-1">ČTVRTKA:</p>
              <div className="space-y-1">
                <p className="text-base text-white">→ Vyplnil model podnikání</p>
                <p className="text-base text-white">→ Ukázala mi, kde je mezera na trhu</p>
                <p className="text-base text-white">→ "Lidi, co chodí do přírody párkrát do měsíce"</p>
                <p className="text-base text-white">→ Chtějí být dobře vybavení, ale nechtějí dávat tisíce za logo</p>
              </div>
            </div>
          </div>
        </div>

        {/* KROK 3: VÝSLEDEK - Zelená */}
        <div className="bg-emerald-900/60 backdrop-blur-sm rounded-xl p-4 border-4 border-emerald-400/70 text-left shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="bg-emerald-400 text-emerald-900 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-black">
              🎉
            </div>
            <div>
              <p className="text-lg font-black text-emerald-300 mb-1">VÝSLEDEK:</p>
              <div className="space-y-1">
                <p className="text-lg text-white">✅ První prodeje za 3 týdny</p>
                <p className="text-2xl font-black text-emerald-300">✅ +18 tis. Kč/měsíc vedle práce</p>
                <p className="text-lg text-white">✅ Kvalitní vybavení za rozumnou cenu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote box - MENŠÍ */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-8 py-4 mb-6 max-w-3xl w-full shadow-2xl relative z-10 border-l-8 border-emerald-500">
        <p className="text-xl text-gray-800 italic">
          "Model mi ukázal, <span className="font-black text-emerald-700">kdo přesně je můj zákazník</span> - nemusím konkurovat gigantům."
        </p>
        <p className="text-base text-gray-600 mt-2 text-right">— Petr K.</p>
      </div>

      {/* CTA section - MENŠÍ */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl px-8 py-4 shadow-2xl max-w-2xl w-full relative z-10">
        <p className="text-2xl font-black mb-1">
          Chceš taky jasný směr?
        </p>
        <p className="text-lg text-emerald-100">
          90 minut • Model podnikání
        </p>
      </div>

      {/* Footer brand - MENŠÍ */}
      <div className="mt-4 relative z-10">
        <p className="text-lg font-black text-white">PODNIKATELSKÁ ČTVRTKA</p>
      </div>
    </div>
  );
}