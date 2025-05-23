"use client";

import AddToCartPopup from "@/app/components/AddToCartPopup";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ProductDetails from "@/app/components/ProductDetails";
import ProductError from "@/app/components/ProductError";
import ProductImages from "@/app/components/ProductImages";
import ProductInfo from "@/app/components/ProductInfo";
import PurchaseSection from "@/app/components/PurchaseSection";
import RatingSection from "@/app/components/RatingSection";
import SkeletonLoader from "@/app/components/SkeletonLoader";
import { useCart } from "@/app/hooks/useCart";
import useIsMobile from "@/app/hooks/useIsMobile";
import { animateAddToCart } from "@/app/lib/utils";
import { products } from "@/app/storage";
import { CartItem } from "@/app/types";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";


export const dynamic = "force-dynamic";

const ProductPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const product = useMemo(() => {
    return products.find((item) => item.details[0].slug === slug);
  }, [slug]);
  const [selectedPattern, setSelectedPattern] = useState(product?.details[0].pattern || "Không tìm thấy hoa văn");
  const [quantity, setQuantity] = useState(1);
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
  const [notificationFlag, setNotificationFlag] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cartIconRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const { cartItems, updateCartCount } = useCart();
  const cartQuantity = useMemo(() => {
    if (!product || !cartItems) {
      return 0;
    }
    const cartItem = cartItems.find(item => 
      item.id === product.id && item.name === product.name
    );
    return cartItem?.quantity || 0;
  }, [product, cartItems]);

  const handleAddToCart = () => {
    animateAddToCart(imageRef, cartIconRef, isMobile); 
  
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowNotification(false);
      timeoutRef.current = null;
    }, 3000);

    if (product) {
      const itemToAdd: CartItem = {
        id: product.id,
        name: product.name,
        image: product.images[0],
        pattern: product.details[0].pattern,
        size: product.size,
        volume: product.volume,
        slug: product.details[0].slug,
        price: product.details[0].price,
        quantity,
      };
      
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      
      const existingIndex = existingCart.findIndex(
        (item: CartItem) => item.id === itemToAdd.id && item.name === itemToAdd.name
      );
      
      // Notification
      setNotificationFlag(existingIndex !== -1 ? "update" : "add");
      setShowNotification(true);
    
      setTimeout(() => {
        if (existingIndex !== -1) {
          existingCart[existingIndex].quantity = Math.min(
            existingCart[existingIndex].quantity + quantity,
            product.quantity ?? 1
          );
        } else {
          existingCart.push(itemToAdd);
        }
  
        localStorage.setItem("cart", JSON.stringify(existingCart));
        updateCartCount();
      }, 1600);
    }
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
      setSelectedPattern(product.details[0].pattern);
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
    if (product && quantity >= product.quantity) {
      toast.warning("Đã đạt số lượng mua tối đa cho sản phẩm này");
    }
  }, [product, quantity]);

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
      <Header hasFooter aboutRef={aboutRef} cartIconRef={cartIconRef} />
      <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
        <AddToCartPopup 
          show={showNotification}
          flag={notificationFlag}
          product={product}
          quantity={quantity}
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
            imageRef={imageRef}
            setCurrentIndex={setCurrentImageIndex}
          />

          {/* Product information and Purchase section */}
          <div className="space-y-4 md:space-y-6 mx-1 md:mx-0">
            <ProductInfo
              product={product}
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