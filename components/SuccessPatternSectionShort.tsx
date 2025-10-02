import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function SuccessPatternSectionShort() {
  return (
    <section data-section="success-pattern-intro" className="py-8 bg-gradient-to-b from-blue-50/50 to-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 md:p-8 border-2 border-green-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Co mají společného všichni, kdo uspěli?</span>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-800 font-semibold leading-relaxed mb-6">
              Použili <span className="text-green-600 font-bold">stejný systém</span> jako Marie
            </p>

            <div className="bg-white/60 rounded-xl p-4 md:p-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-gray-700 text-sm font-medium">
                    Zeptali se zákazníků
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="text-gray-700 text-sm font-medium">
                    Spustili za 2 týdny
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📈</div>
                  <p className="text-gray-700 text-sm font-medium">
                    První výsledky za 4-6 týdnů
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mt-4 leading-relaxed">
              Nebyli marketing experti. Jen vyplnili <strong className="text-gray-900">9 políček za víkend</strong> a začali měnit věci.
              <br />
              <span className="text-sm text-gray-600">
                Podívej se, jak to Marie udělala krok po kroku ⬇️
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}