"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "./actions";

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(formData: FormData) {
        setError(null);

        const result = await loginAction(formData);

        if (!result.success) {
            setError(result.error);
            return;
        }

        router.push("/");
        router.refresh();
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center flex-col">
            <div className="text-3xl mb-10">
                Login
            </div>
            <section className="w-lg text-center">
                <form className="authSection" action={handleLogin}>
                    <label htmlFor="identifier">Username or email</label><br />
                    <input id="identifier" name="identifier" type="text" className="authInput"/><br />

                    <label htmlFor="password">Password</label><br />
                    <input id="password" name="password" type="password" className="authInput"/><br />

                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                    <button className="button" type="submit">
                        Login
                    </button><br />

                    <Link className="noAccountBtn" href="/register">
                        Don't have an account?
                    </Link>
                </form>
            </section>
        </div>
    )
}
export default Login;