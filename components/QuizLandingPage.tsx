import { BusinessHealthQuiz } from './BusinessHealthQuiz';
import { useState } from 'react';
import { CheckCircle, TrendingUp, Zap, Target, Shield, ArrowRight, ChevronRight, Mail, BookOpen, Gift, Sparkles, Calendar, Clock, Award, Star } from 'lucide-react';
import { Button } from './ui/button';
import { trackLead, trackQuizCompleted } from '../lib/metaPixel'; // ✅ PŘIDÁNO: Meta Pixel tracking

export function QuizLandingPage() {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizComplete = async (result: any, email: string, name: string, answers: Record<string, number>) => {
    try {
      console.log('🔍 DEBUG: handleQuizComplete called', { result, email, name });
      
      // ✅ THEN call API FIRST (before showing results!)
      console.log('📤 Calling quiz-submit API...');
      console.log('📤 URL:', '/.netlify/functions/quiz-submit');
      console.log('📤 Payload:', JSON.stringify({
        email,
        name,
        quizType: result.category === 'beginner' ? 'beginner' : 'existing',
        answers,
        result
      }, null, 2));
      
      const response = await fetch('/.netlify/functions/quiz-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          name,
          quizType: result.category === 'beginner' ? 'beginner' : 'existing',
          answers,
          result: {
            score: result.score,
            category: result.category,
            categoryLabel: result.categoryLabel,
            categoryDescription: result.categoryDescription || '',
            risks: result.risks || [],
            recommendations: result.recommendations || [],
            subScores: result.subScores || []
          }
        })
      });
      
      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', response.headers);
      
      // ⚠️ LOKÁLNÍ DEV FALLBACK - pokud Netlify functions nefungují (404)
      if (response.status === 404) {
        console.warn('⚠️ Netlify functions not available (running locally without netlify dev?)');
        console.warn('💡 TIP: Use "npm run dev:netlify" to test with functions locally');
        
        // 🎯 META PIXEL: Track Lead conversion (even in local dev)
        trackLead(email);
        trackQuizCompleted(
          result.category === 'beginner' ? 'beginner' : 'existing',
          result.score,
          result.category
        );
        
        // ✅ REDIRECT na děkovnou stránku i tak (pro lokální testování UX)
        const params = new URLSearchParams({
          email,
          score: result.score.toString(),
          category: result.category
        });
        window.location.href = `/kviz/hotovo?${params.toString()}`;
        
        return; // Exit early - no error, just skip API
      }
      
      const responseText = await response.text();
      console.log('📥 Response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('📥 Response data:', data);
      } catch (e) {
        console.error('❌ Failed to parse response as JSON:', e);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      if (!response.ok) {
        console.error('❌ Quiz submit error:', data);
        throw new Error(data.error || 'Failed to submit quiz');
      }
      
      console.log('✅ Quiz submitted successfully!', data);
      
      // 🎯 META PIXEL: Track Lead conversion!
      trackLead(email);
      trackQuizCompleted(
        result.category === 'beginner' ? 'beginner' : 'existing',
        result.score,
        result.category
      );
      
      // ✅ ULOŽIT DATA DO sessionStorage (aby URL nebyla dlouhá!)
      sessionStorage.setItem('quizResult', JSON.stringify({
        email,
        name,
        score: result.score,
        category: result.category,
        categoryLabel: result.categoryLabel,
        subScores: result.subScores || []
      }));
      
      // ✅ REDIRECT na děkovnou stránku - JEN s emailem (krátká URL!)
      const params = new URLSearchParams({
        email,
        score: result.score.toString(),
        category: result.category
      });
      window.location.href = `/kviz/hotovo?${params.toString()}`;
      
    } catch (error) {
      console.error('❌ Quiz submission error:', error);
      // ⚠️ THROW ERROR BACK to BusinessHealthQuiz so it can show toast!
      throw error;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-950">
      
      {/* Background effects - KICKSTART energy */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-40 w-48 h-48 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden">
        {/* Decorative Elements - KICKSTART THEME */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl"></div>
          <div className="absolute top-40 right-20 text-6xl">⚡</div>
          <div className="absolute bottom-40 left-20 text-7xl">🎯</div>
          <div className="absolute bottom-20 right-10 text-6xl">💪</div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* KICKSTART Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg mb-8 shadow-2xl animate-pulse">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <span className="font-bold text-sm sm:text-base md:text-lg">🚀 KICKSTART 2026 - ZAČNI ROK SPRÁVNĚ</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-8 text-white max-w-5xl mx-auto leading-tight px-2">
            🚀 Dostaň{' '}
            <span className="bg-gradient-to-r from-yellow-300 via-red-400 to-green-400 bg-clip-text text-transparent font-black">
              KONKRÉTNÍ KROKY
            </span>
            {' '}jak zachránit, stabilizovat nebo rozjet svůj byznys – ZDARMA
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light px-2">
            Každý podnikatel je v <strong className="text-yellow-300">jiné fázi</strong>. Proto dostaneš plán šitý <strong className="text-green-300">NA MÍRU</strong> podle zdraví tvého modelu podnikání + tvé <strong className="text-red-300">byznys skóre</strong>
          </p>
          
          {/* Value Props - BIG 3 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-4 border-yellow-400 transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl mb-4 text-slate-900">
                ⚡ 3 minuty
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Už ŽÁDNÉ <strong>"nevím co dělat"</strong>. Za 3 minuty budeš mít jasno
              </p>
            </div>
            
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-4 border-green-400 transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl mb-4 text-slate-900">
                🎯 Byznys skóre
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Zjistíš <strong>pravdu</strong>: Zachraňuješ, stabilizuješ nebo rosteš?
              </p>
            </div>
            
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-4 border-red-400 transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl mb-4 text-slate-900">
                🎁 Plán na 30 dní
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Konkrétní kroky <strong>pro TVOU situaci</strong> - ne obecné rady z internetu
              </p>
            </div>
          </div>
          
          {/* MEGA CTA Button */}
          <div className="mb-12">
            <Button
              onClick={() => setShowQuiz(true)}
              size="lg"
              className="bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 hover:from-yellow-500 hover:via-red-600 hover:to-green-600 text-white px-8 sm:px-12 md:px-16 py-6 sm:py-7 md:py-8 rounded-full text-xl sm:text-2xl md:text-3xl shadow-2xl hover:shadow-3xl transition-all group border-4 border-white w-full sm:w-auto"
            >
              <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mr-3 sm:mr-4 group-hover:rotate-12 transition-transform flex-shrink-0" />
              <span className="text-center">🚀 Zjistit ZDARMA své skóre</span>
              <ArrowRight className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ml-3 sm:ml-4 group-hover:translate-x-2 transition-transform flex-shrink-0" />
            </Button>
            
            <p className="mt-8 text-white/90 text-base sm:text-lg md:text-xl">
              ✅ Bez platby • ✅ Bez kreditky • ✅ Výsledky okamžitě na email
            </p>
          </div>
          
          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
            </div>
            <p className="text-white text-xl sm:text-2xl mb-2">
              <strong className="text-yellow-300">250+ podnikatelů</strong> už udělalo kvíz
            </p>
            <p className="text-white/80 text-base sm:text-lg italic px-2">
              "Konečně vím co dělat příští týden. 5 minut změnily můj pohled na byznys." – Lenka, e-shop majitelka
            </p>
          </div>
          
          {/* NOVÁ SEKCE: Proč je to ZDARMA */}
          <div className="bg-gradient-to-r from-yellow-400/20 to-green-400/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 max-w-4xl mx-auto mt-12 border-2 border-yellow-300/50">
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4">
              ❤️ Proč je to <strong className="text-yellow-300">ZDARMA</strong>?
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed px-2">
              Podnikatelům <strong>nikdo nepomáhá</strong>. Všichni jen prodávají.<br className="hidden sm:block" />
              Rozhodli jsme se to <strong className="text-green-300">změnit</strong>. Proto máš kvíz i plán zdarma – bez podmínek.
            </p>
          </div>
        </div>
      </section>
      
      {/* What You Get Section */}
      <section className="relative py-24 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-16 text-white px-2">
            Co <span className="text-yellow-300">přesně</span> dostaneš?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl text-white border-2 border-yellow-400/30">
              <div className="text-5xl sm:text-6xl mb-6">📊</div>
              <h3 className="text-2xl sm:text-3xl mb-4">Tvoje přesné skóre</h3>
              <div className="bg-slate-950/50 rounded-2xl p-4 sm:p-6 mb-4 border border-slate-700">
                <p className="text-xl sm:text-2xl text-yellow-300 mb-3">Byznys skóre: 67/100</p>
                <div className="space-y-2 text-sm sm:text-base">
                  <p>💰 Finance & Čísla: <span className="text-green-400">82%</span> ✅</p>
                  <p>🎯 Diverzifikace: <span className="text-red-400">45%</span> ⚠️</p>
                  <p>⚙️ Systematizace: <span className="text-yellow-400">71%</span> 🟡</p>
                  <p>❤️ Loajalita zákazníků: <span className="text-orange-400">60%</span> 🟠</p>
                </div>
              </div>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Zjistíš <strong>přesně</strong> kde stojíš a co tě brzdí v růstu
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl text-white">
              <div className="text-5xl sm:text-6xl mb-6">🎯</div>
              <h3 className="text-2xl sm:text-3xl mb-4">Tvůj první krok</h3>
              <div className="bg-green-950/50 rounded-2xl p-4 sm:p-6 mb-4 border border-green-700">
                <p className="text-lg sm:text-xl mb-3">
                  💡 <strong>Příští týden:</strong>
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  "Najdi 2-3 nové kanály pro zákazníky - diverzifikace je klíč k růstu. Začni s LinkedIn nebo newsletterem."
                </p>
              </div>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Konkrétní akce <strong>pro TVOU situaci</strong> - ne obecné rady
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl text-white">
              <div className="text-5xl sm:text-6xl mb-6">⚠️</div>
              <h3 className="text-2xl sm:text-3xl mb-4">Tvoje největší riziko</h3>
              <div className="bg-red-950/50 rounded-2xl p-4 sm:p-6 mb-4 border border-red-700">
                <p className="text-sm sm:text-base leading-relaxed">
                  🚨 <strong>"Chybějící diverzifikace příjmů"</strong><br/>
                  Co když přijdeš o hlavní kanál? 50% byznysů zkrachuje kvůli závislosti na jednom zdroji
                </p>
              </div>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Vidíš <strong>konkrétně</strong> co může položit tvůj byznys
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl text-white">
              <div className="text-5xl sm:text-6xl mb-6">📋</div>
              <h3 className="text-2xl sm:text-3xl mb-4">Plán na 30 dní</h3>
              <div className="bg-purple-950/50 rounded-2xl p-4 sm:p-6 mb-4 border border-purple-700">
                <div className="space-y-2 text-sm sm:text-base">
                  <p>✅ Den 8-10: Spočítej marže a bod zvratu</p>
                  <p>✅ Den 11-12: Najdi VŠECHNY kanály klientů</p>
                  <p>✅ Den 16-17: Zapiš si JEDEN proces</p>
                  <p>✅ Den 22-24: Najdi nový kanál na získávání klientů</p>
                </div>
              </div>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Konkrétní kroky s <strong>deadliny</strong> - připravený k vytištění
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 text-white px-2">
            🚀 Konec nejistoty. <span className="text-yellow-300">Začátek směru.</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed px-2">
            Za 3 minuty budeš vědět <strong className="text-green-300">co dělat</strong> v roce 2026.
          </p>
          
          <Button
            onClick={() => setShowQuiz(true)}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 hover:from-yellow-500 hover:via-red-600 hover:to-green-600 text-white px-8 sm:px-12 md:px-16 py-6 sm:py-7 md:py-8 rounded-full text-xl sm:text-2xl md:text-3xl shadow-2xl hover:shadow-3xl transition-all group border-4 border-white w-full sm:w-auto"
          >
            <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mr-3 sm:mr-4 group-hover:rotate-12 transition-transform flex-shrink-0" />
            <span className="text-center">Začít kvíz ZDARMA</span>
            <ChevronRight className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ml-3 sm:ml-4 group-hover:translate-x-2 transition-transform flex-shrink-0" />
          </Button>
          
          <p className="mt-8 text-white/70 text-lg">
            ⚡ Zabere 3 minuty • 🎯 100% zdarma • 🚀 Lifetime směr
          </p>
        </div>
      </section>

      {/* 🎯 KVÍZ MODAL */}
      <BusinessHealthQuiz
        open={showQuiz}
        onOpenChange={setShowQuiz}
        onComplete={handleQuizComplete}
      />
    </div>
  );
}