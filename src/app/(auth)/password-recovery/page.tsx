import { Metadata } from "next";

import { TEXTS } from "@/constants/texts";

import { RecoveryView } from "@/modules/auth/recovery/views/RecoveryView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: TEXTS.passwordRecoveryTitle,
};

const PasswordRecoveryPage = () => {
  return <RecoveryView />;
};

export default PasswordRecoveryPage;
