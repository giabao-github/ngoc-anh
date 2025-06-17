"use client";

import { RefObject, useLayoutEffect, useRef } from "react";

import Collection from "@/components/sections/Collection";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/footer/Footer";
import Header from "@/components/sections/header/Header";
import Products from "@/components/sections/products/Products";

import useIsMobile from "@/hooks/useIsMobile";

const App = () => {
  const collectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleScroll = (ref: RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const elementPosition = ref.current.offsetTop;
      const offsetPosition = isMobile ? elementPosition - 80 : elementPosition;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useLayoutEffect(() => {
    const { hash } = window.location;

    // Use requestAnimationFrame to ensure DOM is ready
    const frameId = requestAnimationFrame(() => {
      if (hash === "#collection" && collectionRef.current) {
        handleScroll(collectionRef);
      } else if (hash === "#products" && productsRef.current) {
        handleScroll(productsRef);
      } else if (hash === "#about" && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [isMobile]);

  return (
    <div className="min-h-screen">
      <title>Thạch Âm - Trang chủ</title>
      <Header
        hasSections
        collectionRef={collectionRef}
        productsRef={productsRef}
        aboutRef={aboutRef}
      />
      <Hero />
      <Collection collectionRef={collectionRef} />
      <Products productsRef={productsRef} />
      <Footer aboutRef={aboutRef} />
    </div>
  );
};

export default App;
