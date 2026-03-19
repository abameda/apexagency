-- Payment methods table
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  account_name TEXT NOT NULL,
  handle TEXT,
  qr_code_url TEXT,
  direct_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  payment_method_id UUID NOT NULL REFERENCES payment_methods(id),
  screenshot_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  price_paid NUMERIC NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('EGP', 'USD')),
  region TEXT NOT NULL CHECK (region IN ('egypt', 'international')),
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);

-- Settings table (key-value)
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Initial settings
INSERT INTO settings (key, value) VALUES
  ('price_egypt', '10000'),
  ('price_international', '99'),
  ('currency_egypt', 'EGP'),
  ('currency_international', 'USD');

-- Initial payment methods
INSERT INTO payment_methods (name, account_name, handle, display_order) VALUES
  ('InstaPay', 'APEX Agency', '@apex-agency', 1),
  ('PayPal', 'APEX Agency', 'pay@apexagency.com', 2),
  ('Smart Wallet', 'APEX Agency', '0100 000 0000', 3),
  ('Telda', 'APEX Agency', '@apex', 4);

-- Indexes
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public can insert orders (for the landing page form)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Only authenticated admins can read/update orders
CREATE POLICY "Admins can read orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true);

-- Public can read active payment methods
CREATE POLICY "Anyone can read active payment methods"
  ON payment_methods FOR SELECT
  USING (is_active = true);

-- Admins can read ALL payment methods (including inactive)
CREATE POLICY "Admins can read all payment methods"
  ON payment_methods FOR SELECT
  TO authenticated
  USING (true);

-- Admins can manage payment methods
CREATE POLICY "Admins can insert payment methods"
  ON payment_methods FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update payment methods"
  ON payment_methods FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete payment methods"
  ON payment_methods FOR DELETE
  TO authenticated
  USING (true);

-- Public can read settings (for prices)
CREATE POLICY "Anyone can read settings"
  ON settings FOR SELECT
  USING (true);

-- Admins can update settings
CREATE POLICY "Admins can update settings"
  ON settings FOR UPDATE
  TO authenticated
  USING (true);

-- Storage buckets (run in Supabase dashboard or via API)
-- screenshots: public upload, private read
-- theme-files: private
-- payment-qr: public read
