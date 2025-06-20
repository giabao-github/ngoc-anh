import { useLayoutEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa6";

import CartSkeleton from "@/components/cart/CartSkeleton";
import ConfirmDialog from "@/components/cart/ConfirmDialog";
import EmptyCart from "@/components/cart/EmptyCart";
import InvoiceSection from "@/components/cart/InvoiceSection";
import OrderNotes from "@/components/cart/OrderNotes";
import ProductList from "@/components/cart/ProductList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCart } from "@/hooks/useCart";
import useIsMobile from "@/hooks/useIsMobile";

interface CartDetailsProps {
  invoiceOpen: boolean;
  setInvoiceOpen: (open: boolean) => void;
  notes: string;
  setNotes: (notes: string) => void;
}

const CartDetailsHeader = () => {
  return (
    <>
      <h2 className="mx-2 mb-2 text-lg font-bold md:text-xl">
        THÔNG TIN ĐƠN HÀNG
      </h2>
      <Separator color="#BB9244" opacity={40} />
    </>
  );
};

const CartDetails: React.FC<CartDetailsProps> = ({
  invoiceOpen,
  setInvoiceOpen,
  notes,
  setNotes,
}) => {
  const { clearCart, cartItems, totalCount } = useCart();
  const contentRef = useRef<HTMLFormElement>(null);
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showConfirmDialog]);

  if (!cartItems) {
    return (
      <div className="flex-1 max-w-[920px]">
        <CartDetailsHeader />
        <div className="my-2 rounded-lg">
          <div className="p-3 mx-2 mb-5 text-sm font-semibold bg-orange-50 rounded md:text-base md:p-4 md:mt-5 md:mb-7">
            SẢN PHẨM BÁN LẺ
          </div>
          <div className="px-8 skeleton-desktop">
            <CartSkeleton skeletonCount={4} />
          </div>
          <div className="px-3 skeleton-mobile">
            <CartSkeleton skeletonCount={3} isMobile />
          </div>
        </div>
        <Separator
          color="#BB9244"
          opacity={30}
          className="mt-8 mb-8 md:mb-16"
        />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 max-w-[920px]">
        <CartDetailsHeader />
        <EmptyCart />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 max-w-[920px]">
        <CartDetailsHeader />
        <div className="my-2 rounded-lg">
          <div className="p-3 mx-2 mb-5 text-sm font-semibold bg-orange-50 rounded md:text-base md:p-4 md:mt-5 md:mb-7">
            SẢN PHẨM BÁN LẺ
          </div>
          <ProductList cartItems={sortedCartItems} isMobile={isMobile} />
          <Button
            onClick={handleClearCartClick}
            className="py-4 mx-4 mt-6 space-x-1 text-rose-500 bg-white border border-rose-500 md:mt-8 md:mx-8 md:py-5 hover:bg-rose-500 hover:text-white active:bg-rose-400 active:text-white"
          >
            <FaTrash size={isMobile ? 16 : 20} />
            <span className="text-sm tracking-tight font-bold md:text-base">
              Xóa tất cả sản phẩm
            </span>
          </Button>
        </div>
        <Separator
          color="#BB9244"
          opacity={30}
          className="mt-6 mb-8 md:mt-8 md:mb-12"
        />
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
