import { Metadata } from "next";

import { LoginView } from "@/modules/auth/login/views/LoginView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

const LoginPage = () => {
  return (
    <div className="bg-gray-50">
      <LoginView />
    </div>
  );
};

export default LoginPage;
