/**
 * 🎯 SALES PAGE - Emotion-driven landing
 * 
 * 📝 CO UPRAVIT:
 * 1. Řádek 353: [Tvoje jméno] v STORY sekci
 * 2. Řádek 1653-1655: [Tvůj podpis], [Tvoje jméno], [Tvoje firma/pozice] v Personal Letter
 * 3. Demo section (řádek ~975): Nahradit za real video nebo iframe
 * 
 * 🎨 STRUKTURA:
 * - Hero → Pain → Testimonials → Story → Analogy → Framework → Testimonials 
 *   → Solution → Demo → Bonuses → Price → Guarantee → FAQ → Final CTA → Personal Letter
 * 
 * ✅ TESTIMONIALS: Real data z homepage (SwipeableTestimonials)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Mail,
  Shield,
  HelpCircle,
  Gift,
  Calculator,
  FileText,
  Target,
  Zap,
  X,
  Play
} from 'lucide-react';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { CourseAnimatedDemo } from './CourseAnimatedDemo';

export default function SalesPage() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Real testimonials from homepage
  const testimonials = [
    {
      name: "Petra Svobodová",
      business: "Fitness trenérka, Praha",
      text: "Cvičila jsem s různými lidmi, ale po porodu jsem sama bojovala s nadváhou. Čtvrtka mi ukázala, že právě tohle je má síla - začala jsem otevřeně sdílet svůj příběh a zaměřila se čistě jen na maminky po porodu. Důvěřují mi, protože vědí, že jsem si tím prošla.",
      result: "Za 3 měsíce: 120 prodaných ebooků 'Fit maminka' a 35 pravidelných klientek"
    },
    {
      name: "Martin Novák",
      business: "Autoservis Novák, Brno",
      text: "Dřív jsem myslel, že je to jen o tom opravit auto a inkasovat. Čtvrtka mi ukázala, že zákazníci chtějí hlavně splnit termín a vědět, co se děje. Začal jsem posílat SMS s updaty a během půl roku se 80% zákazníků vrací.",
      result: "80% zákazníků se vrací a aktivně mě doporučují dál"
    },
    {
      name: "Jana Horáková",
      business: "Studio Petra, Ostrava",
      text: "Zákaznice se mě pořád ptaly, jaký kondicionér používám. Čtvrtka mi ukázala, že tady je obchodní příležitost. Začala jsem vyrábět vlastní řadu vlasové kosmetiky.",
      result: "Za 4 měsíce: 10k Kč měsíčně navíc bez extra práce"
    },
    {
      name: "Lukáš Kořínek",
      business: "Pizzeria Ristorante, Brno",
      text: "Myslel jsem, že musím jít ještě levněji než konkurence. Čtvrtka mi ukázala, že můžu jít na kvalitu - domací těsto, čerstvé suroviny, garantovaný rozvoz do 30 minut. Zákazníci oceňují rychlost a chuť, ne nejnižší cenu.",
      result: "Po 2 měsících: 3x více objednávek než konkurence"
    }
  ];

  // Sticky CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCheckout = () => {
    const checkoutSection = document.getElementById('checkout-section');
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Testimonial component
  const TestimonialCard = ({ testimonial, delay = 0 }: { testimonial: typeof testimonials[0], delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.business}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
        <p className="text-sm font-bold text-green-800">✅ Výsledek:</p>
        <p className="text-sm text-gray-700">{testimonial.result}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm mb-6 font-semibold shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span>Od nápadu k ziskovému byznysu</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Než investuješ <span className="text-purple-600 font-black">300 tisíc</span> do byznysu,
                <br />
                investuj <span className="text-pink-600 font-black">90 minut</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-700 mb-8">
                Za jedno odpoledne zjistíš:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">Jestli to vůbec stojí za to</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">Kolik zákazníků potřebuješ</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">Jestli je marže dobrá</span>
                </li>
              </ul>
              <p className="text-lg text-gray-600 mb-8">
                Ještě <span className="font-bold">PŘED tím</span>, než utratíš první korunu.
              </p>

              {/* 3 checks */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border-2 border-purple-100">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-800">Model podnikání za 90 minut</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-800">Mapa celého byznysu na 1 A4</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-800">Víš přesně, co dělat zítra</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  onClick={scrollToCheckout}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all"
                >
                  Chci to za 4 999 Kč
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={scrollToDemo}
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-xl"
                >
                  Ukaž mi jak to vypadá ↓
                </Button>
              </div>

              {/* Sub-CTA */}
              <p className="text-sm text-gray-600">
                🎁 + 4 bonusy v hodnotě 3 500 Kč zdarma
                <br />
                ⏱️ Okamžitý přístup • 💯 Garance vrácení peněz
              </p>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 shadow-2xl border-2 border-purple-200">
                {/* Mockup - 9 boxes grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Segmenty', color: 'bg-blue-500' },
                    { label: 'Hodnota', color: 'bg-green-500' },
                    { label: 'Kanály', color: 'bg-yellow-500' },
                    { label: 'Vztahy', color: 'bg-purple-500' },
                    { label: 'Logo', color: 'bg-gray-200', center: true },
                    { label: 'Příjmy', color: 'bg-pink-500' },
                    { label: 'Zdroje', color: 'bg-indigo-500' },
                    { label: 'Aktivity', color: 'bg-orange-500' },
                    { label: 'Náklady', color: 'bg-red-500' },
                  ].map((box, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className={`${box.color} rounded-lg p-4 text-white text-xs font-bold ${
                        box.center ? 'flex items-center justify-center' : ''
                      }`}
                    >
                      {box.center ? '🎯' : box.label}
                    </motion.div>
                  ))}
                </div>
                <p className="text-center mt-6 text-gray-700 font-semibold">
                  Celý tvůj byznys na 1 A4 papíru
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PAIN SECTION */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Je Podnikatelská Čtvrtka pro mě?
            </h2>
            <p className="text-xl text-gray-600">
              Ano! Tohle je pro tebe, i když...
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pain 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-bold">Máš nápad, ale bojíš se udělat první krok</h3>
              </div>
              <p className="text-gray-700">
                "Nevíš, jestli to vydělá nebo zhltne tvé úspory. 
                A nechceš udělat stejnou chybu jako 92% začátečníků, 
                kteří investují bez plánu."
              </p>
            </motion.div>

            {/* Pain 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <h3 className="text-xl font-bold">Už prodáváš, ale nevíš jestli správně</h3>
              </div>
              <p className="text-gray-700">
                "Možná něco důležitého přehlížíš. Možná cílíš špatný segment. 
                Možná tvá marže je moc malá. A bojíš se, že za rok budeš 
                na stejném místě – nebo v minusu."
              </p>
            </motion.div>

            {/* Pain 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border-2 border-pink-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-pink-600 flex-shrink-0" />
                <h3 className="text-xl font-bold">Chceš mít jasný plán, ne jen "zkusím to"</h3>
              </div>
              <p className="text-gray-700">
                "Žádné teoretické povídání, žádný business plán na 30 stránek. 
                Vyplníš svůj model přímo v kurzu a odejdeš s konkrétním plánem 
                co dělat zítra, příští týden a příští měsíc."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - After PAIN */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard testimonial={testimonials[0]} delay={0.1} />
            <TestimonialCard testimonial={testimonials[1]} delay={0.2} />
          </div>
        </div>
      </section>

      {/* 3. STORY SECTION - KAVÁRNA */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl text-center mb-12 text-purple-200">
              Není VŮBEC žádné tajemství, že...
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-center mb-12">
              když si vytvoříš <span className="text-purple-400">Model podnikání</span> PŘED startem,
              <br />
              můžeš si ušetřit stovky tisíc a roky ztraceného času.
            </h2>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
              <div className="mb-6">
                <p className="text-sm text-purple-200">Od: [Tvoje jméno]</p>
                <p className="text-sm text-purple-200">Místo: Praha, Česká republika</p>
              </div>

              <p className="text-lg mb-4">Milý příteli,</p>

              <p className="text-xl md:text-2xl mb-6 font-bold text-yellow-400">
                Před rokem jsem pomohl ušetřit 600 tisíc korun dvěma mladým lidem.
              </p>

              <div className="space-y-4 mb-6 text-lg">
                <p>Měli nápad.</p>
                <p>Chtěli otevřít <span className="font-bold">kavárnu</span>.</p>
                <p>Měli zápal, energii a touhu po svobodě.</p>
              </div>

              <p className="text-xl mb-4">Ale...</p>

              <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6 mb-6 space-y-2">
                <p className="flex items-start gap-2">
                  <X className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Nevěděli <strong>KOLIK</strong> zákazníků potřebují denně</span>
                </p>
                <p className="flex items-start gap-2">
                  <X className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Nevěděli <strong>JESTLI</strong> je v tom městě dost lidí</span>
                </p>
                <p className="flex items-start gap-2">
                  <X className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Nevěděli <strong>JESTLI</strong> marže pokryje nájem + výplaty</span>
                </p>
                <p className="flex items-start gap-2">
                  <X className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Nevěděli <strong>KOLIK</strong> musí prodat aby neprodělali</span>
                </p>
              </div>

              <div className="space-y-4 mb-6 text-lg">
                <p>Chtěli investovat do top kávovaru <span className="font-bold text-yellow-400">(150k)</span>.</p>
                <p>Chtěli pronajmout prostor v mrtvém městě <span className="font-bold text-yellow-400">(30k/měsíc)</span>.</p>
                <p>Chtěli začít <span className="italic">"a uvidíme jak to půjde"</span>.</p>
              </div>

              <p className="text-xl mb-4">Takže jsem je posadil.</p>
              <p className="text-xl mb-8">A za <span className="font-bold text-purple-400">90 minut</span> jsme vytvořili Model podnikání.</p>

              <p className="text-2xl mb-6 font-bold">A víš co jsme zjistili?</p>

              {/* Visual - výpočet */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 mb-6 text-center">
                <p className="text-3xl md:text-5xl font-black mb-4">
                  V TOM MĚSTĚ NEBYLO DOST LIDÍ.
                </p>
                <div className="bg-white/20 rounded-xl p-6 mt-6 text-left space-y-2">
                  <p>Potřebovali: <span className="font-bold">60 zákazníků/den</span> aby neprodělali</p>
                  <p>Realisticky mohli mít: <span className="font-bold">max 20-30</span></p>
                  <div className="border-t-2 border-white/40 my-4"></div>
                  <p className="text-xl font-bold text-yellow-300">Ztráta: -40 000 Kč měsíčně</p>
                  <p>Za rok: <span className="text-2xl font-bold">-480 000 Kč</span></p>
                  <p>+ Vstupní investice: 150k</p>
                  <div className="border-t-2 border-white/40 my-4"></div>
                  <p className="text-3xl font-black text-yellow-300">CELKEM ZTRÁTA: ~600 tisíc za první rok</p>
                </div>
              </div>

              <p className="text-2xl mb-4 font-bold text-green-400">
                90 minut jim to ušetřilo.
              </p>

              <p className="text-xl">
                A tobě to může ušetřit taky.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. ANALOGY SECTION */}
      <section className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Podnikat bez Modelu podnikání je jako...
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ŠPATNĚ */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border-4 border-red-300 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <X className="w-10 h-10 text-red-600" />
                <h3 className="text-2xl font-black text-red-600">ŠPATNĚ</h3>
              </div>

              {/* Chaotic map visual */}
              <div className="bg-gray-100 rounded-2xl p-6 mb-6 relative h-48 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">❓</div>
                </div>
                <div className="relative z-10 space-y-2 text-center">
                  <p className="font-bold text-gray-700">Chaotická mapa</p>
                  <p className="text-sm text-gray-600">Nevíš kudy kam</p>
                </div>
              </div>

              <p className="text-xl font-bold mb-4">"Mám nápad na kavárnu"</p>

              <div className="space-y-3 mb-6">
                <p className="font-bold text-gray-800">Co nevíš:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Kolik zákazníků potřebuješ?</li>
                  <li>• Je v tom městě dost lidí?</li>
                  <li>• Kolik musíš prodat aby ses neuživil dluhy?</li>
                  <li>• Je marže dost velká?</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                <p className="font-bold text-red-800 mb-2">Výsledek:</p>
                <ul className="space-y-1 text-red-700 text-sm">
                  <li>💸 Ztratíš 300-600k za rok</li>
                  <li>😰 Nevíš jestli to má smysl</li>
                  <li>🔄 Trial & error = drahé experimenty</li>
                </ul>
              </div>
            </motion.div>

            {/* SPRÁVNĚ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border-4 border-green-300 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
                <h3 className="text-2xl font-black text-green-600">SPRÁVNĚ</h3>
              </div>

              {/* Model visual */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 h-48">
                <div className="grid grid-cols-3 gap-2 h-full">
                  {[1,2,3,4,5,6,7,8,9].map(i => (
                    <div key={i} className="bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xl font-bold mb-4">"Mám Model podnikání"</p>

              <div className="space-y-3 mb-6">
                <p className="font-bold text-gray-800">Co VÍŠ:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Potřebuješ 60 zákazníků denně</li>
                  <li>• V tom městě je jen 30 realisticky</li>
                  <li>• Marže musí být min 65% aby to fungovalo</li>
                  <li>• Ten segment je moc malý → HLEDEJ JINÉ MĚSTO</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                <p className="font-bold text-green-800 mb-2">Výsledek:</p>
                <ul className="space-y-1 text-green-700 text-sm">
                  <li>✅ Ušetříš 600k</li>
                  <li>✅ Víš JEŠTĚ PŘED tím než investuješ</li>
                  <li>✅ Neztrácíš čas na špatné místo</li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-2xl mt-12"
          >
            Vidíš ten rozdíl?
            <br />
            <span className="text-gray-600">
              Stejná investice času (90 minut vs. rok zkoušení).
              <br />
              Ale <span className="font-bold text-purple-600">ÚPLNĚ JINÝ VÝSLEDEK</span>.
            </span>
          </motion.p>
        </div>
      </section>

      {/* 5. FRAMEWORK SECTION - 3 LEVELS */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              3 úrovně podnikání
            </h2>
            <p className="text-xl text-gray-600">
              (a proč většina začátečníků zůstává uvíznutá na úrovni 1)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1 - RED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-4 border-red-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-black">
                  1
                </div>
                <div>
                  <p className="text-sm text-red-600 font-bold">Level 1</p>
                  <h3 className="text-xl font-black">"Mám nápad"</h3>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold text-red-800 mb-2">Problém:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Nevíš jestli to funguje</li>
                  <li>• Buildíš bez validace</li>
                  <li>• Ztrácíš peníze na hádání</li>
                  <li>• 90% failuje do 2 let</li>
                </ul>
              </div>

              <div className="bg-red-100 border-2 border-red-300 rounded-xl p-3 mb-4">
                <p className="text-sm font-bold text-red-800 mb-1">Příklad:</p>
                <p className="text-xs text-gray-700">
                  "Chci otevřít kavárnu v tom městě"
                  <br />
                  <span className="italic">(ale nevíš jestli je tam dost lidí)</span>
                </p>
              </div>

              <div className="bg-red-200 rounded-lg p-3">
                <p className="text-sm font-bold text-red-900">Výsledek:</p>
                <p className="text-xs text-red-800">Ztracené peníze, čas, energie.</p>
              </div>
            </motion.div>

            {/* Level 2 - ORANGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-4 border-orange-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-black">
                  2
                </div>
                <div>
                  <p className="text-sm text-orange-600 font-bold">Level 2</p>
                  <h3 className="text-xl font-black">"Mám business plán"</h3>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold text-orange-800 mb-2">Problém:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Složitý, teoretický</li>
                  <li>• Nikdo to nečte (ani ty)</li>
                  <li>• Nefunguje v praxi</li>
                  <li>• Není vizuální</li>
                </ul>
              </div>

              <div className="bg-orange-100 border-2 border-orange-300 rounded-xl p-3 mb-4">
                <p className="text-sm font-bold text-orange-800 mb-1">Příklad:</p>
                <p className="text-xs text-gray-700">
                  Excel s projekcemi na 5 let
                  <br />
                  <span className="italic">(které stejně nesedí s realitou)</span>
                </p>
              </div>

              <div className="bg-orange-200 rounded-lg p-3">
                <p className="text-sm font-bold text-orange-900">Výsledek:</p>
                <p className="text-xs text-orange-800">Dokument v šuplíku, realita jiná.</p>
              </div>
            </motion.div>

            {/* Level 3 - GREEN */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-4 border-green-400 relative overflow-hidden"
            >
              {/* Best choice badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 text-xs font-bold rounded-bl-xl">
                ⭐ NEJLEPŠÍ
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-black">
                  3
                </div>
                <div>
                  <p className="text-sm text-green-600 font-bold">Level 3</p>
                  <h3 className="text-xl font-black">"Mám Model podnikání"</h3>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold text-green-800 mb-2">Výhoda:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 1 A4 papír, všechno jasné</li>
                  <li>• Validuješ PŘED investicí</li>
                  <li>• Vidíš kde tratíš</li>
                  <li>• Víš přesně co dělat</li>
                </ul>
              </div>

              <div className="bg-green-100 border-2 border-green-300 rounded-xl p-3 mb-4">
                <p className="text-sm font-bold text-green-800 mb-1">Příklad:</p>
                <p className="text-xs text-gray-700">
                  9 boxů vyplněných + kalkulačky
                  <br />
                  → Potřebuješ 60 zákazníků denně
                  <br />
                  → V tom městě je max 30
                  <br />
                  → ❌ NEHLEDEJ JINÉ MĚSTO ✅
                </p>
              </div>

              <div className="bg-green-200 rounded-lg p-3">
                <p className="text-sm font-bold text-green-900">Výsledek:</p>
                <p className="text-xs text-green-800">Šetříš peníze, čas a nervy. Startneš správně hned napoprvé.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - After FRAMEWORK */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard testimonial={testimonials[2]} delay={0.1} />
            <TestimonialCard testimonial={testimonials[3]} delay={0.2} />
          </div>
        </div>
      </section>

      {/* 6. SOLUTION SECTION */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Podnikatelská Čtvrtka = Tvůj Model podnikání za 90 minut
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interaktivní online kurz který projdeš za jedno odpoledne
              a odejdeš s jasným plánem co dělat.
            </p>
          </motion.div>

          {/* 3 MODULY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Modul 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-4 mb-4 text-center">
                <Target className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-black">MODUL 1</h3>
                <p className="text-sm opacity-90">Model podnikání</p>
              </div>

              <p className="text-sm text-gray-600 mb-4">9 lekcí • 45 minut</p>

              <p className="mb-4 font-bold text-gray-800">
                Zjistíš KOMU prodáváš, CO řešíš, JAK se k nim dostaneš a KOLIK to vydělá.
              </p>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p className="font-bold">Vyplníš 9 bloků přímo v kurzu:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Zákaznické segmenty</li>
                  <li>• Hodnotová nabídka</li>
                  <li>• Kanály</li>
                  <li>• Vztahy</li>
                  <li>• Příjmy</li>
                  <li>• Zdroje</li>
                  <li>• Aktivity</li>
                  <li>• Partneři</li>
                  <li>• Náklady</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3">
                <p className="text-sm font-bold text-purple-800">Výsledek:</p>
                <p className="text-xs text-gray-700">Máš celý byznys na 1 A4 papíru.</p>
              </div>
            </motion.div>

            {/* Modul 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl border-2 border-indigo-200"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-4 mb-4 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-black">MODUL 2</h3>
                <p className="text-sm opacity-90">Vylepšení modelu</p>
              </div>

              <p className="text-sm text-gray-600 mb-4">4 lekce • 30 minut</p>

              <p className="mb-4 font-bold text-gray-800">
                Zjistíš JESTLI to finančně vychází a CO upravit.
              </p>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p className="font-bold">Projdeš:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Pravidla dobrého modelu</li>
                  <li>• Finanční analýza</li>
                  <li>• Řešení situací</li>
                  <li>• 50 real-world příkladů</li>
                </ul>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-3">
                <p className="text-sm font-bold text-indigo-800">Výsledek:</p>
                <p className="text-xs text-gray-700">Víš jestli to má smysl PŘED investicí.</p>
              </div>
            </motion.div>

            {/* Modul 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-200"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-4 mb-4 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-black">MODUL 3</h3>
                <p className="text-sm opacity-90">FIT Validátor</p>
              </div>

              <p className="text-sm text-gray-600 mb-4">3 lekce • 15 minut</p>

              <p className="mb-4 font-bold text-gray-800">
                Zjistíš PŘESNĚ kdo je tvůj ideální zákazník a co ho motivuje koupit.
              </p>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p className="font-bold">Vytvoříš:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Zákaznický profil</li>
                  <li>• Hodnotová mapa</li>
                  <li>• FIT skóre</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                <p className="text-sm font-bold text-green-800">Výsledek:</p>
                <p className="text-xs text-gray-700">Znáš svého zákazníka líp než on sám.</p>
              </div>
            </motion.div>
          </div>

          {/* BONUSOVÉ NÁSTROJE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-200"
          >
            <h3 className="text-2xl font-black text-center mb-8">
              🧮 Bonusové nástroje (built-in)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Calculator, label: 'Kalkulačka zákazníků', desc: 'Kolik jich potřebuješ měsíčně?' },
                { icon: TrendingUp, label: 'Kalkulačka marže', desc: 'Je to ziskové?' },
                { icon: Users, label: 'Kalkulačka segmentu', desc: 'Je trh dost velký?' },
                { icon: FileText, label: 'PDF Export', desc: 'Stáhni model jako PDF' },
                { icon: Target, label: 'Akční plán', desc: 'Konkrétní kroky co dělat zítra' },
                { icon: Zap, label: 'Canvas Validator', desc: 'Zkontroluj jestli to sedí' },
              ].map((tool, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg p-2 flex-shrink-0">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{tool.label}</p>
                    <p className="text-xs text-gray-600">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. DEMO SECTION - Real Interactive Demo */}
      <section id="demo-section" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Takhle to vypadá uvnitř
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              Živá ukázka - sleduj jak Jana vytváří Model podnikání pro svou kavárnu
            </p>
            <p className="text-sm text-purple-600 font-semibold">
              ⏱️ 60 sekund • Interaktivní animace
            </p>
          </motion.div>

          {/* Real Course Demo */}
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <CourseAnimatedDemo />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-2xl mb-4">
              "90 minut. 1 A4 papír. Celý tvůj byznys."
            </p>
            <div className="space-y-2 text-gray-600 mb-8">
              <p>→ Vyplň přímo v kurzu (žádný Excel!)</p>
              <p>→ Exportuj jako PDF (vytiskni, ukaž investorovi)</p>
              <p>→ Používej každý den (živý dokument)</p>
            </div>

            <Button
              onClick={scrollToCheckout}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 rounded-xl shadow-xl"
            >
              Chci to zkusit za 4 999 Kč
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 8. BONUSES SECTION */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm mb-6 font-semibold shadow-lg">
              <Gift className="w-4 h-4" />
              <span>Bonusy v ceně</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Ale to není všechno!
            </h2>
            <p className="text-xl text-gray-600">
              Když si zajistíš místo teď, dostaneš ZDARMA
              <br />
              bonusy v hodnotě <span className="font-bold text-purple-600">3 500 Kč+</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              (k hlavnímu kurzu navíc, bez příplatku)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Bonus 1 - FB skupina */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-3 flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black mb-2">Přístup do privátní FB skupiny</h3>
                  <p className="text-sm text-purple-600 mb-2">Hodnota: Nevyčíslitelné</p>
                </div>
              </div>
              <p className="text-gray-700">
                Diskuze s dalšími podnikateli, sdílení zkušeností, tipy na řešení konkrétních problémů, networking.
              </p>
            </motion.div>

            {/* Bonus 2 - Konzultace */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-3 flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black mb-2">1× konzultace ZDARMA</h3>
                  <p className="text-sm text-orange-600 mb-2">Hodnota: 2 500 Kč</p>
                </div>
              </div>
              <p className="text-gray-700">
                Můžeš si nechat zkontrolovat svůj model podnikání a dostat konkrétní tipy přímo od nás (30 min call).
              </p>
            </motion.div>

            {/* Bonus 3 - Lifetime updaty */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-3 flex-shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black mb-2">Všechny budoucí updaty navždy</h3>
                  <p className="text-sm text-indigo-600 mb-2">Hodnota: ∞</p>
                </div>
              </div>
              <p className="text-gray-700">
                Vylepšení, grafy, nové moduly, šablony... vše co přidáme v budoucnu dostaneš automaticky zdarma.
              </p>
            </motion.div>

            {/* Bonus 4 - Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-3 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black mb-2">
                    Měsíční newsletter s tipy <span className="text-sm text-gray-500">(coming soon)</span>
                  </h3>
                  <p className="text-sm text-green-600 mb-2">Hodnota: 999 Kč/měsíc</p>
                </div>
              </div>
              <p className="text-gray-700">
                Konkrétní strategie, nástroje a best practices pro tvůj model podnikání přímo do mailu.
              </p>
            </motion.div>
          </div>

          {/* Celková hodnota */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-8 text-center shadow-2xl"
          >
            <p className="text-2xl md:text-3xl mb-3">
              <span className="opacity-75">Kurz:</span> 4 999 Kč
            </p>
            <p className="text-2xl md:text-3xl mb-3">
              <span className="opacity-75">Bonusy:</span> 3 500 Kč+
            </p>
            <div className="border-t-2 border-white/40 my-4"></div>
            <p className="text-3xl md:text-4xl mb-6">
              <span className="opacity-75">CELKEM:</span> <span className="line-through">8 500 Kč+</span>
            </p>
            <p className="text-4xl md:text-6xl font-black mb-2">
              TY PLATÍŠ: 4 999 Kč
            </p>
            <p className="text-lg text-white/90">
              (všechny bonusy v ceně, bez příplatků)
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. PRICE SECTION */}
      <section id="checkout-section" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Jaká je tvá investice?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mohl bych ti účtovat 50 000 Kč za konzultaci na vytvoření modelu podnikání.
              <br />
              <br />
              Ale protože je tohle online kurz, který zvládneš sám,
              <br />
              cena je zlomek toho.
            </p>
          </motion.div>

          {/* Pricing box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-purple-200 mb-12"
          >
            <div className="text-center mb-8">
              <p className="text-2xl text-gray-600 line-through mb-4">Běžně: 8 499 Kč</p>
              <p className="text-5xl md:text-7xl font-black text-purple-600 mb-4">
                DNES: 4 999 Kč
              </p>
              <p className="text-xl text-green-600 font-bold">
                (ušetříš 3 499 Kč)
              </p>

              <div className="my-8 border-t-2 border-purple-300"></div>

              <p className="text-xl mb-2">NEBO</p>
              <p className="text-3xl font-bold text-purple-600">
                3× 1 699 Kč
              </p>
              <p className="text-sm text-gray-600">(splátky bez navýšení)</p>
            </div>

            {/* Value proposition */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <p className="text-2xl mb-4 text-center">💭 Zamysli se:</p>
              <p className="text-xl font-bold text-center mb-4">
                Co tě stojí, že NEMÁŠ Model podnikání?
              </p>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Kolik peněz ztratíš příští měsíc na špatných rozhodnutích?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Kolik času promrháš na věci, které nepřinesou výsledky?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Kolik nocí budeš bdít a řešit "jestli to má smysl"?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Kolik tisíc utratíš na zkoušení "co funguje"?</span>
                </li>
              </ul>

              <div className="border-t-2 border-gray-200 my-6"></div>

              <p className="text-center text-gray-700 mb-2">
                4 999 Kč je cena <strong>2× tank do auta</strong>.
                <br />
                Nebo <strong>5× oběd v restauraci</strong>.
              </p>

              <p className="text-center text-xl font-bold text-purple-600">
                Ale místo toho můžeš investovat do nástroje,
                <br />
                který ti ušetří stovky tisíc.
              </p>

              <p className="text-center text-gray-600 mt-4 italic">
                Jako těm dvěma lidem s kavárnou.
                <br />
                600 tisíc za 90 minut.
              </p>
            </div>

            {/* CTA */}
            <Button
              onClick={() => window.location.href = '/objednavka'}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl px-8 py-8 rounded-xl shadow-xl hover:shadow-2xl transition-all"
            >
              Ano, chci Podnikatelskou Čtvrtku za 4 999 Kč
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>

            <div className="mt-6 space-y-2 text-center text-sm text-gray-600">
              <p className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Okamžitý přístup ke kurzu
              </p>
              <p className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Všechny bonusy zdarma (3 500 Kč+)
              </p>
              <p className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Lifetime updates
              </p>
              <p className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                14denní garance vrácení peněz
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. GUARANTEE SECTION */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Shield className="w-20 h-20 mx-auto mb-6 text-green-600" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Chápu, že možná váháš, a proto...
            </h2>
            <p className="text-2xl text-green-600 font-bold">
              Ti dávám 14denní "no questions asked" garanci
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-green-200"
          >
            <p className="text-xl mb-6 font-bold">Zde je moje garance:</p>

            <div className="space-y-4 mb-8 text-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Projdi kurz</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Vytvoř svůj Model podnikání</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Zkus to 14 dní</span>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 mb-8">
              <p className="text-xl mb-4">
                Pokud ti to nepomůže, nebo se ti to nelíbí,
                <br />
                nebo prostě z <strong>JAKÉHOKOLIV</strong> důvodu chceš peníze zpět...
              </p>

              <p className="text-2xl font-bold text-green-600">
                Napíšeš mi email a já ti vrátím 100% peněz.
              </p>
            </div>

            <div className="text-center mb-8 space-y-2 text-lg text-gray-700">
              <p>Žádné otázky.</p>
              <p>Žádné formuláře.</p>
              <p>Žádné kecy.</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-2xl p-6 mb-8">
              <p className="text-xl font-bold text-center mb-4">A NAVÍC:</p>
              <p className="text-lg text-center">
                Všechny bonusy (v hodnotě 3 500 Kč) si <strong>necháš</strong>.
                <br />
                I když vrátím peníze.
              </p>
            </div>

            <div className="space-y-4 text-lg text-gray-700 mb-8">
              <p className="font-bold text-xl">Proč to dělám?</p>
              <p>
                Protože jsem si jistý, že když projdeš kurz
                a vytvoříš Model podnikání, hodnota bude obrovská.
              </p>
              <p>
                A pokud si to nebudeš myslet ty,
                <strong className="text-purple-600"> nechci tvoje peníze</strong>.
              </p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-6 mb-8 text-center">
              <p className="text-2xl font-bold text-purple-600">
                Veškeré riziko beru na sebe!
              </p>
            </div>

            <p className="text-xl text-center mb-8">To zní fér, ne?</p>

            <Button
              onClick={() => window.location.href = '/objednavka'}
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl px-8 py-8 rounded-xl shadow-xl"
            >
              Začít teď - ZERO riziko
              <Shield className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Často kladené otázky
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-gray-50 rounded-xl px-6 border-2 border-gray-200">
              <AccordionTrigger className="text-lg font-bold">
                Jak dlouho mi bude trvat kurz?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                90 minut. Můžeš to projít najednou, nebo rozložit na 3 dny po 30 minutách. 
                Je to self-paced, máš kurz navždy.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-gray-50 rounded-xl px-6 border-2 border-gray-200">
              <AccordionTrigger className="text-lg font-bold">
                Pro koho je to?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <ul className="space-y-2">
                  <li>• <strong>Pre-launch podnikatelé</strong> (chceš začít správně)</li>
                  <li>• <strong>Existing podnikatelé</strong> (chceš optimalizovat)</li>
                  <li>• <strong>Freelanceři, služby, e-shopy</strong> (funguje na všechno)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-gray-50 rounded-xl px-6 border-2 border-gray-200">
              <AccordionTrigger className="text-lg font-bold">
                Co když to nesplním?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Kurz je tvůj navždy. Žádný deadline, žádný tlak. 
                Můžeš se k tomu vracet kolikrát chceš.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-gray-50 rounded-xl px-6 border-2 border-gray-200">
              <AccordionTrigger className="text-lg font-bold">
                Potřebuju nějaké předchozí znalosti?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Ne! Vysvětluju všechno od nuly. Žádný business žargon, žádná teorie. 
                Jen praktické kroky.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-gray-50 rounded-xl px-6 border-2 border-gray-200">
              <AccordionTrigger className="text-lg font-bold">
                Co když mi to nepomůže?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                90denní garance. Vrátím 100% peněz, no questions asked. 
                A bonusy si necháš.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-gray-50 rounded-xl px-6 border-2 border-gray-200">
              <AccordionTrigger className="text-lg font-bold">
                Je tam community/podpora?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Ano! Přístup do FB skupiny s ostatními účastníky + email podpora ode mě. 
                Nejsi v tom sám.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-gray-50 rounded-xl px-6 border-2 border-gray-200">
              <AccordionTrigger className="text-lg font-bold">
                Můžu to použít pro jakýkoliv byznys?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Ano! Funguje to pro služby, produkty, e-shopy, freelancing, SaaS... cokoliv. 
                Model podnikání je univerzální framework.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-gray-50 rounded-xl px-6 border-2 border-gray-200">
              <AccordionTrigger className="text-lg font-bold">
                Jak rychle uvidím výsledky?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Okamžitě. Už během kurzu budeš vědět jestli to má smysl, kolik potřebuješ 
                zákazníků a jestli je marže dobrá.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 12. FINAL CTA SECTION */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              Představ si, jak by vypadalo tvé podnikání za 14 dní...
            </h2>
            <p className="text-2xl text-purple-200">
              ...kdybys měl jasný Model podnikání
            </p>
          </motion.div>

          <p className="text-xl text-center mb-12 text-purple-200">
            Nečekej další měsíc. Další rok. Další "až budu připravenej".
            <br />
            <br />
            Máš dvě možnosti:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Box 1 - RED */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-500/20 backdrop-blur-sm rounded-3xl p-8 border-4 border-red-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <X className="w-12 h-12 text-red-400" />
                <h3 className="text-3xl font-black">Nedělat nic</h3>
              </div>

              <p className="text-xl mb-4">Za rok budeš pořád:</p>

              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Nevíš jestli to funguje</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Bojíš se udělat první krok</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Ztrácíš čas na špatné rozhodnutí</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Možná ztratíš stovky tisíc</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Stále v nejistotě</span>
                </li>
              </ul>
            </motion.div>

            {/* Box 2 - GREEN */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-500/20 backdrop-blur-sm rounded-3xl p-8 border-4 border-green-400"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-12 h-12 text-green-400" />
                <h3 className="text-3xl font-black">Udělat krok vpřed</h3>
              </div>

              <p className="text-xl mb-4">Za 14 dní:</p>

              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Máš jasný Model podnikání</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Víš kolik zákazníků potřebuješ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Máš konkrétní plán co dělat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Ušetříš stovky tisíc</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Klid v hlavě</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <p className="text-3xl text-center mb-12">
            Která možnost zní líp?
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => window.location.href = '/objednavka'}
              size="lg"
              className="w-full max-w-3xl mx-auto block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-2xl px-12 py-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
            >
              Ano, chci Podnikatelskou Čtvrtku za 4 999 Kč
              <ArrowRight className="w-8 h-8 ml-3" />
            </Button>

            <div className="mt-8 space-y-2 text-center">
              <p className="flex items-center justify-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Okamžitý přístup
              </p>
              <p className="flex items-center justify-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                3 500 Kč bonusů ZDARMA
              </p>
              <p className="flex items-center justify-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                90denní garance vrácení peněz
              </p>
              <p className="flex items-center justify-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Zero riziko
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 13. PERSONAL LETTER */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <h3 className="text-3xl mb-8 text-center">Poslední věc...</h3>

            <div className="space-y-6 text-lg">
              <p>
                Možná si říkáš: <span className="italic">"4 999 Kč? To je hodně."</span>
              </p>

              <p>Rozumím.</p>

              <p className="text-xl font-bold text-yellow-400">Ale zamysli se:</p>

              <p className="text-2xl font-bold">
                Co tě stojí, že NEMÁŠ Model podnikání?
              </p>

              <div className="bg-white/10 rounded-2xl p-6 my-6">
                <p className="mb-4">
                  Já jsem viděl dva lidi, kteří chtěli investovat <strong className="text-yellow-400">600 tisíc</strong>
                  <br />
                  do kavárny v mrtvém městě.
                </p>

                <p className="mb-4">
                  Za <strong className="text-purple-400">90 minut</strong> jsme zjistili, že by prodělali.
                </p>

                <p className="text-xl font-bold text-green-400">
                  A ušetřili 600 tisíc.
                </p>
              </div>

              <p className="text-xl">
                Kolik může ušetřit tobě?
                <br />
                Nebo kolik můžeš VYDĚLAT když budeš vědět přesně co dělat?
              </p>

              <div className="border-t-2 border-white/20 my-8"></div>

              <p>
                4 999 Kč je <strong>investice</strong>.
                <br />
                Ale špatné rozhodnutí tě může stát 300 tisíc. Nebo 600 tisíc.
              </p>

              <div className="bg-purple-500/20 border-2 border-purple-400 rounded-2xl p-6 my-6">
                <p className="text-xl font-bold mb-2">A pokud ti to nepomůže?</p>
                <p className="text-2xl font-bold text-green-400">Vrátím ti peníze.</p>
              </div>

              <p className="text-xl font-bold text-center">
                Veškeré riziko je na mně.
              </p>

              <p className="text-xl text-center">
                Jediné, co musíš udělat, je kliknout.
              </p>

              <Button
                onClick={() => window.location.href = '/objednavka'}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl px-8 py-8 rounded-xl shadow-xl mt-8"
              >
                Začít teď
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>

              <div className="text-center mt-8 text-gray-400">
                <p>Těším se na tebe uvnitř,</p>
                <p className="mt-4 text-xl text-white">[Tvůj podpis]</p>
                <p className="text-lg">[Tvoje jméno]</p>
                <p className="text-sm">[Tvoje firma/pozice]</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STICKY CTA - Bottom bar */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl border-t-4 border-purple-400"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
              <div className="hidden md:block">
                <p className="text-white font-bold text-lg">Podnikatelská Čtvrtka</p>
                <p className="text-white/80 text-sm">4 999 Kč • 14denní garance</p>
              </div>

              <div className="flex items-center gap-3 flex-1 md:flex-none justify-center md:justify-end">
                <Button
                  onClick={() => window.location.href = '/objednavka'}
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-purple-600 font-bold px-8 py-6 rounded-xl shadow-xl"
                >
                  Koupit teď
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-white hover:text-purple-200 text-sm underline"
                >
                  ↑ Zpět nahoru
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
