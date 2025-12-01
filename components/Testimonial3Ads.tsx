// 🎯 TESTIMONIAL ADS (3x) - Sociální důkaz
// #1: Case study - konkrétní příběh
// #2: Testimonial "Myslel jsem že..."
// #3: Testimonial "Konečně vím..."

export function Testimonial1CaseStudy() {
  return (
    <div className="h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex flex-col items-center justify-center px-16 py-8 text-center">
      {/* Avatar placeholder */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mb-6 flex items-center justify-center shadow-2xl">
        <p className="text-6xl">👨‍💼</p>
      </div>

      <div className="bg-yellow-400 text-black px-8 py-3 rounded-lg mb-6 shadow-lg">
        <p className="text-xl font-black">
          CASE STUDY
        </p>
      </div>

      <h1 className="text-5xl font-black text-white mb-4 leading-tight">
        "Za 3 měsíce<br/>
        <span className="text-green-400">+60% tržby</span>"
      </h1>

      <p className="text-2xl text-gray-300 mb-8">
        - Markéta, konzultantka
      </p>

      <div className="bg-white/95 rounded-2xl p-8 mb-6 max-w-3xl w-full shadow-2xl text-left">
        <p className="text-xl text-gray-700 mb-4 italic">
          "Před Čtvrtkou jsem nevěděla komu přesně prodávám. Měla jsem 'všichni podnikatelé' jako cílovku."
        </p>
        <p className="text-xl text-gray-700 mb-4 italic">
          "Po 90 minutách jsem měla jasno: konzultace pro online podnikatele 10-50K měsíčně."
        </p>
        <p className="text-xl text-gray-700 mb-6 italic">
          "Změnila jsem messaging, cenu i nabídku. Za 3 měsíce +60% tržby."
        </p>
        <div className="border-t-2 border-gray-200 pt-4">
          <p className="text-2xl font-black text-green-600">
            ✓ Jasný zákazník
          </p>
          <p className="text-2xl font-black text-green-600">
            ✓ Správná cena
          </p>
          <p className="text-2xl font-black text-green-600">
            ✓ Růst 60%
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-black text-white mb-2">
          PODNIKATELSKÁ ČTVRTKA
        </p>
        <p className="text-xl text-gray-300">
          Funguje • Ověřeno • Výsledky
        </p>
      </div>

      <div className="bg-white/90 text-black px-12 py-5 rounded-xl shadow-2xl">
        <p className="text-3xl font-black">Chci taky růst →</p>
      </div>
    </div>
  );
}

export function Testimonial2Thought() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-800 via-indigo-700 to-purple-800 flex flex-col items-center justify-center px-16 py-8 text-center">
      {/* Avatar placeholder */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-teal-500 mb-6 flex items-center justify-center shadow-2xl">
        <p className="text-6xl">👩‍💼</p>
      </div>

      <div className="bg-red-500 text-white px-8 py-3 rounded-lg mb-6 shadow-lg">
        <p className="text-xl font-black">
          PŘED vs PO
        </p>
      </div>

      <h1 className="text-5xl font-black text-white mb-6 leading-tight">
        "Myslel jsem že to bude<br/>
        <span className="text-red-300">další teorie...</span>"
      </h1>

      <div className="bg-white/95 rounded-2xl p-8 mb-6 max-w-3xl w-full shadow-2xl">
        <div className="space-y-6">
          <div className="text-left border-l-4 border-red-500 pl-4">
            <p className="text-lg font-bold text-red-600 mb-2">❌ PŘED:</p>
            <p className="text-xl text-gray-700 italic">
              "Další guru kurz s 50 hodinami teorie. Zase nic konkrétního."
            </p>
          </div>
          
          <div className="text-left border-l-4 border-green-500 pl-4">
            <p className="text-lg font-bold text-green-600 mb-2">✅ PO:</p>
            <p className="text-xl text-gray-700 italic">
              "90 minut a mám HOTOVÝ plán. Žádná teorie, jen konkrétní kroky. Konečně vím co dělat."
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl px-12 py-6 mb-6 shadow-2xl">
        <p className="text-3xl font-black mb-2">
          ŽÁDNÁ TEORIE
        </p>
        <p className="text-xl font-bold">
          Jen tvůj byznys • Tvoje odpovědi • Tvůj plán
        </p>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-black text-white mb-2">
          PODNIKATELSKÁ ČTVRTKA
        </p>
        <p className="text-xl text-gray-300">
          Praktický • Akční • Bez keců
        </p>
      </div>

      <div className="bg-white/90 text-black px-12 py-5 rounded-xl shadow-2xl">
        <p className="text-3xl font-black">Chci zkusit →</p>
      </div>
    </div>
  );
}

export function Testimonial3Finally() {
  return (
    <div className="h-full bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 flex flex-col items-center justify-center px-16 py-8 text-center">
      {/* Avatar placeholder */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mb-6 flex items-center justify-center shadow-2xl">
        <p className="text-6xl">🧑‍💼</p>
      </div>

      <div className="bg-white text-black px-8 py-3 rounded-lg mb-6 shadow-lg">
        <p className="text-xl font-black">
          TESTIMONIAL
        </p>
      </div>

      <h1 className="text-5xl font-black text-white mb-4 leading-tight">
        "Konečně vím<br/>
        <span className="text-yellow-300">CO DĚLAT"</span>
      </h1>

      <p className="text-2xl text-gray-200 mb-8">
        - Petr, e-commerce
      </p>

      <div className="bg-white/95 rounded-2xl p-8 mb-6 max-w-3xl w-full shadow-2xl text-left">
        <p className="text-xl text-gray-700 mb-4 italic">
          "Dva roky jsem zkoušel všechno. Facebook reklamy, SEO, influencery..."
        </p>
        <p className="text-xl text-gray-700 mb-4 italic">
          "Nic nefungovalo, protože jsem nevěděl KOMU přesně prodávám."
        </p>
        <p className="text-2xl font-black text-green-600 mb-4">
          Po Čtvrtce jsem konečně věděl.
        </p>
        <p className="text-xl text-gray-700 italic">
          "Změnil jsem cílovku, upravil nabídku. První měsíc +40% konverze."
        </p>
      </div>

      <div className="bg-yellow-400 text-black rounded-2xl px-12 py-6 mb-6 shadow-2xl">
        <p className="text-3xl font-black mb-2">
          JASNO = RŮST
        </p>
        <p className="text-xl font-bold">
          Když víš komu • Růst přijde sám
        </p>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-black text-white mb-2">
          Kdy začneš ty?
        </p>
        <p className="text-xl text-gray-200">
          PODNIKATELSKÁ ČTVRTKA
        </p>
      </div>

      <div className="bg-white/90 text-black px-12 py-5 rounded-xl shadow-2xl">
        <p className="text-3xl font-black">Začnu teď →</p>
      </div>
    </div>
  );
}

export const testimonial3AdsMetadata = [
  {
    id: 'testimonial-1-case',
    name: 'TESTIMONIAL #1: Case Study',
    subtitle: 'Markéta +60% za 3 měsíce',
    budget: '20 Kč/den',
    trigger: 'Social proof • Real results • Concrete numbers'
  },
  {
    id: 'testimonial-2-thought',
    name: 'TESTIMONIAL #2: Thought',
    subtitle: 'Myslel jsem že...',
    budget: '20 Kč/den',
    trigger: 'Objection handling • Before/After • No theory'
  },
  {
    id: 'testimonial-3-finally',
    name: 'TESTIMONIAL #3: Finally',
    subtitle: 'Konečně vím co dělat',
    budget: '20 Kč/den',
    trigger: 'Clarity • Direction • Relief'
  }
];
