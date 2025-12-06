"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { client } from "@/sanity/lib/client";

export async function registerUser(formData: FormData) {
  const name = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;

  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

  if (password !== repeatPassword) {
    throw new Error("Passwords do not match");
  }

  // Check if user already exists
  const existingUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    { email }
  );

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user in Sanity
  const newUser = await client.create({
    _type: "user",
    name,
    email,
    passwordHash,
  });

  // Auto-login user with NextAuth credentials provider
  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  // Redirect to home page
  return { success: true };
}
