"use client";

import { Suspense, useEffect, useRef, useState } from "react";

import CartDetails from "@/components/cart/CartDetails";
import CartSummary from "@/components/cart/CartSummary";
import Header from "@/components/header/Header";
import Footer from "@/components/sections/Footer";

export const CartView = () => {
  const aboutRef = useRef(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="mt-4 md:mt-16 max-w-[1400px] mx-auto py-4 px-3 md:p-4 flex flex-col md:flex-row gap-20 md:gap-6">
        <CartDetails
          invoiceOpen={invoiceOpen}
          setInvoiceOpen={setInvoiceOpen}
          notes={notes}
          setNotes={setNotes}
        />
        <CartSummary />
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
};
