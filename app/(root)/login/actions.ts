"use server";

import { signIn } from "@/auth";

type LoginActionResult = { success: boolean; error: string | null };

async function signInWithGoogle(): Promise<never> {
    try {
        await signIn("google", {
          redirect: true,
          redirectTo: "/",
        });
        throw new Error("Google sign-in did not initiate redirect.");
    } catch (error) {
        throw error;
    }
}

export async function loginAction(type: string, formData: FormData): Promise<LoginActionResult> {
  if(type == "credentials"){
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
  } else {
    await signInWithGoogle();

    return { success: false, error: "Redirect failed." };
  }
}
