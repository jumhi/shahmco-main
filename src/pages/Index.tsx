import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Globe, Code, ChevronRight, Shield, Target, FileCheck, Building2 } from "lucide-react";
import { Section, SectionTitle, SectionSubtitle, FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/SectionComponents";
import { useLanguage } from "@/i18n/LanguageContext";
import heroBg from "@/assets/hero-dubai.jpg";

const Index = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Briefcase, title: t.servicesSection.advisory, description: t.servicesSection.advisoryDesc },
    { icon: Globe, title: t.servicesSection.coordination, description: t.servicesSection.coordinationDesc },
    { icon: Code, title: t.servicesSection.software, description: t.servicesSection.softwareDesc },
  ];

  const whyChoose = [
    { icon: Target, title: t.whyChoose.b2b, description: t.whyChoose.b2bDesc },
    { icon: FileCheck, title: t.whyChoose.milestone, description: t.whyChoose.milestoneDesc },
    { icon: Shield, title: t.whyChoose.compliance, description: t.whyChoose.complianceDesc },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          {/* Decorative elements */}
          <div className="absolute top-1/4 end-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 start-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-secondary/40 backdrop-blur-md border border-accent/20 rounded-full px-5 py-2.5 mb-8"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-accent text-sm font-medium tracking-wider">{t.hero.badge}</span>
            </motion.div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="block"
              >
                {t.hero.title1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-gradient-gold italic block"
              >
                {t.hero.title2}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="block"
              >
                {t.hero.title3}
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-gold text-accent-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-gold hover:scale-105 hover:-translate-y-0.5"
              >
                {t.hero.cta}
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-border/60 text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-secondary/40 hover:border-accent/30 transition-all duration-300"
              >
                {t.hero.learnMore}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-accent"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Introduction */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.intro.label}</p>
          </FadeIn>
          <SectionTitle className="text-center">
            {t.intro.title1}{" "}
            <span className="text-gradient-gold">{t.intro.title2}</span>
          </SectionTitle>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              {t.intro.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-12 flex justify-center gap-16">
              <div className="text-center">
                <CountUp value={t.intro.stat1} />
                <p className="text-muted-foreground text-sm mt-2">{t.intro.stat1Label}</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <CountUp value={t.intro.stat2} />
                <p className="text-muted-foreground text-sm mt-2">{t.intro.stat2Label}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Decorative divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* Services */}
      <Section>
        <SectionTitle>{t.servicesSection.title}</SectionTitle>
        <SectionSubtitle>{t.servicesSection.subtitle}</SectionSubtitle>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <motion.div
                whileHover={{ y: -6, borderColor: "hsl(43 85% 55% / 0.3)" }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl p-8 shadow-card h-full group"
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <service.icon size={24} className="text-accent-foreground" />
                </motion.div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Why Choose */}
      <Section className="bg-secondary/20">
        <SectionTitle>
          {t.whyChoose.title1} <span className="text-gradient-gold">{t.whyChoose.title2}</span>
        </SectionTitle>
        <SectionSubtitle>{t.whyChoose.subtitle}</SectionSubtitle>
        <StaggerContainer className="grid md:grid-cols-3 gap-10">
          {whyChoose.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex gap-5">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 border border-border"
                >
                  <item.icon size={22} className="text-accent" />
                </motion.div>
                <div>
                  <h4 className="font-heading text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Clients (merged) */}
      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.clientsPage.label}</p>
        </FadeIn>
        <SectionTitle>
          {t.clientsPage.title1} <span className="text-gradient-gold">{t.clientsPage.title2}</span>
        </SectionTitle>
        <SectionSubtitle>{t.clientsPage.subtitle}</SectionSubtitle>

        <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {t.clientsPage.types.map((client) => (
            <StaggerItem key={client}>
              <motion.div
                whileHover={{ y: -4, borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="bg-card border border-border rounded-xl p-6 flex items-start gap-4 shadow-card transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-accent" />
                </div>
                <span className="text-foreground font-medium">{client}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.5}>
          <p className="text-muted-foreground text-sm mt-10 italic border-s-2 border-accent/30 ps-4 max-w-3xl mx-auto">
            {t.clientsPage.note}
          </p>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-purple relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 end-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 start-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted-foreground text-lg mb-8">{t.cta.subtitle}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-gold text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:shadow-gold hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
            >
              {t.cta.button}
              <ChevronRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </Section>
    </>
  );
};

export default Index;
