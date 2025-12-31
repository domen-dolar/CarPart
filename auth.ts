import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { client } from "./sanity/lib/client"
import Google from "next-auth/providers/google"

async function ensureGoogleUser({
    name,
    email,
}: {
    name?: string | null;
    email?: string | null;
}): Promise<string | null> {
    if (!email) return null;

    const existingUser = await client.fetch(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email }
    );

    if (existingUser?._id) {
        return existingUser._id;
    }

    const newUser = await client.create({
        _type: "user",
        name: name ?? "Google User",
        email,
        provider: "google",
    });

    return newUser._id;
}

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
        }),
        Google
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const sanityUserId = await ensureGoogleUser({
                    name: user.name,
                    email: user.email,
                });

                (user as any).sanityId = sanityUserId;
            }

            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = (user as any).sanityId ?? user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id
            return session
        },
    },
})