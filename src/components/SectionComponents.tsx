import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = "", id }: SectionProps) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="container mx-auto px-6">{children}</div>
  </section>
);

export const SectionTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${className}`}
  >
    {children}
  </motion.h2>
);

export const SectionSubtitle = ({ children }: { children: ReactNode }) => (
  <motion.p
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="text-muted-foreground text-lg max-w-2xl mb-12"
  >
    {children}
  </motion.p>
);

export const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);
