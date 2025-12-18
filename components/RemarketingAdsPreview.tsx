// 🎯 REMARKETING ADS - CONVERSIONS CAMPAIGN
// 3 NOVÉ REKLAMY: Zásilkovna callback, Easy to achieve, Urgency 2026

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { RemarketingAd1Zasilkovna } from './RemarketingAd1Zasilkovna';
import { RemarketingAd2Easy } from './RemarketingAd2Easy';
import { RemarketingAd3Urgency2026 } from './RemarketingAd3Urgency2026';

export function RemarketingAdsPreview() {
  const [currentAd, setCurrentAd] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const ads = [
    {
      id: 'zasilkovna-fresh',
      name: 'AD #1: ZÁSILKOVNA',
      subtitle: 'Bonus content - Takhle to udělal gigant',
      format: 'Fresh content (neběželo v omni) • Case study',
      budget: '100 Kč/den',
      objective: 'CONVERSIONS',
      trigger: 'Fresh content • Giant case study • Quiz CTA',
      color: 'from-orange-600 to-yellow-500',
      copy: {
        headline: 'Takhle to udělal GIGANT. A co tvůj model?',
        primary: 'Zásilkovna: Ukázka aplikace modelu podnikání na reálném příkladu',
        description: 'Udělej 3min kvíz a zjisti, kde máš mezery',
        cta: 'A jak vypadá TVŮJ model?'
      }
    },
    {
      id: 'diagnostic-pain',
      name: 'AD #2: DIAGNOSTIC',
      subtitle: 'Hodně práce, málo peněz → Kvíz',
      format: 'Pain point • Emotional trigger • Solution',
      budget: '100 Kč/den',
      objective: 'CONVERSIONS',
      trigger: 'Pain recognition • Problem identification • Quiz as solution',
      color: 'from-slate-800 to-slate-900',
      copy: {
        headline: 'Hodně práce. Málo peněz. A pořád dokola...',
        primary: 'Makáš jako ďábel, ale výsledky neodpovídají úsilí.',
        description: 'Problém není v TY. Problém je v MODELU.',
        cta: 'Udělej diagnostiku TEĎKA'
      }
    },
    {
      id: 'santa-gift',
      name: 'AD #3: SANTA GIFT',
      subtitle: 'Ježíšek ti nepomůže + Dárek pro sebe',
      format: 'Christmas angle • Self-gift • Rejection messaging',
      budget: '100 Kč/den',
      objective: 'CONVERSIONS',
      trigger: 'Holiday urgency • Nobody helps you • Self-care',
      color: 'from-red-700 to-green-700',
      copy: {
        headline: 'Ježíšek ti nepomůže s tvým byznysem.',
        primary: 'Nikdo ti ho nevyřeší. Tak si dej dárek sám.',
        description: '3min kvíz • Diagnóza byznysu • Plán na 2026',
        cta: 'Udělej si dárek ještě LETOS'
      }
    }
  ];

  const nextAd = () => {
    setCurrentAd((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2">
            🎯 CONVERSION ADS - KVÍZ VARIANTS
          </h1>
          <p className="text-xl text-gray-300">
            {ads[currentAd].name} - {ads[currentAd].subtitle}
          </p>
          <p className="text-lg text-yellow-400 mt-2">
            💰 Objective: <span className="font-black">CONVERSIONS</span> (Lead Magnet - Quiz)
          </p>
        </div>
      </div>

      {/* Strategy Info */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-2">Campaigns:</p>
              <p className="text-lg font-bold text-white">Cold + Remarketing</p>
              <p className="text-sm text-gray-400">AD #1 v obou, AD #2 pouze v cold</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-2">Lead Magnet:</p>
              <p className="text-lg font-bold text-white">Kvíz "Jak zdravý je tvůj model?"</p>
              <p className="text-sm text-gray-400">Personalizované výsledky + segmentace</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-2">Total Budget:</p>
              <p className="text-lg font-bold text-white">200 Kč/den</p>
              <p className="text-sm text-gray-400">Cold 150 + Remarketing 50</p>
            </div>
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
          
          <div className="flex gap-2">
            {ads.map((ad, index) => (
              <button
                key={ad.id}
                onClick={() => setCurrentAd(index)}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  index === currentAd
                    ? 'bg-orange-500 text-white scale-110'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                AD #{index + 1}
              </button>
            ))}
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
            {currentAd === 0 && <RemarketingAd1Zasilkovna />}
            {currentAd === 1 && <RemarketingAd2Easy />}
            {currentAd === 2 && <RemarketingAd3Urgency2026 />}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-5 gap-4 text-center">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="inline-block px-4 py-2 rounded-lg mb-2 bg-orange-500">
                <span className="font-black text-white">REMARKETING</span>
              </div>
              <div className="text-2xl font-black text-white">{ads[currentAd].name}</div>
              <div className="text-base text-gray-300">{ads[currentAd].subtitle}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-2">Format:</div>
              <div className="text-lg font-bold text-white">{ads[currentAd].format}</div>
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

          {/* Strategy Notes */}
          <div className="mt-6 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/50 rounded-2xl p-6">
            <h3 className="text-2xl font-black text-white mb-4">📊 Strategie:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-bold text-yellow-400 mb-2">Fáze 1: Omnipresent (ENGAGEMENT)</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>→ VALUE (3x) - edukace, důvěra</li>
                  <li>→ DEMO (3x) - jak to funguje</li>
                  <li>→ TESTIMONIAL (3x) - social proof</li>
                  <li>→ CTA (1x) - soft nabídka</li>
                </ul>
              </div>
              <div>
                <p className="text-lg font-bold text-green-400 mb-2">Fáze 2: Remarketing (CONVERSIONS)</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>→ AD #1 - Christmas angle</li>
                  <li>→ AD #2 - Diagnostic angle</li>
                  <li>→ Cíl: Lead magnet (kvíz)</li>
                  <li>→ Segmentace → Smartemailing → Prodej</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copy Buttons */}
          <div className="mt-6 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/50 rounded-2xl p-6">
            <h3 className="text-2xl font-black text-white mb-4">📋 Kopírovat texty:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-bold text-yellow-400 mb-2">Hlavní nadpis:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={ads[currentAd].copy.headline}
                    readOnly
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg"
                  />
                  <button
                    onClick={() => handleCopy(ads[currentAd].copy.headline, 'headline')}
                    className="ml-2 px-4 py-2 bg-white/10 text-white rounded-lg transition-all hover:bg-white/20"
                  >
                    {copiedId === 'headline' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-green-400 mb-2">Primární CTA:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={ads[currentAd].copy.primary}
                    readOnly
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg"
                  />
                  <button
                    onClick={() => handleCopy(ads[currentAd].copy.primary, 'primary')}
                    className="ml-2 px-4 py-2 bg-white/10 text-white rounded-lg transition-all hover:bg-white/20"
                  >
                    {copiedId === 'primary' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-yellow-400 mb-2">Popis:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={ads[currentAd].copy.description}
                    readOnly
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg"
                  />
                  <button
                    onClick={() => handleCopy(ads[currentAd].copy.description, 'description')}
                    className="ml-2 px-4 py-2 bg-white/10 text-white rounded-lg transition-all hover:bg-white/20"
                  >
                    {copiedId === 'description' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-green-400 mb-2">CTA:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={ads[currentAd].copy.cta}
                    readOnly
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg"
                  />
                  <button
                    onClick={() => handleCopy(ads[currentAd].copy.cta, 'cta')}
                    className="ml-2 px-4 py-2 bg-white/10 text-white rounded-lg transition-all hover:bg-white/20"
                  >
                    {copiedId === 'cta' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}