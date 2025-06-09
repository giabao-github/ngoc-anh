import { useEffect, useRef } from "react";

export const useScrollAnimation = (dependencies: unknown[] = []) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    requestAnimationFrame(() => {
      try {
        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observerRef.current?.observe(el));
      } catch (error) {
        console.warn("Failed to initialize scroll animations:", error);
      }
    });

    return () => observerRef.current?.disconnect();
  }, dependencies);
};
