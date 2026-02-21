import { Section, SectionTitle, SectionSubtitle, FadeIn, StaggerContainer, StaggerItem } from "@/components/SectionComponents";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import corporateImg from "@/assets/corporate-meeting.jpg";

const About = () => {
  const { t } = useLanguage();

  return (
    <>
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn direction="right">
              <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.about.label}</p>
            </FadeIn>
            <SectionTitle>
              {t.about.title1} <span className="text-gradient-gold">{t.about.title2}</span> {t.about.title3}
            </SectionTitle>
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground leading-relaxed mb-5">{t.about.p1}</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground leading-relaxed mb-5">{t.about.p2}</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-muted-foreground leading-relaxed">{t.about.p3}</p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} direction="left">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl overflow-hidden shadow-card border border-border"
            >
              <img src={corporateImg} alt="Corporate meeting" className="w-full h-80 object-cover" />
            </motion.div>
          </FadeIn>
        </div>
      </Section>

      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      <Section>
        <SectionTitle>{t.about.philosophyTitle}</SectionTitle>
        <SectionSubtitle>{t.about.philosophySubtitle}</SectionSubtitle>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.about.items.map((item) => (
            <StaggerItem key={item}>
              <motion.div
                whileHover={{ y: -3, borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="bg-card border border-border rounded-xl p-6 flex items-start gap-3 transition-shadow"
              >
                <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section className="bg-secondary/20">
        <SectionTitle>
          {t.about.geoTitle1} <span className="text-gradient-gold">{t.about.geoTitle2}</span>
        </SectionTitle>
        <SectionSubtitle>{t.about.geoSubtitle}</SectionSubtitle>
        <StaggerContainer className="flex flex-wrap gap-4">
          {t.about.regions.map((region) => (
            <StaggerItem key={region}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 shadow-card"
              >
                <MapPin size={16} className="text-accent" />
                <span className="text-foreground font-medium">{region}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
};

export default About;
