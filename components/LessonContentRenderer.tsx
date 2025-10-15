import { useState } from "react";
import { ExampleComparison } from "./ExampleComparison";
import { TipBox } from "./TipBox";
import { InteractiveDemoSelector } from "./InteractiveDemoSelector";
import { ChevronDown, Lightbulb } from "lucide-react";

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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div 
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Examples - Modern card layout */}
      {examples?.good && examples.bad && (
        <div>
          <ExampleComparison 
            good={examples.good} 
            bad={examples.bad} 
          />
        </div>
      )}

      {/* Interactive demo */}
      {showDemo && (
        <div className="transition-all">
          <InteractiveDemoSelector compact />
        </div>
      )}

      {/* Tips - Collapsible with modern design - SKRYTO pokud hideTips=true */}
      {!hideTips && tips && tips.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-sm border border-amber-200 overflow-hidden">
          <button
            onClick={() => setTipsExpanded(!tipsExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-amber-100/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-900">
                  💡 Praktické tipy
                </h4>
                <p className="text-gray-600">
                  {tips.length} {tips.length === 1 ? 'tip' : tips.length < 5 ? 'tipy' : 'tipů'} pro lepší výsledky
                </p>
              </div>
            </div>
            <ChevronDown 
              className={`w-6 h-6 text-gray-500 transition-transform ${
                tipsExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {tipsExpanded && (
            <div className="px-6 pb-6 space-y-4 transition-all">
              {tips.map((tip, i) => (
                <TipBox key={i}>{tip}</TipBox>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
