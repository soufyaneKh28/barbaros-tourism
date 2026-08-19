-- RUN THIS IN YOUR SUPABASE SQL EDITOR
-- Adds a generic key/value content table so the admin portal can edit
-- static page content (titles, descriptions, images, contact details, etc.)
-- without touching code.

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Access" ON site_content;
CREATE POLICY "Public Read Access" ON site_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth Manage Access" ON site_content;
CREATE POLICY "Auth Manage Access" ON site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed empty rows for every editable section. Values stay empty until an
-- admin edits them in /portal-manage/website-content; the app falls back to
-- the current hard-coded copy until then. ON CONFLICT DO NOTHING means this
-- is safe to re-run even if some rows already exist.
INSERT INTO site_content (key, data) VALUES
  -- Homepage
  ('home_hero', '{}'),
  ('home_quick_actions', '{}'),
  ('home_hot_deals', '{}'),
  ('home_featured_programs', '{}'),
  ('home_testimonials', '{}'),
  ('home_video_section', '{}'),
  ('home_partners', '{}'),
  ('home_blogs', '{}'),
  -- About Us
  ('about_hero', '{}'),
  ('about_story', '{}'),
  ('about_stats', '{}'),
  ('about_why_choose', '{}'),
  -- Contact Us
  ('contact_hero', '{}'),
  ('contact_form', '{}'),
  ('contact_info', '{}'),
  ('contact_map', '{}'),
  -- Our Services
  ('services_hero', '{}'),
  ('services_offerings', '{}'),
  ('services_cta', '{}'),
  -- Tours
  ('tours_hero', '{}'),
  ('tours_carousel_headers', '{}'),
  ('daily_tours_hero', '{}'),
  ('daily_tours_content', '{}'),
  -- Medical Tourism
  ('medical_hero', '{}'),
  ('medical_why_choose', '{}'),
  -- Immigration
  ('immigration_hero', '{}'),
  ('immigration_citizenship_header', '{}'),
  ('immigration_residence_header', '{}'),
  ('immigration_cta', '{}'),
  -- Special Packages
  ('special_packages_hero', '{}'),
  ('special_packages_content', '{}'),
  -- VIP Programs
  ('vip_programs_hero', '{}'),
  ('vip_programs_content', '{}'),
  -- VIP Tourism Services
  ('vip_tourism_services_hero', '{}'),
  ('vip_tourism_services_content', '{}'),
  -- Programs
  ('programs_hero', '{}'),
  ('programs_content', '{}'),
  -- Blog
  ('blogs_hero', '{}'),
  ('blogs_content', '{}'),
  -- Global
  ('footer_content', '{}'),
  ('global_settings', '{}')
ON CONFLICT (key) DO NOTHING;
