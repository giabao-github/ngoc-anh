import { Metadata } from "next";

import { RecoveryView } from "@/modules/auth/recovery/views/RecoveryView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu",
};

const PasswordRecoveryPage = () => {
  return (
    <div className="bg-gray-50">
      <RecoveryView />
    </div>
  );
};

export default PasswordRecoveryPage;
