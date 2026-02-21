import { useState } from "react";
import { Section, SectionTitle, FadeIn } from "@/components/SectionComponents";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Thank you", description: "Your inquiry has been submitted. We'll be in touch shortly." });
    setForm({ name: "", company: "", email: "", message: "" });
  };

  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <FadeIn>
            <p className="text-accent font-heading text-sm tracking-widest mb-4">GET IN TOUCH</p>
          </FadeIn>
          <SectionTitle>
            Contact <span className="text-gradient-gold">Our Team</span>
          </SectionTitle>
          <FadeIn delay={0.1}>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Engage with our corporate advisory team to define your project scope and operational needs.
            </p>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Address</p>
                  <p className="text-muted-foreground text-sm">Sharjah Publishing City Free Zone, Sharjah, UAE</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground text-sm">info@shahmco.com</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-muted-foreground text-sm">Contact us for phone inquiries</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-5">
            <h3 className="font-heading text-xl font-semibold mb-2">Corporate Inquiry</h3>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Company</label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="email@company.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                placeholder="Describe your project requirements..."
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-accent-foreground px-8 py-3.5 rounded-lg font-semibold hover:shadow-gold hover:scale-[1.02] transition-all"
            >
              Submit Inquiry
              <Send size={16} />
            </button>
          </form>
        </FadeIn>
      </div>
    </Section>
  );
};

export default Contact;
