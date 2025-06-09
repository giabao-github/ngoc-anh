import { useEffect, useRef } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  dependencies?: unknown[];
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    dependencies = [],
  } = options;
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
          } else {
            entry.target.classList.remove("animate-fade-in-up");
          }
        });
      },
      { threshold, rootMargin },
    );

    try {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => observerRef.current?.observe(el));
    } catch (error) {
      console.warn("Failed to initialize scroll animations:", error);
    }

    return () => {
      if (observerRef.current) {
        // Optional: unobserve elements first for clarity
        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observerRef.current?.unobserve(el));
        observerRef.current.disconnect();
      }
    };
  }, dependencies);
};
