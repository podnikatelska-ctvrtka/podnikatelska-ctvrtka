import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export function TimelineTabs() {
  const [activeTab, setActiveTab] = useState("week1");
  
  const tabs = [
    { value: "week1", label: "Týdny 1-2", shortLabel: "T1-2", emoji: "🔍", color: "blue" },
    { value: "week3", label: "Týden 3", shortLabel: "T3", emoji: "⚡", color: "orange" },
    { value: "week4", label: "Týdny 4-5", shortLabel: "T4-5", emoji: "💻", color: "green" },
    { value: "week6", label: "Týden 6", shortLabel: "T6", emoji: "📱", color: "indigo" }
  ];

  const completedTabs = {
    "week1": ["week1"],
    "week3": ["week1", "week3"],
    "week4": ["week1", "week3", "week4"],
    "week6": ["week1", "week3", "week4", "week6"]
  };

  return (
    <Tabs defaultValue="week1" className="w-full" onValueChange={setActiveTab}>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
            initial={{ width: "25%" }}
            animate={{
              width: activeTab === "week1" ? "25%" :
                     activeTab === "week3" ? "50%" :
                     activeTab === "week4" ? "75%" : "100%"
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <TabsList className="grid w-full grid-cols-4 mb-6 gap-1 md:gap-2">
        {tabs.map((tab, index) => (
          <TabsTrigger 
            key={tab.value}
            value={tab.value} 
            className="text-xs md:text-sm relative group"
          >
            <div className="flex items-center gap-1">
              <span className="mr-1">{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
              
              {/* Completion check */}
              {completedTabs[activeTab]?.includes(tab.value) && activeTab !== tab.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <CheckCircle className="w-3 h-3 text-green-600 fill-green-100" />
                </motion.div>
              )}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* TÝDEN 1-2: Analýza a validace */}
      <TabsContent value="week1">
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 md:p-6 shadow-md border border-blue-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-3 md:gap-4 mb-5">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-2xl md:text-3xl">🔍</span>
            </div>
            
            <div className="flex-1">
              <div className="inline-flex items-center px-3 md:px-4 py-1.5 bg-blue-500 text-white rounded-full text-xs md:text-sm font-bold mb-3 shadow-sm">
                🔍 Týdny 1-2 • Průzkum
              </div>
              
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Analýza a rozhovory s lidmi kolem
              </h4>
              
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Marie začala pozorovat, kdo chodí do kavárny a hlavně - kdo nechodí. Všimla si, 
                že v obědové pauze je prázdno, přitom kolem jsou kanceláře.
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-5">
            <div className="bg-white/90 rounded-lg p-4 md:p-5 shadow-sm">
              <p className="text-gray-900 font-bold mb-4 text-base md:text-lg">Co konkrétně udělala:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-blue-600 text-xl md:text-2xl">👀</span>
                  <div>
                    <p className="text-gray-900 font-bold text-base md:text-lg mb-1">Pozorování zákazníků</p>
                    <p className="text-gray-700 text-sm md:text-base">Kdo přichází, kdy a co dělají? Kdo naopak chybí?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-blue-600 text-xl md:text-2xl">🗣️</span>
                  <div>
                    <p className="text-gray-900 font-bold text-base md:text-lg mb-1">Rozhovory s okolními firmami</p>
                    <p className="text-gray-700 text-sm md:text-base">"Kam chodíte na oběd? Co byste ocenili za obědovou nabídku?"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-blue-600 text-xl md:text-2xl">📋</span>
                  <div>
                    <p className="text-gray-900 font-bold text-base md:text-lg mb-1">Krátký dotazník pro stávající zákazníky</p>
                    <p className="text-gray-700 text-sm md:text-base">
                      Na stolech a poblíž výdeje leták s 3 otázkami + za vyplnění zdarma káva k příštímu nákupu. 
                      Získala 47 odpovědí za týden.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-gray-900 font-bold mb-3 text-base md:text-lg">Objevila 3 jasné segmenty:</p>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-sm">
                  <div className="text-2xl md:text-3xl mb-2">👨‍💻</div>
                  <p className="text-gray-900 font-bold text-sm md:text-base mb-1">Freelanceři</p>
                  <p className="text-gray-600 text-xs md:text-sm">WiFi + klid</p>
                </div>
                <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-sm">
                  <div className="text-2xl md:text-3xl mb-2">💼</div>
                  <p className="text-gray-900 font-bold text-sm md:text-base mb-1">Kancelářští pracovníci</p>
                  <p className="text-gray-600 text-xs md:text-sm">Rychlost + kvalita</p>
                </div>
                <div className="bg-white rounded-lg p-3 md:p-4 text-center shadow-sm">
                  <div className="text-2xl md:text-3xl mb-2">🌸</div>
                  <p className="text-gray-900 font-bold text-sm md:text-base mb-1">Odpočinek</p>
                  <p className="text-gray-600 text-xs md:text-sm">Atmosféra + pohoda</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl md:text-3xl mt-0.5">💡</span>
              <div>
                <p className="text-green-900 font-bold mb-2 text-base md:text-lg">Klíčový insight:</p>
                <p className="text-green-800 text-sm md:text-base leading-relaxed">
                  Každý segment má jiné potřeby a je ochoten platit za jejich naplnění. 
                  Marie už nemusela hádat - měla jasný plán.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </TabsContent>

      {/* TÝDEN 3: Nejrychlejší win */}
      <TabsContent value="week3">
        <motion.div
          className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-5 md:p-6 shadow-md border border-orange-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-3 md:gap-4 mb-5">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-orange-300">
              <span className="text-2xl md:text-3xl">🚀</span>
            </div>
            
            <div className="flex-1">
              <div className="inline-flex items-center px-3 md:px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-xs md:text-sm font-bold mb-3 shadow-sm">
                🚀 Týden 3 • Rychlý úspěch
              </div>
              
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Obědové menu pro firmy - spuštěno za 2 týdny
              </h4>
              
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                V obědové pauze byla kavárna prázdná, přitom poblíž byla jen jedna restaurace s omezenou nabídkou. 
                Čtvrtka Marii ukázala, kde hledat - zeptala se lidí z okolních kanceláří (snadno dosažitelný segment), 
                co by ocenili za oběd, a přesně to jim dala. Dvě mouchy jednou ranou: vyplnila mrtvý čas, získala 
                nový segment a nové tržby.
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-5">
            <div className="bg-white/90 rounded-lg p-4 md:p-5 shadow-sm">
              <p className="text-gray-900 font-bold mb-4 text-base md:text-lg">Konkrétní implementace:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-orange-600 text-xl md:text-2xl">💬</span>
                  <div>
                    <p className="text-gray-900 font-bold text-base md:text-lg mb-1">Online předobjednávky</p>
                    <p className="text-gray-700 text-sm md:text-base">Instagram + jednoduché menu s cenami</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-orange-600 text-xl md:text-2xl">📄</span>
                  <div>
                    <p className="text-gray-900 font-bold text-base md:text-lg mb-1">Místní marketing</p>
                    <p className="text-gray-700 text-sm md:text-base">Letáky do kanceláří + sušenka zdarma při 1. objednávce</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-orange-600 text-xl md:text-2xl">⏰</span>
                  <div>
                    <p className="text-gray-900 font-bold text-base md:text-lg mb-1">Garance včasnosti</p>
                    <p className="text-gray-700 text-sm md:text-base">Hotovo do 15 minut nebo káva zdarma</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-red-50 rounded-lg p-4 text-center shadow-sm">
                <div className="text-red-600 font-bold mb-2 text-sm md:text-base">❌ PŘED</div>
                <div className="text-3xl md:text-4xl font-bold text-red-700 mb-2">0%</div>
                <div className="text-red-600 text-sm md:text-base">Prázdno v poledne</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center shadow-sm">
                <div className="text-green-600 font-bold mb-2 text-sm md:text-base">✅ PO 2 TÝDNECH</div>
                <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">85%</div>
                <div className="text-green-600 text-sm md:text-base">+15k Kč/měsíc</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl md:text-3xl mt-0.5">💭</span>
              <div>
                <p className="text-green-900 font-bold mb-2 text-base md:text-lg">Marie vzpomíná:</p>
                <p className="text-green-800 text-sm md:text-base italic leading-relaxed">
                  "První týden přišlo 12 objednávek. Říkala jsem si, že to nemá smysl. Druhý týden už 45! 
                  Zákazníci se o nás bavili v okolních firmách."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </TabsContent>

      {/* TÝDEN 4-5: Freelance zóna */}
      <TabsContent value="week4">
        <motion.div
          className="bg-gradient-to-br from-green-50 to-white rounded-xl p-5 md:p-6 shadow-md border border-green-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-3 md:gap-4 mb-5">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-2xl md:text-3xl">💻</span>
            </div>
            
            <div className="flex-1">
              <div className="inline-flex items-center px-3 md:px-4 py-1.5 bg-green-500 text-white rounded-full text-xs md:text-sm font-bold mb-3 shadow-sm">
                💻 Týdny 4-5 • Stabilní příjem
              </div>
              
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Freelance zóna za 3.500,- Kč investice
              </h4>
              
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                S prvními výsledky z obědů měla Marie sebevědomí investovat do druhého segmentu. 
                Freelanceři potřebovali místo na práci - a v okolí jich bylo hodně.
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-5">
            <div className="bg-white/90 rounded-lg p-4 md:p-5 shadow-sm">
              <p className="text-gray-900 font-bold mb-4 text-base md:text-lg">Minimální investice, maximální efekt:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-green-600 text-xl md:text-2xl">📡</span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-bold text-base md:text-lg mb-1">Rychlejší WiFi + prodlužovačky</p>
                    <p className="text-gray-700 text-sm md:text-base">2.800,- Kč jednorázově</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-green-600 text-xl md:text-2xl">🎫</span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-bold text-base md:text-lg mb-1">Work Pass systém</p>
                    <p className="text-gray-700 text-sm md:text-base">Stabilní poplatek 180,- Kč za den práce</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-green-600 text-xl md:text-2xl">📢</span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-bold text-base md:text-lg mb-1">Marketing</p>
                    <p className="text-gray-700 text-sm md:text-base">700,- Kč - plakátky + Instagram na freelance komunity</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 md:p-5 shadow-sm">
              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-3">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">35+</div>
                  <div className="text-blue-700 text-sm md:text-base font-medium">Pravidelných</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">3-4h</div>
                  <div className="text-blue-700 text-sm md:text-base font-medium">Průměrný pobyt</div>
                </div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-900 font-bold text-base md:text-lg mb-1">180-280 Kč/návštěvu</p>
                <p className="text-blue-700 text-sm md:text-base">3-4× vyšší než klasický zákazník</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl md:text-3xl mt-0.5">💭</span>
              <div>
                <p className="text-green-900 font-bold mb-2 text-base md:text-lg">Co Marii překvapilo:</p>
                <p className="text-green-800 text-sm md:text-base italic leading-relaxed">
                  "Nečekala jsem, že freelancerů je v okolí tolik. Vraceli se každý den. 
                  Některé už znám jménem."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </TabsContent>

      {/* TÝDEN 6: Upsell strategie */}
      <TabsContent value="week6">
        <motion.div
          className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-5 md:p-6 shadow-md border border-indigo-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-3 md:gap-4 mb-5">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-2xl md:text-3xl">📱</span>
            </div>
            
            <div className="flex-1">
              <div className="inline-flex items-center px-3 md:px-4 py-1.5 bg-indigo-500 text-white rounded-full text-xs md:text-sm font-bold mb-3 shadow-sm">
                📱 Týden 6 • Marketing a růst
              </div>
              
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Marketing a viditelnost: +50% průměrná hodnota
              </h4>
              
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Marie začala dávat o sobě vědět a budovat lojalitu stávajících zákazníků. 
                Zaměřila se na jednoduché, ale účinné kroky.
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-5">
            <div className="bg-white/90 rounded-lg p-4 md:p-5 shadow-sm">
              <p className="text-gray-900 font-bold mb-4 text-base md:text-lg">Tři jednoduché kroky:</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-blue-600 text-xl md:text-2xl">🎃</span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-bold mb-1 text-base md:text-lg">Sezónní menu a speciály</p>
                    <p className="text-gray-700 text-sm md:text-base mb-1">
                      Halloween Pumpkin Latte, Vánoční Perníkový punch, Letní ledové čaje. 
                      Zákazníci je sdílí na Instagram, přivádějí přátele vyzkoušet novinky.
                    </p>
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">
                      +35% nových návštěv
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-blue-600 text-xl md:text-2xl">📸</span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-bold mb-1 text-base md:text-lg">Social media strategie</p>
                    <p className="text-gray-700 text-sm md:text-base mb-1">
                      Instagram a TikTok s novým menu, Stories s nabídkou dne, krátká videa ze 
                      zákulisí. Zaměření na mladé zákazníky.
                    </p>
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">
                      3× vyšší dosah
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-blue-600 text-xl md:text-2xl">🏆</span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-bold mb-1 text-base md:text-lg">Zapojení zákazníků</p>
                    <p className="text-gray-700 text-sm md:text-base mb-1">
                      "Vyfoť svůj drink a sdílej" soutěže, sleva za označení kavárny, 
                      nejlepší foto měsíce vyhrává kombo zdarma.
                    </p>
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">
                      82% účastníků sdílí
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 md:p-4">
              <div className="text-center mb-2">
                <div className="text-3xl md:text-4xl font-bold text-green-700 mb-1">+50%</div>
                <div className="text-green-700 font-medium text-sm md:text-base">Průměrná hodnota objednávky</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs md:text-sm">
                <div className="bg-white/70 rounded p-2">
                  <div className="font-bold text-gray-700">Před: 60 Kč</div>
                </div>
                <div className="bg-white/70 rounded p-2">
                  <div className="font-bold text-green-700">Po: 90 Kč</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-2xl md:text-3xl mt-0.5">💭</span>
              <div>
                <p className="text-green-900 font-bold mb-2 text-base md:text-lg">Co Marie překvapilo:</p>
                <p className="text-green-800 text-sm md:text-base italic leading-relaxed">
                  "Myslela jsem, že budu muset utrácet za reklamu. Stačilo dávat o sobě vědět 
                  a nabídnout zákazníkům důvod vrátit se. Sezónní menu se stalo naším tahákem."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}