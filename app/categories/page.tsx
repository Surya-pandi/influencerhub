import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/lib/data";
import { SectionHeader } from "@/components/ui";

export default function CategoriesPage() {
  return (
    <section className="pb-20 pt-32">
      <div className="site-container">
        <SectionHeader eyebrow="Creator verticals" title="Top Categories" copy="Browse high-performing creators by niche and audience intent." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.name} href={`/influencers?category=${category.name}`} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
              <span className="grid h-12 w-12 place-items-center rounded-md text-white" style={{ backgroundColor: category.accent }}>
                <Sparkles size={20} />
              </span>
              <h2 className="mt-6 text-2xl font-black text-ink">{category.name}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">{category.count} verified creators</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-magenta">
                Explore <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
