import React from 'react';
import { Info, Instagram, Facebook } from 'lucide-react';

/**
 * SOCIAL MEDIA POSTS - FB & IG
 * 
 * První posty pro:
 * - FB stránka "Podnikatelská Čtvrtka"
 * - Instagram @podnikatelska.ctvrtka
 * 
 * Formáty:
 * - Square: 1080×1080 px (universal pro FB i IG)
 * - Stories: 1080×1920 px (later)
 * 
 * Export: Screenshot (Win+Shift+S nebo Cmd+Shift+4)
 */

export default function SocialMediaPosts() {
  const showScreenshotInstructions = () => {
    alert(
      '📸 JAK EXPORTOVAT:\n\n' +
      'WINDOWS:\n' +
      '1. Stiskni Win + Shift + S\n' +
      '2. Vyber area tool\n' +
      '3. Klikni a táhni přes vizuál\n' +
      '4. Ulož jako PNG\n\n' +
      'MAC:\n' +
      '1. Stiskni Cmd + Shift + 4\n' +
      '2. Klikni a táhni přes vizuál\n' +
      '3. Automaticky uloží na Desktop jako PNG'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Social Media - První posty
          </h1>
          <p className="text-gray-600">
            FB + Instagram • 1080×1080 px • Ready to publish
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">
                📋 Quick Launch Strategie
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>FB Stránka:</strong> Min 3-4 posty PŘED spuštěním reklam (credibility!)
                </p>
                <p>
                  <strong>Instagram:</strong> Min 3 posty v gridu (stránka nesmí vypadat prázdná)
                </p>
                <p>
                  <strong>Timing:</strong> Publikuj DNES → Spusť reklamy ZÍTRA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Instructions */}
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
          <div>
            <p className="text-sm text-gray-600">
              Všechny posty jsou 1080×1080 px • Použij screenshot pro export
            </p>
          </div>
          <button
            onClick={showScreenshotInstructions}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Info className="w-4 h-4" />
            Jak exportovat?
          </button>
        </div>

        {/* ============================================ */}
        {/* POST #1: UVÍTACÍ (PINNED) */}
        {/* ============================================ */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Facebook className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Post #1: Uvítací (PINNED)
              </h2>
              <p className="text-sm text-gray-600">
                FB + IG • První dojem • Pin na top FB stránky
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-center">
            <div
              id="post-1-welcome"
              style={{
                width: '1080px',
                height: '1080px',
              }}
              className="relative overflow-hidden"
            >
              {/* Gradient Background */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #ea580c 100%)',
                }}
              />

              {/* Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-16 space-y-8">
                
                {/* Badge */}
                <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <span className="text-white font-semibold text-xl">
                    🎯 Jedinečné řešení v ČR
                  </span>
                </div>
                
                {/* Main Headline */}
                <div className="space-y-4">
                  <h1 className="text-white font-black text-7xl leading-tight">
                    Podnikatelská<br />Čtvrtka
                  </h1>
                  
                  <p className="text-white text-3xl font-semibold">
                    Interaktivní kurz<br />za 90 minut
                  </p>
                </div>

                {/* Value Props */}
                <div className="flex items-center gap-6">
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center min-w-[200px]">
                    <div className="text-white font-black text-5xl mb-2">90</div>
                    <div className="text-white/90 font-medium">minut práce</div>
                  </div>
                  
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center min-w-[200px]">
                    <div className="text-white font-black text-5xl mb-2">16</div>
                    <div className="text-white/90 font-medium">lekcí</div>
                  </div>
                  
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center min-w-[200px]">
                    <div className="text-white font-black text-5xl mb-2">100%</div>
                    <div className="text-white/90 font-medium">online</div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="space-y-3">
                  <p className="text-white/90 text-xl">
                    Bez teorie • Jen konkrétní kroky • Hotový výsledek
                  </p>
                  <div className="text-white/80 font-semibold">
                    podnikatelskactvrtka.cz
                  </div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-2"
                style={{
                  background: 'linear-gradient(90deg, #f59e0b 0%, #ea580c 50%, #7c3aed 100%)',
                }}
              />
            </div>
          </div>

          {/* Copy */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">📝 Copy pro post:</h4>
            <div className="text-sm text-gray-700 space-y-2 font-mono bg-white p-4 rounded border">
              <p>🎯 Vítejte na Podnikatelské Čtvrtce!</p>
              <p></p>
              <p>Jedinečné řešení v ČR – interaktivní kurz, kde si za 90 minut vytvoříte strukturu celého byznysu. Bez teorie, bez keců – jen čistý výsledek.</p>
              <p></p>
              <p>✅ 16 interaktivních lekcí</p>
              <p>✅ 90 minut práce</p>
              <p>✅ Hotová Čtvrtka na konci</p>
              <p></p>
              <p>Sledujte nás a dozvíte se víc! 👇</p>
              <p>👉 podnikatelskactvrtka.cz</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Na FB tento post PINNNI na top stránky (Options → Pin to top)
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* POST #2: PROBLEM/SOLUTION */}
        {/* ============================================ */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Facebook className="w-6 h-6 text-blue-600" />
            <Instagram className="w-6 h-6 text-pink-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Post #2: Problem/Solution
              </h2>
              <p className="text-sm text-gray-600">
                FB + IG • Addressuje pain point
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-center">
            <div
              id="post-2-problem"
              style={{
                width: '1080px',
                height: '1080px',
              }}
              className="relative overflow-hidden bg-white"
            >
              {/* Split Design - Problem vs Solution */}
              
              {/* Left: PROBLEM (dark) */}
              <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gray-900 flex flex-col items-center justify-center text-center px-12 space-y-6">
                <div className="text-red-400 text-6xl mb-4">❌</div>
                <h3 className="text-white font-black text-4xl">
                  PROBLÉM
                </h3>
                <div className="space-y-4 text-white/90 text-xl">
                  <p>📚 Teorie bez praxe</p>
                  <p>⏰ Týdny čekání</p>
                  <p>💰 Tisíce za workshopy</p>
                  <p>❓ Nejasný výsledek</p>
                </div>
              </div>

              {/* Right: SOLUTION (bright) */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-1/2 flex flex-col items-center justify-center text-center px-12 space-y-6"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                }}
              >
                <div className="text-white text-6xl mb-4">✅</div>
                <h3 className="text-white font-black text-4xl">
                  ŘEŠENÍ
                </h3>
                <div className="space-y-4 text-white text-xl font-semibold">
                  <p>🎯 Jen konkrétní kroky</p>
                  <p>⚡ 90 minut času</p>
                  <p>💡 4.999 Kč</p>
                  <p>✨ Jasný výsledek</p>
                </div>
              </div>

              {/* Diagonal Divider */}
              <div 
                className="absolute top-0 left-1/2 w-1 h-full bg-white"
                style={{
                  boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                }}
              />

              {/* Bottom Badge */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="bg-white px-8 py-4 rounded-full shadow-lg">
                  <p className="font-black text-gray-900 text-2xl">
                    Podnikatelská Čtvrtka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">📝 Copy pro post:</h4>
            <div className="text-sm text-gray-700 space-y-2 font-mono bg-white p-4 rounded border">
              <p>❌ Máte dost teorie bez praxe?</p>
              <p>❌ Čekání týdny na výsledek?</p>
              <p>❌ Placení tisíců za workshopy?</p>
              <p></p>
              <p>✅ My to řešíme jinak.</p>
              <p></p>
              <p>Podnikatelská Čtvrtka = 90 minut práce, hotová struktura byznysu, žádné kecy.</p>
              <p></p>
              <p>🎯 Jedinečné řešení v ČR</p>
              <p>⚡ 16 interaktivních lekcí</p>
              <p>💰 4.999 Kč (průkopníci)</p>
              <p></p>
              <p>👉 podnikatelskactvrtka.cz</p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* POST #3: SOCIAL PROOF TEASER */}
        {/* ============================================ */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Facebook className="w-6 h-6 text-blue-600" />
            <Instagram className="w-6 h-6 text-pink-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Post #3: Social Proof Teaser
              </h2>
              <p className="text-sm text-gray-600">
                FB + IG • Building anticipation
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-center">
            <div
              id="post-3-social-proof"
              style={{
                width: '1080px',
                height: '1080px',
              }}
              className="relative overflow-hidden"
            >
              {/* Gradient Background */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-16 space-y-12">
                
                {/* Main Quote */}
                <div className="space-y-6">
                  <div className="text-white/40 text-9xl leading-none">"</div>
                  <p className="text-white font-bold text-4xl leading-relaxed -mt-12">
                    První kurz, kde jsem<br />
                    vytvořil <span className="text-yellow-300">konkrétní výsledek</span><br />
                    místo další poznámky.
                  </p>
                  <div className="text-white/40 text-9xl leading-none text-right">"</div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 w-full max-w-3xl">
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6">
                    <div className="text-yellow-300 font-black text-5xl mb-2">90</div>
                    <div className="text-white/90 text-sm">minut práce</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6">
                    <div className="text-yellow-300 font-black text-5xl mb-2">16</div>
                    <div className="text-white/90 text-sm">lekcí</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6">
                    <div className="text-yellow-300 font-black text-5xl mb-2">100%</div>
                    <div className="text-white/90 text-sm">jasný plán</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <p className="text-white font-semibold text-2xl">
                    Podnikatelská Čtvrtka
                  </p>
                  <p className="text-white/80 text-lg">
                    Bez teorie • Jen výsledky
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">📝 Copy pro post:</h4>
            <div className="text-sm text-gray-700 space-y-2 font-mono bg-white p-4 rounded border">
              <p>💬 "První kurz, kde jsem vytvořil konkrétní výsledek místo další poznámky."</p>
              <p></p>
              <p>Přesně to je Podnikatelská Čtvrtka. Žádná teorie, žádné workshopy na celý den.</p>
              <p></p>
              <p>✅ Otevřeš kurz</p>
              <p>✅ 90 minut práce</p>
              <p>✅ Máš hotovou Čtvrtku s jasným plánem</p>
              <p></p>
              <p>🎯 16 interaktivních lekcí</p>
              <p>⚡ Jedinečné řešení v ČR</p>
              <p>💰 Průkopnická cena: 4.999 Kč</p>
              <p></p>
              <p>👉 podnikatelskactvrtka.cz</p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* POST #4: BEHIND THE SCENES */}
        {/* ============================================ */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Instagram className="w-6 h-6 text-pink-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Post #4: Behind the Scenes
              </h2>
              <p className="text-sm text-gray-600">
                IG primary • Authenticity
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-center">
            <div
              id="post-4-bts"
              style={{
                width: '1080px',
                height: '1080px',
              }}
              className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
            >
              {/* Main Content Area */}
              <div className="h-full flex flex-col">
                
                {/* Top: Headline */}
                <div className="bg-gradient-to-r from-orange-500 to-purple-600 p-12 text-center">
                  <h3 className="text-white font-black text-5xl leading-tight">
                    Jak vznikla<br />Podnikatelská Čtvrtka?
                  </h3>
                </div>

                {/* Middle: Story */}
                <div className="flex-1 flex items-center justify-center px-16 py-12">
                  <div className="space-y-8 text-center max-w-2xl">
                    <p className="text-gray-700 text-2xl leading-relaxed">
                      Unavený z teorií bez praxe.<br />
                      Frustrovaný z kurzů plných keců.<br />
                      Rozhodnutý udělat něco jinak.
                    </p>

                    <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-purple-600 mx-auto rounded-full" />

                    <p className="text-gray-900 font-semibold text-3xl">
                      Výsledek?
                    </p>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200">
                      <p className="text-gray-900 font-bold text-2xl mb-4">
                        🎯 Podnikatelská Čtvrtka za 90 minut
                      </p>
                      <p className="text-gray-600 text-xl">
                        Bez teorie • Jen konkrétní kroky • Interaktivní řešení
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom: CTA */}
                <div className="bg-gray-900 p-8 text-center">
                  <p className="text-white font-semibold text-2xl">
                    podnikatelskactvrtka.cz
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">📝 Copy pro post:</h4>
            <div className="text-sm text-gray-700 space-y-2 font-mono bg-white p-4 rounded border">
              <p>🛠️ Jak vznikla Podnikatelská Čtvrtka?</p>
              <p></p>
              <p>Unavený z teorií bez praxe.</p>
              <p>Frustrovaný z kurzů plných keců.</p>
              <p>Rozhodnutý udělat něco jinak.</p>
              <p></p>
              <p>Výsledek? 🎯</p>
              <p></p>
              <p>Jedinečné řešení v ČR – interaktivní kurz, kde si za 90 minut vyplníte celou Čtvrtku. Bez teorie, bez workshopů – jen čisté výsledky.</p>
              <p></p>
              <p>✅ 16 interaktivních lekcí</p>
              <p>✅ 90 minut práce</p>
              <p>✅ Hotová Čtvrtka na konci</p>
              <p></p>
              <p>To je Podnikatelská Čtvrtka.</p>
              <p></p>
              <p>👉 podnikatelskactvrtka.cz</p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* PUBLISHING GUIDE */}
        {/* ============================================ */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            📅 Publishing Schedule - První den
          </h3>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
              <p className="font-semibold text-gray-900">DNES (před spuštěním reklam):</p>
              <div className="mt-2 space-y-2 text-sm text-gray-700">
                <p>1. <strong>9:00</strong> - Publikuj Post #1 (Uvítací) na FB → PIN na top</p>
                <p>2. <strong>10:00</strong> - Publikuj Post #1 na IG</p>
                <p>3. <strong>14:00</strong> - Publikuj Post #2 (Problem/Solution) na FB</p>
                <p>4. <strong>15:00</strong> - Publikuj Post #2 na IG</p>
                <p>5. <strong>18:00</strong> - Publikuj Post #3 (Social Proof) na FB + IG</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border-l-4 border-purple-600">
              <p className="font-semibold text-gray-900">ZÍTRA:</p>
              <div className="mt-2 space-y-2 text-sm text-gray-700">
                <p>1. <strong>10:00</strong> - Publikuj Post #4 (Behind Scenes) na IG</p>
                <p>2. <strong>12:00</strong> - SPUSŤ FB REKLAMY 🚀</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-900">💡 PRO TIP:</p>
              <p className="text-sm text-yellow-800 mt-2">
                FB algoritmus preferuje stránky s "historií" postů. Proto publikuj 3-4 posty PŘED spuštěním reklam!
              </p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* HASHTAGS */}
        {/* ============================================ */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            #️⃣ Doporučené Hashtags (IG)
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Pro všechny posty:</p>
              <div className="bg-gray-50 p-4 rounded border font-mono text-sm text-gray-700">
                #podnikani #businessmodelcanvas #startup #ceskypodnikatel #podnikatel #businessplan #businessstrategie #onlinekurz #edutech #czechbusiness
              </div>
            </div>

            <p className="text-xs text-gray-500">
              💡 Instagram: Max 30 hashtagů, ale 10-15 je optimální. FB: Hashtags nejsou tak důležité.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
