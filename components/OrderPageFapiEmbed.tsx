import { useEffect } from 'react';

export default function OrderPageFapiEmbed() {
  useEffect(() => {
    // Load FAPI script if needed
    const script = document.createElement('script');
    script.src = 'https://form.fapi.cz/js/form.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl" style={{ color: '#111827' }}>
              Objednávka kurzu
            </h1>
            <a 
              href="/" 
              className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
            >
              ← Zpět na hlavní stránku
            </a>
          </div>
        </div>
      </div>

      {/* FAPI Form Container */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Trust badges před formulářem */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              🔒
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900">Zabezpečená platba</p>
              <p className="text-xs text-gray-600">GoPay & SSL</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              ⚡
            </div>
            <div>
              <p className="text-sm font-bold text-green-900">Okamžitý přístup</p>
              <p className="text-xs text-gray-600">Email do 5 minut</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-purple-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              🛡️
            </div>
            <div>
              <p className="text-sm font-bold text-purple-900">14 dní záruka</p>
              <p className="text-xs text-gray-600">Vrácení peněz</p>
            </div>
          </div>
        </div>

        {/* FAPI Iframe Embed */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-orange-200">
          
          {/* ✅ FAPI Form ID: 47a3e4ff-233e-11eb-a0d2-0a74406df6c8 (sleva 40%) */}
          <iframe 
            src="https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8"
            width="100%" 
            height="900" 
            style={{ border: 'none', minHeight: '900px' }}
            title="Objednávkový formulář"
            loading="lazy"
          />
          
          {/* Alternativa: Přímý link pokud iframe nefunguje */}
          {/* 
          <div className="text-center">
            <a 
              href="https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Pokračovat na objednávku
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          */}
        </div>

        {/* Info pod formulářem */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            <strong>Platíš jednou 4.999,- Kč</strong>, máš lifetime přístup + všechny budoucí updaty zdarma
          </p>
          <p className="text-xs text-gray-500">
            FO: 6.049,- Kč (s DPH) • Firma: 4.999,- Kč (bez DPH)
          </p>
        </div>

        {/* Legal links */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <a href="/obchodni-podminky" className="hover:text-blue-600 transition-colors">
              Obchodní podmínky
            </a>
            <span className="text-gray-300">•</span>
            <a href="/ochrana-osobnich-udaju" className="hover:text-blue-600 transition-colors">
              Ochrana osobních údajů
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            © 2025 Podnikatelská Čtvrtka • Všechna práva vyhrazena
          </p>
        </div>
      </div>
    </div>
  );
}
