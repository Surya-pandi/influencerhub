"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Dumbbell,
  Gamepad2,
  LockKeyhole,
  Plane,
  Radio,
  Shirt,
  Sparkles,
  Users,
  Utensils,
  WandSparkles,
} from "lucide-react";
import { Floating, Reveal } from "@/components/motion";
import { InfluencerCard } from "@/components/influencer-card";
import { RealtimeStatus } from "@/components/realtime-status";
import { GradientButton, SectionHeader } from "@/components/ui";
import { categories, influencers } from "@/lib/data";
import { buildLiveCategories, useMarketplaceStats, useRealtimeInfluencers } from "@/lib/realtime";

const categoryIcons = [Shirt, Camera, Dumbbell, WandSparkles, Gamepad2, Utensils, Plane, Sparkles];

export function LiveHeroMetrics() {
  const live = useRealtimeInfluencers(influencers);
  const liveStats = useMarketplaceStats(live.influencers);
  const trending = live.influencers.slice(0, 3);

  return (
    <>
      <Floating className="absolute right-3 top-12 w-80 rounded-lg bg-white/86 p-4 shadow-glow ring-1 ring-white/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-md bg-red-50 text-red-500">
            <Users size={23} />
          </span>
          <div>
            <p className="text-2xl font-black text-ink">{liveStats[0]?.number ?? "0"}</p>
            <p className="text-sm font-semibold text-slate-500">Total Influencers</p>
          </div>
          <RealtimeStatus isLive={live.isLive} label={live.isLive ? "Live" : "No live data"} />
        </div>
      </Floating>

      <Floating className="absolute bottom-24 right-14 w-96 rounded-lg bg-hub-gradient p-5 text-white shadow-glow">
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="text-2xl font-black">Unlock Contact Details</p>
            <p className="mt-1 text-sm font-semibold text-white/80">Subscribe & connect now</p>
          </div>
          <span className="grid h-14 w-14 place-items-center rounded-md bg-white/18">
            <LockKeyhole size={25} />
          </span>
        </div>
      </Floating>

      <div className="absolute bottom-4 left-12 rounded-lg bg-white/88 p-4 shadow-soft ring-1 ring-white/80 backdrop-blur">
        <div className="flex items-center gap-3">
          {trending.length > 0 ? (
            <div className="flex -space-x-3">
              {trending.map((item) => (
                <div key={item.id} className="relative h-10 w-10 overflow-hidden rounded-md ring-2 ring-white">
                  {item.photo ? (
                    <img src={item.photo} alt="" className="h-full w-full scale-150 object-cover" style={{ objectPosition: item.imagePosition }} />
                  ) : (
                    <Image src="/assets/influencehub-hero.png" alt="" fill className="scale-150 object-cover" style={{ objectPosition: item.imagePosition }} sizes="40px" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-md bg-pink-50 text-magenta">
              <Users size={18} />
            </span>
          )}
          <div>
            <p className="text-xl font-black text-ink">{trending.length > 0 ? liveStats[2]?.number ?? "0" : "0"}</p>
            <p className="text-xs font-bold text-slate-500">{trending.length > 0 ? "Brands Trust Us" : "Profiles added"}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function LiveStatsGrid() {
  const live = useRealtimeInfluencers(influencers);
  const liveStats = useMarketplaceStats(live.influencers);

  return (
    <div className="site-container">
      <div className="mb-4 flex justify-end">
        <RealtimeStatus isLive={live.isLive} />
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {liveStats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.05} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-4xl font-black text-ink">{stat.number}</p>
            <p className="mt-1 text-sm font-bold text-slate-500">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function LiveCategoryGrid() {
  const live = useRealtimeInfluencers(influencers);
  const liveCounts = new Map(buildLiveCategories(live.influencers).map((item) => [item.name, item.count]));

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <SectionHeader eyebrow="Categories" title="Top Categories" />
        <div className="hidden items-center gap-3 md:flex">
          <RealtimeStatus isLive={live.isLive} />
          <Link href="/categories" className="text-sm font-black text-magenta">
            View All
          </Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {categories.map((category, index) => {
          const Icon = categoryIcons[index] ?? Sparkles;
          const count = live.isLive ? liveCounts.get(category.name) ?? "0" : category.count;
          return (
            <Link key={category.name} href={`/influencers?category=${category.name}`} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
              <div className="absolute inset-y-0 right-0 w-28 opacity-22 transition group-hover:opacity-35">
                <Image src="/assets/influencehub-hero.png" alt="" fill className="scale-150 object-cover" style={{ objectPosition: `${42 + index * 6}% 50%` }} sizes="112px" />
              </div>
              <span className="relative grid h-10 w-10 place-items-center rounded-md text-white" style={{ backgroundColor: category.accent }}>
                <Icon size={19} />
              </span>
              <h3 className="relative mt-4 font-black text-ink">{category.name}</h3>
              <p className="relative flex items-center gap-1 text-sm font-semibold text-slate-500">
                {live.isLive ? <Radio size={12} className="text-emerald-500" /> : null}
                {count} Influencers
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export function LiveTrendingInfluencers() {
  const live = useRealtimeInfluencers(influencers);
  const trending = live.influencers.slice(0, 4);

  return (
    <div className="site-container">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionHeader eyebrow="Trending" title="Trending Influencers" copy="Top performing verified creators this week." />
          <div className="mt-4">
            <RealtimeStatus isLive={live.isLive} />
          </div>
        </div>
        <GradientButton href="/influencers" variant="light">
          Explore All
        </GradientButton>
      </div>
      <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {trending.map((influencer, index) => (
          <Reveal key={influencer.id} delay={index * 0.06}>
            <InfluencerCard influencer={influencer} compact />
          </Reveal>
        ))}
      </div>
      {trending.length === 0 ? (
        <div className="mt-9 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-pink-50 text-magenta">
            <Users size={22} />
          </span>
          <h3 className="mt-5 text-2xl font-black text-ink">No live influencer profiles yet</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Add real creator rows in Supabase to populate this section.
          </p>
        </div>
      ) : null}
    </div>
  );
}
