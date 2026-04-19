import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react";
import { Section, FadeIn } from "@/components/SectionComponents";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Schengen (Europe)",
  "Japan", "Saudi Arabia", "UAE", "Turkey", "China",
];

const PURPOSES = ["Tourism", "Business", "Study", "Work / Employment", "Family Visit", "Investment / Residency"];

type FormData = {
  destination: string;
  purpose: string;
  age: string;
  passportValidity: string;
  previousTravel: string;
  bankBalance: string;
  employmentStatus: string;
  refusalHistory: string;
  hasInvitation: string;
  documentsReady: string;
};

const initial: FormData = {
  destination: "", purpose: "", age: "", passportValidity: "", previousTravel: "",
  bankBalance: "", employmentStatus: "", refusalHistory: "", hasInvitation: "", documentsReady: "",
};

const calcScore = (f: FormData) => {
  let s = 0;
  // Passport validity
  if (f.passportValidity === "12+") s += 15;
  else if (f.passportValidity === "6-12") s += 10;
  else if (f.passportValidity === "<6") s += 0;
  // Previous travel
  if (f.previousTravel === "many") s += 15;
  else if (f.previousTravel === "few") s += 10;
  else if (f.previousTravel === "none") s += 3;
  // Bank balance
  if (f.bankBalance === "high") s += 20;
  else if (f.bankBalance === "medium") s += 12;
  else if (f.bankBalance === "low") s += 4;
  // Employment
  if (f.employmentStatus === "employed") s += 15;
  else if (f.employmentStatus === "self") s += 12;
  else if (f.employmentStatus === "student") s += 8;
  else if (f.employmentStatus === "unemployed") s += 0;
  // Refusal
  if (f.refusalHistory === "no") s += 15;
  else if (f.refusalHistory === "one") s += 5;
  else if (f.refusalHistory === "multiple") s += 0;
  // Invitation
  if (f.hasInvitation === "yes") s += 10;
  else if (f.hasInvitation === "no") s += 5;
  // Documents
  if (f.documentsReady === "all") s += 10;
  else if (f.documentsReady === "most") s += 6;
  else if (f.documentsReady === "few") s += 2;
  return Math.min(100, s);
};

const VisaScore = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);

  const score = calcScore(data);
  const verdict = score >= 70 ? "pass" : score >= 45 ? "review" : "fail";
  const verdictMeta = {
    pass: { label: "Strong Profile", color: "text-emerald-400", Icon: CheckCircle2, msg: "Your profile shows strong indicators for visa approval. Proceed with confidence and ensure all documentation is properly prepared." },
    review: { label: "Needs Review", color: "text-amber-400", Icon: AlertTriangle, msg: "Your profile has potential, but there are areas requiring careful attention. We recommend a consultation to strengthen your application." },
    fail: { label: "High Risk", color: "text-rose-400", Icon: XCircle, msg: "Your profile shows significant risk factors. A thorough advisory session is strongly recommended before applying." },
  }[verdict];

  const update = (k: keyof FormData, v: string) => setData((p) => ({ ...p, [k]: v }));

  const steps = [
    {
      title: "Destination & Purpose",
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Destination Country</label>
            <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.destination} onChange={(e) => update("destination", e.target.value)}>
              <option value="">Select…</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Purpose of Travel</label>
            <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.purpose} onChange={(e) => update("purpose", e.target.value)}>
              <option value="">Select…</option>
              {PURPOSES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Your Age</label>
            <input type="number" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.age} onChange={(e) => update("age", e.target.value)} placeholder="e.g. 30" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Passport Validity (months remaining)</label>
            <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.passportValidity} onChange={(e) => update("passportValidity", e.target.value)}>
              <option value="">Select…</option>
              <option value="12+">12+ months</option>
              <option value="6-12">6–12 months</option>
              <option value="<6">Less than 6 months</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Travel & Financial Profile",
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Previous International Travel</label>
            <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.previousTravel} onChange={(e) => update("previousTravel", e.target.value)}>
              <option value="">Select…</option>
              <option value="many">5+ countries / Schengen / US / UK history</option>
              <option value="few">1–4 countries</option>
              <option value="none">No prior travel</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Bank Balance (last 6 months)</label>
            <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.bankBalance} onChange={(e) => update("bankBalance", e.target.value)}>
              <option value="">Select…</option>
              <option value="high">Strong (USD 10,000+)</option>
              <option value="medium">Moderate (USD 3,000–10,000)</option>
              <option value="low">Low (Below USD 3,000)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Employment Status</label>
            <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.employmentStatus} onChange={(e) => update("employmentStatus", e.target.value)}>
              <option value="">Select…</option>
              <option value="employed">Employed (1+ year tenure)</option>
              <option value="self">Self-employed / Business owner</option>
              <option value="student">Student</option>
              <option value="unemployed">Unemployed / Between jobs</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Visa Refusal History</label>
            <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.refusalHistory} onChange={(e) => update("refusalHistory", e.target.value)}>
              <option value="">Select…</option>
              <option value="no">No prior refusals</option>
              <option value="one">One prior refusal</option>
              <option value="multiple">Multiple refusals</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Application Readiness",
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Invitation / Sponsor Letter</label>
            <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.hasInvitation} onChange={(e) => update("hasInvitation", e.target.value)}>
              <option value="">Select…</option>
              <option value="yes">Yes, I have one</option>
              <option value="no">Not required for my visa type</option>
              <option value="needed">Required but not yet obtained</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-2">Documents Ready</label>
            <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm" value={data.documentsReady} onChange={(e) => update("documentsReady", e.target.value)}>
              <option value="">Select…</option>
              <option value="all">All required documents prepared</option>
              <option value="most">Most documents ready</option>
              <option value="few">Just starting</option>
            </select>
          </div>
        </div>
      ),
    },
  ];

  if (submitted) {
    const VIcon = verdictMeta.Icon;
    return (
      <Section>
        <FadeIn>
          <div className="max-w-3xl mx-auto bg-card border border-accent/30 rounded-2xl p-10 shadow-glow text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono mb-6">
              <Sparkles size={12} /> VISASCORE PRO™ RESULT
            </div>
            <div className={`text-7xl font-heading font-bold mb-2 ${verdictMeta.color}`}>{score}<span className="text-3xl text-muted-foreground"> / 100</span></div>
            <div className={`flex items-center justify-center gap-2 mb-6 ${verdictMeta.color}`}>
              <VIcon size={20} /> <span className="font-heading font-semibold text-lg">{verdictMeta.label}</span>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">{verdictMeta.msg}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all text-sm font-medium">
                Book a Specialist Consultation <ArrowRight size={14} />
              </Link>
              <button onClick={() => { setSubmitted(false); setStep(0); setData(initial); }} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all text-sm font-medium">
                Retake Assessment
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground/70 mt-8 italic">
              VisaScore Pro™ is a pre-screening advisory tool. It does not guarantee visa approval or replace official embassy assessment.
            </p>
          </div>
        </FadeIn>
      </Section>
    );
  }

  return (
    <Section>
      <FadeIn>
        <div className="max-w-3xl mx-auto">
          <Link to="/visa" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Visa Services
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono mb-4">
            <Sparkles size={12} /> VISASCORE PRO™
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Check your <span className="text-gradient-gold">visa readiness</span> in 3 minutes
          </h1>
          <p className="text-muted-foreground mb-8">
            A free pre-screening tool to assess your visa application strength and identify areas needing attention before you apply.
          </p>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-center gap-2 mb-6">
              {steps.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? "bg-accent" : "bg-secondary"}`} />
              ))}
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-muted-foreground font-mono">STEP {step + 1} / {steps.length}</span>
              <span className="text-xs text-accent font-heading">{steps[step].title}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {steps[step].content}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-all text-sm font-medium disabled:opacity-30"
              >
                <ArrowLeft size={14} /> Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all text-sm font-medium"
                >
                  Next <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all text-sm font-medium"
                >
                  Get My Score <Sparkles size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
};

export default VisaScore;
