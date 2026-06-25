import { BadgeCheck, FileText, Handshake } from "lucide-react";
import { InfoPage } from "@/components/info-page";

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Terms"
      title="Marketplace terms overview"
      copy="A simple terms overview for brands and creators while production legal language is finalized."
      cards={[
        { icon: Handshake, title: "Fair collaboration", copy: "Brands and creators should keep campaign expectations, pricing, and deliverables clear before work begins." },
        { icon: BadgeCheck, title: "Profile accuracy", copy: "Creator profiles should represent real accounts, real pricing, and current contact information." },
        { icon: FileText, title: "Platform use", copy: "Use the marketplace responsibly and follow payment, unlock, and privacy policies." },
      ]}
      ctaHref="/support"
      ctaLabel="Ask about terms"
    />
  );
}
