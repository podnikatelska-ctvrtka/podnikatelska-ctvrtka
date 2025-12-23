import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Play, Gift } from 'lucide-react';

export function OrganicPost37CourseMechanics() {
  const [activeStep, setActiveStep] = useState(0);
  const [showBenefits, setShowBenefits] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Registrace",
      time: "2 min",
      icon: "📝",
      description: "Dostaneš přístup do kurzu",
      color: "indigo"
    },
    {
      number: 2,
      title: "Video lekce",
      time: "30 min",
      icon: "🎬",
      description: "9 bloků modelu podnikání\nKaždý blok vysvětlený krok za krokem",
      color: "purple"
    },
    {
      number: 3,
      title: "Vyplňování",
      time: "40 min",
      icon: "✍️",
      description: "Tvůj byznys do 9 políček\nInteraktivní nástroje (kalkulačky)",
      color: "blue"
    },
    {
      number: 4,
      title: "Validace",
      time: "20 min",
      icon: "✅",
      description: "Automatická kontrola mezer\nPersonalizované doporučení\nAkční plán na 30 dní",
      color: "green"
    }
  ];

  const benefits = [
    { text: "Model podnikání (tvůj, ne šablona)", icon: "🎯" },
    { text: "Ekonomické kalkulace (CAC, LTV, marže)", icon: "📊" },
    { text: "Akční plán (30 dní, konkrétní kroky)", icon: "📋" },
    { text: "Přístup navždy (můžeš opakovat)", icon: "♾️" }
  ];

  const whyNotNeeded = [
    { text: "Čekat na live workshop", icon: "❌" },
    { text: "Jet do Prahy", icon: "❌" },
    { text: "Blokovat celý den", icon: "❌" },
    { text: "Přizpůsobovat se termínu", icon: "❌" }
  ];

  // Auto-play steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        setShowBenefits(true);
        return prev;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            ❓ JAK TO FUNGUJE
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            "90 MINUT? JE TO DOST?"
          </h2>
          <p className="text-2xl md:text-3xl text-green-400 font-bold">
            Ano. Tady je proč.
          </p>
        </div>

        {/* Format Badge */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-white/20 text-center">
          <div className="flex items-center justify-center gap-3">
            <Play className="w-6 h-6 text-yellow-400" />
            <p className="text-white text-xl font-bold">
              📱 FORMÁT: Online (tvoje tempo)
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
            🎯 JAK FUNGUJE ONLINE KURZ:
          </h3>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  index <= activeStep
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-8 opacity-30'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className={`flex items-start gap-4 p-6 rounded-2xl border-3 ${
                  index <= activeStep
                    ? `bg-${step.color}-50 border-${step.color}-300 shadow-lg`
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-3xl ${
                    index <= activeStep
                      ? `bg-${step.color}-500`
                      : 'bg-gray-300'
                  }`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl md:text-2xl font-black text-gray-900">
                        Krok {step.number}: {step.title}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        index <= activeStep
                          ? `bg-${step.color}-600 text-white`
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {step.time}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>

                  {/* Checkmark */}
                  {index <= activeStep && (
                    <CheckCircle className={`w-6 h-6 text-${step.color}-600 flex-shrink-0 animate-scale-in`} />
                  )}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`ml-8 w-1 h-6 transition-all duration-500 ${
                    index < activeStep ? 'bg-indigo-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Total Time */}
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
            <div className="flex items-center justify-center gap-4">
              <Clock className="w-8 h-8 text-white" />
              <p className="text-white text-2xl font-black">
                CELKEM: 90 minut
              </p>
            </div>
          </div>
        </div>

        {/* What You Get */}
        {showBenefits && (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-10 shadow-2xl mb-8 animate-slide-up">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3">
              <Gift className="w-8 h-8" />
              CO DOSTANEŠ:
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-4"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="text-3xl">{benefit.icon}</span>
                  <span className="text-white font-bold">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why 90 Minutes */}
        {showBenefits && (
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl mb-8 animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">
              ⏰ PROČ 90 MINUT?
            </h3>

            <p className="text-xl text-gray-800 font-bold mb-6">
              Protože NEMUSÍŠ:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {whyNotNeeded.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-800 font-bold">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
              <div className="space-y-3 text-center">
                <p className="text-xl font-bold text-gray-900">
                  Chceš v neděli večer? <span className="text-green-600">Klidně.</span>
                </p>
                <p className="text-xl font-bold text-gray-900">
                  Chceš ve vlaku? <span className="text-green-600">Go ahead.</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-center shadow-2xl">
          <p className="text-2xl md:text-3xl text-white font-black mb-4">
            🎯 Rychle. Online. Ve tvém tempu.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
            <p className="text-white text-xl font-bold mb-2">
              👉 podnikatelskactvrtka.cz
            </p>
            <p className="text-indigo-200">
              4 999 Kč • Přístup navždy
            </p>
          </div>
        </div>

        {/* Hashtags */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['#podnikani', '#onlinekurz', '#vlastnitempo', '#90minut'].map((tag) => (
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
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
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
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
