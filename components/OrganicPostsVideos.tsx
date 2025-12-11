// 🎬 ORGANIC POSTS - VIDEO ANIMACE
// Přesunuté z omnipresent kampaně - využití pro organický content

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Value2GainVideo } from './Value2GainVideo';
import { Value3EducationVideo } from './Value3EducationVideo';
import { Testimonial47kLossVideo } from './Testimonial47kLossVideo';
import { OrganicPost17MythBusterVideo } from './OrganicPost17MythBusterVideo';

interface VideoPost {
  id: number;
  title: string;
  subtitle: string;
  copy: string;
}

const VIDEO_POSTS: VideoPost[] = [
  {
    id: 4,
    title: 'VIDEO: Myth Buster',
    subtitle: 'CO NEPOTŘEBUJEŠ - 4 mýty před validací',
    copy: `❌ CO NEPOTŘEBUJEŠ k úspěšnému podnikání

━━━━━━━━━━━━━━━━━━━━━━━

Většina lidí prohodí tisíce na startu.

1️⃣ OBJEDNAT TISÍCE KUSŮ NAPŘED ❌
Nemusíš investovat do výroby. Stačí ověřit ŽE to někdo chce.

2️⃣ PRONAJMOUT SI PROSTOR HNED ❌
Nepotřebuješ kancelář. Potřebuješ PRVNĚ vědět že to funguje.

3️⃣ ČEKAT SE SPUŠTĚNÍM NEŽ ZAČNEŠ MARKETING ❌
Nemusíš mít hotovo. Marketing může běžet UŽ TEĎ.

4️⃣ NAJMOUT TÝM NA ZAČÁTKU ❌
Nepotřebuješ lidi. Potřebuješ vědět CO vůbec dělat.

━━━━━━━━━━━━━━━━━━━━━━━

Model ti ukáže CO doopravdy potřebuješ a KDE začít.

27 podnikatelů už BEZPEČNĚ investovalo 1,4M Kč do svých byznysů.

━━━━━━━━━━━━━━━━━━━━━━━

90 minut • Model podnikání • Bezpečná validace

👉 www.podnikatelskactvrtka.cz

#podnikani #myty #validace #bezpečně`
  },
  {
    id: 1,
    title: 'VIDEO: Představ si za měsíc',
    subtitle: 'VALUE - Aspirational vision',
    copy: `Představ si tvůj byznys za měsíc...

━━━━━━━━━━━━━━━━━━━━━━━

🚀 ZA MĚSÍC:

💰 Víc tržeb - každý měsíc lepší čísla
📞 Plný kalendář - zákazníci se hlásí sami
⏰ Volný čas - nemusíš makat 24/7
😌 Klidná hlava - můžeš plánovat budoucnost

━━━━━━━━━━━━━━━━━━━━━━━

Co tě dělí od tohohle stavu?

JASNÝ PLÁN. 🎯

━━━━━━━━━━━━━━━━━━━━━━━

90 minut • Model podnikání • Tvoje budoucnost

👉 www.podnikatelskactvrtka.cz

#podnikani #vize #budoucnost #uspech`
  },
  {
    id: 2,
    title: 'VIDEO: Jak na úspěšný byznys',
    subtitle: 'VALUE - Educational 3 steps',
    copy: `Jak na úspěšný byznys? 💡

Není to rocket science 🚀

━━━━━━━━━━━━━━━━━━━━━━━

🎯 KROK 1:
Musíš vědět NA KOHO cílíš
A jestli JICH JE DOST

Dává rozum, ne? 🤷‍♂️

━━━━━━━━━━━━━━━━━━━━━━━

💼 KROK 2:
Máš produkt - super! 👍
Ale CHTĚJÍ HO tvoji zákazníci?
Musíš si to OVĚŘIT

Logický, ne? 💡

━━━━━━━━━━━━━━━━━━━━━━━

✅ KROK 3:
"Jak to prodat je těžký!" 😰
EASY - když víš KDO to je
a CO CHTĚJÍ

Jasný, ne? ✅

━━━━━━━━━━━━━━━━━━━━━━━

PODNIKÁNÍ JINAK ⚡

Model za 90 minut • Revoluční způsob cílení

👉 www.podnikatelskactvrtka.cz

#podnikani #edukace #kroky #jednoduše`
  },
  {
    id: 3,
    title: 'VIDEO: Propálil jsem 47 000 Kč',
    subtitle: 'TESTIMONIAL - Confession & Regret',
    copy: `Propálil jsem 47 000 Kč na blbosti. 💸

━━━━━━━━━━━━━━━━━━━━━━━

12 000 za experta na reklamy (nefungovalo).
18 000 za web a logo (krásný design, nula zákazníků).
17 000 za vylepšení prostor (luxusní interiér, zákazníci nepřicházeli).

Všechno zbytečný.

━━━━━━━━━━━━━━━━━━━━━━━

Protože jsem řešil SYMPTOMY. Ne PŘÍČINU.

Myslel jsem, že když udělám reklamu, zákazníci se pohrnou.
Nehrnuli.

━━━━━━━━━━━━━━━━━━━━━━━

Netajím, že jsem tomu nevěřil.
"Zase další kurz..." 😤

Ale najednou jsem viděl:
→ Kde dělám chybu
→ Proč reklama nefungovala
→ Co změnit ZÍTRA

Za měsíc: +60% tržby. 📈

━━━━━━━━━━━━━━━━━━━━━━━

Kdybych měl ten model o měsíc dřív,
ušetřil bych 47 000 Kč.

⚠️ Nemakej naslepo jako já.
Udělej si model TEĎ.

━━━━━━━━━━━━━━━━━━━━━━━

90 minut • Jasný plán • Reálné výsledky

👉 www.podnikatelskactvrtka.cz

#podnikani #chyby #zkusenosti #lekce #47tisic`
  }
];

export function OrganicPostsVideos() {
  const [currentVideo, setCurrentVideo] = useState(0);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % VIDEO_POSTS.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + VIDEO_POSTS.length) % VIDEO_POSTS.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2">
            🎬 ORGANIC VIDEO POSTS
          </h1>
          <p className="text-xl text-gray-300">
            Animované videa pro Instagram & Facebook organický content
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={prevVideo}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white font-bold"
          >
            <ChevronLeft className="w-5 h-5" />
            Předchozí
          </button>
          
          <div className="flex gap-2">
            {VIDEO_POSTS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  index === currentVideo
                    ? 'bg-purple-500 text-white scale-110'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                V{index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextVideo}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white font-bold"
          >
            Další
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Info */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-2">
            {VIDEO_POSTS[currentVideo].title}
          </h2>
          <p className="text-xl text-gray-300">
            {VIDEO_POSTS[currentVideo].subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          {/* Video Container - 1080x1080 square */}
          <div 
            className="bg-white shadow-2xl overflow-hidden mx-auto"
            style={{
              width: '1080px',
              height: '1080px'
            }}
          >
            {currentVideo === 0 && <Value2GainVideo />}
            {currentVideo === 1 && <Value3EducationVideo />}
            {currentVideo === 2 && <Testimonial47kLossVideo />}
            {currentVideo === 3 && <OrganicPost17MythBusterVideo />}
          </div>
        </div>
      </div>

      {/* Copy Panel */}
      <div className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-black text-gray-900 mb-4">
              📝 Instagram/Facebook Copy
            </h3>
            
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <pre className="text-base text-gray-900 whitespace-pre-wrap font-sans">
                {VIDEO_POSTS[currentVideo].copy}
              </pre>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-300">
                <h4 className="font-black text-purple-900 mb-2">💡 TIP:</h4>
                <p className="text-sm text-purple-800">
                  Screenshot → Nahrát jako video carousel na Instagram/Facebook
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                <h4 className="font-black text-blue-900 mb-2">⏰ TIMING:</h4>
                <p className="text-sm text-blue-800">
                  Animace běží 15-20 sekund (cca 3-5 loopů)
                </p>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
              <h4 className="font-black text-green-900 mb-3">🎯 JAK POUŽÍT:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-green-800">
                <li>Otevři video komponentu v prohlížeči</li>
                <li>Nahrát screen recording (OBS, ShareX, QuickTime)</li>
                <li>Export jako MP4 (1080×1080)</li>
                <li>Upload na Instagram/Facebook jako Reel nebo Post</li>
                <li>Použít copy text výše</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}