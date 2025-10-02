import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Circle, Lightbulb, TrendingUp, Zap, Target, Award, ArrowLeft, Printer } from 'lucide-react';

interface ChecklistItem {
  id: string;
  number: number;
  title: string;
  description: string;
  tip?: string;
  inputPlaceholder?: string;
  subItems?: string[];
}

const checklistData: { section: string; icon: any; items: ChecklistItem[] }[] = [
  {
    section: "📝 Mentální příprava",
    icon: Lightbulb,
    items: [
      {
        id: "mental-1",
        number: 1,
        title: 'Definujte své "PROČ"',
        description: "Proč vlastně podnikáte? Co je váš skutečný důvod?",
        inputPlaceholder: "Zapište své PROČ...",
        tip: "Nejlepší podnikatelé vědí své PROČ. To jim pomáhá v těžkých časech. Buďte upřímní - může to být 'finanční svoboda', 'pomáhat lidem', nebo 'nezávislost'."
      },
      {
        id: "mental-2",
        number: 2,
        title: "Identifikujte hlavní problém",
        description: "Co je #1 problém ve vašem byznysu TEĎKA?",
        subItems: [
          "Nedostatek zákazníků",
          "Nízké marže/zisky",
          "Špatné zacílení",
          "Nejasná hodnota",
          "Chaos a neorganizace",
          "Jiný problém"
        ],
        tip: "Buďte specifičtí! Místo 'málo zákazníků' řekněte 'dostávám 2 objednávky týdně místo 10'. Čísla pomáhají měřit pokrok."
      },
      {
        id: "mental-3",
        number: 3,
        title: "Nastavte cíl",
        description: "Co chcete změnit za 90 dní po kurzu?",
        inputPlaceholder: "Můj cíl je...",
        tip: "Dobrý cíl je SMART: Specific, Measurable, Achievable, Relevant, Time-bound. Example: 'Zvýšit tržby z 60k na 90k měsíčně do 90 dní'"
      },
      {
        id: "mental-4",
        number: 4,
        title: "Otevřená mysl",
        description: "Kurz vám může ukázat, že děláte věci špatně. To je DOBŘE!",
        tip: "Ego = nepřítel učení. Ti nejúspěšnější podnikatelé jsou ti, kdo umí přiznat 'tohle jsem dělal špatně' a změnit to."
      }
    ]
  },
  {
    section: "🎯 Fyzická příprava",
    icon: Target,
    items: [
      {
        id: "physical-1",
        number: 5,
        title: "Připravte materiály",
        description: "Co budete potřebovat během kurzu",
        subItems: [
          "Čtvrtka A4 papíru (nebo prázdný list)",
          "Propiska nebo tužka",
          "Poznámkový blok",
          "Tiskárna (volitelné)"
        ],
        tip: "Analogové psaní = lepší zapamatování! Mozek si víc pamatuje když píšete rukou než když píšete na PC."
      },
      {
        id: "physical-2",
        number: 6,
        title: "Zajistěte klid",
        description: "90 minut bez rušení",
        subItems: [
          "90 minut volného času (ideálně víkend)",
          "Klidné místo bez rušení",
          "Vypnuté notifikace na telefonu",
          "Řekněte rodině: 'Potřebuji hodinu klidu'"
        ],
        tip: "Ideální čas: Sobotní dopoledne (9-11h). Jste svěží, nikdo vás neruší, máte celý den na implementaci."
      },
      {
        id: "physical-3",
        number: 7,
        title: "Připravte data o byznysu",
        description: "Pomůže vám mít po ruce základní čísla",
        subItems: [
          "Aktuální počet zákazníků",
          "Měsíční tržby/příjmy",
          "Hlavní náklady",
          "Co prodáváte/nabízíte",
          "Konkurence (3-5 jmen)"
        ],
        tip: "Nemusíte mít přesná čísla. Odhady stačí! Jde o to mít kontext, ne accounting."
      }
    ]
  },
  {
    section: "💡 Strategická příprava",
    icon: Zap,
    items: [
      {
        id: "strategic-1",
        number: 8,
        title: "Self-Assessment",
        description: "Odpovězte si ANO/NE na těchto 5 otázek",
        subItems: [
          "Vím přesně, kdo je můj ideální zákazník?",
          "Umím jasně říct, proč si mě má vybrat?",
          "Mám jasný plán, jak získat zákazníky?",
          "Vím, kde mě najdou moji zákazníci?",
          "Chápu, co dělám jinak než konkurence?"
        ],
        tip: "Pokud máte 2+ NE, Čtvrtka je přesně pro vás! To je normální - většina podnikatelů má stejné problémy."
      },
      {
        id: "strategic-2",
        number: 9,
        title: "Připravte se na akci",
        description: "Po kurzu budete vědět CO dělat. Připravte si čas.",
        subItems: [
          "Den 1: Immediate changes (1-2 hod)",
          "Týden 1: Quick wins (3-5 hod)",
          "Měsíc 1: Major changes (10-20 hod)"
        ],
        tip: "Největší chyba: Absolvovat kurz a pak... nic. Nejlepší výsledky mají ti, kdo implementují OKAMŽITĚ."
      },
      {
        id: "strategic-3",
        number: 10,
        title: "Commitment",
        description: "Slibte si: Budu DĚLAT, ne jen sledovat",
        tip: "Aktivní vs pasivní učení: Aktivní (vyplňuji během kurzu) = 10x lepší výsledky než pasivní (jen sleduji)."
      }
    ]
  }
];

export function PreparationChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});
  const [showTips, setShowTips] = useState<Set<string>>(new Set());

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pvs_checklist_progress');
    if (saved) {
      const { checked, inputs } = JSON.parse(saved);
      setCheckedItems(new Set(checked));
      setTextInputs(inputs);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('pvs_checklist_progress', JSON.stringify({
      checked: Array.from(checkedItems),
      inputs: textInputs
    }));
  }, [checkedItems, textInputs]);

  const toggleItem = (id: string) => {
    const newSet = new Set(checkedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCheckedItems(newSet);
  };

  const toggleTip = (id: string) => {
    const newSet = new Set(showTips);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setShowTips(newSet);
  };

  const updateInput = (id: string, value: string) => {
    setTextInputs({ ...textInputs, [id]: value });
  };

  const totalItems = checklistData.reduce((sum, section) => sum + section.items.length, 0);
  const completedItems = checkedItems.size;
  const progress = Math.round((completedItems / totalItems) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 md:py-16 print:bg-white">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12 print:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 print:hidden">
            <Award className="w-4 h-4" />
            <span>Exkluzivní příprava pro průkopníky</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            🎯 10 věcí před kurzem
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Připravte se na kurz Podnikatelská Čtvrtka jako profesionál
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-4 print:hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Váš pokrok</span>
              <span className="text-sm font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {completedItems} z {totalItems} hotovo
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center print:hidden">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět na stránku
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              <Printer className="w-4 h-4" />
              Vytisknout
            </button>
          </div>
        </motion.div>

        {/* Completion Message */}
        <AnimatePresence>
          {progress === 100 && (
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 mb-8 shadow-xl print:hidden"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Skvělá práce! 🎉</h3>
              </div>
              <p className="text-green-50 text-lg mb-4">
                Dokončili jste všechny přípravy! Jste připraveni na kurz lépe než 90% lidí.
              </p>
              <a 
                href="/#order"
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors"
              >
                Vrátit se na registraci →
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checklist Sections */}
        <div className="space-y-8">
          {checklistData.map((section, sectionIndex) => (
            <motion.div
              key={section.section}
              className="bg-white rounded-2xl shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <section.icon className="w-6 h-6 md:w-7 md:h-7" />
                  <h2 className="text-xl md:text-2xl font-bold">{section.section}</h2>
                </div>
              </div>

              {/* Items */}
              <div className="p-4 md:p-6 space-y-6">
                {section.items.map((item) => {
                  const isChecked = checkedItems.has(item.id);
                  const showTip = showTips.has(item.id);

                  return (
                    <motion.div
                      key={item.id}
                      className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl p-4 md:p-5 print:border-l-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      {/* Item Header */}
                      <div className="flex items-start gap-3 mb-3">
                        {/* Checkbox */}
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all print:hidden"
                          style={{
                            backgroundColor: isChecked ? '#3b82f6' : 'white',
                            borderColor: isChecked ? '#3b82f6' : '#cbd5e1'
                          }}
                        >
                          {isChecked && <CheckCircle className="w-5 h-5 text-white" />}
                          {!isChecked && <Circle className="w-5 h-5 text-gray-400" />}
                        </button>

                        {/* Number Badge */}
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {item.number}
                        </div>

                        {/* Title & Description */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-gray-900 mb-1 text-base md:text-lg ${isChecked ? 'line-through opacity-70' : ''}`}>
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Input Field */}
                      {item.inputPlaceholder && (
                        <div className="mt-3 print:mt-2">
                          <input
                            type="text"
                            placeholder={item.inputPlaceholder}
                            value={textInputs[item.id] || ''}
                            onChange={(e) => updateInput(item.id, e.target.value)}
                            className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-gray-900 placeholder:text-gray-400 print:py-2"
                          />
                        </div>
                      )}

                      {/* Sub-items (checkboxes) */}
                      {item.subItems && (
                        <div className="mt-3 space-y-2 pl-11">
                          {item.subItems.map((subItem, idx) => (
                            <label key={idx} className="flex items-center gap-2 text-sm md:text-base text-gray-700 cursor-pointer group print:cursor-default">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 print:hidden"
                              />
                              <span className="group-hover:text-gray-900 print:before:content-['☐_']">
                                {subItem}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {/* Tip Toggle & Content */}
                      {item.tip && (
                        <div className="mt-3 print:mt-2">
                          <button
                            onClick={() => toggleTip(item.id)}
                            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors print:hidden"
                          >
                            <Lightbulb className="w-4 h-4" />
                            {showTip ? 'Skrýt tip' : 'Zobrazit tip'}
                          </button>

                          <AnimatePresence>
                            {(showTip || window.matchMedia('print').matches) && (
                              <motion.div
                                className="mt-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg print:mt-2 print:p-3"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                              >
                                <div className="flex items-start gap-2">
                                  <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                  <p className="text-sm text-gray-700 leading-relaxed">
                                    <strong className="text-yellow-800">💡 Tip:</strong> {item.tip}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bonus Tips */}
        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 md:p-8 mt-8 print:border print:border-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">✅ Bonus tipy</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-green-200">
              <h4 className="font-bold text-gray-900 mb-2">🎯 Během kurzu:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Pozastavte když potřebujete čas</li>
                <li>• Pište si poznámky (fyzicky!)</li>
                <li>• Vyplňujte Čtvrtku BĚHEM sledování</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <h4 className="font-bold text-gray-900 mb-2">🚀 Po kurzu:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Implementujte první 3 věci HNED</li>
                <li>• Do týdne zaveďte 1 změnu</li>
                <li>• Za měsíc změřte výsledky</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-12 mb-8 space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <a href="mailto:info@podnikatelskatvrtka.cz" className="hover:text-blue-600 transition-colors">
              📧 info@podnikatelskatvrtka.cz
            </a>
            <a href="/" className="hover:text-blue-600 transition-colors">
              🌐 Zpět na web
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © 2025 Podnikatelská Čtvrtka | Všechna práva vyhrazena
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { 
            background: white !important; 
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border {
            border: 1px solid #e5e7eb !important;
          }
          @page {
            margin: 1.5cm;
          }
        }
      `}</style>
    </div>
  );
}