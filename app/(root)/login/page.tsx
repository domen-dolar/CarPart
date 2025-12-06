import { signIn } from "@/auth";
import Link from "next/link";

const Login = () => {
    return (
        <div className="min-h-[90vh] flex items-center justify-center flex-col">
            <div className="text-3xl mb-10">
                Login
            </div>
            <section className="w-lg text-center">
                <form className="authSection" action={async (formData) => {
                    "use server"
                    await signIn("credentials", {
                        email: formData.get("identifier"),
                        password: formData.get("password"),
                        redirectTo: "/carpart"
                    });
                }}>
                    <label htmlFor="identifier">Username or email</label><br />
                    <input id="identifier" name="identifier" type="text" className="authInput"/><br />

                    <label htmlFor="password">Password</label><br />
                    <input id="password" name="password" type="password" className="authInput"/><br />

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