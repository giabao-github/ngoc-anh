import { useLayoutEffect, useRef, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { useCart } from "../hooks/useCart";
import CartSkeleton from "./CartSkeleton";
import { Separator } from "../ui/separator";
import ProductList from "./ProductList";
import OrderNotes from "./OrderNotes";
import InvoiceSection from "./InvoiceSection";
import EmptyCart from "./EmptyCart";


interface CartDetailsProps {
  invoiceOpen: boolean;
  setInvoiceOpen: (open: boolean) => void;
  notes: string;
  setNotes: (notes: string) => void;
};

const CartDetails: React.FC<CartDetailsProps> = ({ invoiceOpen, setInvoiceOpen, notes, setNotes }) => {
  const { cartItems, handleRemove, handleQuantityChange } = useCart();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const isMobile = useIsMobile();
  const sortedCartItems = cartItems ? [...cartItems].reverse() : [];

  useLayoutEffect(() => {
    if (invoiceOpen && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [invoiceOpen]);

  if (!cartItems) {
    return (
      <div className="flex-1 max-w-[920px]">
        <h2 className="text-lg md:text-xl font-bold mb-2 mx-2">THÔNG TIN ĐƠN HÀNG</h2>
        <Separator color="#BB9244" opacity={40} />
        <div className="bg-gray-50 rounded-lg my-2">
          <div className="font-semibold text-sm md:text-base p-3 md:p-4 md:mt-5 mx-2 bg-orange-50 rounded tracking-wide">
            SẢN PHẨM BÁN LẺ
          </div>
          <CartSkeleton />
        </div>
        <Separator color="#BB9244" opacity={30} className="mt-8 mb-8 md:mb-16" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 max-w-[920px]">
        <h2 className="text-lg md:text-xl font-bold mb-2 mx-2">THÔNG TIN ĐƠN HÀNG</h2>
        <Separator color="#BB9244" opacity={40} />
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-[920px]">
      <h2 className="text-lg md:text-xl font-bold mb-2 mx-2">THÔNG TIN ĐƠN HÀNG</h2>
      <Separator color="#BB9244" opacity={40} />
      <div className="rounded-lg my-2">
        <div className="font-semibold text-sm md:text-base p-3 md:p-4 md:mt-5 mx-2 bg-orange-50 rounded tracking-wide">
          SẢN PHẨM BÁN LẺ
        </div>
        <ProductList 
          cartItems={sortedCartItems} 
          handleRemove={handleRemove} 
          handleQuantityChange={handleQuantityChange} 
          isMobile={isMobile} 
        />
      </div>
      <Separator color="#BB9244" opacity={30} className="mt-8 mb-8 md:mb-16" />
      <OrderNotes notes={notes} setNotes={setNotes} />
      <InvoiceSection 
        invoiceOpen={invoiceOpen} 
        setInvoiceOpen={setInvoiceOpen} 
        contentRef={contentRef}
        contentHeight={contentHeight}
      />
    </div>
  );
};

export default CartDetails;