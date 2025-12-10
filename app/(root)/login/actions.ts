"use server";

import { signIn } from "@/auth";

export async function loginAction(formData: FormData) {
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      email: identifier,
      password,
      redirect: false,
    });

    return { success: true, error: null };
  } catch (err: any) {
    return {
      success: false,
      error: "Invalid username or password.",
    };
  }
}
