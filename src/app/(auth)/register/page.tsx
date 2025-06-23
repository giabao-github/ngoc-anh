import { Metadata } from "next";

import { RegisterView } from "@/modules/auth/register/views/RegisterView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thạch Âm - Đăng ký tài khoản",
};

const RegisterPage = () => {
  return <RegisterView />;
};

export default RegisterPage;
