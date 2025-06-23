import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

interface ProviderLoginProps {
  type: "login" | "register";
  pending: boolean;
  onLoginSocial: (provider: "github" | "google") => void;
}

const ProviderLogin = ({
  type,
  pending,
  onLoginSocial,
}: ProviderLoginProps) => {
  return (
    <div className="space-y-3 tracking-wide">
      <button
        type="button"
        disabled={pending}
        onClick={() => onLoginSocial("google")}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-[#F3F3F3] active:bg-[#E6E6E6] hover:shadow-md transition duration-200 cursor-pointer select-none disabled:bg-white/50 disabled:cursor-default"
      >
        <FcGoogle className="mr-3 w-5 h-5" />
        {`${type === "register" ? "Đăng ký" : "Đăng nhập"} với Google`}
      </button>

      <button
        type="button"
        disabled={pending}
        onClick={() => onLoginSocial("github")}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-black hover:bg-[#262626] active:bg-[#4D4D4D] hover:shadow-md transition duration-200 cursor-pointer select-none disabled:bg-black/50 disabled:cursor-default"
      >
        <FaGithub className="mr-3 w-5 h-5" />
        {`${type === "register" ? "Đăng ký" : "Đăng nhập"} với Github`}
      </button>
    </div>
  );
};

export default ProviderLogin;
