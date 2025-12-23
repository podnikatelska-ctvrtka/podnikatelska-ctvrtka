import { useState, useEffect } from 'react';
import { Heart, TrendingDown, TrendingUp, Lightbulb } from 'lucide-react';

export function OrganicPost38FounderStory() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      year: "2018",
      title: "Můj první byznys",
      icon: "💔",
      color: "red",
      type: "failure",
      content: [
        "Investoval jsem 300k do produktu",
        "NETESTOVAL jsem nic",
        '"Všichni to budou chtít," myslel jsem'
      ]
    },
    {
      year: "2018",
      title: "Co jsem NEVĚDĚL",
      icon: "❌",
      color: "orange",
      type: "mistakes",
      content: [
        "Kdo je můj zákazník",
        "Kolik jich potřebuju",
        "Jestli vůbec existuje problém"
      ]
    },
    {
      year: "2018",
      title: "Výsledek?",
      icon: "💸",
      color: "red",
      type: "result",
      stats: [
        { label: "Čas", value: "6 měsíců práce" },
        { label: "Peníze", value: "300k pryč" },
        { label: "Zákazníci", value: "0" }
      ]
    },
    {
      year: "2019",
      title: "Objevil jsem Model podnikání",
      icon: "💡",
      color: "yellow",
      type: "discovery",
      content: [
        "Definoval segment",
        "Otestoval hodnotu",
        "Spočítal čísla",
        "Validoval PŘED investicí"
      ]
    },
    {
      year: "2019",
      title: "Druhý byznys?",
      icon: "✅",
      color: "green",
      type: "success",
      result: "Úspěch."
    },
    {
      year: "2024",
      title: "Proto existuje Čtvrtka",
      icon: "❤️",
      color: "indigo",
      type: "mission",
      content: [
        "Abys nemusel udělat stejné chyby",
        "Abys netopil 300k",
        "Abys měl JASNO od začátku"
      ]
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            💙 FOUNDER STORY
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Proč jsem postavil Čtvrtku?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300">
            Protože jsem udělal <span className="text-red-400 font-bold">VŠECHNY chyby</span>.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Slides */}
          <div className="relative min-h-[500px] md:min-h-[550px]">
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
                  {/* Year Badge */}
                  <div className={`px-4 py-1.5 rounded-full text-sm font-bold mb-6 ${
                    slide.color === 'red' ? 'bg-red-100 text-red-700' :
                    slide.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    slide.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                    slide.color === 'green' ? 'bg-green-100 text-green-700' :
                    'bg-indigo-100 text-indigo-700'
                  }`}>
                    {slide.year}
                  </div>

                  {/* Icon */}
                  <div className="text-7xl md:text-8xl mb-6">
                    {slide.icon}
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl md:text-3xl font-black mb-8 text-center ${
                    slide.color === 'red' ? 'text-red-600' :
                    slide.color === 'orange' ? 'text-orange-600' :
                    slide.color === 'yellow' ? 'text-yellow-600' :
                    slide.color === 'green' ? 'text-green-600' :
                    'text-indigo-600'
                  }`}>
                    {slide.title}
                  </h3>

                  {/* Content */}
                  {slide.content && (
                    <div className="space-y-3 w-full max-w-lg">
                      {slide.content.map((item, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3 p-4 rounded-xl ${
                            slide.type === 'failure' || slide.type === 'mistakes'
                              ? 'bg-red-50'
                              : slide.type === 'discovery'
                              ? 'bg-yellow-50'
                              : 'bg-indigo-50'
                          }`}
                          style={{
                            opacity: index === currentSlide ? 1 : 0,
                            transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.5s ease-out ${i * 150}ms`
                          }}
                        >
                          <span className="text-xl flex-shrink-0">
                            {slide.type === 'failure' || slide.type === 'mistakes' ? '❌' :
                             slide.type === 'discovery' ? '✓' :
                             '💙'}
                          </span>
                          <p className={`font-bold ${
                            slide.type === 'failure' || slide.type === 'mistakes'
                              ? 'text-red-900'
                              : slide.type === 'discovery'
                              ? 'text-yellow-900'
                              : 'text-indigo-900'
                          }`}>
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  {slide.stats && (
                    <div className="space-y-4 w-full max-w-lg">
                      {slide.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-5 bg-red-50 rounded-xl border-2 border-red-200"
                          style={{
                            opacity: index === currentSlide ? 1 : 0,
                            transform: index === currentSlide ? 'translateX(0)' : 'translateX(-20px)',
                            transition: `all 0.5s ease-out ${i * 150}ms`
                          }}
                        >
                          <span className="text-gray-700 font-bold">{stat.label}:</span>
                          <span className="text-2xl font-black text-red-600">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Success Result */}
                  {slide.result && (
                    <div className="p-8 bg-green-50 rounded-2xl border-4 border-green-500">
                      <p className="text-4xl md:text-5xl font-black text-green-600 text-center">
                        {slide.result}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

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

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-10 text-center shadow-2xl mb-8">
          <p className="text-2xl md:text-3xl text-white font-black mb-6">
            Není to o penězích.
          </p>
          <p className="text-xl md:text-2xl text-white font-bold">
            Je to o tom NEUDĚLAT moje chyby.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border-2 border-white/20">
          <p className="text-white text-lg mb-2">
            👉 <span className="font-bold text-2xl">podnikatelskactvrtka.cz</span>
          </p>
          <p className="text-slate-300 text-sm">
            Online kurz • 90 minut • 4 999 Kč
          </p>
        </div>

        {/* Hashtags */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['#podnikani', '#story', '#validace', '#learnfrommistakes'].map((tag) => (
            <span key={tag} className="text-slate-400 text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
