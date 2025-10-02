import { motion } from "motion/react";
import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, Clock, Users, Gift, Star, Zap, Target, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export function EarlyAccessSale() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [soldCount, setSoldCount] = useState(23); // Starting number

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Zadejte prosím váš email");
      return;
    }

    setIsLoading(true);

    // Simulate purchase process
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setSoldCount(prev => prev + 1);
      
      toast.success("🎉 Objednávka přijata! Platební údaje vám pošleme emailem.", {
        duration: 6000,
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.section 
        className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4 leading-tight">
              🎉 Objednávka přijata!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Platební údaje vám pošleme během 5 minut na email.<br/>
              <strong className="text-green-600">Kurz dostanete za 14 dní + BONUS konzultaci!</strong>
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-bold text-green-700">BONUS konzultace</p>
                  <p className="text-sm text-green-600">v hodnotě 2.500 Kč</p>
                </div>
                <div>
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-bold text-blue-700">Early Access</p>
                  <p className="text-sm text-blue-600">Kurz za 14 dní</p>
                </div>
                <div>
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-bold text-purple-700">#{soldCount}. místo</p>
                  <p className="text-sm text-purple-600">z první skupiny</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="py-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`
        }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center text-white">
          
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-bold mb-4 border border-orange-400/30">
              🚀 EARLY ACCESS - PRVNÍ SKUPINA
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Získejte kurz <span className="text-yellow-400">jako první</span><br/>
              <span className="text-green-400">+ BONUS konzultaci</span> v hodnotě 2.500 Kč
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Kurz dostanete za 14 dní, ale s <strong className="text-white">40% slevou</strong> a osobní konzultací pouze pro první kupující.
            </p>
          </motion.div>

          {/* Price section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
              <div className="text-center mb-4">
                <div className="text-gray-400 line-through text-xl">8.499 Kč</div>
                <div className="text-4xl font-black text-yellow-400 mb-2">4.999 Kč</div>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block">
                  SLEVA 3.500 Kč
                </div>
              </div>
              
              <div className="text-center text-gray-300 text-sm">
                + BONUS konzultace v hodnotě 2.500 Kč
              </div>
            </div>
          </motion.div>

          {/* What's included */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-black mb-6">Co dostanete:</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Kompletní kurz</h4>
                <p className="text-gray-300 text-sm">9 stavebních prvků Podnikatelské čtvrtky + praktické nástroje</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Gift className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h4 className="font-bold mb-2">BONUS konzultace</h4>
                <p className="text-gray-300 text-sm">Osobní 60min konzultace jen pro první kupující (hodnota 2.500 Kč)</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Early Access</h4>
                <p className="text-gray-300 text-sm">Dostanete kurz okamžitě po dokončení za 14 dní</p>
              </div>
            </div>
          </motion.div>

          {/* Social proof counter */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-bold border border-green-400/30">
              <TrendingUp className="w-4 h-4" />
              <span>{soldCount} podnikatelů již koupilo</span>
            </div>
          </motion.div>

          {/* Purchase form */}
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <form onSubmit={handlePurchase} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Váš email pro objednávku"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-gray-900 bg-white rounded-xl border-2 border-white/20 focus:border-yellow-400 transition-colors"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4 px-8 rounded-xl font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-yellow-400/30"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Zpracovávám objednávku...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    KOUPIT EARLY ACCESS za 4.999 Kč
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>
            
            <p className="text-xs text-gray-400 mt-4">
              Po odeslání dostanete platební údaje emailem. Kurz obdržíte za 14 dní.
            </p>
          </motion.div>

          {/* Guarantee */}
          <motion.div 
            className="mt-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold">
                <CheckCircle className="w-5 h-5" />
                <span>100% garance vrácení peněz do 30 dní</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}