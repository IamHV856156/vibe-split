-- groups table 

CREATE TABLE groups (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT now()
);

-- Adding invite code colum in group table
ALTER TABLE groups ADD COLUMN invite_code TEXT UNIQUE;

--Members table
CREATE TABLE members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  group_id uuid REFERENCES groups(id),
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT now()
);

--Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  created_at TIMESTAMP DEFAULT now()
);


--RLS Policies
--for groups table
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can create groups"
ON groups FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view their groups"
ON groups FOR SELECT
USING (auth.uid() = created_by);

--for members table
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can join group"
ON members FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view members"
ON members FOR SELECT
USING (true);

--for profile table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view profiles"
ON profiles FOR SELECT
USING (true);