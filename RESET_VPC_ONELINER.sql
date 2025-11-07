-- ⚡ ONE-LINER: SMAZAT VPC DATA (zkopíruj a spusť)

DELETE FROM public.value_proposition_canvas WHERE user_id = auth.uid()::text;
