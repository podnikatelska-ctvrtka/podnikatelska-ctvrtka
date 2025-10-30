import { Calculator, TrendingUp, Target, ChevronRight } from "lucide-react";
import { haptic } from "../../lib/haptics";

interface MobileToolsSectionProps {
  onSelectTool: (toolId: string) => void;
  onClose?: () => void;
}

export function MobileToolsSection({ onSelectTool, onClose }: MobileToolsSectionProps) {
  const tools = [
    {
      id: 'action-plan',
      title: '🎯 Akční plán',
      icon: Target,
      description: 'Vaše konkrétní další kroky',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
    },
    {
      id: 'target-calculator',
      title: '🧮 Kalkulačka zákazníků',
      icon: Calculator,
      description: 'Kolik potřebuji zákazníků?',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
    },
    {
      id: 'segment-size',
      title: '📊 Velikost segmentu',
      icon: TrendingUp,
      description: 'Jak zjistit kolik lidí je v segmentu',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">🧮 Nástroje</h1>
        <p className="text-gray-600">Užitečné kalkulačky a pomůcky pro váš byznys</p>
      </div>

      {/* Tools Grid */}
      <div className="space-y-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          
          return (
            <button
              key={tool.id}
              onClick={() => {
                haptic('medium');
                onSelectTool(tool.id);
                if (onClose) onClose();
              }}
              className={`w-full ${tool.bgColor} border-2 ${tool.borderColor} rounded-xl p-4 text-left transition-all active:scale-95 hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`p-3 bg-gradient-to-r ${tool.color} text-white rounded-lg flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {tool.description}
                  </p>
                </div>
                
                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-900">
          💡 <strong>Tip:</strong> Tyto nástroje vám pomohou vypočítat konkrétní čísla pro váš byznys plán.
        </p>
      </div>
    </div>
  );
}
