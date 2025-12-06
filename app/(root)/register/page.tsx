"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "./actions";

const RegisterPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
        const result = await registerUser(formData);

        if (result?.success) {
            router.push("/");
        }
        } catch (err: any) {
        setError(err.message);
        }
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center flex-col">
            <div className="text-3xl mb-10">
                Register
            </div>
            <section className="w-lg text-center">
                <form className="authSection" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label><br />
                    <input id="username" name="username" type="text" className="authInput"/><br />

                    <label htmlFor="email">E-mail</label><br />
                    <input id="email" name="email" type="email" className="authInput" /><br />

                    <label htmlFor="password">Password</label><br />
                    <input id="password" name="password" type="password" className="authInput" /><br />

                    <label htmlFor="repeatPassword">Repeat password</label><br />
                    <input id="repeatPassword" name="repeatPassword" type="password" className="authInput" /><br />
                    
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                    <button className="button mt-2" type="submit">
                        Register
                    </button><br />

                    <Link className="noAccountBtn" href="/login">
                        Already have an account?
                    </Link>
                </form>
            </section>
        </div>
    )
}
export default RegisterPage;