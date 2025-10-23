import { useState, useEffect } from "react";
import { Plus, X, Save } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

interface Props {
  userId: string;
  selectedSegment?: string;
}

export function ValuePropositionCanvas({ userId, selectedSegment = "Můj segment" }: Props) {
  const [jobs, setJobs] = useState<string[]>([]);
  const [pains, setPains] = useState<string[]>([]);
  const [gains, setGains] = useState<string[]>([]);
  
  const [products, setProducts] = useState<string[]>([]);
  const [painRelievers, setPainRelievers] = useState<string[]>([]);
  const [gainCreators, setGainCreators] = useState<string[]>([]);
  
  const [newJob, setNewJob] = useState("");
  const [newPain, setNewPain] = useState("");
  const [newGain, setNewGain] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [newPainReliever, setNewPainReliever] = useState("");
  const [newGainCreator, setNewGainCreator] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [vpcId, setVpcId] = useState<number | null>(null);
  
  // Load VPC data from Supabase
  useEffect(() => {
    if (!userId) return;
    
    const loadVPC = async () => {
      try {
        const { data, error } = await supabase
          .from('value_proposition_canvas')
          .select('*')
          .eq('user_id', userId)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error loading VPC:', error);
          return;
        }
        
        if (data) {
          setVpcId(data.id);
          setJobs(data.jobs || []);
          setPains(data.pains || []);
          setGains(data.gains || []);
          setProducts(data.products || []);
          setPainRelievers(data.pain_relievers || []);
          setGainCreators(data.gain_creators || []);
        }
      } catch (err) {
        console.error('Error loading VPC:', err);
      }
    };
    
    loadVPC();
  }, [userId]);
  
  // Auto-save VPC data (debounced)
  useEffect(() => {
    if (!userId) return;
    
    const saveTimeout = setTimeout(async () => {
      await saveVPC();
    }, 1000); // Auto-save po 1 sekundě nečinnosti
    
    return () => clearTimeout(saveTimeout);
  }, [jobs, pains, gains, products, painRelievers, gainCreators]);
  
  const saveVPC = async () => {
    if (!userId || isSaving) return;
    
    setIsSaving(true);
    
    try {
      const vpcData = {
        user_id: userId,
        segment_name: selectedSegment,
        jobs,
        pains,
        gains,
        products,
        pain_relievers: painRelievers,
        gain_creators: gainCreators
      };
      
      if (vpcId) {
        // Update existing
        const { error } = await supabase
          .from('value_proposition_canvas')
          .update(vpcData)
          .eq('id', vpcId);
        
        if (error) throw error;
      } else {
        // Insert new
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
      // ❌ Odstraněno - duplicitní toast (console.error stačí)
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-t-xl">
        <h2 className="text-2xl font-bold mb-2">💎 Hodnotová Mapa</h2>
        <p className="text-blue-100">
          Segment: <strong>{selectedSegment}</strong>
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-b-xl">
        {/* LEVÁ STRANA: Zákaznický Profil */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
          <h3 className="text-xl font-bold text-blue-900 mb-4">👥 Zákaznický Profil</h3>
          <p className="text-sm text-blue-700 mb-6">Co zákazník potřebuje a co ho trápí?</p>
          
          {/* Jobs */}
          <div className="mb-6">
            <h4 className="font-bold text-amber-800 mb-2">🎯 Cíl/Důvod návštěvy</h4>
            <p className="text-xs text-amber-600 mb-3">Co segment chce udělat?</p>
            <div className="space-y-2 mb-3">
              {jobs.map((job, idx) => (
                <div key={idx} className="bg-yellow-100 p-3 rounded border-2 border-yellow-300 flex items-start gap-2">
                  <span className="flex-1 text-sm">{job}</span>
                  <button onClick={() => setJobs(jobs.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newJob}
                onChange={(e) => setNewJob(e.target.value)}
                placeholder="Např: Pracovat produktivně..."
                className="flex-1 px-3 py-2 border border-yellow-300 rounded text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newJob.trim()) {
                    setJobs([...jobs, newJob.trim()]);
                    setNewJob("");
                  }
                }}
              />
              <Button
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700"
                onClick={() => {
                  if (newJob.trim()) {
                    setJobs([...jobs, newJob.trim()]);
                    setNewJob("");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Pains */}
          <div className="mb-6">
            <h4 className="font-bold text-red-800 mb-2">😰 Obavy</h4>
            <p className="text-xs text-red-600 mb-3">Co ho štve nebo brání?</p>
            <div className="space-y-2 mb-3">
              {pains.map((pain, idx) => (
                <div key={idx} className="bg-red-50 p-3 rounded border-2 border-red-200 flex items-start gap-2">
                  <span className="flex-1 text-sm">{pain}</span>
                  <button onClick={() => setPains(pains.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPain}
                onChange={(e) => setNewPain(e.target.value)}
                placeholder="Např: Drahý coworking..."
                className="flex-1 px-3 py-2 border border-red-300 rounded text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newPain.trim()) {
                    setPains([...pains, newPain.trim()]);
                    setNewPain("");
                  }
                }}
              />
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (newPain.trim()) {
                    setPains([...pains, newPain.trim()]);
                    setNewPain("");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Gains */}
          <div>
            <h4 className="font-bold text-green-800 mb-2">✨ Očekávání</h4>
            <p className="text-xs text-green-600 mb-3">Co by mu usnadnilo život?</p>
            <div className="space-y-2 mb-3">
              {gains.map((gain, idx) => (
                <div key={idx} className="bg-green-50 p-3 rounded border-2 border-green-200 flex items-start gap-2">
                  <span className="flex-1 text-sm">{gain}</span>
                  <button onClick={() => setGains(gains.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newGain}
                onChange={(e) => setNewGain(e.target.value)}
                placeholder="Např: Profesionální prostředí..."
                className="flex-1 px-3 py-2 border border-green-300 rounded text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newGain.trim()) {
                    setGains([...gains, newGain.trim()]);
                    setNewGain("");
                  }
                }}
              />
              <Button
                size="sm"
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  if (newGain.trim()) {
                    setGains([...gains, newGain.trim()]);
                    setNewGain("");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* PRAVÁ STRANA: Hodnotová Mapa */}
        <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
          <h3 className="text-xl font-bold text-green-900 mb-4">💎 Hodnotová Mapa</h3>
          <p className="text-sm text-green-700 mb-6">Jak vaše hodnota řeší tyto problémy?</p>
          
          {/* Products */}
          <div className="mb-6">
            <h4 className="font-bold text-amber-800 mb-2">📦 Produkty a Služby</h4>
            <p className="text-xs text-amber-600 mb-3">Co nabízíte?</p>
            <div className="space-y-2 mb-3">
              {products.map((product, idx) => (
                <div key={idx} className="bg-yellow-100 p-3 rounded border-2 border-yellow-300 flex items-start gap-2">
                  <span className="flex-1 text-sm">{product}</span>
                  <button onClick={() => setProducts(products.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Např: Workspace s WiFi..."
                className="flex-1 px-3 py-2 border border-yellow-300 rounded text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newProduct.trim()) {
                    setProducts([...products, newProduct.trim()]);
                    setNewProduct("");
                  }
                }}
              />
              <Button
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700"
                onClick={() => {
                  if (newProduct.trim()) {
                    setProducts([...products, newProduct.trim()]);
                    setNewProduct("");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Pain Relievers */}
          <div className="mb-6">
            <h4 className="font-bold text-green-800 mb-2">🛡️ Řešení Obtíží</h4>
            <p className="text-xs text-green-600 mb-3">Jak řešíte obavy zákazníka?</p>
            <div className="space-y-2 mb-3">
              {painRelievers.map((reliever, idx) => (
                <div key={idx} className="bg-green-50 p-3 rounded border-2 border-green-300 flex items-start gap-2">
                  <span className="flex-1 text-sm">{reliever}</span>
                  <button onClick={() => setPainRelievers(painRelievers.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPainReliever}
                onChange={(e) => setNewPainReliever(e.target.value)}
                placeholder="Např: Jen cena kávy (80 Kč)..."
                className="flex-1 px-3 py-2 border border-green-300 rounded text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newPainReliever.trim()) {
                    setPainRelievers([...painRelievers, newPainReliever.trim()]);
                    setNewPainReliever("");
                  }
                }}
              />
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  if (newPainReliever.trim()) {
                    setPainRelievers([...painRelievers, newPainReliever.trim()]);
                    setNewPainReliever("");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Gain Creators */}
          <div>
            <h4 className="font-bold text-green-800 mb-2">✨ Tvorba Přínosů</h4>
            <p className="text-xs text-green-600 mb-3">Jak vytváříte očekávané přínosy?</p>
            <div className="space-y-2 mb-3">
              {gainCreators.map((creator, idx) => (
                <div key={idx} className="bg-green-50 p-3 rounded border-2 border-green-300 flex items-start gap-2">
                  <span className="flex-1 text-sm">{creator}</span>
                  <button onClick={() => setGainCreators(gainCreators.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newGainCreator}
                onChange={(e) => setNewGainCreator(e.target.value)}
                placeholder="Např: Community events..."
                className="flex-1 px-3 py-2 border border-green-300 rounded text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newGainCreator.trim()) {
                    setGainCreators([...gainCreators, newGainCreator.trim()]);
                    setNewGainCreator("");
                  }
                }}
              />
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  if (newGainCreator.trim()) {
                    setGainCreators([...gainCreators, newGainCreator.trim()]);
                    setNewGainCreator("");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Indicator */}
      <div className="mt-6 flex items-center justify-between bg-white border-2 border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Save className={`w-5 h-5 ${isSaving ? 'text-blue-500 animate-pulse' : 'text-green-500'}`} />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {isSaving ? 'Ukládám...' : 'Automaticky uloženo'}
            </p>
            <p className="text-xs text-gray-500">
              Vaše data se ukládají průběžně
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
  );
}
