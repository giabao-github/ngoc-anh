import { z } from "zod";

import { invoiceFormSchema } from "@/app/schemas";

export * from "@/types/product";

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
