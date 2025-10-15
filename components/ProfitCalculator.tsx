import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Users, Target, ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { supabase } from "../lib/supabase";

interface Props {
  userId: string;
  onComplete: () => void;
  onNavigateNext?: () => void;
  onAchievementUnlocked?: (achievementId: string) => void;
}

export function ProfitCalculator({ userId, onComplete, onNavigateNext, onAchievementUnlocked }: Props) {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCosts, setTotalCosts] = useState(0);
  const [currentCustomers, setCurrentCustomers] = useState(0);
  const [avgRevenuePerCustomer, setAvgRevenuePerCustomer] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [segments, setSegments] = useState<Array<{name: string, customers: number, avgRevenue: number, color?: string}>>([
    { name: 'Segment 1', customers: 0, avgRevenue: 0 }
  ]);
  const [revenueStreams, setRevenueStreams] = useState<Array<{name: string, value: number, color?: string}>>([]);
  const [valuePropositions, setValuePropositions] = useState<Array<{name: string, color?: string}>>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load financial data + segments + revenue streams + value props from Canvas
  useEffect(() => {
    const loadFinancialData = async () => {
      try {
        const { data } = await supabase
          .from('user_canvas_data')
          .select('*')
          .eq('user_id', userId)
          .in('section_key', ['revenue', 'costs', 'segments', 'value']);
        
        if (data) {
          let revenue = 0;
          let costs = 0;
          const userSegments: Array<{name: string, customers: number, avgRevenue: number, color?: string}> = [];
          const userRevenueStreams: Array<{name: string, value: number, color?: string}> = [];
          const userValueProps: Array<{name: string, color?: string}> = [];
          
          data.forEach(section => {
            const items = section.content || [];
            const total = items.reduce((sum: number, item: any) => sum + (item.value || 0), 0);
            
            if (section.section_key === 'revenue') {
              revenue = total;
              // Extract individual revenue streams WITH COLORS
              items.forEach((item: any) => {
                if (item.text && item.value && item.value > 0) {
                  userRevenueStreams.push({
                    name: item.text,
                    value: item.value,
                    color: item.color || 'global' // Default to global if no color
                  });
                }
              });
            }
            
            if (section.section_key === 'costs') costs = total;
            
            // Load segments WITH COLORS (excluding white)
            if (section.section_key === 'segments') {
              items.forEach((item: any) => {
                if (item.color && item.color !== 'white') {
                  userSegments.push({
                    name: item.text || `Segment ${item.color}`,
                    customers: 0,
                    avgRevenue: 0,
                    color: item.color
                  });
                }
              });
            }
            
            // Load value propositions (JEN pro seznam, NE pro příjmy!)
            if (section.section_key === 'value') {
              items.forEach((item: any) => {
                if (item.text && item.color && item.color !== 'white') {
                  userValueProps.push({
                    name: item.text,
                    color: item.color
                  });
                }
              });
            }
          });
          
          setTotalRevenue(revenue);
          setTotalCosts(costs);
          
          // Set revenue streams
          if (userRevenueStreams.length > 0) {
            setRevenueStreams(userRevenueStreams.sort((a, b) => b.value - a.value));
          }
          
          // Set value propositions
          if (userValueProps.length > 0) {
            setValuePropositions(userValueProps);
          }
          
          // Set segments WITH LOADED DATA from DB
          if (userSegments.length > 0) {
            // Načti segments data z DB (currentValue, value)
            const segmentsFromDB = data.find(d => d.section_key === 'segments');
            
            if (segmentsFromDB?.content) {
              console.log('📊 Loading segments from DB:', segmentsFromDB.content);
              
              const enrichedSegments = userSegments.map(us => {
                const dbSegment = segmentsFromDB.content.find((s: any) => s.text === us.name);
                
                if (dbSegment) {
                  return {
                    name: us.name,
                    customers: dbSegment.currentValue || 0,
                    avgRevenue: dbSegment.value || 0,
                    color: us.color // ✅ Přidej barvu!
                  };
                }
                
                return us;
              });
              
              console.log('✅ Enriched segments with DB data:', enrichedSegments);
              setSegments(enrichedSegments);
              
              // Spočítej total customers
              const totalCust = enrichedSegments.reduce((sum, s) => sum + s.customers, 0);
              setCurrentCustomers(totalCust);
            } else {
              setSegments(userSegments);
            }
            
            // AUTO-ENABLE advanced mode if 2+ segments
            if (userSegments.length >= 2) {
              setShowAdvanced(true);
            }
          }
          
          setLoaded(true);
          
          // 🏆 Trigger achievement - Profit calculated (když má data)
          if ((revenue > 0 || costs > 0) && onAchievementUnlocked) {
            onAchievementUnlocked('profit-calculated');
          }
        }
      } catch (err) {
        console.error('Failed to load financial data:', err);
      }
    };
    
    loadFinancialData();
  }, [userId, onAchievementUnlocked]);

  // 💾 DEBOUNCED SAVE - ukládá až po 500ms nečinnosti
  const debouncedSave = (newSegments: Array<{name: string, customers: number, avgRevenue: number, color?: string}>) => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    
    saveTimerRef.current = setTimeout(() => {
      saveSegmentsToDatabase(newSegments);
    }, 500);
  };

  // 💾 SAVE segments to database
  const saveSegmentsToDatabase = async (newSegments: Array<{name: string, customers: number, avgRevenue: number, color?: string}>) => {
    try {
      console.log('💾 [DEBOUNCED] Saving segments to DB:', newSegments);
      
      // Načti aktuální segments z DB
      const { data: currentSegmentsData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .maybeSingle();
      
      if (!currentSegmentsData?.content) {
        console.log('⚠️ No segments in DB yet - cannot save customers data');
        return;
      }
      
      console.log('📊 Current segments in DB:', currentSegmentsData.content);
      
      // Spočítej průměrnou útrátu per segment
      const totalCustomersInSegments = newSegments.reduce((sum, s) => sum + s.customers, 0);
      
      // Aktualizuj segments s novými hodnotami
      const updatedSegments = currentSegmentsData.content.map((seg: any) => {
        const match = newSegments.find(ns => ns.name === seg.text);
        
        if (match) {
          // 🎯 NOVÝ VÝPOČET: Spoj příjmy podle barev!
          // 1. Najdi příjmy přímo pro tento segment (matching color)
          const directRevenue = revenueStreams
            .filter(stream => stream.color === seg.color)
            .reduce((sum, stream) => sum + stream.value, 0);
          
          // 2. Najdi globální příjmy a rozdel proporcionálně
          const globalRevenue = revenueStreams
            .filter(stream => stream.color === 'global' || stream.color === 'gray')
            .reduce((sum, stream) => sum + stream.value, 0);
          
          const segmentShare = totalCustomersInSegments > 0 ? match.customers / totalCustomersInSegments : 0;
          const globalShare = globalRevenue * segmentShare;
          
          // 3. CELKEM pro tento segment
          const segmentRevenue = directRevenue + globalShare;
          const avgRevenueForSegment = match.customers > 0 ? Math.round(segmentRevenue / match.customers) : 0;
          
          console.log(`  ✅ Updating ${seg.text}: customers=${match.customers}, avgRevenue=${avgRevenueForSegment}`);
          return {
            ...seg,
            currentValue: match.customers,
            targetValue: match.customers > 0 ? match.customers : (seg.targetValue || 100),
            value: avgRevenueForSegment > 0 ? avgRevenueForSegment : seg.value
          };
        }
        
        return seg;
      });
      
      console.log('📝 Updated segments to save:', updatedSegments);
      
      // Ulož zpět do DB
      const { error } = await supabase
        .from('user_canvas_data')
        .update({ content: updatedSegments })
        .eq('user_id', userId)
        .eq('section_key', 'segments');
      
      if (error) {
        console.error('❌ Error saving segments:', error);
      } else {
        console.log('✅ Segments saved successfully!');
      }
    } catch (err) {
      console.error('❌ Error in saveSegmentsToDatabase:', err);
    }
  };

  const profit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? ((profit / totalRevenue) * 100) : 0;
  const isProfitable = profit > 0;
  
  // Calculate avg revenue per customer (auto or manual)
  const calculatedAvgRevenue = currentCustomers > 0 
    ? totalRevenue / currentCustomers 
    : avgRevenuePerCustomer;
  
  // Calculate breakeven
  const breakEvenCustomers = calculatedAvgRevenue > 0 
    ? Math.ceil(totalCosts / calculatedAvgRevenue) 
    : 0;
  
  const customerGap = breakEvenCustomers - currentCustomers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl">
        <h2 className="mb-2">💰 Finanční Analýza</h2>
        <p className="text-green-100 mb-2">
          Máte <strong>{totalRevenue.toLocaleString('cs-CZ')} Kč</strong> příjmů a <strong>{totalCosts.toLocaleString('cs-CZ')} Kč</strong> nákladů měsíčně
        </p>
        {segments.length >= 1 && (
          <div className="bg-white/20 rounded-lg p-3 mt-3">
            <p className="text-white">
              📊 Máte <strong>{segments.length === 1 ? '1 segment' : `${segments.length} segmenty`}</strong>: <strong>{segments.map(s => s.name).join(', ')}</strong>
            </p>
            <p className="text-green-100 mt-1">
              💡 Teď nám řekněte: <strong>Kolik máte zákazníků</strong> v každém segmentu?
            </p>
          </div>
        )}
      </div>

      {loaded && (
        <>
          {/* Warning if empty Canvas */}
          {totalRevenue === 0 && totalCosts === 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-xl mb-6 animate-in fade-in zoom-in-95 duration-200">
              <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                ⚠️ Chybí data z vašeho Canvas!
              </h4>
              <p className="text-sm text-yellow-800 mb-3">
                Aby kalkulačka mohla fungovat, potřebujete vyplnit alespoň <strong>Příjmy</strong> a <strong>Náklady</strong> v Modulu 1.
              </p>
              <div className="bg-white/60 p-3 rounded text-sm text-yellow-900">
                <strong>📋 Co udělat:</strong>
                <ol className="list-decimal ml-5 mt-2 space-y-1">
                  <li>Vraťte se do Modulu 1</li>
                  <li>Vyplňte sekci "Zdroje příjmů" (Lekce 5)</li>
                  <li>Vyplňte sekci "Struktura nákladů" (Lekce 9)</li>
                  <li>Vraťte se sem zpět</li>
                </ol>
              </div>
            </div>
          )}
        
          {/* FINANČNÍ ANALÝZA - Kompaktní inline */}
          <div className={`${
              isProfitable 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
                : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400'
            } border-2 p-5 rounded-xl mb-6`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 md:gap-6">
                <div>
                  <div className="text-gray-600">💵 Příjmy</div>
                  <div className="text-xl font-bold text-gray-900">{totalRevenue.toLocaleString('cs-CZ')} Kč</div>
                </div>
                <div className="text-gray-400 font-bold text-2xl">−</div>
                <div>
                  <div className="text-gray-600">💸 Náklady</div>
                  <div className="text-xl font-bold text-gray-900">{totalCosts.toLocaleString('cs-CZ')} Kč</div>
                </div>
                <div className="text-gray-400 font-bold text-2xl">=</div>
                <div>
                  <div className="text-gray-600">{isProfitable ? '💰 Zisk' : '⚠️ Ztráta'}</div>
                  <div className={`text-2xl font-bold ${isProfitable ? 'text-green-700' : 'text-orange-700'}`}>
                    {Math.abs(profit).toLocaleString('cs-CZ')} Kč
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isProfitable ? 'bg-green-100 border border-green-300' : 'bg-yellow-100 border border-yellow-300'
              }`}>
                {isProfitable ? (
                  <>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-lg text-green-900">Model je ziskový</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-5 h-5 text-yellow-600" />
                    <span className="font-bold text-lg text-yellow-900">Potřeba dosáhnout bodu zvratu</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-700 mt-3 pt-3 border-t border-gray-200">
              {isProfitable ? (
                <>💡 Marže: <strong>{profitMargin.toFixed(1)}%</strong> • Roční projekce: <strong>{(profit * 12).toLocaleString('cs-CZ')} Kč</strong></>
              ) : (
                <>⚡ Potřebujete získat <strong>{breakEvenCustomers - currentCustomers > 0 ? (breakEvenCustomers - currentCustomers) : 0} zákazníků</strong> nebo zvýšit příjmy o <strong>{Math.abs(profit).toLocaleString('cs-CZ')} Kč</strong></>
              )}
            </div>
          </div>

          {/* 2 COLUMN GRID: Products/Value + Segments Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LEFT: Products & Value Props (compact) */}
            {(revenueStreams.length > 0 || valuePropositions.length > 0) && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 p-5 rounded-xl">
                <h4 className="font-bold text-indigo-900 mb-2 text-lg">
                  💰 Které zdroje příjmů jsou nejúspěšnější?
                </h4>
                <p className="text-sm text-indigo-700 mb-4">
                  Seřazené podle příjmů - zaměřte se na TOP zdroje!
                </p>
                
                {/* Revenue Streams - Compact */}
                {revenueStreams.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <h5 className="font-bold text-indigo-900">💵 Vaše zdroje příjmů:</h5>
                    {revenueStreams.map((stream, idx) => {
                      const percentage = totalRevenue > 0 ? (stream.value / totalRevenue) * 100 : 0;
                      const isTop = idx === 0;
                      
                      return (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-lg border ${
                            isTop ? 'bg-green-50 border-green-400' : 'bg-white border-indigo-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${isTop ? 'text-green-600' : 'text-gray-600'}`}>
                                #{idx + 1}
                              </span>
                              <span className="font-bold text-gray-900">{stream.name}</span>
                              {isTop && <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">TOP</span>}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className={`font-bold ${isTop ? 'text-green-700' : 'text-gray-900'}`}>
                                {stream.value.toLocaleString('cs-CZ')} Kč
                              </div>
                              <div className="text-sm font-bold text-gray-600">
                                {percentage.toFixed(1)}%
                              </div>
                            </div>
                          </div>
                          {/* Mini progress bar */}
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${isTop ? 'bg-green-500' : 'bg-indigo-400'}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          {isTop && (
                            <p className="text-xs text-green-800 mt-1.5">
                              ✅ <strong>ŠKÁLUJTE!</strong> Hlavní zdroj příjmů.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Value Propositions - Compact */}
                {valuePropositions.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-bold text-indigo-900">🎁 Hodnotová nabídka:</h5>
                    <div className="bg-white/60 border border-indigo-200 rounded-lg p-2 space-y-1">
                      {valuePropositions.map((vp, idx) => {
                        const colorMap: Record<string, { border: string, text: string }> = {
                          blue: { border: 'border-l-blue-500', text: 'text-blue-900' },
                          green: { border: 'border-l-green-500', text: 'text-green-900' },
                          yellow: { border: 'border-l-yellow-500', text: 'text-yellow-900' },
                          red: { border: 'border-l-red-500', text: 'text-red-900' },
                          purple: { border: 'border-l-purple-500', text: 'text-purple-900' },
                          orange: { border: 'border-l-orange-500', text: 'text-orange-900' },
                          pink: { border: 'border-l-pink-500', text: 'text-pink-900' },
                        };
                        
                        const colors = vp.color && colorMap[vp.color] 
                          ? colorMap[vp.color] 
                          : { border: 'border-l-gray-400', text: 'text-gray-900' };
                        
                        return (
                          <div 
                            key={idx} 
                            className={`bg-white p-2 rounded border-l-4 ${colors.border}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-sm ${colors.text}`}>✓</span>
                              <span className={`text-sm font-medium ${colors.text}`}>{vp.name}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-indigo-50 border-2 border-indigo-200 p-4 rounded-lg">
                      <p className="text-sm font-bold mb-2 text-indigo-900">💡 Jak z toho udělat víc peněz?</p>
                      <p className="text-sm text-indigo-800">
                        Každý benefit můžete zabalit do premium varianty nebo samostatné služby!
                      </p>
                      <p className="text-sm text-indigo-700 mt-2">
                        <strong>Např:</strong> "Rychlá káva" → Express menu, "Klidné místo" → Coworking pass
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* RIGHT: Segments Analysis (compact) */}
            <div className="bg-white border-2 border-gray-200 p-5 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                {segments.length === 1 ? 'Kolik potřebujete zákazníků?' : 'Rozdělte zákazníky po segmentech'}
              </h4>
              {/* LEGEND - pouze pokud 2+ segmenty */}
              {segments.length > 1 && revenueStreams.length > 0 && (
                <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded-lg mb-4">
                  <p className="text-sm font-bold text-purple-900 mb-2">
                    💡 Jak funguje propojení příjmů?
                  </p>
                  <p className="text-sm text-purple-800 leading-relaxed mb-2">
                    Příjmy se přiřazují <strong>podle barev</strong>:
                  </p>
                  <div className="space-y-1 text-sm text-purple-700">
                    {revenueStreams.some(r => r.color && r.color !== 'global' && r.color !== 'gray') && (
                      <div>🎨 <strong>Barevný příjem</strong> → jen stejně barevný segment</div>
                    )}
                    {revenueStreams.some(r => !r.color || r.color === 'global' || r.color === 'gray') && (
                      <div>🌐 <strong>Globální příjem</strong> (šedý) → rozdělí se mezi všechny</div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg mb-4">
                <p className="text-sm font-bold text-blue-900 mb-2">
                  💡 Co je bod zvratu (break-even)?
                </p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Počet zákazníků kdy <strong>příjmy = náklady</strong> (0 Kč zisk). 
                  {segments.length > 1 && (
                    <span className="block mt-1">
                      Máte {segments.length} segmenty: {segments.map(s => s.name).join(', ')}
                    </span>
                  )}
                </p>
              </div>
              
              {/* SIMPLE (1 segment) or ADVANCED (2+) */}
              <div className="space-y-3">
                {segments.length === 1 ? (
                  /* SIMPLE MODE */
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        Kolik máte TEĎ zákazníků?
                        {segments[0].name && (
                          <span className="ml-2 text-blue-600">({segments[0].name})</span>
                        )}
                      </label>
                  <input
                    type="number"
                    value={currentCustomers || ''}
                    onChange={(e) => {
                      const newCustomers = parseInt(e.target.value) || 0;
                      setCurrentCustomers(newCustomers);
                      
                      // 🏆 Trigger achievement při prvním vyplnění
                      if (newCustomers > 0 && onAchievementUnlocked) {
                        onAchievementUnlocked('profit-calculated');
                      }
                      
                      // ✅ UKLÁDEJ DO DB!
                      const newSegments = [...segments];
                      newSegments[0].customers = newCustomers;
                      setSegments(newSegments);
                      debouncedSave(newSegments);
                    }}
                    placeholder="např. 100"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Auto-calculated Average */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💰 Průměrný příjem/zákazník (vypočteno)
                  </label>
                  <div className="bg-gray-50 border-2 border-gray-300 px-4 py-3 rounded-lg">
                    <span className="text-lg font-bold text-gray-900">
                      {currentCustomers > 0 
                        ? Math.round(totalRevenue / currentCustomers).toLocaleString('cs-CZ') 
                        : '0'} Kč
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {totalRevenue.toLocaleString('cs-CZ')} Kč ÷ {currentCustomers || '?'}
                    </p>
                  </div>
                </div>

                {/* Break-even result */}
                {currentCustomers > 0 && (
                  <div
                    className="bg-blue-50 border-2 border-blue-300 p-5 rounded-lg"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-blue-600 mb-1.5 font-medium">Break-even</div>
                        <div className="text-2xl font-bold text-blue-900">{breakEvenCustomers}</div>
                      </div>
                      <div>
                        <div className="text-blue-600 mb-1.5 font-medium">Aktuálně</div>
                        <div className="text-2xl font-bold text-blue-900">{currentCustomers}</div>
                      </div>
                    </div>
                    
                    {customerGap > 0 ? (
                      <div className="bg-yellow-100 border border-yellow-300 p-3 rounded">
                        <p className="text-yellow-900 mb-1.5 text-base">
                          <strong>📊 GAP:</strong> Potřebujete <strong>{customerGap} zákazníků</strong> do bodu zvratu.
                        </p>
                        <p className="text-yellow-700 leading-tight">
                          To přinese {Math.round(customerGap * calculatedAvgRevenue).toLocaleString('cs-CZ')} Kč příjmů navíc = pokryjete náklady.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-green-100 border border-green-300 p-3 rounded">
                        <p className="text-green-900 mb-1.5 text-base">
                          <strong>🎉 Gratulujeme!</strong> Jste nad bodem zvratu o <strong>{Math.abs(customerGap)} zákazníků</strong>!
                        </p>
                        <p className="text-green-700 leading-tight">
                          Každý další zákazník = +{Math.round(calculatedAvgRevenue).toLocaleString('cs-CZ')} Kč přímo do zisku.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* TIP: Přidat další segment pro detailní analýzu */}
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <p className="text-purple-900 mb-2 text-base">
                    <strong>💡 Tip pro pokročilé:</strong>
                  </p>
                  <p className="text-purple-700 leading-normal">
                    Pro detailní analýzu přidejte další segment do Business Model Canvas (Modul 1, Lekce 4). 
                    Uvidíte pak ranking segmentů, projekce růstu a strategie pro každý segment zvlášť!
                  </p>
                </div>
                </>
              ) : (
                /* ADVANCED MODE - 2+ segments */
                <>
                  <p className="text-blue-700 bg-blue-100 p-3 rounded mb-4">
                    💡 Zadejte kolik máte zákazníků v <strong>každém segmentu zvlášť</strong> pro přesnou analýzu.
                  </p>
                  
                  {segments.map((segment, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-2.5">
                      <div className="font-bold text-gray-900">
                        📦 {segment.name}
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Kolik máte zákazníků v tomto segmentu?
                        </label>
                        <input
                          type="number"
                          value={segment.customers || ''}
                          onChange={(e) => {
                            const newSegments = [...segments];
                            newSegments[index].customers = parseInt(e.target.value) || 0;
                            setSegments(newSegments);
                            // Update currentCustomers to sum of all segments
                            const total = newSegments.reduce((sum, s) => sum + s.customers, 0);
                            setCurrentCustomers(total);
                            
                            // 🏆 Trigger achievement při prvním vyplnění
                            if (total > 0 && onAchievementUnlocked) {
                              onAchievementUnlocked('profit-calculated');
                            }
                            
                            // 💾 DEBOUNCED SAVE
                            debouncedSave(newSegments);
                          }}
                          placeholder="např. 50"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      
                      {/* Show calculated metrics for this segment */}
                      {segment.customers > 0 && (() => {
                        const totalCustomersInSegments = segments.reduce((sum, s) => sum + s.customers, 0);
                        
                        // 🎯 NOVÝ VÝPOČET: Spoj příjmy podle barev!
                        // 1. Najdi příjmy přímo pro tento segment (matching color)
                        const directRevenue = revenueStreams
                          .filter(stream => stream.color === segment.color)
                          .reduce((sum, stream) => sum + stream.value, 0);
                        
                        // 2. Najdi globální příjmy (🌐) a rozdel proporcionálně
                        const globalRevenue = revenueStreams
                          .filter(stream => stream.color === 'global' || stream.color === 'gray')
                          .reduce((sum, stream) => sum + stream.value, 0);
                        
                        const segmentShare = totalCustomersInSegments > 0 ? segment.customers / totalCustomersInSegments : 0;
                        const globalShare = globalRevenue * segmentShare;
                        
                        // 3. CELKEM pro tento segment
                        const segmentRevenue = directRevenue + globalShare;
                        const avgRevenueForSegment = segment.customers > 0 ? segmentRevenue / segment.customers : 0;
                        
                        return (
                          <div className="bg-blue-50 border border-blue-200 p-2 rounded text-sm space-y-1">
                            <div className="text-blue-700 text-xs">
                              📊 Podíl: <strong>{(segmentShare * 100).toFixed(1)}%</strong> ({segment.customers}/{totalCustomersInSegments})
                            </div>
                            
                            <div className="text-blue-900 font-bold">
                              💰 Příjem celkem: <strong>{Math.round(segmentRevenue).toLocaleString('cs-CZ')} Kč</strong>
                            </div>
                            
                            {/* Breakdown podle barev */}
                            {(directRevenue > 0 || globalShare > 0) && (
                              <div className="pl-3 space-y-0.5 text-xs border-l-2 border-blue-300">
                                {directRevenue > 0 && (
                                  <div className="text-blue-700">
                                    ✓ Přímý příjem: {Math.round(directRevenue).toLocaleString('cs-CZ')} Kč
                                  </div>
                                )}
                                {globalShare > 0 && (
                                  <div className="text-gray-600">
                                    ✓ Globální ({(segmentShare * 100).toFixed(0)}%): {Math.round(globalShare).toLocaleString('cs-CZ')} Kč
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <div className="text-blue-800 text-xs pt-1 border-t border-blue-200">
                              📈 Průměr/zákazník: <strong>{Math.round(avgRevenueForSegment).toLocaleString('cs-CZ')} Kč</strong>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ))}
                  
                  {/* Summary after all segments filled */}
                  {segments.some(s => s.customers > 0) && (() => {
                    const totalCustomersInSegments = segments.reduce((sum, s) => sum + s.customers, 0);
                    const avgRev = totalCustomersInSegments > 0 ? totalRevenue / totalCustomersInSegments : 0;
                    const breakEven = avgRev > 0 ? Math.ceil(totalCosts / avgRev) : 0;
                    const gap = breakEven - totalCustomersInSegments;
                    
                    return totalCustomersInSegments > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 p-4 rounded-lg animate-in fade-in duration-200">
                        <h5 className="font-bold text-blue-900 mb-3 text-sm">📊 Celkové shrnutí:</h5>
                        
                        <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                          <div className="text-center">
                            <div className="text-blue-600">Celkem</div>
                            <div className="text-lg font-bold text-blue-900">{totalCustomersInSegments}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-600">Průměr</div>
                            <div className="text-base font-bold text-blue-900">{Math.round(avgRev).toLocaleString('cs-CZ')} Kč</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-600">Break-even</div>
                            <div className="text-lg font-bold text-blue-900">{breakEven}</div>
                          </div>
                        </div>
                        
                        {gap !== 0 && (
                          <div className={`p-2 rounded text-xs ${gap > 0 ? 'bg-yellow-100 border border-yellow-300' : 'bg-green-100 border border-green-300'}`}>
                            {gap > 0 ? (
                              <>
                                <p className="text-yellow-900 mb-1">
                                  <strong>📊 GAP:</strong> Potřebujete ještě <strong>{gap} zákazníků</strong> celkem.
                                </p>
                                <p className="text-yellow-700 leading-tight">
                                  To přinese {Math.round(gap * avgRev).toLocaleString('cs-CZ')} Kč = pokryjete náklady.
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-green-900 mb-1">
                                  <strong>🎉 Gratulujeme!</strong> Jste nad bodem zvratu o <strong>{Math.abs(gap)} zákazníků</strong>!
                                </p>
                                <p className="text-green-700 leading-tight">
                                  Každý další = +{Math.round(avgRev).toLocaleString('cs-CZ')} Kč do zisku.
                                </p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
              </div>
            </div>
            
          </div>

          {/* STRATEGIC RECOMMENDATIONS - Full Width with Advanced Analysis */}
          {currentCustomers > 0 && calculatedAvgRevenue > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-5 rounded-xl">
              <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                💡 Co to znamená pro váš byznys?
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Current State + Tips */}
                <div className="space-y-4">
                  <div className="bg-white/60 p-4 rounded-lg">
                    <div className="font-bold text-gray-900 mb-3">📊 Aktuální stav:</div>
                    <div className="space-y-2.5 text-gray-800">
                      <div className="flex justify-between">
                        <span>Zákazníků:</span>
                        <strong className="text-blue-700">{currentCustomers}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Průměr/zákazník:</span>
                        <strong>{Math.round(calculatedAvgRevenue).toLocaleString('cs-CZ')} Kč</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit margin:</span>
                        <strong className={isProfitable ? 'text-green-700' : 'text-red-700'}>
                          {profitMargin.toFixed(1)}%
                        </strong>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Měsíční zisk:</span>
                        <strong className={isProfitable ? 'text-green-700' : 'text-red-700'}>
                          {Math.abs(profit).toLocaleString('cs-CZ')} Kč
                        </strong>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Insights */}
                  <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                    <div className="font-bold text-indigo-900 mb-3">💡 Rychlé výpočty:</div>
                    <div className="space-y-2 text-indigo-800">
                      <div className="flex justify-between">
                        <span>Roční projekce:</span>
                        <strong>{(profit * 12).toLocaleString('cs-CZ')} Kč</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Zisk na zákazníka:</span>
                        <strong>{currentCustomers > 0 ? Math.round(profit / currentCustomers).toLocaleString('cs-CZ') : '—'} Kč</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Break-even bod:</span>
                        <strong className="text-blue-700">{breakEvenCustomers} zákazníků</strong>
                      </div>
                      {revenueStreams.length > 0 && revenueStreams[0] && (
                        <div className="border-t border-indigo-200 pt-1.5 mt-1.5">
                          <div className="flex justify-between">
                            <span>TOP produkt:</span>
                            <strong className="text-green-700">{revenueStreams[0].name}</strong>
                          </div>
                          <div className="flex justify-between text-xs text-indigo-600">
                            <span>Generuje:</span>
                            <span>{((revenueStreams[0].value / totalRevenue) * 100).toFixed(0)}% příjmů</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Right: Actions */}
                <div className="space-y-3">
                  <div className="font-bold text-orange-900 mb-3">✅ 3 konkrétní kroky:</div>
                  
                  {isProfitable ? (
                    <>
                      <div className="flex gap-3 items-start bg-white/60 p-4 rounded">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                          <strong className="text-gray-900">Škálujte získávání zákazníků</strong>
                          <p className="text-gray-700 mt-1">
                            Každý = ~{Math.round(calculatedAvgRevenue).toLocaleString('cs-CZ')} Kč/měsíc. Zdvojnásobením zvýšíte zisk o {Math.round(profit).toLocaleString('cs-CZ')} Kč!
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start bg-white/60 p-4 rounded">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                          <strong className="text-gray-900">Zvyšte průměrný příjem</strong>
                          <p className="text-gray-700 mt-1">
                            Upsell nebo +20% ceny = +{Math.round(totalRevenue * 0.2).toLocaleString('cs-CZ')} Kč přímo do zisku!
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start bg-white/60 p-4 rounded">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                          <strong className="text-gray-900">Přidejte premium produkt</strong>
                          <p className="text-gray-700 mt-1">
                            {valuePropositions.length > 0 
                              ? `Máte ${valuePropositions.length} hodnotové nabídky - použijte je jako samostatné produkty!`
                              : 'Každá nová služba = dodatečný příjem bez hledání nových zákazníků'}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-3 items-start bg-white/60 p-4 rounded">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                          <strong className="text-gray-900">Získejte {customerGap} zákazníků</strong>
                          <p className="text-gray-700 mt-1">
                            To přinese {Math.round(customerGap * calculatedAvgRevenue).toLocaleString('cs-CZ')} Kč a pokryje náklady.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start bg-white/60 p-4 rounded">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                          <strong className="text-gray-900">NEBO snižte náklady</strong>
                          <p className="text-gray-700 mt-1">
                            Potřebujete ušetřit {Math.abs(profit).toLocaleString('cs-CZ')} Kč měsíčně.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start bg-white/60 p-4 rounded">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                          <strong className="text-gray-900">Zvyšte hodnotu</strong>
                          <p className="text-gray-700 mt-1">
                            {revenueStreams.length > 0 && revenueStreams[0] 
                              ? `Zaměřte se na "${revenueStreams[0].name}" - váš hlavní zdroj.`
                              : 'Vylepšete nabídku nebo přidejte premium služby.'}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ADVANCED ANALYSIS - Expandable (pouze pokud má 2+ vyplněné segmenty) */}
          {segments.filter(s => s.customers > 0).length >= 2 && (
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <div
                className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl overflow-hidden"
              >
                <CollapsibleTrigger className="w-full p-5 flex items-center justify-between hover:bg-purple-100/50 transition-colors">
                  <div className="text-left">
                    <h4 className="font-bold text-purple-900 mb-1 text-lg flex items-center gap-2">
                      🎯 Pokročilá analýza segmentů
                    </h4>
                    <p className="text-sm text-purple-700">
                      Detailní ranking, projekce růstu a strategie pro každý segment
                    </p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-purple-600 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-6 pb-6 space-y-5">
                    {/* Segment Ranking */}
                    <div className="bg-white/60 border border-purple-200 p-5 rounded-lg">
                      <h5 className="font-bold text-purple-900 mb-3 text-lg">🏆 Ranking segmentů podle celkové hodnoty:</h5>
                      <p className="text-purple-700 mb-4">
                        Který segment vám generuje nejvíc peněz? (podle podílu zákazníků)
                      </p>
                      <div className="space-y-2">
                        {(() => {
                          // Calculate segment metrics from REAL data
                          const totalCust = segments.reduce((sum, s) => sum + s.customers, 0);
                          const segmentMetrics = segments
                            .filter(s => s.customers > 0)
                            .map(seg => {
                              const segmentShare = totalCust > 0 ? seg.customers / totalCust : 0;
                              const segmentRevenue = totalRevenue * segmentShare;
                              const avgRevenuePerCustomer = seg.customers > 0 ? segmentRevenue / seg.customers : 0;
                              
                              return {
                                name: seg.name,
                                customers: seg.customers,
                                share: segmentShare,
                                revenue: segmentRevenue,
                                avgRevenue: avgRevenuePerCustomer
                              };
                            })
                            .sort((a, b) => b.revenue - a.revenue);
                          
                          return segmentMetrics.map((seg, idx) => {
                            const isTop = idx === 0;
                            const isBottom = idx === segmentMetrics.length - 1 && segmentMetrics.length > 2;
                            
                            return (
                              <div 
                                key={idx} 
                                className={`flex items-center justify-between p-4 rounded-lg ${
                                  isTop ? 'bg-green-100 border-2 border-green-400' : 
                                  isBottom ? 'bg-yellow-50 border border-yellow-300' : 
                                  'bg-gray-50 border border-gray-200'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`text-xl font-bold ${isTop ? 'text-green-600' : 'text-gray-600'}`}>
                                    #{idx + 1}
                                  </span>
                                  <div>
                                    <div className="font-bold text-gray-900 text-base">{seg.name}</div>
                                    <div className="text-gray-600">
                                      {seg.customers} zákazníků • {(seg.share * 100).toFixed(0)}% podíl
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className={`font-bold text-base ${isTop ? 'text-green-700' : 'text-gray-900'}`}>
                                    {Math.round(seg.revenue).toLocaleString('cs-CZ')} Kč
                                  </div>
                                  <div className="text-gray-500">
                                    {Math.round(seg.avgRevenue).toLocaleString('cs-CZ')} Kč/zákazník
                                  </div>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                    
                    {/* Growth Projection */}
                    {isProfitable && (() => {
                      // Find TOP segment by revenue
                      const totalCust = segments.reduce((sum, s) => sum + s.customers, 0);
                      const topSegment = segments
                        .filter(s => s.customers > 0)
                        .map(seg => {
                          const segmentShare = totalCust > 0 ? seg.customers / totalCust : 0;
                          const segmentRevenue = totalRevenue * segmentShare;
                          return { ...seg, revenue: segmentRevenue, avgRevenue: segmentRevenue / seg.customers };
                        })
                        .sort((a, b) => b.revenue - a.revenue)[0];
                      
                      if (!topSegment) return null;
                      
                      const additionalRevenue = topSegment.revenue;
                      const newProfit = profit + additionalRevenue;
                      
                      return (
                        <div className="bg-blue-50 border-2 border-blue-300 p-5 rounded-lg">
                          <h5 className="font-bold text-blue-900 mb-3 text-lg">📈 Projekce růstu: Co kdybyste zdvojnásobili nejlepší segment?</h5>
                          <div className="text-blue-800 space-y-3">
                            <p className="text-base">
                              Segment <strong>{topSegment.name}</strong> je váš hlavní zdroj příjmů.
                            </p>
                            <div className="bg-white/60 p-4 rounded space-y-2">
                              <div className="flex justify-between">
                                <span>Aktuální zákazníci:</span>
                                <strong className="text-base">{topSegment.customers}</strong>
                              </div>
                              <div className="flex justify-between">
                                <span>Po zdvojnásobení:</span>
                                <strong className="text-blue-700 text-base">{topSegment.customers * 2}</strong>
                              </div>
                              <div className="flex justify-between text-gray-700">
                                <span>Průměr/zákazník:</span>
                                <span className="text-base">{Math.round(topSegment.avgRevenue).toLocaleString('cs-CZ')} Kč</span>
                              </div>
                              <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between">
                                <span>Dodatečný příjem:</span>
                                <strong className="text-green-700 text-base">+{Math.round(additionalRevenue).toLocaleString('cs-CZ')} Kč</strong>
                              </div>
                              <div className="flex justify-between">
                                <span>Nový měsíční zisk:</span>
                                <strong className="text-green-700 text-base">{Math.round(newProfit).toLocaleString('cs-CZ')} Kč</strong>
                              </div>
                            </div>
                            <p className="text-blue-700 italic">
                              💡 Zaměřte marketing na nejziskovější segment a sledujte růst!
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                    
                    {/* Actionable Strategies */}
                    {(() => {
                      // Sort segments by revenue
                      const totalCust = segments.reduce((sum, s) => sum + s.customers, 0);
                      const sortedSegments = segments
                        .filter(s => s.customers > 0)
                        .map(seg => {
                          const segmentShare = totalCust > 0 ? seg.customers / totalCust : 0;
                          const segmentRevenue = totalRevenue * segmentShare;
                          return { ...seg, revenue: segmentRevenue };
                        })
                        .sort((a, b) => b.revenue - a.revenue);
                      
                      if (sortedSegments.length === 0) return null;
                      
                      return (
                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300 p-5 rounded-lg">
                          <h5 className="font-bold text-orange-900 mb-4 text-lg">🎯 Strategie pro každý segment:</h5>
                          <div className="space-y-3">
                            {/* TOP segment */}
                            <div className="bg-white/60 p-4 rounded">
                              <strong className="text-green-700 text-base">✅ TOP segment ({sortedSegments[0].name}):</strong>
                              <p className="text-gray-700 mt-1.5">
                                → Škálujte! Zdvojnásobte investice do marketingu, vytvořte referral program, nabídněte premium variantu.
                              </p>
                            </div>
                            
                            {/* Middle segments */}
                            {sortedSegments.slice(1, -1).map((seg, idx) => (
                              <div key={idx} className="bg-white/60 p-4 rounded">
                                <strong className="text-blue-700 text-base">💎 Středový segment ({seg.name}):</strong>
                                <p className="text-gray-700 mt-1.5">
                                  → Optimalizujte! Testujte různé ceny, vylepšete nabídku, zvyšte retention.
                                </p>
                              </div>
                            ))}
                            
                            {/* Bottom segment (only if 2+) - NOVÁ LOGIKA */}
                            {sortedSegments.length > 1 && (() => {
                              const bottomSegment = sortedSegments[sortedSegments.length - 1];
                              const bottomRevenue = bottomSegment.revenue;
                              const topRevenue = sortedSegments[0].revenue;
                              const revenueRatio = topRevenue > 0 ? bottomRevenue / topRevenue : 0;
                              
                              // Jen pokud je segment OPRAVDU slabý (< 30% TOP segmentu)
                              if (revenueRatio < 0.3) {
                                return (
                                  <div className="bg-white/60 p-4 rounded">
                                    <strong className="text-yellow-700 text-base">⚠️ Slabý segment ({bottomSegment.name}):</strong>
                                    <p className="text-gray-700 mt-1.5">
                                      Generuje jen {Math.round(revenueRatio * 100)}% TOP segmentu → Zvažte zvýšit ceny nebo marketing.
                                    </p>
                                  </div>
                                );
                              } else if (bottomRevenue > 15000) {
                                // Segment je OK (> 15K měs��čně = cca minimální mzda)
                                const contribution = (bottomRevenue / totalRevenue) * 100;
                                return (
                                  <div className="bg-white/60 p-4 rounded">
                                    <strong className="text-green-700 text-base">✅ Solidní segment ({bottomSegment.name}):</strong>
                                    <p className="text-gray-700 mt-1.5">
                                      {Math.round(bottomRevenue).toLocaleString('cs-CZ')} Kč/měs ({contribution.toFixed(0)}% příjmů) → Diverzifikace funguje!
                                    </p>
                                  </div>
                                );
                              } else {
                                return (
                                  <div className="bg-white/60 p-4 rounded">
                                    <strong className="text-yellow-700 text-base">⚠️ Malý segment ({bottomSegment.name}):</strong>
                                    <p className="text-gray-700 mt-1.5">
                                      {Math.round(bottomRevenue).toLocaleString('cs-CZ')} Kč/měs → Zvyšte ceny nebo počet zákazníků.
                                    </p>
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}

          {/* CTA - Hotovo */}
          {!isCompleted ? (
            <div
              className={`rounded-2xl p-8 text-center shadow-2xl ${
                totalRevenue === 0 || totalCosts === 0
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600'
              }`}
            >
              {totalRevenue === 0 || totalCosts === 0 ? (
                <>
                  <h3 className="font-bold text-white mb-3">
                    ⚠️ Chybí příjmy nebo náklady
                  </h3>
                  <p className="text-yellow-100 mb-6">
                    Pro dokončení lekce potřebujete vyplnit <strong>Zdroje příjmů</strong> a <strong>Strukturu nákladů</strong> v Modulu 1.
                  </p>
                  <Button
                    disabled
                    size="lg"
                    className="bg-white/50 text-gray-500 cursor-not-allowed font-bold px-12 py-6 opacity-60"
                  >
                    🔒 Dokončit lekci (vyžaduje data)
                  </Button>
                  <p className="text-yellow-100 mt-4">
                    💡 Vraťte se do Modulu 1 → Lekce 5 (Příjmy) a Lekce 9 (Náklady)
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-bold text-white mb-3">
                    ✅ Hotovo! Máte přehled o financích
                  </h3>
                  <p className="text-green-100 mb-6">
                    Data jsou automaticky uložená. Kalkulačka zůstane viditelná i po dokončení lekce!
                  </p>
                  <Button
                    onClick={() => {
                      setIsCompleted(true);
                      onComplete();
                    }}
                    size="lg"
                    className="bg-white text-green-700 hover:bg-green-50 font-bold px-12 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  >
                    Dokončit lekci a pokračovat →
                  </Button>
                  <p className="text-green-100 mt-4">
                    💡 Scroll nahoru pro úpravu dat - změny se ukládají automaticky
                  </p>
                </>
              )}
            </div>
          ) : (
            <div
              className="bg-green-50 border-2 border-green-300 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 rounded-full p-3">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-900">
                    ✅ Lekce dokončena!
                  </h3>
                  <p className="text-sm text-green-700">
                    Skvělá práce! Data zůstanou uložená a můžete je kdykoliv upravit scrollem nahoru.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                {onNavigateNext && (
                  <Button
                    onClick={() => {
                      onComplete(); // ✅ SAVE PROGRESS FIRST!
                      onNavigateNext(); // Then navigate
                    }}
                    size="lg"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Pokračovat na další lekci →
                  </Button>
                )}
                <Button
                  onClick={() => setIsCompleted(false)}
                  variant="outline"
                  size="lg"
                >
                  🔄 Zkusit znovu
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {!loaded && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Načítám finanční data...</p>
        </div>
      )}
    </div>
  );
}
