import Link from "next/link";
import { HelpCircle, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui";

const topics = [
  { icon: HelpCircle, title: "Account help", copy: "Get help with login, registration, brand accounts, and creator profiles." },
  { icon: ShieldCheck, title: "Unlocks and privacy", copy: "Learn how protected contact details, profile unlocks, and subscriptions work." },
  { icon: MessageCircle, title: "Campaign support", copy: "Ask about creator matching, profile quality, campaign setup, and marketplace data." },
];

export default function SupportPage() {
  return (
    <section className="pb-20 pt-32">
      <div className="site-container">
        <SectionHeader
          align="center"
          eyebrow="Support"
          title="How can we help?"
          copy="Find quick help for brand accounts, creator onboarding, subscriptions, and marketplace workflows."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <article key={topic.title} className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-pink-50 text-magenta">
                  <Icon size={21} />
                </span>
                <h2 className="mt-6 text-2xl font-black text-ink">{topic.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{topic.copy}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-ink">Need direct support?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Send us a message and we will help route your request.</p>
            </div>
            <Link href="/contact" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-hub-gradient px-5 text-sm font-bold text-white sm:w-auto">
              <Mail size={16} />
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
