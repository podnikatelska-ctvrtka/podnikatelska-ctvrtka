import { ExternalLink, TrendingUp, BarChart3, Globe, AlertCircle, CheckCircle } from "lucide-react";

export function SegmentSizeTool() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-gray-900 mb-2">🎯 Jak zjistit velikost segmentu?</h1>
          <p className="text-gray-600">
            Praktický návod jak zjistit kolik lidí je v tvém cílovém segmentu (rok 2025)
          </p>
        </div>

        {/* Quick Intro */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white mb-6">
          <h2 className="mb-3">Proč je to důležité?</h2>
          <p className="text-blue-100 leading-relaxed">
            Abys mohl realisticky plánovat svůj byznys, potřebuješ vědět <strong>kolik lidí 
            je ve tvém cílovém segmentu</strong>. Bez této informace můžeš snadno přecenit 
            nebo podecenit své příležitosti.
          </p>
        </div>

        {/* Methods */}
        <div className="space-y-6">
          {/* Method 1: Meta Ads Manager */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">1. Meta Ads Manager (Facebook/Instagram)</h3>
                <p className="text-sm text-green-600 font-medium">🏆 NEJRYCHLEJŠÍ A NEJPŘESNĚJŠÍ</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-900 font-semibold mb-2">Co to je?</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Nástroj v Facebook Ads Manageru (rok 2025), který ti ukáže <strong>přesný počet lidí</strong> podle 
                  věku, lokality, zájmů a chování. <strong>Zdarma</strong> s Facebook Business účtem 
                  (nepotřebuješ platit za reklamy!).
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-gray-900 font-semibold mb-3">📋 Jak na to (5 minut):</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                    <span>Jdi na <strong>ads.facebook.com</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                    <span>Vytvoř "novou kampaň" (nemusíš ji spustit!)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                    <span>Při definování publika zadej:</span>
                  </li>
                  <li className="ml-6 space-y-1">
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><strong>Lokalita:</strong> např. Praha, Česká republika</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><strong>Věk:</strong> např. 25-35 let</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><strong>Zájmy:</strong> např. "Mateřství", "Online kurzy"</span>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
                    <span>Vpravo nahoře uvidíš: <strong className="text-green-600">"Potenciální dosah: 25.000 lidí"</strong> ✅</span>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-green-900 font-semibold mb-2">Výhody:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
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
                        <span>Kombinace více kritérií (věk + lokalita + zájmy)</span>
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Otevřít Meta Ads Manager
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Method 2: ČSÚ */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">2. ČSÚ (Český statistický úřad)</h3>
                <p className="text-sm text-blue-600 font-medium">📊 OFICIÁLNÍ DEMOGRAFICKÁ DATA</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="text-purple-900 font-semibold mb-2">Co to je?</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Oficiální statistiky o obyvatelstvu ČR. Spolehlivé, ale méně detailní než Meta Ads 
                  (nemá data o zájmech nebo chování).
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-gray-900 font-semibold mb-3">📋 Jak na to:</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600 flex-shrink-0">1.</span>
                    <span>Jdi na <strong>czso.cz</strong> → Obyvatelstvo → Věkové složení</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600 flex-shrink-0">2.</span>
                    <span>Vyber kraj/okres a věkovou kategorii v tabulkách</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600 flex-shrink-0">3.</span>
                    <span>Nebo použij <strong>"Vyhledávání dat"</strong> pro vlastní filtr</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600 flex-shrink-0">4.</span>
                    <span>Příklad: <strong>"Ženy 25-34 let v Praze = cca 85.000"</strong></span>
                  </li>
                </ol>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://www.czso.cz/csu/czso/obyvatelstvo_hu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Otevřít ČSÚ - Obyvatelstvo
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Method 3: Google Keyword Planner */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">3. Google Keyword Planner</h3>
                <p className="text-sm text-green-600 font-medium">🔍 PRO ONLINE BYZNYSY</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-green-900 font-semibold mb-2">Co to je?</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Nástroj Google Ads, který ti ukáže <strong>kolik lidí měsíčně hledá</strong> tvoje klíčová slova. 
                  Zdarma s Google Ads účtem (nepotřebuješ platit!).
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-gray-900 font-semibold mb-3">📋 Jak na to:</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-green-600 flex-shrink-0">1.</span>
                    <span>Jdi na <strong>ads.google.com</strong> → Nástroje → Plánovač klíčových slov</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-green-600 flex-shrink-0">2.</span>
                    <span>Zadej své klíčové slovo, např. <strong>"online kurz podnikání"</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-green-600 flex-shrink-0">3.</span>
                    <span>Vyber lokalitu: <strong>Česká republika</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-green-600 flex-shrink-0">4.</span>
                    <span>Uvidíš: <strong className="text-green-600">"Měsíční vyhledávání: 2.400"</strong> ✅</span>
                  </li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>💡 Tip:</strong> Pokud má tvoje klíčové slovo 1.000+ vyhledávání/měsíc, 
                  je tam minimálně <strong>10.000-20.000 potenciálních zákazníků</strong> (10-20x více než vyhledává).
                </p>
              </div>

              <a
                href="https://ads.google.com/intl/cs_cz/home/tools/keyword-planner/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Otevřít Keyword Planner
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Method 4: Google Trends + Estimation */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">4. Google Trends + Odhad</h3>
                <p className="text-sm text-orange-600 font-medium">📈 KOMBINOVANÝ PŘÍSTUP</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="text-orange-900 font-semibold mb-2">Kdy použít?</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Když potřebuješ zjistit zájem o téma a odhadnout velikost trhu kombinací více zdrojů.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-gray-900 font-semibold mb-3">📋 Příklad výpočtu:</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>1. Google Trends:</strong> "online kurzy pro podnikatele"<br />
                    → Trend: Rostoucí zájem +30% YoY
                  </p>
                  <p>
                    <strong>2. ČSÚ:</strong> Živnostníci v ČR = 1.2M
                  </p>
                  <p>
                    <strong>3. Odhad:</strong> 1.2M × 5% (early adopters) = <strong className="text-green-600">60.000 potenciálních zákazníků</strong>
                  </p>
                </div>
              </div>

              <a
                href="https://trends.google.com/trends/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                Otevřít Google Trends
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Fallback Values */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-yellow-900 mb-3">📊 Nemáš přístup k datům? Použij konzervativní odhad:</h3>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="font-semibold text-gray-900 mb-1">Malý lokální byznys</p>
                  <p className="text-gray-600">Kavárna, kadeřnictví, fitness → <strong>1.000-5.000 lidí</strong></p>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="font-semibold text-gray-900 mb-1">Online byznys (niche)</p>
                  <p className="text-gray-600">Kurzy, koučink, SaaS → <strong>10.000-30.000 lidí</strong></p>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <p className="font-semibold text-gray-900 mb-1">Masový trh ČR</p>
                  <p className="text-gray-600">E-commerce, spotřební zboží → <strong>100.000+ lidí</strong></p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-red-900">⚠️ RADĚJI PODCEŇ!</strong><br />
                  Lepší příjemné překvapení než zklamání. Počítej s <strong>POLOVINOU</strong> toho, co odhaduješ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Calculation Reminder */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
          <h3 className="text-blue-900 mb-3">🎯 Zpětný výpočet (cílový přístup)</h3>
          <p className="text-sm text-gray-700 mb-3">
            Nezapomeň si spočítat kolik zákazníků <strong>potřebuješ</strong> k dosažení svého cíle.
            Použij nástroj <strong>"Kolik potřebuji zákazníků?"</strong> v sidebaru.
          </p>
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Příklad:</strong> Chci vydělat 50.000 Kč/měsíc, produkt stojí 500 Kč<br />
              → Potřebuji <strong>100 zákazníků/měsíc</strong><br />
              → Při CR 2% musím oslovit <strong>5.000 lidí</strong><br />
              → <strong className="text-green-600">Je to v rámci mého segmentu? ✓</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
