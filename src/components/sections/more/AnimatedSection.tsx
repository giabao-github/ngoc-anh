import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedSection = ({
  children,
  className = "",
}: AnimatedSectionProps) => (
  <section
    className={`transition-all duration-1000 ease-out transform translate-y-8 opacity-0 animate-on-scroll ${className}`}
  >
    {children}
  </section>
);
