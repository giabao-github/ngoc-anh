import React from "react";

import { Montserrat } from "next/font/google";

import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import useIsMobile from "@/hooks/useIsMobile";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

interface EmailInputProps {
  email: string | undefined;
  setEmail: (value: string) => void;
  emailError: string | undefined;
  setEmailError: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  emailError,
  setEmailError,
}) => {
  const isMobile = useIsMobile();

  const validateEmail = (value: string) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);

    if (value.length === 0) {
      setEmailError("");
      return;
    }

    if (!validateEmail(value)) {
      setEmailError(
        isMobile
          ? "Email không hợp lệ"
          : "Email không hợp lệ, vui lòng nhập đúng định dạng (ví dụ: ten@example.com)",
      );
    } else {
      setEmailError("");
    }
  };

  return (
    <TooltipProvider>
      <div className="relative w-[62%] md:w-[70%]">
        <Tooltip open={!!emailError}>
          <TooltipTrigger asChild>
            <Input
              type="text"
              placeholder="Email"
              value={email || ""}
              onChange={handleChange}
              className={`text-sm md:text-base bg-neutral-100 border ${
                emailError ? "border-rose-500" : "border-gray-300"
              } focus:border-black rounded md:tracking-wide ${
                montserrat.className
              }`}
            />
          </TooltipTrigger>
          <TooltipContent
            align="start"
            className="p-2 text-xs text-white rounded shadow bg-rose-500"
          >
            {emailError}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default EmailInput;
