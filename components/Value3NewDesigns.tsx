// 🎯 VALUE AD #3: Completely new design approaches
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// VERSION A: Bold Minimalist (Large text, simple)
function VersionA() {
  return (
    <div className="w-full h-full bg-red-600 flex flex-col items-center justify-between p-16 relative">
      {/* Top Section */}
      <div className="text-center">
        <div className="text-[200px] leading-none mb-8">🛑</div>
        <h1 className="text-[120px] font-black text-white leading-none mb-12">
          STOP
        </h1>
        <p className="text-6xl text-white leading-tight">
          Než začneš podnikat,<br/>
          <span className="font-black">potřebuješ Čtvrtku</span>
        </p>
      </div>

      {/* Bottom Section */}
      <div className="w-full">
        <div className="bg-white rounded-3xl p-10 mb-8">
          <p className="text-4xl font-black text-gray-900 mb-6">
            ❌ Klasický podnikatel = DESETITISÍCE do startu
          </p>
          <p className="text-3xl text-gray-700">
            ✅ Čtvrtka = otestuj PŘED investicí
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
            <p className="text-4xl font-black text-white">27 podnikatelů</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
            <p className="text-4xl font-black text-white">1,4 mil. Kč ušetřeno</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION B: Card Stack Style
function VersionB() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-12">
      <div className="max-w-4xl w-full">
        {/* Header Card */}
        <div className="bg-red-600 rounded-3xl p-12 mb-6 text-center shadow-2xl">
          <div className="text-9xl mb-4">🛑</div>
          <h1 className="text-8xl font-black text-white mb-6">STOP</h1>
          <p className="text-5xl text-white">
            Než začneš podnikat, potřebuješ Čtvrtku
          </p>
        </div>

        {/* Problem Card */}
        <div className="bg-white rounded-3xl p-10 mb-6 shadow-xl border-4 border-red-200">
          <div className="flex items-start gap-6">
            <span className="text-7xl">❌</span>
            <div>
              <p className="text-4xl font-black text-red-600 mb-4">
                Investují DESETITISÍCE
              </p>
              <p className="text-3xl text-gray-700 mb-4">
                📍 Prostory · 📦 Produkty · 📱 Marketing
              </p>
              <p className="text-2xl text-gray-600">
                Aniž by věděli, jestli nápad uspěje
              </p>
            </div>
          </div>
        </div>

        {/* Solution Card */}
        <div className="bg-emerald-500 rounded-3xl p-10 shadow-xl">
          <div className="flex items-start gap-6">
            <span className="text-7xl">✅</span>
            <div>
              <p className="text-4xl font-black text-white mb-4">
                Čtvrtka = otestuj PŘED
              </p>
              <p className="text-2xl text-white/90">
                Zjisti co zákazníci chtějí a ušetři na chybách
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-3xl font-black text-white">27 podnikatelů</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-3xl font-black text-white">1,4 mil. Kč</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION C: Instagram Story Vertical
function VersionC() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Top Half - Problem */}
      <div className="flex-1 bg-gradient-to-br from-red-600 to-orange-500 flex flex-col items-center justify-center p-12 relative">
        <div className="absolute top-8 left-8 right-8">
          <div className="text-8xl">🛑</div>
        </div>
        
        <div className="text-center z-10">
          <h1 className="text-9xl font-black text-white mb-8 leading-none drop-shadow-2xl">
            STOP
          </h1>
          <p className="text-5xl font-black text-white mb-12 leading-tight">
            Než začneš podnikat
          </p>
          
          <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8">
            <p className="text-3xl font-black text-white mb-4">
              ❌ DESETITISÍCE do startu
            </p>
            <p className="text-2xl text-white/90">
              📍 Prostory · 📦 Produkty · 📱 Marketing
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Half - Solution */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-12">
        <p className="text-6xl font-black text-gray-900 mb-8 text-center">
          Potřebuješ Čtvrtku ⚡
        </p>
        
        <div className="bg-emerald-50 border-4 border-emerald-400 rounded-3xl p-10 mb-8">
          <p className="text-4xl font-black text-emerald-600 mb-6">
            ✅ Otestuj PŘED investicí
          </p>
          <p className="text-3xl text-gray-800">
            Zjisti co zákazníci <span className="font-black text-blue-600">OPRAVDU</span> chtějí
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          <div className="bg-emerald-100 rounded-2xl p-6 text-center border-2 border-emerald-400">
            <p className="text-4xl font-black text-emerald-700">27</p>
            <p className="text-xl text-gray-700">podnikatelů</p>
          </div>
          <div className="bg-purple-100 rounded-2xl p-6 text-center border-2 border-purple-400">
            <p className="text-4xl font-black text-purple-700">1,4 mil.</p>
            <p className="text-xl text-gray-700">ušetřeno</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION D: Big Number Style
function VersionD() {
  return (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-red-600 to-orange-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-900"></div>
      
      <div className="relative z-10 text-center max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <div className="text-9xl mb-6">🛑</div>
          <h1 className="text-[140px] font-black text-white leading-none mb-8 drop-shadow-2xl">
            STOP
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[40px] p-16 shadow-2xl mb-10">
          <p className="text-6xl font-black text-gray-900 mb-8 leading-tight">
            Než začneš podnikat,<br/>potřebuješ Čtvrtku
          </p>
          
          <div className="border-t-4 border-gray-200 pt-8 mb-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-left">
                <p className="text-5xl mb-4">❌</p>
                <p className="text-3xl font-black text-red-600 mb-3">
                  DESETITISÍCE
                </p>
                <p className="text-2xl text-gray-600">
                  bez testu trhu
                </p>
              </div>
              
              <div className="text-left">
                <p className="text-5xl mb-4">✅</p>
                <p className="text-3xl font-black text-emerald-600 mb-3">
                  Čtvrtka = TEST PŘED
                </p>
                <p className="text-2xl text-gray-600">
                  ušetři peníze
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6 justify-center">
            <div className="bg-emerald-50 rounded-2xl px-8 py-4 border-2 border-emerald-300">
              <p className="text-5xl font-black text-emerald-600">27</p>
              <p className="text-lg text-gray-600">podnikatelů</p>
            </div>
            <div className="bg-purple-50 rounded-2xl px-8 py-4 border-2 border-purple-300">
              <p className="text-5xl font-black text-purple-600">1,4M</p>
              <p className="text-lg text-gray-600">ušetřeno</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION E: Simple Bold Text
function VersionE() {
  return (
    <div className="w-full h-full bg-orange-500 flex items-center justify-center p-12">
      <div className="max-w-5xl text-center">
        <div className="mb-12">
          <div className="text-[160px] leading-none">🛑</div>
        </div>
        
        <h1 className="text-[100px] font-black text-white leading-none mb-16 drop-shadow-xl">
          STOP
        </h1>
        
        <div className="bg-white rounded-[50px] p-16 shadow-2xl">
          <p className="text-7xl font-black text-gray-900 mb-12 leading-tight">
            Než začneš podnikat
          </p>
          
          <p className="text-5xl text-gray-700 mb-12">
            Investuješ <span className="font-black text-red-600">DESETITISÍCE</span>
          </p>
          
          <div className="w-full h-1 bg-gray-300 my-10"></div>
          
          <p className="text-6xl font-black text-emerald-600 mb-8">
            Čtvrtka = otestuj PŘED ✅
          </p>
          
          <p className="text-4xl text-gray-700 mb-12">
            Zjisti co zákazníci chtějí a ušetři peníze
          </p>
          
          <div className="flex gap-6 justify-center mt-10">
            <div className="bg-emerald-100 rounded-3xl px-10 py-6">
              <p className="text-5xl font-black text-emerald-700">27 podnikatelů</p>
            </div>
            <div className="bg-purple-100 rounded-3xl px-10 py-6">
              <p className="text-5xl font-black text-purple-700">1,4 mil. Kč</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VERSION F: Contrast Black/White
function VersionF() {
  return (
    <div className="w-full h-full bg-black flex flex-col">
      {/* Top Section - STOP */}
      <div className="flex-1 flex flex-col items-center justify-center bg-red-600 p-12">
        <div className="text-[180px] mb-6">🛑</div>
        <h1 className="text-[160px] font-black text-white leading-none">
          STOP
        </h1>
      </div>

      {/* Middle Section - Message */}
      <div className="bg-white p-16 text-center">
        <p className="text-7xl font-black text-gray-900 mb-6 leading-tight">
          Než začneš podnikat,<br/>potřebuješ Čtvrtku
        </p>
      </div>

      {/* Bottom Section - Info */}
      <div className="flex-1 bg-black p-12 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="bg-red-600 rounded-3xl p-10 text-center">
            <p className="text-6xl mb-4">❌</p>
            <p className="text-4xl font-black text-white mb-3">
              DESETITISÍCE
            </p>
            <p className="text-2xl text-white/80">
              bez testu
            </p>
          </div>
          
          <div className="bg-emerald-500 rounded-3xl p-10 text-center">
            <p className="text-6xl mb-4">✅</p>
            <p className="text-4xl font-black text-white mb-3">
              TEST PŘED
            </p>
            <p className="text-2xl text-white/80">
              s Čtvrtkou
            </p>
          </div>
        </div>

        <div className="flex gap-6 justify-center">
          <div className="bg-white rounded-2xl px-10 py-6">
            <p className="text-4xl font-black text-emerald-600">27 podnikatelů</p>
          </div>
          <div className="bg-white rounded-2xl px-10 py-6">
            <p className="text-4xl font-black text-purple-600">1,4 mil. Kč</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Value3NewDesigns() {
  const [currentVersion, setCurrentVersion] = useState(0);
  
  const versions = [
    { name: 'A: Bold Minimalist', description: 'Velký text, jednoduché', component: <VersionA /> },
    { name: 'B: Card Stack', description: 'Tři kartičky přes sebe', component: <VersionB /> },
    { name: 'C: Story Vertical', description: 'Instagram Story style', component: <VersionC /> },
    { name: 'D: Big Number', description: 'Velká čísla a kontrast', component: <VersionD /> },
    { name: 'E: Simple Bold', description: 'Jednoduchý bold text', component: <VersionE /> },
    { name: 'F: Black/White', description: 'Černobílý kontrast', component: <VersionF /> },
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
            🎨 VALUE #3 - NOVÉ DESIGNY
          </h1>
          <p className="text-2xl text-gray-600 mb-2">
            Úplně jiné přístupy - větší, čitelnější! 🚀
          </p>
          <p className="text-xl text-gray-500">
            Vyber si design a řekni číslo!
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
                  <p className="font-black">{version.name}</p>
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
      </div>
    </div>
  );
}
