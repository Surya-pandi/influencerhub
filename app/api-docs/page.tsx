import { Code2, Database, Radio } from "lucide-react";
import { InfoPage } from "@/components/info-page";

export default function ApiDocsPage() {
  return (
    <InfoPage
      eyebrow="API"
      title="Integration notes for InfluenceHub"
      copy="Reference the current integration surface for Supabase profiles, realtime updates, and checkout wiring."
      cards={[
        { icon: Database, title: "Supabase data", copy: "Influencer rows, videos, users, subscriptions, and contact unlocks live in the Supabase schema." },
        { icon: Radio, title: "Realtime updates", copy: "The marketplace listens for influencer and video changes and updates live profile displays." },
        { icon: Code2, title: "Checkout route", copy: "Stripe checkout configuration is prepared in the API route and can be connected to live price IDs." },
      ]}
      ctaHref="/support"
      ctaLabel="Integration support"
    />
  );
}
