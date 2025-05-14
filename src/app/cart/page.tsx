"use client";

import React, { Suspense, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeftLong, FaTrashCan } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "../storage";
import { CartItem, Product } from "../types";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Separator } from "../ui/separator";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
});

const CartPage = () => {
  const router = useRouter();
  const aboutRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Bình hoa 35 cm - Xuân Ca",
      pattern: "Xuân Ca",
      slug: "binh-hoa-35-cm-xuan-ca",
      price: 7560000,
      image: products[0].images[0],
      quantity: 1
    },
    {
      id: 2,
      name: "Bình hoa 35 cm - Se Sẻ Và Bông Hoa",
      pattern: "Se Sẻ Và Bông Hoa",
      slug: "binh-hoa-35-cm-se-se-va-bong-hoa",
      price: 8424000,
      image: products[1].images[0],
      quantity: 1
    }
  ]);
  const [notes, setNotes] = useState("");
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (invoiceOpen && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [invoiceOpen]);

  const handleQuantityChange = (type: "increment" | "decrement" | "set", product: Product, value?: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== product.id) {
          return item;
        }
        let newQuantity = item.quantity;
  
        if (type === "increment" && product.quantity) {
          newQuantity = Math.min(item.quantity + 1, product.quantity);
        } else if (type === "decrement") {
          newQuantity = Math.max(item.quantity - 1, 1);
        } else if (type === "set" && typeof value === "number" && product.quantity) {
          newQuantity = Math.min(Math.max(value, 1), product.quantity);
        }
  
        return {
          ...item,
          quantity: newQuantity,
        };
      })
    );
  };

  const handleRemove = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <title>Giỏ hàng của bạn</title>
      <Header hasFooter aboutRef={aboutRef} /> 
      <div className="mt-16 max-w-7xl mx-auto p-4 lg:flex gap-10">
        {/* Left Column */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">THÔNG TIN ĐƠN HÀNG</h2>
          <Separator color="#BB9244" opacity={40} />
          <div className="bg-gray-50 rounded-lg my-2">
            <div className="font-semibold text-sm p-4 my-4 bg-orange-50 rounded tracking-wide">SẢN PHẨM BÁN LẺ</div>
            <div className="mt-8 space-y-6">
              {cartItems.map((item) => {
                const product = products.find((product) => product.id === item.id);
                return (
                  <div key={item.slug} className="flex flex-col md:flex-row items-center gap-4 pb-4">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={96}
                      height={96}
                      className="w-24 h-24 object-contain" 
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-base text-gray-500">{item.pattern} / 35 cm</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => item.quantity > 1 && product && handleQuantityChange("decrement", product)}
                        className={`w-10 h-10 flex items-center justify-center rounded-tl-lg rounded-bl-lg transition ${
                          item.quantity > 1
                            ? "cursor-pointer hover:bg-gray-200"
                            : "cursor-default text-gray-400"
                        }`}
                      >
                        <FiMinus />
                      </button>
                      <Input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (isNaN(value) && product) {
                            handleQuantityChange("set", product, 1);
                          } else {
                            if (product) {
                              const clamped = Math.min(Math.max(value, 1), 99);
                              handleQuantityChange("set", product, clamped);
                            }
                          }
                        }}
                        onBlur={() => {
                          if (item.quantity < 1 && product) {
                            handleQuantityChange("set", product, 1);
                          }
                        }}
                        min={1}
                        className={`w-12 text-center rounded-none border-none shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1),-2px_0_4px_-1px_rgba(0,0,0,0.1)] text-sm font-medium tracking-wider input-no-spinner ${montserrat.className}`}
                      />
                      <button
                        onClick={() => product && handleQuantityChange("increment", product)}
                        className={`w-10 h-10 flex items-center justify-center rounded-tr-lg rounded-br-lg transition ${
                          product?.quantity && item.quantity < product.quantity
                            ? "cursor-pointer hover:bg-gray-200"
                            : "cursor-default text-gray-400"
                        }`}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className={`mx-2 w-32 text-right text-lg font-semibold tracking-wider text-[#0C2543] ${montserrat.className}`}>
                      {(item.price * item.quantity).toLocaleString()}₫
                    </div>
                    <button
                      title="Xóa khỏi giỏ hàng"
                      onClick={() => handleRemove(item.id)}
                      className="text-neutral-400 hover:text-rose-500 cursor-pointer"
                    >
                      <FaTrashCan size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <Separator color="#BB9244" opacity={30} />

          <div className="mt-6 p-4 bg-orange-50">
            <h3 className="font-semibold mb-3 text-lg">Ghi chú đơn hàng</h3>
            <Textarea
              className={`w-full p-3 mb-2 border border-neutral-300 rounded-md font-medium ${montserrat.className}`}
              rows={5}
              placeholder="Ghi chú..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
            <div className={`mx-2 mt-8 mb-16 flex items-center gap-3`}>
              <div className="flex flex-col gap-y-4 w-full">
                <div className="flex items-center flex-row gap-3">
                  <Input
                    type="checkbox"
                    id="invoice"
                    checked={invoiceOpen}
                    onChange={() => setInvoiceOpen(!invoiceOpen)}
                    className="h-4 w-4 cursor-pointer"
                    />
                  <label htmlFor="invoice" className={`text-base font-medium ${montserrat.className}`}>Xuất hoá đơn cho đơn hàng</label>
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
                          className={`w-full bg-neutral-100 border border-gray-300 focus:border-black rounded tracking-wide ${montserrat.className}`}
                        />
                        <div className="flex flex-row gap-x-2">
                          <Input
                            type="text"
                            placeholder="Email"
                            className={`w-[70%] bg-neutral-100 border border-gray-300 focus:border-black rounded tracking-wide ${montserrat.className}`}
                          />
                          <Input
                            type="text"
                            placeholder="Mã số thuế"
                            className={`w-[30%] bg-neutral-100 border border-gray-300 focus:border-black rounded tracking-wide ${montserrat.className}`}
                          />
                        </div>
                        <Input
                          type="text"
                          placeholder="Địa chỉ công ty"
                          className={`w-full bg-neutral-100 border border-gray-300 focus:border-black rounded tracking-wide ${montserrat.className}`}
                        />
                        <button className="w-fit mt-4 bg-[#BB9244] hover:bg-[#BB9244]/80 cursor-pointer text-white px-6 py-3 rounded-full font-semibold select-none">
                          Lưu thông tin
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/3 mt-8">
          <div className="p-6 space-y-4">
            <Separator color="#BB9244" opacity={40} />
            <div className={`flex justify-between ${montserrat.className}`}>
              <span className="text-base tracking-wide text-gray-500 font-medium">Tạm tính</span>
              <span className="text-base tracking-wider text-gray-500 font-semibold">{totalPrice.toLocaleString()}₫</span>
            </div>
            <Separator color="#BB9244" opacity={40} />
            <div className={`flex justify-between font-bold pt-2 ${montserrat.className}`}>
              <span className="text-lg tracking-wide">TỔNG CỘNG</span>
              <span className="text-lg tracking-wider">{totalPrice.toLocaleString()}₫</span>
            </div>
            
            <button className="w-full mt-6 bg-[#BB9244] hover:bg-[#BB9244]/80 cursor-pointer text-white py-3 rounded-full font-semibold select-none">
              Thanh toán
            </button>
            <button
              onClick={() => router.push('/#products')}
              className="w-full text-center font-semibold text-[#BB9244] hover:border hover:border-[#BB9244] hover:bg-[#BB9244]/20 cursor-pointer py-3 flex flex-row gap-3 items-center justify-center rounded-full select-none"
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