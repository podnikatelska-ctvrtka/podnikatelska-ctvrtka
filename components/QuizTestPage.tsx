import { useState } from 'react';
import { Button } from './ui/button';
import { ActionPlanPDF } from './ActionPlanPDF';

export function QuizTestPage() {
  const [selectedCategory, setSelectedCategory] = useState<'critical' | 'unstable' | 'solid' | 'advanced' | 'beginner'>('critical');
  const [selectedScore, setSelectedScore] = useState(20);
  const [userName, setUserName] = useState('Testovací Podnikatel');
  const [showPDF, setShowPDF] = useState(false);

  const testCases = [
    {
      category: 'critical' as const,
      label: '🔴 KRITICKÝ (0-30%)',
      score: 20,
      description: 'Model s vážnými problémy - potřebuje okamžitou pomoc',
      color: 'bg-red-50 border-red-300 hover:bg-red-100'
    },
    {
      category: 'unstable' as const,
      label: '🟠 NESTABILNÍ (31-55%)',
      score: 45,
      description: 'Model má základy, ale chybí stabilita',
      color: 'bg-orange-50 border-orange-300 hover:bg-orange-100'
    },
    {
      category: 'solid' as const,
      label: '🟡 SOLIDNÍ (56-75%)',
      score: 65,
      description: 'Fungující model s potenciálem ke zlepšení',
      color: 'bg-yellow-50 border-yellow-300 hover:bg-yellow-100'
    },
    {
      category: 'advanced' as const,
      label: '🟢 POKROČILÝ (76-100%)',
      score: 85,
      description: 'Vynikající model - potřebuje jen doladění',
      color: 'bg-green-50 border-green-300 hover:bg-green-100'
    },
    {
      category: 'beginner' as const,
      label: '🔵 ZAČÍNAJÍCÍ (vysoké skóre)',
      score: 75,
      description: 'Začínající podnikatel s dobrým potenciálem',
      color: 'bg-blue-50 border-blue-300 hover:bg-blue-100'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            🧪 Test kvízu a PDF akčních plánů
          </h1>
          <p className="text-slate-600">
            Otestuj všechny verze PDF podle výsledků kvízu
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: Controls */}
          <div className="lg:col-span-1 space-y-6 print:hidden">
            {/* Test Cases */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                📊 Vyber verzi PDF
              </h2>
              
              <div className="space-y-3">
                {testCases.map((testCase) => (
                  <button
                    key={testCase.category}
                    onClick={() => {
                      setSelectedCategory(testCase.category);
                      setSelectedScore(testCase.score);
                      setShowPDF(true);
                    }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${testCase.color} ${
                      selectedCategory === testCase.category
                        ? 'ring-2 ring-offset-2 ring-orange-500 scale-105'
                        : ''
                    }`}
                  >
                    <div className="font-bold text-slate-900 mb-1">
                      {testCase.label}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testCase.description}
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                      Skóre: {testCase.score}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* User Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                👤 Personalizace
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Jméno uživatele
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Jméno podnikatele"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                🎯 Akce
              </h2>
              
              <div className="space-y-3">
                <Button
                  onClick={handleDownloadPDF}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-6"
                >
                  📥 Stáhnout jako PDF
                </Button>
                
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="w-full border-2 border-orange-500 py-6"
                >
                  🖨️ Vytisknout
                </Button>
                
                <Button
                  onClick={() => setShowPDF(!showPDF)}
                  variant="outline"
                  className="w-full py-6"
                >
                  {showPDF ? '👁️ Skrýt preview' : '👁️ Zobrazit preview'}
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
              <div className="text-sm text-blue-900">
                <div className="font-bold mb-2">💡 Jak testovat:</div>
                <ol className="list-decimal list-inside space-y-1 text-blue-800">
                  <li>Vyber verzi PDF (podle skóre)</li>
                  <li>Uprav jméno (volitelné)</li>
                  <li>Klikni "Stáhnout jako PDF"</li>
                  <li>Zkontroluj obsah každé verze</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RIGHT: PDF Preview */}
          <div className="lg:col-span-2">
            {showPDF ? (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 print:hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">Preview: </span>
                      <span className="text-slate-600">
                        {testCases.find(t => t.category === selectedCategory)?.label}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">
                      Skóre: {selectedScore}%
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <ActionPlanPDF 
                    category={selectedCategory}
                    score={selectedScore}
                    name={userName}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border-2 border-dashed border-slate-300 h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <div className="text-xl font-bold text-slate-600 mb-2">
                    Vyber verzi PDF
                  </div>
                  <div className="text-slate-500">
                    Klikni na jednu z verzí vlevo
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 print:hidden">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            🔗 Další testovací stránky
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/kviz"
              className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-all"
            >
              <span className="text-2xl">📝</span>
              <div>
                <div className="font-bold text-slate-900">Kvíz landing</div>
                <div className="text-sm text-slate-600">Hlavní vstupní stránka</div>
              </div>
            </a>
            
            <a
              href="/action-plans"
              className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-all"
            >
              <span className="text-2xl">📊</span>
              <div>
                <div className="font-bold text-slate-900">Action Plans</div>
                <div className="text-sm text-slate-600">Jednoduchý preview</div>
              </div>
            </a>
            
            <a
              href="/remarketing"
              className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-all"
            >
              <span className="text-2xl">🎯</span>
              <div>
                <div className="font-bold text-slate-900">Remarketing Ads</div>
                <div className="text-sm text-slate-600">Konverzní reklamy</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { margin: 0; background: white; }
          .print\\:hidden { display: none !important; }
        }
      ` }} />
    </div>
  );
}
