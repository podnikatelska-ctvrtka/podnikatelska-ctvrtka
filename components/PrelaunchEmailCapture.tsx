import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Mail, ArrowRight, CheckCircle, Clock, Users, Gift, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { EnhancedCTA } from "./EnhancedCTA";
import { TouchFeedback } from "./TouchFeedback";

// 🎯 EMAIL SERVICE CONFIG - Choose your method!
const EMAIL_SERVICE = {
  method: 'smartemailing', // 'make' | 'ecomail' | 'mailerlite' | 'smartemailing' | 'both'
  
  // Make.com webhook
  make: {
    enabled: false,
    url: 'https://hook.eu2.make.com/t4mtz2jjps6e2fgjoktqtotwgseuqmj2',
    productId: 'podnikatelska-ctvrtka-predprodej',
  },
  
  // Smartemailing (via Netlify Function) 🏆 #1 DORUČITELNOST! (160 Kč deal!)
  smartemailing: {
    enabled: true, // ✅ AKTIVNÍ!
    functionUrl: '/.netlify/functions/smartemailing-subscribe',
  },
  
  // Ecomail direct (via Netlify Function)
  ecomail: {
    enabled: false,
    functionUrl: '/.netlify/functions/ecomail-subscribe',
  },
  
  // MailerLite direct (via Netlify Function)
  mailerlite: {
    enabled: false,
    functionUrl: '/.netlify/functions/mailerlite-subscribe',
  }
};

// 🎯 FLOWLANCE - Redirect na Flowlance optin (Flowlance nemá API)
const FLOWLANCE_REDIRECT_CONFIG = {
  enabled: true, // ✅ ZAPNUTO - redirect do Flowlance!
  showButton: true, // Zobrazit tlačítko "CHCI MINI KURZ" na success screen
};

const FLOWLANCE_OPTIN_URL = 'https://my.flowlance.com/TVOJE-PRODUKT-URL'; // ← NAHRAĎ svým Flowlance optin URL!

// Dynamic availability tracker
const getAvailableSpots = () => {
  if (typeof window === 'undefined') return 50;
  
  const stored = localStorage.getItem('pvs_available_spots');
  if (stored) {
    // Existing user - slightly decrease spots
    const current = parseInt(stored);
    const newCount = Math.max(35, current - Math.floor(Math.random() * 3 + 1));
    localStorage.setItem('pvs_available_spots', newCount.toString());
    return newCount;
  } else {
    // New user - random between 40-50
    const initial = Math.floor(Math.random() * 11) + 40;
    localStorage.setItem('pvs_available_spots', initial.toString());
    return initial;
  }
};

export function PrelaunchEmailCapture() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableSpots, setAvailableSpots] = useState(50);

  // Initialize spots on mount
  useEffect(() => {
    setAvailableSpots(getAvailableSpots());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("⚠️ Zadejte platnou emailovou adresu", {
        duration: 4000,
      });
      return;
    }

    // Check if already registered (localStorage)
    const registered = localStorage.getItem('pvs_registered_emails') || '[]';
    const registeredEmails = JSON.parse(registered);
    
    if (registeredEmails.includes(email.toLowerCase())) {
      toast.error("✅ Tento email je už registrovaný! Sledujte svou schránku.", {
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);

    // Save to localStorage for tracking
    registeredEmails.push(email.toLowerCase());
    localStorage.setItem('pvs_registered_emails', JSON.stringify(registeredEmails));
    
    // Track conversion - Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'prelaunch',
        event_label: 'email_capture',
        value: 1
      });
    }
    
    // Track conversion - Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Průkopník Prelaunch',
        content_category: 'prelaunch_email_capture',
        value: 7999, // Hodnota úspory
        currency: 'CZK'
      });
    }

    // 🎯 POŠLI EMAIL - podle konfigurace
    
    // OPTION 1: Make.com
    if (EMAIL_SERVICE.method === 'make' || EMAIL_SERVICE.method === 'both') {
      if (EMAIL_SERVICE.make.enabled && EMAIL_SERVICE.make.url) {
        try {
          console.log('🚀 Posílám data do Make.com...', {
            url: EMAIL_SERVICE.make.url,
            email: email,
          });
          
          const response = await fetch(EMAIL_SERVICE.make.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              timestamp: new Date().toISOString(),
              source: 'landing_page_prelaunch',
              spotNumber: 50 - availableSpots + 1,
              productId: EMAIL_SERVICE.make.productId,
            }),
          });
          
          console.log('📊 Make.com response status:', response.status);
          console.log('✅ Email sent to Make.com webhook - SUCCESS!');
        } catch (error) {
          console.error('⚠️ Make.com webhook error:', error);
        }
      }
    }
    
    // OPTION 2: Ecomail direct
    if (EMAIL_SERVICE.method === 'ecomail' || EMAIL_SERVICE.method === 'both') {
      if (EMAIL_SERVICE.ecomail.enabled) {
        try {
          console.log('📧 Posílám data do Ecomail...');
          
          const response = await fetch(EMAIL_SERVICE.ecomail.functionUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              name: '',
            }),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Ecomail subscription failed');
          }
          
          console.log('✅ Email sent to Ecomail - SUCCESS!', data);
        } catch (error) {
          console.error('⚠️ Ecomail error:', error);
        }
      }
    }
    
    // OPTION 3: MailerLite direct
    if (EMAIL_SERVICE.method === 'mailerlite' || EMAIL_SERVICE.method === 'both') {
      if (EMAIL_SERVICE.mailerlite.enabled) {
        try {
          console.log('📧 Posílám data do MailerLite...');
          
          const response = await fetch(EMAIL_SERVICE.mailerlite.functionUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              name: '',
            }),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'MailerLite subscription failed');
          }
          
          console.log('✅ Email sent to MailerLite - SUCCESS!', data);
        } catch (error) {
          console.error('⚠️ MailerLite error:', error);
        }
      }
    }
    
    // OPTION 4: Smartemailing 🏆 #1 DORUČITELNOST!
    if (EMAIL_SERVICE.method === 'smartemailing' || EMAIL_SERVICE.method === 'both') {
      if (EMAIL_SERVICE.smartemailing.enabled) {
        try {
          console.log('📧 Posílám data do Smartemailing...');
          
          const response = await fetch(EMAIL_SERVICE.smartemailing.functionUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              name: '',
            }),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Smartemailing subscription failed');
          }
          
          console.log('✅ Email sent to Smartemailing - SUCCESS!', data);
        } catch (error) {
          console.error('⚠️ Smartemailing error:', error);
        }
      }
    }
    
    // Zobraz success screen (user ZŮSTANE na naší stránce!)
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setAvailableSpots(prev => Math.max(35, prev - 1));
      
      toast.success("🎉 Úspěšně! Sledujte svůj email pro mini kurz!", {
        duration: 5000,
      });
    }, 500);
  };

  if (isSubmitted) {
    return (
      <motion.section 
        className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-green-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              🔥 VÍTEJTE MEZI PRŮKOPNÍKY!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              <strong className="text-red-600">Gratulujeme!</strong> Právě jste se stali oficiálním PRŮKOPNÍKEM!<br/><br/>
              <strong className="text-orange-600">Poslali jsme vám:</strong><br/>
              • 📧 <strong>Link na 3-denní mini kurz ZDARMA</strong><br/>
              • 🎯 <strong>Info o spuštění Podnikatelské Čtvrtky</strong><br/>
              • 💰 <strong>Průkopnická cena: 4.999,- Kč bez DPH (ušetříte 3.500,- Kč)</strong>
            </p>

            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                  <Users className="w-5 h-5" />
                  <span>🔥 PRŮKOPNÍK</span>
                </div>
                <p className="text-sm text-blue-600 font-medium">Mezi prvními!</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 font-bold mb-2">
                  <Gift className="w-5 h-5" />
                  <span>🎁 BONUS</span>
                </div>
                <p className="text-sm text-purple-600 font-medium">Mini kurz ZDARMA</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>💰 UŠETŘÍTE</span>
                </div>
                <p className="text-sm text-green-600 font-medium">3.500,- Kč (-41%)</p>
              </div>
            </div>
            
            <div className="mb-6">
              <Button 
                onClick={() => {
                  // TODO: Nahradit správnou URL mini kurzu
                  window.open(`https://podnikatelskactvrtka.cz/minikurz?email=${encodeURIComponent(email)}`, '_blank');
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                🚀 ZAČÍT MINI KURZ HNED
              </Button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                (Nebo klikněte na link v emailu)
              </p>
            </div>
            
            {/* Informace o dalších krocích */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-3">📧 Co dál?</h3>
              <ul className="text-left space-y-3 text-blue-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block">Zkontrolujte email</strong>
                    <span className="text-sm text-blue-600">Přijde do 5 minut (i spam složku!)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block">Začněte mini kurz HNED</strong>
                    <span className="text-sm text-blue-600">3 dny • Zpětná vazba + konkurence + komunikace</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block">Po 3 dnech: Launch Podnikatelské Čtvrtky</strong>
                    <span className="text-sm text-blue-600">Průkopnická cena 4.999,- Kč bez DPH (ušetříte 3.500,- Kč)</span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      id="email-form"
      className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs - responzivní velikosti */}
        <motion.div
          className="absolute top-10 left-10 md:top-20 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-white">
          
          {/* Header - centrovaný */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-blue-200 rounded-full text-sm font-medium mb-6 border border-blue-400/40 backdrop-blur-sm">
              <span className="text-lg">🚀</span>
              <span>REVOLUCE ZAČÍNÁ PRÁVĚ TEĎ</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">STAŇTE SE PRŮKOPNÍKEM!</span><br/>
              <span className="text-white text-2xl md:text-4xl">První kurz s Podnikatelskou čtvrtkou</span>
            </h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Získejte <strong className="text-blue-300">Podnikatelskou Čtvrtku</strong> za průkopnickou cenu<br/>
                <strong className="text-white">Začněte 3-denním mini kurzem ZDARMA</strong>
              </p>
            </div>
          </motion.div>

          {/* Main Content - centrovaný layout */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Levý sloupec - Benefity + Urgency (druhý na mobile) */}
            <div className="order-2 md:order-1">
              <div className="space-y-6">
                
                {/* Benefity sekce */}
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-4 md:p-6 rounded-xl border border-blue-400/20 backdrop-blur-sm shadow-lg">
                  <h3 className="text-lg font-bold text-center mb-6">
                    <span className="mr-2">🎯</span>
                    <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">PROČ BÝT PRŮKOPNÍK?</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 px-3 py-3 rounded-lg border border-blue-400/30 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                      <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium block">Podnikatelská Čtvrtka</span>
                        <span className="text-blue-300 text-sm">Celý byznys na 1 listu papíru (9 prvků)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 px-3 py-3 rounded-lg border border-blue-400/30 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                      <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium block">FIT validátor</span>
                        <span className="text-blue-300 text-sm">Najdi FIT mezi produktem a zákazníkem</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-3 rounded-lg border border-purple-400/40 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                      <CheckCircle className="w-5 h-5 text-purple-300 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium block">Úspěšné modely z praxe</span>
                        <span className="text-purple-300 text-sm">Kurz plníme konkrétními příklady (stále přidáváme)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-3 rounded-lg border border-green-400/40 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                      <Gift className="w-5 h-5 text-green-300 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium block">BONUS: Mini kurz ZDARMA</span>
                        <span className="text-green-300 text-sm font-medium">Začněte hned 3-denním kurzem (hodnota 2.999,- Kč)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Urgency sekce */}
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">🔥 OMEZENÁ KAPACITA</h3>
                    <div className="text-white/90 text-base font-medium mb-3">
                      Průkopnická cena jen pro první registrace
                    </div>
                    <div className="text-green-300 text-sm">
                      Rezervujte si místo mezi průkopníky!
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <Gift className="w-4 h-4 text-purple-300" />
                      <span>Mini kurz HNED po registraci</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <Users className="w-4 h-4 text-blue-300" />
                      <span>Průkopnická cena (ušetříte 3.500,- Kč)</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-300" />
                      <span>Kompletní strategie na 1 listu</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Pravý sloupec - Cena + CTA (první na mobile) */}
            <div className="order-1 md:order-2">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 mb-6 border border-blue-400/60 shadow-lg ring-1 ring-blue-300/30 transition-all hover:shadow-2xl hover:scale-[1.02]">
                  <div className="text-center mb-4">
                    <div className="text-blue-200 text-base font-bold mb-3">⚡ PRŮKOPNICKÁ VÝHODA</div>
                    
                    {/* Cenový design */}
                    <div className="text-center">
                      {/* Hlavní cena */}
                      <div className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                        4.999,- Kč
                      </div>
                      <div className="text-white/60 text-sm mb-2">(normálně 8.499,- Kč)</div>
                      <div className="text-white/50 text-xs mb-4">bez DPH</div>
                      
                      {/* Co obsahuje */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 max-w-xs mx-auto">
                        <div className="text-white/80 text-xs font-semibold mb-2">🎯 PODNIKATELSKÁ ČTVRTKA:</div>
                        <div className="space-y-1.5 text-left text-xs text-white/70">
                          <div className="flex justify-between">
                            <span>• 3 moduly (16 lekcí)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Strategie na 1 listu</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• FIT validátor</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Úspěšné modely (příklady)</span>
                          </div>
                          <div className="border-t border-white/30 mt-2 pt-2 flex justify-between text-green-300 font-medium">
                            <span>🎁 BONUS: Mini kurz</span>
                            <span>ZDARMA</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Sleva info */}
                      <div className="inline-flex flex-col items-center gap-1 bg-gradient-to-r from-green-500/25 to-emerald-500/25 px-5 py-3 rounded-xl border-2 border-green-400/50 transition-all hover:shadow-xl hover:scale-105">
                        <div className="text-green-300 font-bold text-lg">💰 UŠETŘÍTE 3.500,- Kč</div>
                        <div className="text-green-200 text-sm">Průkopnická cena -41%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center border-t border-white/20 pt-4">
                    <div className="text-purple-300 font-medium text-sm mb-2">🎁 PO REGISTRACI ZÍSKÁTE:</div>
                    <div className="text-white/90 text-sm space-y-1">
                      <div>✅ 3-denní mini kurz HNED (2.999,- Kč)</div>
                      <div>🎯 Info o spuštění Čtvrtky</div>
                      <div>💡 Průkopnická cena (4.999,- Kč bez DPH)</div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="váš@email.cz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 py-6 md:py-7 text-lg md:text-xl bg-white/95 backdrop-blur-sm border border-white/60 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30 text-gray-900 placeholder:text-gray-500 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                      required
                    />
                  </div>
                  
                  <div className="flex md:justify-center">
                    <Button 
                      type="submit"
                      disabled={isLoading}
                      className="group w-full md:w-auto md:min-w-80 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 md:py-6 px-8 text-lg md:text-xl font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.08] disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/50 relative overflow-hidden"
                    >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    {isLoading ? (
                      "🚀 PŘIPOJUJI VÁS..."
                    ) : (
                      <>
                        <span className="block sm:hidden relative z-10">
                          🔥 REZERVOVAT #{50 - availableSpots + 1}/50
                        </span>
                        <span className="hidden sm:block relative z-10">
                          🔥 CHCI BÝT PRŮKOPNÍK #{50 - availableSpots + 1}
                        </span>
                        <ArrowRight className="ml-2 w-5 h-5 inline-block relative z-10" />
                      </>
                    )}
                    </Button>
                  </div>
                </form>
                
                <div className="text-center mt-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span>🔒 Žádný spam • Odhlásit kdykoliv</span>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-3 gap-y-1 text-white/60 text-xs">
                    <span>🛡️ Bez rizika</span>
                    <span className="text-white/40 hidden sm:inline">•</span>
                    <span>🎯 Pouze email</span>
                    <span className="text-white/40 hidden sm:inline">•</span>
                    <span>🚀 Platba až při spuštění</span>
                  </div>
                  
                  {/* Právní odkazy */}
                  <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-white/50 text-xs mt-3 pt-3 border-t border-white/10">
                    <a href="/obchodni-podminky" className="hover:text-white/80 transition-colors underline">
                      Obchodní podmínky
                    </a>
                    <span className="text-white/30">•</span>
                    <a href="/ochrana-osobnich-udaju" className="hover:text-white/80 transition-colors underline">
                      Ochrana osobních údajů
                    </a>
                    <span className="text-white/30">•</span>
                    <a href="mailto:kurz@podnikatelskactvrtka.cz" className="hover:text-white/80 transition-colors">
                      kurz@podnikatelskactvrtka.cz
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}