import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { CheckCircle, Circle, Loader2, CreditCard, Key, Database, Mail, GraduationCap } from 'lucide-react';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface StepProps {
  num: number;
  children: React.ReactNode;
  active: boolean;
  done: boolean;
  icon: React.ReactNode;
}

function Step({ num, children, active, done, icon }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: num * 0.1 }}
      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
        done ? 'bg-green-50 border-2 border-green-200' : 
        active ? 'bg-blue-50 border-2 border-blue-200 shadow-lg' : 
        'bg-gray-50 border-2 border-gray-200'
      }`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
        done ? 'bg-green-500 text-white' : 
        active ? 'bg-blue-500 text-white animate-pulse' : 
        'bg-gray-300 text-gray-600'
      }`}>
        {done ? <CheckCircle className="w-6 h-6" /> : active ? <Loader2 className="w-6 h-6 animate-spin" /> : icon}
      </div>
      <div className="flex-1">
        <div className={`font-bold ${
          done ? 'text-green-900' : active ? 'text-blue-900' : 'text-gray-600'
        }`}>
          {children}
        </div>
      </div>
      <div className={`text-sm font-mono px-3 py-1 rounded-full ${
        done ? 'bg-green-200 text-green-900' : 
        active ? 'bg-blue-200 text-blue-900' : 
        'bg-gray-200 text-gray-600'
      }`}>
        {done ? 'Hotovo ✓' : active ? 'Probíhá...' : 'Čeká'}
      </div>
    </motion.div>
  );
}

export function TestFlowSimulator() {
  const [step, setStep] = useState(0);
  const [generatedToken, setGeneratedToken] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const simulateFlow = async () => {
    setIsRunning(true);
    setStep(0);
    setGeneratedToken('');
    setGeneratedEmail('');
    
    try {
      // Step 1: Platba
      setStep(1);
      toast.success('💳 Platba přijata (GoPay sandbox)', {
        description: 'Číslo objednávky: #TEST-12345'
      });
      await sleep(2000);
      
      // Step 2: Generování tokenu
      setStep(2);
      const token = crypto.randomUUID();
      setGeneratedToken(token);
      const email = 'test@example.com';
      setGeneratedEmail(email);
      toast.success('🔑 Token vygenerován', {
        description: `${token.slice(0, 16)}...`
      });
      await sleep(2000);
      
      // Step 3: Uložení do Supabase
      setStep(3);
      toast.success('💾 Uživatel uložen do databáze', {
        description: `Email: ${email}`
      });
      await sleep(2000);
      
      // Step 4: Email
      setStep(4);
      toast.success('📧 Email odeslán', {
        description: 'Předmět: ✅ Váš přístup do kurzu je ready!'
      });
      await sleep(2000);
      
      // Step 5: Redirect preview
      setStep(5);
      toast.success('🎓 Kurz je připravený!', {
        description: 'Klikněte na odkaz v emailu pro přístup',
        duration: 5000
      });
      
    } catch (error) {
      toast.error('Chyba při simulaci', {
        description: 'Zkuste to znovu'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const openCourseWithToken = () => {
    if (generatedToken) {
      window.location.href = `#course?token=${generatedToken}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🧪 TEST MODE
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test Flow Simulator
          </h1>
          <p className="text-xl text-gray-600">
            Simulace celého platebního a přístupového procesu
          </p>
        </motion.div>

        {/* Main Card */}
        <Card className="p-8 mb-8">
          <div className="space-y-4 mb-8">
            <Step 
              num={1} 
              active={step === 1} 
              done={step > 1}
              icon={<CreditCard className="w-6 h-6" />}
            >
              <div>GoPay platba</div>
              <div className="text-sm text-gray-600 mt-1">
                Uživatel zaplatí 4.999 Kč přes platební bránu
              </div>
            </Step>

            <Step 
              num={2} 
              active={step === 2} 
              done={step > 2}
              icon={<Key className="w-6 h-6" />}
            >
              <div>Generování přístupového tokenu</div>
              <div className="text-sm text-gray-600 mt-1">
                FAPI webhook → Make.com → UUID token
              </div>
            </Step>

            <Step 
              num={3} 
              active={step === 3} 
              done={step > 3}
              icon={<Database className="w-6 h-6" />}
            >
              <div>Uložení do databáze</div>
              <div className="text-sm text-gray-600 mt-1">
                Supabase: user + token + order info
              </div>
            </Step>

            <Step 
              num={4} 
              active={step === 4} 
              done={step > 4}
              icon={<Mail className="w-6 h-6" />}
            >
              <div>Odeslání emailu s přístupem</div>
              <div className="text-sm text-gray-600 mt-1">
                Resend: kurz@podnikatelskactvrtka.cz → uživatel
              </div>
            </Step>

            <Step 
              num={5} 
              active={step === 5} 
              done={step > 5}
              icon={<GraduationCap className="w-6 h-6" />}
            >
              <div>Přístup do LMS kurzu</div>
              <div className="text-sm text-gray-600 mt-1">
                CourseDemo.tsx ověří token → přihlášení ✅
              </div>
            </Step>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            {step === 0 && (
              <Button 
                onClick={simulateFlow} 
                size="lg"
                disabled={isRunning}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Probíhá test...
                  </>
                ) : (
                  <>
                    🚀 Spustit test flow
                  </>
                )}
              </Button>
            )}

            {step === 5 && generatedToken && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full space-y-4"
              >
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="text-green-600 text-lg font-bold mb-2">
                      ✅ Test úspěšně dokončen!
                    </div>
                    <p className="text-green-800 text-sm">
                      Všech 5 kroků proběhlo bez problémů
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-sm font-bold text-gray-700 mb-2">
                      Vygenerovaný přístupový token:
                    </div>
                    <div className="font-mono text-xs bg-gray-100 p-3 rounded break-all">
                      {generatedToken}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-sm font-bold text-gray-700 mb-2">
                      Simulovaný email:
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Od:</strong> kurz@podnikatelskactvrtka.cz<br/>
                      <strong>Komu:</strong> {generatedEmail}<br/>
                      <strong>Předmět:</strong> ✅ Váš přístup do kurzu je ready!<br/>
                      <strong>Odkaz:</strong> podnikatelskactvrtka.cz/course?token={generatedToken.slice(0, 8)}...
                    </div>
                  </div>

                  <Button 
                    onClick={openCourseWithToken}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    size="lg"
                  >
                    🎓 Otevřít kurz s tokenem
                  </Button>
                </div>

                <Button 
                  onClick={() => {
                    setStep(0);
                    setGeneratedToken('');
                    setGeneratedEmail('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  🔄 Spustit znovu
                </Button>
              </motion.div>
            )}
          </div>
        </Card>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">
            ℹ️ Co tento test simuluje?
          </h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>1. Platební proces:</strong> FAPI objednávka + GoPay platba
            </p>
            <p>
              <strong>2. Webhook flow:</strong> FAPI → Make.com → Supabase + Email
            </p>
            <p>
              <strong>3. Token systém:</strong> Každý uživatel dostane unique UUID token
            </p>
            <p>
              <strong>4. Email delivery:</strong> Automatický email s přístupem do kurzu
            </p>
            <p>
              <strong>5. LMS přístup:</strong> Token authentication v CourseDemo.tsx
            </p>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          <Button 
            variant="ghost"
            onClick={() => window.location.hash = ''}
          >
            ← Zpět na landing page
          </Button>
        </div>
      </div>
    </div>
  );
}
