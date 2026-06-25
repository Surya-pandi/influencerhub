import Link from "next/link";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { pricingPlans } from "@/lib/data";

const planSlugByName: Record<string, string> = {
  Starter: "starter",
  "Brand Pro": "brand-pro",
  Agency: "agency",
};

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan = "brand-pro" } = await searchParams;
  const selected = pricingPlans.find((item) => planSlugByName[item.name] === plan) ?? pricingPlans[1];

  return (
    <section className="pb-20 pt-32">
      <div className="site-container grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-magenta">Checkout</p>
          <h1 className="mt-4 text-5xl font-black leading-tight tracking-normal text-ink md:text-7xl">Unlock creator contacts</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Review your selected plan before connecting live Stripe checkout.
          </p>
        </div>
        <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <span className="grid h-12 w-12 place-items-center rounded-md bg-hub-gradient text-white">
            <CreditCard size={22} />
          </span>
          <h2 className="mt-6 text-3xl font-black text-ink">{selected.name}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{selected.description}</p>
          <div className="mt-6 flex items-end gap-1">
            <span className="text-5xl font-black text-ink">{selected.price}</span>
            <span className="pb-2 text-sm font-bold text-slate-500">/ month</span>
          </div>
          <div className="mt-6 grid gap-3">
            {selected.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                <CheckCircle2 size={17} className="text-emerald-600" />
                {feature}
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2 font-black text-ink">
              <ShieldCheck size={18} className="text-magenta" />
              Stripe setup required
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add live Stripe price IDs and wire the checkout route when you are ready to accept payments.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/pricing" className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-slate-200 bg-white px-5 text-sm font-bold text-ink sm:w-auto">
              Change plan
            </Link>
            <Link href="/support" className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-hub-gradient px-5 text-sm font-bold text-white sm:w-auto">
              Get checkout support
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
