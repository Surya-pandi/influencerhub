# InfluenceHub

Premium Next.js 15 App Router frontend for a global influencer marketplace.

## What is included

- Luxury creator-marketplace homepage with generated local hero artwork
- Searchable influencer listing with country, platform, category, and price filters
- Profile pages with visible creator info and locked contact details
- Brand and influencer registration surfaces
- Login, dashboard, admin, pricing, support, contact, resource, and legal pages
- Supabase schema for users, influencers, videos, subscriptions, and contact unlocks
- Stripe checkout placeholder route for wiring live payment sessions

## Run locally

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and set Supabase and Stripe values when ready for live auth, storage, and payments.

For contact form notifications, set:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_NOTIFICATION_EMAIL=
```

`CONTACT_NOTIFICATION_EMAIL` is the mailbox that receives new contact/support messages.

## Realtime data

The homepage metrics, influencer directory, and profile pages read from Supabase when these are set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

For a new Supabase project, run `supabase/schema.sql`. For an existing database, run `supabase/realtime_upgrade.sql` to add the live profile fields and realtime publication entries.

Until Supabase has influencer rows, the UI shows empty states instead of fake influencer profiles.
