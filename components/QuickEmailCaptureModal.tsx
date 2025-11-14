import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CheckCircle, ArrowRight, Gift, Zap, Target, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { getRemainingSpots, isCampaignFull } from "../lib/scarcity";
import { trackLead } from "../lib/metaPixel";

// 🎯 EMAIL SERVICE CONFIG - Smartemailing
const EMAIL_SERVICE = {
  method: 'smartemailing', // Using Smartemailing!
  smartemailing: {
    enabled: true,
    functionUrl: '/.netlify/functions/smartemailing-subscribe',
  }
};

interface QuickEmailCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickEmailCaptureModal({ open, onOpenChange }: QuickEmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [remainingSpots, setRemainingSpots] = useState(50);
  const [isWaitlist, setIsWaitlist] = useState(false);

  // 🎯 SCARCITY SYNC: Synchronize with landing page scarcity system
  useEffect(() => {
    const updateSpots = () => {
      const spots = getRemainingSpots();
      setRemainingSpots(spots);
      setIsWaitlist(isCampaignFull());
    };
    
    // Initial update
    updateSpots();
    
    // Update every minute
    const interval = setInterval(updateSpots, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Reset step when modal closes
  useEffect(() => {
    if (!open) {
      setStep(1);
      setEmail("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      // ❌ Odstraněno - duplicitní toast (form validation stačí)
      return;
    }

    setIsLoading(true);

    // 🎯 POŠLI DO SMARTEMAILING
    if (EMAIL_SERVICE.method === 'smartemailing' && EMAIL_SERVICE.smartemailing.enabled) {
      try {
        console.log('📧 [Hero Modal] Posílám data do Smartemailing...', { email });
        
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
        
        console.log('✅ [Hero Modal] Email sent to Smartemailing - SUCCESS!', data);
      } catch (error) {
        console.error('⚠️ [Hero Modal] Smartemailing error:', error);
      }
    }

    // 🎯 META PIXEL: Track Lead conversion!
    trackLead(email);
    console.log('🎯 [Hero Modal] Meta Pixel: Lead tracked!', email);
    
    // Zobraz step 2
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      
      // ✅ Různé zprávy pro normální registraci vs. waitlist
      if (isWaitlist) {
        toast.success("📝 Zapsáno na čekací listinu!", {
          description: "Ozveme se vám až budou nová místa k dispozici",
          duration: 5000,
        });
      } else {
        toast.success("🎉 Úspěšně registrováno!", {
          description: "Sledujte svůj email pro další instrukce",
          duration: 5000,
        });
      }
    }, 500);
  };

  const handleContinue = () => {
    // Jen zavřít modal - nechá uživatele přirozeně číst testimonials a case study
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 pr-12 max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-center mb-2">
                  {isWaitlist ? (
                    <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                      📝 ČEKACÍ LISTINA
                    </span>
                  ) : (
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      🔥 BUĎTE MEZI PRVNÍMI!
                    </span>
                  )}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 text-center leading-relaxed">
                  {isWaitlist ? (
                    <>
                      <span className="font-semibold text-gray-800">Všechna místa jsou obsazena!</span><br/>
                      Zapište se na čekací listinu pro další kolo.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-gray-800">Od prvního úspěšného podnikání vás dělí 90 minut.</span><br/>
                      Omezená kapacita - zbývá jen {remainingSpots} míst!
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Cena kurzu */}
                <motion.div 
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border-2 border-indigo-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="text-center">
                    <div className="text-indigo-600 text-sm font-black mb-2">🔥 BUĎTE PRVNÍ - NEJNIŽŠÍ CENA</div>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-gray-400 line-through text-lg">8.499,- Kč</span>
                      <span className="text-3xl font-black text-indigo-600">4.999,- Kč</span>
                    </div>
                    <div className="text-xs text-indigo-600 mb-2">(bez DPH)</div>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold">
                      💰 Ušetříte: 3.500,- Kč (sleva 40%)
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Gift className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-purple-900 mb-1">⏰ SLEVA 40% DO EMAILU:</div>
                      <div className="text-sm text-purple-800 font-medium">
                        Platnost 24 hodin od registrace!
                      </div>
                      <div className="text-xs text-purple-600 mt-1">
                        🎁 Bonus po nákupu: Mini kurz zdarma (997 Kč)
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Email Form */}
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div>
                    <Input
                      type="email"
                      placeholder="vas@email.cz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full h-12 ${isWaitlist ? 'bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'} text-white font-bold text-base shadow-lg hover:shadow-xl transition-all`}
                  >
                    {isLoading ? (
                      "Odesílám..."
                    ) : isWaitlist ? (
                      <>
                        Zapsat na čekací listinu 📝
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    ) : (
                      <>
                        Budu mezi prvními! 🔥
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    {isWaitlist ? (
                      "📧 Ozveme se, až spustíme další kolo!"
                    ) : (
                      "💰 Slevu 40% pošleme do emailu během 5 minut!"
                    )}
                  </p>
                </motion.form>

                {/* Trust signals */}
                <motion.div 
                  className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-black text-indigo-600">3</div>
                    <div className="text-xs text-gray-600">Moduly</div>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-purple-600">16</div>
                    <div className="text-xs text-gray-600">Lekcí</div>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">3.500,-</div>
                    <div className="text-xs text-gray-600">Úspora (Kč)</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-center mb-2">
                  {isWaitlist ? (
                    <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      📝 Jste na čekací listině!
                    </span>
                  ) : (
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ✅ Jste zaregistrováni!
                    </span>
                  )}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 text-center">
                  {isWaitlist ? (
                    "Ozveme se vám, až budou nová místa k dispozici"
                  ) : (
                    "Co vás čeká v kurzu Podnikatelská Čtvrtka"
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 pt-4">
                {/* Success Message */}
                <motion.div 
                  className={`rounded-xl p-5 border-2 text-center ${
                    isWaitlist 
                      ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200' 
                      : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <CheckCircle className={`w-12 h-12 mx-auto mb-3 ${isWaitlist ? 'text-orange-600' : 'text-green-600'}`} />
                  <p className={`text-sm font-medium ${isWaitlist ? 'text-orange-800' : 'text-green-800'}`}>
                    Email odeslán na <span className="font-bold">{email}</span>
                  </p>
                  <p className={`text-xs mt-1 ${isWaitlist ? 'text-orange-700' : 'text-green-700'}`}>
                    {isWaitlist ? (
                      "Kontaktujeme vás, jakmile budou nová místa"
                    ) : (
                      "Sledujte schránku pro exkluzivní nabídku"
                    )}
                  </p>
                </motion.div>

                {/* Benefity */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Kompletní strategie za 90 minut</div>
                      <div className="text-sm text-gray-600">Žádné složité teorie, pouze konkrétní akce</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">9 stavebních prvků byznysu</div>
                      <div className="text-sm text-gray-600">Všechno na jedné čtvrtce</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Přesné zacílení zákazníků</div>
                      <div className="text-sm text-gray-600">Konečně víte KDO jsou vaši zákazníci</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-purple-900">🎁 BONUS: Mini kurz ZDARMA</div>
                      <div className="text-sm text-purple-700 font-medium">Pro prvních 50 průkopníků! První lekce už čeká v emailu.</div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA to full offer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={handleContinue}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Zavřít a číst dál
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Přečtěte si reference a příběhy úspěšných podnikatelů
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}