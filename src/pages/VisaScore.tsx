import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { ArrowRight, Check, AlertCircle, MessageCircle, Printer, RotateCcw } from "lucide-react";
import { Section, FadeIn } from "@/components/SectionComponents";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Lock, Mail } from "lucide-react";
import afwaajLogo from "@/assets/partners/afwaaj.png";
import sultanLogo from "@/assets/partners/sultan-global.jpeg";
import hamumyLogo from "@/assets/partners/al-hamumy.jpeg";

const PARTNERS = [
  { name: "AFWAAJ", logo: afwaajLogo, tag: "Strategic Affiliate" },
  { name: "Sultan Group Global", logo: sultanLogo, tag: "Corporate Partner" },
  { name: "AL-HAMUMY LTD", logo: hamumyLogo, tag: "Travel & Visa Partner" },
];

// ═══════════════════════════════════════ DATA ═══════════════════════════════════════
type Destination = {
  id: string;
  flag: string;
  name: string;
  categories: string[];
  funds: string;
  threshold: number;
  badge: "hot" | "hajj" | null;
  badgeLabel?: string;
  insuranceNote: string;
  profile: string;
};

const DESTINATIONS: Destination[] = [
  { id: "schengen", flag: "🇪🇺", name: "Schengen Zone",
    categories: ["Tourism","Business","Medical","Student","Family Visit"],
    funds: "€50–100/day", threshold: 65, badge: "hot", badgeLabel: "High Demand",
    insuranceNote: "Mandatory: €30,000 min medical coverage",
    profile: "26 EU countries. Tourism is the #1 category. Travel insurance mandatory. Strict financial proof required." },
  { id: "uk", flag: "🇬🇧", name: "United Kingdom",
    categories: ["Tourism","Business","Medical Treatment","Student","Family Visit","Transit"],
    funds: "£100/day", threshold: 68, badge: "hot", badgeLabel: "High Demand",
    insuranceNote: "Highly recommended. Full trip coverage.",
    profile: "Standard Visitor Visa. Home country ties weighted heavily. Biometrics required at VFS." },
  { id: "ireland", flag: "🇮🇪", name: "Ireland",
    categories: ["Tourism","Business","Medical","Student","Family Visit","Transit"],
    funds: "€50–100/day", threshold: 70, badge: null,
    insuranceNote: "Strongly recommended.",
    profile: "Conservative assessment. Source of funds scrutinized closely. High refusal rate for weak profiles." },
  { id: "turkey", flag: "🇹🇷", name: "Turkey",
    categories: ["Tourism","Business","Medical","Student","Transit"],
    funds: "$50/day", threshold: 55, badge: "hot", badgeLabel: "High Demand",
    insuranceNote: "Recommended.",
    profile: "e-Visa available for many nationalities. Popular tourism & medical destination. GCC residents often eligible." },
  { id: "saudi", flag: "🇸🇦", name: "Saudi Arabia",
    categories: ["Tourism","Business","Hajj","Umrah","Residence / Iqama","Family Visit","Medical","Work"],
    funds: "SAR 200/day", threshold: 60, badge: "hajj", badgeLabel: "Hajj / Umrah",
    insuranceNote: "Required by MOFA. Hajj/Umrah insurance mandatory for pilgrims.",
    profile: "Multiple visa categories. Hajj & Umrah via specialist partners. Iqama (residence) requires employer sponsorship. Tourist e-visa available." },
  { id: "uae", flag: "🇦🇪", name: "UAE",
    categories: ["Tourism","Business","Residence / Golden Visa","Family Sponsorship","Medical","Student","Transit"],
    funds: "AED 300/day", threshold: 55, badge: null,
    insuranceNote: "Recommended for all visitors.",
    profile: "Entry visa, residence visa, and Golden Visa categories available. Business setup services via SHAHMCO. GCC residents may enter visa-free." },
  { id: "canada", flag: "🇨🇦", name: "Canada",
    categories: ["Tourism","Business","Student","Family Sponsorship","Medical","PR / Immigration","Transit"],
    funds: "CAD 100/day", threshold: 72, badge: "hot", badgeLabel: "High Demand",
    insuranceNote: "Highly recommended.",
    profile: "TRV (Visitor Visa) or eTA. High financial bar. Biometrics required. Strong ties to home country are critical." },
  { id: "australia", flag: "🇦🇺", name: "Australia",
    categories: ["Tourism","Business","Student","Medical","Family Visit","Skilled Migration"],
    funds: "AUD 100/day", threshold: 70, badge: null,
    insuranceNote: "Highly recommended.",
    profile: "Subclass 600 tourist visa. GTE (Genuine Temporary Entrant) criterion assessed strictly. Strong ties required." },
  { id: "usa", flag: "🇺🇸", name: "USA",
    categories: ["Tourism (B2)","Business (B1)","Student (F1)","Medical","Family Visit","Transit (C)"],
    funds: "$100/day", threshold: 70, badge: null,
    insuranceNote: "Strongly recommended.",
    profile: "DS-160 form. Embassy interview required. Strong financial & social ties assessed. Refusal rate high for first-time applicants." },
  { id: "china", flag: "🇨🇳", name: "China",
    categories: ["Tourism (L)","Business (M)","Student (X)","Work (Z)","Family Visit (Q)","Transit"],
    funds: "CNY 500/day", threshold: 58, badge: null,
    insuranceNote: "Recommended.",
    profile: "L (tourist) or M (business) visa most common. Invitation letter often required. Full itinerary and financial proof submitted." },
];

type Criterion = { id: string; name: string; desc: string; max: number; section: string; sectionIcon: string; sectionPts: number };

const CRITERIA: Criterion[] = [
  { id: "funds", section: "Bank Balance & Liquid Funds", sectionIcon: "💰", sectionPts: 30, max: 10, name: "Minimum Daily Fund Requirement", desc: "Required funds must be present and visible in statements before application date." },
  { id: "avgbal", section: "Bank Balance & Liquid Funds", sectionIcon: "💰", sectionPts: 30, max: 10, name: "3–6 Month Average Balance Stability", desc: "Consistent average — not a sudden pre-application peak. Stability matters more than any single high month." },
  { id: "source", section: "Bank Balance & Liquid Funds", sectionIcon: "💰", sectionPts: 30, max: 10, name: "Source of Funds Clarity", desc: "Salary, business income, or investment returns clearly identifiable. No unexplained large cash deposits." },
  { id: "emp", section: "Employment & Income Stability", sectionIcon: "💼", sectionPts: 25, max: 10, name: "Employment Status & Duration", desc: "Formal employment letter + payslips required. Min 12 months preferred. Self-employed: audited accounts + trade licence." },
  { id: "ratio", section: "Employment & Income Stability", sectionIcon: "💼", sectionPts: 25, max: 10, name: "Monthly Income vs Total Trip Cost Ratio", desc: "Net monthly income should be ≥ 2× total trip cost. Higher ratio = stronger profile." },
  { id: "tax", section: "Employment & Income Stability", sectionIcon: "💼", sectionPts: 25, max: 5, name: "Tax Returns / Income Declarations", desc: "Last 1–2 years of tax filings. Critical for Ireland, UK, Canada, Australia." },
  { id: "prop", section: "Home Country Ties & Return Intent", sectionIcon: "🏠", sectionPts: 25, max: 10, name: "Property / Real Estate Ownership", desc: "Title deed (owned) is strongest. Long-term lease acceptable. UAE residency holders score positively." },
  { id: "family", section: "Home Country Ties & Return Intent", sectionIcon: "🏠", sectionPts: 25, max: 8, name: "Family Dependents Remaining at Home", desc: "Spouse, children, aging parents in home country = strong return motive." },
  { id: "hist", section: "Home Country Ties & Return Intent", sectionIcon: "🏠", sectionPts: 25, max: 7, name: "Prior Visa Compliance & Travel History", desc: "Previous visas with no overstay. Prior visits to same destination = strong positive." },
  { id: "acc", section: "Travel Documentation Quality", sectionIcon: "📋", sectionPts: 20, max: 7, name: "Accommodation & Invitation Evidence", desc: "Hotel bookings, Airbnb, notarized invitation, or Hajj/Umrah operator confirmation." },
  { id: "ins", section: "Travel Documentation Quality", sectionIcon: "📋", sectionPts: 20, max: 7, name: "Travel Insurance Coverage", desc: "Schengen mandatory €30k. Saudi/Hajj required by MOFA. Must cover full territory and duration." },
  { id: "itin", section: "Travel Documentation Quality", sectionIcon: "📋", sectionPts: 20, max: 6, name: "Itinerary Coherence & Purpose Clarity", desc: "Travel purpose must be consistent across ALL submitted documents." },
];

const FLAGS = [
  { id: "parking", text: "Funds parking detected — large unexplained deposit within 30 days of application" },
  { id: "refusal", text: "Prior visa refusal(s) not disclosed upfront by applicant" },
  { id: "overstay", text: "Prior overstay or immigration violation on record" },
  { id: "inconsist", text: "Income declared on statements inconsistent with employment letter or tax returns" },
  { id: "lowbal", text: "Account balance drops to near-zero between salary credits" },
  { id: "noincome", text: "No verifiable employment or income source whatsoever" },
  { id: "criminal", text: "Known criminal record or pending legal matters" },
];

const LEVEL_LABELS = ["None", "Weak", "OK", "Strong"];
const LEVEL_ICONS = ["✕", "⚠", "✓", "★"];

const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  whatsapp: z.string().trim().min(5, "WhatsApp required").max(30),
  nationality: z.string().trim().min(2, "Nationality required").max(80),
  category: z.string().min(1, "Select a category"),
  days: z.coerce.number().int().min(1).max(365),
});

type LeadForm = z.infer<typeof leadSchema>;

const SECTIONS = ["Bank Balance & Liquid Funds", "Employment & Income Stability", "Home Country Ties & Return Intent", "Travel Documentation Quality"];

const VisaScore = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [lead, setLead] = useState<LeadForm>({ fullName: "", email: "", whatsapp: "", nationality: "", category: "", days: 7 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, { level: number; val: number; max: number }>>({});
  const [activeFlags, setActiveFlags] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const dest = useMemo(() => DESTINATIONS.find((d) => d.id === selectedDestId) || null, [selectedDestId]);
  const total = useMemo(() => Object.values(scores).reduce((a, b) => a + b.val, 0), [scores]);
  const scoredCount = Object.keys(scores).length;
  const hasFlags = activeFlags.size > 0;

  const verdict = useMemo(() => {
    const thresh = dest?.threshold ?? 65;
    if (hasFlags) return { cls: "fail" as const, label: "⚑ Flagged", info: `${activeFlags.size} disqualifier(s) triggered. Application not advisable.` };
    if (total >= thresh) return { cls: "pass" as const, label: "✓ Recommend", info: `Score ${total}/100 meets ${dest?.name ?? ""} threshold of ${thresh}.` };
    if (total >= thresh - 15) return { cls: "review" as const, label: "~ Review", info: `Borderline — ${total}/100 vs threshold ${thresh}. Strengthen weak areas.` };
    return { cls: "fail" as const, label: "✕ Not Ready", info: `Insufficient — ${total}/100 well below threshold ${thresh}.` };
  }, [total, hasFlags, dest, activeFlags.size]);

  const verdictColor = verdict.cls === "pass" ? "text-emerald-400" : verdict.cls === "review" ? "text-amber-400" : "text-rose-400";
  const verdictBg = verdict.cls === "pass" ? "bg-emerald-500" : verdict.cls === "review" ? "bg-amber-500" : "bg-rose-500";

  const setScore = (id: string, level: number, max: number) => {
    const val = level === 0 ? 0 : level === 1 ? Math.round(max * 0.4) : level === 2 ? Math.round(max * 0.7) : max;
    setScores((p) => ({ ...p, [id]: { level, val, max } }));
  };

  const toggleFlag = (id: string) => {
    setActiveFlags((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const goStep2 = () => { if (dest) setStep(2); };

  const submitLead = () => {
    const result = leadSchema.safeParse(lead);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(3);
  };

  const finalizeAndEmail = async () => {
    if (!dest) return;
    setSubmitting(true);
    try {
      const breakdown = CRITERIA.map((c) => ({
        id: c.id, name: c.name, section: c.section,
        level: scores[c.id]?.level ?? -1,
        levelLabel: scores[c.id] ? LEVEL_LABELS[scores[c.id].level] : "Not scored",
        val: scores[c.id]?.val ?? 0, max: c.max,
      }));
      const flagList = FLAGS.filter((f) => activeFlags.has(f.id)).map((f) => f.text);

      const { error } = await supabase.functions.invoke("visa-score-lead", {
        body: {
          fullName: lead.fullName, email: lead.email, whatsapp: lead.whatsapp,
          nationality: lead.nationality, category: lead.category, days: lead.days,
          destination: dest.name, destinationId: dest.id, threshold: dest.threshold,
          score: total, status: verdict.cls, verdict: verdict.label,
          breakdown, flags: flagList, notes,
        },
      });
      if (error) throw error;
      toast({ title: "Assessment sent", description: "A SHAHMCO specialist will follow up shortly." });
      setStep(4);
    } catch (e) {
      console.error(e);
      toast({ title: "Submission failed", description: "Please try again or contact us directly.", variant: "destructive" });
      setStep(4); // Show results anyway
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1); setSelectedDestId(null);
    setLead({ fullName: "", email: "", whatsapp: "", nationality: "", category: "", days: 7 });
    setScores({}); setActiveFlags(new Set()); setNotes(""); setErrors({});
  };

  const StepIndicator = () => (
    <div className="flex items-center gap-2 mb-10">
      {[1, 2, 3, 4].map((n, i) => (
        <div key={n} className="flex items-center gap-2 flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
            step === n ? "bg-primary border-primary text-primary-foreground" : step > n ? "bg-accent border-accent text-accent-foreground" : "border-border text-muted-foreground"
          }`}>{step > n ? "✓" : n}</div>
          <span className={`text-xs uppercase tracking-wider hidden sm:inline ${step === n ? "text-accent" : "text-muted-foreground"}`}>
            {["Destination", "Your Details", "Score", "Results"][i]}
          </span>
          {i < 3 && <div className="flex-1 h-px bg-border" />}
        </div>
      ))}
    </div>
  );

  return (
    <Section className="min-h-screen">
      <FadeIn>
        <div className="text-center mb-8">
          <p className="text-accent font-heading text-sm tracking-widest mb-2">VISASCORE PRO™</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Visa Readiness <span className="text-gradient-gold">Assessment</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-3">
            Pre-screening advisory tool — does not guarantee visa approval or replace official embassy assessment.
          </p>
        </div>
      </FadeIn>

      <StepIndicator />

      <AnimatePresence mode="wait">
        {/* STEP 1 */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h2 className="font-heading text-2xl text-foreground mb-2">Choose Your <span className="text-gradient-gold">Destination</span></h2>
            <p className="text-muted-foreground text-sm mb-8">Select the country you wish to apply for. We'll apply the correct financial thresholds and assessment criteria.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {DESTINATIONS.map((d) => (
                <motion.button
                  key={d.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedDestId(d.id)}
                  className={`relative text-start bg-card border rounded-xl p-4 transition-all ${
                    selectedDestId === d.id ? "border-accent shadow-gold" : "border-border hover:border-primary/40"
                  }`}
                >
                  {d.badge && (
                    <span className={`absolute top-2 end-2 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      d.badge === "hajj" ? "bg-accent/15 text-accent border-accent/30" : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                    }`}>{d.badgeLabel}</span>
                  )}
                  <div className="text-2xl mb-2">{d.flag}</div>
                  <div className="font-heading font-semibold text-foreground text-sm">{d.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Threshold {d.threshold}/100</div>
                  <div className="text-[11px] text-accent mt-1.5">{d.funds}</div>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                disabled={!dest}
                onClick={goStep2}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
              >
                Continue — Enter Your Details <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && dest && (
          <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="max-w-xl mx-auto bg-card border border-accent/30 rounded-2xl p-8 shadow-card">
              <h3 className="font-heading text-2xl text-foreground mb-1">Your Details</h3>
              <p className="text-muted-foreground text-sm mb-6">For <span className="text-accent">{dest.flag} {dest.name}</span> — your information is used only for this assessment and follow-up.</p>

              <div className="space-y-4">
                {[
                  { k: "fullName", label: "Full Name", type: "text", placeholder: "John Smith" },
                  { k: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                  { k: "whatsapp", label: "WhatsApp Number", type: "tel", placeholder: "+971 50 123 4567" },
                  { k: "nationality", label: "Nationality", type: "text", placeholder: "United Arab Emirates" },
                ].map((f) => (
                  <div key={f.k}>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      value={(lead as never)[f.k]}
                      onChange={(e) => setLead({ ...lead, [f.k]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                    {errors[f.k] && <p className="text-rose-400 text-xs mt-1">{errors[f.k]}</p>}
                  </div>
                ))}

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Visa Category</label>
                  <select
                    value={lead.category}
                    onChange={(e) => setLead({ ...lead, category: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">Select category…</option>
                    {dest.categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-rose-400 text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Trip Duration (days)</label>
                  <input
                    type="number" min={1} max={365}
                    value={lead.days}
                    onChange={(e) => setLead({ ...lead, days: Number(e.target.value) })}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                  {errors.days && <p className="text-rose-400 text-xs mt-1">{errors.days}</p>}
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground text-center mt-5 leading-relaxed">
                By continuing you agree to be contacted by SHAHMCO Global about your visa assessment.
              </p>
            </div>

            <div className="flex justify-between mt-6 max-w-xl mx-auto">
              <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 text-sm">← Back</button>
              <button onClick={submitLead} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 font-medium text-sm">
                Begin Scoring <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && dest && (
          <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* Dashboard */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-xl p-5 border-t-2 border-t-primary">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Total Score</div>
                <div className={`font-heading text-4xl ${verdictColor}`}>{total} <span className="text-base text-muted-foreground">/ 100</span></div>
                <div className="h-1.5 bg-border rounded-full mt-3 overflow-hidden">
                  <div className={`h-full ${verdictBg} transition-all`} style={{ width: `${Math.min(total, 100)}%` }} />
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 border-t-2 border-t-accent">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Verdict</div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${verdictColor} bg-secondary/50`}>{verdict.label}</div>
                <p className="text-xs text-muted-foreground mt-2">{verdict.info}</p>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-3">{scoredCount} of {CRITERIA.length} criteria scored</div>
                <div className="h-1 bg-border rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${(scoredCount / CRITERIA.length) * 100}%` }} />
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 border-t-2 border-t-border">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Destination</div>
                <div className="font-heading text-foreground">{dest.flag} {dest.name}</div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{dest.profile}</p>
              </div>
            </div>

            {/* Sections */}
            {SECTIONS.map((section) => {
              const items = CRITERIA.filter((c) => c.section === section);
              const sectionPts = items[0]?.sectionPts ?? 0;
              const icon = items[0]?.sectionIcon ?? "";
              return (
                <div key={section} className="mb-6 bg-card border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 p-4 border-b border-border bg-secondary/30">
                    <span className="text-xl">{icon}</span>
                    <h4 className="font-heading font-semibold text-foreground flex-1">{section}</h4>
                    <span className="text-xs text-accent font-mono">{sectionPts} pts</span>
                  </div>
                  <div className="p-4 space-y-4">
                    {items.map((c) => {
                      const sc = scores[c.id];
                      return (
                        <div key={c.id} className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                          <div className="flex-1">
                            <div className="font-medium text-foreground text-sm">{c.name}</div>
                            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.desc}</div>
                          </div>
                          <div className="md:w-[280px]">
                            <div className="grid grid-cols-4 gap-1">
                              {[0, 1, 2, 3].map((lvl) => (
                                <button
                                  key={lvl}
                                  onClick={() => setScore(c.id, lvl, c.max)}
                                  className={`text-[11px] py-1.5 rounded border transition-all ${
                                    sc?.level === lvl
                                      ? lvl === 0 ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                                      : lvl === 1 ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                                      : lvl === 2 ? "bg-primary/30 border-primary text-foreground"
                                      : "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                                      : "bg-secondary/30 border-border text-muted-foreground hover:border-accent/30"
                                  }`}
                                >
                                  {LEVEL_ICONS[lvl]} {LEVEL_LABELS[lvl]}
                                </button>
                              ))}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-1 text-end">
                              {sc ? `${LEVEL_ICONS[sc.level]} ${LEVEL_LABELS[sc.level]} — ${sc.val}/${c.max} pts` : "Not scored"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Red flags */}
            <div className="bg-card border border-rose-500/30 rounded-xl p-5 mb-6">
              <h4 className="font-heading font-semibold text-rose-400 mb-3 flex items-center gap-2">
                <AlertCircle size={16} /> Automatic Disqualifiers — Check All That Apply
              </h4>
              <div className="space-y-2">
                {FLAGS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggleFlag(f.id)}
                    className={`w-full text-start flex items-start gap-3 p-3 rounded-lg border transition-all ${
                      activeFlags.has(f.id) ? "bg-rose-500/15 border-rose-500/50" : "bg-secondary/30 border-border hover:border-rose-500/30"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 text-xs ${
                      activeFlags.has(f.id) ? "bg-rose-500 border-rose-500 text-white" : "border-border"
                    }`}>{activeFlags.has(f.id) && "✕"}</span>
                    <span className="text-sm text-foreground">{f.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Consultant Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional context, special circumstances, or observations..."
                rows={3}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <button onClick={() => setStep(2)} className="px-5 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 text-sm">← Back</button>
              <button
                onClick={finalizeAndEmail}
                disabled={submitting || scoredCount === 0}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-40 font-medium text-sm"
              >
                {submitting ? "Sending…" : "View Full Results & Email Report"} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4 */}
        {step === 4 && dest && (
          <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="bg-card border border-accent/30 rounded-2xl p-8 md:p-12 text-center shadow-card mb-8">
              <div className={`font-heading text-6xl md:text-7xl font-bold mb-3 ${verdictColor}`}>{total}/100</div>
              <div className={`text-2xl font-heading mb-3 ${verdictColor}`}>{verdict.label}</div>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {hasFlags
                  ? `${lead.fullName} has triggered ${activeFlags.size} disqualifier(s). These are hard stops regardless of financial score.`
                  : verdict.cls === "pass"
                  ? `${lead.fullName} presents a strong financial profile for ${dest.name}. Score of ${total}/100 exceeds the advisory threshold of ${dest.threshold}.`
                  : verdict.cls === "review"
                  ? `${lead.fullName} is borderline for ${dest.name}. Score of ${total}/100 is close to but below the threshold of ${dest.threshold}.`
                  : `${lead.fullName}'s current profile is significantly below requirements for ${dest.name}. Score: ${total}/100, threshold: ${dest.threshold}.`}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Link to="/contact" className="group bg-card border border-accent/30 hover:border-accent rounded-xl p-6 shadow-card transition-all">
                <MessageCircle className="text-accent mb-3" size={28} />
                <h4 className="font-heading font-semibold text-foreground mb-2">Book a 1-on-1 Specialist</h4>
                <p className="text-muted-foreground text-sm mb-3">Speak directly with a certified SHAHMCO consultant who will review your complete file.</p>
                <span className="text-accent text-sm font-medium inline-flex items-center gap-1">Contact us <ArrowRight size={14} /></span>
              </Link>
              <button onClick={() => window.print()} className="group text-start bg-card border border-border hover:border-accent/30 rounded-xl p-6 shadow-card transition-all">
                <Printer className="text-accent mb-3" size={28} />
                <h4 className="font-heading font-semibold text-foreground mb-2">Save Your Score Report</h4>
                <p className="text-muted-foreground text-sm mb-3">Download a printable copy to share with your consultant or keep for reference.</p>
                <span className="text-accent text-sm font-medium inline-flex items-center gap-1">Print / Save <Printer size={14} /></span>
              </button>
            </div>

            <div className="bg-card border border-accent/30 rounded-xl p-6 mb-8">
              <div className="font-heading text-accent mb-3">SHAHMCO Consultant Recommendation</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {verdict.cls === "pass"
                  ? <>Score above the threshold of {dest.threshold} for {dest.name}. The financial profile is credible. <strong className="text-foreground">Proceed to full application preparation.</strong> Ensure all documents are current (within 3 months) and consistent in purpose, itinerary, and financial narrative. A SHAHMCO specialist can perform a final document review before submission.</>
                  : verdict.cls === "review"
                  ? <>Below the threshold for {dest.name}. Application is possible but carries elevated refusal risk. <strong className="text-foreground">Recommended actions:</strong> build bank balance over 2–3 months; obtain stronger employment documentation; add property/lease evidence; include all travel history. <strong className="text-foreground">A SHAHMCO consultation is strongly advised.</strong></>
                  : <>Well below the threshold for {dest.name}. <strong className="text-foreground">Submitting now carries very high refusal risk</strong>, creating a negative immigration record. <strong className="text-foreground">Preparation plan:</strong> build consistent balance over 4–6 months; obtain formal employment documentation; establish home country ties. <strong className="text-foreground">Book a SHAHMCO consultation for a personalised roadmap.</strong></>}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground mb-8">
              <div className="bg-secondary/30 rounded-lg p-3"><div className="text-accent uppercase tracking-wider mb-1">Final Score</div>{total}/100</div>
              <div className="bg-secondary/30 rounded-lg p-3"><div className="text-accent uppercase tracking-wider mb-1">Threshold</div>{dest.threshold}/100</div>
              <div className="bg-secondary/30 rounded-lg p-3"><div className="text-accent uppercase tracking-wider mb-1">Flags Raised</div>{activeFlags.size}</div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 font-medium text-sm">
                <MessageCircle size={16} /> Book Consultation
              </Link>
              <button onClick={reset} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 text-sm">
                <RotateCcw size={14} /> New Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[11px] text-muted-foreground/70 text-center mt-12 max-w-3xl mx-auto leading-relaxed">
        <strong>SHAHMCO Global FZC LLC</strong> · License No. 4423928.01 · SPCFZ, Sharjah, UAE<br />
        VisaScore Pro™ is a pre-screening advisory tool. It does not guarantee visa approval or replace official embassy assessment.
      </p>
    </Section>
  );
};

export default VisaScore;
