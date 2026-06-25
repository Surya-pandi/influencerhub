import { Camera, CheckCircle2, Upload } from "lucide-react";
import { InfoPage } from "@/components/info-page";

export default function CreatorGuidePage() {
  return (
    <InfoPage
      eyebrow="Creator guide"
      title="Build a profile brands can trust"
      copy="Use this guide to prepare creator details before publishing a real influencer profile in Supabase."
      cards={[
        { icon: Camera, title: "Profile basics", copy: "Add a clear display name, handle, platform, category, location, and profile link." },
        { icon: Upload, title: "Media samples", copy: "Upload sample videos or links that show your style, audience, and campaign quality." },
        { icon: CheckCircle2, title: "Contact readiness", copy: "Keep campaign price, email, and phone details accurate for profile unlocks." },
      ]}
      ctaHref="/register"
      ctaLabel="Create creator profile"
    />
  );
}
