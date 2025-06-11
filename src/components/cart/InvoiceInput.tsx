import { Controller, UseFormReturn } from "react-hook-form";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

import { NextFont } from "next/dist/compiled/@next/font";

import { Input } from "@/components/ui/input";

import { SanitizeLevel } from "@/app/types";
import {
  formatTaxCode,
  sanitizeInputOnBlur,
  sanitizeInputWithLevel,
} from "@/libs/textUtils";
import { cn } from "@/libs/utils";

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
  font: NextFont;
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
              max={maxLength}
              placeholder={placeholder}
              value={field.value}
              onChange={(e) => {
                if (name === "taxCode") {
                  const taxCode = formatTaxCode(e.target.value);
                  field.onChange(taxCode);
                } else {
                  if (sanitizeLevel) {
                    const sanitized = sanitizeInputWithLevel(
                      e.target.value,
                      sanitizeLevel,
                    );
                    field.onChange(sanitized);
                  } else {
                    field.onChange(e.target.value);
                  }
                }
              }}
              onBlur={() => {
                const sanitized = sanitizeInputOnBlur(field.value);
                field.onChange(sanitized);
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
            <div className="absolute -translate-y-1/2 right-3 top-1/2">
              {isValid && (
                <FaCircleCheck className="w-4 h-4 text-emerald-500" />
              )}
              {fieldState.error && (
                <FaCircleExclamation className="w-4 h-4 text-rose-500" />
              )}
            </div>
          </div>
          {fieldState.error && (
            <p className="px-1 mt-1 text-xs text-rose-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
