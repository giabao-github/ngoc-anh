"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { ChangePasswordView } from "@/modules/auth/change-password/views/ChangePasswordView";

const ChangePasswordPage = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  if (!isPending && !data) {
    router.replace("/login");
    return null;
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader" />
      </div>
    );
  }

  return <ChangePasswordView email={data?.user.email || ""} />;
};

export default ChangePasswordPage;
