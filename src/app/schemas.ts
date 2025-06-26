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

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ")
    .refine(hasRedundantSpaces, "Email không được chứa khoảng trắng thừa"),
  password: z
    .string()
    .min(1, "Mật khẩu không được để trống")
    .min(8, { message: "Mật khẩu phải chứa ít nhất 8 ký tự" })
    .max(32, { message: "Mật khẩu chỉ chứa tối đa 32 ký tự" })
    .refine(
      (value) => {
        // At least one letter and one number
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /\d/.test(value);

        return hasLetter && hasNumber;
      },
      {
        message: "Mật khẩu phải chứa chữ và số",
      },
    ),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Vui lòng nhập tên người dùng" })
      .min(2, { message: "Tên người dùng phải chứa ít nhất 2 ký tự" })
      .max(50, { message: "Tên người dùng không được quá 50 ký tự" })
      .refine(
        hasRedundantSpaces,
        "Tên người dùng không được chứa khoảng trắng thừa",
      )
      .refine(
        (value) => {
          // Allow Vietnamese characters, letters, numbers, and common username characters
          const validPattern = /^[a-zA-ZÀ-ỹ0-9\s\-_'\.@]+$/;
          return validPattern.test(value.trim());
        },
        {
          message: "Tên người dùng không được chứa ký tự đặc biệt",
        },
      )
      .refine(
        (value) => {
          // Only ban truly offensive or inappropriate words
          const bannedWords = [
            "asshole",
            "bitch",
            "cock",
            "dick",
            "fuck",
            "hitler",
            "nazi",
            "pussy",
            "cặc",
            "đụ",
            "địt",
            "đít",
            "lồn",
          ];
          const lowerValue = value.toLowerCase();
          return !bannedWords.some((word) => lowerValue.includes(word));
        },
        { message: "Tên người dùng chứa từ không phù hợp" },
      )
      .refine(
        (value) => {
          // Prevent excessive special characters (excluding allowed ones)
          const hasExcessiveSpecialChars =
            /[!$%^&*()+=|{}[\]:";<>?,./]{3,}/.test(value);
          return !hasExcessiveSpecialChars;
        },
        { message: "Tên người dùng chứa quá nhiều ký tự đặc biệt" },
      ),
    email: z
      .string()
      .trim()
      .min(1, "Email không được để trống")
      .email("Email không hợp lệ")
      .refine(hasRedundantSpaces, "Email không được chứa khoảng trắng thừa"),
    password: z
      .string()
      .min(1, "Mật khẩu không được để trống")
      .min(8, { message: "Mật khẩu phải chứa ít nhất 8 ký tự" })
      .max(32, { message: "Mật khẩu chỉ chứa tối đa 32 ký tự" })
      .refine(
        (value) => {
          // At least one letter and one number
          const hasLetter = /[a-zA-Z]/.test(value);
          const hasNumber = /\d/.test(value);

          return hasLetter && hasNumber;
        },
        {
          message: "Mật khẩu phải chứa chữ và số",
        },
      )
      .refine(
        (value) => {
          // Prevent only the most common weak passwords
          const weakPasswords = [
            "password",
            "123456",
            "12345678",
            "qwerty",
            "abc123",
            "matkhau",
            "123456789",
            "iloveyou",
            "thacham",
          ];
          return !weakPasswords.includes(value.toLowerCase());
        },
        { message: "Mật khẩu quá đơn giản" },
      ),
    confirmPassword: z.string().min(1, "Mật khẩu xác nhận không được để trống"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận phải trùng khớp",
    path: ["confirmPassword"],
  });

export const recoverySchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ")
    .refine(hasRedundantSpaces, "Email không được chứa khoảng trắng thừa"),
});

export const changePasswordClientSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z
      .string()
      .min(1, "Mật khẩu mới không được để trống")
      .min(8, { message: "Mật khẩu mới phải chứa ít nhất 8 ký tự" })
      .max(32, { message: "Mật khẩu mới chỉ chứa tối đa 32 ký tự" })
      .refine(
        (value) => {
          // At least one letter and one number
          const hasLetter = /[a-zA-Z]/.test(value);
          const hasNumber = /\d/.test(value);

          return hasLetter && hasNumber;
        },
        {
          message: "Mật khẩu mới phải chứa chữ và số",
        },
      )
      .refine(
        (value) => {
          // Prevent only the most common weak passwords
          const weakPasswords = [
            "password",
            "123456",
            "12345678",
            "qwerty",
            "abc123",
            "matkhau",
            "123456789",
            "iloveyou",
            "thacham",
          ];
          return !weakPasswords.includes(value.toLowerCase());
        },
        { message: "Mật khẩu mới quá đơn giản" },
      ),
    confirmNewPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác nhận phải trùng khớp",
    path: ["confirmNewPassword"],
  });

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});
