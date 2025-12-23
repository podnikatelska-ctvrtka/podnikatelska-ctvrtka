import { useState, useEffect } from 'react';
import { TrendingDown, Users, AlertCircle } from 'lucide-react';

export function OrganicPost36QuizData() {
  const [showStats, setShowStats] = useState(false);

  const stats = [
    { percentage: 68, text: "neví kolik zákazníků potřebují k přežití", icon: "❓", color: "red" },
    { percentage: 81, text: "netestovali produkt před investicí", icon: "⚠️", color: "orange" },
    { percentage: 73, text: "nemají ekonomický model", icon: "📊", color: "red" },
    { percentage: 44, text: "neznají velikost svého segmentu", icon: "🎯", color: "orange" },
    { percentage: 92, text: '"doufají že to vyjde"', icon: "🤞", color: "red" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            📊 PRŮZKUM
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Zeptali jsme se<br/>420 podnikatelů.
          </h2>
          <p className="text-2xl md:text-3xl text-red-400 font-bold">
            Výsledky šokují.
          </p>
        </div>

        {/* Survey Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-white/20">
          <div className="flex items-center justify-center gap-3">
            <Users className="w-6 h-6 text-yellow-400" />
            <p className="text-white text-lg font-bold">
              420 ŽIVNOSTNÍKŮ A OSVČ
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
            VÝSLEDKY:
          </h3>

          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  showStats ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Percentage and Text */}
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className={`text-4xl md:text-5xl font-black ${
                        stat.color === 'red' ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        {stat.percentage}%
                      </span>
                      <span className="text-lg md:text-xl text-gray-800 font-bold">
                        {stat.text}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          stat.color === 'red'
                            ? 'bg-gradient-to-r from-red-500 to-red-600'
                            : 'bg-gradient-to-r from-orange-500 to-orange-600'
                        }`}
                        style={{
                          width: showStats ? `${stat.percentage}%` : '0%',
                          transitionDelay: `${index * 150}ms`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shocking Stat */}
          <div className="mt-10 p-6 bg-red-600 rounded-2xl">
            <p className="text-white text-xl md:text-2xl font-black text-center">
              A pak se divíme proč 70% byznysů<br/>umírá v prvním roce.
            </p>
          </div>
        </div>

        {/* Solution */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-10 shadow-2xl mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3">
            ✅ JE LEPŠÍ CESTA:
          </h3>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { text: "Validuj PŘED investicí", icon: "🎯" },
              { text: "Měř místo hádání", icon: "📊" },
              { text: "Testuj místo doufání", icon: "⚡" }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="text-white font-bold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Quiz */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              🎯 Udělej si kvíz ZDARMA
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Zjistíš kde jsou TVOJE mezery.<br/>
              Personalizované výsledky + akční plán.
            </p>

            <div className="inline-block">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6">
                <p className="text-white text-xl font-bold mb-2">
                  👉 podnikatelskactvrtka.cz/kviz
                </p>
                <p className="text-indigo-200 text-sm">
                  ⏱️ 3 minuty • Personalizované výsledky
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-white/20">
          <p className="text-2xl md:text-3xl text-white font-black">
            Přestaň být součástí statistiky.
          </p>
        </div>

        {/* Hashtags */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['#podnikani', '#data', '#validace', '#osvč', '#průzkum'].map((tag) => (
            <span key={tag} className="text-slate-400 text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
