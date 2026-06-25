alter table public.influencers
  add column if not exists display_name text,
  add column if not exists handle text,
  add column if not exists rating numeric(2, 1) not null default 4.8,
  add column if not exists engagement_rate numeric(5, 2) not null default 8.4,
  add column if not exists audience text not null default '18-34',
  add column if not exists bio text not null default 'Verified creator profile synced from Supabase in real time.',
  add column if not exists image_position text not null default '63% 43%';

update public.influencers
set display_name = coalesce(display_name, 'Verified Creator')
where display_name is null;

alter table public.influencers
  alter column display_name set not null;

create index if not exists influencers_platform_idx on public.influencers (platform);
create index if not exists influencers_country_idx on public.influencers (country);
create index if not exists influencers_category_idx on public.influencers (category);
create index if not exists influencers_followers_idx on public.influencers (followers desc);

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
