import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BreakdownItem = z.object({
  id: z.string(),
  name: z.string(),
  section: z.string(),
  level: z.number(),
  levelLabel: z.string(),
  val: z.number(),
  max: z.number(),
});

const BodySchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  whatsapp: z.string().trim().min(5).max(30),
  nationality: z.string().trim().min(2).max(80),
  category: z.string().min(1).max(80),
  days: z.number().int().min(1).max(365),
  destination: z.string().min(1).max(80),
  destinationId: z.string().max(40),
  threshold: z.number().int().min(0).max(100),
  score: z.number().int().min(0).max(100),
  status: z.enum(["pass", "review", "fail"]),
  verdict: z.string().max(80),
  breakdown: z.array(BreakdownItem),
  flags: z.array(z.string()),
  notes: z.string().max(2000).optional().default(""),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const d = parsed.data;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, serviceKey);

    const summary = `VisaScore: ${d.score}/100 (${d.verdict}) — ${d.destination} threshold ${d.threshold}\n\n` +
      `Nationality: ${d.nationality}\nCategory: ${d.category}\nTrip duration: ${d.days} days\n\n` +
      `Breakdown:\n${d.breakdown.map((b) => `• ${b.name} [${b.section}] — ${b.levelLabel} (${b.val}/${b.max})`).join("\n")}\n\n` +
      (d.flags.length ? `Flags raised:\n${d.flags.map((f) => `⚑ ${f}`).join("\n")}\n\n` : "No disqualifier flags.\n\n") +
      (d.notes ? `Notes:\n${d.notes}` : "");

    const { error: dbErr } = await supabase.from("leads").insert({
      full_name: d.fullName,
      email: d.email,
      phone: d.whatsapp,
      company: "VisaScore Pro",
      message: summary,
      status: "new",
    });
    if (dbErr) console.error("DB insert error:", dbErr);

    // Email via Resend
    if (resendKey) {
      const breakdownRows = d.breakdown.map((b) =>
        `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${b.name}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;color:#666">${b.section}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right">${b.levelLabel}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;font-weight:600">${b.val}/${b.max}</td></tr>`
      ).join("");

      const statusColor = d.status === "pass" ? "#22c55e" : d.status === "review" ? "#f59e0b" : "#ef4444";

      const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;color:#222">
        <div style="max-width:680px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #ddd">
          <div style="background:linear-gradient(135deg,#4a1d63,#0d0a12);color:white;padding:24px">
            <h1 style="margin:0;font-size:20px">New VisaScore Pro™ Lead</h1>
            <p style="margin:6px 0 0;color:#C9A227;font-size:13px">SHAHMCO Global · Corporate Advisory & Software Solutions</p>
          </div>
          <div style="padding:24px">
            <div style="display:flex;gap:16px;background:#f9f7fc;border-radius:8px;padding:16px;margin-bottom:20px;border-left:4px solid ${statusColor}">
              <div style="flex:1">
                <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px">Score</div>
                <div style="font-size:32px;font-weight:700;color:${statusColor}">${d.score}/100</div>
                <div style="font-size:13px;color:#555">${d.verdict} · Threshold ${d.threshold}</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px">Destination</div>
                <div style="font-size:18px;font-weight:600">${d.destination}</div>
                <div style="font-size:13px;color:#555">${d.category} · ${d.days} days</div>
              </div>
            </div>

            <h3 style="margin:20px 0 10px;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#666">Applicant</h3>
            <table style="width:100%;font-size:14px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#666;width:140px">Full Name</td><td style="padding:6px 0;font-weight:600">${d.fullName}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${d.email}" style="color:#4a1d63">${d.email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#666">WhatsApp</td><td style="padding:6px 0"><a href="https://wa.me/${d.whatsapp.replace(/[^0-9]/g, "")}" style="color:#4a1d63">${d.whatsapp}</a></td></tr>
              <tr><td style="padding:6px 0;color:#666">Nationality</td><td style="padding:6px 0">${d.nationality}</td></tr>
            </table>

            <h3 style="margin:24px 0 10px;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#666">Score Breakdown</h3>
            <table style="width:100%;font-size:13px;border-collapse:collapse;border:1px solid #eee;border-radius:6px;overflow:hidden">
              <thead><tr style="background:#f9f7fc"><th style="padding:8px 10px;text-align:left">Criterion</th><th style="padding:8px 10px;text-align:left;color:#888">Section</th><th style="padding:8px 10px;text-align:right">Rating</th><th style="padding:8px 10px;text-align:right">Points</th></tr></thead>
              <tbody>${breakdownRows}</tbody>
            </table>

            ${d.flags.length ? `<h3 style="margin:24px 0 10px;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#ef4444">⚑ Flags Raised (${d.flags.length})</h3>
              <ul style="font-size:13px;color:#555;padding-left:20px">${d.flags.map((f) => `<li style="margin:4px 0">${f}</li>`).join("")}</ul>` : ""}

            ${d.notes ? `<h3 style="margin:24px 0 10px;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#666">Consultant Notes</h3><p style="font-size:13px;color:#555;white-space:pre-wrap;background:#f9f7fc;padding:12px;border-radius:6px">${d.notes}</p>` : ""}
          </div>
          <div style="padding:16px 24px;background:#f9f7fc;font-size:11px;color:#888;text-align:center">SHAHMCO Global FZC LLC · License No. 4423928.01 · SPCFZ, Sharjah, UAE</div>
        </div>
      </body></html>`;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: "SHAHMCO VisaScore <onboarding@resend.dev>",
          to: ["info@shahmco.com"],
          reply_to: d.email,
          subject: `[VisaScore ${d.score}/100] ${d.fullName} → ${d.destination} (${d.verdict})`,
          html,
        }),
      });
      if (!emailRes.ok) {
        const txt = await emailRes.text();
        console.error("Resend error:", emailRes.status, txt);
      }
    } else {
      console.warn("RESEND_API_KEY not set — skipping email");
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("visa-score-lead error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
