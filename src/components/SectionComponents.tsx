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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${className}`}
  >
    {children}
  </motion.h2>
);

export const SectionSubtitle = ({ children }: { children: ReactNode }) => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="text-muted-foreground text-lg max-w-2xl mb-12"
  >
    {children}
  </motion.p>
);

export const FadeIn = ({ children, delay = 0, className = "", direction = "up" }: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const variants = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      initial={variants[direction].initial}
      whileInView={variants[direction].animate}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.12 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const CountUp = ({ value, suffix = "" }: { value: string; suffix?: string }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    className="text-gradient-gold font-heading text-4xl md:text-5xl font-bold"
  >
    {value}{suffix}
  </motion.span>
);
