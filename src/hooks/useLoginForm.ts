import { UseFormReturn, useWatch } from "react-hook-form";

type LoginForm = UseFormReturn<{
  email: string;
  password: string;
}>;

export const useLoginForm = (form: LoginForm, pending: boolean) => {
  // Use useWatch to subscribe to all field values
  const fieldNames = ["email", "password"] as const;
  const watchedValues = useWatch({ control: form.control });
  const watchedErrors = form.formState.errors;

  // Dynamic submit button text
  const emptyFields = fieldNames.filter((f) => !watchedValues[f]);
  const errorFields = fieldNames.filter((f) => watchedErrors[f]);
  const hasAnyError = Object.keys(form.formState.errors).length > 0;
  let submitButtonText = "Đăng nhập";
  const isButtonDisabled = pending || hasAnyError || emptyFields.length > 0;

  if (pending) {
    submitButtonText = "Đang đăng nhập";
  } else if (!isButtonDisabled) {
    submitButtonText = "Đăng nhập";
  } else if (errorFields.length > 1) {
    submitButtonText = "Vui lòng sửa các lỗi trong biểu mẫu";
  } else if (errorFields.length === 1) {
    const field = errorFields[0];
    submitButtonText = watchedErrors[field]?.message
      ? `${watchedErrors[field]?.message}`
      : "Có lỗi trong biểu mẫu";
  } else if (emptyFields.length > 0) {
    submitButtonText = "Vui lòng điền đầy đủ thông tin";
  }

  return { submitButtonText, isButtonDisabled };
};
