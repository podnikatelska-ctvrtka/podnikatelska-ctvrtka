import { useState, useEffect } from 'react';
import { CheckCircle, Lock, Clock, Shield, Zap, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import FapiCheckoutForm from './FapiCheckoutForm';

interface OrderPageProps {
  expired?: boolean;
}

export default function OrderPageClean({ expired = false }: OrderPageProps) {
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60);
  const [isExpired, setIsExpired] = useState(expired);

  useEffect(() => {
    const COUNTDOWN_KEY = 'podnikatelska_ctvrtka_countdown_start';
    const COUNTDOWN_DURATION = 48 * 60 * 60 * 1000;

    const storedStart = localStorage.getItem(COUNTDOWN_KEY);
    const now = Date.now();

    if (!storedStart) {
      localStorage.setItem(COUNTDOWN_KEY, now.toString());
      setTimeLeft(48 * 60 * 60);
    } else {
      const startTime = parseInt(storedStart, 10);
      const elapsed = now - startTime;
      const remaining = COUNTDOWN_DURATION - elapsed;

      if (remaining <= 0) {
        setIsExpired(true);
        setTimeLeft(0);
        return;
      } else {
        setTimeLeft(Math.floor(remaining / 1000));
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30" style={styles.body}>
        <div className="max-w-3xl mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center border-2 border-red-100"
          >
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h1 style={styles.h1}>Speciální nabídka vypršela ⏰</h1>
            <p style={styles.lead}>Bohužel, tvoje 40% sleva již není aktivní.</p>
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <p style={styles.body} className="mb-4">Kurz Podnikatelská Čtvrtka je stále dostupný za běžnou cenu:</p>
              <div style={styles.priceOld} className="mb-2"><span className="line-through">4.999 Kč</span></div>
              <div style={styles.priceNew} className="mb-2">8.499 Kč</div>
              <p style={styles.caption}>bez DPH pro firmy</p>
            </div>
            <p style={styles.body}>Chceš počkat na další slevu? Přidej se na waitlist!</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={styles.body}>
      <style>{inlineStyles}</style>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="order-countdown-badge">
              <Clock className="w-4 h-4" />
              <span>Speciální nabídka končí za {time.hours}:{time.minutes}:{time.seconds}</span>
            </div>

            <h1 className="order-hero-title">
              Tvoje rozhodnutí.<br />
              <span className="order-hero-highlight">Tvůj byznys závisí na tom, co uděláš <span className="order-hero-cta-box">TEĎ</span>.</span>
            </h1>
            
            <p className="order-hero-subtitle">
              Nájmy rostou. Konkurence nespí. Zákazníci mají na výběr.
            </p>

            <p className="order-hero-description">
              Buď budeš dál zkoušet náhodné věci... nebo si konečně <strong style={{ color: '#fff' }}>uděláš jasnou strategii</strong>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Problémy → Řešení */}
      <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="order-section-title">
              Tyhle problémy <span style={{ color: '#dc2626', fontWeight: 900 }}>zmizí</span> s Podnikatelskou Čtvrtkou:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div 
                className="order-problem-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="order-problem-text">❌ <span className="line-through">"Nerozumím marketingu"</span></p>
                  <p className="order-problem-description">Nevím co mám dělat, jak přilákat zákazníky, kde inzerovat.</p>
                </div>
                <div className="order-solution-box">
                  <p className="order-solution-text">✅ <strong>Máš jasný systém - víš KOHO oslovit a JAK</strong></p>
                </div>
              </motion.div>

              <motion.div 
                className="order-problem-card"
                style={{ background: 'linear-gradient(135deg, #fed7aa, #ffedd5, #fff)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="order-problem-text">❌ <span className="line-through">"Konkurence je levnější"</span></p>
                  <p className="order-problem-description">Zákazníci jdou kvůli ceně jinam. Nechápu proč nevidí kvalitu.</p>
                </div>
                <div className="order-solution-box">
                  <p className="order-solution-text">✅ <strong>Víš v ČEM jsi lepší a jak to komunikovat</strong></p>
                </div>
              </motion.div>

              <motion.div 
                className="order-problem-card"
                style={{ background: 'linear-gradient(135deg, #fef3c7, #fef9c3, #fff)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="order-problem-text">❌ <span className="line-through">"Nevím čím začít"</span></p>
                  <p className="order-problem-description">Mám založit Instagram? Zaplatit web? Udělat e-shop? Zmatek.</p>
                </div>
                <div className="order-solution-box">
                  <p className="order-solution-text">✅ <strong>Máš akční plán na 30 dní - přesně víš co dělat zítra</strong></p>
                </div>
              </motion.div>

              <motion.div 
                className="order-problem-card"
                style={{ background: 'linear-gradient(135deg, #fce7f3, #fdf2f8, #fff)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3">
                  <p className="order-problem-text">❌ <span className="line-through">"Utrácím za reklamu, ale neprodávám"</span></p>
                  <p className="order-problem-description">Když nemáš dobrou hodnotu a nevíš komu prodáváš, hážeš peníze do koše.</p>
                </div>
                <div className="order-solution-box">
                  <p className="order-solution-text">✅ <strong>Víš PROČ neprodáváš - a jak to napravit</strong></p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="order-highlight-box"
              whileHover={{ scale: 1.02 }}
            >
              <p className="order-highlight-text">
                90 minut práce = <span style={{ color: '#fde047' }}>konec chaosu</span>
              </p>
              <p className="order-highlight-description">
                Žádná teorie. Žádné kecy. Jen jasná strategie na jednom listu.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Co dostaneš */}
      <div className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <div className="order-badge">
                <Sparkles className="w-4 h-4" />
                <span>Co dostaneš</span>
              </div>
              <h2 className="order-section-title">
                Online kurz Podnikatelská Čtvrtka
              </h2>
              <p className="order-subtitle">
                Kompletní nástroje a šablony aby jsi měl jasno za 90 minut
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <motion.div 
                className="order-feature-card"
                style={{ background: 'linear-gradient(135deg, #e0e7ff, #dbeafe, #fff)' }}
                whileHover={{ y: -4 }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎯</div>
                <h3 className="order-card-title">Byznys model na jednom listu</h3>
                <p className="order-card-description">
                  Vyplníš všech 9 bloků krok za krokem. Klikneš na blok, vyplníš štítek, hotovo.
                </p>
                <div className="order-card-benefits">
                  ✓ Vizuální přehled celého byznysu<br />
                  ✓ Vidíš jak vše zapadá dohromady<br />
                  ✓ Kompletní strategie na jednom místě
                </div>
              </motion.div>

              <motion.div 
                className="order-feature-card"
                style={{ background: 'linear-gradient(135deg, #d1fae5, #d9f99d, #fff)' }}
                whileHover={{ y: -4 }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>✨</div>
                <h3 className="order-card-title">FIT validátor</h3>
                <p className="order-card-description">
                  Ověříš jestli to CO nabízíš opravdu řeší problém zákazníka. Základ úspěchu.
                </p>
                <div className="order-card-benefits" style={{ color: '#059669' }}>
                  ✓ Přesně definuješ zákazníka<br />
                  ✓ Zjistíš co OPRAVDU chce<br />
                  ✓ Validuješ PROČ by měl koupit
                </div>
              </motion.div>

              <motion.div 
                className="order-feature-card"
                style={{ background: 'linear-gradient(135deg, #f3e8ff, #fae8ff, #fff)' }}
                whileHover={{ y: -4 }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📚</div>
                <h3 className="order-card-title">Galerie reálných příkladů</h3>
                <p className="order-card-description">
                  Inspiruj se hotovými příklady - kavárna, fitness, e-shop, služby... Vidíš JAK to vyplnit správně.
                </p>
                <div className="order-card-benefits" style={{ color: '#9333ea' }}>
                  ✓ 10+ reálných příkladů<br />
                  ✓ Různé typy byznysu<br />
                  ✓ Copy/paste inspirace
                </div>
              </motion.div>

              <motion.div 
                className="order-feature-card"
                style={{ background: 'linear-gradient(135deg, #fed7aa, #fef3c7, #fff)' }}
                whileHover={{ y: -4 }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚀</div>
                <h3 className="order-card-title">Personalizovaný akční plán</h3>
                <p className="order-card-description">
                  Na základě tvého Canvas dostaneš konkrétní kroky na 30 dní. Přesně víš CO dělat zítra, za týden, za měsíc.
                </p>
                <div className="order-card-benefits" style={{ color: '#ea580c' }}>
                  ✓ Konkrétní úkoly<br />
                  ✓ Prioritizované<br />
                  ✓ Měřitelné výsledky
                </div>
              </motion.div>
            </div>

            <div className="order-lifetime-box">
              <p className="order-lifetime-text">
                ♾️ <strong>Lifetime přístup</strong>
              </p>
              <p className="order-lifetime-description">
                Platíš jednou. Máš navždy. Včetně všech budoucích updatů a novinek.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <div className="order-badge">
                <HelpCircle className="w-4 h-4" />
                <span>Máš ještě otázky?</span>
              </div>
              <h2 className="order-section-title">Časté dotazy</h2>
            </div>

            <div className="space-y-4">
              <motion.div 
                className="order-faq-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="order-faq-question">❓ Co když mi to nevyhovuje?</h3>
                <p className="order-faq-answer"><strong style={{ color: '#4f46e5' }}>14 dní záruka.</strong> Vrácení peněz bez ptaní. Prostě napíšeš "nechci" a dostaneš peníze zpět.</p>
              </motion.div>

              <motion.div 
                className="order-faq-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="order-faq-question">❓ Jak dlouho mám přístup?</h3>
                <p className="order-faq-answer"><strong style={{ color: '#059669' }}>Lifetime přístup.</strong> Platíš jednou 4.999,- Kč, máš navždy. Včetně všech budoucích updatů zdarma.</p>
              </motion.div>

              <motion.div 
                className="order-faq-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="order-faq-question">❓ Kdy dostanu přístup?</h3>
                <p className="order-faq-answer"><strong style={{ color: '#ea580c' }}>Okamžitě.</strong> Email s přihlašovacími údaji dostaneš do 5 minut po platbě.</p>
              </motion.div>

              <motion.div 
                className="order-faq-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="order-faq-question">❓ Funguje to pro můj typ byznysu?</h3>
                <p className="order-faq-answer"><strong style={{ color: '#9333ea' }}>Ano.</strong> Nástroj funguje pro e-shopy, služby, produkty, B2B i B2C... jakýkoliv byznys. Galerie obsahuje příklady z různých odvětví.</p>
              </motion.div>

              <motion.div 
                className="order-faq-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="order-faq-question">❓ Potřebuji nějaké technické znalosti?</h3>
                <p className="order-faq-answer"><strong style={{ color: '#2563eb' }}>Ne.</strong> Jen prohlížeč. Klikáš, vyplňuješ, hotovo. Žádné instalace, žádné komplikace.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Checkout sekce */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Countdown urgency bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="order-countdown-box">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <p className="order-countdown-label">Speciální cena končí za</p>
                    <div className="flex gap-3 text-center">
                      <div>
                        <div className="order-countdown-number">{time.hours}</div>
                        <div className="order-countdown-unit">hod</div>
                      </div>
                      <div className="order-countdown-number">:</div>
                      <div>
                        <div className="order-countdown-number">{time.minutes}</div>
                        <div className="order-countdown-unit">min</div>
                      </div>
                      <div className="order-countdown-number">:</div>
                      <div>
                        <div className="order-countdown-number">{time.seconds}</div>
                        <div className="order-countdown-unit">sek</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-right">
                    <div className="order-price-old">8.499,- Kč</div>
                    <div className="order-price-new">4.999,- Kč</div>
                  </div>
                  <div className="order-discount-badge">
                    <Zap className="w-4 h-4" />
                    -40%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="order-trust-badge">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="order-trust-title">Zabezpečená platba</p>
                  <p className="order-trust-subtitle">GoPay & SSL</p>
                </div>
              </div>
              <div className="order-trust-badge">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="order-trust-title">Okamžitý přístup</p>
                  <p className="order-trust-subtitle">Email do 5 minut</p>
                </div>
              </div>
              <div className="order-trust-badge">
                <Shield className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="order-trust-title">14 dní záruka</p>
                  <p className="order-trust-subtitle">Vrácení peněz</p>
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
              <h2 className="order-checkout-title">Zajisti si přístup teď</h2>
              <p className="order-checkout-subtitle">Vyplň objednávku a získej okamžitý přístup</p>
            </div>
            
            <FapiCheckoutForm 
              productId="podnikatelska-ctvrtka"
              price={4999}
              productName="Online kurz Podnikatelská Čtvrtka"
            />

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="order-checkout-note">
                <strong>Platíš jednou 4.999,- Kč</strong>, máš lifetime přístup + všechny budoucí updaty zdarma
              </p>
              <p className="order-checkout-disclaimer">
                FO: 6.049,- Kč (s DPH) • Firma: 4.999,- Kč (bez DPH) • Po vypršení se cena vrátí na 8.499,- Kč
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// VLASTNÍ FONT & BARVY SYSTÉM - odpojeno od globals.css!
const styles = {
  // Základní texty
  body: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#1f2937',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  lead: {
    fontSize: '20px',
    lineHeight: '1.5',
    color: '#4b5563',
    marginBottom: '32px',
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#6b7280',
  },
  caption: {
    fontSize: '14px',
    lineHeight: '1.4',
    color: '#9ca3af',
  },
  
  // Headings
  h1: {
    fontSize: '36px',
    lineHeight: '1.2',
    fontWeight: '900',
    color: '#111827',
    marginBottom: '16px',
  },
  h2: {
    fontSize: '30px',
    lineHeight: '1.3',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '12px',
  },
  h3: {
    fontSize: '22px',
    lineHeight: '1.4',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
  },
  
  // Pricing
  priceOld: {
    fontSize: '28px',
    fontWeight: '400',
    color: '#9ca3af',
  },
  priceNew: {
    fontSize: '48px',
    fontWeight: '900',
    color: '#ea580c',
  },
};

// Inline styles jako string pro <style> tag
const inlineStyles = `
  /* Hero */
  .order-countdown-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f97316;
    color: white;
    padding: 8px 16px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 32px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .order-hero-title {
    font-size: 52px;
    line-height: 1.15;
    font-weight: 900;
    color: white;
    margin-bottom: 24px;
  }
  
  @media (min-width: 768px) {
    .order-hero-title {
      font-size: 64px;
    }
  }
  
  .order-hero-highlight {
    color: #fb923c;
    font-weight: 900;
  }
  
  .order-hero-cta-box {
    position: relative;
    display: inline-block;
    padding: 8px 16px;
    margin: 0 4px;
    background: #fbbf24;
    color: #111827;
    border-radius: 8px;
    transform: rotate(-2deg);
    box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.2);
    border: 2px solid #f59e0b;
  }
  
  .order-hero-subtitle {
    font-size: 24px;
    line-height: 1.4;
    color: #e5e7eb;
    margin-bottom: 24px;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (min-width: 768px) {
    .order-hero-subtitle {
      font-size: 28px;
    }
  }
  
  .order-hero-description {
    font-size: 18px;
    line-height: 1.5;
    color: #d1d5db;
    max-width: 672px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (min-width: 768px) {
    .order-hero-description {
      font-size: 22px;
    }
  }
  
  /* Section titles */
  .order-section-title {
    font-size: 38px;
    line-height: 1.2;
    font-weight: 900;
    color: #111827;
    margin-bottom: 32px;
  }
  
  @media (min-width: 768px) {
    .order-section-title {
      font-size: 48px;
    }
  }
  
  .order-subtitle {
    font-size: 18px;
    line-height: 1.6;
    color: #6b7280;
  }
  
  /* Badges */
  .order-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #e0e7ff;
    color: #4338ca;
    padding: 8px 16px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  
  /* Problem cards */
  .order-problem-card {
    background: linear-gradient(135deg, #fecaca, #fef2f2, #fff);
    border-radius: 16px;
    padding: 24px;
    text-align: left;
    transition: all 0.2s;
    border: 2px solid #fecaca;
  }
  
  .order-problem-card:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .order-problem-text {
    font-size: 18px;
    line-height: 1.5;
    color: #1f2937;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .order-problem-description {
    font-size: 14px;
    line-height: 1.5;
    color: #4b5563;
    margin-bottom: 16px;
    font-style: italic;
  }
  
  .order-solution-box {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    border-radius: 12px;
    padding: 16px;
    border: 2px solid #86efac;
  }
  
  .order-solution-text {
    font-size: 16px;
    line-height: 1.5;
    color: #047857;
  }
  
  /* Highlight box */
  .order-highlight-box {
    background: linear-gradient(to right, #4f46e5, #7c3aed);
    color: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 4px solid #6366f1;
    transition: transform 0.2s;
  }
  
  .order-highlight-text {
    font-size: 32px;
    line-height: 1.3;
    font-weight: 900;
    margin-bottom: 16px;
  }
  
  @media (min-width: 768px) {
    .order-highlight-text {
      font-size: 40px;
    }
  }
  
  .order-highlight-description {
    font-size: 18px;
    line-height: 1.5;
    opacity: 0.9;
  }
  
  @media (min-width: 768px) {
    .order-highlight-description {
      font-size: 20px;
    }
  }
  
  /* Feature cards */
  .order-feature-card {
    border-radius: 16px;
    padding: 24px;
    border: 2px solid #c7d2fe;
    transition: all 0.2s;
  }
  
  .order-feature-card:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .order-card-title {
    font-size: 20px;
    line-height: 1.4;
    font-weight: 900;
    color: #111827;
    margin-bottom: 12px;
  }
  
  .order-card-description {
    font-size: 16px;
    line-height: 1.6;
    color: #374151;
    margin-bottom: 12px;
  }
  
  .order-card-benefits {
    font-size: 14px;
    line-height: 1.8;
    color: #4f46e5;
  }
  
  /* Lifetime box */
  .order-lifetime-box {
    background: linear-gradient(to right, #18181b, #27272a);
    color: white;
    border-radius: 16px;
    padding: 32px;
    text-align: center;
  }
  
  .order-lifetime-text {
    font-size: 24px;
    line-height: 1.4;
    margin-bottom: 8px;
  }
  
  .order-lifetime-description {
    font-size: 16px;
    line-height: 1.6;
    color: #d1d5db;
  }
  
  /* FAQ */
  .order-faq-item {
    background: #f9fafb;
    border-radius: 12px;
    padding: 24px;
    border-left: 4px solid #4f46e5;
    transition: box-shadow 0.2s;
  }
  
  .order-faq-item:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .order-faq-question {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 600;
    color: #111827;
    margin-bottom: 8px;
  }
  
  .order-faq-answer {
    font-size: 16px;
    line-height: 1.6;
    color: #374151;
  }
  
  /* Countdown box */
  .order-countdown-box {
    background: linear-gradient(to right, #f97316, #dc2626);
    border-radius: 16px;
    padding: 24px;
    color: white;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 4px solid #ea580c;
  }
  
  .order-countdown-label {
    font-size: 14px;
    line-height: 1.4;
    opacity: 0.9;
    margin-bottom: 4px;
  }
  
  .order-countdown-number {
    font-size: 32px;
    line-height: 1.2;
    font-weight: 900;
  }
  
  .order-countdown-unit {
    font-size: 12px;
    line-height: 1.2;
    opacity: 0.8;
  }
  
  .order-price-old {
    font-size: 18px;
    line-height: 1.4;
    text-decoration: line-through;
    opacity: 0.6;
  }
  
  .order-price-new {
    font-size: 36px;
    line-height: 1.2;
    font-weight: 900;
  }
  
  .order-discount-badge {
    background: #fbbf24;
    color: #111827;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  /* Trust badges */
  .order-trust-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 2px solid #dbeafe;
  }
  
  .order-trust-title {
    font-size: 14px;
    line-height: 1.4;
    font-weight: 700;
    color: #1e3a8a;
  }
  
  .order-trust-subtitle {
    font-size: 12px;
    line-height: 1.4;
    color: #4b5563;
  }
  
  /* Checkout */
  .order-checkout-title {
    font-size: 32px;
    line-height: 1.3;
    font-weight: 900;
    color: #111827;
    margin-bottom: 12px;
  }
  
  @media (min-width: 768px) {
    .order-checkout-title {
      font-size: 40px;
    }
  }
  
  .order-checkout-subtitle {
    font-size: 16px;
    line-height: 1.6;
    color: #6b7280;
  }
  
  .order-checkout-note {
    font-size: 14px;
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 12px;
  }
  
  .order-checkout-disclaimer {
    font-size: 12px;
    line-height: 1.5;
    color: #9ca3af;
  }
`;
