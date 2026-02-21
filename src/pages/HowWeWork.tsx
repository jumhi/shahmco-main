import { Section, SectionTitle, SectionSubtitle, FadeIn, StaggerContainer, StaggerItem } from "@/components/SectionComponents";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const HowWeWork = () => {
  const { t } = useLanguage();

  return (
    <>
      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.howWeWorkPage.label}</p>
        </FadeIn>
        <SectionTitle>
          {t.howWeWorkPage.title1} <span className="text-gradient-gold">{t.howWeWorkPage.title2}</span>
        </SectionTitle>
        <SectionSubtitle>{t.howWeWorkPage.subtitle}</SectionSubtitle>

        <StaggerContainer className="space-y-5">
          {t.howWeWorkPage.steps.map((step, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ x: 8, borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="flex items-start gap-6 bg-card border border-border rounded-xl p-6 shadow-card transition-all"
              >
                <span className="text-gradient-gold font-heading text-3xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      <Section>
        <SectionTitle>{t.howWeWorkPage.billingTitle}</SectionTitle>
        <SectionSubtitle>{t.howWeWorkPage.billingSubtitle}</SectionSubtitle>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.howWeWorkPage.billingItems.map((item) => (
            <StaggerItem key={item}>
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-card border border-border rounded-xl p-5 flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span className="text-foreground text-sm">{item}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
};

export default HowWeWork;
