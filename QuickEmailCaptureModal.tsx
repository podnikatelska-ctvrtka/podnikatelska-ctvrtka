import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CheckCircle, ArrowRight, Gift, Zap, Target, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

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
      toast.error("Zadejte prosím emailovou adresu");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2); // Move to step 2 after successful submission
      
      toast.success("🎉 Úspěšně registrováno!", {
        description: "Sledujte svůj email pro další instrukce",
        duration: 5000,
      });
    }, 1000);
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
                    🚀 Předběžný přístup
                  </span>
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 text-center">
                  Buďte mezi prvními kdo získá strategii za 90 minut
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Co získáte HNED */}
                <motion.div 
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Gift className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-purple-900 mb-1">🎁 DOSTANETE HNED:</div>
                      <div className="text-sm text-purple-800 font-medium">
                        3-denní mini kurz ZDARMA (hodnota 2.999 Kč)
                      </div>
                      <div className="text-xs text-purple-600 mt-1">
                        Přístup do emailu během pár minut!
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Cena kurzu */}
                <motion.div 
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border-2 border-indigo-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="text-center">
                    <div className="text-indigo-600 text-sm font-black mb-2">⚡ PRŮKOPNICKÁ CENA</div>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-gray-400 line-through text-lg">8.499 Kč</span>
                      <span className="text-3xl font-black text-indigo-600">4.999 Kč</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold mb-3">
                      💰 Celková úspora: 6.499 Kč
                    </div>
                    <div className="text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-200">
                      🔥 + Prvních 50 kupujících dostane konzultaci (1.500 Kč)
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
                        Rezervovat místo
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    🎁 Okamžitě dostanete přístup k mini kurzu + info o launchi
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
                    <div className="text-2xl font-black text-indigo-600">1</div>
                    <div className="text-xs text-gray-600">Čtvrtka</div>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-purple-600">9</div>
                    <div className="text-xs text-gray-600">Prvků</div>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">41%</div>
                    <div className="text-xs text-gray-600">Sleva</div>
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
                  Co vás čeká v kurzu Podnikatelská čtvrtka
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

                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Gift className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-amber-900">BONUS: Konzultace ZDARMA</div>
                      <div className="text-sm text-amber-700 font-medium">Pro prvních 50 lidí (hodnota 3.000 Kč)</div>
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