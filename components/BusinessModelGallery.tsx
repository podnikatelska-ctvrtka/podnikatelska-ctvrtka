import { useState } from "react";
import { ChevronLeft, ChevronRight, Info, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { ReadOnlyBusinessModelCanvas } from "./ReadOnlyBusinessModelCanvas";

interface Props {
  onComplete?: () => void;
  onNavigateNext?: () => void;
}

// Typ pro business model data
interface BusinessModel {
  id: string;
  name: string;
  version: string;
  category: string;
  emoji: string;
  description: string;
  segments: Array<{ text: string; color: string }>;
  value: Array<{ text: string; color: string; price?: string }>;
  channels: Array<{ text: string; color: string }>;
  relationships: Array<{ text: string; color: string }>;
  revenue: Array<{ text: string; color: string; percentage?: string }>;
  activities: Array<{ text: string; color: string }>;
  resources: Array<{ text: string; color: string }>;
  partnerships: Array<{ text: string; color: string }>;
  costs: Array<{ text: string; percentage?: string }>;
  insights: {
    crossSell: string;
    revenueBreakdown: string;
    keySuccess: string;
    whyItWorks: string;
  };
}

const BUSINESS_MODELS: BusinessModel[] = [
  // ☕ KAVÁRNA - VERZE A: Workspace model
  {
    id: 'cafe-a',
    name: 'Kavárna',
    version: 'A - Workspace',
    category: 'Kavárny',
    emoji: '☕',
    description: 'Kavárna jako coworking prostor pro freelancery',
    segments: [
      { text: 'Freelanceři (workspace)', color: 'blue' },
      { text: 'Studenti (příprava)', color: 'green' }
    ],
    value: [
      { text: 'Workspace celý den + WiFi', color: 'blue' },
      { text: 'Tichá místa pro učení', color: 'green' }
    ],
    channels: [
      { text: 'Instagram (workspace fotky)', color: 'blue' },
      { text: 'Google "kavárna WiFi"', color: 'blue' },
      { text: 'Univerzitní skupiny', color: 'green' }
    ],
    relationships: [
      { text: 'Loyalty karty', color: 'blue' },
      { text: 'Community events', color: 'blue' }
    ],
    revenue: [
      { text: 'Káva a nápoje', color: 'global', percentage: '60%' },
      { text: 'Jídlo', color: 'global', percentage: '30%' },
      { text: 'Dezerty', color: 'global', percentage: '10%' }
    ],
    activities: [
      { text: 'Příprava kávy', color: 'global' },
      { text: 'Údržba workspace', color: 'blue' },
      { text: 'Marketing (Instagram)', color: 'global' }
    ],
    resources: [
      { text: 'Baristé (2)', color: 'global' },
      { text: 'Espresso stroj', color: 'global' },
      { text: 'Velký prostor se stoly', color: 'blue' },
      { text: 'Rychlé WiFi', color: 'blue' }
    ],
    partnerships: [
      { text: 'Dodavatel specialty kávy', color: 'global' },
      { text: 'Lokální pekárna', color: 'global' }
    ],
    costs: [
      { text: 'Káva a suroviny', percentage: '30%' },
      { text: 'Nájem velkého prostoru', percentage: '40%' },
      { text: 'Mzdy', percentage: '30%' }
    ],
    insights: {
      crossSell: 'Dezerty k ráno kávě (10% příjmů, marže 70%!)',
      revenueBreakdown: 'Káva 60% + Jídlo 30% + Dezerty 10% = stabilní příjem po celý den',
      keySuccess: 'Velký prostor + WiFi = freelanceři zůstávají 4-6 hodin (průměr 3 kávy!)',
      whyItWorks: 'Freelanceři potřebují workspace ale nechce platit coworking → kavárna je levnější alternativa'
    }
  },
  
  // ☕ KAVÁRNA - VERZE B: Quick coffee model
  {
    id: 'cafe-b',
    name: 'Kavárna',
    version: 'B - Quick Coffee',
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
    channels: [
      { text: 'Umístění na křižovatce', color: 'blue' },
      { text: 'Instagram (rychlé story)', color: 'blue' },
      { text: 'Google Maps "blízko"', color: 'green' }
    ],
    relationships: [
      { text: 'Věrnostní karta', color: 'blue' },
      { text: 'Mobilní objednávka', color: 'blue' }
    ],
    revenue: [
      { text: 'Káva to-go (ráno)', color: 'blue', percentage: '50%' },
      { text: 'Express obědy', color: 'green', percentage: '40%' },
      { text: 'Dezerty a bagety', color: 'global', percentage: '10%' }
    ],
    activities: [
      { text: 'Příprava kávy', color: 'global' },
      { text: 'Prep work', color: 'green' },
      { text: 'Zásobování', color: 'global' }
    ],
    resources: [
      { text: 'Baristé (3)', color: 'global' },
      { text: 'Espresso stroj', color: 'blue' },
      { text: 'Malý prostor', color: 'global' }
    ],
    partnerships: [
      { text: 'Dodavatel kávy (velkoobchod)', color: 'global' },
      { text: 'Catering firma (obědy)', color: 'green' }
    ],
    costs: [
      { text: 'Suroviny', percentage: '35%' },
      { text: 'Nájem (prémiová lokace!)', percentage: '35%' },
      { text: 'Mzdy (3 směny)', percentage: '30%' }
    ],
    insights: {
      crossSell: 'Bagety a dezerty k ranní kávě (10% příjmů, vysoká marže)',
      revenueBreakdown: 'Ráno káva 50% + Oběd 40% + Cross-sell 10% = 2 peak times denně',
      keySuccess: 'Lokace na křižovatce = denně 500+ lidí projde kolem',
      whyItWorks: 'Rychlost (2 min) + lokace = každé ráno stejní zákazníci (habits!)'
    }
  },

  // 🍕 PIZZERIE - VERZE A: Family friendly
  {
    id: 'pizza-a',
    name: 'Pizzerie',
    version: 'A - Family Friendly',
    category: 'Restaurace',
    emoji: '🍕',
    description: 'Rodinná pizzerie s dětským koutkem',
    segments: [
      { text: 'Rodiny s dětmi 3-10 let', color: 'blue' },
      { text: 'Narozeninové oslavy', color: 'purple' }
    ],
    value: [
      { text: 'Dětský koutek + menu', color: 'blue' },
      { text: 'Narozeninové balíčky', color: 'purple' }
    ],
    channels: [
      { text: 'Facebook rodinné skupiny', color: 'blue' },
      { text: 'Instagram (fotky dětí)', color: 'blue' },
      { text: 'Doporučení rodičů', color: 'blue' }
    ],
    relationships: [
      { text: 'Věrnostní program', color: 'blue' },
      { text: 'Organizace narozenin', color: 'purple' }
    ],
    revenue: [
      { text: 'Běžné návštěvy rodin', color: 'blue', percentage: '60%' },
      { text: 'Narozeninové party', color: 'purple', percentage: '25%' },
      { text: 'Nápoje a zmrzlina', color: 'global', percentage: '15%' }
    ],
    activities: [
      { text: 'Příprava pizzy', color: 'global' },
      { text: 'Organizace narozenin', color: 'purple' },
      { text: 'Údržba dětského koutku', color: 'blue' }
    ],
    resources: [
      { text: 'Kuchaři (2)', color: 'global' },
      { text: 'Pec na pizzu', color: 'global' },
      { text: 'Dětský koutek', color: 'blue' },
      { text: 'Party místnost', color: 'purple' }
    ],
    partnerships: [
      { text: 'Dodavatel surovin', color: 'global' },
      { text: 'Animátor pro narozeniny', color: 'purple' }
    ],
    costs: [
      { text: 'Suroviny', percentage: '30%' },
      { text: 'Nájem velkého prostoru', percentage: '35%' },
      { text: 'Mzdy + animátor', percentage: '35%' }
    ],
    insights: {
      crossSell: 'Nápoje a zmrzlina pro děti (15% příjmů, vysoká marže)',
      revenueBreakdown: 'Běžné jídlo 60% + Narozeniny 25% (vysoká marže!) + Nápoje 15%',
      keySuccess: 'Dětský koutek = rodiče zůstávají déle (průměr 90 min vs 45 min)',
      whyItWorks: 'Rodiče potřebují místo kde děti můžou běhat = ochota platit více'
    }
  },

  // 🍕 PIZZERIE - VERZE B: Student takeaway
  {
    id: 'pizza-b',
    name: 'Pizzerie',
    version: 'B - Student Takeaway',
    category: 'Restaurace',
    emoji: '🍕',
    description: 'Rychlá pizza u univerzity (slice model)',
    segments: [
      { text: 'Studenti (rychlý oběd)', color: 'blue' },
      { text: 'Večerní party skupiny', color: 'green' }
    ],
    value: [
      { text: 'Pizza slice za 40 Kč', color: 'blue' },
      { text: 'Mega party box 4 pizzy', color: 'green' }
    ],
    channels: [
      { text: 'Instagram stories', color: 'blue' },
      { text: 'Univerzitní nástěnky', color: 'blue' },
      { text: 'WhatsApp objednávky', color: 'green' }
    ],
    relationships: [
      { text: 'Slevová karta pro studenty', color: 'blue' },
      { text: 'Party objednávky přes WhatsApp', color: 'green' }
    ],
    revenue: [
      { text: 'Slice prodej (oběd)', color: 'blue', percentage: '50%' },
      { text: 'Party objednávky (večer)', color: 'green', percentage: '35%' },
      { text: 'Nápoje', color: 'global', percentage: '15%' }
    ],
    activities: [
      { text: 'Pečení pizzy', color: 'global' },
      { text: 'Prep work (připravené slicy)', color: 'blue' },
      { text: 'Party balení', color: 'green' }
    ],
    resources: [
      { text: 'Kuchaři (2)', color: 'global' },
      { text: 'Velká pec (slice ready)', color: 'blue' },
      { text: 'Malý prostor (hlavně takeaway)', color: 'global' }
    ],
    partnerships: [
      { text: 'Dodavatel surovin', color: 'global' },
      { text: 'Studentské organizace', color: 'blue' }
    ],
    costs: [
      { text: 'Suroviny', percentage: '35%' },
      { text: 'Nájem (blízko uni)', percentage: '30%' },
      { text: 'Mzdy', percentage: '35%' }
    ],
    insights: {
      crossSell: 'Nápoje k pizze (15% příjmů, vysoká marže)',
      revenueBreakdown: 'Oběd slices 50% + Party večer 35% + Nápoje 15% = 2 peak times',
      keySuccess: 'Lokace u univerzity + nízká cena (40 Kč slice) = denně 200+ studentů',
      whyItWorks: 'Studenti nemají čas ani peníze = rychlost + nízká cena wins!'
    }
  },

  // 🏋️ FITNESS - VERZE A: Prémiové studio
  {
    id: 'fitness-a',
    name: 'Fitness',
    version: 'A - Premium',
    category: 'Fitness',
    emoji: '🏋️',
    description: 'Prémiové studio s personal trainéry',
    segments: [
      { text: 'Profesionálové 30-45 let', color: 'blue' },
      { text: 'Věkové skupiny 50+ (rehabilitace)', color: 'green' }
    ],
    value: [
      { text: 'Personal training', color: 'blue' },
      { text: 'Rehabilitační programy', color: 'green' }
    ],
    channels: [
      { text: 'LinkedIn (profesionálové)', color: 'blue' },
      { text: 'Doporučení lékařů', color: 'green' },
      { text: 'Instagram (transformace)', color: 'blue' }
    ],
    relationships: [
      { text: 'Osobní trenér (vždy stejný)', color: 'blue' },
      { text: 'Měsíční checkup', color: 'blue' }
    ],
    revenue: [
      { text: 'Personal training', color: 'blue', percentage: '50%' },
      { text: 'Měsíční členství', color: 'global', percentage: '30%' },
      { text: 'Suplementy', color: 'global', percentage: '20%' }
    ],
    activities: [
      { text: 'Personal training', color: 'blue' },
      { text: 'Rehabilitační lekce', color: 'green' },
      { text: 'Výživa konzultace', color: 'global' }
    ],
    resources: [
      { text: 'Certifikovaní trenéři (5)', color: 'blue' },
      { text: 'Premium vybavení', color: 'global' },
      { text: 'Malý prostor (max 20 lidí)', color: 'global' }
    ],
    partnerships: [
      { text: 'Lékaři (doporučení)', color: 'green' },
      { text: 'Dodavatel suplementů', color: 'global' }
    ],
    costs: [
      { text: 'Mzdy trenérů (vysoké!)', percentage: '50%' },
      { text: 'Nájem premium lokace', percentage: '30%' },
      { text: 'Vybavení', percentage: '20%' }
    ],
    insights: {
      crossSell: 'Suplementy po tréninku (20% příjmů, marže 60%!)',
      revenueBreakdown: 'PT 50% + Členství 30% + Suplementy 20% = vysoké příjmy na osobu',
      keySuccess: 'Osobní trenéři = retention 85% (průměr industry je 40%)',
      whyItWorks: 'Profesionálové mají peníze ale ne čas = ochota platit za osobní přístup'
    }
  },

  // 🏋️ FITNESS - VERZE B: Group classes
  {
    id: 'fitness-b',
    name: 'Fitness',
    version: 'B - Group Classes',
    category: 'Fitness',
    emoji: '🏋️',
    description: 'Velké studio se skupinovými lekcemi',
    segments: [
      { text: 'Mladí lidé 20-35 let', color: 'blue' },
      { text: 'Ženy (ráno/odpoledne)', color: 'green' }
    ],
    value: [
      { text: 'Skupinové lekce', color: 'blue' },
      { text: 'Ranní jóga (ženy)', color: 'green' }
    ],
    channels: [
      { text: 'Instagram (video z lekcí)', color: 'blue' },
      { text: 'TikTok challenges', color: 'blue' },
      { text: 'Facebook maminky skupiny', color: 'green' }
    ],
    relationships: [
      { text: 'Community vibe', color: 'blue' },
      { text: 'Messenger booking', color: 'blue' }
    ],
    revenue: [
      { text: 'Měsíční členství', color: 'global', percentage: '70%' },
      { text: 'Drop-in lekce', color: 'blue', percentage: '20%' },
      { text: 'Merch a šejkry', color: 'global', percentage: '10%' }
    ],
    activities: [
      { text: 'Skupinové lekce', color: 'global' },
      { text: 'Marketing (social media)', color: 'blue' },
      { text: 'Community events', color: 'global' }
    ],
    resources: [
      { text: 'Instruktoři (3)', color: 'global' },
      { text: 'Velký prostor (50+ lidí)', color: 'global' },
      { text: 'Hudební systém', color: 'global' }
    ],
    partnerships: [
      { text: 'Fitness influenceři', color: 'blue' },
      { text: 'Dodavatel merch', color: 'global' }
    ],
    costs: [
      { text: 'Mzdy (instruktoři)', percentage: '40%' },
      { text: 'Nájem velkého prostoru', percentage: '40%' },
      { text: 'Marketing', percentage: '20%' }
    ],
    insights: {
      crossSell: 'Merch a šejkry (10% příjmů, marže 70%)',
      revenueBreakdown: 'Členství 70% (stabilní!) + Drop-in 20% + Merch 10%',
      keySuccess: 'Community = retention 70% (lidé přijdou kvůli přátelům)',
      whyItWorks: 'Mladí lidé chtějí sociální zkušenost = fitness jako zábava'
    }
  }
];

const CATEGORIES = [
  { id: 'Kavárny', name: 'Kavárny', emoji: '☕' },
  { id: 'Restaurace', name: 'Pizzerie', emoji: '🍕' },
  { id: 'Fitness', name: 'Fitness', emoji: '🏋️' }
];

export function BusinessModelGallery({ onComplete, onNavigateNext }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('Kavárny');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInsights, setShowInsights] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const filteredModels = BUSINESS_MODELS.filter(m => m.category === selectedCategory);
  const currentModel = filteredModels[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredModels.length);
    setShowInsights(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredModels.length) % filteredModels.length);
    setShowInsights(false);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentIndex(0);
    setShowInsights(false);
  };

  if (!currentModel) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-2">💡 Galerie Business Modelů</h3>
        <p className="text-purple-100">
          Porovnejte různé strategie ve stejném odvětví - každý model funguje jinak!
        </p>
      </div>

      {/* Category filters - JEN IKONY */}
      <div className="flex gap-3 justify-center flex-wrap">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            variant={selectedCategory === cat.id ? 'default' : 'outline'}
            size="lg"
            className="gap-2"
          >
            <span className="text-2xl">{cat.emoji}</span>
            <span>{cat.name}</span>
          </Button>
        ))}
      </div>

      {/* Main Canvas Display */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
          {/* Model Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {currentModel.emoji} {currentModel.name} - {currentModel.version}
                </h4>
                <p className="text-sm text-gray-600">{currentModel.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInsights(!showInsights)}
                className="gap-2"
              >
                <Info className="w-4 h-4" />
                {showInsights ? 'Skrýt' : 'Proč to funguje?'}
              </Button>
            </div>
          </div>

          {/* Canvas - POUŽITÍ EXISTUJÍCÍHO KOMPONENTY */}
          <div className="px-4 py-6">
            <ReadOnlyBusinessModelCanvas
              key={`${currentModel.name}-${currentModel.version}`}
              sections={[
                { id: 'partners', title: '🤝 Klíčová partnerství', items: currentModel.partnerships.map(p => ({ text: p.text, color: p.color })), gridArea: 'partners' },
                { id: 'activities', title: '🎯 Klíčové aktivity', items: currentModel.activities.map(a => ({ text: a.text, color: a.color })), gridArea: 'activities' },
                { id: 'resources', title: '🔑 Klíčové zdroje', items: currentModel.resources.map(r => ({ text: r.text, color: r.color })), gridArea: 'resources' },
                { id: 'value', title: '💎 Hodnotová nabídka', items: currentModel.value.map(v => ({ text: v.text, color: v.color, price: v.price })), gridArea: 'value' },
                { id: 'relationships', title: '❤️ Vztahy', items: currentModel.relationships.map(r => ({ text: r.text, color: r.color })), gridArea: 'relationships' },
                { id: 'channels', title: '📢 Kanály', items: currentModel.channels.map(c => ({ text: c.text, color: c.color })), gridArea: 'channels' },
                { id: 'segments', title: '👥 Segmenty', items: currentModel.segments.map(s => ({ text: s.text, color: s.color })), gridArea: 'segments' },
                { id: 'costs', title: '💸 Struktura nákladů', items: currentModel.costs.map(c => ({ text: c.text || c, color: 'white' as const, percentage: c.percentage })), gridArea: 'costs' },
                { id: 'revenue', title: '💰 Zdroje příjmů', items: currentModel.revenue.map(r => ({ text: r.text, color: r.color, percentage: r.percentage })), gridArea: 'revenue' }
              ]}
              highlightSections={['segments', 'value']}
            />
          </div>

          {/* Insights Panel */}
          {showInsights && (
            <div
              className="bg-gradient-to-r from-amber-50 to-yellow-50 border-t-2 border-amber-200 p-6"
            >
              <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-600" />
                💡 Proč tento model funguje?
              </h5>
              <div className="space-y-3">
                <div className="bg-white border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-bold text-amber-900 mb-2">🎯 Klíč k úspěchu:</p>
                  <p className="text-sm text-amber-800">{currentModel.insights.keySuccess}</p>
                </div>
                <div className="bg-white border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-bold text-amber-900 mb-2">🧠 Proč to funguje:</p>
                  <p className="text-sm text-amber-800">{currentModel.insights.whyItWorks}</p>
                </div>
                <div className="bg-white border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-bold text-amber-900 mb-2">💰 Cross-sell strategie:</p>
                  <p className="text-sm text-amber-800">{currentModel.insights.crossSell}</p>
                </div>
                <div className="bg-white border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-bold text-amber-900 mb-2">📊 Struktura příjmů:</p>
                  <p className="text-sm text-amber-800">{currentModel.insights.revenueBreakdown}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrev}
          variant="outline"
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Předchozí
        </Button>

        <div className="text-center">
          <p className="text-sm font-bold text-gray-900">
            {currentIndex + 1} / {filteredModels.length}
          </p>
          <p className="text-xs text-gray-500">
            {currentModel.version}
          </p>
        </div>

        <Button
          onClick={handleNext}
          variant="outline"
          className="gap-2"
        >
          Další
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Vysvětlení zvýraznění */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 text-center">
        <p className="text-blue-900">
          💡 <strong>Proč jsou zvýrazněné Segmenty a Hodnota?</strong><br />
          Protože to jsou HLAVNÍ stavební bloky každého Business Modelu! Vše ostatní se odvíjí od toho KDO jsou vaši zákazníci (Segmenty) a CO jim nabízíte (Hodnota).
        </p>
      </div>

      {/* CTA - Dokončit Modul 2 */}
      {!isCompleted ? (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center shadow-2xl mt-6 animate-in fade-in duration-500">
          <h3 className="mb-3 text-white">
            🎉 Gratuluji! Viděli jste úspěšné modely
          </h3>
          <p className="text-green-100 mb-6">
            Inspirovali jste se? Můžete se kdykoliv vrátit a prohlédnout si modely znovu.
          </p>
          <Button
            onClick={() => {
              setIsCompleted(true);
              onComplete?.();
            }}
            size="lg"
            className="bg-white text-green-700 hover:bg-green-50 font-bold text-lg px-12 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            Dokončit Modul 2 🎉
          </Button>
        </div>
      ) : (
        <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 mt-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 rounded-full p-3">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-green-900">
                ✅ Modul 2 dokončen!
              </h3>
              <p className="text-sm text-green-700">
                Skvělá práce! Nyní začněte s Modulem 3 - Value Proposition Canvas.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {onNavigateNext && (
              <Button
                onClick={onNavigateNext}
                size="lg"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Pokračovat na Modul 3 →
              </Button>
            )}
            <Button
              onClick={() => setIsCompleted(false)}
              variant="outline"
              size="lg"
            >
              🔄 Prohlédnout znovu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for canvas sections
function CanvasSection({ 
  title, 
  items, 
  getColorClass, 
  highlight = false,
  highlightColor = 'blue',
  fullHeight = false
}: { 
  title: string; 
  items: any[]; 
  getColorClass: (color: string) => string;
  highlight?: boolean;
  highlightColor?: string;
  fullHeight?: boolean;
}) {
  const ringClass = highlightColor === 'blue' ? 'ring-2 ring-blue-400' : 'ring-2 ring-green-400';
  
  return (
    <div className={`${highlight ? ringClass : ''} bg-gray-50 border-2 border-gray-200 rounded-lg p-3 ${fullHeight ? 'h-full' : ''}`}>
      <h5 className="text-xs font-bold text-gray-700 mb-2">{title}</h5>
      <div className="space-y-1.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`text-xs px-2 py-1.5 rounded border ${getColorClass(item.color || 'white')}`}
          >
            <div className="font-medium leading-snug">{item.text || item}</div>
            {item.price && <div className="text-[10px] opacity-75 mt-0.5">{item.price}</div>}
            {item.percentage && <div className="text-[10px] opacity-75 font-bold mt-0.5">{item.percentage}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
