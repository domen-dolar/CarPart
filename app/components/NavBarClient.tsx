"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBarClient = ({ session, logout }: { session: any, logout: () => Promise<void> }) => {
    const pathname = usePathname();

    const hideLogin = pathname === "/login";

    return (
        <div className="flex items-center gap-5">
            {session ? (
                <>
                    <Link className="button" href="/">
                        {session.user?.name}
                    </Link>

                    <form action={logout}>
                        <button className="button" type="submit">
                            Logout
                        </button>
                    </form>
                </>
            ) : (
                !hideLogin && (
                    <Link href="/login">
                        <span className="button">Login</span>
                    </Link>
                )
            )}
        </div>
    );
};

export default NavBarClient;
