"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arsenal } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa6";

const arsenal = Arsenal({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin", "vietnamese"],
});


const PasswordRecoveryPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const searchParams = useSearchParams();
  const method = searchParams.get('method');

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

  const isPhoneValid = method === 'phone' && testPhone(email);
  const isEmailValid = method === 'email' && validateEmail(email);

  const isFormValid = (isPhoneValid || isEmailValid);


  const Header = () => (
    <header className={`bg-[#0C2543] text-white py-4 px-6`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className={`flex items-center space-x-4`}>
          <Image
            src="https://www.zarla.com/images/zarla-sculpticon-1x1-2400x2400-20230210-9wkw87py43xdc9yhdpwq.png?crop=1:1,smart&width=250&dpr=2"
            alt="Logo"
            width={40}
            height={40}
            onClick={() => router.push('/')}
            className="object-cover rounded cursor-pointer bg-white select-none"
          />
          <h1 className="text-2xl font-semibold uppercase select-none hidden md:block">Ngọc Ánh</h1>
        </div>
  
        <nav className="hidden md:flex space-x-6 items-center tracking-wide">
          <Link 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              router.push("/#collection");
            }} 
            className="hover:text-[#D4AF37] transition-colors text-lg"
          >
            Bộ sưu tập
          </Link>
          <Link 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              router.push("/#products");
            }} 
            className="hover:text-[#D4AF37] transition-colors text-lg"
          >
            Cửa hàng
          </Link>
          <Link 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              router.push("/#about");
            }} 
            className="hover:text-[#D4AF37] transition-colors text-lg"
          >
            Về chúng tôi
          </Link>
          <FiShoppingCart className="text-xl cursor-pointer hover:text-[#D4AF37]" />
          <FiUser onClick={() => router.push('/login?method=email')} className="text-xl cursor-pointer hover:text-[#D4AF37]" />
          <Image 
            src={'/vn-flag.jpeg'}
            alt="Vietnam"
            width={2160}
            height={2160}
            quality={100}
            className="h-10 w-10 rounded-full cursor-pointer select-none"
          />
        </nav>

        <div className="flex items-center flex-row gap-x-6 md:hidden">
          <FiShoppingCart className="text-xl cursor-pointer hover:text-[#D4AF37]" />
          <FiUser onClick={() => router.push('/login?method=email')} className="text-xl cursor-pointer hover:text-[#D4AF37]" />
          <Image 
            src={'https://static.vecteezy.com/system/resources/previews/016/328/942/large_2x/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png'}
            alt="Vietnam"
            width={2160}
            height={2160}
            quality={100}
            className="h-9 w-9 rounded-full cursor-pointer select-none"
          />
          <button
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );


  return (
    <div className={`${arsenal.className}`}>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center flex flex-col gap-y-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Đặt lại mật khẩu
            </h2>
          </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/password-recovery?method=${method}`);
              }}
              className="mt-8 space-y-6"
            >
              <div className="rounded-md space-y-6">
                {/* Phone or Email Field */}
                <div className="relative">
                  <input
                    aria-label={method === 'phone' ? "Số điện thoại" : "Email"}
                    type={method === 'phone' ? 'tel' : 'email'}
                    inputMode={method === 'phone' ? 'numeric' : 'email'}
                    name={method === 'phone' ? 'tel' : 'email'}
                    placeholder={method === 'phone' ? "Nhập số điện thoại" : "Nhập email của bạn"}
                    autoComplete="username"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (method === 'phone') {
                        const digitsOnly = value.replace(/\D/g, "");
                        setEmail(digitsOnly);
                        if (isTouched) validatePhone(digitsOnly);
                      } else {
                        setEmail(value);
                        if (isTouched) validateEmail(value);
                      }
                    }}
                    onBlur={() => {
                      setIsTouched(true);
                      if (method === 'phone') {
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
                      if (!isTouched) setIsTouched(true); 
                    }}
                    required
                    className={`appearance-none rounded-lg relative block w-full px-3 py-2 tracking-wide border ${
                      inputError ? 'border-rose-400' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 font-semibold focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                  />

                  {/* Phone tooltip */}
                  {method === 'phone' && inputError && (
                    <div className="absolute top-full mt-1 w-max max-w-[220px] bg-rose-500 text-white text-xs rounded px-2 py-1 shadow z-20">
                      {inputError}
                      <div className="absolute top-0 left-3 w-2 h-2 bg-rose-500 transform rotate-45 -translate-y-1/2"></div>
                    </div>
                  )}

                  {/* Email tooltip */}
                  {method === 'email' && email.length > 0 && !isEmailValid && (
                    <div className="absolute top-full mt-1 w-max max-w-full bg-rose-500 text-white text-xs rounded px-2 py-1 shadow z-20">
                      Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: ten@example.com)
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
                disabled={!isFormValid}
                title={
                  !isFormValid
                    ? method === 'phone'
                      ? 'Nhập số điện thoại hợp lệ (bắt đầu bằng 0, chứa ít nhất 10 chữ số)'
                      : 'Nhập email hợp lệ (ví dụ: ten@example.com)'
                    : ''
                }
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-lg tracking-wide text-white ${
                  isFormValid ? 'bg-[#D4AF37] hover:bg-[#D4AF37]/90 cursor-pointer' : 'bg-[#D4AF37]/50 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition duration-200 select-none`}
              >
                Gửi
              </button>

              <div className="flex justify-center space-x-2 text-sm font-semibold tracking-wide">
                <a 
                  onClick={() => {
                    router.push(`/login?method=${method}`);
                  }} 
                  className="text-[#D4AF37] hover:text-[#D4AF37]/70 cursor-pointer"
                >
                  Quay về đăng nhập
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

    </div>
  );
}

export default PasswordRecoveryPage ;