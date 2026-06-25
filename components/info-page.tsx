import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui";

export type InfoCard = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

export function InfoPage({
  eyebrow,
  title,
  copy,
  cards,
  ctaHref = "/contact",
  ctaLabel = "Contact us",
}: {
  eyebrow: string;
  title: string;
  copy: string;
  cards: InfoCard[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="pb-20 pt-32">
      <div className="site-container">
        <SectionHeader align="center" eyebrow={eyebrow} title={title} copy={copy} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-pink-50 text-magenta">
                  <Icon size={21} />
                </span>
                <h2 className="mt-6 text-2xl font-black text-ink">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.copy}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href={ctaHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-hub-gradient px-5 text-sm font-bold text-white shadow-[0_14px_32px_rgba(255,45,154,.26)] transition duration-300 hover:-translate-y-0.5"
          >
            {ctaLabel}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
