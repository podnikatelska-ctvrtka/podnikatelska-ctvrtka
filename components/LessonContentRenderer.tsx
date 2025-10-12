import { useState } from "react";
import { ExampleComparison } from "./ExampleComparison";
import { TipBox } from "./TipBox";
import { InteractiveDemoSelector } from "./InteractiveDemoSelector";
import { ChevronDown, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LessonContentProps {
  content: string;
  examples?: {
    good?: string[];
    bad?: string[];
  };
  tips?: string[];
  showDemo?: boolean;
  hideTips?: boolean; // Pro Modul 1 kde se tipy zobrazují v interaktivním modalu
}

export function LessonContentRenderer({ content, examples, tips, showDemo, hideTips = false }: LessonContentProps) {
  const [tipsExpanded, setTipsExpanded] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* Main content - Clean card with shadow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
      >
        <div 
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </motion.div>

      {/* Examples - Modern card layout */}
      {examples?.good && examples.bad && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ExampleComparison 
            good={examples.good} 
            bad={examples.bad} 
          />
        </motion.div>
      )}

      {/* Interactive demo */}
      {showDemo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InteractiveDemoSelector compact />
        </motion.div>
      )}

      {/* Tips - Collapsible with modern design - SKRYTO pokud hideTips=true */}
      {!hideTips && tips && tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-sm border border-amber-200 overflow-hidden"
        >
          <button
            onClick={() => setTipsExpanded(!tipsExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-amber-100/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900">
                  💡 Praktické tipy
                </h4>
                <p className="text-sm text-gray-600">
                  {tips.length} {tips.length === 1 ? 'tip' : tips.length < 5 ? 'tipy' : 'tipů'} pro lepší výsledky
                </p>
              </div>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-gray-500 transition-transform ${
                tipsExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <AnimatePresence>
            {tipsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 space-y-3">
                  {tips.map((tip, i) => (
                    <TipBox key={i}>{tip}</TipBox>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
