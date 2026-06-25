import { Bookmark, CreditCard, LineChart } from "lucide-react";
import { InfoPage } from "@/components/info-page";

export default function CampaignToolsPage() {
  return (
    <InfoPage
      eyebrow="Campaign tools"
      title="Tools for managing creator outreach"
      copy="InfluenceHub campaign tools are designed around saved creators, unlocks, subscriptions, and campaign tracking."
      cards={[
        { icon: Bookmark, title: "Saved creators", copy: "Build shortlists for campaign planning and compare creators before unlocking contact details." },
        { icon: CreditCard, title: "Subscription access", copy: "Choose a plan that matches how many creator contacts your team needs to unlock." },
        { icon: LineChart, title: "Campaign workspace", copy: "Use the dashboard as the center for creator activity and campaign reach snapshots." },
      ]}
      ctaHref="/dashboard"
      ctaLabel="Open dashboard"
    />
  );
}
