import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { bookingInquiries } from "@/db/schema";

const bookingSchema = z.object({
  fullName: z.string().min(2).max(160),
  email: z.string().email(),
  phone: z.string().max(60).optional(),
  roomType: z.string().max(120).optional(),
  checkIn: z.string().max(20).optional(),
  checkOut: z.string().max(20).optional(),
  adults: z.coerce.number().int().min(1).max(20).optional(),
  children: z.coerce.number().int().min(0).max(20).optional(),
  promoCode: z.string().max(60).optional(),
  airportPickup: z.boolean().optional(),
  packageName: z.string().max(160).optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    const [inserted] = await db
      .insert(bookingInquiries)
      .values({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        roomType: data.roomType,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        adults: data.adults ?? 2,
        children: data.children ?? 0,
        promoCode: data.promoCode,
        airportPickup: data.airportPickup ?? false,
        packageName: data.packageName,
        message: data.message,
      })
      .returning({ id: bookingInquiries.id });

    return NextResponse.json({ ok: true, id: inserted?.id });
  } catch (error) {
    console.error("Booking submission failed", error);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
