"use client";

import React, { Suspense, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartDetails from "../components/CartDetails";
import CartSummary from "../components/CartSummary";


const CartPage = () => {
  const router = useRouter();
  const aboutRef = useRef(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [notes, setNotes] = useState("");
  
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <title>Giỏ hàng của bạn</title>
      <Header hasFooter aboutRef={aboutRef} /> 
      <div className="mt-4 md:mt-16 max-w-[1400px] mx-auto py-4 px-3 md:p-4 flex flex-col md:flex-row gap-4 md:gap-6">
        <CartDetails 
          invoiceOpen={invoiceOpen} 
          setInvoiceOpen={setInvoiceOpen} 
          notes={notes}
          setNotes={setNotes}
        />
        <CartSummary router={router} />
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
};

export default CartPage;