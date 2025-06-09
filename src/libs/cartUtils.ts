import { RefObject } from "react";

import { RawCartItem } from "@/app/types";
import {
  CIRCLE_SIZE,
  CLEANUP_DELAY,
  EASING,
  FINAL_SIZE,
  PHASE1_DURATION,
  PHASE1_TO_PHASE2_DELAY,
  PHASE2_DURATION,
} from "@/constants/cart";

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

const getInitialCloneStyles = (
  centerX: number,
  centerY: number,
  sourceRect: DOMRect,
) => ({
  position: "fixed" as const,
  width: `${sourceRect.width}px`,
  height: `${sourceRect.height}px`,
  left: `${centerX - sourceRect.width / 2}px`,
  top: `${centerY - sourceRect.height / 2}px`,
  objectFit: "cover" as const,
  borderRadius: "0%",
  zIndex: "9999",
  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.15)",
  border: "0px solid white",
  backgroundColor: "white",
  pointerEvents: "none" as const,
  filter: "brightness(1.05) saturate(1.1)",
  willChange: "transform, left, top, width, height, opacity",
  backfaceVisibility: "hidden" as const,
  opacity: "0",
});

export const animateAddToCart = (
  imageRef: RefObject<HTMLElement | null>,
  cartIconRef: RefObject<HTMLDivElement | null>,
  isMobile: boolean = false,
) => {
  // Early validation
  if (!cartIconRef.current || !imageRef.current) {
    return;
  }

  const imgElement = imageRef.current.querySelector("img") as HTMLImageElement;
  if (!imgElement) {
    return;
  }

  // Cache DOM measurements
  const sourceRect = imageRef.current.getBoundingClientRect();
  const targetRect = cartIconRef.current.getBoundingClientRect();

  // Calculate positions
  const startX = isMobile
    ? window.innerWidth * 0.5
    : sourceRect.left + sourceRect.width / 2;
  const startY = window.innerHeight * 0.4;

  const centerX = startX;
  const centerY = startY;
  const targetX = targetRect.left + targetRect.width / 2 - FINAL_SIZE / 2;
  const targetY = targetRect.top + targetRect.height / 2 - FINAL_SIZE / 2;

  // Create and configure clone
  const clone = document.createElement("img");
  clone.src = imgElement.src;
  clone.alt = "Product";

  // Batch style assignments for better performance
  Object.assign(
    clone.style,
    getInitialCloneStyles(centerX, centerY, sourceRect),
  );

  document.body.appendChild(clone);

  // Force reflow to ensure styles are applied before animation
  clone.offsetHeight;

  // Phase 1: Transform to circle
  const animateToCircle = () => {
    const transitionProperties =
      "width, height, border-radius, left, top, border, box-shadow, opacity";
    clone.style.transition = transitionProperties
      .split(", ")
      .map((p) => `${p} ${PHASE1_DURATION}ms ${EASING}`)
      .join(", ");

    // Batch phase 1 changes
    Object.assign(clone.style, {
      opacity: "1",
      width: `${CIRCLE_SIZE}px`,
      height: `${CIRCLE_SIZE}px`,
      borderRadius: "50%",
      left: `${centerX - CIRCLE_SIZE / 2}px`,
      top: `${centerY - CIRCLE_SIZE / 2}px`,
      border: "3px solid rgba(255, 255, 255, 0.9)",
      boxShadow:
        "0 16px 32px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    });
  };

  // Phase 2: Animate to cart with optimized calculations
  const animateToCart = () => {
    clone.style.transition = "";

    const startPointX = centerX - CIRCLE_SIZE / 2;
    const startPointY = centerY - CIRCLE_SIZE / 2;
    const horizontalDistance = targetX - startPointX;
    const verticalDistance = targetY - startPointY;
    const totalDistance = Math.sqrt(
      horizontalDistance ** 2 + verticalDistance ** 2,
    );

    // Optimized arc calculation
    const arcHeight = Math.min(totalDistance * 0.25, 100);
    const midPointX = startPointX + horizontalDistance * 0.5;
    const midPointY = Math.min(startPointY, targetY) - arcHeight;

    let startTime: number;
    let animationId: number;
    let cancelled = false;

    const animate = (currentTime: number) => {
      if (cancelled) {
        return;
      }

      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min((currentTime - startTime) / PHASE2_DURATION, 1);
      const t = progress;
      const oneMinusT = 1 - t;

      // Quadratic bezier curve calculations
      const xPos =
        oneMinusT ** 2 * startPointX +
        2 * oneMinusT * t * midPointX +
        t ** 2 * targetX;
      const yPos =
        oneMinusT ** 2 * startPointY +
        2 * oneMinusT * t * midPointY +
        t ** 2 * targetY;

      // Size and bounce calculations
      const sizeProgress = 1 - (1 - progress) ** 2;
      const currentSize =
        CIRCLE_SIZE - (CIRCLE_SIZE - FINAL_SIZE) * sizeProgress;
      const bounceScale =
        1 + Math.sin(progress * Math.PI) * 0.05 * (1 - progress);

      // Batch style updates
      Object.assign(clone.style, {
        width: `${currentSize}px`,
        height: `${currentSize}px`,
        left: `${xPos}px`,
        top: `${yPos}px`,
        transform: `scale(${bounceScale})`,
      });

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        finishAnimation();
      }
    };

    animationId = requestAnimationFrame(animate);

    // Return cleanup function
    return () => {
      cancelled = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      clone.remove();
    };
  };

  // Cleanup and cart icon bounce
  const finishAnimation = () => {
    Object.assign(clone.style, {
      transform: "scale(0)",
      transition:
        "transform 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 200ms ease",
      opacity: "0",
    });

    // Cleanup
    setTimeout(() => clone.remove(), CLEANUP_DELAY);

    // Cart icon bounce
    if (cartIconRef.current) {
      const cartIcon = cartIconRef.current;
      Object.assign(cartIconRef.current.style, {
        transform: "scale(1.3)",
        transition: "transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      });

      setTimeout(() => {
        if (cartIcon?.isConnected) {
          cartIcon.style.transform = "scale(1)";
        }
      }, CLEANUP_DELAY);
    }
  };

  // Execute animation phases
  requestAnimationFrame(() => {
    animateToCircle();
    setTimeout(animateToCart, PHASE1_TO_PHASE2_DELAY);
  });
};
