// TESTIMONIAL #3: 47K LOSS - STATIC VERSION
// Single powerful frame: Confession + Regret + Insight + CTA
// Loss aversion + Authenticity

export function Testimonial47kLossStatic() {
  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full bg-gradient-to-br from-slate-100 via-gray-100 to-white flex flex-col items-center justify-center text-center px-8 py-10 relative">
        
        {/* Badge NAHOŘE místo boxu */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-yellow-100 text-yellow-800 px-8 py-3 rounded-full shadow-xl border-3 border-yellow-400">
            <p className="font-black text-xl">
              ⚠️ Nemakej naslepo jako já
            </p>
          </div>
        </div>

        {/* Hook box */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 mb-5 border-4 border-gray-200 max-w-3xl w-full z-10 mt-20">
          <div className="bg-gray-100 rounded-2xl px-6 py-3 mb-5 border-2 border-gray-300">
            <p className="text-2xl text-gray-900 font-black">
              "Netajím, že jsem tomu nevěřil."
            </p>
          </div>
          
          <p className="text-xl text-gray-700 mb-5 italic">
            Zase další kurz... 😤
          </p>
          
          <div className="bg-red-600 rounded-3xl px-10 py-6 shadow-xl border-4 border-red-500">
            <p className="text-lg text-white/90 mb-2">Ale já už jsem</p>
            <p className="text-6xl font-black text-white mb-2">PROPÁLIL</p>
            <p className="text-5xl font-black text-yellow-300">47 000 Kč</p>
            <p className="text-lg text-white/90 mt-2">za chyby</p>
          </div>
        </div>

        {/* 3 výdaje - COMPACT */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-4xl mb-5 z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-3 border-red-200 shadow-lg">
            <div className="bg-red-500/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <p className="text-3xl">💸</p>
            </div>
            <p className="text-4xl font-black text-red-600 mb-1">12 000</p>
            <p className="text-sm font-bold text-gray-700">Expert</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-3 border-red-200 shadow-lg">
            <div className="bg-red-500/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <p className="text-3xl">💸</p>
            </div>
            <p className="text-4xl font-black text-red-600 mb-1">18 000</p>
            <p className="text-sm font-bold text-gray-700">Web & logo</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-3 border-red-200 shadow-lg">
            <div className="bg-red-500/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <p className="text-3xl">💸</p>
            </div>
            <p className="text-4xl font-black text-red-600 mb-1">17 000</p>
            <p className="text-sm font-bold text-gray-700">Prostor</p>
          </div>
        </div>

        {/* Regret + Insight */}
        <div className="bg-white shadow-xl rounded-3xl p-6 mb-5 border-4 border-gray-200 max-w-3xl w-full z-10">
          <p className="text-2xl text-gray-900 mb-3 italic">
            Kdybych měl ten model o měsíc dřív...
          </p>
          <p className="text-5xl font-black text-red-600 mb-5">
            ušetřil bych 47 000 Kč
          </p>
          
          <div className="h-1 bg-gray-300 my-5" />
          
          <p className="text-xl text-gray-700 mb-3">
            Za 90 minut jsem si udělal <span className="text-green-600 font-black">MODEL PODNIKÁNÍ</span>
          </p>
          <p className="text-4xl font-black text-gray-900 mb-2">
            📈 +60% tržby
          </p>
          <p className="text-lg text-gray-600">za měsíc</p>
        </div>

        {/* CTA button - BIGGER */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl px-14 py-6 shadow-2xl border-4 border-green-500 z-10">
          <p className="text-4xl font-black">
            CHCI TEN MODEL →
          </p>
        </div>
      </div>
    </div>
  );
}