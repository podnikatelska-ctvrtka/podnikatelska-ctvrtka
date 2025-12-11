// ZÁSILKOVNA CASE STUDY AD - Jak postavit giganta pomocí modelu podnikání

export function ZasilkovnaAdOmnipresent() {
  return (
    <div className="h-full bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-700 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      {/* BADGE nahoře */}
      <div className="mb-8 relative z-10">
        <div className="bg-white text-orange-700 px-8 py-3 rounded-full shadow-2xl border-4 border-orange-900">
          <p className="font-black text-2xl">
            🎯 UKÁZKA APLIKACE MODELU
          </p>
        </div>
      </div>

      {/* Main headline */}
      <h1 className="text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl relative z-10">
        Takhle přemýšleli<br/>
        <span className="text-yellow-200">o svém byznysu</span><br/>
        v Zásilkovně
      </h1>

      {/* Subheadline */}
      <p className="text-3xl text-white/90 mb-10 max-w-3xl relative z-10">
        <span className="font-bold">Inspirace ze silného modelu</span> • Principy které fungují
      </p>

      {/* Key insights */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 mb-10 max-w-4xl w-full shadow-2xl relative z-10">
        <div className="space-y-6 text-left">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xl">
              1
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 mb-1">Jasná hodnota pro zákazníky</p>
              <p className="text-xl text-gray-600">Levné a flexibilní doručování co nejblíže k zákazníkovi</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xl">
              2
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 mb-1">Našli díru na trhu</p>
              <p className="text-xl text-gray-600">Využili obchody a benzínky místo budování flotily aut</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xl">
              3
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 mb-1">Odstranili největší bolesti zákazníka</p>
              <p className="text-xl text-gray-600">Fronty na poště, naštvaní zákazníci, ztráta času - tohle všechno vyřešili</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section - SIMPLE */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-10 py-6 shadow-2xl max-w-2xl w-full relative z-10">
        <p className="text-3xl font-black text-gray-900 mb-2">
          📖 Přečíst celý příběh
        </p>
        <p className="text-lg text-gray-600">
          Jak to dokázali + principy pro tvůj byznys
        </p>
      </div>
    </div>
  );
}