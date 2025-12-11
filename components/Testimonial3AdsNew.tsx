// TESTIMONIAL ADS - Martin Barber Shop (model) + Lenka Salon (screenshot)

// TESTIMONIAL #1: Martin - Čtvrtka A1 na zdi s BMC
export function Testimonial3MessageStyle() {
  // NOVÝ VIZUÁL: Čtvrtka A1 na zdi s barevnými štítky
  // Martin Barber Shop - fyzický model na zdi
  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-8 relative overflow-hidden">
      
      {/* Wall texture background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 50px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Main Canvas - A1 Format on wall */}
      <div className="relative max-w-5xl w-full">
        
        {/* Paper shadow - jako by visel na zdi */}
        <div className="absolute inset-0 bg-gray-900/10 blur-xl translate-y-4 translate-x-2"></div>
        
        {/* A1 Canvas Paper - BÍLÝ! */}
        <div className="relative bg-white rounded-sm shadow-2xl p-10 border-2 border-gray-200">
          
          {/* Header - Model Podnikání */}
          <div className="mb-6 pb-4 border-b-2 border-gray-300">
            <h1 className="text-3xl tracking-tight text-gray-900">
              📋 MODEL PODNIKÁNÍ
            </h1>
            <p className="text-sm text-gray-500 mt-1">Barber Shop • Martin K. • 2025</p>
          </div>

          {/* Business Model Canvas - 9 bloků - VŠE BÍLÉ, JEN ŠTÍTKY BAREVNÉ! */}
          <div className="grid grid-cols-5 gap-3">
            
            {/* Levá strana - 2 sloupce */}
            <div className="col-span-2 space-y-3">
              
              {/* Klíčoví partneři - BÍLÝ BOX, GLOBÁLNÍ ŠEDÉ ŠTÍTKY */}
              <div className="bg-white rounded border-2 border-gray-300 p-4 min-h-[140px]">
                <p className="text-xs uppercase tracking-wide text-gray-700 mb-2 font-bold">🤝 Klíčoví partneři</p>
                {/* GLOBÁLNÍ = šedé čtvercové Post-it štítky - VEDLE SEBE */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="w-16 h-16 bg-gray-200 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-4deg]" style={{
                    boxShadow: '3px 3px 6px rgba(0,0,0,0.2)'
                  }}>
                    <p className="text-[10px] leading-tight">Dodavatel produktů</p>
                  </div>
                  <div className="w-16 h-16 bg-gray-200 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[3deg]" style={{
                    boxShadow: '3px 3px 6px rgba(0,0,0,0.2)'
                  }}>
                    <p className="text-[10px] leading-tight">IG influencer</p>
                  </div>
                </div>
              </div>

              {/* Klíčové aktivity - BÍLÝ BOX */}
              <div className="bg-white rounded border-2 border-gray-300 p-4 min-h-[140px]">
                <p className="text-xs uppercase tracking-wide text-gray-700 mb-2 font-bold">⚙️ Klíčové aktivity</p>
                {/* VEDLE SEBE - modrý + modrý, pak zelený */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[2deg]" style={{
                    boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">📱 IG denně</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-2deg]" style={{
                    boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">💬 Konzultace</p>
                  </div>
                  <div className="w-16 h-16 bg-green-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[1deg]" style={{
                    boxShadow: '3px 3px 6px rgba(34,197,94,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">🎓 Online kurzy</p>
                  </div>
                </div>
              </div>

              {/* Klíčové zdroje - BÍLÝ BOX */}
              <div className="bg-white rounded border-2 border-gray-300 p-4 min-h-[100px]">
                <p className="text-xs uppercase tracking-wide text-gray-700 mb-2 font-bold">🔑 Klíčové zdroje</p>
                {/* GLOBÁLNÍ = šedé štítky */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="w-16 h-16 bg-gray-200 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-2deg]" style={{
                    boxShadow: '3px 3px 6px rgba(0,0,0,0.2)'
                  }}>
                    <p className="text-[10px] leading-tight">Studio centrum</p>
                  </div>
                  <div className="w-16 h-16 bg-gray-200 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[2deg]" style={{
                    boxShadow: '3px 3px 6px rgba(0,0,0,0.2)'
                  }}>
                    <p className="text-[10px] leading-tight">🎥 Kamera</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Střed - 1 sloupec */}
            <div className="col-span-1 space-y-3">
              
              {/* Hodnotová nabídka - ČTVERCOVÉ ŠTÍTKY! VYSOKÝ BOX! */}
              <div className="bg-white rounded border-4 border-orange-400 p-4 min-h-[430px]">
                <p className="text-xs uppercase tracking-wide text-orange-700 mb-2 font-bold">💎 Hodnotová nabídka</p>
                
                {/* ČTVERCOVÉ ŠTÍTKY - 2x2 grid - NAHOŘE jako ostatní! */}
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {/* MODRÝ segment - služby */}
                  <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-3deg]" style={{
                    boxShadow: '3px 3px 8px rgba(59,130,246,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">👔 Premium grooming</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[2deg]" style={{
                    boxShadow: '3px 3px 8px rgba(59,130,246,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">📅 Online rezervace</p>
                  </div>
                  
                  {/* ZELENÝ SEGMENT - kurzy */}
                  <div className="w-16 h-16 bg-green-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-2deg]" style={{
                    boxShadow: '3px 3px 8px rgba(34,197,94,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">🎓 Online kurzy</p>
                  </div>
                  <div className="w-16 h-16 bg-green-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[2deg]" style={{
                    boxShadow: '4px 4px 10px rgba(34,197,94,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">💬 1:1 Mentoring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pravá strana - 2 sloupce */}
            <div className="col-span-2 space-y-3">
              
              {/* Vztahy se zákazníky - BÍLÝ BOX */}
              <div className="bg-white rounded border-2 border-gray-300 p-4 min-h-[140px]">
                <p className="text-xs uppercase tracking-wide text-gray-700 mb-2 font-bold">💞 Vztahy se zákazníky</p>
                {/* VEDLE SEBE - modrý + modrý, pak zelený */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[2deg]" style={{
                    boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">📲 WhatsApp přístup</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-3deg]" style={{
                    boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">👑 VIP club</p>
                  </div>
                  <div className="w-16 h-16 bg-green-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[1deg]" style={{
                    boxShadow: '3px 3px 6px rgba(34,197,94,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">🎓 Komunita</p>
                  </div>
                </div>
              </div>

              {/* Kanály - BÍLÝ BOX */}
              <div className="bg-white rounded border-2 border-gray-300 p-4 min-h-[140px]">
                <p className="text-xs uppercase tracking-wide text-gray-700 mb-2 font-bold">📢 Kanály</p>
                {/* VEDLE SEBE */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-2deg]" style={{
                    boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">📱 IG ads</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[3deg]" style={{
                    boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">💬 Doporučení</p>
                  </div>
                  <div className="w-16 h-16 bg-green-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-1deg]" style={{
                    boxShadow: '3px 3px 6px rgba(34,197,94,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">📣 FB kurzy</p>
                  </div>
                </div>
              </div>

              {/* Zákaznické segmenty - BÍLÝ BOX */}
              <div className="bg-white rounded border-2 border-gray-300 p-4 min-h-[100px]">
                <p className="text-xs uppercase tracking-wide text-gray-700 mb-2 font-bold">👥 Zákaznické segmenty</p>
                {/* VEDLE SEBE */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[1deg]" style={{
                    boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">👨 Muži 25-45</p>
                  </div>
                  <div className="w-16 h-16 bg-green-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-2deg]" style={{
                    boxShadow: '3px 3px 6px rgba(34,197,94,0.4)'
                  }}>
                    <p className="text-[10px] leading-tight font-semibold">🎓 Začínající barbeři</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spodní část - Náklady a Příjmy */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            
            {/* Nákladová struktura - BÍLÝ BOX */}
            <div className="bg-white rounded border-2 border-red-400 p-4 min-h-[120px] relative">
              <p className="text-xs uppercase tracking-wide text-red-700 mb-2 font-bold">💸 Nákladová struktura</p>
              {/* VEDLE SEBE - BEZ MZDY (OSVČ) */}
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="w-16 h-16 bg-gray-200 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-2deg]" style={{
                  boxShadow: '3px 3px 6px rgba(0,0,0,0.2)'
                }}>
                  <p className="text-[10px] leading-tight">Nájem<br/>15k</p>
                </div>
                <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[3deg]" style={{
                  boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                }}>
                  <p className="text-[10px] leading-tight font-semibold">📱 IG ads<br/>8k</p>
                </div>
                <div className="w-16 h-16 bg-gray-200 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-1deg]" style={{
                  boxShadow: '3px 3px 6px rgba(0,0,0,0.2)'
                }}>
                  <p className="text-[10px] leading-tight">Materiál<br/>4k</p>
                </div>
              </div>
              
              {/* Total */}
              <div className="absolute bottom-2 right-2 bg-red-100 px-2 py-1 rounded text-xs font-bold text-red-800">
                = 27k/měs
              </div>
            </div>

            {/* Zdroje příjmů - BÍLÝ BOX */}
            <div className="bg-white rounded border-2 border-green-400 p-4 min-h-[120px] relative">
              <p className="text-xs uppercase tracking-wide text-green-700 mb-2 font-bold">💰 Zdroje příjmů</p>
              {/* VEDLE SEBE */}
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[2deg]" style={{
                  boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                }}>
                  <p className="text-[10px] leading-tight font-semibold">✂️ Stříhání<br/>400 Kč</p>
                </div>
                <div className="w-16 h-16 bg-blue-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[-3deg]" style={{
                  boxShadow: '3px 3px 6px rgba(59,130,246,0.4)'
                }}>
                  <p className="text-[10px] leading-tight font-semibold">👑 VIP<br/>1200 Kč</p>
                </div>
                <div className="w-16 h-16 bg-green-300 shadow-lg flex items-center justify-center text-center p-1.5 rotate-[1deg]" style={{
                  boxShadow: '3px 3px 6px rgba(34,197,94,0.4)'
                }}>
                  <p className="text-[10px] leading-tight font-semibold">🎓 Kurzy<br/>3500 Kč</p>
                </div>
              </div>
              
              {/* Total + profit */}
              <div className="absolute bottom-2 right-2 space-y-1 text-right">
                <div className="bg-green-100 px-2 py-1 rounded text-xs font-bold text-green-800">
                  = 89k/měs
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-2 py-1 rounded text-xs font-black text-white shadow-lg">
                  💰 PROFIT: +62k
                </div>
              </div>
            </div>
          </div>

          {/* Nota bene - handwritten style */}
          <div className="mt-6 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-600 italic">
              ✍️ "Každý den se na to dívám a vím co dělat. Je to SKVĚLÝ." - Martin
            </p>
          </div>
        </div>

        {/* Špendlík - jako by to visel */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-lg border-2 border-red-600"></div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-300"></div>
      </div>
    </div>
  );
}

// TESTIMONIAL #2: Lenka - Kosmetický salon (SCREENSHOT FORMAT)
export function Testimonial4DeepDive() {
  // Vráceno zpět k původnímu screenshotu - jako běží na FB!
  return (
    <div className="h-full bg-gradient-to-br from-purple-700 via-pink-600 to-purple-800 flex items-center justify-center p-8">
      
      <div className="max-w-2xl w-full space-y-4">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-6">
          <h1 className="text-5xl text-white">
            Lenka • Kosmetička
          </h1>
          <div className="inline-block bg-pink-400 px-6 py-2 rounded-full">
            <p className="text-white font-bold">TAKHLE TO FUNGUJE V PRAXI</p>
          </div>
        </div>

        {/* Problém */}
        <div className="bg-purple-900/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-400">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-3xl">😰</div>
            <h2 className="text-xl text-white font-bold">PROBLÉM:</h2>
          </div>
          <div className="ml-12 space-y-2">
            <p className="text-lg text-white">"Chtěla jsem začít s kosmetikou."</p>
            <p className="text-lg text-white">Ale kosmetiček je všude plno.</p>
            <p className="text-lg text-white">Nevěděla jsem jak na to."</p>
          </div>
        </div>

        {/* Co ukázala čtvrtka */}
        <div className="bg-white/95 rounded-2xl p-6 border-2 border-gray-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-3xl">📋</div>
            <h2 className="text-xl text-gray-900 font-bold">CO UKÁZALA ČTVRTKA:</h2>
          </div>
          
          <div className="ml-12 space-y-3">
            <div className="flex items-start gap-2">
              <div className="text-green-600 text-xl mt-0.5">✅</div>
              <p className="text-lg text-gray-900">
                <span className="font-bold">Vyplnila model (ještě před startem!)</span>
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="text-green-600 text-xl mt-0.5">✅</div>
              <div>
                <p className="text-lg text-gray-900 font-bold">Zjistila kde je příležitost</p>
                <p className="text-base text-pink-600">Premium anti-aging pro 35+ ženy</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="text-green-600 text-xl mt-0.5">✅</div>
              <p className="text-lg text-gray-900">
                <span className="font-bold">Spočítala kolik potřebuje zákazníků</span>
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="text-green-600 text-xl mt-0.5">✅</div>
              <div>
                <p className="text-lg text-gray-900 font-bold">Šla do toho</p>
                <p className="text-base text-gray-600">S jasným plánem od začátku</p>
              </div>
            </div>
          </div>
        </div>

        {/* Výsledek */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-center border-2 border-green-300 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="text-4xl">🎉</div>
            <h2 className="text-2xl text-white font-bold">VÝSLEDEK:</h2>
          </div>
          <p className="text-6xl text-white font-black mb-2">+40% nad plán</p>
          <p className="text-xl text-white/90 mb-4">za dva měsíce</p>
          <div className="space-y-1 text-white">
            <p className="text-lg">• Jasná pozice na trhu</p>
            <p className="text-lg">• Není "jen další kosmetička"</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-yellow-400 rounded-2xl p-6 text-center border-2 border-yellow-500 shadow-xl">
          <p className="text-3xl text-gray-900 font-black mb-2">TEĎKA TY</p>
          <p className="text-lg text-gray-900">
            Stejný systém • Tvůj byznys • 90 minut
          </p>
        </div>
      </div>
    </div>
  );
}