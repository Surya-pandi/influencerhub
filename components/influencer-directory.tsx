"use client";

import { useMemo, useState } from "react";
import { Filter, Search, UserPlus } from "lucide-react";
import { categories, influencers, type Platform } from "@/lib/data";
import { InfluencerCard } from "@/components/influencer-card";
import { RealtimeStatus } from "@/components/realtime-status";
import { useRealtimeInfluencers } from "@/lib/realtime";

const platforms: Array<Platform | "All"> = ["All", "Instagram", "YouTube", "TikTok", "Twitch"];

export function InfluencerDirectory() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<Platform | "All">("All");
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(400);
  const live = useRealtimeInfluencers(influencers);
  const marketplaceInfluencers = live.influencers;

  const countries = useMemo(() => ["All", ...Array.from(new Set(marketplaceInfluencers.map((item) => item.country)))], [marketplaceInfluencers]);
  const categoryOptions = useMemo(() => {
    return ["All", ...Array.from(new Set([...categories.map((item) => item.name), ...marketplaceInfluencers.map((item) => item.category)]))];
  }, [marketplaceInfluencers]);

  const results = useMemo(() => {
    return marketplaceInfluencers.filter((item) => {
      const haystack = `${item.name} ${item.handle} ${item.category} ${item.country} ${item.platform}`.toLowerCase();
      return (
        haystack.includes(query.toLowerCase()) &&
        (platform === "All" || item.platform === platform) &&
        (country === "All" || item.country === country) &&
        (category === "All" || item.category === category) &&
        item.price <= maxPrice
      );
    });
  }, [category, country, marketplaceInfluencers, maxPrice, platform, query]);

  return (
    <section className="pb-20 pt-32">
      <div className="site-container">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4 shadow-soft lg:sticky lg:top-24">
            <div className="mb-5 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-pink-50 text-magenta">
                <Filter size={18} />
              </span>
              <div>
                <h2 className="font-black text-ink">Filters</h2>
                <p className="text-xs font-semibold text-slate-500">Find the right collaborator</p>
              </div>
            </div>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Search
              <span className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3">
                <Search size={16} className="text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search influencers"
                  className="h-11 w-full bg-transparent text-sm outline-none"
                />
              </span>
            </label>

            <div className="mt-4 grid gap-4">
              <Select label="Platform" value={platform} onChange={(value) => setPlatform(value as Platform | "All")} options={platforms} />
              <Select label="Country" value={country} onChange={setCountry} options={countries} />
              <Select label="Category" value={category} onChange={setCategory} options={categoryOptions} />
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Max price: ${maxPrice}
                <input
                  type="range"
                  min={75}
                  max={400}
                  step={25}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="accent-magenta"
                />
              </label>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-magenta">Influencer marketplace</p>
                <h1 className="mt-2 text-4xl font-black tracking-normal text-ink md:text-6xl">Verified creators worldwide</h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <RealtimeStatus isLive={live.isLive} />
                <span className="rounded-md bg-white px-4 py-3 text-sm font-black text-slate-600 shadow-sm ring-1 ring-slate-200">
                  {results.length} matches
                </span>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((influencer) => (
                <InfluencerCard key={influencer.id} influencer={influencer} />
              ))}
            </div>
            {results.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-pink-50 text-magenta">
                  <UserPlus size={22} />
                </span>
                <h2 className="mt-5 text-2xl font-black text-ink">No influencer profiles yet</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  Add real creators in Supabase and they will appear here automatically.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-magenta"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
