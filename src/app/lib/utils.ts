import { clsx, type ClassValue } from "clsx";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { products } from "../storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RawCartItem } from "../types";


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