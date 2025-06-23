import { Path, UseFormReturn, useWatch } from "react-hook-form";

export interface UseGenericFormOptions<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  pending: boolean;
  fieldNames: readonly Path<T>[];
  isSuccess?: boolean;
  buttonText: string;
  pendingText: string;
  successText?: string;
  emptyFieldText: string;
  multipleErrorText: string;
  singleErrorFallback: string;
}

export function useGenericForm<T extends Record<string, any>>({
  form,
  pending,
  fieldNames,
  isSuccess = false,
  buttonText,
  pendingText,
  successText,
  emptyFieldText,
  multipleErrorText,
  singleErrorFallback,
}: UseGenericFormOptions<T>) {
  const watchedValuesArr = useWatch({
    control: form.control,
    name: fieldNames,
  });
  const watchedValues = fieldNames.reduce(
    (acc, field, idx) => {
      acc[field] = watchedValuesArr[idx];
      return acc;
    },
    {} as Record<Path<T>, any>,
  );
  const watchedErrors = form.formState.errors;

  const emptyFields = fieldNames.filter((f) => !watchedValues[f]);
  const errorFields = fieldNames.filter((f) => watchedErrors[f]);
  let submitButtonText = buttonText;
  const isButtonDisabled =
    pending || errorFields.length > 0 || emptyFields.length > 0 || isSuccess;

  if (pending) {
    submitButtonText = pendingText;
  } else if (isSuccess && successText) {
    submitButtonText = successText;
  } else if (!isButtonDisabled) {
    submitButtonText = buttonText;
  } else if (errorFields.length > 1) {
    submitButtonText = multipleErrorText;
  } else if (errorFields.length === 1) {
    const field = errorFields[0];
    const errorMsg = watchedErrors[field]?.message;
    submitButtonText =
      typeof errorMsg === "string" && errorMsg.length > 0
        ? errorMsg
        : singleErrorFallback;
  } else if (emptyFields.length > 0) {
    submitButtonText = emptyFieldText;
  }

  return { submitButtonText, isButtonDisabled, watchedValues, watchedErrors };
}
