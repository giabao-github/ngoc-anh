import React, { RefObject } from "react";

import ProductError from "@/components/error/ProductError";
import AddToCartPopup from "@/components/product/AddToCartPopup";
import ProductDetails from "@/components/product/ProductDetails";
import ProductImages from "@/components/product/ProductImages";
import ProductInfo from "@/components/product/ProductInfo";
import PurchaseSection from "@/components/product/PurchaseSection";
import RatingSection from "@/components/product/RatingSection";
import Footer from "@/components/sections/footer/Footer";
import Header from "@/components/sections/header/Header";

import { ImageData, Product } from "@/types/invoice";

interface ProductViewLayoutProps {
  product: Product | undefined;
  slug: string;
  images: string[];
  imageData: ImageData[];
  ratingStats: { totalReviews: number; displayRating: string };

  // Refs
  aboutRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
  cartIconRef: RefObject<HTMLDivElement | null>;

  // State
  activeVariant: string;
  setActiveVariant: (selector: string) => void;
  activeDetailIndex: number;
  setActiveDetailIndex: (index: number) => void;
  quantity: number;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;

  // Cart state
  cartQuantity: number;
  availableQuantity: number;
  isOutOfStock: boolean;
  canDecrement: boolean;
  canIncrement: boolean;

  // Handlers
  handleQuantityChange: (
    type: "increment" | "decrement" | "set",
    value?: number,
  ) => void;
  handleAddToCart: () => void;

  // Notification
  showNotification: boolean;
  notificationFlag: string;
  handleCloseNotification: () => void;
  progress: number;
}

export const ProductViewLayout: React.FC<ProductViewLayoutProps> = ({
  product,
  slug,
  images,
  imageData,
  ratingStats,
  aboutRef,
  imageRef,
  cartIconRef,
  activeVariant,
  setActiveVariant,
  activeDetailIndex,
  setActiveDetailIndex,
  quantity,
  currentImageIndex,
  setCurrentImageIndex,
  cartQuantity,
  availableQuantity,
  isOutOfStock,
  canDecrement,
  canIncrement,
  handleQuantityChange,
  handleAddToCart,
  showNotification,
  notificationFlag,
  handleCloseNotification,
  progress,
}) => {
  if (!product) {
    return <ProductError />;
  }

  return (
    <>
      <title>{product.name}</title>

      <Header hasFooter aboutRef={aboutRef} cartIconRef={cartIconRef} />

      <div className="px-4 py-8 mx-auto max-w-7xl">
        <AddToCartPopup
          show={showNotification}
          flag={notificationFlag}
          product={product}
          quantity={quantity}
          cartQuantity={cartQuantity}
          onClose={handleCloseNotification}
          progress={progress}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12 md:mt-12">
          <ProductImages
            product={product}
            currentIndex={currentImageIndex}
            images={images}
            data={imageData}
            imageRef={imageRef}
            setCurrentIndex={setCurrentImageIndex}
          />

          <div className="mx-1 space-y-4 md:space-y-6 md:mx-0">
            <ProductInfo
              product={product}
              activeDetailIndex={activeDetailIndex}
              setActiveDetailIndex={setActiveDetailIndex}
            />
            <PurchaseSection
              product={product}
              slug={slug}
              activeVariant={activeVariant}
              activeDetailIndex={activeDetailIndex}
              quantity={quantity}
              availableQuantity={availableQuantity}
              cartQuantity={cartQuantity}
              canDecrement={canDecrement}
              canIncrement={canIncrement}
              isOutOfStock={isOutOfStock}
              setActiveVariant={setActiveVariant}
              setActiveDetailIndex={setActiveDetailIndex}
              handleQuantityChange={handleQuantityChange}
              handleAddToCart={handleAddToCart}
            />
          </div>

          <ProductDetails product={product} />

          <RatingSection
            product={product}
            displayRating={ratingStats.displayRating}
            totalReviews={ratingStats.totalReviews}
          />
        </div>
      </div>

      <Footer aboutRef={aboutRef} />
    </>
  );
};
