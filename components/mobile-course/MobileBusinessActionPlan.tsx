import { useState, useEffect } from "react";
import { 
  Target, 
  CheckCircle2, 
  Circle,
  Trophy,
  TrendingUp,
  AlertCircle,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Menu,
  Package,
  HelpCircle
} from "lucide-react";
import { Button } from "../ui/button";
import { supabase } from "../../lib/supabase";
import { haptic } from "../../lib/haptics";
import { toast } from "sonner";

interface MobileBusinessActionPlanProps {
  userId: string;
  onNavigateToLesson?: (lessonId: number) => void;
  onAchievementUnlocked?: (achievementId: string) => void;
  onOpenSidebar?: () => void;
  onShowWelcomeModal?: () => void;
}

interface ActionItem {
  id: string;
  text: string;
  deadline?: string;
  tip?: string;
  lessonId?: number;
  lessonName?: string;
}

interface TopPriority {
  text: string;
  percentage: number;
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

interface ProductAnalysis {
  name: string;
  status: 'good' | 'warning' | 'bad';
  reason: string;
  action: string;
}

interface RevenueStream {
  name: string;
  color: string;
  revenue: number;
  costs: number;
  profit: number;
}

export function MobileBusinessActionPlan({ 
  userId, 
  onNavigateToLesson,
  onAchievementUnlocked,
  onOpenSidebar,
  onShowWelcomeModal
}: MobileBusinessActionPlanProps) {
  const [loading, setLoading] = useState(true);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [showBacklog, setShowBacklog] = useState(false);
  const [topJobs, setTopJobs] = useState<TopPriority[]>([]);
  const [topPains, setTopPains] = useState<TopPriority[]>([]);
  const [topGains, setTopGains] = useState<TopPriority[]>([]);
  const [segmentRankings, setSegmentRankings] = useState<SegmentRanking[]>([]);
  const [products, setProducts] = useState<ProductAnalysis[]>([]);
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>([]);

  // Load completed actions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`action_plan_completed_${userId}`);
    if (saved) {
      setCompletedActions(new Set(JSON.parse(saved)));
    }
  }, [userId]);

  // Toggle action completion
  const toggleAction = async (actionId: string) => {
    const newCompleted = new Set(completedActions);
    const wasCompleted = newCompleted.has(actionId);
    
    if (wasCompleted) {
      newCompleted.delete(actionId);
      haptic('light');
    } else {
      newCompleted.add(actionId);
      haptic('success');
      
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
  }, [userId]);

  const loadData = async () => {
    try {
      setLoading(true);

      // 1. Load segments (for rankings)
      const { data: segmentsData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .maybeSingle();

      console.log('📱 Segments:', segmentsData);

      // 2. Load revenue & costs (for economic analysis)
      const { data: revenueData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'revenue')
        .maybeSingle();

      const { data: costsData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'costs')
        .maybeSingle();

      console.log('📱 Revenue:', revenueData);
      console.log('📱 Costs:', costsData);

      // Create revenue streams list
      if (revenueData?.content && costsData?.content) {
        const totalRevenue = (revenueData.content || [])
          .reduce((sum: number, r: any) => sum + (r.value || 0), 0);
        
        const totalCosts = (costsData.content || [])
          .reduce((sum: number, c: any) => sum + (c.value || 0), 0);

        const streams: RevenueStream[] = (revenueData.content || []).map((r: any) => {
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

        streams.sort((a, b) => b.revenue - a.revenue);
        setRevenueStreams(streams);
        console.log('📱 Revenue Streams:', streams);
      }

      // 3. Load VPC records
      const { data: allVPCRecords } = await supabase
        .from('value_proposition_canvas')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      console.log('📱 Mobile Action Plan - VPC Records:', allVPCRecords);

      // Find Customer Profile with FIT data
      const vpcWithFit = allVPCRecords?.find(r => 
        r.selected_value === null && 
        r.fit_validation_data && 
        r.fit_validation_data.jobs
      );

      if (!vpcWithFit?.fit_validation_data) {
        console.log('📱 No FIT data found');
        setLoading(false);
        return;
      }

      const fitData = vpcWithFit.fit_validation_data;
      const jobs = fitData.jobs || [];
      const pains = fitData.pains || [];
      const gains = fitData.gains || [];

      // Get prioritized items (sorted)
      const sortedJobs = jobs.filter((j: any) => (j.percentage || 0) > 0)
        .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0));
      const sortedPains = pains.filter((p: any) => (p.percentage || 0) > 0)
        .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0));
      const sortedGains = gains.filter((g: any) => (g.percentage || 0) > 0)
        .sort((a: any, b: any) => (b.percentage || 0) - (a.percentage || 0));

      const topJobsList = sortedJobs.slice(0, 3);
      const topPainsList = sortedPains.slice(0, 3);
      const topGainsList = sortedGains.slice(0, 3);

      setTopJobs(topJobsList);
      setTopPains(topPainsList);
      setTopGains(topGainsList);

      // 3. Create segment rankings (from Profit Calculator)
      let rankings: SegmentRanking[] = [];
      
      if (segmentsData?.content) {
        rankings = segmentsData.content
          .map((s: any) => {
            const hasCustomers = (s.currentValue || 0) > 0;
            const hasRevenue = (s.value || 0) > 0;
            const isColoredSegment = s.color && s.color !== 'white';
            
            if (!isColoredSegment || !hasCustomers || !hasRevenue) {
              return null;
            }

            const currentCustomers = s.currentValue || 0;
            const targetCustomers = s.targetValue || currentCustomers;
            const avgSpend = s.value || 0;
            const currentRevenue = currentCustomers * avgSpend;
            const potentialRevenue = targetCustomers * avgSpend;
            const growth = currentRevenue > 0 
              ? Math.round(((potentialRevenue - currentRevenue) / currentRevenue) * 100)
              : 0;

            return {
              name: s.text,
              color: s.color,
              avgSpend,
              currentCustomers,
              targetCustomers,
              currentRevenue,
              potentialRevenue,
              growth
            };
          })
          .filter(Boolean)
          .sort((a: any, b: any) => b.potentialRevenue - a.potentialRevenue);

        console.log('📊 Segment Rankings:', rankings);
        setSegmentRankings(rankings);
      }

      // 4. Generate action items (STEJNÁ LOGIKA JAKO DESKTOP!)
      const actions: ActionItem[] = [];
      
      const hasTopSegment = rankings.length > 0;
      const topSegmentName = hasTopSegment ? rankings[0].name : '';
      const topSegmentRevenue = hasTopSegment ? Math.round(rankings[0].potentialRevenue) : 0;
      
      const hasTopPains = sortedPains.length > 0;
      const hasTopGains = sortedGains.length > 0;
      
      // 📋 AKCE #1: Vylepšete produkt pro TOP pains
      if (hasTopPains) {
        const tip1 = sortedPains[1] ? `• ${sortedPains[1].text} (${sortedPains[1].percentage}%)\n` : '';
        const tip2 = sortedPains[2] ? `• ${sortedPains[2].text} (${sortedPains[2].percentage}%)` : '';
        actions.push({
          id: 'improve-pain-relievers',
          text: 'Řešte TOP obtíže zákazníků',
          deadline: '14 dní',
          tip: `🎯 Zaměřte se na tyto problémy zákazníků:\n• ${sortedPains[0].text} (${sortedPains[0].percentage}%)\n${tip1}${tip2}\n\nPřidejte funkce nebo upravte produkt aby tyto problémy lépe řešil.`
        });
      }
      
      // ✨ AKCE #2: Zdůrazněte TOP gains v komunikaci
      if (hasTopGains) {
        const tip1 = sortedGains[1] ? `• ${sortedGains[1].text} (${sortedGains[1].percentage}%)\n` : '';
        const tip2 = sortedGains[2] ? `• ${sortedGains[2].text} (${sortedGains[2].percentage}%)` : '';
        actions.push({
          id: 'highlight-gain-creators',
          text: 'Zdůrazněte TOP přínosy v marketingu',
          deadline: '14 dní',
          tip: `💬 Komunikujte tyto benefity všude (web, emaily, reklamy):\n• ${sortedGains[0].text} (${sortedGains[0].percentage}%)\n${tip1}${tip2}\n\nZákazníci toto očekávají nejvíc!`
        });
      }
      
      // 📊 AKCE #3: Měřte klíčové metriky
      if (hasTopSegment) {
        actions.push({
          id: 'track-metrics',
          text: 'Sledujte prodeje a zákaznický feedback',
          deadline: '7 dní',
          tip: `📈 Sledujte tyto metriky (Google Sheets nebo notebook):\n• Počet leadů/týden z "${topSegmentName}"\n• Konverze: lead → klient (%)\n• Průměrná hodnota zakázky (Kč)\n• Měsíční příjem (cíl: ${topSegmentRevenue.toLocaleString()} Kč)\n\nCo se měří, to se zlepšuje!`
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
      } else if (hasTopSegment) {
        // Pokud mají jen 1 segment, navrhni optimalizaci
        actions.push({
          id: 'optimize-current',
          text: 'Optimalizujte aktuální segment',
          deadline: '30 dní',
          tip: `💡 Zaměřte se na zlepšení v "${topSegmentName}":\n• Zvyšte konverzi leadů\n• Zlepšete průměrnou hodnotu zakázky\n• Získejte více zákazníků z tohoto segmentu\n\nMůžete také přidat nový segment do Podnikatelského modelu.`
        });
      }

      // 5. Produktová analýza (stejná logika jako desktop)
      const productAnalysis: ProductAnalysis[] = [];
      
      if (allVPCRecords && allVPCRecords.length > 0 && rankings.length > 0) {
        const topSegmentName = rankings[0].name;
        console.log('📦 Analyzing products for TOP segment:', topSegmentName);
        
        // Find all Value Maps for top segment
        const topSegmentValueMaps = allVPCRecords.filter((r: any) => 
          r.segment_name?.trim() === topSegmentName?.trim() && r.selected_value !== null
        );
        
        console.log('📦 Found', topSegmentValueMaps.length, 'value maps for', topSegmentName);
        
        // For each value, calculate FIT score
        topSegmentValueMaps.forEach((vm: any) => {
          const valueName = vm.selected_value;
          
          // Calculate potential revenue
          const segmentData = segmentsData?.content?.find((s: any) => s.text === vm.segment_name);
          const segmentRevenue = segmentData?.value || 0;
          const segmentCustomers = segmentData?.targetValue || 0;
          const potentialRevenue = segmentRevenue * segmentCustomers;
          
          // Get FIT score from Customer Profile
          const customerProfile = allVPCRecords?.find((r: any) =>
            r.segment_name === vm.segment_name && r.selected_value === null && r.fit_validation_data
          );
          
          let fitScore = 0;
          if (customerProfile?.fit_validation_data?.fitScore) {
            fitScore = customerProfile.fit_validation_data.fitScore;
          } else if (customerProfile?.fit_validation_data) {
            // Fallback: calculate from mappings
            const fitData = customerProfile.fit_validation_data;
            const productMappings = vm.product_mappings || {};
            const painMappings = vm.pain_reliever_mappings || {};
            const gainMappings = vm.gain_creator_mappings || {};
            
            let coveredPainsCount = 0;
            let coveredGainsCount = 0;
            let coveredJobsCount = 0;
            
            if (sortedPains.length > 0) {
              const coveredPainIds = new Set<string>();
              Object.values(painMappings).forEach((painIds: any) => {
                painIds.forEach((id: string) => coveredPainIds.add(id));
              });
              coveredPainsCount = sortedPains.filter((p: any) => coveredPainIds.has(p.id)).length;
            }
            
            if (sortedGains.length > 0) {
              const coveredGainIds = new Set<string>();
              Object.values(gainMappings).forEach((gainIds: any) => {
                gainIds.forEach((id: string) => coveredGainIds.add(id));
              });
              coveredGainsCount = sortedGains.filter((g: any) => coveredGainIds.has(g.id)).length;
            }
            
            if (sortedJobs.length > 0) {
              const coveredJobIds = new Set<string>();
              Object.values(productMappings).forEach((jobIds: any) => {
                jobIds.forEach((id: string) => coveredJobIds.add(id));
              });
              coveredJobsCount = sortedJobs.filter((j: any) => coveredJobIds.has(j.id)).length;
            }
            
            let totalWeight = 0;
            let achievedScore = 0;
            
            if (sortedPains.length > 0) {
              totalWeight += 40;
              achievedScore += (coveredPainsCount / sortedPains.length) * 40;
            }
            if (sortedGains.length > 0) {
              totalWeight += 40;
              achievedScore += (coveredGainsCount / sortedGains.length) * 40;
            }
            if (sortedJobs.length > 0) {
              totalWeight += 20;
              achievedScore += (coveredJobsCount / sortedJobs.length) * 20;
            }
            
            fitScore = totalWeight > 0 ? Math.round((achievedScore / totalWeight) * 100) : 0;
          }
          
          // Add to analysis if has data
          if (potentialRevenue > 0 || fitScore > 0) {
            if (fitScore >= 60) {
              productAnalysis.push({
                name: `${valueName} (${vm.segment_name})`,
                status: 'good',
                reason: `FIT ${fitScore}% · Potenciál ${potentialRevenue.toLocaleString()} Kč/měsíc`,
                action: 'Priorita #1! Zaměřte se na tento produkt.'
              });
            } else if (fitScore >= 30) {
              productAnalysis.push({
                name: `${valueName} (${vm.segment_name})`,
                status: 'warning',
                reason: `FIT ${fitScore}% · Potenciál ${potentialRevenue.toLocaleString()} Kč/měsíc`,
                action: 'Vylepšete komunikaci nebo funkce'
              });
            } else {
              productAnalysis.push({
                name: `${valueName} (${vm.segment_name})`,
                status: 'bad',
                reason: `FIT ${fitScore}% · Potenciál ${potentialRevenue.toLocaleString()} Kč/měsíc`,
                action: 'Přehodnoťte tento produkt'
              });
            }
          }
        });
        
        // Sort products by status and fit score
        productAnalysis.sort((a, b) => {
          const order = { good: 0, warning: 1, bad: 2 };
          return order[a.status] - order[b.status];
        });
        
        console.log('📦 Product analysis complete:', productAnalysis);
      }
      
      setProducts(productAnalysis);
      setActionItems(actions);
      setLoading(false);

    } catch (err) {
      console.error('❌ Error loading action plan:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Načítám akční plán...</p>
        </div>
      </div>
    );
  }

  const completedCount = completedActions.size;
  const totalCount = actionItems.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      {/* Header with Menu Button */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          {onOpenSidebar && (
            <button
              onClick={() => {
                haptic('light');
                onOpenSidebar();
              }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-5 h-5" />
              <h1 className="text-lg">Akční plán</h1>
            </div>
            <p className="text-sm text-green-100">
              Vaše konkrétní další kroky
            </p>
          </div>
          {onShowWelcomeModal && (
            <button
              onClick={() => {
                haptic('light');
                onShowWelcomeModal();
              }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
              aria-label="Nápověda"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 pb-24">{/* Content */}

        {/* Progress Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-5 mb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="w-6 h-6" />
          <div className="flex-1">
            <h3 className="font-bold">Váš pokrok</h3>
            <p className="text-sm text-purple-100">{completedCount}/{totalCount} dokončeno</p>
          </div>
          <div className="text-2xl font-bold">{progressPercent}%</div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-white transition-all duration-500 ease-out"
          />
        </div>
      </div>

        {/* Action Items */}
        {actionItems.length > 0 ? (
          <div className="space-y-3 mb-6">
            <h2 className="font-bold text-gray-900 mb-3">📋 Akce k provedení</h2>
          
            {actionItems.map((action, index) => {
              const isCompleted = completedActions.has(action.id);
              
              return (
                <div
                  key={action.id}
                  className={`rounded-xl p-4 border-2 transition-all ${
                    isCompleted
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {/* Checkbox + Text */}
                  <div className="flex items-start gap-3 mb-2">
                    <button
                      onClick={() => toggleAction(action.id)}
                      className="flex-shrink-0 mt-0.5"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${isCompleted ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                        {action.text}
                      </p>
                      
                      {action.deadline && (
                        <p className="text-xs text-gray-500 mt-1">
                          ⏰ Do: {action.deadline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tip */}
                  {action.tip && !isCompleted && (
                    <div className="ml-9 bg-blue-50 border border-blue-200 rounded-lg p-2 mb-2">
                      <p className="text-xs text-blue-900 whitespace-pre-line">
                        💡 <strong>Tip:</strong> {action.tip}
                      </p>
                    </div>
                  )}

                  {/* Navigate to Lesson Button */}
                  {action.lessonId && onNavigateToLesson && !isCompleted && (
                    <div className="ml-9">
                      <button
                        onClick={() => {
                          haptic('medium');
                          onNavigateToLesson(action.lessonId!);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        Přejít na {action.lessonName}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-900">
              ⚠️ Zatím nemáte žádné akce. Dokončete FIT Validator v lekci 16!
            </p>
          </div>
        )}

        {/* TOP produkty / Revenue Streams (Economic Analysis) */}
        {revenueStreams.length > 0 && (
          <div className="bg-white rounded-xl border-2 border-green-200 p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-gray-900">💰 TOP produkty které vám vydělávají</h3>
            </div>
            
            <div className="space-y-3">
              {revenueStreams.slice(0, 3).map((stream, idx) => {
                const margin = stream.revenue > 0 ? Math.round((stream.profit / stream.revenue) * 100) : 0;
                const isTopRank = idx === 0;
                const medal = idx === 0 ? '🏆' : idx === 1 ? '🥈' : '🥉';
                
                return (
                  <div
                    key={stream.name}
                    className={`p-3 rounded-lg border-2 ${
                      isTopRank 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{medal}</span>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">
                            #{idx + 1} {stream.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            Marže: <span className={`font-bold ${
                              margin > 30 ? 'text-green-600' : 
                              margin > 0 ? 'text-yellow-600' : 
                              'text-red-600'
                            }`}>
                              {margin}%
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded p-2 border border-gray-200">
                        <p className="text-xs text-gray-600">Příjem měsíčně</p>
                        <p className="text-sm font-bold text-green-600">
                          {Math.round(stream.revenue).toLocaleString()} Kč
                        </p>
                      </div>
                      <div className="bg-white rounded p-2 border border-gray-200">
                        <p className="text-xs text-gray-600">Zisk měsíčně</p>
                        <p className={`text-sm font-bold ${
                          stream.profit > 0 ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {Math.round(stream.profit).toLocaleString()} Kč
                        </p>
                      </div>
                    </div>
                    
                    {isTopRank && margin > 20 && (
                      <div className="mt-2 bg-green-100 rounded p-2 border border-green-300">
                        <p className="text-xs text-green-900 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          TOP příjem! Zaměřte marketingové úsilí sem.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TOP priority (Jobs/Pains/Gains) */}
        {(topJobs.length > 0 || topPains.length > 0 || topGains.length > 0) && (
          <div className="bg-white rounded-xl border-2 border-blue-200 p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">🎯 TOP priority zákazníků</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Co zákazníci z TOP segmentu nejvíc potřebují
            </p>
            
            <div className="space-y-4">
              {/* Jobs */}
              {topJobs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-orange-600" />
                    <h4 className="font-bold text-orange-900 text-sm">🎯 Úkoly</h4>
                  </div>
                  <div className="space-y-1">
                    {topJobs.map((job, i) => (
                      <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-gray-900 flex-1">
                            {i + 1}. {job.text}
                          </p>
                          <span className="text-xs font-bold text-orange-600">
                            {job.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Pains */}
              {topPains.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <h4 className="font-bold text-red-900 text-sm">💊 Obavy</h4>
                  </div>
                  <div className="space-y-1">
                    {topPains.map((pain, i) => (
                      <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-gray-900 flex-1">
                            {i + 1}. {pain.text}
                          </p>
                          <span className="text-xs font-bold text-red-600">
                            {pain.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Gains */}
              {topGains.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-green-600" />
                    <h4 className="font-bold text-green-900 text-sm">📈 Očekávání</h4>
                  </div>
                  <div className="space-y-1">
                    {topGains.map((gain, i) => (
                      <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-gray-900 flex-1">
                            {i + 1}. {gain.text}
                          </p>
                          <span className="text-xs font-bold text-green-600">
                            {gain.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Segment Rankings */}
        {segmentRankings.length > 0 && (
          <div className="bg-white rounded-xl border-2 border-purple-200 p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-900">📊 Jaký segment je nejlepší?</h3>
            </div>
            
            <div className="space-y-3">
              {segmentRankings.slice(0, 3).map((segment, idx) => {
                const isTopRank = idx === 0;
                const completion = segment.currentRevenue > 0 
                  ? Math.round((segment.currentRevenue / segment.potentialRevenue) * 100) 
                  : 0;
                
                return (
                  <div
                    key={segment.name}
                    className={`p-3 rounded-lg border-2 ${
                      isTopRank 
                        ? 'bg-purple-50 border-purple-300' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: segment.color }}
                        />
                        <h4 className="font-bold text-sm text-gray-900">{segment.name}</h4>
                      </div>
                      {isTopRank && (
                        <span className="bg-purple-500 text-white px-2 py-0.5 rounded-full text-xs">
                          TOP
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-white rounded p-2 border border-gray-200">
                        <p className="text-xs text-gray-600">Aktuální příjem</p>
                        <p className="text-sm font-bold text-blue-600">
                          {Math.round(segment.currentRevenue).toLocaleString()} Kč
                        </p>
                        <p className="text-xs text-gray-500">{segment.currentCustomers} zákazníků</p>
                      </div>
                      <div className="bg-white rounded p-2 border border-gray-200">
                        <p className="text-xs text-gray-600">Potenciál</p>
                        <p className="text-sm font-bold text-green-600">
                          {Math.round(segment.potentialRevenue).toLocaleString()} Kč
                        </p>
                        <p className="text-xs text-gray-500">při {segment.targetCustomers} zákaznících</p>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Dosažení cíle</span>
                        <span className="font-bold">{completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            completion >= 80 ? 'bg-green-500' : 
                            completion >= 50 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                    </div>
                    
                    {isTopRank && segment.potentialRevenue > segment.currentRevenue && (
                      <div className="bg-purple-100 rounded p-2 border border-purple-300">
                        <p className="text-xs text-purple-900 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Nejvyšší potenciál! Získejte +{segment.targetCustomers - segment.currentCustomers} zákazníků
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Product Analysis */}
        {products.length > 0 && (
          <div className="bg-white rounded-xl border-2 border-purple-200 p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-purple-600" />
              <div>
                <h3 className="font-bold text-gray-900">📦 Produktová analýza</h3>
                <p className="text-xs text-gray-600">
                  {segmentRankings.length > 0 
                    ? `Produkty pro TOP segment: ${segmentRankings[0].name}`
                    : 'Jak dobře vaše produkty řeší TOP priority?'}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {products.slice(0, 3).map((product, idx) => {
                const isTopRank = idx === 0;
                
                return (
                  <div
                    key={product.name}
                    className={`p-3 rounded-lg border-2 ${
                      product.status === 'good'
                        ? 'bg-green-50 border-green-300'
                        : product.status === 'warning'
                        ? 'bg-yellow-50 border-yellow-300'
                        : 'bg-red-50 border-red-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-lg">
                          {isTopRank && product.status === 'good' ? '🏆' : 
                           product.status === 'good' ? '✅' : 
                           product.status === 'warning' ? '⚠️' : '❌'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-gray-900 break-words">{product.name}</h4>
                        </div>
                      </div>
                      {isTopRank && product.status === 'good' && (
                        <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs whitespace-nowrap ml-2">
                          TOP
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-700 mb-2">{product.reason}</p>
                    <p className="text-xs font-bold text-gray-900">💡 {product.action}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Motivational Message */}
        {progressPercent === 100 && (
          <div className="mt-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl p-5 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3" />
            <h3 className="font-bold mb-2">🎉 Skvělá práce!</h3>
            <p className="text-sm text-green-100">
              Dokončili jste všechny akce z plánu. Teď je čas uvést vaše nápady do praxe!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
