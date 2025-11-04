import { useState, useEffect, useRef, useMemo } from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  Target,
  Flame,
  Star,
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  Info,
  X,
  RotateCcw,
  Plus,
  Sparkles
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { FitStepInstructions } from "./FitStepInstructions";
import { trackCourseEvent, trackError } from "../lib/sentry";
import { toast } from "sonner";
import { BottomSheet } from "./BottomSheet";
import { haptic } from "../lib/haptics";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface Props {
  userId: string;
  selectedSegment?: string;
  onSegmentChange?: (segment: string) => void;
  onValueChange?: (value: string) => void;
  onNavigateToLesson?: (lessonId: number) => void;
  onNavigateToTool?: (tool: string) => void; // 🎯 Navigace na nástroje (action-plan)
  onComplete?: (fitScore: number) => void; // ✅ Callback pro dokončení lekce
  isLessonCompleted?: boolean; // ✅ Je lekce 16 již dokončená?
  onAchievementUnlocked?: (achievementId: string) => void; // 🎉 Achievement callback
}

interface VPCItem {
  id: string;
  text: string;
  priority?: number; // 0 = highest, higher numbers = lower priority
  count?: number; // Kolik lidí toto zmiňovalo
  percentage?: number; // Automaticky vypočítané %
}

interface ValueMapItem {
  text: string;
  color: string;
}

// ➕ Add Item Input Component - MOBILNÍ VERZE s BottomSheet
function AddItemInput({ 
  category, 
  placeholder, 
  onAdd, 
  color 
}: { 
  category: string;
  placeholder: string;
  onAdd: (text: string) => Promise<boolean | void>;
  color: 'yellow' | 'red' | 'green';
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAdd = async () => {
    if (!newText.trim()) return;
    
    haptic('light');
    setIsSubmitting(true);
    const success = await onAdd(newText);
    setIsSubmitting(false);
    
    // ✅ Success je handled v onAdd (má vlastní toast) - jen reset field
    if (success !== false) {
      haptic('success');
      setNewText('');
      setIsSheetOpen(false);
    }
    // ❌ Error je taky handled v onAdd - nic nedělej
  };

  const handleOpen = () => {
    haptic('light');
    setIsSheetOpen(true);
  };

  const handleClose = () => {
    setIsSheetOpen(false);
    setNewText('');
  };
  
  const borderColor = color === 'yellow' ? 'border-yellow-300' 
                    : color === 'red' ? 'border-red-300' 
                    : 'border-green-300';
  
  const bgColor = color === 'yellow' ? 'bg-yellow-50' 
                : color === 'red' ? 'bg-red-50' 
                : 'bg-green-50';
  
  const textColor = color === 'yellow' ? 'text-yellow-700' 
                  : color === 'red' ? 'text-red-700' 
                  : 'text-green-700';

  const buttonColor = color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700' 
                    : color === 'red' ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700';

  const categoryLabel = category === 'jobs' ? 'Úkol zákazníka'
                      : category === 'pains' ? 'Bolest zákazníka'
                      : category === 'gains' ? 'Zisk zákazníka'
                      : category === 'products' ? 'Produkt/Služba'
                      : category === 'painRelievers' ? 'Řešení obtíží'
                      : category === 'gainCreators' ? 'Tvorba přínosů'
                      : 'Přidat položku';
  
  return (
    <>
      {/* Add Button */}
      <button
        onClick={handleOpen}
        className={`w-full p-3 border-2 border-dashed ${borderColor} rounded-lg ${textColor} hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2`}
      >
        <Plus className="w-4 h-4" />
        {placeholder}
      </button>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={handleClose}
        title={categoryLabel}
        snapPoints={[0.5, 0.85]}
        defaultSnap={0}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          {/* Instrukční text */}
          <div className={`p-3 ${bgColor} rounded-lg`}>
            <p className={`text-sm ${textColor}`}>
              {category === 'jobs' && '📋 Jakou práci/úkol se zákazník snaží splnit?'}
              {category === 'pains' && '😰 Co zákazníka trápí, frustruje nebo brzdí?'}
              {category === 'gains' && '🎯 Jaké výhody nebo zisky zákazník hledá?'}
              {category === 'products' && '🎁 Co konkrétně nabízíte zákazníkovi?'}
              {category === 'painRelievers' && '💊 Jak konkrétně řešíte problémy zákazníka?'}
              {category === 'gainCreators' && '✨ Jak konkrétně vytváříte hodnotu pro zákazníka?'}
            </p>
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text položky
            </label>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  console.log(`⌨️ [${category}-ENTER] Enter pressed`);
                  e.preventDefault();
                  handleAdd();
                }
              }}
              disabled={isSubmitting}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => {
                console.log(`🖱️ [${category}-BUTTON] Button clicked`);
                handleAdd();
              }}
              disabled={!newText.trim() || isSubmitting}
              size="lg"
              className={`flex-1 h-14 text-lg ${buttonColor}`}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Přidávám...' : 'Přidat'}
            </Button>
            <Button
              onClick={handleClose}
              variant="outline"
              size="lg"
              className="h-14 px-6"
              disabled={isSubmitting}
            >
              Zrušit
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}

// Priority Item Component s číselným hodnocením
function PriorityItemWithScore({ 
  text, 
  index,
  total,
  totalRespondents,
  count = 0,
  percentage = 0,
  color,
  onUpdateCount,
  onDelete,
  showPriorities = false,
  allItems = []
}: { 
  text: string; 
  index: number;
  total: number;
  totalRespondents: number;
  count?: number;
  percentage?: number;
  color: 'yellow' | 'red' | 'green';
  onUpdateCount: (count: number) => void;
  onDelete?: () => void;
  showPriorities?: boolean;
  allItems?: { percentage?: number }[];
}) {
  // ✅ NOVÁ LOGIKA: Zjisti jestli je TOP 3 s TIES detection!
  const validItems = allItems
    .map((item, idx) => ({ ...item, originalIndex: idx }))
    .filter(item => (item.percentage || 0) > 0)
    .sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
  
  let isTop = false;
  
  if (validItems.length > 0 && (percentage || 0) > 0) {
    // Pokud mají všechny stejné %, všechny jsou TOP
    const firstPercentage = validItems[0]?.percentage || 0;
    const allSame = validItems.every(item => item.percentage === firstPercentage);
    
    if (allSame) {
      isTop = true;
      if (index === 0) console.log('✨ All same %:', firstPercentage, '→ všechny TOP');
    } else if (validItems.length <= 3) {
      isTop = true;
    } else {
      // Top 3 + ties
      const top3 = validItems.slice(0, 3);
      const thirdPercentage = top3[2]?.percentage || 0;
      
      // Je v top 3 NEBO má stejné % jako 3. místo?
      const myIndex = validItems.findIndex(item => item.originalIndex === index);
      isTop = myIndex !== -1 && (myIndex < 3 || percentage === thirdPercentage);
      
      if (percentage === thirdPercentage && myIndex >= 3) {
        console.log('🔗 Tie detected for:', text.substring(0, 20), '| %:', percentage, '| isTop:', isTop);
      }
    }
  }

  // Barvy podle typu - jen když showPriorities
  const bgColor = (showPriorities && isTop)
    ? color === 'yellow' ? 'bg-yellow-50' 
      : color === 'red' ? 'bg-red-50' 
      : 'bg-green-50'
    : 'bg-white';
  
  const borderColor = (showPriorities && isTop)
    ? color === 'yellow' ? 'border-yellow-400'
      : color === 'red' ? 'border-red-400'
      : 'border-green-400'
    : 'border-gray-200';
  
  // Text barva podle typu (pro procenta)
  const textColor = color === 'yellow' ? 'text-yellow-700' 
                  : color === 'red' ? 'text-red-700' 
                  : 'text-green-700';
  
  // Hvězdičky podle % (5 hvězdiček)
  const stars = Math.round((percentage / 100) * 5);

  return (
    <div
      className={`flex flex-col gap-3 p-4 rounded-lg border-2 ${bgColor} ${borderColor} transition-all animate-in fade-in slide-in-from-bottom-4 duration-300`}
    >
      {/* Text */}
      <div className="flex items-start justify-between gap-3">
        <p className={`${textColor} flex-1`}>{text}</p>
        <div className="flex items-center gap-2">
          {showPriorities && isTop && (
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
          )}
          {/* Delete button pro položky s 0 lidí */}
          {count === 0 && onDelete && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Smazat (nikdo to nezmínil)"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      
      {/* Input pro počet lidí + Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-sm text-gray-600">Kolik lidí:</label>
          <input
            type="number"
            min="0"
            max={totalRespondents}
            value={count}
            onChange={(e) => {
              const newCount = parseInt(e.target.value) || 0;
              // ⚠️ LIMIT: Nemůžeš mít víc než total respondentů
              onUpdateCount(Math.min(newCount, totalRespondents));
            }}
            onFocus={(e) => e.target.select()}
            className="w-16 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-center font-medium"
          />
          <span className="text-sm text-gray-600">/ {totalRespondents}</span>
          
          {/* Automatické % a hvězdičky */}
          {count > 0 && (
            <>
              <span className={`text-sm font-bold ${textColor}`}>
                = {percentage}%
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Progress Bar */}
        {count > 0 && (
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              style={{ width: `${percentage}%` }}
              className={`h-full transition-all duration-500 ${
                color === 'yellow' ? 'bg-yellow-500' : 
                color === 'red' ? 'bg-red-500' : 
                'bg-green-500'
              }`}
            />
          </div>
        )}
      </div>
      
      {/* Priority label */}
      {showPriorities && isTop && (
        <p className="text-xs text-green-700 flex items-center gap-1">
          <Flame className="w-3 h-3" />
          Top 3 priorita
        </p>
      )}
    </div>
  );
}

//     UNIVERZÁLNÍ PRŮVODCE - funguje pro VŠECHNY segmenty
function getGuideForSegment(segmentName: string) {
  return {
    title: `🎯 Jak zjistit co ${segmentName || 'váš segment'} opravdu potřebují`,
    description: "Klíčem k úspěchu je pochopit opravdové potřeby vašich zákazníků.",
    questions: {
      jobs: [
        "Kvůli čemu k vám tento segment přichází?",
        "Co chtějí udělat nebo dosáhnout?",
        "Jaké úkoly za ně řešíte?"
      ],
      pains: [
        "Na co si tento segment nejvíc stěžuje?",
        "Co je frustruje u současných řešení?",
        "Jaké překážky jim brání v úspěchu?"
      ],
      gains: [
        "Co tento segment v referencích vždy zmiňuje?",
        "Čím se chlubí ostatním?",
        "Co oceňují nad rámec základní služby?"
      ]
    },
    examples: {
      jobs: ["Zeptejte se 3-5 lidí z tohoto segmentu", "Analyzujte jejich odpovědi", "Najděte opakující se vzorce"],
      pains: ["Koukněte na diskuze/fóra kde se pohybují", "Co neustále řeší?", "Na co si stěžují?"],
      gains: ["Co v hodnoceních/referencích zmiňují?", "Co je pro ně 'must have'?", "Co považují za bonus?"]
    }
  };
}

export function FitValidatorV2({ userId, selectedSegment, onSegmentChange, onValueChange, onNavigateToLesson, onNavigateToTool, onComplete, isLessonCompleted, onAchievementUnlocked }: Props) {
  // Step state: 1 = Discovery, 2 = Prioritization, 3 = Validation
  const [currentStep, setCurrentStep] = useState(1);
  
  // 🎯 Toggle mezi Customer Profile a Value Map v Kroku 2
  const [step2View, setStep2View] = useState<'customer' | 'value'>('customer');
  
  // 🔑 Force re-render timestamp pro Krok 3
  const [step3Timestamp, setStep3Timestamp] = useState(Date.now());
  
  // VPC data
  const [jobs, setJobs] = useState<VPCItem[]>([]);
  const [pains, setPains] = useState<VPCItem[]>([]);
  const [gains, setGains] = useState<VPCItem[]>([]);
  const [products, setProducts] = useState<ValueMapItem[]>([]);
  const [painRelievers, setPainRelievers] = useState<ValueMapItem[]>([]);
  const [gainCreators, setGainCreators] = useState<ValueMapItem[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  
  // 🎯 Tracker jestli uživatel už něco přesunul (pak teprve ukázat priority)
  const [hasUserSorted, setHasUserSorted] = useState(false);
  
  // 📊 Celkový počet respondentů pro prioritizaci
  const [totalRespondents, setTotalRespondents] = useState(10);
  
  // 📊 Dostupné segmenty a hodnoty pro dropdown
  const [availableSegments, setAvailableSegments] = useState<{text: string; color: string}[]>([]);
  const [availableValues, setAvailableValues] = useState<{text: string; color: string}[]>([]);
  const [localSelectedSegment, setLocalSelectedSegment] = useState(selectedSegment || '');
  const [localSelectedValue, setLocalSelectedValue] = useState('');
  
  // 🔍 Tracker pro zjištění změny segmentu/hodnoty (pro mazání mappings)
  const [lastLoadedSegment, setLastLoadedSegment] = useState<string>('');
  const [lastLoadedValue, setLastLoadedValue] = useState<string>('');
  
  // 🔗 INTERAKTIVNÍ MAPOVÁNÍ - které řešení pokrývá které priority
  const [painRelieverMappings, setPainRelieverMappings] = useState<Record<string, string[]>>({});
  const [gainCreatorMappings, setGainCreatorMappings] = useState<Record<string, string[]>>({});
  const [productMappings, setProductMappings] = useState<Record<string, string[]>>({});
  
  // 🎨 COLLAPSE state pro kompaktní UI
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set());
  const [expandedPainRelievers, setExpandedPainRelievers] = useState<Set<number>>(new Set());
  const [expandedGainCreators, setExpandedGainCreators] = useState<Set<number>>(new Set());
  
  // 📖 Dynamický guide podle segmentu
  const guide = getGuideForSegment(localSelectedSegment || selectedSegment || 'váš segment');
  
  // 📍 Ref pro scroll na navigation tlačítka
  const navigationRef = useRef<HTMLDivElement>(null);
  
  // 📍 Ref pro scroll pozici
  const contentRef = useRef<HTMLDivElement>(null);
  
  // 💾 Auto-save timer
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // 💾 Save FIT Validator progress
  const saveFitProgress = async (customJobs?: VPCItem[], customPains?: VPCItem[], customGains?: VPCItem[]) => {
    if (!userId) return;
    
    const segmentToUse = localSelectedSegment || selectedSegment;
    if (!segmentToUse) return;
    
    // Použij custom data pokud jsou poskytnuté (po smazání), jinak použij state
    const jobsToSave = customJobs || jobs;
    const painsToSave = customPains || pains;
    const gainsToSave = customGains || gains;
    
    try {
      // 🎯 SPOČÍTEJ FIT SCORE (stejná logika jako v useMemo fitScoreData)
      // Top 3 items podle percentage
      const topJobsToSave = jobsToSave
        .filter(j => (j.percentage || 0) > 0)
        .sort((a, b) => (b.percentage || 0) - (a.percentage || 0))
        .slice(0, 3);
      
      const topPainsToSave = painsToSave
        .filter(p => (p.percentage || 0) > 0)
        .sort((a, b) => (b.percentage || 0) - (a.percentage || 0))
        .slice(0, 3);
      
      const topGainsToSave = gainsToSave
        .filter(g => (g.percentage || 0) > 0)
        .sort((a, b) => (b.percentage || 0) - (a.percentage || 0))
        .slice(0, 3);
      
      // Zjisti kolik z top items má mapování
      const coveredPainIds = new Set<string>();
      const coveredGainIds = new Set<string>();
      const coveredJobIds = new Set<string>();
      
      Object.values(painRelieverMappings).forEach(painIds => {
        painIds.forEach(id => coveredPainIds.add(id));
      });
      
      Object.values(gainCreatorMappings).forEach(gainIds => {
        gainIds.forEach(id => coveredGainIds.add(id));
      });
      
      Object.values(productMappings).forEach(jobIds => {
        jobIds.forEach(id => coveredJobIds.add(id));
      });
      
      const coveredPainsCount = topPainsToSave.filter(p => coveredPainIds.has(p.id)).length;
      const coveredGainsCount = topGainsToSave.filter(g => coveredGainIds.has(g.id)).length;
      const coveredJobsCount = topJobsToSave.filter(j => coveredJobIds.has(j.id)).length;
      
      // Výpočet FIT Score
      let totalWeight = 0;
      let achievedScore = 0;
      
      if (topPainsToSave.length > 0) {
        totalWeight += 40;
        achievedScore += (coveredPainsCount / topPainsToSave.length) * 40;
      }
      if (topGainsToSave.length > 0) {
        totalWeight += 40;
        achievedScore += (coveredGainsCount / topGainsToSave.length) * 40;
      }
      if (topJobsToSave.length > 0) {
        totalWeight += 20;
        achievedScore += (coveredJobsCount / topJobsToSave.length) * 20;
      }
      
      const calculatedFitScore = totalWeight > 0 ? Math.round((achievedScore / totalWeight) * 100) : 0;
      
      // Připrav data k uložení
      const progressData = {
        totalRespondents,
        hasUserSorted,
        currentStep,
        lastSaved: new Date().toISOString(),
        fitScore: calculatedFitScore,
        jobs: jobsToSave.map(j => ({ 
          id: j.id,
          text: j.text, 
          count: j.count || 0, 
          percentage: j.percentage || 0, 
          priority: j.priority || 0 
        })),
        pains: painsToSave.map(p => ({ 
          id: p.id,
          text: p.text, 
          count: p.count || 0, 
          percentage: p.percentage || 0, 
          priority: p.priority || 0 
        })),
        gains: gainsToSave.map(g => ({ 
          id: g.id,
          text: g.text, 
          count: g.count || 0, 
          percentage: g.percentage || 0, 
          priority: g.priority || 0 
        })),
        painRelieverMappings,
        gainCreatorMappings,
        productMappings
      };
      
      // Najdi záznam pro tento segment
      const { data: existing, error: fetchError } = await supabase
        .from('value_proposition_canvas')
        .select('id')
        .eq('user_id', userId)
        .eq('segment_name', segmentToUse)
        .is('selected_value', null)
        .maybeSingle();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      if (existing) {
        // Update existující záznam
        const { error: updateError } = await supabase
          .from('value_proposition_canvas')
          .update({ fit_validation_data: progressData })
          .eq('id', existing.id);
        
        if (updateError) throw updateError;
      }
    } catch (error) {
      console.error('❌ Error saving FIT progress:', error);
    }
  };
  
  // 💾 Debounced auto-save
  const debouncedSave = () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    
    saveTimerRef.current = setTimeout(() => {
      saveFitProgress();
    }, 2000);
  };
  
  // 🔄 AUTO-SAVE když se změní mappings, jobs, pains, gains, nebo totalRespondents
  useEffect(() => {
    if (isLoading) return;
    
    debouncedSave();
    
    // 🚨 CLEANUP: Když se komponenta unmountuje → OKAMŽITĚ ulož (bez debounce)!
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveFitProgress();
      }
    };
  }, [
    painRelieverMappings, 
    gainCreatorMappings, 
    productMappings,
    jobs,
    pains,
    gains,
    totalRespondents,
    hasUserSorted
  ]);
  
  // 🎯 Auto-select hodnotu když je jen 1
  useEffect(() => {
    if (!localSelectedSegment || availableValues.length === 0) return;
    
    const segmentData = availableSegments.find(s => s.text === localSelectedSegment);
    if (!segmentData) return;
    
    const isBila = segmentData.color === '#d1d5db' || segmentData.color.toLowerCase() === 'white';
    const matchingValues = isBila 
      ? availableValues.filter(v => v.color === '#d1d5db' || v.color.toLowerCase() === 'white')
      : availableValues.filter(v => v.color === segmentData.color);
    
    // Pokud je jen 1 matching hodnota a nen�� vybraná, automaticky vyber
    if (matchingValues.length === 1 && !localSelectedValue) {
      setLocalSelectedValue(matchingValues[0].text);
      if (onValueChange) onValueChange(matchingValues[0].text);
    }
  }, [localSelectedSegment, availableValues, availableSegments]);

  // Load VPC data from Supabase
  const loadVPC = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    
    try {
      const currentSegment = localSelectedSegment || selectedSegment;
      const currentValue = localSelectedValue;
      
      console.log('🔍 FitValidatorV2 loading VPC:', { 
        userId, 
        currentSegment,
        currentValue,
        lastLoadedSegment,
        lastLoadedValue
      });
      
      // ✅ Když se změní segment NEBO hodnota → update trackery
      if (currentSegment !== lastLoadedSegment || currentValue !== lastLoadedValue) {
        console.log('🔄 DETEKOVÁNA ZMĚNA segmentu/hodnoty - načítám nová data z DB', {
          segmentChanged: currentSegment !== lastLoadedSegment,
          valueChanged: currentValue !== lastLoadedValue
        });
        
        // ✅ DŮLEŽITÉ: NEMAZAT mappings! Načtou se z DB níže (řádek 728+)
        // Pokud v DB nejsou, nastaví se na prázdné (řádek 799-801)
        
        // Ulož nové hodnoty
        setLastLoadedSegment(currentSegment);
        setLastLoadedValue(currentValue);
      }
      
      // ✅ Načti VŠECHNY záznamy pro daný segment (Customer Profile + Value Maps)
      let query = supabase
        .from('value_proposition_canvas')
        .select('*')
        .eq('user_id', userId);
      
      // Pokud je vybraný segment, filtruj podle něj
      const segmentToLoad = localSelectedSegment || selectedSegment;
      if (segmentToLoad && segmentToLoad !== '') {
        query = query.eq('segment_name', segmentToLoad);
      }
      
      const { data: allRecords, error } = await query;
      
      console.log('📊 VPC Data loaded:', { 
        allRecords,
        count: allRecords?.length,
        error
      });
      
      if (error) {
        console.error('Error loading VPC:', error);
        setJobs([]);
        setPains([]);
        setGains([]);
        setProducts([]);
        setPainRelievers([]);
        setGainCreators([]);
        return;
      }
      
      if (allRecords && allRecords.length > 0) {
        // ✅ Najdi Customer Profile (selected_value je null)
        const customerProfile = allRecords.find(r => r.selected_value === null);
        
        // ✅ Najdi Value Maps (selected_value není null)
        const valueMaps = allRecords.filter(r => r.selected_value !== null);
        
        // 🎯 Pokud je vybraná hodnota, použij tu konkrétní Value Map
        let valueMap = null;
        if (localSelectedValue && localSelectedValue !== '') {
          valueMap = valueMaps.find(vm => vm.selected_value === localSelectedValue);
          console.log('🔍 Looking for specific value:', { 
            localSelectedValue, 
            found: !!valueMap,
            availableMaps: valueMaps.map(vm => vm.selected_value)
          });
        } else {
          // Jinak použij první
          valueMap = valueMaps.length > 0 ? valueMaps[0] : null;
        }
        
        console.log('🔍 Separated data:', {
          customerProfile: !!customerProfile,
          valueMap: !!valueMap,
          selectedValue: valueMap?.selected_value,
          jobsCount: customerProfile?.jobs?.length || 0,
          painsCount: customerProfile?.pains?.length || 0,
          gainsCount: customerProfile?.gains?.length || 0,
          productsCount: valueMap?.products?.length || 0
        });
        
        console.log('📦 Customer Profile RAW DATA:', customerProfile);
        
        // 💾 Načti FIT validation progress (pokud existuje)
        const fitProgress = customerProfile?.fit_validation_data;
        
        console.log('📊 FIT Progress data:', fitProgress);
        
        // Convert arrays to VPCItem format
        let jobsData: VPCItem[];
        let painsData: VPCItem[];
        let gainsData: VPCItem[];
        
        if (fitProgress && fitProgress.jobs !== undefined) {
          
          jobsData = fitProgress.jobs.map((item: any, index: number) => {
            const textSlug = item.text.substring(0, 30).replace(/\s+/g, '-').toLowerCase();
            return {
              id: item.id || `job-${textSlug}-${index}`, // Použij uložené ID nebo vygeneruj z textu + indexu
              text: item.text,
              count: item.count || 0,
              percentage: item.percentage || 0,
              priority: item.priority !== undefined ? item.priority : index
            };
          });
          
          painsData = fitProgress.pains.map((item: any, index: number) => {
            const textSlug = item.text.substring(0, 30).replace(/\s+/g, '-').toLowerCase();
            return {
              id: item.id || `pain-${textSlug}-${index}`,
              text: item.text,
              count: item.count || 0,
              percentage: item.percentage || 0,
              priority: item.priority !== undefined ? item.priority : index
            };
          });
          
          gainsData = fitProgress.gains.map((item: any, index: number) => {
            const textSlug = item.text.substring(0, 30).replace(/\s+/g, '-').toLowerCase();
            return {
              id: item.id || `gain-${textSlug}-${index}`,
              text: item.text,
              count: item.count || 0,
              percentage: item.percentage || 0,
              priority: item.priority !== undefined ? item.priority : index
            };
          });
          
          // Načti i ostatní uložená data
          if (fitProgress.totalRespondents) {
            setTotalRespondents(fitProgress.totalRespondents);
          }
          
          // ✅ AUTOMATICKY DETEKUJ hasUserSorted podle dat!
          // Pokud mají alespoň jednu položku s count > 0, znamená to že už prioritizovali
          const hasAnyCount = jobsData.some(j => (j.count || 0) > 0) || 
                             painsData.some(p => (p.count || 0) > 0) || 
                             gainsData.some(g => (g.count || 0) > 0);
          
          if (hasAnyCount) {
            // Mají data s count > 0 → automaticky aktivuj priority zobrazení
            setHasUserSorted(true);
          } else if (fitProgress.hasUserSorted !== undefined) {
            // Nemají count, ale uložená hodnota existuje → použij ji
            setHasUserSorted(fitProgress.hasUserSorted);
          }
          
          if (fitProgress.currentStep) {
            setCurrentStep(fitProgress.currentStep);
          }
          // 🔗 Načti mapování pokud existují (ale jen pro SOUČASNÝ segment!)
          // ✅ DŮLEŽITÉ: Mappings jsou vždy pro konkrétní segment, takže když loadujeme jiný segment, nesmíme je načíst!
          // Načteme je jen pokud je currentStep >= 3 (FIT Validator)
          if (fitProgress.currentStep >= 3) {
            // ✅ AUTOMATICKÁ DETEKCE ZMĚN v Customer Profile!
            // Pokud se změnily Jobs/Pains/Gains, VYMAŽ mappings (jsou neplatné!)
            const oldJobTexts = (fitProgress.jobs || []).map((j: any) => j.text).sort();
            const newJobTexts = jobsData.map(j => j.text).sort();
            const jobsChanged = JSON.stringify(oldJobTexts) !== JSON.stringify(newJobTexts);
            
            const oldPainTexts = (fitProgress.pains || []).map((p: any) => p.text).sort();
            const newPainTexts = painsData.map(p => p.text).sort();
            const painsChanged = JSON.stringify(oldPainTexts) !== JSON.stringify(newPainTexts);
            
            const oldGainTexts = (fitProgress.gains || []).map((g: any) => g.text).sort();
            const newGainTexts = gainsData.map(g => g.text).sort();
            const gainsChanged = JSON.stringify(oldGainTexts) !== JSON.stringify(newGainTexts);
            
            if (jobsChanged || painsChanged || gainsChanged) {
              console.log('🔄 DETEKOVÁNA ZMĚNA v Customer Profile!', {
                jobsChanged: jobsChanged ? `${oldJobTexts.length} → ${newJobTexts.length}` : false,
                painsChanged: painsChanged ? `${oldPainTexts.length} → ${newPainTexts.length}` : false,
                gainsChanged: gainsChanged ? `${oldGainTexts.length} → ${newGainTexts.length}` : false
              });
              
              // Vymaž mappings (jsou neplatné!)
              setPainRelieverMappings({});
              setGainCreatorMappings({});
              setProductMappings({});
              
              // Toast notifikace
              toast.info('🔄 Detekována změna v Customer Profile - FIT propojení byla resetována');
              
              // Neskladuj mappings - přeskoč načítání!
              // ALE: Zachovej prioritizaci (jobs, pains, gains s %)!
            } else {
              // Žádná změna → normálně načti mappings
              // ⚠️ DŮLEŽITÉ: Stará mappings používají stará ID (job-0, job-1...)
              // Musíme je přegenerovat aby matchovala NOVÁ ID založená na textu!
              
              // 🔄 Vytvoř lookup tabulku: starý ID → nový ID
              const oldToNewJobIds: Record<string, string> = {};
              if (fitProgress.jobs) {
                fitProgress.jobs.forEach((oldJob: any, index: number) => {
                  const oldId = oldJob.id || `job-${index}`;
                  const newId = jobsData.find(j => j.text === oldJob.text)?.id;
                  if (newId) {
                    oldToNewJobIds[oldId] = newId;
                  }
                });
              }
              
              const oldToNewPainIds: Record<string, string> = {};
              if (fitProgress.pains) {
                fitProgress.pains.forEach((oldPain: any, index: number) => {
                  const oldId = oldPain.id || `pain-${index}`;
                  const newId = painsData.find(p => p.text === oldPain.text)?.id;
                  if (newId) {
                    oldToNewPainIds[oldId] = newId;
                  }
                });
              }
              
              const oldToNewGainIds: Record<string, string> = {};
              if (fitProgress.gains) {
                fitProgress.gains.forEach((oldGain: any, index: number) => {
                  const oldId = oldGain.id || `gain-${index}`;
                  const newId = gainsData.find(g => g.text === oldGain.text)?.id;
                  if (newId) {
                    oldToNewGainIds[oldId] = newId;
                  }
                });
              }
              
              console.log('🔄 ID Migration:', { oldToNewJobIds, oldToNewPainIds, oldToNewGainIds });
              
              // 🔄 Přegeneruj mappings s novými ID
              if (fitProgress.painRelieverMappings) {
                const migratedMappings: Record<string, string[]> = {};
                Object.entries(fitProgress.painRelieverMappings).forEach(([reliever, oldPainIds]) => {
                  migratedMappings[reliever] = (oldPainIds as string[])
                    .map(oldId => oldToNewPainIds[oldId] || oldId)
                    .filter(id => painsData.some(p => p.id === id)); // Odstraň neexistující ID
                });
                setPainRelieverMappings(migratedMappings);
              }
              
              if (fitProgress.gainCreatorMappings) {
                const migratedMappings: Record<string, string[]> = {};
                Object.entries(fitProgress.gainCreatorMappings).forEach(([creator, oldGainIds]) => {
                  migratedMappings[creator] = (oldGainIds as string[])
                    .map(oldId => oldToNewGainIds[oldId] || oldId)
                    .filter(id => gainsData.some(g => g.id === id));
                });
                setGainCreatorMappings(migratedMappings);
              }
              
              if (fitProgress.productMappings) {
                const migratedMappings: Record<string, string[]> = {};
                Object.entries(fitProgress.productMappings).forEach(([product, oldJobIds]) => {
                  migratedMappings[product] = (oldJobIds as string[])
                    .map(oldId => oldToNewJobIds[oldId] || oldId)
                    .filter(id => jobsData.some(j => j.id === id));
                });
                setProductMappings(migratedMappings);
              }
            }
          } else {
            setPainRelieverMappings({});
            setGainCreatorMappings({});
            setProductMappings({});
          }
        } else {
          
          // ✅ Generuj PERZISTENTNÍ ID založené na textu + indexu (pro unikátnost!)
          jobsData = (customerProfile?.jobs || []).map((item: any, index: number) => {
            const text = typeof item === 'string' ? item : item.text;
            const textSlug = text.substring(0, 30).replace(/\s+/g, '-').toLowerCase();
            
            // ✅ NAČTI count/percentage z fitProgress POKUD EXISTUJÍ!
            const savedJob = fitProgress?.jobs?.find((j: any) => j.text === text);
            
            return {
              id: item.id || `job-${textSlug}-${index}`, // Index zajistí unikátnost i pro stejný text
              text,
              count: savedJob?.count || 0,
              percentage: savedJob?.percentage || 0,
              priority: savedJob?.priority !== undefined ? savedJob.priority : index
            };
          });
          
          painsData = (customerProfile?.pains || []).map((item: any, index: number) => {
            const text = typeof item === 'string' ? item : item.text;
            const textSlug = text.substring(0, 30).replace(/\s+/g, '-').toLowerCase();
            
            // ✅ NAČTI count/percentage z fitProgress POKUD EXISTUJÍ!
            const savedPain = fitProgress?.pains?.find((p: any) => p.text === text);
            
            return {
              id: item.id || `pain-${textSlug}-${index}`,
              text,
              count: savedPain?.count || 0,
              percentage: savedPain?.percentage || 0,
              priority: savedPain?.priority !== undefined ? savedPain.priority : index
            };
          });
          
          gainsData = (customerProfile?.gains || []).map((item: any, index: number) => {
            const text = typeof item === 'string' ? item : item.text;
            const textSlug = text.substring(0, 30).replace(/\s+/g, '-').toLowerCase();
            
            // ✅ NAČTI count/percentage z fitProgress POKUD EXISTUJÍ!
            const savedGain = fitProgress?.gains?.find((g: any) => g.text === text);
            
            return {
              id: item.id || `gain-${textSlug}-${index}`,
              text,
              count: savedGain?.count || 0,
              percentage: savedGain?.percentage || 0,
              priority: savedGain?.priority !== undefined ? savedGain.priority : index
            };
          });
        }
        
        setJobs(jobsData);
        setPains(painsData);
        setGains(gainsData);
        
        // Pokud máme Value Map, načti produkty atd. + NORMALIZUJ!
        if (valueMap) {
          // ✅ NORMALIZACE: Převeď stringy na objekty s barvou!
          const normalizeColor = (color: string | undefined): string => {
            if (!color) return '#f59e0b';
            if (color.startsWith('#')) return color;
            const colorMap: Record<string, string> = {
              'blue': '#3b82f6',
              'green': '#22c55e',
              'yellow': '#eab308',
              'red': '#ef4444',
              'purple': '#8b5cf6',
              'pink': '#ec4899',
              'orange': '#f59e0b',
              'gray': '#6b7280'
            };
            return colorMap[color.toLowerCase()] || '#f59e0b';
          };
          
          const normalizeItems = (items: any[], defaultColor: string) => {
            if (!items) return [];
            return items.map(item => {
              if (typeof item === 'string') {
                // Starý formát - string → přidej default barvu
                console.log('🔄 FIT: Normalizing string to object:', item);
                return { text: item, color: defaultColor };
              } else if (item && typeof item === 'object') {
                // Nový formát - objekt → normalizuj barvu
                return { text: item.text, color: normalizeColor(item.color) };
              }
              return { text: String(item), color: defaultColor };
            });
          };
          
          setProducts(normalizeItems(valueMap.products || [], '#f59e0b'));
          setPainRelievers(normalizeItems(valueMap.pain_relievers || [], '#8b5cf6'));
          setGainCreators(normalizeItems(valueMap.gain_creators || [], '#22c55e'));
        } else {
          setProducts([]);
          setPainRelievers([]);
          setGainCreators([]);
        }
      } else {
        // Žádná data
        setJobs([]);
        setPains([]);
        setGains([]);
        setProducts([]);
        setPainRelievers([]);
        setGainCreators([]);
      }
    } catch (err) {
      console.error('Error loading VPC:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Načíst dostupné segmenty a hodnoty
  useEffect(() => {
    loadAvailableOptions();
  }, [userId]);
  
  // ✅ DŮLEŽITÉ: Reload VPC dat když se změní segment NEBO při prvním mount!
  useEffect(() => {
    if (userId && localSelectedSegment) {
      loadVPC();
    }
  }, [localSelectedSegment, userId]); // ✅ Přidán userId pro reload při prvním mount
  
  // 🔄 Přepočítat % když se změní celkový počet respondentů
  useEffect(() => {
    if (totalRespondents > 0) {
      // Přepočítej Jobs
      setJobs(prev => prev.map(item => ({
        ...item,
        percentage: item.count ? Math.round((item.count / totalRespondents) * 100) : 0
      })));
      
      // Přepočítej Pains
      setPains(prev => prev.map(item => ({
        ...item,
        percentage: item.count ? Math.round((item.count / totalRespondents) * 100) : 0
      })));
      
      // Přepočítej Gains
      setGains(prev => prev.map(item => ({
        ...item,
        percentage: item.count ? Math.round((item.count / totalRespondents) * 100) : 0
      })));
    }
  }, [totalRespondents]);

  const loadAvailableOptions = async () => {
    if (!userId) return;
    
    try {
      // ✅ Normalizace barev - stejná jako při načítání products/painRelievers
      const normalizeColor = (color: string): string => {
        const colorMap: Record<string, string> = {
          'blue': '#3b82f6',
          'green': '#22c55e',
          'yellow': '#eab308',
          'red': '#ef4444',
          'purple': '#8b5cf6',
          'pink': '#ec4899',
          'orange': '#f59e0b',
          'white': '#d1d5db',
          'gray': '#6b7280'
        };
        
        if (color.startsWith('#')) return color;
        return colorMap[color.toLowerCase()] || '#f59e0b';
      };
      
      // Načti segmenty
      const { data: segmentsData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .maybeSingle();
      
      if (segmentsData?.content) {
        // ✅ NORMALIZUJ BARVY segmentů!
        const normalizedSegments = segmentsData.content.map((seg: any) => ({
          text: seg.text,
          color: normalizeColor(seg.color)
        }));
        
        setAvailableSegments(normalizedSegments);
        
        // Auto-select první segment pokud není vybraný
        if (!selectedSegment && normalizedSegments.length > 0) {
          const firstSegment = normalizedSegments[0].text;
          setLocalSelectedSegment(firstSegment);
          if (onSegmentChange) onSegmentChange(firstSegment);
        }
      }
      
      // Načti hodnoty
      const { data: valuesData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'value')
        .maybeSingle();
      
      if (valuesData?.content) {
        // ✅ NORMALIZUJ BARVY hodnot!
        const normalizedValues = valuesData.content.map((val: any) => ({
          text: val.text,
          color: normalizeColor(val.color)
        }));
        
        setAvailableValues(normalizedValues);
      }
    } catch (err) {
      console.error('Error loading options:', err);
    }
  };

  useEffect(() => {
    loadVPC();
  }, [userId, selectedSegment, localSelectedSegment]);
  
  // 🔄 Reload VPC když se změní hodnota (načte správnou Value Map)
  useEffect(() => {
    if (!isLoading && localSelectedValue) {
      loadVPC();
    }
  }, [localSelectedValue]);
  
  // 🎯 Trigger auto-select po načtení dat
  useEffect(() => {
    if (!isLoading && availableSegments.length > 0 && availableValues.length > 0 && !localSelectedValue) {
      const currentSegment = localSelectedSegment || selectedSegment;
      const segmentData = availableSegments.find(s => s.text === currentSegment);
      
      if (segmentData) {
        const isBila = segmentData.color === '#d1d5db' || segmentData.color?.toLowerCase() === 'white';
        
        if (!isBila) {
          const matchingValue = availableValues.find(v => v.color === segmentData.color);
          if (matchingValue) {
            setLocalSelectedValue(matchingValue.text);
            if (onValueChange) onValueChange(matchingValue.text);
          }
        }
      }
    }
  }, [isLoading, availableSegments, availableValues]);
  
  // ❌ DISABLED - způsobovalo problémy s renderingem
  // useEffect pro force reload byl odstraněn
  
  // 💾 Auto-save při změně dat
  useEffect(() => {
    // Nespouštěj save když se teprve načítají data
    if (isLoading) return;
    
    // Save jen když má user nějaká data
    if (jobs.length > 0 || pains.length > 0 || gains.length > 0) {
      debouncedSave();
    }
    
    // Cleanup timer při unmount
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [jobs, pains, gains, totalRespondents, hasUserSorted, currentStep, isLoading]);
  
  // 💾 Auto-save při změně mapování
  useEffect(() => {
    if (isLoading) return;
    
    // Save když se změní mapování
    debouncedSave();
  }, [painRelieverMappings, gainCreatorMappings, productMappings, isLoading]);
  
  // 🎯 Auto-select hodnotu po načtení segmentu a values
  useEffect(() => {
    if (isLoading) return;
    if (availableSegments.length === 0 || availableValues.length === 0) return;
    
    const currentSegment = localSelectedSegment || selectedSegment;
    const segmentData = availableSegments.find(s => s.text === currentSegment);
    
    if (segmentData) {
      const isBila = segmentData.color === '#d1d5db' || segmentData.color?.toLowerCase() === 'white';
      
      if (!isBila) {
        const matchingValue = availableValues.find(v => v.color === segmentData.color);
        
        if (matchingValue) {
          setLocalSelectedValue(matchingValue.text);
          if (onValueChange) onValueChange(matchingValue.text);
        }
      }
    }
  }, [availableSegments, availableValues, localSelectedSegment, selectedSegment, isLoading]);

  // Handle segment change
  const handleSegmentChange = (newSegment: string) => {
    setLocalSelectedSegment(newSegment);
    if (onSegmentChange) onSegmentChange(newSegment);
    
    // ✅ DŮLEŽITÉ: NEMAZAT mappings ručně! Načtou se automaticky v loadVPC()
    // které se zavolá v useEffect při změně localSelectedSegment
    
    // Reset sorted state when changing segment
    setHasUserSorted(false);
    
    // ✅ Žádný automatický scroll - uživatel si přečte obsah sám
    
    // 🎨 Inteligentní logika pro hodnoty
    const segmentData = availableSegments.find(s => s.text === newSegment);
    if (segmentData) {
      // ✅ NOVÁ LOGIKA: Každý segment má vlastní barvu
      // Najdi VŠECHNY hodnoty se stejnou barvou
      const matchingValues = availableValues.filter(v => v.color === segmentData.color);
      
      if (matchingValues.length === 1) {
        // Přesně 1 hodnota → automaticky vyber
        setLocalSelectedValue(matchingValues[0].text);
        if (onValueChange) onValueChange(matchingValues[0].text);
      } else if (matchingValues.length > 1) {
        // Více hodnot se stejnou barvou → zobraz dropdown pro výběr
        setLocalSelectedValue('');
      } else {
        // 0 hodnot se stejnou barvou → možná chyba v datech, nech prázdné
        setLocalSelectedValue('');
      }
    }
  };
  
  // Handle value change
  const handleValueChange = (newValue: string) => {
    setLocalSelectedValue(newValue);
    if (onValueChange) onValueChange(newValue);
    setHasUserSorted(false);
    
    // 🔄 Reload VPC data po změně hodnoty (načte správnou Value Map)
    if (newValue) {
      loadVPC();
    }
  };

  // Update count pro konkrétní položku
  const updateItemCount = (category: 'jobs' | 'pains' | 'gains', index: number, count: number) => {
    const setter = category === 'jobs' ? setJobs : category === 'pains' ? setPains : setGains;
    
    // 🎯 Uživatel začal zadávat data - aktivuj prioritní labely
    setHasUserSorted(true);
    
    setter((prevItems) => {
      const newItems = prevItems.map((item, i) => {
        if (i === index) {
          const percentage = totalRespondents > 0 ? Math.round((count / totalRespondents) * 100) : 0;
          return { ...item, count, percentage };
        }
        return item;
      });
      
      // 🔄 Automaticky seřaď podle percentage (nejvyšší nahoře)
      return newItems
        .sort((a, b) => (b.percentage || 0) - (a.percentage || 0))
        .map((item, i) => ({ ...item, priority: i }));
    });
    
    // ✅ Auto-save se spustí automaticky přes useEffect dependency!
  };
  
  // 🗑️ Smazat položku (z UI i DB)
  const deleteItem = async (category: 'jobs' | 'pains' | 'gains', id: string, text: string) => {
    if (!confirm(`Opravdu smazat "${text}"? Tato akce je nevratná.`)) return;
    
    try {
      const segmentToUse = localSelectedSegment || selectedSegment;
      
      // Načti existující záznam
      const { data: existing, error: fetchError } = await supabase
        .from('value_proposition_canvas')
        .select('*')
        .eq('user_id', userId)
        .eq('segment_name', segmentToUse)
        .is('selected_value', null)
        .maybeSingle();
      
      if (fetchError) throw fetchError;
      if (!existing) {
        alert('Záznam nenalezen.');
        return;
      }
      
      // Odstraň položku z JSONB pole
      const fieldName = category; // 'jobs', 'pains', 'gains'
      const existingItems = existing[fieldName] || [];
      const newItems = existingItems.filter((item: any) => {
        const itemText = typeof item === 'string' ? item : item.text;
        return itemText !== text;
      });
      
      // Update v DB
      const { error: updateError } = await supabase
        .from('value_proposition_canvas')
        .update({ [fieldName]: newItems })
        .eq('id', existing.id);
      
      if (updateError) throw updateError;
      
      // Smaž z lokálního state
      const setter = category === 'jobs' ? setJobs : category === 'pains' ? setPains : setGains;
      const currentData = category === 'jobs' ? jobs : category === 'pains' ? pains : gains;
      const newData = currentData.filter(item => item.text !== text);
      
      setter(newData);
      
      // 🔄 Po smazání ulož FIT progress se SPRÁVNÝMI daty OKAMŽITĚ
      // Předej nová data přímo do saveFitProgress místo čekání na state update!
      if (category === 'jobs') {
        await saveFitProgress(newData, pains, gains);
      } else if (category === 'pains') {
        await saveFitProgress(jobs, newData, gains);
      } else {
        await saveFitProgress(jobs, pains, newData);
      }
      
      console.log(`✅ Smazáno: ${text}`);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Chyba při mazání. Zkuste to znovu.');
    }
  };
  
  // ➕ Přidat novou položku (do UI i DB)
  const addItem = async (category: 'jobs' | 'pains' | 'gains', text: string) => {
    if (!text.trim()) return;
    
    try {
      // Určit typ podle kategorie
      const zone = category === 'jobs' ? 'jobs' 
                 : category === 'pains' ? 'pains' 
                 : 'gains';
      
      const type = category === 'jobs' ? 'job' 
                 : category === 'pains' ? 'pain' 
                 : 'gain';
      
      // 🎯 Určit správnou hodnotu podle segmentu
      const currentSegmentData = availableSegments.find(s => s.text === (localSelectedSegment || selectedSegment));
      const isBilySegment = currentSegmentData?.color === '#d1d5db' || currentSegmentData?.color?.toLowerCase() === 'white';
      
      let valueToUse = 'Bílá'; // Default
      
      if (isBilySegment) {
        // Pro bílý segment použij vybranou hodnotu nebo první bílou
        valueToUse = localSelectedValue || availableValues.find(v => v.color === '#d1d5db')?.text || 'Bílá';
      } else if (currentSegmentData) {
        // Pro barevný segment použij hodnotu stejné barvy
        valueToUse = availableValues.find(v => v.color === currentSegmentData.color)?.text || localSelectedValue || 'Bílá';
      }
      
      const segmentToUse = localSelectedSegment || selectedSegment;
      
      if (!segmentToUse) {
        alert('Chyba: Není vybrán žádný segment. Vyberte segment nahoře.');
        return false;
      }
      
      console.log('🔍 Adding item:', { 
        category, 
        text, 
        segment: segmentToUse,
        value: valueToUse,
        userId 
      });
      
      // Přidej do DB - používáme STARÝ SYSTÉM s JSONB arrays
      // Musíme najít existující záznam a update ho
      const { data: existing, error: fetchError } = await supabase
        .from('value_proposition_canvas')
        .select('*')
        .eq('user_id', userId)
        .eq('segment_name', segmentToUse)
        .is('selected_value', null)
        .maybeSingle();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('❌ Fetch error:', fetchError);
        throw fetchError;
      }
      
      // Přidej položku do správného JSONB pole
      const fieldName = category; // 'jobs', 'pains', 'gains'
      const existingItems = existing?.[fieldName] || [];
      
      // ✅ CHECK DUPLICATES!
      const duplicate = existingItems.some((item: any) => {
        const itemText = typeof item === 'string' ? item : item?.text;
        return itemText?.toLowerCase() === text.trim().toLowerCase();
      });
      
      if (duplicate) {
        console.log('❌ DUPLICATE in DB!');
        toast.error('❌ Tato položka již existuje!');
        return false;
      }
      
      const newItems = [...existingItems, { text: text.trim(), color: currentSegmentData?.color || '#d1d5db' }];
      
      if (existing) {
        // Update existující záznam
        const { error: updateError } = await supabase
          .from('value_proposition_canvas')
          .update({ [fieldName]: newItems })
          .eq('id', existing.id);
        
        if (updateError) {
          console.error('❌ Update error:', updateError);
          throw updateError;
        }
      } else {
        // Vytvoř nový záznam
        const { error: insertError } = await supabase
          .from('value_proposition_canvas')
          .insert({
            user_id: userId,
            segment_name: segmentToUse,
            selected_value: null,
            [fieldName]: newItems
          });
        
        if (insertError) {
          console.error('❌ Insert error:', insertError);
          throw insertError;
        }
      }
      
      // Přidej do lokálního state
      const data = { id: `${category}-${Date.now()}`, text: text.trim() };
      const setter = category === 'jobs' ? setJobs : category === 'pains' ? setPains : setGains;
      setter(prev => [...prev, {
        id: data.id,
        text: text.trim(),
        count: 0,
        percentage: 0,
        priority: prev.length
      }]);
      
      console.log(`✅ Přidáno: ${text}`);
      return true;
    } catch (error) {
      console.error('Error adding item:', error);
      alert(`Chyba při přidávání: ${error.message || 'Zkuste to znovu.'}`);
      return false;
    }
  };

  // ✅ ADD VALUE MAP ITEM (Products, Pain Relievers, Gain Creators)
  const addValueMapItem = async (category: 'products' | 'painRelievers' | 'gainCreators', text: string): Promise<boolean> => {
    if (!text.trim()) return false;
    
    try {
      const segmentToUse = localSelectedSegment || selectedSegment;
      const valueToUse = localSelectedValue;
      
      if (!segmentToUse || !valueToUse) {
        toast.error('��️ Vyberte segment a hodnotu!');
        return false;
      }
      
      console.log('🔍 DEBUG START:', {
        segmentToUse,
        valueToUse,
        availableValues,
        availableSegments
      });
      
      // ✅ DŮLEŽITÉ: Normalize color helper
      const colorMap: Record<string, string> = {
        'blue': '#3b82f6',
        'green': '#22c55e',
        'yellow': '#eab308',
        'red': '#ef4444',
        'purple': '#8b5cf6',
        'pink': '#ec4899',
        'orange': '#f59e0b',
        'gray': '#6b7280'
      };
      
      const normalizeColor = (color: string | undefined): string => {
        if (!color) return '#f59e0b';
        if (color.startsWith('#')) return color;
        return colorMap[color.toLowerCase()] || '#f59e0b';
      };
      
      // Get value color (try hodnota, fallback na segment!)
      const valueObj = availableValues.find(v => v.text === valueToUse);
      let valueColor = valueObj?.color;
      
      // ✅ FALLBACK: Pokud hodnota nemá barvu, použij SEGMENT barvu!
      if (!valueColor) {
        console.warn('⚠️ Hodnota nemá barvu, fallback na segment barvu');
        const segmentObj = availableSegments.find(s => s.text === segmentToUse);
        valueColor = segmentObj?.color;
        console.log('🎨 Using SEGMENT color:', valueColor, 'from segment:', segmentToUse);
      }
      
      valueColor = normalizeColor(valueColor);
      
      console.log('🎨 Final color:', valueColor, 'for value:', valueToUse);
      
      // Check duplicates (fix: item může být string nebo object!)
      const existingItems = category === 'products' ? products : category === 'painRelievers' ? painRelievers : gainCreators;
      if (existingItems.some(item => {
        const itemText = typeof item === 'string' ? item : item?.text;
        return itemText?.toLowerCase() === text.trim().toLowerCase();
      })) {
        toast.error('❌ Tato položka již existuje!', {
          description: 'Použijte jiný text nebo upravte existující položku.'
        });
        return false;
      }
      
      // ✅ DŮLEŽITÉ: Formát musí odpovídat VPCValueMapSquare!
      // Ukládáme jako OBJECT s text + color
      const newItemObject = { text: text.trim(), color: valueColor };
      
      // Add to local state (jako OBJECT! ne string)
      const setter = category === 'products' ? setProducts : category === 'painRelievers' ? setPainRelievers : setGainCreators;
      setter(prev => [...prev, newItemObject]);
      
      // Save to DB (jako OBJECT array pro konzistenci s Lekce 2!)
      const fieldName = category === 'products' ? 'products' : category === 'painRelievers' ? 'pain_relievers' : 'gain_creators';
      
      // Načti aktuální data z DB
      const { data: currentData } = await supabase
        .from('value_proposition_canvas')
        .select(fieldName)
        .eq('user_id', userId)
        .eq('segment_name', segmentToUse)
        .eq('selected_value', valueToUse)
        .maybeSingle();
      
      const currentItems = currentData?.[fieldName] || [];
      const newItems = [...currentItems, newItemObject];
      
      const { error } = await supabase
        .from('value_proposition_canvas')
        .update({ [fieldName]: newItems })
        .eq('user_id', userId)
        .eq('segment_name', segmentToUse)
        .eq('selected_value', valueToUse);
      
      if (error) throw error;
      
      console.log(`✅ ${category} přidáno:`, text);
      return true;
    } catch (error) {
      console.error('Error adding value map item:', error);
      // ❌ REMOVED DUPLICATE TOAST - už je v duplicate checku výše!
      // toast.error('❌ Chyba při přidávání!');
      return false;
    }
  };
  
  // ✅ DELETE VALUE MAP ITEM
  const deleteValueMapItem = async (category: 'products' | 'painRelievers' | 'gainCreators', index: number) => {
    try {
      const segmentToUse = localSelectedSegment || selectedSegment;
      const valueToUse = localSelectedValue;
      
      if (!segmentToUse || !valueToUse) return;
      
      // ✅ Normalize color helper
      const colorMap: Record<string, string> = {
        'blue': '#3b82f6',
        'green': '#22c55e',
        'yellow': '#eab308',
        'red': '#ef4444',
        'purple': '#8b5cf6',
        'pink': '#ec4899',
        'orange': '#f59e0b',
        'gray': '#6b7280'
      };
      
      const normalizeColor = (color: string | undefined): string => {
        if (!color) return '#f59e0b';
        if (color.startsWith('#')) return color;
        return colorMap[color.toLowerCase()] || '#f59e0b';
      };
      
      // Get value color (fallback na segment!)
      const valueObj = availableValues.find(v => v.text === valueToUse);
      let valueColor = valueObj?.color;
      
      // ✅ FALLBACK na segment barvu
      if (!valueColor) {
        const segmentObj = availableSegments.find(s => s.text === segmentToUse);
        valueColor = segmentObj?.color;
      }
      
      valueColor = normalizeColor(valueColor);
      
      // Remove from local state (strings)
      const existingItems = category === 'products' ? products : category === 'painRelievers' ? painRelievers : gainCreators;
      const newStringItems = existingItems.filter((_, i) => i !== index);
      const setter = category === 'products' ? setProducts : category === 'painRelievers' ? setPainRelievers : setGainCreators;
      setter(newStringItems);
      
      // Save to DB (as objects!)
      const fieldName = category === 'products' ? 'products' : category === 'painRelievers' ? 'pain_relievers' : 'gain_creators';
      
      // Convert strings to objects for DB
      const newObjectItems = newStringItems.map(text => ({ text, color: valueColor }));
      
      const { error } = await supabase
        .from('value_proposition_canvas')
        .update({ [fieldName]: newObjectItems })
        .eq('user_id', userId)
        .eq('segment_name', segmentToUse)
        .eq('selected_value', valueToUse);
      
      if (error) throw error;
      
      console.log(`✅ ${category} smazáno na indexu:`, index);
    } catch (error) {
      console.error('Error deleting value map item:', error);
      toast.error('❌ Chyba při mazání!');
    }
  };

  // Move item up/down (deprecated - používáme číselné hodnocení)
  const moveItem = (category: 'jobs' | 'pains' | 'gains', index: number, direction: 'up' | 'down') => {
    const setter = category === 'jobs' ? setJobs : category === 'pains' ? setPains : setGains;
    const items = category === 'jobs' ? jobs : category === 'pains' ? pains : gains;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    
    // 🎯 Uživatel začal seřazovat - aktivuj prioritní labely
    setHasUserSorted(true);
    
    setter((prevItems) => {
      const newItems = [...prevItems];
      const temp = newItems[index];
      newItems[index] = newItems[newIndex];
      newItems[newIndex] = temp;
      
      // Update priorities
      return newItems.map((item, i) => ({
        ...item,
        priority: i
      }));
    });
  };

  // Get top 3 items - JEN PRIORITIZOVANÉ (percentage > 0)
  const getTopItems = (items: VPCItem[], category: string = '') => {
    // ✅ DŮLEŽITÉ: Nejdřív filtruj, pak SEŘAĎ podle %!
    const validItems = items
      .filter(item => (item.percentage || 0) > 0)
      .sort((a, b) => (b.percentage || 0) - (a.percentage || 0)); // Nejvyšší první
    
    if (validItems.length === 0) return [];
    if (validItems.length <= 3) {
      return validItems;
    }
    
    // 🎯 SPECIÁLNÍ PŘÍPAD: Když mají VŠECHNY stejné % (např. všechny 10%)
    const firstPercentage = validItems[0]?.percentage || 0;
    const allSame = validItems.every(item => item.percentage === firstPercentage);
    
    if (allSame) {
      // Když jsou všechny stejné, zobraz všechny (neděláme umělé "top 3")
      return validItems;
    }
    
    // ✅ Vezmi PŘESNĚ prvních 3 (žádné tie breakery!)
    const top3 = validItems.slice(0, 3);
    return top3;
  };

  // ✅ REACTIVE FIT SCORE - přepočítá se když se změní mappings!
  const fitScoreData = useMemo(() => {
    // Calculate top items
    const topJobs = getTopItems(jobs);
    const topPains = getTopItems(pains);
    const topGains = getTopItems(gains);
    
    const hasValidData = topJobs.length > 0 || topPains.length > 0 || topGains.length > 0;
    
    // ✅ KONTROLA: Máme vůbec nějaká řešení?
    const hasAnySolutions = painRelievers.length > 0 || gainCreators.length > 0 || products.length > 0;
    
    let fitScore = 0;
    let coveredPainsCount = 0;
    let coveredGainsCount = 0;
    let coveredJobsCount = 0;
    
    if (hasValidData && hasAnySolutions) {
      // Pains: Zjisti unique pain IDs z mappingů
      const coveredPainIds = new Set<string>();
      Object.values(painRelieverMappings).forEach(painIds => {
        painIds.forEach(id => coveredPainIds.add(id));
      });
      coveredPainsCount = topPains.filter(p => coveredPainIds.has(p.id)).length;
      
      // Gains: Zjisti unique gain IDs z mappingů
      const coveredGainIds = new Set<string>();
      Object.values(gainCreatorMappings).forEach(gainIds => {
        gainIds.forEach(id => coveredGainIds.add(id));
      });
      coveredGainsCount = topGains.filter(g => coveredGainIds.has(g.id)).length;
      
      // Jobs: Zjisti unique job IDs z mappingů
      const coveredJobIds = new Set<string>();
      Object.values(productMappings).forEach(jobIds => {
        jobIds.forEach(id => coveredJobIds.add(id));
      });
      coveredJobsCount = topJobs.filter(j => coveredJobIds.has(j.id)).length;
      
      // Výpočet FIT Score podle % pokrytí
      // ⚠️ DŮLEŽITÉ: Pokud kategorie NEMÁ items, tak se PŘESKOČÍ (nezapočítá se do score)
      // Pokud má items ale NEMÁ mappings, tak se započítá jako 0%
      let totalWeight = 0;
      let achievedScore = 0;
      
      if (topPains.length > 0) {
        totalWeight += 40;
        achievedScore += (coveredPainsCount / topPains.length) * 40;
      }
      if (topGains.length > 0) {
        totalWeight += 40;
        achievedScore += (coveredGainsCount / topGains.length) * 40;
      }
      if (topJobs.length > 0) {
        totalWeight += 20;
        achievedScore += (coveredJobsCount / topJobs.length) * 20;
      }
      
      // Normalizuj score na 100%
      fitScore = totalWeight > 0 ? Math.round((achievedScore / totalWeight) * 100) : 0;
      
      console.log('🔍 FIT Score calc:', {
        totalWeight,
        achievedScore,
        normalizedScore: totalWeight > 0 ? (achievedScore / totalWeight) * 100 : 0,
        hasAnySolutions: `painRelievers: ${painRelievers.length}, gainCreators: ${gainCreators.length}, products: ${products.length}`,
        topPains: topPains.map(p => ({ id: p.id, text: p.text.substring(0, 30) })),
        topGains: topGains.map(g => ({ id: g.id, text: g.text.substring(0, 30) })),
        topJobs: topJobs.map(j => ({ id: j.id, text: j.text.substring(0, 30) })),
        painRelieverMappings,
        gainCreatorMappings,
        productMappings,
        coveredPainIds: Array.from(coveredPainIds),
        coveredGainIds: Array.from(coveredGainIds),
        coveredJobIds: Array.from(coveredJobIds),
        coveredPainsCount,
        coveredGainsCount,
        coveredJobsCount,
        fitScore
      });
      
      // 🔍 Detail mapping pro každý pain
      topPains.forEach(pain => {
        const isCovered = coveredPainIds.has(pain.id);
        const coveredBy = Object.entries(painRelieverMappings)
          .filter(([_, painIds]) => painIds.includes(pain.id))
          .map(([reliever]) => reliever);
        
        console.log(`${isCovered ? '✅' : '❌'} Pain "${pain.text.substring(0, 30)}" pokryt: ${isCovered ? coveredBy.join(', ') : 'NEPOKRYT!'}`);
      });
    }
    
    return {
      topJobs,
      topPains,
      topGains,
      fitScore,
      coveredPainsCount,
      coveredGainsCount,
      coveredJobsCount,
      hasFit: fitScore >= 70,
      hasValidData
    };
  }, [jobs, pains, gains, painRelieverMappings, gainCreatorMappings, productMappings]);
  
  // Destructure pro použití v UI
  const { 
    topJobs, 
    topPains, 
    topGains, 
    fitScore, 
    coveredPainsCount, 
    coveredGainsCount, 
    coveredJobsCount,
    hasFit,
    hasValidData
  } = fitScoreData;
  
  // 🎉 ACHIEVEMENT: FIT Score milestones - POSTUPNĚ všechny dosažené levely!
  useEffect(() => {
    if (!isLoading && fitScore > 0 && onAchievementUnlocked) {
      // ✅ Použij samostatné IF bloky aby se spustily VŠECHNY dosažené levely!
      if (fitScore >= 70) {
        console.log('🎯 FIT Score 70%+ reached! Triggering achievement...');
        onAchievementUnlocked('fit-70-percent');
      }
      if (fitScore >= 80) {
        console.log('🎯 FIT Score 80%+ reached! Triggering achievement...');
        onAchievementUnlocked('product-fit-master');
      }
      if (fitScore >= 90) {
        console.log('🎯 FIT Score 90%+ reached! Triggering achievement...');
        onAchievementUnlocked('fit-90-percent');
      }
      if (fitScore >= 100) {
        console.log('🎯 FIT Score 100%! PERFEKTNÍ FIT! Triggering achievement...');
        onAchievementUnlocked('product-fit-master');
      }
    }
  }, [fitScore, isLoading, onAchievementUnlocked]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center">
        <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Načítám vaše VPC data...</p>
      </div>
    );
  }

  // Check jestli je segment bílý
  const currentSegmentData = availableSegments.find(s => s.text === (selectedSegment || localSelectedSegment));
  const isBilySegment = currentSegmentData?.color === '#d1d5db' || currentSegmentData?.color?.toLowerCase() === 'white';

  // Step Indicator Component - VYLEPŠENÝ DESIGN podle mobile verze
  const StepIndicator = ({ number, title, isActive, isComplete }: { number: number; title: string; isActive: boolean; isComplete: boolean }) => {
    if (isLessonCompleted) {
      isComplete = false;
    }
    
    return (
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-md ${
          isComplete ? 'bg-green-500 text-white ring-2 sm:ring-4 ring-green-100' : 
          isActive ? 'bg-blue-600 text-white ring-2 sm:ring-4 ring-blue-100 scale-110' : 
          'bg-gray-200 text-gray-500'
        }`}>
          {isComplete ? (
            <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
          ) : (
            <span className="text-sm sm:text-base">{number}</span>
          )}
        </div>
        <span className={`text-[10px] sm:text-xs font-medium text-center leading-tight ${isActive ? 'text-blue-700' : 'text-gray-600'}`}>
          {title}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Segment/Value Selector */}
      {availableSegments.length > 0 && (
        <div className="mb-4 sm:mb-6 bg-white rounded-lg sm:rounded-xl border-2 border-blue-200 p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-start md:items-center">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📊 Validuji segment:
              </label>
              <select
                value={selectedSegment || localSelectedSegment}
                onChange={(e) => handleSegmentChange(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                {availableSegments.map((seg) => (
                  <option key={seg.text} value={seg.text}>
                    {seg.text}
                  </option>
                ))}
              </select>
            </div>
            
            {isBilySegment && availableValues.length > 0 && (
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  💎 Pro hodnotu:
                </label>
                <select
                  value={localSelectedValue}
                  onChange={(e) => handleValueChange(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">-- Vyberte hodnotu --</option>
                  {availableValues
                    .filter(v => v.color === '#d1d5db' || v.color.toLowerCase() === 'white')
                    .map((val) => (
                      <option key={val.text} value={val.text}>
                        {val.text}
                      </option>
                    ))}
                </select>
              </div>
            )}
            
            {!isBilySegment && currentSegmentData && (() => {
              // Najdi všechny hodnoty se stejnou barvou jako segment
              const matchingValues = availableValues.filter(v => v.color === currentSegmentData.color);
              
              return (
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    💎 Hodnota {matchingValues.length > 1 ? '(vyberte)' : '(automaticky)'}:
                  </label>
                  {matchingValues.length > 1 ? (
                    <select
                      value={localSelectedValue}
                      onChange={(e) => handleValueChange(e.target.value)}
                      className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      style={{ borderColor: currentSegmentData.color }}
                    >
                      {matchingValues.map((val) => (
                        <option key={val.text} value={val.text}>
                          {val.text}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div 
                      className="w-full px-4 py-2 border-2 rounded-lg bg-gray-50 flex items-center gap-2"
                      style={{ borderColor: currentSegmentData.color }}
                    >
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: currentSegmentData.color }}
                      />
                      <span className="text-gray-700">
                        {localSelectedValue || matchingValues[0]?.text || '-- Vyberte hodnotu --'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
      
      {/* 🎯 GLOBAL STICKY BAR - VYLEPŠENÝ DESIGN */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-white to-gray-50 border-b-2 border-gray-200 shadow-lg py-4 sm:py-5 mb-4 sm:mb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Progress Steps - MODERNĚJŠÍ DESIGN */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <StepIndicator 
              number={1} 
              title="Průzkum" 
              isActive={currentStep === 1}
              isComplete={currentStep > 1}
            />
            <div className={`flex-1 max-w-[60px] sm:max-w-[80px] h-1 rounded-full transition-all ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <StepIndicator 
              number={2} 
              title="Prioritizace" 
              isActive={currentStep === 2}
              isComplete={currentStep > 2}
            />
            <div className={`flex-1 max-w-[60px] sm:max-w-[80px] h-1 rounded-full transition-all ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <StepIndicator 
              number={3} 
              title="FIT Score" 
              isActive={currentStep === 3}
              isComplete={false}
            />
          </div>
        
          {/* Segment & Value selectors - PĚKNĚJŠÍ BOXÍKY */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
              <span className="text-blue-700 font-medium">Segment:</span>
              <div className="text-blue-900 font-bold truncate max-w-[150px] sm:max-w-none">{localSelectedSegment || selectedSegment}</div>
            </div>
            {localSelectedValue && (
              <>
                <span className="text-gray-400 hidden sm:inline">→</span>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                  <span className="text-green-700 font-medium">Hodnota:</span>
                  <div className="text-green-900 font-bold truncate max-w-[150px] sm:max-w-none">{localSelectedValue}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        {/* STEP 1: DISCOVERY */}
        {currentStep === 1 && (
          <div
            className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            {/* Kompaktní header + collapsible help - Responzivní */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between">
              <div className="flex-1">
                <h2 className="text-lg sm:text-2xl font-bold mb-1">{guide.title}</h2>
                <p className="text-sm sm:text-base text-white/90">{guide.description}</p>
              </div>
              
              <button
                onClick={() => {
                  const helpEl = document.getElementById('step1-help');
                  if (helpEl) {
                    helpEl.classList.toggle('hidden');
                  }
                }}
                className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm sm:text-base self-end sm:self-auto sm:ml-4"
              >
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Help</span>
              </button>
            </div>
            
            {/* ℹ️ Collapsible Help */}
            <div id="step1-help" className="hidden">
              <FitStepInstructions step={1} />
            </div>

            {/* Methodology - Responzivní */}
            <div className="bg-white rounded-lg sm:rounded-xl border-2 border-gray-200 p-4 sm:p-8">
              <h3 className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">
                🔍 Jak zjistit co je pro {selectedSegment || 'váš segment'} kritické?
              </h3>
              
              <div className="mb-4 sm:mb-6 bg-blue-50 border-2 border-blue-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-900">
                    <strong>Důležité:</strong> Nemůžete jen hádat co zákazník potřebuje. 
                    Musíte to ZJISTIT - ptát se, pozorovat, analyzovat!
                  </p>
                </div>
              </div>

              {/* DESKTOP: Grid (md+) */}
              <div className="hidden md:grid md:grid-cols-3 gap-6">
                {/* Jobs Discovery */}
                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300">
                  <h4 className="mb-3 text-yellow-900 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Cíle/Důvody
                  </h4>
                  <div className="space-y-3 mb-4">
                    <p className="font-bold text-yellow-800">Otázky k položení:</p>
                    {guide.questions.jobs.map((q, i) => (
                      <p key={i} className="text-yellow-900">• {q}</p>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-yellow-800">Příklady odpovědí:</p>
                    {guide.examples.jobs.map((ex, i) => (
                      <div key={i} className="bg-white p-3 pl-4 rounded-lg border-l-4 border-yellow-400 shadow-sm">
                        <p className="text-yellow-800 leading-relaxed">
                          "{ex}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pains Discovery */}
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
                  <h4 className="mb-3 text-red-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Obavy/Problémy
                  </h4>
                  <div className="space-y-3 mb-4">
                    <p className="font-bold text-red-800">Otázky k položení:</p>
                    {guide.questions.pains.map((q, i) => (
                      <p key={i} className="text-red-900">• {q}</p>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-red-800">Příklady odpovědí:</p>
                    {guide.examples.pains.map((ex, i) => (
                      <div key={i} className="bg-white p-3 pl-4 rounded-lg border-l-4 border-red-400 shadow-sm">
                        <p className="text-red-800 leading-relaxed">
                          "{ex}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gains Discovery */}
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-300">
                  <h4 className="mb-3 text-green-900 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Očekávání/Touhy
                  </h4>
                  <div className="space-y-3 mb-4">
                    <p className="font-bold text-green-800">Otázky k položení:</p>
                    {guide.questions.gains.map((q, i) => (
                      <p key={i} className="text-green-900">• {q}</p>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-green-800">Příklady odpovědí:</p>
                    {guide.examples.gains.map((ex, i) => (
                      <div key={i} className="bg-white p-3 pl-4 rounded-lg border-l-4 border-green-400 shadow-sm">
                        <p className="text-green-800 leading-relaxed">
                          "{ex}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MOBILE: Accordion (sm only) */}
              <Accordion type="single" collapsible className="md:hidden space-y-3">
                {/* Jobs Accordion */}
                <AccordionItem value="jobs" className="bg-yellow-50 border-2 border-yellow-300 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-2 text-yellow-900">
                      <Target className="w-5 h-5" />
                      <span className="font-bold">Cíle/Důvody</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3 mb-4">
                      <p className="font-bold text-yellow-800">Otázky k položení:</p>
                      {guide.questions.jobs.map((q, i) => (
                        <p key={i} className="text-sm text-yellow-900">• {q}</p>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-yellow-800">Příklady odpovědí:</p>
                      {guide.examples.jobs.map((ex, i) => (
                        <div key={i} className="bg-white p-3 pl-4 rounded-lg border-l-4 border-yellow-400 shadow-sm">
                          <p className="text-sm text-yellow-800 leading-relaxed">
                            "{ex}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Pains Accordion */}
                <AccordionItem value="pains" className="bg-red-50 border-2 border-red-300 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-2 text-red-900">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-bold">Obavy/Problémy</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3 mb-4">
                      <p className="font-bold text-red-800">Otázky k položení:</p>
                      {guide.questions.pains.map((q, i) => (
                        <p key={i} className="text-sm text-red-900">• {q}</p>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-red-800">Příklady odpovědí:</p>
                      {guide.examples.pains.map((ex, i) => (
                        <div key={i} className="bg-white p-3 pl-4 rounded-lg border-l-4 border-red-400 shadow-sm">
                          <p className="text-sm text-red-800 leading-relaxed">
                            "{ex}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Gains Accordion */}
                <AccordionItem value="gains" className="bg-green-50 border-2 border-green-300 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-2 text-green-900">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-bold">Očekávání/Touhy</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3 mb-4">
                      <p className="font-bold text-green-800">Otázky k položení:</p>
                      {guide.questions.gains.map((q, i) => (
                        <p key={i} className="text-sm text-green-900">• {q}</p>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-green-800">Příklady odpovědí:</p>
                      {guide.examples.gains.map((ex, i) => (
                        <div key={i} className="bg-white p-3 pl-4 rounded-lg border-l-4 border-green-400 shadow-sm">
                          <p className="text-sm text-green-800 leading-relaxed">
                            "{ex}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Action Steps */}
              <div className="mt-6 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-xl">
                <h4 className="mb-3 text-purple-900">💪 Vaše akce PŘED pokračováním:</h4>
                <ol className="space-y-2 text-purple-800">
                  <li><strong>1.</strong> Projděte si výše uvedené otázky</li>
                  <li><strong>2.</strong> Zeptejte se alespoň 3-5 lidí z vašeho segmentu</li>
                  <li><strong>3.</strong> Analyzujte jejich odpovědi a najděte vzorce</li>
                  <li><strong>4.</strong> Až budete mít jasno, pokračujte k prioritizaci!</li>
                </ol>
              </div>

              {/* Status vašich dat - Responzivní */}
              <div className="mt-4 sm:mt-6 bg-blue-50 border-2 border-blue-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h4 className="mb-3 sm:mb-4 text-sm sm:text-base text-blue-900">📊 Vaše současná data z Lekce 1:</h4>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="text-center">
                    <div className={`text-2xl sm:text-3xl font-bold mb-1 ${jobs.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      {jobs.length}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Jobs</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl sm:text-3xl font-bold mb-1 ${pains.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      {pains.length}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Pains</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl sm:text-3xl font-bold mb-1 ${gains.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      {gains.length}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Gains</p>
                  </div>
                </div>
                
                {(jobs.length > 0 || pains.length > 0 || gains.length > 0) && (
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-900 font-bold mb-2">
                      ✅ Máte data k prioritizaci!
                    </p>
                    <p className="text-blue-700">
                      V další fázi je seřadíte podle důležitosti - které problémy/touhy segment řeší NEJČASTĚJI 
                      nebo považuje za NEJDŮLEŽITĚJŠÍ podle vašeho průzkumu z Kroku 1.
                    </p>
                  </div>
                )}
                {jobs.length === 0 && pains.length === 0 && gains.length === 0 && (
                  <p className="text-sm text-amber-700 mt-3 text-center">
                    ⚠️ Přejděte do Lekce 1 (Zákaznický profil) a vyplňte alespoň některé položky.
                  </p>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col items-end gap-3">
              {(jobs.length === 0 || pains.length === 0 || gains.length === 0) && (
                <Alert className="bg-amber-50 border-amber-200">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>⚠️ Chybí data:</strong> Musíte vyplnit <strong>VŠECHNY TŘI kategorie</strong>: Jobs, Pains a Gains v Lekci 1 (Zákaznický profil).
                    Bez kompletních dat nemůžete pokračovat k prioritizaci.
                  </AlertDescription>
                </Alert>
              )}
              <Button
                size="lg"
                onClick={() => {
                  setCurrentStep(2);
                  saveFitProgress();
                }}
                className="gap-2"
                disabled={jobs.length === 0 || pains.length === 0 || gains.length === 0}
              >
                Pokračovat k prioritizaci
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: PRIORITIZATION */}
        {currentStep === 2 && (
          <div
            className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            {/* Kompaktní header s controls - Responzivní */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">🎯 Prioritizace</h2>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {step2View === 'customer' 
                        ? 'Označte kolik lidí každou položku zmiňovalo'
                        : 'Zkontrolujte co nabízíte'}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    const helpEl = document.getElementById('step2-help');
                    if (helpEl) {
                      helpEl.classList.toggle('hidden');
                    }
                  }}
                  className="px-3 sm:px-4 py-2 bg-white/80 hover:bg-white text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm sm:text-base self-end sm:self-auto"
                >
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Help</span>
                </button>
              </div>
              
              {/* Controls - Stack na mobilu */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => setStep2View('customer')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      step2View === 'customer'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    👥 Zákaznický profil
                  </button>
                  <button
                    onClick={() => setStep2View('value')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      step2View === 'value'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    💎 Hodnotová mapa
                  </button>
                </div>
                
                {step2View === 'customer' && (
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                    <label className="text-sm font-medium text-gray-700">
                      📊 Počet lidí:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={totalRespondents}
                      onChange={(e) => setTotalRespondents(parseInt(e.target.value) || 10)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded bg-white text-gray-900 font-bold text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* ℹ️ Collapsible Help */}
            <div id="step2-help" className="hidden">
              <FitStepInstructions step={2} />
            </div>

            {/* DYNAMICKÉ BOXY podle step2View */}
            {step2View === 'customer' ? (
              <>
                {(() => {
                // ✅ Zjisti jestli mají alespoň jednu položku s count > 0
                const hasAnyPrioritized = jobs.some(j => (j.count || 0) > 0) || 
                                         pains.some(p => (p.count || 0) > 0) || 
                                         gains.some(g => (g.count || 0) > 0);
                
                if (!hasAnyPrioritized) {
                  // Ještě nezačali hodnotit
                  return (
                    <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-6">
                      <div className="flex gap-4">
                        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="font-bold text-amber-900 mb-1">👉 Začněte hodnotit!</p>
                            <p className="text-sm text-amber-700">
                              Pro každou položku níže zadejte kolik lidí to zmiňovalo. Automaticky se seřadí podle četnosti.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  // Už začali hodnotit - ukaz zelený banner
                  return (
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                      <div className="flex gap-4">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="font-bold text-green-900 mb-1">✅ Skvělé!</p>
                            <p className="text-sm text-green-700">
                              Položky s nejvyšším % se automaticky označí hvězdičkou ⭐ jako TOP priority a budete je validovat v dalším kroku.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })()}

                {/* INFO: Jak funguje mazání - JEN POKUD UŽ ZAČALI HODNOTIT */}
                {(() => {
                  const hasAnyPrioritized = jobs.some(j => (j.count || 0) > 0) || 
                                           pains.some(p => (p.count || 0) > 0) || 
                                           gains.some(g => (g.count || 0) > 0);
                  
                  if (hasAnyPrioritized) {
                    return (
                      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 text-blue-800">
                        <p className="mb-1">💡 Jak upravovat/mazat položky:</p>
                        <ul className="space-y-1 ml-4 list-disc">
                          <li>Snižte počet lidí na <strong>0</strong> → objeví se koš 🗑️</li>
                          <li>Klikněte na koš pro smazání</li>
                          <li>Položky s hvězdičkou ⭐ jsou TOP priority (nejvyšší %)</li>
                        </ul>
                      </div>
                    );
                  }
                  return null;
                })()}
              </>
            ) : null}

            {/* Prioritization Grids - DESKTOP */}
            {step2View === 'customer' && (
            <div className="max-w-5xl mx-auto">
              <div className="hidden md:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {/* Jobs - ✅ ALWAYS SHOW! */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Target className="w-5 h-5 text-yellow-600" />
                      Cíle
                    </h3>
                    <div className="text-xs text-gray-500 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <span>Kolik lidí (z {totalRespondents}) toto zmiňovalo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {jobs.map((job, index) => (
                      <PriorityItemWithScore
                        key={job.id}
                        text={job.text}
                        index={index}
                        total={jobs.length}
                        totalRespondents={totalRespondents}
                        count={job.count || 0}
                        percentage={job.percentage || 0}
                        color="yellow"
                        onUpdateCount={(count) => updateItemCount('jobs', index, count)}
                        onDelete={() => deleteItem('jobs', job.id, job.text)}
                        showPriorities={hasUserSorted}
                        allItems={jobs}
                      />
                    ))}
                    
                    {/* ➕ Add new Job */}
                    <AddItemInput
                      category="jobs"
                      placeholder="Přidat nový cíl..."
                      onAdd={(text) => addItem('jobs', text)}
                      color="yellow"
                    />
                  </div>
                </div>

              {/* Pains - ✅ ALWAYS SHOW! */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      Obavy
                    </h3>
                    <div className="text-xs text-gray-500 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <span>Kolik lidí (z {totalRespondents}) toto zmiňovalo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {pains.map((pain, index) => (
                      <PriorityItemWithScore
                        key={pain.id}
                        text={pain.text}
                        index={index}
                        total={pains.length}
                        totalRespondents={totalRespondents}
                        count={pain.count || 0}
                        percentage={pain.percentage || 0}
                        color="red"
                        onUpdateCount={(count) => updateItemCount('pains', index, count)}
                        onDelete={() => deleteItem('pains', pain.id, pain.text)}
                        showPriorities={hasUserSorted}
                        allItems={pains}
                      />
                    ))}
                    
                    {/* ➕ Add new Pain */}
                    <AddItemInput
                      category="pains"
                      placeholder="Přidat novou obavu..."
                      onAdd={(text) => addItem('pains', text)}
                      color="red"
                    />
                  </div>
                </div>

              {/* Gains - ✅ ALWAYS SHOW! */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Star className="w-5 h-5 text-green-600" />
                      Očekávání
                    </h3>
                    <div className="text-xs text-gray-500 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <span>Kolik lidí (z {totalRespondents}) toto zmiňovalo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {gains.length === 0 ? (
                      <p className="text-center text-gray-400 py-8">Žádná očekávání</p>
                    ) : (
                      gains.map((gain, index) => (
                      <PriorityItemWithScore
                        key={gain.id}
                        text={gain.text}
                        index={index}
                        total={gains.length}
                        totalRespondents={totalRespondents}
                        count={gain.count || 0}
                        percentage={gain.percentage || 0}
                        color="green"
                        onUpdateCount={(count) => updateItemCount('gains', index, count)}
                        onDelete={() => deleteItem('gains', gain.id, gain.text)}
                        showPriorities={hasUserSorted}
                        allItems={gains}
                      />
                      ))
                    )}
                    
                    {/* ➕ Add new Gain */}
                    <AddItemInput
                      category="gains"
                      placeholder="Přidat nové očekávání..."
                      onAdd={(text) => addItem('gains', text)}
                      color="green"
                    />
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* MOBILE: Accordion pro Jobs/Pains/Gains */}
            {step2View === 'customer' && (
              <Accordion type="single" collapsible className="md:hidden space-y-3">
                {/* Jobs Accordion */}
                <AccordionItem value="jobs" className="bg-yellow-50 border-2 border-yellow-300 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-yellow-600" />
                        <span className="font-bold text-yellow-900">Cíle</span>
                      </div>
                      <span className="text-xs text-yellow-700 bg-yellow-200 px-2 py-1 rounded">
                        {jobs.length} položek
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="text-xs text-gray-600 mb-3">
                      Kolik lidí (z {totalRespondents}) toto zmiňovalo
                    </div>
                    <div className="space-y-3">
                      {jobs.map((job, index) => (
                        <PriorityItemWithScore
                          key={job.id}
                          text={job.text}
                          index={index}
                          total={jobs.length}
                          totalRespondents={totalRespondents}
                          count={job.count || 0}
                          percentage={job.percentage || 0}
                          color="yellow"
                          onUpdateCount={(count) => updateItemCount('jobs', index, count)}
                          onDelete={() => deleteItem('jobs', job.id, job.text)}
                          showPriorities={hasUserSorted}
                          allItems={jobs}
                        />
                      ))}
                      <AddItemInput
                        category="jobs"
                        placeholder="Přidat nový cíl..."
                        onAdd={(text) => addItem('jobs', text)}
                        color="yellow"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Pains Accordion */}
                <AccordionItem value="pains" className="bg-red-50 border-2 border-red-300 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="font-bold text-red-900">Obavy</span>
                      </div>
                      <span className="text-xs text-red-700 bg-red-200 px-2 py-1 rounded">
                        {pains.length} položek
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="text-xs text-gray-600 mb-3">
                      Kolik lidí (z {totalRespondents}) toto zmiňovalo
                    </div>
                    <div className="space-y-3">
                      {pains.map((pain, index) => (
                        <PriorityItemWithScore
                          key={pain.id}
                          text={pain.text}
                          index={index}
                          total={pains.length}
                          totalRespondents={totalRespondents}
                          count={pain.count || 0}
                          percentage={pain.percentage || 0}
                          color="red"
                          onUpdateCount={(count) => updateItemCount('pains', index, count)}
                          onDelete={() => deleteItem('pains', pain.id, pain.text)}
                          showPriorities={hasUserSorted}
                          allItems={pains}
                        />
                      ))}
                      <AddItemInput
                        category="pains"
                        placeholder="Přidat novou obavu..."
                        onAdd={(text) => addItem('pains', text)}
                        color="red"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Gains Accordion */}
                <AccordionItem value="gains" className="bg-green-50 border-2 border-green-300 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-green-900">Očekávání</span>
                      </div>
                      <span className="text-xs text-green-700 bg-green-200 px-2 py-1 rounded">
                        {gains.length} položek
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="text-xs text-gray-600 mb-3">
                      Kolik lidí (z {totalRespondents}) toto zmiňovalo
                    </div>
                    <div className="space-y-3">
                      {gains.map((gain, index) => (
                        <PriorityItemWithScore
                          key={gain.id}
                          text={gain.text}
                          index={index}
                          total={gains.length}
                          totalRespondents={totalRespondents}
                          count={gain.count || 0}
                          percentage={gain.percentage || 0}
                          color="green"
                          onUpdateCount={(count) => updateItemCount('gains', index, count)}
                          onDelete={() => deleteItem('gains', gain.id, gain.text)}
                          showPriorities={hasUserSorted}
                          allItems={gains}
                        />
                      ))}
                      <AddItemInput
                        category="gains"
                        placeholder="Přidat nové očekávání..."
                        onAdd={(text) => addItem('gains', text)}
                        color="green"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Value Map Grids - EDITOVATELNÉ! */}
            {step2View === 'value' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Přidávejte, upravujte nebo mažte položky přímo zde, nebo <button 
                    onClick={() => onNavigateToLesson && onNavigateToLesson(15)}
                    className="text-blue-600 hover:text-blue-700 underline font-semibold"
                  >
                    přejděte do Lekce 15 (Hodnotová mapa)
                  </button> pro detailnější editaci.
                </p>
              </div>
              
              <div className="max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {/* Products - EDITOVATELNÉ */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      📦 Produkty/Služby
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Co konkrétně nabízíte?</p>
                  <div className="space-y-2">
                    {products.map((product, idx) => {
                      // ✅ FIX: product může být string nebo object!
                      const productText = typeof product === 'string' ? product : product?.text || '';
                      return (
                      <div key={idx} className="group relative flex items-start gap-2 p-2 bg-orange-50 border border-orange-200 rounded transition-colors hover:bg-orange-100">
                        <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 flex-1">{productText}</span>
                        <button
                          onClick={() => deleteValueMapItem('products', idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                          title="Smazat"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      );
                    })}
                    
                    {/* ➕ Add new Product */}
                    <AddItemInput
                      category="products"
                      placeholder="Přidat produkt/službu..."
                      onAdd={(text) => addValueMapItem('products', text)}
                      color="yellow"
                    />
                  </div>
                </div>

                {/* Pain Relievers - EDITOVATELNÉ */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      💊 Řešení obtíží
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Jak řešíte problémy zákazníka?</p>
                  <div className="space-y-2">
                    {painRelievers.map((reliever, idx) => {
                      // ✅ FIX: reliever může být string nebo object!
                      const relieverText = typeof reliever === 'string' ? reliever : reliever?.text || '';
                      return (
                      <div key={idx} className="group relative flex items-start gap-2 p-2 bg-purple-50 border border-purple-200 rounded transition-colors hover:bg-purple-100">
                        <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 flex-1">{relieverText}</span>
                        <button
                          onClick={() => deleteValueMapItem('painRelievers', idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                          title="Smazat"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      );
                    })}
                    
                    {/* ➕ Add new Pain Reliever */}
                    <AddItemInput
                      category="painRelievers"
                      placeholder="Přidat řešení obtíží..."
                      onAdd={(text) => addValueMapItem('painRelievers', text)}
                      color="red"
                    />
                  </div>
                </div>

                {/* Gain Creators - EDITOVATELNÉ */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      ✨ Tvorba přínosů
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Jak vytváříte hodnotu?</p>
                  <div className="space-y-2">
                    {gainCreators.map((creator, idx) => {
                      // ✅ FIX: creator může být string nebo object!
                      const creatorText = typeof creator === 'string' ? creator : creator?.text || '';
                      return (
                      <div key={idx} className="group relative flex items-start gap-2 p-2 bg-green-50 border border-green-200 rounded transition-colors hover:bg-green-100">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 flex-1">{creatorText}</span>
                        <button
                          onClick={() => deleteValueMapItem('gainCreators', idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                          title="Smazat"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      );
                    })}
                    
                    {/* ➕ Add new Gain Creator */}
                    <AddItemInput
                      category="gainCreators"
                      placeholder="Přidat tvorbu přínosů..."
                      onAdd={(text) => addValueMapItem('gainCreators', text)}
                      color="green"
                    />
                  </div>
                </div>
              </div>
              </div>
            </div>
            )}

            {/* Navigation */}
            <div ref={navigationRef} className="flex flex-col gap-3">
              {/* Upozornění pokud nemají nic prioritizováno */}
              {(() => {
                const hasAnyData = jobs.length > 0 || pains.length > 0 || gains.length > 0;
                const hasAnyPrioritized = topJobs.length > 0 || topPains.length > 0 || topGains.length > 0;
                
                if (!hasAnyData) {
                  // Nemají vůbec žádná data
                  return (
                    <Alert className="bg-amber-50 border-amber-200">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>⚠️ Chybí data:</strong> Vraťte se do Lekce 1 (Zákaznický profil) a vyplňte Jobs, Pains a Gains.
                      </AlertDescription>
                    </Alert>
                  );
                } else if (!hasAnyPrioritized) {
                  // Mají data, ale nemají prioritizaci (count = 0)
                  return (
                    <Alert className="bg-amber-50 border-amber-200">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>👆 Začněte s prioritizací:</strong> Ve Kroku 2 výše přepněte na "Zákaznický profil" a zadejte kolik lidí jednotlivé položky zmiňovalo.
                      </AlertDescription>
                    </Alert>
                  );
                }
                return null;
              })()}
              
              {/* ��� ODSTRANĚNO - pasé protože můžou editovat na Kroku 2 přímo */}
              
              {/* Varování pokud chybí Value Map data */}
              {(products.length === 0 || painRelievers.length === 0 || gainCreators.length === 0) && (
                <Alert className="bg-amber-50 border-amber-200">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="space-y-3">
                    <div>
                      <strong>⚠️ Chybí hodnotová mapa:</strong> Musíte vyplnit <strong>VŠECHNY TŘI kategorie</strong>: Produkty/Služby, Řešení obtíží a Tvorba přínosů.
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <p className="text-sm text-amber-700">
                        Můžete přidat položky přímo v Kroku 2 výše (přepněte na "Hodnotová mapa"), nebo:
                      </p>
                      {onNavigateToLesson && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onNavigateToLesson(15)}
                          className="gap-2 border-amber-300 hover:bg-amber-100 self-start"
                        >
                          <ArrowRight className="w-4 h-4" />
                          Přejít do Lekce 15 (Hodnotová mapa)
                        </Button>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex justify-between">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Zpět
                </Button>
                <Button
                  size="lg"
                  disabled={products.length === 0 || painRelievers.length === 0 || gainCreators.length === 0}
                  onClick={async () => {
                    // 🔄 FORCE RELOAD všech dat z DB před přechodem na Krok 3!
                    console.log('🔄 RELOAD dat z DB před Krokem 3...');
                    
                    // 1. Ulož aktuální data
                    await saveFitProgress();
                    
                    // 2. Nastav loading
                    setIsLoading(true);
                    
                    // 3. Počkej 500ms aby se DB aktualizovala
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // 4. Načti FRESH data z DB
                    const segmentToUse = localSelectedSegment || selectedSegment;
                    
                    const { data: customerProfile } = await supabase
                      .from('value_proposition_canvas')
                      .select('*')
                      .eq('user_id', userId)
                      .eq('segment_name', segmentToUse)
                      .is('selected_value', null)
                      .maybeSingle();
                    
                    if (customerProfile?.fit_progress) {
                      const fp = customerProfile.fit_progress;
                      console.log('✅ Načítám FRESH FIT data:', fp);
                      
                      setJobs(fp.jobs.map((j: any, i: number) => ({
                        id: `job-${i}`,
                        text: j.text,
                        count: j.count || 0,
                        percentage: j.percentage || 0,
                        priority: j.priority || i
                      })));
                      
                      setPains(fp.pains.map((p: any, i: number) => ({
                        id: `pain-${i}`,
                        text: p.text,
                        count: p.count || 0,
                        percentage: p.percentage || 0,
                        priority: p.priority || i
                      })));
                      
                      setGains(fp.gains.map((g: any, i: number) => ({
                        id: `gain-${i}`,
                        text: g.text,
                        count: g.count || 0,
                        percentage: g.percentage || 0,
                        priority: g.priority || i
                      })));
                    }
                    
                    setIsLoading(false);
                    
                    // 5. Přejdi na Krok 3
                    console.log('✅ Přechod na Krok 3 s FRESH daty!');
                    setStep3Timestamp(Date.now());
                    setCurrentStep(3);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="gap-2"
                >
                  Pokračovat k validaci
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: FIT VALIDATION */}
        {currentStep === 3 && (
          <div
            className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            {/* Kompaktní header s FIT Score - Responzivní */}
            <div className={`rounded-lg sm:rounded-xl p-4 sm:p-6 ${hasFit ? 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200' : 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200'}`}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:justify-between">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Target className={`w-5 h-5 sm:w-6 sm:h-6 ${hasFit ? 'text-green-600' : 'text-orange-600'} flex-shrink-0`} />
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900">🎯 FIT Validace</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                    <div key={`fit-score-${fitScore}`} className="flex items-baseline gap-2">
                      <span className={`text-3xl sm:text-4xl font-bold ${hasFit ? 'text-green-600' : 'text-orange-600'}`}>{fitScore}%</span>
                      <span className="text-xs sm:text-sm text-gray-600">Product-Market Fit</span>
                    </div>
                    <div className="flex-1 w-full sm:max-w-md">
                      <div className="h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          key={`progress-${fitScore}`}
                          style={{ width: `${fitScore}%` }}
                          className={`h-full transition-all duration-1000 ease-out ${hasFit ? 'bg-green-500' : 'bg-orange-500'}`}
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {hasFit 
                          ? `✅ Pokrýváte ${topPains.length > 0 ? Math.round((coveredPainsCount / topPains.length) * 100) : 0}% top problémů`
                          : '⚠️ Propojte řešení s prioritami zákazníků'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-4">
                  <button
                    onClick={async () => {
                      if (!confirm('🔄 Resetovat FIT data?\n\nToto vymaže všechna propojení mezi řešeními a prioritami pro tento segment. Použijte když jste změnili Jobs/Pains/Gains v Lekci 1.')) {
                        return;
                      }
                      
                      try {
                        // Vymaž mappings
                        setPainRelieverMappings({});
                        setGainCreatorMappings({});
                        setProductMappings({});
                        
                        // Vymaž z DB
                        const { error } = await supabase
                          .from('fit_progress')
                          .delete()
                          .eq('user_id', userId)
                          .eq('customer_segment', selectedSegment);
                        
                        if (error) throw error;
                        
                        toast.success('✅ FIT data byla resetována');
                        console.log('🔄 FIT data resetována pro segment:', selectedSegment);
                      } catch (err) {
                        console.error('Error resetting FIT data:', err);
                        toast.error('❌ Chyba při resetování FIT dat');
                      }
                    }}
                    className="px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                    title="Vymazat stará FIT data když jste změnili Customer Profile"
                  >
                    <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      const helpEl = document.getElementById('step3-help');
                      if (helpEl) {
                        helpEl.classList.toggle('hidden');
                      }
                    }}
                    className="px-3 sm:px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                  >
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Help</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* ℹ️ Collapsible Help */}
            <div id="step3-help" className="hidden">
              <FitStepInstructions step={3} />
            </div>

            {/* TOP PRIORITIES VALIDATION */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🔥 Validace TOP priorit
              </h3>
              
              <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-900 font-bold mb-1">
                      💎 Diamantový model validace
                    </p>
                    <p className="text-blue-800">
                      Zaměřte se na <strong>TOP priority</strong> zákazníků. Pro každou zkontrolujte jestli máte řešení v Lekci 2 (Hodnotová mapa).
                    </p>
                  </div>
                </div>
              </div>

              {/* ⚠️ EMPTY STATE - Žádná prioritizovaná data */}
              {!hasValidData && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">
                    Žádná prioritizovaná data
                  </h3>
                  <p className="text-amber-800 mb-4">
                    Vraťte se do <strong>Kroku 2: Prioritizace</strong> a vyplňte kolik lidí jednotlivé položky zmiňovalo.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                    className="gap-2 bg-amber-600 hover:bg-amber-700"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Zpět k prioritizaci
                  </Button>
                </div>
              )}

              {/* NOVÝ JEDNODUCHÝ DESIGN - Vše na jednom místě */}
              {hasValidData && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-lg">
                    <h3 className="font-bold mb-1">🎯 FIT Mapping</h3>
                    <p className="text-white/90 text-xs">Propojte TOP priority s vašimi řešeními</p>
                  </div>
                    
                  {/* GRID LAYOUT - kompaktní boxy */}
                  <div className="space-y-6">
                    
                    {/* JOBS SEKCE - zobrazit i když nemají produkty */}
                    {topJobs.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-yellow-300">
                          <Target className="w-5 h-5 text-yellow-600" />
                          <h4 className="font-bold text-yellow-900">🎯 Cíle/Důvody návštěvy</h4>
                          <span className="text-xs text-gray-500 ml-auto">TOP {topJobs.length}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {topJobs.map((job, i) => {
                    const stars = Math.round((job.percentage || 0) / 20);
                    const mappingProducts = products.filter(p => {
                      const pText = typeof p === 'string' ? p : p.text;
                      return (productMappings[pText] || []).includes(job.id);
                    });
                    
                    return (
                      <div key={i} className="bg-yellow-50 rounded-lg border-2 border-yellow-300 p-4">
                        {/* Priorita */}
                        <div className="mb-2">
                          <div className="flex items-start gap-2 mb-1">
                            <span className="font-bold text-yellow-700">#{i + 1}</span>
                            <div className="flex-1">
                              <p className="text-gray-900 mb-0.5">{job.text}</p>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-600 font-bold">{job.percentage}%</span>
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, idx) => (
                                    <Star 
                                      key={idx} 
                                      className={`w-2.5 h-2.5 ${idx < stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Checkboxy - INLINE! */}
                        <div className="ml-6 pl-3 border-l-2 border-yellow-300">
                                <p className="text-yellow-800 font-medium mb-2">→ Vaše řešení:</p>
                                <div className="space-y-1.5">
                                  {products.map((product, idx) => {
                                    const productText = typeof product === 'string' ? product : product.text;
                                    const isChecked = (productMappings[productText] || []).includes(job.id);
                                    return (
                                      <label key={idx} className="flex items-start gap-2 cursor-pointer hover:bg-yellow-50 p-1.5 rounded transition-colors">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => {
                                            const currentMappings = productMappings[productText] || [];
                                            const newMappings = e.target.checked
                                              ? [...currentMappings, job.id]
                                              : currentMappings.filter(id => id !== job.id);
                                            
                                            if (newMappings.length > 0) {
                                              setProductMappings({
                                                ...productMappings,
                                                [productText]: newMappings
                                              });
                                            } else {
                                              const updated = { ...productMappings };
                                              delete updated[productText];
                                              setProductMappings(updated);
                                            }
                                          }}
                                          className="mt-0.5 w-3.5 h-3.5 text-green-600 rounded"
                                        />
                                        <span className="text-gray-700 flex-1">{typeof product === 'string' ? product : product.text}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                                
                                {mappingProducts.length > 0 && (
                                  <p className="text-xs text-green-700 font-medium mt-2">
                                    ✓ Pokryto: {mappingProducts.map(p => typeof p === 'string' ? p : p.text).join(', ')}
                                  </p>
                                )}
                        </div>
                      </div>
                    )
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* PAINS SEKCE - zobrazit i když nemají pain relievers */}
                    {topPains.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-red-300">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <h4 className="font-bold text-red-900">💊 Obavy/Problémy</h4>
                          <span className="text-xs text-gray-500 ml-auto">TOP {topPains.length}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {topPains.map((pain, i) => {
                    const stars = Math.round((pain.percentage || 0) / 20);
                    const mappingRelievers = painRelievers.filter(pr => {
                      const prText = typeof pr === 'string' ? pr : pr.text;
                      return (painRelieverMappings[prText] || []).includes(pain.id);
                    });
                    
                    return (
                      <div key={i} className="bg-red-50 rounded-lg border-2 border-red-300 p-4">
                        <div className="mb-2">
                          <div className="flex items-start gap-2 mb-1">
                            <span className="font-bold text-red-700">#{i + 1}</span>
                            <div className="flex-1">
                              <p className="text-gray-900 mb-0.5">{pain.text}</p>
                              <div className="flex items-center gap-1">
                                <span className="text-red-600 font-bold">{pain.percentage}%</span>
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, idx) => (
                                    <Star 
                                      key={idx} 
                                      className={`w-2.5 h-2.5 ${idx < stars ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Checkboxy - INLINE! */}
                        <div className="ml-6 pl-3 border-l-2 border-red-300">
                                <p className="text-red-800 font-medium mb-2">→ Vaše řešení:</p>
                                <div className="space-y-1.5">
                                  {painRelievers.map((reliever, idx) => {
                                    const relieverText = typeof reliever === 'string' ? reliever : reliever.text;
                                    const isChecked = (painRelieverMappings[relieverText] || []).includes(pain.id);
                                    return (
                                      <label key={idx} className="flex items-start gap-2 cursor-pointer hover:bg-red-50 p-1.5 rounded transition-colors">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => {
                                            const currentMappings = painRelieverMappings[relieverText] || [];
                                            const newMappings = e.target.checked
                                              ? [...currentMappings, pain.id]
                                              : currentMappings.filter(id => id !== pain.id);
                                            
                                            if (newMappings.length > 0) {
                                              setPainRelieverMappings({
                                                ...painRelieverMappings,
                                                [relieverText]: newMappings
                                              });
                                            } else {
                                              const updated = { ...painRelieverMappings };
                                              delete updated[relieverText];
                                              setPainRelieverMappings(updated);
                                            }
                                          }}
                                          className="mt-0.5 w-3.5 h-3.5 text-green-600 rounded"
                                        />
                                        <span className="text-gray-700 flex-1">{typeof reliever === 'string' ? reliever : reliever.text}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                                
                                {mappingRelievers.length > 0 && (
                                  <p className="text-xs text-green-700 font-medium mt-2">
                                    ✓ Pokryto: {mappingRelievers.map(pr => typeof pr === 'string' ? pr : pr.text).join(', ')}
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* GAINS SEKCE - zobrazit i když nemají gain creators (aby viděli co chybí!) */}
                    {topGains.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-green-300">
                          <Star className="w-5 h-5 text-green-600" />
                          <h4 className="font-bold text-green-900">📈 Očekávání/Touhy</h4>
                          <span className="text-xs text-gray-500 ml-auto">TOP {topGains.length}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {topGains.map((gain, i) => {
                    const stars = Math.round((gain.percentage || 0) / 20);
                    const mappingCreators = gainCreators.filter(gc => {
                      const gcText = typeof gc === 'string' ? gc : gc.text;
                      return (gainCreatorMappings[gcText] || []).includes(gain.id);
                    });
                    
                    return (
                      <div key={i} className="bg-green-50 rounded-lg border-2 border-green-300 p-4">
                        <div className="mb-2">
                          <div className="flex items-start gap-2 mb-1">
                            <span className="font-bold text-green-700">#{i + 1}</span>
                            <div className="flex-1">
                              <p className="text-gray-900 mb-0.5">{gain.text}</p>
                              <div className="flex items-center gap-1">
                                <span className="text-green-600 font-bold">{gain.percentage}%</span>
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, idx) => (
                                    <Star 
                                      key={idx} 
                                      className={`w-2.5 h-2.5 ${idx < stars ? 'text-green-500 fill-green-500' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Checkboxy - INLINE! */}
                        <div className="ml-6 pl-3 border-l-2 border-green-300">
                                <p className="text-green-800 font-medium mb-2">→ Vaše řešení:</p>
                                
                                {gainCreators.length === 0 ? (
                                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-center">
                                    <p className="text-yellow-800 mb-2">⚠️ Nemáte žádnou tvorbu přínosů!</p>
                                    <button
                                      onClick={() => {
                                        setCurrentStep(2);
                                        setStep2View('value');
                                      }}
                                      className="text-blue-600 hover:text-blue-700 underline"
                                    >
                                      Přidat v Kroku 2
                                    </button>
                                  </div>
                                ) : (
                                <>
                                <div className="space-y-1.5">
                                  {gainCreators.map((creator, idx) => {
                                    const creatorText = typeof creator === 'string' ? creator : creator.text;
                                    const isChecked = (gainCreatorMappings[creatorText] || []).includes(gain.id);
                                    return (
                                      <label key={idx} className="flex items-start gap-2 cursor-pointer hover:bg-green-50 p-1.5 rounded transition-colors">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => {
                                            const currentMappings = gainCreatorMappings[creatorText] || [];
                                            const newMappings = e.target.checked
                                              ? [...currentMappings, gain.id]
                                              : currentMappings.filter(id => id !== gain.id);
                                            
                                            if (newMappings.length > 0) {
                                              setGainCreatorMappings({
                                                ...gainCreatorMappings,
                                                [creatorText]: newMappings
                                              });
                                            } else {
                                              const updated = { ...gainCreatorMappings };
                                              delete updated[creatorText];
                                              setGainCreatorMappings(updated);
                                            }
                                          }}
                                          className="mt-0.5 w-3.5 h-3.5 text-green-600 rounded"
                                        />
                                        <span className="text-gray-700 flex-1">{typeof creator === 'string' ? creator : creator.text}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                                
                                {mappingCreators.length > 0 && (
                                  <p className="text-xs text-green-700 font-medium mt-2">
                                    ✓ Pokryto: {mappingCreators.map(gc => typeof gc === 'string' ? gc : gc.text).join(', ')}
                                  </p>
                                )}
                                </>
                                )}
                              </div>
                        </div>
                          );
                          })}
                        </div>
                      </div>
                    )}
                  
                  </div>
                  {/* Všechny sekce uzavřeny */}
                  
                  {/* Pokud nemá žádná řešení */}
                  {products.length === 0 && painRelievers.length === 0 && gainCreators.length === 0 && (
                    <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 text-center">
                      <p className="text-amber-900 font-bold mb-2">⚠️ Chybí řešení!</p>
                      <p className="text-sm text-amber-800">
                        Vraťte se do Lekce 15 (Hodnotová mapa) a vyplňte vaše řešení.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* VÝSLEDKY VALIDACE */}
            {fitScore >= 70 ? (
              // SUCCESS STATE - FIT Score >= 70%
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl">
                <h4 className="font-bold text-green-900 mb-3">👏 Skvělá práce! Máte validovaný FIT!</h4>
                
                <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-bold text-green-700">Jobs: {coveredJobsCount}/{topJobs.length}</div>
                      <div className="text-xs text-gray-600">pokryto</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-700">Pains: {coveredPainsCount}/{topPains.length}</div>
                      <div className="text-xs text-gray-600">pokryto</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-700">Gains: {coveredGainsCount}/{topGains.length}</div>
                      <div className="text-xs text-gray-600">pokryto</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-green-800">
                  <p><strong>✅ Co jste zjistili:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Vaše řešení pokrývá většinu TOP priorit zákazníků</li>
                    <li>• Máte dobrý soulad mezi nabídkou a segmentem</li>
                    <li>• Progress je automaticky uložen</li>
                  </ul>
                </div>
                
                {/* Show nepokryté pokud nějaké jsou */}
                {(coveredJobsCount < topJobs.length || coveredPainsCount < topPains.length || coveredGainsCount < topGains.length) && (
                  <details className="mt-4 bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                    <summary className="text-xs text-yellow-800 font-bold cursor-pointer hover:text-yellow-900">
                      💡 {(topJobs.length - coveredJobsCount) + (topPains.length - coveredPainsCount) + (topGains.length - coveredGainsCount)}× TOP priorita není pokryta (klikněte pro detail)
                    </summary>
                    <div className="mt-3 space-y-2 text-xs text-yellow-700">
                      {coveredJobsCount < topJobs.length && (
                        <div>
                          <p className="font-bold">❌ Jobs ({topJobs.length - coveredJobsCount}× nepokryto):</p>
                          <ul className="ml-4 list-disc space-y-1">
                            {topJobs.filter((job) => {
                              const isLinkedToProduct = Object.values(productMappings).some(arr => arr.includes(job.id));
                              return !isLinkedToProduct;
                            }).map((job, i) => (
                              <li key={i}>{job.text} ({job.percentage}% lidí)</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {coveredPainsCount < topPains.length && (
                        <div>
                          <p className="font-bold">❌ Pains ({topPains.length - coveredPainsCount}× nepokryto):</p>
                          <ul className="ml-4 list-disc space-y-1">
                            {topPains.filter((pain) => {
                              const isLinked = Object.values(painRelieverMappings).some(arr => arr.includes(pain.id));
                              return !isLinked;
                            }).map((pain, i) => (
                              <li key={i}>{pain.text} ({pain.percentage}% lidí)</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {coveredGainsCount < topGains.length && (
                        <div>
                          <p className="font-bold">❌ Gains ({topGains.length - coveredGainsCount}× nepokryto):</p>
                          <ul className="ml-4 list-disc space-y-1">
                            {topGains.filter((gain) => {
                              const isLinked = Object.values(gainCreatorMappings).some(arr => arr.includes(gain.id));
                              return !isLinked;
                            }).map((gain, i) => (
                              <li key={i}>{gain.text} ({gain.percentage}% lidí)</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </details>
                )}
              </div>
            ) : (
              // NEEDS WORK - FIT Score < 70%
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-xl">
                <h4 className="font-bold text-amber-900 mb-3">📊 FIT Score: {fitScore}%</h4>
                
                <div className="bg-white p-4 rounded-lg border border-amber-200 mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className={`font-bold ${coveredJobsCount === topJobs.length ? 'text-green-700' : 'text-amber-700'}`}>
                        Jobs: {coveredJobsCount}/{topJobs.length}
                      </div>
                      <div className="text-xs text-gray-600">pokryto</div>
                    </div>
                    <div>
                      <div className={`font-bold ${coveredPainsCount === topPains.length ? 'text-green-700' : 'text-amber-700'}`}>
                        Pains: {coveredPainsCount}/{topPains.length}
                      </div>
                      <div className="text-xs text-gray-600">pokryto</div>
                    </div>
                    <div>
                      <div className={`font-bold ${coveredGainsCount === topGains.length ? 'text-green-700' : 'text-amber-700'}`}>
                        Gains: {coveredGainsCount}/{topGains.length}
                      </div>
                      <div className="text-xs text-gray-600">pokryto</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-amber-900">
                  <p><strong>💡 Co to znamená:</strong></p>
                  <p className="text-amber-800">
                    Vaše nabídka nepokrývá většinu TOP priorit zákazníků. 
                    To je OK - nyní víte <strong>CO je potřeba zlepšit!</strong>
                  </p>
                  
                  <details className="bg-white border border-amber-200 rounded-lg p-3">
                    <summary className="font-bold text-amber-900 cursor-pointer hover:text-amber-950">
                      ❌ Celkem {(topJobs.length - coveredJobsCount) + (topPains.length - coveredPainsCount) + (topGains.length - coveredGainsCount)} TOP priorit bez řešení (klikněte pro detail)
                    </summary>
                    <div className="mt-3 space-y-2 text-xs text-amber-700">
                      {coveredJobsCount < topJobs.length && (
                        <div>
                          <p className="font-bold">❌ Jobs ({topJobs.length - coveredJobsCount}× nepokryto):</p>
                          <ul className="ml-4 list-disc space-y-1">
                            {topJobs.filter((job) => {
                              const isLinkedToProduct = Object.values(productMappings).some(arr => arr.includes(job.id));
                              return !isLinkedToProduct;
                            }).map((job, i) => (
                              <li key={i}>{job.text} ({job.percentage}% lidí) → žádný produkt/služba</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {coveredPainsCount < topPains.length && (
                        <div>
                          <p className="font-bold">❌ Pains ({topPains.length - coveredPainsCount}× nepokryto):</p>
                          <ul className="ml-4 list-disc space-y-1">
                            {topPains.filter((pain) => {
                              const isLinked = Object.values(painRelieverMappings).some(arr => arr.includes(pain.id));
                              return !isLinked;
                            }).map((pain, i) => (
                              <li key={i}>{pain.text} ({pain.percentage}% lidí) → chybí řešení</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {coveredGainsCount < topGains.length && (
                        <div>
                          <p className="font-bold">❌ Gains ({topGains.length - coveredGainsCount}× nepokryto):</p>
                          <ul className="ml-4 list-disc space-y-1">
                            {topGains.filter((gain) => {
                              const isLinked = Object.values(gainCreatorMappings).some(arr => arr.includes(gain.id));
                              return !isLinked;
                            }).map((gain, i) => (
                              <li key={i}>{gain.text} ({gain.percentage}% lidí) → chybí způsob jak to dodat</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="mt-3 pt-3 border-t border-amber-200">
                        💡 <strong>Co dál:</strong> Vraťte se do kroku 2 a zkontrolujte mapování, nebo přidejte chybějící řešení do hodnotové mapy.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="gap-2 flex-1 sm:flex-none"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Upravit prioritizaci</span>
                    <span className="sm:hidden">Upravit</span>
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={loadVPC}
                    className="gap-2 flex-1 sm:flex-none"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Načíst znovu
                  </Button>
                </div>
                
                {/* Tlačítko "Uložit a dokončit" JEN pokud lekce NENÍ dokončená */}
                {!isLessonCompleted && (
                  <Button
                    size="lg"
                    onClick={async () => {
                      await saveFitProgress();
                      
                      // 🏆 Trigger achievement - FIT Validator dokončen!
                      if (onAchievementUnlocked) {
                        // 🎯 ODEMKNI AKČNÍ PLÁN!
                        onAchievementUnlocked('action-plan-unlocked');
                      }
                      
                      // 🎉 Zavolej onComplete callback s FIT Score
                      if (onComplete) {
                        onComplete(fitScore);
                      }
                      
                      // 📋 TOAST: Akční plán odemknut!
                      toast.success('🎉 Gratulujeme! Odemkl jsi Akční plán!', {
                        description: 'Najdeš ho v sidebaru v sekci "Tools" → "Akční plán"',
                        duration: 6000,
                      });
                    }}
                    className="gap-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Uložit a dokončit
                  </Button>
                )}
                
                {/* Když je lekce dokončená, ukaž tlačítko na Akční plán */}
                {isLessonCompleted && onNavigateToTool && (
                  <Button
                    size="lg"
                    onClick={() => onNavigateToTool('action-plan')}
                    className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto"
                  >
                    <Target className="w-5 h-5" />
                    Pokračovat na Akční plán
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <p className="text-xs text-blue-800">
                  💾 Změny se ukládají automaticky každé 2 sekundy
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FitValidatorV2;
