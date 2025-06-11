import { Controller, UseFormReturn } from "react-hook-form";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

import { Input } from "@/components/ui/input";

import { sanitizeInputOnBlur, sanitizeInputWithLevel } from "@/libs/textUtils";
import { cn } from "@/libs/utils";

import { SanitizeLevel } from "@/app/types";

interface InvoiceInputProps {
  name:
    | "companyName"
    | "email"
    | "taxCode"
    | "province"
    | "district"
    | "ward"
    | "streetAddress";
  form: UseFormReturn<{
    companyName: string;
    email: string;
    taxCode: string;
    province: string;
    district: string;
    ward: string;
    streetAddress: string;
  }>;
  sanitizeLevel?: SanitizeLevel | undefined;
  maxLength?: number;
  placeholder: string;
  font: { className: string };
  className?: string;
}

export const InvoiceInput = ({
  name,
  form,
  sanitizeLevel,
  maxLength = 100,
  placeholder,
  font,
  className,
}: InvoiceInputProps) => {
  const { formState } = form;
  const isDirty = formState.dirtyFields[name];
  const hasError = formState.errors[name];
  const isValid = isDirty && !hasError;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <div className={cn(className, font.className)}>
          <div className="relative">
            <Input
              type="text"
              inputMode={name === "taxCode" ? "numeric" : undefined}
              autoComplete="off"
              maxLength={maxLength}
              placeholder={placeholder}
              value={field.value}
              onChange={(e) => {
                if (sanitizeLevel) {
                  const sanitized = sanitizeInputWithLevel(
                    e.target.value,
                    sanitizeLevel,
                  );
                  field.onChange(sanitized);
                } else {
                  field.onChange(e.target.value);
                }
              }}
              onBlur={() => {
                const trimmed = sanitizeInputOnBlur(field.value);
                const sanitized = sanitizeLevel
                  ? sanitizeInputWithLevel(trimmed, sanitizeLevel)
                  : trimmed;
                if (sanitized !== field.value) {
                  field.onChange(sanitized);
                }
                field.onBlur();
              }}
              className={cn(
                "w-full text-sm md:text-base bg-neutral-100 border focus:border-black rounded md:tracking-wide pr-10",
                fieldState.error
                  ? "border-rose-500 focus:border-rose-500"
                  : isValid
                    ? "border-emerald-500 focus:border-emerald-500"
                    : "border-gray-300",
              )}
            />
            <div className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2">
              {isValid && (
                <FaCircleCheck className="w-4 h-4 text-emerald-500" />
              )}
              {fieldState.error && (
                <FaCircleExclamation className="w-4 h-4 text-rose-500" />
              )}
            </div>
          </div>
          {fieldState.error && (
            <p id={`${name}-error`} className="px-1 mt-1 text-xs text-rose-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
