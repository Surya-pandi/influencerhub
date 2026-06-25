import { EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { InfoPage } from "@/components/info-page";

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Privacy principles for InfluenceHub"
      copy="This page outlines the privacy posture for the marketplace while live legal copy is prepared."
      cards={[
        { icon: LockKeyhole, title: "Protected contact details", copy: "Creator contact data should remain hidden until a brand unlocks an approved profile." },
        { icon: EyeOff, title: "Limited visibility", copy: "Only public profile data should be used for discovery, filtering, and marketplace search." },
        { icon: ShieldCheck, title: "Account security", copy: "Authentication and access control should be handled through Supabase policies and secure server routes." },
      ]}
      ctaHref="/support"
      ctaLabel="Privacy support"
    />
  );
}
