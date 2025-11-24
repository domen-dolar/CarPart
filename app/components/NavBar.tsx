import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    return (
        <header className="header">
            <nav className="flex justify-between">
                <Link href="/" className="flex items-center">
                    <Image src="/carpart/logo.png" alt="logo" width={48} height={48} />
                    <span className="ml-3">CarPart</span>
                </Link>

                <div className="flex items-center gap-5">
                        <Link href="">
                            <button className="button" type="submit">
                                Login
                            </button>
                        </Link>

                        <Link href="">
                            <button className="button" type="submit">
                                Logout
                            </button>
                        </Link>
                </div>
            </nav>
        </header>
    )
}
export default NavBar;