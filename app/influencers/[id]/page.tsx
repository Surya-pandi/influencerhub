import { RealtimeProfile } from "@/components/realtime-profile";
import { getInfluencer, influencers } from "@/lib/data";

export function generateStaticParams() {
  return influencers.map((influencer) => ({ id: influencer.id }));
}

export default async function InfluencerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialInfluencer = getInfluencer(id);
  const related = initialInfluencer ? influencers.filter((item) => item.id !== initialInfluencer.id).slice(0, 3) : [];

  return (
    <section className="pb-20 pt-32">
      <RealtimeProfile id={id} initialInfluencer={initialInfluencer} relatedInfluencers={related} />
    </section>
  );
}
