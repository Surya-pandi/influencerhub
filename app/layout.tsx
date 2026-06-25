import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { BottomNav, SiteHeader } from "@/components/site-header";
import { GlobalInteractions } from "@/components/global-interactions";

export const metadata: Metadata = {
  title: "InfluenceHub | Global Influencer Marketplace",
  description: "Discover verified influencers worldwide, compare prices, unlock contacts, and grow your brand.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalInteractions />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <BottomNav />
      </body>
    </html>
  );
}
