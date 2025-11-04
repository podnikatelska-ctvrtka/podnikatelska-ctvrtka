import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Target, 
  AlertCircle, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Package,
  Edit,
  ChevronDown,
  ChevronUp,
  Trophy,
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabase";
import { trackCourseEvent, trackError } from "../lib/sentry";

interface BusinessActionPlanProps {
  userId: string;
  onNavigateToLesson?: (lessonId: number) => void;
  onBack?: () => void;
  refreshTrigger?: number; // Pro manuální refresh z parenta
  onAchievementUnlocked?: (achievementId: string) => void; // ✅ Callback pro achievements
}

interface SegmentEconomics {
  name: string;
  color: string;
  revenue: number;
  costs: number;
  profit: number;
}

interface SegmentRanking {
  name: string;
  color: string;
  avgSpend: number;
  currentCustomers: number;
  targetCustomers: number;
  currentRevenue: number;
  potentialRevenue: number;
  growth: number;
}

interface TopPriority {
  text: string;
  percentage: number;
}

interface ProductAnalysis {
  name: string;
  status: 'good' | 'warning' | 'bad';
  reason: string;
  action: string;
}

interface ActionItem {
  id: string;
  text: string;
  deadline?: string; // e.g. "7 dní", "14 dní", "30 dní"
  tip?: string; // Konkrétní tip jak na to
  lessonId?: number;
  lessonName?: string;
}

export function BusinessActionPlan({ userId, onNavigateToLesson, onBack, refreshTrigger, onAchievementUnlocked }: BusinessActionPlanProps) {
  const [loading, setLoading] = useState(true);
  
  const [segments, setSegments] = useState<SegmentEconomics[]>([]);
  const [topSegment, setTopSegment] = useState<SegmentEconomics | null>(null);
  const [topJobs, setTopJobs] = useState<TopPriority[]>([]);
  const [topPains, setTopPains] = useState<TopPriority[]>([]);
  const [topGains, setTopGains] = useState<TopPriority[]>([]);
  const [products, setProducts] = useState<ProductAnalysis[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [showBacklog, setShowBacklog] = useState(false);
  const [backlogItems, setBacklogItems] = useState<{ jobs: TopPriority[], pains: TopPriority[], gains: TopPriority[] }>({
    jobs: [],
    pains: [],
    gains: []
  });
  const [segmentRankings, setSegmentRankings] = useState<SegmentRanking[]>([]);
  const [fitSegment, setFitSegment] = useState('');
  const [fitValue, setFitValue] = useState('');

  // Load completed actions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`action_plan_completed_${userId}`);
    if (saved) {
      setCompletedActions(new Set(JSON.parse(saved)));
    }
  }, [userId]);

  // Save completed actions to localStorage
  const toggleAction = async (actionId: string) => {
    const newCompleted = new Set(completedActions);
    const wasCompleted = newCompleted.has(actionId);
    
    if (wasCompleted) {
      newCompleted.delete(actionId);
    } else {
      newCompleted.add(actionId);
      
      // 🏆 Achievement: První dokončená akce
      if (newCompleted.size === 1 && onAchievementUnlocked) {
        onAchievementUnlocked('first-action-completed');
      }
      
      // 🏆 Achievement: 3 dokončené akce
      if (newCompleted.size === 3 && onAchievementUnlocked) {
        onAchievementUnlocked('action-streak-3');
      }
      
      // 🏆 Achievement: Všechny akce dokončeny
      if (newCompleted.size === actionItems.length && actionItems.length > 0 && onAchievementUnlocked) {
        onAchievementUnlocked('all-actions-completed');
      }
    }
    
    setCompletedActions(newCompleted);
    localStorage.setItem(`action_plan_completed_${userId}`, JSON.stringify(Array.from(newCompleted)));
  };

  useEffect(() => {
    loadData();
    
    // 🏆 ACHIEVEMENT 'action-plan-unlocked' se triggeruje při dokončení FIT Validatoru (Lekce 16)
    // Ne zde, protože Akční plán je dostupný rovnou v sidebaru (není "první otevření")
  }, [userId]);

  // 🔄 Auto-refresh když se změní refreshTrigger (při návratu z lekce)
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      console.log('🔄 Refresh trigger detected - reloading dashboard data...');
      loadData();
    }
  }, [refreshTrigger]);

  // 🔄 Auto-refresh když se uživatel vrátí na stránku
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('👁️ Page visible - reloading dashboard data...');
        loadData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [userId]);

  const loadData = async () => {
    setLoading(true);
    
    try {
      // ⏱️ MALÉ ZPOŽDĚNÍ aby FIT Validator stih uložit (když přecházíš rychle z lekce)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('🔄 BusinessActionPlan: Loading data for userId:', userId);
      
      // 🎯 NEW: Load experience level
      try {
        const { data: experienceData } = await supabase
          .from('user_canvas_data')
          .select('content')
          .eq('user_id', userId)
          .eq('section_key', 'experience_level')
          .single();
        
        if (experienceData?.content?.level) {
          setExperienceLevel(experienceData.content.level);
          console.log('📊 Loaded experience level:', experienceData.content.level);
        }
      } catch (err) {
        console.log('⚠️ No experience level saved, defaulting to experienced');
      }
      
      // ✅ DEFINUJ PROMĚNNÉ NA ZAČÁTKU - aby byly v scope pro celou funkci!
      let rankings: SegmentRanking[] = [];
      let sortedJobs: any[] = [];
      let sortedPains: any[] = [];
      let sortedGains: any[] = [];
      
      // 1. Load segments with economics
      const { data: segmentsData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .maybeSingle();

      console.log('📊 Segments:', segmentsData);

      // 2. Load revenue
      const { data: revenueData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'revenue')
        .maybeSingle();

      console.log('💰 Revenue:', revenueData);
      console.log('💰 Revenue items:', revenueData?.content?.map((r: any) => ({ text: r.text, color: r.color, amount: r.amount })));

      // 3. Load costs
      const { data: costsData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'costs')
        .maybeSingle();

      console.log('💸 Costs:', costsData);
      console.log('💸 Cost items:', costsData?.content?.map((c: any) => ({ text: c.text, color: c.color, amount: c.amount, isGlobal: c.isGlobal })));

      // 4. Load ALL VPC records (Customer Profile + Value Maps)
      // ⚡ FORCE NO-CACHE - použij dummy filter aby Supabase načetl FRESH data!
      const timestampWorkaround = Date.now();
      const { data: allVPCRecords } = await supabase
        .from('value_proposition_canvas')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false }); // Nejnovější první

      console.log(`🎯 ALL VPC Records (fresh @ ${timestampWorkaround}):`, allVPCRecords);
      
      // Find Customer Profile record (selected_value IS NULL)
      const vpcData = allVPCRecords?.find(r => r.selected_value === null);
      console.log('🎯 Customer Profile VPC:', vpcData);

      // 5. Value Maps are already loaded in allVPCRecords
      const valueMapData = allVPCRecords?.filter(r => r.selected_value !== null) || [];
      console.log('📦 Value Map Data:', valueMapData);

      // ✅ DEKLARACE PROMĚNNÝCH - ale NENAČÍTÁME je hned!
      let jobs: any[] = [];
      let pains: any[] = [];
      let gains: any[] = [];
      let currentFitSegment = '';
      let currentFitValue = '';

      // ✅ VYTVOŘ REVENUE STREAMS LIST (ne segmenty!)
      if (revenueData?.content && costsData?.content) {
        const totalRevenue = (revenueData.content || [])
          .reduce((sum: number, r: any) => sum + (r.value || 0), 0);
        
        const totalCosts = (costsData.content || [])
          .reduce((sum: number, c: any) => sum + (c.value || 0), 0);

        console.log('💰 TOTAL Revenue:', totalRevenue);
        console.log('💸 TOTAL Costs:', totalCosts);

        // ✅ Vytvoř seznam REVENUE STREAMS s marží
        const revenueList: SegmentEconomics[] = (revenueData.content || []).map((r: any) => {
          const revenueShare = r.value / totalRevenue;
          const proportionalCosts = totalCosts * revenueShare;
          const profit = r.value - proportionalCosts;

          return {
            name: r.text,
            color: r.color || 'global',
            revenue: r.value,
            costs: proportionalCosts,
            profit: profit
          };
        });

        // Sort by revenue
        revenueList.sort((a, b) => b.revenue - a.revenue);
        setSegments(revenueList);
        setTopSegment(revenueList[0]);
        
        console.log('📊 Revenue Streams:', revenueList);

        // ✅ VYTVOŘ SEGMENT RANKINGS z ProfitCalculatoru
        if (segmentsData?.content) {
          rankings = segmentsData.content
            .map((s: any, originalIndex: number) => {
              // NEJDŘÍV map s originalIndex, PAK filter!
              const hasCustomers = (s.currentValue || 0) > 0;
              const hasRevenue = (s.value || 0) > 0;
              const isColoredSegment = s.color && s.color !== 'white';
              
              if (!isColoredSegment || !hasCustomers || !hasRevenue) {
                return null; // Vyfiltruj to později
              }

              const currentCustomers = s.currentValue || 0;
              const targetCustomers = s.targetValue || currentCustomers;
              const avgSpend = s.value || 0;
              const currentRevenue = currentCustomers * avgSpend;
              const potentialRevenue = targetCustomers * avgSpend;
              const growth = targetCustomers > currentCustomers ? ((targetCustomers - currentCustomers) / currentCustomers) * 100 : 0;

              return {
                name: s.text,
                color: s.color,
                avgSpend,
                currentCustomers,
                targetCustomers,
                currentRevenue,
                potentialRevenue,
                growth,
                _originalIndex: originalIndex // Zachovat PŮVODNÍ index z DB!
              };
            })
            .filter((s: any) => s !== null) // Odstraň nully
            .sort((a, b) => {
              // Stabilní sort - když je stejná hodnota, zachovat původní pořadí
              const diff = b.potentialRevenue - a.potentialRevenue;
              if (diff !== 0) return diff;
              return (a as any)._originalIndex - (b as any)._originalIndex;
            });

          setSegmentRankings(rankings);
          console.log('📊 Segment Rankings (stable sorted with original index):', rankings);

          // ✅ TEĎ TEPRVE NAČTI FIT DATA - PRO TOP SEGMENT!
          if (rankings.length > 0) {
            const topSegmentName = rankings[0].name;
            console.log('🏆 TOP Segment (economics):', topSegmentName);
            console.log('🔍 Looking for FIT data for segment:', topSegmentName);

            // Zkus najít Customer Profile PRO TOP SEGMENT
            // Customer Profile má selected_value = null a segment_name = název segmentu
            const topSegmentVPC = allVPCRecords?.find(
              r => r.selected_value === null && r.segment_name === topSegmentName
            );

            console.log('🎯 Customer Profile for TOP segment:', topSegmentVPC);

            if (topSegmentVPC?.fit_validation_data) {
              // ✅ MÁME FIT DATA PRO TOP SEGMENT!
              console.log('✅ Found exact FIT data for TOP segment!');
              jobs = topSegmentVPC.fit_validation_data.jobs || [];
              pains = topSegmentVPC.fit_validation_data.pains || [];
              gains = topSegmentVPC.fit_validation_data.gains || [];
              currentFitSegment = topSegmentName;
              
              // Najdi hodnotu pro tento segment
              const matchingValueMap = valueMapData.find(vm => vm.segment_name === topSegmentName);
              currentFitValue = matchingValueMap?.selected_value || '';
              
              console.log('📊 FIT Data loaded:', {
                segment: currentFitSegment,
                value: currentFitValue,
                jobs: jobs.length,
                pains: pains.length,
                gains: gains.length
              });
            } else {
              // ❌ NEMÁME FIT DATA PRO TOP SEGMENT
              console.log('⚠️ No FIT data for TOP segment:', topSegmentName);
              console.log('💡 Available VPC records:', allVPCRecords?.map(r => ({
                segment: r.segment_name,
                value: r.selected_value,
                hasFIT: !!r.fit_validation_data
              })));
              
              // Fallback: Použij JAKÁKOLIV dostupná FIT data
              const anyVPCWithFIT = allVPCRecords?.find(
                r => r.selected_value === null && r.fit_validation_data
              );
              
              if (anyVPCWithFIT?.fit_validation_data) {
                console.log('⚠️ Using fallback FIT data from:', anyVPCWithFIT.segment_name);
                jobs = anyVPCWithFIT.fit_validation_data.jobs || [];
                pains = anyVPCWithFIT.fit_validation_data.pains || [];
                gains = anyVPCWithFIT.fit_validation_data.gains || [];
                currentFitSegment = anyVPCWithFIT.segment_name;
                
                const matchingValueMap = valueMapData.find(vm => vm.segment_name === anyVPCWithFIT.segment_name);
                currentFitValue = matchingValueMap?.selected_value || '';
              } else {
                console.log('❌ No FIT data available at all!');
                currentFitSegment = '';
                currentFitValue = '';
              }
            }
            
            setFitSegment(currentFitSegment);
            setFitValue(currentFitValue);
          } else {
            console.log('⚠️ No segment rankings available');
          }
        }

        // Filtruj a seřaď podle percentage
        sortedJobs = jobs
          .filter((j: any) => (j.percentage || 0) > 0)
          .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0));
        
        sortedPains = pains
          .filter((p: any) => (p.percentage || 0) > 0)
          .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0));
        
        sortedGains = gains
          .filter((g: any) => (g.percentage || 0) > 0)
          .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0));

        console.log('🔝 Sorted:', { jobs: sortedJobs.length, pains: sortedPains.length, gains: sortedGains.length });

        // Top 3
        setTopJobs(sortedJobs.slice(0, 3).map((j: any) => ({ text: j.text, percentage: Math.round(j.percentage || 0) })));
        setTopPains(sortedPains.slice(0, 3).map((p: any) => ({ text: p.text, percentage: Math.round(p.percentage || 0) })));
        setTopGains(sortedGains.slice(0, 3).map((g: any) => ({ text: g.text, percentage: Math.round(g.percentage || 0) })));

        // Backlog (rest)
        setBacklogItems({
          jobs: sortedJobs.slice(3).map((j: any) => ({ text: j.text, percentage: Math.round(j.percentage || 0) })),
          pains: sortedPains.slice(3).map((p: any) => ({ text: p.text, percentage: Math.round(p.percentage || 0) })),
          gains: sortedGains.slice(3).map((g: any) => ({ text: g.text, percentage: Math.round(g.percentage || 0) }))
        });
      }

      // 🔍 DEBUG: Check prerequisites (MIMO if revenueData blok!)
      try {
        console.log('🔍🔍🔍 STARTING PRODUCT ANALYSIS (OUTSIDE REVENUE BLOCK) 🔍🔍🔍');
        console.log('Rankings available:', rankings);
        console.log('Value Map Data available:', valueMapData);
        console.log('🔍 Product Analysis Prerequisites:', {
          hasValueMapData: !!valueMapData,
          valueMapCount: valueMapData?.length || 0,
          rankingsCount: rankings?.length || 0
        });

        // Analyze products - POUZE pro TOP segment (ekonomicky nejlepší!)
      if (valueMapData && valueMapData.length > 0 && rankings.length > 0) {
        console.log('✅ Entering product analysis block!');
        const productAnalysis: ProductAnalysis[] = [];
        const topSegmentName = rankings[0].name; // Ekonomicky nejlepší segment
        
        console.log('📦 Analyzing products ONLY for TOP segment:', topSegmentName);
        console.log('📦 All Value Maps available:', valueMapData.map(vm => ({
          segment: vm.segment_name,
          value: vm.selected_value
        })));
          
          // Filtruj jen Value Maps pro TOP segment (trim whitespace!)
          const topSegmentValueMaps = valueMapData.filter(vm => 
            vm.segment_name?.trim() === topSegmentName?.trim()
          );
          console.log('📦 Found', topSegmentValueMaps.length, 'value maps for', topSegmentName);
          console.log('📦 Comparison:', {
            topSegment: topSegmentName,
            topSegmentTrimmed: topSegmentName?.trim(),
            availableSegments: valueMapData.map(vm => vm.segment_name)
          });
          
          if (topSegmentValueMaps.length === 0) {
            console.warn('⚠️ No Value Maps found for TOP segment! Check if segment names match exactly.');
            console.log('💡 Segment names in Value Maps:', [...new Set(valueMapData.map(vm => vm.segment_name))]);
          }
          
          // Pro každou hodnotu TOP segmentu spočítej FIT score
          topSegmentValueMaps.forEach((vm, originalIndex) => {
            const valueName = vm.selected_value;
            const vmProducts = vm.products || [];
            const painRelievers = vm.pain_relievers || [];
            const gainCreators = vm.gain_creators || [];
            
            // Najdi segment pro tuto hodnotu
            const segmentData = segmentsData?.content?.find((s: any) => s.text === vm.segment_name);
            const segmentRevenue = segmentData?.value || 0; // průměrná útrata
            const segmentCustomers = segmentData?.targetValue || 0; // cílový počet zákazníků
            const potentialRevenue = segmentRevenue * segmentCustomers;
            
            // 🎯 POUŽIJ FIT SCORE Z FIT VALIDATORU (místo nového výpočtu!)
            // FIT Validator už má spočítaný FIT score - najdeme ho v FIT validation data
            let fitScore = 0;
            
            console.log(`  🔍 Looking for Customer Profile FIT data for segment:`, vm.segment_name);
            
            // FIT data jsou v CUSTOMER PROFILE (selected_value = null), ne v Value Map!
            const customerProfile = allVPCRecords?.find(
              r => r.segment_name === vm.segment_name && r.selected_value === null && r.fit_validation_data
            );
            
            console.log(`  🎯 Found Customer Profile:`, customerProfile ? 'YES ✅' : 'NO ❌');
            
            if (customerProfile?.fit_validation_data) {
              // ✅ POUŽIJ ULOŽENÝ FIT SCORE (nebo dopočítej fallback!)
              if ('fitScore' in customerProfile.fit_validation_data) {
                // Máme novou verzi s fitScore polem
                fitScore = customerProfile.fit_validation_data.fitScore || 0;
                console.log(`  ✅ FIT Score for [${valueName}]: ${fitScore}%`, {
                  source: 'fit_validation_data.fitScore',
                  value: fitScore
                });
              } else {
                // FALLBACK: Stará verze dat BEZ fitScore pole - dopočítáme!
                console.warn(`⚠️ fitScore NENÍ v fit_validation_data! Používám fallback výpočet.`);
                
                const fitData = customerProfile.fit_validation_data;
                const jobs = fitData.jobs || [];
                const pains = fitData.pains || [];
                const gains = fitData.gains || [];
                const painRelieverMappings = fitData.painRelieverMappings || {};
                const gainCreatorMappings = fitData.gainCreatorMappings || {};
                const productMappings = fitData.productMappings || {};
                
                // Get top 3 prioritized items
                const topJobs = jobs.filter((j: any) => (j.percentage || 0) > 0)
                  .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0))
                  .slice(0, 3);
                const topPains = pains.filter((p: any) => (p.percentage || 0) > 0)
                  .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0))
                  .slice(0, 3);
                const topGains = gains.filter((g: any) => (g.percentage || 0) > 0)
                  .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0))
                  .slice(0, 3);
                
                // Count covered items
                let coveredPainsCount = 0;
                let coveredGainsCount = 0;
                let coveredJobsCount = 0;
                
                if (topPains.length > 0) {
                  const coveredPainIds = new Set<string>();
                  Object.values(painRelieverMappings).forEach((painIds: any) => {
                    painIds.forEach((id: string) => coveredPainIds.add(id));
                  });
                  coveredPainsCount = topPains.filter((p: any) => coveredPainIds.has(p.id)).length;
                }
                
                if (topGains.length > 0) {
                  const coveredGainIds = new Set<string>();
                  Object.values(gainCreatorMappings).forEach((gainIds: any) => {
                    gainIds.forEach((id: string) => coveredGainIds.add(id));
                  });
                  coveredGainsCount = topGains.filter((g: any) => coveredGainIds.has(g.id)).length;
                }
                
                if (topJobs.length > 0) {
                  const coveredJobIds = new Set<string>();
                  Object.values(productMappings).forEach((jobIds: any) => {
                    jobIds.forEach((id: string) => coveredJobIds.add(id));
                  });
                  coveredJobsCount = topJobs.filter((j: any) => coveredJobIds.has(j.id)).length;
                }
                
                // Calculate FIT score (same logic as FitValidatorV2)
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
                
                fitScore = totalWeight > 0 ? Math.round((achievedScore / totalWeight) * 100) : 0;
                
                console.log(`  ⚠️ FALLBACK FIT Score for [${valueName}]: ${fitScore}%`, {
                  source: 'calculated from mappings',
                  topCounts: { pains: topPains.length, gains: topGains.length, jobs: topJobs.length },
                  coveredCounts: { pains: coveredPainsCount, gains: coveredGainsCount, jobs: coveredJobsCount }
                });
              }
            } else {
              console.log(`  ⚠️ No Customer Profile with FIT data for segment "${vm.segment_name}"`);
            }

            // Přidej jen pokud má smysl (má FIT data nebo revenue)
            console.log(`  📊 FINAL VALUES for "${valueName}":`, {
              fitScore,
              potentialRevenue,
              willPush: potentialRevenue > 0 || fitScore > 0
            });
            
            if (potentialRevenue > 0 || fitScore > 0) {
              if (fitScore === 100) {
                const newProduct = {
                  name: `${valueName} (${vm.segment_name})`,
                  status: 'good',
                  reason: `FIT ${fitScore}% · Potenciál ${potentialRevenue.toLocaleString()} Kč/měsíc`,
                  action: '🏆 PERFEKTNÍ! Pokrýváte všechny potřeby. Škálujte prodej!',
                  _originalIndex: originalIndex, // PŮVODNÍ index z valueMapData
                  _fitScore: fitScore,
                  _revenue: potentialRevenue
                } as any;
                console.log(`  ➕ PUSHING to productAnalysis (100% FIT):`, newProduct);
                productAnalysis.push(newProduct);
              } else if (fitScore >= 60) {
                const newProduct = {
                  name: `${valueName} (${vm.segment_name})`,
                  status: 'good',
                  reason: `FIT ${fitScore}% · Potenciál ${potentialRevenue.toLocaleString()} Kč/měsíc`,
                  action: 'Priorita #1! Zaměřte se na tento produkt.',
                  _originalIndex: originalIndex, // PŮVODNÍ index z valueMapData
                  _fitScore: fitScore,
                  _revenue: potentialRevenue
                } as any;
                console.log(`  ➕ PUSHING to productAnalysis:`, newProduct);
                productAnalysis.push(newProduct);
              } else if (fitScore >= 30) {
                const newProduct = {
                  name: `${valueName} (${vm.segment_name})`,
                  status: 'warning',
                  reason: `FIT ${fitScore}% · Potenciál ${potentialRevenue.toLocaleString()} Kč/měsíc`,
                  action: 'Vylepšete komunikaci nebo funkce',
                  _originalIndex: originalIndex, // PŮVODNÍ index z valueMapData
                  _fitScore: fitScore,
                  _revenue: potentialRevenue
                } as any;
                console.log(`  ➕ PUSHING to productAnalysis:`, newProduct);
                productAnalysis.push(newProduct);
              } else {
                const newProduct = {
                  name: `${valueName} (${vm.segment_name})`,
                  status: 'bad',
                  reason: `FIT ${fitScore}% · Potenciál ${potentialRevenue.toLocaleString()} Kč/měsíc`,
                  action: 'Přehodnoťte tento produkt',
                  _originalIndex: originalIndex, // PŮVODNÍ index z valueMapData
                  _fitScore: fitScore,
                  _revenue: potentialRevenue
                } as any;
                console.log(`  ➕ PUSHING to productAnalysis:`, newProduct);
                productAnalysis.push(newProduct);
              }
            }
          });
          
          console.log('📦 FINAL productAnalysis array BEFORE sort:', productAnalysis);

          console.log('📦 FINAL productAnalysis array AFTER forEach:', productAnalysis);
          
          // Stabilní sort: podle statusu, pak podle FIT score, pak podle revenue, pak original index
          productAnalysis.sort((a: any, b: any) => {
            const order = { good: 0, warning: 1, bad: 2 };
            const statusDiff = order[a.status] - order[b.status];
            if (statusDiff !== 0) return statusDiff;
            
            // Stejný status → seřaď podle FIT score (vyšší = lepší)
            const fitDiff = b._fitScore - a._fitScore;
            if (fitDiff !== 0) return fitDiff;
            
            // Stejný FIT → seřaď podle revenue (vyšší = lepší)
            const revDiff = b._revenue - a._revenue;
            if (revDiff !== 0) return revDiff;
            
            // Stejné všechno → zachovat původní pořadí
            return a._originalIndex - b._originalIndex;
          });
          
          console.log('📦 FINAL productAnalysis array AFTER sort:', productAnalysis);

        setProducts(productAnalysis);
        console.log('📦 setProducts called with:', productAnalysis);
        
        // 🚨 SENTRY: Track successful action plan generation
        trackCourseEvent.actionPlanComplete(userId);
      } else {
        console.log('❌ Product analysis skipped - no value maps or rankings');
      }
      } catch (error) {
        console.error('💥 CRASH in product analysis:', error);
        
        // 🚨 SENTRY: Track error
        trackError.loadError('BusinessActionPlan', error as Error, {
          userId,
        });
      }

      // Generate action items - JEDNODUCHÉ KROKY (TAKY MIMO revenue blok!)
      if (revenueData?.content && costsData?.content) {
        const actions: ActionItem[] = [];
        console.log('🎯 Generating simple action items...');
        
        // Načti top segment z rankings
        const hasTopSegment = rankings.length > 0;
        const topSegmentName = hasTopSegment ? rankings[0].name : '';
        const topSegmentRevenue = hasTopSegment ? Math.round(rankings[0].potentialRevenue) : 0;
        
        // Načti top priority z FIT data
        const hasTopPains = sortedPains.length > 0;
        const hasTopGains = sortedGains.length > 0;
        const hasTopJobs = sortedJobs.length > 0;
        
        // 📋 AKCE #1: Vylepšete produkt pro TOP pains
        if (hasTopPains) {
          actions.push({
            id: 'improve-pain-relievers',
            text: 'Řešte TOP obtíže zákazníků',
            deadline: '14 dní',
            tip: `🎯 Zaměřte se na tyto problémy zákazníků:\n• ${sortedPains[0].text} (${sortedPains[0].percentage}%)\n${sortedPains[1] ? `• ${sortedPains[1].text} (${sortedPains[1].percentage}%)\n` : ''}${sortedPains[2] ? `• ${sortedPains[2].text} (${sortedPains[2].percentage}%)` : ''}\n\nPřidejte funkce nebo upravte produkt aby tyto problémy lépe řešil.`
          });
        }
        
        // ✨ AKCE #2: Zdůrazněte TOP gains v komunikaci
        if (hasTopGains) {
          actions.push({
            id: 'highlight-gain-creators',
            text: 'Zdůrazněte TOP přínosy v marketingu',
            deadline: '14 dní',
            tip: `💬 Komunikujte tyto benefity všude (web, emaily, reklamy):\n• ${sortedGains[0].text} (${sortedGains[0].percentage}%)\n${sortedGains[1] ? `• ${sortedGains[1].text} (${sortedGains[1].percentage}%)\n` : ''}${sortedGains[2] ? `• ${sortedGains[2].text} (${sortedGains[2].percentage}%)` : ''}\n\nZákazníci toto očekávají nejvíc!`
          });
        }
        
        // 📊 AKCE #3: Měřte klíčové metriky
        if (hasTopSegment) {
          actions.push({
            id: 'track-metrics',
            text: 'Sledujte prodeje a zákaznický feedback',
            deadline: '7 dní',
            tip: `📈 Sledujte tyto metriky (Google Sheets nebo notebook):\n• Nových zákazníků/týden z "${topSegmentName}"\n• Kolik % se vrací na opakovaný nákup (%)\n• Průměrná hodnota nákupu (Kč)\n• Měsíční příjem (cíl: ${topSegmentRevenue.toLocaleString()} Kč)\n\nCo se měří, to se zlepšuje!`
          });
        }
        
        // 🚀 AKCE #4: Škálujte do dalšího segmentu (pokud mají víc segmentů)
        if (rankings.length > 1) {
          const secondSegment = rankings[1];
          actions.push({
            id: 'scale-to-next',
            text: `Připravte expanzi do: ${secondSegment.name}`,
            deadline: '30 dní',
            tip: `🎯 Až zvládnete "${topSegmentName}", expandujte:\n• Segment: ${secondSegment.name}\n• Potenciál: ${Math.round(secondSegment.potentialRevenue).toLocaleString()} Kč/měsíc\n\nAnalyzujte rozdíly v jejich potřebách a upravte produkt/messaging.`
          });
        } else {
          // Pokud mají jen 1 segment, navrhni optimalizaci
          actions.push({
            id: 'optimize-current',
            text: 'Optimalizujte aktuální segment',
            deadline: '30 dní',
            tip: `💡 Zaměřte se na zlepšení v "${topSegmentName}":\n• Zvyšte konverzi leadů\n• Zlepšete průměrnou hodnotu zakázky\n• Získejte více zákazníků z tohoto segmentu\n\nMůžete také přidat nový segment do Podnikatelského modelu.`
          });
        }

        setActionItems(actions);
        console.log('✅ Simple action items generated:', actions);
      }
      
      // 🏆 Achievement checking - kontroluj všechny FIT score achievementy
      // Třídí se od nejvyšších k nejnižším aby se odemkly všechny dosažené levely
      const fitScores = products.map((p: any) => p._fitScore).filter((s: number) => s > 0);
      const maxFitScore = fitScores.length > 0 ? Math.max(...fitScores) : 0;
      
      if (maxFitScore >= 90) {
        const unlocked = unlockAchievement(userId, 'fit-90-percent');
        if (unlocked && onAchievementUnlocked) {
          onAchievementUnlocked('fit-90-percent');
        }
      }
      
      if (maxFitScore >= 80) {
        const unlocked = unlockAchievement(userId, 'product-fit-master');
        if (unlocked && onAchievementUnlocked) {
          onAchievementUnlocked('product-fit-master');
        }
      }
      
      if (maxFitScore >= 70) {
        const unlocked = unlockAchievement(userId, 'fit-70-percent');
        if (unlocked && onAchievementUnlocked) {
          onAchievementUnlocked('fit-70-percent');
        }
      }
      
    } catch (err) {
      console.error('❌ Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzuji váš byznys...</p>
        </div>
      </div>
    );
  }

  const totalBacklog = backlogItems.jobs.length + backlogItems.pains.length + backlogItems.gains.length;

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Back Button */}
        {onBack && (
          <Button
            onClick={onBack}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na Dashboard
          </Button>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-3 sm:mb-4">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="mb-2 text-gray-900 text-2xl sm:text-3xl">
            🎯 Váš akční plán
          </h1>
          <p className="text-base sm:text-xl text-gray-600">
            Analýza vašeho byznysu + Kam dál
          </p>
          
          {/* 🔄 REFRESH BUTTON */}
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                console.log('🔄 Manual refresh triggered');
                loadData();
              }}
              variant="outline"
              className="gap-2 border-green-500 text-green-700 hover:bg-green-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4" />
                  </motion.div>
                  Načítám...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Obnovit data
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* 1. EKONOMICKÁ ANALÝZA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border-2 border-green-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 rounded-full p-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">💰 Které zdroje příjmů jsou nejúspěšnější?</h2>
              <p className="text-gray-600">Detailní analýza každého zdroje příjmů</p>
            </div>
          </div>

          <div className="space-y-4">
            {segments.slice(0, 3).map((stream, idx) => {
              const margin = stream.revenue > 0 ? Math.round((stream.profit / stream.revenue) * 100) : 0;
              
              // Spočítej SKUTEČNÝ rank podle revenue (ne podle indexu!)
              let rank = 1;
              for (let i = 0; i < idx; i++) {
                if (segments[i].revenue > stream.revenue) {
                  rank++;
                }
              }

              // Medaile podle ranku (ne indexu!)
              const medal = rank === 1 ? '🏆' : rank === 2 ? '🥈' : '🥉';
              const isTopRank = rank === 1;
              
              return (
                <motion.div
                  key={stream.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className={`p-4 sm:p-6 rounded-xl border-2 ${
                    isTopRank
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{medal}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          #{rank} {stream.name}
                          {idx > 0 && segments[idx - 1].revenue === stream.revenue && (
                            <span className="text-sm text-gray-500 ml-2">(shodné)</span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Marže: <span className={`font-bold ${margin > 30 ? 'text-green-600' : margin > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {margin}%
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Příjem měsíčně</p>
                      <p className="text-xl font-bold text-green-600">
                        {Math.round(stream.revenue).toLocaleString()} Kč
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Zisk měsíčně</p>
                      <p className={`text-xl font-bold ${stream.profit > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {Math.round(stream.profit).toLocaleString()} Kč
                      </p>
                    </div>
                  </div>

                  {isTopRank && margin > 20 && (
                    <div className="mt-4 bg-green-100 rounded-lg p-3 border border-green-300">
                      <p className="text-sm font-bold text-green-900 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        TOP příjem! Zaměřte marketingové úsilí sem.
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 2. RANKING SEGMENTŮ */}
        {segmentRankings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border-2 border-purple-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500 rounded-full p-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900">📊 Jaký segment je nejlepší?</h2>
                <p className="text-gray-600">Podle Modulu 2 - Lekce 2: Prosperuje váš model?</p>
              </div>
            </div>

            <div className="space-y-4">
              {segmentRankings.slice(0, 3).map((segment, idx) => {
                const completion = segment.targetCustomers > 0 
                  ? Math.round((segment.currentCustomers / segment.targetCustomers) * 100)
                  : 0;

                // Spočítej SKUTEČNÝ rank podle hodnoty (ne podle indexu!)
                let rank = 1;
                for (let i = 0; i < idx; i++) {
                  if (segmentRankings[i].potentialRevenue > segment.potentialRevenue) {
                    rank++;
                  }
                }

                // Medaile podle ranku (ne indexu!)
                const medal = rank === 1 ? '🏆' : rank === 2 ? '🥈' : '🥉';
                const isTopRank = rank === 1;

                return (
                  <motion.div
                    key={segment.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className={`p-6 rounded-xl border-2 ${
                      isTopRank
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{medal}</span>
                        <div>
                          <h3 className="text-gray-900">
                            #{rank} {segment.name}
                            {idx > 0 && segmentRankings[idx - 1].potentialRevenue === segment.potentialRevenue && (
                              <span className="text-sm text-gray-500 ml-2">(shodné)</span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {segment.currentCustomers} zákazníků · Průměrná útrata {segment.avgSpend.toLocaleString()} Kč
                          </p>
                        </div>
                      </div>
                      {isTopRank && (
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          TOP PRIORITA
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Aktuální příjem</p>
                        <p className="text-lg font-bold text-blue-600">
                          {Math.round(segment.currentRevenue).toLocaleString()} Kč/měsíc
                        </p>
                        <p className="text-xs text-gray-500">
                          {segment.currentCustomers} zákazníků
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Potenciální příjem</p>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(segment.potentialRevenue).toLocaleString()} Kč/měsíc
                        </p>
                        <p className="text-xs text-gray-500">
                          při {segment.targetCustomers} zákaznících
                        </p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Dosažení cíle</span>
                        <span className="font-bold">{completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            completion >= 80 ? 'bg-green-500' : 
                            completion >= 50 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                    </div>

                    {isTopRank && segment.potentialRevenue > segment.currentRevenue && (
                      <div className="bg-purple-100 rounded-lg p-3 border border-purple-300">
                        <p className="text-sm font-bold text-purple-900 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Nejvyšší potenciál! Získejte dalších {segment.targetCustomers - segment.currentCustomers} zákazníků = +{Math.round(segment.potentialRevenue - segment.currentRevenue).toLocaleString()} Kč/měsíc
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 3. TOP PRIORITY */}
        {segmentRankings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border-2 border-blue-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 rounded-full p-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  🎯 Zaměřte se na: {segmentRankings[0].name}
                </h2>
                <p className="text-gray-600">
                  {segmentRankings[0].name === fitSegment 
                    ? 'Co zákazníci z tohoto segmentu potřebují'
                    : `Nemáte FIT data pro TOP segment "${segmentRankings[0].name}"`}
                </p>
              </div>
            </div>

            {(segmentRankings[0].name === fitSegment && (topJobs.length > 0 || topPains.length > 0 || topGains.length > 0)) ? (
            <>
              {/* PROČ TENTO SEGMENT? */}
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Proč tento segment?
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Nejvyšší potenciál:</span> {Math.round(segmentRankings[0].potentialRevenue).toLocaleString()} Kč/měsíc
                    </p>
                  </div>
                  {segmentRankings[0].name === fitSegment && (
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✅</span>
                      <p className="text-sm text-gray-700">
                        <span className="font-bold">Máte FIT data:</span> Víte přesně co potřebují
                      </p>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✅</span>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Jasný směr:</span> Zaměřte všechny aktivity na tento segment
                    </p>
                  </div>
                </div>
              </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {/* Jobs */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 sm:p-6 border-2 border-orange-200">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-orange-900">Jobs</h3>
                </div>
                <p className="text-sm text-orange-700 mb-3">Co nejčastěji řeší:</p>
                <div className="space-y-2">
                  {topJobs.map((job, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-gray-900 flex-1">
                          {idx + 1}. {job.text}
                        </p>
                        <span className="text-sm font-bold text-orange-600 flex-shrink-0">
                          {job.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pains */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 sm:p-6 border-2 border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-red-900">Pains</h3>
                </div>
                <p className="text-sm text-red-700 mb-3">Co je nejvíc trápí:</p>
                <div className="space-y-2">
                  {topPains.map((pain, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-gray-900 flex-1">
                          {idx + 1}. {pain.text}
                        </p>
                        <span className="text-sm font-bold text-red-600 flex-shrink-0">
                          {pain.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gains */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-900">Gains</h3>
                </div>
                <p className="text-sm text-green-700 mb-3">Co nejvíc chtějí:</p>
                <div className="space-y-2">
                  {topGains.map((gain, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-gray-900 flex-1">
                          {idx + 1}. {gain.text}
                        </p>
                        <span className="text-sm font-bold text-green-600 flex-shrink-0">
                          {gain.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-gray-200">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="font-bold text-gray-900 mb-2">
                  Nemáte FIT data pro TOP segment &quot;{segmentRankings[0].name}&quot;
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  Dokončete FIT Validator (Modul 3, Lekce 16) a vyberte segment &quot;{segmentRankings[0].name}&quot;
                </p>
                {onNavigateToLesson && (
                  <Button onClick={() => onNavigateToLesson(16)} variant="outline">
                    Přejít na FIT Validator →
                  </Button>
                )}
            </div>
          )}
          </motion.div>
        )}

        {/* 4. PRODUKTOVÁ ANALÝZA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border-2 border-purple-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-500 rounded-full p-3">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">📦 Produktová analýza</h2>
              <p className="text-gray-600">
                {segmentRankings.length > 0 
                  ? `Produkty/hodnoty pro TOP segment: ${segmentRankings[0].name}`
                  : 'Jak dobře vaše produkty řeší TOP priority?'}
              </p>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="space-y-4">
              {products.slice(0, 3).map((product, idx) => {
                // Spočítej SKUTEČNÝ rank podle FIT score a revenue (ne podle indexu!)
                let rank = 1;
                for (let i = 0; i < idx; i++) {
                  const prevProduct = products[i] as any;
                  const currentProduct = product as any;
                  
                  // Porovnej podle statusu → FIT score → revenue
                  const statusOrder = { good: 0, warning: 1, bad: 2 };
                  if (statusOrder[prevProduct.status] < statusOrder[currentProduct.status]) {
                    rank++;
                  } else if (
                    statusOrder[prevProduct.status] === statusOrder[currentProduct.status] &&
                    prevProduct._fitScore > currentProduct._fitScore
                  ) {
                    rank++;
                  } else if (
                    statusOrder[prevProduct.status] === statusOrder[currentProduct.status] &&
                    prevProduct._fitScore === currentProduct._fitScore &&
                    prevProduct._revenue > currentProduct._revenue
                  ) {
                    rank++;
                  }
                }

                const isTopRank = rank === 1;

                return (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className={`p-4 rounded-xl border-2 ${
                      product.status === 'good'
                        ? 'bg-green-50 border-green-300'
                        : product.status === 'warning'
                        ? 'bg-yellow-50 border-yellow-300'
                        : 'bg-red-50 border-red-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {isTopRank && product.status === 'good' ? '🏆' : product.status === 'good' ? '✅' : product.status === 'warning' ? '⚠️' : '❌'}
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900">{product.name}</h3>
                          <p className="text-xs text-gray-600">
                            {(product as any).segment && `Pro segment: ${(product as any).segment}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {isTopRank && product.status === 'good' && (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            TOP PRODUKT
                          </span>
                        )}
                        <span className={`text-2xl font-bold ${
                          product.status === 'good' ? 'text-green-600' : 
                          product.status === 'warning' ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {(product as any)._fitScore || 0}%
                        </span>
                        <span className="text-xs text-gray-500">FIT Score</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{product.reason}</p>
                    <p className="text-sm font-bold text-gray-900">💡 {product.action}</p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              {segmentRankings.length > 0 ? (
                <>
                  <p className="font-bold text-gray-700 mb-2">
                    Nemáte FIT data pro TOP segment "{segmentRankings[0].name}"
                  </p>
                  <p className="text-sm">
                    Dokončete FIT Validator (Modul 3, Lekce 16) a vyberte segment "{segmentRankings[0].name}"
                  </p>
                </>
              ) : (
                <p>Dokončete FIT Validator pro analýzu produktů</p>
              )}
            </div>
          )}
        </motion.div>

        {/* 4. AKČNÍ PLÁN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border-2 border-orange-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 rounded-full p-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="mb-0 text-gray-900">✅ Váš akční plán</h2>
              <p className="text-gray-600">Zaměřte se na TOP segment a jejich priority</p>
            </div>
          </div>

          {actionItems.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center border-2 border-orange-200">
              <p className="text-gray-900 mb-2 font-medium">🚀 Začněte vyplňovat data v kurzu abychom mohli vytvořit váš akční plán!</p>
              <p className="text-sm text-gray-600">Dokončete FIT Validator (Modul 3) a ProfitCalculator (Modul 2)</p>
            </div>
          ) : (
            <div className="space-y-3">
              {actionItems.map((action) => {
              const isCompleted = completedActions.has(action.id);
              
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-xl transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300'
                      : 'bg-white border-2 border-orange-200 hover:border-orange-300 hover:shadow-md'
                  }`}
                  onClick={() => toggleAction(action.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-green-500 border-green-400'
                          : 'border-orange-400 bg-white'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-medium text-gray-900 ${isCompleted ? 'line-through opacity-75' : ''}`}>
                        {action.text}
                      </p>
                      {action.deadline && (
                        <p className="text-sm text-orange-600 mt-1 font-medium">
                          📅 Deadline: {action.deadline}
                        </p>
                      )}
                      {action.tip && !isCompleted && (
                        <p className="text-sm text-gray-700 mt-2 bg-yellow-50 rounded-lg p-2 border border-yellow-200">
                          {action.tip}
                        </p>
                      )}
                      {action.lessonId && onNavigateToLesson && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToLesson(action.lessonId!);
                          }}
                          className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1 mt-1 font-medium"
                        >
                          <Edit className="w-3 h-3" />
                          Upravit v {action.lessonName}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </div>
          )}

          {/* Backlog */}
          {totalBacklog > 0 && (
            <div className="mt-6">
              <button
                onClick={() => setShowBacklog(!showBacklog)}
                className="w-full bg-white hover:bg-gray-50 rounded-xl p-4 flex items-center justify-between transition-all border-2 border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">📋 Backlog ({totalBacklog} položek)</span>
                  <span className="text-sm text-gray-600">Řešte později</span>
                </div>
                {showBacklog ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
              </button>

              {showBacklog && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-4"
                >
                  {backlogItems.jobs.length > 0 && (
                    <div className="bg-white rounded-xl p-4 border-2 border-orange-200">
                      <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900">
                        <Target className="w-4 h-4 text-orange-600" />
                        Jobs ({backlogItems.jobs.length})
                      </h4>
                      <div className="space-y-1">
                        {backlogItems.jobs.map((job, idx) => (
                          <p key={idx} className="text-sm text-gray-700">
                            • {job.text} ({job.percentage}%)
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {backlogItems.pains.length > 0 && (
                    <div className="bg-white rounded-xl p-4 border-2 border-red-200">
                      <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        Pains ({backlogItems.pains.length})
                      </h4>
                      <div className="space-y-1">
                        {backlogItems.pains.map((pain, idx) => (
                          <p key={idx} className="text-sm text-gray-700">
                            • {pain.text} ({pain.percentage}%)
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {backlogItems.gains.length > 0 && (
                    <div className="bg-white rounded-xl p-4 border-2 border-green-200">
                      <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900">
                        <Star className="w-4 h-4 text-green-600" />
                        Gains ({backlogItems.gains.length})
                      </h4>
                      <div className="space-y-1">
                        {backlogItems.gains.map((gain, idx) => (
                          <p key={idx} className="text-sm text-gray-700">
                            • {gain.text} ({gain.percentage}%)
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-center text-white"
        >
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="text-3xl font-bold mb-2">Jste připraveni!</h3>
          <p className="text-xl text-green-100 mb-6">
            Máte jasný plán. Teď je čas jít do akce!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {onBack && (
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 gap-2"
                onClick={onBack}
              >
                Zpět na Dashboard
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
