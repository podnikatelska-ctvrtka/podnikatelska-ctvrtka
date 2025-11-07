// ⚡ KONZOLE SCRIPT - KOMPLETNÍ RESET
// 
// Zkopíruj CELÝ tento soubor a vlož do Console (F12)
// Tento script vyčistí localStorage a pak ti řekne, co dělat dál.

(async () => {
  const userId = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';
  const storageKey = `achievements_${userId}`;
  
  console.log('🚀 Starting achievement reset...');
  console.log('📍 User ID:', userId);
  
  // KROK 1: Zkontroluj současný stav
  const before = localStorage.getItem(storageKey);
  if (before) {
    const beforeData = JSON.parse(before);
    console.log('📊 PŘED: localStorage obsahuje', beforeData.length, 'achievements:', beforeData);
  } else {
    console.log('📊 PŘED: localStorage je prázdný');
  }
  
  // KROK 2: Vyčisti localStorage
  localStorage.removeItem(storageKey);
  console.log('✅ KROK 1/3: localStorage vyčištěn!');
  
  // KROK 3: Ověř vyčištění
  const after = localStorage.getItem(storageKey);
  if (after === null) {
    console.log('✅ Ověřeno: localStorage je nyní prázdný');
  } else {
    console.warn('⚠️ VAROVÁNÍ: localStorage se nepodařilo vyčistit!');
  }
  
  // KROK 4: Instrukce pro Supabase
  console.log('\n📋 KROK 2/3: TEĎ PŘEJDI DO SUPABASE SQL EDITOR');
  console.log('Zkopíruj a spusť tento SQL:\n');
  console.log(`DELETE FROM public.user_achievements 
WHERE user_id = '${userId}'
AND achievement_type IN (
  'validator-used',
  'profit-calculated',
  'module-2-complete',
  'customer-profile-complete',
  'value-map-complete',
  'fit-70-percent',
  'product-fit-master',
  'fit-90-percent',
  'module-3-complete',
  'master-of-tools',
  'ultimate-master'
);`);
  
  console.log('\n📋 KROK 3/3: PO SPUŠTĚNÍ SQL ZADEJ:');
  console.log('location.reload();');
  
  console.log('\n✅ HOTOVO! Achievements budou smazány po dokončení všech 3 kroků.');
})();
