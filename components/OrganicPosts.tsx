import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 🎯 ORGANIC POSTS - 30 DNÍ SÉRIE
 * 
 * CLEAN verze - JEN posty co skutečně používáme:
 * - Post #1: Kdo je tvůj zákazník (static, pain+sol)
 * - Post #2: Animovaný BMC Model (animated, pain+sol)
 * - Post #3: Kalkulačka cíle (animated, pain+sol)
 * - Post #4: Proč vznikla Čtvrtka (behind-the-scenes)
 */

interface PostData {
  id: number;
  type: 'static' | 'animated';
  format: '1:1' | '4:5';
  title: string;
  copy: string;
}

const POSTS: PostData[] = [
  {
    id: 1,
    type: 'static',
    format: '1:1',
    title: 'Post #1: Kdo je tvůj zákazník?',
    copy: `Proč většina začínajících podnikatelů skončí ten samý rok?

━━━━━━━━━━━━━━━━━━━━━━━

❌ NEVÍ KDO je jejich zákazník.
❌ NEVÍ KDE ho najít.
❌ NEVÍ CO mu nabídnout.

━━━━━━━━━━━━━━━━━━━━━━━

Narozdíl od guru, co jen mluví...

✅ VEDEME TĚ KROK ZA KROKEM

Vyplníš si to SAM.
Pro TVÉ podnikání.
S DATY, ne domněnkami.

━━━━━━━━━━━━━━━━━━━━━━━

Ať máš kavárnu, e-shop nebo služby:

➡️ FIT VALID��TOR tě provede systematicky
➡️ Zjistíš PŘESNĚ komu prodáváš
➡️ Ověříš si to PŘED investicí

━━━━━━━━━━━━━━━━━━━━━━━

Žádné guessing.
Žádné bláboly.
REÁLNÁ VALIDACE.

👉 www.podnikatelskactvrtka.cz

#podnikani #zakaznik #validace #data`
  },
  {
    id: 2,
    type: 'animated',
    format: '1:1',
    title: 'Post #2: Model podnikání (BMC)',
    copy: `Znáš to:

❌ Nevíš kde začít
❌ Nechceš dalších 50 hodin videí
❌ Potřebuješ ŽIVÝ nástroj

━━━━━━━━━━━━━━━━━━━━━━━

✅ Model podnikání co ROSTE s tebou

Není to kurz co zahodíš.
Je to NÁSTROJ co používáš POŘÁD.

━━━━━━━━━━━━━━━━━━━━━━━

90 minut • Vyplníš si to SAM • Pracuješ s tím ROKY

👉 www.podnikatelskactvrtka.cz

#modelpodnikani #strategie #podnikani`
  },
  {
    id: 3,
    type: 'animated',
    format: '1:1',
    title: 'Post #3: Kalkulačka cíle',
    copy: `Zeptej se podnikatele:

"Kolik zákazníků měsíčně potřebuješ?"

━━━━━━━━━━━━━━━━━━━━━━━

95 % odpoví:

❌ "No... hodně" 🤷
❌ "Čím víc tím líp"
❌ "To nevím přesně"

━━━━━━━━━━━━━━━━━━━━━━━

Proč to nev��dí?

→ Nemají čas to spočítat
→ Nechtějí tahat excely
→ Neví kde přesně hledat jak na to

━━━━━━━━━━━━━━━━━━━━━━━

A pak:

💸 Utrácejí slepo za reklamu
🎯 Nevědí jestli to stačí
📊 Nemají jasný cíl

━━━━━━━━━━━━━━━━━━━━━━━

Kalkulačka cíle v Podnikatelské Čtvrtce:

✅ Pár kliknutí
✅ Vyplníš za minutu
✅ Máš přesné číslo

━━━━━━━━━━━━━━━━━━━━━━━

Teď víš:

→ Kolik lidí musí projít dveřmi
→ Jestli má smysl investovat do reklamy
→ Jestli je lokace dobrá
→ Jestli ti vůbec může vyjít byznys

━━━━━━━━━━━━━━━━━━━━━━━

Kalkulačka cíle = jeden z mnoha užitečných nástrojů v Podnikatelské Čtvrtce.

Všechno pod jednou střechou.
90 minut • Praktické nástroje • Tvoje čísla

👉 www.podnikatelskactvrtka.cz

#podnikani #kalkulace #strategie #cile`
  },
  {
    id: 4,
    type: 'static',
    format: '1:1',
    title: 'Post #4: Proč vznikla Čtvrtka (behind-the-scenes)',
    copy: `Proč vznikla Podnikatelská čtvrtka?

━━━━━━━━━━━━━━━━━━━━━━━

Vždycky mě fascinovalo, že byznys jde neustále zlepšovat. Můžeš tam vydat svoji kreativitu, odlišit se, posunout se dál.

Začal jsem pozorovat podniky kolem sebe. Jednou tam bylo tohle, za půl roku tohle... a nakonec skončily.

━━━━━━━━━━━━━━━━━━━━━━━

Obdivoval jsem ty lidi. Šli proti proudu. Chtěli vybudovat něco svého. Něco, co je bavilo, naplňovalo, v čem byli dobří.

Pak jsem zjistil tu krutou statistiku:

⚠️ Víc než polovina podnikatelů končí ten samý rok.

A víš proč?

Kvůli kravině. Nemají efektivní plán.

━━━━━━━━━━━━━━━━━━━━━━━

Místo toho:
💸 Bezhlavě investují statisíce do nájmů
🏢 Řeší prostory ještě před tím, než vědí CO prodávat
📦 Sháněj produkty, zaměstnance...
😰 A pak teprve zjistí, že o to nikdo nestojí

━━━━━━━━━━━━━━━━━━━━━━━

Frustrovalo mě to.

━━━━━━━━━━━━━━━━━━━━━━━

A přišlo mi absurdní, že tady máme spoustu gigantů, velký poradenský firmy...

Ale pro lidi, co prostě jen chtějí dělat to, co je baví?

Pro ně tu nebylo nic.

━━━━━━━━━━━━━━━━━━━━━━━

Proto vznikla Podnikatelská čtvrtka.

90 minut. 4.999 Kč. Jasný plán ještě před investicí.

Aby ti lidi, co jdou proti proudu, nemuseli končit kvůli kravině.

👉 www.podnikatelskactvrtka.cz

#podnikani #pribeh #startupstory #podnikatelskactvrtka`
  }
];

// Container pro 1080x1080 nebo 1080x1350
function PostContainer({ children, format }: { children: React.ReactNode; format: '1:1' | '4:5' }) {
  return (
    <div 
      className="mx-auto bg-white shadow-2xl overflow-hidden"
      style={{
        width: '1080px',
        height: format === '1:1' ? '1080px' : '1350px'
      }}
    >
      {children}
    </div>
  );
}

// Post #1: Static (Kdo je tvůj zákazník)
function Post1Static() {
  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-9xl">🎯</div>
          <div className="absolute bottom-20 right-20 text-9xl">❓</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5">👥</div>
        </div>

        <div className="relative z-10 bg-white/95 backdrop-blur rounded-3xl p-16 shadow-2xl max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="text-5xl font-bold text-red-600">
              Proč většina začínajících podnikatelů
            </div>
            <div className="text-4xl text-slate-700">
              skončí ten samý rok? 😰
            </div>
          </div>

          {/* Problems */}
          <div className="space-y-4 text-3xl">
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
              <span className="text-4xl">❌</span>
              <div className="flex-1">
                <span className="font-bold text-red-600">NEVÍ KDO</span>
                <span className="text-slate-700"> je jejich zákazník</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
              <span className="text-4xl">❌</span>
              <div className="flex-1">
                <span className="font-bold text-red-600">NEVÍ KDE</span>
                <span className="text-slate-700"> ho najít</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
              <span className="text-4xl">❌</span>
              <div className="flex-1">
                <span className="font-bold text-red-600">NEVÍ CO</span>
                <span className="text-slate-700"> mu nabídnout</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-4 border-purple-200 my-6"></div>

          {/* Solution intro */}
          <div className="text-center space-y-4">
            <div className="text-2xl text-slate-600">
              Narozdíl od guru, co jen mluví...
            </div>
            <div className="text-4xl font-bold text-green-600">
              ✅ VEDEME TĚ KROK ZA KROKEM
            </div>
            <div className="space-y-2 text-2xl text-slate-700">
              <div>Vyplníš si to <span className="font-bold text-purple-600">SAM</span></div>
              <div>Pro <span className="font-bold text-purple-600">TVÉ</span> podnikání</div>
              <div>S <span className="font-bold text-purple-600">DATY</span>, ne domněnkami</div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-4 border-purple-200 my-6"></div>

          {/* Features */}
          <div className="text-center space-y-3">
            <div className="text-2xl text-slate-600 mb-4">
              Ať máš kavárnu, e-shop nebo služby:
            </div>
            <div className="space-y-3 text-2xl">
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
                <span className="text-3xl">➡️</span>
                <div className="flex-1 text-left">
                  <span className="font-bold text-blue-600">FIT VALIDÁTOR</span>
                  <span className="text-slate-700"> tě provede systematicky</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
                <span className="text-3xl">➡️</span>
                <div className="flex-1 text-left">
                  Zjistíš <span className="font-bold text-blue-600">PŘESNĚ</span>
                  <span className="text-slate-700"> komu prodáváš</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
                <span className="text-3xl">➡️</span>
                <div className="flex-1 text-left">
                  Ověříš si to <span className="font-bold text-blue-600">PŘED</span>
                  <span className="text-slate-700"> investicí</span>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-4 border-purple-200 my-6"></div>

          {/* Final message */}
          <div className="text-center space-y-4">
            <div className="space-y-2 text-3xl text-slate-700">
              <div>Žádné guessing.</div>
              <div>Žádné bláboly.</div>
              <div className="text-4xl font-bold text-purple-600">REÁLNÁ VALIDACE.</div>
            </div>
            <div className="text-3xl font-bold text-blue-600 pt-4">
              👉 www.podnikatelskactvrtka.cz
            </div>
          </div>
        </div>
      </div>
    </PostContainer>
  );
}

// Post #2: Animovaný BMC
function Post2AnimatedBMC() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const blocks = [
    { id: 'partners', label: 'Partneři', color: 'from-blue-500 to-blue-600', step: 2 },
    { id: 'activities', label: 'Aktivity', color: 'from-purple-500 to-purple-600', step: 2 },
    { id: 'resources', label: 'Zdroje', color: 'from-pink-500 to-pink-600', step: 2 },
    { id: 'value', label: 'Hodnotová\nnabídka', color: 'from-orange-500 to-orange-600', step: 1 },
    { id: 'relations', label: 'Vztahy se\nzákazníky', color: 'from-yellow-500 to-yellow-600', step: 3 },
    { id: 'channels', label: 'Kanály', color: 'from-green-500 to-green-600', step: 3 },
    { id: 'segments', label: 'Segmenty\nzákazníků', color: 'from-teal-500 to-teal-600', step: 1 },
    { id: 'costs', label: 'Náklady', color: 'from-red-500 to-red-600', step: 2 },
    { id: 'revenue', label: 'Příjmy', color: 'from-emerald-500 to-emerald-600', step: 3 },
  ];

  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col p-6 relative overflow-hidden">
        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 20
            }}
            className="text-center mb-6 relative z-10"
          >
            <div className="text-4xl font-bold text-white mb-2">
              {step === 0 && "😰 Znáš to?"}
              {step === 1 && "✅ VYPLŇUJEŠ model"}
              {step === 2 && "🔄 Je ŽIVÝ, roste s tebou"}
              {step === 3 && "🚀 Pracuješ s ním POŘÁD"}
            </div>
            <div className="text-xl text-slate-300">
              {step === 0 && "Frustrace každého podnikatele"}
              {step === 1 && "Přidáváš TVOJE data"}
              {step === 2 && "Upravuješ, zlepšuješ"}
              {step === 3 && "STRATEGIE co žije"}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* BMC Grid */}
        <div className="flex-1 grid grid-cols-3 gap-3 p-4">
          {blocks.map((block, index) => {
            const isVisible = step === 0 ? false : step >= block.step;
            
            return (
              <motion.div
                key={block.id}
                animate={{ 
                  opacity: isVisible ? 1 : (step === 0 ? 0.4 : 0.3),
                  scale: isVisible ? 1 : 0.98,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 0.8,
                  delay: isVisible ? index * 0.05 : 0,
                }}
                className={`
                  rounded-2xl border-2 flex flex-col items-center justify-center text-center p-2
                  ${isVisible 
                    ? `bg-gradient-to-br ${block.color} border-white/30 shadow-lg` 
                    : 'bg-slate-800/60 border-slate-700'
                  }
                `}
              >
                {step === 0 ? (
                  <motion.div 
                    className="text-white text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="text-4xl mb-2">😰</div>
                    <div className="text-xl leading-tight whitespace-pre-line font-bold drop-shadow-lg">
                      {index === 0 && "Kde\nzačít?"}
                      {index === 1 && "Co mám\ndělat?"}
                      {index === 2 && "Jak na\nmarketing?"}
                      {index === 3 && "Všechno\nje složité"}
                      {index === 4 && "Nechci\ndalší videa"}
                      {index === 5 && "Hodiny\nstudování"}
                      {index === 6 && "Kde jsou\nzákazníci?"}
                      {index === 7 && "Nemám\nsystém"}
                      {index === 8 && "Co\nvůbec?"}
                    </div>
                  </motion.div>
                ) : isVisible ? (
                  <motion.div 
                    className="text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <div className="text-lg font-bold leading-tight whitespace-pre-line">
                      {block.label}
                    </div>
                    <div className="text-4xl mt-2">
                      ✓
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-slate-600 text-xs">
                    ...
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 relative z-10">
          <AnimatePresence mode="wait">
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="text-2xl font-bold text-green-400">
                  Model co s tebou ROSTE
                </div>
                <div className="text-xl text-white">
                  Živá STRATEGIE • Neustálý rozvoj
                </div>
                <div className="text-lg text-slate-300">
                  90 minut • Systém na roky
                </div>
                <div className="text-xl text-white font-bold mt-4">
                  👉 www.podnikatelskactvrtka.cz
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i === step ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// Post #3: Kalkulačka cíle (animace)
function Post3Calculator() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-9xl">📊</div>
          <div className="absolute bottom-20 right-20 text-9xl">💰</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5">🎯</div>
        </div>

        <div className="relative z-10 bg-white/95 backdrop-blur rounded-3xl p-16 shadow-2xl max-w-4xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {step === 0 && (
                <div className="space-y-8">
                  <div className="text-5xl font-bold text-red-600">
                    95 % podnikatelů
                  </div>
                  <div className="text-3xl text-slate-700">
                    dělá byznys "od oka" 🙈
                  </div>
                  <div className="space-y-4 text-2xl text-slate-600">
                    <div>❌ Doufají, že to vyjde</div>
                    <div>❌ Nemají přesný cíl</div>
                    <div>❌ Neví KOLIK zákazníků potřebují</div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <div className="text-5xl font-bold text-green-600">
                    ✅ To se dá SPOČÍTAT!
                  </div>
                  <div className="text-3xl text-slate-700">
                    Příklad: Tvoje kavárna ☕
                  </div>
                  <div className="space-y-4 text-2xl text-slate-600">
                    <div className="flex items-center justify-between border-b-2 pb-2">
                      <span>Nájem + náklady:</span>
                      <span className="font-bold">50.000 Kč/měsíc</span>
                    </div>
                    <div className="flex items-center justify-between border-b-2 pb-2">
                      <span>Průměrný účet:</span>
                      <span className="font-bold">150 Kč</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="text-4xl font-bold text-purple-600">
                    Kolik zákazníků potřebuješ?
                  </div>
                  <div className="bg-slate-100 rounded-2xl p-8 space-y-4">
                    <div className="text-3xl text-center font-mono">
                      50.000 Kč ÷ 150 Kč
                    </div>
                    <div className="text-6xl text-center font-bold text-purple-600">
                      = 334
                    </div>
                    <div className="text-2xl text-center text-slate-600">
                      zákazníků měsíčně
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="text-5xl font-bold text-orange-600 text-center">
                    334 zákazníků/měsíc
                  </div>
                  <div className="text-3xl text-slate-700 text-center">
                    To znamená:
                  </div>
                  <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-8">
                    <div className="text-7xl font-bold text-center text-orange-600 mb-4">
                      11
                    </div>
                    <div className="text-3xl text-center text-slate-700">
                      zákazníků DENNĚ
                    </div>
                  </div>
                  <div className="text-2xl text-center text-green-600 font-bold">
                    Teď víš přesně KAM míříš!
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8 text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    ⚡ Kalkulačka cíle
                  </div>
                  <div className="text-2xl text-slate-700">
                    je součást Podnikatelské Čtvrtky
                  </div>
                  <div className="space-y-3 text-xl text-slate-600">
                    <div>⏱️ 90 minut</div>
                    <div>🎯 Přesná čísla</div>
                    <div>💡 Víš co dělat s těmito čísly</div>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 pt-6">
                    👉 www.podnikatelskactvrtka.cz
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3 mt-8 relative z-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i === step ? 'bg-white scale-125 shadow-lg' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// Post #4: Proč vznikla Čtvrtka (behind-the-scenes)
function Post4Static() {
  const imageUrl = 'https://images.unsplash.com/photo-1758876202699-abeb827f35b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjB3b3Jrc3BhY2UlMjBzdGFydHVwfGVufDF8fHx8MTc2MzU0MTUwNnww&ixlib=rb-4.1.0&q=80&w=1080';

  return (
    <PostContainer format="1:1">
      <div 
        className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95"></div>

        <div className="relative z-10 bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl max-w-4xl w-full space-y-3">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Proč vznikla
            </div>
            <div className="text-4xl font-bold text-slate-800">
              Podnikatelská čtvrtka?
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-2 border-purple-200 my-2"></div>

          {/* Story sections */}
          <div className="space-y-3 text-slate-700">
            {/* Section 1 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl">
              <div className="text-lg leading-snug">
                Vždycky mě <span className="font-bold text-purple-600">fascinovalo podnikání</span> - lze ho neustále zlepšovat, vydat tam svoji kreativitu, odlišit se.
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-2xl">
              <div className="text-lg leading-snug">
                Pozoroval jsem podniky kolem. Jednou tam bylo tohle, za půl roku tohle... <span className="font-bold text-red-600">a nakonec skončily</span>.
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl">
              <div className="text-lg leading-snug">
                <span className="font-bold text-green-600">Obdivoval jsem ty lidi.</span> Šli proti proudu. Chtěli vybudovat něco, co je bavilo, naplňovalo.
              </div>
            </div>

            {/* Section 4 - Key stat */}
            <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-2xl border-2 border-red-300">
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-red-600">
                  ⚠️ 50 % končí ten samý rok
                </div>
                <div className="text-lg text-slate-700">
                  Kvůli <span className="font-bold">kravině</span>. Nemají efektivní plán.
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-slate-100 p-4 rounded-2xl">
              <div className="leading-snug space-y-1">
                <div className="font-bold text-slate-800">Místo toho:</div>
                <div>💸 Bezhlavě investují statisíce do nájmů</div>
                <div>🏢 Řeší prostory před tím, než vědí CO prodávat</div>
                <div>😰 A pak zjistí, že o to <span className="font-bold text-red-600">nikdo nestojí</span></div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl">
              <div className="text-lg leading-snug">
                Máme tady <span className="font-bold">gigantské poradenství</span>. Ale pro lidi, co prostě chtějí dělat to, co je baví? <span className="font-bold text-orange-600">Pro ně nebylo nic.</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-2 border-purple-200 my-2"></div>

          {/* Final CTA */}
          <div className="text-center space-y-2 pt-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Proto vznikla Podnikatelská čtvrtka
            </div>
            <div className="text-lg text-slate-600">
              90 minut. 4.999 Kč. Jasný plán ještě před investicí.
            </div>
            <div className="text-base text-slate-500 italic pt-1">
              Aby ti lidi, co jdou proti proudu,<br/>
              nemuseli končit kvůli kravině.
            </div>
            <div className="text-xl font-bold text-blue-600 pt-2">
              👉 www.podnikatelskactvrtka.cz
            </div>
          </div>
        </div>
      </div>
    </PostContainer>
  );
}

// Main component
export default function OrganicPosts() {
  const [currentPost, setCurrentPost] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (text: string, id: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderPost = () => {
    switch (currentPost) {
      case 0: return <Post1Static />;
      case 1: return <Post2AnimatedBMC />;
      case 2: return <Post3Calculator />;
      case 3: return <Post4Static />;
      default: return <Post1Static />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            📱 Organic Posts - 30 dní série
          </h1>
          <p className="text-xl text-slate-300">
            Jeden post denně • Vysoká hodnota • Bez know-how
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={() => setCurrentPost((prev) => Math.max(0, prev - 1))}
            disabled={currentPost === 0}
            className="p-4 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-all"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">
              Post #{currentPost + 1}
            </div>
            <div className="text-lg text-slate-300">
              {POSTS[currentPost].title}
            </div>
            <div className="mt-2 px-4 py-2 bg-white/10 rounded-full inline-block">
              <span className={`text-sm ${POSTS[currentPost].type === 'animated' ? 'text-green-400' : 'text-blue-400'}`}>
                {POSTS[currentPost].type === 'animated' ? '🎬 Animovaný' : '📄 Static'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentPost((prev) => Math.min(POSTS.length - 1, prev + 1))}
            disabled={currentPost === POSTS.length - 1}
            className="p-4 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-all"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* Copy button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => handleCopy(POSTS[currentPost].copy, POSTS[currentPost].id)}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            {copiedId === POSTS[currentPost].id ? (
              <>
                <Check className="w-6 h-6" />
                <span className="text-xl">Zkopírováno! ✅</span>
              </>
            ) : (
              <>
                <Copy className="w-6 h-6" />
                <span className="text-xl">Zkopírovat copy</span>
              </>
            )}
          </button>
        </div>

        {/* Post preview */}
        <div className="flex justify-center">
          {renderPost()}
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-4xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">📸 Jak exportovat:</h3>
          <ol className="space-y-3 text-lg text-slate-300">
            <li>1️⃣ Screenshot celé stránky (1080×1080 nebo 1080×1350)</li>
            <li>2️⃣ Zkopíruj copy tlačítkem výše</li>
            <li>3️⃣ Upload na FB/IG + vlož copy</li>
            <li>4️⃣ {POSTS[currentPost].type === 'animated' ? '🎬 Pro animaci: Screen record (15-30 sec)' : '📄 Hotovo!'}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}