import { Link } from "react-router-dom";
import logo from "@/assets/shahmco-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Shahmco Global" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-gradient-gold font-heading text-lg font-bold">SHAHMCO</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              UAE-based corporate advisory and technology services firm.
            </p>
          </div>

          <div>
            <h4 className="text-accent font-heading text-sm font-semibold mb-4 tracking-wider">SERVICES</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground transition-colors">Corporate Advisory</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Operational Coordination</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Software Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-heading text-sm font-semibold mb-4 tracking-wider">COMPANY</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/how-we-work" className="hover:text-foreground transition-colors">How We Work</Link></li>
              <li><Link to="/compliance" className="hover:text-foreground transition-colors">Compliance</Link></li>
              <li><Link to="/clients" className="hover:text-foreground transition-colors">Clients</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-heading text-sm font-semibold mb-4 tracking-wider">CONTACT</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sharjah Publishing City Free Zone</li>
              <li>Sharjah, UAE</li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Get in Touch →</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">© 2025 Shahmco Global FZC LLC. All rights reserved.</p>
          <Link to="/terms" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
