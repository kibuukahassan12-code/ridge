import { NextResponse } from "next/server";
import OpenAI from "openai";
import { site, navLinks, footerLinks } from "@/data/site";
import { rooms } from "@/data/rooms";
import { experiences } from "@/data/experiences";
import { faqCategories } from "@/data/faqs";
import { offers } from "@/data/offers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const hotelSystemPrompt = `You are an AI concierge for Ridge Hotel, a premier highland retreat in Fort Portal, Uganda. Your role is to answer questions about the hotel, its rooms, experiences, dining, events, policies, and the surrounding area. You can also accept booking requests.

**HOTEL INFORMATION:**
- Name: ${site.name}
- Tagline: ${site.tagline}
- Description: ${site.description}
- Address: ${site.address.line1}, ${site.address.line2}, ${site.address.region}, ${site.address.country}
- Check-in: ${site.checkIn}, Check-out: ${site.checkOut}
- Phone: ${site.contact.phoneDisplay} / ${site.contact.phoneDisplay2}
- Email: ${site.contact.email}
- Reservations Email: ${site.contact.reservationsEmail}
- WhatsApp: ${site.contact.whatsapp}
- Currency: ${site.currency}
- Room Count: ${site.roomCount}
- Conference Capacity: ${site.conferenceCapacity} delegates

**ROOMS:**
${rooms.map(r => `- ${r.name}: ${r.tagline}. ${r.description} Bed: ${r.bed}. Occupancy: ${r.occupancy}. View: ${r.view}. Price: $${r.price}/night. Size: ${r.size}. Amenities: ${r.amenities.join(", ")}`).join("\n")}

**EXPERIENCES / ATTRACTIONS:**
${experiences.map(e => `- ${e.name} (${e.distance}): ${e.description}. Duration: ${e.duration}. Best for: ${e.bestFor.join(", ")}`).join("\n")}

**SPECIAL OFFERS / PACKAGES:**
${offers.map(o => `- ${o.name}: ${o.summary}. Price: $${o.price} (was $${o.originalPrice}). ${o.nights} nights. Inclusions: ${o.inclusions.join(", ")}`).join("\n")}

**FREQUENTLY ASKED QUESTIONS:**
${faqCategories.map(cat => `[${cat.category}]\n${cat.items.map(i => `Q: ${i.q}\nA: ${i.a}`).join("\n")}`).join("\n\n")}

**NAVIGATION LINKS:**
${navLinks.map(l => `- ${l.label}: ${l.href}`).join("\n")}

**WHEN A USER WANTS TO BOOK:**
Ask them for their details (name, email, phone, check-in/check-out dates, room preference, number of guests, special requests). Once you have all the info, format it as a booking JSON and prefix your response with "BOOKING_DATA:" followed by the JSON object. The booking JSON should have fields: fullName, email, phone, roomType (optional), checkIn, checkOut, adults, children (optional), message (optional).

**RULES:**
1. Be warm, professional, and helpful — you represent a luxury hotel.
2. Keep responses concise but complete.
3. If you don't know something, be honest and suggest the guest contact the hotel directly.
4. Always mention you can connect them to the reservations team via WhatsApp if needed.
5. For directions, the hotel is at Boma Road, The Ridge, Fort Portal — walking distance to town centre.
6. The hotel opened in 2026.
7. The property has 21 rooms, all with private balconies.
8. Parking is free with 24-hour security.
9. Wi-Fi is complimentary throughout the property.
10. You can also browse the website yourself by visiting the relevant pages.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Check for booking data in the last user message
    const lastUserMsg = messages.filter((m: { role: string }) => m.role === "user").pop();
    let bookingData = null;
    if (lastUserMsg?.content?.includes("BOOKING_DATA:")) {
      const jsonMatch = lastUserMsg.content.match(/BOOKING_DATA:\s*({[^}]+})/);
      if (jsonMatch) {
        try {
          bookingData = JSON.parse(jsonMatch[1]);
        } catch {}
      }
    }

    // If we extracted booking data, submit it to the booking API
    if (bookingData) {
      try {
        const origin = request.headers.get("origin") || "http://localhost:3000";
        await fetch(`${origin}/api/booking`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });
      } catch (err) {
        console.error("Failed to submit booking via chat:", err);
      }
    }

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: hotelSystemPrompt },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again or contact us directly on WhatsApp.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API error:", error);

    // If the API key is not configured
    if (error?.status === 401 || error?.message?.includes("401")) {
      return NextResponse.json({
        reply: "I'm sorry, the AI concierge is not yet configured. Please contact us directly via WhatsApp at 0777483169 or email reservations@ridgehotelug.com for assistance.",
        error: "unauthorized",
      });
    }

    return NextResponse.json({
      reply: "I'm sorry, I'm having trouble connecting right now. Please try again or contact us directly on WhatsApp at 0777483169.",
    });
  }
}