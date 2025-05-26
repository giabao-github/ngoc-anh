"use client";

import Header from "@/app/components/header/Header";
import Collection from "@/app/components/sections/Collection";
import Footer from "@/app/components/sections/Footer";
import Hero from "@/app/components/sections/Hero";
import Products from "@/app/components/sections/Products";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useEffect, useRef } from "react";


const App = () => {
  const collectionRef = useRef<HTMLDivElement>(null);
  const productsRef =useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const { hash } = window.location;

    if (hash === '#collection') {
      if (collectionRef.current) {
        const elementPosition = collectionRef.current.offsetTop;
        const offsetPosition =  isMobile ? elementPosition - 100 : elementPosition;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else if (hash === '#products') {
      if (productsRef.current) {
        const elementPosition = productsRef.current.offsetTop;
        const offsetPosition =  isMobile ? elementPosition - 100 : elementPosition;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else if (hash === '#about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isMobile]);


  return (
    <div className="min-h-screen">
      <title>I ❤️ Ngọc Ánh</title>
      <Header hasSections collectionRef={collectionRef} productsRef={productsRef} aboutRef={aboutRef} />
      <Hero />
      <Collection collectionRef={collectionRef} />
      <Products productsRef={productsRef} />
      <Footer aboutRef={aboutRef} />
    </div>
  );
};

export default App;