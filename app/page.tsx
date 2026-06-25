import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  BarChart3,
  CreditCard,
  Globe2,
  LockKeyhole,
  Search,
  Send,
  ShieldCheck,
  Star,
  Target,
  Users,
} from "lucide-react";
import { BrandTicker, Eyebrow, GradientButton, IconBadge, SectionHeader } from "@/components/ui";
import { PlatformMark } from "@/components/influencer-card";
import { Reveal } from "@/components/motion";
import { LiveCategoryGrid, LiveHeroMetrics, LiveStatsGrid, LiveTrendingInfluencers } from "@/components/live-home";
import { brandLogos, steps } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-10 pt-28 md:pb-16 md:pt-32">
        <div className="mesh absolute inset-0 -z-20 opacity-40" />
        <Image
          src="/assets/influencehub-hero.png"
          alt="InfluenceHub creators and campaign analytics"
          fill
          priority
          className="-z-10 object-cover opacity-90"
          style={{ objectPosition: "63% 45%" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,.94)_36%,rgba(255,255,255,.55)_62%,rgba(255,255,255,.15)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-white to-transparent" />

        <div className="site-container">
          <div className="grid min-h-[680px] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal className="max-w-3xl">
              <Eyebrow>
                <Users size={15} /> #1 Global Influencer Marketplace
              </Eyebrow>
              <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-normal text-ink md:text-7xl lg:text-8xl">
                Find The Perfect <span className="gradient-text">Influencer</span> For Your Brand
              </h1>
              <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-slate-700">
                Discover verified influencers worldwide, compare prices and collaborate to grow your brand.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <IconBadge icon={BarChart3} label="Real-time Followers" />
                <IconBadge icon={BadgeCheck} label="Verified Influencers" />
                <IconBadge icon={ShieldCheck} label="Secure Payments" />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <GradientButton href="/influencers">Explore Influencers</GradientButton>
                <GradientButton href="/register" variant="light">
                  I&apos;m An Influencer
                </GradientButton>
              </div>

              <div className="glass mt-8 grid gap-3 rounded-lg p-3 md:grid-cols-[1.1fr_.8fr_.8fr_auto]">
                <label className="flex h-12 items-center gap-2 rounded-md bg-white px-3 text-sm font-semibold text-slate-500 ring-1 ring-slate-100">
                  <Search size={17} />
                  <input className="w-full outline-none" placeholder="Search Influencers" />
                </label>
                <select className="h-12 rounded-md bg-white px-3 text-sm font-bold text-slate-700 outline-none ring-1 ring-slate-100">
                  <option>All Platforms</option>
                  <option>Instagram</option>
                  <option>YouTube</option>
                  <option>TikTok</option>
                </select>
                <select className="h-12 rounded-md bg-white px-3 text-sm font-bold text-slate-700 outline-none ring-1 ring-slate-100">
                  <option>All Countries</option>
                  <option>USA</option>
                  <option>India</option>
                  <option>UK</option>
                </select>
                <Link href="/influencers" className="inline-flex h-12 items-center justify-center rounded-md bg-hub-gradient px-7 text-sm font-black text-white">
                  Search
                </Link>
              </div>
            </Reveal>

            <div className="relative hidden min-h-[620px] lg:block">
              <LiveHeroMetrics />
            </div>
          </div>
        </div>
      </section>

      <BrandTicker brands={brandLogos} />

      <section className="py-10">
        <LiveStatsGrid />
      </section>

      <section id="how-it-works" className="py-16 md:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeader eyebrow="How it works" title="Simple Steps To Get Started" copy="Move from search to collaboration with a marketplace flow designed for fast decisions." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {steps.map((step, index) => {
                const icons = [Users, Search, CreditCard, Send];
                const Icon = icons[index];
                return (
                  <div key={step.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{step.number}</span>
                      <span className="grid h-12 w-12 place-items-center rounded-md bg-hub-gradient text-white shadow-lg">
                        <Icon size={21} />
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <LiveCategoryGrid />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <LiveTrendingInfluencers />
      </section>

      <section className="py-16 md:py-24">
        <div className="site-container overflow-hidden rounded-lg bg-ink text-white shadow-glow">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-8 md:p-12">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-sky">Creator portal</p>
              <h2 className="mt-4 text-4xl font-black tracking-normal md:text-6xl">Are You An Influencer?</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/74">
                Create your profile, showcase your talent and grow with brands. Upload sample videos, set your promotion price, and track analytics.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GradientButton href="/register">Join As Influencer</GradientButton>
                <div className="flex items-center gap-3 rounded-md bg-white/8 px-4 py-3">
                  <PlatformMark platform="TikTok" />
                  <span className="text-sm font-bold text-white/80">Global campaigns open now</span>
                </div>
              </div>
            </div>
            <div className="relative min-h-72">
              <Image src="/assets/influencehub-hero.png" alt="Creator joining InfluenceHub" fill className="object-cover" style={{ objectPosition: "74% 48%" }} sizes="(max-width: 1024px) 100vw, 560px" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent lg:from-transparent" />
              <div className="absolute bottom-6 right-6 rounded-lg bg-white/90 p-4 text-ink shadow-soft backdrop-blur">
                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                  <span className="font-black">+87% Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="site-container grid gap-4 md:grid-cols-3">
          {[
            { icon: Globe2, title: "Global reach", copy: "Search creators by country, state, category, platform, and audience profile." },
            { icon: Target, title: "Better matching", copy: "Compare engagement, followers, promotion pricing, and creator fit in one place." },
            { icon: LockKeyhole, title: "Locked contacts", copy: "Protect creator information until a brand subscribes and unlocks the profile." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-sky/10 text-sky">
                  <Icon size={21} />
                </span>
                <h3 className="mt-5 text-xl font-black text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
