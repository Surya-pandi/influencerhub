import { Check, Crown } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { GradientButton, SectionHeader, cn } from "@/components/ui";

export default function PricingPage() {
  return (
    <section className="pb-20 pt-32">
      <div className="site-container">
        <SectionHeader align="center" eyebrow="Subscription plans" title="Unlock creator contact details" copy="Choose the access level that matches your campaign volume. Stripe checkout wiring is prepared for live keys." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article key={plan.name} className={cn("rounded-lg border bg-white p-6 shadow-sm", plan.featured ? "border-magenta shadow-glow" : "border-slate-200")}>
              {plan.featured ? (
                <span className="mb-5 inline-flex items-center gap-2 rounded-md bg-pink-50 px-3 py-2 text-xs font-black text-magenta">
                  <Crown size={15} /> Most popular
                </span>
              ) : null}
              <h2 className="text-2xl font-black text-ink">{plan.name}</h2>
              <p className="mt-3 min-h-14 text-sm leading-7 text-slate-600">{plan.description}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-black text-ink">{plan.price}</span>
                <span className="pb-2 text-sm font-bold text-slate-500">/ month</span>
              </div>
              <div className="mt-7">
                <GradientButton href={`/checkout?plan=${plan.name.toLowerCase().replace(" ", "-")}`} variant={plan.featured ? "primary" : "light"}>
                  Unlock Now
                </GradientButton>
              </div>
              <div className="mt-7 grid gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-emerald-50 text-emerald-600">
                      <Check size={14} />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
