import { UseFormReturn } from "react-hook-form";

import { useGenericForm } from "@/utils/formUtils";

type RecoveryForm = UseFormReturn<{
  email: string;
}>;

export const useRecoveryForm = (
  form: RecoveryForm,
  pending: boolean,
  isSuccess: boolean,
) => {
  const fieldNames = ["email"] as const;

  return useGenericForm({
    form,
    pending,
    fieldNames,
    isSuccess,
    buttonText: "Gửi yêu cầu",
    pendingText: "Đang xử lý...",
    successText: "Email đã được gửi",
    emptyFieldText: "Vui lòng nhập email của bạn",
    multipleErrorText: "",
    singleErrorFallback: "Email không hợp lệ",
  });
};
