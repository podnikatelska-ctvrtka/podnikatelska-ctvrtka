import { Gift, TrendingUp, Users } from "lucide-react";

export default function AdCreative1Export() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 relative overflow-hidden flex items-center justify-center p-16">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      
      {/* Urgence badge */}
      <div className="absolute top-12 right-12 bg-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl">
        <p className="font-black text-2xl">PRVNÍCH 50 MÍST!</p>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Hlavní číslo */}
        <div className="mb-8">
          <div className="text-[160px] font-black text-white leading-none tracking-tight drop-shadow-2xl">
            7.999 Kč
          </div>
          <div className="text-5xl font-bold text-yellow-300 mt-4 drop-shadow-lg">
            UŠETŘÍTE
          </div>
          <div className="text-4xl font-semibold text-white/90 mt-2">
            jako PRŮKOPNÍK
          </div>
        </div>
        
        {/* Benefity */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-center gap-4 text-white text-2xl font-semibold">
            <Gift className="w-8 h-8 text-yellow-300" />
            <span>Mini kurz ZDARMA (2.999 Kč)</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-white text-2xl font-semibold">
            <TrendingUp className="w-8 h-8 text-green-300" />
            <span>Sleva 62% (7.999 Kč úspora)</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-white text-2xl font-semibold">
            <Users className="w-8 h-8 text-blue-300" />
            <span>Konzultace ZDARMA (50×)</span>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 rounded-2xl inline-block shadow-2xl">
          <p className="text-3xl font-black">REZERVOVAT MÍSTO →</p>
        </div>
        
        {/* Subtext */}
        <p className="text-white/80 text-xl mt-6 font-medium">
          ⏰ Zbývá jen pár míst!
        </p>
      </div>
    </div>
  );
}
