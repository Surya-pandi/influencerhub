import { z } from "zod";

export const checkoutRequestSchema = z.object({
  plan: z.enum(["starter", "brand-pro", "agency"]),
});

export const stripePlanLookup: Record<z.infer<typeof checkoutRequestSchema>["plan"], string | undefined> = {
  starter: process.env.STRIPE_PRICE_BRAND_PRO,
  "brand-pro": process.env.STRIPE_PRICE_BRAND_PRO,
  agency: process.env.STRIPE_PRICE_AGENCY,
};
