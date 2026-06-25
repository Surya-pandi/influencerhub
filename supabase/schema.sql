create extension if not exists "uuid-ossp";

create type public.user_role as enum ('brand', 'influencer', 'admin');
create type public.platform_type as enum ('Instagram', 'YouTube', 'TikTok', 'Twitch');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role public.user_role not null default 'brand',
  company text,
  created_at timestamptz not null default now()
);

create table public.influencers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  display_name text not null,
  handle text,
  photo text,
  platform public.platform_type not null,
  profile_link text not null,
  country text not null,
  state text not null,
  category text not null,
  followers integer not null default 0,
  price integer not null default 0,
  rating numeric(2, 1) not null default 4.8,
  engagement_rate numeric(5, 2) not null default 8.4,
  audience text not null default '18-34',
  bio text not null default 'Verified creator profile synced from Supabase in real time.',
  image_position text not null default '63% 43%',
  verified boolean not null default false,
  contact_email text,
  contact_phone text,
  created_at timestamptz not null default now()
);

create table public.videos (
  id uuid primary key default uuid_generate_v4(),
  influencer_id uuid not null references public.influencers(id) on delete cascade,
  video_url text not null,
  title text,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  status public.subscription_status not null default 'trialing',
  plan text not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table public.unlocked_contacts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  influencer_id uuid not null references public.influencers(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique (user_id, influencer_id)
);

alter table public.users enable row level security;
alter table public.influencers enable row level security;
alter table public.videos enable row level security;
alter table public.subscriptions enable row level security;
alter table public.unlocked_contacts enable row level security;

create index influencers_platform_idx on public.influencers (platform);
create index influencers_country_idx on public.influencers (country);
create index influencers_category_idx on public.influencers (category);
create index influencers_followers_idx on public.influencers (followers desc);

create policy "Users can read their own profile"
on public.users for select
using (auth.uid() = id);

create policy "Public influencer profiles are readable"
on public.influencers for select
using (true);

create policy "Influencers can manage their own profile"
on public.influencers for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Public sample videos are readable"
on public.videos for select
using (true);

create policy "Influencers manage their videos"
on public.videos for all
using (
  exists (
    select 1 from public.influencers
    where influencers.id = videos.influencer_id
      and influencers.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.influencers
    where influencers.id = videos.influencer_id
      and influencers.user_id = auth.uid()
  )
);

create policy "Users read own subscriptions"
on public.subscriptions for select
using (auth.uid() = user_id);

create policy "Users read own unlocked contacts"
on public.unlocked_contacts for select
using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('creator-media', 'creator-media', true)
on conflict (id) do nothing;

do $$
begin
  alter publication supabase_realtime add table public.influencers;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.videos;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
