import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Sparkles, Briefcase, Zap, ShoppingBag, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

type Market = "UAE" | "KSA";

type Package = {
  id: string;
  type: "B2C" | "B2B";
  tag: string;
  icon: typeof Zap;
  name: string;
  desc: string;
  badge?: string;
  features: string[];
  whyUs: string;
  uae: { price: string; currency: string; period: string; aed?: string };
  ksa: { price: string; currency: string; period: string; aed?: string };
};

const PACKAGES: Package[] = [
  {
    id: "launchpad",
    type: "B2C",
    tag: "Digital Product",
    icon: Zap,
    name: "Business Digital Launchpad",
    desc: "A launch-ready, SEO-optimised digital presence — engineered to corporate standard and delivered within 5 working days.",
    features: [
      "5-page premium professional website",
      "Business email setup (up to 5 accounts)",
      "Google Workspace configuration & onboarding",
      "Advanced SEO foundation & meta architecture",
      "1 month dedicated post-launch support",
    ],
    whyUs:
      "Template agencies take weeks. We deliver a bilingual-ready, compliance-grade digital presence in 5 working days — fully handed over.",
    uae: { price: "4,500", currency: "AED", period: "One-time · Delivered in 5 days" },
    ksa: { price: "4,800", currency: "SAR", period: "One-time · Delivered in 5 days", aed: "≈ AED 4,700" },
  },
  {
    id: "ecommerce",
    type: "B2C",
    tag: "E-Commerce Product",
    icon: ShoppingBag,
    name: "E-Commerce Store Setup",
    desc: "A complete, payment-ready online store — designed, built, tested, and handed over ready to generate revenue from day one.",
    badge: "Most Popular",
    features: [
      "Full e-commerce store build (Shopify / WooCommerce)",
      "GCC-native payment gateway integration (Telr, PayTabs, Mada, STC Pay)",
      "Product catalogue setup — up to 50 products",
      "Mobile-first Arabic & English bilingual design",
      "Secure checkout, tax & compliance configuration",
      "2 weeks dedicated post-launch support",
    ],
    whyUs:
      "We integrate GCC-native gateways most agencies skip. You are revenue-ready from day one — not week three.",
    uae: { price: "8,999", currency: "AED", period: "One-time · Delivered in 10 days" },
    ksa: { price: "9,800", currency: "SAR", period: "One-time · Delivered in 10 days", aed: "≈ AED 9,600" },
  },
  {
    id: "advisory",
    type: "B2B",
    tag: "Advisory Service",
    icon: Briefcase,
    name: "Business Advisory Starter Pack",
    desc: "Three months of senior-level advisory to establish operations with precision, regulatory clarity, and full GCC compliance.",
    features: [
      "Initial business structure consultation",
      "UAE FTA / KSA ZATCA registration guidance",
      "3× monthly advisory sessions (1 hour each)",
      "Document review and professional drafting",
      "Corporate Tax & VAT compliance strategy",
      "Priority bilingual (Arabic & English) email support",
    ],
    whyUs:
      "Our advisors hold active cross-border GCC expertise. We draft, review, and file alongside you — not just advise.",
    uae: { price: "5,999", currency: "AED", period: "3-month package · Invoiced monthly" },
    ksa: { price: "6,500", currency: "SAR", period: "3-month package · Invoiced monthly", aed: "≈ AED 6,400" },
  },
];

const CorporatePackages = () => {
  const { t } = useLanguage();
  const [market, setMarket] = useState<Market>("UAE");
  const d = t.downloadsPage;

  const priceOf = (p: Package) => (market === "UAE" ? p.uae : p.ksa);

  return (
    <>
      {/* Market Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-secondary/50 border border-border rounded-full p-1 relative">
          <motion.div
            className="absolute top-1 bottom-1 rounded-full bg-gradient-gold shadow-gold"
            initial={false}
            animate={{
              left: market === "UAE" ? "4px" : "calc(50% + 0px)",
              right: market === "UAE" ? "calc(50% + 0px)" : "4px",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          {(["UAE", "KSA"] as Market[]).map((m) => (
            <button
              key={m}
              onClick={() => setMarket(m)}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-heading tracking-wider transition-colors min-w-[140px] ${
                market === m ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "UAE" ? "🇦🇪 United Arab Emirates" : "🇸🇦 Saudi Arabia"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-accent/80 mb-10 tracking-wide">
        {market === "UAE"
          ? "Prices in AED · Below VAT threshold — no VAT charged to clients"
          : "Prices in SAR · AED equivalent shown · Zero-rated export service"}
      </p>

      {/* Package Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {PACKAGES.map((p, idx) => {
          const isHighlight = !!p.badge;
          const price = priceOf(p);
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative bg-card border rounded-2xl p-7 flex flex-col h-full transition-all overflow-hidden ${
                isHighlight
                  ? "border-accent/50 shadow-gold"
                  : "border-border shadow-card hover:border-accent/30"
              }`}
            >
              {isHighlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-gold text-accent-foreground text-[10px] tracking-widest font-heading font-bold px-4 py-1 rounded-b-lg uppercase">
                  {p.badge}
                </div>
              )}

              {/* Type Badge */}
              <div className="mt-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] tracking-wider px-2.5 py-1 rounded-full mb-3 ${
                    p.type === "B2C"
                      ? "bg-accent/10 text-accent border border-accent/30"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {p.type === "B2C" ? <Zap size={10} /> : <Briefcase size={10} />}
                  {p.type === "B2C" ? "Direct Purchase · B2C" : "Advisory Service · B2B"}
                </span>
              </div>

              {/* Tag */}
              <div className="inline-flex items-center gap-2 self-start bg-secondary/60 border border-border rounded-full px-3 py-1 mb-4">
                <Icon size={12} className="text-accent" />
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase font-medium">
                  {p.tag}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-heading text-xl font-bold text-foreground mb-3 leading-tight">
                {p.name}
              </h3>

              {/* Desc */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.desc}</p>

              <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-5" />

              {/* Features */}
              <ul className="space-y-2.5 mb-5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Why Us */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 mb-5">
                <p className="text-xs text-accent/90 italic leading-relaxed flex gap-2">
                  <Sparkles size={12} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>{p.whyUs}</span>
                </p>
              </div>

              {/* Price */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={market}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="mb-4"
                >
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-heading text-2xl font-bold text-gradient-gold">
                      {price.currency} {price.price}
                    </span>
                    {price.aed && (
                      <span className="text-xs text-accent/70">{price.aed}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{price.period}</p>
                </motion.div>
              </AnimatePresence>

              {/* CTAs */}
              <div className="flex flex-col gap-2 mt-auto">
                {p.type === "B2C" ? (
                  <>
                    <Link
                      to={`/contact?package=${encodeURIComponent(p.name)}&price=${encodeURIComponent(price.currency + " " + price.price)}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-gold text-accent-foreground hover:opacity-90 transition-all text-sm font-heading font-bold tracking-wider uppercase shadow-gold"
                    >
                      <Zap size={14} /> Pay Now
                    </Link>
                    <Link
                      to="/contact"
                      className="text-center text-xs text-muted-foreground hover:text-accent transition-colors underline underline-offset-2"
                    >
                      or Enquire First
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-all text-sm font-heading font-bold tracking-wider uppercase"
                    >
                      Enquire Now <ArrowRight size={14} />
                    </Link>
                    <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                      Personalised scope · Payment link issued after assessment
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8 italic">
        All prices are exclusive of applicable taxes. Tax treatment varies by client jurisdiction and registration status.
      </p>
    </>
  );
};

export default CorporatePackages;
