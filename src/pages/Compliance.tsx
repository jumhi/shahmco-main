import { Section, SectionTitle, SectionSubtitle, FadeIn } from "@/components/SectionComponents";
import { ShieldCheck, AlertTriangle } from "lucide-react";

const compliance = [
  "Corporate client due diligence",
  "Written contractual agreements",
  "Invoice-based transaction structure",
  "Record retention for a minimum of five years",
  "No cash transaction acceptance",
];

const aml = [
  "Corporate identity verification",
  "Sanctions list screening",
  "Structured documentation archiving",
  "Transaction monitoring under contractual frameworks",
];

const noEngage = [
  "Consumer payment processing",
  "Remittance services",
  "Escrow or fund-holding activities",
  "Third-party pass-through payment structures",
];

const Compliance = () => {
  return (
    <>
      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">GOVERNANCE</p>
        </FadeIn>
        <SectionTitle>
          Compliance <span className="text-gradient-gold">Commitment</span>
        </SectionTitle>
        <SectionSubtitle>We operate under valid UAE trade licenses and maintain rigorous compliance procedures.</SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={24} className="text-accent" />
                <h3 className="font-heading text-xl font-semibold">Internal Compliance</h3>
              </div>
              <ul className="space-y-3">
                {compliance.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={24} className="text-accent" />
                <h3 className="font-heading text-xl font-semibold">AML & Risk Control</h3>
              </div>
              <ul className="space-y-3">
                {aml.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <FadeIn>
          <div className="bg-card border border-border rounded-xl p-8 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle size={24} className="text-accent" />
              <h3 className="font-heading text-xl font-semibold">The Company Does Not Engage In</h3>
            </div>
            <ul className="space-y-3">
              {noEngage.map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Section>
    </>
  );
};

export default Compliance;
