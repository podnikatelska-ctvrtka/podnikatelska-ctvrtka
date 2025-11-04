import { useState, useEffect } from "react";
import { Calculator, TrendingUp, Users, DollarSign, Target, AlertCircle, RefreshCw, ShoppingCart, X, Menu, HelpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { haptic } from "../../lib/haptics";

interface MobileTargetCalculatorToolProps {
  onOpenSidebar?: () => void;
  onShowWelcomeModal?: () => void;
}

type BusinessType = "one-time" | "recurring";

export function MobileTargetCalculatorTool({ onOpenSidebar, onShowWelcomeModal }: MobileTargetCalculatorToolProps) {
  const [businessType, setBusinessType] = useState<BusinessType>("one-time");
  const [goal, setGoal] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [conversionRate, setConversionRate] = useState<string>("2");
  const [frequency, setFrequency] = useState<string>("8");

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

  // 💾 Save to localStorage on change
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
    haptic('medium');
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

  const customersNeededOneTime = priceNum > 0 ? Math.ceil(goalNum / priceNum) : 0;
  const leadsNeededOneTime = crNum > 0 ? Math.ceil(customersNeededOneTime / (crNum / 100)) : 0;
  
  const transactionsNeeded = priceNum > 0 ? Math.ceil(goalNum / priceNum) : 0;
  const regularCustomersNeeded = freqNum > 0 ? Math.ceil(transactionsNeeded / freqNum) : 0;
  const leadsNeededRecurring = crNum > 0 ? Math.ceil(regularCustomersNeeded / (crNum / 100)) : 0;
  
  const customersNeeded = businessType === "one-time" ? customersNeededOneTime : regularCustomersNeeded;
  const leadsNeeded = businessType === "one-time" ? leadsNeededOneTime : leadsNeededRecurring;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white overflow-x-hidden">
      {/* Header with Menu Button */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 sticky top-0 z-10 shadow-md">
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
              <Calculator className="w-5 h-5" />
              <h1 className="text-lg">Kalkulačka zákazníků</h1>
            </div>
            <p className="text-sm text-purple-100">
              Kolik zákazníků potřebuji?
            </p>
          </div>
          {onShowWelcomeModal && (
            <button
              onClick={() => {
                haptic('light');
                onShowWelcomeModal();
              }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
              aria-label="Nápověda"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {/* Business Type Toggle */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
          <h3 className="text-gray-900 mb-2">1️⃣ Typ byznysu</h3>
          <p className="text-sm text-gray-600 mb-3">
            NOVÉ zákazníky každý měsíc, nebo STÁLÉ?
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                haptic('light');
                setBusinessType("one-time");
              }}
              className={`p-3 rounded-lg border-2 transition-all active:scale-95 ${
                businessType === "one-time"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200"
              }`}
            >
              <ShoppingCart className={`w-5 h-5 mx-auto mb-1 ${
                businessType === "one-time" ? "text-purple-600" : "text-gray-400"
              }`} />
              <p className={`text-sm ${
                businessType === "one-time" ? "text-purple-900" : "text-gray-700"
              }`}>
                Jednorázový
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Kurz, ebook
              </p>
            </button>
            
            <button
              onClick={() => {
                haptic('light');
                setBusinessType("recurring");
              }}
              className={`p-3 rounded-lg border-2 transition-all active:scale-95 ${
                businessType === "recurring"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <RefreshCw className={`w-5 h-5 mx-auto mb-1 ${
                businessType === "recurring" ? "text-blue-600" : "text-gray-400"
              }`} />
              <p className={`text-sm ${
                businessType === "recurring" ? "text-blue-900" : "text-gray-700"
              }`}>
                Opakované
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Kavárna, SaaS
              </p>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
          <h3 className="text-gray-900 mb-3">2️⃣ Zadej čísla</h3>
          <div className="space-y-4">
            {/* Financial Goal */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 mb-2 text-sm">
                <Target className="w-4 h-4 text-purple-600" />
                Finanční cíl
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="numeric"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="např. 50000"
                  className="no-spinner w-full px-3 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                  Kč/měsíc
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                💡 Kolik chceš vydělat měsíčně?
              </p>
            </div>

            {/* Product Price */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 mb-2 text-sm">
                <DollarSign className="w-4 h-4 text-purple-600" />
                Cena produktu/služby
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="numeric"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="např. 500"
                  className="no-spinner w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                  Kč
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                💡 Průměrná cena jednoho prodeje
              </p>
            </div>

            {/* Frequency - pouze pro opakované nákupy */}
            {businessType === "recurring" && (
              <div>
                <label className="flex items-center gap-2 text-gray-900 mb-2 text-sm">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  Frekvence nákupů
                </label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="8"
                    step="1"
                    min="1"
                    max="100"
                    className="no-spinner w-full px-3 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                    ×/měsíc
                  </span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
                  <p className="text-xs text-gray-700">
                    <strong>💡 Příklady:</strong><br />
                    Kavárna: 8× (2× týdně)<br />
                    Kosmetika: 1× (měsíční návštěva)
                  </p>
                </div>
              </div>
            )}

            {/* Conversion Rate */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 mb-2 text-sm">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                Conversion rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(e.target.value)}
                  placeholder="2"
                  step="0.1"
                  min="0.1"
                  max="100"
                  className="no-spinner w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                  %
                </span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
                <p className="text-xs text-gray-700">
                  <strong>💡 Začínající:</strong> 1-2%<br />
                  <strong>Zkušení:</strong> 3-5%
                </p>
              </div>
            </div>
          </div>

          {/* Clear Button */}
          {(goal || price || conversionRate !== "2" || frequency !== "8") && (
            <div className="flex justify-end mt-3">
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

        {/* Results */}
        {goalNum > 0 && priceNum > 0 && (
          <div className="space-y-3">
            {/* Main Result */}
            <div className={`bg-gradient-to-r rounded-xl shadow-lg p-4 text-white ${
              businessType === "one-time" 
                ? "from-purple-500 to-purple-600" 
                : "from-blue-500 to-blue-600"
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5" />
                <h3 className="text-lg">Výsledek</h3>
              </div>
              
              {businessType === "one-time" ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-white/90 text-xs mb-1">📊 Potřebuješ:</p>
                    <p className="text-5xl text-white mb-1">{customersNeeded}</p>
                    <p className="text-white">nových zákazníků/měsíc</p>
                    <p className="text-white/70 text-xs mt-1">
                      ({customersNeeded} prodejů × {priceNum.toLocaleString('cs-CZ')} Kč)
                    </p>
                  </div>
                  
                  <div className="border-t border-white/30 pt-3">
                    <p className="text-white/90 text-xs mb-1">👥 Musíš získat:</p>
                    <p className="text-5xl text-white mb-1">{leadsNeeded.toLocaleString('cs-CZ')}</p>
                    <p className="text-white">potenciálních zájemců</p>
                    <p className="text-white/70 text-xs mt-1">
                      (při {crNum}% CR: každý {Math.round(100/crNum)}. člověk koupí)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-white/90 text-xs mb-1">📊 Potřebuješ:</p>
                    <p className="text-5xl text-white mb-1">{regularCustomersNeeded}</p>
                    <p className="text-white">stálých zákazníků</p>
                    <p className="text-white/70 text-xs mt-1">
                      (kteří nakupují {freqNum}× měsíčně)
                    </p>
                  </div>
                  
                  <div className="border-t border-white/30 pt-3">
                    <p className="text-white/90 text-xs mb-1">👥 Musíš získat:</p>
                    <p className="text-5xl text-white mb-1">{leadsNeededRecurring.toLocaleString('cs-CZ')}</p>
                    <p className="text-white">potenciálních zájemců</p>
                    <p className="text-white/70 text-xs mt-1">
                      (při {crNum}% CR: každý {Math.round(100/crNum)}. se stane zákazníkem)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Verification */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-yellow-900 mb-2 text-sm">
                    ✅ Je to realistické?
                  </h4>
                  <div className="space-y-1.5 text-xs text-gray-700">
                    {businessType === "one-time" ? (
                      <>
                        <p>
                          <strong>KROK 1:</strong> Je v segmentu {leadsNeeded.toLocaleString('cs-CZ')}+ lidí?
                        </p>
                        <p>
                          <strong>KROK 2:</strong> Můžeš je oslovit každý měsíc?
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>KROK 1:</strong> Dokážeš obsloužit {regularCustomersNeeded} zákazníků?
                        </p>
                        <p>
                          <strong>KROK 2:</strong> Je frekvence {freqNum}× měsíčně reálná?
                        </p>
                      </>
                    )}
                    <p className="mt-2">
                      <strong>NENÍ TO REÁLNÉ?</strong>
                    </p>
                    <ul className="list-none space-y-0.5 ml-2">
                      <li>• Vyšší cena produktu</li>
                      <li>• {businessType === "recurring" ? "Vyšší frekvence návštěv" : "Širší segment"}</li>
                      <li>• Více produktů/služeb</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-red-900 mb-1 text-sm">
                    ⚠️ Pozor na wishful thinking!
                  </h4>
                  <p className="text-xs text-gray-700">
                    <strong>Buď konzervativní!</strong> Radši počítej s POLOVINOU toho, co odhaduješ.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Step */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <h4 className="text-blue-900 mb-2 text-sm">
                🎯 Další krok
              </h4>
              <p className="text-xs text-gray-700">
                Použij nástroj <strong>"Velikost segmentu"</strong> pro zjištění,
                kolik lidí opravdu je v tvém cílovém segmentu.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
