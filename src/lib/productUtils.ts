import { products } from "@/app/storage";
import { CartItem } from "@/app/types";

export const findProductBySlug = (slug: string) =>
  products.find((item) => item.details[0].slug === slug);

export const calculateRatingStats = (rating?: number[]) => {
  if (!rating?.length) {
    return { totalReviews: 0, averageRating: 0 };
  }

  const totalReviews = rating.reduce((sum, count) => sum + count, 0);
  const weightedSum = rating.reduce(
    (sum, count, index) => sum + count * (index + 1),
    0,
  );
  const averageRating =
    totalReviews > 0 ? parseFloat((weightedSum / totalReviews).toFixed(1)) : 0;

  return { totalReviews, averageRating };
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

export const createCartItem = (product: any, quantity: number): CartItem => ({
  id: product.id,
  name: product.name,
  image: product.images[0],
  pattern: product.details[0].pattern,
  size: product.size,
  volume: product.volume,
  slug: product.details[0].slug,
  price: product.details[0].price,
  quantity,
});

export const createImageData = (images: string[], productName: string) =>
  images.map((image, index) => ({
    value: index.toString(),
    label: productName,
    image: image,
  }));
