import { useState, useEffect } from "react";
import { Plus, X, Save } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { CustomerProfileContextHints } from "./CustomerProfileContextHints";

interface Props {
  userId: string;
  selectedSegment: string;
}

// 🎨 Helper pro barvy podle segmentu
const getSegmentColors = (segmentColor: string) => {
  console.log('🎨 getSegmentColors called with:', segmentColor);
  
  // Pro bílou/šedou barvu nebo když není definována - vrať inline RGB hodnoty!
  if (!segmentColor || segmentColor === '#d1d5db' || segmentColor.toLowerCase() === 'white') {
    console.log('→ Using default colors');
    return {
      jobs: { bg: 'rgb(254, 249, 195)', border: 'rgb(253, 224, 71)', text: 'rgb(146, 64, 14)', button: 'rgb(202, 138, 4)', buttonHover: 'rgb(161, 98, 7)' },
      pains: { bg: 'rgb(254, 242, 242)', border: 'rgb(252, 165, 165)', text: 'rgb(153, 27, 27)', button: 'rgb(220, 38, 38)', buttonHover: 'rgb(185, 28, 28)' },
      gains: { bg: 'rgb(240, 253, 244)', border: 'rgb(134, 239, 172)', text: 'rgb(22, 101, 52)', button: 'rgb(22, 163, 74)', buttonHover: 'rgb(21, 128, 61)' }
    };
  }
  
  // Pro barevný segment - vygeneruj tmavší odstíny
  // Převeď hex na RGB a pak na tmavší varianty
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 59, g: 130, b: 246 }; // fallback modrá
  };
  
  const rgb = hexToRgb(segmentColor);
  console.log('→ Parsed RGB:', rgb);
  
  // Jobs - světlejší odstín (90% světlosti)
  const jobsBg = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.9)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.9)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.9)})`;
  const jobsBorder = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.6)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.6)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.6)})`;
  
  // Pains - střední odstín (80% světlosti)
  const painsBg = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.85)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.85)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.85)})`;
  const painsBorder = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.5)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.5)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.5)})`;
  
  // Gains - tmavší odstín (70% světlosti)
  const gainsBg = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.75)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.75)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.75)})`;
  const gainsBorder = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.4)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.4)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.4)})`;
  
  // Text - EXTRA TMAVÁ varianta pro maximální kontrast (15% původní barvy)
  const darkColor = `rgb(${Math.max(20, rgb.r * 0.15)} ${Math.max(20, rgb.g * 0.15)} ${Math.max(20, rgb.b * 0.15)})`;
  const buttonColor = `rgb(${Math.max(0, rgb.r * 0.8)} ${Math.max(0, rgb.g * 0.8)} ${Math.max(0, rgb.b * 0.8)})`;
  const buttonHover = `rgb(${Math.max(0, rgb.r * 0.6)} ${Math.max(0, rgb.g * 0.6)} ${Math.max(0, rgb.b * 0.6)})`;
  
  console.log('→ Generated colors:', { 
    jobsBg, 
    jobsBorder, 
    darkColor,
    buttonColor 
  });
  
  return {
    jobs: { bg: jobsBg, border: jobsBorder, text: darkColor, button: buttonColor, buttonHover },
    pains: { bg: painsBg, border: painsBorder, text: darkColor, button: buttonColor, buttonHover },
    gains: { bg: gainsBg, border: gainsBorder, text: darkColor, button: buttonColor, buttonHover }
  };
};

export function VPCCustomerProfile({ userId, selectedSegment }: Props) {
  const [jobs, setJobs] = useState<string[]>([]);
  const [pains, setPains] = useState<string[]>([]);
  const [gains, setGains] = useState<string[]>([]);
  
  const [newJob, setNewJob] = useState("");
  const [newPain, setNewPain] = useState("");
  const [newGain, setNewGain] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [vpcId, setVpcId] = useState<number | null>(null);
  const [segmentColor, setSegmentColor] = useState<string>('');
  
  // Load VPC data + segment color
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    
    const loadVPC = async () => {
      try {
        // 🎨 Načti barvu segmentu
        const { data: segmentData } = await supabase
          .from('user_canvas_data')
          .select('content')
          .eq('user_id', userId)
          .eq('section_key', 'segments')
          .maybeSingle();
        
        if (segmentData?.content) {
          const segment = segmentData.content.find((s: any) => s.text === selectedSegment);
          if (segment) {
            console.log('🎨 VPCCustomerProfile - Segment color:', segment.color);
            setSegmentColor(segment.color || '');
          }
        }
        
        // Načti VPC data
        const { data, error } = await supabase
          .from('value_proposition_canvas')
          .select('*')
          .eq('user_id', userId)
          .eq('segment_name', selectedSegment)
          .is('selected_value', null)
          .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error loading VPC:', error);
          return;
        }
        
        if (data) {
          setVpcId(data.id);
          setJobs(data.jobs || []);
          setPains(data.pains || []);
          setGains(data.gains || []);
        }
      } catch (err) {
        console.error('Error loading VPC:', err);
      }
    };
    
    loadVPC();
  }, [userId, selectedSegment]);
  
  // Auto-save
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
      toast.error('Chyba při ukládání');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-xl">
        <h2 className="text-2xl font-bold mb-2">👥 Zákaznický Profil</h2>
        <p className="text-blue-100">
          Segment: <strong>{selectedSegment}</strong>
        </p>
      </div>
      
      <div className="bg-blue-50 p-8 rounded-b-xl border-2 border-blue-300">
        <p className="text-sm text-blue-700 mb-6">
          Vyplňte co tento zákaznický segment potřebuje, co ho trápí a co očekává.
        </p>
        
        {/* Jobs */}
        <CustomerProfileContextHints currentStep={1} selectedSegment={selectedSegment} />
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-lg" style={{ color: getSegmentColors(segmentColor).jobs.text }}>
            🎯 Cíl/Důvod návštěvy
          </h3>
          <p className="text-sm mb-3" style={{ color: getSegmentColors(segmentColor).jobs.text }}>
            Co segment chce udělat? Proč k vám přichází?
          </p>
          <div className="space-y-2 mb-3">
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg border-2 flex items-start gap-2"
                style={{ 
                  backgroundColor: getSegmentColors(segmentColor).jobs.bg,
                  borderColor: getSegmentColors(segmentColor).jobs.border
                }}
              >
                <span className="flex-1 text-sm" style={{ color: getSegmentColors(segmentColor).jobs.text }}>{job}</span>
                <button
                  onClick={() => setJobs(jobs.filter((_, i) => i !== idx))}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newJob}
              onChange={(e) => setNewJob(e.target.value)}
              placeholder='Např: "Pracovat produktivně mimo domov"'
              className="flex-1 px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ 
                borderColor: getSegmentColors(segmentColor).jobs.border
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newJob.trim()) {
                  setJobs([...jobs, newJob.trim()]);
                  setNewJob("");
                }
              }}
            />
            <Button
              size="sm"
              onClick={() => {
                if (newJob.trim()) {
                  setJobs([...jobs, newJob.trim()]);
                  setNewJob("");
                }
              }}
              style={{
                backgroundColor: getSegmentColors(segmentColor).jobs.button,
                borderColor: getSegmentColors(segmentColor).jobs.border
              }}
              className="hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Pains */}
        <CustomerProfileContextHints currentStep={2} selectedSegment={selectedSegment} />
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-lg" style={{ color: getSegmentColors(segmentColor).pains.text }}>
            😰 Obavy
          </h3>
          <p className="text-sm mb-3" style={{ color: getSegmentColors(segmentColor).pains.text }}>
            Co ho trápí nebo brání?
          </p>
          <div className="space-y-2 mb-3">
            {pains.map((pain, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg border-2 flex items-start gap-2"
                style={{ 
                  backgroundColor: getSegmentColors(segmentColor).pains.bg,
                  borderColor: getSegmentColors(segmentColor).pains.border
                }}
              >
                <span className="flex-1 text-sm" style={{ color: getSegmentColors(segmentColor).pains.text }}>{pain}</span>
                <button
                  onClick={() => setPains(pains.filter((_, i) => i !== idx))}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPain}
              onChange={(e) => setNewPain(e.target.value)}
              placeholder='Např: "Drahý coworking (300 Kč/den)"'
              className="flex-1 px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ 
                borderColor: getSegmentColors(segmentColor).pains.border
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newPain.trim()) {
                  setPains([...pains, newPain.trim()]);
                  setNewPain("");
                }
              }}
            />
            <Button
              size="sm"
              onClick={() => {
                if (newPain.trim()) {
                  setPains([...pains, newPain.trim()]);
                  setNewPain("");
                }
              }}
              style={{
                backgroundColor: getSegmentColors(segmentColor).pains.button,
                borderColor: getSegmentColors(segmentColor).pains.border
              }}
              className="hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Gains */}
        <CustomerProfileContextHints currentStep={3} selectedSegment={selectedSegment} />
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-lg" style={{ color: getSegmentColors(segmentColor).gains.text }}>
            ✨ Očekávání
          </h3>
          <p className="text-sm mb-3" style={{ color: getSegmentColors(segmentColor).gains.text }}>
            Co by mu usnadnilo život?
          </p>
          <div className="space-y-2 mb-3">
            {gains.map((gain, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg border-2 flex items-start gap-2"
                style={{ 
                  backgroundColor: getSegmentColors(segmentColor).gains.bg,
                  borderColor: getSegmentColors(segmentColor).gains.border
                }}
              >
                <span className="flex-1 text-sm" style={{ color: getSegmentColors(segmentColor).gains.text }}>{gain}</span>
                <button
                  onClick={() => setGains(gains.filter((_, i) => i !== idx))}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newGain}
              onChange={(e) => setNewGain(e.target.value)}
              placeholder='Např: "Profesionální prostředí s WiFi"'
              className="flex-1 px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ 
                borderColor: getSegmentColors(segmentColor).gains.border
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newGain.trim()) {
                  setGains([...gains, newGain.trim()]);
                  setNewGain("");
                }
              }}
            />
            <Button
              size="sm"
              onClick={() => {
                if (newGain.trim()) {
                  setGains([...gains, newGain.trim()]);
                  setNewGain("");
                }
              }}
              style={{
                backgroundColor: getSegmentColors(segmentColor).gains.button,
                borderColor: getSegmentColors(segmentColor).gains.border
              }}
              className="hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Save Indicator */}
        <div className="flex items-center justify-between bg-white rounded-lg p-4 border-2 border-blue-200">
          <div className="flex items-center gap-3">
            <Save className={`w-5 h-5 ${isSaving ? 'text-blue-500 animate-pulse' : 'text-green-500'}`} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {isSaving ? 'Ukládám...' : '✅ Automaticky uloženo'}
              </p>
              <p className="text-xs text-gray-500">
                {jobs.length + pains.length + gains.length} položek celkem
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={saveVPC}
            disabled={isSaving}
          >
            💾 Uložit teď
          </Button>
        </div>
      </div>
    </div>
  );
}
