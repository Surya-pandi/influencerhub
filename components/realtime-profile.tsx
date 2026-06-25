"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Eye, Globe2, LockKeyhole, Mail, MapPin, Phone, PlayCircle, ShieldCheck, Star, Users } from "lucide-react";
import { InfluencerImage, PlatformMark } from "@/components/influencer-card";
import { RealtimeStatus } from "@/components/realtime-status";
import { GradientButton, LockedValue } from "@/components/ui";
import type { Influencer } from "@/lib/data";
import { useRealtimeInfluencer } from "@/lib/realtime";

export function RealtimeProfile({
  id,
  initialInfluencer,
  relatedInfluencers,
}: {
  id: string;
  initialInfluencer?: Influencer;
  relatedInfluencers: Influencer[];
}) {
  const live = useRealtimeInfluencer(id, initialInfluencer);
  const influencer = live.influencer;

  if (!influencer) {
    const isLoading = live.status === "connecting";

    return (
      <div className="site-container">
        <div className="mb-5 flex justify-end">
          <RealtimeStatus isLive={live.isLive} />
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-md bg-pink-50 text-magenta">
            <LockKeyhole size={24} />
          </span>
          <h1 className="mt-5 text-3xl font-black text-ink md:text-5xl">
            {isLoading ? "Loading creator profile" : "No influencer profile found"}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-600">
            {isLoading
              ? "Checking your live Supabase profiles now."
              : "Add creator rows in Supabase to publish real influencer profiles here."}
          </p>
          <div className="mt-6 flex justify-center">
            <GradientButton href="/influencers" variant="light">
              Back to directory
            </GradientButton>
          </div>
        </div>
      </div>
    );
  }

  const related = live.influencers.filter((item) => item.id !== influencer.id).slice(0, 3);
  const visibleRelated = related.length > 0 ? related : relatedInfluencers;
  const videos = influencer.sampleVideos;

  return (
    <div className="site-container">
      <div className="mb-5 flex justify-end">
        <RealtimeStatus isLive={live.isLive} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
          <div className="relative min-h-[360px]">
            {influencer.photo ? (
              <img src={influencer.photo} alt={`${influencer.name} profile cover`} className="h-[360px] w-full object-cover" style={{ objectPosition: influencer.imagePosition }} />
            ) : (
              <Image
                src="/assets/influencehub-hero.png"
                alt={`${influencer.name} profile cover`}
                fill
                priority
                className="object-cover"
                style={{ objectPosition: influencer.imagePosition }}
                sizes="(max-width: 1024px) 100vw, 820px"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-5 text-white">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <PlatformMark platform={influencer.platform} />
                  <span className="rounded-md bg-white/16 px-3 py-2 text-sm font-bold backdrop-blur">{influencer.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-black tracking-normal md:text-6xl">{influencer.name}</h1>
                  {influencer.verified ? <BadgeCheck size={28} className="fill-blue-500 text-white" /> : null}
                </div>
                <p className="mt-2 font-semibold text-white/78">{influencer.handle}</p>
              </div>
              <div className="rounded-lg bg-white/90 p-4 text-ink shadow-soft backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Promotion Charge</p>
                <p className="mt-1 text-3xl font-black text-magenta">${influencer.price} / Post</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-4">
            {[
              { icon: Users, label: "Followers", value: influencer.followers },
              { icon: Eye, label: "Engagement", value: influencer.engagement },
              { icon: Globe2, label: "Platform", value: influencer.platform },
              { icon: MapPin, label: "Location", value: `${influencer.state}, ${influencer.country}` },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg bg-slate-50 p-4">
                  <Icon size={18} className="text-violet" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
                  <p className="mt-1 font-black text-ink">{item.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-8 border-t border-slate-200 p-5 lg:grid-cols-[1fr_.8fr]">
            <div>
              <h2 className="text-2xl font-black text-ink">Creator Overview</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">{influencer.bio}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Verified audience", "Brand-safe content", "Fast response", "Secure payments"].map((tag) => (
                  <span key={tag} className="rounded-md bg-pink-50 px-3 py-2 text-xs font-black text-magenta">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-ink">Sample Videos</h2>
              <div className="mt-4 grid gap-3">
                {videos.length > 0 ? (
                  videos.map((video, index) => (
                    <div key={video} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
                      <span className="grid h-11 w-11 place-items-center rounded-md bg-hub-gradient text-white">
                        <PlayCircle size={20} />
                      </span>
                      <div>
                        <p className="font-black text-ink">{video}</p>
                        <p className="text-xs font-semibold text-slate-500">Preview clip {index + 1}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
                    <p className="font-black text-ink">No sample videos uploaded yet</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">Creator clips will appear here after they are added in Supabase.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        <aside className="grid h-fit gap-5 lg:sticky lg:top-24">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-hub-gradient text-white">
                <LockKeyhole size={22} />
              </span>
              <div>
                <h2 className="text-xl font-black text-ink">Subscribe to unlock contact details</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Email, phone, and direct contact details stay protected until a brand unlocks the profile.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <LockedValue label="Email" />
              <LockedValue label="Phone" />
              <LockedValue label="Contact details" />
            </div>
            <div className="mt-5">
              <GradientButton href="/pricing">Unlock Now</GradientButton>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-black text-ink">After unlock</h3>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail size={16} className="text-magenta" />
                {influencer.email}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={16} className="text-magenta" />
                {influencer.phone}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck size={16} className="text-magenta" />
                Payment protection enabled
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-ink">Similar Influencers</h2>
          <Link href="/influencers" className="text-sm font-black text-magenta">
            View directory
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {visibleRelated.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <InfluencerImage influencer={item} className="h-40" />
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-ink">{item.name}</h3>
                  <span className="flex items-center gap-1 text-sm font-black text-amber-500">
                    <Star size={14} className="fill-amber-400" /> {item.rating}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  {item.category} / {item.followers}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
