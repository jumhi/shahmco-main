import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/shahmco-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.downloads, path: "/b2c" },
    { label: t.nav.visa, path: "/visa" },
    { label: "VisaScore", path: "/visascore.html", external: true },
    { label: t.nav.howWeWork, path: "/how-we-work" },
    { label: t.nav.compliance, path: "/compliance" },
    { label: t.nav.contact, path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src={logo}
            alt="Shahmco Global"
            className="h-11 w-auto object-contain transition-all"
            whileHover={{ scale: 1.05 }}
          />
          <div>
            <span className="text-gradient-gold font-heading text-lg font-bold tracking-wide">SHAHMCO GLOBAL</span>
            <p className="text-muted-foreground text-[10px] tracking-[0.2em]">CORPORATE ADVISORY & SOFTWARE SOLUTIONS</p>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-1">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 text-accent hover:text-accent/80"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://portal.shahmco.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all"
          >
            Log In
          </a>
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden text-foreground p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="xl:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-medium rounded-lg text-accent hover:bg-secondary/30 transition-all"
                    >
                      {item.label} →
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                        location.pathname === item.path
                          ? "text-accent bg-secondary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <a
                  href="https://portal.shahmco.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium rounded-lg text-accent hover:bg-secondary/30 transition-all"
                >
                  Log In →
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
