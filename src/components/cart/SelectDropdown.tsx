import { ChevronDown } from "lucide-react";
import { NextFont } from "next/dist/compiled/@next/font";

export const SelectDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  loading = false,
  font,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
  options: { code: string; name: string }[];
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
  font: NextFont;
}) => (
  <div className="relative">
    <select
      title="Address dropdown"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || loading}
      className={`w-full z-20 text-sm md:text-base bg-neutral-100 border border-gray-300 focus:border-black rounded md:tracking-wide px-3 py-2 pr-8 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${font.className}`}
    >
      <option value="">{loading ? "Đang tải..." : placeholder}</option>
      {options.map((option) => (
        <option key={option.code} value={option.code}>
          {option.name}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
  </div>
);
