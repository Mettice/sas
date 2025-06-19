-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    service TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS contact_submissions_email_idx ON contact_submissions(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx ON contact_submissions(status);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (since we don't have auth)
CREATE POLICY "Allow public inserts" ON contact_submissions
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create policy to allow service role to view all submissions
CREATE POLICY "Service role can view all submissions" ON contact_submissions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true); 