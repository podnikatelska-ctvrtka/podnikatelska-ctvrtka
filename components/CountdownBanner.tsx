import { motion } from "motion/react";
import { useState } from "react";
import { Calendar, ArrowRight, Users, Shield, CheckCircle, Star, Gift } from "lucide-react";
import { EnhancedCTA } from "./EnhancedCTA";
import { TouchFeedback } from "./TouchFeedback";

export function CountdownBanner() {
  const [bookedSpots] = useState(42);

  const remainingSpots = 50 - bookedSpots;
  const fillPercentage = (bookedSpots / 50) * 100;

  return (
    <motion.section 
      className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            <span>🎁 Limitovaná nabídka</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl mb-4 text-white font-black leading-tight">
            Získejte kurz za <span className="text-yellow-400">akční cenu</span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Kurz Podnikatelská Čtvrtka nyní získáte za speciální cenu včetně 
            <strong className="text-yellow-400"> 3-denního mini kurzu ZDARMA</strong>
          </p>
        </div>

        {/* Mobile CTA nahoře */}
        <div className="lg:hidden mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="text-center mb-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 mb-4">
                <div className="text-blue-600 text-sm mb-1">Vaše investice:</div>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="text-gray-400 text-lg line-through">8.499,- Kč</div>
                  <div className="text-3xl text-blue-600">4.999,- Kč</div>
                </div>
                <div className="text-blue-600 text-xs mb-1">bez DPH</div>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-lg inline-block text-sm">
                  Ušetříte 3.500,- Kč
                </div>
              </div>
              
              <TouchFeedback className="w-full">
                <EnhancedCTA 
                  variant="primary" 
                  size="lg"
                  showSparkles={true}
                  urgencyText="Jen 8 míst zbývá!"
                  className="w-full"
                  onClick={() => window.open('#', '_blank')} // TODO: Nahradit skutečným odkazem
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  KOUPIT ZA 4.999,- Kč
                </EnhancedCTA>
              </TouchFeedback>
            </div>
          </div>
        </div>

        {/* Kompaktní layout - hlavní blok a boční bonus */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Hlavní cenový blok - 2/3 šířky */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hidden lg:block">
            
            {/* Celková hodnota */}
            <div className="text-center mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-green-700 text-xl mb-2">
                  Celková hodnota: 11.000 Kč
                </div>
                <div className="text-green-600 text-sm">
                  Kurz (<span className="line-through text-gray-500">8.499,- Kč</span>) + BONUS konzultace (2.500,- Kč)
                </div>
              </div>
            </div>

            {/* Co získáte - kompaktně */}
            <div className="mb-6">
              <h4 className="text-center mb-4 flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                Co za 4.999,- Kč získáte:
              </h4>
              
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Kompletní online kurz</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Praktické šablony a workshopy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Celoživotní přístup k obsahu</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Okamžitý přístup po platbě</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <Star className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-blue-800">BONUS: 60min konzultace (2.500,- Kč)</span>
                </div>
              </div>
            </div>

            {/* Cenový box */}
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
                <div className="text-blue-600 text-sm mb-2">Vaše investice:</div>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="text-gray-400 text-xl line-through">8.499,- Kč</div>
                  <div className="text-4xl text-blue-600">4.999,- Kč</div>
                </div>
                <div className="text-blue-600 text-xs mb-2">bez DPH</div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
                  Ušetříte 3.500,- Kč
                </div>
              </div>
            </div>

            {/* CTA tlačítko */}
            <div className="text-center">
              <TouchFeedback className="w-full">
                <EnhancedCTA 
                  variant="primary" 
                  size="lg"
                  showSparkles={true}
                  urgencyText="Bonus mizí za 3 hodiny!"
                  className="w-full"
                  onClick={() => window.open('#', '_blank')} // TODO: Nahradit skutečným odkazem
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  KOUPIT <span className="line-through text-blue-200 text-sm">8.499,-</span> ZA 4.999,- Kč
                </EnhancedCTA>
              </TouchFeedback>
              
              <div className="mt-3 text-sm text-gray-600">
                Okamžitý přístup • Celoživotní licence • Záruka kvality
              </div>
            </div>
          </div>

          {/* Boční panel - BONUS a Záruka - 1/3 šířky */}
          <div className="space-y-6">
            
            {/* BONUS sekce - kompaktní */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 relative">
              
              {/* BONUS badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs shadow-lg">
                BONUS
              </div>
              
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full mb-2 text-sm">
                  <Gift className="w-3 h-3" />
                  ZDARMA 2.500 Kč
                </div>
                
                <h3 className="text-sm">
                  Jen pro <span className="text-blue-600">50 lidí</span>
                </h3>
              </div>
            
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-center mb-2 text-sm">
                  <span className="text-blue-600">60min konzultace</span>
                </p>
                <p className="text-gray-600 text-center text-xs">
                  Společně vyplníme vaši čtvrtku
                </p>
              </div>
              
              {/* Progress bar */}
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: "70%" }}
                    animate={{ width: `${fillPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-blue-600">
                    Rezervováno: <strong>{bookedSpots}</strong>
                  </span>
                  <span className="text-gray-600">
                    Zbývá: <strong>{remainingSpots}</strong>
                  </span>
                </div>
              </div>
              
              {/* Co obsahuje - velmi kompaktně */}
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="text-blue-800 mb-2 text-xs">
                  Co BONUS obsahuje:
                </h4>
                <div className="text-xs text-gray-700 space-y-1">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span>Společné vyplnění čtvrtky</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span>Akční kroky na 30 dní</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span>Odpovědi na otázky</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Záruka - kompaktní */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                
                <h3 className="text-sm mb-2">
                  <span className="text-green-600">Záruka kvality</span>
                </h3>
                
                <div className="text-gray-600 text-xs mb-3">
                  14 dní na ověření
                </div>
                
                <p className="text-gray-600 text-xs leading-relaxed">
                  Pokud kurz nebude odpovídat kvalitě, vrátíme vám <span className="text-green-600">100% peněz</span>.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.section>
  );
}