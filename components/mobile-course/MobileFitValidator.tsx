/**
 * 📱 MOBILE FIT VALIDATOR (Lekce 16)
 * 
 * PŘESNÁ KOPIE DESKTOP LOGIKY s mobilním UI/UX!
 * 
 * 3 KROKY (jako desktop):
 * 1. DISCOVERY: Načti Customer Profile data
 * 2. PRIORITIZATION: Přidej count + percentage
 * 3. VALIDATION: Pokryj Value Map
 */

import { useState, useEffect, useMemo, useRef } from "react";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Target,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Plus,
  X,
  Info
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { haptic } from "../../lib/haptics";
import { MobileFitStepInstructions } from "./MobileFitStepInstructions";

interface Props {
  userId: string;
  selectedSegment?: string;
  onComplete?: (fitScore: number) => void;
  onAchievementUnlocked?: (achievementId: string) => void;
  onNavigateToTool?: (toolId: string) => void;
  onNavigateToLesson?: (lessonId: number) => void;
}

interface VPCItem {
  id: string;
  text: string;
  priority?: number;
  count?: number;
  percentage?: number;
}

interface ValueMapItem {
  text: string;
  color: string;
}

export function MobileFitValidator({ 
  userId, 
  selectedSegment, 
  onComplete,
  onAchievementUnlocked,
  onNavigateToTool,
  onNavigateToLesson
}: Props) {
  // 📍 STEP STATE (1, 2, 3)
  const [currentStep, setCurrentStep] = useState(1);
  
  // 📊 VPC DATA
  const [jobs, setJobs] = useState<VPCItem[]>([]);
  const [pains, setPains] = useState<VPCItem[]>([]);
  const [gains, setGains] = useState<VPCItem[]>([]);
  const [products, setProducts] = useState<ValueMapItem[]>([]);
  const [painRelievers, setPainRelievers] = useState<ValueMapItem[]>([]);
  const [gainCreators, setGainCreators] = useState<ValueMapItem[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  
  // 🎯 PRIORITIZATION STATE
  const [totalRespondents, setTotalRespondents] = useState(10);
  
  // 🔗 MAPPINGS (Step 3)
  const [painRelieverMappings, setPainRelieverMappings] = useState<Record<string, string[]>>({});
  const [gainCreatorMappings, setGainCreatorMappings] = useState<Record<string, string[]>>({});
  const [productMappings, setProductMappings] = useState<Record<string, string[]>>({});
  
  // 💾 Auto-save timer
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // 📊 FIT SCORE CALCULATION (stejný jako desktop)
  const fitScoreData = useMemo(() => {
    // Top 3 items podle percentage
    const topJobs = jobs
      .filter(j => (j.percentage || 0) > 0)
      .sort((a, b) => (b.percentage || 0) - (a.percentage || 0))
      .slice(0, 3);
    
    const topPains = pains
      .filter(p => (p.percentage || 0) > 0)
      .sort((a, b) => (b.percentage || 0) - (a.percentage || 0))
      .slice(0, 3);
    
    const topGains = gains
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
    
    const coveredPainsCount = topPains.filter(p => coveredPainIds.has(p.id)).length;
    const coveredGainsCount = topGains.filter(g => coveredGainIds.has(g.id)).length;
    const coveredJobsCount = topJobs.filter(j => coveredJobIds.has(j.id)).length;
    
    // Výpočet FIT Score (Pains 40%, Gains 40%, Jobs 20%)
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
    
    const fitScore = totalWeight > 0 ? Math.round((achievedScore / totalWeight) * 100) : 0;
    
    return {
      fitScore,
      topJobs,
      topPains,
      topGains,
      coveredJobsCount,
      coveredPainsCount,
      coveredGainsCount,
      totalTopItems: topJobs.length + topPains.length + topGains.length,
      coveredCount: coveredJobsCount + coveredPainsCount + coveredGainsCount
    };
  }, [jobs, pains, gains, productMappings, painRelieverMappings, gainCreatorMappings]);
  
  // 🏆 TRIGGER FIT SCORE ACHIEVEMENTS (stejný jako desktop FitValidatorV2)
  useEffect(() => {
    if (fitScoreData.fitScore > 0 && !isLoading && onAchievementUnlocked) {
      // ✅ Použij samostatné IF bloky aby se spustily VŠECHNY dosažené levely!
      if (fitScoreData.fitScore >= 70) {
        console.log('🎯 [Mobile] FIT Score 70%+ reached! Triggering achievement...');
        onAchievementUnlocked('fit-70-percent');
      }
      if (fitScoreData.fitScore >= 80) {
        console.log('🎯 [Mobile] FIT Score 80%+ reached! Triggering achievement...');
        onAchievementUnlocked('product-fit-master');
      }
      if (fitScoreData.fitScore >= 90) {
        console.log('🎯 [Mobile] FIT Score 90%+ reached! Triggering achievement...');
        onAchievementUnlocked('fit-90-percent');
      }
    }
  }, [fitScoreData.fitScore, isLoading, onAchievementUnlocked]);
  
  // 💾 SAVE FIT PROGRESS (stejný jako desktop)
  const saveFitProgress = async () => {
    if (!userId || !selectedSegment) return;
    
    try {
      const progressData = {
        totalRespondents,
        currentStep,
        lastSaved: new Date().toISOString(),
        fitScore: fitScoreData.fitScore,
        jobs: jobs.map(j => ({ 
          id: j.id,
          text: j.text, 
          count: j.count || 0, 
          percentage: j.percentage || 0, 
          priority: j.priority || 0 
        })),
        pains: pains.map(p => ({ 
          id: p.id,
          text: p.text, 
          count: p.count || 0, 
          percentage: p.percentage || 0, 
          priority: p.priority || 0 
        })),
        gains: gains.map(g => ({ 
          id: g.id,
          text: g.text, 
          count: g.count || 0, 
          percentage: g.percentage || 0, 
          priority: g.priority || 0 
        })),
        // ✅ Ulož i Value Map data pro detekci změn
        products: products.map(p => ({ text: p.text, color: p.color })),
        painRelievers: painRelievers.map(pr => ({ text: pr.text, color: pr.color })),
        gainCreators: gainCreators.map(gc => ({ text: gc.text, color: gc.color })),
        painRelieverMappings,
        gainCreatorMappings,
        productMappings
      };
      
      // Najdi záznam pro tento segment
      const { data: existing, error: fetchError } = await supabase
        .from('value_proposition_canvas')
        .select('id')
        .eq('user_id', userId)
        .eq('segment_name', selectedSegment)
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
        console.log('✅ FIT progress saved');
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
  
  // ⏰ Auto-save on changes
  useEffect(() => {
    if (currentStep > 1) {
      debouncedSave();
    }
  }, [jobs, pains, gains, totalRespondents, productMappings, painRelieverMappings, gainCreatorMappings, currentStep]);
  
  // 📥 LOAD DATA (Step 1)
  useEffect(() => {
    const loadData = async () => {
      if (!userId || !selectedSegment) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Load ALL rows for this segment (může být víc value map)
        const { data, error } = await supabase
          .from('value_proposition_canvas')
          .select('*')
          .eq('user_id', userId)
          .eq('segment_name', selectedSegment);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Merge data from all rows
          let allJobs: any[] = [];
          let allPains: any[] = [];
          let allGains: any[] = [];
          let allProducts: ValueMapItem[] = [];
          let allPainRelievers: ValueMapItem[] = [];
          let allGainCreators: ValueMapItem[] = [];
          let savedProgress: any = null;
          
          data.forEach(row => {
            allJobs = [...allJobs, ...(row.jobs || [])];
            allPains = [...allPains, ...(row.pains || [])];
            allGains = [...allGains, ...(row.gains || [])];
            allProducts = [...allProducts, ...(row.products || [])];
            allPainRelievers = [...allPainRelievers, ...(row.pain_relievers || [])];
            allGainCreators = [...allGainCreators, ...(row.gain_creators || [])];
            
            // Load saved FIT progress (from row without selected_value)
            if (!row.selected_value && row.fit_validation_data) {
              savedProgress = row.fit_validation_data;
            }
          });
          
          // Remove duplicates (by text)
          const uniqueJobs = Array.from(new Map(allJobs.map(j => [j.text || j, j])).values());
          const uniquePains = Array.from(new Map(allPains.map(p => [p.text || p, p])).values());
          const uniqueGains = Array.from(new Map(allGains.map(g => [g.text || g, g])).values());
          const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.text, p])).values());
          const uniquePainRelievers = Array.from(new Map(allPainRelievers.map(p => [p.text, p])).values());
          const uniqueGainCreators = Array.from(new Map(allGainCreators.map(g => [g.text, g])).values());
          
          // Convert to VPCItem format
          const convertToVPCItem = (item: any, index: number, category: string): VPCItem => ({
            id: `${category}-${index}`,
            text: typeof item === 'string' ? item : item.text,
            count: item.count || 0,
            percentage: item.percentage || 0,
            priority: item.priority || index
          });
          
          setJobs(uniqueJobs.map((j, i) => convertToVPCItem(j, i, 'job')));
          setPains(uniquePains.map((p, i) => convertToVPCItem(p, i, 'pain')));
          setGains(uniqueGains.map((g, i) => convertToVPCItem(g, i, 'gain')));
          setProducts(uniqueProducts);
          setPainRelievers(uniquePainRelievers);
          setGainCreators(uniqueGainCreators);
          
          // Restore saved progress
          if (savedProgress) {
            setTotalRespondents(savedProgress.totalRespondents || 10);
            setCurrentStep(savedProgress.currentStep || 1);
            
            // 🔄 ID MIGRATION: Desktop používá jiná ID než mobile!
            // Desktop: `job-text-slug-0`, Mobile: `job-0`
            // Musíme migrovat ID podle textu
            
            const oldToNewJobIds: Record<string, string> = {};
            if (savedProgress.jobs) {
              savedProgress.jobs.forEach((oldJob: any, index: number) => {
                const oldId = oldJob.id || `job-${index}`;
                const newItem = uniqueJobs.find((j: any) => {
                  const jText = typeof j === 'string' ? j : j.text;
                  return jText === oldJob.text;
                });
                if (newItem) {
                  const newIndex = uniqueJobs.indexOf(newItem);
                  oldToNewJobIds[oldId] = `job-${newIndex}`;
                }
              });
            }
            
            const oldToNewPainIds: Record<string, string> = {};
            if (savedProgress.pains) {
              savedProgress.pains.forEach((oldPain: any, index: number) => {
                const oldId = oldPain.id || `pain-${index}`;
                const newItem = uniquePains.find((p: any) => {
                  const pText = typeof p === 'string' ? p : p.text;
                  return pText === oldPain.text;
                });
                if (newItem) {
                  const newIndex = uniquePains.indexOf(newItem);
                  oldToNewPainIds[oldId] = `pain-${newIndex}`;
                }
              });
            }
            
            const oldToNewGainIds: Record<string, string> = {};
            if (savedProgress.gains) {
              savedProgress.gains.forEach((oldGain: any, index: number) => {
                const oldId = oldGain.id || `gain-${index}`;
                const newItem = uniqueGains.find((g: any) => {
                  const gText = typeof g === 'string' ? g : g.text;
                  return gText === oldGain.text;
                });
                if (newItem) {
                  const newIndex = uniqueGains.indexOf(newItem);
                  oldToNewGainIds[oldId] = `gain-${newIndex}`;
                }
              });
            }
            
            console.log('🔄 [Mobile] ID Migration:', { oldToNewJobIds, oldToNewPainIds, oldToNewGainIds });
            
            // ✅ DETEKCE ZMĚN v Customer Profile nebo Value Map
            const jobsChanged = savedProgress.jobs && 
              JSON.stringify(savedProgress.jobs.map((j: any) => j.text).sort()) !== 
              JSON.stringify(uniqueJobs.map((j: any) => typeof j === 'string' ? j : j.text).sort());
            
            const painsChanged = savedProgress.pains && 
              JSON.stringify(savedProgress.pains.map((p: any) => p.text).sort()) !== 
              JSON.stringify(uniquePains.map((p: any) => typeof p === 'string' ? p : p.text).sort());
            
            const gainsChanged = savedProgress.gains && 
              JSON.stringify(savedProgress.gains.map((g: any) => g.text).sort()) !== 
              JSON.stringify(uniqueGains.map((g: any) => typeof g === 'string' ? g : g.text).sort());
            
            // Detekce změn v Value Map (produkty, řešení, přínosy)
            const productsChanged = uniqueProducts.length !== (savedProgress.products?.length || 0);
            const painRelieversChanged = uniquePainRelievers.length !== (savedProgress.painRelievers?.length || 0);
            const gainCreatorsChanged = uniqueGainCreators.length !== (savedProgress.gainCreators?.length || 0);
            
            if (jobsChanged || painsChanged || gainsChanged || productsChanged || painRelieversChanged || gainCreatorsChanged) {
              console.log('🔄 [Mobile] DETEKOVÁNA ZMĚNA v datech!', {
                jobsChanged,
                painsChanged,
                gainsChanged,
                productsChanged,
                painRelieversChanged,
                gainCreatorsChanged
              });
              
              // Vymaž mappings - jsou neplatné!
              setPainRelieverMappings({});
              setGainCreatorMappings({});
              setProductMappings({});
              
              toast.info('🔄 Detekována změna v datech - FIT propojení byla resetována');
            } else {
              // 🔄 Migruj mappings s novými ID (žádná změna dat)
              if (savedProgress.painRelieverMappings) {
                const migratedMappings: Record<string, string[]> = {};
                Object.entries(savedProgress.painRelieverMappings).forEach(([reliever, oldPainIds]) => {
                  migratedMappings[reliever] = (oldPainIds as string[])
                    .map(oldId => oldToNewPainIds[oldId] || oldId)
                    .filter(id => uniquePains.some((p, i) => `pain-${i}` === id));
                });
                setPainRelieverMappings(migratedMappings);
                console.log('✅ [Mobile] Pain reliever mappings migrated:', migratedMappings);
              }
              
              if (savedProgress.gainCreatorMappings) {
                const migratedMappings: Record<string, string[]> = {};
                Object.entries(savedProgress.gainCreatorMappings).forEach(([creator, oldGainIds]) => {
                  migratedMappings[creator] = (oldGainIds as string[])
                    .map(oldId => oldToNewGainIds[oldId] || oldId)
                    .filter(id => uniqueGains.some((g, i) => `gain-${i}` === id));
                });
                setGainCreatorMappings(migratedMappings);
                console.log('✅ [Mobile] Gain creator mappings migrated:', migratedMappings);
              }
              
              if (savedProgress.productMappings) {
                const migratedMappings: Record<string, string[]> = {};
                Object.entries(savedProgress.productMappings).forEach(([product, oldJobIds]) => {
                  migratedMappings[product] = (oldJobIds as string[])
                    .map(oldId => oldToNewJobIds[oldId] || oldId)
                    .filter(id => uniqueJobs.some((j, i) => `job-${i}` === id));
                });
                setProductMappings(migratedMappings);
                console.log('✅ [Mobile] Product mappings migrated:', migratedMappings);
              }
            }
            
            // Restore priority data
            if (savedProgress.jobs) {
              setJobs(prev => prev.map(j => {
                const saved = savedProgress.jobs.find((sj: any) => sj.text === j.text);
                return saved ? { ...j, count: saved.count, percentage: saved.percentage, priority: saved.priority } : j;
              }));
            }
            if (savedProgress.pains) {
              setPains(prev => prev.map(p => {
                const saved = savedProgress.pains.find((sp: any) => sp.text === p.text);
                return saved ? { ...p, count: saved.count, percentage: saved.percentage, priority: saved.priority } : p;
              }));
            }
            if (savedProgress.gains) {
              setGains(prev => prev.map(g => {
                const saved = savedProgress.gains.find((sg: any) => sg.text === g.text);
                return saved ? { ...g, count: saved.count, percentage: saved.percentage, priority: saved.priority } : g;
              }));
            }
            
            console.log('✅ FIT progress restored (with ID migration)');
          }
          
          console.log('✅ FIT Validator loaded data for segment:', selectedSegment);
        }
      } catch (err) {
        console.error('Error loading VPC data:', err);
        toast.error('❌ Chyba při načítání dat');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [userId, selectedSegment]);
  
  // 🎯 UPDATE COUNT (Step 2)
  const updateCount = (category: 'jobs' | 'pains' | 'gains', id: string, newCount: number) => {
    const setter = category === 'jobs' ? setJobs : category === 'pains' ? setPains : setGains;
    
    setter(prev => prev.map(item => {
      if (item.id === id) {
        const percentage = totalRespondents > 0 ? Math.round((newCount / totalRespondents) * 100) : 0;
        return { ...item, count: newCount, percentage };
      }
      return item;
    }));
    
    haptic('light');
  };
  
  // 🔗 TOGGLE MAPPING (Step 3)
  const toggleMapping = (solutionType: 'products' | 'painRelievers' | 'gainCreators', solutionText: string, itemId: string) => {
    const mappingSetter = solutionType === 'products' ? setProductMappings 
                       : solutionType === 'painRelievers' ? setPainRelieverMappings 
                       : setGainCreatorMappings;
    
    mappingSetter(prev => {
      const current = prev[solutionText] || [];
      const isCurrentlyMapped = current.includes(itemId);
      
      if (isCurrentlyMapped) {
        // Remove mapping
        const newMappings = current.filter(id => id !== itemId);
        return newMappings.length > 0 
          ? { ...prev, [solutionText]: newMappings }
          : Object.fromEntries(Object.entries(prev).filter(([k]) => k !== solutionText));
      } else {
        // Add mapping
        return { ...prev, [solutionText]: [...current, itemId] };
      }
    });
    
    haptic('light');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }
  
  // ✅ KONTROLA: Existují data?
  const hasValueMapData = products.length > 0 || painRelievers.length > 0 || gainCreators.length > 0;
  const hasCustomerProfileData = jobs.length > 0 || pains.length > 0 || gains.length > 0;
  
  // ✅ Zobraz čitelný název segmentu (fallback pro prázdný/undefined)
  const displaySegment = selectedSegment || 'váš segment';
  
  // ✅ BLOKUJ pokud nemá Value Map data (bez ohledu na Customer Profile)
  if (!hasValueMapData) {
    return (
      <div className="p-4 pb-20">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Chybí Hodnotová mapa!
          </h2>
          <p className="text-gray-700 mb-6">
            Pro validaci FIT musíte nejdříve vytvořit hodnotovou mapu v <strong>Modulu 2</strong>.
          </p>
          
          <div className="bg-white rounded-xl p-4 mb-6 text-left border-2 border-red-300">
            <h3 className="font-bold text-gray-900 mb-2 text-sm">
              📋 Co je potřeba udělat?
            </h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>Přejděte do <strong>Modulu 2: Hodnotová mapa</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>Vyberte hodnotu pro segment <strong className="text-blue-600">{displaySegment}</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span>Vytvořte produkty, řešení bolestí a tvůrce přínosů</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">4.</span>
                <span>Vraťte se sem pro FIT validaci</span>
              </li>
            </ol>
          </div>
          
          <button
            onClick={() => {
              if (onNavigateToTool) {
                onNavigateToTool('vpc-value-map');
              } else {
                toast.info('💡 Přejděte do Modulu 2');
              }
              haptic('medium');
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Přejít do Modulu 2
          </button>
        </div>
      </div>
    );
  }
  
  // Pokud nemá ani Customer Profile (edge case)
  if (!hasCustomerProfileData) {
    return (
      <div className="p-4 pb-20">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Chybí Zákaznický profil!
          </h2>
          <p className="text-gray-700 mb-6">
            Pro segment <strong className="text-blue-600">{displaySegment}</strong> nemáte vytvořený zákaznický profil.
          </p>
          
          <div className="bg-white rounded-xl p-4 mb-6 text-left border-2 border-yellow-300">
            <h3 className="font-bold text-gray-900 mb-2 text-sm">
              📋 Co je potřeba udělat?
            </h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>Vytvořte <strong>Zákaznický profil</strong> (Modul 1)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>Vraťte se sem pro FIT validaci</span>
              </li>
            </ol>
          </div>
          
          <button
            onClick={() => {
              if (onNavigateToTool) {
                onNavigateToTool('vpc-customer-profile');
              } else {
                toast.info('💡 Přejděte do Modulu 1');
              }
              haptic('medium');
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Přejít do Modulu 1
          </button>
        </div>
      </div>
    );
  }
  
  // ❌ STARÁ LOGIKA - smazána protože je redundantní
  // Pokud nemá žádná data, zobraz prázdný stát
  if (false && !hasValueMapData && !hasCustomerProfileData) {
    return (
      <div className="p-4 pb-20">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Chybí data pro FIT validaci!
          </h2>
          <p className="text-gray-700 mb-6">
            Pro segment <strong className="text-blue-600">{displaySegment}</strong> nemáte vytvořená potřebná data.
          </p>
          
          <div className="bg-white rounded-xl p-4 mb-6 text-left border-2 border-yellow-300">
            <h3 className="font-bold text-gray-900 mb-2 text-sm">
              📋 Co je potřeba udělat?
            </h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>Vytvořte <strong>Zákaznický profil</strong> (Modul 1)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>Vytvořte <strong>Hodnotovou mapu</strong> (Modul 2)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span>Vraťte se sem pro FIT validaci</span>
              </li>
            </ol>
          </div>
          
          <button
            onClick={() => {
              if (onNavigateToTool) {
                onNavigateToTool('vpc-customer-profile');
              } else {
                toast.info('💡 Přejděte do Modulu 1');
              }
              haptic('medium');
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Přejít do Modulu 1
          </button>
        </div>
      </div>
    );
  }
  
  // Pokud má Customer Profile ale ne Value Map, upozorni
  if (!hasValueMapData && hasCustomerProfileData) {
    return (
      <div className="p-4 pb-20">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-4">💡</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Chybí Hodnotová mapa!
          </h2>
          <p className="text-gray-700 mb-6">
            Máte vytvořený zákaznický profil, ale chybí hodnotová mapa pro segment <strong className="text-blue-600">{displaySegment}</strong>.
          </p>
          
          <div className="bg-white rounded-xl p-4 mb-6 text-left border-2 border-yellow-300">
            <h3 className="font-bold text-gray-900 mb-2 text-sm">
              📋 Co je potřeba udělat?
            </h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>Přejděte do <strong>Modulu 2: Hodnotová mapa</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>Vytvořte produkty a řešení</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span>Vraťte se sem pro FIT validaci</span>
              </li>
            </ol>
          </div>
          
          <button
            onClick={() => {
              if (onNavigateToTool) {
                onNavigateToTool('vpc-value-map');
              } else {
                toast.info('💡 Přejděte do Modulu 2');
              }
              haptic('medium');
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Přejít do Modulu 2
          </button>
        </div>
      </div>
    );
  }
  
  // 📝 Dynamické nadpisy podle kroku
  const stepTitles = {
    1: '🔍 Krok 1: Průzkum zákazníka',
    2: '📊 Krok 2: Prioritizace potřeb',
    3: '🎯 Krok 3: Mapování řešení'
  };
  
  return (
    <div className="space-y-4 pb-20">
      {/* 📍 STEP HEADER - Dynamický nadpis */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4">
        <h2 className="font-bold">{stepTitles[currentStep as keyof typeof stepTitles]}</h2>
        <p className="text-sm text-white/90 mt-1">
          {currentStep === 1 && 'Načtěte data z vašeho zákaznického profilu'}
          {currentStep === 2 && 'Ohodnoťte důležitost jednotlivých potřeb'}
          {currentStep === 3 && 'Propojte řešení s prioritami zákazníka'}
        </p>
      </div>
      
      {/* 📍 STEP PROGRESS */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {currentStep > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
          </div>
          <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {currentStep > 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
          </div>
          <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {currentStep > 3 ? <CheckCircle2 className="w-5 h-5" /> : '3'}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Průzkum</span>
          <span>Prioritizace</span>
          <span>Mapování</span>
        </div>
      </div>
      
      {/* 📍 STEP 1: DISCOVERY */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <MobileFitStepInstructions step={1} />
          
          {/* DATA SUMMARY */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 text-center">
              <Target className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
              <div className="font-bold text-yellow-900">{jobs.length}</div>
              <div className="text-xs text-yellow-700">Cílů</div>
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 text-center">
              <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <div className="font-bold text-red-900">{pains.length}</div>
              <div className="text-xs text-red-700">Obav</div>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 text-center">
              <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="font-bold text-green-900">{gains.length}</div>
              <div className="text-xs text-green-700">Očekávání</div>
            </div>
          </div>
          
          {/* ITEM LISTS */}
          {jobs.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-900 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Důvod návštěvy:
              </h4>
              {jobs.map(job => (
                <div key={job.id} className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                  <p className="text-sm text-yellow-900">{job.text}</p>
                </div>
              ))}
            </div>
          )}
          
          {pains.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-red-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Obavy zákazníka:
              </h4>
              {pains.map(pain => (
                <div key={pain.id} className="bg-red-50 border border-red-300 rounded-lg p-3">
                  <p className="text-sm text-red-900">{pain.text}</p>
                </div>
              ))}
            </div>
          )}
          
          {gains.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-green-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Očekávání zákazníka:
              </h4>
              {gains.map(gain => (
                <div key={gain.id} className="bg-green-50 border border-green-300 rounded-lg p-3">
                  <p className="text-sm text-green-900">{gain.text}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* NEXT BUTTON */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => {
                haptic('medium');
                setCurrentStep(2);
              }}
              disabled={jobs.length === 0 && pains.length === 0 && gains.length === 0}
              className="flex items-center gap-2"
            >
              Pokračovat na prioritizaci
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* 📍 STEP 2: PRIORITIZATION */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <MobileFitStepInstructions step={2} />
          
          {/* TOTAL RESPONDENTS */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Celkový počet respondentů:
            </label>
            <input
              type="number"
              value={totalRespondents}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setTotalRespondents(Math.max(1, val));
                haptic('light');
              }}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-lg no-spinner"
              min="1"
            />
            <p className="text-xs text-blue-700 mt-2">
              💡 Kolik lidí jste se zeptali celkem?
            </p>
          </div>
          
          {/* PAINS PRIORITY (nejvyšší váha 40%) */}
          {pains.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-red-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Obavy (40% váha):
              </h4>
              {pains.map(pain => (
                <div key={pain.id} className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
                  <p className="text-sm text-red-900 mb-2">{pain.text}</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={pain.count || 0}
                      onChange={(e) => updateCount('pains', pain.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 border-2 border-red-300 rounded-lg text-center no-spinner"
                      min="0"
                      max={totalRespondents}
                    />
                    <div className="flex-1">
                      <div className="text-sm text-red-700">
                        {pain.percentage || 0}% respondentů
                      </div>
                      <div className="h-2 bg-red-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-red-600 rounded-full transition-all"
                          style={{ width: `${Math.min(100, pain.percentage || 0)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* GAINS PRIORITY (40% váha) */}
          {gains.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-green-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Očekávání (40% váha):
              </h4>
              {gains.map(gain => (
                <div key={gain.id} className="bg-green-50 border-2 border-green-300 rounded-lg p-3">
                  <p className="text-sm text-green-900 mb-2">{gain.text}</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={gain.count || 0}
                      onChange={(e) => updateCount('gains', gain.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 border-2 border-green-300 rounded-lg text-center no-spinner"
                      min="0"
                      max={totalRespondents}
                    />
                    <div className="flex-1">
                      <div className="text-sm text-green-700">
                        {gain.percentage || 0}% respondentů
                      </div>
                      <div className="h-2 bg-green-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-green-600 rounded-full transition-all"
                          style={{ width: `${Math.min(100, gain.percentage || 0)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* JOBS PRIORITY (20% váha) */}
          {jobs.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-900 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Důvod návštěvy (20% váha):
              </h4>
              {jobs.map(job => (
                <div key={job.id} className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3">
                  <p className="text-sm text-yellow-900 mb-2">{job.text}</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={job.count || 0}
                      onChange={(e) => updateCount('jobs', job.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 border-2 border-yellow-300 rounded-lg text-center no-spinner"
                      min="0"
                      max={totalRespondents}
                    />
                    <div className="flex-1">
                      <div className="text-sm text-yellow-700">
                        {job.percentage || 0}% respondentů
                      </div>
                      <div className="h-2 bg-yellow-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-yellow-600 rounded-full transition-all"
                          style={{ width: `${Math.min(100, job.percentage || 0)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* NAVIGATION */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => {
                haptic('light');
                setCurrentStep(1);
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět
            </Button>
            <Button
              onClick={() => {
                haptic('medium');
                setCurrentStep(3);
              }}
              className="flex-1 flex items-center gap-2 justify-center"
            >
              Pokračovat na pokrytí
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* 📍 STEP 3: VALIDATION - COVERAGE MAPPING */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <MobileFitStepInstructions step={3} />
          
          {/* FIT SCORE */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{fitScoreData.fitScore}%</div>
              <div className="text-sm text-blue-100">FIT Score</div>
              <div className="mt-3 text-xs">
                Pokrývá {fitScoreData.coveredCount} z {fitScoreData.totalTopItems} TOP priorit
              </div>
            </div>
          </div>
          
          {/* 💊 PAINS COVERAGE */}
          {fitScoreData.topPains.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-red-300">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-bold text-red-900">😰 Obavy</h4>
                <span className="text-xs text-gray-500 ml-auto">TOP {fitScoreData.topPains.length}</span>
              </div>
              
              {fitScoreData.topPains.map((pain, i) => {
                const mappedRelievers = painRelievers.filter(pr => 
                  (painRelieverMappings[pr.text] || []).includes(pain.id)
                );
                const isCovered = mappedRelievers.length > 0;
                
                return (
                  <div key={pain.id} className="bg-red-50 rounded-lg border-2 border-red-300 p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="font-bold text-red-700 text-sm">#{i + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{pain.text}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 font-bold text-sm">{pain.percentage}%</span>
                          {isCovered && <span className="text-xs text-green-700">✓ Pokryto</span>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Pain Reliever Checkboxes */}
                    {painRelievers.length > 0 ? (
                      <div className="ml-5 pl-3 border-l-2 border-red-300 space-y-1.5">
                        <p className="text-xs text-red-800 font-medium mb-1.5">→ Jak řešíme:</p>
                        {painRelievers.map((reliever, idx) => {
                          const isChecked = (painRelieverMappings[reliever.text] || []).includes(pain.id);
                          return (
                            <label key={idx} className="flex items-start gap-2 cursor-pointer active:bg-red-100 p-1 rounded">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  haptic('light');
                                  const currentMappings = painRelieverMappings[reliever.text] || [];
                                  const newMappings = e.target.checked
                                    ? [...currentMappings, pain.id]
                                    : currentMappings.filter(id => id !== pain.id);
                                  
                                  if (newMappings.length > 0) {
                                    setPainRelieverMappings({
                                      ...painRelieverMappings,
                                      [reliever.text]: newMappings
                                    });
                                  } else {
                                    const updated = { ...painRelieverMappings };
                                    delete updated[reliever.text];
                                    setPainRelieverMappings(updated);
                                  }
                                }}
                                className="mt-0.5 w-4 h-4 text-green-600 rounded"
                              />
                              <span className="text-sm text-gray-700 flex-1">{reliever.text}</span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="ml-5 pl-3 border-l-2 border-red-300">
                        <p className="text-xs text-amber-700">⚠️ Nemáte žádná řešení obav</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* 📈 GAINS COVERAGE */}
          {fitScoreData.topGains.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-green-300">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-green-900">✨ Očekávání</h4>
                <span className="text-xs text-gray-500 ml-auto">TOP {fitScoreData.topGains.length}</span>
              </div>
              
              {fitScoreData.topGains.map((gain, i) => {
                const mappedCreators = gainCreators.filter(gc => 
                  (gainCreatorMappings[gc.text] || []).includes(gain.id)
                );
                const isCovered = mappedCreators.length > 0;
                
                return (
                  <div key={gain.id} className="bg-green-50 rounded-lg border-2 border-green-300 p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="font-bold text-green-700 text-sm">#{i + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{gain.text}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-bold text-sm">{gain.percentage}%</span>
                          {isCovered && <span className="text-xs text-green-700">✓ Pokryto</span>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Gain Creator Checkboxes */}
                    {gainCreators.length > 0 ? (
                      <div className="ml-5 pl-3 border-l-2 border-green-300 space-y-1.5">
                        <p className="text-xs text-green-800 font-medium mb-1.5">→ Jak naplňujeme:</p>
                        {gainCreators.map((creator, idx) => {
                          const isChecked = (gainCreatorMappings[creator.text] || []).includes(gain.id);
                          return (
                            <label key={idx} className="flex items-start gap-2 cursor-pointer active:bg-green-100 p-1 rounded">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  haptic('light');
                                  const currentMappings = gainCreatorMappings[creator.text] || [];
                                  const newMappings = e.target.checked
                                    ? [...currentMappings, gain.id]
                                    : currentMappings.filter(id => id !== gain.id);
                                  
                                  if (newMappings.length > 0) {
                                    setGainCreatorMappings({
                                      ...gainCreatorMappings,
                                      [creator.text]: newMappings
                                    });
                                  } else {
                                    const updated = { ...gainCreatorMappings };
                                    delete updated[creator.text];
                                    setGainCreatorMappings(updated);
                                  }
                                }}
                                className="mt-0.5 w-4 h-4 text-green-600 rounded"
                              />
                              <span className="text-sm text-gray-700 flex-1">{creator.text}</span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="ml-5 pl-3 border-l-2 border-green-300">
                        <p className="text-xs text-amber-700">⚠️ Nemáte jak naplňujete očekávání</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* 🎯 JOBS COVERAGE (Optional - usually Jobs are covered by Products) */}
          {fitScoreData.topJobs.length > 0 && products.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-yellow-300">
                <Target className="w-5 h-5 text-yellow-600" />
                <h4 className="font-bold text-yellow-900">🎯 Důvod návštěvy</h4>
                <span className="text-xs text-gray-500 ml-auto">TOP {fitScoreData.topJobs.length}</span>
              </div>
              
              {fitScoreData.topJobs.map((job, i) => {
                const mappedProducts = products.filter(p => 
                  (productMappings[p.text] || []).includes(job.id)
                );
                const isCovered = mappedProducts.length > 0;
                
                return (
                  <div key={job.id} className="bg-yellow-50 rounded-lg border-2 border-yellow-300 p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="font-bold text-yellow-700 text-sm">#{i + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{job.text}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-600 font-bold text-sm">{job.percentage}%</span>
                          {isCovered && <span className="text-xs text-green-700">✓ Pokryto</span>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Checkboxes */}
                    <div className="ml-5 pl-3 border-l-2 border-yellow-300 space-y-1.5">
                      <p className="text-xs text-yellow-800 font-medium mb-1.5">→ Vaše produkty:</p>
                      {products.map((product, idx) => {
                        const isChecked = (productMappings[product.text] || []).includes(job.id);
                        return (
                          <label key={idx} className="flex items-start gap-2 cursor-pointer active:bg-yellow-100 p-1 rounded">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                haptic('light');
                                const currentMappings = productMappings[product.text] || [];
                                const newMappings = e.target.checked
                                  ? [...currentMappings, job.id]
                                  : currentMappings.filter(id => id !== job.id);
                                
                                if (newMappings.length > 0) {
                                  setProductMappings({
                                    ...productMappings,
                                    [product.text]: newMappings
                                  });
                                } else {
                                  const updated = { ...productMappings };
                                  delete updated[product.text];
                                  setProductMappings(updated);
                                }
                              }}
                              className="mt-0.5 w-4 h-4 text-green-600 rounded"
                            />
                            <span className="text-sm text-gray-700 flex-1">{product.text}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* INFO - pokud nemají žádná data */}
          {fitScoreData.topPains.length === 0 && fitScoreData.topGains.length === 0 && fitScoreData.topJobs.length === 0 && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
              <p className="text-sm text-amber-900">
                ⚠️ Nemáte žádné TOP priority! Vraťte se do Kroku 2 a nastavte počty respondentů.
              </p>
            </div>
          )}
          
          {/* NAVIGATION */}
          <div className="space-y-3 pt-4">
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  haptic('light');
                  setCurrentStep(2);
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Zpět
              </Button>
              <Button
                onClick={() => {
                  haptic('success');
                  if (onComplete) onComplete(fitScoreData.fitScore);
                  // ❌ REMOVED: 'fit-validated' achievement doesn't exist - FIT achievements se triggerují podle score (70%, 80%, 90%)
                  toast.success(`✅ FIT Score: ${fitScoreData.fitScore}%`);
                }}
                className="flex-1 flex items-center gap-2 justify-center bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="w-4 h-4" />
                Dokončit lekci
              </Button>
            </div>
            
            {/* Akční plán CTA - zobrazit po dokončení validace */}
            {fitScoreData.fitScore > 0 && (
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4 text-center">
                <p className="text-sm text-purple-100 mb-2">
                  🎯 Máte validovaný FIT Score!
                </p>
                <p className="font-bold mb-3">
                  Podívejte se na váš Akční plán
                </p>
                <button
                  onClick={() => {
                    haptic('medium');
                    if (onNavigateToTool) {
                      onNavigateToTool('action-plan');
                    } else {
                      toast.info('💡 Akční plán najdete v menu → Nástroje');
                    }
                  }}
                  className="w-full bg-white text-purple-700 font-bold py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  📋 Otevřít Akční plán
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
