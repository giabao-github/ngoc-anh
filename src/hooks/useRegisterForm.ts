import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import { useGenericForm } from "@/utils/formUtils";

type RegisterForm = UseFormReturn<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

export const useRegisterForm = (form: RegisterForm, pending: boolean) => {
  const fieldNames = ["name", "email", "password", "confirmPassword"] as const;

  const { submitButtonText, isButtonDisabled, watchedValues } = useGenericForm({
    form,
    pending,
    fieldNames,
    buttonText: "Đăng ký",
    pendingText: "Đang tạo tài khoản",
    emptyFieldText: "Vui lòng điền đầy đủ thông tin",
    multipleErrorText: "Vui lòng sửa các lỗi trong biểu mẫu",
    singleErrorFallback: "Có lỗi trong biểu mẫu",
  });

  // Cross-field validation
  useEffect(() => {
    if (watchedValues.confirmPassword) {
      form.trigger("confirmPassword");
    }
  }, [watchedValues.password, watchedValues.confirmPassword, form]);

  return { submitButtonText, isButtonDisabled };
};
