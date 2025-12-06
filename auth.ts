import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { client } from "./sanity/lib/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",

            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                if (
                    !credentials ||
                    typeof credentials.email !== "string" ||
                    typeof credentials.password !== "string"
                ) {
                    return null;
                }

                const identifier = credentials.email;

                const user = await client.fetch(
                    `*[_type == "user" && (email == $identifier || name == $identifier)][0]{
                        _id, name, email, passwordHash
                    }`,
                    { identifier }
                );

                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
                if (!isValid) return null;

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                };
            }
        })
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    }
})