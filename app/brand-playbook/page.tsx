import { BarChart3, Search, Target } from "lucide-react";
import { InfoPage } from "@/components/info-page";

export default function BrandPlaybookPage() {
  return (
    <InfoPage
      eyebrow="Brand playbook"
      title="Plan smarter creator campaigns"
      copy="A practical starting point for brands comparing creators, budgets, and campaign goals."
      cards={[
        { icon: Target, title: "Define the fit", copy: "Start with audience, category, region, and platform before comparing creator pricing." },
        { icon: Search, title: "Shortlist creators", copy: "Use filters to compare live creator profiles and identify profiles worth unlocking." },
        { icon: BarChart3, title: "Track outcomes", copy: "Keep reach, response quality, and conversion signals visible in your campaign workspace." },
      ]}
      ctaHref="/influencers"
      ctaLabel="Browse creators"
    />
  );
}
