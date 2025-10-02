import { motion } from "motion/react";


export function ProblemsSectionCompact() {
  const timelineSteps = [
    {
      time: "8:00",
      timeIcon: "☀️",
      title: "Ráno - Otevíráte podnik",
      problem: "Prázdná prodejna celé dopoledne",
      thought: "Zase prázdno... Kdy už se to změní?",
      description: "Čekáte na první zákazníky, ale telefon nezvonní, nikdo nejde kolem.",
      emotion: "😟",
      color: "red",
      stats: "7 z 10 malých podniků končí kvůli nedostatku zákazníků"
    },
    {
      time: "9:00",
      timeIcon: "🌤️",
      title: "Dopoledne - Snažíte se inzerovat",
      problem: "Cílíte na všechny najednou",
      thought: "Facebook 5000 Kč a nic... Zkusit noviny? Letáky?",
      description: "Rozesíláte letáky, platíte za inzeráty, ale výsledky nepřicházejí.",
      emotion: "😤",
      color: "orange",
      stats: "85% podnikatelů nedokáže popsat svého ideálního zákazníka"
    },
    {
      time: "12:00",
      timeIcon: "☁️",
      title: "Poledne - Zákazník odchází",
      problem: "Nemáte jasné odlišení", 
      thought: "Proč si má vybrat mě? Vedle dělají to samé...",
      description: "Zákazník se ptá na cenu a pak jde ke konkurenci.",
      emotion: "😕",
      color: "rose",
      stats: "69% zákazníků odchází kvůli nejasné hodnotě, ne kvůli ceně"
    },
    {
      time: "15:00",
      timeIcon: "🌥️",
      title: "Odpoledne - Nevíte co dělat",
      problem: "Žádná jasná strategie",
      thought: "Web? Instagram? Volat zákazníky? Já nevím...",
      description: "Každý den řešíte co zrovna hoří, ale chybí vám strategie.",
      emotion: "😰",
      color: "purple",
      stats: "Podnikatelé bez strategie ztratí průměrně 15 hodin týdně"
    },
    {
      time: "18:00",
      timeIcon: "🌆",
      title: "Večer - Počítáte výdělky",
      problem: "Příjem nižší než zaměstnanec",
      thought: "12 hodin makám, a mám stejně jako zaměstnanec...",
      description: "Dlouhý den, spousta práce, ale příjmy jsou tristní.",
      emotion: "😔",
      color: "blue",
      stats: "Mnozí OSVČ pracují 50+ hodin týdně za nižší příjem"
    },
    {
      time: "22:00",
      timeIcon: "🌙",
      title: "V noci - Nemůžete spát",
      problem: "Stres a existenciální obavy",
      thought: "Nájem 35 000, faktury 3 měsíce zpět... Co když to nedokážu?",
      description: "Točíte se v posteli a myslíte na podnikání místo spánku.",
      emotion: "😴",
      color: "indigo",
      stats: "62% podnikatelů trpí nespavostí kvůli finančnímu stresu"
    }
  ];

  const colorMap = {
    red: { bg: "bg-gray-800/90", border: "border-red-700/50", text: "text-red-400", accent: "bg-red-600" },
    orange: { bg: "bg-gray-800/90", border: "border-orange-700/50", text: "text-orange-400", accent: "bg-orange-600" },
    rose: { bg: "bg-gray-800/90", border: "border-rose-700/50", text: "text-rose-400", accent: "bg-rose-600" },
    purple: { bg: "bg-gray-800/90", border: "border-purple-700/50", text: "text-purple-400", accent: "bg-purple-700" },
    blue: { bg: "bg-gray-800/90", border: "border-blue-800/50", text: "text-blue-400", accent: "bg-blue-800" },
    indigo: { bg: "bg-gray-800/90", border: "border-indigo-900/50", text: "text-indigo-400", accent: "bg-indigo-900" }
  };

  return (
    <section id="problems" className="problems-section py-10 md:py-12 bg-gradient-to-b from-red-950 via-gray-900 to-slate-900 relative overflow-hidden" data-section="problems">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg border border-red-400/50">
            <span className="text-lg">⏰</span>
            Typický den podnikatele
          </div>
          
          <h2 className="text-3xl md:text-4xl mb-4 text-white font-black leading-tight">
            <span className="text-red-400 font-black">24 hodin</span> plných <span className="text-red-400 font-black">frustrace a stresu</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Poznáváte se? <strong className="text-red-400">Každý den se opakuje stejný scénář frustrace</strong> – makáte víc než kdykoli předtím, ale výsledky nepřicházejí...
          </p>
        </motion.div>

        {/* Compact Timeline */}
        <div className="relative mb-12 md:mb-16">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 h-full hidden md:block shadow-lg"></div>
          
          <div className="grid md:grid-cols-2 gap-5 md:gap-8">
            {timelineSteps.map((step, index) => {
              const colors = colorMap[step.color];
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative ${isEven ? 'md:pr-8' : 'md:pl-8'}`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline dot - only on desktop */}
                  <div className={`absolute top-6 ${isEven ? 'right-0' : 'left-0'} transform ${isEven ? 'translate-x-1/2' : '-translate-x-1/2'} w-4 h-4 ${colors.accent} rounded-full border-4 border-white shadow-lg z-10 hidden md:block`}>
                  </div>
                  
                  <div className={`${colors.bg} rounded-2xl p-5 md:p-6 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 text-white h-full flex flex-col`}>
                    
                    {/* Time badge - bez borderu */}
                    <div className={`inline-flex items-center self-start ${colors.text} font-mono text-sm mb-4 bg-black/40 px-4 py-2 rounded-full shadow-lg`}>
                      <span className="mr-2 text-lg">{step.timeIcon}</span>
                      <span className="font-bold">{step.time}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 text-white">
                      {step.title}
                    </h3>
                    
                    {/* Problem label - bez borderu, jen background + emoji */}
                    <div className={`inline-flex items-center self-start ${colors.text} font-bold text-sm px-4 py-2 bg-red-900/50 rounded-lg mb-4 shadow-lg`}>
                      <span className="mr-2">🚨</span>
                      {step.problem}
                    </div>
                    
                    {/* Thought bubble - jediný border element */}
                    <div className="bg-gradient-to-br from-black/40 to-black/20 rounded-xl p-5 mb-4 border-2 border-gray-700/50 italic shadow-xl flex-1 flex items-center backdrop-blur-sm">
                      <div className="flex items-start space-x-3 w-full">
                        <span className="text-2xl flex-shrink-0">{step.emotion}</span>
                        <div>
                          <div className="text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wide">Myslíte si:</div>
                          <div className="text-base text-gray-100 font-medium leading-relaxed">"{step.thought}"</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-300 italic text-center mt-auto pt-2">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full align-middle mr-2 animate-pulse shadow-lg shadow-red-500/50"></span>
                      {step.stats}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Reality Stats */}
        <motion.div
          className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border-2 border-red-600/50 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              A to ještě <span className="text-red-400 font-black">NENÍ VŠECHNO</span>... 💀
            </h3>
            <p className="text-gray-300 font-medium">
              Zatímco se potýkáte s těmito problémy, <strong className="text-red-400">vaše náklady každý rok ROSTOU</strong> a tlak se jen zvyšuje
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-700 shadow-lg"></div>
              <div className="text-3xl font-black text-red-400 mb-2">+18%</div>
              <div className="text-sm text-white mb-2 font-semibold">Růst nájmů</div>
              <div className="text-xs text-gray-400">Za poslední 2 roky v ČR</div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-700 shadow-lg"></div>
              <div className="text-3xl font-black text-red-400 mb-2">Každý rok</div>
              <div className="text-sm text-white mb-2 font-semibold">Odvody</div>
              <div className="text-xs text-gray-400">Neustále rostou až do 2030</div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-700 shadow-lg"></div>
              <div className="text-3xl font-black text-red-400 mb-2">+35%</div>
              <div className="text-sm text-white mb-2 font-semibold">Růst mezd a energií</div>
              <div className="text-xs text-gray-400">Tlak na vaše náklady</div>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
}