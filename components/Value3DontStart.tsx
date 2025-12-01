// 🎯 VALUE AD #3: EDUCATIONAL WHY
// "Proč většina podnikatelů selhává" → Educational insight approach
// VALUE: Understanding, empathy, "aha moment"

import { AlertTriangle, Shield, Lightbulb } from 'lucide-react';

export function Value3DontStart() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex items-center justify-center">
      <div className="w-full bg-white shadow-2xl overflow-hidden flex flex-col">
        {/* Educational Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-8">
          <div className="flex items-center justify-center gap-5">
            <div className="text-7xl">🤔</div>
            <div className="text-center">
              <p className="text-2xl text-white/90 mb-2">Věděl jsi, že...</p>
              <h1 className="text-5xl font-black text-white leading-tight">
                Většina podnikatelů<br/>selhává prvním rokem
              </h1>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 flex-1 flex flex-col">
          {/* Main insight */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-8 border-amber-500 rounded-r-2xl p-8 mb-7">
            <div className="flex items-start gap-5">
              <div className="bg-amber-500 rounded-full p-3 flex-shrink-0">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-amber-700 mb-3">
                  💡 Víš, CO většinu z nich zabije?
                </p>
                <p className="text-2xl text-gray-800 leading-snug">
                  Investují <span className="font-black text-orange-600">VŠECHNO</span> na začátku... a pak teprve zjišťují, jestli to funguje.
                </p>
              </div>
            </div>
          </div>

          {/* Problem explanation */}
          <div className="bg-red-50 border-l-8 border-red-500 rounded-r-2xl p-8 mb-7">
            <div className="flex items-start gap-5">
              <div className="bg-red-500 rounded-full p-3 flex-shrink-0">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-red-600 mb-3">
                  ❌ Klasický přístup
                </p>
                <p className="text-2xl text-gray-800 mb-3 leading-snug">
                  Investuješ <span className="font-black">DESETITISÍCE</span> na začátku
                </p>
                <p className="text-xl text-gray-700 mb-3">
                  📍 Prostory · 📦 Produkty · 📱 Marketing
                </p>
                <p className="text-xl text-gray-600 italic">
                  ...a pak až zjistíš, jestli to zákazníci vůbec chtějí
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-emerald-50 border-l-8 border-emerald-500 rounded-r-2xl p-8 mb-7">
            <div className="flex items-start gap-5">
              <div className="bg-emerald-500 rounded-full p-3 flex-shrink-0">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-emerald-600 mb-3">
                  ✅ Chytřejší cesta
                </p>
                <p className="text-2xl text-gray-800 mb-3 leading-snug">
                  Se Čtvrtkou otestuješ <span className="font-black">PŘED investicí</span>
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Zjistíš KDO to chce, KOLIK zaplatí a KDE je najdeš. Pak investuješ s jistotou. Ne s nadějí.
                </p>
              </div>
            </div>
          </div>

          {/* Stats - bigger */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-l-8 border-emerald-500 rounded-r-2xl p-8 text-center">
              <p className="text-7xl font-black text-emerald-600 mb-2">27</p>
              <p className="text-2xl text-gray-800 font-black">podnikatelů</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-8 border-purple-500 rounded-r-2xl p-8 text-center">
              <p className="text-7xl font-black text-purple-600 mb-2">1,4M</p>
              <p className="text-2xl text-gray-800 font-black">Kč celkem</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}