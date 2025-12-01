// 🎯 VALUE AD #3: ACHIEVE - Carousel (4 slidy)
// "Chci víc peněz z podnikání" → systém → efektivita → růst bez vyhoření

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ValueAchieveCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12 relative">
          {/* BADGE nahoře */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-blue-400 text-white px-6 py-2 rounded-full shadow-xl border-2 border-blue-500">
              <p className="font-black text-lg">
                🌟 TVOJE BUDOUCNOST
              </p>
            </div>
          </div>

          <h1 className="text-7xl font-black text-white mb-8 mt-24 leading-tight drop-shadow-2xl">
            CHCEŠ VÍC PENĚZ<br/>
            Z PODNIKÁNÍ?
          </h1>

          <div className="bg-white/95 rounded-2xl p-8 mb-8 max-w-3xl shadow-2xl">
            <p className="text-4xl font-black text-gray-900 mb-4">
              Máme pro tebe řešení.
            </p>
            <p className="text-2xl text-gray-700">
              Ne víc práce.<br/>
              Ne víc stresu.<br/>
              <span className="text-blue-600 font-black text-3xl">VÍCEJ SYSTÉMU.</span>
            </p>
          </div>

          <div className="flex items-center gap-4 animate-pulse">
            <p className="text-white text-3xl font-black">
              Swipe →
            </p>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ChevronRight className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12">
          <div className="text-8xl mb-6">⏰</div>

          <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            SYSTÉM<br/>
            CO FUNGUJE<br/>
            <span className="text-yellow-300">I BEZ TEBE</span>
          </h1>

          <div className="bg-white/95 rounded-2xl p-8 max-w-3xl w-full shadow-2xl">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
                <span className="text-4xl">❌</span>
                <div>
                  <p className="text-2xl font-black text-red-700">12h denně v operativě</p>
                  <p className="text-lg text-gray-600">Každý problém řešíš TY</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                <span className="text-4xl">✅</span>
                <div>
                  <p className="text-2xl font-black text-green-700">Dovolená BEZ stresu</p>
                  <p className="text-lg text-gray-600">Byznys funguje i bez tebe</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <p className="text-white text-2xl font-black">Swipe →</p>
            <ChevronRight className="w-8 h-8 text-white" />
          </div>
        </div>
      )
    },
    {
      id: 3,
      gradient: 'from-orange-600 via-red-600 to-rose-600',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12">
          <div className="text-8xl mb-6">💰</div>

          <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            2X PŘÍJMY<br/>
            PŘI <span className="text-yellow-300">1/2 ČASU</span>
          </h1>

          <div className="bg-white/95 rounded-2xl p-8 max-w-3xl w-full shadow-2xl">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
                <span className="text-4xl">❌</span>
                <div>
                  <p className="text-2xl font-black text-red-700">Více práce = více peněz</p>
                  <p className="text-lg text-gray-600">Heroické úsilí není řešení</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                <span className="text-4xl">✅</span>
                <div>
                  <p className="text-2xl font-black text-green-700">Efektivita {'>'} heroismus</p>
                  <p className="text-lg text-gray-600">Systém místo heroického úsilí</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <p className="text-white text-2xl font-black">Swipe →</p>
            <ChevronRight className="w-8 h-8 text-white" />
          </div>
        </div>
      )
    },
    {
      id: 4,
      gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12">
          <div className="text-8xl mb-6">🚀</div>

          <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            RŮST<br/>
            <span className="text-yellow-300">BEZ VYHOŘENÍ</span>
          </h1>

          <div className="bg-white/95 rounded-2xl p-8 max-w-3xl w-full shadow-2xl mb-8">
            <p className="text-3xl font-black text-gray-900 mb-6">
              Model podnikání =
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-3xl">💰</span>
                <p className="text-2xl font-bold text-green-700">Peníze</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-3xl">🗽</span>
                <p className="text-2xl font-bold text-blue-700">Svoboda</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-3xl">⚡</span>
                <p className="text-2xl font-bold text-purple-700">Energie</p>
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 mt-6">
              SOUČASNĚ
            </p>
          </div>

          <div className="bg-yellow-400 text-black rounded-2xl px-12 py-6 mb-6 shadow-2xl">
            <p className="text-4xl font-black mb-2">PODNIKATELSKÁ ČTVRTKA</p>
            <p className="text-xl font-bold">90 minut • Celý model podnikání</p>
          </div>

          <div className="bg-white/90 text-black px-12 py-5 rounded-2xl shadow-2xl">
            <p className="text-3xl font-black">Chci vědět víc →</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  return (
    <div className="relative w-full h-full">
      {/* Carousel container */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-out ${
              index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
            style={{
              background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
            }}
            onClick={() => setIsAutoPlaying(false)}
          >
            <div className={`w-full h-full bg-gradient-to-br ${slide.gradient}`}>
              {slide.content}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsAutoPlaying(false);
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-4 transition-all"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsAutoPlaying(false);
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-4 transition-all"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setIsAutoPlaying(false);
              setCurrentSlide(index);
            }}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-12 bg-white' 
                : 'w-3 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute top-6 right-6 z-20 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
          <p className="text-white text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Auto-play
          </p>
        </div>
      )}
    </div>
  );
}

// Export metadata pro použití v Ultimate10Ads nebo samostatně
export const valueAchieveCarouselMetadata = {
  id: 'value-achieve-carousel',
  name: 'VALUE #3: ACHIEVE',
  type: 'value',
  format: 'carousel',
  slides: 4,
  category: 'Desire • Aspiration • Hope',
  budget: '20 Kč/den',
  objective: 'ENGAGEMENT',
  trigger: 'Aspiration • Better future • Freedom',
  copy: {
    primary: `CHCEŠ VÍC PENĚZ Z PODNIKÁNÍ?

Máme pro tebe řešení.

Ne víc práce.
Ne víc stresu.
VÍCE SYSTÉMU.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ SYSTÉM CO FUNGUJE I BEZ TEBE

❌ 12h denně v operativě
❌ Každý problém řešíš TY
❌ Dovolená = ztráta příjmů

✅ Byznys funguje i bez tebe
✅ Systém místo heroického úsilí
✅ Dovolená BEZ stresu

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 2X PŘÍJMY PŘI 1/2 ČASU

❌ Více práce = více peněz (heroismus)
✅ Efektivita > heroismus (systém)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 RŮST BEZ VYHOŘENÍ

Model podnikání =
💰 Peníze
🗽 Svoboda
⚡ Energie

SOUČASNĚ

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA
90 minut • Hotový plán • 4.999 Kč

🔥 Prvních 50 • Sleva 40%`,
    headline: 'Systém místo heroického úsilí',
    cta: 'Chci to'
  }
};