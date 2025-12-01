// 🎯 VALUE AD #2: GAIN - Carousel (3 slidy)
// "Představ si za měsíc" → 4 gains → "Je to easy s modelem"

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Value2GainCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      gradient: 'from-slate-900 via-blue-900 to-indigo-900',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12 relative">
          {/* Animované pozadí */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          
          {/* Badge */}
          <div className="bg-cyan-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-cyan-500 mb-8 z-10">
            <p className="font-black text-xl">🚀 ZA MĚSÍC</p>
          </div>

          {/* Main Headline */}
          <h1 className="text-7xl font-black text-white mb-8 leading-tight drop-shadow-lg z-10">
            <span className="text-cyan-300">Představ si...</span>
          </h1>

          <div className="bg-white/95 rounded-3xl p-10 mb-8 max-w-3xl shadow-2xl z-10">
            <p className="text-4xl font-black text-gray-900 mb-4">
              Tvůj byznys funguje
            </p>
            <p className="text-2xl text-gray-700 mb-2">
              Ne že to jen "nějakběží"
            </p>
            <p className="text-3xl font-black text-blue-600">
              Ale SKUTEČNĚ funguje 💪
            </p>
          </div>

          <div className="flex items-center gap-4 animate-pulse z-10">
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
      gradient: 'from-indigo-900 via-purple-900 to-blue-900',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12 relative">
          {/* Animované pozadí */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

          <h1 className="text-6xl font-black text-white mb-8 leading-tight drop-shadow-lg z-10">
            Co to znamená?
          </h1>

          {/* 4 GAINS - Grid 2x2 */}
          <div className="grid grid-cols-2 gap-5 w-full max-w-3xl mb-6 z-10">
            <div className="bg-gradient-to-br from-green-600/90 to-emerald-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-green-400/70">
              <p className="text-5xl mb-2">💰</p>
              <p className="text-3xl font-black text-white mb-1">Víc tržeb</p>
              <p className="text-lg text-gray-100">Každý měsíc lepší čísla</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-blue-400/70">
              <p className="text-5xl mb-2">📞</p>
              <p className="text-3xl font-black text-white mb-1">Plný kalendář</p>
              <p className="text-lg text-gray-100">Zákazníci se hlásí sami</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-purple-400/70">
              <p className="text-5xl mb-2">⏰</p>
              <p className="text-3xl font-black text-white mb-1">Volný čas</p>
              <p className="text-lg text-gray-100">Nemusíš makat 24/7</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-600/90 to-orange-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-yellow-400/70">
              <p className="text-5xl mb-2">😌</p>
              <p className="text-3xl font-black text-white mb-1">Klidná hlava</p>
              <p className="text-lg text-gray-100">Můžeš plánovat budoucnost</p>
            </div>
          </div>

          <div className="flex items-center gap-4 z-10">
            <p className="text-white text-2xl font-black">Swipe →</p>
            <ChevronRight className="w-8 h-8 text-white" />
          </div>
        </div>
      )
    },
    {
      id: 3,
      gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12 relative">
          {/* Animované pozadí */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 blur-3xl" />

          <div className="text-8xl mb-6 z-10">💡</div>

          <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg z-10">
            Je to <span className="text-yellow-300">EASY</span>
          </h1>

          <div className="bg-white/95 rounded-2xl p-8 max-w-3xl w-full shadow-2xl mb-8 z-10">
            <p className="text-3xl font-black text-gray-900 mb-6">
              Potřebuješ jen správný model
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-3xl">✅</span>
                <p className="text-xl text-gray-800">Na koho cílíš</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-3xl">✅</span>
                <p className="text-xl text-gray-800">Co jim nabídneš</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-3xl">✅</span>
                <p className="text-xl text-gray-800">Jak se k tobě dostanou</p>
              </div>
            </div>
            <p className="text-2xl text-gray-600 mt-6 italic">
              (Není to rocket science 🚀)
            </p>
          </div>

          <div className="bg-yellow-400 text-black rounded-2xl px-12 py-6 mb-6 shadow-2xl z-10">
            <p className="text-4xl font-black mb-2">PODNIKATELSKÁ ČTVRTKA</p>
            <p className="text-xl font-bold">90 minut • Celý model podnikání</p>
          </div>

          <div className="bg-white/90 text-black px-12 py-5 rounded-2xl shadow-2xl z-10">
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
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
