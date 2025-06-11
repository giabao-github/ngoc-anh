import { z } from "zod";

const hasRedundantSpaces = (value: string) => !/^\s+|\s+$|\s{2,}/.test(value);

export const invoiceFormSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, "Tên công ty không được bỏ trống")
      .min(3, "Tên công ty phải chứa ít nhất 3 ký tự")
      .max(100, "Tên công ty không được vượt quá 100 ký tự")
      .refine(
        hasRedundantSpaces,
        "Tên công ty không được chứa khoảng trắng thừa",
      ),
    email: z
      .string()
      .trim()
      .min(1, "Email không được bỏ trống")
      .max(100, "Email không được vượt quá 100 ký tự")
      .email("Email không hợp lệ")
      .refine(hasRedundantSpaces, "Email không được chứa khoảng trắng thừa"),
    taxCode: z
      .string()
      .min(1, "Mã số thuế không được bỏ trống")
      .refine((value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length === 10 || digits.length === 13;
      }, "Mã số thuế chỉ chứa 10 hoặc 13 chữ số"),
    province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
    district: z.string().min(1, "Vui lòng chọn quận/huyện"),
    ward: z.string().min(1, "Vui lòng chọn phường/xã"),
    streetAddress: z
      .string()
      .trim()
      .min(5, "Địa chỉ cụ thể phải chứa ít nhất 5 ký tự")
      .max(100, "Địa chỉ không được vượt quá 100 ký tự")
      .refine(hasRedundantSpaces, "Địa chỉ không được chứa khoảng trắng thừa"),
  })
  .refine(
    (data) => {
      if (data.province && !data.district) {
        return false;
      }
      return true;
    },
    {
      message: "Vui lòng chọn quận/huyện",
      path: ["district"],
    },
  )
  .refine(
    (data) => {
      if (data.province && !data.ward) {
        return false;
      }
      return true;
    },
    {
      message: "Vui lòng chọn phường/xã",
      path: ["ward"],
    },
  );
