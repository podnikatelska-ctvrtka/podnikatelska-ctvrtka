import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, Dumbbell, Wrench, Scissors, Pizza } from 'lucide-react';

export function SwipeableTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Petra Svobodová",
      business: "Fitness trenérka, Praha",
      businessType: "🏋️ Fitness trenérka",
      doubt: "Bála jsem se začít s online businessem – myslela jsem, že jako mamka s nadváhou nemám kredibilitu...",
      text: "Cvičila jsem s různými lidmi, ale po porodu jsem sama bojovala s nadváhou a pocitem, že už nikdy nebudu fit. Čtvrtka mi ukázala, že právě tohle je má síla - začala jsem otevřeně sdílet svůj příběh a zaměřila se čistě jen na maminky po porodu. Důvěřují mi, protože vědí, že jsem si tím prošla.",
      insight: "Zjistila jsem, že osobní zkušenost má větší hodnotu než jakékoli certifikáty",
      result: "Za 3 měsíce: 120 prodaných ebooků 'Fit maminka' a 35 pravidelných klientek na lekcích",
      initials: "PS",
      icon: Dumbbell,
      gradient: "from-blue-500 to-blue-700"
    },
    {
      name: "Martin Novák", 
      business: "Autoservis Novák, Brno",
      businessType: "🔧 Autoservis",
      doubt: "Myslel jsem, že zákazníky zajímá jen nejnižší cena a že komunikace je ztráta času...",
      text: "Dřív jsem myslel, že je to jen o tom opravit auto a inkasovat. Čtvrtka mi ukázala, že zákazníci chtějí hlavně splnit termín a vědět, co se děje. Začal jsem posílat SMS: 'Auto máme, našli jsme problém XY, oprava bude XY Kč, hotovo zítra do 15h' + večer update o postupu.",
      insight: "Pochopil jsem, že prodávám spolehlivost a klid, ne jen opravu",
      result: "Během půl roku: 80% zákazníků se vrací a aktivně mě doporučují dál",
      initials: "MN",
      icon: Wrench,
      gradient: "from-emerald-500 to-emerald-700"
    },
    {
      name: "Jana Horáková",
      business: "Studio Petra, Ostrava",
      businessType: "✂️ Kadeřnictví", 
      doubt: "Nevěřila jsem, že můžu prodávat něco jiného než stříhání – vždyť jsem 'jen' kadeřnice...",
      text: "Zákaznice se mě pořád ptaly, jaký kondicionér používám, že mají po mně vlasy úžasné. Čtvrtka mi ukázala, že tady je obchodní příležitost. Začala jsem vyrábět vlastní řadu vlasové kosmetiky.",
      insight: "Uvědomila jsem si, že můžu monetizovat know-how, které už mám",
      result: "Za 4 měsíce: 10k Kč měsíčně navíc k základním službám - bez extra práce",
      initials: "JH",
      icon: Scissors,
      gradient: "from-purple-500 to-purple-700"
    },
    {
      name: "Lukáš Kořínek",
      business: "Pizzeria Ristorante, Brno",
      businessType: "🍕 Pizzeria",
      doubt: "Bál jsem se konkurence – ve městě už byly 3 pizzerie s cenou 150 Kč. Jak mám uspět?",
      text: "Myslel jsem, že musím jít ještě levněji. Čtvrtka mi ukázala, že můžu jít na kvalitu - domací těsto, čerstvé suroviny z trhu, garantovaný rozvoz do 30 minut. Zákazníci oceňují rychlost a chuť, ne nejnižší cenu.",
      insight: "Zjistil jsem, že nemusím bojovat cenou, ale můžu vytvořit jinou hodnotu",
      result: "Po 2 měsících: prodávám pizzu za 180 Kč a mám 3x více objednávek než konkurence",
      initials: "LK",
      icon: Pizza,
      gradient: "from-orange-500 to-orange-700"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevTestimonial();
    } else if (info.offset.x < -threshold) {
      nextTestimonial();
    }
  };

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-gray-50 to-white" data-section="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="text-lg">💬</span>
            <span>Příběhy z praxe</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl text-gray-900 max-w-4xl mx-auto font-black leading-tight">
            Jejich <span className="text-primary font-black">"aha!" moment</span> změnil všechno
          </h2>
        </motion.div>

        {/* Desktop Layout - Timeline Style */}
        <div className="hidden md:block">
          <div>
            {testimonials.map((testimonial, index) => {
              const Icon = testimonial.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index}>
                  <motion.div
                    className={`flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.2 }}
                  >
                  {/* Quote Side */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className={`absolute -top-6 ${isEven ? '-left-6' : '-right-6'} w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-25 flex items-center justify-center`}>
                        <Quote className={`w-10 h-10 bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent opacity-100`} style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                      </div>
                      
                      {/* Doubt - compact element */}
                      <div className="flex items-start gap-2 mb-3 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                        <span className="text-base mt-0.5">💭</span>
                        <p className="text-sm text-gray-600 italic leading-relaxed">
                          {testimonial.doubt}
                        </p>
                      </div>
                      
                      <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </blockquote>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center shadow-lg ring-2 ring-white`}>
                        <span className="text-white font-semibold text-lg">{testimonial.initials}</span>
                      </div>
                      <div>
                        <div className="flex gap-0.5 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.business}</div>
                      </div>
                    </div>
                  </div>

                  {/* Center Icon - hidden on mobile */}
                  <div className="hidden lg:flex flex-shrink-0">
                    <div className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center shadow-2xl ring-4 ring-white`}>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonial.gradient} blur-xl opacity-40 animate-pulse`}></div>
                      <Icon className="w-10 h-10 text-white relative z-10" />
                    </div>
                  </div>

                  {/* Result Side */}
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">💡</span>
                          <h4 className="font-semibold text-gray-900">"Aha!" moment</h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{testimonial.insight}</p>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🎯</span>
                          <h4 className="font-semibold text-gray-900">Co se změnilo</h4>
                        </div>
                        <p className="text-gray-800 leading-relaxed font-medium">
                          {testimonial.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Spojovací čára mezi testimonials - ne po posledním */}
                {index < testimonials.length - 1 && (
                  <div className="hidden lg:flex justify-center my-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-blue-300 via-blue-200 to-transparent rounded-full"></div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
                className="px-2"
              >
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                {(() => {
                  const testimonial = testimonials[currentIndex];
                  const Icon = testimonial.icon;
                  
                  return (
                    <>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center shadow-lg ring-2 ring-white`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="flex gap-0.5 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.business}</div>
                        </div>
                      </div>

                      {/* Doubt - compact element */}
                      <div className="flex items-start gap-2 mb-4 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                        <span className="text-sm mt-0.5">💭</span>
                        <p className="text-xs text-gray-600 italic leading-relaxed">
                          {testimonial.doubt}
                        </p>
                      </div>
                      
                      <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </blockquote>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">💡</span>
                            <h4 className="font-semibold text-gray-900">"Aha!" moment</h4>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{testimonial.insight}</p>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🎯</span>
                            <h4 className="font-semibold text-gray-900">Co se změnilo</h4>
                          </div>
                          <p className="text-sm text-gray-800 leading-relaxed font-medium">
                            {testimonial.result}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}