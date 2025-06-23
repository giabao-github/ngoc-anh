import { useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

type RegisterForm = UseFormReturn<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

export const useRegisterForm = (form: RegisterForm, pending: boolean) => {
  // Use useWatch to subscribe to all field values
  const fieldNames = ["name", "email", "password", "confirmPassword"] as const;
  const watchedValues = useWatch({ control: form.control });
  const watchedErrors = form.formState.errors;

  // Cross-field validation
  useEffect(() => {
    if (watchedValues.confirmPassword) {
      form.trigger("confirmPassword");
    }
  }, [watchedValues.password, watchedValues.confirmPassword, form]);

  // Dynamic submit button text
  const emptyFields = fieldNames.filter((f) => !watchedValues[f]);
  const errorFields = fieldNames.filter((f) => watchedErrors[f]);
  const hasAnyError = Object.keys(form.formState.errors).length > 0;
  let submitButtonText = "Đăng ký";
  const isButtonDisabled = pending || hasAnyError || emptyFields.length > 0;

  if (pending) {
    submitButtonText = "Đang tạo tài khoản";
  } else if (!isButtonDisabled) {
    submitButtonText = "Đăng ký";
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
