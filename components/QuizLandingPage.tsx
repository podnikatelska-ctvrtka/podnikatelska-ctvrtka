import { BusinessHealthQuiz } from './BusinessHealthQuiz';
import { useState, useEffect } from 'react';
import { CheckCircle, TrendingUp, Zap, Target, Shield, ArrowRight, ChevronRight, Mail, BookOpen, Gift, Sparkles, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Snowfall } from './Snowfall';
import { QuizResultsPage } from './QuizResultsPage'; // ✅ IMPORT results page

export function QuizLandingPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false); // ✅ NOVÝ state
  const [quizData, setQuizData] = useState<any>(null); // ✅ Store quiz data

  const handleQuizComplete = async (result: any, email: string, answers: Record<string, number>) => {
    try {
      console.log('🔍 DEBUG: handleQuizComplete called', { result, email });
      
      // ✅ THEN call API FIRST (before showing results!)
      console.log('📤 Calling quiz-submit API...');
      console.log('📤 URL:', '/.netlify/functions/quiz-submit');
      console.log('📤 Payload:', JSON.stringify({
        email,
        name: email.split('@')[0],
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
          name: email.split('@')[0], // Use email prefix as name
          quizType: result.category === 'beginner' ? 'beginner' : 'existing',
          answers,
          result: {
            score: result.score,
            category: result.category,
            categoryLabel: result.categoryLabel,
            categoryDescription: result.categoryDescription || '',
            risks: result.risks || [],
            recommendations: result.recommendations || []
          }
        })
      });
      
      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', response.headers);
      
      // ⚠️ WAIT 2 seconds so you can see console logs!
      console.log('⏳ Waiting 2 seconds so you can see logs...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // ⚠️ LOKÁLNÍ DEV FALLBACK - pokud Netlify functions nefungují (404)
      if (response.status === 404) {
        console.warn('⚠️ Netlify functions not available (running locally without netlify dev?)');
        console.warn('💡 TIP: Use "npm run dev:netlify" to test with functions locally');
        
        // Ukáž výsledky i tak (pro lokální testování UX)
        setShowQuiz(false);
        setQuizData({
          email,
          score: result.score,
          category: result.category,
          subScores: result.subScores || []
        });
        setShowResults(true);
        
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
      
      // ✅ NOW show results (only after successful save)
      setShowQuiz(false);
      setQuizData({
        email,
        score: result.score,
        category: result.category,
        subScores: result.subScores || []
      });
      setShowResults(true);
      
      // 📊 Track completion in Meta Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'CompleteRegistration', {
          content_name: 'Business Health Quiz',
          status: result.category
        });
      }
      
    } catch (error) {
      console.error('❌ Quiz submission error:', error);
      // ⚠️ THROW ERROR BACK to BusinessHealthQuiz so it can show toast!
      throw error;
    }
  };

  // ✅ CHECK RESULTS FIRST (before rendering landing)
  if (showResults && quizData) {
    return (
      <QuizResultsPage 
        email={quizData.email}
        score={quizData.score}
        category={quizData.category}
        subScores={quizData.subScores}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-red-800 relative">
      {/* ❄️ SNĚŽENÍ - Vánoční atmosféra */}
      <Snowfall />
      
      {/* 🎄 HERO SECTION - Vánoční nadílka */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Christmas background decorations - SILNĚJŠÍ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-green-500/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/30 rounded-full blur-3xl"></div>
          {/* Vánoční hvězdy */}
          <div className="absolute top-10 left-20 text-6xl animate-pulse">⭐</div>
          <div className="absolute top-32 right-32 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute top-64 left-64 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
          <div className="absolute bottom-32 right-64 text-6xl animate-pulse" style={{ animationDelay: '1.5s' }}>✨</div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Vánoční badge - SILNĚJŠÍ */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl animate-bounce">🎄</span>
            <div className="bg-gradient-to-r from-red-600 to-green-600 px-6 py-3 rounded-full border-4 border-yellow-400 shadow-2xl">
              <span className="text-lg text-white uppercase tracking-wider font-black">🎁 Vánoční nadílka pro podnikatele 🎁</span>
            </div>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎁</span>
          </div>

          {/* Main headline - HIERARCHIE */}
          <div className="text-center mb-6 space-y-2">
            <p className="text-2xl md:text-3xl text-white/80 drop-shadow-lg">
              🎅 Nejlepší dárek pod stromeček?
            </p>
            <h1 className="text-6xl md:text-8xl font-black text-yellow-300 leading-tight drop-shadow-2xl">
              Mít jasný plán<br/>
              místo improvizace.
            </h1>
          </div>

          {/* Emotional subheadline */}
          <p className="text-2xl md:text-3xl text-center text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Zjisti <strong className="text-yellow-300">ZDARMA</strong> za 3 minuty, kde tvůj byznys tratí nejvíc peněz a co změnit <strong className="text-yellow-300">JAKO PRVNÍ</strong>, abys konečně rostl.
          </p>

          {/* CTA Button - Primary */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <Button
              onClick={() => setShowQuiz(true)}
              size="lg"
              className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 hover:from-red-700 hover:via-green-700 hover:to-red-700 text-white text-2xl px-16 py-9 rounded-2xl shadow-2xl shadow-red-600/50 hover:shadow-red-600/70 transition-all hover:scale-105 group animate-pulse border-4 border-yellow-400"
            >
              <span className="text-3xl mr-3">🎁</span>
              <span className="font-black">Chci svůj dárek ZDARMA</span>
              <ArrowRight className="w-7 h-7 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-base text-white bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full border-2 border-yellow-400">
              ⏱️ 3 minuty • 🎄 100% zdarma • ❄️ Žádná karta
            </p>
          </div>

          {/* Visual proof - Co dostaneš - VÁNOČNÍ BARVY */}
          <div className="bg-gradient-to-br from-red-600 to-green-600 rounded-3xl p-10 shadow-2xl border-4 border-yellow-400">
            <h3 className="text-3xl text-center mb-8 text-white font-black">
              🎁 Co najdeš pod stromečkem:
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl mb-3 text-slate-900 font-black">Skóre zdraví v %</h4>
                <p className="text-slate-700">Přesné hodnocení tvého byznysu</p>
              </div>
              <div className="text-center bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl mb-3 text-slate-900 font-black">Personalizovaný akční plán</h4>
                <p className="text-slate-700">Konkrétní kroky, které můžeš začít dělat hned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💡 EMOTIONAL BENEFITS - Gains - VÁNOČNÍ SVĚTLÁ SEKCE */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-50 via-green-50 to-red-50 relative overflow-hidden">
        {/* Jemné vánoční dekorace */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 text-6xl">🎄</div>
          <div className="absolute top-32 right-32 text-5xl">⭐</div>
          <div className="absolute bottom-20 left-32 text-4xl">🎁</div>
          <div className="absolute bottom-32 right-20 text-5xl">✨</div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl text-center mb-12 text-slate-900">
            Proč to udělat <span className="text-red-600">právě před Vánoci?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-red-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">😰</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">Přestaň pálit 30-50k ročně</h3>
                  <p className="text-slate-600">
                    Průměrný podnikatel promaká <strong className="text-red-600">30-50 tisíc ročně</strong> na marketing, který nefunguje. Kvíz ti ukáže PROČ a CO S TÍM.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">Konečně víš, CO dělat PRVNÍ</h3>
                  <p className="text-slate-600">
                    Ne, dalších 10 nápadů. <strong className="text-green-600">Jeden jasný krok.</strong> Jeden měřitelný výsledek. Jasná priorita, co udělat TEĎKA.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-blue-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">3 minuty = úspora měsíců bloudění</h3>
                  <p className="text-slate-600">
                    Místo 6 měsíců zkoušení a hádání zjistíš <strong className="text-blue-600">přesnou diagnózu za 3 minuty.</strong> To je 99,9 % úspora času.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-purple-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💪</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">Začni 2026 s diagnózou, ne hádáním</h3>
                  <p className="text-slate-600">
                    Žádné „snad to půjde". <strong className="text-purple-600">Víš přesně, co je tvůj největší problém</strong> a máš checklist, jak ho vyřešit do měsíce.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-yellow-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">Zjistíš, jaké máš největší díry</h3>
                  <p className="text-slate-600">
                    Personalizovaná analýza <strong className="text-yellow-600">najde slabiny v tvém byznysu</strong> a ukáže konkrétní kroky, jak je zalátat TEĎKA.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-indigo-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">30denní checklist, co dělat PRVNÍ</h3>
                  <p className="text-slate-600">
                    Zatímco ostatní bloudí, ty budeš mít <strong className="text-indigo-600">seznam úkolů na 4 týdny</strong> s přesnými termíny a prioritami.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second CTA */}
          <div className="flex justify-center mt-12">
            <Button
              onClick={() => setShowQuiz(true)}
              size="lg"
              className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 hover:from-red-700 hover:via-green-700 hover:to-red-700 text-white text-xl px-12 py-7 rounded-2xl shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transition-all hover:scale-105 group"
            >
              <span>🎁 Začít kvíz zdarma</span>
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA - Christmas Emotional */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-red-100 via-white to-green-100 overflow-hidden">
        {/* Christmas decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-10 left-10 text-6xl">🎄</div>
          <div className="absolute top-20 right-20 text-4xl">⭐</div>
          <div className="absolute bottom-10 left-20 text-5xl">🎁</div>
          <div className="absolute bottom-20 right-10 text-6xl">❄️</div>
        </div>
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl mb-6 text-slate-900 leading-tight">
            🎄 Připravený na <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-green-600 to-red-600">nejlepší rok?</span>
          </h2>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            Za 3 minuty budeš vědět přesně, co dělat jako PRVNÍ, aby 2026 byl <strong>tvůj rok.</strong>
          </p>
          <Button
            onClick={() => setShowQuiz(true)}
            size="lg"
            className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 hover:from-red-700 hover:via-green-700 hover:to-red-700 text-white text-xl px-14 py-8 rounded-2xl shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transition-all hover:scale-105 group"
          >
            <span className="text-2xl mr-2">🎁</span>
            <span>Chci dárek zdarma</span>
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-6 text-slate-600">
            🎄 Žádná platba • ⏱️ 3 minuty • 📧 Výsledky okamžitě
          </p>
        </div>
      </section>

      {/* 🎯 KVÍZ MODAL - SOLID OVERLAY */}
      <BusinessHealthQuiz
        open={showQuiz}
        onOpenChange={setShowQuiz}
        onComplete={handleQuizComplete}
      />
    </div>
  );
}