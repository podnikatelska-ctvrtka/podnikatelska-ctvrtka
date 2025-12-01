// 🎯 VALUE AD #3: Multiple design versions to choose from
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// VERSION 1: Clean Typography (no boxes)
function Version1() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex flex-col items-center justify-center px-12 py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />

      <div className="text-9xl mb-8 z-10 animate-pulse">🛑</div>
      <h1 className="text-8xl font-black text-white mb-6 drop-shadow-2xl z-10 text-center">STOP</h1>
      
      <p className="text-5xl font-black text-white text-center mb-4 z-10 leading-tight drop-shadow-lg">
        Než začneš podnikat,
      </p>
      <p className="text-5xl font-black text-white text-center mb-12 z-10 leading-tight drop-shadow-lg">
        potřebuješ Čtvrtku
      </p>

      <div className="w-full max-w-3xl border-t-4 border-white/40 mb-10 z-10"></div>

      <div className="z-10 text-center mb-12">
        <div className="flex items-start justify-center gap-4 mb-6">
          <span className="text-6xl">❌</span>
          <div className="text-left">
            <p className="text-3xl font-black text-white mb-3">
              Podnikatelé dnes investují<br/>DESETITISÍCE
            </p>
            <div className="flex gap-3 mb-4">
              <span className="text-2xl">📍 Prostory</span>
              <span className="text-2xl">📦 Produkty</span>
              <span className="text-2xl">📱 Marketing</span>
            </div>
            <p className="text-2xl text-white/90 leading-tight">
              Aniž by věděli, jestli jejich nápad<br/>na trhu uspěje
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl border-t-4 border-white/40 mb-10 z-10"></div>

      <div className="z-10 text-center mb-12">
        <div className="flex items-start justify-center gap-4">
          <span className="text-6xl">✅</span>
          <div className="text-left">
            <p className="text-4xl font-black text-white mb-3">
              Čtvrtka = otestuj PŘED investicí
            </p>
            <p className="text-2xl text-white/90">
              Zjisti co zákazníci OPRAVDU chtějí<br/>
              a ušetři peníze na zbytečných chybách
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 z-10">
        <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl">
          <p className="text-3xl font-black text-emerald-600">27 podnikatelů</p>
          <p className="text-sm text-gray-600 text-center">má Model podnikání</p>
        </div>
        <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl">
          <p className="text-3xl font-black text-purple-600">1,4 mil. Kč</p>
          <p className="text-sm text-gray-600 text-center">ušetřeno 📈</p>
        </div>
      </div>
    </div>
  );
}

// VERSION 2: Minimalist with 1 center box
function Version2() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex flex-col items-center justify-center px-12 py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />

      <div className="text-9xl mb-8 z-10 animate-pulse">🛑</div>
      <h1 className="text-8xl font-black text-white mb-6 drop-shadow-2xl z-10 text-center">STOP</h1>
      
      <p className="text-5xl font-black text-white text-center mb-12 z-10 leading-tight drop-shadow-lg">
        Než začneš podnikat, potřebuješ Čtvrtku
      </p>

      <div className="bg-white/95 rounded-3xl p-10 max-w-3xl shadow-2xl z-10 mb-8">
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">❌</span>
            <div>
              <p className="text-2xl font-black text-red-600 mb-3">
                Podnikatelé investují DESETITISÍCE
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-red-50 px-3 py-1 rounded-lg font-bold text-gray-700">📍 Prostory</span>
                <span className="bg-red-50 px-3 py-1 rounded-lg font-bold text-gray-700">📦 Produkty</span>
                <span className="bg-red-50 px-3 py-1 rounded-lg font-bold text-gray-700">📱 Marketing</span>
              </div>
              <p className="text-xl text-gray-700">
                Aniž by věděli, jestli jejich nápad na trhu uspěje
              </p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 pt-8">
          <div className="flex items-start gap-4">
            <span className="text-5xl">✅</span>
            <div>
              <p className="text-3xl font-black text-emerald-600 mb-3">
                Čtvrtka = otestuj PŘED investicí
              </p>
              <p className="text-xl text-gray-700">
                Zjisti co zákazníci <span className="font-black text-blue-600">OPRAVDU</span> chtějí a ušetři peníze na zbytečných chybách
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 z-10">
        <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl">
          <p className="text-3xl font-black text-emerald-600">27 podnikatelů</p>
          <p className="text-sm text-gray-600 text-center">má Model podnikání</p>
        </div>
        <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl">
          <p className="text-3xl font-black text-purple-600">1,4 mil. Kč</p>
          <p className="text-sm text-gray-600 text-center">ušetřeno 📈</p>
        </div>
      </div>
    </div>
  );
}

// VERSION 3: Split Screen (Left Problem / Right Solution)
function Version3() {
  return (
    <div className="w-full h-full flex relative overflow-hidden">
      {/* LEFT SIDE - Problem */}
      <div className="w-1/2 bg-gradient-to-br from-red-600 to-orange-600 flex flex-col items-center justify-center p-8 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-400/20 rounded-full blur-3xl" />
        
        <div className="text-8xl mb-6 z-10 animate-pulse">🛑</div>
        <h1 className="text-7xl font-black text-white mb-8 drop-shadow-2xl z-10 text-center">STOP</h1>
        
        <div className="z-10 text-center">
          <p className="text-3xl font-black text-white mb-8">
            Než začneš podnikat
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <p className="text-2xl font-black text-white mb-4">
              ❌ Podnikatelé investují<br/>DESETITISÍCE
            </p>
            <div className="flex flex-col gap-2 mb-4">
              <span className="text-lg text-white/90">📍 Prostory</span>
              <span className="text-lg text-white/90">📦 Produkty</span>
              <span className="text-lg text-white/90">📱 Marketing</span>
            </div>
            <p className="text-lg text-white/90">
              Aniž by věděli, jestli<br/>nápad uspěje
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Solution */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8 relative">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl" />
        
        <div className="z-10 text-center">
          <p className="text-4xl font-black text-gray-900 mb-8">
            Potřebuješ Čtvrtku
          </p>
          
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-8 mb-8">
            <p className="text-3xl font-black text-emerald-600 mb-6">
              ✅ Čtvrtka řeší:
            </p>
            <div className="space-y-4 text-left">
              <p className="text-xl text-gray-800">
                <span className="font-black text-emerald-600">→</span> Otestuj PŘED investicí
              </p>
              <p className="text-xl text-gray-800">
                <span className="font-black text-blue-600">→</span> Zjisti co chtějí zákazníci
              </p>
              <p className="text-xl text-gray-800">
                <span className="font-black text-purple-600">→</span> Ušetři na chybách
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl px-4 py-3 border border-emerald-200">
              <p className="text-2xl font-black text-emerald-600">27 podnikatelů</p>
              <p className="text-xs text-gray-600">má Model podnikání</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl px-4 py-3 border border-purple-200">
              <p className="text-2xl font-black text-purple-600">1,4 mil. Kč</p>
              <p className="text-xs text-gray-600">ušetřeno 📈</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION 4: Simple with emoji separators
function Version4() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex flex-col items-center justify-center px-12 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />

      <div className="text-9xl mb-6 z-10 animate-pulse">🛑</div>
      <h1 className="text-9xl font-black text-white mb-8 drop-shadow-2xl z-10 text-center leading-none">STOP</h1>
      
      <p className="text-5xl font-black text-white text-center mb-10 z-10 leading-tight drop-shadow-lg">
        Než začneš podnikat,<br/>potřebuješ Čtvrtku
      </p>

      <div className="text-5xl mb-8 z-10">▼ ▼ ▼</div>

      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-3xl mb-8 z-10 border-2 border-white/30">
        <p className="text-3xl font-black text-white mb-4 text-center">
          Podnikatelé dnes investují DESETITISÍCE
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <span className="text-2xl">📍 Prostory</span>
          <span className="text-2xl">📦 Produkty</span>
          <span className="text-2xl">📱 Marketing</span>
        </div>
        <p className="text-2xl text-white/90 text-center leading-tight">
          Aniž by věděli, jestli jejich nápad na trhu uspěje
        </p>
      </div>

      <div className="text-5xl mb-8 z-10">▼ ▼ ▼</div>

      <div className="bg-white rounded-3xl p-8 max-w-3xl mb-10 z-10 shadow-2xl">
        <p className="text-4xl font-black text-emerald-600 mb-4 text-center">
          ✅ Čtvrtka = otestuj PŘED investicí
        </p>
        <p className="text-2xl text-gray-700 text-center">
          Zjisti co zákazníci <span className="font-black text-blue-600">OPRAVDU</span> chtějí<br/>
          a ušetři peníze na zbytečných chybách
        </p>
      </div>

      <div className="flex gap-4 z-10">
        <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl">
          <p className="text-3xl font-black text-emerald-600">27 podnikatelů</p>
          <p className="text-sm text-gray-600 text-center">má Model podnikání</p>
        </div>
        <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl">
          <p className="text-3xl font-black text-purple-600">1,4 mil. Kč</p>
          <p className="text-sm text-gray-600 text-center">ušetřeno 📈</p>
        </div>
      </div>
    </div>
  );
}

export function Value3Versions() {
  const [currentVersion, setCurrentVersion] = useState(0);
  
  const versions = [
    { name: 'V1: Clean Typography', component: <Version1 /> },
    { name: 'V2: Single Box', component: <Version2 /> },
    { name: 'V3: Split Screen', component: <Version3 /> },
    { name: 'V4: Emoji Separators', component: <Version4 /> },
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
            🎯 VALUE #3 - Design Options
          </h1>
          <p className="text-2xl text-gray-600 mb-6">
            Vyber si design a pak dodělám copy! 🚀
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
        <div className="grid grid-cols-2 gap-6 mb-8">
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
                <div className="bg-gray-800 text-white px-4 py-2 text-center font-bold rounded-t-xl">
                  {version.name}
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
              📱 VYBRANÝ DESIGN: {versions[currentVersion].name}
            </p>
          </div>
          <div className="aspect-square">
            {versions[currentVersion].component}
          </div>
        </div>
      </div>
    </div>
  );
}