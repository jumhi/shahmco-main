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

      <div className="max-w-3xl mt-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-8 shadow-card"
        >
          <h3 className="font-heading text-xl font-semibold mb-4">{t.termsPage.paymentTermsTitle}</h3>
          <p className="text-muted-foreground leading-relaxed mb-5">{t.termsPage.paymentTermsIntro}</p>
          <div className="space-y-5">
            <p className="text-muted-foreground leading-relaxed">{t.termsPage.paymentTermsB2B}</p>
            <div className="h-px bg-border" />
            <p className="text-muted-foreground leading-relaxed">{t.termsPage.paymentTermsB2C}</p>
            <div className="h-px bg-border" />
            <p className="text-foreground leading-relaxed font-medium">{t.termsPage.paymentTermsClosing}</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Terms;
