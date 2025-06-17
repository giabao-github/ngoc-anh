import { z } from "zod";

import { invoiceFormSchema } from "@/app/schemas";

// Product types
export type Product = {
  id: number;
  name: string;
  images: string[];
  background?: string;
  zoom?: number[];
  description?: React.ReactNode;
  code: string;
  brand: string;
  material: string;
  pin?: string;
  category: string;
  details: ProductDetail[];
  size?: string;
  quantity: number;
  rating: number[];
  instruction?: React.ReactNode;
  note?: React.ReactNode;
};

export type ProductDetail = {
  color: string;
  slug: string;
  price: number;
  pattern?: string;
  badge: {
    isNew?: boolean;
    discount?: number;
    isReward?: boolean;
    isBestseller?: boolean;
  };
};

export type ImageData = {
  value?: string | undefined;
  label?: string | undefined;
  image: string;
  background?: string | undefined;
};

// Cart types
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

// Input handling types
export type SanitizeLevel =
  | "address"
  | "aggressive"
  | "conservative"
  | "default"
  | "email"
  | "name"
  | "taxCode";

// Location types
export type Province = {
  name: string;
  code: string;
  division_type: string;
  codename: string;
  phone_code: number;
};

export type District = {
  name: string;
  code: string;
  division_type: string;
  codename: string;
  province_code: string;
};

export type Ward = {
  name: string;
  code: string;
  division_type: string;
  codename: string;
  district_code: string;
};

export type AddressData = {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  loading: {
    provinces: boolean;
    districts: boolean;
    wards: boolean;
  };
};

export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;
