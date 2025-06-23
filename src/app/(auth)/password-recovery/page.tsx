import { Metadata } from "next";

import { RecoveryView } from "@/modules/auth/recovery/views/RecoveryView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thạch Âm - Đặt lại mật khẩu",
};

const PasswordRecoveryPage = () => {
  return <RecoveryView />;
};

export default PasswordRecoveryPage;
