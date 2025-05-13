"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SkeletonLoader from "@/app/components/SkeletonLoader";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { products } from "@/app/storage";
import AddToCartPopup from "@/app/components/AddToCartPopup";
import ProductImages from "@/app/components/ProductImages";
import ProductInfo from "@/app/components/ProductInfo";
import PurchaseSection from "@/app/components/PurchaseSection";
import ProductDetails from "@/app/components/ProductDetails";
import RatingSection from "@/app/components/RatingSection";
import ProductError from "@/app/components/ProductError";


export const dynamic = "force-dynamic";

const ProductPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const product = useMemo(() => {
    return products.find((item) => item.patterns[0].slug === slug);
  }, [slug]);
  const [selectedPattern, setSelectedPattern] = useState(product?.patterns[0].name || "Không tìm thấy hoa văn");
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product?.images ?? [];

  const { totalReviews, averageRating } = useMemo(() => {
    if (!product || !product.rating?.length) {
      return { totalReviews: 0, averageRating: 0 };
    }
    const totalReviews = product.rating.reduce((sum, count) => sum + count, 0);
    const weightedSum = product.rating.reduce(
      (sum, count, index) => sum + count * (index + 1),
      0
    );
    const averageRating = totalReviews > 0
      ? parseFloat((weightedSum / totalReviews).toFixed(1))
      : 0;
    return { totalReviews, averageRating };
  }, [product]);  

  const [showNotification, setShowNotification] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => { 
    setCartQuantity(quantity);
    setShowNotification(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowNotification(false);
      timeoutRef.current = null;
    }, 5000);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleQuantityChange = (type: "increment" | "decrement" | "set", value?: number) => {
    setQuantity((prev) => {
      if (type === "increment") {
        return Math.min(prev + 1, product?.quantity ?? prev);
      } else if (type === "decrement") {
        return Math.max(prev - 1, 1);
      } else if (type === "set" && value !== undefined) {
        return Math.min(Math.max(value, 1), product?.quantity ?? 1);
      }
      return prev;
    });
  };

  const data = images.map((image, index) => ({
    value: index.toString(),
    label: product?.name,
    image: image,
  }));

  useEffect(() => {
    if (product) {
      setSelectedPattern(product.patterns[0].name);
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);


  if (!product) {
    return (
      <ProductError />
    );
  }  

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <title>{product.name}</title>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
        <AddToCartPopup 
          show={showNotification} 
          product={product}
          cartQuantity={cartQuantity} 
          onClose={handleCloseNotification}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:mt-12">
          {/* Product images */}
          <ProductImages 
            product={product}
            currentIndex={currentImageIndex}
            images={images}
            data={data}
            setCurrentIndex={setCurrentImageIndex}
          />

          {/* Product information and Purchase section */}
          <div className="space-y-4 md:space-y-6 mx-1 md:mx-0">
            <ProductInfo
              product={product}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
            <PurchaseSection
              product={product}
              slug={slug}
              selectedPattern={selectedPattern}
              quantity={quantity}
              setSelectedPattern={setSelectedPattern}
              handleQuantityChange={handleQuantityChange}
              handleAddToCart={handleAddToCart}
            />
          </div>

          {/* Product details section */}
          <ProductDetails product={product} />

          {/* Ratings section */}
          <RatingSection
            product={product}
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
        </div>
      </div>

      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
};

export default ProductPage;