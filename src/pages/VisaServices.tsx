import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, CheckCircle2, ClipboardList, RefreshCw, Search, MessageSquare, Sparkles, Clock, Calendar, FileCheck, X, Award } from "lucide-react";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/SectionComponents";
import { useLanguage } from "@/i18n/LanguageContext";

const whyIcons = [CheckCircle2, ClipboardList, RefreshCw, Search, Globe, MessageSquare];

const VisaServices = () => {
  const { t } = useLanguage();
  const v = t.visaPage;
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const detail = v.countryDetails?.find((c) => c.code === activeCountry);

  return (
    <>
      <Section className="pb-0">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">{v.label}</p>
        </FadeIn>
        <SectionTitle>
          {v.title1} <span className="text-gradient-gold">{v.title2}</span>
        </SectionTitle>
        <SectionSubtitle>{v.subtitle}</SectionSubtitle>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {v.stats.map((s) => (
              <div
                key={s.l}
                className="bg-card border border-border rounded-xl p-5 text-center shadow-card"
              >
                <div className="text-gradient-gold font-heading text-2xl md:text-3xl font-bold">
                  {s.n}
                </div>
                <div className="text-muted-foreground text-xs mt-1 tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section className="pt-12">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">MOST REQUESTED</p>
        </FadeIn>
        <SectionTitle>
          {v.destTitle1} <span className="text-gradient-gold">{v.destTitle2}</span>
        </SectionTitle>
        <SectionSubtitle>{v.destSubtitle}</SectionSubtitle>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {v.destinations.map((d) => {
            const isActive = activeCountry === d.code;
            const hasDetail = v.countryDetails?.some((c) => c.code === d.code);
            return (
              <StaggerItem key={d.code}>
                <motion.button
                  whileHover={{ y: -4 }}
                  onClick={() => hasDetail && setActiveCountry(isActive ? null : d.code)}
                  className={`w-full text-start bg-card border rounded-xl p-5 shadow-card transition-all ${
                    isActive
                      ? "border-accent shadow-glow"
                      : "border-border hover:border-accent/30"
                  } ${hasDetail ? "cursor-pointer" : "cursor-default opacity-70"}`}
                >
                  <div className="font-mono text-accent text-xs mb-2">{d.code}</div>
                  <div className="font-heading font-semibold text-foreground">{d.name}</div>
                  <div className="text-muted-foreground text-xs mt-1">{d.tag}</div>
                  {hasDetail && (
                    <div className="text-[10px] text-accent mt-2 font-mono">
                      {isActive ? "▼ HIDE DETAILS" : "▶ VIEW DETAILS"}
                    </div>
                  )}
                </motion.button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Country Detail Panel */}
        <AnimatePresence>
          {detail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden mt-6"
            >
              <div className="bg-card border border-accent/30 rounded-2xl p-6 md:p-8 shadow-glow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-accent font-heading text-xs tracking-widest mb-2">{v.detailLabel}</p>
                    <h3 className="font-heading text-2xl font-bold text-foreground">{detail.name}</h3>
                  </div>
                  <button
                    onClick={() => setActiveCountry(null)}
                    className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                    aria-label="Close"
                  >
                    <X size={18} className="text-muted-foreground" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {detail.types.map((type) => (
                    <div
                      key={type.cat}
                      className="bg-secondary/30 border border-border rounded-xl p-5"
                    >
                      <h4 className="font-heading font-semibold text-foreground mb-3">{type.cat}</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="flex items-center gap-2 text-accent text-xs font-mono mb-1">
                            <FileCheck size={12} /> {v.detailRequirements.toUpperCase()}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{type.req}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                          <div>
                            <div className="flex items-center gap-1.5 text-accent text-[10px] font-mono mb-1">
                              <Calendar size={11} /> {v.detailDuration.toUpperCase()}
                            </div>
                            <p className="text-foreground text-xs">{type.duration}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 text-accent text-[10px] font-mono mb-1">
                              <Clock size={11} /> {v.detailProcessing.toUpperCase()}
                            </div>
                            <p className="text-foreground text-xs">{type.processing}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground text-xs italic border-s-2 border-accent/30 ps-3 mt-5">
                  {detail.note}
                </p>
              </div>
            </motion.div>
          )}
          {!detail && (
            <p className="text-center text-muted-foreground text-sm mt-6 italic">
              {v.detailSelectPrompt}
            </p>
          )}
        </AnimatePresence>
      </Section>

      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">REGIONAL COVERAGE</p>
        </FadeIn>
        <SectionTitle>
          {v.regionsTitle1} <span className="text-gradient-gold">{v.regionsTitle2}</span>
        </SectionTitle>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {v.regions.map((r) => (
            <StaggerItem key={r.title}>
              <motion.div
                whileHover={{ borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="bg-card border border-border rounded-xl p-6 shadow-card transition-all h-full"
              >
                <h4 className="font-heading font-semibold text-foreground mb-2">{r.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.countries}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">WHY US</p>
        </FadeIn>
        <SectionTitle>
          {v.whyTitle1} <span className="text-gradient-gold">{v.whyTitle2}</span>
        </SectionTitle>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {v.why.map((w, i) => {
            const Icon = whyIcons[i] ?? CheckCircle2;
            return (
              <StaggerItem key={w.title}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "hsl(43 85% 55% / 0.3)" }}
                  className="bg-card border border-border rounded-xl p-6 shadow-card h-full transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">{w.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">INVESTMENT PATHWAYS</p>
        </FadeIn>
        <SectionTitle>
          {v.investTitle1} <span className="text-gradient-gold">{v.investTitle2}</span>
        </SectionTitle>
        <SectionSubtitle>{v.investSubtitle}</SectionSubtitle>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {v.investments.map((it) => (
            <StaggerItem key={it.country}>
              <motion.div
                whileHover={{ y: -4, borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="bg-card border border-border rounded-2xl p-7 shadow-card h-full transition-all flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{it.country}</h3>
                    <p className="text-muted-foreground text-xs">{it.program}</p>
                  </div>
                  <div className="text-end flex-shrink-0">
                    <div className="text-gradient-gold font-heading text-xl font-bold">{it.invest}</div>
                    <div className="text-[10px] text-muted-foreground max-w-[180px]">
                      {it.investLabel}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {it.pills.map((pill) => (
                    <span
                      key={pill}
                      className="text-[10px] px-2 py-1 rounded-full bg-secondary border border-border text-muted-foreground"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2 mb-4 flex-1">
                  {it.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-muted-foreground text-xs italic border-s-2 border-accent/30 ps-3 mt-2">
                  {it.note}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section>
        <FadeIn>
          <div className="bg-card border border-accent/30 rounded-2xl p-10 md:p-12 text-center shadow-glow">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3 text-foreground">
              {v.ctaTitle}
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">{v.ctaSubtitle}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all font-medium"
            >
              {v.ctaButton} <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </Section>
      {/* Floating Gold VisaScore Pill — same-tab navigation, only on this page */}
      <Link
        to="/visa-score"
        className="visa-score-pill fixed bottom-6 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-bold text-sm tracking-wide transition-transform"
        aria-label="Open VisaScore Pro assessment"
      >
        <Award size={18} />
        Free VisaScore Pro™ Check
        <ArrowRight size={16} />
      </Link>
    </>
  );
};

export default VisaServices;
