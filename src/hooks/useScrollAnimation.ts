import { useEffect, useRef } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  dependencies?: unknown[];
  scrollToTop?: boolean;
  animationClass?: string;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    dependencies = [],
    scrollToTop = true,
    animationClass = "animate-fade-in-up",
  } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
          } else {
            entry.target.classList.remove(animationClass);
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
        try {
          observerRef.current.disconnect();
        } catch (error) {
          console.warn("Failed to clean up scroll animations:", error);
        }
      }
    };
  }, [threshold, rootMargin, animationClass]);

  useEffect(() => {
    if (observerRef.current) {
      try {
        // First unobserve all currently observed elements
        observerRef.current.disconnect();
        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observerRef.current?.observe(el));
      } catch (error) {
        console.warn("Failed to re-observe elements:", error);
      }
    }
  }, dependencies);
};
