import { z } from "zod";

import { invoiceFormSchema } from "@/app/schemas";
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
  background?: string;
  color?: string;
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

export type SanitizeLevel =
  | "conservative"
  | "moderate"
  | "aggressive"
  | "name"
  | "address";

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
