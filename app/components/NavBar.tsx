
import { auth, signOut } from "@/auth";
import { faList, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import BasketButton from "./BasketButton";
import { client } from "@/sanity/lib/client";
import { BASKET_ITEMS_QUERY } from "@/sanity/lib/queries";

const NavBar = async () => {
    const session = await auth();

    let basket;
    let basketFill = false;

    if (session && session.user) {
        basket = await client.fetch(BASKET_ITEMS_QUERY, { userId: session?.user.id });

        if (basket == null)
            basketFill = false;

        else if (basket.items.length > 0)
            basketFill = true;
    }

    return (
        <header className="header">
            <nav className="flex justify-between">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="logo" width={48} height={48} />
                    <span className="ml-3">CarPart</span>
                </Link>

                <div className="flex items-center gap-5">
                    {session ? <>
                            <p>Welcome, {session.user?.name}!</p>

                            <Link className="button" href="/orders">
                                My orders
                                <FontAwesomeIcon className="ml-1" icon={faList} />
                            </Link>

                            <BasketButton basketFill={basketFill} />

                            <form
                                action={async () => {
                                    "use server";
                                    await signOut();
                                } }
                            >
                                <button className="button" type="submit" data-testid="logout-button">
                                    Logout
                                    <FontAwesomeIcon className="ml-1" icon={faSignOutAlt} />
                                </button>
                            </form>
                        </> : 
                            <Link href="/login">
                                <span className="button" data-testid="login-button">
                                    Login
                                    <FontAwesomeIcon className="ml-1" icon={faSignInAlt} />
                                </span>
                            </Link>
                    }
                </div>
            </nav>
        </header>
    );
};
export default NavBar;