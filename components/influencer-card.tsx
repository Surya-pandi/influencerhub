import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Heart, Star, Users } from "lucide-react";
import type { Influencer } from "@/lib/data";
import { cn } from "@/components/ui";

export function PlatformMark({ platform }: { platform: Influencer["platform"] }) {
  const styles: Record<Influencer["platform"], string> = {
    Instagram: "from-pink-500 to-violet-600",
    YouTube: "from-red-500 to-pink-500",
    TikTok: "from-slate-900 to-cyan-500",
    Twitch: "from-violet-600 to-indigo-500",
  };

  return (
    <span className={cn("grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br text-xs font-black text-white shadow-lg", styles[platform])}>
      {platform.slice(0, 2)}
    </span>
  );
}

export function InfluencerImage({ influencer, className = "" }: { influencer: Influencer; className?: string }) {
  const src = influencer.photo || "/assets/influencehub-hero.png";
  const sharedClassName = "scale-125 object-cover";

  return (
    <div className={cn("relative overflow-hidden rounded-md bg-slate-100", className)}>
      {src.startsWith("http") ? (
        <img
          src={src}
          alt={`${influencer.name} creator preview`}
          className={cn("h-full w-full", sharedClassName)}
          style={{ objectPosition: influencer.imagePosition }}
        />
      ) : (
        <Image
          src={src}
          alt={`${influencer.name} creator preview`}
          fill
          className={sharedClassName}
          style={{ objectPosition: influencer.imagePosition }}
          sizes="(max-width: 768px) 100vw, 360px"
          priority={influencer.id === "ema-watson"}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/42 via-transparent to-transparent" />
      <div className="absolute bottom-3 left-3">
        <PlatformMark platform={influencer.platform} />
      </div>
    </div>
  );
}

export function InfluencerCard({ influencer, compact = false }: { influencer: Influencer; compact?: boolean }) {
  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <InfluencerImage influencer={influencer} className={compact ? "h-36" : "h-52"} />
      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-ink">{influencer.name}</h3>
              {influencer.verified ? <BadgeCheck size={16} className="fill-blue-500 text-white" /> : null}
            </div>
            <p className="text-sm font-semibold text-slate-500">{influencer.category} Expert</p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:border-magenta hover:text-magenta" aria-label="Save influencer">
            <Heart size={17} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-slate-50 p-3">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
              <Users size={14} />
              Followers
            </div>
            <p className="mt-1 font-black text-ink">{influencer.followers}</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              Rating
            </div>
            <p className="mt-1 font-black text-ink">{influencer.rating.toFixed(1)}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Promotion Price</p>
            <p className="font-black text-magenta">${influencer.price} / Post</p>
          </div>
          <Link
            href={`/influencers/${influencer.id}`}
            className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-magenta"
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}
