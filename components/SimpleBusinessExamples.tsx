import { CheckCircle2, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  onComplete?: () => void;
  onNavigateNext?: () => void;
}

const EXAMPLES = [
  {
    category: "☕ Kavárna",
    versions: [
      {
        id: "cafe-a",
        versionLabel: "Workspace",
        emoji: "☕",
        title: "Kavárna jako workspace",
        segment: "Freelanceři + Studenti",
        tip: "Nabídněte WiFi a velký prostor se stoly → zákazníci zůstanou celý den",
        result: "3x víc tržeb z kávy (průměr 3 kávy za návštěvu vs. 1 káva)",
        revenue: "Káva (60%) + Jídlo (30%) + Dezerty (10%)",
        keySuccess: "Velký prostor = dlouhé návštěvy = víc tržeb",
        color: "blue"
      },
      {
        id: "cafe-b",
        versionLabel: "Rychlá kavárna",
        emoji: "☕",
        title: "Rychlá kavárna to-go",
        segment: "Ranní dojíždějící + Office workers",
        tip: "Umístění na rušné křižovatce + mobilní objednávka",
        result: "200+ káv denně, 80% to-go (vysoká rotace)",
        revenue: "Káva to-go (50%) + Express obědy (40%) + Dezerty (10%)",
        keySuccess: "Rychlost + lokace = vysoký objem prodeje",
        color: "blue"
      },
      {
        id: "cafe-c",
        versionLabel: "Drive-thru",
        emoji: "☕",
        title: "Drive-thru kavárna",
        segment: "Rodiče na školních svozech + Pendleři",
        tip: "Žádná čekárna = minimální nájem, maximální průtok aut",
        result: "300+ objednávek denně, 95% drive-thru (ultra rychlý průtok)",
        revenue: "Káva (55%) + Bakery (35%) + Kids menu (10%)",
        keySuccess: "Žádná obsluha uvnitř = nízké náklady, vysoký objem",
        color: "blue"
      },
      {
        id: "cafe-d",
        versionLabel: "Specialty",
        emoji: "☕",
        title: "Specialty coffee shop",
        segment: "Coffee geeks + Hipsteři",
        tip: "Micro-batch káva z jediného původu + barista show",
        result: "Káva za 150-200 Kč (2x vyšší cena než standard)",
        revenue: "Premium káva (80%) + Merch (15%) + Workshopy (5%)",
        keySuccess: "Exkluzivita + eduakce = premium ceny bez problémů",
        color: "blue"
      }
    ]
  },
  {
    category: "🍕 Pizzerie",
    versions: [
      {
        id: "pizza-a",
        versionLabel: "S rozvozem",
        emoji: "🍕",
        title: "Pizzerie s rozvozem",
        segment: "Rodiny + Studenti v kolejích",
        tip: "20% sleva při osobním odběru → snížíte náklady na rozvoz",
        result: "40% zákazníků si vybere odběr = vyšší marže",
        revenue: "Pizza (70%) + Nápoje (20%) + Přílohy (10%)",
        keySuccess: "Sleva na odběr = víc objednávek s vyšší marží",
        color: "pink"
      },
      {
        id: "pizza-b",
        versionLabel: "Různá a rozmanitá",
        emoji: "🍕",
        title: "Prémiová řemeslná pizza",
        segment: "Foodie + Mladí profesionálové",
        tip: "Specialty ingredience + limitované edice → vyšší cena",
        result: "50% vyšší průměrná cena pizzy (350 Kč vs 230 Kč)",
        revenue: "Pizza (60%) + Craft pivo (25%) + Dezerty (15%)",
        keySuccess: "Prémiové ingredience = vyšší marže + loajalita",
        color: "pink"
      }
    ]
  },
  {
    category: "🏋️ Fitness",
    versions: [
      {
        id: "fitness-a",
        versionLabel: "PT focus",
        emoji: "🏋️",
        title: "Fitness centrum s PT",
        segment: "Začátečníci + Pokročilí",
        tip: "Personal training jako premium produkt → 10x vyšší cena než běžné členství",
        result: "Jen 20% členů bere PT, ale generuje 50% zisku",
        revenue: "Členství (50%) + PT (40%) + Smoothie bar (10%)",
        keySuccess: "Premium služby = menší objem, vyšší marže",
        color: "green"
      },
      {
        id: "fitness-b",
        versionLabel: "24/7 Low-cost",
        emoji: "🏋️",
        title: "24/7 Samoobslužné fitness",
        segment: "Cenově citliví + Flexibilní pracovní doba",
        tip: "Automatizace + nonstop provoz → nízké náklady na mzdy",
        result: "3x více členů, 70% nižší náklady na provoz",
        revenue: "Členství Basic (70%) + Premium (20%) + Doplňky (10%)",
        keySuccess: "Automatizace = škálovatelnost bez růstu nákladů",
        color: "green"
      }
    ]
  }
];

export function SimpleBusinessExamples({ onComplete, onNavigateNext }: Props) {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mb-2">
          💡 Příklady úspěšných modelů
        </h2>
        <p className="text-sm sm:text-base text-purple-700">
          Jak ostatní podnikatelé používají Model podnikání pro růst byznysu
        </p>
      </div>

      {/* Tip Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded">
        <p className="text-xs sm:text-sm text-blue-900">
          <strong>🎯 Váš úkol:</strong> Projděte si příklady a porovnejte RŮZNÉ strategie pro stejný byznys. 
          Každý model funguje jinak!
        </p>
      </div>

      {/* Examples with Tabs */}
      <div className="space-y-6">
        {EXAMPLES.map((category) => (
          <div key={category.category} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
            {/* Category Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                {category.category}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Porovnejte 2 různé strategie →
              </p>
            </div>

            {/* Tabs for versions - Adaptivní pro 2-3 nebo 4+ verzí */}
            <div className="p-4">
              <Tabs defaultValue={category.versions[0].id}>
                {/* 💡 SMART LAYOUT: 2-3 verze = grid, 4+ verze = horizontal scroll */}
                <div 
                  className={category.versions.length <= 3 ? "" : "overflow-x-auto pb-2 -mx-4 px-4"}
                  style={category.versions.length > 3 ? { touchAction: 'pan-x' } : undefined}
                  onTouchStart={(e) => {
                    // STOP propagace swipe gesta - aby SwipeLessonNavigation nepřepnula lekci!
                    if (category.versions.length > 3) {
                      e.stopPropagation();
                    }
                  }}
                  onTouchMove={(e) => {
                    if (category.versions.length > 3) {
                      e.stopPropagation();
                    }
                  }}
                >
                  <TabsList className={`bg-gray-100 rounded-lg mb-4 ${
                    category.versions.length === 2 
                      ? "grid w-full grid-cols-2 p-1 sm:p-1.5" 
                      : category.versions.length === 3
                      ? "grid w-full grid-cols-3 p-1 sm:p-1.5"
                      : "inline-flex w-auto p-0.5 sm:p-1"
                  }`}>
                    {category.versions.map((version) => (
                      <TabsTrigger
                        key={version.id}
                        value={version.id}
                        className="!gap-1 sm:!gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-bold !text-xs sm:!text-sm !py-2 sm:!py-3 !px-2 sm:!px-4 whitespace-nowrap"
                      >
                        {version.versionLabel}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {category.versions.map((example) => (
                  <TabsContent key={example.id} value={example.id} className="space-y-3">
                    {/* Example Card Content */}
                    <div
                      onClick={() => setSelectedExample(selectedExample === example.id ? null : example.id)}
                      className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                        selectedExample === example.id 
                          ? 'border-purple-400 shadow-lg' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className={category.versions.length > 3 ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}>{example.emoji}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base">{example.title}</h4>
                          <p className="text-xs text-gray-600">{example.segment}</p>
                        </div>
                      </div>

                      {/* Quick Tip */}
                      <div className={`bg-blue-50 border border-blue-200 rounded-lg mb-2 ${
                        category.versions.length > 3 ? "p-2" : "p-2 sm:p-3"
                      }`}>
                        <p className="text-xs sm:text-sm text-blue-900">
                          <strong>💡 Klíčový tip:</strong> {example.tip}
                        </p>
                      </div>

                      {/* Result */}
                      <div className={`bg-green-50 border border-green-200 rounded-lg mb-2 sm:mb-3 ${
                        category.versions.length > 3 ? "p-2" : "p-2 sm:p-3"
                      }`}>
                        <p className="text-xs sm:text-sm text-green-900">
                          <strong>📈 Výsledek:</strong> {example.result}
                        </p>
                      </div>

                      {/* Detail (collapsible) */}
                      {selectedExample === example.id && (
                        <div className="space-y-2 mt-3 pt-3 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="text-xs sm:text-sm">
                            <strong className="text-gray-700">💰 Zdroje příjmů:</strong>
                            <p className="text-gray-600 mt-1">{example.revenue}</p>
                          </div>
                          <div className="text-xs sm:text-sm">
                            <strong className="text-gray-700">🔑 Proč to funguje:</strong>
                            <p className="text-gray-600 mt-1">{example.keySuccess}</p>
                          </div>
                        </div>
                      )}

                      {/* Expand hint */}
                      {selectedExample !== example.id && (
                        <p className="text-center text-xs text-gray-400 mt-2">
                          Klikni pro detail →
                        </p>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-xl p-4 sm:p-6">
        <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2 text-base sm:text-lg">
          <TrendingUp className="w-5 h-5" />
          🎯 Co mají společného?
        </h3>
        
        <div className="space-y-2 sm:space-y-3">
          <div className="flex gap-2 sm:gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="text-gray-900">Segmentace:</strong>
              <span className="text-gray-700"> Každý zná PŘESNĚ své zákazníky</span>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="text-gray-900">Různé strategie:</strong>
              <span className="text-gray-700"> Stejný byznys lze udělat 10 různými způsoby!</span>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="text-gray-900">Optimalizace nákladů:</strong>
              <span className="text-gray-700"> Hledají způsoby jak snížit náklady (automatizace, odběr vs. rozvoz)</span>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="text-gray-900">Víc zdrojů příjmů:</strong>
              <span className="text-gray-700"> Neprodávají jen 1 věc (káva + jídlo + dezerty)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Box */}
      <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 sm:p-6">
        <h3 className="font-bold text-purple-900 mb-2 text-base sm:text-lg">
          ✅ Jak to aplikovat ve vašem byznysu?
        </h3>
        <div className="space-y-2 text-xs sm:text-sm text-purple-800">
          <p>
            <strong>1. Inspirace:</strong> Zkuste promyslet 2 RŮZNÉ strategie pro váš byznys
          </p>
          <p>
            <strong>2. Premium vs Low-cost:</strong> Můžete jít cestou kvality NEBO objemu
          </p>
          <p>
            <strong>3. Více zdrojů:</strong> Přidejte komplementární produkty/služby
          </p>
          <p>
            <strong>4. Testování:</strong> Vyzkoušejte obě strategie a zjistěte co funguje lépe
          </p>
        </div>
      </div>

      {/* Completion */}
      {!isCompleted ? (
        <div className="flex justify-center">
          <Button
            onClick={handleComplete}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <span className="hidden sm:inline">✅ Hotovo - pokračovat dál</span>
            <span className="sm:hidden">✅ Hotovo</span>
          </Button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex items-start gap-4 mb-4 sm:mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg sm:text-2xl font-bold mb-2">
                ✅ Lekce dokončena!
              </h4>
              <p className="text-green-50 text-sm sm:text-lg">
                Skvělá práce! Prozkoumali jste příklady úspěšných modelů.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setIsCompleted(false)}
              variant="outline"
              size="lg"
              className="flex-1 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-sm sm:text-base"
            >
              🔄 Zkusit znovu
            </Button>
            {onNavigateNext && (
              <Button
                onClick={onNavigateNext}
                size="lg"
                className="flex-1 bg-white text-green-600 hover:bg-green-50 text-sm sm:text-base"
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
