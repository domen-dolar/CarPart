"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "./actions";

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(type: string, formData: FormData) {
        setError(null);

        try {
            const result = await loginAction(type, formData);
            
            if (type === "credentials") {
                if (!result.success) {
                    setError(result.error);
                    return;
                }
                
                router.push("/");
                router.refresh();
            }

        } catch (e) {
            console.log("Redirect or other error caught:", e);
        }
    }

    return (
        <div className="authPage">
            <div className="text-3xl mb-10">
                Login
            </div>
            <section className="authSection">
                <form className="authForm" action={(formData) => handleLogin("credentials", formData)}>
                    <label htmlFor="identifier">Username or email</label>
                    <input id="identifier" name="identifier" type="text" className="authInput"/>

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className="authInput"/>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button className="button" type="submit">
                        Login
                    </button>
                </form>
                <Link className="noAccountBtn" href="/register">
                    Don't have an account? Register.
                </Link>
                <div className="w-4/5 mx-auto relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-black"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-shaddy-blue">Or</span>
                    </div>
                </div>
                <form
                    action={(formData) => handleLogin("google", formData)}
                >
                    <button className="button" type="submit">Login with Google</button>
                </form>
            </section>
        </div>
    )
}
export default Login;