"use client";

import React, { useRef, useEffect } from "react";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Collection from "./components/Collection";
import Hero from "./components/Hero";
import Header from "./components/Header";
import useIsMobile from "./hooks/useIsMobile";


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