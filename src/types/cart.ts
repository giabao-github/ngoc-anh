import { Product } from "@/types/product";

export type CartItem = {
  id: number;
  name: string;
  background?: string;
  color?: string;
  pattern?: string;
  size?: string;
  volume?: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
};

export type RawCartItem = {
  id: number;
  name: string;
  quantity: number;
};

export type SyncCartItem = Product & { quantity: number };
