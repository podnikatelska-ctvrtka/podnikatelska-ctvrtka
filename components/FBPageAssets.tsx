import React from 'react';
import { Info } from 'lucide-react';

/**
 * FB PAGE ASSETS - PROFILOVÁ + COVER
 * 
 * Profilová: 512×512 px (FB ořízne na kruh)
 * Cover: 820×312 px
 * 
 * Export: Screenshot (Win+Shift+S nebo Cmd+Shift+4)
 */

export default function FBPageAssets() {
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
            FB Stránka - Grafické Assety
          </h1>
          <p className="text-gray-600">
            Export: Screenshot (Win+Shift+S nebo Cmd+Shift+4)
          </p>
        </div>

        {/* CTA Button Doporučení */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">
                💡 FB Stránka CTA tlačítko - Doporučení
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong className="text-blue-700">DOPORUČUJI:</strong>
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                  <p className="font-semibold text-gray-900">Tlačítko: "Zjistit více" (Learn More)</p>
                  <p className="text-gray-600">Odkaz: https://podnikatelskactvrtka.cz</p>
                </div>
                <p className="mt-3">
                  <strong>Proč "Zjistit více"?</strong>
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>✅ Necítí se jako agresivní sales</li>
                  <li>✅ Nízká bariéra (jen "zjistit více", ne hned "koupit")</li>
                  <li>✅ FB preferuje soft CTA pro cold traffic</li>
                  <li>✅ Standard v českém online marketingu</li>
                </ul>
                <p className="mt-3">
                  <strong>Alternativy:</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="font-semibold text-sm">"Začít nyní"</p>
                    <p className="text-xs text-gray-600">Aktivnější CTA</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="font-semibold text-sm">"Rezervovat místo"</p>
                    <p className="text-xs text-gray-600">Urgency</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="font-semibold text-sm">"Získat slevu"</p>
                    <p className="text-xs text-gray-600">Incentive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* PROFILOVÁ FOTKA - 512×512 px */}
        {/* ============================================ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Profilová fotka
              </h2>
              <p className="text-sm text-gray-600">
                512×512 px • FB ořízne na kruh • Použij screenshot pro export
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

          {/* Profilová - 512×512 */}
          <div className="flex justify-center bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div
              id="profile-image"
              style={{
                width: '512px',
                height: '512px',
              }}
              className="relative overflow-hidden flex items-center justify-center"
            >
              {/* Gradient Background */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #7c3aed 100%)',
                }}
              />
              
              {/* Logo/Text */}
              <div className="relative z-10 text-center">
                <div className="text-white font-black" style={{ fontSize: '160px', lineHeight: '1', letterSpacing: '-0.05em' }}>
                  PČ
                </div>
              </div>

              {/* Subtle Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(255,255,255,0.1) 10px,
                    rgba(255,255,255,0.1) 20px
                  )`,
                }}
              />
            </div>
          </div>

          {/* Preview v kruhu */}
          <div className="flex justify-center items-center gap-4 p-4 bg-gray-100 rounded-lg">
            <span className="text-sm text-gray-600">Preview (FB kruh):</span>
            <div
              className="rounded-full overflow-hidden border-4 border-white shadow-lg"
              style={{
                width: '180px',
                height: '180px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #7c3aed 100%)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white font-black text-6xl">PČ</div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* COVER PHOTO - 820×312 px */}
        {/* ============================================ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Cover Photo (úvodní fotka)
              </h2>
              <p className="text-sm text-gray-600">
                820×312 px • Hlavní vizuál stránky • Desktop i mobil
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

          {/* Cover - 820×312 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <div
              id="cover-image-v1"
              style={{
                width: '820px',
                height: '312px',
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
              <div className="relative z-10 h-full flex items-center justify-between px-16">
                
                {/* Left: Main Message */}
                <div className="space-y-3 max-w-lg">
                  <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    <span className="text-white text-sm font-semibold">
                      💡 Jediná opravdová pomoc pro podnikatele v ČR
                    </span>
                  </div>
                  
                  <h1 className="text-white font-black text-5xl leading-tight">
                    Podnikatelská<br />
                    Čtvrtka
                  </h1>
                  
                  <p className="text-white/90 text-lg font-medium">
                    90 minut • Hotový výsledek • Bez teorie
                  </p>
                </div>

                {/* Right: Stats */}
                <div className="flex flex-col gap-4">
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center min-w-[180px]">
                    <div className="text-white font-black text-4xl mb-1">90</div>
                    <div className="text-white/80 text-sm font-medium">minut práce</div>
                  </div>
                  
                  <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center min-w-[180px]">
                    <div className="text-yellow-300 font-black text-2xl mb-1">BONUS</div>
                    <div className="text-white/80 text-sm font-medium">Mini kurz zdarma</div>
                  </div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(90deg, #f59e0b 0%, #ea580c 50%, #7c3aed 100%)',
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> FB cover se na mobilu ořízne na 640×360 px (střed). 
              Důležité info drž ve středu!
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* ALTERNATIVNÍ COVER - Simple */}
        {/* ============================================ */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Cover Photo - Varianta 2 (jednodušší)
            </h2>
            <p className="text-sm text-gray-600">
              820×312 px • Minimalistická verze • Lépe čitelná na mobilu
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <div
              id="cover-image-v2"
              style={{
                width: '820px',
                height: '312px',
              }}
              className="relative overflow-hidden"
            >
              {/* Simple Gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                }}
              />

              {/* Centered Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12">
                <div className="space-y-4">
                  <h1 className="text-white font-black text-6xl leading-tight">
                    Podnikatelská Čtvrtka
                  </h1>
                  
                  <p className="text-white text-2xl font-semibold">
                    Jediná opravdová pomoc pro podnikatele v ČR
                  </p>
                  
                  <div className="flex items-center justify-center gap-8 pt-4">
                    <div className="text-center">
                      <div className="text-white font-black text-3xl">16</div>
                      <div className="text-white/90 text-sm">lekcí</div>
                    </div>
                    <div className="w-px h-12 bg-white/30" />
                    <div className="text-center">
                      <div className="text-white font-black text-3xl">90</div>
                      <div className="text-white/90 text-sm">minut</div>
                    </div>
                    <div className="w-px h-12 bg-white/30" />
                    <div className="text-center">
                      <div className="text-yellow-300 font-black text-xl">BONUS</div>
                      <div className="text-white/90 text-sm">Mini kurz zdarma</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* NÁVOD */}
        {/* ============================================ */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            📋 Jak nahrát na FB stránku:
          </h3>
          
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <strong>1. PROFILOVÁ:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Jdi na FB stránku → Edituj profilovou</li>
                <li>Upload <code className="bg-white px-2 py-0.5 rounded">podnikatelska-ctvrtka-profile.png</code></li>
                <li>FB automaticky ořízne na kruh</li>
                <li>Zkontroluj preview a ulož</li>
              </ul>
            </div>

            <div>
              <strong>2. COVER:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Jdi na FB stránku → Edituj cover photo</li>
                <li>Upload <code className="bg-white px-2 py-0.5 rounded">podnikatelska-ctvrtka-cover.png</code></li>
                <li>Reposition pokud je potřeba (drž text ve středu!)</li>
                <li>Zkontroluj mobile preview</li>
                <li>Ulož</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <strong>💡 Export TIP:</strong>
              <p className="mt-2">
                <strong>Použij screenshot:</strong>
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Windows:</strong> Win + Shift + S → Vyber area tool → Screenshotni přesně box s vizuálem</li>
                <li><strong>Mac:</strong> Cmd + Shift + 4 → Klikni a táhni přes vizuál → Auto-uloží na Desktop</li>
                <li>Ulož jako PNG (doporučená kvalita)</li>
              </ul>
              <p className="mt-3 text-sm">
                💾 <strong>Název souborů:</strong> Pojmenuj např. <code className="bg-white px-2 py-0.5 rounded">ctvrtka-profile.png</code> a <code className="bg-white px-2 py-0.5 rounded">ctvrtka-cover.png</code>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
