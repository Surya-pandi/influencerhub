import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-magenta/15 bg-white/80 px-3 py-2 text-xs font-bold text-magenta shadow-sm">
      {children}
    </span>
  );
}

export function GradientButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "light";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-bold transition duration-300",
        variant === "primary"
          ? "bg-hub-gradient text-white shadow-[0_14px_32px_rgba(255,45,154,.26)] hover:-translate-y-0.5"
          : "border border-slate-200 bg-white text-ink shadow-sm hover:border-magenta/30 hover:text-magenta",
      )}
    >
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-magenta">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-ink md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-8 text-slate-600">{copy}</p> : null}
    </div>
  );
}

export function IconBadge({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">
      <Icon size={15} className="text-violet" />
      {label}
    </span>
  );
}

export function BrandTicker({ brands }: { brands: string[] }) {
  const repeated = [...brands, ...brands, ...brands, ...brands];
  return (
    <div className="overflow-hidden border-y border-slate-200 bg-white/70 py-5">
      <div className="ticker flex w-max gap-4">
        {repeated.map((brand, index) => (
          <span
            key={`${brand}-${index}`}
            className="grid h-11 min-w-36 place-items-center rounded-md border border-slate-200 bg-white px-6 text-sm font-black text-slate-500 shadow-sm"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LockedValue({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <span className="h-2 w-24 rounded-full bg-slate-200" />
    </div>
  );
}
