"use client";

import { Suspense, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Footer from "@/components/sections/footer/Footer";
import Header from "@/components/sections/header/Header";
import Disclaimer from "@/components/user/Disclaimer";
import FormFields from "@/components/user/FormFields";
import ProviderLogin from "@/components/user/ProviderLogin";
import SkeletonLoader from "@/components/user/SkeletonLoader";

import { testPhone, validateEmail } from "@/libs/textUtils";

export const RecoveryView = () => {
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const aboutRef = useRef<HTMLDivElement>(null);

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

  const isPhoneValid = method === "phone" && testPhone(email);
  const isEmailValid = method === "email" && validateEmail(email);

  const isFormValid = isPhoneValid || isEmailValid;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="flex items-center justify-center max-h-screen my-16 bg-gray-50 lg:px-8 md:my-24">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md shadow-[#D4AF37]/50 md:border-t md:border-[#D4AF37]/50 md:focus-within:border-t-2 focus-within:shadow-lg">
          <div className="flex flex-col text-center gap-y-3">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Đặt lại mật khẩu
            </h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mt-8 space-y-6"
          >
            <FormFields
              email={email}
              hasPasswordField={false}
              isTouched={isTouched}
              isEmailValid={isEmailValid}
              inputError={inputError}
              isPhoneLogin={method === "phone"}
              setEmail={setEmail}
              setPassword={() => {}}
              setIsTouched={setIsTouched}
              setInputError={setInputError}
              validatePhone={validatePhone}
              validateEmail={validateEmail}
            />

            <Disclaimer />

            <button
              disabled={!isFormValid}
              title={
                !isFormValid
                  ? method === "phone"
                    ? "Nhập số điện thoại hợp lệ (bắt đầu bằng 0, chứa ít nhất 10 chữ số)"
                    : "Nhập email hợp lệ (ví dụ: ten@example.com)"
                  : ""
              }
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-lg tracking-wide text-white ${
                isFormValid
                  ? "bg-[#D4AF37] hover:bg-[#D4AF37]/80 active:bg-[#D4AF37]/60 cursor-pointer"
                  : "bg-[#D4AF37]/50 cursor-default"
              } focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#D4AF37] transition duration-200 select-none`}
            >
              Gửi
            </button>

            <div className="flex justify-center space-x-1 text-sm font-semibold tracking-wide">
              <Link
                href={`/login?method=${method}`}
                className="text-[#D4AF37] hover:text-[#D4AF37]/70 cursor-pointer"
              >
                Quay về đăng nhập
              </Link>
              <p className="font-normal text-gray-400">hoặc</p>
              <Link
                href="/register"
                className="text-[#D4AF37] hover:text-[#D4AF37]/70 cursor-pointer"
              >
                Đăng ký
              </Link>
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
