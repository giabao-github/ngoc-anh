import { products } from "@/app/storage";

export type Product = (typeof products)[number];

export type ImageData = {
  value: string;
  label: string | undefined;
  image: string;
};