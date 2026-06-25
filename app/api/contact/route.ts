import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(3000),
});

export async function POST(request: Request) {
  const parsed = contactRequestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete the contact form with a valid email and message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "InfluenceHub <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        status: "configuration_required",
        message: "Set RESEND_API_KEY and CONTACT_NOTIFICATION_EMAIL to send contact notifications.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { name, email, company, role, message } = parsed.data;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New InfluenceHub contact message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      `Role: ${role || "Not provided"}`,
      "",
      message,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2 style="margin:0 0 16px">New InfluenceHub contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
        <p><strong>Role:</strong> ${escapeHtml(role || "Not provided")}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `,
  });

  if (error) {
    console.error("InfluenceHub contact notification failed", error);
    return NextResponse.json({ error: "Message could not be sent right now." }, { status: 502 });
  }

  return NextResponse.json({ status: "sent" });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
