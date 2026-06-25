import { NextRequest, NextResponse } from "next/server";
import { checkoutRequestSchema } from "@/lib/payments";

export async function GET(request: NextRequest) {
  const plan = request.nextUrl.searchParams.get("plan") ?? "brand-pro";
  const parsed = checkoutRequestSchema.safeParse({ plan });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({
      status: "configuration_required",
      message: "Set STRIPE_SECRET_KEY and Stripe price IDs to create live checkout sessions.",
      plan: parsed.data.plan,
    });
  }

  return NextResponse.json({
    status: "ready_for_stripe_session",
    plan: parsed.data.plan,
  });
}
