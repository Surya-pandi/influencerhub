import { Globe2, ShieldCheck, Users } from "lucide-react";
import { InfoPage } from "@/components/info-page";

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="A marketplace built for real creator partnerships"
      copy="InfluenceHub helps brands discover creators, compare pricing, and protect contact details until a profile is unlocked."
      cards={[
        { icon: Users, title: "Creator discovery", copy: "Search live influencer profiles by category, platform, country, and campaign fit." },
        { icon: ShieldCheck, title: "Protected contacts", copy: "Creator emails and phone details stay guarded until a brand unlocks the profile." },
        { icon: Globe2, title: "Global campaigns", copy: "Support creators and brands working across regions, niches, and social platforms." },
      ]}
    />
  );
}
