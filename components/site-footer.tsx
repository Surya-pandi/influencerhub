import Link from "next/link";
import { Instagram, Linkedin, Send, Twitter } from "lucide-react";

const groups = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Influencers", href: "/influencers" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Creator Guide", href: "/creator-guide" },
      { label: "Brand Playbook", href: "/brand-playbook" },
      { label: "Campaign Tools", href: "/campaign-tools" },
      { label: "API", href: "/api-docs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
  { icon: Twitter, label: "X", href: "https://x.com/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/" },
  { icon: Send, label: "Email", href: "mailto:hello@influencehub.demo" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white pb-24 pt-14 md:pb-10">
      <div className="site-container grid gap-10 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-hub-gradient text-sm font-black text-white">IH</span>
            <span className="text-xl font-black">
              Influence<span className="text-magenta">Hub</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
            A global marketplace for verified creators, transparent pricing, secure payments, and faster brand collaborations.
          </p>
          <div className="mt-6 flex gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  aria-label={link.label}
                  className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:border-magenta hover:text-magenta"
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-black text-ink">{group.title}</h3>
              <div className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-500 transition hover:text-magenta">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
