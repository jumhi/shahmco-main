import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/shahmco-logo.png";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Shahmco Global" className="h-10 w-auto object-contain" />
              <span className="text-gradient-gold font-heading text-lg font-bold">SHAHMCO</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-accent font-heading text-sm font-semibold mb-4 tracking-wider">{t.footer.services}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground transition-colors duration-300">{t.footer.advisoryLink}</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors duration-300">{t.footer.coordinationLink}</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors duration-300">{t.footer.softwareLink}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-heading text-sm font-semibold mb-4 tracking-wider">{t.footer.company}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors duration-300">{t.nav.about}</Link></li>
              <li><Link to="/how-we-work" className="hover:text-foreground transition-colors duration-300">{t.nav.howWeWork}</Link></li>
              <li><Link to="/compliance" className="hover:text-foreground transition-colors duration-300">{t.nav.compliance}</Link></li>
              <li><Link to="/clients" className="hover:text-foreground transition-colors duration-300">{t.nav.clients}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-heading text-sm font-semibold mb-4 tracking-wider">{t.footer.contactTitle}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>{t.footer.address1}</li>
              <li>{t.footer.address2}</li>
              <li><Link to="/contact" className="text-accent hover:text-foreground transition-colors duration-300">{t.footer.getInTouch}</Link></li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-xs">{t.footer.rights}</p>
          <Link to="/terms" className="text-muted-foreground text-xs hover:text-foreground transition-colors">{t.footer.terms}</Link>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
