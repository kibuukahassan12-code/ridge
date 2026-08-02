import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

// Force this route to be evaluated at runtime, not build time,
// so the database module is not imported during the build.
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  fullName: z.string().min(2).max(160),
  email: z.string().email(),
  phone: z.string().max(60).optional(),
  subject: z.string().max(160).optional(),
  category: z.string().max(60).optional(),
  message: z.string().min(5).max(3000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    const [inserted] = await db
      .insert(contactMessages)
      .values({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        category: data.category ?? "general",
        message: data.message,
      })
      .returning({ id: contactMessages.id });

    return NextResponse.json({ ok: true, id: inserted?.id });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
