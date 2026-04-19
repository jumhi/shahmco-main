import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Package, ArrowRight } from "lucide-react";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/SectionComponents";
import { useLanguage } from "@/i18n/LanguageContext";

const Downloads = () => {
  const { t } = useLanguage();
  const d = t.downloadsPage;

  return (
    <>
      <Section className="pb-0">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">{d.label}</p>
        </FadeIn>
        <SectionTitle>
          {d.title1} <span className="text-gradient-gold">{d.title2}</span>
        </SectionTitle>
        <SectionSubtitle>{d.subtitle}</SectionSubtitle>
      </Section>

      <Section className="pt-10">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">INSTANT DOWNLOADS</p>
        </FadeIn>
        <SectionTitle>
          {d.digitalTitle1} <span className="text-gradient-gold">{d.digitalTitle2}</span>
        </SectionTitle>
        <SectionSubtitle>{d.digitalSubtitle}</SectionSubtitle>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {d.items.map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover={{ y: -4, borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="bg-card border border-border rounded-xl p-6 shadow-card h-full flex flex-col transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <FileText size={18} className="text-accent" />
                </div>
                <span className="text-[10px] tracking-widest text-accent font-mono mb-2">
                  {item.tagLabel.toUpperCase()}
                </span>
                <h4 className="font-heading font-semibold text-foreground mb-2 leading-tight">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-5">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <div className="text-gradient-gold font-heading font-bold">{item.price}</div>
                    <div className="text-[10px] text-muted-foreground">+ VAT</div>
                  </div>
                  <Link
                    to="/contact"
                    className="text-xs px-3 py-1.5 rounded-md border border-accent/30 text-accent hover:bg-accent/10 transition-all"
                  >
                    {d.enquire}
                  </Link>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">PACKAGED SERVICES</p>
        </FadeIn>
        <SectionTitle>
          {d.bundlesTitle1} <span className="text-gradient-gold">{d.bundlesTitle2}</span>
        </SectionTitle>
        <SectionSubtitle>{d.bundlesSubtitle}</SectionSubtitle>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {d.bundles.map((b) => (
            <StaggerItem key={b.title}>
              <motion.div
                whileHover={{ y: -4, borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="bg-card border border-border rounded-2xl p-8 shadow-card h-full flex flex-col transition-all"
              >
                <div className="inline-flex self-start items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-accent/10 text-accent mb-4">
                  <Package size={12} /> {b.label}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{b.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {b.includes.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-5 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-gradient-gold font-heading text-2xl font-bold">{b.price}</div>
                    <div className="text-xs text-muted-foreground">{b.sub}</div>
                  </div>
                  <Link
                    to="/contact"
                    className="text-sm px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all whitespace-nowrap"
                  >
                    {d.getStarted}
                  </Link>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">PURCHASE PROCESS</p>
        </FadeIn>
        <SectionTitle>
          {d.stepsTitle1} <span className="text-gradient-gold">{d.stepsTitle2}</span>
        </SectionTitle>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {d.steps.map((s, i) => (
            <StaggerItem key={s.t}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card h-full transition-all"
              >
                <div className="font-mono text-accent text-sm mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2">{s.t}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4 mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all text-sm font-medium"
            >
              Request a Quote <ArrowRight size={14} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all text-sm font-medium"
            >
              See E-Invoicing Platform
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
};

export default Downloads;
