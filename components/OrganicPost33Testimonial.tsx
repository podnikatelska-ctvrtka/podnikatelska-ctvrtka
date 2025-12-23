import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function OrganicPost33Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "PŘED KURZEM",
      icon: "❌",
      color: "red",
      items: [
        { text: '"Doufám že to vyjde"', emoji: "🤞" },
        { text: 'Target: "Majitelé psů" (příliš široké)', emoji: "🌍" },
        { text: 'Nevěděl kolik kusů musí prodat', emoji: "❓" }
      ]
    },
    {
      title: "PO KURZU (90 minut)",
      icon: "✅",
      color: "green",
      items: [
        { text: 'Segment: Majitelé středních plemen 25-45 let (230k lidí v ČR)', emoji: "🎯" },
        { text: 'Realistický cíl: 180 zákazníků/měsíc', emoji: "📊" },
        { text: 'Marže: 34% = 23k zisk/měsíc', emoji: "💰" },
        { text: 'CAC kalkulace: 145 Kč/zákazník', emoji: "📈" }
      ]
    },
    {
      title: "VÝSLEDEK",
      icon: "💬",
      color: "blue",
      quote: true,
      items: [
        { text: '"Konečně vím ČÍM začít. Konec zkoušení, reálná čísla."', author: "— Matěj (29), E-shop s doplňky pro psy" }
      ]
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            📊 OD NÁPADU K ČÍSLŮM
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Matěj měl nápad.<br/>Po 90 minutách měl ČÍSLA.
          </h2>
          <p className="text-slate-300 text-lg">
            E-shop s doplňky pro psy • 29 let • Praha
          </p>
        </div>

        {/* Carousel */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Slides */}
          <div className="relative h-[500px] md:h-[550px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="h-full flex flex-col items-center justify-center p-8 md:p-12">
                  {/* Icon */}
                  <div className={`text-7xl md:text-8xl mb-6 ${
                    slide.color === 'red' ? 'animate-pulse' : ''
                  }`}>
                    {slide.icon}
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl md:text-3xl font-black mb-8 ${
                    slide.color === 'red' ? 'text-red-600' :
                    slide.color === 'green' ? 'text-green-600' :
                    'text-indigo-600'
                  }`}>
                    {slide.title}
                  </h3>

                  {/* Content */}
                  {slide.quote ? (
                    <div className="space-y-6 max-w-lg">
                      <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed text-center italic">
                        {slide.items[0].text}
                      </p>
                      {slide.items[0].author && (
                        <p className="text-lg text-gray-600 text-center">
                          {slide.items[0].author}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4 w-full max-w-lg">
                      {slide.items.map((item, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-300 ${
                            slide.color === 'red' ? 'bg-red-50' : 'bg-green-50'
                          }`}
                          style={{
                            animationDelay: `${i * 150}ms`,
                            opacity: index === currentSlide ? 1 : 0,
                            transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.5s ease-out ${i * 150}ms`
                          }}
                        >
                          <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                          <p className={`text-base md:text-lg font-semibold ${
                            slide.color === 'red' ? 'text-red-900' : 'text-green-900'
                          }`}>
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-indigo-600'
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
            <p className="text-white text-lg mb-4">
              👉 <span className="font-bold">podnikatelskactvrtka.cz</span>
            </p>
            <p className="text-slate-300 text-sm">
              Online kurz • 4 999 Kč • 90 minut
            </p>
          </div>
        </div>

        {/* Hashtags */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['#podnikani', '#socialproof', '#realdata', '#eshop'].map((tag) => (
            <span key={tag} className="text-slate-400 text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}