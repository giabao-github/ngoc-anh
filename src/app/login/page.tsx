"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa6";
import SkeletonLoader from "../components/SkeletonLoader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormFields from "../components/FormFields";
import ProviderLogin from "../components/ProviderLogin";
import { Disc } from "lucide-react";
import Disclaimer from "../components/Disclaimer";


export const dynamic = "force-dynamic";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const method = searchParams.get('method');
  const [isPhoneLogin, setIsPhoneLogin] = useState(!!(method === 'phone'));
  const [inputError, setInputError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleLoginMethod = () => {
    setIsPhoneLogin((prev) => !prev);
    setEmail("");
    setInputError("");
    router.push(`/login?method=${method === 'phone' ? 'email' : 'phone'}`);
  };

  const validatePhone = (value: string) => {
    if (value.length === 0) {
      setInputError("Vui lòng nhập số điện thoại");
    } else if (value.charAt(0) !== '0') {
      setInputError("Số điện thoại phải bắt đầu bằng 0");
    } else if (value.length < 10 || value.length > 11) {
      setInputError("Số điện thoại phải chứa 10 hoặc 11 chữ số");
    } else {
      setInputError("");
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const testPhone = (value: string) => {
    const phoneRegex = /^0\d{9,10}$/;
    return phoneRegex.test(value);
  };

  const isPhoneValid = isPhoneLogin && testPhone(email);
  const isEmailValid = !isPhoneLogin && validateEmail(email);
  const isPasswordValid = password.length >= 6;

  const isFormValid = (isPhoneValid || isEmailValid) && isPasswordValid;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <Suspense fallback={<SkeletonLoader />}>
      <title>Đăng nhập</title>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center flex flex-col gap-y-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isPhoneLogin ? "Đăng nhập bằng số điện thoại" : "Đăng nhập bằng email"}
            </h2>
            <p
              onClick={toggleLoginMethod}
              className="text-sm text-center tracking-wide text-[#0C2543] hover:text-amber-600 hover:underline transition-colors cursor-pointer"
            >
              {isPhoneLogin ? "Đăng nhập bằng email" : "Đăng nhập bằng số điện thoại"}
            </p>
          </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                router.push('/');
              }}
              className="mt-8 space-y-6"
            >
              <FormFields
                email={email}
                password={password}
                isTouched={isTouched}
                showPassword={showPassword}
                isEmailValid={isEmailValid}
                inputError={inputError}
                isPhoneLogin={isPhoneLogin}
                setEmail={setEmail}
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
                    ? isPhoneLogin
                      ? 'Nhập số điện thoại hợp lệ (bắt đầu bằng 0, chứa ít nhất 10 chữ số) và mật khẩu từ 6 ký tự'
                      : 'Nhập email hợp lệ (ví dụ: ten@example.com) và mật khẩu từ 6 ký tự'
                    : ''
                }
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-lg tracking-wide text-white ${
                  isFormValid ? 'bg-[#D4AF37] hover:bg-[#D4AF37]/90 cursor-pointer' : 'bg-[#D4AF37]/50 cursor-default'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition duration-200 select-none`}
              >
                Đăng nhập
              </button>

              <div className="flex justify-center space-x-1 text-sm font-semibold tracking-wide">
                <a 
                  onClick={() => {
                    router.push(`/password-recovery?method=${isPhoneLogin ? 'phone' : 'email'}`);
                  }}
                  className="text-[#D4AF37] hover:text-[#D4AF37]/70 cursor-pointer"
                >
                  Quên mật khẩu?
                </a>
                <p className="text-gray-400 font-normal">hoặc</p>
                <a href="/register" className="text-[#D4AF37] hover:text-[#D4AF37]/70 cursor-pointer">Đăng ký</a>
              </div>

              {/* Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm tracking-wide">
                  <span className="px-2 bg-white text-gray-500">Hoặc</span>
                </div>
              </div>

              {/* Provider login buttons */}
              <ProviderLogin />
            </form>
        </div>
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
}

export default LoginPage;