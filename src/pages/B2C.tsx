import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/SectionComponents";
import { useLanguage } from "@/i18n/LanguageContext";
import CorporatePackages from "@/components/CorporatePackages";
import PaymentMethodsBanner from "@/components/PaymentMethodsBanner";

// Payment gateway placeholder — wire to a real provider (Stripe, Telr, Network International) later.
const handleCheckout = (productTitle: string, price: string) => {
  const params = new URLSearchParams({ product: productTitle, price });
  window.location.href = `/contact?${params.toString()}`;
};

const B2C = () => {
  const { t } = useLanguage();
  const d = t.downloadsPage;

  return (
    <>
      <Section className="pb-0">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">B2C · BUSINESS-TO-CONSUMER</p>
        </FadeIn>
        <SectionTitle>
          {d.title1} <span className="text-gradient-gold">{d.title2}</span>
        </SectionTitle>
        <SectionSubtitle>{d.subtitle}</SectionSubtitle>
      </Section>

      <Section className="pt-10">
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">INSTANT DOWNLOADS</p>
        </FadeIn>
        <SectionTitle>
          {d.digitalTitle1} <span className="text-gradient-gold">{d.digitalTitle2}</span>
        </SectionTitle>
        <SectionSubtitle>{d.digitalSubtitle}</SectionSubtitle>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {d.items.map((item) => {
            const isHighTicket = item.price.includes("AED 2") || item.price.includes("AED 3");
            return (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "hsl(43 85% 55% / 0.3)" }}
                  className="bg-card border border-border rounded-xl p-6 shadow-card h-full flex flex-col transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                    <FileText size={18} className="text-accent" />
                  </div>
                  <span className="text-[10px] tracking-widest text-accent font-mono mb-2">
                    {item.tagLabel.toUpperCase()}
                  </span>
                  <h4 className="font-heading font-semibold text-foreground mb-2 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-5">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between border-t border-border pt-4 gap-2">
                    <div>
                      <div className="text-gradient-gold font-heading font-bold">{item.price}</div>
                      <div className="text-[10px] text-muted-foreground">+ VAT</div>
                    </div>
                    {isHighTicket ? (
                      <Link
                        to="/contact"
                        className="text-xs px-3 py-1.5 rounded-md border border-accent/30 text-accent hover:bg-accent/10 transition-all"
                      >
                        {d.enquire}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleCheckout(item.title, item.price)}
                        className="text-xs px-3 py-1.5 rounded-md bg-accent text-accent-foreground hover:opacity-90 transition-all"
                      >
                        {d.getStarted}
                      </button>
                    )}
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">CORPORATE SOLUTIONS</p>
        </FadeIn>
        <SectionTitle>
          Premium Service <span className="text-gradient-gold">Packages</span>
        </SectionTitle>
        <SectionSubtitle>
          Select your market. Purchase directly or enquire for a tailored assessment.
          Bilingual · GCC-compliant · Delivered to standard.
        </SectionSubtitle>

        <CorporatePackages />
      </Section>

      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">PURCHASE PROCESS</p>
        </FadeIn>
        <SectionTitle>
          {d.stepsTitle1} <span className="text-gradient-gold">{d.stepsTitle2}</span>
        </SectionTitle>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {d.steps.map((s, i) => (
            <StaggerItem key={s.t}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card h-full transition-all"
              >
                <div className="font-mono text-accent text-sm mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2">{s.t}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4 mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-all text-sm font-medium"
            >
              Request a Quote <ArrowRight size={14} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all text-sm font-medium"
            >
              See Flagship Products
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* Payment Methods Banner */}
      <Section className="pt-0">
        <FadeIn>
          <PaymentMethodsBanner />
        </FadeIn>
      </Section>
    </>
  );
};

export default B2C;
