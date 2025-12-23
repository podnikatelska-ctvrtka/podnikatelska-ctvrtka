import { useState, useEffect } from 'react';
import { Calendar, XCircle, CheckCircle, Target } from 'lucide-react';

export function OrganicPost40NYResolution() {
  const [showProblem, setShowProblem] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const failureTimeline = [
    { month: "Leden", status: "Plánuješ", icon: "📝" },
    { month: "Únor", status: "Ještě plánuješ", icon: "📝" },
    { month: "Březen", status: '"Nevím jestli to půjde"', icon: "🤔" },
    { month: "Duben", status: "Odloženo", icon: "⏸️" },
    { month: "Květen", status: '"Možná příští rok"', icon: "😔" }
  ];

  const problems = [
    { text: "Nemáš plán", icon: "❌" },
    { text: "Bojíš se udělat krok", icon: "❌" },
    { text: 'Nevíš JESTLI to má smysl', icon: "❌" },
    { text: 'Hledáš "dokonalý moment"', icon: "❌" }
  ];

  const jan5goals = [
    { text: "Validovaný segment", icon: "✓" },
    { text: "Spočítané čísla", icon: "✓" },
    { text: "Jasný akční plán", icon: "✓" },
    { text: "Důvod proč to PŮJDE", icon: "✓" }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowProblem(true), 800);
    const timer2 = setTimeout(() => setShowSolution(true), 2500);
    const timer3 = setTimeout(() => setShowCTA(true), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            🎯 ANTI-RESOLUTION
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            NOVOROČNÍ PŘEDSEVZETÍ:
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 inline-block">
            <p className="text-2xl md:text-3xl text-yellow-400 font-bold italic">
              "V roce 2025 rozjedu byznys."
            </p>
          </div>
        </div>

        {/* Reality Check - Timeline */}
        {showProblem && (
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl mb-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-8">
              <XCircle className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl md:text-3xl font-black text-gray-900">
                REALITA:
              </h3>
            </div>

            <div className="space-y-4">
              {failureTimeline.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-5 bg-red-50 rounded-xl border-2 border-red-200 transition-all duration-500"
                  style={{
                    opacity: showProblem ? 1 : 0,
                    transform: showProblem ? 'translateX(0)' : 'translateX(-30px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-red-600 font-bold">{item.month}</p>
                    <p className="text-xl font-black text-gray-900">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problem Analysis */}
        {showProblem && (
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 md:p-10 shadow-2xl mb-8 animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
              ⚠️ PROBLÉM NENÍ V TOBĚ.
            </h3>

            <p className="text-xl text-white text-center mb-6 font-bold">
              Problém je v tom, že:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-4"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="text-2xl">{problem.icon}</span>
                  <span className="text-white font-bold">{problem.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* The Solution */}
        {showSolution && (
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl mb-8 animate-bounce-in">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              CO KDYBY 2025 BYL JINÝ?
            </h3>

            <p className="text-xl text-gray-800 mb-6 text-center font-bold">
              Co kdyby <span className="text-green-600">5. ledna</span> (ne 1.!) měl:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {jan5goals.map((goal, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-5 bg-green-50 rounded-xl border-2 border-green-300"
                  style={{
                    opacity: showSolution ? 1 : 0,
                    transform: showSolution ? 'scale(1)' : 'scale(0.9)',
                    transition: `all 0.4s ease-out ${index * 100}ms`
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-900">{goal.text}</span>
                </div>
              ))}
            </div>

            {/* What You Need */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
              <h4 className="text-xl font-black text-gray-900 mb-4 text-center">
                🎯 NEPOTŘEBUJEŠ RESOLUTION.
              </h4>

              <p className="text-lg text-gray-800 mb-4 text-center font-bold">
                Potřebuješ:
              </p>

              <div className="space-y-3">
                {[
                  { num: "1", text: "90 minut času" },
                  { num: "2", text: "Notebook" },
                  { num: "3", text: "Tenhle kurz" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white rounded-xl p-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-xl flex items-center justify-center flex-shrink-0">
                      {item.num}
                    </div>
                    <span className="text-lg font-bold text-gray-900">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quote Comparison */}
        {showCTA && (
          <div className="bg-gradient-to-r from-slate-800 to-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl mb-8 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div className="p-6 bg-red-500/20 rounded-2xl border-2 border-red-500">
                <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-xl font-bold text-white line-through opacity-60">
                  "2025 je můj rok"
                </p>
              </div>

              <div className="p-6 bg-green-500/20 rounded-2xl border-2 border-green-500">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-xl font-bold text-white">
                  "5. ledna mám hotový model"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        {showCTA && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-center shadow-2xl animate-pulse-glow">
            <p className="text-white text-lg mb-2">
              👉 <span className="font-bold text-2xl">podnikatelskactvrtka.cz</span>
            </p>
            <p className="text-indigo-200 text-sm">
              Online kurz • 90 minut • 4 999 Kč
            </p>
          </div>
        )}

        {/* Hashtags */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['#podnikani', '#newyear', '#noresolutions', '#action', '#2025'].map((tag) => (
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
            transform: translateY(40px);
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
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(99, 102, 241, 0.8);
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
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
