import { DollarSign, Shield, Trash2, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui";

export default function AdminPage() {
  return (
    <section className="pb-20 pt-32">
      <div className="site-container">
        <SectionHeader eyebrow="Admin panel" title="Manage users, subscriptions, and revenue" copy="A control surface for marketplace operations and moderation." />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: "Users", value: "0" },
            { icon: Shield, label: "Subscriptions", value: "0" },
            { icon: DollarSign, label: "Revenue", value: "$0" },
            { icon: Trash2, label: "Moderation", value: "0" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Icon size={21} className="text-magenta" />
                <p className="mt-5 text-sm font-bold text-slate-500">{item.label}</p>
                <p className="mt-1 text-3xl font-black text-ink">{item.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
          <div className="hidden grid-cols-[1.2fr_.8fr_.8fr_.8fr_auto] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500 md:grid">
            <span>User</span>
            <span>Role</span>
            <span>Plan</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          <div className="px-4 py-8 text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-md bg-slate-50 text-slate-500">
              <Trash2 size={18} />
            </span>
            <p className="mt-4 font-black text-ink">No admin user rows loaded</p>
            <p className="mt-2 text-sm text-slate-600">Connect this view to real Supabase users before showing operational data.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
