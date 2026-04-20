import { Section, SectionTitle, SectionSubtitle, FadeIn, StaggerContainer, StaggerItem } from "@/components/SectionComponents";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const Compliance = () => {
  const { t } = useLanguage();

  return (
    <>
      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.compliancePage.label}</p>
        </FadeIn>
        <SectionTitle>
          {t.compliancePage.title1} <span className="text-gradient-gold">{t.compliancePage.title2}</span>
        </SectionTitle>
        <SectionSubtitle>{t.compliancePage.subtitle}</SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn direction="right">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-8 shadow-card h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                  <ShieldCheck size={20} className="text-accent-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold">{t.compliancePage.internalTitle}</h3>
              </div>
              <ul className="space-y-3">
                {t.compliancePage.internalItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.15} direction="left">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-8 shadow-card h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                  <ShieldCheck size={20} className="text-accent-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold">{t.compliancePage.amlTitle}</h3>
              </div>
              <ul className="space-y-3">
                {t.compliancePage.amlItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-secondary/20">
        <FadeIn>
          <motion.div
            whileHover={{ borderColor: "hsl(0 84% 60% / 0.3)" }}
            className="bg-card border border-border rounded-xl p-8 max-w-2xl shadow-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle size={20} className="text-destructive" />
              </div>
              <h3 className="font-heading text-xl font-semibold">{t.compliancePage.noEngageTitle}</h3>
            </div>
            <ul className="space-y-3">
              {t.compliancePage.noEngageItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <motion.div
            whileHover={{ borderColor: "hsl(43 85% 55% / 0.3)" }}
            className="bg-card border border-border rounded-xl p-8 max-w-3xl shadow-card mt-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <ShieldCheck size={20} className="text-accent-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold">{t.compliancePage.paymentsTitle}</h3>
            </div>
            <div className="space-y-5">
              <div>
                <p className="text-accent font-heading text-xs tracking-widest uppercase mb-2">
                  {t.compliancePage.paymentsB2BHeading}
                </p>
                <p className="text-muted-foreground leading-relaxed">{t.compliancePage.paymentsB2B}</p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-accent font-heading text-xs tracking-widest uppercase mb-2">
                  {t.compliancePage.paymentsB2CHeading}
                </p>
                <p className="text-muted-foreground leading-relaxed">{t.compliancePage.paymentsB2C}</p>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </Section>
    </>
  );
};

export default Compliance;
