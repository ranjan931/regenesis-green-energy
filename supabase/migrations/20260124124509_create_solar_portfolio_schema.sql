-- =====================================================
-- EXTENSIONS
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  capacity text NOT NULL,
  image_url text NOT NULL,
  status text NOT NULL DEFAULT 'Operational',
  completion_date date,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- ADD UNIQUE CONSTRAINT (FIXES YOUR ERROR)
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'projects_title_unique'
  ) THEN
    ALTER TABLE projects
    ADD CONSTRAINT projects_title_unique UNIQUE (title);
  END IF;
END $$;

-- =====================================================
-- SITE CONTENT TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text UNIQUE NOT NULL,
  title text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  image_url text DEFAULT '',
  data jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- ADMIN USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

-- =====================================================
-- ENABLE RLS
-- =====================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PUBLIC READ POLICIES
-- =====================================================
CREATE POLICY "Public read projects"
ON projects FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Public read site content"
ON site_content FOR SELECT
TO anon, authenticated
USING (true);

-- =====================================================
-- ADMIN WRITE POLICIES
-- =====================================================
CREATE POLICY "Admin manage projects"
ON projects
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  )
);

CREATE POLICY "Admin manage site content"
ON site_content
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  )
);

-- =====================================================
-- DEFAULT SITE CONTENT (UPSERT)
-- =====================================================
INSERT INTO site_content (section, title, content, data) VALUES
(
  'hero',
  'Powering Tomorrow with Clean Energy',
  'Leading the renewable energy revolution with innovative solar solutions across the globe',
  '{"subtitle":"Sustainable. Reliable. Future-Ready."}'
),
(
  'about',
  'About Our Mission',
  'We are committed to accelerating the transition to sustainable energy through cutting-edge solar power solutions.',
  '{}'
)
ON CONFLICT (section)
DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  data = EXCLUDED.data,
  updated_at = now();

-- =====================================================
-- PROJECTS DATA (UPSERT – IMAGE UPDATE SUPPORTED)
-- =====================================================
INSERT INTO projects (
  title, description, location, capacity, image_url,
  status, completion_date, featured, order_index
) VALUES
(
  'Sunrise Solar Park',
  'One of the largest solar installations providing clean energy to over 50,000 homes.',
  'Rajasthan, India',
  '150 MW',
  'https://images.pexels.com/photos/9875443/pexels-photo-9875443.jpeg',
  'Operational',
  '2023-06-15',
  true,
  1
),
(
  'Green Valley Solar Farm',
  'Advanced bifacial solar panel installation with integrated battery storage systems.',
  'Gujarat, India',
  '200 MW',
  'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'Operational',
  '2023-03-20',
  true,
  2
),
(
  'Coastal Renewable Energy Hub',
  'Innovative solar installation designed to withstand coastal environments.',
  'Tamil Nadu, India',
  '75 MW',
  'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'Operational',
  '2022-11-10',
  true,
  3
),
(
  'Desert Sun Project',
  'Solar project optimized for desert conditions with dust-resistant panels.',
  'Madhya Pradesh, India',
  '100 MW',
  'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'Under Construction',
  '2024-08-30',
  false,
  4
),
(
  'Mountain Peak Solar Array',
  'High-altitude solar installation designed for extreme weather conditions.',
  'Himachal Pradesh, India',
  '50 MW',
  'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'Operational',
  '2023-09-05',
  false,
  5
),
(
  'Urban Rooftop Initiative',
  'Large-scale rooftop solar program across industrial buildings.',
  'Maharashtra, India',
  '30 MW',
  'https://images.pexels.com/photos/371900/pexels-photo-371900.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'Operational',
  '2023-12-15',
  false,
  6
)
ON CONFLICT (title)
DO UPDATE SET
  description = EXCLUDED.description,
  location = EXCLUDED.location,
  capacity = EXCLUDED.capacity,
  image_url = EXCLUDED.image_url,
  status = EXCLUDED.status,
  completion_date = EXCLUDED.completion_date,
  featured = EXCLUDED.featured,
  order_index = EXCLUDED.order_index,
  updated_at = now();
