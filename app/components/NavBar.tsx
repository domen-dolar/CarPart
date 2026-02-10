/*
  Navigacijska vrstica (NavBar) za aplikacijo CarPart.
  - prikazuje logotip in ime
  - prikazuje prijavo / odjavo
  - prikazuje košarico in stanje košarice
  - prikazuje povezavo do naročil za prijavljene uporabnike
*/

import { auth, signOut } from "@/auth";
import { faList, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import BasketButton from "./BasketButton";
import { client } from "@/sanity/lib/client";
import { BASKET_ITEMS_QUERY } from "@/sanity/lib/queries";

// Async komponenta, ker uporablja server-side auth
const NavBar = async () => {
    // Pridobimo trenutno sejo uporabnika
    const session = await auth();

    // Inicializacija košarice
    let basket;
    let basketFill = false;

    if (session && session.user) {
        // Fetch podatkov košarice za prijavljenega uporabnika
        basket = await client.fetch(BASKET_ITEMS_QUERY, { userId: session?.user.id });

        // Preverimo, ali košarica vsebuje izdelke
        if (basket == null)
            basketFill = false;

        else if (basket.items.length > 0)
            basketFill = true;
    }

    return (
        <header className="header">
            <nav className="flex justify-between">
                {/* Logotip in domača stran */}
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="logo" width={48} height={48} />
                    <span className="ml-3 hidden sm:inline">CarPart</span>
                </Link>

                <div className="flex items-center gap-5">
                    {session ? <>
                    {/* Prijavljen uporabnik */}
                            <p>Welcome, {session.user?.name}!</p>

                            {/* Povezava do naročil */}
                            <Link className="button" href="/orders">
                                <span className="hidden sm:inline">My orders</span>
                                <FontAwesomeIcon className="ml-1" icon={faList} />
                            </Link>

                             {/* Gumb košarice */}
                            <BasketButton basketFill={basketFill} />

                            {/* Gumb za odjavo */}
                            <form
                                action={async () => {
                                    "use server";
                                    await signOut();
                                } }
                            >
                                <button className="button" type="submit" data-testid="logout-button">
                                    <span className="hidden sm:inline">Logout</span>
                                    <FontAwesomeIcon className="ml-1" icon={faSignOutAlt} />
                                </button>
                            </form>
                        </> :      
                            <Link href="/login">
                                {/* Neprijavljen uporabnik → login */}
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