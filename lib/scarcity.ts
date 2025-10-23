/**
 * 🎯 FAKE SCARCITY SYSTEM (EVERGREEN) - LANDING PAGE
 * 
 * Simuluje "zbývající místa" bez databáze.
 * Číslo se snižuje postupně podle času od první návštěvy uživatele.
 * 
 * ⚠️ DŮLEŽITÉ:
 * - Tento systém je ODDĚLENÝ od 24h countdown timeru na /objednavka!
 * - Používá vlastní localStorage klíč: 'pvs_scarcity_start'
 * - Countdown timer na /objednavka používá: 'pvs_start_time'
 * 
 * FUNKCE:
 * - Evergreen countdown od první návštěvy landing page
 * - Místa ubývají 3 za hodinu
 * - Po 17h → plné → waitlist modal
 * 
 * NASTAVENÍ:
 * - INITIAL_SPOTS: Počet míst na začátku (50)
 * - SPOTS_PER_HOUR: Kolik míst "zmizí" každou hodinu (3)
 * 
 * TIMELINE (od první návštěvy LANDING PAGE):
 * - 0h: 50 míst → "STAŇTE SE PRŮKOPNÍKEM!"
 * - 6h: ~32 míst → stále early bird
 * - 12h: ~14 míst → blíží se konec
 * - 17h: 0 míst → "MÍSTA OBSAZENA" → WAITLIST
 */

export function getRemainingSpots(): number {
  const INITIAL_SPOTS = 50;
  const MIN_SPOTS = 0; // Může klesnout na 0!
  const SPOTS_PER_HOUR = 3; // Průměrně 3 místa za hodinu
  
  // 🎯 VLASTNÍ localStorage klíč pro SCARCITY (ne countdown!)
  // Tento systém je ODDĚLENÝ od 24h countdown na /objednavka
  let startTime = localStorage.getItem('pvs_scarcity_start');
  
  if (!startTime) {
    // První návštěva - nastav start time na TEĎ
    const now = Date.now();
    localStorage.setItem('pvs_scarcity_start', now.toString());
    startTime = now.toString();
  }
  
  const campaignStart = parseInt(startTime, 10);
  const now = Date.now();
  const hoursSinceStart = Math.floor(
    (now - campaignStart) / (1000 * 60 * 60)
  );
  
  // Počet míst která už "zmizela"
  const spotsTaken = hoursSinceStart * SPOTS_PER_HOUR;
  
  // Zbývající místa
  const remaining = Math.max(MIN_SPOTS, INITIAL_SPOTS - spotsTaken);
  
  // ⚠️ REMOVED: Random offset způsoboval nesynchronizaci mezi komponentami!
  // Každé volání getRemainingSpots() vracelo jiné číslo (48 vs 49 vs 50)
  // Pro konzistenci napříč celou stránkou: ŽÁDNÁ randomizace
  
  return remaining;
}

/**
 * Kontrola jestli je kampaň "plná"
 */
export function isCampaignFull(): boolean {
  return getRemainingSpots() === 0;
}

/**
 * Progresivní barva podle urgence
 */
export function getUrgencyColor(spots: number): string {
  if (spots === 0) return 'bg-red-500'; // Plné
  if (spots <= 10) return 'bg-red-500'; // Kritické
  if (spots <= 20) return 'bg-orange-500'; // Vysoké
  if (spots <= 35) return 'bg-yellow-500'; // Střední
  return 'bg-blue-500'; // Normální
}

/**
 * Text urgence podle zbývajících míst
 */
export function getUrgencyText(spots: number): string {
  if (spots === 0) return '⚠️ VŠECH 50 MÍST OBSAZENO!';
  if (spots <= 5) return `⚠️ POZOR! Zbývá pouze ${spots} ${spots === 1 ? 'místo' : 'místa'}!`;
  if (spots <= 10) return `⚠️ Rychle! Zbývá ${spots} míst!`;
  if (spots <= 20) return `⚠️ Zbývá pouze ${spots} míst`;
  return `Zbývá ${spots} míst v prvním běhu`;
}
