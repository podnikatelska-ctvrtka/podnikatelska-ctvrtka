import { useState, useEffect } from 'react';
import { CheckCircle, Lock, Clock, Shield, Zap, AlertCircle, ArrowLeft, Target, Users, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import FapiCheckoutForm from './FapiCheckoutForm';

interface OrderPageProps {
  expired?: boolean;
}

export default function OrderPage({ expired = false }: OrderPageProps) {
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours in seconds

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);

  // Expired offer
  if (expired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center border-2 border-red-100"
          >
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            
            <h1 className="text-3xl md:text-4xl mb-4">
              Speciální nabídka vypršela ⏰
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Bohužel, tvoje 40% sleva již není aktivní.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <p className="text-gray-700 mb-4">
                Kurz Podnikatelská Čtvrtka je stále dostupný za běžnou cenu:
              </p>
              <div className="text-3xl mb-2">
                <span className="line-through text-gray-400">4.999 Kč</span>
              </div>
              <div className="text-5xl text-orange-600 mb-2">
                8.499 Kč
              </div>
              <p className="text-sm text-gray-500">bez DPH pro firmy</p>
            </div>
            
            <p className="text-gray-600">
              Chceš počkat na další slevu? Přidej se na waitlist a dáme ti vědět!
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Valid access - show checkout
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - jako landing page! */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 py-16 md:py-20 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          {/* Back button */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zpět
            </Button>
          </motion.div>

          {/* Header - jako landing page hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm mb-6 shadow-lg border border-indigo-300/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-lg">✨</span>
              <span>Od chaosu ke struktuře za 90 minut</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              <span className="text-indigo-600">Jeden list papíru</span> změní váš byznys
            </h1>
            
            <p className="text-xl text-gray-600 mb-4 leading-relaxed max-w-2xl mx-auto">
              <strong>Za 90 minut sestavte kompletní strategii</strong> na jednu čtvrtku.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              <span className="text-indigo-600">Ideální pro e-shopy, restaurace, kadeřnice a služby.</span> Vyřešte nedostatek zákazníků a chaotické podnikání bez složitých teorií.
            </p>
          </motion.div>

          {/* Quick benefits - jako landing page */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Jasná strategie za 90 minut</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
              <Target className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-700">Přesné zacílení zákazníků</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
              <Users className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <span className="text-gray-700">Stabilní tok zákazníků</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Countdown + Price - menší emphasis */}
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-6 mb-8 shadow-xl"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-6 h-6" />
            <p className="text-lg">Speciální cena platí ještě:</p>
          </div>
          
          <div className="flex justify-center gap-4 text-center mb-3">
            <div>
              <div className="text-4xl md:text-5xl">{time.hours}</div>
              <div className="text-xs md:text-sm opacity-90 mt-1">hodin</div>
            </div>
            <div className="text-4xl md:text-5xl">:</div>
            <div>
              <div className="text-4xl md:text-5xl">{time.minutes}</div>
              <div className="text-xs md:text-sm opacity-90 mt-1">minut</div>
            </div>
            <div className="text-4xl md:text-5xl">:</div>
            <div>
              <div className="text-4xl md:text-5xl">{time.seconds}</div>
              <div className="text-xs md:text-sm opacity-90 mt-1">sekund</div>
            </div>
          </div>
          
          <p className="text-center text-sm opacity-90">
            Po vypršení se cena vrátí na standardních 8.499 Kč
          </p>
        </motion.div>

        {/* Price - simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-200 text-center"
        >
          <p className="text-gray-600 mb-3 text-sm">Vaše cena:</p>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-2xl text-gray-400 line-through">8.499 Kč</div>
            <div className="text-5xl text-orange-600">4.999 Kč</div>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm mb-2">
            <Zap className="w-4 h-4" />
            <span>Úspora 3.500 Kč (40%)</span>
          </div>
          
          <p className="text-xs text-gray-500 mt-3">
            Fyzická osoba: 6.049 Kč (s DPH) • Firma: 4.999 Kč (bez DPH)
          </p>

          {/* Trust badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <Lock className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-xs">
                <strong className="text-blue-900">Zabezpečená platba</strong><br />
                <span className="text-gray-600">GoPay & SSL</span>
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
              <p className="text-xs">
                <strong className="text-green-900">Okamžitý přístup</strong><br />
                <span className="text-gray-600">Email do 5 minut</span>
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <Shield className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-xs">
                <strong className="text-purple-900">14 dní záruka</strong><br />
                <span className="text-gray-600">Vrácení peněz</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pro koho - jako landing page problems */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-100 py-16 md:py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm mb-6 shadow-lg">
              <span>🎯</span>
              <span>Poznáváš se?</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
              <span className="text-red-600">Typické problémy</span> podnikatelů
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ať už začínáš nebo se ti nedaří, Canvas ti ukáže <strong>PROČ</strong> to tak je.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Kavárna */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-lg mb-3">Provozuješ kavárnu / restauraci</h3>
              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                <p className="text-gray-700 text-sm italic">
                  "Mám dobrý produkt, ale <strong>málo zákazníků</strong>. Nevím jestli problém je lokalita, cena nebo marketing..."
                </p>
              </div>
            </motion.div>

            {/* Fitness */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-300 hover:shadow-xl transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-lg mb-3">Online fitness / kurzy</h3>
              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                <p className="text-gray-700 text-sm italic">
                  "Vytvořil jsem kurz, ale <strong>prodalo se jen pár kusů</strong>. Konkurence má stovky klientů, já nevím co dělám špatně..."
                </p>
              </div>
            </motion.div>

            {/* E-shop */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-lg mb-3">E-shop / online prodej</h3>
              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                <p className="text-gray-700 text-sm italic">
                  "Traffic mám, ale <strong>konverze je bídná</strong>. Zákazníci přidají do košíku a pak odejdou..."
                </p>
              </div>
            </motion.div>

            {/* Kadeřnice */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">💇</div>
              <h3 className="text-lg mb-3">Kadeřnictví / kosmetika</h3>
              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                <p className="text-gray-700 text-sm italic">
                  "Mám stálé zákazníky, ale <strong>je jich málo</strong>. Nevím jak získat nové, aniž bych snižoval ceny..."
                </p>
              </div>
            </motion.div>

            {/* Autoservis */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-lg mb-3">Autoservis / řemeslo</h3>
              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                <p className="text-gray-700 text-sm italic">
                  "<strong>Makám 12 hodin denně</strong>, ale konkurence s poloviční kvalitou má víc zákazníků. Proč?"
                </p>
              </div>
            </motion.div>

            {/* Freelancer */}
            <motion.div 
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-lg mb-3">Freelancer / konzultant</h3>
              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                <p className="text-gray-700 text-sm italic">
                  "Skáču od projektu k projektu. <strong>Nevím jak se odlišit</strong> a proč by si měli vybrat mě..."
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-10 text-center">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 inline-block border-2 border-indigo-200 max-w-3xl">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-indigo-600">Canvas není jen pro velké firmy.</strong> Je pro každého, 
                kdo chce rozumět svému byznysu a <strong>přestat ztrácet čas a peníze</strong>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transformace - jako landing page solution */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-100 to-green-50 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm mb-8 shadow-lg">
            <span>✨</span>
            <span>Transformace</span>
          </div>

          <div className="bg-gradient-to-br from-white via-green-50 to-blue-50 rounded-3xl p-10 border-4 border-green-400 shadow-2xl">
            <h2 className="text-3xl md:text-4xl mb-8">
              Co kdyby za tím nebyla <span className="text-blue-600">vaše chyba</span>, ale jen <span className="text-green-600">chybějící plán</span>?
            </h2>

            {/* Before/After */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* PŘED */}
              <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                <div className="text-3xl mb-3">😟</div>
                <h3 className="text-xl mb-4 text-red-700">PŘED:</h3>
                <ul className="space-y-2 text-left text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <span>"Nevím proč málo zákazníků"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <span>"Cílím na všechny najednou"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <span>"Žádná jasná strategie"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">❌</span>
                    <span>"Každý den chaos"</span>
                  </li>
                </ul>
              </div>

              {/* PO */}
              <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-300">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl mb-4 text-green-700">PO 90 MINUTÁCH:</h3>
                <ul className="space-y-2 text-left text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✅</span>
                    <span><strong>Přesně víte KDO je váš zákazník</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✅</span>
                    <span><strong>Jasná hodnota která prodává</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✅</span>
                    <span><strong>Akční plán na 30 dní</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✅</span>
                    <span><strong>Strategie na jednom listu</strong></span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 border-2 border-green-300">
              <p className="text-lg text-gray-800 leading-relaxed">
                Zítra ráno vstanete a <strong className="text-green-700">víte PŘESNĚ co dělat</strong>. 
                Žádné "možná zkusím Instagram", žádné "co kdybych...". 
                Jasný plán. <strong className="text-green-700">Jeden list papíru. 90 minut.</strong>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Checkout Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl text-center mb-8">
            Vyplňte objednávku
          </h2>
          <FapiCheckoutForm 
            productId="podnikatelska-ctvrtka"
            price={4999}
            productName="Online kurz Podnikatelská Čtvrtka"
          />
        </motion.div>
      </div>
    </div>
  );
}
