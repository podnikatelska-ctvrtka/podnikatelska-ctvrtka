import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Users, Target, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { supabase } from "../lib/supabase";
import { trackCourseEvent, trackError } from "../lib/sentry";

interface Props {
  userId: string;
  onComplete: () => void;
  onNavigateNext?: () => void;
  onAchievementUnlocked?: (achievementId: string) => void;
  isLessonCompleted?: boolean;
}

export function ProfitCalculator({ userId, onComplete, onNavigateNext, onAchievementUnlocked, isLessonCompleted = false }: Props) {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCosts, setTotalCosts] = useState(0);
  const [currentCustomers, setCurrentCustomers] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [segments, setSegments] = useState<Array<{name: string, customers: number, avgRevenue: number, color?: string}>>([ 
    { name: 'Segment 1', customers: 0, avgRevenue: 0 }
  ]);
  const [revenueStreams, setRevenueStreams] = useState<Array<{name: string, value: number, color?: string}>>([]);
  const [valuePropositions, setValuePropositions] = useState<Array<{name: string, color?: string}>>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

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
                    color: item.color || 'global'
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
            
            // Load value propositions WITH COLORS
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
          
          // Sort revenue streams by value (highest first)
          userRevenueStreams.sort((a, b) => b.value - a.value);
          
          setTotalRevenue(revenue);
          setTotalCosts(costs);
          setRevenueStreams(userRevenueStreams);
          setValuePropositions(userValueProps);
          
          // Load existing segment data if available
          if (userSegments.length > 0) {
            const segmentsData = data.find(d => d.section_key === 'segments');
            if (segmentsData && segmentsData.content) {
              const loadedSegments = userSegments.map(seg => {
                const saved = segmentsData.content.find((s: any) => s.text === seg.name);
                return {
                  ...seg,
                  customers: saved?.currentValue || 0,
                  avgRevenue: saved?.value || 0
                };
              });
              setSegments(loadedSegments);
              
              // Calculate total customers
              const total = loadedSegments.reduce((sum, s) => sum + s.customers, 0);
              setCurrentCustomers(total);
            } else {
              setSegments(userSegments);
            }
          }
        }
        
        setLoaded(true);
      } catch (err) {
        console.error('Error loading financial data:', err);
        setLoaded(true);
      }
    };

    loadFinancialData();
  }, [userId]);

  // Debounced save
  const debouncedSave = (newSegments: typeof segments) => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    
    saveTimerRef.current = setTimeout(() => {
      saveSegmentsToDatabase(newSegments);
    }, 1000);
  };

  const saveSegmentsToDatabase = async (newSegments: typeof segments) => {
    try {
      // Load current segments from DB
      const { data: currentSegmentsData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .single();
      
      if (!currentSegmentsData || !currentSegmentsData.content) {
        console.log('⚠️ No segments found in DB');
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
        
        // 🚨 SENTRY: Track error
        trackError.saveError('ProfitCalculator', error as Error, {
          userId,
          totalRevenue,
          totalCosts,
          currentCustomers,
        });
      } else {
        console.log('✅ Segments saved successfully!');
        
        // 🚨 SENTRY: Track successful calculation
        trackCourseEvent.vpcSave({
          userId,
          segmentName: 'profit-calculator',
          hasJobs: true,
          hasPains: currentCustomers > 0,
          hasGains: profit > 0,
        });
      }
    } catch (err) {
      console.error('❌ Error in saveSegmentsToDatabase:', err);
      
      // 🚨 SENTRY: Track error
      trackError.saveError('ProfitCalculator', err as Error, {
        userId,
        totalRevenue,
        totalCosts,
      });
    }
  };

  const profit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? ((profit / totalRevenue) * 100) : 0;
  
  // 🎯 TŘI STAVY: Zisk, Break-even, Ztráta
  const isBreakEven = profit === 0 && totalRevenue > 0 && totalCosts > 0;
  const isProfitable = profit > 0;
  const isLoss = profit < 0;
  
  // 🎉 ACHIEVEMENT: profitable-business (trigger pouze pokud je zisk > 0)
  useEffect(() => {
    if (loaded && isProfitable && totalRevenue > 0 && totalCosts > 0 && onAchievementUnlocked) {
      console.log('📈 User is PROFITABLE! Triggering achievement...');
      onAchievementUnlocked('profitable-business');
    }
  }, [loaded, isProfitable, totalRevenue, totalCosts, onAchievementUnlocked]);
  
  // Calculate avg revenue per customer
  const calculatedAvgRevenue = currentCustomers > 0 
    ? totalRevenue / currentCustomers 
    : 0;
  
  // Calculate breakeven
  const breakEvenCustomers = calculatedAvgRevenue > 0 
    ? Math.ceil(totalCosts / calculatedAvgRevenue) 
    : 0;
  
  const customerGap = breakEvenCustomers - currentCustomers;

  return (
    <div className="space-y-4">
      {/* 🎨 Colorful Header with gradient */}
      <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-md p-6">
        <h2 className="mb-2 text-white">💰 Finanční Analýza</h2>
        <p className="text-blue-50 text-sm mb-3">
          Vypočtěte váš zisk a finanční zdraví
        </p>
        <p className="text-blue-50 text-sm sm:text-base">
          Máte <strong className="text-white">{totalRevenue.toLocaleString('cs-CZ')} Kč</strong> příjmů 
          a <strong className="text-white">{totalCosts.toLocaleString('cs-CZ')} Kč</strong> nákladů měsíčně
        </p>
      </div>

      {loaded && (
        <>
          {/* Warning if empty Canvas */}
          {totalRevenue === 0 && totalCosts === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-yellow-900 text-sm">
                ⚠️ <strong>Prázdný Canvas:</strong> Nejprve vyplňte Podnikatelský model v Modulu 1, Lekce 4.
              </p>
            </div>
          )}

          {/* 🎨 Modern Cards - Profit Calculation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-center sm:text-left">
                <div>
                  <div className="text-xs text-gray-500">💵 Příjmy</div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString('cs-CZ')} Kč</div>
                </div>
                <div className="text-lg sm:text-2xl text-gray-300">−</div>
                <div>
                  <div className="text-xs text-gray-500">💸 Náklady</div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">{totalCosts.toLocaleString('cs-CZ')} Kč</div>
                </div>
                <div className="text-lg sm:text-2xl text-gray-300">=</div>
                <div>
                  <div className="text-xs text-gray-500">
                    {isProfitable ? '💰 Zisk' : isBreakEven ? '💚 Break-even' : '⚠️ Ztráta'}
                  </div>
                  <div className={`text-xl sm:text-3xl font-bold ${
                    isProfitable ? 'text-green-600' : isBreakEven ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    {Math.abs(profit).toLocaleString('cs-CZ')} Kč
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-3 py-1.5 rounded-full w-fit mx-auto sm:mx-0 ${
                isProfitable 
                  ? 'bg-green-50 text-green-700' 
                  : isBreakEven 
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-orange-50 text-orange-700'
              }`}>
                {isProfitable ? (
                  <div className="flex items-center gap-1.5 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold">Ziskový model</span>
                  </div>
                ) : isBreakEven ? (
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <Target className="w-4 h-4" />
                    <span className="font-semibold">Vyrovnaný model</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <TrendingDown className="w-4 h-4" />
                    <span className="font-semibold">Potřeba zisku</span>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 pt-3 border-t border-gray-100">
                {isProfitable ? (
                  <>
                    <span>💡 Marže: <strong className="text-gray-900">{profitMargin.toFixed(1)}%</strong></span>
                    <span className="text-gray-300">•</span>
                    <span>📅 Roční: <strong className="text-gray-900">{(profit * 12).toLocaleString('cs-CZ')} Kč</strong></span>
                  </>
                ) : isBreakEven ? (
                  <span>
                    💚 <strong className="text-blue-600">Jste vyrovnaní!</strong> 
                    <span className="text-gray-500 ml-1">Zvyšte příjmy nebo snižte náklady pro zisk.</span>
                  </span>
                ) : (
                  <span>
                    ⚡ Potřeba: <strong className="text-orange-600">
                      {customerGap > 0 ? `${customerGap} zákazníků` : `+${Math.abs(profit).toLocaleString('cs-CZ')} Kč`}
                    </strong>
                    {customerGap > 0 && (
                      <span className="text-gray-500 ml-1">nebo <strong className="text-orange-600">+{Math.abs(profit).toLocaleString('cs-CZ')} Kč</strong></span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 🎯 DVA SLOUPCE: Vaše zdroje příjmů (VLEVO) + Hlavní úkol (VPRAVO) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* LEFT: 💵 VAŠE ZDROJE PŘÍJMŮ + HODNOTOVÁ NABÍDKA */}
            {revenueStreams.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-1 text-lg">💵 Vaše zdroje příjmů</h4>
                <p className="text-sm text-gray-500 mb-4">Seřazeno podle příjmů - zaměřte se na TOP zdroje</p>
                
                <div className="space-y-2 mb-6">
                  {(() => {
                    // TIE LOGIC PERFECTLY FIXED - Use Map for ranks
                    const sortedStreams = [...revenueStreams].sort((a, b) => b.value - a.value);
                    
                    // Build rank map - each unique value gets its rank
                    const rankMap = new Map<number, number>();
                    sortedStreams.forEach((stream, idx) => {
                      if (!rankMap.has(stream.value)) {
                        // First occurrence - count unique values before
                        const uniqueBefore = new Set(sortedStreams.slice(0, idx).map(s => s.value));
                        rankMap.set(stream.value, uniqueBefore.size + 1);
                      }
                    });
                    
                    // Assign ranks
                    const rankedStreams = sortedStreams.map(stream => ({
                      ...stream,
                      rank: rankMap.get(stream.value)!
                    }));
                    
                    return rankedStreams.map((stream, idx) => {
                      const rank = stream.rank;
                      
                      const percentage = totalRevenue > 0 ? (stream.value / totalRevenue) * 100 : 0;
                      const isTop = rank === 1;
                      
                      return (
                        <div 
                          key={idx} 
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isTop 
                              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-md' 
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {isTop && (
                            <div className="mb-2">
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full">
                                ⭐ TOP zdroj příjmů
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className={`text-sm font-bold px-2.5 py-1 rounded-lg ${
                                isTop ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                              }`}>
                                #{rank}
                              </span>
                              <span className={`font-semibold ${isTop ? 'text-green-900 text-lg' : 'text-gray-700'}`}>
                                {stream.name}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold ${isTop ? 'text-green-700 text-xl' : 'text-gray-900 text-lg'}`}>
                                {stream.value.toLocaleString('cs-CZ')} Kč
                              </div>
                              <div className="text-sm text-gray-500">
                                {percentage.toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
                
                {/* Hodnotová nabídka */}
                {valuePropositions.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h5 className="font-semibold text-gray-900 mb-3 text-sm">🎁 Hodnotová nabídka</h5>
                    <div className="space-y-2">
                      {valuePropositions.map((vp, idx) => {
                        const colorMap: Record<string, string> = {
                          blue: 'border-l-blue-400 bg-blue-50',
                          green: 'border-l-green-400 bg-green-50',
                          yellow: 'border-l-yellow-400 bg-yellow-50',
                          red: 'border-l-red-400 bg-red-50',
                          purple: 'border-l-purple-400 bg-purple-50',
                          orange: 'border-l-orange-400 bg-orange-50',
                          pink: 'border-l-pink-400 bg-pink-50',
                        };
                        
                        const bgColor = vp.color && colorMap[vp.color] ? colorMap[vp.color] : 'border-l-gray-300 bg-gray-50';
                        
                        return (
                          <div 
                            key={idx} 
                            className={`p-2.5 rounded-lg border-l-4 ${bgColor}`}
                          >
                            <span className="text-sm text-gray-700">✓ {vp.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* RIGHT: 🎯 HLAVNÍ ÚKOL - Customer Input */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-md border-2 border-blue-300 p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-2">
                  <Target className="w-5 h-5" />
                  <span className="font-bold">Hlavní úkol</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  {segments.length === 1 ? '🎯 Kolik máte zákazníků?' : '🎯 Rozdělte zákazníky po segmentech'}
                </h4>
                <p className="text-sm text-gray-600">
                  {segments.length === 1 
                    ? 'Zadejte počet pro výpočet bodu zvratu (break-even)'
                    : `Máte ${segments.length} segmenty - zadejte počty zákazníků`
                  }
                </p>
              </div>
              
              {/* Segments Input */}
              <div className="space-y-3">
                {segments.length === 1 ? (
                  /* SIMPLE MODE */
                  <>
                    <div>
                      <input
                          type="number"
                          value={currentCustomers || ''}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setCurrentCustomers(val);
                            
                            // Update the single segment
                            const newSegments = [...segments];
                            newSegments[0].customers = val;
                            setSegments(newSegments);
                            
                            // 💾 Save
                            debouncedSave(newSegments);
                          }}
                          placeholder="např. 50"
                          className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                        />
                      </div>
                      
                      {currentCustomers > 0 && calculatedAvgRevenue > 0 && (
                        <div className="mt-4">
                          <div className="bg-white border-2 border-gray-200 p-4 rounded-xl space-y-3 shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Průměrný příjem/zákazník:</span>
                              <strong className="text-lg text-gray-900">{Math.round(calculatedAvgRevenue).toLocaleString('cs-CZ')} Kč</strong>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                              <span className="text-gray-600">Bod zvratu (break-even):</span>
                              <strong className="text-lg text-blue-600">{breakEvenCustomers} zákazníků</strong>
                            </div>
                          </div>

                          {customerGap > 0 ? (
                            <div className="bg-orange-50 border-2 border-orange-300 p-3 rounded-xl mt-3">
                              <p className="text-orange-900 text-sm">
                                <strong>📊 GAP Analysis:</strong> Potřebujete ještě <strong>{customerGap} zákazníků</strong> pro break-even
                              </p>
                              <p className="text-orange-700 text-xs mt-1">
                                To je +{Math.round(customerGap * calculatedAvgRevenue).toLocaleString('cs-CZ')} Kč měsíčně
                              </p>
                            </div>
                          ) : (
                            <div className="bg-green-50 border-2 border-green-300 p-3 rounded-xl mt-3">
                              <p className="text-green-900 text-sm">
                                <strong>🎉 Gratulujeme!</strong> Jste nad break-evenem o {Math.abs(customerGap)} zákazníků
                              </p>
                              <p className="text-green-700 text-xs mt-1">
                                Každý další zákazník = +{Math.round(calculatedAvgRevenue).toLocaleString('cs-CZ')} Kč zisku
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    /* ADVANCED MODE - 2+ segments */
                    <>
                      <p className="text-blue-700 bg-blue-50 border border-blue-100 p-2 rounded-lg text-xs">
                        💡 Zadejte kolik máte zákazníků v <strong>každém segmentu</strong>
                      </p>
                      
                      {segments.map((segment, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-2.5">
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            <Users className="w-4 h-4" style={{ color: segment.color }} />
                            <span>{segment.name}</span>
                          </div>
                          
                          <div>
                            <label className="text-sm text-gray-600 block mb-1">
                              Kolik máte zákazníků?
                            </label>
                            <input
                              type="number"
                              value={segment.customers || ''}
                              onChange={(e) => {
                                const newSegments = [...segments];
                                newSegments[index].customers = parseInt(e.target.value) || 0;
                                setSegments(newSegments);
                                
                                const total = newSegments.reduce((sum, s) => sum + s.customers, 0);
                                setCurrentCustomers(total);
                                
                                debouncedSave(newSegments);
                              }}
                              placeholder="např. 50"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          {/* Segment metrics */}
                          {segment.customers > 0 && (() => {
                            const totalCustomersInSegments = segments.reduce((sum, s) => sum + s.customers, 0);
                            const directRevenue = revenueStreams
                              .filter(stream => stream.color === segment.color)
                              .reduce((sum, stream) => sum + stream.value, 0);
                            const globalRevenue = revenueStreams
                              .filter(stream => stream.color === 'global' || stream.color === 'gray')
                              .reduce((sum, stream) => sum + stream.value, 0);
                            const segmentShare = totalCustomersInSegments > 0 ? segment.customers / totalCustomersInSegments : 0;
                            const globalShare = globalRevenue * segmentShare;
                            const segmentRevenue = directRevenue + globalShare;
                            const avgRevenueForSegment = segment.customers > 0 ? segmentRevenue / segment.customers : 0;
                            
                            return (
                              <div className="bg-blue-50 border border-blue-100 p-2 rounded-lg text-xs space-y-0.5">
                                <div className="text-blue-900">
                                  💰 <strong>{Math.round(segmentRevenue).toLocaleString('cs-CZ')} Kč</strong> ({(segmentShare * 100).toFixed(0)}%)
                                </div>
                                <div className="text-blue-700">
                                  Ø {Math.round(avgRevenueForSegment).toLocaleString('cs-CZ')} Kč/zákazník
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      ))}

                      {/* Overall break-even for multi-segment */}
                      {currentCustomers > 0 && calculatedAvgRevenue > 0 && (() => {
                        const totalCustomersInSegments = segments.reduce((sum, s) => sum + s.customers, 0);
                        const avgRev = totalRevenue / totalCustomersInSegments;
                        const breakEven = Math.ceil(totalCosts / avgRev);
                        const gap = breakEven - totalCustomersInSegments;

                        return (
                          <div className="mt-4">
                            <div className={`p-2 rounded-lg text-xs ${
                              gap > 0 
                                ? 'bg-orange-50 border border-orange-200' 
                                : 'bg-green-50 border border-green-200'
                            }`}>
                              {gap > 0 ? (
                                <p className="text-orange-900">
                                  <strong>📊 GAP:</strong> Potřeba <strong>{gap} zákazníků</strong> ({Math.round(gap * avgRev).toLocaleString('cs-CZ')} Kč)
                                </p>
                              ) : (
                                <p className="text-green-900">
                                  <strong>🎉 Nad break-even!</strong> O {Math.abs(gap)} zákazníků. Další = +{Math.round(avgRev).toLocaleString('cs-CZ')} Kč
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </>
                  )}
                </div>
            </div>
          </div>

          {/* 💡 Co to znamená pro váš byznys? - PŘED Analýzou segmentů */}
          {currentCustomers > 0 && calculatedAvgRevenue > 0 && (
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <div className="text-left">
                        <span className="font-semibold text-gray-900">💡 Co to znamená pro váš byznys?</span>
                        <p className="text-xs text-gray-500">Kompletní business metriky, scénáře růstu a akční tipy</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                  </button>
                </CollapsibleTrigger>
              
                <CollapsibleContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                    {/* Current State */}
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-3 text-sm">📊 Aktuální stav</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Zákazníků:</span>
                            <strong className="text-blue-700">{currentCustomers}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Průměr/zákazník:</span>
                            <strong>{Math.round(calculatedAvgRevenue).toLocaleString('cs-CZ')} Kč</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Profit margin:</span>
                            <strong className={
                              isProfitable ? 'text-green-700' : isBreakEven ? 'text-blue-700' : 'text-red-700'
                            }>
                              {profitMargin.toFixed(1)}%
                            </strong>
                          </div>
                          <div className="flex justify-between border-t border-gray-200 pt-2">
                            <span className="text-gray-600">
                              {isProfitable ? 'Měsíční zisk:' : isBreakEven ? 'Měsíční výsledek:' : 'Měsíční ztráta:'}
                            </span>
                            <strong className={
                              isProfitable ? 'text-green-700' : isBreakEven ? 'text-blue-700' : 'text-red-700'
                            }>
                              {Math.abs(profit).toLocaleString('cs-CZ')} Kč
                            </strong>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Insights */}
                      <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg">
                        <div className="font-semibold text-indigo-900 mb-2 text-sm">💡 Rychlé výpočty</div>
                        <div className="space-y-1.5 text-indigo-800 text-xs">
                          <div className="flex justify-between">
                            <span>{isProfitable ? 'Roční zisk:' : isBreakEven ? 'Roční projekce:' : 'Roční ztráta:'}</span>
                            <strong>{(profit * 12).toLocaleString('cs-CZ')} Kč</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>{isProfitable ? 'Zisk na zákazníka:' : isBreakEven ? 'Výsledek na zákazníka:' : 'Ztráta na zákazníka:'}</span>
                            <strong>{currentCustomers > 0 ? Math.round(profit / currentCustomers).toLocaleString('cs-CZ') : '—'} Kč</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Break-even bod:</span>
                            <strong className="text-blue-700">{breakEvenCustomers} zákazníků</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Growth Scenarios */}
                    <div className="space-y-3">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="font-semibold text-purple-900 mb-3 text-sm">🚀 Scénáře růstu</div>
                        <div className="space-y-2 text-sm">
                          {[
                            { label: '+10 zákazníků', customers: currentCustomers + 10 },
                            { label: '+25 zákazníků', customers: currentCustomers + 25 },
                            { label: '+50 zákazníků', customers: currentCustomers + 50 }
                          ].map((scenario, idx) => {
                            const newRevenue = scenario.customers * calculatedAvgRevenue;
                            const newProfit = newRevenue - totalCosts;
                            const increase = newProfit - profit;

                            return (
                              <div key={idx} className="flex justify-between items-center">
                                <span className="text-purple-700">{scenario.label}:</span>
                                <div className="text-right">
                                  <div className={`font-bold ${
                                    newProfit > 0 ? 'text-green-700' : newProfit === 0 ? 'text-blue-700' : 'text-orange-700'
                                  }`}>
                                    {Math.round(newProfit).toLocaleString('cs-CZ')} Kč
                                  </div>
                                  <div className={`text-xs ${
                                    increase > 0 ? 'text-green-600' : increase === 0 ? 'text-gray-500' : 'text-red-600'
                                  }`}>
                                    {increase > 0 ? '+' : ''}{Math.round(increase).toLocaleString('cs-CZ')} Kč
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Tips */}
                      <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                        <div className="font-semibold text-green-900 mb-2 text-sm">✅ Akční tipy</div>
                        <ul className="space-y-1 text-xs text-green-800">
                          {revenueStreams.length > 0 && (
                            <li>• Zaměřte se na TOP zdroj příjmů: <strong>{revenueStreams[0].name}</strong></li>
                          )}
                          <li>• Zvyšte cenu o 10-20% s přidanou hodnotou</li>
                          <li>• Získejte {Math.ceil(breakEvenCustomers * 0.2)} zákazníků = +20% růst</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}

          {/* 📊 ANALÝZA ZÁKAZNICKÝCH SEGMENTŮ - Only if 2+ segments */}
          {segments.length > 1 && currentCustomers > 0 && (() => {
            const totalCustomersInSegments = segments.reduce((sum, s) => sum + s.customers, 0);
            
            const segmentAnalysis = segments.map(segment => {
              const directRevenue = revenueStreams
                .filter(stream => stream.color === segment.color)
                .reduce((sum, stream) => sum + stream.value, 0);
              
              const globalRevenue = revenueStreams
                .filter(stream => stream.color === 'global' || stream.color === 'gray')
                .reduce((sum, stream) => sum + stream.value, 0);
              
              const segmentShare = totalCustomersInSegments > 0 ? segment.customers / totalCustomersInSegments : 0;
              const globalShare = globalRevenue * segmentShare;
              const totalSegmentRevenue = directRevenue + globalShare;
              const avgRevPerCustomer = segment.customers > 0 ? totalSegmentRevenue / segment.customers : 0;
              
              return {
                ...segment,
                totalRevenue: totalSegmentRevenue,
                avgRevenue: avgRevPerCustomer
              };
            }).filter(s => s.customers > 0);
            
            // Sort by total revenue
            segmentAnalysis.sort((a, b) => b.totalRevenue - a.totalRevenue);
            
            if (segmentAnalysis.length === 0) return null;
            
            return (
              <Collapsible>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <span className="font-semibold text-gray-900">📊 Analýza zákaznických segmentů</span>
                          <p className="text-xs text-gray-500">Který segment přináší lepší příjmy?</p>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                    </button>
                  </CollapsibleTrigger>
                
                  <CollapsibleContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
                      {/* LEFT: Ranking podle hodnoty */}
                      <div>
                        <h5 className="font-bold text-gray-900 mb-4">🏆 Ranking podle hodnoty</h5>
                        
                        <div className="space-y-2">
                          {(() => {
                            // TIE LOGIC PERFECTLY FIXED - Use Map for ranks
                            const rankMap = new Map<number, number>();
                            segmentAnalysis.forEach((seg, idx) => {
                              const roundedValue = Math.round(seg.totalRevenue);
                              if (!rankMap.has(roundedValue)) {
                                // First occurrence - count unique values before
                                const uniqueBefore = new Set(
                                  segmentAnalysis.slice(0, idx).map(s => Math.round(s.totalRevenue))
                                );
                                rankMap.set(roundedValue, uniqueBefore.size + 1);
                              }
                            });
                            
                            // Assign ranks
                            const rankedSegments = segmentAnalysis.map(seg => ({
                              ...seg,
                              rank: rankMap.get(Math.round(seg.totalRevenue))!
                            }));
                            
                            return rankedSegments.map((seg, idx) => {
                              const rank = seg.rank;
                              const percentage = totalRevenue > 0 ? (seg.totalRevenue / totalRevenue) * 100 : 0;
                              const isTop = rank === 1;
                              
                              return (
                                <div 
                                  key={idx} 
                                  className={`p-4 rounded-xl border-2 transition-all ${
                                    isTop 
                                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-md' 
                                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  {isTop && (
                                    <div className="mb-2">
                                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-200 px-3 py-1 rounded-full">
                                        ⭐ Nejcennější segment
                                      </span>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                      <span className={`text-sm font-bold px-2.5 py-1 rounded-lg ${
                                        isTop ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                                      }`}>
                                        #{rank}
                                      </span>
                                      <span className={`font-semibold ${isTop ? 'text-blue-900 text-lg' : 'text-gray-700'}`}>
                                        {seg.name}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className={`font-bold ${isTop ? 'text-blue-700 text-xl' : 'text-gray-900 text-lg'}`}>
                                        {Math.round(seg.totalRevenue).toLocaleString('cs-CZ')} Kč
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {percentage.toFixed(0)}% příjmů
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm text-gray-600">
                                        {seg.customers} zákazníků
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                      
                      {/* RIGHT: Strategické doporučení */}
                      <div>
                        <h5 className="font-bold text-gray-900 mb-4">💡 Strategické doporučení</h5>
                        
                        {segmentAnalysis.length > 0 && (() => {
                          const topSegment = segmentAnalysis[0];
                          
                          return (
                            <div className="space-y-3">
                              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
                                <div className="font-semibold text-blue-900 mb-2">
                                  🎯 TOP segment: <span className="text-blue-700">{topSegment.name}</span>
                                </div>
                                <p className="text-sm text-blue-800">
                                  • Zdvojnásobte marketing pro {topSegment.name}
                                </p>
                                <p className="text-sm text-blue-800">
                                  • Vytvořte premium variantu produktu
                                </p>
                                <p className="text-sm text-blue-800">
                                  • Případné upsell příležitosti
                                </p>
                              </div>
                              
                              {segmentAnalysis.length > 1 && (() => {
                                // Check if TOP segments are TIE (same value)
                                const secondSegment = segmentAnalysis[1];
                                const isTie = Math.round(topSegment.totalRevenue) === Math.round(secondSegment.totalRevenue);
                                
                                return (
                                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                                    <div className="font-semibold text-green-900 text-sm mb-1">
                                      ✅ Akční strategie
                                    </div>
                                    <p className="text-xs text-green-800">
                                      • TOP segment: Zdvojnásobte marketing pro {topSegment.name}
                                    </p>
                                    <p className="text-xs text-green-800">
                                      • Vytvořte upsell program nebo premium verzi
                                    </p>
                                    <p className="text-xs text-green-800 mt-2">
                                      {isTie 
                                        ? `• #2 segment: ${secondSegment.name} má stejnou hodnotu - oba segmenty jsou stejně důležité!`
                                        : `• #2 segment: ${secondSegment.name} jako záložní zdroj růstu`
                                      }
                                    </p>
                                  </div>
                                );
                              })()}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })()}
        </>
      )}

      {/* CTA - Complete Lesson */}
      {!isLessonCompleted && (totalRevenue > 0 || totalCosts > 0) && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <h3 className="mb-2 text-white text-xl sm:text-2xl">
            ✅ Skvělá práce!
          </h3>
          <p className="text-green-50 mb-6 text-sm sm:text-base max-w-xl mx-auto">
            Znáte svůj breakeven point a víte kolik zákazníků potřebujete
          </p>
          <Button
            onClick={() => {
              onComplete();
              // Auto-redirect po 500ms (rychlejší UX)
              if (onNavigateNext) {
                setTimeout(() => {
                  onNavigateNext();
                }, 500);
              }
            }}
            size="lg"
            className="bg-white text-green-700 hover:bg-green-50 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            ✅ Dokončit lekci a pokračovat →
          </Button>
        </div>
      )}


    </div>
  );
}
