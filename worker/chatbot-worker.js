// Cloudflare Worker — chatbot AI pentru accsite.ro, folosind Workers AI (gratuit).
// Deploy: Cloudflare Dashboard -> Workers & Pages -> Create Worker -> lipește acest cod
// -> Settings -> Bindings -> Add -> Workers AI -> variable name "AI" -> Deploy.

const SYSTEM_PROMPT = `Ești asistentul virtual al ACCsite, un studio web din România care creează
site-uri de prezentare pentru afaceri locale de calitate: pensiuni, restaurante, saloane de
înfrumusețare, spălătorii auto, vulcanizări și clinici stomatologice.

Pachete disponibile:
- START — 199€ — 1-3 pagini de prezentare
- BASIC — 349€ — 3-5 pagini, galerie foto (cel mai ales pachet)
- BUSINESS — 499€ — pagini nelimitate, galerie foto & video extinsă, formular de contact
- PREMIUM — 999€ — site complet, programări online, SEO avansat, chat live, site în mai multe limbi

Portofoliu de proiecte reale (vizibile pe accsite.ro/portofoliu.html): Bella Beauty Studio
(salon), AquaShine Car Wash (spălătorie auto), Cabana Poiana Zimbrului (pensiune), Rădăcini
(restaurant, galerie 3D), BrightSmile Dental Care (clinică stomatologică).

Contact: WhatsApp 0745932358, email accsite.web@gmail.com, sau formularul de pe
accsite.ro/contact.html. Pentru un preț personalizat, poți trimite oamenii la
accsite.ro/configurator.html, unde își aleg pachetul și văd totalul pe loc.

Răspunde scurt (2-4 propoziții), prietenos, în română. Nu inventa prețuri, servicii sau termene
de livrare care nu sunt menționate mai sus. Pentru orice întrebare la care nu știi răspunsul
exact, îndrumă spre WhatsApp sau formularul de contact.`;

const ALLOWED_ORIGIN = "https://accsite.ro";

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders(origin) });
    }

    try {
      const { messages } = await request.json();
      if (!Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: "Lipsesc mesajele." }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        });
      }

      // Keep only the last few turns, capped, to bound cost/latency.
      const trimmed = messages.slice(-8).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content || "").slice(0, 1000),
      }));

      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
        max_tokens: 400,
      });

      return new Response(JSON.stringify({ reply: aiResponse.response }), {
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "A apărut o eroare. Încearcă din nou." }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }
  },
};
