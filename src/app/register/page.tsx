import { Metadata } from "next";

import { RegisterView } from "@/modules/auth/reigster/views/RegisterView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản",
};

const RegisterPage = () => {
  return (
    <div className="bg-gray-50">
      <RegisterView />
    </div>
  );
};

export default RegisterPage;
