// 🎯 VALUE AD #3: EDUCATION - Carousel (3 slidy)
// "Jak na úspěšný byznys?" → 3 kroky → "Je to easy - dokážeš to"

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Value3EducationCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      gradient: 'from-indigo-900 via-purple-900 to-blue-900',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12 relative">
          {/* Animované pozadí */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          
          {/* Icon */}
          <div className="text-8xl mb-6 z-10">💡</div>

          {/* Headline */}
          <h1 className="text-7xl font-black text-white mb-8 leading-tight drop-shadow-lg z-10">
            Jak na úspěšný<br/>
            byznys?
          </h1>

          <div className="bg-white/95 rounded-3xl p-10 mb-8 max-w-3xl shadow-2xl z-10">
            <p className="text-3xl font-black text-gray-900 mb-4">
              Není to žádná věda
            </p>
            <p className="text-2xl text-gray-700 mb-2">
              Prostě musíš vědět:
            </p>
            <p className="text-3xl font-black text-purple-600">
              KDO • CO • JAK
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
      gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12 relative">
          {/* Animované pozadí */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 blur-3xl" />

          <h1 className="text-6xl font-black text-white mb-8 leading-tight drop-shadow-lg z-10">
            3 jednoduché kroky
          </h1>

          {/* 3 KROKY */}
          <div className="space-y-5 w-full max-w-3xl mb-6 z-10">
            
            {/* KROK 1 */}
            <div className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-blue-400/70">
              <div className="bg-blue-400 text-gray-900 px-5 py-1 rounded-full shadow-xl border-2 border-blue-500 mb-3 inline-block">
                <p className="font-black text-lg">KROK 1</p>
              </div>
              <p className="text-3xl font-black text-white leading-tight mb-2">
                Musíš vědět <span className="text-cyan-300">NA KOHO</span> cílíš
              </p>
              <p className="text-xl text-cyan-100">
                → Ne "všichni" ale konkrétní člověk
              </p>
            </div>

            {/* KROK 2 */}
            <div className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-purple-400/70">
              <div className="bg-purple-400 text-gray-900 px-5 py-1 rounded-full shadow-xl border-2 border-purple-500 mb-3 inline-block">
                <p className="font-black text-lg">KROK 2</p>
              </div>
              <p className="text-3xl font-black text-white leading-tight mb-2">
                Musíš vědět <span className="text-pink-300">CO</span> jim nabídneš
              </p>
              <p className="text-xl text-pink-100">
                → Ne "to co mají rádi" ale konkrétní řešení
              </p>
            </div>

            {/* KROK 3 */}
            <div className="bg-gradient-to-br from-green-600/90 to-emerald-600/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-green-400/70">
              <div className="bg-green-400 text-gray-900 px-5 py-1 rounded-full shadow-xl border-2 border-green-500 mb-3 inline-block">
                <p className="font-black text-lg">KROK 3</p>
              </div>
              <p className="text-3xl font-black text-white leading-tight mb-2">
                Musíš vědět <span className="text-green-300">JAK</span> se k tobě dostanou
              </p>
              <p className="text-xl text-green-100">
                → Ne "snad mě najdou" ale jasná cesta
              </p>
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
      gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12 relative">
          {/* Animované pozadí */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="text-8xl mb-8 z-10">✨</div>

          <h1 className="text-7xl font-black text-white mb-10 leading-tight drop-shadow-lg z-10">
            DOKÁŽEŠ TO
          </h1>

          {/* Main white box */}
          <div className="bg-white/95 rounded-3xl p-10 mb-8 max-w-3xl shadow-2xl z-10">
            <p className="text-3xl font-black text-gray-900 mb-6">
              Žádné odborné termíny.<br/>
              Žádné složité mapy.<br/>
              Žádné zmatenosti.
            </p>
            
            <p className="text-2xl text-gray-700 mb-2">
              Prostě si odpovíš:
            </p>
            
            <div className="space-y-3 mb-6">
              <p className="text-2xl font-black text-blue-600">→ NA KOHO cílím?</p>
              <p className="text-2xl font-black text-purple-600">→ CO jim nabídnu?</p>
              <p className="text-2xl font-black text-green-600">→ JAK se ke mně dostanou?</p>
            </div>

            <p className="text-3xl font-black text-purple-600">
              A MÁŠ JASNO. 💡
            </p>
          </div>

          {/* CTA boxes */}
          <div className="flex gap-4 z-10">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl px-8 py-4 shadow-xl">
              <p className="text-2xl font-black text-white">CHCI TO ZKUSIT</p>
            </div>
            <div className="bg-white/90 rounded-2xl px-8 py-4 shadow-xl border-4 border-white">
              <p className="text-2xl font-black text-gray-900">JAK TO FUNGUJE?</p>
            </div>
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