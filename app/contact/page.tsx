import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionHeader } from "@/components/ui";

export default function ContactPage() {
  return (
    <section className="pb-20 pt-32">
      <div className="site-container grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SectionHeader eyebrow="Contact" title="Talk to InfluenceHub" copy="For brand partnerships, creator onboarding, and platform support." />
          <div className="mt-8 grid gap-4">
            {[
              { icon: Mail, label: "Email", value: "hello@influencehub.demo" },
              { icon: Phone, label: "Phone", value: "+1 555 012 0198" },
              { icon: MapPin, label: "HQ", value: "Global remote marketplace" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex min-w-0 flex-col items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-sky/10 text-sky">
                    <Icon size={19} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
                    <p className="font-black text-ink">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
