import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CheckCircle, ArrowRight, Gift, Zap, Target, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

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

    // Zobraz step 2
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      
      toast.success("🎉 Úspěšně registrováno!", {
        description: "Sledujte svůj email pro další instrukce",
        duration: 5000,
      });
    }, 500);
  };

  const handleContinue = () => {
    // Jen zavřít modal - nechá uživatele přirozeně číst testimonials a case study
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-6">
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
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    🔥 BUĎTE MEZI PRVNÍMI!
                  </span>
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 text-center leading-relaxed">
                  <span className="font-semibold text-gray-800">Od prvního úspěšného podnikání vás dělí 90 minut.</span><br/>
                  První kurz s Podnikatelskou Čtvrtkou v ČR.
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
                      💰 Ušetříte: 3.500,- Kč (jen pro první!)
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
                      <div className="font-bold text-purple-900 mb-1">🎁 BONUS PRO PRVNÍ:</div>
                      <div className="text-sm text-purple-800 font-medium">
                        3-denní mini kurz ZDARMA (hodnota 2.999,- Kč)
                      </div>
                      <div className="text-xs text-purple-600 mt-1">
                        Začněte ještě dnes! Zlepšete podnikání hned.
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
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    {isLoading ? (
                      "Odesílám..."
                    ) : (
                      <>
                        Budu mezi prvními! 🔥
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    📧 Okamžitě dostanete přístup k 3-dennímu mini kurzu ZDARMA
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
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ✅ Jste zaregistrováni!
                  </span>
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 text-center">
                  Co vás čeká v kurzu Podnikatelská Čtvrtka
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 pt-4">
                {/* Success Message */}
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-sm text-green-800 font-medium">
                    Email odeslán na <span className="font-bold">{email}</span>
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Sledujte schránku pro exkluzivní nabídku
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
                      <div className="font-bold text-purple-900">🎁 BONUS: 3-denní mini kurz ZDARMA</div>
                      <div className="text-sm text-purple-700 font-medium">Začněte hned! První lekce už čeká v emailu (hodnota 2.999,- Kč)</div>
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