import { Section, SectionTitle, SectionSubtitle, FadeIn, StaggerContainer, StaggerItem } from "@/components/SectionComponents";
import { MapPin, ShieldCheck, AlertTriangle } from "lucide-react";
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

      {/* How We Work (merged) */}
      <Section className="bg-secondary/20">
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

      {/* Compliance (merged) */}
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

        <FadeIn>
          <motion.div
            whileHover={{ borderColor: "hsl(0 84% 60% / 0.3)" }}
            className="bg-card border border-border rounded-xl p-8 max-w-2xl shadow-card mt-10"
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

      {/* Geography */}
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
