-- Create Programs Table
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title JSONB NOT NULL DEFAULT '{}'::jsonb,
  slug TEXT UNIQUE NOT NULL,
  description JSONB DEFAULT '{}'::jsonb,
  duration_text JSONB DEFAULT '{}'::jsonb,
  accommodation_type JSONB DEFAULT '{}'::jsonb,
  includes JSONB DEFAULT '{}'::jsonb, -- Store as { "en": ["item1"], "tr": ["item2"] }
  excludes JSONB DEFAULT '{}'::jsonb, -- Store as { "en": ["item1"], "tr": ["item2"] }
  itinerary JSONB DEFAULT '[]'::jsonb, -- detailed program
  main_image TEXT,
  images TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for programs
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access" ON programs FOR SELECT USING (true);
CREATE POLICY "Auth Manage Access" ON programs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Remove Destination ID from Trips
ALTER TABLE trips DROP COLUMN IF EXISTS destination_id;

-- Drop Destinations Table
DROP TABLE IF EXISTS destinations;
