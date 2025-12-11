"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { client } from "@/sanity/lib/client";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("repeatPassword") as string;

    if (!name || !email || !password) {
      return { success: false, error: "Missing required fields" };
    }

    if (password !== repeatPassword) {
      return { success: false, error: "Passwords do not match" };
    }

    // Check if user already exists
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return { success: false, error: "User with this email already exists" };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    await client.create({
      _type: "user",
      name,
      email,
      passwordHash,
    });

    // Auto-login
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, error: null };
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return { success: false, error: "Registration failed. Try again." };
  }
}
