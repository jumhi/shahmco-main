import { Section, SectionTitle, SectionSubtitle, FadeIn } from "@/components/SectionComponents";

const steps = [
  { num: "01", title: "Initial Corporate Consultation", desc: "We begin with a structured dialogue to understand your business requirements." },
  { num: "02", title: "Scope Definition & Proposal", desc: "A detailed proposal outlining deliverables, timelines, and engagement terms." },
  { num: "03", title: "Contract Execution", desc: "Formal agreements executed with clear terms and milestone definitions." },
  { num: "04", title: "Milestone-Based Delivery", desc: "Progressive delivery with regular reporting and client alignment." },
  { num: "05", title: "Project Completion & Review", desc: "Final deliverables with comprehensive review and documentation." },
];

const billing = [
  "Fixed professional service fees",
  "Milestone or quarterly invoicing",
  "Corporate clients only",
  "Invoice-based payments",
  "No commission-based compensation",
];

const HowWeWork = () => {
  return (
    <>
      <Section>
        <FadeIn>
          <p className="text-accent font-heading text-sm tracking-widest mb-4">PROCESS</p>
        </FadeIn>
        <SectionTitle>
          Our <span className="text-gradient-gold">Engagement Model</span>
        </SectionTitle>
        <SectionSubtitle>A disciplined, transparent approach from consultation to completion.</SectionSubtitle>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div className="flex items-start gap-6 bg-card border border-border rounded-xl p-6 hover:border-accent/20 transition-all">
                <span className="text-gradient-gold font-heading text-3xl font-bold">{step.num}</span>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <SectionTitle>Billing Structure</SectionTitle>
        <SectionSubtitle>Transparent, structured billing aligned with professional standards.</SectionSubtitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {billing.map((item, i) => (
            <FadeIn key={item} delay={i * 0.08}>
              <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span className="text-foreground text-sm">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
};

export default HowWeWork;
