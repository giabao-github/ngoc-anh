import { useLayoutEffect, useMemo, useRef, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { useCart } from "../hooks/useCart";
import CartSkeleton from "./CartSkeleton";
import { Separator } from "../ui/separator";
import ProductList from "./ProductList";
import OrderNotes from "./OrderNotes";
import InvoiceSection from "./InvoiceSection";
import EmptyCart from "./EmptyCart";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa6";
import ConfirmDialog from "./ConfirmDialog";


interface CartDetailsProps {
  invoiceOpen: boolean;
  setInvoiceOpen: (open: boolean) => void;
  notes: string;
  setNotes: (notes: string) => void;
};

const CartDetails: React.FC<CartDetailsProps> = ({ invoiceOpen, setInvoiceOpen, notes, setNotes }) => {
  const { clearCart, cartItems, totalCount } = useCart();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const isMobile = useIsMobile();
  const sortedCartItems = cartItems ? [...cartItems].reverse() : [];

  useLayoutEffect(() => {
    if (invoiceOpen && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [invoiceOpen]);

  const handleClearCartClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmClear = () => {
    clearCart();
    setShowConfirmDialog(false);
  };

  const handleCancelClear = () => {
    setShowConfirmDialog(false);
  };

  useLayoutEffect(() => {
    if (showConfirmDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showConfirmDialog]);


  if (!cartItems) {
    return (
      <div className="flex-1 max-w-[920px]">
        <h2 className="text-lg md:text-xl font-bold mb-2 mx-2">THÔNG TIN ĐƠN HÀNG</h2>
        <Separator color="#BB9244" opacity={40} />
        <div className="bg-gray-50 rounded-lg my-2">
          <div className="font-semibold text-sm md:text-base p-3 md:p-4 md:mt-5 mx-2 bg-orange-50 rounded tracking-wide">
            SẢN PHẨM BÁN LẺ
          </div>
          <CartSkeleton skeletonCount={4} />
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
    <>
      <div className="flex-1 max-w-[920px]">
        <h2 className="text-lg md:text-xl font-bold mb-2 mx-2">THÔNG TIN ĐƠN HÀNG</h2>
        <Separator color="#BB9244" opacity={40} />
        <div className="rounded-lg my-2">
          <div className="font-semibold text-sm md:text-base p-3 md:p-4 md:mt-5 mx-2 bg-orange-50 rounded tracking-wide">
            SẢN PHẨM BÁN LẺ
          </div>
          <ProductList 
            cartItems={sortedCartItems} 
            isMobile={isMobile} 
          />
          <Button 
            onClick={handleClearCartClick}
            className="mt-4 md:mt-2 mx-4 md:mx-8 py-4 md:py-5 space-x-1 bg-white border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white active:bg-rose-400 active:text-white">
            <FaTrash size={isMobile ? 16 : 20} />
            <span className="font-semibold text-sm md:text-base tracking-wide">
              Xóa tất cả sản phẩm
            </span>
          </Button>
        </div>
        <Separator color="#BB9244" opacity={30} className="mt-6 md:mt-8 mb-8 md:mb-16" />
        <OrderNotes notes={notes} setNotes={setNotes} />
        <InvoiceSection 
          invoiceOpen={invoiceOpen} 
          setInvoiceOpen={setInvoiceOpen} 
          contentRef={contentRef}
          contentHeight={contentHeight}
        />
      </div>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={handleCancelClear}
        onConfirm={handleConfirmClear}
        itemCount={totalCount}
        isMobile={isMobile}
      />
    </>
  );
};

export default CartDetails;