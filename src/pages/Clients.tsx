import { Section, SectionTitle, SectionSubtitle, FadeIn } from "@/components/SectionComponents";
import { Building2 } from "lucide-react";

const clientTypes = [
  "Technology firms",
  "Logistics and coordination service providers",
  "Business consulting clients",
  "Cross-border operational partners",
];

const Clients = () => {
  return (
    <Section>
      <FadeIn>
        <p className="text-accent font-heading text-sm tracking-widest mb-4">OUR CLIENTS</p>
      </FadeIn>
      <SectionTitle>
        Who We <span className="text-gradient-gold">Work With</span>
      </SectionTitle>
      <SectionSubtitle>We work exclusively with corporate entities under contract-based engagements.</SectionSubtitle>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
        {clientTypes.map((client, i) => (
          <FadeIn key={client} delay={i * 0.1}>
            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4 hover:border-accent/20 transition-all">
              <Building2 size={22} className="text-accent mt-0.5 flex-shrink-0" />
              <span className="text-foreground font-medium">{client}</span>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.5}>
        <p className="text-muted-foreground text-sm mt-10 italic">
          Client engagements are governed by confidentiality agreements.
        </p>
      </FadeIn>
    </Section>
  );
};

export default Clients;
