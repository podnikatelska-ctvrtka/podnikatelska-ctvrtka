/**
 * 📱 MOBILE VPC - CUSTOMER PROFILE (Lekce 14)
 * 
 * Mobilní verze zákaznického profilu.
 * LOGIKA Z DESKTOPU: stepper, načítání segmentů ze Supabase, sticky notes s barvou segmentu
 * DESIGN: optimalizovaný pro mobil (kompaktní, jednoduché inputy)
 */

import { useState, useEffect } from "react";
import { X, Plus, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { haptic } from "../../lib/haptics";
import { Button } from "../ui/button";

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
  onComplete?: () => void;
  onAchievementUnlocked?: (achievementId: string) => void;
}

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

export function MobileVPCCustomerProfile({ 
  userId, 
  selectedSegment, 
  onSelectSegment, 
  onComplete,
  onAchievementUnlocked 
}: Props) {
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
  
  // Load available segments from BMC
  useEffect(() => {
    loadAvailableSegments();
  }, [userId]);
  
  const loadAvailableSegments = async () => {
    if (!userId || userId === "guest") return;
    
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
        
        setAvailableSegments(normalized);
        
        // Auto-select first segment if none selected
        if (!selectedSegment && normalized.length > 0) {
          const savedSegment = localStorage.getItem('vpc_selected_segment');
          const segmentToSelect = savedSegment && normalized.some((s: SegmentOption) => s.text === savedSegment)
            ? savedSegment
            : normalized[0].text;
          
          onSelectSegment(segmentToSelect);
        }
      }
    } catch (err) {
      console.error('Error loading segments:', err);
    }
  };
  
  // Load VPC data when segment changes
  useEffect(() => {
    if (selectedSegment && userId !== "guest") {
      loadVPCData();
    }
  }, [selectedSegment, userId]);
  
  // 🔄 REAL-TIME COLOR SYNC: Sleduj změny barev segmentů v BMC
  useEffect(() => {
    if (!userId || userId === "guest" || !selectedSegment) return;
    
    // Subscribe to changes in user_canvas_data (segments)
    const channel = supabase
      .channel('mobile-customer-profile-colors')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_canvas_data',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('🔄 [Mobile CustomerProfile] Segments změněny, reloaduji...');
          // Reload VPC data (načte si barvu segmentu znovu z DB)
          loadVPCData();
          // Reload segments pro selector
          loadAvailableSegments();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedSegment]);
  
  // Auto-save when data changes (debounced)
  useEffect(() => {
    if (!selectedSegment || userId === "guest") return;
    if (jobs.length === 0 && pains.length === 0 && gains.length === 0) return;
    
    const saveTimeout = setTimeout(() => {
      console.log('⏰ [Mobile VPC] Auto-saving Customer Profile...', { 
        jobs: jobs.length, 
        pains: pains.length, 
        gains: gains.length 
      });
      saveVPCData();
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [jobs, pains, gains, selectedSegment]);
  
  const loadVPCData = async () => {
    if (!selectedSegment || !userId || userId === "guest") return;
    
    console.log('🔄 [Mobile VPC] loadVPC called for segment:', selectedSegment);
    
    try {
      // ⚠️ FIX: Použij order + limit místo maybeSingle (kvůli duplicitám!)
      const { data: allRecords, error } = await supabase
        .from('value_proposition_canvas')
        .select('*')
        .eq('user_id', userId)
        .eq('segment_name', selectedSegment)
        .is('selected_value', null)
        .order('created_at', { ascending: false }); // Nejnovější první
      
      console.log('📊 [Mobile VPC] Query result:', { count: allRecords?.length, error });
      
      // Vezmi NEJNOVĚJŠÍ záznam
      const data = allRecords && allRecords.length > 0 ? allRecords[0] : null;
      
      // 🗑️ SMAŽ DUPLICITY (pokud existují)
      if (allRecords && allRecords.length > 1) {
        const duplicateIds = allRecords.slice(1).map(r => r.id);
        console.log('🗑️ [Mobile VPC] Mazání duplicit:', duplicateIds);
        
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
        console.log('✅ [Mobile VPC] Data found:', data);
        setVpcId(data.id);
        
        // 🎨 Get segment color - NAČTI ZNOVU z DB (aby byla aktuální!)
        const { data: segmentData } = await supabase
          .from('user_canvas_data')
          .select('content')
          .eq('user_id', userId)
          .eq('section_key', 'segments')
          .maybeSingle();
        
        let segmentColor = '#3b82f6'; // default
        if (segmentData?.content) {
          const segmentObj = segmentData.content.find((s: any) => s.text === selectedSegment);
          if (segmentObj) {
            segmentColor = normalizeColor(segmentObj.color);
          }
        }
        
        console.log('🎨 [Mobile VPC] Překreslování štítků na barvu:', segmentColor, 'segment:', selectedSegment);
        
        // Recolor tags to segment color (NORMALIZUJ string → object)
        const jobsWithCorrectColor = (data.jobs || []).map((job: any) => ({
          text: typeof job === 'string' ? job : (job?.text || job),
          color: segmentColor
        }));
        const painsWithCorrectColor = (data.pains || []).map((pain: any) => ({
          text: typeof pain === 'string' ? pain : (pain?.text || pain),
          color: segmentColor
        }));
        const gainsWithCorrectColor = (data.gains || []).map((gain: any) => ({
          text: typeof gain === 'string' ? gain : (gain?.text || gain),
          color: segmentColor
        }));
        
        setJobs(jobsWithCorrectColor);
        setPains(painsWithCorrectColor);
        setGains(gainsWithCorrectColor);
        
        // Pokud už má data, přeskoč na poslední step
        if (jobsWithCorrectColor.length > 0 && painsWithCorrectColor.length > 0 && gainsWithCorrectColor.length > 0) {
          setCurrentStep(3);
        }
      } else {
        // No data yet - reset
        console.log('🆕 [Mobile VPC] Žádná data, resetuji');
        setVpcId(null);
        setJobs([]);
        setPains([]);
        setGains([]);
        setCurrentStep(0);
      }
    } catch (err) {
      console.error('❌ [Mobile VPC] Load error:', err);
    }
  };
  
  // Save VPC data
  const saveVPCData = async () => {
    console.log('💾 [Mobile VPC] saveVPC called', { 
      userId, 
      selectedSegment, 
      isSaving, 
      jobsCount: jobs.length, 
      painsCount: pains.length, 
      gainsCount: gains.length 
    });
    
    if (!selectedSegment || !userId || userId === "guest") {
      console.log('❌ [Mobile VPC] saveVPC skipped - validation failed');
      return;
    }
    
    if (isSaving) {
      console.log('❌ [Mobile VPC] saveVPC skipped - already saving');
      return;
    }
    
    if (jobs.length === 0 && pains.length === 0 && gains.length === 0) {
      console.log('❌ [Mobile VPC] saveVPC skipped - no data to save');
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
      
      console.log('💾 [Mobile VPC] Saving data:', { vpcId, vpcData });
      
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
        console.log('✅ [Mobile VPC] Data updated successfully, id:', recordId);
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
          console.log('✅ [Mobile VPC] Data inserted successfully, new vpcId:', data.id);
        }
      }
      
      // 🎉 ACHIEVEMENT: Customer Profile Complete
      if (jobs.length > 0 && pains.length > 0 && gains.length > 0 && onAchievementUnlocked) {
        console.log('✅ Customer Profile complete! Triggering achievement...');
        onAchievementUnlocked('customer-profile-complete');
      }
    } catch (err: any) {
      console.error('❌ [Mobile VPC] Save error:', err);
      toast.error('❌ Chyba při ukládání');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Get segment color
  const segmentObj = availableSegments.find(s => s.text === selectedSegment);
  const segmentColor = segmentObj?.color || '#3b82f6';
  
  // Add tag functions
  const addJob = () => {
    const timestamp = Date.now();
    console.log('🎯 [Mobile JOB] addJob called at:', timestamp, 'with:', newJob);
    
    if (!newJob.trim()) return;
    if (jobs.length >= 10) {
      toast.error('Maximum 10 úkolů!');
      return;
    }
    
    const isDuplicate = jobs.some(j => j.text.toLowerCase() === newJob.trim().toLowerCase());
    if (isDuplicate) {
      toast.error('❌ Tento úkol již existuje!');
      return;
    }
    
    haptic('light');
    const newJobTag = { text: newJob.trim(), color: segmentColor };
    console.log('✅ [Mobile JOB] Adding job:', newJobTag, 'at:', timestamp);
    
    const newJobs = [...jobs, newJobTag];
    setJobs(newJobs);
    setNewJob("");
    
    console.log('✅ [Mobile JOB] Job added, triggering auto-save in 1s...');
    // Auto-save bude spuštěn z useEffect
  };
  
  const addPain = () => {
    const timestamp = Date.now();
    console.log('😢 [Mobile PAIN] addPain called at:', timestamp, 'with:', newPain);
    
    if (!newPain.trim()) return;
    if (pains.length >= 20) {
      toast.error('Maximum 20 obav!');
      return;
    }
    
    const isDuplicate = pains.some(p => p.text.toLowerCase() === newPain.trim().toLowerCase());
    if (isDuplicate) {
      toast.error('❌ Tato obava již existuje!');
      return;
    }
    
    haptic('light');
    const newPainTag = { text: newPain.trim(), color: segmentColor };
    console.log('✅ [Mobile PAIN] Adding pain:', newPainTag, 'at:', timestamp);
    
    const newPains = [...pains, newPainTag];
    setPains(newPains);
    setNewPain("");
    
    console.log('✅ [Mobile PAIN] Pain added, triggering auto-save in 1s...');
    // Auto-save bude spuštěn z useEffect
  };
  
  const addGain = () => {
    const timestamp = Date.now();
    console.log('😊 [Mobile GAIN] addGain called at:', timestamp, 'with:', newGain);
    
    if (!newGain.trim()) return;
    if (gains.length >= 20) {
      toast.error('Maximum 20 očekávání!');
      return;
    }
    
    const isDuplicate = gains.some(g => g.text.toLowerCase() === newGain.trim().toLowerCase());
    if (isDuplicate) {
      toast.error('❌ Toto očekávání již existuje!');
      return;
    }
    
    haptic('light');
    const newGainTag = { text: newGain.trim(), color: segmentColor };
    console.log('✅ [Mobile GAIN] Adding gain:', newGainTag, 'at:', timestamp);
    
    const newGains = [...gains, newGainTag];
    setGains(newGains);
    setNewGain("");
    
    console.log('✅ [Mobile GAIN] Gain added, triggering auto-save in 1s...');
    // Auto-save bude spuštěn z useEffect
  };
  
  // Progress stepper
  const steps = [
    { label: 'Segment', completed: !!selectedSegment },
    { label: 'Úkoly', completed: jobs.length > 0 },
    { label: 'Obavy', completed: pains.length > 0 },
    { label: 'Očekávání', completed: gains.length > 0 },
  ];
  
  return (
    <div className="space-y-4 pb-8 overflow-x-hidden max-w-full">
      {/* PROGRESS STEPPER */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                  idx === currentStep
                    ? 'bg-blue-500 text-white shadow-md scale-110'
                    : idx < currentStep || step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.completed && idx < currentStep ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium text-center max-w-[60px] leading-tight ${idx === currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* STEP 0: Segment Selector */}
      {currentStep === 0 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-blue-900 mb-2">👥 Vyberte segment</h3>
            <p className="text-sm text-gray-600 mb-3">
              Koho chcete pochopit do hloubky?
            </p>
            
            {availableSegments.length === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  💡 Nejprve vyplňte "Zákaznické segmenty" v Modulu 1
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {availableSegments.map((segment, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      haptic('medium');
                      onSelectSegment(segment.text);
                      localStorage.setItem('vpc_selected_segment', segment.text);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      selectedSegment === segment.text
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className={`text-sm flex-1 text-left ${selectedSegment === segment.text ? 'font-semibold text-blue-900' : 'text-gray-700'}`}>
                      {segment.text}
                    </span>
                    {selectedSegment === segment.text && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (selectedSegment) {
                  haptic('medium');
                  setCurrentStep(1);
                } else {
                  toast.error('Vyberte segment!');
                }
              }}
              disabled={!selectedSegment}
              className="flex items-center gap-2"
            >
              Pokračovat
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* STEP 1: Jobs */}
      {currentStep === 1 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <h3 className="text-orange-900 mb-1">🎯 Cíl / Důvod návštěvy</h3>
            <p className="text-sm text-gray-600 mb-3">
              Proč <strong>{selectedSegment}</strong> přichází? ({jobs.length}/10)
            </p>
            
            {/* Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newJob}
                onChange={(e) => setNewJob(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addJob()}
                placeholder="Např.: Pracovat produktivně..."
                className="flex-1 px-3 py-2 border border-orange-300 rounded-lg text-sm"
              />
              <button
                onClick={addJob}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tags (kompaktní sticky notes) */}
            <div className="flex flex-wrap gap-2 min-h-[100px]">
              {jobs.map((job, idx) => (
                <div
                  key={idx}
                  className="relative group w-24 h-16 rounded-lg flex items-center justify-center p-2 shadow-md"
                  style={{ backgroundColor: job.color }}
                >
                  <span className="text-xs text-white text-center line-clamp-3 break-words">
                    {job.text}
                  </span>
                  <button
                    onClick={() => {
                      haptic('light');
                      setJobs(jobs.filter((_, i) => i !== idx));
                      saveVPCData();
                    }}
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between gap-2">
            <Button
              onClick={() => {
                haptic('light');
                setCurrentStep(0);
              }}
              variant="outline"
              className="flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět
            </Button>
            <Button
              onClick={() => {
                if (jobs.length > 0) {
                  haptic('medium');
                  setCurrentStep(2);
                } else {
                  toast.error('Přidejte alespoň 1 úkol!');
                }
              }}
              className="flex items-center gap-1"
            >
              Pokračovat
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* STEP 2: Pains */}
      {currentStep === 2 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="text-red-900 mb-1">😢 Obavy a problémy</h3>
            <p className="text-sm text-gray-600 mb-3">
              Co ho TRÁPÍ? ({pains.length}/20)
            </p>
            
            {/* Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newPain}
                onChange={(e) => setNewPain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPain()}
                placeholder="Např.: Drahý coworking..."
                className="flex-1 px-3 py-2 border border-red-300 rounded-lg text-sm"
              />
              <button
                onClick={addPain}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 min-h-[100px]">
              {pains.map((pain, idx) => (
                <div
                  key={idx}
                  className="relative group w-24 h-16 rounded-lg flex items-center justify-center p-2 shadow-md"
                  style={{ backgroundColor: pain.color }}
                >
                  <span className="text-xs text-white text-center line-clamp-3 break-words">
                    {pain.text}
                  </span>
                  <button
                    onClick={() => {
                      haptic('light');
                      setPains(pains.filter((_, i) => i !== idx));
                      saveVPCData();
                    }}
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between gap-2">
            <Button
              onClick={() => {
                haptic('light');
                setCurrentStep(1);
              }}
              variant="outline"
              className="flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět
            </Button>
            <Button
              onClick={() => {
                if (pains.length > 0) {
                  haptic('medium');
                  setCurrentStep(3);
                } else {
                  toast.error('Přidejte alespoň 1 obavu!');
                }
              }}
              className="flex items-center gap-1"
            >
              Pokračovat
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* STEP 3: Gains */}
      {currentStep === 3 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="text-green-900 mb-1">😊 Očekávání a touhy</h3>
            <p className="text-sm text-gray-600 mb-3">
              Co by CHTĚL? ({gains.length}/20)
            </p>
            
            {/* Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newGain}
                onChange={(e) => setNewGain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addGain()}
                placeholder="Např.: Dobrá káva..."
                className="flex-1 px-3 py-2 border border-green-300 rounded-lg text-sm"
              />
              <button
                onClick={addGain}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 min-h-[100px]">
              {gains.map((gain, idx) => (
                <div
                  key={idx}
                  className="relative group w-24 h-16 rounded-lg flex items-center justify-center p-2 shadow-md"
                  style={{ backgroundColor: gain.color }}
                >
                  <span className="text-xs text-white text-center line-clamp-3 break-words">
                    {gain.text}
                  </span>
                  <button
                    onClick={() => {
                      haptic('light');
                      setGains(gains.filter((_, i) => i !== idx));
                      saveVPCData();
                    }}
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between gap-2">
            <Button
              onClick={() => {
                haptic('light');
                setCurrentStep(2);
              }}
              variant="outline"
              className="flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět
            </Button>
            
            {gains.length > 0 && onComplete && (
              <Button
                onClick={() => {
                  haptic('success');
                  saveVPCData();
                  onComplete();
                }}
                className="flex items-center gap-1"
              >
                Dokončit
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
