import { Montserrat } from "next/font/google";
import React from "react";

import useIsMobile from "../hooks/useIsMobile";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

interface EmailInputProps {
  email: string;
  setEmail: (value: string) => void;
  emailError: string;
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
          : "Email không hợp lệ, vui lòng nhập đúng định dạng (ví dụ: ten@example.com)"
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
              value={email}
              onChange={handleChange}
              className={`text-sm md:text-base bg-neutral-100 border ${
                emailError ? "border-rose-500" : "border-gray-300"
              } focus:border-black rounded md:tracking-wide ${montserrat.className}`}
            />
          </TooltipTrigger>
          <TooltipContent
            align="start"
            className="bg-rose-500 text-white text-xs p-2 rounded shadow"
          >
            {emailError}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default EmailInput;
