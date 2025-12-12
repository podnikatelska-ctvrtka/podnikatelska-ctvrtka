import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function BottomCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        
        <h2 className="text-4xl md:text-5xl text-white mb-6">
          Připraven na další krok?
        </h2>
        
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          90 minut práce = Celý model podnikání na 1 listu papíru
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-white/20">
          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div>
              <div className="text-3xl mb-2">📋</div>
              <p className="font-semibold">Model na 1 listu</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <p className="font-semibold">Konkrétní kroky</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💰</div>
              <p className="font-semibold">Fixní 4999 Kč</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => window.location.hash = 'objednavka'}
          className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-7 text-xl rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
          <span>CHCI ČTVRTKU</span>
          <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="mt-6 text-white/60 text-sm">
          Bez DPH • Bez slev • Bez bullshitů
        </p>
      </div>
    </section>
  );
}
