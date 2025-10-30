/**
 * 📱 MOBILE SEGMENT SELECTOR
 * 
 * Jednoduchý selector pro výběr segmentu z BMC
 * (mobilní verze - nepotřebuje userId, dostává segments jako prop)
 */

import { Check } from "lucide-react";

interface Segment {
  text: string;
  color: string;
}

interface Props {
  segments: Segment[];
  selectedSegment?: string;
  onSelectSegment: (segment: string) => void;
  label?: string;
}

export function MobileSegmentSelector({
  segments,
  selectedSegment,
  onSelectSegment,
  label = "Vyber segment:"
}: Props) {
  if (segments.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-500">
          ⚠️ Nejprve si vytvoř zákaznické segmenty v Modulu 1
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-sm text-gray-700">{label}</p>
      )}
      
      <div className="space-y-2">
        {segments.map((segment, index) => {
          const isSelected = selectedSegment === segment.text;
          
          return (
            <button
              key={index}
              onClick={() => onSelectSegment(segment.text)}
              className={`
                w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: segment.color }}
                />
                <span className={`text-sm ${isSelected ? 'font-semibold text-blue-900' : 'text-gray-700'}`}>
                  {segment.text}
                </span>
              </div>
              
              {isSelected && (
                <Check className="w-5 h-5 text-blue-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
