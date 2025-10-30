import { useState, useEffect } from "react";
import { Users, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabase";

interface Segment {
  text: string;
  color: string;
}

interface Props {
  userId: string;
  selectedSegment: string | null;
  onSelectSegment: (segment: string) => void;
}

export function SegmentSelector({ userId, selectedSegment, onSelectSegment }: Props) {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadSegments();
  }, [userId]);
  
  const loadSegments = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .single();
      
      if (error) {
        console.error('Error loading segments:', error);
        return;
      }
      
      if (data && data.content) {
        setSegments(data.content);
        
        // Auto-select first segment if none selected
        if (!selectedSegment && data.content.length > 0) {
          onSelectSegment(data.content[0].text);
        }
      }
    } catch (err) {
      console.error('Error loading segments:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-48" />
        </div>
      </div>
    );
  }
  
  if (segments.length === 0) {
    return (
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
        <h3 className="font-bold text-amber-900 mb-2">⚠️ Nejdřív vyplňte Podnikatelský model!</h3>
        <p className="text-sm text-amber-800 mb-4">
          Pro Hodnotovou nabídku potřebujete mít alespoň 1 zákaznický segment v Podnikatelské Čtvrtce.
        </p>
        <Button
          onClick={() => window.location.hash = '#course-v3'}
          variant="outline"
          className="border-amber-400 text-amber-900 hover:bg-amber-100"
        >
          Zpět na Modul 1
        </Button>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-300 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-6 h-6 text-blue-600" />
        <div>
          <h3 className="font-bold text-blue-900">Vyberte zákaznický segment</h3>
          <p className="text-sm text-blue-700">Pro který segment chcete vytvořit Hodnotovou nabídku?</p>
        </div>
      </div>
      
      <div className="grid gap-3">
        {segments.map((segment, idx) => {
          const isSelected = selectedSegment === segment.text;
          
          return (
            <button
              key={idx}
              onClick={() => onSelectSegment(segment.text)}
              className={`p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] ${
                isSelected
                  ? 'bg-blue-100 border-blue-400 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: segment.color }}
                />
                <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                  {segment.text}
                </span>
              </div>
              {isSelected && (
                <div className="flex items-center gap-2 text-blue-600">
                  <span className="text-sm font-medium">Vybrán</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {selectedSegment && (
        <div className="mt-4 bg-white/50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            ✅ <strong>Pracujete se segmentem:</strong> {selectedSegment}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Vyplňte VPC pro tento konkrétní segment. Pokud máte více segmentů, můžete později vytvořit VPC pro každý zvlášť.
          </p>
        </div>
      )}
    </div>
  );
}
