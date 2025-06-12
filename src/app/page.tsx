"use client";

import { RefObject, useEffect, useRef } from "react";

import Collection from "@/components/sections/Collection";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Footer from "@/components/sections/footer/Footer";
import Header from "@/components/sections/header/Header";

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

  useEffect(() => {
    const { hash } = window.location;

    if (hash === "#collection") {
      if (collectionRef.current) {
        handleScroll(collectionRef);
      }
    } else if (hash === "#products") {
      if (productsRef.current) {
        handleScroll(productsRef);
      }
    } else if (hash === "#about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
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
