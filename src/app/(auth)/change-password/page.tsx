"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { ChangePasswordView } from "@/modules/auth/change-password/views/ChangePasswordView";

const ChangePasswordPage = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  if (!isPending && !data) {
    router.replace("/login");
    return;
  }

  return <ChangePasswordView email={data?.user.email} />;
};

export default ChangePasswordPage;
