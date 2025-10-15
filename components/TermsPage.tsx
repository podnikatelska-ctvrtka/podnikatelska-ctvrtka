export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl mb-8">Obchodní podmínky</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Poslední aktualizace: 13. října 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">1. Základní ustanovení</h2>
            <p>
              Tyto obchodní podmínky (dále jen „podmínky") upravují vztahy mezi prodávajícím 
              a kupujícím při nákupu online kurzu „Podnikatelská Čtvrtka" prostřednictvím 
              webové stránky <strong>podnikatelskactvrtka.cz</strong>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">2. Prodávající</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-2"><strong>Obchodní jméno:</strong> Iting s.r.o.</p>
              <p className="mb-2"><strong>IČO:</strong> 25970631</p>
              <p className="mb-2"><strong>DIČ:</strong> CZ25970631</p>
              <p className="mb-2"><strong>Sídlo:</strong> Vančurova 2710, Dvůr Králové nad Labem</p>
              <p className="mb-2"><strong>Email:</strong> kurz@podnikatelskactvrtka.cz</p>
              <p className="mb-2"><strong>Telefon:</strong> +420 724 162 016</p>
              <p className="mb-2"><strong>Kontaktní osoba:</strong> Josef Čipera</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">3. Předmět prodeje</h2>
            <p>
              Předmětem prodeje je online kurz „Podnikatelská Čtvrtka", který obsahuje:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>3 moduly s video lekcemi a textovými materiály</li>
              <li>Interaktivní nástroje (Business Model Canvas, Value Proposition Canvas)</li>
              <li>Galerie reálných business modelů (kavárna, posilovna, pizzerie...)</li>
              <li>Personalizovaný akční plán na 30 dní</li>
              <li>Lifetime přístup k obsahu kurzu</li>
              <li>Průběžné updaty s novými příklady byznysu</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">4. Cena a platební podmínky</h2>
            <p className="mb-3">
              Cena kurzu je uvedena na webové stránce včetně DPH. Kupující má možnost zaplatit:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Platební kartou (Visa, Mastercard, Maestro)</li>
              <li>Bankovním převodem</li>
              <li>Apple Pay nebo Google Pay</li>
            </ul>
            <p className="mt-3">
              Platba je zpracována přes zabezpečenou platební bránu GoPay.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">5. Dodání kurzu</h2>
            <p>
              Přístup ke kurzu je poskytnut okamžitě po potvrzení platby, nejpozději do 24 hodin. 
              Přihlašovací údaje jsou zaslány na emailovou adresu uvedenou při objednávce.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">6. Právo na odstoupení od smlouvy</h2>
            <p className="mb-3">
              Kupující má právo odstoupit od smlouvy do <strong>14 dnů</strong> od okamžiku jejího 
              uzavření (obdržení přístupu ke kurzu) bez udání důvodu.
            </p>
            
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 mb-4">
              <p className="mb-2">
                <strong>⚠️ Podmínky pro vrácení peněz:</strong>
              </p>
              <p className="text-sm">
                Plná refundace je možná pouze pokud:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                <li>Nedošlo k absolvování více než 20% obsahu kurzu (max. 1 modul z 3)</li>
                <li>Nebyly zkopírovány business modely z galerie</li>
                <li>Nebyly vyplněny interaktivní nástroje (Business Model Canvas, Value Proposition Canvas)</li>
              </ul>
            </div>
            
            <p className="mb-3">
              Pokud kupující odstoupí od smlouvy ve lhůtě 14 dnů a splňuje výše uvedené podmínky, 
              prodávající vrátí kupujícímu všechny platby, které od něj obdržel, a to do 14 dnů 
              od doručení odstoupení.
            </p>
            
            <p className="mb-3 text-sm text-gray-600">
              <strong>Zdůvodnění:</strong> Kurz obsahuje kompletní know-how a praktické nástroje, 
              které lze aplikovat okamžitě. Pokud student absolvuje celý kurz, získá veškeré znalosti 
              a materiály, které jsou předmětem prodeje. V takovém případě není možné odstoupit 
              od smlouvy a vrátit peníze, protože by se jednalo o zneužití práva na odstoupení 
              (§ 1813 občanského zákoníku - nesplnění dobré víry).
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
              <p className="text-sm">
                <strong>💡 Jak odstoupit:</strong> Napište email na{' '}
                <a href="mailto:kurz@podnikatelskactvrtka.cz" className="text-blue-600 hover:underline">
                  kurz@podnikatelskactvrtka.cz
                </a>{' '}
                s předmětem "Odstoupení od smlouvy" a uveďte číslo objednávky. 
                Zkontrolujeme progress ve vašem účtu a pokud splňujete podmínky, vrátíme platbu do 14 dnů.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">7. Ochrana osobních údajů</h2>
            <p>
              Zpracování osobních údajů se řídí{' '}
              <a href="/ochrana-udaju" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                Zásadami ochrany osobních údajů
              </a>
              , které jsou v souladu s nařízením GDPR.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">8. Reklamace</h2>
            <p className="mb-3">
              V případě problémů s přístupem ke kurzu nebo technických problémů kontaktujte 
              podporu na emailu{' '}
              <a href="mailto:kurz@podnikatelskactvrtka.cz" className="text-orange-600 hover:underline">
                kurz@podnikatelskactvrtka.cz
              </a>.
            </p>
            <p>
              Reklamace bude vyřízena do 30 dnů od jejího obdržení.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">9. Autorská práva</h2>
            <p>
              Veškerý obsah kurzu (videa, texty, nástroje, šablony) je chráněn autorským právem. 
              Kupující získává nevýhradní licenci k osobnímu použití obsahu kurzu. 
              Sdílení, kopírování nebo další šíření obsahu je zakázáno.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">10. Závěrečná ustanovení</h2>
            <p className="mb-3">
              Tyto obchodní podmínky nabývají účinnosti dnem 13. října 2025. 
              Prodávající si vyhrazuje právo tyto podmínky změnit. 
              Aktuální znění je vždy dostupné na webové stránce.
            </p>
            <p>
              Vztahy těmito podmínkami neupravené se řídí právním řádem České republiky, 
              zejména zákonem č. 89/2012 Sb., občanský zákoník.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">11. Kontakt</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-2"><strong>Společnost:</strong> Iting s.r.o.</p>
              <p className="mb-2"><strong>Kontaktní osoba:</strong> Josef Čipera</p>
              <p className="mb-2"><strong>Email:</strong>{' '}
                <a href="mailto:kurz@podnikatelskactvrtka.cz" className="text-orange-600 hover:underline">
                  kurz@podnikatelskactvrtka.cz
                </a>
              </p>
              <p className="mb-2"><strong>Telefon:</strong> +420 724 162 016</p>
              <p><strong>Adresa:</strong> Vančurova 2710, Dvůr Králové nad Labem</p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Tyto obchodní podmínky jsou platné od 13. října 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
