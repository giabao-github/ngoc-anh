import { products } from "@/app/storage";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/invoice";

export const findProductBySlug = (slug: string) =>
  products.find((item) => item.details[0].slug === slug);

export const getProductDetails = (product: Product) => {
  if (!product.details?.length) {
    return product.size || "";
  }
  const details = [];
  if (product.details[0].pattern) {
    details.push(product.details[0].pattern);
  } else if (product.details[0].color) {
    details.push(product.details[0].color);
  } else if (product.details[0].drink) {
    details.push(product.details[0].drink);
  }
  if (product.size) {
    details.push(product.size);
  } else if (product.volume) {
    details.push(product.volume);
  }
  return details.join(" / ");
};

export const calculateRatingStats = (
  rating?: number[],
): {
  totalReviews: number;
  averageRating: number;
  displayRating: string;
} => {
  if (!rating?.length) {
    return { totalReviews: 0, averageRating: 0, displayRating: "0.0" };
  }

  const totalReviews = rating.reduce((sum, count) => sum + count, 0);
  const weightedSum = rating.reduce(
    (sum, count, index) => sum + count * (index + 1),
    0,
  );
  const averageRating = totalReviews > 0 ? weightedSum / totalReviews : 0;
  const displayRating = averageRating.toFixed(1);

  return { totalReviews, averageRating, displayRating };
};

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
};

export const createCartItem = (
  product: Product,
  quantity: number,
): CartItem => ({
  id: product.id,
  name: product.name,
  image: product.images[0],
  background: "background" in product ? product.background : undefined,
  color: product.details[0].color,
  pattern: product.details[0].pattern,
  size: product.size,
  slug: product.details[0].slug,
  price: product.details[0].price,
  quantity,
});

export const createImageData = (
  images: string[],
  productName: string,
  background?: string,
) =>
  images.map((image, index) => ({
    value: index.toString(),
    label: productName,
    image: image,
    background: background,
  }));

export const getOriginalPrice = (product: Product): string => {
  const { price } = product.details[0];

  const discountAmount = product.details[0].badge?.discount ?? 0;

  if (discountAmount === 0) {
    return formatPrice(price);
  }

  const originalPrice = Math.round((price * 100) / (100 - discountAmount));
  return formatPrice(originalPrice);
};

export const formatPrice = (value: number): string => {
  return value.toLocaleString("vi-VN") + "₫";
};
