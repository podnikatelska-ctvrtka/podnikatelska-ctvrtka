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
        canvasAction: 'Přidejte NOVÝ štítek s NOVOU BARVOU do "Zákaznické segmenty" v Čtvrtce',
        difficulty: 'medium',
        impact: 'high'
      },
      {
        id: 'new-channel',
        title: '📢 Zkusit nový kanál',
        description: 'Zjistěte kde jsou vaši zákazníci a oslovte je tam (např. používáte Facebook? Zkuste Instagram nebo TikTok!)',
        canvasAction: 'Přidejte položku do "Kanály" v Čtvrtce (stejnou barvou jako segment)',
        difficulty: 'easy',
        impact: 'medium'
      },
      {
        id: 'partnership',
        title: '🤝 Najít partnera',
        description: 'Spolupracujte s někým kdo už má vaše zákazníky (affiliate, reseller)',
        canvasAction: 'Přidejte položku do "Klíčová partnerství" v Čtvrtce',
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
        canvasAction: 'Nejprve přidejte NOVOU hodnotu do "Hodnotová nabídka" v Čtvrtce, pak upravte cenu v "Zdroje příjmů"',
        difficulty: 'easy',
        impact: 'high'
      },
      {
        id: 'premium-tier',
        title: '⭐ Přidat premium verzi',
        description: 'Vytvořte dražší variantu s extra funkcemi (např. Basic 500 Kč → Premium 1500 Kč)',
        canvasAction: 'Přidejte NOVOU položku s NOVOU BARVOU do "Hodnotová nabídka" + "Zdroje příjmů" v Čtvrtce',
        difficulty: 'medium',
        impact: 'high'
      },
      {
        id: 'upsell',
        title: '🔄 Cross-sell / Up-sell',
        description: 'Prodávejte doplňkové produkty (kavárna → dezerty, e-shop → doprava + balení, kadeřnictví → produkty na vlasy)',
        canvasAction: 'Přidejte další položku do "Zdroje příjmů" v Čtvrtce (můžete použít stejnou barvu)',
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
        canvasAction: 'Upravte existující položku v "Klíčová partnerství" v Čtvrtce nebo přidejte novou',
        difficulty: 'medium',
        impact: 'medium'
      },
      {
        id: 'automate',
        title: '🤖 Automatizace',
        description: 'Ušetřete čas a peníze automatizací (e-mailový automat místo ručního psaní, booking systém místo telefonů)',
        canvasAction: 'Aktualizujte "Klíčové činnosti" v Čtvrtce - zaměřte se na automatizaci',
        difficulty: 'hard',
        impact: 'high'
      },
      {
        id: 'outsource',
        title: '👥 Outsourcing',
        description: 'Najděte freelancery nebo agentury pro nestandardní úkoly místo stálých zaměstnanců',
        canvasAction: 'Přidejte položku do "Klíčová partnerství" v Čtvrtce pro outsourcing',
        difficulty: 'easy',
        impact: 'medium'
      }
    ]
  },
  {
    id: 'low-retention',
    problem: '🔄 Odcházejí zákazníci',
    icon: Zap,
    color: 'blue',
    description: 'Zákazníci nakoupí jednou a už se nevrátí',
    solutions: [
      {
        id: 'loyalty-program',
        title: '🎁 Věrnostní program',
        description: 'Odměňujte opakované nákupy (sleva po 5 nákupech, body za každý nákup)',
        canvasAction: 'Přidejte "Věrnostní program" do "Vztahy se zákazníky" v Čtvrtce',
        difficulty: 'medium',
        impact: 'high'
      },
      {
        id: 'subscription',
        title: '💳 Předplatné',
        description: 'Vytvořte měsíční předplatné s benefity (např. káva: 10 káv za 800 Kč = sleva 20%)',
        canvasAction: 'Přidejte "Předplatné" s NOVOU BARVOU do "Zdroje příjmů" v Čtvrtce',
        difficulty: 'easy',
        impact: 'high'
      },
      {
        id: 'email-automation',
        title: '📧 Email automatizace',
        description: 'Oslovte zákazníky automaticky po X dnech s nabídkou (např. po 14 dnech "vrať se a dostaneš 15% slevu")',
        canvasAction: 'Přidejte "Email automatizace" do "Kanály" v Čtvrtce',
        difficulty: 'medium',
        impact: 'medium'
      }
    ]
  }
];

interface Props {
  onComplete: () => void;
  onNavigateNext?: () => void;
  onAchievementUnlocked?: (achievementId: string) => void;
  isLessonCompleted?: boolean;
}

export function ProblemSolver({ onComplete, onNavigateNext, onAchievementUnlocked, isLessonCompleted = false }: Props) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [appliedSolutions, setAppliedSolutions] = useState<Set<string>>(new Set());
  const [hasReadContent, setHasReadContent] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleApplySolution = (solution: Solution) => {
    setAppliedSolutions(prev => new Set([...prev, solution.id]));
    setSelectedSolution(solution);
    
    // ❌ REMOVED: 'solution-applied' achievement doesn't exist in ACHIEVEMENTS list
    // 🏆 Achievement se triggerne při dokončení lekce, ne při kliknutí na řešení
  };

  const handleOpenCanvas = (solution: Solution) => {
    const mapping: Record<string, { section: string, lessonId: string }> = {
      'new-segment': { section: 'segments', lessonId: 'module1-lesson4' },
      'new-channel': { section: 'channels', lessonId: 'module1-lesson4' },
      'partnership': { section: 'partners', lessonId: 'module1-lesson4' },
      'price-increase': { section: 'value', lessonId: 'module1-lesson4' },
      'premium-tier': { section: 'value', lessonId: 'module1-lesson4' },
      'upsell': { section: 'revenue', lessonId: 'module1-lesson4' },
      'cheaper-partner': { section: 'partners', lessonId: 'module1-lesson4' },
      'automate': { section: 'activities', lessonId: 'module1-lesson4' },
      'outsource': { section: 'partners', lessonId: 'module1-lesson4' },
      'loyalty-program': { section: 'relationships', lessonId: 'module1-lesson4' },
      'subscription': { section: 'revenue', lessonId: 'module1-lesson4' },
      'email-automation': { section: 'channels', lessonId: 'module1-lesson4' }
    };

    const map = mapping[solution.id];
    if (!map) return;

    // Dispatch event to open Canvas
    window.dispatchEvent(new CustomEvent('open-canvas-section', {
      detail: {
        section: map.section,
        lessonId: map.lessonId,
        solutionTitle: solution.title
      }
    }));
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return { label: '🟢 Snadné', color: 'bg-green-50 text-green-700 border-green-200' };
      case 'medium': return { label: '🟡 Střední', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
      case 'hard': return { label: '🔴 Obtížné', color: 'bg-red-50 text-red-700 border-red-200' };
      default: return { label: '', color: '' };
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high': return { label: '🚀 Vysoký dopad', color: 'text-green-600' };
      case 'medium': return { label: '📊 Střední dopad', color: 'text-yellow-600' };
      case 'low': return { label: '📉 Nízký dopad', color: 'text-gray-600' };
      default: return { label: '', color: '' };
    }
  };

  return (
    <div className="space-y-4">
      {/* 🎨 NEW: Colorful Header */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl shadow-md p-6">
        <h3 className="mb-2 text-white">🚀 Řešení typických situací</h3>
        <p className="text-orange-50 text-sm sm:text-base">
          Vyberte váš největší problém a najděte konkrétní řešení
        </p>
      </div>

      {!selectedScenario ? (
        /* Scenario Selection - Cleaner cards */
        <>
          <div className="bg-blue-50 border border-blue-200 p-2 rounded-lg">
            <p className="text-blue-900 text-xs">
              💡 <strong>Volitelné:</strong> Projděte si 4 typické problémy a jejich řešení. Můžete pokračovat i bez výběru.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIOS.map((scenario) => {
              const Icon = scenario.icon;
              const iconColors = {
                red: 'bg-red-50 text-red-600 border-red-100',
                yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100',
                purple: 'bg-purple-50 text-purple-600 border-purple-100',
                blue: 'bg-blue-50 text-blue-600 border-blue-100'
              }[scenario.color];

              return (
                <button
                  key={scenario.id}
                  onClick={() => {
                    setSelectedScenario(scenario);
                    setHasReadContent(true);
                  }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 p-4 sm:p-6 text-left transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl ${iconColors} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">{scenario.problem}</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {scenario.description}
                  </p>
                  <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
                    {scenario.solutions.length} možných řešení 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </p>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        /* Solutions View - Cleaner */
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

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{selectedScenario.problem}</h4>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">
                  {selectedScenario.description}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Vyberte řešení které nejlépe sedí na vaši situaci:
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedScenario.solutions.map((solution) => {
                const isApplied = appliedSolutions.has(solution.id);
                const difficulty = getDifficultyBadge(solution.difficulty);
                const impact = getImpactBadge(solution.impact);

                return (
                  <div
                    key={solution.id}
                    className={`rounded-xl p-3 sm:p-4 transition-all ${
                      isApplied 
                        ? 'bg-green-50 border-2 border-green-300' 
                        : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="mb-2">
                      <h5 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 flex items-center gap-2">
                        {solution.title}
                        {isApplied && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </h5>
                      <p className="text-gray-600 text-xs sm:text-sm mb-2">
                        {solution.description}
                      </p>
                    </div>

                    {/* Badges - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-lg border font-medium inline-block w-fit ${difficulty.color}`}>
                        {difficulty.label}
                      </span>
                      <span className={`text-xs font-semibold inline-block w-fit ${impact.color}`}>
                        {impact.label}
                      </span>
                    </div>

                    {/* Čtvrtka Action - Compact */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-2 rounded-lg mb-2">
                      <p className="text-blue-900 text-xs">
                        <strong>📝 Čtvrtka:</strong> <span className="text-blue-800">{solution.canvasAction}</span>
                      </p>
                    </div>

                    {/* Button */}
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
                          Otevřít Čtvrtku
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

      {/* CTA - Complete Lesson - JEN když lekce NENÍ dokončená */}
      {!isLessonCompleted && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <h3 className="mb-2 text-white text-xl sm:text-2xl">
            ✅ Hotovo! Znáte řešení typických problémů
          </h3>
          <p className="text-green-50 mb-6 text-sm sm:text-base max-w-xl mx-auto">
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
            className="bg-white text-green-700 hover:bg-green-50 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            <span className="hidden sm:inline">Dokončit lekci a pokračovat →</span>
            <span className="sm:hidden">Dokončit a pokračovat →</span>
          </Button>
        </div>
      )}

      {/* Completion Screen - JEN když user právě dokončil (ne když se vrací) */}
      {isCompleted && !isLessonCompleted && (
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-start gap-3 sm:gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl sm:text-2xl font-bold mb-2">
                ✅ Lekce dokončena!
              </h4>
              <p className="text-green-50 text-sm sm:text-base">
                Skvělá práce! Vybrali jste řešení a můžete ho aplikovat v Čtvrtce (Modul 1).
              </p>
            </div>
          </div>
          
          <div className="flex flex-col-reverse sm:flex-row gap-3">
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
                <span className="hidden sm:inline">Pokračovat na další lekci →</span>
                <span className="sm:hidden">Další →</span>
              </Button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
