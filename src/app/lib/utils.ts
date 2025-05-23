import { clsx, type ClassValue } from "clsx";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { products } from "../storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RawCartItem } from "../types";
import { RefObject } from "react";
import useIsMobile from "../hooks/useIsMobile";


export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const sanitizeInput = (input: string, maxLength = 255): string => {
  // Remove potentially dangerous characters (like script tags)
  input = input
    .replace(/<[^>]*>?/gm, "")
    .replace(/[\u0000-\u001F\u007F]/g, "");


  // Remove emojis and kaomojis using supported Unicode ranges
  const emojiRegex = /(?:\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\d\uFE0F\u20E3)/gu;
  const kaomojiRegex =
  /(?:\([^\w\s]{1,20}\)|[^\x00-\x7F]{2,}|[☆★♥♡♪♫‼‼️]+|[oO0]?[^\w\s]{2,}[oO0]?)/g;
  input = input.replace(emojiRegex, '');
  input = input.replace(kaomojiRegex, '');

  // Limit to max length
  if (input.length > maxLength) {
    input = input.slice(0, maxLength);
  }

  return input;
}

export const sanitizeInputOnBlur = (input: string): string => {
  return input.trim().replace(/\s+/g, " ");
};

export const formatDuration = (duration: number) => {
  const seconds = Math.floor((duration % 60000) / 1000);
  const minutes = Math.floor(duration / 60000);
  const hours = Math.floor(minutes / 60);
  return hours >= 1 
    ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const normalizeText = (str: string, forSlug: boolean = false) => {
  let normalized = str
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

  if (forSlug) {
    return normalized
      .replace(/[^a-zA-Z0-9]+/g, "-") 
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  } else {
    return normalized
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .replace(/\s+/g, " ") 
      .trim();
  }
};

export const formatText = (text: string) => {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*([+-])\s*/g, ' $1 ');
};

export const validateEmail = (value: string) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value);
};

export const testPhone = (value: string) => {
  const phoneRegex = /^0\d{9,10}$/;
  return phoneRegex.test(value);
};

export const handleSearch = (query: string, router: AppRouterInstance) => {
  const trimmed = query.trim();
  if (!trimmed) {
    return;
  }

  const formattedQuery = formatText(trimmed);
  const normalizedQuery = normalizeText(formattedQuery);
  const queryWords = normalizedQuery.split(" ");
  const encoded = encodeURIComponent(formattedQuery);

  const exactMatch = products.find(product =>
    queryWords.every(word => normalizeText(product.name).includes(word))
  );

  if (!exactMatch) {
    let bestMatch: typeof products[number] | null = null;
    let maxScore = 0;

    for (const product of products) {
      const normalizedName = normalizeText(product.name);
      const score = queryWords.filter(word => normalizedName.includes(word)).length;

      if (score > maxScore) {
        maxScore = score;
        bestMatch = product;
      }
    }
  }
  router.push(`/search?query=${encoded}`);
};

export const getLocalCart = (): RawCartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const animateAddToCart = (
  imageRef: RefObject<HTMLDivElement | null>,
  cartIconRef: RefObject<HTMLDivElement | null>,
  isMobile: boolean = false
) => {
  if (!cartIconRef.current || !imageRef.current) {
    return;
  }

  let actualImageElement: HTMLImageElement | null = null;
  const imgElement = imageRef.current.querySelector("img");
  if (imgElement) {
    actualImageElement = imgElement as HTMLImageElement;
  }

  if (!actualImageElement) {
    return;
  }

  const sourceRect = imageRef.current.getBoundingClientRect();
  const targetRect = cartIconRef.current.getBoundingClientRect();

  // Calculate the final position for phase 1 (where the circle will be)
  const startX = isMobile ? window.innerWidth * 0.5 : sourceRect.left + sourceRect.width / 2;
  const startY = window.innerHeight * 0.4;
  const fallbackSize = Math.min(sourceRect.width, sourceRect.height, 200);

  const adjustedSourceRect = {
    left: startX - fallbackSize / 2,
    top: startY - fallbackSize / 2,
    right: startX + fallbackSize / 2,
    bottom: startY + fallbackSize / 2,
    width: fallbackSize,
    height: fallbackSize,
    x: startX - fallbackSize / 2,
    y: startY - fallbackSize / 2,
    toJSON: () => ({})
  } as DOMRect;

  // Calculate circle position for phase 1
  const circleSize = 120;
  const centerX = adjustedSourceRect.left + adjustedSourceRect.width / 2;
  const centerY = adjustedSourceRect.top + adjustedSourceRect.height / 2;

  const clone = document.createElement("img");
  clone.src = actualImageElement.src;
  clone.alt = "Product";
  clone.style.position = "fixed";
  clone.style.width = `${sourceRect.width}px`;
  clone.style.height = `${sourceRect.height}px`;
  clone.style.objectFit = "cover";
  clone.style.borderRadius = "0%";
  clone.style.zIndex = "9999";
  clone.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.15)";
  clone.style.border = "0px solid white";
  clone.style.backgroundColor = "white";
  clone.style.pointerEvents = "none";
  clone.style.filter = "brightness(1.05) saturate(1.1)";
  clone.style.willChange = "transform, left, top, width, height, opacity";
  clone.style.backfaceVisibility = "hidden";
  
  // Position the clone at the center of where it will end up in phase 1
  clone.style.left = `${centerX - sourceRect.width / 2}px`;
  clone.style.top = `${centerY - sourceRect.height / 2}px`;
  clone.style.opacity = "0";

  document.body.appendChild(clone);
  clone.getBoundingClientRect();

  // Set up transition for phase 1 (including opacity)
  clone.style.transition =
    "width 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), height 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-radius 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), left 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), top 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  setTimeout(() => {
    // Phase 1: Fade in and transform to circle at the same position
    clone.style.opacity = "1"; // Fade in
    clone.style.width = `${circleSize}px`;
    clone.style.height = `${circleSize}px`;
    clone.style.borderRadius = "50%";
    clone.style.left = `${centerX - circleSize / 2}px`;
    clone.style.top = `${centerY - circleSize / 2}px`;
    clone.style.border = "3px solid rgba(255, 255, 255, 0.9)";
    clone.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
  }, 10);

  const finalSize = 40;
  const targetX = targetRect.left + targetRect.width / 2 - finalSize / 2;
  const targetY = targetRect.top + targetRect.height / 2 - finalSize / 2;

  setTimeout(() => {
    // Phase 2: Animate to cart icon
    clone.style.transition = "";

    let startTime: number | null = null;
    const duration = 1000;
    const startSize = circleSize;
    const endSize = finalSize;

    const startPointX = centerX - startSize / 2;
    const startPointY = centerY - startSize / 2;
    
    const horizontalDistance = targetX - startPointX;
    const verticalDistance = targetY - startPointY;
    const totalDistance = Math.sqrt(horizontalDistance * horizontalDistance + verticalDistance * verticalDistance);
    
    // Optimized curve for natural arc trajectory
    const arcHeight = Math.min(totalDistance * 0.25, 100);
    const midPointX = startPointX + horizontalDistance * 0.5;
    const midPointY = Math.min(startPointY, targetY) - arcHeight;

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth quadratic bezier curve
      const t = progress;
      const oneMinusT = 1 - t;
      
      const xPos = oneMinusT * oneMinusT * startPointX + 
                    2 * oneMinusT * t * midPointX + 
                    t * t * targetX;
      
      const yPos = oneMinusT * oneMinusT * startPointY + 
                    2 * oneMinusT * t * midPointY + 
                    t * t * targetY;

      // Gradual size reduction with easing
      const sizeProgress = 1 - Math.pow(1 - progress, 2);
      const currentSize = startSize - (startSize - endSize) * sizeProgress;

      // Subtle bounce without rotation
      const bounceScale = 1 + Math.sin(progress * Math.PI) * 0.05 * (1 - progress);

      clone.style.width = `${currentSize}px`;
      clone.style.height = `${currentSize}px`;
      clone.style.left = `${xPos}px`;
      clone.style.top = `${yPos}px`;
      clone.style.transform = `scale(${bounceScale})`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        clone.style.transform = "scale(0)";
        clone.style.transition = "transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 300ms ease";
        clone.style.opacity = "0";

        setTimeout(() => {
          if (clone.parentNode) {
            clone.parentNode.removeChild(clone);
          }
        }, 300);

        if (cartIconRef.current) {
          cartIconRef.current.style.transform = "scale(1.3)";
          cartIconRef.current.style.transition = "transform 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

          setTimeout(() => {
            if (cartIconRef.current) {
              cartIconRef.current.style.transform = "scale(1)";
            }
          }, 250);
        }
      }
    };

    requestAnimationFrame(animate);
  }, 500);
};