import { Montserrat } from "next/font/google";
import useIsMobile from "../hooks/useIsMobile";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";


const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
});

interface TaxCodeInputProps {
  taxCode: string;
  setTaxCode: (value: string) => void;
  taxCodeError: string;
  setTaxCodeError: (value: string) => void;
}

const TaxCodeInput: React.FC<TaxCodeInputProps> = ({
  taxCode,
  setTaxCode,
  taxCodeError,
  setTaxCodeError,
}) => {
  const isMobile = useIsMobile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    let errorMessage = "";
  
    // Only allow digits
    if (/[^0-9]/.test(value)) {
      errorMessage = isMobile ? "MST chỉ chứa chữ số" : "Mã số thuế chỉ bao gồm chữ số (0–9)";
    }
  
    // Remove non-digit characters
    const digitsOnly = value.replace(/\D/g, "");
  
    // Prevent entering more than 13 digits
    if (digitsOnly.length > 13) {
      return;
    }
  
    // Auto-format for 13 digits
    let formatted = digitsOnly
    if (digitsOnly.length === 13) {
      formatted = `${digitsOnly.slice(0, 10)}-${digitsOnly.slice(10)}`
      errorMessage = "";
    } else if (digitsOnly.length === 10) {
      errorMessage = "";
    } else if (digitsOnly.length > 0 && digitsOnly.length < 10) {
      errorMessage = isMobile ? "MST chứa ít nhất 10 chữ số" : "Mã số thuế phải chứa ít nhất 10 chữ số";
    } else if (digitsOnly.length > 10 && digitsOnly.length < 13) {
      errorMessage = isMobile ? "MST chỉ chứa 10 hoặc 13 chữ số" : "Mã số thuế chỉ chứa 10 hoặc 13 chữ số";
    }
  
    setTaxCodeError(errorMessage);
    setTaxCode(formatted);
  }


  return (
    <TooltipProvider>
      <div className="relative w-[38%] md:w-[30%]">
        <Tooltip open={!!taxCodeError}>
          <TooltipTrigger asChild>
            <Input
              type="text"
              placeholder="Mã số thuế"
              value={taxCode}
              onChange={handleChange}
              className={`text-sm md:text-base uppercase placeholder:normal-case bg-neutral-100 border ${
                taxCodeError ? "border-rose-500" : "border-gray-300"
              } focus:border-black rounded md:tracking-wide ${montserrat.className}`}
            />
          </TooltipTrigger>
          <TooltipContent align="start" className="bg-rose-500 text-white text-xs p-2 rounded shadow">
            {taxCodeError}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export default TaxCodeInput;