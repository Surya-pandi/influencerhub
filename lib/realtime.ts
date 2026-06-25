"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { influencers as defaultInfluencers, type Influencer, type Platform } from "@/lib/data";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type LiveStatus = "demo" | "connecting" | "live" | "error";

const realtimeChannelScope = Math.random().toString(36).slice(2);
let realtimeChannelSequence = 0;

type InfluencerRow = {
  id: string;
  display_name?: string | null;
  handle?: string | null;
  photo?: string | null;
  platform?: string | null;
  profile_link?: string | null;
  country?: string | null;
  state?: string | null;
  category?: string | null;
  followers?: number | null;
  price?: number | null;
  verified?: boolean | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  bio?: string | null;
  rating?: number | null;
  engagement_rate?: number | null;
  audience?: string | null;
  image_position?: string | null;
  videos?: Array<{ title?: string | null; video_url?: string | null }> | null;
};

export function useRealtimeInfluencers(initialInfluencers: Influencer[] = defaultInfluencers) {
  const [items, setItems] = useState<Influencer[]>(initialInfluencers);
  const [status, setStatus] = useState<LiveStatus>(isSupabaseConfigured ? "connecting" : "demo");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase) {
      setStatus("demo");
      setItems(initialInfluencers);
      return;
    }

    const { data, error } = await supabase
      .from("influencers")
      .select(
        "id,display_name,handle,photo,platform,profile_link,country,state,category,followers,price,verified,contact_email,contact_phone,bio,rating,engagement_rate,audience,image_position,videos(title,video_url)",
      )
      .order("followers", { ascending: false });

    if (error) {
      console.error("InfluenceHub realtime fetch failed", error);
      setStatus("error");
      setItems(initialInfluencers);
      return;
    }

    const liveItems = (data ?? []).map(mapInfluencerRow);
    setItems(liveItems.length > 0 ? liveItems : initialInfluencers);
    setStatus("live");
    setLastUpdated(new Date());
  }, [initialInfluencers]);

  useEffect(() => {
    void refresh();

    const client = supabase;

    if (!client) {
      return;
    }

    const channelTopic = `influencehub-marketplace-${realtimeChannelScope}-${++realtimeChannelSequence}`;
    const channel = client
      .channel(channelTopic)
      .on("postgres_changes", { event: "*", schema: "public", table: "influencers" }, () => void refresh())
      .on("postgres_changes", { event: "*", schema: "public", table: "videos" }, () => void refresh())
      .subscribe((state) => {
        if (state === "SUBSCRIBED") {
          setStatus((current) => (current === "connecting" ? "live" : current));
        }
      });

    return () => {
      void client.removeChannel(channel);
    };
  }, [refresh]);

  return { influencers: items, status, isLive: status === "live", lastUpdated, refresh };
}

export function useRealtimeInfluencer(id: string, initialInfluencer?: Influencer) {
  const initialInfluencers = useMemo(() => (initialInfluencer ? [initialInfluencer] : []), [initialInfluencer]);
  const live = useRealtimeInfluencers(initialInfluencers);
  const influencer = useMemo(() => {
    return live.influencers.find((item) => item.id === id) ?? initialInfluencer ?? null;
  }, [id, initialInfluencer, live.influencers]);

  return { ...live, influencer };
}

export function useMarketplaceStats(influencers: Influencer[]) {
  return useMemo(() => {
    const countries = new Set(influencers.map((item) => item.country).filter(Boolean)).size;
    const liveCreatorCount = influencers.length;

    return [
      { number: formatCompact(liveCreatorCount), label: "Influencers Worldwide" },
      { number: countries > 0 ? `${countries}+` : "0", label: "Countries Covered" },
      { number: formatCompact(liveCreatorCount * 12), label: "Brands Connected" },
      { number: liveCreatorCount > 0 ? `${Math.round(average(influencers.map((item) => item.rating)) * 20)}%` : "0%", label: "Customer Satisfaction" },
    ];
  }, [influencers]);
}

export function buildLiveCategories(influencers: Influencer[]) {
  return Object.entries(
    influencers.reduce<Record<string, number>>((counts, item) => {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
      return counts;
    }, {}),
  ).map(([name, count]) => ({ name, count: formatCompact(count) }));
}

function mapInfluencerRow(row: InfluencerRow): Influencer {
  const name = row.display_name?.trim() || "Verified Creator";
  const followers = Number(row.followers ?? 0);
  const platform = normalizePlatform(row.platform);

  return {
    id: row.id,
    name,
    handle: row.handle?.trim() || `@${slugify(name)}`,
    photo: row.photo ?? undefined,
    category: row.category || "Lifestyle",
    platform,
    country: row.country || "Global",
    state: row.state || "Remote",
    followers: formatCompact(followers),
    followerCount: followers,
    price: Number(row.price ?? 0),
    rating: Number(row.rating ?? 4.8),
    engagement: `${Number(row.engagement_rate ?? 8.4).toFixed(1)}%`,
    audience: row.audience || "18-34",
    verified: Boolean(row.verified),
    imagePosition: row.image_position || "63% 43%",
    bio: row.bio || "Verified creator profile synced from Supabase in real time.",
    sampleVideos: (row.videos ?? [])
      .map((video) => video.title || video.video_url)
      .filter((value): value is string => Boolean(value))
      .slice(0, 3),
    email: row.contact_email || "Locked until subscription",
    phone: row.contact_phone || "Locked until subscription",
  };
}

function normalizePlatform(platform?: string | null): Platform {
  if (platform === "Instagram" || platform === "YouTube" || platform === "TikTok" || platform === "Twitch") {
    return platform;
  }

  return "Instagram";
}

function formatCompact(value: number) {
  if (value >= 1_000_000) {
    return `${trimNumber(value / 1_000_000)}M+`;
  }

  if (value >= 1_000) {
    return `${trimNumber(value / 1_000)}K+`;
  }

  return `${value}`;
}

function trimNumber(value: number) {
  return value.toFixed(value >= 10 ? 0 : 1).replace(/\.0$/, "");
}

function average(values: number[]) {
  if (values.length === 0) {
    return 4.9;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/(^\.|\.$)/g, "");
}
