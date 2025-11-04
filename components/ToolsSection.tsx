import { Calculator, TrendingUp, ChevronDown, ChevronUp, Target } from "lucide-react";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface Tool {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  requiresCompletion?: boolean; // ✅ Zobrazit pouze po 100% dokončení
}

interface ToolsSectionProps {
  onSelectTool: (toolId: string) => void;
  currentTool?: string | null;
  progressPercent?: number; // 🎯 Pro kontrolu dokončení kurzu
}

export function ToolsSection({ onSelectTool, currentTool, progressPercent = 0 }: ToolsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true); // 🔥 Defaultně rozbalené!

  const tools: Tool[] = [
    {
      id: 'action-plan',
      title: '🎯 Akční plán',
      icon: Target,
      description: 'Vaše konkrétní další kroky',
      requiresCompletion: true, // ✅ Zobrazit jen po dokončení kurzu (100%)
    },
    {
      id: 'target-calculator',
      title: 'Kolik potřebuji zákazníků?',
      icon: Calculator,
      description: 'Spočítej si cílový počet zákazníků',
    },
    {
      id: 'segment-size',
      title: 'Velikost segmentu',
      icon: TrendingUp,
      description: 'Jak zjistit kolik lidí je v segmentu',
    },
  ];

  return (
    <div className="border-b border-gray-200">
      {/* Tools Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg">🧮</span>
        <span className="flex-1 text-left font-semibold text-gray-900">Nástroje</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Tools List */}
      {isExpanded && (
        <div className="pb-3 px-3 space-y-1">
          {tools
            .filter((tool) => {
              // ✅ Filtruj Akční plán - zobrazit pouze po dokončení celého kurzu
              if (tool.requiresCompletion) {
                return progressPercent === 100;
              }
              return true;
            })
            .map((tool) => {
              const Icon = tool.icon;
              const isActive = currentTool === tool.id;
              
              return (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className={`w-full flex items-start gap-2 p-2 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-purple-50 border-2 border-purple-300'
                      : 'hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    isActive ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-purple-900' : 'text-gray-900'
                    }`}>
                      {tool.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
