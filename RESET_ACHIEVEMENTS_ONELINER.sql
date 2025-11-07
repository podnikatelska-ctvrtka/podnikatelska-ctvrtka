-- ⚡ ONE-LINER: SMAZAT ACHIEVEMENTY Z MODULU 2 A 3 (zachovat Modul 1)
-- Zkopíruj celý řádek a spusť v Supabase SQL Editor:

DELETE FROM public.user_achievements WHERE user_id = auth.uid() AND achievement_type IN ('validator-used','profit-calculated','module-2-complete','customer-profile-complete','value-map-complete','fit-70-percent','product-fit-master','fit-90-percent','module-3-complete','master-of-tools','ultimate-master');
