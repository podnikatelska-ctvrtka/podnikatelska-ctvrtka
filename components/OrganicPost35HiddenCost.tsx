import { useState, useEffect } from 'react';
import { TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

export function OrganicPost35HiddenCost() {
  const [showCosts, setShowCosts] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const costs = [
    { label: "6 měsíců živobytí", amount: 120000, icon: "🏠" },
    { label: "První stock/nájem", amount: 80000, icon: "📦" },
    { label: "Web + marketing", amount: 40000, icon: "💻" },
    { label: "Chybné investice", amount: 60000, icon: "❌" },
    { label: "Ztracené příležitosti", amount: "???", icon: "⏰", special: true }
  ];

  const totalCost = 300000;

  // Auto-play animation
  useEffect(() => {
    const timer1 = setTimeout(() => setShowCosts(true), 500);
    const timer2 = setTimeout(() => setShowTotal(true), 3500);
    const timer3 = setTimeout(() => setShowSolution(true), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            💸 HIDDEN COSTS
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            "PROSTĚ TO ZKUS."
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-3">
            Slyšel jsi to 100x.
          </p>
          <p className="text-2xl md:text-3xl text-yellow-400 font-bold">
            Ale nikdo ti neřekl KOLIK to stojí.
          </p>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl mb-8">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">
              HIDDEN COST "JUST START":
            </h3>
          </div>

          <div className="space-y-4 mb-8">
            {costs.map((cost, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-700 ${
                  showCosts
                    ? 'bg-red-50 border-red-200 translate-x-0 opacity-100'
                    : 'bg-gray-50 border-gray-200 -translate-x-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{cost.icon}</span>
                  <span className="text-lg font-bold text-gray-800">
                    {cost.label}
                  </span>
                </div>
                <span className={`text-2xl font-black ${
                  cost.special ? 'text-red-600' : 'text-red-700'
                }`}>
                  {typeof cost.amount === 'number'
                    ? `${cost.amount.toLocaleString('cs-CZ')} Kč`
                    : cost.amount
                  }
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          {showTotal && (
            <div className="border-t-4 border-red-600 pt-6 animate-slide-up">
              <div className="flex items-center justify-between p-6 bg-red-600 rounded-xl">
                <span className="text-2xl font-black text-white">
                  CELKEM RIZIKA:
                </span>
                <span className="text-4xl font-black text-yellow-300">
                  {totalCost.toLocaleString('cs-CZ')} Kč+
                </span>
              </div>
            </div>
          )}

          {/* Reality Check */}
          {showTotal && (
            <div className="mt-8 p-6 bg-gray-900 rounded-xl animate-fade-in">
              <p className="text-xl md:text-2xl text-white font-bold text-center">
                A pak zjistíš:<br/>
                <span className="text-red-400 text-3xl">"Nikdo to nechce."</span>
              </p>
            </div>
          )}
        </div>

        {/* Solution */}
        {showSolution && (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-10 shadow-2xl mb-8 animate-bounce-in">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
              <h3 className="text-2xl md:text-3xl font-black text-white">
                CO KDYBY EXISTOVALA LEVNĚJŠÍ CESTA?
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { text: "Validuj PŘED investicí", icon: "✅" },
                { text: "Otestuj segmenty", icon: "🎯" },
                { text: "Spočítej marže", icon: "📊" },
                { text: "Zjisti jestli se to VŮBEC vyplatí", icon: "💡" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-white font-bold">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Comparison */}
            <div className="bg-white rounded-2xl p-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Investice:</p>
                  <p className="text-2xl font-black text-green-600">4 999 Kč</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Čas:</p>
                  <p className="text-2xl font-black text-green-600">90 minut</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ušetříš:</p>
                  <p className="text-2xl font-black text-green-600">295k+ Kč</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quote */}
        {showSolution && (
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border-2 border-white/20 mb-8 animate-fade-in">
            <p className="text-xl md:text-2xl text-white font-bold mb-2">
              "Just start" je dobrá rada.
            </p>
            <p className="text-2xl md:text-3xl text-yellow-400 font-black">
              Ale "Start SMART" je lepší.
            </p>
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
          {['#podnikani', '#validace', '#realcost', '#smart'].map((tag) => (
            <span key={tag} className="text-slate-400 text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
