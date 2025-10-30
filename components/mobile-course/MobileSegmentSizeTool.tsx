import { ExternalLink, TrendingUp, BarChart3, Globe, AlertCircle, CheckCircle, Menu } from "lucide-react";
import { haptic } from "../../lib/haptics";

interface MobileSegmentSizeToolProps {
  onOpenSidebar?: () => void;
}

export function MobileSegmentSizeTool({ onOpenSidebar }: MobileSegmentSizeToolProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white overflow-x-hidden">
      {/* Header with Menu Button */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          {onOpenSidebar && (
            <button
              onClick={() => {
                haptic('light');
                onOpenSidebar();
              }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5" />
              <h1 className="text-lg">Velikost segmentu</h1>
            </div>
            <p className="text-sm text-blue-100">
              Jak zjistit kolik lidí je v segmentu?
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {/* Quick Intro */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-4 text-white">
          <h2 className="mb-2 text-lg">Proč je to důležité?</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Abys mohl realisticky plánovat, potřebuješ vědět <strong>kolik lidí 
            je ve tvém cílovém segmentu</strong>. Bez toho můžeš snadno přecenit 
            své příležitosti.
          </p>
        </div>

        {/* Methods */}
        <div className="space-y-4">
          {/* Method 1: Meta Ads Manager */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-0.5">1. Meta Ads Manager</h3>
                <p className="text-xs text-green-600">🏆 NEJRYCHLEJŠÍ</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="text-blue-900 mb-1.5 text-sm">Co to je?</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Nástroj v Facebook Ads Manageru, který ti ukáže <strong>přesný počet lidí</strong> podle 
                  věku, lokality, zájmů. <strong>Zdarma</strong> s FB účtem!
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-gray-900 mb-2 text-sm">📋 Jak na to:</h4>
                <ol className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">1.</span>
                    <span>Jdi na <strong>ads.facebook.com</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">2.</span>
                    <span>Vytvoř "novou kampaň" (nemusíš spustit!)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">3.</span>
                    <span>Při definování publika zadej:</span>
                  </li>
                  <li className="ml-4 space-y-0.5">
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><strong>Lokalita:</strong> např. Praha</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><strong>Věk:</strong> např. 25-35 let</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><strong>Zájmy:</strong> např. "Mateřství"</span>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 flex-shrink-0">4.</span>
                    <span>Vpravo nahoře: <strong className="text-green-600">"Dosah: 25.000 lidí"</strong> ✅</span>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-green-900 mb-1.5 text-sm">Výhody:</h4>
                    <ul className="space-y-0.5 text-xs text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Přesné číslo v reálném čase</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Zdarma (stačí FB účet)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Kombinace kritérií (věk + lokalita + zájmy)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Funguje lokálně i online</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <a
                href="https://ads.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic('light')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm active:scale-95"
              >
                Otevřít Meta Ads Manager
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Method 2: ČSÚ */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-0.5">2. ČSÚ</h3>
                <p className="text-xs text-blue-600">📊 OFICIÁLNÍ DATA</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <h4 className="text-purple-900 mb-1.5 text-sm">Co to je?</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Oficiální statistiky o obyvatelstvu ČR. Spolehlivé, ale méně detailní 
                  (nemá data o zájmech).
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-gray-900 mb-2 text-sm">📋 Jak na to:</h4>
                <ol className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-purple-600 flex-shrink-0">1.</span>
                    <span>Jdi na <strong>Veřejná databáze ČSÚ</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 flex-shrink-0">2.</span>
                    <span>Vyber <strong>"Vyhledávací díl"</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 flex-shrink-0">3.</span>
                    <span>Zadej kategorii a věkovou skupinu</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 flex-shrink-0">4.</span>
                    <span>Příklad: <strong>"Ženy 25-34 Praha = 85.000"</strong></span>
                  </li>
                </ol>
              </div>

              <a
                href="https://vdb.czso.cz/vdbvo2/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic('light')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm active:scale-95"
              >
                Otevřít ČSÚ
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Method 3: Google Keyword Planner */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-0.5">3. Google Keyword Planner</h3>
                <p className="text-xs text-green-600">🔍 PRO ONLINE</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="text-green-900 mb-1.5 text-sm">Co to je?</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Nástroj Google Ads, který ukáže <strong>kolik lidí měsíčně hledá</strong> tvoje 
                  klíčová slova. <strong>Zdarma</strong> s Google Ads účtem!
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-gray-900 mb-2 text-sm">📋 Jak na to:</h4>
                <ol className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">1.</span>
                    <span>Jdi na <strong>ads.google.com</strong> → Plánovač</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">2.</span>
                    <span>Zadej klíčové slovo</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">3.</span>
                    <span>Vyber lokalitu: <strong>Česká republika</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">4.</span>
                    <span>Uvidíš: <strong className="text-green-600">"Vyhledávání: 2.400"</strong></span>
                  </li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-gray-700">
                  <strong>💡 Tip:</strong> Pokud má slovo 1.000+ vyhledávání/měsíc, 
                  je tam minimálně <strong>10.000-20.000 potenciálních zákazníků</strong>.
                </p>
              </div>

              <a
                href="https://ads.google.com/intl/cs_cz/home/tools/keyword-planner/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic('light')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm active:scale-95"
              >
                Otevřít Keyword Planner
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Method 4: Google Trends */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-0.5">4. Google Trends + Odhad</h3>
                <p className="text-xs text-orange-600">📈 KOMBINOVANÝ</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <h4 className="text-orange-900 mb-1.5 text-sm">Kdy použít?</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Když potřebuješ zjistit zájem o téma a odhadnout velikost trhu.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-gray-900 mb-2 text-sm">📋 Příklad výpočtu:</h4>
                <div className="space-y-1.5 text-xs text-gray-700">
                  <p>
                    <strong>1. Google Trends:</strong> Rostoucí zájem +30% YoY
                  </p>
                  <p>
                    <strong>2. ČSÚ:</strong> Živnostníci v ČR = 1.2M
                  </p>
                  <p>
                    <strong>3. Odhad:</strong> 1.2M × 5% = <strong className="text-green-600">60.000 zákazníků</strong>
                  </p>
                </div>
              </div>

              <a
                href="https://trends.google.com/trends/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic('light')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm active:scale-95"
              >
                Otevřít Google Trends
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Fallback Values */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-yellow-900 mb-2 text-sm">📊 Nemáš data? Konzervativní odhad:</h3>
              
              <div className="space-y-2 text-xs text-gray-700">
                <div className="bg-white rounded-lg p-2 border border-yellow-200">
                  <p className="text-gray-900 mb-0.5">Malý lokální byznys</p>
                  <p className="text-gray-600">Kavárna, kadeřnictví → <strong>1.000-5.000</strong></p>
                </div>
                
                <div className="bg-white rounded-lg p-2 border border-yellow-200">
                  <p className="text-gray-900 mb-0.5">Online byznys (niche)</p>
                  <p className="text-gray-600">Kurzy, koučink → <strong>10.000-30.000</strong></p>
                </div>
                
                <div className="bg-white rounded-lg p-2 border border-yellow-200">
                  <p className="text-gray-900 mb-0.5">Masový trh ČR</p>
                  <p className="text-gray-600">E-commerce → <strong>100.000+</strong></p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-2 mt-3">
                <p className="text-xs text-gray-700">
                  <strong className="text-red-900">⚠️ RADĚJI PODCEŇ!</strong><br />
                  Počítej s <strong>POLOVINOU</strong> toho, co odhaduješ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Calculation */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-blue-900 mb-2 text-sm">🎯 Zpětný výpočet</h3>
          <p className="text-xs text-gray-700 mb-2">
            Nezapomeň si spočítat kolik zákazníků <strong>potřebuješ</strong>.
            Použij nástroj <strong>"Kalkulačka zákazníků"</strong>.
          </p>
          <div className="bg-white rounded-lg p-2 border border-blue-200">
            <p className="text-xs text-gray-700">
              <strong>Příklad:</strong> Chci 50.000 Kč/měsíc, produkt 500 Kč<br />
              → Potřebuji <strong>100 zákazníků/měsíc</strong><br />
              → Při CR 2% musím oslovit <strong>5.000 lidí</strong><br />
              → <strong className="text-green-600">Je to v mém segmentu? ✓</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
