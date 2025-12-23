import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function OrganicPost34AntiPerfect() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [key, setKey] = useState(0); // ✅ Pro restart animace

  const perfectionistTimeline = [
    { month: 1, activity: "Plánuje logo", icon: "🎨", color: "red" },
    { month: 2, activity: "Vybírá dodavatelé", icon: "📋", color: "red" },
    { month: 3, activity: "Píše business plan", icon: "📝", color: "red" },
    { month: 4, activity: 'Čeká na "správný timing"', icon: "⏰", color: "red" },
    { month: 5, activity: "Upravuje strategii", icon: "🔄", color: "red" },
    { month: 6, activity: "Stále nezačal", icon: "❌", color: "red" }
  ];

  const validatorTimeline = [
    { day: 1, activity: "Definuje segment", icon: "🎯", color: "green" },
    { day: 2, activity: "Průzkum trhu (200 lidí)", icon: "📊", color: "green" },
    { day: 3, activity: "MVP prototyp", icon: "⚡", color: "green" },
    { day: 4, activity: "Testuje hodnotu (10 konverzací)", icon: "💬", color: "green" },
    { day: 5, activity: "Má první zákazníky", icon: "🎉", color: "green" },
    { day: 7, activity: "Ví co funguje + iteruje", icon: "✅", color: "green" }
  ];

  // ✅ Auto-play animation s restartem
  useEffect(() => {
    setActiveMonth(0);
    setShowResult(false);
    
    const timer = setInterval(() => {
      setActiveMonth((prev) => {
        if (prev < 5) return prev + 1;
        setShowResult(true);
        return prev;
      });
    }, 800);

    // ✅ Restart po 10 sekundách
    const restartTimer = setTimeout(() => {
      setKey((prev) => prev + 1);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(restartTimer);
    };
  }, [key]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header - KOMPAKTNÍ */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold mb-3">
            ⚡ AKCE vs PERFEKCIONALISMUS
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
            Nečekej na dokonalý plán.
          </h2>
          <p className="text-xl md:text-2xl text-yellow-400 font-bold">
            Neexistuje.
          </p>
        </div>

        {/* Subtitle - KOMPAKTNÍ */}
        <div className="text-center mb-6">
          <p className="text-lg md:text-xl text-white font-bold">
            DVA PODNIKATELÉ. STEJNÝ NÁPAD.
          </p>
        </div>

        {/* Split Timeline - KOMPAKTNÍ */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* LEFT: Perfectionist */}
          <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 border-2 border-red-500/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">👨‍💼</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-red-400">
                  PERFEKTIONIST
                </h3>
                <p className="text-xs text-red-300">Plánuje...</p>
              </div>
            </div>

            <div className="space-y-2">
              {perfectionistTimeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-500 ${
                    index <= activeMonth
                      ? 'bg-red-500/20 border-2 border-red-500/50 translate-x-0 opacity-100'
                      : 'bg-red-500/5 border-2 border-red-500/10 translate-x-4 opacity-30'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs text-red-300 font-semibold">
                      Měsíc {item.month}
                    </p>
                    <p className="text-sm text-white font-bold">
                      {item.activity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Result */}
            {showResult && (
              <div className="mt-4 p-3 bg-red-500/30 rounded-xl border-2 border-red-500 animate-pulse">
                <p className="text-white font-black text-center text-sm">
                  ❌ VÝSLEDEK: STÁLE NEZAČAL
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Validator */}
          <div className="bg-green-900/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 border-2 border-green-500/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">👨‍💻</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-green-400">
                  VALIDATOR
                </h3>
                <p className="text-xs text-green-300">Testuje. Iteruje.</p>
              </div>
            </div>

            <div className="space-y-2">
              {validatorTimeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-500 ${
                    index <= activeMonth
                      ? 'bg-green-500/20 border-2 border-green-500/50 translate-x-0 opacity-100'
                      : 'bg-green-500/5 border-2 border-green-500/10 -translate-x-4 opacity-30'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs text-green-300 font-semibold">
                      Den {item.day}
                    </p>
                    <p className="text-sm text-white font-bold">
                      {item.activity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Result */}
            {showResult && (
              <div className="mt-4 p-3 bg-green-500/30 rounded-xl border-2 border-green-500">
                <p className="text-white font-black text-center text-sm">
                  ✅ VÝSLEDEK: VÍ CO FUNGUJE
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}