import { FaApple, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const ProviderLogin = () => {
  return (
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
  );
}

export default ProviderLogin;