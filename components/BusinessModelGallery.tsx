import { useState, useEffect } from "react";
import { Info, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ReadOnlyBusinessModelCanvas } from "./ReadOnlyBusinessModelCanvas";

interface Props {
  onComplete?: () => void;
  onNavigateNext?: () => void;
  isLessonCompleted?: boolean;
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
    channels: [
      { text: 'Instagram (coworking fotky)', color: 'blue' },
      { text: 'Google "kavárna WiFi"', color: 'blue' },
      { text: 'Univerzitní skupiny', color: 'green' }
    ],
    relationships: [
      { text: 'Věrnostní karty', color: 'blue' },
      { text: 'Komunitní akce', color: 'blue' }
    ],
    revenue: [
      { text: 'Káva a nápoje', color: 'global', percentage: '60%' },
      { text: 'Jídlo', color: 'global', percentage: '30%' },
      { text: 'Dezerty', color: 'global', percentage: '10%' }
    ],
    activities: [
      { text: 'Příprava kávy', color: 'global' },
      { text: 'Údržba coworkingu', color: 'blue' },
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
      crossSell: '🍰 Dezerty k ranní kávě → 10% tržeb (marže 70%!) - kdo sedí 4 hodiny, koupí si 2-3 dezerty',
      revenueBreakdown: 'Káva 60% + Jídlo 30% + Dezerty 10% = stabilní příjem po celý den',
      keySuccess: 'Velký prostor + WiFi = freelanceři zůstávají 4-6 hodin (průměr 3 kávy!)',
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
      crossSell: '🥖 Bagety a dezerty k ranní kávě → 10% tržeb (vysoká marže 65%) - "dáte si k tomu něco?" při platbě',
      revenueBreakdown: 'Ráno káva 50% + Oběd 40% + Cross-sell 10% = 2 peak times denně',
      keySuccess: 'Lokace na křižovatce = denně 500+ lidí projde kolem',
      whyItWorks: '⚡ Rychlost + návyk = loajalita. Lidi si vytvoří ranní rituál (stejná kavárna, stejný čas) → když víš že budeš hotový za 2 minuty, vracíš se každé ráno. Premium lokace = platí se víc, ale obrat je 3x vyšší'
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
      { text: '20% sleva při odběru', color: 'global' }
    ],
    channels: [
      { text: 'Facebook (rodiny)', color: 'blue' },
      { text: 'Instagram (studenti)', color: 'green' },
      { text: 'Vlastní web + mobil app', color: 'global' }
    ],
    relationships: [
      { text: 'Věrnostní program', color: 'blue' },
      { text: 'SMS notifikace', color: 'global' }
    ],
    revenue: [
      { text: 'Pizza (70% tržeb)', color: 'global', percentage: '70%' },
      { text: 'Nápoje', color: 'global', percentage: '20%' },
      { text: 'Přílohy (hranolky)', color: 'global', percentage: '10%' }
    ],
    activities: [
      { text: 'Příprava pizzy', color: 'global' },
      { text: 'Rozvoz', color: 'global' },
      { text: 'Marketing (social media)', color: 'blue' }
    ],
    resources: [
      { text: 'Pizza pec', color: 'global' },
      { text: 'Kuchaři (3)', color: 'global' },
      { text: 'Řidiči (2 auta)', color: 'global' }
    ],
    partnerships: [
      { text: 'Dodavatel surovin', color: 'global' },
      { text: 'Damejidlo.cz', color: 'global' }
    ],
    costs: [
      { text: 'Suroviny', percentage: '30%' },
      { text: 'Mzdy (kuchaři + řidiči)', percentage: '40%' },
      { text: 'Nájem + energie', percentage: '30%' }
    ],
    insights: {
      crossSell: '💰 20% sleva na odběr → 40% zákazníků si vybere odběr = úspora nákladů na rozvoz (řidič + benzín + doba) = marže +15%',
      revenueBreakdown: 'Pizza 70% + Nápoje 20% (vysoká marže!) + Přílohy 10%',
      keySuccess: 'Rodiny objednávají večer (18-21h) = peak time s vysokými objednávkami',
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
      { text: 'Craft pivo pairing', color: 'green' }
    ],
    channels: [
      { text: 'Instagram (fotky jídla)', color: 'blue' },
      { text: 'Food bloggeři', color: 'blue' },
      { text: 'Rezervace online', color: 'green' }
    ],
    relationships: [
      { text: 'Exclusive previews (IG)', color: 'blue' },
      { text: 'Členství (priority booking)', color: 'green' }
    ],
    revenue: [
      { text: 'Prémiové pizzy', color: 'global', percentage: '60%' },
      { text: 'Craft pivo', color: 'green', percentage: '25%' },
      { text: 'Dezerty', color: 'global', percentage: '15%' }
    ],
    activities: [
      { text: 'Vývoj nových receptur', color: 'blue' },
      { text: 'Spolupráce s farmami', color: 'global' },
      { text: 'Marketing (IG content)', color: 'blue' }
    ],
    resources: [
      { text: 'Import pizza pec (Itálie)', color: 'global' },
      { text: 'Pizzaiolo (certifikát)', color: 'global' },
      { text: 'Prémiový prostor', color: 'green' }
    ],
    partnerships: [
      { text: 'Lokální farmy (bio)', color: 'global' },
      { text: 'Craft pivovary', color: 'green' },
      { text: 'Food influenceři', color: 'blue' }
    ],
    costs: [
      { text: 'Prémiové ingredience', percentage: '40%' },
      { text: 'Mzdy (vysoká kvalifikace)', percentage: '35%' },
      { text: 'Nájem (centrum)', percentage: '25%' }
    ],
    insights: {
      crossSell: '🍺 Craft pivo pairing (doporučení konkrétního piva ke každé pizzě, jako víno k jídlu) → 25% tržeb (marže 70%!) - zákazník si koupí "zážitek", ne jen pivo',
      revenueBreakdown: 'Pizza 60% + Pivo 25% + Dezerty 15% = vysoké AVG check',
      keySuccess: '50% vyšší cena pizzy (350 Kč vs 230 Kč standard) = marže 65%',
      whyItWorks: '📸 Instagram je tvůj hlavní prodejce: Fotogenická jídla + prémiový prostor = foodie to sdílejí zadarmo (virální marketing) → přivádí nové zákazníky bez placené reklamy. Foodie segment má peníze a neřeší cenu, když je to "unikátní zážitek"'
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
    channels: [
      { text: 'LinkedIn (profesionálové)', color: 'blue' },
      { text: 'Doporučení od lékařů', color: 'green' },
      { text: 'Google "osobní trenér"', color: 'blue' }
    ],
    relationships: [
      { text: 'Osobní přístup (WhatsApp)', color: 'blue' },
      { text: 'Měsíční check-ins', color: 'blue' }
    ],
    revenue: [
      { text: 'Osobní tréninky (50%)', color: 'blue', percentage: '50%' },
      { text: 'Měsíční členství', color: 'global', percentage: '30%' },
      { text: 'Suplementy', color: 'global', percentage: '20%' }
    ],
    activities: [
      { text: 'Osobní tréninky', color: 'blue' },
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
      crossSell: '💊 Suplementy po tréninku → 20% tržeb (marže 60%!) - trenér ti přímo doporučí co potřebuješ = osobní přístup zvyšuje prodeje',
      revenueBreakdown: 'PT 50% + Členství 30% + Suplementy 20% = vysoké příjmy na osobu',
      keySuccess: 'Osobní trenéři = retention 85% (průměr industry je 40%)',
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
      { text: 'Komunitní akce', color: 'global' }
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
      crossSell: '👕 Merch a šejkry → 10% tržeb (marže 70%) - komunita nosí tvoje logo = branding zdarma + pocit příslušnosti',
      revenueBreakdown: 'Členství 70% (stabilní!) + Drop-in 20% + Merch 10%',
      keySuccess: 'Community = retention 70% (lidé přijdou kvůli přátelům)',
      whyItWorks: '🤝 Mladí lidé 20-35 let chtějí sociální zážitek, ne jen cvičení: Přijdou na lekci, poznají kámoše, vrací se kvůli přátelům (ne kvůli fitness!). Skupinové lekce = zábava + motivace + community. Když má někdo partu ve fitku, neodchází → retention 70%'
    }
  }
];

const CATEGORIES = [
  { id: 'Kavárny', name: 'Kavárny', emoji: '☕' },
  { id: 'Restaurace', name: 'Pizzerie', emoji: '🍕' },
  { id: 'Fitness', name: 'Fitness', emoji: '🏋️' }
];

export function BusinessModelGallery({ onComplete, onNavigateNext, isLessonCompleted = false }: Props) {
  // 📱 LAYOUT DETECTION - Používáme POUZE šířku okna (ne touch detection!)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const [selectedCategory, setSelectedCategory] = useState('Kavárny');
  const [selectedVersion, setSelectedVersion] = useState('a');
  const [showInsights, setShowInsights] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Listen for window resize to update isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter models by category
  const filteredModels = BUSINESS_MODELS.filter(m => m.category === selectedCategory);
  
  // Get current model
  const currentModel = filteredModels.find(m => m.id.endsWith(`-${selectedVersion}`));

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedVersion('a');
    setShowInsights(false);
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    setShowInsights(false);
  };

  if (!currentModel) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-2">💡 Galerie podnikatelských modelů</h3>
        <p className="text-purple-100">
          Porovnejte různé strategie ve stejném odvětví - každý model funguje jinak!
        </p>
      </div>

      {/* Category filters */}
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

      {/* 📱 MOBILE: TABS pro přepínání A/B verzí */}
      {isMobile && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
          <h4 className="text-sm font-bold text-blue-900 mb-3 text-center">
            📊 Porovnejte různé strategie:
          </h4>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-blue-300 p-1 rounded-lg shadow-sm">
              <TabsTrigger 
                value="a" 
                className="gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all font-bold py-3"
              >
                <span className="text-xs sm:text-sm">
                  {filteredModels.find(m => m.id.endsWith('-a'))?.version.split(' - ')[1] || 'Verze A'}
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="b" 
                className="gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all font-bold py-3"
              >
                <span className="text-xs sm:text-sm">
                  {filteredModels.find(m => m.id.endsWith('-b'))?.version.split(' - ')[1] || 'Verze B'}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* 🎨 CANVAS DISPLAY - Společné pro mobile i desktop */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        {/* Model Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 border-b-2 border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                {currentModel.emoji} {currentModel.name} - {currentModel.version}
              </h4>
              <p className="text-sm sm:text-base text-gray-600">{currentModel.description}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInsights(!showInsights)}
              className="gap-2 shrink-0"
            >
              <Info className="w-4 h-4" />
              {showInsights ? 'Skrýt' : 'Proč to funguje?'}
            </Button>
          </div>
        </div>

        {/* Canvas - DESKTOP ONLY */}
        {!isMobile && (
          <div className="p-4">
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
        )}

        {/* Mobile Cards - klíčové informace v kartách */}
        {isMobile && (
          <div className="px-4 py-6 space-y-4">
            {/* Segmenty zákazníků */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4">
              <h5 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                👥 Segmenty zákazníků
              </h5>
              <div className="space-y-2">
                {currentModel.segments.map((seg, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-800">{seg.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hodnotová nabídka */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-4">
              <h5 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                💎 Hodnotová nabídka
              </h5>
              <div className="space-y-2">
                {currentModel.value.map((val, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-800">{val.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Příjmy */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4">
              <h5 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                💰 Zdroje příjmů
              </h5>
              <div className="space-y-2">
                {currentModel.revenue.map((rev, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 shadow-sm flex items-center justify-between">
                    <p className="text-sm text-gray-800">{rev.text}</p>
                    {rev.percentage && (
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
                        {rev.percentage}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Klíčové aktivity */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-4">
              <h5 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                🎯 Klíčové aktivity
              </h5>
              <div className="space-y-2">
                {currentModel.activities.map((act, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-800">{act.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Insights Panel */}
        {showInsights && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-t-2 border-amber-200 p-4 sm:p-6">
            <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-600" />
              💡 Proč tento model funguje?
            </h5>
            <div className="space-y-3">
              <div className="bg-white border border-amber-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm font-bold text-amber-900 mb-2">🎯 Klíč k úspěchu:</p>
                <p className="text-sm text-amber-800">{currentModel.insights.keySuccess}</p>
              </div>
              <div className="bg-white border border-amber-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm font-bold text-amber-900 mb-2">🧠 Proč to funguje:</p>
                <p className="text-sm text-amber-800">{currentModel.insights.whyItWorks}</p>
              </div>
              <div className="bg-white border border-amber-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm font-bold text-amber-900 mb-2">💰 Cross-sell strategie:</p>
                <p className="text-sm text-amber-800">{currentModel.insights.crossSell}</p>
              </div>
              <div className="bg-white border border-amber-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm font-bold text-amber-900 mb-2">📊 Struktura příjmů:</p>
                <p className="text-sm text-amber-800">{currentModel.insights.revenueBreakdown}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🖥️ DESKTOP ONLY: VERSION SELECTOR BUTTONS dole pod canvasem */}
      {!isMobile && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-blue-900 mb-4 text-center text-lg">
            📊 Porovnejte různé strategie ve stejném odvětví:
          </h4>
          <p className="text-sm text-blue-700 text-center mb-6">
            Každý model funguje jinak - všimněte si rozdílů v segmentech, hodnotě a příjmech!
          </p>
          
          {/* Version Buttons */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {filteredModels.map((model) => {
              const version = model.id.endsWith('-a') ? 'a' : 'b';
              const isActive = selectedVersion === version;
              
              return (
                <button
                  key={model.id}
                  onClick={() => handleVersionChange(version)}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all
                    ${isActive 
                      ? 'bg-blue-500 border-blue-600 text-white shadow-lg scale-105' 
                      : 'bg-white border-blue-300 text-gray-900 hover:border-blue-400 hover:shadow-md'
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                  
                  <div className="text-left">
                    <h5 className={`font-bold mb-2 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                      {model.version}
                    </h5>
                    <p className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-600'}`}>
                      {model.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Vysvětlení zvýraznění */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 text-center">
        <p className="text-blue-900">
          💡 <strong>Proč jsou zvýrazněné Segmenty a Hodnota?</strong><br />
          Protože to jsou HLAVNÍ stavební bloky každého Business Modelu! Vše ostatní se odvíjí od toho KDO jsou vaši zákazníci (Segmenty) a CO jim nabízíte (Hodnota).
        </p>
      </div>

      {/* CTA - Dokončit Modul 2 - JEN když lekce NENÍ dokončená */}
      {!isLessonCompleted && (
        <>
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
                  // Auto-redirect po 1s
                  if (onNavigateNext) {
                    setTimeout(() => {
                      onNavigateNext();
                    }, 1000);
                  }
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
                    Skvělá práce! Nyní začněte s Modulem 3 - Hodnotová nabídka.
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
        </>
      )}
    </div>
  );
}
