export type Platform = "Instagram" | "YouTube" | "TikTok" | "Twitch";

export type Influencer = {
  id: string;
  name: string;
  handle: string;
  photo?: string;
  category: string;
  platform: Platform;
  country: string;
  state: string;
  followers: string;
  followerCount: number;
  price: number;
  rating: number;
  engagement: string;
  audience: string;
  verified: boolean;
  imagePosition: string;
  bio: string;
  sampleVideos: string[];
  email: string;
  phone: string;
};

export const brandLogos = ["Amazon", "Airbnb", "Google", "Netflix", "Spotify", "Walmart"];

export const stats = [
  { number: "0", label: "Influencers Worldwide" },
  { number: "0", label: "Countries Covered" },
  { number: "0", label: "Brands Connected" },
  { number: "0%", label: "Customer Satisfaction" },
];

export const categories = [
  { name: "Fashion", count: "0", accent: "#FF2D9A" },
  { name: "Lifestyle", count: "0", accent: "#2EE59D" },
  { name: "Fitness", count: "0", accent: "#6C3BFF" },
  { name: "Technology", count: "0", accent: "#00C2FF" },
  { name: "Gaming", count: "0", accent: "#7658FF" },
  { name: "Food", count: "0", accent: "#FF7A59" },
  { name: "Travel", count: "0", accent: "#2AA8FF" },
  { name: "Beauty", count: "0", accent: "#FF5FB2" },
];

export const steps = [
  { number: "01", title: "Create Account", description: "Register as brand or influencer" },
  { number: "02", title: "Find Perfect Match", description: "Search influencers by category" },
  { number: "03", title: "Subscribe To Unlock", description: "Unlock contact details" },
  { number: "04", title: "Connect & Collaborate", description: "Start partnership" },
];

export const influencers: Influencer[] = [];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    description: "For first campaigns and solo brand teams.",
    features: ["25 profile unlocks", "Saved influencer lists", "Basic country filters", "Email support"],
  },
  {
    name: "Brand Pro",
    price: "$149",
    description: "For teams running monthly creator campaigns.",
    features: ["250 profile unlocks", "Advanced filters", "Campaign shortlists", "Priority support"],
    featured: true,
  },
  {
    name: "Agency",
    price: "$399",
    description: "For agencies managing multiple clients.",
    features: ["Unlimited unlocks", "Team seats", "Revenue reporting", "Dedicated success manager"],
  },
];

export function getInfluencer(id: string) {
  return influencers.find((influencer) => influencer.id === id);
}
