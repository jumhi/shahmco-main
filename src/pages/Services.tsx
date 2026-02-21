import { Section, SectionTitle, SectionSubtitle, FadeIn, StaggerContainer, StaggerItem } from "@/components/SectionComponents";
import { Briefcase, Globe, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { LucideIcon } from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const serviceBlocks: { icon: LucideIcon; title: string; items: string[]; note: string }[] = [
    { icon: Briefcase, title: t.servicesPage.advisoryTitle, items: t.servicesPage.advisoryItems, note: t.servicesPage.advisoryNote },
    { icon: Globe, title: t.servicesPage.coordTitle, items: t.servicesPage.coordItems, note: t.servicesPage.coordNote },
    { icon: Code, title: t.servicesPage.techTitle, items: t.servicesPage.techItems, note: t.servicesPage.techNote },
  ];

  return (
    <Section>
      <FadeIn>
        <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.servicesPage.label}</p>
      </FadeIn>
      <SectionTitle>
        {t.servicesPage.title1} <span className="text-gradient-gold">{t.servicesPage.title2}</span>
      </SectionTitle>
      <SectionSubtitle>{t.servicesPage.subtitle}</SectionSubtitle>

      <StaggerContainer className="space-y-8">
        {serviceBlocks.map((block) => (
          <StaggerItem key={block.title}>
            <motion.div
              whileHover={{ borderColor: "hsl(43 85% 55% / 0.25)" }}
              className="bg-card border border-border rounded-xl p-8 md:p-10 transition-all duration-500 shadow-card"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0"
                >
                  <block.icon size={24} className="text-accent-foreground" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-semibold mb-6">{block.title}</h3>
                  <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground text-sm italic border-t border-border pt-4">{block.note}</p>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
};

export default Services;
