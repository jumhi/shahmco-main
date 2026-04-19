import { Section, SectionTitle, FadeIn, StaggerContainer, StaggerItem } from "@/components/SectionComponents";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <Section>
      <FadeIn>
        <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.privacyPage.label}</p>
      </FadeIn>
      <SectionTitle>
        {t.privacyPage.title1} <span className="text-gradient-gold">{t.privacyPage.title2}</span>
      </SectionTitle>
      <FadeIn delay={0.1}>
        <p className="text-muted-foreground text-xs tracking-wider mb-10 font-mono">{t.privacyPage.meta}</p>
      </FadeIn>

      <StaggerContainer className="max-w-3xl space-y-6">
        {t.privacyPage.sections.map((section) => (
          <StaggerItem key={section.h}>
            <motion.div
              whileHover={{ borderColor: "hsl(43 85% 55% / 0.25)" }}
              className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card transition-all"
            >
              <h2 className="font-heading text-xl font-semibold mb-4 text-foreground">{section.h}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-3">
                  {p}
                </p>
              ))}
              {section.items && (
                <ul className="space-y-2 mt-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn delay={0.4}>
        <div className="max-w-3xl mt-10 border-s-2 border-accent/30 ps-5">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t.privacyPage.contactNote}{" "}
            <Link to="/contact" className="text-accent hover:text-foreground transition-colors">
              →
            </Link>
          </p>
        </div>
      </FadeIn>
    </Section>
  );
};

export default Privacy;
