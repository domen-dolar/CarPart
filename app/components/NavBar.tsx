import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const NavBar = async () => {
    const session = await auth();

    return (
        <header className="header">
            <nav className="flex justify-between">
                <Link href="/" className="flex items-center">
                    <Image src="/carpart/logo.png" alt="logo" width={48} height={48} />
                    <span className="ml-3">CarPart</span>
                </Link>

                <div className="flex items-center gap-5">
                    {session ? <>
                            <Link className="button" href="/">
                                {session.user?.name}
                            </Link>

                            <form
                                action={async () => {
                                    "use server";
                                    await signOut();
                                } }
                            >
                                <button className="button" type="submit">
                                    Logout
                                </button>
                            </form>
                        </> : 
                            <Link href="/login">
                                <span className="button">Login</span>
                            </Link>
                    }
                </div>
            </nav>
        </header>
    );
};
export default NavBar;