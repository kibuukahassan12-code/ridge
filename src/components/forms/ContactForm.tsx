"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  category: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Tell us a little more"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { category: "general" } });

  async function onSubmit(values: FormValues) {
    setStatus("loading");

    // Build a formatted WhatsApp message with all client details
    const lines = [
      "🏨 *New Enquiry — Ridge Hotel*",
      "",
      `👤 *Name:* ${values.fullName}`,
      `📧 *Email:* ${values.email}`,
      values.phone ? `📞 *Phone:* ${values.phone}` : null,
      values.category ? `📋 *Enquiry Type:* ${values.category}` : null,
      values.subject ? `📝 *Subject:* ${values.subject}` : null,
      `💬 *Message:* ${values.message}`,
    ].filter(Boolean);

    const message = lines.join("\n");
    const whatsappUrl = `${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

    // Show success state first, then open WhatsApp after a brief delay
    setStatus("success");
    reset();

    // Open WhatsApp after a short delay so the user sees the success message
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 600);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold-400/40 bg-gold-300/10 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold-600" />
        <h3 className="font-display text-2xl text-forest-950">Message Sent</h3>
        <p className="max-w-md text-sm text-forest-800/75">
          Thank you for reaching out. A member of the Ridge Hotel team will respond within one business day. Opening WhatsApp for instant response...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2" noValidate>
      <Field label="Full Name" htmlFor="fullName" error={errors.fullName?.message}>
        <input id="fullName" className="input" {...register("fullName")} />
      </Field>
      <Field label="Email Address" htmlFor="email" error={errors.email?.message}>
        <input id="email" type="email" className="input" {...register("email")} />
      </Field>
      <Field label="Phone Number" htmlFor="phone">
        <input id="phone" className="input" {...register("phone")} />
      </Field>
      <Field label="Enquiry Type" htmlFor="category">
        <select id="category" className="input" {...register("category")}>
          <option value="general">General Enquiry</option>
          <option value="wedding">Wedding</option>
          <option value="conference">Conference / Meeting</option>
          <option value="group">Group Booking</option>
          <option value="press">Press / Media</option>
        </select>
      </Field>
      <Field label="Subject" htmlFor="subject" full>
        <input id="subject" className="input" {...register("subject")} />
      </Field>
      <Field label="Message" htmlFor="message" error={errors.message?.message} full>
        <textarea id="message" rows={5} className="input resize-none" {...register("message")} />
      </Field>

      {status === "error" ? <p className="sm:col-span-2 text-sm text-red-600">Something went wrong. Please try again.</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest-900 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-ivory-100 transition-colors hover:bg-forest-800 disabled:opacity-60 sm:col-span-2"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send Message
      </button>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.85rem;
          border: 1px solid var(--color-stone-400);
          background: var(--color-ivory-100);
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: var(--color-forest-950);
        }
        .input:focus {
          outline: 2px solid var(--color-gold-500);
          outline-offset: 1px;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
  full,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-forest-800/70">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
