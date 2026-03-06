
-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'replied', 'archived')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (from the contact form)
CREATE POLICY "Allow anonymous inserts" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to read leads (admin dashboard)
CREATE POLICY "Allow authenticated users to read leads" ON public.leads
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update leads (change status, add notes)
CREATE POLICY "Allow authenticated users to update leads" ON public.leads
  FOR UPDATE TO authenticated USING (true);
