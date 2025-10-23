import { useState, useEffect } from "react";
import { Calculator, TrendingUp, Users, DollarSign, Target, AlertCircle, RefreshCw, ShoppingCart, X } from "lucide-react";
import { Button } from "./ui/button";

type BusinessType = "one-time" | "recurring";

export function TargetCalculatorTool() {
  const [businessType, setBusinessType] = useState<BusinessType>("one-time");
  const [goal, setGoal] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [conversionRate, setConversionRate] = useState<string>("2");
  const [frequency, setFrequency] = useState<string>("8"); // Pro opakované nákupy

  // 💾 Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("targetCalculator");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBusinessType(data.businessType || "one-time");
        setGoal(data.goal || "");
        setPrice(data.price || "");
        setConversionRate(data.conversionRate || "2");
        setFrequency(data.frequency || "8");
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  // 💾 Save to localStorage on change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("targetCalculator", JSON.stringify({
        businessType,
        goal,
        price,
        conversionRate,
        frequency
      }));
    }, 500);
    
    return () => clearTimeout(timer);
  }, [businessType, goal, price, conversionRate, frequency]);

  const handleClear = () => {
    setGoal("");
    setPrice("");
    setConversionRate("2");
    setFrequency("8");
  };

  // Calculations
  const goalNum = parseFloat(goal) || 0;
  const priceNum = parseFloat(price) || 0;
  const crNum = parseFloat(conversionRate) || 2;
  const freqNum = parseFloat(frequency) || 8;

  // JEDNORÁZOVÝ PRODEJ: Potřeba nových zákazníků každý měsíc
  const customersNeededOneTime = priceNum > 0 ? Math.ceil(goalNum / priceNum) : 0;
  const leadsNeededOneTime = crNum > 0 ? Math.ceil(customersNeededOneTime / (crNum / 100)) : 0;
  
  // OPAKOVANÉ NÁKUPY: Potřeba STÁLÝCH zákazníků (kteří nakupují opakovaně)
  const transactionsNeeded = priceNum > 0 ? Math.ceil(goalNum / priceNum) : 0;
  const regularCustomersNeeded = freqNum > 0 ? Math.ceil(transactionsNeeded / freqNum) : 0;
  const leadsNeededRecurring = crNum > 0 ? Math.ceil(regularCustomersNeeded / (crNum / 100)) : 0;
  
  const customersNeeded = businessType === "one-time" ? customersNeededOneTime : regularCustomersNeeded;
  const leadsNeeded = businessType === "one-time" ? leadsNeededOneTime : leadsNeededRecurring;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-gray-900 mb-2">🎯 Kalkulačka cílového počtu zákazníků</h1>
          <p className="text-gray-600">
            Spočítej si kolik zákazníků potřebuješ k dosažení svého cíle
          </p>
        </div>

        {/* Business Type Toggle */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-gray-900 font-semibold mb-2">1️⃣ Jaký typ byznysu máš?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tohle určuje, jestli potřebuješ NOVÉ zákazníky každý měsíc, nebo STÁLÉ zákazníky co nakupují opakovaně.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setBusinessType("one-time")}
              className={`p-4 rounded-lg border-2 transition-all ${
                businessType === "one-time"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-purple-200"
              }`}
            >
              <ShoppingCart className={`w-6 h-6 mx-auto mb-2 ${
                businessType === "one-time" ? "text-purple-600" : "text-gray-400"
              }`} />
              <p className={`font-semibold text-sm ${
                businessType === "one-time" ? "text-purple-900" : "text-gray-700"
              }`}>
                Jednorázový prodej
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Kurz, ebook, produkt
              </p>
            </button>
            
            <button
              onClick={() => setBusinessType("recurring")}
              className={`p-4 rounded-lg border-2 transition-all ${
                businessType === "recurring"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200"
              }`}
            >
              <RefreshCw className={`w-6 h-6 mx-auto mb-2 ${
                businessType === "recurring" ? "text-blue-600" : "text-gray-400"
              }`} />
              <p className={`font-semibold text-sm ${
                businessType === "recurring" ? "text-blue-900" : "text-gray-700"
              }`}>
                Opakované nákupy
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Kavárna, služby, SaaS
              </p>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-gray-900 font-semibold mb-4">2️⃣ Zadej čísla</h3>
          <div className="space-y-5">
            {/* Financial Goal */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-medium mb-2">
                <Target className="w-4 h-4 text-purple-600" />
                Jaký je tvůj finanční cíl?
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="např. 50000"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  Kč/měsíc
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                💡 Kolik chceš vydělat měsíčně?
              </p>
            </div>

            {/* Product Price */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-medium mb-2">
                <DollarSign className="w-4 h-4 text-purple-600" />
                Kolik stojí tvůj produkt/služba?
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="např. 500"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  Kč
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                💡 Průměrná cena jednoho prodeje
              </p>
            </div>

            {/* Frequency - pouze pro opakované nákupy */}
            {businessType === "recurring" && (
              <div>
                <label className="flex items-center gap-2 text-gray-900 font-medium mb-2">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  Jak často zákazník nakoupí za měsíc?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="8"
                    step="1"
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ×/měsíc
                  </span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Příklady:</strong><br />
                    • Kavárna: 8× (2× týdně)<br />
                    • Kosmetika: 1× (měsíční návštěva)<br />
                    • SaaS: 1× (měsíční platba)<br />
                    • Restaurant: 4× (1× týdně)
                  </p>
                </div>
              </div>
            )}

            {/* Conversion Rate */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-medium mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                {businessType === "one-time" 
                  ? "Conversion rate (úspěšnost prodeje)" 
                  : "Conversion rate (% návštěvníků co se stanou zákazníky)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(e.target.value)}
                  placeholder="2"
                  step="0.1"
                  min="0.1"
                  max="100"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                {businessType === "one-time" ? (
                  <p className="text-sm text-gray-700">
                    <strong>💡 Online prodej:</strong><br />
                    • Začínající: 1-2%<br />
                    • Zkušení: 3-5%<br />
                    • Exprti: 5-10%
                  </p>
                ) : (
                  <p className="text-sm text-gray-700">
                    <strong>💡 Fyzické byznysy:</strong><br />
                    • Kavárna/restaurant: 10-20%<br />
                    • Salon/služby: 5-15%<br />
                    • Retail: 15-30%
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Clear Button - pouze pokud jsou nějaká data */}
          {(goal || price || conversionRate !== "2" || frequency !== "8") && (
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4 mr-1" />
                Vymazat
              </Button>
            </div>
          )}
        </div>

        {/* Results - zobrazí se automaticky když jsou data */}
        {goalNum > 0 && priceNum > 0 && (
          <div className="space-y-4">
            {/* Main Result */}
            <div className={`bg-gradient-to-r rounded-xl shadow-lg p-6 text-white ${
              businessType === "one-time" 
                ? "from-purple-500 to-purple-600" 
                : "from-blue-500 to-blue-600"
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6" />
                <h3>Výsledek</h3>
              </div>
              
              {businessType === "one-time" ? (
                // JEDNORÁZOVÝ PRODEJ
                <div className="space-y-4">
                  <div>
                    <p className="text-white/90 text-sm mb-2">📊 Potřebuješ:</p>
                    <p className="text-6xl font-black text-white mb-2">{customersNeeded}</p>
                    <p className="text-xl font-bold text-white">nových zákazníků/měsíc</p>
                    <p className="text-white/70 text-sm mt-2">
                      ({customersNeeded} prodejů × {priceNum.toLocaleString('cs-CZ')} Kč = {(customersNeeded * priceNum).toLocaleString('cs-CZ')} Kč)
                    </p>
                  </div>
                  
                  <div className="border-t border-white/30 pt-4">
                    <p className="text-white/90 text-sm mb-2">👥 Musíš získat (celkem):</p>
                    <p className="text-6xl font-black text-white mb-2">{leadsNeeded.toLocaleString('cs-CZ')}</p>
                    <p className="text-xl font-bold text-white">potenciálních zájemců</p>
                    <p className="text-white/70 text-sm mt-2">
                      (při {crNum}% conversion rate: každý {Math.round(100/crNum)}. člověk koupí)
                    </p>
                  </div>
                </div>
              ) : (
                // OPAKOVANÉ NÁKUPY
                <div className="space-y-4">
                  <div>
                    <p className="text-white/90 text-sm mb-2">📊 Potřebuješ:</p>
                    <p className="text-6xl font-black text-white mb-2">{regularCustomersNeeded}</p>
                    <p className="text-xl font-bold text-white">stálých zákazníků</p>
                    <p className="text-white/70 text-sm mt-2">
                      (kteří nakupují opakovaně {freqNum}× měsíčně = {transactionsNeeded} transakcí celkem)
                    </p>
                  </div>
                  
                  <div className="border-t border-white/30 pt-4">
                    <p className="text-white/90 text-sm mb-2">👥 Musíš získat (celkem):</p>
                    <p className="text-6xl font-black text-white mb-2">{leadsNeededRecurring.toLocaleString('cs-CZ')}</p>
                    <p className="text-xl font-bold text-white">potenciálních zájemců</p>
                    <p className="text-white/70 text-sm mt-2">
                      (při {crNum}% conversion rate: každý {Math.round(100/crNum)}. návštěvník se stane zákazníkem)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Step */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-yellow-900 font-semibold mb-2">
                    ✅ Je to realistické?
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    {businessType === "one-time" ? (
                      <>
                        <p>
                          <strong>KROK 1:</strong> Zkontroluj velikost trhu<br />
                          → Je v tvém segmentu <strong>{leadsNeeded.toLocaleString('cs-CZ')}+ lidí?</strong>
                        </p>
                        <p>
                          <strong>KROK 2:</strong> Můžeš je oslovit každý měsíc?<br />
                          → Potřebuješ NOVÉ zákazníky každý měsíc (jednorázový prodej)
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>KROK 1:</strong> Máš dost prostoru?<br />
                          → Dokážeš obsloužit <strong>{regularCustomersNeeded} stálých zákazníků?</strong>
                        </p>
                        <p>
                          <strong>KROK 2:</strong> Je frekvence reálná?<br />
                          → Zákazník opravdu přijde {freqNum}× měsíčně?
                        </p>
                        <p>
                          <strong>KROK 3:</strong> Můžeš je získat?<br />
                          → Je v dosahu <strong>{leadsNeededRecurring.toLocaleString('cs-CZ')} lidí</strong> (ne měsíčně, ale CELKEM)?
                        </p>
                      </>
                    )}
                    <p>
                      <strong>NENÍ TO REÁLNÉ?</strong> Změň strategii:
                    </p>
                    <ul className="list-none space-y-1 ml-4">
                      <li>• Vyšší cena ({businessType === "recurring" ? "nebo více položek na účet" : "produktu"})</li>
                      <li>• {businessType === "recurring" ? "Vyšší frekvence návštěv (bonusy, věrnostní program)" : "Širší/jiný segment"}</li>
                      <li>• Více produktů/služeb</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-red-900 font-semibold mb-2">
                    ⚠️ Pozor na wishful thinking!
                  </h4>
                  <p className="text-sm text-gray-700">
                    Když si vymyslíš čísla bez ověření, stavíš byznys na písku.{" "}
                    <strong>Buď konzervativní!</strong> Radši počítej s POLOVINOU toho, co odhaduješ.
                  </p>
                </div>
              </div>
            </div>

            {/* Real Example - pro opakované nákupy */}
            {businessType === "recurring" && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h4 className="text-green-900 font-semibold mb-3">
                  ☕ Příklad: Kavárna v Praze
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Cíl:</strong> 50.000 Kč/měsíc<br />
                    <strong>Káva:</strong> 95 Kč<br />
                    <strong>Frekvence:</strong> 2× týdně = 8× měsíčně<br />
                    <strong>CR:</strong> 15% (z procházejících lidí)
                  </p>
                  <div className="bg-white rounded-lg p-3 mt-2 border border-green-200">
                    <p className="font-semibold text-green-900 mb-1">Výpočet:</p>
                    <p>
                      50.000 / 95 = <strong>527 káv/měsíc</strong><br />
                      527 / 8 návštěv = <strong className="text-green-600">66 stálých zákazníků</strong><br />
                      66 / 15% CR = <strong className="text-blue-600">440 lidí oslovit CELKEM</strong>
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    💡 To znamená: Pokud denně projde kolem kavárny 20 lidí a 15% zastaví, 
                    máš 3 nové zákazníky denně = za 3 měsíce máš 66 stálých! ✅
                  </p>
                </div>
              </div>
            )}

            {/* Next Step */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h4 className="text-blue-900 font-semibold mb-3">
                🎯 Další krok: Zjisti velikost segmentu
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Použij nástroj <strong>"Velikost segmentu"</strong> v sidebaru pro zjištění,
                kolik lidí opravdu je v tvém cílovém segmentu.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
