// 🎯 TESTIMONIAL ADS (4x) - NOVÉ FORMÁTY!
// #1: CASE STUDY - Numbers (KEEP original)
// #2: STORY STYLE - Emoční relief (IG story screenshot look)
// #3: MESSAGE STYLE - Specifický problém (chat bubble)
// #4: DEEP DIVE - Kosmetický salon +40% (Real example)

export function Testimonial1PetrStory() {
  // WARM #3 z Ultimate10Ads - Petr, e-shop +10 objednávek - KOMPAKTNĚJŠÍ
  return (
    <div className="h-full bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-900 flex items-center justify-center p-10">
      <div className="max-w-3xl w-full">
        <div className="text-6xl mb-5 text-center">💬</div>

        <h1 className="text-5xl font-black text-white mb-5 text-center leading-tight drop-shadow-lg">
          „Za 90 minut jsem<br/>
          <span className="text-green-300">KONEČNĚ VĚDĚL"</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-8 text-center">
          Petr, 38 • E-shop s outdoorovým vybavením
        </p>

        <div className="bg-white/95 rounded-2xl p-7 mb-6 shadow-2xl">
          <div className="space-y-5">
            <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-600">
              <p className="text-xl font-bold text-gray-900 mb-3">
                ❌ PŘED ČTVRTKOU:
              </p>
              <div className="space-y-2 text-lg text-gray-700">
                <p>• „Prodávám všem. Turistům, bikerům, rybářům..."</p>
                <p>• „Nevím čím se lišim. Je nás plno podobných."</p>
                <p>• „Proč zrovna ode mě? Nemám odpověď."</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
              <p className="text-xl font-bold text-gray-900 mb-3">
                ✅ PO ČTVRTCE:
              </p>
              <div className="space-y-2 text-lg text-gray-700">
                <p>• <strong>Jasný segment:</strong> „Bikepacking nadšenci 30-45"</p>
                <p>• <strong>Jasná hodnota:</strong> „Řeším jim váhu batohu na víkendy"</p>
                <p>• <strong>Jasná pozice:</strong> „Nejlehčí setup v ČR"</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border-2 border-blue-500">
              <p className="text-2xl font-black text-blue-700 mb-3">
                📈 VÝSLEDEK:
              </p>
              <p className="text-xl text-gray-800">
                <strong>10 objednávek první týden</strong><br/>
                Přesně od bikepacking nadšenců. Konečně vím komu prodávám.
              </p>
            </div>
          </div>
        </div>

        {/* Kompaktnější "Petrovi stačilo" */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-6 border-2 border-white/30">
          <p className="text-xl font-bold text-white mb-3 text-center">
            Petrovi stačilo:
          </p>
          <div className="text-lg text-gray-300 space-y-1 text-center">
            <p>⏰ 90 minut • 💰 4.999 Kč • <span className="text-green-300 font-bold">🎯 Jasno</span></p>
          </div>
        </div>

        {/* Jediná CTA */}
        <div className="text-center">
          <div className="bg-green-500 text-white rounded-xl px-12 py-6 inline-block shadow-xl">
            <p className="text-3xl font-black mb-2">
              CHCI JASNO ZA 90 MINUT
            </p>
            <p className="text-xl">
              Tvůj segment • Tvoje hodnota • Tvůj plán
            </p>
          </div>
        </div>

        <p className="text-green-300 text-xl font-bold mt-6 text-center">
          🎯 Prvních 50 • Sleva 40%
        </p>
      </div>
    </div>
  );
}

export function Testimonial2StoryStyle() {
  // Instagram Story screenshot look - emoční relief
  return (
    <div className="h-full bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center p-8">
      {/* Story frame */}
      <div className="max-w-2xl w-full">
        {/* Story header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center shadow-lg">
            <p className="text-3xl">👨‍💼</p>
          </div>
          <div>
            <p className="text-white font-bold text-xl">Pavel</p>
            <p className="text-white/70 text-sm">před 3h</p>
          </div>
        </div>
        
        {/* Story content - text over gradient */}
        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-12 mb-8 border border-white/20">
          <div className="text-center mb-8">
            <p className="text-6xl mb-4">😴</p>
            <p className="text-5xl font-black text-white leading-tight mb-6">
              "Konečně<br/>
              SPÍM V NOCI"
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/30">
            <p className="text-xl text-white mb-4">
              Před Čtvrtkou:
            </p>
            <p className="text-lg text-white/90 italic mb-6">
              "Každou noc jsem přemýšlel co dělám špatně. Proč to nefunguje. Jestli mám zavřít."
            </p>
            
            <p className="text-xl text-white mb-4">
              Po tvrtce:
            </p>
            <p className="text-lg text-white/90 italic">
              "Mám plán. Vím co dělat. Klidně spím. Rodina má tátu zpátky."
            </p>
          </div>
          
          <div className="bg-green-500 text-white rounded-xl px-6 py-4 text-center">
            <p className="text-2xl font-black">
              ✅ Mentální klid = Růst byznysu
            </p>
          </div>
        </div>
        
        {/* Story CTA */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 text-center shadow-xl">
          <p className="text-sm text-gray-600 mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-2xl font-black text-gray-900">
            Chci taky klid →
          </p>
        </div>
        
        {/* Story progress bars */}
        <div className="flex gap-2 mt-6">
          <div className="flex-1 h-1 bg-white rounded-full"></div>
          <div className="flex-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex-1 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function Testimonial3MessageStyle() {
  // Chat/message screenshot look - AHA MOMENT: Barber Shop - KRATŠÍ!
  return (
    <div className="h-full bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center p-8 relative">
      {/* Phone frame mockup */}
      <div className="max-w-2xl w-full">
        {/* Chat header - Messenger style - KOMPAKTNĚJŠÍ */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl px-6 py-4 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <p className="text-xl">💈</p>
          </div>
          <div>
            <p className="text-white font-bold">Martin K.</p>
            <p className="text-white/80 text-xs">Aktivní před 2 min</p>
          </div>
        </div>
        
        {/* Chat messages - KOMPAKTNĚJŠÍ */}
        <div className="bg-white px-6 py-6 space-y-3 rounded-b-2xl shadow-2xl">
          
          {/* Klient - Start */}
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-5 py-2.5 max-w-md">
              <p className="text-base text-gray-900">
                Tak jsem to dokončil 😅
              </p>
              <p className="text-xs text-gray-500 mt-1">14:23</p>
            </div>
          </div>
          
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-5 py-2.5 max-w-md">
              <p className="text-base text-gray-900">
                A je to <span className="font-black">NESKUTEČNÝ</span> 😂
              </p>
              <p className="text-xs text-gray-500 mt-1">14:23</p>
            </div>
          </div>
          
          {/* Naše odpověď */}
          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-5 py-2.5 max-w-md">
              <p className="text-base text-white">
                Haha, co je neskutečný? 😄
              </p>
              <p className="text-xs text-blue-100 mt-1 text-right">14:24</p>
            </div>
          </div>
          
          {/* Klient - Story o Barber Shopu */}
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-5 py-2.5 max-w-md">
              <p className="text-base text-gray-900 leading-snug">
                Šel jsem do papírnictví, koupil čtvrtku A1 za 20 korun...<br/>
                Udělal jsem si čas, sedl si k tomu...<br/>
                A měl jsem <span className="font-black">celej MODEL</span> na <span className="font-black">jednom papíře</span> 💼✨
              </p>
              <p className="text-xs text-gray-500 mt-1">14:25</p>
            </div>
          </div>
          
          {/* Naše odpověď */}
          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-5 py-2.5 max-w-md">
              <p className="text-base text-white">
                Přesně! A vidíš teď jasně? 💪
              </p>
              <p className="text-xs text-blue-100 mt-1 text-right">14:26</p>
            </div>
          </div>
          
          {/* Klient - Result ZKOMBINOVANÝ */}
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-5 py-2.5 max-w-md">
              <p className="text-base text-gray-900 leading-snug">
                Jo! Vidím jaký služby dávají smysl, komu je prodávat, za kolik, jak se odlišit...<br/>
                Všechno na <span className="font-black">jedné</span> čtvrtce 📋
              </p>
              <p className="text-xs text-gray-500 mt-1">14:27</p>
            </div>
          </div>
          
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-5 py-2.5 max-w-md">
              <p className="text-base text-gray-900 font-bold">
                Je to JEDNODUCHÉ. Tohle mi chybělo celou dobu 😅
              </p>
              <p className="text-xs text-gray-500 mt-1">14:28</p>
            </div>
          </div>
          
          {/* Naše odpověď - final */}
          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-5 py-2.5 max-w-md">
              <p className="text-base text-white">
                Teď pokračuj a zlepšuj to dál! 💪
              </p>
              <p className="text-xs text-blue-100 mt-1 text-right">14:29</p>
            </div>
          </div>
          
          {/* Seen indicator */}
          <div className="flex justify-end">
            <p className="text-xs text-gray-400">Zobrazeno 14:29</p>
          </div>
        </div>
        
        {/* CTA below chat - MODRÁ, JEDNODUCHÁ */}
        <div className="mt-6 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl px-10 py-5 shadow-xl inline-block hover:shadow-2xl transition-shadow">
            <p className="text-2xl font-black">Zkusit to taky →</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonial4DeepDive() {
  // KOSMETIČKA LENKA - Začínala v přeplněném trhu
  return (
    <div className="h-full bg-gradient-to-br from-pink-900 via-rose-900 to-purple-900 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-black text-white mb-3">
            Lenka • Kosmetička
          </h1>
          <div className="bg-pink-400 text-white px-5 py-2 rounded-full inline-block shadow-lg">
            <p className="text-xl font-black">TAKHLE TO FUNGUJE V PRAXI</p>
          </div>
        </div>

        {/* Example breakdown */}
        <div className="space-y-4 mb-6">
          {/* Problem */}
          <div className="bg-red-900/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/50">
            <div className="flex items-start gap-4">
              <div className="text-5xl">😰</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-red-300 mb-3">
                  PROBLÉM:
                </p>
                <p className="text-2xl text-white leading-snug">
                  "Chtěla jsem začít s kosmetikou.<br/>
                  Ale kosmetiček je všude plno.<br/>
                  Nevěděla jsem jak na to."
                </p>
              </div>
            </div>
          </div>

          {/* What Čtvrtka showed */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="text-5xl">📋</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-gray-900 mb-4">
                  CO UKÁZALA ČTVRTKA:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-xl font-bold text-gray-900">Vyplnila model (ještě před startem!)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-xl font-bold text-gray-900">Zjistila kde je příležitost</p>
                      <p className="text-lg text-gray-600">Premium anti-aging pro 35+ ženy</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-xl font-bold text-gray-900">Spočítala kolik potřebuje zákazníků</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-xl font-bold text-gray-900">Šla do toho</p>
                      <p className="text-lg text-gray-600">S jasným plánem od začátku</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 border-4 border-green-400 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="text-5xl">🎉</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-white mb-3">
                  VÝSLEDEK:
                </p>
                <p className="text-4xl font-black text-white mb-2">
                  +40% nad plán
                </p>
                <p className="text-xl text-green-100 mb-3">
                  za dva měsíce
                </p>
                <div className="space-y-1">
                  <p className="text-lg text-green-100">• Jasná pozice na trhu</p>
                  <p className="text-lg text-green-100">• Není 'jen další kosmetička'</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your turn */}
        <div className="bg-yellow-400 rounded-2xl p-7 text-center shadow-2xl">
          <p className="text-5xl font-black text-gray-900 mb-3">
            TEĎKA TY
          </p>
          <p className="text-2xl text-gray-800">
            Stejný systém • Tvůj byznys • 90 minut
          </p>
        </div>
      </div>
    </div>
  );
}

export const testimonial3AdsNewMetadata = [
  {
    id: 'testimonial-1-case',
    name: 'TESTIMONIAL #1: Numbers',
    subtitle: 'Markéta +60% za 3 měsíce',
    format: 'Professional case study',
    budget: '20 Kč/den',
    trigger: 'Social proof • Real results • Concrete numbers'
  },
  {
    id: 'testimonial-2-story',
    name: 'TESTIMONIAL #2: Emotional',
    subtitle: 'Konečně spím v noci',
    format: 'IG Story style',
    budget: '20 Kč/den',
    trigger: 'Life transformation • Relief • Mental health'
  },
  {
    id: 'testimonial-3-message',
    name: 'TESTIMONIAL #3: Specific',
    subtitle: 'Problém → Řešení',
    format: 'Message/chat style',
    budget: '20 Kč/den',
    trigger: 'Relatable problem • Specific solution • Before/After'
  },
  {
    id: 'testimonial-4-deepdive',
    name: 'TESTIMONIAL #4: Deep Dive',
    subtitle: 'Kosmetický salon +40%',
    format: 'Real example',
    budget: '20 Kč/den',
    trigger: 'Concrete example • Real results • Specific solution'
  }
];