import { Section, SectionTitle, SectionSubtitle, FadeIn } from "@/components/SectionComponents";
import { MapPin } from "lucide-react";
import corporateImg from "@/assets/corporate-meeting.jpg";

const regions = ["GCC Region", "United Kingdom", "Kenya", "Indonesia", "China"];

const About = () => {
  return (
    <>
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <p className="text-accent font-heading text-sm tracking-widest mb-4">ABOUT US</p>
            </FadeIn>
            <SectionTitle>
              About <span className="text-gradient-gold">Shahmco Global</span> FZC LLC
            </SectionTitle>
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Shahmco Global FZC LLC is a Sharjah Publishing City Free Zone company established to provide professional corporate advisory and technology services to international business clients.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to support organizations with structured consultancy, operational coordination, and digital solution development through disciplined project execution and transparent engagement models.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.3}>
            <div className="rounded-2xl overflow-hidden shadow-card border border-border">
              <img src={corporateImg} alt="Corporate meeting" className="w-full h-80 object-cover" />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <SectionTitle>Our Service Philosophy</SectionTitle>
        <SectionSubtitle>We focus exclusively on structured, professional B2B engagements.</SectionSubtitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Business-to-business engagements",
            "Defined project scopes",
            "Contractual service agreements",
            "Milestone-based billing",
            "Professional service delivery",
            "No financial intermediation",
          ].map((item, i) => (
            <FadeIn key={item} delay={i * 0.08}>
              <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>
          Our <span className="text-gradient-gold">Geographic Reach</span>
        </SectionTitle>
        <SectionSubtitle>We serve corporate clients located across these regions, delivered remotely through structured coordination frameworks.</SectionSubtitle>
        <div className="flex flex-wrap gap-4">
          {regions.map((region, i) => (
            <FadeIn key={region} delay={i * 0.1}>
              <div className="flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3">
                <MapPin size={16} className="text-accent" />
                <span className="text-foreground font-medium">{region}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
};

export default About;
