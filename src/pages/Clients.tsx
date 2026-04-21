import { Section, SectionTitle, SectionSubtitle, FadeIn, StaggerContainer, StaggerItem } from "@/components/SectionComponents";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const Clients = () => {
  const { t } = useLanguage();

  return (
    <Section>
      <FadeIn>
        <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.clientsPage.label}</p>
      </FadeIn>
      <SectionTitle>
        {t.clientsPage.title1} <span className="text-gradient-gold">{t.clientsPage.title2}</span>
      </SectionTitle>
      <SectionSubtitle>{t.clientsPage.subtitle}</SectionSubtitle>

      <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-3xl">
        {t.clientsPage.types.map((client) => (
          <StaggerItem key={client.title}>
            <motion.div
              whileHover={{ y: -4, borderColor: "hsl(43 85% 55% / 0.3)" }}
              className="bg-card border border-border rounded-xl p-6 flex items-start gap-4 shadow-card transition-all h-full"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Building2 size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground font-medium leading-snug">{client.title}</h3>
                {client.desc && (
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{client.desc}</p>
                )}
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn delay={0.5}>
        <p className="text-muted-foreground text-sm mt-10 italic border-s-2 border-accent/30 ps-4">
          {t.clientsPage.note}
        </p>
      </FadeIn>
    </Section>
  );
};

export default Clients;
