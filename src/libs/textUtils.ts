import {
  DIACRITIC_REGEX,
  KAOMOJI_PATTERNS,
  SLUG_EDGE_DASHES,
  SLUG_MULTIPLE_DASHES,
  SLUG_SPECIAL_CHARS,
  TEXT_SPECIAL_CHARS,
  VIETNAMESE_D_REGEX,
  WHITESPACE_REGEX,
} from "@/constants/regexes";

import { SanitizeLevel } from "@/app/types";

export const sanitizeInputName = (input: string, maxLength = 255): string => {
  // Remove common kaomoji and emoticon patterns (more comprehensive)
  KAOMOJI_PATTERNS.forEach((pattern) => {
    input = input.replace(pattern, "");
  });

  return input
    .replace(/[^\p{L}\p{N}\s\-&.']/gu, "")
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
};

export const sanitizeInputAddress = (
  input: string,
  maxLength = 255,
): string => {
  return input
    .replace(/[^\p{L}\p{N}\/,()'\-\.#\s]/gu, "")
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
};

export const sanitizeInputAggressive = (
  input: string,
  maxLength = 255,
): string => {
  // Remove HTML tags more safely
  input = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "");

  // Remove control characters (keep newlines and tabs if needed)
  input = input.replace(/\p{Cc}/gu, "");

  // Remove emojis using comprehensive Unicode properties
  const emojiRegex =
    /\p{Emoji_Presentation}|\p{Emoji}\uFE0F?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?/gu;
  input = input.replace(emojiRegex, "");

  // Remove common kaomoji and emoticon patterns (more targeted)
  const kaomojiPatterns = [
    // Face patterns: (^_^) ಠ_ಠ etc.
    /[\(\)（）][\^\-_oO•°ಠ><\\\/\|]{1,3}[\)\(）（]/g,
    // Table flip, shrug patterns
    /[┻┳┃━│┌┐└┘├┤┬┴┼]/g,
    // Common kaomoji symbols (more selective)
    /[╯╰╭╮︵︶ツヾシ〜]/g,
    // Decorative symbols that are typically not content
    /[♪♫☆★♥♡‼⁉]/g,
    // Repetitive character patterns (likely decorative)
    /(.)\1{4,}/g,
  ];

  kaomojiPatterns.forEach((pattern) => {
    input = input.replace(pattern, "");
  });

  // Clean up extra whitespace
  input = input.replace(/\s+/g, " ").trim();

  // Limit to max length (considering word boundaries)
  if (input.length > maxLength) {
    input = input.slice(0, maxLength);
    // Try to cut at word boundary
    const lastSpace = input.lastIndexOf(" ");
    if (lastSpace > maxLength * 0.8) {
      // Only if we don't lose too much
      input = input.slice(0, lastSpace);
    }
  }

  return input;
};

export const sanitizeInputConservative = (
  input: string,
  maxLength = 255,
): string => {
  // Only remove clearly dangerous content
  input = input
    // Remove script tags specifically
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    // Remove other HTML tags
    .replace(/<[^>]*>/g, "")
    // Remove null bytes and most control characters
    .replace(/\p{Cc}/gu, "")
    // Remove only obvious emoji (not all Unicode symbols)
    .replace(
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu,
      "",
    )
    // Clean whitespace
    .replace(/\s+/g, " ")
    .trim();

  return input.length > maxLength ? input.slice(0, maxLength) : input;
};

export const sanitizeInputWithLevel = (
  input: string,
  level: SanitizeLevel = "conservative",
  maxLength = 255,
): string => {
  switch (level) {
    case "conservative":
      return sanitizeInputConservative(input, maxLength);
    case "aggressive":
      return sanitizeInputAggressive(input, maxLength);
    case "name":
      return sanitizeInputName(input, maxLength);
    case "address":
      return sanitizeInputAddress(input, maxLength);
    default:
      // Remove HTML and obvious emojis, keep other Unicode
      return input
        .replace(/<[^>]*>/g, "")
        .replace(/[\u0000-\u001F\u007F]/g, "")
        .replace(/[\u{1F600}-\u{1F6FF}]/gu, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maxLength);
  }
};

export const sanitizeInputOnBlur = (input: string): string => {
  return input.trim().replace(/\s+/g, " ");
};

export const formatTaxCode = (value: string): string => {
  // Remove any non-digit characters
  const digits = value.replace(/\D/g, "");

  // Only format if exactly 13 digits
  if (digits.length === 13) {
    return `${digits.slice(0, 10)}-${digits.slice(10)}`;
  }

  return digits;
};

export const normalizeText = (
  str: string,
  forSlug: boolean = false,
): string => {
  if (!str) {
    return "";
  }

  // Chain operations to minimize intermediate string creation
  let normalized = str
    .trim()
    .normalize("NFD")
    .replace(DIACRITIC_REGEX, "")
    .replace(VIETNAMESE_D_REGEX, (match) => (match === "đ" ? "d" : "D"))
    .toLowerCase();

  if (forSlug) {
    return normalized
      .replace(SLUG_SPECIAL_CHARS, "-")
      .replace(SLUG_MULTIPLE_DASHES, "-")
      .replace(SLUG_EDGE_DASHES, "");
  }

  return normalized
    .replace(TEXT_SPECIAL_CHARS, " ")
    .replace(WHITESPACE_REGEX, " ")
    .trim();
};

export const formatText = (text: string) => {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s*([+-])\s*/g, " $1 ");
};

export const formatDuration = (duration: number) => {
  const seconds = Math.floor((duration % 60000) / 1000);
  const totalMinutes = Math.floor(duration / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours >= 1
    ? `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    : `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const validateEmail = (value: string): boolean => {
  if (!value || typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();

  if (
    trimmedValue.length === 0 ||
    trimmedValue.length > 254 ||
    !trimmedValue.includes("@") ||
    trimmedValue.startsWith("@") ||
    trimmedValue.endsWith("@")
  ) {
    return false;
  }

  if (typeof document !== "undefined") {
    const input = document.createElement("input");
    input.type = "email";
    input.value = trimmedValue;
    return input.validity.valid;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmedValue);
};

export const testPhone = (
  value: string,
  format: "vn" | "international" = "vn",
) => {
  const patterns = {
    vn: /^0\d{9,10}$/,
    international: /^\+?[1-9]\d{1,14}$/,
  };
  return patterns[format].test(value);
};
