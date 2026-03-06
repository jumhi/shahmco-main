import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { full_name, company, email, phone, message } = await req.json();

    // Validate
    if (!full_name || !company || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save to Supabase FIRST (source of truth)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase.from("leads").insert({
      full_name,
      company,
      email,
      phone: phone || null,
      message,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save inquiry" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send emails via Resend (non-blocking — lead is already saved)
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      const firstName = full_name.split(" ")[0];
      const now = new Date();
      const uaeTime = now.toLocaleString("en-US", { timeZone: "Asia/Dubai" });
      const topicRef = message.split(/\s+/).slice(0, 8).join(" ");

      // Email 1: Internal notification
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "SHAHMCO Website <noreply@shahmco.com>",
            to: ["info@shahmco.com"],
            reply_to: email,
            subject: `New Inquiry — ${company} | SHAHMCO Website`,
            text: `A new corporate inquiry has been submitted via shahmco.com.

Full Name: ${full_name}
Company: ${company}
Email: ${email}
Phone: ${phone || "Not provided"}
Submitted: ${uaeTime} (UAE Time)

Message:
${message}

---
Reply directly to this email to respond to the client.
Or log in to your dashboard to manage this lead.`,
          }),
        });
      } catch (e) {
        console.error("Failed to send internal notification:", e);
      }

      // Email 2: Auto-reply to client
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "SHAHMCO Global FZC <info@shahmco.com>",
            to: [email],
            subject: "We've Received Your Inquiry | SHAHMCO Global FZC",
            text: `Dear ${firstName},

Thank you for reaching out to SHAHMCO Global FZC.

We have received your inquiry regarding ${topicRef}.

Our team is reviewing your request and will be in touch within 1–2 business days with a tailored response.

In the meantime, if you have any urgent questions, you can reach us directly at info@shahmco.com.

We look forward to exploring how SHAHMCO can support ${company}'s goals.

Warm regards,
SHAHMCO Global FZC Corporate Advisory Team
Sharjah Publishing City Free Zone, Sharjah, UAE
www.shahmco.com`,
          }),
        });
      } catch (e) {
        console.error("Failed to send auto-reply:", e);
      }
    } else {
      console.warn("RESEND_API_KEY not configured — skipping emails");
    }

    return new Response(
      JSON.stringify({ success: true, firstName: full_name.split(" ")[0] }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
