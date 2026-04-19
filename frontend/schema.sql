-- 1. TABLES & RELATIONSHIPS

-- Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Groups
CREATE TABLE IF NOT EXISTS public.groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    invite_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Members
CREATE TABLE IF NOT EXISTS public.members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE(user_id, group_id)
);

-- Entries
CREATE TABLE IF NOT EXISTS public.entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    type TEXT CHECK (type IN ('expense', 'saving')) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 2. RLS POLICIES

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Public profiles are viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Groups
CREATE POLICY "Members can view their groups" ON public.groups 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.members WHERE group_id = public.groups.id AND user_id = auth.uid())
);
CREATE POLICY "Auth users can create groups" ON public.groups FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Members
CREATE POLICY "Members can view roster" ON public.members 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.members m2 WHERE m2.group_id = public.members.group_id AND m2.user_id = auth.uid())
);
CREATE POLICY "Users can join via invite" ON public.members FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Entries (The Secure Layer)
CREATE POLICY "Group members can view entries" ON public.entries 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.members WHERE group_id = entries.group_id AND user_id = auth.uid())
);

CREATE POLICY "Group members can insert entries" ON public.entries 
FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.members WHERE group_id = entries.group_id AND user_id = auth.uid())
);

-- RESTRICTIVE POLICY: Users can only Update or Delete entries they created
CREATE POLICY "Restrictive: Only owner can modify" ON public.entries 
AS RESTRICTIVE 
FOR ALL USING (auth.uid() = user_id);

-- 3. REALTIME CONFIG
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE public.groups, public.members, public.entries;
COMMIT;