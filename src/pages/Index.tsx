import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Globe, Code, ChevronRight, Shield, Target, FileCheck } from "lucide-react";
import { Section, SectionTitle, SectionSubtitle, FadeIn } from "@/components/SectionComponents";
import heroBg from "@/assets/hero-dubai.jpg";

const services = [
  {
    icon: Briefcase,
    title: "Corporate Advisory",
    description: "Strategic business consulting, operational coordination, and structured project advisory services.",
  },
  {
    icon: Globe,
    title: "Operational Coordination",
    description: "Cross-border coordination support, charter logistics advisory, and project implementation oversight.",
  },
  {
    icon: Code,
    title: "Software & Digital",
    description: "Custom software development, web platforms, database systems, and digital transformation consulting.",
  },
];

const whyChoose = [
  {
    icon: Target,
    title: "B2B-Focused Service Model",
    description: "We dedicate our resources entirely to business clients, ensuring maximum relevance and professional synergy.",
  },
  {
    icon: FileCheck,
    title: "Milestone-Driven Execution",
    description: "All engagements are strictly contract-based, ensuring transparency in project execution and delivery.",
  },
  {
    icon: Shield,
    title: "Professional Compliance",
    description: "Operating remotely with rigorous international compliance and strictly invoice-based billing.",
  },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/60 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-accent text-sm font-medium tracking-wider">UAE-BASED GLOBAL EXCELLENCE</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Corporate Advisory
              <span className="text-gradient-gold italic block">&amp; Software</span>
              Solutions
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Delivering structured business advisory and technology solutions to corporate clients across international markets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-gold text-accent-foreground px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-gold hover:scale-105"
              >
                Request Consultation
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-secondary/50 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-accent font-heading text-sm tracking-widest mb-4">WHO WE ARE</p>
          </FadeIn>
          <SectionTitle className="text-center">
            Exclusively B2B.{" "}
            <span className="text-gradient-gold">Professionally Structured.</span>
          </SectionTitle>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Shahmco Global FZC LLC is a UAE-based corporate advisory and technology services firm providing structured consultancy, operational coordination support, and custom software development solutions to business clients.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex justify-center gap-12">
              <div className="text-center">
                <p className="text-gradient-gold font-heading text-4xl font-bold">100%</p>
                <p className="text-muted-foreground text-sm mt-1">Corporate Focus</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <p className="text-gradient-gold font-heading text-4xl font-bold">SPC</p>
                <p className="text-muted-foreground text-sm mt-1">Free Zone Entity</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-secondary/30">
        <SectionTitle>Core Services Overview</SectionTitle>
        <SectionSubtitle>Professional services tailored for corporate clients worldwide.</SectionSubtitle>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.15}>
              <div className="bg-card border border-border rounded-xl p-8 hover:border-accent/30 transition-all duration-500 shadow-card group">
                <div className="w-14 h-14 rounded-lg bg-gradient-gold flex items-center justify-center mb-6">
                  <service.icon size={24} className="text-accent-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-gradient-gold transition-colors">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Why Choose */}
      <Section>
        <SectionTitle>
          Why Choose <span className="text-gradient-gold">Shahmco?</span>
        </SectionTitle>
        <SectionSubtitle>Structured engagement models built for transparency and results.</SectionSubtitle>
        <div className="grid md:grid-cols-3 gap-8">
          {whyChoose.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.15}>
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <item.icon size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-purple">
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Schedule a Consultation</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted-foreground text-lg mb-8">
              Engage with our corporate advisory team to define your project scope and operational needs.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-gold text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:shadow-gold hover:scale-105 transition-all"
            >
              Contact Our Team
              <ChevronRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </Section>
    </>
  );
};

export default Index;
