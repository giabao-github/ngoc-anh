import { Controller, UseFormReturn } from "react-hook-form";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

import { ChevronDown } from "lucide-react";

import { cn } from "@/libs/utils";

interface SelectDropdownProps {
  name:
    | "companyName"
    | "email"
    | "taxCode"
    | "province"
    | "district"
    | "ward"
    | "streetAddress";
  title?: string;
  form: UseFormReturn<{
    companyName: string;
    email: string;
    taxCode: string;
    province: string;
    district: string;
    ward: string;
    streetAddress: string;
  }>;
  options: { code: string; name: string }[];
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
  font: { className: string };
}
export const SelectDropdown = ({
  name,
  title,
  form,
  options,
  placeholder,
  disabled = false,
  loading = false,
  font,
}: SelectDropdownProps) => {
  const { formState } = form;
  const isDirty = formState.dirtyFields[name];
  const hasError = formState.errors[name];
  const isValid = isDirty && !hasError;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <div className={cn("flex flex-col w-full", font.className)}>
          <div className="relative">
            <select
              title={title || placeholder}
              aria-label={title || placeholder}
              aria-describedby={fieldState.error ? `${name}-error` : undefined}
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              disabled={disabled || loading}
              className={cn(
                "w-full text-sm md:text-base bg-neutral-100 border focus:border-black rounded md:tracking-wide px-3 py-2 pr-10 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                fieldState.error
                  ? "border-rose-500 focus:border-rose-500"
                  : isValid
                    ? "border-emerald-500 focus:border-emerald-500"
                    : "border-gray-300",
              )}
            >
              <option value="">{loading ? "Đang tải..." : placeholder}</option>
              {options.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="absolute -translate-y-1/2 pointer-events-none right-8 top-1/2">
              {isValid && (
                <FaCircleCheck className="w-4 h-4 text-emerald-500" />
              )}
              {fieldState.error && (
                <FaCircleExclamation className="w-4 h-4 text-rose-500" />
              )}
            </div>
            <ChevronDown className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 pointer-events-none right-2 top-1/2" />
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
