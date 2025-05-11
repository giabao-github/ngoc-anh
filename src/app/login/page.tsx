"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa6";
import SkeletonLoader from "../components/SkeletonLoader";
import Header from "../components/Header";
import Footer from "../components/Footer";


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


  return (
    <Suspense fallback={<SkeletonLoader />}>
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
              <div className="rounded-md space-y-6">
                {/* Phone or Email Field */}
                <div className="relative">
                  <input
                    aria-label={isPhoneLogin ? "Số điện thoại" : "Email"}
                    type={isPhoneLogin ? "tel" : "email"}
                    inputMode={isPhoneLogin ? "numeric" : "email"}
                    name={isPhoneLogin ? "tel" : "email"}
                    autoComplete="username"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (isPhoneLogin) {
                        const digitsOnly = value.replace(/\D/g, "");
                        setEmail(digitsOnly);
                        if (isTouched) {
                          validatePhone(digitsOnly);
                        }
                      } else {
                        setEmail(value);
                        if (isTouched) {
                          validateEmail(value);
                        }
                      }
                    }}
                    onBlur={() => {
                      setIsTouched(true);
                      if (isPhoneLogin) {
                        validatePhone(email);
                      } else {
                        if (!validateEmail(email)) {
                          setInputError("Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: ten@example.com)");
                        } else {
                          setInputError("");
                        }
                      }
                    }}                    
                    onFocus={() => { 
                      if (!isTouched) {
                        setIsTouched(true);
                      } 
                    }}
                    required
                    className={`appearance-none rounded-lg relative block w-full px-3 py-2 tracking-wide border ${
                      inputError ? 'border-rose-400' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 font-semibold focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                    placeholder={isPhoneLogin ? "Số điện thoại" : "Email"}
                  />

                  {/* Phone tooltip */}
                  {isPhoneLogin && inputError && (
                    <div className="absolute top-full mt-1 w-max max-w-[220px] bg-rose-500 text-white text-xs rounded px-2 py-1 shadow z-20">
                      {inputError}
                      <div className="absolute top-0 left-3 w-2 h-2 bg-rose-500 transform rotate-45 -translate-y-1/2"></div>
                    </div>
                  )}

                  {/* Email tooltip */}
                  {!isPhoneLogin && email.length > 0 && !isEmailValid && (
                    <div className="absolute top-full mt-1 w-max max-w-full bg-rose-500 text-white text-xs rounded px-2 py-1 shadow z-20">
                      Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: ten@example.com)
                      <div className="absolute top-0 left-3 w-2 h-2 bg-rose-500 transform rotate-45 -translate-y-1/2"></div>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`appearance-none rounded-lg relative block w-full px-3 py-2 tracking-wide border ${
                      password.length > 0 && password.length < 6 ? 'border-rose-400' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 font-semibold focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                    placeholder="Mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-700 cursor-pointer" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-700 cursor-pointer" />
                    )}
                  </button>

                  {/* Password tooltip */}
                  {password.length > 0 && password.length < 6 && (
                    <div className="absolute top-full mt-1 w-max max-w-[220px] bg-rose-500 text-white text-xs rounded px-2 py-1 shadow z-20">
                      Mật khẩu phải chứa ít nhất 6 ký tự
                      <div className="absolute top-0 left-3 w-2 h-2 bg-rose-500 transform rotate-45 -translate-y-1/2"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-700 font-medium px-2">
                <p className="w-fit tracking-wide">
                  Trang web này được bảo vệ bởi reCAPTCHA và tuân theo&nbsp;
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://policies.google.com/privacy"
                    className="text-[#D4AF37] hover:underline font-semibold"
                  >
                    Chính sách bảo mật
                  </a>&nbsp;và&nbsp;
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://policies.google.com/terms"
                    className="text-[#D4AF37] hover:underline font-semibold"
                  >
                    Điều khoản dịch vụ
                  </a>&nbsp;của Google
                </p>
              </div>

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
                  isFormValid ? 'bg-[#D4AF37] hover:bg-[#D4AF37]/90 cursor-pointer' : 'bg-[#D4AF37]/50 cursor-not-allowed'
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

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm tracking-wide">
                  <span className="px-2 bg-white text-gray-500">Hoặc</span>
                </div>
              </div>

              <div className="space-y-3 tracking-wide">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md transition duration-200 cursor-pointer select-none"
                >
                  <FcGoogle className="h-5 w-5 mr-3" />
                  Đăng nhập với Google
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#1877f2] hover:bg-[#166fe5] hover:shadow-md transition duration-200 cursor-pointer select-none"
                >
                  <FaFacebook className="h-5 w-5 mr-3" />
                  Đăng nhập với Facebook
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-900 hover:shadow-md transition duration-200 cursor-pointer select-none"
                >
                  <FaApple className="h-5 w-5 mr-3" />
                  Đăng nhập với Apple
                </button>
              </div>
            </form>
        </div>
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
}

export default LoginPage;