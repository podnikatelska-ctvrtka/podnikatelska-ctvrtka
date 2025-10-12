-- Value Proposition Canvas storage table
CREATE TABLE IF NOT EXISTS value_proposition_canvas (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  segment_name TEXT DEFAULT 'Můj segment',
  selected_value TEXT NULL, -- NULL = Customer Profile, ne-NULL = Value Map pro konkrétní hodnotu
  jobs JSONB DEFAULT '[]',
  pains JSONB DEFAULT '[]',
  gains JSONB DEFAULT '[]',
  products JSONB DEFAULT '[]',
  pain_relievers JSONB DEFAULT '[]',
  gain_creators JSONB DEFAULT '[]',
  fit_validation_data JSONB DEFAULT NULL, -- Pro uložení FIT Validation progress (Step 2 + 3)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Přidej sloupce pokud ještě neexistují (pro existující databáze)
ALTER TABLE value_proposition_canvas ADD COLUMN IF NOT EXISTS selected_value TEXT NULL;
ALTER TABLE value_proposition_canvas ADD COLUMN IF NOT EXISTS fit_validation_data JSONB DEFAULT NULL;

-- Index pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_vpc_user_id ON value_proposition_canvas(user_id);

-- RLS policies
ALTER TABLE value_proposition_canvas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own VPC" ON value_proposition_canvas;
CREATE POLICY "Users can view own VPC"
  ON value_proposition_canvas FOR SELECT
  USING (user_id = (SELECT id FROM users WHERE auth_token = current_setting('request.jwt.claim.sub', true)::text));

DROP POLICY IF EXISTS "Users can insert own VPC" ON value_proposition_canvas;
CREATE POLICY "Users can insert own VPC"
  ON value_proposition_canvas FOR INSERT
  WITH CHECK (user_id = (SELECT id FROM users WHERE auth_token = current_setting('request.jwt.claim.sub', true)::text));

DROP POLICY IF EXISTS "Users can update own VPC" ON value_proposition_canvas;
CREATE POLICY "Users can update own VPC"
  ON value_proposition_canvas FOR UPDATE
  USING (user_id = (SELECT id FROM users WHERE auth_token = current_setting('request.jwt.claim.sub', true)::text));

-- Trigger pro automatické updatování updated_at
CREATE OR REPLACE FUNCTION update_vpc_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS vpc_updated_at ON value_proposition_canvas;
CREATE TRIGGER vpc_updated_at
  BEFORE UPDATE ON value_proposition_canvas
  FOR EACH ROW
  EXECUTE FUNCTION update_vpc_updated_at();
