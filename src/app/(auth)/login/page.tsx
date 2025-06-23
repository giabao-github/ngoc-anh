import { Metadata } from "next";

import { LoginView } from "@/modules/auth/login/views/LoginView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thạch Âm - Đăng nhập",
};

const LoginPage = () => {
  return <LoginView />;
};

export default LoginPage;
