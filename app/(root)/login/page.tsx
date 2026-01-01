"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loginAction } from "./actions";
import Image from "next/image";
import { faHourglass1, faHourglass2, faHourglass3 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [authenticating, setAuthenticating] = useState(false);
    const [iconIndex, setIconIndex] = useState(0);

    const hourglassIcons = [
        faHourglass1,
        faHourglass2,
        faHourglass3,
    ];

    useEffect(() => {
        if (!authenticating) {
            setIconIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % hourglassIcons.length);
        }, 300);

        return () => clearInterval(interval);
    }, [authenticating]);

    async function handleLogin(type: string, formData: FormData) {
        setAuthenticating(true);
        setError(null);

        try {
            const result = await loginAction(type, formData);
            
            if (type === "credentials") {
                if (!result.success) {
                    setError(result.error);
                    setAuthenticating(false);
                    return;
                }
                
                router.push("/");
                router.refresh();
            }

        } catch (e) {
            console.log("Redirect or other error caught:", e);
            setAuthenticating(false);
        }
    }

    return (
        <div className="authPage">
            <div className="text-3xl mb-10">
                Login
            </div>
            <section className="authSection">
                <form className="authForm"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (authenticating) return;

                        setAuthenticating(true);

                        const formData = new FormData(e.currentTarget);
                        await handleLogin("credentials", formData);
                    }}
                >
                    <label htmlFor="identifier">Username or email</label>
                    <input id="identifier" name="identifier" type="text" className="authInput"/>

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className="authInput"/>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button disabled={authenticating} className="button disabled:cursor-not-allowed disabled:opacity-75" type="submit">
                        {authenticating ? <FontAwesomeIcon icon={hourglassIcons[iconIndex]} /> : "Login"}
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
                    <button className="button flex items-center mx-auto" type="submit">
                        <Image src="/google.png" alt="google" width={24} height={24} />
                        <span className="ml-2">Login with Google</span>
                    </button>
                </form>
            </section>
        </div>
    )
}
export default Login;