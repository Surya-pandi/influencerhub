import { BarChart3, Bookmark, Camera, CreditCard, LineChart, Upload, UserRoundPen, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui";

const influencerTools = [
  { icon: Users, label: "Profile", value: "Not connected" },
  { icon: UserRoundPen, label: "Edit Profile", value: "0 fields" },
  { icon: Upload, label: "Upload Videos", value: "0 clips" },
  { icon: BarChart3, label: "Analytics", value: "0%" },
];

const customerTools = [
  { icon: Bookmark, label: "Saved Influencers", value: "0" },
  { icon: CreditCard, label: "Subscriptions", value: "No active plan" },
  { icon: Camera, label: "Unlocked Contacts", value: "0" },
];

export default function DashboardPage() {
  return (
    <section className="pb-20 pt-32">
      <div className="site-container">
        <SectionHeader eyebrow="Dashboard" title="Campaign and creator workspace" copy="A compact view for influencer profile management and brand subscription activity." />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.9fr]">
          <Panel title="Influencer">
            <div className="grid gap-4 sm:grid-cols-2">
              {influencerTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.label} className="rounded-lg bg-slate-50 p-4">
                    <Icon size={20} className="text-magenta" />
                    <p className="mt-5 text-sm font-bold text-slate-500">{tool.label}</p>
                    <p className="mt-1 text-2xl font-black text-ink">{tool.value}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-4">
                <span className="grid h-24 w-24 shrink-0 place-items-center rounded-md bg-slate-50 text-slate-500">
                  <Camera size={28} />
                </span>
                <div>
                  <h3 className="text-xl font-black text-ink">No creator profile connected</h3>
                  <p className="text-sm font-semibold text-slate-500">Create a real Supabase influencer row to populate this area.</p>
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Customer">
            <div className="grid gap-4">
              {customerTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.label} className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-md bg-white text-violet shadow-sm">
                        <Icon size={19} />
                      </span>
                      <span className="font-black text-ink">{tool.label}</span>
                    </div>
                    <span className="font-black text-magenta">{tool.value}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-lg bg-ink p-5 text-white">
              <LineChart size={24} className="text-sky" />
              <p className="mt-5 text-3xl font-black">0</p>
              <p className="text-sm font-semibold text-white/68">Projected campaign reach this week</p>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="mb-5 text-2xl font-black text-ink">{title}</h2>
      {children}
    </article>
  );
}
