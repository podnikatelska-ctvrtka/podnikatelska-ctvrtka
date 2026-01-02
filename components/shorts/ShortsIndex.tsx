import React from 'react';
import { YouTubeLogo, YouTubeLogoSimple, YouTubeLogoPTF } from '../YouTubeLogo';
import { YouTubeBanner, YouTubeBannerMinimal, YouTubeBannerBold } from '../YouTubeBanner';
import { PizzaShort } from './PizzaShort';

/**
 * 📦 SHORTS INDEX - Index page with all YouTube assets
 * 
 * Routes:
 * - /shorts-index - This index page
 * - /shorts/logo - Logo variations
 * - /shorts/banner - Banner variations  
 * - /shorts/pizza - Pizza short
 */

export function ShortsIndex() {
  const [selectedView, setSelectedView] = React.useState<string | null>(null);

  if (selectedView === 'logo-question') return <YouTubeLogo />;
  if (selectedView === 'logo-simple') return <YouTubeLogoSimple />;
  if (selectedView === 'logo-ptf') return <YouTubeLogoPTF />;
  
  if (selectedView === 'banner-main') return <YouTubeBanner />;
  if (selectedView === 'banner-minimal') return <YouTubeBannerMinimal />;
  if (selectedView === 'banner-bold') return <YouTubeBannerBold />;
  
  if (selectedView === 'pizza-short') return <PizzaShort />;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-white text-5xl font-black mb-4">
            📱 YouTube Shorts Assets - Model Podnikání
          </h1>
          <p className="text-white/60 text-xl">
            Klikni na kartu → otevře se component → nahraj přes ShareX
          </p>
        </div>

        {/* Logos Section */}
        <div className="mb-12">
          <h2 className="text-white text-3xl font-black mb-6 flex items-center gap-3">
            <span>🎨</span> LOGA (Profile Pic)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Logo 1: M Letter */}
            <button
              onClick={() => setSelectedView('logo-question')}
              className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-center hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="text-white text-[120px] mb-4">M</div>
              <div className="text-white text-2xl font-black mb-2">
                M Logo
              </div>
              <div className="text-white/80 text-sm">
                Gradient + text (animated)
              </div>
            </button>

            {/* Logo 2: Simple M */}
            <button
              onClick={() => setSelectedView('logo-simple')}
              className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-center hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="text-white text-[120px] mb-4">M</div>
              <div className="text-white text-2xl font-black mb-2">
                Simple Logo
              </div>
              <div className="text-white/80 text-sm">
                Jen M písmeno 800×800
              </div>
            </button>

            {/* Logo 3: MP Monogram */}
            <button
              onClick={() => setSelectedView('logo-ptf')}
              className="bg-black rounded-3xl p-8 text-center hover:scale-105 transition-transform cursor-pointer border-2 border-orange-500"
            >
              <div className="text-white text-[80px] mb-4">
                <span className="text-white">M</span>
                <span className="text-orange-500">P</span>
              </div>
              <div className="text-white text-2xl font-black mb-2">
                MP Monogram
              </div>
              <div className="text-white/80 text-sm">
                Alternative black + orange
              </div>
            </button>

          </div>
        </div>

        {/* Banners Section */}
        <div className="mb-12">
          <h2 className="text-white text-3xl font-black mb-6 flex items-center gap-3">
            <span>🖼️</span> BANNERY (Channel Header)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Banner 1: Main */}
            <button
              onClick={() => setSelectedView('banner-main')}
              className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-3xl p-8 text-center hover:scale-105 transition-transform cursor-pointer border-2 border-orange-500/30"
            >
              <div className="text-orange-500 text-[80px] mb-4">M</div>
              <div className="text-white text-2xl font-black mb-2">
                Main Banner
              </div>
              <div className="text-white/80 text-sm">
                Dark + glowing orbs (2560×1440)
              </div>
            </button>

            {/* Banner 2: Minimal */}
            <button
              onClick={() => setSelectedView('banner-minimal')}
              className="bg-black rounded-3xl p-8 text-center hover:scale-105 transition-transform cursor-pointer border-2 border-white/20"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-orange-500 text-[60px]">M</div>
                <div className="text-white text-[40px] font-black">MP</div>
              </div>
              <div className="text-white text-2xl font-black mb-2">
                Minimal Banner
              </div>
              <div className="text-white/80 text-sm">
                Clean black + lines (2560×1440)
              </div>
            </button>

            {/* Banner 3: Bold */}
            <button
              onClick={() => setSelectedView('banner-bold')}
              className="bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 rounded-3xl p-8 text-center hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="text-white text-[60px] mb-4">MODEL</div>
              <div className="text-white text-2xl font-black mb-2">
                Bold Banner
              </div>
              <div className="text-white/80 text-sm">
                Orange gradient + shapes (2560×1440)
              </div>
            </button>

          </div>
        </div>

        {/* Shorts Section */}
        <div className="mb-12">
          <h2 className="text-white text-3xl font-black mb-6 flex items-center gap-3">
            <span>🎬</span> SHORTS (Videos)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Short 1: Pizza */}
            <button
              onClick={() => setSelectedView('pizza-short')}
              className="bg-black rounded-3xl p-8 text-center hover:scale-105 transition-transform cursor-pointer border-2 border-green-500"
            >
              <div className="text-[100px] mb-4">🍕</div>
              <div className="text-white text-2xl font-black mb-2">
                Pizza Short
              </div>
              <div className="text-green-400 text-lg font-black mb-4">
                ✅ READY TO RECORD
              </div>
              <div className="text-white/80 text-sm">
                "Pizzerie dělá jen 30k/měsíc"<br/>
                50s • Animated • Vertical (1080×1920)
              </div>
            </button>

            {/* Placeholder for future shorts */}
            <div className="bg-white/5 rounded-3xl p-8 text-center border-2 border-dashed border-white/20">
              <div className="text-white/30 text-[100px] mb-4">🏢</div>
              <div className="text-white/40 text-2xl font-black mb-2">
                Zásilkovna Short
              </div>
              <div className="text-white/30 text-sm">
                "1,2 mld bez skladů?"<br/>
                Připraveno v /youtube-shorts
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 text-center border-2 border-dashed border-white/20">
              <div className="text-white/30 text-[100px] mb-4">🚀</div>
              <div className="text-white/40 text-2xl font-black mb-2">
                Jak začít Short
              </div>
              <div className="text-white/30 text-sm">
                "Prvních 5 kroků"<br/>
                Připraveno v /youtube-shorts
              </div>
            </div>

          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-500/10 border-2 border-blue-500 rounded-3xl p-8">
          <h3 className="text-blue-400 text-2xl font-black mb-4">
            📝 JAK POUŽÍT:
          </h3>
          <div className="text-white/80 space-y-3">
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">1.</span>
              <span>Klikni na kartu → otevře se fullscreen component</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">2.</span>
              <span>ShareX → Region capture (nebo fullscreen)</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">3.</span>
              <span><strong>LOGA:</strong> Square crop 800×800 pro profile pic</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">4.</span>
              <span><strong>BANNERY:</strong> Full 2560×1440 (safe area: center 1546×423)</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">5.</span>
              <span><strong>SHORTS:</strong> Vertical 1080×1920, add AI voiceover v CapCut</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">6.</span>
              <span><strong>VÍCE SHORTS:</strong> Jdi na /youtube-shorts pro všech 6 Shorts!</span>
            </p>
          </div>
        </div>

        {/* Back button if viewing a component */}
        {selectedView && (
          <button
            onClick={() => setSelectedView(null)}
            className="fixed top-8 left-8 bg-white text-black px-8 py-4 rounded-full font-black text-xl hover:scale-105 transition-transform z-50 shadow-2xl"
          >
            ← Zpět na index
          </button>
        )}

      </div>
    </div>
  );
}