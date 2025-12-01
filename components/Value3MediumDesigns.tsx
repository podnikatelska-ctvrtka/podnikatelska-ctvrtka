// 🎯 VALUE AD #3: Medium complexity designs (not too simple, not too complex)
import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, TrendingDown, Shield, Zap } from 'lucide-react';

// VERSION 1: Warning Banner Style
function Version1() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-10 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full">
        {/* Warning Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-t-3xl p-8 flex items-center justify-center gap-6 border-4 border-red-400">
          <div className="text-9xl animate-pulse">🛑</div>
          <div>
            <h1 className="text-8xl font-black text-white leading-none mb-2">STOP</h1>
            <p className="text-3xl text-white/90">Než začneš investovat...</p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-b-3xl p-10 border-4 border-t-0 border-red-400">
          <p className="text-5xl font-black text-gray-900 mb-8">
            Potřebuješ Čtvrtku! ⚡
          </p>

          {/* Problem/Solution Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-10 h-10 text-red-600" />
                <p className="text-3xl font-black text-red-600">❌ RIZIKO</p>
              </div>
              <p className="text-2xl text-gray-700 mb-2 font-bold">DESETITISÍCE Kč</p>
              <p className="text-xl text-gray-600">📍 Prostory · 📦 Produkty · 📱 Marketing</p>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-10 h-10 text-emerald-600" />
                <p className="text-3xl font-black text-emerald-600">✅ ČTVRTKA</p>
              </div>
              <p className="text-2xl text-gray-700 mb-2 font-bold">Otestuj PŘED</p>
              <p className="text-xl text-gray-600">Zjisti co zákazníci chtějí</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 pt-6 border-t-2 border-gray-200">
            <div className="text-center">
              <p className="text-5xl font-black text-emerald-600">27</p>
              <p className="text-lg text-gray-600">podnikatelů</p>
            </div>
            <div className="text-6xl text-gray-300">·</div>
            <div className="text-center">
              <p className="text-5xl font-black text-purple-600">1,4M</p>
              <p className="text-lg text-gray-600">ušetřeno</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION 2: Diagonal Split Design
function Version2() {
  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* Diagonal Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-amber-400" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 85%)' }}>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-12">
        {/* Top Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 bg-black/20 backdrop-blur-md rounded-full px-12 py-6 mb-8">
            <div className="text-8xl">🛑</div>
            <h1 className="text-9xl font-black text-white">STOP</h1>
          </div>
          
          <p className="text-6xl font-black text-white mb-4 drop-shadow-lg">
            Než začneš podnikat
          </p>
          <p className="text-4xl text-white/90 drop-shadow-md">
            potřebuješ Čtvrtku
          </p>
        </div>

        {/* Bottom Cards */}
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <AlertTriangle className="w-12 h-12 text-red-600" />
                <p className="text-4xl font-black text-red-600">❌</p>
              </div>
              <p className="text-3xl font-black text-gray-900 mb-3">
                DESETITISÍCE
              </p>
              <p className="text-xl text-gray-600">
                bez testu trhu
              </p>
            </div>

            <div className="bg-emerald-500 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="w-12 h-12 text-white" />
                <p className="text-4xl font-black text-white">✅</p>
              </div>
              <p className="text-3xl font-black text-white mb-3">
                TEST PŘED
              </p>
              <p className="text-xl text-white/90">
                s Čtvrtkou
              </p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-3xl p-6 flex items-center justify-around">
            <div className="text-center">
              <p className="text-4xl font-black text-emerald-400">27 podnikatelů</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <p className="text-4xl font-black text-purple-400">1,4 mil. ušetřeno</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION 3: Magazine Style Layout
function Version3() {
  return (
    <div className="w-full h-full bg-orange-500 p-10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="bg-black rounded-3xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center gap-6">
            <div className="text-9xl">🛑</div>
            <div className="text-left">
              <h1 className="text-9xl font-black text-white leading-none">STOP</h1>
              <p className="text-2xl text-red-500 font-black mt-2">⚠️ DŮLEŽITÉ UPOZORNĚNÍ</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-10 flex-1 flex flex-col justify-between shadow-2xl">
          <div>
            <p className="text-6xl font-black text-gray-900 mb-6 leading-tight">
              Než začneš podnikat,<br/>
              potřebuješ Čtvrtku
            </p>

            <div className="bg-gray-100 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 rounded-full p-4">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                <div>
                  <p className="text-3xl font-black text-red-600 mb-2">
                    ❌ Klasický podnikatel
                  </p>
                  <p className="text-2xl text-gray-700 mb-2">
                    Investuje <span className="font-black">DESETITISÍCE</span>
                  </p>
                  <p className="text-xl text-gray-600">
                    📍 Prostory · 📦 Produkty · 📱 Marketing
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-300">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 rounded-full p-4">
                  <Shield className="w-10 h-10 text-emerald-600" />
                </div>
                <div>
                  <p className="text-3xl font-black text-emerald-600 mb-2">
                    ✅ S Čtvrtkou
                  </p>
                  <p className="text-2xl text-gray-700 mb-2">
                    Otestuješ <span className="font-black">PŘED investicí</span>
                  </p>
                  <p className="text-xl text-gray-600">
                    Zjistíš co zákazníci OPRAVDU chtějí
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <div className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-center">
              <p className="text-5xl font-black text-white mb-1">27</p>
              <p className="text-lg text-white/90">podnikatelů</p>
            </div>
            <div className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-center">
              <p className="text-5xl font-black text-white mb-1">1,4M</p>
              <p className="text-lg text-white/90">ušetřeno</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION 4: Bold Frame Design
function Version4() {
  return (
    <div className="w-full h-full bg-gray-900 p-8">
      <div className="h-full border-8 border-red-500 rounded-[40px] overflow-hidden relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12">
          {/* Stop Sign */}
          <div className="bg-white rounded-full p-6 mb-8 shadow-2xl">
            <div className="text-9xl">🛑</div>
          </div>

          <h1 className="text-[120px] font-black text-white mb-6 drop-shadow-2xl leading-none">
            STOP
          </h1>

          <div className="bg-white/95 backdrop-blur-sm rounded-[40px] p-12 max-w-4xl w-full shadow-2xl">
            <p className="text-5xl font-black text-gray-900 text-center mb-10 leading-tight">
              Než začneš podnikat,<br/>potřebuješ Čtvrtku
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 rounded-2xl p-6 border-l-8 border-red-500">
                <p className="text-4xl mb-3">❌</p>
                <p className="text-2xl font-black text-red-600 mb-2">
                  DESETITISÍCE
                </p>
                <p className="text-lg text-gray-600">
                  bez testu
                </p>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-6 border-l-8 border-emerald-500">
                <p className="text-4xl mb-3">✅</p>
                <p className="text-2xl font-black text-emerald-600 mb-2">
                  TEST PŘED
                </p>
                <p className="text-lg text-gray-600">
                  s Čtvrtkou
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <p className="text-4xl font-black text-emerald-400">27</p>
                  <p className="text-sm text-white/70">podnikatelů</p>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-4xl font-black text-purple-400">1,4M Kč</p>
                  <p className="text-sm text-white/70">ušetřeno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION 5: Newspaper Alert Style
function Version5() {
  return (
    <div className="w-full h-full bg-yellow-50 p-10">
      <div className="h-full bg-white rounded-3xl shadow-2xl border-4 border-gray-900 overflow-hidden">
        {/* Alert Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 border-b-8 border-gray-900">
          <div className="flex items-center justify-center gap-8">
            <div className="text-9xl">🛑</div>
            <div className="text-center">
              <p className="text-2xl text-white/90 mb-2">⚠️ URGENT ALERT</p>
              <h1 className="text-9xl font-black text-white leading-none">STOP</h1>
            </div>
            <div className="text-9xl">🛑</div>
          </div>
        </div>

        <div className="p-12">
          <div className="text-center mb-10">
            <p className="text-6xl font-black text-gray-900 mb-4">
              Než začneš podnikat
            </p>
            <p className="text-5xl text-orange-600 font-black">
              potřebuješ Čtvrtku! ⚡
            </p>
          </div>

          {/* Content boxes */}
          <div className="space-y-6 mb-10">
            <div className="bg-red-50 border-l-8 border-red-500 rounded-r-2xl p-8">
              <div className="flex items-center gap-6">
                <div className="bg-red-500 rounded-full p-4">
                  <AlertTriangle className="w-12 h-12 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-black text-red-600 mb-2">
                    ❌ BEZ Čtvrtky
                  </p>
                  <p className="text-2xl text-gray-800 mb-2">
                    Investuješ <span className="font-black">DESETITISÍCE Kč</span>
                  </p>
                  <p className="text-xl text-gray-600">
                    📍 Prostory · 📦 Produkty · 📱 Marketing - vše NAPOPRVÉ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border-l-8 border-emerald-500 rounded-r-2xl p-8">
              <div className="flex items-center gap-6">
                <div className="bg-emerald-500 rounded-full p-4">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-black text-emerald-600 mb-2">
                    ✅ S Čtvrtkou
                  </p>
                  <p className="text-2xl text-gray-800 mb-2">
                    Otestuješ <span className="font-black">PŘED investicí</span>
                  </p>
                  <p className="text-xl text-gray-600">
                    Zjistíš co zákazníci chtějí a ušetříš peníze na chybách
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats footer */}
          <div className="bg-gray-900 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center border-r-2 border-white/20">
                <p className="text-6xl font-black text-emerald-400 mb-2">27</p>
                <p className="text-xl text-white/80">podnikatelů už ušetřilo</p>
              </div>
              <div className="text-center">
                <p className="text-6xl font-black text-purple-400 mb-2">1,4M</p>
                <p className="text-xl text-white/80">Kč ušetřeno celkem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION 6: Modern Gradient Cards
function Version6() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900 via-red-900 to-orange-900 flex items-center justify-center p-10">
      <div className="max-w-5xl w-full">
        {/* Top Card - STOP */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-10 mb-6 shadow-2xl transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-9xl">🛑</div>
              <div>
                <h1 className="text-9xl font-black text-white leading-none">STOP</h1>
                <p className="text-3xl text-white/90 mt-2">Než začneš podnikat...</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-5xl font-black text-white">⚠️</p>
              <p className="text-xl text-white/80">DŮLEŽITÉ!</p>
            </div>
          </div>
        </div>

        {/* Middle Card - Message */}
        <div className="bg-white rounded-3xl p-10 mb-6 shadow-2xl">
          <p className="text-6xl font-black text-gray-900 text-center mb-8">
            Potřebuješ Čtvrtku! ⚡
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-10 h-10 text-red-600" />
                <p className="text-3xl font-black text-red-600">❌</p>
              </div>
              <p className="text-3xl font-black text-gray-900 mb-2">
                DESETITISÍCE
              </p>
              <p className="text-xl text-gray-700 mb-3">
                bez ověření trhu
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-bold">📍 Prostory</span>
                <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-bold">📦 Produkty</span>
                <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-bold">📱 Marketing</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-10 h-10 text-emerald-600" />
                <p className="text-3xl font-black text-emerald-600">✅</p>
              </div>
              <p className="text-3xl font-black text-gray-900 mb-2">
                ČTVRTKA
              </p>
              <p className="text-xl text-gray-700 mb-3">
                otestuj PŘED investicí
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">✨ Bez rizika</span>
                <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">💰 Ušetříš</span>
                <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">🎯 Zjistíš</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Card - Stats */}
        <div className="bg-gradient-to-r from-emerald-500 via-purple-500 to-blue-500 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-6xl font-black text-white mb-2">27</p>
              <p className="text-xl text-white/90">podnikatelů použilo</p>
            </div>
            <div className="w-1 h-20 bg-white/30 rounded-full"></div>
            <div className="text-center">
              <p className="text-6xl font-black text-white mb-2">1,4M Kč</p>
              <p className="text-xl text-white/90">celkem ušetřeno</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Value3MediumDesigns() {
  const [currentVersion, setCurrentVersion] = useState(0);
  
  const versions = [
    { name: 'V1: Warning Banner', description: 'Červený warning + grid', component: <Version1 /> },
    { name: 'V2: Diagonal Split', description: 'Diagonální pozadí + cards', component: <Version2 /> },
    { name: 'V3: Magazine Style', description: 'Magazín layout + icons', component: <Version3 /> },
    { name: 'V4: Bold Frame', description: 'Silný rám + gradient', component: <Version4 /> },
    { name: 'V5: Newspaper Alert', description: 'Noviny styl + urgent', component: <Version5 /> },
    { name: 'V6: Gradient Cards', description: 'Moderní gradient kartičky', component: <Version6 /> },
  ];

  const nextVersion = () => {
    setCurrentVersion((prev) => (prev + 1) % versions.length);
  };

  const prevVersion = () => {
    setCurrentVersion((prev) => (prev - 1 + versions.length) % versions.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            🎨 VALUE #3 - MEDIUM COMPLEXITY
          </h1>
          <p className="text-2xl text-gray-600 mb-2">
            Víc detailů než "too simple", míň než původní! 🔥
          </p>
          <p className="text-xl text-gray-500">
            Profesionální + čitelné + zajímavé
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={prevVersion}
            className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition flex items-center gap-2 font-bold"
          >
            <ChevronLeft className="w-6 h-6" />
            Předchozí
          </button>
          
          <div className="bg-white px-8 py-4 rounded-xl shadow-lg">
            <p className="text-2xl font-black text-gray-900">
              {versions[currentVersion].name}
            </p>
            <p className="text-sm text-gray-600">
              {versions[currentVersion].description}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {currentVersion + 1} / {versions.length}
            </p>
          </div>

          <button
            onClick={nextVersion}
            className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition flex items-center gap-2 font-bold"
          >
            Další
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* All versions grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {versions.map((version, index) => (
            <div key={index} className="relative">
              <div 
                className={`cursor-pointer transition-all ${ 
                  currentVersion === index 
                    ? 'ring-4 ring-blue-500 scale-105' 
                    : 'hover:ring-2 hover:ring-gray-400'
                }`}
                onClick={() => setCurrentVersion(index)}
              >
                <div className="bg-gray-800 text-white px-4 py-2 text-center rounded-t-xl">
                  <p className="font-black text-sm">{version.name}</p>
                  <p className="text-xs text-gray-300">{version.description}</p>
                </div>
                <div className="aspect-square bg-white shadow-xl rounded-b-xl overflow-hidden">
                  {version.component}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected version large */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-center">
            <p className="text-3xl font-black">
              📱 VYBRANÝ: {versions[currentVersion].name}
            </p>
            <p className="text-lg">{versions[currentVersion].description}</p>
          </div>
          <div className="aspect-square">
            {versions[currentVersion].component}
          </div>
        </div>

        {/* Quick selection buttons */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          {versions.map((version, index) => (
            <button
              key={index}
              onClick={() => setCurrentVersion(index)}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                currentVersion === index
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {version.name.split(':')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
