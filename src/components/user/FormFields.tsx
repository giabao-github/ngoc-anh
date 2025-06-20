import { FaEye, FaEyeSlash } from "react-icons/fa6";

import { Input } from "@/components/ui/input";

interface FormFieldsProps {
  email: string;
  password?: string;
  hasPasswordField?: boolean;
  isTouched: boolean;
  showPassword?: boolean;
  isEmailValid: boolean;
  inputError: string;
  isPhoneLogin: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsTouched: (isTouched: boolean) => void;
  setInputError: (inputError: string) => void;
  validatePhone: (value: string) => void;
  validateEmail: (value: string) => boolean;
  togglePasswordVisibility?: () => void;
}

const FormFields: React.FC<FormFieldsProps> = ({
  email,
  password,
  hasPasswordField = true,
  isTouched,
  showPassword,
  isEmailValid,
  inputError,
  isPhoneLogin,
  setEmail,
  setPassword,
  setIsTouched,
  setInputError,
  validatePhone,
  validateEmail,
  togglePasswordVisibility,
}) => {
  const placeholderCheck = !hasPasswordField
    ? isPhoneLogin
      ? "Nhập số điện thoại"
      : "Nhập email của bạn"
    : isPhoneLogin
      ? "Số điện thoại"
      : "Email";

  return (
    <div className="space-y-6 rounded-md">
      {/* Phone or email field */}
      <div className="relative">
        <Input
          aria-label={isPhoneLogin ? "Số điện thoại" : "Email"}
          type={isPhoneLogin ? "tel" : "email"}
          inputMode={isPhoneLogin ? "numeric" : "email"}
          name={isPhoneLogin ? "tel" : "email"}
          placeholder={placeholderCheck}
          autoComplete="username"
          value={email}
          onChange={(e) => {
            const { value } = e.target;
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
            } else if (!validateEmail(email)) {
              setInputError(
                "Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: ten@example.com)",
              );
            } else {
              setInputError("");
            }
          }}
          onFocus={() => {
            if (!isTouched) {
              setIsTouched(true);
            }
          }}
          required
          className={`appearance-none rounded-lg relative block w-full px-3 py-2 tracking-wide border ${
            inputError ? "border-rose-400" : "border-gray-300"
          } placeholder:text-gray-500 text-gray-900 font-semibold placeholder:font-normal focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 text-sm`}
        />

        {/* Phone tooltip */}
        {isPhoneLogin && inputError && (
          <div className="absolute top-full mt-1 w-max max-w-[220px] bg-rose-500 text-white text-xs rounded px-2 py-1 shadow z-20">
            {inputError}
            <div className="absolute top-0 w-2 h-2 transform rotate-45 -translate-y-1/2 left-3 bg-rose-500"></div>
          </div>
        )}

        {/* Email tooltip */}
        {!isPhoneLogin && email.length > 0 && !isEmailValid && (
          <div className="absolute z-20 max-w-full px-2 py-1 mt-1 text-xs text-white rounded shadow top-full w-max bg-rose-500">
            Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ:
            ten@example.com)
            <div className="absolute top-0 w-2 h-2 transform rotate-45 -translate-y-1/2 left-3 bg-rose-500"></div>
          </div>
        )}
      </div>

      {/* Password field */}
      {hasPasswordField && (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`appearance-none rounded-lg relative block w-full px-3 py-2 tracking-wide border ${
              password && password.length > 0 && password.length < 6
                ? "border-rose-400"
                : "border-gray-300"
            } placeholder:text-gray-500 text-gray-900 font-semibold placeholder:font-normal focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 text-sm`}
            placeholder="Mật khẩu"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="absolute inset-y-0 right-0 z-10 flex items-center pr-3"
          >
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5 text-gray-700 cursor-pointer" />
            ) : (
              <FaEye className="w-5 h-5 text-gray-700 cursor-pointer" />
            )}
          </button>

          {/* Password tooltip */}
          {password && password.length > 0 && password.length < 6 && (
            <div className="absolute top-full mt-1 w-max max-w-[220px] bg-rose-500 text-white text-xs rounded px-2 py-1 shadow z-20">
              Mật khẩu phải chứa ít nhất 6 ký tự
              <div className="absolute top-0 w-2 h-2 transform rotate-45 -translate-y-1/2 left-3 bg-rose-500"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormFields;
