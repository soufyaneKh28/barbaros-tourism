-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- 4. Create Trips Table
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  price DECIMAL NOT NULL,
  duration_days INTEGER NOT NULL,
  images TEXT[] DEFAULT '{}',
  location TEXT,
  itinerary JSONB DEFAULT '[]',
  includes TEXT[] DEFAULT '{}',
  excludes TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_name TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Basic RLS (Row Level Security) - Allowing public read access for now
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access" ON destinations FOR SELECT USING (true);
CREATE POLICY "Auth Manage Access" ON destinations FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON categories FOR SELECT USING (true);
CREATE POLICY "Auth Manage Access" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON trips FOR SELECT USING (true);
CREATE POLICY "Auth Manage Access" ON trips FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public Read Access" ON blogs FOR SELECT USING (true);
CREATE POLICY "Auth Manage Access" ON blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
