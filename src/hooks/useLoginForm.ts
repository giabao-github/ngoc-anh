import { UseFormReturn } from "react-hook-form";

import { useGenericForm } from "@/utils/formUtils";

type LoginForm = UseFormReturn<{
  email: string;
  password: string;
}>;

export const useLoginForm = (form: LoginForm, pending: boolean) => {
  const fieldNames = ["email", "password"] as const;

  return useGenericForm({
    form,
    pending,
    fieldNames,
    buttonText: "Đăng nhập",
    pendingText: "Đang đăng nhập",
    emptyFieldText: "Vui lòng điền đầy đủ thông tin",
    multipleErrorText: "Vui lòng sửa các lỗi trong biểu mẫu",
    singleErrorFallback: "Có lỗi trong biểu mẫu",
  });
};
