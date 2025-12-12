import { BusinessHealthQuiz } from './BusinessHealthQuiz';
import { useState } from 'react';
import { CheckCircle, TrendingUp, Zap, Target, Shield, ArrowRight, ChevronRight, Mail, BookOpen, Gift, Sparkles, Calendar, Clock, Award, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Snowfall } from './Snowfall';

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
        
        // ✅ REDIRECT na děkovnou stránku i tak (pro lokální testování UX)
        const params = new URLSearchParams({
          email,
          score: result.score.toString(),
          category: result.category
        });
        window.location.href = `/kviz/hotovo?${params.toString()}`;
        
        // Meta Pixel tracking
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'CompleteRegistration', {
            content_name: 'Business Health Quiz',
            status: result.category
          });
        }
        
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
      
      // ✅ REDIRECT na děkovnou stránku s parametry
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
    <div className="relative min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-slate-900">
      {/* ❄️ Snowfall Effect */}
      <Snowfall />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl">🎄</div>
          <div className="absolute top-40 right-20 text-6xl">✨</div>
          <div className="absolute bottom-40 left-20 text-7xl">🎁</div>
          <div className="absolute bottom-20 right-10 text-6xl">⭐</div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Christmas Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white px-8 py-4 rounded-full text-lg mb-8 shadow-2xl animate-pulse">
            <Gift className="w-6 h-6" />
            <span className="font-bold">🎄 VÁNOČNÍ DÁREK PRO PODNIKATELE 🎁</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl mb-8 text-white max-w-5xl mx-auto leading-tight">
            🎁 Tvůj{' '}
            <span className="bg-gradient-to-r from-yellow-300 via-red-400 to-green-400 bg-clip-text text-transparent font-black">
              AKČNÍ PLÁN
            </span>
            {' '}na rok 2026 – ZDARMA
          </h1>
          
          {/* Subheadline */}
          <p className="text-2xl md:text-4xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Vyber si <strong className="text-yellow-300">8-10 otázek</strong>, dostaneš <strong className="text-green-300">personalizovaný plán na 30 dní</strong> + tvé <strong className="text-red-300">byznys skóre</strong>
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
                8-10 otázek. Žádné složité termíny. Jen <strong>výběr z možností</strong>
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
                Zjistíš přesně <strong>kde jsi TEĎ</strong> a co potřebuješ zlepšit <strong>PRVNÍ</strong>
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
                Personalizovaný plán co udělat <strong>hned</strong> – ne za měsíc, <strong>HNED</strong>
              </p>
            </div>
          </div>
          
          {/* MEGA CTA Button */}
          <div className="mb-12">
            <Button
              onClick={() => setShowQuiz(true)}
              size="lg"
              className="bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 hover:from-yellow-500 hover:via-red-600 hover:to-green-600 text-white px-16 py-8 rounded-full text-3xl shadow-2xl hover:shadow-3xl transition-all group border-4 border-white"
            >
              <Gift className="w-10 h-10 mr-4 group-hover:scale-125 transition-transform animate-bounce" />
              🎄 Zjistit ZDARMA své skóre 🎁
              <ArrowRight className="w-10 h-10 ml-4 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <p className="mt-8 text-white/90 text-xl">
              ✅ Bez platby • ✅ Bez kreditky • ✅ Výsledky okamžitě na email
            </p>
          </div>
          
          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </div>
            <p className="text-white text-2xl mb-2">
              <strong className="text-yellow-300">250+ podnikatelů</strong> už udělalo kvíz
            </p>
            <p className="text-white/80 text-lg italic">
              "Konečně vím co dělat příští týden. 5 minut změnily můj pohled na byznys." – Lenka, e-shop majitelka
            </p>
          </div>
          
          {/* NOVÁ SEKCE: Proč je to ZDARMA */}
          <div className="bg-gradient-to-r from-yellow-400/20 to-green-400/20 backdrop-blur-xl rounded-3xl p-10 max-w-4xl mx-auto mt-12 border-2 border-yellow-300/50">
            <h3 className="text-3xl md:text-4xl text-white mb-4">
              ❤️ Proč je to <strong className="text-yellow-300">ZDARMA</strong>?
            </h3>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Podnikatelům <strong>nikdo nepomáhá</strong>. Všichni jen prodávají.<br/>
              Rozhodli jsme se to <strong className="text-green-300">změnit</strong>. Proto máš kvíz i plán zdarma – bez podmínek.
            </p>
          </div>
        </div>
      </section>
      
      {/* What You Get Section */}
      <section className="relative py-24 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl text-center mb-16 text-white">
            Co dostaneš <span className="text-yellow-300">zdarma</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-10 rounded-3xl shadow-2xl text-white">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-3xl mb-4">Byznys skóre</h3>
              <p className="text-xl text-white/90 leading-relaxed">
                Tvé <strong>přesné skóre</strong> mezi 0-100% a rozbor kde máš <strong>slabá místa</strong> (Finance, Marketing, Systematizace...)
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-green-800 p-10 rounded-3xl shadow-2xl text-white">
              <div className="text-6xl mb-6">🎁</div>
              <h3 className="text-3xl mb-4">Akční plán na 30 dní</h3>
              <p className="text-xl text-white/90 leading-relaxed">
                <strong>Konkrétní kroky</strong> co udělat v lednu. S deadliny. S tipy jak na to. Připravený k <strong>vytištění</strong>.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-10 rounded-3xl shadow-2xl text-white">
              <div className="text-6xl mb-6">⚠️</div>
              <h3 className="text-3xl mb-4">Na co si dát pozor</h3>
              <p className="text-xl text-white/90 leading-relaxed">
                Konkrétní <strong>rizika</strong> které můžou položit tvůj byznys – a jak jim <strong>předejít</strong>.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-3xl shadow-2xl text-white">
              <div className="text-6xl mb-6">💡</div>
              <h3 className="text-3xl mb-4">Doporučení od expertů</h3>
              <p className="text-xl text-white/90 leading-relaxed">
                Tipy z <strong>20+ byznysů</strong> které jsme konzultovali. Bez bullshitu. Jen to <strong>co funguje</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl mb-8 text-white">
            Naděl si <span className="text-yellow-300">jasno</span> do podnikání
          </h2>
          
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Místo dalšího svetru dostaneš <strong className="text-green-300">směr</strong> na rok 2026.
          </p>
          
          <Button
            onClick={() => setShowQuiz(true)}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 hover:from-yellow-500 hover:via-red-600 hover:to-green-600 text-white px-16 py-8 rounded-full text-3xl shadow-2xl hover:shadow-3xl transition-all group border-4 border-white"
          >
            <Sparkles className="w-10 h-10 mr-4 group-hover:rotate-12 transition-transform" />
            Začít kvíz ZDARMA
            <ChevronRight className="w-10 h-10 ml-4 group-hover:translate-x-2 transition-transform" />
          </Button>
          
          <p className="mt-8 text-white/70 text-lg">
            🎄 Zabere 3 minuty • 🎁 100% zdarma • ⏱️ Lifetime směr
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