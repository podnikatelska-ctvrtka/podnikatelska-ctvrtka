import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface CanvasSection {
  id: string;
  title: string;
  description: string;
  items: string[];
  color: string;
  emoji: string;
}

const ZASILKOVNA_MODEL: CanvasSection[] = [
  {
    id: "segments",
    title: "Zákaznické segmenty",
    description: "Pro koho Zásilkovna funguje?",
    emoji: "👥",
    color: "from-blue-500 to-cyan-500",
    items: [
      "🎯 E-shopy (hlavní zákazníci - platí za doručení)",
      "🎯 Prodejci na internetových tržištích",
      "📦 Koncoví zákazníci (vyzvedávají balíky)",
      "📦 Lidé kteří posílají balíky"
    ]
  },
  {
    id: "value",
    title: "Hodnotová nabídka",
    description: "Co nabízejí a jaké bolesti řeší?",
    emoji: "💎",
    color: "from-orange-500 to-red-500",
    items: [
      "Levnější doručení (vs. Česká pošta)",
      "Výdejní místa na každém rohu (blízko domova/práce)",
      "Flexibilní otvírací doba (podle místa)",
      "Jednoduché vyzvednutí (přijde kód, dojdeš si pro to)",
      "Jednoduché vrácení zboží",
      "Sledování balíku v reálném čase"
    ]
  },
  {
    id: "channels",
    title: "Kanály",
    description: "Jak oslovují zákazníky?",
    emoji: "📢",
    color: "from-green-500 to-emerald-500",
    items: [
      "Propojení s e-shopy přes technologii",
      "Mobilní aplikace",
      "Web a emailové upozornění",
      "Spolupráce s obchody (výdejní místa)",
      "Obchodní tým pro velké e-shopy"
    ]
  },
  {
    id: "relationships",
    title: "Vztahy se zákazníky",
    description: "Jak komunikují?",
    emoji: "🤝",
    color: "from-purple-500 to-pink-500",
    items: [
      "Samoobsluha (automatické sledování)",
      "Zákaznická podpora (chat, email)",
      "Automatické upozornění o stavu zásilky (SMS, email)"
    ]
  },
  {
    id: "revenue",
    title: "Zdroje příjmů",
    description: "Jak vydělávají?",
    emoji: "💰",
    color: "from-yellow-500 to-orange-500",
    items: [
      "Poplatek za doručení (platí e-shop nebo zákazník)",
      "Poplatek za propojení s e-shopem",
      "Poplatek za vrácení zboží"
    ]
  },
  {
    id: "resources",
    title: "Klíčové zdroje",
    description: "Co potřebují aby to fungovalo?",
    emoji: "🔧",
    color: "from-indigo-500 to-purple-500",
    items: [
      "Síť 10,000+ výdejních míst",
      "Technologická infrastruktura (systém sledování)",
      "Logistická centra a dopravci",
      "Rozpoznatelná značka (oranžové logo všude)",
      "Data a analýzy"
    ]
  },
  {
    id: "activities",
    title: "Klíčové aktivity",
    description: "Co musí denně dělat?",
    emoji: "⚙️",
    color: "from-teal-500 to-cyan-500",
    items: [
      "Provoz logistické sítě",
      "Údržba a vývoj technologie",
      "Zapojování nových e-shopů",
      "Rozšiřování výdejních míst",
      "Budování značky"
    ]
  },
  {
    id: "partners",
    title: "Klíčová partnerství",
    description: "S kým spolupracují?",
    emoji: "🤝",
    color: "from-pink-500 to-red-500",
    items: [
      "Malí podnikatelé (večerky, benzinky, kiosky...)",
      "Dopravci (vlastní i externí)",
      "E-shopové platformy (Shoptet, Shopify...)",
      "Platební systémy",
      "Technologická infrastruktura (cloud, servery)"
    ]
  },
  {
    id: "costs",
    title: "Nákladová struktura",
    description: "Co je stojí peníze?",
    emoji: "💸",
    color: "from-red-500 to-orange-500",
    items: [
      "Doprava mezi centry a výdejními místy",
      "Platby výdejním místům (za každý balík)",
      "Nájmy logistických center",
      "Technologie a vývoj",
      "Budování značky a prodej",
      "Zákaznická podpora"
    ]
  }
];

export function ZasilkovnaBusinessModel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full text-orange-600 text-sm">
              📦 Rozbor modelu podnikání
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl mb-6 text-slate-900">
            Jak Zásilkovna poslala
            <span className="block mt-2 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Českou poštu do kolen?
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Našli inovaci v modelu podnikání. Odstranili největší bolesti.
            <span className="block mt-2 text-slate-900 font-semibold">
              A vybudovali byznys za miliardy bez jediného nového produktu.
            </span>
          </p>
        </motion.div>

        {/* Story - Problém */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 border border-red-200">
            <h2 className="text-3xl md:text-4xl text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">😤</span>
              <span>Zažil jsi to taky?</span>
            </h2>
            
            <div className="space-y-6 text-lg text-slate-700">
              <div className="bg-white rounded-2xl p-6 border-l-4 border-red-500 shadow-sm">
                <p className="italic mb-3 text-slate-600">
                  "Balík nedorazil. Musíte si ho vyzvednout na poště."
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Jdeš tam po práci. <strong className="text-slate-900">Stojíš tam hodiny.</strong> Tvůj volný čas.
                  Akorát jsi <strong className="text-red-600">naštvanej</strong>.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-red-100">
                  <span className="text-red-500 shrink-0 text-2xl">❌</span>
                  <div>
                    <p className="text-slate-900 font-semibold mb-1">Nespolehlivá pošta</p>
                    <p className="text-slate-600">Dlouhé doručení, někdy vůbec nedorazí</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-red-100">
                  <span className="text-red-500 shrink-0 text-2xl">❌</span>
                  <div>
                    <p className="text-slate-900 font-semibold mb-1">Čekání a omezování</p>
                    <p className="text-slate-600">Celý den doma, nebo fronty na poště</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-red-100">
                  <span className="text-red-500 shrink-0 text-2xl">❌</span>
                  <div>
                    <p className="text-slate-900 font-semibold mb-1">Nulový komfort</p>
                    <p className="text-slate-600">Pošta má otevřeno když ty pracuješ</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-red-100">
                  <span className="text-red-500 shrink-0 text-2xl">❌</span>
                  <div>
                    <p className="text-slate-900 font-semibold mb-1">Drahá doprava</p>
                    <p className="text-slate-600">E-shopy platí, ty platíš, všichni tratí</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-200">
            <h2 className="text-3xl md:text-4xl text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">💡</span>
              <span>Pak přišla Zásilkovna</span>
            </h2>
            
            <div className="space-y-6">
              <p className="text-xl text-slate-700 leading-relaxed">
                Neřešili produkt. <strong className="text-slate-900">Našli inovaci v modelu podnikání.</strong>
              </p>

              <div className="space-y-4 text-lg">
                <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-green-100">
                  <span className="text-green-500 shrink-0 text-2xl">✅</span>
                  <div>
                    <p className="text-slate-900 font-semibold mb-1">Vytvořili síť výdejních míst</p>
                    <p className="text-slate-600">
                      Benzinky, obchody, kiosky. Blíž k tobě. Oboustranně výhodné - podpora místních podniků (propagace zdarma).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-green-100">
                  <span className="text-green-500 shrink-0 text-2xl">✅</span>
                  <div>
                    <p className="text-slate-900 font-semibold mb-1">Hlavní hodnota: Maximální flexibilita</p>
                    <p className="text-slate-600">
                      <strong className="text-slate-900">a)</strong> Výdejní místa na každém rohu<br/>
                      <strong className="text-slate-900">b)</strong> Otvírací doba podle místa
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-green-100">
                  <span className="text-green-500 shrink-0 text-2xl">✅</span>
                  <div>
                    <p className="text-slate-900 font-semibold mb-1">Boxy dostupné 24/7</p>
                    <p className="text-slate-600">
                      Největší flexibilita - vyzvednutí kdy se hodí ZÁKAZNÍKOVI. Je to jednoduché (přijde kód, vyzvedneš si to).
                      Inspirace od Alzy, pak následovali všichni (Allegro, PPL).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-l-4 border-green-500 shadow-sm mt-6">
                <p className="text-lg text-slate-700 italic">
                  Odstranili největší bolesti: <strong className="text-slate-900">poštu, naštvané a frustrované lidi, čekání, omezování, nulový komfort.</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Soft CTA 1 - V průběhu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-2xl p-6 text-center">
            <p className="text-lg text-slate-700">
              <span className="text-slate-900 font-semibold">Vidíš ten vzor?</span> Nejde o produkt, jde o model podnikání.
              <span className="block mt-2">Takhle se dělá byznys, který funguje.</span>
            </p>
          </div>
        </motion.div>

        {/* Business Model Canvas - Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl text-slate-900 mb-4">
              📊 Model podnikání na jedné stránce
            </h2>
            <p className="text-xl text-slate-600">
              Takhle vypadá úspěšný byznys - všechno na první pohled
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {ZASILKOVNA_MODEL.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{section.emoji}</span>
                  <div>
                    <h3 className="text-lg text-slate-900 font-semibold">
                      {section.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex gap-2 items-start text-slate-600 text-sm"
                    >
                      <span className="text-orange-500 shrink-0 mt-0.5">▸</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 border border-purple-200">
            <h2 className="text-3xl text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-4xl">🚀</span>
              <span>Výsledky</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-white p-6 rounded-2xl border border-purple-100">
                <div className="text-4xl md:text-5xl text-slate-900 font-bold mb-2">
                  10,000+
                </div>
                <div className="text-slate-600">
                  výdejních míst
                </div>
              </div>
              
              <div className="text-center bg-white p-6 rounded-2xl border border-purple-100">
                <div className="text-4xl md:text-5xl text-slate-900 font-bold mb-2">
                  10+ mld Kč
                </div>
                <div className="text-slate-600">
                  hodnota společnosti
                </div>
              </div>
              
              <div className="text-center bg-white p-6 rounded-2xl border border-purple-100">
                <div className="text-4xl md:text-5xl text-slate-900 font-bold mb-2">
                  30+ zemí
                </div>
                <div className="text-slate-600">
                  mezinárodní rozšíření
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-purple-200 text-center">
              <p className="text-lg text-slate-700 leading-relaxed">
                Z "šíleného nápadu" na <span className="text-slate-900 font-semibold">dominantního hráče</span> v logistice.
                <span className="block mt-2">
                  A všechno začalo <span className="text-slate-900 font-semibold">správným modelem podnikání.</span>
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 md:p-12 border-2 border-orange-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
                Tohle přesně dělá <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-bold">Podnikatelská Čtvrtka</span>
              </h2>
              <p className="text-xl text-slate-700 leading-relaxed">
                Naučí tě najít správné bolesti, postavit model který funguje, 
                <span className="block mt-2 text-slate-900 font-semibold">
                  a vyhnout se chybám za statisíce.
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => window.location.href = '/objednavka'}
                className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
              >
                <span>Chci Podnikatelskou Čtvrtku</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => window.location.href = '/kviz'}
                variant="outline"
                className="border-2 border-blue-500 bg-white hover:bg-blue-50 text-slate-900 px-8 py-6 text-lg rounded-xl transition-all"
              >
                <span>nebo udělej ZDARMA kvíz: Jak zdravý je tvůj model?</span>
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-600 text-sm">
                Za 90 minut budeš mít hotový model pro svůj byznys. Garantovaně.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center"
        >
          <div className="inline-block bg-slate-100 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              <strong className="text-slate-700">📝 Upozornění:</strong> Toto je náš nezávislý rozbor modelu podnikání Zásilkovny 
              pro vzdělávací účely. Nespolupracujeme se společností Zásilkovna a.s. 
              Veškeré informace jsou získány z veřejně dostupných zdrojů.
            </p>
          </div>
        </motion.div>

        {/* Back to home link */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span>← Zjisti víc o Podnikatelské Čtvrtce</span>
          </a>
        </div>
      </div>
    </div>
  );
}