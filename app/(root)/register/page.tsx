"use client"

import Link from "next/link";
import { useState } from "react";

const Register = () => {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const passwordsMatch = repeatPassword.length === 0 || password === repeatPassword;

    return (
        <div className="min-h-[90vh] flex items-center justify-center flex-col">
            <div className="text-3xl mb-10">
                Register
            </div>
            <section className="w-lg text-center">
                <form className="authSection" action="">
                    <label htmlFor="username">Username</label><br />
                    <input id="username" type="text" className="authInput"/><br />

                    <label htmlFor="email">E-mail</label><br />
                    <input id="email" type="email" className="authInput"/><br />

                    <label htmlFor="password">Password</label><br />
                    <input
                        id="password"
                        type="password"
                        className="authInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />

                    <label htmlFor="repeatPassword">Repeat password</label><br />
                    <input
                        id="repeatPassword"
                        type="password"
                        className="authInput"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    /><br />
                    
                    {!passwordsMatch && (
                        <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                    )}

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
export default Register;