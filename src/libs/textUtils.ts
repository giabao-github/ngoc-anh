export const sanitizeInput = (input: string, maxLength = 255): string => {
  // Remove potentially dangerous characters (like script tags)
  input = input.replace(/<[^>]*>?/gm, "").replace(/[\u0000-\u001F\u007F]/g, "");

  // Remove emojis and kaomojis using supported Unicode ranges
  const emojiRegex =
    /(?:\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\d\uFE0F\u20E3)/gu;
  const kaomojiRegex =
    /(?:\([^\w\s]{1,20}\)|[^\x00-\x7F]{2,}|[☆★♥♡♪♫‼‼️]+|[oO0]?[^\w\s]{2,}[oO0]?)/g;
  input = input.replace(emojiRegex, "");
  input = input.replace(kaomojiRegex, "");

  // Limit to max length
  if (input.length > maxLength) {
    input = input.slice(0, maxLength);
  }

  return input;
};

export const sanitizeInputOnBlur = (input: string): string => {
  return input.trim().replace(/\s+/g, " ");
};

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
      .replace(/^-|-$/g, "");
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
    .replace(/\s+/g, " ")
    .replace(/\s*([+-])\s*/g, " $1 ");
};

export const formatDuration = (duration: number) => {
  const seconds = Math.floor((duration % 60000) / 1000);
  const minutes = Math.floor(duration / 60000);
  const hours = Math.floor(minutes / 60);
  return hours >= 1
    ? `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    : `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const validateEmail = (value: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value);
};

export const testPhone = (value: string) => {
  const phoneRegex = /^0\d{9,10}$/;
  return phoneRegex.test(value);
};
