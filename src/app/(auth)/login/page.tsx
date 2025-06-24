import { Metadata } from "next";

import { TEXTS } from "@/constants/texts";

import { LoginView } from "@/modules/auth/login/views/LoginView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: TEXTS.loginTitle,
};

const LoginPage = () => {
  return <LoginView />;
};

export default LoginPage;
