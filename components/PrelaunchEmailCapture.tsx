import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Mail, ArrowRight, CheckCircle, Clock, Users, Gift, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";
import { EnhancedCTA } from "./EnhancedCTA";
import { TouchFeedback } from "./TouchFeedback";

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

    // Simulate API call (Replace with real API later)
    setTimeout(() => {
      // Save to localStorage
      registeredEmails.push(email.toLowerCase());
      localStorage.setItem('pvs_registered_emails', JSON.stringify(registeredEmails));
      
      setIsSubmitted(true);
      setIsLoading(false);
      // Decrease available spots
      setAvailableSpots(prev => Math.max(35, prev - 1));
      
      toast.success("🎉 Úspěšně registrováno! Sledujte svůj email.", {
        duration: 5000,
      });
    }, 1000);
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
              <strong className="text-red-600">Gratulujeme!</strong> Právě jste se stali oficiálním PRŮKOPNÍKEM české podnikatelské revoluce!<br/>
              <strong className="text-orange-600">Za pár hodin</strong> dostanete exkluzivní email s:<br/>
              • 🎁 <strong>Link na mini kurz</strong> (2.999 Kč ZDARMA) - HNED!<br/>
              • 🚀 <strong>Datum kdy kurz startuje</strong><br/>
              • 🎯 <strong>Průkopnická cena</strong> - ušetříte 7.999 Kč (62%)<br/>
              • 💎 <strong>Info o konzultaci</strong> (prvních 50 kupujících • 1.500 Kč)
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                  <Users className="w-5 h-5" />
                  <span>🔥 PRŮKOPNÍK #{50 - availableSpots + 1}</span>
                </div>
                <p className="text-sm text-blue-600 font-medium">Mezi prvními!</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 font-bold mb-2">
                  <Gift className="w-5 h-5" />
                  <span>🎁 BONUS</span>
                </div>
                <p className="text-sm text-purple-600 font-medium">Mini kurz (2.999 Kč)</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>💰 UŠETŘÍTE</span>
                </div>
                <p className="text-sm text-green-600 font-medium">7.999 Kč (62%)</p>
              </div>
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
              <span className="text-white text-2xl md:text-4xl">První kurz s garancí výsledku</span>
            </h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Rezervujte si místo mezi <strong className="text-blue-300">prvními 50 lidmi</strong><br/>
                a získejte <strong className="text-white">exkluzivní bonusy ZDARMA</strong>
              </p>
              
              {/* 🎯 DEMO: Checklist link */}
              <div className="mt-4">
                <a
                  href="#priprava"
                  className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors underline"
                >
                  🎯 Připravte se na kurz - Interaktivní checklist
                </a>
              </div>
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
                      <span className="text-white font-medium">Konečně vědět JAK</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 px-3 py-3 rounded-lg border border-blue-400/30 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                      <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0" />
                      <span className="text-white font-medium">Konečně kontrola nad byznysem</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-3 rounded-lg border border-purple-400/40 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                      <Gift className="w-5 h-5 text-purple-300 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium block">Mini kurz HNED po registraci</span>
                        <span className="text-purple-300 text-sm font-medium">2.999 Kč ZDARMA • Pro všechny!</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-3 rounded-lg border border-green-400/40 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]">
                      <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium block">Konzultace po koupi kurzu</span>
                        <span className="text-green-300 text-sm font-medium">1.500 Kč ZDARMA • Prvních 50 kupujících</span>
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
                      Konzultace ZDARMA jen pro prvních 50 kupujících
                    </div>
                    <div className="text-green-300 text-sm">
                      Místa se plní rychle - nezmeškejte bonusy
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <Gift className="w-4 h-4 text-purple-300" />
                      <span>Mini kurz HNED po registraci</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <Users className="w-4 h-4 text-blue-300" />
                      <span>Průkopnická cena (62% sleva)</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-300" />
                      <span>Konzultace pro prvních 50 kupujících</span>
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
                      {/* Hlavní cena - responzivní */}
                      <div className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                        4.999,- Kč
                      </div>
                      <div className="text-white/60 text-sm mb-4">(bez DPH)</div>
                      
                      {/* Celková hodnota breakdown */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 max-w-xs mx-auto">
                        <div className="text-white/80 text-xs font-semibold mb-2">🎁 BALÍČEK OBSAHUJE:</div>
                        <div className="space-y-1.5 text-left text-xs text-white/70">
                          <div className="flex justify-between">
                            <span>• Kurz Podnikatelská Čtvrtka</span>
                            <span className="text-white/90">8.499 Kč</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• 3-denní mini kurz</span>
                            <span className="text-white/90">2.999 Kč</span>
                          </div>
                          <div className="flex justify-between text-green-300 font-medium">
                            <span>• 30min konzultace (50×)</span>
                            <span>1.500 Kč</span>
                          </div>
                          <div className="border-t border-white/30 mt-2 pt-2 flex justify-between font-bold text-white text-sm">
                            <span>CELKOVÁ HODNOTA:</span>
                            <span>12.998 Kč</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Sleva info - zvýrazněná */}
                      <div className="inline-flex flex-col items-center gap-1 bg-gradient-to-r from-green-500/25 to-emerald-500/25 px-5 py-3 rounded-xl border-2 border-green-400/50 transition-all hover:shadow-xl hover:scale-105">
                        <div className="text-green-300 font-bold text-lg">💰 CELKOVÁ ÚSPORA 7.999 Kč</div>
                        <div className="text-green-200 text-sm">(mini kurz + sleva + konzultace*)</div>
                        <div className="text-green-300/80 text-xs mt-1">*prvních 50 kupujících</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center border-t border-white/20 pt-4">
                    <div className="text-purple-300 font-medium text-sm mb-2">🎁 PO REGISTRACI ZÍSKÁTE:</div>
                    <div className="text-white/90 text-sm space-y-1">
                      <div>✅ Mini kurz ZDARMA HNED (2.999 Kč)</div>
                      <div>✅ Průkopnická cena kurzu (4.999 Kč)</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="text-green-300 font-medium text-sm mb-1">🔥 BONUS PO KOUPI KURZU:</div>
                      <div className="text-green-200 text-xs">Prvních 50 kupujících dostane konzultaci (1.500 Kč)</div>
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