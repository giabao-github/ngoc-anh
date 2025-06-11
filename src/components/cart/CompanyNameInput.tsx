import { Controller, UseFormReturn } from "react-hook-form";

import { NextFont } from "next/dist/compiled/@next/font";

import { Input } from "@/components/ui/input";

import { sanitizeInputOnBlur, sanitizeInputWithLevel } from "@/libs/textUtils";
import { cn } from "@/libs/utils";

interface CompanyNameInputProps {
  form: UseFormReturn<{
    companyName: string;
    email: string;
    taxCode: string;
    province: string;
    district: string;
    ward: string;
    streetAddress: string;
  }>;
  placeholder: string;
  font: NextFont;
  setIsSubmitted: (submitted: boolean) => void;
}

export const CompanyNameInput = ({
  form,
  placeholder,
  font,
  setIsSubmitted,
}: CompanyNameInputProps) => {
  return (
    <Controller
      name="companyName"
      control={form.control}
      render={({ field, fieldState }) => (
        <div className={cn("relative", font.className)}>
          <Input
            type="text"
            placeholder={placeholder}
            value={field.value}
            onChange={(e) => {
              setIsSubmitted(false);
              const sanitized = sanitizeInputWithLevel(e.target.value, "name");
              field.onChange(sanitized);
            }}
            onBlur={() => {
              const sanitized = sanitizeInputOnBlur(field.value);
              field.onChange(sanitized);
              field.onBlur();
            }}
            className={cn(
              "w-full text-sm md:text-base bg-neutral-100 border focus:border-black rounded md:tracking-wide",
              fieldState.error ? "border-rose-500" : "border-gray-300",
            )}
          />
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
