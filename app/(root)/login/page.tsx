import Link from "next/link";

const Login = () => {
    return (
        <div className="min-h-[90vh] flex items-center justify-center flex-col">
            <div className="text-3xl mb-10">
                Login
            </div>
            <section className="w-lg text-center">
                <form className="authSection" action="">
                    <label htmlFor="username">Username</label><br />
                    <input id="username" type="text" className="authInput"/><br />

                    <label htmlFor="password">Password</label><br />
                    <input id="password" type="password" className="authInput"/><br />

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