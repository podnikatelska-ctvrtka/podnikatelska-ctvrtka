import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp, Calculator, Users, ListChecks, ArrowRight } from 'lucide-react';

interface ValueItem {
  id: number;
  icon: any;
  title: string;
  subtitle: string;
  value: number;
  color: string;
}

const valueItems: ValueItem[] = [
  {
    id: 1,
    icon: Sparkles,
    title: 'Model podnikání',
    subtitle: 'Jasná strategie růstu',
    value: 15000,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Validační framework',
    subtitle: 'Otestuj než investuješ',
    value: 8000,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    icon: Calculator,
    title: 'Ekonomický model',
    subtitle: 'Přesná čísla pro rozhodování',
    value: 12000,
    color: 'from-emerald-500 to-green-500'
  },
  {
    id: 4,
    icon: Users,
    title: '4h live workshop',
    subtitle: 'S certifikovaným lektorem',
    value: 20000,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    icon: ListChecks,
    title: '30denní akční plán',
    subtitle: 'Konkrétní kroky co dělat',
    value: 5000,
    color: 'from-yellow-500 to-orange-500'
  },
];

export function OrganicPost32ValueStack() {
  const [stage, setStage] = useState(0);
  // 0: Headline
  // 1: Cards stacking (show progressively)
  // 2: Sum calculation
  // 3: Final message + CTA

  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Stack cards progressively during stage 1
  useEffect(() => {
    if (stage === 1) {
      setVisibleCards(0);
      const interval = setInterval(() => {
        setVisibleCards((prev) => {
          if (prev < valueItems.length) {
            return prev + 1;
          }
          return prev;
        });
      }, 600);
      return () => clearInterval(interval);
    } else if (stage > 1) {
      setVisibleCards(valueItems.length);
    }
  }, [stage]);

  const totalValue = valueItems.reduce((sum, item) => sum + item.value, 0);
  const yourPrice = 4999;
  const savings = totalValue - yourPrice;
  const discountPercent = Math.round((savings / totalValue) * 100);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex flex-col items-center justify-center overflow-hidden p-8">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STAGE 0: Headline */}
        {stage === 0 && (
          <motion.div
            key="headline"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="relative z-10 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              💎
            </motion.div>
            <h1 className="text-5xl text-white mb-4">
              CO DOSTANEŠ
            </h1>
            <h2 className="text-4xl text-yellow-400">
              ZA 4 999 KČ?
            </h2>
          </motion.div>
        )}

        {/* STAGE 1: Cards stacking */}
        {stage === 1 && (
          <motion.div
            key="stack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="space-y-3">
              {valueItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 100, opacity: 0, scale: 0.8 }}
                  animate={{
                    y: visibleCards > index ? 0 : 100,
                    opacity: visibleCards > index ? 1 : 0,
                    scale: visibleCards > index ? 1 : 0.8,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="relative"
                >
                  <div className={`bg-gradient-to-r ${item.color} p-0.5 rounded-xl`}>
                    <div className="bg-slate-900 rounded-xl p-4">
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-lg mb-1">{item.title}</h3>
                          <p className="text-slate-400 text-sm">{item.subtitle}</p>
                        </div>

                        {/* Price tag */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-yellow-400 text-sm">hodnota:</div>
                          <div className="text-white font-bold">
                            {item.value.toLocaleString('cs-CZ')} Kč
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 2: Sum calculation */}
        {stage === 2 && (
          <motion.div
            key="calculation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 text-center max-w-md"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Total value */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-4">
                <div className="text-slate-400 mb-2">CELKOVÁ HODNOTA:</div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                  className="text-5xl text-white mb-4"
                >
                  {totalValue.toLocaleString('cs-CZ')} Kč
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8 }}
                  className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-4"
                />

                {/* Your price */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="text-slate-400 mb-2">TVOJE CENA:</div>
                  <div className="text-6xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {yourPrice.toLocaleString('cs-CZ')} Kč
                  </div>
                </motion.div>
              </div>

              {/* Savings */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 300 }}
                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="text-green-400 text-sm mb-2">✨ ŠETŘÍŠ:</div>
                <div className="text-3xl text-white mb-1">
                  {savings.toLocaleString('cs-CZ')} Kč
                </div>
                <div className="text-green-400">
                  ({discountPercent}% sleva)
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 3: Final message + CTA */}
        {stage === 3 && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 text-center max-w-lg"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Reframe message */}
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-400/40 rounded-2xl p-8 backdrop-blur-sm mb-6">
                <div className="text-5xl mb-4">💡</div>
                <h2 className="text-3xl text-white mb-4 leading-tight">
                  Není to sleva.
                </h2>
                <p className="text-2xl text-yellow-400">
                  Je to investice<br/>do jasnosti.
                </p>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <p className="text-2xl text-white mb-2">
                  podnikatelskactvrtka.cz
                </p>
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <span>Jasnost začíná tady</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>

              {/* Micro details */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-slate-500 text-xs mt-4"
              >
                25. ledna 2025 • Praha • Poslední místa
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              stage === i ? 'bg-yellow-400 w-8' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
