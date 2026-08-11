"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { rooms } from "@/data/rooms";
import { offers } from "@/data/offers";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  roomType: z.string().optional(),
  checkIn: z.string().min(1, "Select a check-in date"),
  checkOut: z.string().min(1, "Select a check-out date"),
  adults: z.number().min(1).max(12),
  children: z.number().min(0).max(12),
  promoCode: z.string().optional(),
  airportPickup: z.boolean().optional(),
  packageName: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function BookingForm({ defaultRoom }: { defaultRoom?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      adults: 2,
      children: 0,
      roomType: defaultRoom ?? "",
      airportPickup: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setStatus("loading");

    // Build a formatted WhatsApp message with all client details
    const lines = [
      "🏨 *New Reservation Request — Ridge Hotel*",
      "",
      `👤 *Name:* ${values.fullName}`,
      `📧 *Email:* ${values.email}`,
      values.phone ? `📞 *Phone:* ${values.phone}` : null,
      values.roomType ? `🛏️ *Room Type:* ${values.roomType}` : null,
      `📅 *Check-In:* ${values.checkIn}`,
      `📅 *Check-Out:* ${values.checkOut}`,
      `👥 *Adults:* ${values.adults}`,
      `👶 *Children:* ${values.children}`,
      values.packageName ? `🎁 *Package:* ${values.packageName}` : null,
      values.promoCode ? `🏷️ *Promo Code:* ${values.promoCode}` : null,
      values.airportPickup ? "🚗 *Airport Pickup:* Yes" : null,
      values.message ? `📝 *Notes:* ${values.message}` : null,
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
        <h3 className="font-display text-2xl text-forest-950">Enquiry Received</h3>
        <p className="max-w-md text-sm text-forest-800/75">
          Thank you — our reservations team will confirm availability and reply within 24 hours. Opening WhatsApp for instant response...
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
      <Field label="Room Type" htmlFor="roomType">
        <select id="roomType" className="input" {...register("roomType")}>
          <option value="">No preference</option>
          {rooms.map((room) => (
            <option key={room.slug} value={room.name}>
              {room.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Check-In" htmlFor="checkIn" error={errors.checkIn?.message}>
        <input id="checkIn" type="date" className="input" {...register("checkIn")} />
      </Field>
      <Field label="Check-Out" htmlFor="checkOut" error={errors.checkOut?.message}>
        <input id="checkOut" type="date" className="input" {...register("checkOut")} />
      </Field>
      <Field label="Adults" htmlFor="adults">
        <input id="adults" type="number" min={1} max={12} className="input" {...register("adults", { valueAsNumber: true })} />
      </Field>
      <Field label="Children" htmlFor="children">
        <input id="children" type="number" min={0} max={12} className="input" {...register("children", { valueAsNumber: true })} />
      </Field>
      <Field label="Package (optional)" htmlFor="packageName">
        <select id="packageName" className="input" {...register("packageName")}>
          <option value="">No package</option>
          {offers.map((offer) => (
            <option key={offer.slug} value={offer.name}>
              {offer.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Promo Code (optional)" htmlFor="promoCode">
        <input id="promoCode" className="input" {...register("promoCode")} />
      </Field>

      <label className="flex items-center gap-3 sm:col-span-2">
        <input type="checkbox" className="h-4 w-4 rounded border-stone-400 text-gold-500 focus:ring-gold-400" {...register("airportPickup")} />
        <span className="text-sm text-forest-800/80">I would like airport pickup arranged</span>
      </label>

      <Field label="Anything else we should know?" htmlFor="message" full>
        <textarea id="message" rows={4} className="input resize-none" {...register("message")} />
      </Field>

      {status === "error" ? (
        <p className="sm:col-span-2 text-sm text-red-600">Something went wrong. Please try again or WhatsApp us directly.</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest-900 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-ivory-100 transition-colors hover:bg-forest-800 disabled:opacity-60 sm:col-span-2"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Request Reservation
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
