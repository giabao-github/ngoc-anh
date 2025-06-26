import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import { useGenericForm } from "@/utils/formUtils";

export type ChangePasswordFormFields = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const useChangePasswordForm = (
  form: UseFormReturn<ChangePasswordFormFields>,
  pending: boolean,
  isSuccess?: boolean,
) => {
  const fieldNames = [
    "currentPassword",
    "newPassword",
    "confirmNewPassword",
  ] as const;

  const { submitButtonText, isButtonDisabled, watchedValues } = useGenericForm({
    form,
    pending,
    isSuccess,
    fieldNames,
    buttonText: "Đổi mật khẩu",
    pendingText: "Đang đổi mật khẩu",
    emptyFieldText: "Vui lòng điền đầy đủ thông tin",
    multipleErrorText: "Vui lòng sửa các lỗi trong biểu mẫu",
    singleErrorFallback: "Có lỗi trong biểu mẫu",
  });

  // Cross-field validation
  useEffect(() => {
    if (watchedValues.confirmNewPassword) {
      form.trigger("confirmNewPassword");
    }
  }, [watchedValues.newPassword, watchedValues.confirmNewPassword, form]);

  return { submitButtonText, isButtonDisabled };
};
