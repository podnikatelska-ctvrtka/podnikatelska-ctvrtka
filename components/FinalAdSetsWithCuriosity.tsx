// 🎯 ALTERNATIVNÍ AD SETY - S AD #7 (CURIOSITY) MÍSTO PROBLEM
// Pro ty co preferují curiosity hook místo pain point

import { AdSet2Value, AdSet3SocialProof } from './FinalAdSets';

// 🔍 AD SET 1 ALT: CURIOSITY HOOK (místo Problem-Focused)
export function AdSet1Curiosity() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center p-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl" />
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Hook question */}
        <div className="mb-8">
          <div className="text-yellow-300 text-5xl font-black mb-4 leading-tight">
            Proč někteří podnikatelé
          </div>
          <div className="text-white text-5xl font-black leading-tight">
            mají fungující byznys...
          </div>
          <div className="text-gray-300 text-4xl font-bold mt-4 leading-tight">
            ...a jiní ne?
          </div>
        </div>
        
        {/* Answer tease */}
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 mb-8">
          <p className="text-white text-2xl font-bold mb-4 leading-relaxed">
            Není to o štěstí.<br/>
            Není to o penězích na reklamu.<br/>
            Není to o zkušenostech.
          </p>
          <p className="text-blue-300 text-4xl font-black">
            Je to o JASNÉM PLÁNU.
          </p>
        </div>
        
        {/* Solution intro */}
        <div className="mb-8">
          <p className="text-white text-2xl font-semibold mb-4">
            PODNIKATELSKÁ ČTVRTKA vás naučí:
          </p>
          <div className="space-y-2 text-left max-w-3xl mx-auto">
            <div className="flex items-start gap-3 text-white text-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <span className="font-semibold">Jasný obchodní model</span>
            </div>
            <div className="flex items-start gap-3 text-white text-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <span className="font-semibold">Přesné zacílení</span>
            </div>
            <div className="flex items-start gap-3 text-white text-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <span className="font-semibold">Fungující prodejní strategie</span>
            </div>
          </div>
        </div>
        
        {/* Průkopník CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-6">
          <p className="text-green-100 text-lg font-bold mb-2">PRŮKOPNICKÁ NABÍDKA</p>
          <p className="text-white text-3xl font-black mb-2">
            Prvních 50 lidí
          </p>
          <p className="text-white text-lg font-bold">
            🎁 Mini kurz ZDARMA + 💎 Konzultace ZDARMA
          </p>
        </div>
        
        {/* CTA button */}
        <button className="bg-white text-gray-900 px-10 py-5 rounded-xl text-2xl font-black shadow-2xl hover:scale-105 transition-transform mb-3">
          CHCI FUNGUJÍCÍ PLÁN! →
        </button>
        
        {/* Urgence */}
        <p className="text-yellow-300 text-base font-bold">
          ⚡ Limitovaná kapacita • Prvních 50 míst
        </p>
      </div>
    </div>
  );
}

// 🎯 SHOWCASE S CURIOSITY VARIANTOU
export function FinalAdSetsWithCuriosityShowcase() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          3 AD SETY - S CURIOSITY HOOKEM 🔍
        </h1>
        
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">📊 VARIANTA S AD #7 (CURIOSITY):</h2>
          <p className="text-lg text-blue-800 mb-4">
            Tato verze používá <strong>Curiosity hook</strong> ("Proč někteří...") místo Pain Point hooku ("Makám od rána...").
          </p>
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <p className="font-bold text-lg mb-2">Ad Set 1: CURIOSITY-FOCUSED</p>
            <p className="text-base">"Proč někteří mají fungující byznys... a jiní ne?"</p>
            <p className="text-sm text-gray-600 mt-2">→ Otázka → odpověď "Jasný plán", process-driven</p>
          </div>
        </div>
        
        <div className="space-y-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ad Set 1: Curiosity-Focused 🔍</h2>
            <p className="text-gray-600 mb-4 text-lg">Otázka → empatie → "Je to o jasném plánu"</p>
            <div className="inline-block shadow-2xl">
              <AdSet1Curiosity />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4">Ad Set 2: Value-Focused 💰</h2>
            <p className="text-gray-600 mb-4 text-lg">Exkluzivita + hodnota (stejná jako v hlavní verzi)</p>
            <div className="inline-block shadow-2xl">
              <AdSet2Value />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-4">Ad Set 3: Social Proof ✓</h2>
            <p className="text-gray-600 mb-4 text-lg">Konkrétní výsledky (stejná jako v hlavní verzi)</p>
            <div className="inline-block shadow-2xl">
              <AdSet3SocialProof />
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-purple-50 border-2 border-purple-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">🤔 KTEROU VERZI POUŽÍT?</h3>
          <div className="space-y-4 text-lg text-purple-800">
            <div>
              <p className="font-bold mb-2">CURIOSITY VARIANTA (tato verze):</p>
              <p className="ml-4">✅ Méně agresivní, více vzdělávací</p>
              <p className="ml-4">✅ Funguje pro warm audience</p>
              <p className="ml-4">✅ "Guru-free" vibe (jasný plán, ne systém)</p>
            </div>
            <div>
              <p className="font-bold mb-2">PROBLEM VARIANTA (hlavní verze):</p>
              <p className="ml-4">✅ Více emocionální, direct pain point</p>
              <p className="ml-4">✅ Funguje pro cold audience</p>
              <p className="ml-4">✅ Rychlejší empatie = vyšší CTR</p>
            </div>
            <div className="pt-4 border-t-2 border-purple-300">
              <p className="font-bold">💡 DOPORUČENÍ:</p>
              <p className="ml-4">Otestuj obě varianty! Ad Set 2 a 3 jsou stejné, jen Ad Set 1 je jiný.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
