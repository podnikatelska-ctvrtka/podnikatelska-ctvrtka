import { BusinessHealthQuiz } from './BusinessHealthQuiz';
import { useState } from 'react';
import { CheckCircle, TrendingUp, Zap, Target, Shield, ArrowRight, ChevronRight, Mail, BookOpen, Gift, Sparkles, Calendar } from 'lucide-react';
import { Button } from './ui/button';

export function QuizLandingPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizComplete = async (result: any, email: string, answers: Record<string, number>) => {
    try {
      // ✅ Submit to Netlify Functions → Smartemailing + Resend
      const response = await fetch('/.netlify/functions/quiz-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: '',
          quizType: result.category === 'beginner' ? 'beginner' : 'existing',
          answers,
          result,
          score: result.score,
          category: result.category
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }
      
      // ✅ NEJDŘÍV zobrazit completion modal
      setQuizCompleted(true);
      
      // ✅ PAK zavřít kvíz modal (po malém delay aby user viděl transition)
      setTimeout(() => {
        setShowQuiz(false);
      }, 200);
      
      console.log('✅ Quiz submitted successfully - Email sequence triggered!');
      
      // 📊 Track completion in Meta Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'CompleteRegistration', {
          content_name: 'Business Health Quiz',
          status: result.category
        });
      }
    } catch (error) {
      console.error('❌ Quiz submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      {/* 🎄 HERO SECTION - Vánoční emoce */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Warm background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Vánoční badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Gift className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-orange-800 uppercase tracking-wider">Dárek pro podnikatele zdarma</span>
            <Sparkles className="w-5 h-5 text-orange-600" />
          </div>

          {/* Main headline - Emotional */}
          <h1 className="text-4xl md:text-6xl text-center mb-6 text-slate-900 leading-tight">
            Přestaň ztrácet peníze.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">
              Začni rok 2026 s jasným plánem.
            </span>
          </h1>

          {/* Emotional subheadline */}
          <p className="text-xl md:text-2xl text-center text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Zjisti <strong>ZDARMA</strong> za 3 minuty, kde tvůj byznys tratí nejvíc peněz a co změnit JAKO PRVNÍ, abys konečně rostl.
          </p>

          {/* CTA Button - Primary */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <Button
              onClick={() => setShowQuiz(true)}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white text-xl px-12 py-7 rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105 group"
            >
              <Gift className="w-6 h-6 mr-2" />
              <span>Chci svůj akční plán zdarma</span>
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-slate-600">⏱️ 3 minuty • 🎁 100% zdarma • ❌ Žádná karta</p>
          </div>

          {/* Visual proof - Co dostaneš */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200/50">
            <h3 className="text-2xl text-center mb-6 text-slate-900">
              🎁 Co dostaneš hned po vyplnění:
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg mb-2 text-slate-900">Skóre zdraví v %</h4>
                <p className="text-slate-600 text-sm">Přesné hodnocení tvého byznysu</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg mb-2 text-slate-900">Personalizovaný akční plán</h4>
                <p className="text-slate-600 text-sm">Konkrétní kroky co dělat TEĎKA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💡 EMOTIONAL BENEFITS - Gains */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12 text-slate-900">
            Proč to udělat <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">právě teď?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">😰</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">Přestaň pálit peníze</h3>
                  <p className="text-slate-600">
                    Každý měsíc bez jasného modelu podnikání = <strong className="text-red-600">tisíce ztracených korun</strong> na marketing, který nefunguje.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">Konečně si udělej jasno</h3>
                  <p className="text-slate-600">
                    Zjistíš <strong className="text-green-600">přesně kde jsi</strong> a co dělat jako první. Žádné hádání.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">Začni rok 2026 připravený</h3>
                  <p className="text-slate-600">
                    Dostaneš <strong className="text-blue-600">funkční plán HNED</strong> a můžeš začít už dnes místo chaotického zkoušení.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200/50 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-slate-900">3 minuty = celý rok jistoty</h3>
                  <p className="text-slate-600">
                    Investice 3 minut teď = <strong className="text-purple-600">úspora měsíců bloudění</strong> a tisíců korun.
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
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white text-xl px-12 py-7 rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105 group"
            >
              <span>Začít kvíz zdarma</span>
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA - Emotional */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl mb-6 text-slate-900 leading-tight">
            Připravený na <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">nejlepší rok?</span>
          </h2>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            Za 3 minuty budeš vědět přesně, co dělat jako PRVNÍ, aby 2026 byl <strong>tvůj rok.</strong>
          </p>
          <Button
            onClick={() => setShowQuiz(true)}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white text-xl px-14 py-8 rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105 group"
          >
            <Gift className="w-6 h-6 mr-2" />
            <span>Začít kvíz zdarma</span>
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-6 text-slate-600">
            🎁 Žádná platba • ⏱️ 3 minuty • 📧 Výsledky okamžitě
          </p>
        </div>
      </section>

      {/* 🎯 KVÍZ MODAL - SOLID OVERLAY */}
      <BusinessHealthQuiz
        open={showQuiz}
        onOpenChange={setShowQuiz}
        onComplete={handleQuizComplete}
      />

      {/* ✅ COMPLETION MODAL - Po dokončení kvízu */}
      {quizCompleted && (
        <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 max-w-lg w-full border border-white/10 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl mb-3 text-white">
                Výsledky jsou na cestě! 📧
              </h2>
              <p className="text-lg text-slate-300">
                Zkontroluj si svůj email. Právě jsme ti poslali:
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Tvé skóre zdraví v %</p>
                  <p className="text-sm text-slate-400">Přesné hodnocení tvého modelu</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Personalizovaný akční plán</p>
                  <p className="text-sm text-slate-400">Co změnit jako první</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setQuizCompleted(false)}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full"
              >
                Zavřít
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}