import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Zap, ArrowRight, ShieldCheck, Landmark, Smartphone } from "lucide-react";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/SectionComponents";
import { useLanguage } from "@/i18n/LanguageContext";

const Pricing = () => {
  const { t } = useLanguage();
  const [annual, setAnnual] = useState(false);
  const p = t.pricingPage;

  const creds = [
    { Icon: Landmark, label: "UAE FTA" },
    { Icon: ShieldCheck, label: "ZATCA Phase 2" },
    { Icon: ShieldCheck, label: "256-bit Encrypted" },
    { Icon: Smartphone, label: "Mobile Ready" },
  ];

  return (
    <>
      <Section className="pb-0">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">{p.label}</p>
        </FadeIn>
        <SectionTitle>
          {p.title1} <span className="text-gradient-gold">{p.title2}</span>
        </SectionTitle>
        <SectionSubtitle>{p.subtitle}</SectionSubtitle>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-12">
            {creds.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground"
              >
                <Icon size={12} className="text-accent" />
                {label}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="inline-flex items-center bg-secondary/50 border border-border rounded-full p-1 mb-10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                !annual ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.monthly}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
                annual ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.annual}
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent font-semibold">
                {p.save}
              </span>
            </button>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {p.plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`relative h-full bg-card border rounded-2xl p-8 shadow-card transition-all ${
                  plan.featured ? "border-accent/50 shadow-glow" : "border-border"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 start-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    <Zap size={12} /> {plan.badge}
                  </div>
                )}
                <h3 className="font-heading text-xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 min-h-[40px]">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-muted-foreground text-sm">AED</span>
                  <span className="text-gradient-gold font-heading text-5xl font-bold">
                    {annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="text-muted-foreground text-sm">{p.perMonth}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6 h-4">
                  {annual ? `${p.billedAnnually}: AED ${plan.annual * 12}` : ""}
                </p>
                <div className="border-t border-border pt-6 mb-6">
                  <ul className="space-y-3">
                    {plan.included.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                        <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {plan.excluded.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground/60">
                        <X size={16} className="mt-0.5 flex-shrink-0" />
                        <span className="line-through">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/contact"
                  className={`block w-full text-center px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    plan.featured
                      ? "bg-accent text-accent-foreground hover:opacity-90"
                      : "border border-accent/40 text-accent hover:bg-accent/10"
                  }`}
                >
                  {p.cta}
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <p className="text-muted-foreground text-xs mt-8 max-w-2xl">{p.fineprint}</p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">FAQS</p>
        </FadeIn>
        <SectionTitle>
          {p.faqTitle1} <span className="text-gradient-gold">{p.faqTitle2}</span>
        </SectionTitle>

        <StaggerContainer className="grid md:grid-cols-2 gap-5 mt-6">
          {p.faqs.map((f) => (
            <StaggerItem key={f.q}>
              <motion.div
                whileHover={{ borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="bg-card border border-border rounded-xl p-6 shadow-card h-full transition-all"
              >
                <h4 className="font-heading font-semibold text-foreground mb-2">{f.q}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4 mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all text-sm font-medium"
            >
              Have another question?
            </Link>
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all text-sm font-medium"
            >
              See Downloads <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
};

export default Pricing;
