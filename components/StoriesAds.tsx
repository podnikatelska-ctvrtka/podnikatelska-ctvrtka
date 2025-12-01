// 📱 STORIES ADS - 9:16 FORMAT
// Pro Instagram Stories a Facebook Stories
// PRAVDA + MATRIX + OPERATIVA

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { toast } from 'sonner';

interface StoryAdData {
  id: string;
  name: string;
  category: string;
  content: React.ReactNode;
  copy: {
    primary: string;
    headline: string;
    description: string;
    cta: string;
  };
}

const storiesAds: StoryAdData[] = [
  // STORY #1: PRAVDA (Guru killing)
  {
    id: 'pravda-stories',
    name: 'Stories #1: PRAVDA',
    category: 'Guru killing • Reality check',
    content: (
      <div className="w-full h-full bg-gradient-to-b from-red-900 via-red-800 to-black flex flex-col items-center justify-between text-center px-6 py-12">
        {/* Top qualifier */}
        <div className="bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg animate-pulse">
          <p className="text-2xl font-black">
            ⚠️ JSI PODNIKATEL?
          </p>
        </div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            V ČESKU<br/>
            ŽÁDNÁ REÁLNÁ<br/>
            POMOC<br/>
            <span className="text-red-300">NENÍ.</span>
          </h1>

          {/* Pain points */}
          <div className="bg-white/95 rounded-3xl p-6 mb-6 max-w-md w-full shadow-2xl">
            <div className="space-y-3">
              <div className="text-left">
                <p className="text-xl font-bold text-gray-900 mb-1">Guru kurzy? ✅</p>
                <p className="text-base text-gray-600">50h teorie co nepomůže</p>
              </div>
              
              <div className="h-px bg-gray-300"></div>
              
              <div className="text-left">
                <p className="text-xl font-bold text-gray-900 mb-1">FB experti? ✅</p>
                <p className="text-base text-gray-600">Každý umí reklamu. Nikdo byznys.</p>
              </div>
              
              <div className="h-px bg-gray-300"></div>
              
              <div className="text-left">
                <p className="text-xl font-bold text-gray-900 mb-1">Konzultanti? ✅</p>
                <p className="text-base text-gray-600">Obecné rady za 10.000 Kč</p>
              </div>
              
              <div className="h-px bg-gray-300"></div>
              
              <div className="bg-red-50 rounded-xl p-3 border-2 border-red-500">
                <p className="text-lg font-black text-red-600">
                  KONKRÉTNÍ SYSTÉM?<br/>❌ NIKDE.
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-5 border-2 border-green-400 max-w-md w-full">
            <p className="text-2xl font-black text-green-300 mb-3">
              TAK JSME TO<br/>VYTVOŘILI.
            </p>
            <div className="text-white text-base space-y-1">
              <p>✓ 90 minut práce</p>
              <p>✓ Celý byznys model</p>
              <p>✓ Jasný plán co dělat</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="space-y-3 w-full max-w-md">
          <div className="bg-white text-black px-8 py-5 rounded-2xl shadow-2xl">
            <p className="text-3xl font-black">PODNIKATELSKÁ</p>
            <p className="text-3xl font-black">ČTVRTKA</p>
          </div>
          
          <p className="text-yellow-300 text-xl font-bold">
            🔥 Sleva 50% jen pro prvních 50
          </p>
          
          <p className="text-white/80 text-sm">
            Swipe Up → Funkční systém
          </p>
        </div>
      </div>
    ),
    copy: {
      primary: `⚠️ JSI PODNIKATEL?

V Česku žádná REÁLNÁ pomoc není.

━━━━━━━━━━━━━━━━━���━━━━━━━━━

Guru kurzy? ✅ Máme.
→ 50 hodin teorie co nepomůže

FB marketing experti? ✅ Máme.
→ Každý umí reklamu. Nikdo byznys.

Konzultanti? ✅ Máme.
→ Obecné rady za 10.000 Kč

KONKRÉTNÍ SYSTÉM PRO PODNIKATELE? ❌ NIKDE.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

TAK JSME TO VYTVOŘILI.

PODNIKATELSKÁ ČTVRTKA
= Funkční nástroj pro každého podnikatele

Máš e-shop, kavárnu, služby, freelance?

✅ 90 minut práce
✅ Celý byznys model
✅ Jasný plán co dělat

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bez teorií. Bez keců. Bez čekání.

První v ČR. Poprvé v češtině. Pro podnikatele.

🔥 Sleva 50% jen pro prvních 50 podnikatelů

👉 www.podnikatelskactvrtka.cz?utm_content=pravda`,
      headline: 'Jsi podnikatel? Tohle je pro tebe.',
      description: '90 minut. Celý byznys model.',
      cta: 'Chci funkční systém'
    }
  },

  // STORY #2: MATRIX (99% nemá model)
  {
    id: 'matrix-stories',
    name: 'Stories #2: MATRIX',
    category: 'Model • Complexity → Simplicity',
    content: (
      <div className="w-full h-full bg-gradient-to-b from-purple-900 via-indigo-900 to-black flex flex-col items-center justify-between text-center px-6 py-12">
        {/* Top qualifier */}
        <div className="bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg animate-pulse">
          <p className="text-2xl font-black">
            ⚠️ JSI PODNIKATEL?
          </p>
        </div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
            99%<br/>
            PODNIKATELŮ<br/>
            <span className="text-red-400">NEMÁ MODEL</span>
          </h1>

          {/* Problems */}
          <div className="bg-white/95 rounded-3xl p-6 mb-6 max-w-md w-full shadow-2xl">
            <p className="text-xl font-black text-gray-900 mb-4">A není divu:</p>
            
            <div className="space-y-3">
              <div className="bg-red-50 rounded-xl p-3 border-l-4 border-red-500 text-left">
                <p className="text-base font-bold text-red-600">❌ Business Model Canvas</p>
                <p className="text-sm text-gray-600">= složitý (9 bloků, teorie)</p>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-3 border-l-4 border-orange-500 text-left">
                <p className="text-base font-bold text-orange-600">❌ Konzultanti</p>
                <p className="text-sm text-gray-600">= 15.000 Kč za jeden call</p>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-3 border-l-4 border-yellow-500 text-left">
                <p className="text-base font-bold text-yellow-700">❌ MBA programy</p>
                <p className="text-sm text-gray-600">= 200.000 Kč + 2 roky</p>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 mt-4">
                <p className="text-xl font-black text-white">
                  Výsledek?<br/>
                  <span className="text-red-400">Podnikáš naslepo.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <p className="text-2xl font-black text-white mb-4">
              CO KDYBY EXISTOVAL<br/>JEDNODUCHÝ SYSTÉM?
            </p>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 space-y-2 text-white">
              <p className="text-xl font-bold">✓ Jeden list papíru</p>
              <p className="text-xl font-bold">✓ 90 minut</p>
              <p className="text-xl font-bold">✓ Celý byznys model</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="space-y-3 w-full max-w-md">
          <div className="bg-white text-black px-8 py-5 rounded-2xl shadow-2xl">
            <p className="text-3xl font-black">PODNIKATELSKÁ</p>
            <p className="text-3xl font-black">ČTVRTKA</p>
            <p className="text-base font-bold text-gray-600 mt-1">První funkční model pro ČR</p>
          </div>
          
          <p className="text-yellow-300 text-xl font-bold">
            🔥 Sleva 50% jen pro prvních 50
          </p>
          
          <p className="text-white/80 text-sm">
            Swipe Up → Chci mít model
          </p>
        </div>
      </div>
    ),
    copy: {
      primary: `⚠️ JSI PODNIKATEL?

99% podnikatelů v ČR nemá model podnikání.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

A není divu:

❌ Business Model Canvas = složitý (9 bloků, teorie)
❌ Konzultanti = 15.000 Kč za jeden call
❌ MBA programy = 200.000 Kč + 2 roky

Výsledek? Podnikáš naslepo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO KDYBY existoval JEDNODUCHÝ systém?

Jeden list papíru.
90 minut.
Celý byznys model.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA
= První funkční model pro české podnikatele

✅ 90 minut práce
✅ Interaktivní systém (ne teorie)
✅ Víš přesně co dělat

Máš e-shop, kavárnu, služby, freelance?
→ Za 90 minut budeš mít jasno.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔥 Sleva 50% jen pro prvních 50 podnikatelů

👉 www.podnikatelskactvrtka.cz?utm_content=matrix`,
      headline: '99% podnikatelů nemá model. Máš ty?',
      description: '90 minut. Přestaň podnikat naslepo.',
      cta: 'Chci mít model'
    }
  },

  // STORY #3: OPERATIVA (12h dřína)
  {
    id: 'operativa-stories',
    name: 'Stories #3: OPERATIVA',
    category: 'Overwork • System vs Chaos',
    content: (
      <div className="w-full h-full bg-gradient-to-b from-orange-900 via-red-900 to-black flex flex-col items-center justify-between text-center px-6 py-12">
        {/* Top qualifier */}
        <div className="bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg animate-pulse">
          <p className="text-2xl font-black">
            ⚠️ PODNIKÁŠ?
          </p>
        </div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
            PRACUJEŠ<br/>
            <span className="text-7xl text-red-400">12 HODIN</span><br/>
            DENNĚ?
          </h1>

          {/* Pain points - simplified */}
          <div className="bg-white/95 rounded-3xl p-6 mb-6 max-w-md w-full shadow-2xl">
            <div className="space-y-4">
              <div className="text-left">
                <p className="text-lg text-gray-600 leading-snug">
                  Reklamy • Instagram • E-maily<br/>
                  Účetnictví • Objednávky...
                </p>
              </div>
              
              <div className="bg-red-50 rounded-xl p-4 border-2 border-red-500">
                <p className="text-2xl font-black text-red-600">
                  NESTÍHÁŠ.<br/>
                  Tržby stejné.
                </p>
              </div>

              <div className="h-px bg-gray-300"></div>

              <div className="text-left">
                <p className="text-xl font-black text-gray-900 mb-2">PROBLÉM:</p>
                <p className="text-lg text-gray-700">
                  Pracuješ <span className="text-red-600 font-bold">V</span> byznysu.<br/>
                  Ne <span className="text-green-600 font-bold">NA</span> byznysu.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-3 border-l-4 border-yellow-500">
                <p className="text-base font-bold text-gray-900">
                  = Jsi zaměstnanec<br/>vlastního byznysu
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <p className="text-2xl font-black text-white mb-4">
              ZA 90 MINUT<br/>MÍT SYSTÉM?
            </p>
            
            <div className="text-white text-lg space-y-2">
              <p className="font-bold">✓ Víš co dělat PRO výdělek</p>
              <p className="font-bold">✓ Víš co delegovat</p>
              <p className="font-bold">✓ Víš jak škálovat</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="space-y-3 w-full max-w-md">
          <div className="bg-white text-black px-8 py-5 rounded-2xl shadow-2xl">
            <p className="text-3xl font-black">PODNIKATELSKÁ</p>
            <p className="text-3xl font-black">ČTVRTKA</p>
          </div>
          
          <p className="text-yellow-300 text-xl font-bold">
            🔥 Sleva 50% jen pro prvních 50
          </p>
          
          <p className="text-white/80 text-sm">
            Swipe Up → Systém místo dřiny
          </p>
        </div>
      </div>
    ),
    copy: {
      primary: `⚠️ PODNIKÁŠ? A pracuješ 12 hodin denně?

Reklamy • Instagram • E-maily • Účetnictví • Objednávky...

Nestíháš. A tržby stejné.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLÉM:

Pracuješ V byznysu.
Ne NA byznysu.

❌ Nemáš čas na strategii
❌ Nemáš systém
❌ Jen operativa

Výsledek? Jsi zaměstnanec vlastního byznysu.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO KDYBY za 90 minut měl/a SYSTÉM?

✅ Víš co dělat PRO výdělek (ne jen operativu)
✅ Víš co delegovat (co je zbytečné)
✅ Víš jak škálovat (ne jen dřít)
✅ Máš jasný plán (místo chaosu)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA
= Systém místo operativy

90 minut • Celý byznys model
→ Přestaneš dřít. Začneš řídit.

Máš e-shop, kavárnu, služby, freelance?
Za 90 minut budeš vědět CO DĚLAT.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔥 Sleva 50% jen pro prvních 50 podnikatelů

👉 www.podnikatelskactvrtka.cz?utm_content=operativa`,
      headline: 'Pracuješ 12h denně? Máš systém?',
      description: 'Systém místo dřiny. 90 minut.',
      cta: 'Chci systém místo dřiny'
    }
  }
];

export default function StoriesAds() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentAd = storiesAds[currentIndex];
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : storiesAds.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < storiesAds.length - 1 ? prev + 1 : 0));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} zkopírován!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-3">
            📱 STORIES ADS (9:16)
          </h1>
          <p className="text-xl text-gray-300">
            Pro Instagram Stories a Facebook Stories
          </p>
          <p className="text-lg text-purple-300 mt-2">
            {storiesAds.length} laserově zacílené reklamy
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={handlePrev}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="text-center">
            <p className="text-white text-lg font-bold">
              {currentIndex + 1} / {storiesAds.length}
            </p>
            <p className="text-purple-300 text-sm">{currentAd.name}</p>
          </div>

          <button
            onClick={handleNext}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Preview (9:16 ratio) */}
          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-black text-white">{currentAd.name}</h2>
                  <p className="text-sm text-purple-300">{currentAd.category}</p>
                </div>
              </div>

              {/* 9:16 Preview Container */}
              <div className="bg-black rounded-3xl p-4 shadow-2xl">
                <div 
                  ref={previewRef}
                  className="relative mx-auto overflow-hidden rounded-2xl shadow-2xl"
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    aspectRatio: '9/16'
                  }}
                >
                  {currentAd.content}
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">
                  Format: 1080x1920px (9:16) • Stories optimalizováno
                </p>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div className="space-y-4">
            {/* Primary Text */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Primary Text</h3>
                <button
                  onClick={() => copyToClipboard(currentAd.copy.primary, 'Primary text')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-bold transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="bg-black/40 rounded-xl p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {currentAd.copy.primary}
                </pre>
              </div>
            </div>

            {/* Headline */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Headline</h3>
                <button
                  onClick={() => copyToClipboard(currentAd.copy.headline, 'Headline')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-bold transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-gray-300">{currentAd.copy.headline}</p>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Description</h3>
                <button
                  onClick={() => copyToClipboard(currentAd.copy.description, 'Description')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-bold transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-gray-300">{currentAd.copy.description}</p>
            </div>

            {/* CTA */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">CTA Button</h3>
                <button
                  onClick={() => copyToClipboard(currentAd.copy.cta, 'CTA')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-bold transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-gray-300">{currentAd.copy.cta}</p>
            </div>

            {/* Copy All */}
            <button
              onClick={() => {
                const allCopy = `PRIMARY TEXT:\n${currentAd.copy.primary}\n\nHEADLINE:\n${currentAd.copy.headline}\n\nDESCRIPTION:\n${currentAd.copy.description}\n\nCTA:\n${currentAd.copy.cta}`;
                copyToClipboard(allCopy, 'Celý copy');
              }}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-black text-lg transition-all shadow-lg"
            >
              📋 COPY VEŠKERÝ TEXT
            </button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {storiesAds.map((ad, index) => (
            <button
              key={ad.id}
              onClick={() => setCurrentIndex(index)}
              className={`p-4 rounded-xl transition-all ${
                currentIndex === index
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <p className="font-bold">{ad.name}</p>
              <p className="text-sm opacity-80">{ad.category}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}