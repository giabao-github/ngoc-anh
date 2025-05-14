import { products } from "@/app/storage";

export type Product = (typeof products)[number];

export type ImageData = {
  value: string;
  label: string | undefined;
  image: string;
};

export type CartItem = {
  id: number;
  name: string;
  pattern: string;
  size?: string;
  volume?: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
};
