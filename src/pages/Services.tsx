import { Section, SectionTitle, SectionSubtitle, FadeIn } from "@/components/SectionComponents";
import { Briefcase, Globe, Code } from "lucide-react";

const serviceBlocks = [
  {
    icon: Briefcase,
    title: "Corporate Advisory Services",
    items: [
      "Strategic business consulting",
      "Market entry advisory",
      "Operational structuring",
      "Cross-border coordination support",
      "Project-based implementation oversight",
    ],
    note: "Each engagement is governed by formal agreements and defined service deliverables.",
  },
  {
    icon: Globe,
    title: "Operational Coordination Support",
    items: [
      "Structured coordination advisory",
      "Charter logistics consultation",
      "Cross-border operational planning",
      "Vendor coordination framework",
    ],
    note: "Our role remains advisory and coordination-based only.",
  },
  {
    icon: Code,
    title: "Software & Technology Solutions",
    items: [
      "Custom software development",
      "Web application development",
      "Database architecture",
      "System integration advisory",
      "Digital transformation consulting",
    ],
    note: "Projects are milestone-based and delivered under defined scopes.",
  },
];

const Services = () => {
  return (
    <Section>
      <FadeIn>
        <p className="text-accent font-heading text-sm tracking-widest mb-4">WHAT WE DO</p>
      </FadeIn>
      <SectionTitle>
        Our <span className="text-gradient-gold">Services</span>
      </SectionTitle>
      <SectionSubtitle>Comprehensive corporate advisory and technology solutions for international business clients.</SectionSubtitle>

      <div className="space-y-10">
        {serviceBlocks.map((block, i) => (
          <FadeIn key={block.title} delay={i * 0.15}>
            <div className="bg-card border border-border rounded-xl p-8 md:p-10 hover:border-accent/20 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <block.icon size={24} className="text-accent-foreground" />
                </div>
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
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

export default Services;
