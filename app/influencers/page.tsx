import { Suspense } from "react";
import { InfluencerDirectory } from "@/components/influencer-directory";

export default function InfluencersPage() {
  return (
    <Suspense>
      <InfluencerDirectory />
    </Suspense>
  );
}
