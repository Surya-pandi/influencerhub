"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Grid3X3, Home, LogIn, Menu, Search, UserPlus, X } from "lucide-react";
import { cn } from "@/components/ui";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/influencers", label: "Influencers" },
  { href: "/categories", label: "Categories" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
];

const bottomLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/influencers", label: "Search", icon: Search },
  { href: "/categories", label: "Categories", icon: Grid3X3 },
  { href: "/register", label: "Join", icon: UserPlus },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between rounded-lg border border-white/80 bg-white/78 px-4 shadow-soft backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-md bg-hub-gradient text-sm font-black text-white shadow-[0_10px_26px_rgba(255,45,154,.28)]">
            IH
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-black text-ink">
              Influence<span className="text-magenta">Hub</span>
            </span>
            <span className="block text-[11px] font-semibold text-slate-500">Find. Collaborate. Grow.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-magenta",
                  active && "bg-pink-50 text-magenta",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-ink shadow-sm" href="/login">
            <LogIn size={16} />
            Login
          </Link>
          <Link className="inline-flex h-10 items-center gap-2 rounded-md bg-hub-gradient px-4 text-sm font-bold text-white shadow-[0_12px_26px_rgba(255,45,154,.25)]" href="/register">
            <UserPlus size={16} />
            Register
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-ink shadow-sm lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-2 grid max-w-[1240px] gap-2 rounded-lg border border-white/80 bg-white/95 p-3 shadow-soft backdrop-blur-xl lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-bold text-slate-700 hover:bg-pink-50 hover:text-magenta"
            >
              {link.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link href="/login" onClick={() => setOpen(false)} className="rounded-md border border-slate-200 px-3 py-3 text-center text-sm font-bold">
              Login
            </Link>
            <Link href="/register" onClick={() => setOpen(false)} className="rounded-md bg-hub-gradient px-3 py-3 text-center text-sm font-bold text-white">
              Register
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-lg border border-white/80 bg-white/92 p-1 shadow-soft backdrop-blur-xl md:hidden">
      {bottomLinks.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "grid min-h-12 place-items-center rounded-md px-1 text-[11px] font-bold text-slate-500",
              active && "bg-pink-50 text-magenta",
            )}
          >
            <Icon size={17} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
