import { MessageCircle, CheckCircle, Clock, Shield } from 'lucide-react';

export function KonzultacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
            ← Zpět na hlavní stránku
          </a>
        </div>
      </header>

      {/* MAIN CONTENT - 2 COLUMNS on desktop */}
      <main className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - Content (sticky on desktop) */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-8">
            
            {/* HERO */}
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              
              <h1 className="text-4xl lg:text-5xl mb-4">
                Nevíš co dělat jako první?<br/>
                Promluvme si zdarma.
              </h1>
              
              <p className="text-xl text-slate-600 mb-6">
                20 minut • Žádný tlak • Jen praktické rady
              </p>

              {/* BENEFITS - Horizontal on mobile */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <Clock className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="mb-1">20 minut</h3>
                  <p className="text-sm text-slate-600">
                    Krátký a konkrétní call
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <Shield className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="mb-1">Bez tlaku</h3>
                  <p className="text-sm text-slate-600">
                    Žádný prodej, jen pomoc
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <CheckCircle className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="mb-1">Konkrétní kroky</h3>
                  <p className="text-sm text-slate-600">
                    Ne teorie, ale akce
                  </p>
                </div>
              </div>
            </div>

            {/* CO PROBEREME */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
              <h2 className="text-2xl mb-6">Co probereme:</h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="mb-1">Kde jsi s podnikáním</h3>
                    <p className="text-sm text-slate-600">
                      Nápad, začátek, nebo už něco běží? Zjistíme kde přesně stojíš.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="mb-1">Co tě nejvíc brzdí</h3>
                    <p className="text-sm text-slate-600">
                      Nevíš komu prodávat? Jak získat zákazníky? Probereme tvůj největší problém.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="mb-1">První konkrétní kroky</h3>
                    <p className="text-sm text-slate-600">
                      Dostaneš jasný action plan - co udělat dnes, zítra, tento týden.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="mb-1">Jak ti můžu pomoct</h3>
                    <p className="text-sm text-slate-600">
                      Pokud ti Podnikatelská Čtvrtka sedne, ukážu ti jak funguje. Pokud ne, dostaneš stejně hodnotu.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ - Collapsible on mobile */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
              <h2 className="text-2xl mb-6">Časté otázky:</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2">Je to opravdu zdarma?</h3>
                  <p className="text-sm text-slate-600">
                    Ano. 100% zdarma. Žádné podmínky, žádné skryté poplatky.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="mb-2">Co když nemůžu dorazit?</h3>
                  <p className="text-sm text-slate-600">
                    V potvrzovacím emailu dostaneš možnost termín zrušit nebo přeplánovat. Bez problémů.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="mb-2">Jak probíhá konzultace?</h3>
                  <p className="text-sm text-slate-600">
                    Online přes Google Meet. Dostaneš link v potvrzovacím emailu.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - TidyCal (sticky on desktop) */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Vyber si termín konzultace
                </h3>
                <p className="text-slate-600">
                  Konzultace proběhne přes Google Meet
                </p>
              </div>

              {/* TidyCal iframe - responsive */}
              <div className="relative w-full" style={{ paddingBottom: '600px', minHeight: '600px' }}>
                <iframe
                  src="https://tidycal.com/cipera/20-minut-konzultace"
                  title="Rezervace konzultace"
                  className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
                  style={{ minHeight: '600px' }}
                  loading="lazy"
                />
              </div>

              {/* Fallback link */}
              <div className="mt-6 text-center">
                <a
                  href="https://tidycal.com/cipera/20-minut-konzultace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm underline"
                >
                  Nebo otevřít kalendář v nové záložce →
                </a>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-600">
          <p>
            Podnikatelská Čtvrtka • Model podnikání za 90 minut
          </p>
        </div>
      </footer>

    </div>
  );
}