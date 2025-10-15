import { useState, useEffect } from 'react';
import { CheckCircle, Lock, Clock, Shield, Zap, AlertCircle, ArrowLeft, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import FapiCheckoutForm from './FapiCheckoutForm';

interface OrderPageProps {
  expired?: boolean;
}

export default function OrderPage({ expired = false }: OrderPageProps) {
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours in seconds
  const [isExpired, setIsExpired] = useState(expired);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [heroCTAClicked, setHeroCTAClicked] = useState(false);

  useEffect(() => {
    // localStorage key for countdown start timestamp
    const COUNTDOWN_KEY = 'podnikatelska_ctvrtka_countdown_start';
    const COUNTDOWN_DURATION = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

    // Check if countdown exists in localStorage
    const storedStart = localStorage.getItem(COUNTDOWN_KEY);
    const now = Date.now();

    if (!storedStart) {
      // First visit - store start timestamp
      localStorage.setItem(COUNTDOWN_KEY, now.toString());
      setTimeLeft(48 * 60 * 60); // 48 hours in seconds
    } else {
      // Calculate remaining time
      const startTime = parseInt(storedStart, 10);
      const elapsed = now - startTime;
      const remaining = COUNTDOWN_DURATION - elapsed;

      if (remaining <= 0) {
        // Countdown expired
        setIsExpired(true);
        setTimeLeft(0);
        return;
      } else {
        // Set remaining time in seconds
        setTimeLeft(Math.floor(remaining / 1000));
      }
    }

    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Countdown just expired
          setIsExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll observer for sticky CTA - show when hero is out of view, hide at checkout
  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    const checkoutSection = document.getElementById('checkout-section');
    if (!heroSection || !checkoutSection) return;

    let heroInView = true;
    let checkoutInView = false;

    const updateVisibility = () => {
      // Show CTA if: hero not visible, checkout not visible, and hero CTA wasn't clicked
      if (!heroCTAClicked && !heroInView && !checkoutInView) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroInView = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0 }
    );

    const checkoutObserver = new IntersectionObserver(
      ([entry]) => {
        checkoutInView = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(heroSection);
    checkoutObserver.observe(checkoutSection);
    
    return () => {
      heroObserver.disconnect();
      checkoutObserver.disconnect();
    };
  }, [heroCTAClicked]);

  const scrollToCheckout = (fromHero = false) => {
    if (fromHero) {
      setHeroCTAClicked(true);
    }
    const checkoutSection = document.getElementById('checkout-section');
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);

  if (isExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center border-2 border-red-100"
          >
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl mb-4">Speciální nabídka vypršela ⏰</h1>
            <p className="text-xl text-gray-600 mb-8">Bohužel, tvoje 40% sleva již není aktivní.</p>
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <p className="text-gray-700 mb-4">Kurz Podnikatelská Čtvrtka je stále dostupný za běžnou cenu:</p>
              <div className="text-3xl mb-2"><span className="line-through text-gray-400">4.999 Kč</span></div>
              <div className="text-5xl text-orange-600 mb-2">8.499 Kč</div>
              <p className="text-sm text-gray-500">bez DPH pro firmy</p>
            </div>
            <p className="text-gray-600">Chceš počkat na další slevu? Přidej se na waitlist!</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-order-page>
      {/* Hero - úderný! */}
      <div id="hero-section" className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-16 md:py-20 relative overflow-hidden" data-dark-section>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm mb-8 shadow-lg">
              <Clock className="w-4 h-4" />
              <span>Speciální nabídka končí za {time.hours}:{time.minutes}:{time.seconds}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6 leading-tight font-black">
              Tvoje rozhodnutí.<br />
              <span className="text-orange-400 font-black">Tvůj byznys závisí na tom, co uděláš <span className="relative inline-block px-4 py-2 mx-1 bg-yellow-400 text-gray-900 rounded-lg transform -rotate-2 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] border-2 border-yellow-500">TEĎ</span>.</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Nájmy rostou. Konkurence nespí. Zákazníci mají na výběr.
            </p>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              Buď budeš dál zkoušet náhodné věci... nebo si konečně <strong className="text-white">uděláš jasnou strategii</strong>.
            </p>

            {/* CTA tlačítko v hero */}
            <motion.button
              onClick={() => scrollToCheckout(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-5 rounded-full text-lg md:text-xl shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105 border-2 border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-6 h-6" />
              <span className="font-black">Chci kurz nyní se slevou 40%</span>
              <span className="text-2xl">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Sticky floating CTA - zobrazí se když hero zmizí, schová se u formuláře */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => scrollToCheckout(false)}
              className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 md:px-8 py-4 md:py-5 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105 border-2 border-white/20"
            >
              <Zap className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-base md:text-lg font-black whitespace-nowrap">Objednat se slevou 40%</span>
              <span className="text-xl md:text-2xl">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Problémy zmizí */}
      <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm mb-6 font-semibold">
              <span>✨</span>
              <span>Řešení problémů</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">
              Tyhle problémy <span className="text-red-600 font-black">zmizí</span> s Podnikatelskou Čtvrtkou:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div 
                className="bg-gradient-to-br from-red-100 via-red-50 to-white rounded-2xl p-6 text-left hover:shadow-2xl transition-all border-2 border-red-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="text-gray-800 mb-2 text-lg">❌ <span className="line-through font-medium">"Nerozumím marketingu"</span></p>
                  <p className="text-sm text-gray-600 mb-4 italic">Nevím co mám dělat, jak přilákat zákazníky, kde inzerovat.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-green-200">
                  <p className="text-green-700 text-base">✅ <strong>Máš jasný systém - víš KOHO oslovit a JAK</strong></p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-orange-100 via-orange-50 to-white rounded-2xl p-6 text-left hover:shadow-2xl transition-all border-2 border-orange-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="text-gray-800 mb-2 text-lg">❌ <span className="line-through font-medium">"Konkurence je levnější, já nevím co dělat"</span></p>
                  <p className="text-sm text-gray-600 mb-4 italic">Zákazníci jdou kvůli ceně jinam. Nechápu proč nevidí kvalitu.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-green-200">
                  <p className="text-green-700 text-base">✅ <strong>Víš v ČEM jsi lepší a jak to komunikovat</strong></p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-white rounded-2xl p-6 text-left hover:shadow-2xl transition-all border-2 border-yellow-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="text-gray-800 mb-2 text-lg">❌ <span className="line-through font-medium">"Nevím čím začít"</span></p>
                  <p className="text-sm text-gray-600 mb-4 italic">Mám založit Instagram? Zaplatit web? Udělat e-shop? Nový produkt? Zmatek.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-green-200">
                  <p className="text-green-700 text-base">✅ <strong>Máš akční plán na 30 dní - přesně víš co dělat zítra</strong></p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-2xl p-6 text-left hover:shadow-2xl transition-all border-2 border-pink-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="text-gray-800 mb-2 text-lg">❌ <span className="line-through font-medium">"Utrácím za reklamu, ale neprodávám"</span></p>
                  <p className="text-sm text-gray-600 mb-4 italic">Každej druhej na Facebooku radí jak optimalizovat kampaně. Ale když nemáš dobrou hodnotu a nevíš komu prodáváš, hážeš peníze do koše.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-green-200">
                  <p className="text-green-700 text-base">✅ <strong>Víš PROČ neprodáváš - a jak to napravit</strong></p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-purple-100 via-purple-50 to-white rounded-2xl p-6 text-left hover:shadow-2xl transition-all border-2 border-purple-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="text-gray-800 mb-2 text-lg">❌ <span className="line-through font-medium">"Nedostávám se k novým zákazníkům"</span></p>
                  <p className="text-sm text-gray-600 mb-4 italic">Velcí hráči ovládají trh. Já jsem malý, nikdo o mně neví.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-green-200">
                  <p className="text-green-700 text-base">✅ <strong>Se správným plánem můžeš konkurovat i velkým hráčům</strong></p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-2xl p-6 text-left hover:shadow-2xl transition-all border-2 border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="text-gray-800 mb-2 text-lg">❌ <span className="line-through font-medium">"Nevím jak si účtovat víc"</span></p>
                  <p className="text-sm text-gray-600 mb-4 italic">Makám víc než konkurence, ale ceny mám stejné. Nebo nižší.</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-green-200">
                  <p className="text-green-700 text-base">✅ <strong>Definuješ svou hodnotu a naučíš se ji prodat</strong></p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 rounded-3xl p-8 md:p-10 shadow-2xl border-4 border-yellow-200"
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              transition={{ duration: 0.2 }}
              data-dark-section
            >
              <p className="text-3xl md:text-4xl lg:text-5xl mb-5 font-black text-gray-900 leading-tight">
                90 minut práce = <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">konec chaosu</span>
              </p>
              <p className="text-xl md:text-2xl text-gray-900 leading-relaxed" style={{ fontWeight: 700 }}>
                Žádná teorie. Žádné kecy. Jen jasná strategie na jednom listu.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Co dostaneš - konkrétně! */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm mb-6 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Co dostaneš</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-black">
                Online kurz Podnikatelská Čtvrtka
              </h2>
              <p className="text-lg text-gray-600">
                Kompletní nástroje a šablony aby jsi měl jasno za 90 minut
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Card 1 - Canvas */}
              <motion.div 
                className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-2xl transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl mb-3 font-black">Byznys model na jednom listu</h3>
                <p className="text-gray-700 mb-3">
                  Vyplníš všech 9 bloků krok za krokem. Klikneš na blok, vyplníš štítek, hotovo.
                </p>
                <p className="text-sm text-indigo-600">
                  ✓ Vizuální přehled celého byznysu<br />
                  ✓ Vidíš jak vše zapadá dohromady<br />
                  ✓ Kompletní strategie na jednom místě
                </p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl mb-3">✨</div>
                <h3 className="text-xl mb-3 font-black">FIT validátor</h3>
                <p className="text-gray-700 mb-3">
                  Ověříš jestli to CO nabízíš opravdu řeší problém zákazníka. Základ úspěchu.
                </p>
                <p className="text-sm text-green-600">
                  ✓ Přesně definuješ zákazníka<br />
                  ✓ Zjistíš co OPRAVDU chce<br />
                  ✓ Validuješ PROČ by měl koupit
                </p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-xl mb-3 font-black">Galerie reálných příkladů</h3>
                <p className="text-gray-700 mb-3">
                  Inspiruj se hotovými příklady - kavárna, fitness, e-shop, služby... Vidíš JAK to vyplnit správně.
                </p>
                <p className="text-sm text-purple-600">
                  ✓ 10+ reálných příkladů<br />
                  ✓ Různé typy byznysu<br />
                  ✓ Copy/paste inspirace
                </p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-2xl transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-xl mb-3 font-black">Personalizovaný akční plán</h3>
                <p className="text-gray-700 mb-3">
                  Na základě tvého Canvas dostaneš konkrétní kroky na 30 dní. Přesně víš CO dělat zítra, za týden, za měsíc.
                </p>
                <p className="text-sm text-orange-600">
                  ✓ Konkrétní úkoly<br />
                  ✓ Prioritizované<br />
                  ✓ Měřitelné výsledky
                </p>
              </motion.div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 text-center" data-dark-section>
              <p className="text-2xl mb-2 text-white">
                ♾️ <strong>Lifetime přístup</strong>
              </p>
              <p className="text-white/90" style={{ fontSize: '17px' }}>
                Platíš jednou. Máš navždy. Včetně všech budoucích updatů a novinek.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Jak to funguje - 3 kroky */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm mb-6 font-semibold">
                <span>🔄</span>
                <span>Postup</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black">Jak to funguje</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white rounded-xl p-6 border-2 border-blue-200">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl">1</div>
                <div>
                  <h3 className="text-xl mb-2">Vyplníš byznys model <span className="text-blue-600">(40 minut)</span></h3>
                  <p className="text-gray-700">Klikneš na každý z 9 bloků, vyplníš štítky. Každý štítek = jeden nápad, jedna věta.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xl p-6 border-2 border-green-200">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl">2</div>
                <div>
                  <h3 className="text-xl mb-2">Validuješ FIT <span className="text-green-600">(40 minut)</span></h3>
                  <p className="text-gray-700">FIT validátor ti ukáže jestli to co nabízíš opravdu řeší problém zákazníka.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xl p-6 border-2 border-purple-200">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl">3</div>
                <div>
                  <h3 className="text-xl mb-2">Dostaneš akční plán <span className="text-purple-600">(10 minut)</span></h3>
                  <p className="text-gray-700">Personalizovaný plán na 30 dní. Přesně víš co dělat zítra ráno.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center bg-white rounded-xl p-6 shadow-lg">
              <p className="text-xl">
                <strong>Výsledek:</strong> Jasná strategie na jednom listu. <span className="text-indigo-600">90 minut práce = konec chaosu.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ - odstranit poslední pochybnosti */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-6 font-semibold">
                <HelpCircle className="w-4 h-4" />
                <span>Časté otázky</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-black">Ještě máš otázky?</h2>
            </div>

            <div className="space-y-4">
              <motion.div 
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg mb-2">❓ Co když mi to nevyhovuje?</h3>
                <p className="text-gray-700"><strong className="text-indigo-600">14 dní záruka.</strong> Vrácení peněz bez ptaní. Prostě napíšeš "nechci" a dostaneš peníze zpět.</p>
              </motion.div>

              <motion.div 
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg mb-2 text-gray-900">❓ Jak dlouho mám přístup?</h3>
                <p className="text-gray-800"><strong className="text-green-600">Lifetime přístup.</strong> Platíš jednou 4.999,- Kč, máš navždy. Včetně všech budoucích updatů zdarma.</p>
              </motion.div>

              <motion.div 
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg mb-2">❓ Kdy dostanu přístup?</h3>
                <p className="text-gray-700"><strong className="text-orange-600">Okamžitě.</strong> Email s přihlašovacími údaji dostaneš do 5 minut po platbě.</p>
              </motion.div>

              <motion.div 
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg mb-2">❓ Funguje to pro můj typ byznysu?</h3>
                <p className="text-gray-700"><strong className="text-purple-600">Ano.</strong> Nástroj funguje pro e-shopy, služby, produkty, prodej firmám i koncovým zákazníkům... jakýkoliv byznys. Galerie obsahuje příklady z různých odvětví.</p>
              </motion.div>

              <motion.div 
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-pink-500 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg mb-2">❓ Co když jsem začátečník?</h3>
                <p className="text-gray-700"><strong className="text-pink-600">Perfektní!</strong> Kurz je navržený pro běžné podnikatele. Žádná složitá teorie, jen praktické nástroje které můžeš použít hned.</p>
              </motion.div>

              <motion.div 
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg mb-2">❓ Potřebuji nějaké technické znalosti?</h3>
                <p className="text-gray-700"><strong className="text-blue-600">Ne.</strong> Jen prohlížeč. Klikáš, vyplňuješ, hotovo. Žádné instalace, žádné komplikace.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rekapitulace před nákupem */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-16" data-dark-section>
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm mb-6 font-semibold backdrop-blur-sm">
              <span>📦</span>
              <span>Souhrn</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 font-black">Připraven udělat pořádek v byznysu?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
                <div className="text-4xl mb-3">⚡</div>
                <p className="text-lg mb-2 font-bold">90 minut práce</p>
                <p className="text-sm text-white/90">Vyplníš, validuješ, dostaneš plán</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-lg mb-2 font-bold">Jasná strategie</p>
                <p className="text-sm text-white/90">Celý byznys na jednom listu</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
                <div className="text-4xl mb-3">🎯</div>
                <p className="text-lg mb-2 font-bold">Akční plán na 30 dní</p>
                <p className="text-sm text-white/90">Přesně víš co dělat zítra</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8">
              Platíš jednou <span className="text-white font-black">4.999,- Kč</span>, máš lifetime přístup + všechny budoucí updaty zdarma
            </p>

            <div className="inline-flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-full shadow-xl">
              <Shield className="w-6 h-6" />
              <span className="text-lg">14 dní záruka vrácení peněz</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* VELKÁ CHECKOUT SEKCE - urgency + trust + formulář vše dohromady */}
      <div id="checkout-section" className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Countdown urgency bar - kompaktní nahoře */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center shadow-2xl border-4 border-orange-600" data-dark-section>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Countdown vlevo/nahoře */}
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white/95 mb-1">Speciální cena končí za</p>
                    <div className="flex gap-3 text-center">
                      <div>
                        <div className="text-3xl font-black">{time.hours}</div>
                        <div className="text-xs text-white/90">hod</div>
                      </div>
                      <div className="text-3xl">:</div>
                      <div>
                        <div className="text-3xl font-black">{time.minutes}</div>
                        <div className="text-xs text-white/90">min</div>
                      </div>
                      <div className="text-3xl">:</div>
                      <div>
                        <div className="text-3xl font-black">{time.seconds}</div>
                        <div className="text-xs text-white/90">sek</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cena vpravo/dole */}
                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-right">
                    <div className="text-lg line-through opacity-60">8.499,- Kč</div>
                    <div className="text-4xl font-black">4.999,- Kč</div>
                  </div>
                  <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    -40%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust badges - kompaktní pod urgency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border-2 border-blue-100">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="text-left">
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e3a8a' }}>Zabezpečená platba</p>
                  <p style={{ fontSize: '12px', color: '#4b5563' }}>GoPay & SSL</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border-2 border-green-100">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div className="text-left">
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#14532d' }}>Okamžitý přístup</p>
                  <p style={{ fontSize: '12px', color: '#4b5563' }}>Email do 5 minut</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border-2 border-purple-100">
                <Shield className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div className="text-left">
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#581c87' }}>14 dní záruka</p>
                  <p style={{ fontSize: '12px', color: '#4b5563' }}>Vrácení peněz</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Checkout formulář */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200"
          >
            <div className="text-center mb-8">
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: '900', color: '#111827', marginBottom: '12px' }}>Zajisti si přístup teď</h2>
              <p style={{ fontSize: '16px', color: '#4b5563' }}>Vyplň objednávku a získej okamžitý přístup</p>
            </div>
            
            <FapiCheckoutForm 
              productId="podnikatelska-ctvrtka"
              price={4999}
              productName="Online kurz Podnikatelská Čtvrtka"
            />

            {/* Dodatečné ujištění pod formulářem */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
                <strong>Platíš jednou 4.999,- Kč</strong>, máš lifetime přístup + všechny budoucí updaty zdarma
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>
                FO: 6.049,- Kč (s DPH) • Firma: 4.999,- Kč (bez DPH) • Po vypršení se cena vrátí na 8.499,- Kč
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Patička s právními dokumenty */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center gap-4 text-sm text-gray-600">
            {/* Odkazy na právní dokumenty */}
            <div className="flex items-center gap-4 md:gap-6">
              <a href="/obchodni-podminky" className="hover:text-indigo-600 transition-colors">
                Obchodní podmínky
              </a>
              <span className="text-gray-300">•</span>
              <a href="/ochrana-osobnich-udaju" className="hover:text-indigo-600 transition-colors">
                Ochrana osobních údajů
              </a>
            </div>
            
            {/* Email */}
            <div className="flex items-center gap-2">
              <span>📧</span>
              <a href="mailto:kurz@podnikatelskactvrtka.cz" className="hover:text-indigo-600 transition-colors">
                kurz@podnikatelskactvrtka.cz
              </a>
            </div>
            
            {/* Copyright */}
            <p className="text-gray-500">© 2025 Podnikatelská Čtvrtka</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
