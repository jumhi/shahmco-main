import { Section, SectionTitle, FadeIn } from "@/components/SectionComponents";

const terms = [
  "Services provided on professional advisory basis",
  "No financial intermediation",
  "No fiduciary fund handling",
  "Limitation of liability",
  "Governing law: UAE",
  "Payment terms: invoice-based",
];

const Terms = () => {
  return (
    <Section>
      <FadeIn>
        <p className="text-accent font-heading text-sm tracking-widest mb-4">LEGAL</p>
      </FadeIn>
      <SectionTitle>
        Terms of <span className="text-gradient-gold">Service</span>
      </SectionTitle>
      <div className="max-w-2xl space-y-4 mt-8">
        {terms.map((term, i) => (
          <FadeIn key={term} delay={i * 0.08}>
            <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              <span className="text-foreground">{term}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

export default Terms;
