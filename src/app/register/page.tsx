"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/sections/Footer";
import Disclaimer from "@/components/user/Disclaimer";
import FormFields from "@/components/user/FormFields";
import ProviderLogin from "@/components/user/ProviderLogin";
import SkeletonLoader from "@/components/user/SkeletonLoader";
import EmailPhoneSwitch from "@/components/user/Switch";
import { testPhone, validateEmail } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Suspense, useRef, useState } from "react";

export const dynamic = "force-dynamic";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const handleMethodChange = (newMethod: "email" | "phone") => {
    setMethod(newMethod);
    setValue("");
    setInputError("");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const validatePhone = (value: string) => {
    if (value.length === 0) {
      setInputError("Vui lòng nhập số điện thoại");
    } else if (value.charAt(0) !== "0") {
      setInputError("Số điện thoại phải bắt đầu bằng 0");
    } else if (value.length < 10 || value.length > 11) {
      setInputError("Số điện thoại phải chứa 10 hoặc 11 chữ số");
    } else {
      setInputError("");
    }
  };

  const isPhoneValid = method === "phone" && testPhone(value);
  const isEmailValid = method === "email" && validateEmail(value);
  const isPasswordValid = password.length >= 6;

  const isFormValid = (isPhoneValid || isEmailValid) && isPasswordValid;

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <title>Đăng ký tài khoản</title>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="flex items-center justify-center max-h-screen my-16 bg-gray-50 lg:px-8 md:my-24">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md shadow-[#D4AF37]/50 md:border-t md:border-[#D4AF37]/50 md:focus-within:border-t-2 focus-within:shadow-lg">
          <div className="flex flex-col text-center gap-y-3">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Đăng ký tài khoản
            </h2>
          </div>

          <EmailPhoneSwitch onMethodChange={handleMethodChange} />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/login?method=${method}`);
            }}
            className="mt-8 space-y-6"
          >
            <FormFields
              email={value}
              password={password}
              isTouched={isTouched}
              showPassword={showPassword}
              isEmailValid={isEmailValid}
              inputError={inputError}
              isPhoneLogin={method === "phone"}
              setEmail={setValue}
              setPassword={setPassword}
              setIsTouched={setIsTouched}
              setInputError={setInputError}
              validatePhone={validatePhone}
              validateEmail={validateEmail}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            <Disclaimer />

            <button
              type="submit"
              disabled={!isFormValid}
              title={
                !isFormValid
                  ? method === "phone"
                    ? "Nhập số điện thoại hợp lệ (bắt đầu bằng 0, chứa ít nhất 10 chữ số) và mật khẩu từ 6 ký tự"
                    : "Nhập email hợp lệ (ví dụ: ten@example.com) và mật khẩu từ 6 ký tự"
                  : ""
              }
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-lg tracking-wide text-white ${
                isFormValid
                  ? "bg-[#D4AF37] hover:bg-[#D4AF37]/80 active:bg-[#D4AF37]/60 cursor-pointer"
                  : "bg-[#D4AF37]/50 cursor-default"
              } focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#D4AF37] transition duration-200 select-none`}
            >
              Đăng ký
            </button>

            <div className="flex justify-center text-sm font-semibold tracking-wide">
              <p className="text-[#0C2543]">
                Đăng nhập bằng&nbsp;
                <a
                  onClick={() => {
                    router.push(`/login?method=email`);
                  }}
                  className="text-[#D4AF37] hover:underline cursor-pointer"
                >
                  email
                </a>
                &nbsp;hoặc&nbsp;
                <a
                  onClick={() => {
                    router.push(`/login?method=phone`);
                  }}
                  className="text-[#D4AF37] hover:underline cursor-pointer"
                >
                  số điện thoại
                </a>
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm tracking-wide">
                <span className="px-2 text-gray-500 bg-white">Hoặc</span>
              </div>
            </div>

            <ProviderLogin />
          </form>
        </div>
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
};

export default RegisterPage;
