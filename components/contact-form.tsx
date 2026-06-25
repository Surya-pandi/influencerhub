"use client";

import { useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { cn } from "@/components/ui";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "configuration" | "error">("idle");
  const [notice, setNotice] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setNotice("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company"),
        role: formData.get("role"),
        message: formData.get("message"),
      }),
    });

    const payload = (await response.json().catch(() => ({}))) as { message?: string; error?: string; status?: string };

    if (response.ok) {
      setStatus("sent");
      setNotice("Message sent. The configured mailbox has been notified.");
      form.reset();
      return;
    }

    if (payload.status === "configuration_required" || response.status === 503) {
      setStatus("configuration");
      setNotice(payload.message ?? "Email notification is not configured yet.");
      return;
    }

    setStatus("error");
    setNotice(payload.error ?? "Message could not be sent right now.");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-md bg-hub-gradient text-white">
          <MessageCircle size={20} />
        </span>
        <div>
          <h2 className="text-xl font-black text-ink">Send a message</h2>
          <p className="text-sm font-semibold text-slate-500">We usually reply within one business day.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Name" name="name" required />
        <Input label="Email" name="email" type="email" required />
        <Input label="Company" name="company" />
        <Input label="Role" name="role" />
        <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
          Message
          <textarea
            name="message"
            required
            minLength={10}
            className="min-h-32 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-magenta"
          />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-hub-gradient px-5 text-sm font-bold text-white shadow-[0_14px_32px_rgba(255,45,154,.26)] transition duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80",
            status === "sending" && "is-click-loading pr-10",
          )}
        >
          <Send size={16} />
          {status === "sending" ? "Sending" : "Send Message"}
        </button>
        {notice ? (
          <span
            className={cn(
              "inline-flex items-center gap-2 text-sm font-bold",
              status === "sent" ? "text-emerald-600" : status === "configuration" ? "text-amber-600" : "text-red-600",
            )}
          >
            <CheckCircle2 size={16} />
            {notice}
          </span>
        ) : null}
      </div>
    </form>
  );
}

function Input({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 outline-none focus:border-magenta"
      />
    </label>
  );
}
