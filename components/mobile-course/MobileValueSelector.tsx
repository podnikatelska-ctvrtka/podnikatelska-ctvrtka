/**
 * 📱 MOBILE VALUE SELECTOR
 * 
 * Jednoduchý selector pro výběr hodnotové nabídky z BMC
 * (mobilní verze - nepotřebuje userId, dostává values jako prop)
 */

import { Check } from "lucide-react";

interface Value {
  text: string;
  color: string;
}

interface Props {
  values: Value[];
  selectedValue?: string;
  onSelectValue: (value: string) => void;
  label?: string;
}

export function MobileValueSelector({
  values,
  selectedValue,
  onSelectValue,
  label = "Vyber hodnotovou nabídku:"
}: Props) {
  if (values.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-500">
          ⚠️ Nejprve si vytvoř hodnotové nabídky v Modulu 1
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
        {values.map((value, index) => {
          const isSelected = selectedValue === value.text;
          
          return (
            <button
              key={index}
              onClick={() => onSelectValue(value.text)}
              className={`
                w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all
                ${isSelected 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 bg-white hover:border-green-300'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: value.color }}
                />
                <span className={`text-sm ${isSelected ? 'font-semibold text-green-900' : 'text-gray-700'}`}>
                  {value.text}
                </span>
              </div>
              
              {isSelected && (
                <Check className="w-5 h-5 text-green-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
