import React from 'react';
import { Package, Building2, Megaphone, Users } from 'lucide-react';

export function OrganicPost17MythBusterVisual() {
  const myths = [
    {
      icon: Package,
      title: "Objednat tisíce kusů napřed",
      subtitle: "Nemusíš investovat do výroby. Stačí ověřit ŽE to někdo chce."
    },
    {
      icon: Building2,
      title: "Pronajmout si prostor hned",
      subtitle: "Nepotřebuješ kancelář. Potřebuješ PRVNĚ vědět že to funguje."
    },
    {
      icon: Megaphone,
      title: "Čekat se spuštěním než začneš marketing",
      subtitle: "Nemusíš mít hotovo. Marketing může běžet UŽ TEĎ."
    },
    {
      icon: Users,
      title: "Najmout tým na začátku",
      subtitle: "Nepotřebuješ lidi. Potřebuješ vědět CO vůbec dělat."
    }
  ];

  return (
    <div className="w-[1080px] h-[1080px] bg-white flex flex-col">
      {/* Header */}
      <div className="text-center pt-20 pb-12 px-12">
        <div className="text-red-600 text-[20px] mb-6 tracking-wide">
          ❌ CO NEPOTŘEBUJEŠ
        </div>
        <h1 className="text-[56px] leading-tight mb-4">
          K úspěšnému podnikání
        </h1>
        <p className="text-[22px] text-gray-600">
          Většina lidí prohodí tisíce na startu. Ty to můžeš udělat chytřeji.
        </p>
      </div>

      {/* 4 Myth Rows - SHARP design, no rounded cards */}
      <div className="flex-1 px-16 py-8 space-y-8">
        {myths.map((myth, index) => (
          <div 
            key={index}
            className="flex items-start gap-6 pb-8 border-b-2 border-gray-200 last:border-b-0"
          >
            <div className="shrink-0 bg-red-50 p-4">
              <myth.icon size={36} strokeWidth={2} className="text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-red-600 text-[36px] leading-none">❌</div>
                <h3 className="text-[24px] line-through decoration-red-500 decoration-2">
                  {myth.title}
                </h3>
              </div>
              <p className="text-gray-700 text-[18px] leading-relaxed">
                {myth.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer - SHARP blue bar */}
      <div className="bg-blue-600 px-12 py-10 text-center">
        <p className="text-white text-[21px] mb-3">
          Model ti ukáže <span className="font-bold">CO doopravdy potřebuješ</span> a <span className="font-bold">KDE začít</span>.
        </p>
        <div className="text-blue-100 text-[17px]">
          27 podnikatelů už BEZPEČNĚ investovalo 1,4M Kč do svých byznysů.
        </div>
      </div>
    </div>
  );
}
