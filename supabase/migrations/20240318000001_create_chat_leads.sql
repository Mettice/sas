-- Create chat_leads table
create table public.chat_leads (
    id uuid not null default uuid_generate_v4(),
    email text,
    interest text,
    source text not null default 'chatbot',
    conversation jsonb,
    created_at timestamp with time zone not null default now(),
    primary key (id)
);

-- Enable RLS
alter table public.chat_leads enable row level security;

-- Create policy to allow inserts from authenticated users
create policy "Allow inserts from authenticated users"
on public.chat_leads
for insert
to authenticated
with check (true);

-- Create policy to allow service role to view all leads
create policy "Service role can view all leads"
on public.chat_leads
for select
to service_role
using (true);

-- Create index on email for faster lookups
create index chat_leads_email_idx on public.chat_leads (email);

-- Create index on created_at for time-based queries
create index chat_leads_created_at_idx on public.chat_leads (created_at);

-- Add comment to table
comment on table public.chat_leads is 'Leads captured from chatbot conversations'; 