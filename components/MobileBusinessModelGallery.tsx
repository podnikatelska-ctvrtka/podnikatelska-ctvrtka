/**
 * 📱 MOBILE BUSINESS MODEL GALLERY
 * 
 * Mobile-first komponenta pro lekci 13 - Příklady úspěšných modelů
 * SYNCHRONIZED s desktop verzí (BusinessModelGallery.tsx)
 * 
 * FEATURES:
 * - 6 reálných modelů (Kavárna A+B, Pizzerie A+B, Fitness A+B)
 * - Mini Canvas preview s BARVAMI (segmenty + hodnoty)
 * - Klíčové insights
 * - Swipeable karty + filtr
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { haptic } from '../lib/haptics';

interface MobileBusinessModelGalleryProps {
  onComplete?: () => void;
  onNavigateNext?: () => void;
  isLessonCompleted?: boolean;
}

interface BusinessModel {
  id: string;
  name: string;
  version: string;
  category: string;
  emoji: string;
  description: string;
  segments: Array<{ text: string; color: string }>;
  value: Array<{ text: string; color: string }>;
  insights: {
    crossSell: string;
    whyItWorks: string;
  };
}

// 🔄 SYNCHRONIZED s BusinessModelGallery.tsx
const BUSINESS_MODELS: BusinessModel[] = [
  // ☕ KAVÁRNA - VERZE A: Coworkingový model
  {
    id: 'cafe-a',
    name: 'Kavárna',
    version: 'A - Coworkingový prostor',
    category: 'Kavárny',
    emoji: '☕',
    description: 'Kavárna jako coworking prostor pro freelancery',
    segments: [
      { text: 'Freelanceři (coworking)', color: 'blue' },
      { text: 'Studenti (příprava)', color: 'green' }
    ],
    value: [
      { text: 'Coworking celý den + WiFi', color: 'blue' },
      { text: 'Tichá místa pro učení', color: 'green' }
    ],
    insights: {
      crossSell: '🍰 Dezerty k ranní kávě → 10% tržeb (marže 70%!) - kdo sedí 4 hodiny, koupí si 2-3 dezerty',
      whyItWorks: '💡 Freelanceři potřebují workspace, ale coworking je drahý (3.000-8.000 Kč/měsíc) → kavárna je levnější řešení (káva za 60 Kč + celý den internet zdarma) + sociální prostředí zdarma'
    }
  },

  // ☕ KAVÁRNA - VERZE B: Rychlá kavárna
  {
    id: 'cafe-b',
    name: 'Kavárna',
    version: 'B - Rychlá kavárna',
    category: 'Kavárny',
    emoji: '☕',
    description: 'Rychlá kavárna na rušné křižovatce (to-go model)',
    segments: [
      { text: 'Ranní dojíždějící', color: 'blue' },
      { text: 'Obědová pauza (office)', color: 'green' }
    ],
    value: [
      { text: 'Káva za 2 min (ráno)', color: 'blue' },
      { text: 'Express obědy (lunch)', color: 'green' }
    ],
    insights: {
      crossSell: '🥖 Premium snack menu (káva + bageta/dezert) → hotové combo balíčky, šetří čas zákazníkům i obsluze (vysoká marže 65%)',
      whyItWorks: '⚡ Rychlost + návyk = loajalita. Lidi si vytvoří ranní rituál (stejná kavárna, stejný čas) → když víš že budeš mít kávu za 2 minuty, vracíš se každé ráno. Premium lokace = platí se víc, ale obrat je 3x vyšší'
    }
  },

  // 🍕 PIZZERIE - VERZE A: S rozvozem
  {
    id: 'pizza-a',
    name: 'Pizzerie',
    version: 'A - S rozvozem',
    category: 'Restaurace',
    emoji: '🍕',
    description: 'Pizzerie s rozvozem a osobním odběrem',
    segments: [
      { text: 'Rodiny s dětmi (večeře)', color: 'blue' },
      { text: 'Studenti v kolejích', color: 'green' }
    ],
    value: [
      { text: 'Rozvoz do 30 min', color: 'blue' },
      { text: '20% sleva při odběru', color: 'green' }
    ],
    insights: {
      crossSell: '💰 20% sleva na odběr → 40% zákazníků si vybere odběr = úspora nákladů na rozvoz (řidič + benzín + doba) = marže +15%',
      whyItWorks: '🎯 Jeden produkt, dva segmenty s různými prioritami: (1) Rodiče → pohodlí večer (nechce se jim vařit po práci), platí plnou cenu za rozvoz. (2) Studenti → cena (chtějí ušetřit), přijdou si vyzvednout za slevu. Obě skupiny chtějí pizzu, jen z jiných důvodů'
    }
  },

  // 🍕 PIZZERIE - VERZE B: Prémiová
  {
    id: 'pizza-b',
    name: 'Pizzerie',
    version: 'B - Prémiová',
    category: 'Restaurace',
    emoji: '🍕',
    description: 'Řemeslná pizzerie s unikátními ingrediencemi',
    segments: [
      { text: 'Foodie (IG influenceři)', color: 'blue' },
      { text: 'Mladí profesionálové', color: 'green' }
    ],
    value: [
      { text: 'Limitované edice (měsíční)', color: 'blue' },
      { text: 'Prémiová večeře + craft pivo', color: 'green' }
    ],
    insights: {
      crossSell: '🍺 Craft pivo pairing (doporučení konkrétního piva ke každé pizze, jako víno k jídlu) → 25% tržeb (marže 70%!) - zákazník si koupí "zážitek", ne jen pivo',
      whyItWorks: '📸 Instagram je hlavní prodejce: Fotogenická jídla + prémiový prostor = foodie to sdílejí zadarmo (virální marketing) → přivádí nové zákazníky bez placené reklamy. Foodie segment má peníze a neřeší cenu, když je to "unikátní zážitek"'
    }
  },

  // 🏋️ FITNESS - VERZE A: Osobní tréninky
  {
    id: 'fitness-a',
    name: 'Fitness',
    version: 'A - Osobní tréninky',
    category: 'Fitness',
    emoji: '🏋️',
    description: 'Boutique studio s osobními trenéry',
    segments: [
      { text: 'Profesionálové 35-50 let', color: 'blue' },
      { text: 'Post-rehab klienti', color: 'green' }
    ],
    value: [
      { text: 'Osobní trénink 1-na-1', color: 'blue' },
      { text: 'Výživový plán', color: 'blue' },
      { text: 'Rehabilitační péče', color: 'green' }
    ],
    insights: {
      crossSell: '💊 Suplementy po tréninku → 20% tržeb (marže 60%!) - trenér ti přímo doporučí co potřebuješ = osobní přístup zvyšuje prodeje',
      whyItWorks: '⏰ Profesionálové 35-50 let mají peníze, ale NE čas: (1) Nemohou si dovolit zranění (práce = priorita) → platí za bezpečný trénink pod dohledem. (2) Nechtějí ztrácet čas hledáním cvičení online → platí za hotový plán "na míru". Čas > peníze pro tento segment'
    }
  },

  // 🏋️ FITNESS - VERZE B: Skupinové lekce
  {
    id: 'fitness-b',
    name: 'Fitness',
    version: 'B - Skupinové lekce',
    category: 'Fitness',
    emoji: '🏋️',
    description: 'Velké studio se skupinovými lekcemi',
    segments: [
      { text: 'Mladí lidé 20-35 let', color: 'blue' },
      { text: 'Ženy ráno/odpoledne', color: 'green' }
    ],
    value: [
      { text: 'Skupinové lekce', color: 'blue' },
      { text: 'Ranní jóga (ženy)', color: 'green' }
    ],
    insights: {
      crossSell: '👕 Merch a šejkry → 10% tržeb (marže 70%) - komunita nosí tvoje logo = branding zdarma + pocit příslušnosti',
      whyItWorks: '🤝 Mladí lidé 20-35 let chtějí sociální zážitek, ne jen cvičení: Přijdou na lekci, poznají kámoše, vrací se kvůli přátelům (ne jen kvůli fitness!). Skupinové lekce = zábava + motivace + komunita. Když má někdo partu ve fitku, neodchází → udržení 70%'
    }
  }
];

const CATEGORIES = [
  { id: 'Kavárny', name: 'Kavárny', emoji: '☕' },
  { id: 'Restaurace', name: 'Pizzerie', emoji: '🍕' },
  { id: 'Fitness', name: 'Fitness', emoji: '🏋️' }
];

// Helper pro barvy
const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300' },
    green: { bg: 'bg-green-100', text: 'text-green-900', border: 'border-green-300' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-900', border: 'border-yellow-300' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-900', border: 'border-purple-300' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-900', border: 'border-pink-300' },
    global: { bg: 'bg-gray-100', text: 'text-gray-900', border: 'border-gray-300' },
  };
  return colors[color] || colors.global;
};

export function MobileBusinessModelGallery({ onComplete, onNavigateNext, isLessonCompleted = false }: MobileBusinessModelGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Kavárny');
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Filter models by category
  const filteredModels = BUSINESS_MODELS.filter(m => m.category === selectedCategory);
  const currentModel = filteredModels[currentModelIndex];

  const hasPrevious = currentModelIndex > 0;
  const hasNext = currentModelIndex < filteredModels.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      haptic('light');
      setCurrentModelIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      haptic('light');
      setCurrentModelIndex(prev => prev + 1);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    haptic('light');
    setSelectedCategory(categoryId);
    setCurrentModelIndex(0); // Reset to first model in new category
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && hasNext) {
      handleNext();
    }
    if (isRightSwipe && hasPrevious) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!currentModel) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-md p-6 text-center">
        <h2 className="mb-2 text-white">💡 Galerie Business Modelů</h2>
        <p className="text-indigo-50 text-sm">
          Porovnejte různé strategie - každý model funguje jinak!
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-600" />
          <p className="text-sm font-medium text-gray-700">Kategorie:</p>
        </div>
        <div className="flex gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex-1 px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg mr-1">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Model Card */}
      <div 
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Card Header */}
        <div className="text-center mb-5">
          <div className="text-6xl mb-3">{currentModel.emoji}</div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{currentModel.name}</h3>
          <p className="text-sm text-indigo-600 font-medium mb-2">{currentModel.version}</p>
          <p className="text-sm text-gray-600 mb-3">{currentModel.description}</p>
          <p className="text-xs text-indigo-600 font-medium">
            {currentModelIndex + 1} / {filteredModels.length}
          </p>
        </div>

        {/* 🎨 MINI CANVAS - Segmenty + Hodnoty s BARVAMI! */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-5 border-2 border-gray-200">
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>🎨</span>
            Model Canvas:
          </h4>
          
          {/* Segments */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-700 mb-2">👥 Zákaznické segmenty:</p>
            <div className="space-y-2">
              {currentModel.segments.map((segment, idx) => {
                const colors = getColorClasses(segment.color);
                return (
                  <div
                    key={idx}
                    className={`${colors.bg} ${colors.text} border ${colors.border} rounded-lg p-2 text-xs font-medium`}
                  >
                    {segment.text}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Value Propositions */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2">💎 Hodnotová nabídka:</p>
            <div className="space-y-2">
              {currentModel.value.map((value, idx) => {
                const colors = getColorClasses(value.color);
                return (
                  <div
                    key={idx}
                    className={`${colors.bg} ${colors.text} border ${colors.border} rounded-lg p-2 text-xs font-medium`}
                  >
                    {value.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 💡 KLÍČOVÉ INSIGHTS */}
        <div className="space-y-3">
          {/* Cross-sell */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-900 font-bold text-xs mb-1">CROSS-SELL PŘÍLEŽITOST:</p>
                <p className="text-green-900 text-sm leading-relaxed">
                  {currentModel.insights.crossSell}
                </p>
              </div>
            </div>
          </div>

          {/* Why it works */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-900 font-bold text-xs mb-1">PROČ TO FUNGUJE:</p>
                <p className="text-blue-900 text-sm leading-relaxed">
                  {currentModel.insights.whyItWorks}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className="flex-1"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Předchozí
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleNext}
          disabled={!hasNext}
          className="flex-1"
        >
          Další
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>

      {/* Complete button - SKRÝT když je lekce completed */}
      {!isLessonCompleted && (
        <div className="pt-4">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            onClick={() => {
              haptic('success');
              if (onComplete) onComplete();
              if (onNavigateNext) onNavigateNext();
            }}
          >
            ✅ Dokončit lekci
          </Button>
        </div>
      )}

      {/* Swipe hint */}
      <p className="text-center text-xs text-gray-500">
        💡 Swipe doleva/doprava pro navigaci
      </p>
    </div>
  );
}
