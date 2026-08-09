// InsForge edge function: AI concierge proxy
// Reads OPENROUTER_API_KEY from InsForge secrets (server-side)
// so the chatbot works on any deployment platform.

export default async function (req: Request): Promise<Response> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply:
            "I'm sorry, the AI concierge is not yet configured. Please contact us directly via WhatsApp at 0777483169 or email reservations@ridgehotelug.com for assistance.",
          error: "missing_api_key",
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!openRouterRes.ok) {
      const errText = await openRouterRes.text();
      console.error("OpenRouter error:", openRouterRes.status, errText);
      return new Response(
        JSON.stringify({
          reply:
            "I'm sorry, I'm having trouble connecting right now. Please try again or contact us directly on WhatsApp at 0777483169.",
          error: "openrouter_error",
        }),
        { status: openRouterRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await openRouterRes.json();
    const reply = data.choices?.[0]?.message?.content ||
      "I'm sorry, I couldn't process that. Please try again or contact us directly on WhatsApp.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI chat function error:", error);
    return new Response(
      JSON.stringify({
        reply:
          "I'm sorry, I'm having trouble connecting right now. Please try again or contact us directly on WhatsApp at 0777483169.",
        error: "internal_error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}