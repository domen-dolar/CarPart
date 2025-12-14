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
        const result = await registerUser(formData);

        if (!result?.success) {
            setError(result.error);
        }

        router.push("/");
        router.refresh();
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="text-3xl mb-10">
                Register
            </div>
            <section className="authSection">
                <form className="authForm" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" className="authInput"/>

                    <label htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="email" className="authInput" />

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className="authInput" />

                    <label htmlFor="repeatPassword">Repeat password</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" className="authInput" />
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button className="button" type="submit">
                        Register
                    </button>

                    <Link className="noAccountBtn" href="/login">
                        Already have an account? Login.
                    </Link>
                </form>
            </section>
        </div>
    )
}
export default RegisterPage;