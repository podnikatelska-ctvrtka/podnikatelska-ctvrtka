import { useState, useEffect } from 'react';
import { Briefcase, HelpCircle, Target, CheckCircle, XCircle } from 'lucide-react';

export function OrganicPost39Alternative() {
  const [showComparison, setShowComparison] = useState(false);
  const [highlightWinner, setHighlightWinner] = useState(false);

  const options = [
    {
      id: 'A',
      title: "NAJMI KONZULTANTA",
      icon: "💼",
      color: "red",
      price: "80-200k Kč",
      time: "2-3 měsíce",
      result: "Dostaneš prezentaci",
      cons: [
        "Není to TVOJE, je to jejich práce",
        "Nevíš JAK to udělali",
        "Nemůžeš to použít příště"
      ]
    },
    {
      id: 'B',
      title: "UDĚLEJ TO SÁM (trial/error)",
      icon: "🤷",
      color: "orange",
      price: '"Zdarma" (ale...)',
      time: "6-12 měsíců pokusů",
      result: "Možná úspěch, pravděpodobně ztráta",
      cons: [
        "Drahé chyby",
        "Nevíš jestli děláš správně",
        "Ztracený čas"
      ]
    },
    {
      id: 'C',
      title: "ONLINE KURZ (Čtvrtka)",
      icon: "🎯",
      color: "green",
      price: "4 999 Kč",
      time: "90 minut (kdykoliv chceš)",
      result: "TVŮJ model, nástroje, plán",
      pros: [
        "Vyplníš si to SÁM (učíš se proces)",
        "Máš nástroje NA VŽDY",
        "Můžeš to použít na další byznys",
        "Online = žádná cesta, žádný termín"
      ]
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowComparison(true), 500);
    const timer2 = setTimeout(() => setHighlightWinner(true), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            ⚖️ SROVNÁNÍ
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            JAK VALIDOVAT BYZNYS?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300">
            3 MOŽNOSTI. SROVNÁNÍ.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {options.map((option, index) => (
            <div
              key={option.id}
              className={`relative rounded-3xl p-6 md:p-8 transition-all duration-700 ${
                showComparison ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${
                option.color === 'green' && highlightWinner
                  ? 'bg-gradient-to-br from-green-600 to-emerald-600 shadow-2xl ring-4 ring-yellow-400 scale-105'
                  : option.color === 'red'
                  ? 'bg-red-900/30 backdrop-blur-sm border-2 border-red-500/30'
                  : option.color === 'orange'
                  ? 'bg-orange-900/30 backdrop-blur-sm border-2 border-orange-500/30'
                  : 'bg-green-900/30 backdrop-blur-sm border-2 border-green-500/30'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Winner Badge */}
              {option.color === 'green' && highlightWinner && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full text-sm font-black animate-bounce">
                  🏆 BEST CHOICE
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${
                  option.color === 'green' && highlightWinner
                    ? 'bg-white/20'
                    : option.color === 'red'
                    ? 'bg-red-500/30'
                    : option.color === 'orange'
                    ? 'bg-orange-500/30'
                    : 'bg-green-500/30'
                }`}>
                  {option.icon}
                </div>
                <div className={`text-xs font-bold mb-2 ${
                  option.color === 'green' && highlightWinner ? 'text-yellow-300' : 'text-gray-400'
                }`}>
                  OPTION {option.id}
                </div>
                <h3 className={`text-xl md:text-2xl font-black ${
                  option.color === 'green' && highlightWinner
                    ? 'text-white'
                    : option.color === 'red'
                    ? 'text-red-400'
                    : option.color === 'orange'
                    ? 'text-orange-400'
                    : 'text-green-400'
                }`}>
                  {option.title}
                </h3>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                <div className={`p-4 rounded-xl ${
                  option.color === 'green' && highlightWinner
                    ? 'bg-white/10'
                    : 'bg-gray-900/30'
                }`}>
                  <p className={`text-sm mb-1 ${
                    option.color === 'green' && highlightWinner ? 'text-green-200' : 'text-gray-400'
                  }`}>
                    Cena:
                  </p>
                  <p className={`text-xl font-black ${
                    option.color === 'green' && highlightWinner ? 'text-white' : 'text-white'
                  }`}>
                    {option.price}
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${
                  option.color === 'green' && highlightWinner
                    ? 'bg-white/10'
                    : 'bg-gray-900/30'
                }`}>
                  <p className={`text-sm mb-1 ${
                    option.color === 'green' && highlightWinner ? 'text-green-200' : 'text-gray-400'
                  }`}>
                    Čas:
                  </p>
                  <p className={`text-xl font-black ${
                    option.color === 'green' && highlightWinner ? 'text-white' : 'text-white'
                  }`}>
                    {option.time}
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${
                  option.color === 'green' && highlightWinner
                    ? 'bg-white/10'
                    : 'bg-gray-900/30'
                }`}>
                  <p className={`text-sm mb-1 ${
                    option.color === 'green' && highlightWinner ? 'text-green-200' : 'text-gray-400'
                  }`}>
                    Výsledek:
                  </p>
                  <p className={`font-bold ${
                    option.color === 'green' && highlightWinner ? 'text-white' : 'text-white'
                  }`}>
                    {option.result}
                  </p>
                </div>
              </div>

              {/* Pros/Cons */}
              <div className="space-y-2">
                {option.cons?.map((con, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      option.color === 'green' && highlightWinner ? 'text-red-300' : 'text-red-400'
                    }`} />
                    <p className={`text-sm ${
                      option.color === 'green' && highlightWinner ? 'text-white' : 'text-gray-300'
                    }`}>
                      {con}
                    </p>
                  </div>
                ))}
                {option.pros?.map((pro, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      option.color === 'green' && highlightWinner ? 'text-green-200' : 'text-green-400'
                    }`} />
                    <p className={`text-sm font-bold ${
                      option.color === 'green' && highlightWinner ? 'text-white' : 'text-white'
                    }`}>
                      {pro}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        {highlightWinner && (
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl mb-8 text-center animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Middle-ground řešení:
            </h3>
            <div className="space-y-2">
              <p className="text-xl text-gray-700 font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Lepší než drahý konzultant
              </p>
              <p className="text-xl text-gray-700 font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Rychlejší než trial/error
              </p>
              <p className="text-xl text-gray-700 font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Flexibilnější než live workshop
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-center shadow-2xl">
          <p className="text-white text-lg mb-2">
            👉 <span className="font-bold text-2xl">podnikatelskactvrtka.cz</span>
          </p>
          <p className="text-indigo-200 text-sm">
            Online kurz • 90 minut • 4 999 Kč
          </p>
        </div>

        {/* Hashtags */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['#podnikani', '#srovnání', '#validace', '#smartchoice'].map((tag) => (
            <span key={tag} className="text-slate-400 text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
