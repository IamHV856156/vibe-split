-- groups table 
CREATE TABLE groups (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE,
  created_by uuid REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT now()
);

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

-- entries table
CREATE TABLE entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  type TEXT CHECK (type IN ('expense', 'saving')) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT now()
);

--test entry
insert into entries (group_id, user_id, amount, type, description)
values (
  '1aac8c57-910d-4083-8b68-c8f08b5f4d6f',
  '206ee474-1f4c-4558-906f-980ae24cb8fa',
  100,
  'expense',
  'test expense'
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

--for entries table

ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- members can insert
CREATE POLICY "Members can add entries"
ON entries
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

-- members can view entries of their groups
CREATE POLICY "Members can view entries"
ON entries
FOR SELECT
USING (
  group_id IN (
    SELECT group_id FROM members WHERE user_id = auth.uid()
  )
);