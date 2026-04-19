import { useState } from "react";
import { Section, SectionTitle, FadeIn } from "@/components/SectionComponents";
import { MapPin, Mail, Phone, Send, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const PHONE_PREFIXES = [
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+86", label: "🇨🇳 +86" },
  { code: "+966", label: "🇸🇦 +966" },
  { code: "+92", label: "🇵🇰 +92" },
  { code: "+7", label: "🇷🇺 +7" },
  { code: "+254", label: "🇰🇪 +254" },
  { code: "+62", label: "🇮🇩 +62" },
];

type FormErrors = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [phonePrefix, setPhonePrefix] = useState("+971");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.company.trim()) e.company = "Company name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.phone && !/^\d{4,15}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid phone number (digits only).";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const fullPhone = form.phone ? `${phonePrefix} ${form.phone}` : "";
      const { data, error } = await supabase.functions.invoke("submit-contact", {
        body: {
          full_name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: fullPhone || null,
          message: form.message.trim(),
        },
      });

      if (error) throw error;
      setSuccessName(form.name.split(" ")[0]);
      setForm({ name: "", company: "", email: "", phone: "", message: "" });
    } catch {
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at info@shahmco.com",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    { icon: MapPin, label: t.contactPage.address, value: t.contactPage.addressValue },
    { icon: Mail, label: t.contactPage.email, value: "info@shahmco.com", href: "mailto:info@shahmco.com" },
    { icon: Phone, label: t.contactPage.phone, value: "+971 56 787 8746", href: "https://wa.me/971567878746" },
  ];

  const inputClass =
    "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all";

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
                <motion.div whileHover={{ x: 6 }} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-accent transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
            <FadeIn delay={0.4}>
              <div className="mt-6 pt-6 border-t border-border space-y-1.5 text-xs font-mono text-muted-foreground/80">
                <div className="flex justify-between"><span>LICENSE</span><span>4423928.01</span></div>
                <div className="flex justify-between"><span>JURISDICTION</span><span>SPCFZ · UAE</span></div>
                <div className="flex justify-between"><span>TAX TRN</span><span>105208778800001</span></div>
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.2} direction="left">
          <AnimatePresence mode="wait">
            {successName ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-2xl p-12 shadow-card flex flex-col items-center justify-center text-center min-h-[400px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle size={64} className="text-accent mb-6" />
                </motion.div>
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                  Thank you, {successName}.
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  We've received your inquiry and will respond within 1–2 business days.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                whileHover={{ borderColor: "hsl(43 85% 55% / 0.2)" }}
                className="bg-card border border-border rounded-2xl p-8 space-y-5 shadow-card"
              >
                <h3 className="font-heading text-xl font-semibold mb-2">{t.contactPage.formTitle}</h3>

                {/* Full Name */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t.contactPage.nameLabel}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                    className={`${inputClass} ${errors.name ? "ring-2 ring-destructive/60" : ""}`}
                    placeholder={t.contactPage.namePlaceholder}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Company */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t.contactPage.companyLabel}</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => { setForm({ ...form, company: e.target.value }); setErrors({ ...errors, company: undefined }); }}
                    className={`${inputClass} ${errors.company ? "ring-2 ring-destructive/60" : ""}`}
                    placeholder={t.contactPage.companyPlaceholder}
                  />
                  {errors.company && <p className="text-destructive text-xs mt-1">{errors.company}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t.contactPage.emailLabel}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                    className={`${inputClass} ${errors.email ? "ring-2 ring-destructive/60" : ""}`}
                    placeholder={t.contactPage.emailPlaceholder}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone (optional) */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Phone <span className="text-muted-foreground/60">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      className="bg-secondary border border-border rounded-lg px-3 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 w-[120px]"
                    >
                      {PHONE_PREFIXES.map((p) => (
                        <option key={p.code} value={p.code}>{p.label}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => { setForm({ ...form, phone: e.target.value.replace(/[^\d\s]/g, "") }); setErrors({ ...errors, phone: undefined }); }}
                      className={`${inputClass} flex-1 ${errors.phone ? "ring-2 ring-destructive/60" : ""}`}
                      placeholder="50 123 4567"
                    />
                  </div>
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t.contactPage.messageLabel}</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: undefined }); }}
                    className={`${inputClass} resize-none ${errors.message ? "ring-2 ring-destructive/60" : ""}`}
                    placeholder={t.contactPage.messagePlaceholder}
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-gold text-accent-foreground px-8 py-3.5 rounded-lg font-semibold shadow-gold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      {t.contactPage.submit}
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeIn>
      </div>
    </Section>
  );
};

export default Contact;
