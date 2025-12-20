-- Migration: Red Civil Social Map Schema
-- Description: Creates tables for geographic nuclei and member management.

-- 1. NUCLEI TABLE
-- Stores geographic cell nodes
CREATE TABLE IF NOT EXISTS public.nuclei (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    description TEXT,
    city TEXT NOT NULL,
    region TEXT,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    member_count INTEGER DEFAULT 0
);

-- 2. NUCLEUS MEMBERS TABLE
-- Many-to-many relationship between profiles and nuclei
CREATE TABLE IF NOT EXISTS public.nucleus_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    nucleus_id UUID REFERENCES public.nuclei(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member', -- member, moderator, admin
    UNIQUE(nucleus_id, user_id)
);

-- 3. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.nuclei ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nucleus_members ENABLE ROW LEVEL SECURITY;

-- Policies for nuclei
CREATE POLICY "Public nuclei are viewable by everyone" 
ON public.nuclei FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create nuclei" 
ON public.nuclei FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Creators can update their nuclei" 
ON public.nuclei FOR UPDATE USING (auth.uid() = created_by);

-- Policies for nucleus_members
CREATE POLICY "Members are viewable by everyone" 
ON public.nucleus_members FOR SELECT USING (true);

CREATE POLICY "Authenticated users can join nuclei" 
ON public.nucleus_members FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave nuclei" 
ON public.nucleus_members FOR DELETE USING (auth.uid() = user_id);

-- 4. TRIGGERS FOR MEMBER COUNT
CREATE OR REPLACE FUNCTION public.update_nucleus_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.nuclei SET member_count = member_count + 1 WHERE id = NEW.nucleus_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.nuclei SET member_count = member_count - 1 WHERE id = OLD.nucleus_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_member_change
AFTER INSERT OR DELETE ON public.nucleus_members
FOR EACH ROW EXECUTE FUNCTION public.update_nucleus_member_count();
