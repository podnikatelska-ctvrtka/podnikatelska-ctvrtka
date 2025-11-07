import { useState, useEffect } from "react";
import { X, Save, Users, Plus, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { CustomerProfileContextHints } from "./CustomerProfileContextHints";

interface SegmentOption {
  text: string;
  color: string;
}

interface Tag {
  text: string;
  color: string;
}

interface Props {
  userId: string;
  selectedSegment: string | null;
  onSelectSegment: (segment: string) => void;
  onComplete?: () => void; // ✅ Callback pro dokončení lekce
  onAchievementUnlocked?: (achievementId: string) => void; // 🎉 Achievement callback
}

// FIXNÍ BARVY
const SECTION_COLORS = {
  job: '#f59e0b',      // Oranžová - Jobs
  pain: '#ef4444',     // Červená - Pains
  gain: '#10b981'      // Zelená - Gains
};

function normalizeColor(color: string): string {
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
  return colorMap[color.toLowerCase()] || '#3b82f6';
}

export function VPCCustomerProfileStory({ userId, selectedSegment, onSelectSegment, onComplete, onAchievementUnlocked }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [jobs, setJobs] = useState<Tag[]>([]);
  const [pains, setPains] = useState<Tag[]>([]);
  const [gains, setGains] = useState<Tag[]>([]);
  
  const [newJob, setNewJob] = useState("");
  const [newPain, setNewPain] = useState("");
  const [newGain, setNewGain] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [vpcId, setVpcId] = useState<number | null>(null);
  
  const [availableSegments, setAvailableSegments] = useState<SegmentOption[]>([]);
  
  useEffect(() => {
    loadAvailableSegments();
  }, [userId]);
  
  const loadAvailableSegments = async () => {
    if (!userId || userId === 0) return;
    
    try {
      const { data, error } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .maybeSingle();
      
      if (error) return;
      
      if (data && Array.isArray(data.content) && data.content.length > 0) {
        const normalized = data.content.map((item: SegmentOption) => ({
          text: item.text,
          color: normalizeColor(item.color)
        }));
        
        console.log('🎨 VPCCustomerProfileStory - Available segments:', normalized);
        setAvailableSegments(normalized);
        
        if (!selectedSegment && normalized.length > 0) {
          // 🔄 AUTO-SELECT: Zkus načíst z localStorage, jinak první segment
          const savedSegment = localStorage.getItem('vpc_selected_segment');
          const segmentToSelect = savedSegment && normalized.some((s: SegmentOption) => s.text === savedSegment)
            ? savedSegment
            : normalized[0].text;
          
          onSelectSegment(segmentToSelect);
        }
      }
    } catch (err) {
      console.error('VPC load error:', err);
    }
  };
  
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    
    const loadVPC = async () => {
      console.log('🔄 [VPCCustomerProfileStory] loadVPC called for segment:', selectedSegment);
      console.log('🔄 [VPCCustomerProfileStory] userId:', userId, 'availableSegments:', availableSegments);
      
      try {
        // Načíst podle segmentu (Customer Profile nemá selected_value)
        // ⚠️ FIX: Použij order + limit místo maybeSingle (kvůli duplicitám!)
        const { data: allRecords, error } = await supabase
          .from('value_proposition_canvas')
          .select('*')
          .eq('user_id', userId)
          .eq('segment_name', selectedSegment)
          .is('selected_value', null)
          .order('created_at', { ascending: false }); // Nejnovější první
        
        console.log('📊 [VPCCustomerProfileStory] Query result:', { count: allRecords?.length, error });
        
        // Vezmi NEJNOVĚJŠÍ záznam
        const data = allRecords && allRecords.length > 0 ? allRecords[0] : null;
        
        // 🗑️ SMAŽ DUPLICITY (pokud existují)
        if (allRecords && allRecords.length > 1) {
          const duplicateIds = allRecords.slice(1).map(r => r.id);
          console.log('🗑️ [VPCCustomerProfileStory] Mazání duplicit:', duplicateIds);
          
          const { error: deleteError } = await supabase
            .from('value_proposition_canvas')
            .delete()
            .in('id', duplicateIds);
          
          if (deleteError) {
            console.error('❌ Error deleting duplicates:', deleteError);
          } else {
            console.log('✅ Duplicity smazány!');
          }
        }
        
        if (data) {
          console.log('✅ [VPCCustomerProfileStory] Data found:', data);
          setVpcId(data.id);
          
          // ✅ PŘEKRESLI VŠECHNY ŠTÍTKY na barvu aktuálního segmentu!
          // 🎨 Načti barvu ZNOVU z DB (aby byla aktuální!)
          const { data: segmentsData } = await supabase
            .from('user_canvas_data')
            .select('content')
            .eq('user_id', userId)
            .eq('section_key', 'segments')
            .maybeSingle();
          
          let currentSegmentColor = '#3b82f6'; // default
          if (segmentsData?.content) {
            const segmentData = segmentsData.content.find((s: any) => s.text === selectedSegment);
            if (segmentData) {
              currentSegmentColor = segmentData.color.startsWith('#') ? segmentData.color : (() => {
                const colorMap: Record<string, string> = {
                  'blue': '#3b82f6', 'green': '#22c55e', 'yellow': '#eab308',
                  'red': '#ef4444', 'purple': '#8b5cf6', 'pink': '#ec4899',
                  'orange': '#f59e0b', 'white': '#d1d5db', 'gray': '#6b7280'
                };
                return colorMap[segmentData.color.toLowerCase()] || '#3b82f6';
              })();
            }
          }
          
          console.log('🎨 [VPCCustomerProfileStory] Překreslování štítků na barvu:', currentSegmentColor, 'segment:', selectedSegment, 'availableSegments:', availableSegments.length);
          
          // Přepiš barvy všech načtených štítků (NORMALIZUJ string → object)
          const jobsWithCorrectColor = (data.jobs || []).map((job: any) => ({
            text: typeof job === 'string' ? job : (job?.text || job),
            color: currentSegmentColor
          }));
          const painsWithCorrectColor = (data.pains || []).map((pain: any) => ({
            text: typeof pain === 'string' ? pain : (pain?.text || pain),
            color: currentSegmentColor
          }));
          const gainsWithCorrectColor = (data.gains || []).map((gain: any) => ({
            text: typeof gain === 'string' ? gain : (gain?.text || gain),
            color: currentSegmentColor
          }));
          
          console.log('✅ [VPCCustomerProfileStory] Nastavuji štítky s barvou:', currentSegmentColor);
          
          setJobs(jobsWithCorrectColor);
          setPains(painsWithCorrectColor);
          setGains(gainsWithCorrectColor);
          
          // Pokud už má data, přeskoč na shrnutí
          if (jobsWithCorrectColor.length > 0 || painsWithCorrectColor.length > 0 || gainsWithCorrectColor.length > 0) {
            setCurrentStep(4);
          }
        } else {
          // Žádná data pro tento segment - vyčisti formulář
          console.log('🆕 [VPCCustomerProfileStory] Žádná data, resetuji');
          setVpcId(null);
          setJobs([]);
          setPains([]);
          setGains([]);
          setCurrentStep(1);
        }
      } catch (err) {
        console.error('Load VPC error:', err);
      }
    };
    
    loadVPC();
  }, [userId, selectedSegment, availableSegments]);
  
  // 🔄 REAL-TIME COLOR SYNC: Sleduj změny barev segmentů v BMC
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    
    // Subscribe to changes in user_canvas_data (segments)
    const channel = supabase
      .channel('desktop-customer-profile-colors')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_canvas_data',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('🔄 [Desktop CustomerProfile] Segments změněny, reloaduji...');
          // Reload segments to get new colors
          loadAvailableSegments();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedSegment]);
  
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    
    const saveTimeout = setTimeout(async () => {
      await saveVPC();
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [jobs, pains, gains, selectedSegment]);
  
  const saveVPC = async () => {
    console.log('💾 [VPCCustomerProfileStory] saveVPC called', { userId, selectedSegment, isSaving, jobsCount: jobs.length, painsCount: pains.length, gainsCount: gains.length });
    
    if (!userId || !selectedSegment || isSaving) {
      console.log('❌ [VPCCustomerProfileStory] saveVPC skipped - validation failed');
      return;
    }
    
    if (jobs.length === 0 && pains.length === 0 && gains.length === 0) {
      console.log('❌ [VPCCustomerProfileStory] saveVPC skipped - no data to save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const vpcData = {
        user_id: userId,
        segment_name: selectedSegment,
        selected_value: null, // Customer Profile nemá hodnotu
        jobs,
        pains,
        gains,
        products: [],
        pain_relievers: [],
        gain_creators: [],
        updated_at: new Date().toISOString()
      };
      
      console.log('💾 [VPCCustomerProfileStory] Saving data:', { vpcId, vpcData });
      
      // 🔍 VŽDY HLEDAT existující záznam (fix pro duplicity!)
      const { data: existing } = await supabase
        .from('value_proposition_canvas')
        .select('id')
        .eq('user_id', userId)
        .eq('segment_name', selectedSegment)
        .is('selected_value', null)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      const recordId = existing?.id || vpcId;
      
      if (recordId) {
        // UPDATE existující záznam
        const { error } = await supabase
          .from('value_proposition_canvas')
          .update(vpcData)
          .eq('id', recordId);
        
        if (error) throw error;
        
        if (!vpcId) setVpcId(recordId); // Aktualizuj state pokud nebyl
        console.log('✅ [VPCCustomerProfileStory] Data updated successfully, id:', recordId);
      } else {
        // INSERT nový záznam (pokud opravdu neexistuje)
        const { data, error } = await supabase
          .from('value_proposition_canvas')
          .insert([vpcData])
          .select()
          .single();
        
        if (error) throw error;
        
        if (data) {
          setVpcId(data.id);
          console.log('✅ [VPCCustomerProfileStory] Data inserted successfully, new vpcId:', data.id);
        }
      }
      
      // ⏸️ ACHIEVEMENT přesunut do onComplete callback (triggeruje se až po kliknutí "Dokončit lekci")
    } catch (err) {
      console.error('❌ [VPCCustomerProfileStory] Save error:', err);
      toast.error('Chyba při ukládání dat');
    } finally {
      setIsSaving(false);
    }
  };
  
  const addJob = () => {
    const timestamp = Date.now();
    console.log('🎯 [JOB] addJob called at:', timestamp, 'with:', newJob);
    
    if (!newJob.trim()) return;
    if (jobs.length >= 10) {
      toast.error('Maximum 10 důvodů návštěvy!');
      return;
    }
    
    // ✅ KONTROLA DUPLICIT - varování pokud už text existuje
    const isDuplicate = jobs.some(j => j.text.toLowerCase() === newJob.trim().toLowerCase());
    console.log('🔍 [JOB] Duplicate check:', isDuplicate, 'at:', timestamp);
    
    if (isDuplicate) {
      console.log('❌ [JOB] DUPLICATE DETECTED at:', timestamp);
      toast.error('❌ Tento důvod návštěvy již existuje! Použijte jiný text.');
      console.log('✅ [JOB] Toast shown at:', Date.now());
      return;
    }
    
    // ✅ VŠECHNY štítky mají barvu SEGMENTU!
    const segmentData = availableSegments.find(s => s.text === selectedSegment);
    const segmentColor = segmentData?.color || '#3b82f6';
    
    const newJobItem = { 
      text: newJob.trim(), 
      color: segmentColor
    };
    
    console.log('✅ [JOB] Adding job:', newJobItem, 'at:', Date.now());
    setJobs([...jobs, newJobItem]);
    setNewJob("");
    console.log('✅ [JOB] Job added, triggering auto-save in 1s...');
  };
  
  const addPain = () => {
    const timestamp = Date.now();
    console.log('😢 [PAIN] addPain called at:', timestamp, 'with:', newPain);
    
    if (!newPain.trim()) return;
    if (pains.length >= 20) {
      toast.error('Maximum 20 obav!');
      return;
    }
    
    // ✅ KONTROLA DUPLICIT
    const isDuplicate = pains.some(p => p.text.toLowerCase() === newPain.trim().toLowerCase());
    console.log('🔍 [PAIN] Duplicate check:', isDuplicate, 'at:', timestamp);
    
    if (isDuplicate) {
      console.log('❌ [PAIN] DUPLICATE DETECTED at:', timestamp);
      toast.error('❌ Tato obava již existuje! Použijte jiný text.');
      console.log('✅ [PAIN] Toast shown at:', Date.now());
      return;
    }
    
    // ✅ VŠECHNY štítky mají barvu SEGMENTU!
    const segmentData = availableSegments.find(s => s.text === selectedSegment);
    const segmentColor = segmentData?.color || '#3b82f6';
    
    const newPainItem = { 
      text: newPain.trim(), 
      color: segmentColor
    };
    
    console.log('✅ [PAIN] Adding pain:', newPainItem, 'at:', Date.now());
    setPains([...pains, newPainItem]);
    setNewPain("");
    console.log('✅ [PAIN] Pain added, triggering auto-save in 1s...');
  };
  
  const addGain = () => {
    const timestamp = Date.now();
    console.log('😊 [GAIN] addGain called at:', timestamp, 'with:', newGain);
    
    if (!newGain.trim()) return;
    if (gains.length >= 20) {
      toast.error('Maximum 20 očekávání!');
      return;
    }
    
    // ✅ KONTROLA DUPLICIT
    const isDuplicate = gains.some(g => g.text.toLowerCase() === newGain.trim().toLowerCase());
    console.log('🔍 [GAIN] Duplicate check:', isDuplicate, 'at:', timestamp);
    
    if (isDuplicate) {
      console.log('❌ [GAIN] DUPLICATE DETECTED at:', timestamp);
      toast.error('❌ Toto očekávání již existuje! Použijte jiný text.');
      console.log('✅ [GAIN] Toast shown at:', Date.now());
      return;
    }
    
    // ✅ VŠECHNY štítky mají barvu SEGMENTU!
    const segmentData = availableSegments.find(s => s.text === selectedSegment);
    const segmentColor = segmentData?.color || '#3b82f6';
    
    const newGainItem = { 
      text: newGain.trim(), 
      color: segmentColor
    };
    
    console.log('✅ [GAIN] Adding gain:', newGainItem, 'at:', Date.now());
    setGains([...gains, newGainItem]);
    setNewGain("");
    console.log('✅ [GAIN] Gain added, triggering auto-save in 1s...');
  };
  
  const selectedSegmentObj = availableSegments.find(s => s.text === selectedSegment);
  
  const canContinueStep1 = jobs.length > 0;
  const canContinueStep2 = pains.length > 0;
  const canContinueStep3 = gains.length > 0;
  
  const steps = [
    { label: 'Segment', icon: '👥', completed: !!selectedSegment },
    { label: 'Důvod návštěvy', icon: '🎯', completed: jobs.length > 0 },
    { label: 'Obavy', icon: '😢', completed: pains.length > 0 },
    { label: 'Očekávání', icon: '😊', completed: gains.length > 0 },
    { label: 'Hotovo', icon: '✅', completed: false }
  ];
  
  return (
    <div className="w-full space-y-6">
      {/* Progress Stepper - Responzivní */}
      <div className="mb-4 sm:mb-8">
        <div className="flex items-center justify-between relative px-2">
          {/* Progress Line */}
          <div className="absolute top-4 sm:top-5 left-0 right-0 h-0.5 sm:h-1 bg-gray-200 -z-10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg transition-all ${
                  idx === currentStep
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg scale-110'
                    : idx < currentStep || step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.completed && idx < currentStep ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : step.icon}
              </div>
              <span className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-center max-w-[60px] sm:max-w-none leading-tight ${idx === currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div>
        {/* STEP 0: Výběr segmentu */}
        {currentStep === 0 && (
          <div
            key="step0"
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-blue-200 p-4 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0">
                👥
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-blue-900">Vyberte zákaznický segment</h2>
                <p className="text-sm sm:text-base text-blue-700">Koho chcete pochopit do hloubky?</p>
              </div>
            </div>
            
            {availableSegments.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <p className="text-yellow-800 mb-2">💡 Nejprve vyplňte "Zákaznické segmenty" v Modulu 1</p>
                <p className="text-sm text-yellow-700">Segmenty z Business Model Canvas se zde zobrazí automaticky.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {availableSegments.map((segment, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelectSegment(segment.text);
                      }}
                      className={`p-6 rounded-xl border-3 text-left transition-all hover:scale-102 active:scale-98 ${
                        selectedSegment === segment.text
                          ? 'bg-blue-100 border-blue-500 shadow-lg scale-105'
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0"
                          style={{ backgroundColor: segment.color }}
                        />
                        <span className="font-bold text-gray-900 text-lg">{segment.text}</span>
                      </div>
                      {selectedSegment === segment.text && (
                        <div className="mt-2 flex items-center gap-2 text-blue-600 text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Vybráno</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (selectedSegment) {
                        setCurrentStep(1);
                      } else {
                        toast.error('Vyberte segment!');
                      }
                    }}
                    disabled={!selectedSegment}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                  >
                    Pokračovat
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* STEP 1: Jobs-to-be-Done */}
        {currentStep === 1 && (
          <div
            key="step1"
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-orange-200 p-4 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-orange-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0">
                🎯
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-orange-900">Důvod návštěvy</h2>
                <p className="text-sm sm:text-base text-orange-700 truncate">Proč <span className="font-bold">{selectedSegment}</span> přichází? ({jobs.length}/10)</p>
              </div>
            </div>
            
            {/* Tipy */}
            <CustomerProfileContextHints currentStep={1} selectedSegment={selectedSegment || undefined} />
            
            {/* Input - Stack na mobilu */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
              <input
                type="text"
                value={newJob}
                onChange={(e) => setNewJob(e.target.value)}
                placeholder="Např.: Pracovat produktivně mimo domov"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-orange-400 rounded-xl text-sm sm:text-base bg-white shadow-md focus:ring-2 focus:ring-orange-300 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('⌨️ [JOB] Enter pressed');
                    addJob();
                  }
                }}
              />
              <button
                onClick={() => {
                  console.log('🖱️ [JOB] Button clicked');
                  addJob();
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-2.5 sm:py-3 shadow-md transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Přidat</span>
              </button>
            </div>
            
            {/* Štítky - Responzivní velikost */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 min-h-[150px] sm:min-h-[200px]">
              {jobs.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center h-32 sm:h-48 text-orange-600">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 opacity-50" />
                  <p className="text-center text-sm sm:text-base px-4">Začněte přidáváním cílů a důvodů návštěvy</p>
                </div>
              ) : (
                jobs.map((job, idx) => (
                  <div
                    key={idx}
                    className="group relative animate-in fade-in zoom-in-95 duration-200"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className="w-32 h-20 sm:w-40 sm:h-24 rounded-lg sm:rounded-xl flex items-center justify-center font-medium shadow-lg hover:scale-105 transition-all cursor-pointer p-2 sm:p-3"
                      style={{ 
                        backgroundColor: job.color,
                        color: '#ffffff'
                      }}
                    >
                      <span className="text-center text-xs sm:text-sm line-clamp-4 break-words">
                        {job.text}
                      </span>
                      <button
                        onClick={() => setJobs(jobs.filter((_, i) => i !== idx))}
                        className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1 sm:p-1.5 shadow-lg hover:bg-red-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setCurrentStep(0)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium flex items-center gap-1.5 sm:gap-2 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Zpět</span>
              </button>
              <button
                onClick={() => {
                  if (canContinueStep1) {
                    setCurrentStep(2);
                  } else {
                    toast.error('Přidejte alespoň 1 cíl!');
                  }
                }}
                disabled={!canContinueStep1}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2 transition-all text-sm sm:text-base"
              >
                Pokračovat
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* STEP 2: Pains */}
        {currentStep === 2 && (
          <div
            key="step2"
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-red-200 p-4 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-red-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0">
                😢
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-red-900">Obavy a problémy</h2>
                <p className="text-sm sm:text-base text-red-700 truncate">Co <span className="font-bold">{selectedSegment}</span> trápí? ({pains.length}/20)</p>
              </div>
            </div>
            
            {/* Tipy */}
            <CustomerProfileContextHints currentStep={2} selectedSegment={selectedSegment || undefined} />
            
            {/* Input - Stack na mobilu */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
              <input
                type="text"
                value={newPain}
                onChange={(e) => setNewPain(e.target.value)}
                placeholder="Např.: Drahý coworking (300 Kč/den)"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-red-400 rounded-xl text-sm sm:text-base bg-white shadow-md focus:ring-2 focus:ring-red-300 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('⌨️ [PAIN] Enter pressed');
                    addPain();
                  }
                }}
              />
              <button
                onClick={() => {
                  console.log('🖱️ [PAIN] Button clicked');
                  addPain();
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-6 py-2.5 sm:py-3 shadow-md transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Přidat</span>
              </button>
            </div>
            
            {/* Štítky - Responzivní velikost */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 min-h-[150px] sm:min-h-[200px]">
              {pains.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center h-32 sm:h-48 text-red-600">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 opacity-50" />
                  <p className="text-center text-sm sm:text-base px-4">Popište problémy a obavy segmentu</p>
                </div>
              ) : (
                pains.map((pain, idx) => (
                  <div
                    key={idx}
                    className="group relative animate-in fade-in zoom-in-95 duration-200"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className="w-28 h-20 sm:w-32 sm:h-24 rounded-lg sm:rounded-xl flex items-center justify-center font-medium shadow-lg hover:scale-105 transition-all cursor-pointer p-2 sm:p-3"
                      style={{ 
                        backgroundColor: pain.color,
                        color: '#ffffff'
                      }}
                    >
                      <span className="text-center text-xs sm:text-sm line-clamp-4 break-words">
                        {pain.text}
                      </span>
                      <button
                        onClick={() => setPains(pains.filter((_, i) => i !== idx))}
                        className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1 sm:p-1.5 shadow-lg hover:bg-red-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium flex items-center gap-1.5 sm:gap-2 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Zpět</span>
              </button>
              <button
                onClick={() => {
                  if (canContinueStep2) {
                    setCurrentStep(3);
                  } else {
                    toast.error('Přidejte alespoň 1 obavu!');
                  }
                }}
                disabled={!canContinueStep2}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2 transition-all text-sm sm:text-base"
              >
                Pokračovat
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* STEP 3: Gains */}
        {currentStep === 3 && (
          <div
            key="step3"
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-green-200 p-4 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-green-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0">
                😊
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-green-900">Očekávání a touhy</h2>
                <p className="text-sm sm:text-base text-green-700 truncate">Co by <span className="font-bold">{selectedSegment}</span> chtěl? ({gains.length}/20)</p>
              </div>
            </div>
            
            {/* Tipy */}
            <CustomerProfileContextHints currentStep={3} selectedSegment={selectedSegment || undefined} />
            
            {/* Input - Stack na mobilu */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
              <input
                type="text"
                value={newGain}
                onChange={(e) => setNewGain(e.target.value)}
                placeholder="Např.: Profesionální prostředí s WiFi"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-green-400 rounded-xl text-sm sm:text-base bg-white shadow-md focus:ring-2 focus:ring-green-300 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('⌨️ [GAIN] Enter pressed');
                    addGain();
                  }
                }}
              />
              <button
                onClick={() => {
                  console.log('🖱️ [GAIN] Button clicked');
                  addGain();
                }}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-6 py-2.5 sm:py-3 shadow-md transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Přidat</span>
              </button>
            </div>
            
            {/* Štítky - Responzivní velikost */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 min-h-[150px] sm:min-h-[200px]">
              {gains.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center h-32 sm:h-48 text-green-600">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 opacity-50" />
                  <p className="text-center text-sm sm:text-base px-4">Popište očekávání a touhy segmentu</p>
                </div>
              ) : (
                gains.map((gain, idx) => (
                  <div
                    key={idx}
                    className="group relative animate-in fade-in zoom-in-95 duration-200"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className="w-28 h-20 sm:w-32 sm:h-24 rounded-lg sm:rounded-xl flex items-center justify-center font-medium shadow-lg hover:scale-105 transition-all cursor-pointer p-2 sm:p-3"
                      style={{ 
                        backgroundColor: gain.color,
                        color: '#ffffff'
                      }}
                    >
                      <span className="text-center text-xs sm:text-sm line-clamp-4 break-words">
                        {gain.text}
                      </span>
                      <button
                        onClick={() => setGains(gains.filter((_, i) => i !== idx))}
                        className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1 sm:p-1.5 shadow-lg hover:bg-red-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium flex items-center gap-1.5 sm:gap-2 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Zpět</span>
              </button>
              <button
                onClick={() => {
                  if (canContinueStep3) {
                    setCurrentStep(4);
                  } else {
                    toast.error('Přidejte alespoň 1 očekávání!');
                  }
                }}
                disabled={!canContinueStep3}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2 transition-all text-sm sm:text-base"
              >
                Dokončit
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* STEP 4: Shrnutí */}
        {currentStep === 4 && (
          <div
            key="step4"
            className="space-y-4 sm:space-y-6 animate-in fade-in zoom-in-95 duration-500"
          >
            {/* Gratulace */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
              <h2 className="mb-2 text-white text-lg sm:text-2xl font-bold">Skvělá práce!</h2>
              <p className="text-white text-base sm:text-lg opacity-90">Zákaznický profil je kompletní</p>
            </div>
            
            {/* Shrnutí segmentu */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-blue-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl">
                  👥
                </div>
                <h3 className="text-base sm:text-xl font-bold text-blue-900">Vybraný segment</h3>
              </div>
              <div
                className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-lg shadow-lg"
                style={{ backgroundColor: selectedSegmentObj?.color || '#3b82f6' }}
              >
                {selectedSegment}
              </div>
            </div>
            
            {/* Grid - 3 sekce - Stack na mobilu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Jobs */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-orange-200 p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl">
                    🎯
                  </div>
                  <h3 className="font-bold text-orange-900 text-sm sm:text-base">Důvod návštěvy ({jobs.length})</h3>
                </div>
                <div className="space-y-2">
                  {jobs.map((j, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-2 sm:p-3 shadow-sm text-xs sm:text-sm">
                      {j.text}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pains */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-red-200 p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl">
                    😢
                  </div>
                  <h3 className="font-bold text-red-900 text-sm sm:text-base">Obavy ({pains.length})</h3>
                </div>
                <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                  {pains.map((p, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-2 sm:p-3 shadow-sm text-xs sm:text-sm">
                      {p.text}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Gains */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-green-200 p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl">
                    😊
                  </div>
                  <h3 className="font-bold text-green-900 text-sm sm:text-base">Očekávání ({gains.length})</h3>
                </div>
                <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                  {gains.map((g, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-2 sm:p-3 shadow-sm text-xs sm:text-sm">
                      {g.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Akce */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Upravit
              </button>
              <button
                onClick={async () => {
                  console.log('🔍 Dokončit lekci clicked!', { userId, selectedSegment, jobs, pains, gains, hasOnComplete: !!onComplete });
                  
                  try {
                    // ✅ Ulož Customer Profile před dokončením
                    await saveVPC();
                    // ❌ Odstraněno - duplicitní toast (autosave indicator stačí)
                    
                    // ✅ Zavolej callback (uloží progress do CourseDemoV3)
                    if (onComplete) {
                      onComplete();
                    } else {
                      console.warn('⚠️ onComplete callback is not defined!');
                      // ❌ Odstraněno - duplicitní toast (console.warn stačí)
                    }
                  } catch (error) {
                    console.error('❌ Error in onComplete:', error);
                    toast.error('Chyba při ukládání!');
                  }
                }}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-5 h-5" />
                Dokončit lekci
              </button>
            </div>
            
            {/* Auto-save indikátor */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-md border-2 border-gray-200 w-fit mx-auto">
              <Save className={`w-4 h-4 ${isSaving ? 'animate-pulse text-blue-500' : 'text-green-500'}`} />
              <span className="font-medium">{isSaving ? 'Ukládám...' : 'Automaticky uloženo'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
