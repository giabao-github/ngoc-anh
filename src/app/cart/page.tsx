"use client";

import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "../storage";
import { CartItem, Product } from "../types";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Montserrat } from "next/font/google";
import EmptyCart from "../components/EmptyCart";
import CartProduct from "../components/CartProduct";
import { getLocalCart } from "../lib/utils";
import CartSkeleton from "../components/CartSkeleton";
import { useCart } from "../CartContext";


const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
});

const CartPage = () => {
  const router = useRouter();
  const aboutRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notes, setNotes] = useState("");
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (invoiceOpen && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [invoiceOpen]);

  useEffect(() => {
    const syncCartWithProducts = async () => {
      const localCart = getLocalCart();
      
      const merged = localCart
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          if (!product) {
            return null;
          } 
          return { 
            id: product.id,
            name: product.name,
            pattern: product.patterns[0].name,
            slug: product.patterns[0].slug,
            price: product.patterns[0].price,
            image: product.images[0],
            quantity: item.quantity,
            maxQuantity: product.quantity,
            size: product.size,
            volume: product.volume,
          };
        })
        .filter(Boolean)
        .map(product => ({
          id: product?.id,
          name: product?.name,
          pattern: product?.pattern,
          slug: product?.slug,
          price: product?.price,
          image: product?.image,
          quantity: product?.quantity
        }));
        setCartItems(merged as CartItem[]);
    };
  
    syncCartWithProducts();
  }, []);


  const handleQuantityChange = (
    type: "increment" | "decrement" | "set",
    product: Product,
    value?: number
  ) => {
    setCartItems((prev) => {
      const updated = prev.map((item) => {
        if (item.id === product.id && item.pattern === product.patterns[0].name) {
          let newQty = item.quantity;
  
          if (type === "increment" && product.quantity) {
            newQty = Math.min(item.quantity + 1, product.quantity);
          }
          else if (type === "decrement") {
            newQty = Math.max(item.quantity - 1, 1);
          }
          else if (type === "set" && value !== undefined && product.quantity) {
            newQty = Math.min(Math.max(value, 1), product.quantity);
          }
          return { ...item, quantity: newQty };
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updated));

      return updated;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };  

  const { updateCartCount } = useCart();

  const handleRemove = (id: number) => {
    const updated = cartItems.filter(item => item.id !== id);
  
    if (updated.length === 0) {
      clearCart();
    } else {
      localStorage.setItem("cart", JSON.stringify(updated));
      setCartItems(updated);
    }
  
    updateCartCount();  
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <title>Giỏ hàng của bạn</title>
      <Header hasFooter aboutRef={aboutRef} /> 
      <div className="mt-4 md:mt-16 max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4 md:gap-10">
        {/* Left Column */}
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-bold mb-2">THÔNG TIN ĐƠN HÀNG</h2>
          <Separator color="#BB9244" opacity={40} />
          {cartItems.length > 0 ? (
            <>
              <div className="bg-gray-50 rounded-lg my-2">
                <div className="font-semibold text-sm md:text-base p-3 md:p-4 md:my-4 bg-orange-50 rounded tracking-wide">SẢN PHẨM BÁN LẺ</div>
                <div className="mt-0 md:mt-8 space-y-2 md:space-y-6">
                  {cartItems.map((item, index) => {
                    const product = products.find((product) => product.id === item.id);
                    if (!product) {
                      return null;
                    }
                    
                    return (
                      <CartProduct
                        key={item.slug}
                        item={item}
                        index={index}
                        product={product}
                        handleRemove={handleRemove}
                        handleQuantityChange={handleQuantityChange}
                      />
                    );
                  })}
                </div>
              </div>
              <Separator color="#BB9244" opacity={30} />
              <div className="mt-6 p-4 bg-orange-50">
                <h3 className="font-semibold mb-3 md:text-lg">Ghi chú đơn hàng</h3>
                <Textarea
                  className={`w-full text-sm placeholder:text-sm md:text-base md:placeholder:text-base p-3 mb-2 border border-neutral-300 rounded-md font-medium ${montserrat.className}`}
                  rows={5}
                  placeholder="Ghi chú..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className={`mx-2 mt-8 md:mb-16 flex items-center gap-3`}>
                <div className="flex flex-col gap-y-4 w-full">
                  <div className="flex items-center flex-row gap-3">
                    <Input
                      type="checkbox"
                      id="invoice"
                      checked={invoiceOpen}
                      onChange={() => setInvoiceOpen(!invoiceOpen)}
                      className="h-4 w-4 cursor-pointer"
                      />
                    <label htmlFor="invoice" className={`text-sm md:text-base font-medium ${montserrat.className}`}>Xuất hoá đơn cho đơn hàng</label>
                  </div>
                  <AnimatePresence initial={false}>
                    {invoiceOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: contentHeight || "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div ref={contentRef} className="flex flex-col gap-y-2 font-medium">
                          <Input
                            type="text"
                            placeholder="Tên công ty"
                            className={`w-full text-sm md:text-base bg-neutral-100 border border-gray-300 focus:border-black rounded md:tracking-wide ${montserrat.className}`}
                          />
                          <div className="flex flex-row gap-x-2">
                            <Input
                              type="text"
                              placeholder="Email"
                              className={`w-[70%] text-sm md:text-base bg-neutral-100 border border-gray-300 focus:border-black rounded md:tracking-wide ${montserrat.className}`}
                            />
                            <Input
                              type="text"
                              placeholder="Mã số thuế"
                              className={`w-1/3 md:w-[30%] text-sm md:text-base bg-neutral-100 border border-gray-300 focus:border-black rounded md:tracking-wide ${montserrat.className}`}
                            />
                          </div>
                          <Input
                            type="text"
                            placeholder="Địa chỉ công ty"
                            className={`w-full text-sm md:text-base bg-neutral-100 border border-gray-300 focus:border-black rounded md:tracking-wide ${montserrat.className}`}
                          />
                          <button className="w-fit mt-4 bg-[#BB9244] hover:bg-[#BB9244]/80 cursor-pointer text-white px-6 py-3 rounded-full font-semibold select-none tracking-wide">
                            Lưu thông tin
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </>
          ) : cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <CartSkeleton />
          )}
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3 md:mt-8">
          <div className="p-6 space-y-4">
            <Separator color="#BB9244" opacity={40} />
            <div className={`flex justify-between ${montserrat.className}`}>
              <span className="text-sm md:text-base tracking-wide text-gray-500 font-medium">Tạm tính</span>
              <span className="text-sm md:text-base tracking-wider text-gray-500 font-semibold">{totalPrice.toLocaleString()}₫</span>
            </div>
            <Separator color="#BB9244" opacity={40} />
            <div className={`flex justify-between font-bold pt-2 ${montserrat.className}`}>
              <span className="text-base md:text-lg tracking-wide">TỔNG CỘNG</span>
              <span className="text-base md:text-lg tracking-wider">{totalPrice.toLocaleString()}₫</span>
            </div>
            
            <button className="w-full mt-6 bg-[#BB9244] hover:bg-[#BB9244]/80 cursor-pointer text-white py-3 rounded-full font-semibold select-none tracking-wide">
              Thanh toán
            </button>
            <button
              onClick={() => router.push('/#products')}
              className="w-full text-center font-semibold text-[#BB9244] hover:border hover:border-[#BB9244] hover:bg-[#BB9244]/20 cursor-pointer py-3 flex flex-row gap-3 items-center justify-center rounded-full select-none tracking-wide"
            >
              <FaArrowLeftLong size={18} />
              Mua thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
}

export default CartPage;