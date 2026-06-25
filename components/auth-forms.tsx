"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, BriefcaseBusiness, Camera, CheckCircle2, Lock, Mail, Upload, UserPlus, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/components/ui";

type AccountRole = "brand" | "influencer";
type RegisterField = {
  label: string;
  name: string;
  type?: string;
  options?: string[];
};

const roleConfig = {
  brand: {
    label: "Brand",
    icon: BriefcaseBusiness,
    title: "Brand account",
    description: "Access saved creators, subscriptions, and contact unlocks.",
  },
  influencer: {
    label: "Influencer",
    icon: Camera,
    title: "Influencer account",
    description: "Manage your creator profile, sample videos, and campaign pricing.",
  },
} satisfies Record<AccountRole, { label: string; icon: LucideIcon; title: string; description: string }>;

const influencerRegisterFields: RegisterField[] = [
  { label: "Display name", name: "displayName" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
  { label: "Photo URL", name: "photo" },
  { label: "Platform", name: "platform", type: "select", options: ["Instagram", "YouTube", "TikTok", "Twitch"] },
  { label: "Profile link", name: "profileLink", type: "url" },
  { label: "Country", name: "country" },
  { label: "State", name: "state" },
  { label: "Category", name: "category" },
  { label: "Followers", name: "followers", type: "number" },
  { label: "Promotion price", name: "price", type: "number" },
  { label: "Contact email", name: "contactEmail", type: "email" },
];

const brandRegisterFields: RegisterField[] = [
  { label: "Name", name: "name" },
  { label: "Company", name: "company" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<AccountRole>("brand");
  const [loading, setLoading] = useState(false);
  const active = roleConfig[role];
  const Icon = active.icon;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => router.push("/dashboard"), 750);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <RoleSwitch role={role} onRoleChange={setRole} />

      <div className="mt-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-md bg-hub-gradient text-white">
          <Icon size={22} />
        </span>
        <div className="min-w-0">
          <h2 className="text-2xl font-black text-ink">Login as {active.label}</h2>
          <p className="text-sm font-semibold text-slate-500">{active.description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <Input label="Email" name="email" type="email" icon={Mail} />
        <Input label="Password" name="password" type="password" icon={Lock} />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <SubmitButton loading={loading} label={`Login as ${active.label}`} loadingLabel="Logging in" />
        <a href="/register" className="text-sm font-black text-magenta">
          Create account
        </a>
      </div>

      <button type="button" className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-200 text-sm font-black text-slate-700 transition hover:border-magenta/30 hover:text-magenta">
        <Mail size={16} /> Continue with magic link
      </button>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<AccountRole>("brand");
  const [loading, setLoading] = useState(false);
  const fields = useMemo(() => (role === "brand" ? brandRegisterFields : influencerRegisterFields), [role]);
  const active = roleConfig[role];
  const Icon = active.icon;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => router.push("/dashboard"), 850);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <RoleSwitch role={role} onRoleChange={setRole} />

      <div className="mt-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-md bg-hub-gradient text-white">
          <Icon size={22} />
        </span>
        <div className="min-w-0">
          <h2 className="text-2xl font-black text-ink">Create {active.label} Account</h2>
          <p className="text-sm font-semibold text-slate-500">{active.description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <Input
            key={`${role}-${field.name}`}
            label={field.label}
            name={field.name}
            type={field.type}
            options={field.options}
            wide={field.name === "profileLink" || field.name === "photo"}
          />
        ))}
        {role === "influencer" ? (
          <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
            Sample videos
            <textarea name="videos" className="min-h-28 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 outline-none transition focus:border-magenta" />
          </label>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <SubmitButton loading={loading} label={`Create ${active.label} Account`} loadingLabel="Creating account" />
        <a href="/login" className="text-sm font-black text-magenta">
          Already registered?
        </a>
      </div>
    </form>
  );
}

export function AuthSummary({ role }: { role?: AccountRole }) {
  const items =
    role === "influencer"
      ? [
          { icon: Upload, label: "Profile setup", value: "Media and links" },
          { icon: BarChart3, label: "Campaign rates", value: "Price control" },
          { icon: CheckCircle2, label: "Discovery", value: "Live marketplace" },
        ]
      : [
          { icon: Users, label: "Creator search", value: "Live profiles" },
          { icon: CheckCircle2, label: "Contact unlocks", value: "Protected access" },
          { icon: BarChart3, label: "Campaign view", value: "Dashboard ready" },
        ];

  return (
    <div className="grid gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-pink-50 text-magenta">
                <Icon size={18} />
              </span>
              <span className="min-w-0 font-black text-ink">{item.label}</span>
            </div>
            <span className="text-sm font-bold text-slate-500">{item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

function RoleSwitch({ role, onRoleChange }: { role: AccountRole; onRoleChange: (role: AccountRole) => void }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] rounded-lg border border-slate-200 bg-slate-50 p-1">
      {(Object.keys(roleConfig) as AccountRole[]).map((option) => {
        const Icon = roleConfig[option].icon;
        const active = role === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onRoleChange(option)}
            className={cn(
              "flex h-11 min-w-0 items-center justify-center gap-2 rounded-md px-2 text-sm font-black transition",
              active ? "bg-white text-magenta shadow-sm" : "text-slate-500 hover:text-ink",
            )}
            aria-pressed={active}
          >
            <Icon size={16} className="shrink-0" />
            <span className="min-w-0 truncate">{roleConfig[option].label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  icon: Icon,
  options,
  wide = false,
}: {
  label: string;
  name: string;
  type?: string;
  icon?: LucideIcon;
  options?: string[];
  wide?: boolean;
}) {
  return (
    <label className={cn("grid gap-2 text-sm font-bold text-slate-700", wide && "md:col-span-2")}>
      {label}
      <span className="flex min-w-0 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 transition focus-within:border-magenta">
        {Icon ? <Icon size={16} className="text-slate-400" /> : null}
        {options ? (
          <select name={name} className="h-11 w-full min-w-0 bg-transparent text-sm outline-none">
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input name={name} type={type} className="h-11 w-full min-w-0 bg-transparent text-sm outline-none" />
        )}
      </span>
    </label>
  );
}

function SubmitButton({ loading, label, loadingLabel }: { loading: boolean; label: string; loadingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-hub-gradient px-5 text-sm font-bold text-white shadow-[0_14px_32px_rgba(255,45,154,.26)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80 sm:w-auto",
        loading && "is-click-loading pr-10",
      )}
    >
      <UserPlus size={16} />
      {loading ? loadingLabel : label}
    </button>
  );
}
