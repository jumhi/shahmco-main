import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle, FadeIn, StaggerContainer, StaggerItem } from "@/components/SectionComponents";
import { Code, Briefcase, FileText, Plane, Globe, Camera, Building2, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { LucideIcon } from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const serviceBlocks: { num: string; icon: LucideIcon; title: string; items: string[]; note: string }[] = [
    { num: "01", icon: Code, title: t.servicesPage.techTitle, items: t.servicesPage.techItems, note: t.servicesPage.techNote },
    { num: "02", icon: Briefcase, title: t.servicesPage.advisoryTitle, items: t.servicesPage.advisoryItems, note: t.servicesPage.advisoryNote },
    { num: "03", icon: FileText, title: t.servicesPage.commercialTitle, items: t.servicesPage.commercialItems, note: t.servicesPage.commercialNote },
    { num: "04", icon: Plane, title: t.servicesPage.travelTitle, items: t.servicesPage.travelItems, note: t.servicesPage.travelNote },
    { num: "05", icon: Globe, title: t.servicesPage.coordTitle, items: t.servicesPage.coordItems, note: t.servicesPage.coordNote },
  ];

  const visaCategories = [
    { icon: Camera, title: "Tourist Visa", desc: "Short-stay leisure travel — 30 to 90 days for most destinations." },
    { icon: Building2, title: "Business Visa", desc: "Meetings, conferences, and commercial visits with invitation letters." },
    { icon: GraduationCap, title: "Student Visa", desc: "Study permits with admission letters and financial documentation support." },
    { icon: TrendingUp, title: "Investment / Residency", desc: "Golden visa, residency-by-investment, and citizenship pathways." },
  ];

  return (
    <>
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
                className="bg-card border border-border rounded-xl p-8 md:p-10 transition-all duration-500 shadow-card relative overflow-hidden"
              >
                <span className="absolute top-6 end-8 font-heading text-6xl md:text-7xl font-bold text-accent/10 select-none">
                  {block.num}
                </span>
                <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
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

      {/* Visa Consultation Categories */}
      <Section className="pt-0">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">VISA CONSULTATION & APPLICATION SUPPORT</p>
        </FadeIn>
        <SectionTitle>
          Visa <span className="text-gradient-gold">Categories</span>
        </SectionTitle>
        <SectionSubtitle>
          We provide structured consultation across four primary visa categories — covering documentation guidance, eligibility assessment, and application support.
        </SectionSubtitle>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visaCategories.map((c) => (
            <StaggerItem key={c.title}>
              <motion.div
                whileHover={{ y: -4, borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="bg-card border border-border rounded-xl p-6 shadow-card h-full transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <c.icon size={18} className="text-accent" />
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2">{c.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/visa"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all text-sm font-medium"
            >
              Explore Visa Services <ArrowRight size={14} />
            </Link>
            <Link
              to="/visa-score"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all text-sm font-medium"
            >
              Free VisaScore Pro™ Check
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
};

export default Services;
