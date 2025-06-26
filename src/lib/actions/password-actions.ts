"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { db } from "@/db";
import { account } from "@/db/schema";

export async function changePassword(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!currentPassword || !newPassword) {
      return {
        success: false,
        error: "Vui lòng điền đầy đủ thông tin mật khẩu",
      };
    }

    if (email.length > 0 && newPassword.toLowerCase() === email.toLowerCase()) {
      return {
        success: false,
        error: "Mật khẩu mới không được trùng với email",
      };
    }

    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      return {
        success: false,
        error: "Vui lòng đăng nhập để tiếp tục",
      };
    }

    await auth.api.changePassword({
      body: {
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      },
      headers: headersList,
    });

    return {
      success: true,
      message: "Mật khẩu đã cập nhật thành công",
    };
  } catch (error) {
    console.error("Password update error:", error);

    // Handle Zod validation errors
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ZodError"
    ) {
      return {
        success: false,
        error: "Thông tin không hợp lệ",
      };
    }

    // Handle better-auth specific errors
    if (error && typeof error === "object") {
      // Check for HTTP response errors
      if ("status" in error) {
        const status = error.status as number;
        if (status === 400 || status === 401) {
          return {
            success: false,
            error: "Mật khẩu hiện tại không chính xác",
          };
        }
      }

      // Check error message
      if ("message" in error) {
        const errorMessage = error.message as string;

        if (
          errorMessage.includes("Invalid password") ||
          errorMessage.includes("incorrect") ||
          errorMessage.includes("current password") ||
          errorMessage.includes("wrong password")
        ) {
          return {
            success: false,
            error: "Mật khẩu hiện tại không chính xác",
          };
        }

        if (
          errorMessage.includes("weak") ||
          errorMessage.includes("requirements") ||
          errorMessage.includes("invalid new password")
        ) {
          return {
            success: false,
            error: "Mật khẩu mới quá yếu hoặc không đáp ứng yêu cầu",
          };
        }
      }
    }

    return {
      success: false,
      error: "Có lỗi xảy ra trong quá trình cập nhật mật khẩu",
    };
  }
}

export async function testNewPassword(email: string, newPassword: string) {
  const userResult = await (
    await auth.$context
  ).internalAdapter.findUserByEmail(email);

  if (!userResult || !userResult.user) {
    return { success: false, error: "Không tìm thấy người dùng." };
  }

  // Try to get all accounts for this user using Drizzle ORM
  const accounts = await db
    .select()
    .from(account)
    .where(eq(account.userId, userResult.user.id));

  // Find the email/password account
  const passwordAccount = accounts.find((acc) => acc.password);

  const passwordHash = passwordAccount?.password;

  if (!passwordHash) {
    return {
      success: false,
      error: "Không tìm thấy mật khẩu hiện tại.",
    };
  }

  const isSame = await (
    await auth.$context
  ).password.verify({
    password: newPassword,
    hash: passwordHash,
  });

  if (isSame) {
    return {
      success: false,
      error: "Mật khẩu mới không được trùng với mật khẩu hiện tại.",
    };
  }

  return { success: true };
}
