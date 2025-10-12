import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, CheckCircle, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";

interface GuidedTourProps {
  step: number;
  totalSteps: number;
  isActive: boolean;
  onNext: () => void;
  onSkip: () => void;
  onComplete: () => void;
  highlightSection?: string; // ID sekce která má být highlightnutá
  title: string;
  description: string;
  tips?: string[];
}

export function GuidedTour({
  step,
  totalSteps,
  isActive,
  onNext,
  onSkip,
  onComplete,
  highlightSection,
  title,
  description,
  tips = []
}: GuidedTourProps) {
  if (!isActive) return null;

  const isLastStep = step === totalSteps;

  return (
    <AnimatePresence>
      {/* Overlay s tmavším pozadím - LEPŠÍ VIDITELNOST */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] print:hidden"
        onClick={onSkip}
      />

      {/* Tour guide popup - SCROLLOVATELNÝ + VÝŠE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed top-[5vh] left-1/2 -translate-x-1/2 z-[70] w-full max-w-lg mx-4 max-h-[85vh] flex flex-col"
      >
        <div className="bg-white rounded-2xl shadow-2xl border-4 border-blue-500 overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header - FIXED */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                <span className="font-bold text-lg">Interaktivní kurz</span>
              </div>
              <button
                onClick={onSkip}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-2 text-sm text-blue-100">
              Krok {step} z {totalSteps}
            </div>
          </div>

          {/* Content - SCROLLOVATELNÝ */}
          <div className="overflow-y-auto flex-1 p-6 space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-base text-gray-700 leading-relaxed">{description}</p>

            {/* Tips */}
            {tips.length > 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-3 text-base">💡 Tipy:</p>
                <ul className="space-y-2 text-sm text-blue-800">
                  {tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Progress bar - JEN pokud je víc než 1 krok */}
            {totalSteps > 1 && (
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {Math.round((step / totalSteps) * 100)}% dokončeno
                </p>
              </div>
            )}
          </div>

          {/* Info text - FIXED na spodku */}
          <div className="bg-blue-50 px-6 py-5 border-t border-blue-200 flex-shrink-0">
            <p className="text-center text-blue-900 text-base leading-relaxed">
              💡 <strong>Nejdřív zavřete tip křížkem ×</strong><br/>
              Pak vyplňte zvýrazněnou sekci
            </p>
          </div>
        </div>
      </motion.div>


    </AnimatePresence>
  );
}

// Helper komponenta pro scroll k highlightnuté sekci
export function scrollToSection(sectionId: string) {
  const element = document.querySelector(`[data-canvas-section="${sectionId}"]`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
