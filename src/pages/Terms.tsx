import { Section, SectionTitle, FadeIn, StaggerContainer, StaggerItem } from "@/components/SectionComponents";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const Terms = () => {
  const { t } = useLanguage();

  return (
    <Section>
      <FadeIn>
        <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.termsPage.label}</p>
      </FadeIn>
      <SectionTitle>
        {t.termsPage.title1} <span className="text-gradient-gold">{t.termsPage.title2}</span>
      </SectionTitle>
      <StaggerContainer className="max-w-2xl space-y-4 mt-8">
        {t.termsPage.items.map((term) => (
          <StaggerItem key={term}>
            <motion.div
              whileHover={{ x: 6 }}
              className="bg-card border border-border rounded-xl p-5 flex items-center gap-3 shadow-card"
            >
              <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              <span className="text-foreground">{term}</span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
};

export default Terms;
