"use client";

import CartDetails from "@/app/components/cart/CartDetails";
import CartSummary from "@/app/components/cart/CartSummary";
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/sections/Footer";
import SkeletonLoader from "@/app/components/user/SkeletonLoader";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";


const CartPage = () => {
  const router = useRouter();
  const aboutRef = useRef(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


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
        <CartSummary />
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
};

export default CartPage;