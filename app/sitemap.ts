import type { MetadataRoute } from "next";
import { influencers } from "@/lib/data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/influencers",
    "/categories",
    "/pricing",
    "/checkout",
    "/support",
    "/contact",
    "/creator-guide",
    "/brand-playbook",
    "/campaign-tools",
    "/api-docs",
    "/privacy",
    "/terms",
    "/login",
    "/register",
    "/dashboard",
    "/admin",
    ...influencers.map((influencer) => `/influencers/${influencer.id}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
