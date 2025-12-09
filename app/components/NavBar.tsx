import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import NavBarClient from "./NavBarClient";

const NavBar = async () => {
    const session = await auth();

    async function logout() {
        "use server"
        await signOut({ redirectTo: "/carpart" });
    }

    return (
        <header className="header">
            <nav className="flex justify-between">
                <Link href="/" className="flex items-center">
                    <Image src="/carpart/logo.png" alt="logo" width={48} height={48} />
                    <span className="ml-3">CarPart</span>
                </Link>

                <NavBarClient session={session} logout={logout} />
            </nav>
        </header>
    )
}
export default NavBar;