import { UseFormReturn, useWatch } from "react-hook-form";

type RecoveryForm = UseFormReturn<{
  email: string;
}>;

export const useRecoveryForm = (
  form: RecoveryForm,
  pending: boolean,
  isSuccess: boolean,
) => {
  // Use useWatch to subscribe to all field values
  const fieldNames = ["email"] as const;
  const watchedValues = useWatch({ control: form.control });
  const watchedErrors = form.formState.errors;

  // Dynamic submit button text
  const emptyFields = fieldNames.filter((f) => !watchedValues[f]);
  const hasAnyError = Object.keys(form.formState.errors).length > 0;
  let submitButtonText = "Gửi yêu cầu";
  const isButtonDisabled =
    pending || hasAnyError || emptyFields.length > 0 || isSuccess;

  if (pending) {
    submitButtonText = "Đang xử lý...";
  } else if (isSuccess) {
    submitButtonText = "Email đã được gửi";
  } else if (!isButtonDisabled) {
    submitButtonText = "Gửi yêu cầu";
  } else if (watchedErrors.email) {
    submitButtonText = watchedErrors.email.message || "Email không hợp lệ";
  } else if (emptyFields.length > 0) {
    submitButtonText = "Vui lòng nhập email của bạn";
  }

  return { submitButtonText, isButtonDisabled };
};
