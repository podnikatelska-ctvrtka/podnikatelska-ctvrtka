import { useState } from "react";
import { AlertTriangle, Lightbulb, TrendingUp, Users, DollarSign, Zap, ArrowRight, CheckCircle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

interface Scenario {
  id: string;
  problem: string;
  icon: any;
  color: string;
  description: string;
  solutions: Solution[];
}

interface Solution {
  id: string;
  title: string;
  description: string;
  canvasAction: string;
  difficulty: 'easy' | 'medium' | 'hard';
  impact: 'low' | 'medium' | 'high';
}

const SCENARIOS: Scenario[] = [
  {
    id: 'low-customers',
    problem: '🚨 Málo zákazníků',
    icon: Users,
    color: 'red',
    description: 'Nemáte dostatek zákazníků, prodeje jsou nízké',
    solutions: [
      {
        id: 'new-segment',
        title: '🎯 Přidat nový segment',
        description: 'Cílte na další skupinu zákazníků (např. prodáváte koncovým zákazníkům? Zkuste firmy!)',
        canvasAction: 'Přidejte NOVÝ štítek s NOVOU BARVOU do "Zákaznické segmenty"',
        difficulty: 'medium',
        impact: 'high'
      },
      {
        id: 'new-channel',
        title: '📢 Zkusit nový kanál',
        description: 'Zjistěte kde jsou vaši zákazníci a oslovte je tam (např. používáte Facebook? Zkuste Instagram nebo TikTok!)',
        canvasAction: 'Přidejte položku do "Kanály" (stejnou barvou jako segment)',
        difficulty: 'easy',
        impact: 'medium'
      },
      {
        id: 'partnership',
        title: '🤝 Najít partnera',
        description: 'Spolupracujte s někým kdo už má vaše zákazníky (affiliate, reseller)',
        canvasAction: 'Přidejte položku do "Klíčová partnerství"',
        difficulty: 'hard',
        impact: 'high'
      }
    ]
  },
  {
    id: 'low-revenue',
    problem: '💰 Nízké příjmy',
    icon: DollarSign,
    color: 'yellow',
    description: 'Příjmy jsou příliš nízké, nevydělává se dost peněz',
    solutions: [
      {
        id: 'price-increase',
        title: '📈 Zvýšit cenu',
        description: 'Přidejte hodnotu (lepší kvalita, rychlejší dodání, záruka) a pak zvyšte cenu o 20%. Většinou ztratíte méně než 20% zákazníků = vyšší příjem!',
        canvasAction: 'Nejprve přidejte NOVOU hodnotu do "Hodnotová nabídka", pak upravte cenu v "Zdroje příjmů"',
        difficulty: 'easy',
        impact: 'high'
      },
      {
        id: 'premium-tier',
        title: '⭐ Přidat premium verzi',
        description: 'Vytvořte dražší variantu s extra funkcemi (např. Basic 500 Kč → Premium 1500 Kč)',
        canvasAction: 'Přidejte NOVOU položku s NOVOU BARVOU do "Hodnotová nabídka" + "Zdroje příjmů"',
        difficulty: 'medium',
        impact: 'high'
      },
      {
        id: 'upsell',
        title: '🔄 Cross-sell / Up-sell',
        description: 'Prodávejte doplňkové produkty (kavárna → dezerty, e-shop → doprava + balení, kadeřnictví → produkty na vlasy)',
        canvasAction: 'Přidejte další položku do "Zdroje příjmů" (můžete použít stejnou barvu)',
        difficulty: 'medium',
        impact: 'medium'
      }
    ]
  },
  {
    id: 'high-costs',
    problem: '📉 Vysoké náklady',
    icon: TrendingUp,
    color: 'purple',
    description: 'Náklady jsou příliš vysoké, zisk je nízký nebo záporný',
    solutions: [
      {
        id: 'cheaper-partner',
        title: '💸 Levnější dodavatel',
        description: 'Najděte alternativního partnera s nižší cenou (např. jiný software, jiný výrobce)',
        canvasAction: 'Nahraďte položku v "Klíčová partnerství" nebo snižte hodnotu v "Struktura nákladů"',
        difficulty: 'medium',
        impact: 'medium'
      },
      {
        id: 'automation',
        title: '🤖 Automatizace',
        description: 'Automatizujte opakující se činnosti (email sekvence, onboarding, fakturace)',
        canvasAction: 'Přidejte "Automatizace" do "Klíčové aktivity" + snižte náklady na manuální práci',
        difficulty: 'hard',
        impact: 'high'
      },
      {
        id: 'outsource',
        title: '🌍 Outsourcing',
        description: 'Některé činnosti můžete dělat levněji přes externího dodavatele (grafika, účetnictví)',
        canvasAction: 'Přesuňte položku z "Klíčové zdroje" do "Klíčová partnerství" + snižte náklady',
        difficulty: 'medium',
        impact: 'medium'
      }
    ]
  },
  {
    id: 'low-retention',
    problem: '🔄 Zákazníci odcházejí',
    icon: Zap,
    color: 'blue',
    description: 'Zákazníci kupují jednou a pak odchází, nízká retention',
    solutions: [
      {
        id: 'improve-relationship',
        title: '❤️ Zlepšit vztah',
        description: 'Přidejte osobní komunikaci, community, support (email newslettery, Facebook skupina)',
        canvasAction: 'Přidejte položky do "Vztahy se zákazníky"',
        difficulty: 'easy',
        impact: 'high'
      },
      {
        id: 'add-value',
        title: '🎁 Přidat hodnotu',
        description: 'Vylepšete produkt/službu (nové funkce, bonusy, garance)',
        canvasAction: 'Přidejte položky do "Hodnotová nabídka"',
        difficulty: 'medium',
        impact: 'high'
      },
      {
        id: 'subscription',
        title: '🔁 Subscription model',
        description: 'Přejděte na předplatné místo jednorázového prodeje (stabilnější příjem)',
        canvasAction: 'Změňte "Zdroje příjmů" z jednorázové platby na měsíční předplatné',
        difficulty: 'hard',
        impact: 'high'
      }
    ]
  }
];

// 🗺️ MAPPING: Solution ID → Canvas Section + Lesson
const SOLUTION_MAPPING: Record<string, { section: string, lessonId: number }> = {
  'new-segment': { section: 'segments', lessonId: 1 },
  'new-channel': { section: 'channels', lessonId: 3 },
  'partnership': { section: 'partnerships', lessonId: 8 },
  'price-increase': { section: 'value', lessonId: 2 },
  'premium-tier': { section: 'value', lessonId: 2 },
  'upsell': { section: 'revenue', lessonId: 5 },
  'cheaper-partner': { section: 'partnerships', lessonId: 8 },
  'automation': { section: 'activities', lessonId: 7 },
  'outsource': { section: 'partnerships', lessonId: 8 },
  'improve-relationship': { section: 'relationships', lessonId: 4 },
  'add-value': { section: 'value', lessonId: 2 },
  'subscription': { section: 'revenue', lessonId: 5 },
};

interface Props {
  userId: string;
  onComplete: () => void;
  onNavigateNext?: () => void;
}

export function ProblemSolver({ userId, onComplete, onNavigateNext }: Props) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [appliedSolutions, setAppliedSolutions] = useState<Set<string>>(new Set());
  const [hasReadContent, setHasReadContent] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleApplySolution = (solution: Solution) => {
    setAppliedSolutions(prev => new Set([...prev, solution.id]));
    setSelectedSolution(solution);
    setHasReadContent(true); // Označit že viděl obsah
  };

  const handleOpenCanvas = (solution: Solution) => {
    const mapping = SOLUTION_MAPPING[solution.id];
    if (!mapping) {
      console.error('No mapping found for solution:', solution.id);
      return;
    }

    // Dispatch event s parametry pro CourseDemoV3
    window.dispatchEvent(new CustomEvent('open-canvas-section', {
      detail: {
        section: mapping.section,
        lessonId: mapping.lessonId,
        solutionTitle: solution.title
      }
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header - ČISTŠÍ */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">🚀 Řešení typických situací</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Vyberte váš největší problém a najděte konkrétní řešení
        </p>
      </div>

      {!selectedScenario ? (
        /* Scenario Selection */
        <>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
            <p className="text-blue-900">
              💡 <strong>Volitelné:</strong> Projděte si 4 typické problémy a jejich řešení. Můžete pokračovat i bez výběru.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCENARIOS.map((scenario, index) => {
              const Icon = scenario.icon;
              // ✅ ČISTŠÍ - jen bílé karty s barevnou ikonou
              const iconColors = {
                red: 'text-red-600 bg-red-50',
                yellow: 'text-yellow-600 bg-yellow-50',
                purple: 'text-purple-600 bg-purple-50',
                blue: 'text-blue-600 bg-blue-50'
              }[scenario.color];

              return (
                <button
                  key={scenario.id}
                  onClick={() => {
                    setSelectedScenario(scenario);
                    setHasReadContent(true);
                  }}
                  className="bg-white border-2 border-gray-200 hover:border-blue-400 p-6 rounded-xl text-left transition-all hover:shadow-lg group"
                >
                  <div className={`w-14 h-14 rounded-full ${iconColors} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="mb-2">{scenario.problem}</h4>
                  <p className="text-gray-600 mb-3">
                    {scenario.description}
                  </p>
                  <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
                    {scenario.solutions.length} možných řešení 
                    <ArrowRight className="w-4 h-4" />
                  </p>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        /* Solutions View */
        <div className="space-y-4">
          <Button
            onClick={() => {
              setSelectedScenario(null);
              setSelectedSolution(null);
            }}
            variant="outline"
            size="sm"
          >
            ← Zpět na výběr problému
          </Button>

          <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
            <h4 className="mb-2 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              {selectedScenario.problem}
            </h4>
            <p className="text-gray-600 mb-6">
              {selectedScenario.description}
            </p>
            <p className="text-gray-600 mb-4">
              Vyberte řešení které nejlépe sedí na vaši situaci:
            </p>

            <div className="space-y-4">
              {selectedScenario.solutions.map((solution, index) => {
                const isApplied = appliedSolutions.has(solution.id);

                return (
                  <div
                    key={solution.id}
                    className={`border-2 rounded-lg p-5 ${
                      isApplied 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-white border-gray-200 hover:border-blue-300'
                    } transition-all`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="mb-1 flex items-center gap-2">
                          {solution.title}
                          {isApplied && <CheckCircle className="w-5 h-5 text-green-600" />}
                        </h5>
                        <p className="text-gray-600 mb-3">
                          {solution.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(solution.difficulty)}`}>
                        {solution.difficulty === 'easy' && '🟢 Snadné'}
                        {solution.difficulty === 'medium' && '🟡 Střední'}
                        {solution.difficulty === 'hard' && '🔴 Obtížné'}
                      </span>
                      <span className={`text-xs font-bold ${getImpactColor(solution.impact)}`}>
                        {solution.impact === 'high' && '🚀 Vysoký dopad'}
                        {solution.impact === 'medium' && '📊 Střední dopad'}
                        {solution.impact === 'low' && '📉 Nízký dopad'}
                      </span>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-3">
                      <p className="text-blue-900">
                        <strong>📝 Akce v Canvas:</strong><br />
                        {solution.canvasAction}
                      </p>
                    </div>

                    <Button
                      onClick={() => {
                        handleApplySolution(solution);
                        handleOpenCanvas(solution);
                      }}
                      className={`w-full transition-all ${
                        isApplied 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      size="sm"
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          ✅ Viděl jsem - otevřít znovu
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Otevřít v Canvas
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CTA - Dokončit lekci */}
      {!isCompleted ? (
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center shadow-2xl mt-6 transition-all duration-300 ease-out"
        >
          <h3 className="mb-3 text-white">
            ✅ Hotovo! Znáte řešení typických problémů
          </h3>
          <p className="text-green-100 mb-6">
            {appliedSolutions.size > 0 
              ? `Skvělá práce! Prohlédli jste si ${appliedSolutions.size} ${appliedSolutions.size === 1 ? 'řešení' : 'řešení'}.`
              : 'Můžete se kdykoliv vrátit a prohlédnout si řešení.'
            }
          </p>
          <Button
            onClick={() => {
              setIsCompleted(true);
              onComplete();
            }}
            size="lg"
            className="bg-white text-green-700 hover:bg-green-50 font-bold text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            Dokončit lekci a pokračovat →
          </Button>
        </div>
      ) : (
        <div
          className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-8 text-white shadow-xl mt-6 transition-all duration-300 ease-out"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-2">
                ✅ Lekce dokončena!
              </h4>
              <p className="text-green-50 text-lg">
                Skvělá práce! Vybrali jste řešení a můžete ho aplikovat v Canvas (Modul 1).
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setIsCompleted(false)}
              variant="outline"
              size="lg"
              className="flex-1 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            >
              🔄 Zkusit znovu
            </Button>
            {onNavigateNext && (
              <Button
                onClick={onNavigateNext}
                size="lg"
                className="flex-1 bg-white text-green-600 hover:bg-green-50"
              >
                Pokračovat na další lekci →
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
