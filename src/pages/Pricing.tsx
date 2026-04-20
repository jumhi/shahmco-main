import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Landmark,
  Smartphone,
  FileText,
  LockKeyhole,
  Globe,
  Code2,
  Layers,
  Bot,
  Palette,
  Server,
  Sparkles,
} from "lucide-react";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/SectionComponents";
import { useLanguage } from "@/i18n/LanguageContext";

const Pricing = () => {
  const { t } = useLanguage();
  const p = t.pricingPage;

  const creds = [
    { Icon: Landmark, label: "UAE FTA Aligned" },
    { Icon: ShieldCheck, label: "ZATCA Phase 2" },
    { Icon: ShieldCheck, label: "256-bit Encrypted" },
    { Icon: Smartphone, label: "Mobile Ready" },
  ];

  // Flagship modules — from digital.shahmco.com
  const flagship = [
    {
      icon: FileText,
      tag: "FLAGSHIP MODULE",
      title: "Invoicing & Document Management",
      desc: "The technical implementation of SHAHMCO's flagship invoicing system — secure document portal, PDF engine, and bulk processing for modern enterprises.",
      features: [
        "Secure Document Portal — strict data isolation, role-based access, encrypted sessions and full audit logging.",
        "Invoicing Engine — automated PDF generation, sequential numbering, real-time tracking and embedded security stamps.",
        "Bulk Processing — filter, manage and download high volumes; batch exports, advanced search and bulk status updates.",
      ],
      cta: { label: "Request Access", to: "/contact" },
    },
    {
      icon: LockKeyhole,
      tag: "FUNCTIONAL GATEWAY",
      title: "Client Portal",
      desc: "Single sign-on gateway for SHAHMCO clients to access invoicing, documents and project workspaces in one place.",
      features: [
        "Unified login for all SHAHMCO digital services.",
        "Multi-tenant data isolation by client.",
        "Secure password reset & session management.",
      ],
      cta: { label: "Login coming soon", to: "https://portal.shahmco.com/", external: true },
      status: "In Development",
    },
  ];

  // Other implementation services — from digital.shahmco.com
  const services = [
    {
      icon: Globe,
      tag: "Websites",
      title: "Business Websites",
      desc: "One-page and multi-page mobile-first sites built for conversion. WhatsApp ordering and booking flows included. Delivered in 24 hours.",
      bullets: ["Mobile-first responsive design", "WhatsApp ordering / booking", "24-hour turnaround"],
    },
    {
      icon: Code2,
      tag: "Web Applications",
      title: "Custom Web Applications",
      desc: "Full-stack web apps tailored to your business workflows. Built with React, Node.js and cloud infrastructure.",
      bullets: ["React + Node.js stack", "Workflow automation", "Cloud-native deployment"],
    },
    {
      icon: Layers,
      tag: "SaaS Development",
      title: "SaaS Platform Development",
      desc: "Multi-tenant software products built to scale. From MVP to enterprise. Supabase, Vercel and modern stacks.",
      bullets: ["Multi-tenant architecture", "MVP → Enterprise scaling", "Modern serverless stack"],
    },
    {
      icon: Bot,
      tag: "Automation & AI",
      title: "Automation & AI Integration",
      desc: "Automate repetitive tasks with AI-powered workflows. Email automation, invoice systems and CRM triggers.",
      bullets: ["AI-powered workflows", "Email & invoice automation", "CRM trigger integrations"],
    },
    {
      icon: Palette,
      tag: "Branding & Design",
      title: "Brand Identity & Design",
      desc: "Logo, colour palette, typography system and brand guidelines. Premium aesthetic built for the UAE market.",
      bullets: ["Logo & visual identity", "Typography & colour system", "Full brand guidelines"],
    },
    {
      icon: Server,
      tag: "Hosting & Support",
      title: "Hosting, Maintenance & Support",
      desc: "Domain management, uptime monitoring, SSL and 24/7 support. Your site stays live, always.",
      bullets: ["Domain & DNS management", "SSL + uptime monitoring", "24/7 support coverage"],
    },
  ];

  return (
    <>
      {/* HERO */}
      <Section className="pb-0">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">
            SHAHMCO GLOBAL FZC — DIGITAL DIVISION
          </p>
        </FadeIn>
        <SectionTitle>
          We Build <span className="text-gradient-gold">Digital Empires.</span>
        </SectionTitle>
        <SectionSubtitle>
          Websites. Software. Automation. Deployed in the UAE and beyond — corporate advisory and software solutions
          built for SMEs, enterprises and SHAHMCO Global FZC clients.
        </SectionSubtitle>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-12">
            {creds.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground"
              >
                <Icon size={12} className="text-accent" />
                {label}
              </span>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* FLAGSHIP MODULES */}
      <Section className="pt-10">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">TECHNICAL IMPLEMENTATION</p>
        </FadeIn>
        <SectionTitle>
          Flagship <span className="text-gradient-gold">Modules</span>
        </SectionTitle>
        <SectionSubtitle>
          Document management & digital services for SHAHMCO Global FZC clients.
        </SectionSubtitle>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 mt-6">
          {flagship.map((m) => {
            const Icon = m.icon;
            return (
              <StaggerItem key={m.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative h-full bg-card border border-accent/30 rounded-2xl p-8 shadow-card transition-all"
                >
                  <div className="absolute -top-3 start-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    <Sparkles size={12} /> {m.tag}
                  </div>
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">{m.title}</h3>
                  </div>
                  {m.status && (
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground mb-3">
                      {m.status}
                    </span>
                  )}
                  <p className="text-muted-foreground text-sm mb-5">{m.desc}</p>
                  <ul className="space-y-3 border-t border-border pt-5 mb-6">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {m.cta.external ? (
                    <a
                      href={m.cta.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
                    >
                      {m.cta.label} <ArrowRight size={14} />
                    </a>
                  ) : (
                    <Link
                      to={m.cta.to}
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
                    >
                      {m.cta.label} <ArrowRight size={14} />
                    </Link>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* OTHER IMPLEMENTATION SERVICES */}
      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">OTHER IMPLEMENTATION SERVICES</p>
        </FadeIn>
        <SectionTitle>
          Software & <span className="text-gradient-gold">Digital Services</span>
        </SectionTitle>
        <SectionSubtitle>
          From websites to bespoke SaaS — every product below is built, deployed and supported by SHAHMCO's digital team.
        </SectionSubtitle>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "hsl(43 85% 55% / 0.4)" }}
                  className="h-full bg-card border border-border rounded-2xl p-7 shadow-card transition-all"
                >
                  <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <p className="text-[11px] tracking-widest text-accent font-heading mb-2">{s.tag}</p>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <p className="text-muted-foreground text-xs mt-8 max-w-2xl">{p.fineprint}</p>
        </FadeIn>
      </Section>

      {/* FAQ */}
      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">FAQS</p>
        </FadeIn>
        <SectionTitle>
          {p.faqTitle1} <span className="text-gradient-gold">{p.faqTitle2}</span>
        </SectionTitle>

        <StaggerContainer className="grid md:grid-cols-2 gap-5 mt-6">
          {p.faqs.map((f) => (
            <StaggerItem key={f.q}>
              <motion.div
                whileHover={{ borderColor: "hsl(43 85% 55% / 0.3)" }}
                className="bg-card border border-border rounded-xl p-6 shadow-card h-full transition-all"
              >
                <h4 className="font-heading font-semibold text-foreground mb-2">{f.q}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4 mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all text-sm font-medium"
            >
              Have another question?
            </Link>
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all text-sm font-medium"
            >
              See Downloads <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-12 bg-card/40 border border-border rounded-xl p-6 max-w-3xl">
            <p className="text-muted-foreground text-sm leading-relaxed">
              All online payments are processed through a CBUAE-licensed payment gateway. Shahmco Global FZC LLC is the
              direct seller of these products and services. The company does not hold, pool, or transfer funds on
              behalf of any third party.
            </p>
            <p className="text-[11px] text-muted-foreground/70 font-mono mt-3">
              Corporate Tax TRN: 105208778800001 · SPCFZ License No. 4423928.01
            </p>
          </div>
        </FadeIn>
      </Section>
    </>
  );
};

export default Pricing;
