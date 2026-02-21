import { useState } from "react";
import { Section, SectionTitle, FadeIn } from "@/components/SectionComponents";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t.contactPage.successTitle, description: t.contactPage.successDesc });
    setForm({ name: "", company: "", email: "", message: "" });
  };

  const contactInfo = [
    { icon: MapPin, label: t.contactPage.address, value: t.contactPage.addressValue },
    { icon: Mail, label: t.contactPage.email, value: "info@shahmco.com" },
    { icon: Phone, label: t.contactPage.phone, value: t.contactPage.phoneValue },
  ];

  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <FadeIn direction="right">
            <p className="text-accent font-heading text-sm tracking-widest mb-4">{t.contactPage.label}</p>
          </FadeIn>
          <SectionTitle>
            {t.contactPage.title1} <span className="text-gradient-gold">{t.contactPage.title2}</span>
          </SectionTitle>
          <FadeIn delay={0.1}>
            <p className="text-muted-foreground leading-relaxed mb-10">{t.contactPage.subtitle}</p>
          </FadeIn>

          <div className="space-y-5">
            {contactInfo.map((item, i) => (
              <FadeIn key={item.label} delay={0.15 + i * 0.08}>
                <motion.div
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{item.label}</p>
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.2} direction="left">
          <motion.form
            onSubmit={handleSubmit}
            whileHover={{ borderColor: "hsl(43 85% 55% / 0.2)" }}
            className="bg-card border border-border rounded-2xl p-8 space-y-5 shadow-card"
          >
            <h3 className="font-heading text-xl font-semibold mb-2">{t.contactPage.formTitle}</h3>
            {[
              { key: "name", label: t.contactPage.nameLabel, placeholder: t.contactPage.namePlaceholder, type: "text" },
              { key: "company", label: t.contactPage.companyLabel, placeholder: t.contactPage.companyPlaceholder, type: "text" },
              { key: "email", label: t.contactPage.emailLabel, placeholder: t.contactPage.emailPlaceholder, type: "email" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-sm text-muted-foreground mb-1.5 block">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">{t.contactPage.messageLabel}</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none transition-all"
                placeholder={t.contactPage.messagePlaceholder}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-accent-foreground px-8 py-3.5 rounded-lg font-semibold shadow-gold transition-all"
            >
              {t.contactPage.submit}
              <Send size={16} />
            </motion.button>
          </motion.form>
        </FadeIn>
      </div>
    </Section>
  );
};

export default Contact;
