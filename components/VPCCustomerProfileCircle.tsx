import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Save, Users, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabase";

// DEBUG: Check if supabase is loaded
if (!supabase) {
  console.error('🚨 CRITICAL: supabase is undefined in VPCCustomerProfileCircle!');
}

interface SegmentOption {
  text: string;
  color: string;
}

interface Tag {
  text: string;
  color: string;
}

interface Props {
  userId: number;
  selectedSegment: string | null;
  onSelectSegment: (segment: string) => void;
}

export function VPCCustomerProfileCircle({ userId, selectedSegment, onSelectSegment }: Props) {
  const [jobs, setJobs] = useState<Tag[]>([]);
  const [pains, setPains] = useState<Tag[]>([]);
  const [gains, setGains] = useState<Tag[]>([]);
  
  const [newJob, setNewJob] = useState("");
  const [newPain, setNewPain] = useState("");
  const [newGain, setNewGain] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [vpcId, setVpcId] = useState<number | null>(null);
  const [showSegmentSelector, setShowSegmentSelector] = useState(false);
  
  const [availableSegments, setAvailableSegments] = useState<SegmentOption[]>([]);
  
  useEffect(() => {
    loadAvailableSegments();
  }, [userId]);
  
  const loadAvailableSegments = async () => {
    if (!userId) return;
    
    if (!supabase) {
      console.error('🚨 CRITICAL: supabase client not initialized in VPCCustomerProfileCircle!');
      return;
    }
    
    try {
      // ✅ OPRAVA: section_key + content (NE section_id + items!)
      const { data, error } = await supabase
        .from('business_canvas_sections')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error('❌ VPC Circle error:', error);
        return;
      }
      
      if (data && data.content && data.content.length > 0) {
        setAvailableSegments(data.content);
        
        if (!selectedSegment) {
          // 🔄 AUTO-SELECT: Zkus načíst z localStorage, jinak první segment
          const savedSegment = localStorage.getItem('vpc_selected_segment');
          const segmentToSelect = savedSegment && data.content.some((s: SegmentOption) => s.text === savedSegment)
            ? savedSegment
            : data.content[0].text;
          
          onSelectSegment(segmentToSelect);
        }
      }
    } catch (err) {
      console.error('Error loading segments:', err);
    }
  };
  
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    
    const loadVPC = async () => {
      try {
        const { data, error } = await supabase
          .from('value_proposition_canvas')
          .select('*')
          .eq('user_id', userId)
          .eq('segment_name', selectedSegment)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          return;
        }
        
        if (data) {
          setVpcId(data.id);
          
          // ✅ PŘEPIŠ barvy všech štítků na barvu aktuálního segmentu!
          const currentSegmentColor = availableSegments.find(s => s.text === selectedSegment)?.color || '#3b82f6';
          console.log('🔄 Přepisování barev na:', currentSegmentColor, 'pro segment:', selectedSegment);
          
          const jobsWithCorrectColor = (data.jobs || []).map((job: any) => ({
            text: typeof job === 'string' ? job : job.text,
            color: currentSegmentColor
          }));
          
          const painsWithCorrectColor = (data.pains || []).map((pain: any) => ({
            text: typeof pain === 'string' ? pain : pain.text,
            color: currentSegmentColor
          }));
          
          const gainsWithCorrectColor = (data.gains || []).map((gain: any) => ({
            text: typeof gain === 'string' ? gain : gain.text,
            color: currentSegmentColor
          }));
          
          setJobs(jobsWithCorrectColor);
          setPains(painsWithCorrectColor);
          setGains(gainsWithCorrectColor);
        }
      } catch (err) {
        console.error('Error loading VPC:', err);
      }
    };
    
    loadVPC();
  }, [userId, selectedSegment]);
  
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    
    const saveTimeout = setTimeout(async () => {
      await saveVPC();
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [jobs, pains, gains]);
  
  const saveVPC = async () => {
    if (!userId || !selectedSegment || isSaving) return;
    
    setIsSaving(true);
    
    try {
      const vpcData = {
        user_id: userId,
        segment_name: selectedSegment,
        jobs,
        pains,
        gains
      };
      
      if (vpcId) {
        const { error } = await supabase
          .from('value_proposition_canvas')
          .update(vpcData)
          .eq('id', vpcId);
        
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('value_proposition_canvas')
          .insert([vpcData])
          .select()
          .single();
        
        if (error) throw error;
        if (data) setVpcId(data.id);
      }
    } catch (err) {
      console.error('Error saving VPC:', err);
    } finally {
      setIsSaving(false);
    }
  };
  
  const addJob = () => {
    if (!newJob.trim()) return;
    // ✅ Použij barvu SEGMENTU místo hardcoded!
    const selectedSegmentObj = availableSegments.find(s => s.text === selectedSegment);
    const segmentColor = selectedSegmentObj?.color || '#f59e0b';
    console.log('✅ Adding job with segment color:', segmentColor, 'from segment:', selectedSegment);
    setJobs([...jobs, { text: newJob.trim(), color: segmentColor }]);
    setNewJob("");
  };
  
  const addPain = () => {
    if (!newPain.trim()) return;
    // ✅ Použij barvu SEGMENTU místo hardcoded!
    const selectedSegmentObj = availableSegments.find(s => s.text === selectedSegment);
    const segmentColor = selectedSegmentObj?.color || '#ef4444';
    console.log('✅ Adding pain with segment color:', segmentColor, 'from segment:', selectedSegment);
    setPains([...pains, { text: newPain.trim(), color: segmentColor }]);
    setNewPain("");
  };
  
  const addGain = () => {
    if (!newGain.trim()) return;
    // ✅ Použij barvu SEGMENTU místo hardcoded!
    const selectedSegmentObj = availableSegments.find(s => s.text === selectedSegment);
    const segmentColor = selectedSegmentObj?.color || '#10b981';
    console.log('✅ Adding gain with segment color:', segmentColor, 'from segment:', selectedSegment);
    setGains([...gains, { text: newGain.trim(), color: segmentColor }]);
    setNewGain("");
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Segment Selector */}
      <div className="mb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-300 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-5 h-5 text-gray-600" />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-sm">Vyberte zákaznický segment</h3>
            <p className="text-xs text-gray-700">Z vašeho Business Model Canvas</p>
          </div>
        </div>
        
        {availableSegments.length === 0 ? (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-3">
            <p className="text-xs text-amber-800">
              ⚠️ Nejdřív vyplňte "Zákaznické segmenty" v Business Model Canvas (Modul 1)
            </p>
          </div>
        ) : (
          <>
            <button
              onClick={() => setShowSegmentSelector(!showSegmentSelector)}
              className="w-full bg-white border-2 border-gray-300 rounded-lg p-3 flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                {selectedSegment ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{selectedSegment}</span>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">Vyberte segment...</span>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSegmentSelector ? 'rotate-180' : ''}`} />
            </button>
            
            {showSegmentSelector && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 space-y-1"
              >
                {availableSegments.map((segment, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectSegment(segment.text);
                      setShowSegmentSelector(false);
                    }}
                    className={`w-full p-2 rounded-lg border-2 text-left flex items-center gap-2 transition-all text-sm ${
                      selectedSegment === segment.text
                        ? 'bg-gray-100 border-gray-400'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="font-medium text-gray-900">{segment.text}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
      
      {/* Circle Layout - MENŠÍ */}
      <div className="relative bg-white p-8">
        <div className="relative w-full aspect-square max-w-lg mx-auto">
          {/* Outer Circle */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
          
          {/* Diagonal Line */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <line x1="15" y1="85" x2="85" y2="15" stroke="#1f2937" strokeWidth="0.3" />
            </svg>
          </div>
          
          {/* CENTER - Segment (ŠEDÝ štítek) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-gray-400 text-white rounded-lg px-4 py-3 shadow-xl">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs font-bold">{selectedSegment || 'Segment'}</p>
              </div>
            </div>
          </div>
          
          {/* TOP - Gains (ZELENÉ štítky) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-56">
            <div className="bg-white p-3 rounded-xl border-2 border-green-300">
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
                  <span className="text-sm">😊</span>
                  <span className="text-xs font-bold text-green-900">Očekávání</span>
                </div>
              </div>
              <div className="space-y-1">
                {gains.map((gain, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative"
                    style={{ transform: `rotate(${Math.random() * 6 - 3}deg)` }}
                  >
                    <div
                      className="px-2 py-1 rounded text-white text-xs font-medium shadow-sm flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: gain.color }}
                    >
                      <span className="flex-1 line-clamp-1">{gain.text}</span>
                      <button
                        onClick={() => setGains(gains.filter((_, i) => i !== idx))}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                <input
                  type="text"
                  value={newGain}
                  onChange={(e) => setNewGain(e.target.value)}
                  placeholder="+ Přidat očekávání"
                  className="w-full px-2 py-1 border border-green-300 rounded text-xs bg-green-50/50 placeholder:text-green-600"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') addGain();
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* RIGHT - Jobs (ŽLUTÉ štítky) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-56">
            <div className="bg-white p-3 rounded-xl border-2 border-yellow-300">
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded-full">
                  <span className="text-sm">🎯</span>
                  <span className="text-xs font-bold text-yellow-900">Důvod návštěvy</span>
                </div>
              </div>
              <div className="space-y-1">
                {jobs.map((job, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative"
                    style={{ transform: `rotate(${Math.random() * 6 - 3}deg)` }}
                  >
                    <div
                      className="px-2 py-1 rounded text-white text-xs font-medium shadow-sm flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: job.color }}
                    >
                      <span className="flex-1 line-clamp-1">{job.text}</span>
                      <button
                        onClick={() => setJobs(jobs.filter((_, i) => i !== idx))}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                <input
                  type="text"
                  value={newJob}
                  onChange={(e) => setNewJob(e.target.value)}
                  placeholder="+ Přidat důvod"
                  className="w-full px-2 py-1 border border-yellow-300 rounded text-xs bg-yellow-50/50 placeholder:text-yellow-600"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') addJob();
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* BOTTOM - Pains (ČERVENÉ štítky) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10 w-56">
            <div className="bg-white p-3 rounded-xl border-2 border-red-300">
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-1 bg-red-100 px-2 py-0.5 rounded-full">
                  <span className="text-sm">😢</span>
                  <span className="text-xs font-bold text-red-900">Obavy</span>
                </div>
              </div>
              <div className="space-y-1">
                {pains.map((pain, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative"
                    style={{ transform: `rotate(${Math.random() * 6 - 3}deg)` }}
                  >
                    <div
                      className="px-2 py-1 rounded text-white text-xs font-medium shadow-sm flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: pain.color }}
                    >
                      <span className="flex-1 line-clamp-1">{pain.text}</span>
                      <button
                        onClick={() => setPains(pains.filter((_, i) => i !== idx))}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                <input
                  type="text"
                  value={newPain}
                  onChange={(e) => setNewPain(e.target.value)}
                  placeholder="+ Přidat obavu"
                  className="w-full px-2 py-1 border border-red-300 rounded text-xs bg-red-50/50 placeholder:text-red-600"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') addPain();
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* LEFT - Arrow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
            <div className="text-2xl text-gray-400">←</div>
          </div>
        </div>
        
        {/* Save Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Save className={`w-3 h-3 ${isSaving ? 'animate-pulse text-blue-500' : 'text-green-500'}`} />
          <span>{isSaving ? 'Ukládám...' : 'Uloženo'}</span>
        </div>
      </div>
    </div>
  );
}
