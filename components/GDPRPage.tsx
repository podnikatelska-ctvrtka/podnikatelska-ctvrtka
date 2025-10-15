export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl mb-8">Ochrana osobních údajů (GDPR)</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Poslední aktualizace: 13. října 2025
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
            <p>
              Vážíme si vaší důvěry a bereme vážně ochranu vašich osobních údajů. 
              Tento dokument popisuje, jak zpracováváme vaše osobní údaje v souladu 
              s nařízením GDPR (General Data Protection Regulation).
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">1. Správce osobních údajů</h2>
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
            <h2 className="text-2xl mb-4">2. Jaké osobní údaje zpracováváme</h2>
            
            <h3 className="text-xl mb-3 mt-6">2.1 Při registraci k mini kurzu:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email</li>
            </ul>

            <h3 className="text-xl mb-3 mt-6">2.2 Při nákupu kurzu:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Jméno a příjmení</li>
              <li>Email</li>
              <li>Telefon (volitelné)</li>
              <li>Fakturační údaje (název firmy, IČO, DIČ) – pouze při nákupu na firmu</li>
            </ul>

            <h3 className="text-xl mb-3 mt-6">2.3 Automaticky sbíraná data:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP adresa</li>
              <li>Typ prohlížeče a zařízení</li>
              <li>Čas a datum návštěvy</li>
              <li>Navštívené stránky</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">3. Účel zpracování osobních údajů</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Poskytnutí přístupu k mini kurzu a platnému kurzu</li>
              <li>Zasílání emailové komunikace (mini kurz, marketingové nabídky)</li>
              <li>Zpracování plateb a vystavení faktur</li>
              <li>Plnění zákonných povinností (účetnictví, archivace)</li>
              <li>Zlepšování našich služeb a webové stránky</li>
              <li>Zasílání newsletteru (pouze se souhlasem)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">4. Právní základ zpracování</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Plnění smlouvy</strong> – poskytnutí kurzu a služeb</li>
              <li><strong>Souhlas</strong> – zasílání marketingové komunikace</li>
              <li><strong>Oprávněný zájem</strong> – analýza návštěvnosti, zlepšování služeb</li>
              <li><strong>Zákonná povinnost</strong> – účetnictví, archivace dokladů</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">5. Doba zpracování</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Údaje k přístupu ke kurzu:</strong> Po dobu trvání licence (lifetime)</li>
              <li><strong>Fakturační údaje:</strong> 10 let (zákonná povinnost)</li>
              <li><strong>Marketingová komunikace:</strong> Do odvolání souhlasu</li>
              <li><strong>Analytická data:</strong> 26 měsíců (Google Analytics)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">6. Komu předáváme osobní údaje</h2>
            <p className="mb-3">Vaše osobní údaje můžeme předat třetím stranám pouze v nezbytném rozsahu:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>FAPI.cz</strong> – platební brána a správa objednávek</li>
              <li><strong>GoPay</strong> – zpracování plateb</li>
              <li><strong>Smartemailing</strong> – zasílání emailové komunikace</li>
              <li><strong>Google Analytics</strong> – analýza návštěvnosti (anonymizovaná data)</li>
              <li><strong>Netlify</strong> – hosting webové stránky</li>
            </ul>
            <p className="mt-3">
              Všichni zpracovatelé dodržují nařízení GDPR a jsou s námi vázáni smlouvou o zpracování osobních údajů.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">7. Vaše práva</h2>
            <p className="mb-3">Máte právo:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Právo na přístup</strong> – zjistit, jaké údaje o vás zpracováváme</li>
              <li><strong>Právo na opravu</strong> – opravit nepřesné údaje</li>
              <li><strong>Právo na výmaz</strong> – požádat o smazání údajů („právo být zapomenut")</li>
              <li><strong>Právo na omezení zpracování</strong> – omezit způsob zpracování</li>
              <li><strong>Právo na přenositelnost</strong> – získat data ve strojově čitelném formátu</li>
              <li><strong>Právo na odvolání souhlasu</strong> – kdykoli odvolat souhlas se zpracováním</li>
              <li><strong>Právo podat stížnost</strong> – u Úřadu pro ochranu osobních údajů (uoou.cz)</li>
            </ul>
            
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-4">
              <p className="text-sm">
                <strong>💡 Jak uplatnit svá práva:</strong> Napište email na{' '}
                <a href="mailto:kurz@podnikatelskactvrtka.cz" className="text-green-600 hover:underline">
                  kurz@podnikatelskactvrtka.cz
                </a>{' '}
                s předmětem "GDPR - Uplatnění práv".
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">8. Zabezpečení osobních údajů</h2>
            <p className="mb-3">Chráníme vaše osobní údaje pomocí:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL šifrování (HTTPS) na celém webu</li>
              <li>Zabezpečené databáze s přístupovými právy</li>
              <li>Pravidelné bezpečnostní aktualizace</li>
              <li>Šifrování citlivých dat</li>
              <li>Pravidelné zálohy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">9. Cookies</h2>
            <p className="mb-3">
              Používáme cookies pro zlepšení funkčnosti webu a analýzu návštěvnosti. 
              Cookies můžete kdykoli odmítnout v nastavení prohlížeče.
            </p>
            
            <h3 className="text-xl mb-3 mt-6">Typy cookies:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nezbytné cookies</strong> – funkčnost webu (přihlášení, košík)</li>
              <li><strong>Analytické cookies</strong> – Google Analytics (anonymizované)</li>
              <li><strong>Marketingové cookies</strong> – Facebook Pixel, Google Ads (pouze se souhlasem)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">10. Změny těchto zásad</h2>
            <p>
              Tyto zásady můžeme čas od času aktualizovat. O významných změnách vás budeme 
              informovat emailem nebo oznámením na webu. Aktuální verze je vždy dostupná 
              na této stránce.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl mb-4">11. Kontakt</h2>
            <p className="mb-3">
              Máte-li jakékoliv dotazy ohledně zpracování osobních údajů, kontaktujte nás:
            </p>
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
              Tyto zásady ochrany osobních údajů jsou platné od 13. října 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
