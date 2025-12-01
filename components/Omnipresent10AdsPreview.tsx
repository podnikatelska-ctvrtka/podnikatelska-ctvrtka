// 🎯 OMNIPRESENT 10 ADS - COMPLETE PREVIEW
// VALUE (3x) + DEMONSTRATION (3x) + TESTIMONIAL (3x) + CTA (1x)

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { ValueAchieveCarousel } from './ValueAchieveCarousel';
import { Demo2DeepDive, Demo3VideoLook } from './Demonstration3AdsNew';
import { Testimonial3MessageStyle, Testimonial4DeepDive } from './Testimonial3AdsNew';
import { CtaStart2026 } from './CtaAdNew';
import { LibraryOfModels } from './NewOmnipresent3Ads';
import { Warm4ObjectionHandlerAdjusted, Warm1SocialProofAdjusted } from './WarmAdsAdjusted';
import { Testimonial47kLossStatic } from './Testimonial47kLossStatic';
import { Value2GainStatic } from './Value2GainStatic';
import { Value3DontStart } from './Value3DontStart';
import { omnipresentAdCopy } from './OmnipresentAdCopy';

export function Omnipresent10AdsPreview() {
  const [currentAd, setCurrentAd] = useState(0);
  const [showCopy, setShowCopy] = useState(false);

  const ads = [
    // VALUE (3x)
    {
      id: 'value-1-avoid',
      name: 'VALUE #1: AVOID',
      category: 'VALUE',
      subtitle: 'Náklady odkládání',
      format: 'Static emotional',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Cost of inaction • Fear • Time urgency',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'value-2-gain',
      name: 'VALUE #2: GAIN',
      category: 'VALUE',
      subtitle: 'Představ si: za měsíc',
      format: 'Aspirational vision',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Future vision • Growth • Success visualization',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'value-3-education',
      name: 'VALUE #3: EDUCATION',
      category: 'VALUE',
      subtitle: 'Jak na úspěšný byznys',
      format: 'Educational 3-step',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Education • Common sense • Layman approach',
      color: 'from-purple-500 to-indigo-500'
    },
    // DEMONSTRATION (3x)
    {
      id: 'warm-4-objection',
      name: 'WARM #4: JE TO PRO TEBE?',
      category: 'DEMONSTRATION',
      subtitle: 'Nevím jestli je to pro mě...',
      format: 'Qualification emotional',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Self-qualification • Emotional resonance',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'demo-2-library',
      name: 'DEMO #2: KNIHOVNA',
      category: 'DEMONSTRATION',
      subtitle: 'Nebudeš na to sám (Library)',
      format: 'Gallery showcase',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Social proof • Community • Inspiration • Not alone',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'demo-3-easy-flow',
      name: 'DEMO #3: JAK TO FUNGUJE',
      category: 'DEMONSTRATION',
      subtitle: 'Takhle je to EASY (5 kroků)',
      format: 'Easy flow - animated steps',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Simplicity • Process clarity • Easy action plan',
      color: 'from-indigo-500 to-purple-500'
    },
    // TESTIMONIAL (3x)
    {
      id: 'testimonial-2-message',
      name: 'TESTIMONIAL #1: CHAT',
      category: 'TESTIMONIAL',
      subtitle: 'Problém → Řešení',
      format: 'Message/chat style',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Relatable problem • Specific solution • Before/After',
      color: 'from-gray-100 to-gray-300'
    },
    {
      id: 'testimonial-3-salon',
      name: 'TESTIMONIAL #2: SALON',
      category: 'TESTIMONIAL',
      subtitle: 'Kosmetický salon +40%',
      format: 'Real example deep dive',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Concrete example • Real results • Specific solution',
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 'testimonial-47k-loss',
      name: 'TESTIMONIAL #3: 47K ZTRÁTA',
      category: 'TESTIMONIAL',
      subtitle: 'Kolik m stály chyby... (VIDEO)',
      format: 'Animated video - confession + skepticism',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Regret • Loss aversion • Skepticism overcome • Authenticity',
      color: 'from-red-900 to-gray-900'
    },
    // CTA (1x)
    {
      id: 'cta-start-2026',
      name: 'CTA: VÁNOCE 2026',
      category: 'CTA',
      subtitle: 'Vánoční premium nabídka',
      format: 'Elegant premium static',
      budget: '20 Kč/den',
      objective: 'ENGAGEMENT',
      trigger: 'Soft urgency • Premium positioning • New year motivation',
      color: 'from-emerald-900 to-teal-900'
    }
  ];

  const nextAd = () => {
    setCurrentAd((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'VALUE': return 'bg-purple-500';
      case 'DEMONSTRATION': return 'bg-emerald-500';
      case 'TESTIMONIAL': return 'bg-blue-500';
      case 'CTA': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2">
            🎯 OMNIPRESENT 10 ADS - Kompletní Strategie
          </h1>
          <p className="text-xl text-gray-300">
            {ads[currentAd].name} ({ads[currentAd].category}) - {ads[currentAd].subtitle}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-500/50">
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span className="text-white font-bold">VALUE (3x)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/50">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <span className="text-white font-bold">DEMO (3x)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-500/50">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-white font-bold">TESTIMONIAL (3x)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-lg border border-red-500/50">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-white font-bold">CTA (1x)</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={prevAd}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white font-bold"
          >
            <ChevronLeft className="w-5 h-5" />
            Předchozí
          </button>
          
          <div className="flex gap-2 flex-wrap justify-center">
            {ads.map((ad, index) => {
              let label = '';
              if (ad.category === 'VALUE') label = `V${index + 1}`;
              else if (ad.category === 'DEMONSTRATION') {
                const demoCount = ads.slice(0, index).filter(a => a.category === 'DEMONSTRATION').length + 1;
                label = `D${demoCount}`;
              }
              else if (ad.category === 'TESTIMONIAL') {
                const testCount = ads.slice(0, index).filter(a => a.category === 'TESTIMONIAL').length + 1;
                label = `T${testCount}`;
              }
              else if (ad.category === 'CTA') label = 'CTA';
              
              return (
                <button
                  key={ad.id}
                  onClick={() => setCurrentAd(index)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all text-sm ${
                    index === currentAd
                      ? `${getCategoryColor(ad.category)} text-white scale-110`
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            onClick={nextAd}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white font-bold"
          >
            Další
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          {/* Ad Preview Container - 1080x1350 (FB 4:5) */}
          <div 
            className="bg-white shadow-2xl overflow-hidden mx-auto"
            style={{
              width: '1080px',
              height: '1350px'
            }}
          >
            {currentAd === 0 && <CostOfInactionAd />}
            {currentAd === 1 && <Value2GainStatic />}
            {currentAd === 2 && <Value3DontStart />}
            {currentAd === 3 && <Warm4ObjectionHandlerAdjusted />}
            {currentAd === 4 && <LibraryOfModels />}
            {currentAd === 5 && <Demo3VideoLook />}
            {currentAd === 6 && <Testimonial3MessageStyle />}
            {currentAd === 7 && <Testimonial4DeepDive />}
            {currentAd === 8 && <Testimonial47kLossStatic />}
            {currentAd === 9 && <CtaStart2026 />}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-5 gap-4 text-center mb-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className={`inline-block px-4 py-2 rounded-lg mb-2 ${getCategoryColor(ads[currentAd].category)}`}>
                <span className="font-black text-white">{ads[currentAd].category}</span>
              </div>
              <div className="text-2xl font-black text-white">{ads[currentAd].name}</div>
              <div className="text-base text-gray-300">{ads[currentAd].subtitle}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-2">Format:</div>
              <div className="text-lg font-bold text-white">{(ads[currentAd] as any).format || 'Static'}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-3xl font-black text-yellow-400 mb-2">{ads[currentAd].budget}</div>
              <div className="text-lg text-gray-300">Budget</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-3xl font-black text-green-400 mb-2">{ads[currentAd].objective}</div>
              <div className="text-lg text-gray-300">Objective</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-gray-300 mb-2">
                <span className="font-bold text-white">Trigger:</span>
              </div>
              <div className="text-xs text-gray-400">{ads[currentAd].trigger}</div>
            </div>
          </div>

          {/* FB AD COPY Button */}
          <div className="text-center">
            <button
              onClick={() => setShowCopy(!showCopy)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 mx-auto transition-all"
            >
              <Copy className="w-5 h-5" />
              {showCopy ? 'Skrýt' : 'Zobrazit'} FB AD COPY
            </button>
          </div>

          {/* FB AD COPY Panel */}
          {showCopy && <AdCopyPanel adIndex={currentAd} />}
        </div>
      </div>
    </div>
  );
}

// Import VALUE ads z Value3AdsPreview
function CostOfInactionAd() {
  return (
    <div className="h-full bg-gradient-to-br from-red-900 via-red-800 to-slate-900 flex flex-col items-center justify-center px-16 py-8 text-center">
      {/* BADGE nahoře - v normálním flow */}
      <div className="mb-8">
        <div className="bg-red-500 text-white px-6 py-2 rounded-full shadow-xl border-2 border-red-600">
          <p className="font-black text-lg">
            😰 POŘÁD TO SAMÉ
          </p>
        </div>
      </div>

      <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
        <span className="text-red-300">Každé ráno:</span><br/>
        stejný stres
      </h1>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6 max-w-3xl w-full border-2 border-white/30">
        <div className="space-y-3">
          <p className="text-2xl text-white font-bold">
            😞 Makáš do tmy
          </p>
          <p className="text-xl text-gray-300">
            Nevíš jestli to zvládneš
          </p>
          
          <p className="text-2xl text-white font-bold mt-4">
            👨‍👩‍👧 Rodina ti uniká
          </p>
          <p className="text-xl text-gray-300">
            Pořád v práci • Pořád unavený
          </p>
          
          <p className="text-2xl text-white font-bold mt-4">
            ✈️ Nemůžeš plánovat
          </p>
          <p className="text-xl text-gray-300">
            Dovolenou • Budoucnost • Nic
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black rounded-2xl px-12 py-6 mb-6 shadow-lg">
        <p className="text-5xl font-black mb-2">
          CO KDYBY TO ŠLO ZMĚNIT?
        </p>
        <p className="text-2xl font-bold">
          Za 90 minut
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 max-w-3xl w-full border-2 border-green-400/50">
        <div className="space-y-2">
          <p className="text-2xl text-green-400 font-bold">
            ✅ Konečně klid
          </p>
          <p className="text-2xl text-green-400 font-bold">
            ✅ Můžeš plánovat dovolenou
          </p>
          <p className="text-2xl text-green-400 font-bold">
            ✅ Víc peněz pro rodinu
          </p>
          <p className="text-3xl text-yellow-300 font-black mt-4">
            ✨ Lepší život
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-black text-white mb-2">
          PODNIKATELSKÁ ČTVRTKA
        </p>
        <p className="text-xl text-gray-300">
          90 minut • Model podnikání
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-xl">
        <p className="text-2xl font-bold">Podnikatelská Čtvrtka</p>
      </div>
    </div>
  );
}

// AD COPY PANEL KOMPONENTA
function AdCopyPanel({ adIndex }: { adIndex: number }) {
  const adCopyMap = [
    omnipresentAdCopy.value1Avoid,
    omnipresentAdCopy.value2Gain,
    omnipresentAdCopy.value3Education,
    omnipresentAdCopy.demo1JeToProTebe,
    omnipresentAdCopy.demo2Knihovna,
    omnipresentAdCopy.demo3JakToFunguje,
    omnipresentAdCopy.testimonial1Chat,
    omnipresentAdCopy.testimonial2Salon,
    omnipresentAdCopy.testimonial3Loss47k,
    omnipresentAdCopy.ctaVanoce2026,
  ];

  const copy = adCopyMap[adIndex];
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`✓ ${label} zkopírován do schránky!`);
  };

  return (
    <div className="mt-6 bg-white rounded-2xl p-8 shadow-2xl">
      <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
        📝 Facebook AD Copy
        <span className="text-lg font-normal text-gray-600">({copy.name})</span>
      </h2>

      {/* Primary Text */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-black text-gray-900">Primary Text:</h3>
          <button
            onClick={() => copyToClipboard(copy.primaryText, 'Primary Text')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Kopírovat
          </button>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <pre className="text-base text-gray-900 whitespace-pre-wrap font-sans">{copy.primaryText}</pre>
        </div>
      </div>

      {/* Headline + Description + CTA */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-gray-900">Headline:</h3>
            <button
              onClick={() => copyToClipboard(copy.headline, 'Headline')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300">
            <p className="text-sm font-bold text-gray-900">{copy.headline}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-gray-900">Description:</h3>
            <button
              onClick={() => copyToClipboard(copy.description, 'Description')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
            <p className="text-sm text-gray-900">{copy.description}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-gray-900">CTA Button:</h3>
            <button
              onClick={() => copyToClipboard(copy.cta, 'CTA')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
            <p className="text-sm font-bold text-gray-900">{copy.cta}</p>
          </div>
        </div>
      </div>

      {/* Alternativní copy pro CTA reklamu */}
      {copy.alternativePrimaryText && (
        <div className="mt-6 border-t-4 border-orange-400 pt-6">
          <h2 className="text-2xl font-black text-orange-600 mb-4">
            🎁 ALTERNATIVNÍ COPY - ANGLE DÁRKU
          </h2>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-gray-900">Primary Text (Dárek):</h3>
              <button
                onClick={() => copyToClipboard(copy.alternativePrimaryText!, 'Alternativní Primary Text')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Kopírovat
              </button>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-300">
              <pre className="text-base text-gray-900 whitespace-pre-wrap font-sans">{copy.alternativePrimaryText}</pre>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-black text-gray-900 mb-2">Headline:</h3>
              <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-300">
                <p className="text-sm font-bold text-gray-900">{copy.alternativeHeadline}</p>
              </div>
            </div>
            <div>
              <h3 className="font-black text-gray-900 mb-2">Description:</h3>
              <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-300">
                <p className="text-sm text-gray-900">{copy.alternativeDescription}</p>
              </div>
            </div>
            <div>
              <h3 className="font-black text-gray-900 mb-2">CTA Button:</h3>
              <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-300">
                <p className="text-sm font-bold text-gray-900">{copy.alternativeCta}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copy ALL button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            const fullCopy = `
=== ${copy.name} ===

PRIMARY TEXT:
${copy.primaryText}

HEADLINE: ${copy.headline}
DESCRIPTION: ${copy.description}
CTA: ${copy.cta}
${copy.alternativePrimaryText ? `

=== ALTERNATIVNÍ COPY (DÁREK) ===

PRIMARY TEXT:
${copy.alternativePrimaryText}

HEADLINE: ${copy.alternativeHeadline}
DESCRIPTION: ${copy.alternativeDescription}
CTA: ${copy.alternativeCta}
` : ''}
            `.trim();
            copyToClipboard(fullCopy, 'Celý AD Copy');
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-black text-lg flex items-center gap-3 mx-auto"
        >
          <Copy className="w-5 h-5" />
          KOPÍROVAT CELÝ AD COPY
        </button>
      </div>
    </div>
  );
}