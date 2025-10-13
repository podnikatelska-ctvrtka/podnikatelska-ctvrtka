import { motion } from "motion/react";
import { TrendingUp, CheckCircle, Zap, ArrowDown } from "lucide-react";
import { TakeawaysTimeline } from "./TakeawaysTimeline";
import { TimelineTabs } from "./TimelineTabs";

export function CompactCaseStudySection() {
  const caseStudy = {
    owner: "Marie"
  };

  return (
    <section className="case-study-section py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 relative overflow-hidden" data-section="case-study">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity, 
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut", 
            delay: 3,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-md border border-indigo-200">
            <span className="text-lg">⚡</span>
            Reálná transformace s čtvrtkou
          </div>
          
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-black leading-tight">
            Jak <span className="text-blue-600 font-black">Čtvrtka změnila</span>
            <br />My Coffee Praha
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Příběh Marie, která pomocí <strong>90minutové strategie</strong> zvýšila tržby o <strong>46%</strong> bez navýšení nákladů na marketing.
          </p>
          {/* Desktop - horizontal */}
          <div className="hidden md:flex items-center justify-center space-x-4 md:space-x-8 mt-8 text-sm md:text-base flex-wrap gap-y-3">
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg shadow-sm">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="font-bold text-blue-800">Investice jen 3.500,- Kč</span>
            </div>
            <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-lg shadow-sm">
              <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <span className="font-bold text-orange-800">Hotovo za 6 týdnů</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-bold text-green-800">Praktické okamžité kroky</span>
            </div>
          </div>

          {/* Mobile - vertical stack */}
          <div className="flex md:hidden flex-col space-y-2 mt-6 max-w-sm mx-auto">
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg shadow-sm">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-semibold text-blue-800">3.500,- Kč investice</span>
            </div>
            <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg shadow-sm">
              <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span className="text-sm font-semibold text-orange-800">Hotovo za 6 týdnů</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm font-semibold text-green-800">Praktické kroky ihned</span>
            </div>
          </div>
        </motion.div>

        {/* 2-Column Layout: Left = Stats, Right = Timeline */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-5 md:gap-6 lg:gap-8 items-start mb-8 md:mb-10">
          
          {/* LEFT COLUMN - Business Context + Stats */}
          <motion.div
            className="space-y-3 md:space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Business Info Card */}
            <motion.div 
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-5 shadow-md"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl shadow-md">
                  ☕
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">My Coffee, Praha</h3>
                  <div className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-full text-sm font-bold mt-1 shadow-sm">
                    👩‍💼 Marie, majitelka
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 md:p-4 shadow-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 text-lg md:text-xl flex-shrink-0">😰</span>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1 text-sm md:text-base">Před čtvrtkou:</h4>
                    <p className="text-blue-800 text-sm leading-relaxed italic">
                      "Měla jsem kavárnu tři roky a sotva jsem se uživila. Nevěděla jsem, proč někdo chodí 
                      a jiný ne. Zkoušela jsem všechno - nové nápoje, slevy, akce... Ale nic nefungovalo. 
                      Cítila jsem se ztracená."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Before/After Stats */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-bold text-gray-900 mb-4 text-center">
                💰 Výsledky transformace
              </h4>
              
              <div className="space-y-3">
                {/* Before */}
                <div className="bg-white/90 rounded-lg p-3 shadow-sm">
                  <div className="text-gray-600 text-xs mb-1">PŘED ČTVRTKOU</div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-xl md:text-2xl font-bold text-gray-700">65 000,- Kč</div>
                    <div className="text-gray-600 text-sm">~320 zákazníků</div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-xs font-bold">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +46% růst
                  </div>
                </div>
                
                {/* After */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 shadow-sm">
                  <div className="text-green-700 text-xs mb-1 font-medium">PO 6 TÝDNECH</div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-xl md:text-2xl font-bold text-green-700">95 000,- Kč</div>
                    <div className="text-green-700 text-sm">~480 zákazníků</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Klíčové faktory */}
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-5 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-bold text-gray-900 mb-3">
                ✨ Klíč k úspěchu
              </h4>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-2 bg-white rounded-lg p-2 shadow-sm">
                  <span className="text-indigo-600 text-sm mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm flex-1">Zeptala se zákazníků</p>
                </div>
                <div className="flex items-start space-x-2 bg-white rounded-lg p-2 shadow-sm">
                  <span className="text-indigo-600 text-sm mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm flex-1">3 segmenty místo 1</p>
                </div>
                <div className="flex items-start space-x-2 bg-white rounded-lg p-2 shadow-sm">
                  <span className="text-indigo-600 text-sm mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm flex-1">Žádné extra náklady</p>
                </div>
                <div className="flex items-start space-x-2 bg-white rounded-lg p-2 shadow-sm">
                  <span className="text-indigo-600 text-sm mt-0.5">✓</span>
                  <p className="text-gray-700 text-sm flex-1">Hotovo za 6 týdnů</p>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN - Timeline "Co Marie změnila" - TABS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                🎯 Co konkrétně Marie změnila
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Implementace za 6 týdnů pomocí čtvrtky - klikni na týden pro detail
              </p>
            </div>

            {/* Timeline implementace - TABS format */}
            <TimelineTabs />
          </motion.div>
        </div>

        {/* Top 3 Takeaways - Timeline Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              🎯 3 klíčové poznatky z Marie's příběhu
            </h3>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-semibold">
              Co si můžeš odnést a <span className="text-blue-600">aplikovat ve svém podnikání hned dnes</span>
            </p>
          </div>
          
          <TakeawaysTimeline />
        </motion.div>

        {/* Jednoduchý CTA - bez dalšího boxu */}
        <motion.div
          className="mt-20 md:mt-28 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-3">
            <button
              onClick={() => {
                const emailSection = document.getElementById('email-form');
                if (emailSection) {
                  // Scroll to email section
                  emailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  // Focus on email input after scroll
                  setTimeout(() => {
                    const emailInput = emailSection.querySelector('input[type="email"]') as HTMLInputElement;
                    if (emailInput) {
                      emailInput.focus();
                    }
                  }, 600);
                }
              }}
              className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group cursor-pointer"
            >
              Chci svou Čtvrtku za průkopnickou cenu
              <ArrowDown className="ml-3 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
            <p className="text-gray-600 text-sm">
              Mini kurz ZDARMA • Průkopnická cena kurzu (4.999,- Kč)
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}