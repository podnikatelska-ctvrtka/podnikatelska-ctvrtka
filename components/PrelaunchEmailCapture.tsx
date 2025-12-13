import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Mail, ArrowRight, CheckCircle, Clock, Users, Gift, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { EnhancedCTA } from "./EnhancedCTA";
import { TouchFeedback } from "./TouchFeedback";
import { trackCourseEvent, trackError } from "../lib/sentry";
import { getRemainingSpots, isCampaignFull, getUrgencyText } from "../lib/scarcity";
import { trackLead } from "../lib/metaPixel";

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

export function PrelaunchEmailCapture() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingSpots, setRemainingSpots] = useState(50);
  const [wasWaitlist, setWasWaitlist] = useState(false); // 🆕 Track if it was waitlist

  // Initialize spots on mount + update every minute
  useEffect(() => {
    setRemainingSpots(getRemainingSpots());
    
    // Update every minute for realtime feel
    const interval = setInterval(() => {
      setRemainingSpots(getRemainingSpots());
    }, 60000); // 1 minuta
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("⚠ Zadejte platnou emailovou adresu", {
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
    
    // 🎯 CHECK IF IT'S WAITLIST (campaign full)
    const isWaitlist = isCampaignFull();
    setWasWaitlist(isWaitlist);

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
    
    // 🎯 META PIXEL: Track Lead conversion!
    trackLead(email);

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
              spotNumber: 50 - remainingSpots + 1,
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
              isWaitlist: isWaitlist, // 🎯 Tag pro rozlišení waitlist vs normal opt-in
            }),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Smartemailing subscription failed');
          }
          
          console.log('✅ Email sent to Smartemailing - SUCCESS!', data);
          
          // 🚨 SENTRY: Track successful email capture
          trackCourseEvent.actionPlanComplete(email); // Using actionPlanComplete as email capture event
        } catch (error) {
          console.error('⚠️ Smartemailing error:', error);
          
          // 🚨 SENTRY: Track error
          trackError.saveError('PrelaunchEmailCapture-Smartemailing', error as Error, {
            email,
            method: 'smartemailing',
          });
        }
      }
    }
    
    // Zobraz success screen (user ZŮSTANE na naší stránce!)
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setRemainingSpots(prev => Math.max(0, prev - 1));
      
      // 🎯 Different toast based on waitlist status
      if (isWaitlist) {
        toast.success("📝 Přidáni na čekací listinu! Ozveme se až spustíme další kolo.", {
          duration: 5000,
        });
      } else {
        toast.success("🎉 Úspěšně! Sledujte svůj email pro slevu 40%!", {
          duration: 5000,
        });
      }
    }, 500);
  };

  if (isSubmitted) {
    // 📝 WAITLIST SUCCESS SCREEN → REDIRECT NA KVÍZ!
    if (wasWaitlist) {
      return (
        <motion.section 
          className="py-16 bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-red-200"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl mb-6">😔</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                ⚠️ PRVNÍCH 50 MÍST VYPRODÁNO!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Bohužel jsi to nestihl/a... <strong className="text-red-600">Všech 50 míst už je obsazeno.</strong><br/><br/>
                <strong className="text-blue-600">ALE NEZTRAŤ ČAS!</strong><br/>
                Udělej si kvíz a dostaneš <strong className="text-green-600">personalizovaný akční plán ZDARMA</strong>
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold text-blue-900 mb-2">Byznys skóre</h3>
                  <p className="text-sm text-blue-600">Zjistíš přesně kde jsi TEĎ</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <div className="text-4xl mb-3">🎁</div>
                  <h3 className="font-bold text-green-900 mb-2">Plán na 30 dní</h3>
                  <p className="text-sm text-green-600">Co udělat HNED v lednu</p>
                </div>
              </div>

              <Button 
                onClick={() => {
                  window.location.href = '/kviz';
                }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-xl font-bold shadow-lg hover:shadow-xl transition-all mb-4"
              >
                🎁 UDĚLAT KVÍZ ZDARMA (3 minuty)
              </Button>
              
              <p className="text-sm text-gray-500">
                ✅ Bez platby • ✅ Výsledky okamžitě na email • ✅ 100% zdarma
              </p>
            </motion.div>
          </div>
        </motion.section>
      );
    }
    
    // 🔥 EARLY BIRD SUCCESS SCREEN (zkrácená verze)
    return (
      <motion.section 
        className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-green-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              🔥 EMAIL S KURZEM JE NA CESTĚ!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              <strong className="text-green-600">Gratulujeme!</strong> Právě jste se stali <strong>PRŮKOPNÍKEM</strong>.<br/>
              Email dorazí <strong className="text-orange-600">do 5 minut</strong> — zkontrolujte i <strong>spam/hromadné</strong>!
            </p>
            
            {/* Urgency Box - ZJEDNODUŠENÝ */}
            <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl mb-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">⏰ CO DÁL?</h3>
              
              <ol className="text-left space-y-3 text-orange-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <strong className="block">Zkontrolujte email</strong>
                    <span className="text-sm text-orange-600">(i spam/hromadné složku!)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <strong className="block">Klikněte na "ZÍSKAT KURZ SE SLEVOU"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <strong className="block">Vyplňte Čtvrtku během 90 minut</strong>
                  </div>
                </li>
              </ol>
              
              <div className="p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                <p className="text-red-700 font-bold">
                  ⚠️ <strong>POZOR:</strong> Sleva vyprší za 24 hodin!
                </p>
              </div>
            </div>

            {/* Big CTA */}
            <Button 
              onClick={() => {
                window.location.hash = 'objednavka';
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              🔥 CHCI KURZ SE SLEVOU (4.999 Kč místo 8.499 Kč)
            </Button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              (Nebo použijte link z emailu)
            </p>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      id="email-form"
      className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden"
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
              {!isCampaignFull() ? (
                <>
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">PŘIPRAVEN/Á NA ZMĚNU?</span><br/>
                  <span className="text-white text-2xl md:text-4xl">Podnikatelská Čtvrtka je tady 🎯</span>
                </>
              ) : (
                <>
                  <span className="bg-gradient-to-r from-gray-300 to-slate-300 bg-clip-text text-transparent">MÍSTA OBSAZENA</span><br/>
                  <span className="text-white text-2xl md:text-4xl">Přihlaste se na čekací listinu</span>
                </>
              )}
            </h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {!isCampaignFull() ? (
                  <>
                    90 minut práce = Celý byznys na 1 listu papíru<br/>
                    <strong className="text-orange-300">Připraven/a vytvořit svůj model podnikání?</strong>
                  </>
                ) : (
                  <>
                    <strong className="text-blue-300">Podnikatelská Čtvrtka</strong> - první kolo je plné<br/>
                    <strong className="text-gray-300">Dáme vám vědět až spustíme další kolo!</strong>
                  </>
                )}
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
                    {!isCampaignFull() ? (
                      <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">PROČ BÝT PRŮKOPNÍK?</span>
                    ) : (
                      <span className="bg-gradient-to-r from-gray-300 to-slate-300 bg-clip-text text-transparent">CO KURZ OBSAHUJE?</span>
                    )}
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
                    {!isCampaignFull() && (
                      <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-3 rounded-lg border border-green-400/40 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                        <Gift className="w-5 h-5 text-green-300 flex-shrink-0" />
                        <div>
                          <span className="text-white font-medium block">BONUS po nákupu</span>
                          <span className="text-green-300 text-sm font-medium">Mini kurz zdarma (hodnota 997 Kč)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Urgency sekce - NAHRADIT ZA PRODEJNÍ TEXT */}
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">⚡ PŘIPRAVEN/Á ZAČÍT?</h3>
                    <div className="text-white/90 text-base mb-3">
                      Za 90 minut budeš mít jasno v byznysu
                    </div>
                    <div className="text-white/70 text-sm">
                      Žádné složité teorie. Jen konkrétní kroky.
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
                    {!isCampaignFull() ? (
                      <div className="text-blue-200 text-base font-bold mb-3">⚡ PRŮKOPNICKÁ VÝHODA</div>
                    ) : (
                      <div className="text-gray-300 text-base font-bold mb-3">📋 INFORMACE O KURZU</div>
                    )}
                    
                    {/* Cenový design */}
                    <div className="text-center">
                      {/* 🎯 VŽDY zobrazit SLEVOVOU CENU - i pro waitlist! */}
                      <div className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                        4.999,- Kč
                      </div>
                      <div className="text-white/60 text-sm mb-2">(normálně 8.499,- Kč)</div>
                      <div className="text-white/50 text-xs mb-4">bez DPH</div>
                      
                      {isCampaignFull() && (
                        <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg px-4 py-2 mb-4">
                          <div className="text-yellow-300 text-sm font-medium">
                            ⚠️ Místa obsazena - na čekací listině dostanete stejnou slevu!
                          </div>
                        </div>
                      )}
                      
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
                          {/* 🎯 BONUS mini kurz - VŽDY zobrazit (i pro waitlist!) */}
                          <div className="border-t border-white/30 mt-2 pt-2 flex justify-between text-green-300 font-medium">
                            <span>🎁 BONUS: Mini kurz</span>
                            <span>ZDARMA</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 🎯 Sleva info - VŽDY zobrazit (i pro waitlist!) */}
                      <div className="inline-flex flex-col items-center gap-1 bg-gradient-to-r from-green-500/25 to-emerald-500/25 px-5 py-3 rounded-xl border-2 border-green-400/50 transition-all hover:shadow-xl hover:scale-105">
                        <div className="text-green-300 font-bold text-lg">💰 UŠETŘÍTE 3.500,- Kč</div>
                        <div className="text-green-200 text-sm">Sleva 40%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center border-t border-white/20 pt-4">
                    <div className="text-orange-300 font-medium text-sm mb-4">🎯 CO DOSTANEŠ:</div>
                    <div className="text-white/90 text-sm space-y-1 mb-6">
                      <div>✅ Interaktivní kurz (vyplň si svou Čtvrtku)</div>
                      <div>✅ Tvůj model podnikání na 1 listu</div>
                      <div>✅ Akční plán na 30 dní</div>
                      <div>✅ Online přístup 24/7</div>
                    </div>
                    
                    {/* CTA Tlačítko */}
                    <Button 
                      onClick={() => {
                        window.location.href = '/objednavka';
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-6 text-xl rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] group mb-4"
                    >
                      <span>Chci Podnikatelskou Čtvrtku</span>
                      <ArrowRight className="w-6 h-6 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    {/* Sekundární CTA */}
                    <button 
                      onClick={() => {
                        window.location.href = '/kviz';
                      }}
                      className="w-full text-white/80 hover:text-white text-sm underline transition-colors"
                    >
                      Nebo začni kvízem zdarma (3 min)
                    </button>
                    
                    {/* Trust indicators */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-300" />
                        <span>Okamžitý přístup</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-300" />
                        <span>Bezpečná platba</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-300" />
                        <span>Online 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Právní odkazy */}
                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-white/50 text-xs mt-4">
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

              </motion.div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}