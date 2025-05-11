"use client";

import React, { useRef, useEffect } from "react";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Collection from "./components/Collection";
import Hero from "./components/Hero";
import Header from "./components/Header";


const App = () => {
  const collectionRef = useRef<HTMLDivElement>(null);
  const productsRef =useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#collection') {
      collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === '#products') {
      productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === '#about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);


  return (
    <div className="min-h-screen">
      <Header hasSections collectionRef={collectionRef} productsRef={productsRef} aboutRef={aboutRef} />
      <Hero />
      <Collection collectionRef={collectionRef} />
      <Products productsRef={productsRef} />
      <Footer aboutRef={aboutRef} />
    </div>
  );
};

export default App;