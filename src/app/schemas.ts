import { z } from "zod";

export const invoiceFormSchema = z.object({
  companyName: z
    .string()
    .min(3, "Tên công ty phải chứa ít nhất 3 ký tự")
    .max(100, "Tên công ty không được vượt quá 100 ký tự"),
  email: z
    .string()
    .email("Địa chỉ email không hợp lệ")
    .min(1, "Email không được bỏ trống"),
  taxCode: z
    .string()
    .regex(/^\d{10}(\d{3})?$/, "Mã số thuế phải có 10 hoặc 13 chữ số")
    .min(1, "Mã số thuế không được bỏ trống"),
  province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  streetAddress: z
    .string()
    .min(5, "Địa chỉ cụ thể phải chứa ít nhất 5 ký tự")
    .max(200, "Địa chỉ không được vượt quá 200 ký tự"),
});
