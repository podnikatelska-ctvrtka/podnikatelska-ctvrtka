import { BusinessHealthQuiz } from './BusinessHealthQuiz';
import { useState } from 'react';
import { CheckCircle, TrendingUp, Zap, Target, Shield, ArrowRight, ChevronRight, Mail, BookOpen, Gift, Sparkles, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Snowfall } from './Snowfall';

export function QuizLandingPage() {
  const [showQuiz, setShowQuiz] = useState(false);

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
            recommendations: result.recommendations || [],
            subScores: result.subScores || []
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* ❄️ Snowfall Effect */}
      <Snowfall />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Christmas Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-green-600 text-white px-4 py-2 rounded-full text-sm mb-6 shadow-lg">
            <Gift className="w-4 h-4" />
            <span>🎄 Vánoční dárek pro tvůj byznys</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl mb-6 text-slate-900 max-w-4xl mx-auto">
            Jak zdravý je tvůj <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">model podnikání</span>?
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Zjisti své <strong>skóre za 3 minuty</strong> a dostaneš personalizovaný akční plán – ještě než začneš nový rok
          </p>
          
          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/50">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg mb-2 text-slate-900">
                ⚡ 3 minuty
              </h3>
              <p className="text-sm text-slate-600">
                12 otázek. Bez složitých termínů. Jednoduché ANO/NE odpovědi
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/50">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg mb-2 text-slate-900">
                🎯 Tvé skóre
              </h3>
              <p className="text-sm text-slate-600">
                Zjistíš přesně, kde jsi teď a co potřebuješ zlepšit PRVNÍ
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/50">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg mb-2 text-slate-900">
                🎁 Akční plán
              </h3>
              <p className="text-sm text-slate-600">
                Personalizovaný plán co udělat hned – ne za měsíc, hned
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button
            onClick={() => setShowQuiz(true)}
            size="lg"
            className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white px-12 py-6 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all group"
          >
            <Gift className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            Zjistit zdarma své skóre
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
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
